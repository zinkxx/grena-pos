import { useToaster } from '@/composables/useToaster'
import { onMounted, ref } from 'vue'

type BIEvent = Event & { prompt: () => Promise<void> }

const canInstall = ref(false)
let deferredPrompt: BIEvent | null = null

export function usePWAInstall() {
  const toast = useToaster()

  async function promptInstall() {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    // Kullanıcı seçiminden sonra bu event geçersizleşir
    deferredPrompt = null
    canInstall.value = false
  }

  onMounted(() => {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault()
      deferredPrompt = e as BIEvent
      canInstall.value = true
      toast.info('Uygulamayı ana ekrana ekleyebilirsin.')
    })

    window.addEventListener('appinstalled', () => {
      canInstall.value = false
      deferredPrompt = null
      toast.success('Grena POS yüklendi! 🎉')
    })
  })

  return { canInstall, promptInstall }
}
