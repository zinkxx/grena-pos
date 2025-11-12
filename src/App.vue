<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import ToastContainer from '@/components/ToastContainer.vue'
</script>

<template>
  <HeaderBar />
  <router-view />
  <ToastContainer />
  <FooterBar />
</template>

<style>
/* genel stiller (isteğe bağlı) */
</style>
