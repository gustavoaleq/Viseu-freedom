import { useEffect, useState, useCallback, useSyncExternalStore } from 'react'

type ToastTipo = 'sucesso' | 'erro' | 'aviso'

interface ToastItem {
  id: number
  mensagem: string
  tipo: ToastTipo
}

let toastId = 0
let toasts: ToastItem[] = []
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((fn) => fn())
}

export function toast(mensagem: string, tipo: ToastTipo = 'erro') {
  toastId += 1
  toasts = [...toasts, { id: toastId, mensagem, tipo }]
  notify()
}

export function toast_sucesso(mensagem: string) {
  toast(mensagem, 'sucesso')
}

export function toast_erro(mensagem: string) {
  toast(mensagem, 'erro')
}

export function toast_aviso(mensagem: string) {
  toast(mensagem, 'aviso')
}

function removerToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id)
  notify()
}

const cores: Record<ToastTipo, string> = {
  sucesso: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  erro: 'border-rose-300 bg-rose-50 text-rose-800',
  aviso: 'border-amber-300 bg-amber-50 text-amber-800',
}

const icones: Record<ToastTipo, string> = {
  sucesso: '\u2713',
  erro: '\u2717',
  aviso: '!',
}

function ToastItem({ item, onRemove }: { item: ToastItem; onRemove: () => void }) {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisivel(true))
    const timer = setTimeout(() => {
      setVisivel(false)
      setTimeout(onRemove, 300)
    }, 4000)
    return () => clearTimeout(timer)
  }, [onRemove])

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300 ${cores[item.tipo]} ${
        visivel ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/60 text-sm font-bold">
        {icones[item.tipo]}
      </span>
      <p className="text-sm font-medium">{item.mensagem}</p>
      <button onClick={() => { setVisivel(false); setTimeout(onRemove, 300) }} className="ml-auto shrink-0 text-lg leading-none opacity-50 hover:opacity-100">
        &times;
      </button>
    </div>
  )
}

export function ToastContainer() {
  const items = useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => toasts,
  )

  const handleRemove = useCallback((id: number) => removerToast(id), [])

  if (items.length === 0) return null

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[9999] flex w-80 flex-col gap-2">
      {items.map((item) => (
        <div key={item.id} className="pointer-events-auto">
          <ToastItem item={item} onRemove={() => handleRemove(item.id)} />
        </div>
      ))}
    </div>
  )
}
