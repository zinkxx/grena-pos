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
    class="navbar navbar-expand-lg border-bottom sticky-top gp-header adv"
    :class="{ 'is-scrolled': scrolled }"
    aria-label="Grena POS Üst Menü"
  >
    <div class="container">
      <!-- Marka / Logo -->
      <RouterLink to="/" class="navbar-brand d-inline-flex align-items-center gap-2">
        <img
          :src="logo"
          alt="Grena POS"
          class="brand-logo"
        />
        <span class="brand-text">Grena POS</span>
        <span class="badge beta-badge">BETA</span>
      </RouterLink>

      <!-- Hamburger -->
      <button
        class="navbar-toggler"
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
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link link-underline">Anasayfa</RouterLink>
          </li>
          <li class="nav-item"><a href="#hizmetler" class="nav-link link-underline">Hizmetler</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Çözümler
            </a>
            <ul class="dropdown-menu shadow-sm">
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
            class="btn btn-sm btn-outline-primary btn-ghost"
            @click="promptInstall"
          >
            <i class="bi bi-download"></i>
            <span class="d-none d-sm-inline">Uygulamayı Yükle</span>
          </button>

          <!-- Tema -->
          <button
            type="button"
            class="btn btn-outline-secondary btn-sm btn-ghost theme-toggle"
            @click="toggle"
            :aria-label="mode === 'dark' ? 'Açık tema' : 'Koyu tema'"
          >
            <i v-if="mode === 'dark'" class="bi bi-sun"></i>
            <i v-else class="bi bi-moon"></i>
          </button>

          <!-- Giriş -->
          <RouterLink to="/login" class="btn btn-sm btn-brand text-dark fw-semibold">
            Giriş Yap
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Köprü: mevcut .gp-header tabanını kullanıyoruz; üzerine gelişmiş stiller */
.gp-header.adv {
  background: color-mix(in srgb, var(--surface) 88%, transparent);
  backdrop-filter: saturate(1.2) blur(8px);
  transition: background .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.gp-header.adv.is-scrolled { box-shadow: 0 4px 22px rgba(0,0,0,.06); }

/* Logo */
.brand-logo {
  height: 28px;
  width: auto;
  display: block;
}

/* Marka yazısı ve beta rozeti */
.brand-text {
  font-weight: 800;
  letter-spacing: .2px;
  background: linear-gradient(90deg, var(--brand-700), var(--brand));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.beta-badge {
  background: color-mix(in srgb, var(--brand) 18%, var(--surface));
  color: var(--bs-body-color);
  border: 1px solid var(--bs-border-color);
  font-weight: 600;
}

/* Link underline animasyonu */
.link-underline { position: relative; }
.link-underline::after {
  content: "";
  position: absolute;
  left: .6rem;
  right: .6rem;
  bottom: .35rem;
  height: 2px;
  background: currentColor;
  opacity: 0;
  transform: scaleX(.6);
  transition: transform .2s ease, opacity .2s ease;
}
.link-underline:hover::after,
.router-link-active.link-underline::after {
  opacity: .9;
  transform: scaleX(1);
}

/* Ghost butonlar (ince çerçeve + hover arka plan) */
.btn-ghost { border-color: var(--bs-border-color); background: transparent; }
.btn-ghost:hover { background: color-mix(in srgb, var(--brand) 10%, var(--surface)); }
.theme-toggle i { font-size: 1rem; }

/* Dropdown daha okunaklı */
.dropdown-menu { border-color: var(--bs-border-color); background: var(--surface); }
.dropdown-item:hover { background: color-mix(in srgb, var(--brand) 8%, var(--surface)); }

/* Küçük ekran iyileştirme */
@media (max-width: 991.98px) {
  .header-actions { padding-top: .5rem; }
}
</style>
