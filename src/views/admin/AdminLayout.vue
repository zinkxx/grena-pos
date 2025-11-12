<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'
const auth = useAuth()
const router = useRouter()

function logout() {
  auth.logout().finally(() => router.push('/login'))
}
</script>

<template>
  <div class="admin-wrap d-flex">
    <!-- Sidebar -->
    <aside class="admin-sidebar d-none d-lg-flex flex-column p-3" style="gap: 0.75rem">
      <div class="brand h5 mb-3">Grena POS</div>

      <nav class="nav nav-pills flex-column gap-1">
        <RouterLink class="nav-link" :to="{ name: 'admin-dashboard' }">Panel</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'admin-customers' }">Müşteriler</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'admin-appointments' }">Randevular</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'admin-expenses' }">Gider</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'admin-incomes' }">Gelir</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'admin-staff' }">Çalışanlar</RouterLink>
      </nav>

      <div class="mt-auto small text-muted">
        <div>{{ auth.user?.name }}</div>
        <div class="text-truncate">{{ auth.user?.email }}</div>
      </div>
    </aside>

    <!-- Content -->
    <div class="admin-content d-flex flex-column w-100">
      <!-- Topbar (mobil/desktop) -->
      <div class="admin-topbar d-flex align-items-center justify-content-between px-3 py-2">
        <div class="d-lg-none">
          <!-- Basit mobil menü: sadece sayfa adı -->
          <strong>Yönetim</strong>
        </div>
        <div class="ms-auto d-flex align-items-center" style="gap: 0.5rem">
          <RouterLink to="/" class="btn btn-sm btn-outline-secondary">Site</RouterLink>
          <button class="btn btn-sm btn-outline-danger" @click="logout">Çıkış</button>
        </div>
      </div>

      <!-- Sayfa içeriği -->
      <div class="p-3">
        <RouterView />
      </div>
    </div>
  </div>
</template>
