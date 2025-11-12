/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '@motionone/vue';
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

