<!-- src/views/Login.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import ManagerLoginForm from '@/components/auth/ManagerLoginForm.vue'
import StaffLoginForm from '@/components/auth/StaffLoginForm.vue'
import logo from '@/assets/images/logo.png'

type LoginTab = 'manager' | 'staff'

const activeTab = ref<LoginTab>('manager')

const currentComponent = computed(() =>
  activeTab.value === 'manager' ? ManagerLoginForm : StaffLoginForm
)
</script>

<template>
  <div class="auth-wrap">
    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
      <div class="row w-100 justify-content-center align-items-center auth-row">
        <!-- Sol: Tanıtım Paneli (lg ve üzeri) -->
        <div class="col-lg-5 d-none d-lg-block">
          <div class="auth-aside p-4 rounded-4">
            <div class="d-flex align-items-center gap-2 mb-3">
              <img :src="logo" alt="Grena POS Logo" class="auth-logo" />
              <div class="d-flex flex-column">
                <span class="auth-brand">Grena POS</span>
                <span class="auth-sub small">Kuaför &amp; Güzellik için modern POS</span>
              </div>
              <span class="badge auth-beta ms-1">BETA</span>
            </div>

            <p class="small auth-text mb-3">
              Adisyon, randevu ve gelir–gider yönetimini tek ekranda toplayarak
              salonunun günlük iş yükünü hafiflet.
            </p>

            <ul class="list-unstyled small d-grid gap-2 mb-0">
              <li class="d-flex gap-2">
                <i class="bi bi-check2-circle text-success"></i>
                <span>Gerçek zamanlı POS &amp; randevu eşitleme</span>
              </li>
              <li class="d-flex gap-2">
                <i class="bi bi-check2-circle text-success"></i>
                <span>Yönetici ve personel için ayrı giriş ekranı</span>
              </li>
              <li class="d-flex gap-2">
                <i class="bi bi-check2-circle text-success"></i>
                <span>İlk 14 gün ücretsiz deneme</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Sağ: Giriş Kartı + Tablar -->
        <div class="col-12 col-md-8 col-lg-5">
          <div class="auth-card card border-0 rounded-4">
            <div class="card-body p-4 p-lg-5">
              <!-- Mobilde logo -->
              <div class="text-center mb-4 d-lg-none">
                <div class="d-inline-flex align-items-center gap-2 mb-2">
                  <img :src="logo" alt="Grena POS Logo" class="auth-logo" />
                  <span class="auth-brand">Grena POS</span>
                  <span class="badge auth-beta">BETA</span>
                </div>
                <p class="small auth-sub mb-0">Hesabınıza giriş yapın</p>
              </div>

              <!-- Tab Switch -->
              <div class="btn-group w-100 auth-tabs mb-4" role="tablist" aria-label="Giriş tipi">
                <button
                  type="button"
                  class="btn auth-tab"
                  :class="{ active: activeTab === 'manager' }"
                  @click="activeTab = 'manager'"
                >
                  <i class="bi bi-person-gear me-1"></i>
                  Salon Yönetici Girişi
                </button>
                <button
                  type="button"
                  class="btn auth-tab"
                  :class="{ active: activeTab === 'staff' }"
                  @click="activeTab = 'staff'"
                >
                  <i class="bi bi-people me-1"></i>
                  Salon Personel Girişi
                </button>
              </div>

              <!-- Seçili form (animasyonlu geçiş) -->
              <Transition name="tab-fade" mode="out-in">
                <component :is="currentComponent" :key="activeTab" />
              </Transition>
            </div>
          </div>

          <!-- Küçük alt bilgi -->
          <p class="text-center small text-muted mt-3 d-none d-md-block auth-footnote">
            Grena POS — Kuaför &amp; güzellik işletmeleri için gelir–gider ve randevu yönetimi
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Sayfa arka planı — light/dark uyumlu, hafif hareketli aurora hissi */
.auth-wrap {
  min-height: 100vh;
  background:
    radial-gradient(140% 200% at 0% 0%, color-mix(in srgb, var(--brand, #c79a00) 14%, transparent) 0%, transparent 60%),
    radial-gradient(140% 200% at 100% 0%, color-mix(in srgb, var(--brand, #c79a00) 10%, transparent) 0%, transparent 60%),
    color-mix(in srgb, var(--bs-body-bg) 96%, #020617 4%);
  display: flex;
  align-items: stretch;
}

.min-vh-100 {
  min-height: 100vh !important;
}

.auth-row {
  width: 100%;
}

/* Sol tanıtım paneli — hafif parlayan gradient + yumuşak hareket */
.auth-aside {
  border-radius: 1.5rem;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 95%, transparent);
  background:
    radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--brand, #c79a00) 18%, transparent) 0%, transparent 55%),
    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--brand, #c79a00) 12%, transparent) 0%, transparent 55%),
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--surface-2, var(--bs-body-bg)) 85%, #020617 15%) 0%,
      color-mix(in srgb, var(--surface, var(--bs-body-bg)) 92%, #020617 8%) 60%
    );
  color: var(--bs-body-color);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  position: relative;
  overflow: hidden;
  animation: aside-float 7s ease-in-out infinite alternate;
}

.auth-aside::before {
  content: "";
  position: absolute;
  inset: -40%;
  background:
    radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--brand, #c79a00) 20%, transparent) 0%, transparent 55%),
    radial-gradient(circle at 100% 0%, color-mix(in srgb, #fbbf24 16%, transparent) 0%, transparent 55%);
  opacity: 0.16;
  filter: blur(12px);
  transform: translate3d(0, 0, 0);
  animation: glow-move 14s linear infinite;
  pointer-events: none;
}

@keyframes glow-move {
  0%   { transform: translate3d(-8%, -4%, 0); opacity: 0.14; }
  50%  { transform: translate3d(4%, 2%, 0);   opacity: 0.22; }
  100% { transform: translate3d(10%, -6%, 0); opacity: 0.16; }
}

@keyframes aside-float {
  0%   { transform: translateY(0px);   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45); }
  100% { transform: translateY(-4px);  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.5); }
}

.auth-logo {
  height: 32px;
  width: auto;
}

.auth-brand {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.auth-sub {
  color: color-mix(in srgb, var(--bs-body-color) 80%, #9ca3af 20%);
}

.auth-text {
  color: color-mix(in srgb, var(--bs-body-color) 85%, #e5e7eb 15%);
}

/* BETA rozeti */
.auth-beta {
  border-radius: 999px;
  border: 1px solid
    color-mix(in srgb, var(--brand, #c79a00) 60%, var(--bs-border-color) 40%);
  background:
    radial-gradient(circle at 0% 0%, color-mix(in srgb, var(--brand, #c79a00) 40%, transparent) 0%, transparent 65%),
    color-mix(in srgb, var(--brand, #c79a00) 18%, var(--bs-body-bg) 82%);
  color: var(--bs-body-color);
  font-size: 0.65rem;
  padding: 0.1rem 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* Giriş kartı — yumuşak pop-in animasyon + hover micro interaction */
.auth-card {
  border-radius: 1.5rem;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--brand, #c79a00) 4%, transparent), transparent),
    color-mix(in srgb, var(--surface, var(--bs-body-bg)) 100%, transparent);
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 92%, transparent);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.22);
  animation: card-pop 0.45s ease-out;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.auth-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.26);
  border-color: color-mix(in srgb, var(--brand, #c79a00) 26%, var(--bs-border-color) 74%);
}

@keyframes card-pop {
  0% {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
  60% {
    opacity: 1;
    transform: translateY(-2px) scale(1.01);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Tab butonları */
.auth-tabs {
  position: relative;
  background: color-mix(in srgb, var(--surface-2, var(--bs-body-bg)) 96%, #020617 4%);
  border-radius: 999px;
  padding: 4px;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 92%, transparent);
  overflow: hidden;
}

.auth-tab {
  position: relative;
  flex: 1;
  border-radius: 999px !important;
  border: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding-block: 0.45rem;
  color: color-mix(in srgb, var(--bs-body-color) 70%, #9ca3af 30%);
  background: transparent;
  transition: color 0.18s ease, transform 0.18s ease;
}

.auth-tab.active {
  background: linear-gradient(135deg, var(--brand-600, #c79a00), var(--brand, #fbbf24));
  color: #0b1220;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  transform: translateY(-1px);
}

/* Tab geçiş animasyonu (formlar için) */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(4px) scale(0.99);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.99);
}

/* Küçük alt not */
.auth-footnote {
  opacity: 0.85;
}

/* Küçük ekran ayarları */
@media (max-width: 991.98px) {
  .auth-card {
    box-shadow: 0 14px 30px rgba(15, 23, 42, 0.35);
  }
  .auth-aside {
    animation: none;
  }
}

@media (max-width: 576px) {
  .card-body {
    padding: 1.75rem !important;
  }
}
</style>
