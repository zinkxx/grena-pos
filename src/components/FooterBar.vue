<!-- ======================== Footer.vue — Grena POS • Geliştirilmiş ======================== -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logo from '@/assets/images/logo.png'

// Sabit linkler (istersen API’den besleyebilirsin)
const quickLinks = [
  { to: '/', label: 'Anasayfa' },
  { to: '/pricing', label: 'Fiyatlandırma' },
  { to: '/features', label: 'Özellikler' },
  { to: '/contact', label: 'İletişim' },
]

const moduleLinks = [
  { to: '/pos', label: 'Adisyon & POS' },
  { to: '/appointments', label: 'Randevu Yönetimi' },
  { to: '/reports', label: 'Raporlama & Analitik' },
  { to: '/cashflow', label: 'Gelir – Gider Takibi' },
]

const policyLinks = [
  { to: '/legal/privacy', label: 'Gizlilik' },
  { to: '/legal/terms', label: 'Kullanım Şartları' },
  { to: '/legal/cookies', label: 'Çerez Politikası' },
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="gp-footer pt-5 mt-5">
    <div class="container">
      <div class="row g-4 align-items-start mb-4">
        <!-- Marka ve kısa bilgi -->
        <div class="col-12 col-md-4">
          <RouterLink
            to="/"
            class="footer-brand d-inline-flex align-items-center gap-2 text-decoration-none mb-2"
          >
            <img :src="logo" alt="Grena POS Logo" class="footer-logo-img" />
            <div class="d-flex flex-column">
              <span class="footer-brand-text">Grena POS</span>
              <span class="badge beta-badge align-self-start mt-1">BETA</span>
            </div>
          </RouterLink>

          <p class="mt-2 text-muted mb-3 small">
            Kuaför ve güzellik işletmeleri için
            <strong>adisyon, randevu ve gelir–gider</strong> yönetimini tek ekranda toplayan modern POS çözümü.
          </p>
          <div class="d-flex flex-wrap gap-2 small">
            <span class="badge border text-muted">
              <i class="bi bi-shield-lock me-1"></i> KVKK Uyumlu
            </span>
            <span class="badge border text-muted">
              <i class="bi bi-hdd-network me-1"></i> TR Veri Merkezi
            </span>
            <span class="badge border text-muted">
              <i class="bi bi-lock me-1"></i> SSL / HTTPS
            </span>
          </div>
        </div>

        <!-- Hızlı Bağlantılar -->
        <div class="col-6 col-md-2">
          <h6 class="mb-3">Site Haritası</h6>
          <ul class="list-unstyled d-grid gap-2 small">
            <li v-for="(l, i) in quickLinks" :key="i">
              <RouterLink :to="l.to" class="footer-link">{{ l.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Modüller -->
        <div class="col-6 col-md-3">
          <h6 class="mb-3">Modüller</h6>
          <ul class="list-unstyled d-grid gap-2 small">
            <li v-for="(m, i) in moduleLinks" :key="i">
              <RouterLink :to="m.to" class="footer-link">{{ m.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <!-- İletişim -->
        <div class="col-12 col-md-3">
          <h6 class="mb-3">İletişim</h6>
          <ul class="list-unstyled d-grid gap-2 mb-3 small">
            <li>
              <a href="mailto:info@grenapos.app" class="footer-link">
                <i class="bi bi-envelope me-2"></i>info@grenapos.app
              </a>
            </li>
            <li>
              <a href="tel:+90XXXXXXXXXX" class="footer-link">
                <i class="bi bi-telephone me-2"></i>+90 (___) ___ __ __
              </a>
            </li>
          </ul>
          <div class="d-flex flex-wrap gap-2">
            <a href="#" class="btn btn-sm btn-outline-secondary footer-social" aria-label="Twitter">
              <i class="bi bi-twitter-x"></i>
            </a>
            <a href="#" class="btn btn-sm btn-outline-secondary footer-social" aria-label="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="#" class="btn btn-sm btn-outline-secondary footer-social" aria-label="YouTube">
              <i class="bi bi-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <hr class="my-3" />

      <!-- Alt Çizgi -->
      <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 pb-4">
        <div class="small text-muted text-center text-md-start">
          © {{ year }} Grena POS — Kuaför Adisyon &amp; Gelir–Gider
        </div>
        <div class="small text-center">
          <a
            href="https://devtechnic.com.tr"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            DevNet tarafından geliştirilmektedir
          </a>
        </div>
        <ul class="list-inline m-0 small text-center text-md-end">
          <li class="list-inline-item" v-for="(p, i) in policyLinks" :key="i">
            <RouterLink :to="p.to" class="footer-link">{{ p.label }}</RouterLink>
            <span v-if="i < policyLinks.length - 1" class="text-muted"> · </span>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.gp-footer {
  background: linear-gradient(180deg, var(--surface-2), var(--surface));
  border-top: 1px solid var(--bs-border-color);
}

/* Marka blok */
.footer-brand {
  color: var(--bs-body-color);
}
.footer-logo-img {
  height: 32px;
  width: auto;
  display: block;
}
.footer-brand-text {
  font-weight: 800;
  letter-spacing: 0.2px;
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

/* Linkler */
.footer-link {
  color: var(--bs-body-color);
  text-decoration: none;
  opacity: 0.9;
}
.footer-link:hover {
  color: var(--bs-body-color);
  opacity: 1;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Sosyal ikonlar */
.footer-social {
  border-color: var(--bs-border-color);
}
.footer-social:hover {
  background: color-mix(in srgb, var(--brand) 10%, var(--surface));
}

/* Ayırıcı */
hr {
  border-color: var(--bs-border-color);
  opacity: 1;
}

/* Küçük ekran uyumu */
@media (max-width: 767.98px) {
  .gp-footer {
    text-align: left;
  }
}
</style>
