import { useToaster } from '@/composables/useToaster'
import { onMounted, ref } from 'vue'

export function usePWAUpdates() {
  const toast = useToaster()
  const needsRefresh = ref(false)
  let wb: any

  onMounted(async () => {
    if ('serviceWorker' in navigator) {
      const { registerSW } = await import('virtual:pwa-register')
      const updateSW = registerSW({
        immediate: true,
        onNeedRefresh() {
          needsRefresh.value = true
          toast.info('Yeni sürüm hazır. Yenilemek ister misin?')
        },
        onOfflineReady() {
          toast.success('Çevrimdışı kullanım hazır! ✅')
        },
      })
      wb = updateSW
    }
  })

  function refresh() {
    if (wb) wb(true) // service worker’ı beklemeden uygula
    location.reload()
  }

  return { needsRefresh, refresh }
}
