// src/composables/useTheme.ts
import { onMounted, ref } from 'vue'

type Mode = 'light' | 'dark'
const LS_KEY = 'grena-theme'

const mode = ref<Mode>('light')

function apply(modeVal: Mode) {
  const el = document.documentElement // <html>
  el.setAttribute('data-theme', modeVal) // senin temanın
  el.setAttribute('data-bs-theme', modeVal) // Bootstrap 5.3 tema modu
}

export function useTheme() {
  onMounted(() => {
    const saved = localStorage.getItem(LS_KEY) as Mode | null
    if (saved === 'dark' || saved === 'light') {
      mode.value = saved
      apply(saved)
    } else {
      // sistemden başlat: koyuysa dark başlat, değilse light
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      mode.value = prefersDark ? 'dark' : 'light'
      apply(mode.value)
    }
  })

  function toggle() {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem(LS_KEY, mode.value)
    apply(mode.value)
  }

  return { mode, toggle }
}
