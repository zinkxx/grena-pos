// main.ts — Grena POS
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/theme.css'

// Bootstrap (önce CSS, sonra JS bundle)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'
import router from './router'

import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)
app.use(MotionPlugin)

app.use(createPinia())
app.use(router)
app.use(MotionPlugin) // opsiyonel ama header/CTA hover'ları için önerilir

app.mount('#app')

// PWA kayıt — production'da çalışır (vite-plugin-pwa)
if ('serviceWorker' in navigator) {
  // not: dynamic import ile ağaç sarsıntısı (tree-shaking) korunur
  import('virtual:pwa-register').then(({ registerSW }) => {
    registerSW({
      immediate: true,
      onNeedRefresh() {
        // buraya toast/snackbar entegre edebilirsin
        console.log('Yeni sürüm hazır (SW).')
      },
      onOfflineReady() {
        console.log('Offline kullanım hazır.')
      },
    })
  })
}
