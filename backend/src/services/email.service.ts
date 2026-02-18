import { Resend } from 'resend'
import { env } from '../config/env.js'

const resend = new Resend(env.RESEND_API_KEY)

interface EnviarEmailOpts {
  para: string
  assunto: string
  html: string
}

export async function enviarEmail({ para, assunto, html }: EnviarEmailOpts) {
  await resend.emails.send({
    from: env.EMAIL_FROM,
    to: para,
    subject: assunto,
    html,
  })
}

export function gerarEmailRedefinicao(nome: string, link: string): string {
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="margin: 0; font-size: 20px; color: #1a1a1a;">Freedom.AI Hub</h2>
        <p style="margin: 4px 0 0; font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 1px;">
          Viseu Advogados
        </p>
      </div>
      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
      <p>Ola, <strong>${nome}</strong>.</p>
      <p>Recebemos uma solicitacao para redefinir sua senha de acesso ao Hub.</p>
      <p>Clique no botao abaixo para criar uma nova senha. O link e valido por <strong>1 hora</strong>.</p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${link}"
           style="display: inline-block; padding: 14px 32px; background-color: #eab308; color: #1a1a1a; font-weight: 700; text-decoration: none; border-radius: 8px; font-size: 14px;">
          Redefinir minha senha
        </a>
      </div>
      <p style="font-size: 13px; color: #737373;">
        Se voce nao solicitou essa alteracao, ignore este e-mail. Sua senha permanecera a mesma.
      </p>
      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
      <p style="font-size: 11px; color: #a3a3a3; text-align: center;">
        &copy; 2026 Viseu Advogados &mdash; Powered by Freedom.AI
      </p>
    </div>
  `
}
