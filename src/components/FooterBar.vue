<!-- ======================== Footer.vue — Grena POS • Modern / Light-Dark Uyumlu ======================== -->
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
            class="footer-brand d-inline-flex align-items-center text-decoration-none mb-3"
          >
            <img :src="logo" alt="Grena POS Logo" class="footer-logo-img me-2" />
            <span class="footer-brand-text me-2">Grena POS</span>
            <span class="badge beta-badge">BETA</span>
          </RouterLink>

          <p class="mt-1 footer-text small">
            Kuaför ve güzellik işletmeleri için
            <strong>adisyon, randevu ve gelir–gider</strong> yönetimini bir araya getiren modern POS çözümü.
          </p>

          <div class="d-flex flex-wrap gap-2 mt-3 small">
            <span class="footer-chip">
              <i class="bi bi-shield-lock me-1"></i> KVKK Uyumlu
            </span>
            <span class="footer-chip">
              <i class="bi bi-hdd-network me-1"></i> TR Veri Merkezi
            </span>
            <span class="footer-chip">
              <i class="bi bi-lock me-1"></i> SSL / HTTPS
            </span>
          </div>
        </div>

        <!-- Hızlı Bağlantılar -->
        <div class="col-6 col-md-2">
          <h6 class="footer-title mb-3">Site Haritası</h6>
          <ul class="list-unstyled d-grid gap-2 small">
            <li v-for="(l, i) in quickLinks" :key="i">
              <RouterLink :to="l.to" class="footer-link">{{ l.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Modüller -->
        <div class="col-6 col-md-3">
          <h6 class="footer-title mb-3">Modüller</h6>
          <ul class="list-unstyled d-grid gap-2 small">
            <li v-for="(m, i) in moduleLinks" :key="i">
              <RouterLink :to="m.to" class="footer-link">{{ m.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <!-- İletişim -->
        <div class="col-12 col-md-3">
          <h6 class="footer-title mb-3">İletişim</h6>
          <ul class="list-unstyled d-grid gap-2 mb-3 small">
            <li>
              <a href="mailto:info@grenapos.app" class="footer-link d-inline-flex align-items-center">
                <i class="bi bi-envelope me-2"></i>info@grenapos.app
              </a>
            </li>
            <li>
              <a href="tel:+90XXXXXXXXXX" class="footer-link d-inline-flex align-items-center">
                <i class="bi bi-telephone me-2"></i>+90 (___) ___ __ __
              </a>
            </li>
          </ul>
          <div class="d-flex flex-wrap gap-2">
            <a href="#" class="footer-social" aria-label="Twitter">
              <i class="bi bi-twitter-x"></i>
            </a>
            <a href="#" class="footer-social" aria-label="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="#" class="footer-social" aria-label="YouTube">
              <i class="bi bi-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <hr class="my-3" />

      <!-- Alt Çizgi -->
      <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 pb-4">
        <div class="small footer-muted text-center text-md-start">
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
            <span v-if="i < policyLinks.length - 1" class="footer-muted"> · </span>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ===================== Genel Footer ===================== */
/* Hem light hem dark temaya uyumlu: tamamen Bootstrap + brand değişkenlerine dayanıyor */
.gp-footer {
  background: color-mix(in srgb, var(--bs-body-bg) 96%, #020617 4%);
  border-top: 1px solid color-mix(in srgb, var(--bs-border-color) 95%, transparent);
  color: var(--bs-body-color);
  font-size: 0.875rem;
}

/* Marka blok */
.footer-brand {
  color: var(--bs-body-color);
}

.footer-logo-img {
  height: 32px;
  width: auto;
  flex-shrink: 0;
}

.footer-brand-text {
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: var(--bs-body-color);
  white-space: nowrap;
}

/* Header ile uyumlu BETA rozeti */
.beta-badge {
  border-radius: 999px;
  border: 1px solid
    color-mix(in srgb, var(--brand, #c79a00) 60%, var(--bs-border-color) 40%);
  background: color-mix(in srgb, var(--brand, #c79a00) 18%, var(--bs-body-bg) 82%);
  color: var(--bs-body-color);
  font-size: 0.65rem;
  padding: 0.1rem 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* Açıklama metni */
.footer-text {
  color: color-mix(in srgb, var(--bs-body-color) 75%, #6b7280 25%);
  max-width: 30rem;
}

/* Küçük chip rozetler */
.footer-chip {
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 90%, transparent);
  padding: 0.25rem 0.6rem;
  color: color-mix(in srgb, var(--bs-body-color) 85%, #6b7280 15%);
  background: color-mix(in srgb, var(--bs-body-bg) 96%, #020617 4%);
}

/* Başlıklar */
.footer-title {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: color-mix(in srgb, var(--bs-body-color) 80%, #6b7280 20%);
}

/* Linkler */
.footer-link {
  color: color-mix(in srgb, var(--bs-body-color) 80%, #6b7280 20%);
  text-decoration: none;
  transition: color 0.15s ease, opacity 0.15s ease;
}

.footer-link:hover {
  color: var(--brand, #c79a00);
  opacity: 1;
  text-decoration: none;
}

/* Sosyal ikon butonları */
.footer-social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 90%, transparent);
  background: transparent;
  color: color-mix(in srgb, var(--bs-body-color) 80%, #6b7280 20%);
  font-size: 0.9rem;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    transform 0.1s ease;
}

.footer-social:hover {
  background: color-mix(in srgb, var(--brand, #c79a00) 16%, var(--bs-body-bg) 84%);
  border-color: color-mix(in srgb, var(--brand, #c79a00) 60%, var(--bs-border-color) 40%);
  color: #0b1220;
  transform: translateY(-1px);
}

/* Ayırıcı & muted metin */
hr {
  border-color: color-mix(in srgb, var(--bs-border-color) 90%, transparent);
  opacity: 1;
}

.footer-muted {
  color: color-mix(in srgb, var(--bs-body-color) 60%, #9ca3af 40%);
}

/* Küçük ekran uyumu */
@media (max-width: 767.98px) {
  .gp-footer {
    text-align: left;
  }
}
</style>
