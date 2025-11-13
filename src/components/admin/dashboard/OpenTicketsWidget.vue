<!-- src/components/admin/dashboard/OpenTicketsWidget.vue -->
<script setup lang="ts">
const props = defineProps<{
  tickets: {
    id: string
    chair: string
    customer: string
    staff: string
    total: string
    since: string
  }[]
}>()
</script>

<template>
  <div class="dash-card rounded-3">
    <div class="dash-card-head d-flex align-items-center justify-content-between gap-2">
      <div>
        <h2 class="h6 mb-1 d-flex align-items-center gap-2">
        <i class="bi bi-receipt"></i>
          <span>Açık Adisyonlar</span>
        </h2>
        <p class="small text-muted mb-0">
          Kapatılmamış fişler ve ilgili koltukları görün.
        </p>
      </div>
      <button type="button" class="btn btn-ghost btn-sm">
        <i class="bi bi-list-check me-1"></i> Tümünü Gör
      </button>
    </div>

    <div class="dash-card-body">
      <div class="table-responsive">
        <table class="table table-sm align-middle mb-0 dash-table">
          <thead>
            <tr>
              <th>Adisyon</th>
              <th>Koltuk</th>
              <th>Müşteri</th>
              <th>Personel</th>
              <th>Tutar</th>
              <th>Başlangıç</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="t in props.tickets"
              :key="t.id"
            >
              <td class="small">
                <span class="badge bg-dark-subtle text-body-emphasis">{{ t.id }}</span>
              </td>
              <td class="small text-muted">{{ t.chair }}</td>
              <td>{{ t.customer }}</td>
              <td class="small">
                <i class="bi bi-person-badge me-1"></i>{{ t.staff }}
              </td>
              <td class="fw-semibold">{{ t.total }}</td>
              <td class="small text-muted">
                <i class="bi bi-clock-history me-1"></i>{{ t.since }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
