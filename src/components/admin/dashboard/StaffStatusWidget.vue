<!-- src/components/admin/dashboard/StaffStatusWidget.vue -->
<script setup lang="ts">
const props = defineProps<{
  staff: {
    name: string
    role: string
    status: string
    color: 'success' | 'warning' | 'secondary'
  }[]
}>()
</script>

<template>
  <div class="dash-card rounded-3">
    <div class="dash-card-head d-flex align-items-center justify-content-between gap-2">
      <div>
        <h2 class="h6 mb-1 d-flex align-items-center gap-2">
          <i class="bi bi-people"></i>
          <span>Personel Durumu</span>
        </h2>
        <p class="small text-muted mb-0">
          Kim müsait, kim randevuda görün.
        </p>
      </div>
    </div>

    <div class="dash-card-body">
      <ul class="list-unstyled mb-0 d-grid gap-2">
        <li
          v-for="st in props.staff"
          :key="st.name"
          class="d-flex align-items-center justify-content-between staff-item"
        >
          <div class="d-flex align-items-center gap-2">
            <span class="staff-avatar">
              <i class="bi bi-person"></i>
            </span>
            <div class="d-flex flex-column">
              <span class="small fw-semibold">{{ st.name }}</span>
              <span class="small text-muted">{{ st.role }}</span>
            </div>
          </div>
          <span class="badge staff-status" :data-color="st.color">
            {{ st.status }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
