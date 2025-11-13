<!-- src/components/admin/dashboard/RecentSalesWidget.vue -->
<script setup lang="ts">
const props = defineProps<{
  sales: {
    time: string
    ticket: string
    total: string
    method: string
    staff: string
  }[]
}>()
</script>

<template>
  <div class="dash-card rounded-3">
    <div class="dash-card-head d-flex align-items-center justify-content-between gap-2">
      <div>
        <h2 class="h6 mb-1 d-flex align-items-center gap-2">
          <i class="bi bi-receipt-cutoff"></i>
          <span>Son Satışlar</span>
        </h2>
        <p class="small text-muted mb-0">
          POS hareketlerini canlı takip edin.
        </p>
      </div>
      <button type="button" class="btn btn-ghost btn-sm">
        <i class="bi bi-box-arrow-up-right me-1"></i> Tümünü Gör
      </button>
    </div>

    <div class="dash-card-body">
      <ul class="list-unstyled mb-0 d-grid gap-2">
        <li
          v-for="s in props.sales"
          :key="s.ticket"
          class="d-flex align-items-center justify-content-between sales-item"
        >
          <div class="d-flex flex-column">
            <span class="small text-muted">
              <i class="bi bi-clock me-1"></i>{{ s.time }} · {{ s.ticket }}
            </span>
            <span class="small">
              {{ s.staff }} – <span class="text-muted">{{ s.method }}</span>
            </span>
          </div>
          <span class="fw-semibold sales-total">{{ s.total }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
