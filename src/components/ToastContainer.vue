<script setup lang="ts">
import { useToaster } from '@/composables/useToaster'
const toast = useToaster()
</script>

<template>
  <!-- Sağ üst stack -->
  <div class="gp-toasts position-fixed top-0 end-0 p-3" style="z-index: 1080">
    <div
      v-for="t in toast.items"
      :key="t.id"
      class="toast show align-items-center text-bg-light border-0 mb-2 shadow"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      :class="{
        'bg-success text-white': t.kind === 'success',
        'bg-danger text-white': t.kind === 'danger',
        'bg-info text-white': t.kind === 'info',
        'bg-warning': t.kind === 'warning',
      }"
    >
      <div class="d-flex">
        <div class="toast-body">{{ t.msg }}</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          aria-label="Kapat"
          @click="toast.remove(t.id)"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast {
  border-radius: 0.75rem;
}
</style>
