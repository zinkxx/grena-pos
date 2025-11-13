<!-- src/components/admin/AdminFooterBar.vue -->
<script setup lang="ts">
const year = new Date().getFullYear()
const appVersion = 'v0.1.0'

function handleInstallClick() {
  // TODO: beforeinstallprompt event'ini yakalayıp burada kullan
  console.log('PWA install tıklandı (implement edilecek)')
}
</script>

<template>
  <footer class="gpad-footer">
    <div class="container-fluid gpad-footer-inner">
      <!-- Sol: telif -->
      <div class="gpad-footer-left">
        <span class="gpad-footer-text">
          © {{ year }} Grena POS • Yönetici Paneli
        </span>
      </div>

      <!-- Orta: DevNet badge -->
      <div class="gpad-footer-center">
        <span class="gpad-footer-devnet">
          <img
            src="https://www.devtechnic.com.tr/images/logo.png"
            alt="DevNet Logo"
            class="gpad-footer-devnet-logo"
          />
          <span class="gpad-footer-devnet-text">
            DevNet tarafından geliştirilmektedir
          </span>
        </span>
      </div>

      <!-- Sağ: PWA + versiyon -->
      <div class="gpad-footer-right">
        <button
          type="button"
          class="gpad-footer-link"
          @click="handleInstallClick"
        >
          <i class="bi bi-phone me-1" />
          Uygulamayı yükle
        </button>
        <span class="gpad-footer-meta d-none d-sm-inline">
          {{ appVersion }} · PWA hazır
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.gpad-footer {
  --gpad-footer-brand: var(--brand, #c79a00);
  --gpad-footer-border: color-mix(in srgb, var(--bs-border-color, #e5e7eb) 88%, transparent);

  border-top: 1px solid var(--gpad-footer-border);
  /* Header / dashboard ile aynı familya ama çok hafif */
  background:
    radial-gradient(
      80% 160% at 0% 100%,
      color-mix(in srgb, var(--gpad-footer-brand) 5%, transparent) 0%,
      transparent 55%
    ),
    color-mix(in srgb, var(--bs-body-bg) 99%, #fefce8 1%);
  font-size: 0.8rem;
}

.gpad-footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-block: 0.45rem;
}

/* Sol / orta / sağ bloklar */
.gpad-footer-left,
.gpad-footer-center,
.gpad-footer-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Metinler */
.gpad-footer-text,
.gpad-footer-meta {
  color: color-mix(in srgb, var(--bs-body-color) 78%, #9ca3af 22%);
  white-space: nowrap;
}

/* DevNet badge – header/dash ile uyumlu mini pill */
.gpad-footer-devnet {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.16rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--gpad-footer-border);
  background: color-mix(in srgb, var(--bs-body-bg) 96%, #0f172a 4%);
}

.gpad-footer-devnet-logo {
  height: 14px;
  width: auto;
}

.gpad-footer-devnet-text {
  white-space: nowrap;
  color: color-mix(in srgb, var(--bs-body-color) 86%, #e5e7eb 14%);
}

/* PWA link (sade buton/pill) */
.gpad-footer-link {
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
  font-size: 0.8rem;
  font-weight: 600;
  color: color-mix(in srgb, var(--gpad-footer-brand) 80%, var(--bs-body-color) 20%);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
}
.gpad-footer-link:hover {
  text-decoration: underline;
}

/* Küçük ekranlar: alt alta hizala */
@media (max-width: 575.98px) {
  .gpad-footer-inner {
    flex-direction: column;
    align-items: flex-start;
    padding-inline: 0.75rem;
  }

  .gpad-footer-center {
    order: 3;
  }

  .gpad-footer-right {
    order: 2;
  }

  .gpad-footer-text,
  .gpad-footer-meta {
    white-space: normal;
  }
}
</style>
