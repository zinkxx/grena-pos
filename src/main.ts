import { createPinia } from 'pinia'
import { createApp } from 'vue'

import './assets/theme.css'
// Bootstrap (önce CSS, sonra JS bundle)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// PWA kayıt — production'da çalışır (vite-plugin-pwa)
if ('serviceWorker' in navigator) {
  import('virtual:pwa-register').then(({ registerSW }) => {
    registerSW({
      immediate: true,
      onNeedRefresh() {
        // istersen toast gösteririz; şimdilik boş
        console.log('Yeni sürüm hazır (SW).')
      },
      onOfflineReady() {
        console.log('Offline kullanım hazır.')
      },
    })
  })
}
