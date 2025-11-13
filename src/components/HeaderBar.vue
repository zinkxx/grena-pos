<script setup lang="ts">
import { computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useTheme } from '@/composables/useTheme'
import { usePWAInstall } from '@/composables/usePWAInstall'

// LOGO IMPORT
import logo from '@/assets/images/logo.png'

const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 8)

const { mode, toggle } = useTheme()
const { canInstall, promptInstall } = usePWAInstall()
</script>

<template>
  <nav
    class="navbar navbar-expand-lg gp-header"
    :class="{ 'is-scrolled': scrolled }"
    aria-label="Grena POS Üst Menü"
  >
    <div class="container gp-header-inner">
      <!-- Marka / Logo -->
      <RouterLink to="/" class="navbar-brand d-inline-flex align-items-center gp-brand">
        <img
          :src="logo"
          alt="Grena POS"
          class="brand-logo"
        />
        <span class="brand-title">Grena POS</span>
        <span class="badge beta-badge ms-2">BETA</span>
      </RouterLink>

      <!-- Hamburger -->
      <button
        class="navbar-toggler gp-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Menüyü Aç"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menü -->
      <div class="collapse navbar-collapse gp-nav-collapse" id="mainNav">
        <ul class="navbar-nav ms-lg-4 me-auto mb-2 mb-lg-0 gp-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link gp-nav-link link-underline">
              Anasayfa
            </RouterLink>
          </li>
          <li class="nav-item">
            <a href="#hizmetler" class="nav-link gp-nav-link link-underline">Hizmetler</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link gp-nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Çözümler
            </a>
            <ul class="dropdown-menu gp-dropdown">
              <li><RouterLink class="dropdown-item" to="/pos">Adisyon & POS</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/reports">Raporlama</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/appointments">Randevu</RouterLink></li>
            </ul>
          </li>
        </ul>

        <!-- Sağ Aksiyonlar -->
        <div class="d-flex align-items-center gap-2 header-actions">
          <!-- PWA Install -->
          <button
            v-if="canInstall"
            type="button"
            class="btn btn-sm gp-btn-ghost gp-install-btn"
            @click="promptInstall"
          >
            <i class="bi bi-download me-1"></i>
            <span class="d-none d-sm-inline">Uygulamayı Yükle</span>
          </button>

          <!-- Tema -->
          <button
            type="button"
            class="btn btn-sm gp-btn-ghost gp-theme-toggle"
            @click="toggle"
            :aria-label="mode === 'dark' ? 'Açık tema' : 'Koyu tema'"
          >
            <i v-if="mode === 'dark'" class="bi bi-sun"></i>
            <i v-else class="bi bi-moon"></i>
          </button>

          <!-- Giriş -->
          <RouterLink
            to="/login"
            class="btn btn-sm gp-btn-brand fw-semibold"
          >
            Giriş Yap
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* ===================== Genel Header ===================== */
/* Hem light hem dark’ta çalışsın diye tamamen Bootstrap değişkenleri ve brand var üzerinden gidiyoruz */
.gp-header {
  position: sticky;
  top: 0;
  z-index: 30;
  padding-block: 0.6rem;
  background: color-mix(in srgb, var(--bs-body-bg) 92%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid color-mix(in srgb, var(--bs-border-color) 85%, transparent);
  transition:
    padding 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.gp-header.is-scrolled {
  padding-block: 0.45rem;
  background: color-mix(in srgb, var(--bs-body-bg) 98%, transparent);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.35);
  border-bottom-color: color-mix(in srgb, var(--bs-border-color) 100%, transparent);
}

.gp-header-inner {
  min-height: 56px;
}

/* ===================== Marka ===================== */
.gp-brand {
  gap: 0.6rem;
}

.brand-logo {
  height: 30px;
  width: auto;
  display: block;
}

.brand-title {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--bs-body-color);
  white-space: nowrap;
}

