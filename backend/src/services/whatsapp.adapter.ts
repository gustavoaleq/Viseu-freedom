import { env } from '../config/env.js'

export interface EnvioWhatsAppInput {
  para: string
  texto: string
  audienciaId: string
  tipo: string
  buttons?: Array<{
    id: string
    label: string
    type?: 'REPLY' | 'URL'
    url?: string
  }>
}

export interface EnvioWhatsAppResultado {
  providerMessageId?: string
}

interface WhatsAppAdapter {
  enviarMensagem(input: EnvioWhatsAppInput): Promise<EnvioWhatsAppResultado>
}

class WebhookWhatsAppAdapter implements WhatsAppAdapter {
  async enviarMensagem(input: EnvioWhatsAppInput) {
    if (!env.WHATSAPP_OUTBOUND_WEBHOOK_URL) {
      throw new Error('WHATSAPP_OUTBOUND_WEBHOOK_URL_NAO_CONFIGURADO')
    }

    const response = await fetch(env.WHATSAPP_OUTBOUND_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(env.WHATSAPP_OUTBOUND_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${env.WHATSAPP_OUTBOUND_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`ERRO_WEBHOOK_WHATSAPP: ${response.status} ${body}`)
    }

    const data = (await response.json().catch(() => ({}))) as Record<string, unknown>
    return {
      providerMessageId: typeof data.messageId === 'string' ? data.messageId : undefined,
    }
  }
}

class ZApiWhatsAppAdapter implements WhatsAppAdapter {
  async enviarMensagem(input: EnvioWhatsAppInput) {
    const endpointText = env.WHATSAPP_ZAPI_SEND_TEXT_URL ?? env.WHATSAPP_OUTBOUND_WEBHOOK_URL
    if (!endpointText) {
      throw new Error('WHATSAPP_ZAPI_SEND_TEXT_URL_NAO_CONFIGURADO')
    }

    const phone = normalizarTelefoneZapi(input.para)
    const buttons = input.buttons ?? []

    if (buttons.length === 0) {
      const data = await this.enviarRequisicao(endpointText, {
        phone,
        message: input.texto,
      })
      return { providerMessageId: extrairProviderMessageId(data) }
    }

    const possuiBotaoAcao = buttons.some((button) => button.type === 'URL')

    // Estrategia: send-button-list (botoes nativos reply) -> send-button-actions -> texto com opcoes
    // Prerequisito: modo botao deve estar ativado no painel Z-API da instancia.
    const endpointButtonList =
      env.WHATSAPP_ZAPI_SEND_BUTTON_LIST_URL ??
      endpointText.replace('/send-text', '/send-button-list')

    if (!possuiBotaoAcao) {
      try {
        const data = await this.enviarRequisicao(endpointButtonList, {
          phone,
          message: input.texto,
          buttonList: {
            buttons: buttons.map((b) => ({ id: b.id, label: b.label })),
          },
        })
        return { providerMessageId: extrairProviderMessageId(data) }
      } catch (err) {
        console.warn('[ZApi] send-button-list falhou:', err instanceof Error ? err.message : err)
      }
    }

    const endpointButtonActions =
      env.WHATSAPP_ZAPI_SEND_BUTTON_ACTIONS_URL ??
      endpointText.replace('/send-text', '/send-button-actions')

    try {
      const data = await this.enviarRequisicao(endpointButtonActions, {
        phone,
        message: input.texto,
        buttonActions: buttons.map((button) => {
          if (button.type === 'URL') {
            if (!button.url) {
              throw new Error(`BOTAO_URL_SEM_URL: ${button.id}`)
            }
            return {
              id: button.id,
              type: 'URL',
              url: button.url,
              label: button.label,
            }
          }

          return { id: button.id, type: 'REPLY', label: button.label }
        }),
      })
      return { providerMessageId: extrairProviderMessageId(data) }
    } catch (err) {
      console.warn('[ZApi] send-button-actions falhou:', err instanceof Error ? err.message : err)
    }

    // Fallback: texto com opcoes numeradas (entrega garantida)
    const textoFallback = montarTextoFallbackComOpcoes(input.texto, buttons)
    const data = await this.enviarRequisicao(endpointText, { phone, message: textoFallback })
    return { providerMessageId: extrairProviderMessageId(data) }
  }

