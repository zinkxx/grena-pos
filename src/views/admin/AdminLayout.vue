<!-- src/views/admin/AdminLayout.vue -->
<script setup lang="ts">
import AdminHeaderBar from '@/components/admin/AdminHeaderBar.vue'
import AdminFooterBar from '@/components/admin/AdminFooterBar.vue'
</script>

<template>
  <div class="gp-admin-layout">
    <AdminHeaderBar />

    <main class="gp-admin-main">
      <!-- admin iç sayfalar -->
      <router-view />
    </main>

    <AdminFooterBar />
  </div>
</template>

<style scoped>
.gp-admin-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* Lacivert zemin kalktı, tamamen tema body rengini kullanıyoruz */
  background: var(--bs-body-bg);
}

/* Orta alan – nefes alanı, arka planı layout ile aynı */
.gp-admin-main {
  flex: 1;
  padding-top: 0.75rem;     /* header’ın altında nefes alanı */
  padding-bottom: 0.75rem;  /* footer’dan önce nefes alanı */
  background: transparent;  /* view’ler kendi radialiyle çalışsın */
}
</style>
