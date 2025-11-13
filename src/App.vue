<!-- src/App.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import ToastContainer from '@/components/ToastContainer.vue'

const route = useRoute()

// /admin ile başlayan tüm rotalarda public header/footer'ı gizleyelim
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <!-- Public site header (admin dışında) -->
  <HeaderBar v-if="!isAdminRoute" />

  <!-- Sayfa içeriği / admin layout dahil -->
  <router-view />

  <ToastContainer />

  <!-- Public site footer (admin dışında) -->
  <FooterBar v-if="!isAdminRoute" />
</template>

<style>
/* genel stiller (isteğe bağlı) */
</style>