  private async enviarRequisicao(url: string, payload: Record<string, unknown>) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(env.WHATSAPP_ZAPI_CLIENT_TOKEN
          ? { 'Client-Token': env.WHATSAPP_ZAPI_CLIENT_TOKEN }
          : {}),
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`ERRO_ZAPI_WHATSAPP: ${response.status} ${body}`)
    }

    return (await response.json().catch(() => ({}))) as Record<string, unknown>
  }
}

class CloudWhatsAppAdapter implements WhatsAppAdapter {
  async enviarMensagem(input: EnvioWhatsAppInput) {
    if (!env.WHATSAPP_CLOUD_PHONE_NUMBER_ID || !env.WHATSAPP_CLOUD_ACCESS_TOKEN) {
      throw new Error('WHATSAPP_CLOUD_NAO_CONFIGURADO')
    }

    const endpoint = `https://graph.facebook.com/${env.WHATSAPP_CLOUD_API_VERSION}/${env.WHATSAPP_CLOUD_PHONE_NUMBER_ID}/messages`

    const buttons = (input.buttons ?? []).slice(0, 3)
    const possuiBotaoUrl = buttons.some((button) => button.type === 'URL')
    const textoComLinks =
      possuiBotaoUrl && buttons.length > 0
        ? montarTextoFallbackComOpcoes(input.texto, buttons)
        : input.texto

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.WHATSAPP_CLOUD_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        buttons.length > 0 && !possuiBotaoUrl
          ? {
              messaging_product: 'whatsapp',
              to: input.para,
              type: 'interactive',
              interactive: {
                type: 'button',
                body: { text: input.texto },
                action: {
                  buttons: buttons.map((button) => ({
                    type: 'reply',
                    reply: {
                      id: button.id,
                      title: button.label.slice(0, 20),
                    },
                  })),
                },
              },
            }
          : {
              messaging_product: 'whatsapp',
              to: input.para,
              type: 'text',
              text: {
                body: textoComLinks,
              },
            },
      ),
    })

    if (!response.ok) {
      const body = await response.text()
      throw new Error(`ERRO_CLOUD_WHATSAPP: ${response.status} ${body}`)
    }

    const data = (await response.json()) as {
      messages?: Array<{ id?: string }>
    }

    return {
      providerMessageId: data.messages?.[0]?.id,
    }
  }
}

export function criarWhatsAppAdapter(): WhatsAppAdapter {
  if (env.WHATSAPP_PROVIDER === 'zapi') {
    return new ZApiWhatsAppAdapter()
  }

  if (env.WHATSAPP_PROVIDER === 'cloud') {
    return new CloudWhatsAppAdapter()
  }

  return new WebhookWhatsAppAdapter()
}

function normalizarTelefoneZapi(valor: string) {
  const digitos = valor.replace(/\D/g, '')
  if (digitos.startsWith('55')) return digitos
  return `55${digitos}`
}

function extrairProviderMessageId(data: Record<string, unknown>) {
  return (
    (typeof data.messageId === 'string' && data.messageId) ||
    (typeof data.zaapId === 'string' && data.zaapId) ||
    (typeof data.id === 'string' && data.id) ||
    undefined
  )
}

function montarTextoFallbackComOpcoes(
  texto: string,
  buttons: Array<{ id: string; label: string; type?: 'REPLY' | 'URL'; url?: string }>,
) {
  const possuiBotaoUrl = buttons.some((button) => button.type === 'URL')
  if (possuiBotaoUrl) {
    const opcoes = buttons.map((button) => {
      if (button.type === 'URL' && button.url) {
        return `- ${button.label}: ${button.url}`
      }
      return `- ${button.label}`
    })
    return `${texto}\n\n${opcoes.join('\n')}`
  }

  const opcoes = buttons.map((button, indice) => `${indice + 1}. ${button.label}`)
  return `${texto}\n\nResponda com o numero da opcao:\n${opcoes.join('\n')}`
}
