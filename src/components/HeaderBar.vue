<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
import { usePWAInstall } from '@/composables/usePWAInstall'
const { mode, toggle } = useTheme()
const { canInstall, promptInstall } = usePWAInstall()
</script>

<template>
  <nav class="navbar navbar-expand-lg border-bottom sticky-top gp-header">
    <div class="container">
      <RouterLink to="/" class="navbar-brand">Grena POS</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><RouterLink to="/" class="nav-link">Anasayfa</RouterLink></li>
          <li class="nav-item"><a href="#hizmetler" class="nav-link">Hizmetler</a></li>
        </ul>

        <div class="d-flex align-items-center gap-2">
          <!-- PWA Install -->
          <button
            v-if="canInstall"
            type="button"
            class="btn btn-sm btn-outline-primary"
            @click="promptInstall"
          >
            Uygulamayı Yükle
          </button>

          <!-- Tema -->
          <button type="button" class="btn btn-outline-secondary btn-sm" @click="toggle">
            <span v-if="mode === 'dark'">☀️</span><span v-else>🌙</span>
          </button>

          <RouterLink to="/login" class="btn btn-sm btn-brand text-dark fw-semibold">
            Giriş Yap
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
