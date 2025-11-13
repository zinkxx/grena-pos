<!-- src/components/admin/dashboard/AlertsWidget.vue -->
<script setup lang="ts">
const props = defineProps<{
  alerts: {
    type: string
    text: string
    level: 'warning' | 'info' | 'danger'
  }[]
}>()
</script>

<template>
  <div class="dash-card rounded-3">
    <div class="dash-card-head d-flex align-items-center justify-content-between gap-2">
      <div>
        <h2 class="h6 mb-1 d-flex align-items-center gap-2">
          <i class="bi bi-exclamation-triangle"></i>
          <span>Uyarılar</span>
        </h2>
        <p class="small text-muted mb-0">
          Kritik stok, kasa ve sistem notları.
        </p>
      </div>
    </div>

    <div class="dash-card-body">
      <ul class="list-unstyled mb-0 d-grid gap-2">
        <li
          v-for="(al, i) in props.alerts"
          :key="i"
          class="d-flex align-items-start gap-2 alert-item"
          :data-level="al.level"
        >
          <span class="alert-dot"></span>
          <span class="small">{{ al.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
