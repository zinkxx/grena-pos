<!-- src/components/admin/dashboard/TodayAppointmentsWidget.vue -->
<script setup lang="ts">
const props = defineProps<{
  appointments: {
    time: string
    customer: string
    service: string
    staff: string
    status: string
  }[]
}>()
</script>

<template>
  <div class="dash-card rounded-3">
    <div class="dash-card-head d-flex align-items-center justify-content-between gap-2">
      <div>
        <h2 class="h6 mb-1 d-flex align-items-center gap-2">
          <i class="bi bi-calendar-check"></i>
          <span>Bugün Randevular</span>
        </h2>
        <p class="small text-muted mb-0">
          Zaman çizelgesini takip edin, boş/yoğun saatleri görün.
        </p>
      </div>
      <button type="button" class="btn btn-outline-brand btn-sm">
        <i class="bi bi-plus-circle me-1"></i> Yeni Randevu
      </button>
    </div>

    <div class="dash-card-body">
      <div class="table-responsive">
        <table class="table table-sm align-middle mb-0 dash-table">
          <thead>
            <tr>
              <th>Saat</th>
              <th>Müşteri</th>
              <th>Hizmet</th>
              <th>Personel</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="a in props.appointments"
              :key="a.time + a.customer"
            >
              <td class="text-muted small">{{ a.time }}</td>
              <td>{{ a.customer }}</td>
              <td class="text-muted small">{{ a.service }}</td>
              <td class="small">
                <i class="bi bi-person-badge me-1"></i>{{ a.staff }}
              </td>
              <td>
                <span class="badge status-badge" :data-status="a.status">
                  {{ a.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Alt: mini timeline bar (fake demo) -->
      <div class="mt-3">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <span class="small text-muted">
            Gün içi yoğunluk
          </span>
          <span class="small text-muted">
            <i class="bi bi-clock-history me-1"></i> 09:00 – 21:00
          </span>
        </div>
        <div class="tiny-bars" aria-hidden="true">
          <span v-for="n in 24" :key="n" class="bar"></span>
        </div>
      </div>
    </div>
  </div>
</template>