/* Beta rozeti */
.beta-badge {
  align-self: center;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--brand, #c79a00) 60%, var(--bs-border-color) 40%);
  background: color-mix(in srgb, var(--brand, #c79a00) 18%, var(--bs-body-bg) 82%);
  color: var(--bs-body-color);
  font-size: 0.65rem;
  padding: 0.1rem 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* ===================== Nav linkler ===================== */
.gp-nav-link {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding-inline: 0.8rem;
  color: color-mix(in srgb, var(--bs-body-color) 65%, #6b7280 35%);
}

.gp-nav-link:hover {
  color: var(--brand, #c79a00);
}

/* Aktif router link */
.router-link-active.gp-nav-link {
  color: var(--brand, #c79a00);
}

/* İnce underline animasyonu (hem light hem dark’ta çalışır) */
.link-underline {
  position: relative;
}

.link-underline::after {
  content: "";
  position: absolute;
  left: 0.8rem;
  right: 0.8rem;
  bottom: 0.28rem;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--brand, #c79a00) 90%, #facc15 10%), var(--brand, #c79a00));
  opacity: 0;
  transform: scaleX(0.4);
  transform-origin: center;
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.link-underline:hover::after,
.router-link-active.link-underline::after {
  opacity: 1;
  transform: scaleX(1);
}

/* ===================== Dropdown ===================== */
.gp-dropdown {
  min-width: 220px;
  border-radius: 0.75rem;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 90%, transparent);
  background: color-mix(in srgb, var(--bs-body-bg) 96%, #020617 4%);
  padding-block: 0.3rem;
}

.gp-dropdown .dropdown-item {
  font-size: 0.8rem;
  padding: 0.45rem 0.9rem;
  color: var(--bs-body-color);
}

.gp-dropdown .dropdown-item:hover {
  background: color-mix(in srgb, var(--brand, #c79a00) 16%, var(--bs-body-bg) 84%);
}

/* ===================== Butonlar ===================== */
.gp-btn-ghost {
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 90%, transparent);
  background: transparent;
  color: var(--bs-body-color);
  padding-inline: 0.75rem;
}

.gp-btn-ghost:hover {
  background: color-mix(in srgb, var(--bs-body-color) 6%, var(--bs-body-bg) 94%);
  border-color: color-mix(in srgb, var(--brand, #c79a00) 50%, var(--bs-border-color) 50%);
}

.gp-theme-toggle {
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.gp-theme-toggle i {
  font-size: 1rem;
}

/* Brand (Giriş) butonu */
.gp-btn-brand {
  border-radius: 999px;
  padding-inline: 1rem;
  background: linear-gradient(135deg, var(--brand-600, #c79a00), var(--brand, #fbbf24));
  border: none;
  color: color-mix(in srgb, var(--bs-body-bg) 90%, #020617 10%);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.4);
}

.gp-btn-brand:hover {
  filter: brightness(1.03);
}

/* ===================== Toggler ===================== */
.gp-toggler {
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 90%, transparent);
  padding: 0.25rem 0.4rem;
}

.gp-toggler .navbar-toggler-icon {
  filter: invert( var(--gp-toggler-invert, 0) );
}

/* Bootstrap default ikon koyu olduğu için, dark temada invert:1, light’ta 0 istersen
   globalde :root[data-theme="dark"] vs ile --gp-toggler-invert’i 1 yapabilirsin */

/* ===================== Mobil ===================== */
@media (max-width: 991.98px) {
  .gp-nav-collapse {
    margin-top: 0.5rem;
    padding-top: 0.4rem;
    border-top: 1px solid color-mix(in srgb, var(--bs-border-color) 80%, transparent);
  }

  .gp-nav-link {
    padding-block: 0.45rem;
  }

  .header-actions {
    padding-top: 0.4rem;
    border-top: 1px dashed color-mix(in srgb, var(--bs-border-color) 70%, transparent);
  }
}
</style>
