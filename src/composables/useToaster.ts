// Çok hafif bir toast sistemi (Bootstrap sınıflarıyla)
import { reactive } from 'vue'

type ToastKind = 'success' | 'danger' | 'info' | 'warning'

type ToastItem = {
  id: number
  kind: ToastKind
  msg: string
  timeout?: number
}

const state = reactive({
  items: [] as ToastItem[],
  nextId: 1,
})

function push(kind: ToastKind, msg: string, timeout = 2600) {
  const id = state.nextId++
  state.items.push({ id, kind, msg, timeout })
  // otomatik kaldır
  window.setTimeout(() => remove(id), timeout)
}

function remove(id: number) {
  const i = state.items.findIndex((t) => t.id === id)
  if (i >= 0) state.items.splice(i, 1)
}

export function useToaster() {
  return {
    items: state.items,
    push,
    success: (m: string, t?: number) => push('success', m, t),
    error: (m: string, t?: number) => push('danger', m, t),
    info: (m: string, t?: number) => push('info', m, t),
    warn: (m: string, t?: number) => push('warning', m, t),
    remove,
  }
}
