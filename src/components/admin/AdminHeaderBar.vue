<!-- src/components/admin/AdminHeaderBar.vue -->
<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import logo from '@/assets/images/logo.png'
import { useAuth } from '@/stores/auth'

const auth = useAuth()
const route = useRoute()
const router = useRouter()

const displayName = computed(() => auth.user?.name || 'Yönetici')
const salonName = computed(() => auth.user?.salonName || 'Grena Studio')

const todayLabel = computed(() => {
  const d = new Date()
  return d.toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
  })
})

type Theme = 'dark' | 'light'
const theme = ref<Theme>('dark')

function applyTheme(t: Theme) {
  document.documentElement.setAttribute('data-bs-theme', t === 'light' ? 'light' : 'dark')
}

onMounted(() => {
  const saved = localStorage.getItem('gp-admin-theme')
  if (saved === 'light' || saved === 'dark') {
    theme.value = saved
  }
  applyTheme(theme.value)
})

watch(theme, (val) => {
  applyTheme(val)
  localStorage.setItem('gp-admin-theme', val)
})

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

/** Üst menü item'ları */
const navItems = [
  {
    key: 'appointments',
    label: 'Randevular',
    icon: 'bi-calendar3',
    to: { name: 'admin-appointments' },
  },
  {
    key: 'customers',
    label: 'Müşteriler',
    icon: 'bi-person-vcard',
    to: { name: 'admin-customers' },
  },
  {
    key: 'staff',
    label: 'Personel Yönetimi',
    icon: 'bi-people',
    to: { name: 'admin-staff' },
  },
  {
    key: 'finance',
    label: 'Gelir - Gider Yönetimi',
    icon: 'bi-cash-coin',
    to: { name: 'admin-expenses' },
  },
  {
    key: 'salon',
    label: 'Salon - Stok Yönetimi',
    icon: 'bi-shop',
    to: { name: 'admin-dashboard' },
  },
]

function isActive(item: { to: any; key: string }) {
  if (item.to.name && route.name === item.to.name) return true

  if (
    item.key === 'finance' &&
    (route.name === 'admin-expenses' || route.name === 'admin-incomes')
  ) {
    return true
  }
  return false
}

async function logout() {
  try {
    await auth.logout?.()
  } catch {
    // store'da yoksa sessizce geç
  }
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="gpad-header">
    <div class="gpad-header-inner container-fluid">
      <!-- Sol: logo + marka -->
      <div class="gpad-left">
        <RouterLink to="/admin" class="gpad-logo-link">
          <div class="gpad-logo-shell">
            <img :src="logo" alt="Grena POS Logo" class="gpad-logo-img" />
          </div>
        </RouterLink>

        <div class="gpad-brand">
          <span class="gpad-brand-title">Grena POS</span>
          <span class="gpad-brand-sub">
            {{ salonName }} • Yönetim
          </span>
        </div>
      </div>

      <!-- Orta: ana menü (lg+) -->
      <nav class="gpad-nav d-none d-lg-flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          class="gpad-nav-link"
          :class="{ 'gpad-nav-link-active': isActive(item) }"
        >
          <i :class="['bi', item.icon, 'gpad-nav-icon']" />
          <span class="gpad-nav-text">{{ item.label }}</span>
        </RouterLink>
      </nav>

      <!-- Orta (md: tarih pill) -->
      <div class="gpad-center d-none d-md-flex d-lg-none">
        <span class="gpad-date-pill">
          <i class="bi bi-calendar-event gpad-date-icon"></i>
          {{ todayLabel }}
        </span>
      </div>

      <!-- Sağ: tema, aksiyon ve kullanıcı -->
      <div class="gpad-right">
        <!-- Tema toggle -->
        <button
          type="button"
          class="gpad-btn gpad-btn-ghost gpad-btn-icon"
          @click="toggleTheme"
          :title="theme === 'dark' ? 'Açık tema' : 'Koyu tema'"
        >
          <i v-if="theme === 'dark'" class="bi bi-sun" />
          <i v-else class="bi bi-moon" />
        </button>

        <!-- Hızlı aksiyonlar (md+) -->
        <button
          type="button"
          class="gpad-btn gpad-btn-primary gpad-btn-sm d-none d-md-inline-flex"
        >
          <i class="bi bi-plus-circle me-1" />
          <span>Yeni Randevu</span>
        </button>

        <button
          type="button"
          class="gpad-btn gpad-btn-outline gpad-btn-sm d-none d-xl-inline-flex"
        >
          <i class="bi bi-cash-stack me-1" />
          <span>Kasa Özeti</span>
        </button>

        <!-- Mobil menü (lg-) -->
        <div class="dropdown d-lg-none">
          <button
            class="gpad-btn gpad-btn-ghost gpad-btn-icon gpad-menu-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-list" />
          </button>
          <ul class="dropdown-menu dropdown-menu-end gpad-dropdown-menu">
            <li v-for="item in navItems" :key="item.key">
              <RouterLink class="dropdown-item small" :to="item.to">
                <i :class="['bi', item.icon, 'me-2']" />
                {{ item.label }}
              </RouterLink>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li class="px-3 py-1 small text-muted">
              <i class="bi bi-calendar-event me-1" />{{ todayLabel }}
            </li>
          </ul>
        </div>

        <!-- Kullanıcı dropdown -->
        <div class="dropdown">
          <button
            class="gpad-btn gpad-btn-ghost gpad-btn-user dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span class="gpad-avatar">
              <i class="bi bi-person-fill" />
            </span>
            <span class="gpad-user-name d-none d-sm-inline">
              {{ displayName }}
            </span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end gpad-dropdown-menu">
            <li class="px-3 py-2 small text-muted d-block d-sm-none">
              {{ salonName }}
            </li>
            <li>
              <button class="dropdown-item text-danger" type="button" @click="logout">
                <i class="bi bi-box-arrow-right me-2" />Çıkış yap
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* ===================== ROOT / THEME ===================== */
.gpad-header {
  /* Dashboard ile aynı renk diline yaslanıyor */
  --gpad-brand: var(--brand, #c79a00);
  --gpad-brand-soft: color-mix(in srgb, var(--gpad-brand) 65%, #fde68a 35%);
  --gpad-border-soft: color-mix(in srgb, var(--bs-border-color, #e5e7eb) 90%, transparent);
  --gpad-text-soft: color-mix(in srgb, var(--bs-body-color, #020617) 80%, #9ca3af 20%);

  position: sticky;
  top: 0;
  z-index: 1030;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  background:
    radial-gradient(
      120% 180% at 0% 0%,
      color-mix(in srgb, var(--gpad-brand) 9%, transparent) 0%,
      transparent 55%
    ),
    radial-gradient(
      140% 200% at 100% -10%,
      color-mix(in srgb, var(--gpad-brand) 6%, transparent) 0%,
      transparent 55%
    ),
    color-mix(in srgb, var(--bs-body-bg, #0b1220) 96%, #020617 4%);
  border-bottom: 1px solid var(--gpad-border-soft);
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.4),
    0 0 0 1px color-mix(in srgb, var(--bs-border-color, #e5e7eb) 70%, transparent);
}

.gpad-header-inner {
  min-height: 3.25rem;
  padding-block: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

/* ===================== SOL BLOK ===================== */
.gpad-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
}

.gpad-logo-link {
  display: inline-flex;
  text-decoration: none;
}

.gpad-logo-shell {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 20%, var(--gpad-brand-soft), var(--gpad-brand));
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.gpad-logo-img {
  max-width: 20px;
  max-height: 20px;
  display: block;
}

.gpad-brand {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.gpad-brand-title {
  font-size: 0.84rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 800;
}

.gpad-brand-sub {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--gpad-text-soft);
}

/* ===================== ORTA NAV ===================== */
.gpad-nav {
  flex: 1;
  justify-content: center;
  gap: 0.35rem;
  max-width: 760px;
}

.gpad-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.32rem 0.9rem;
  border-radius: 999px;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.13em;
  font-weight: 600;
  text-decoration: none;
  color: color-mix(in srgb, var(--bs-body-color, #e5e7eb) 80%, #9ca3af 20%);
  border: 1px solid transparent;
  background: transparent;
  transition:
    background 0.12s ease,
    border-color 0.12s ease,
    color 0.12s ease,
    transform 0.08s ease;
}

.gpad-nav-icon {
  font-size: 0.9rem;
}

.gpad-nav-text {
  white-space: nowrap;
}

.gpad-nav-link:hover {
  background: color-mix(in srgb, var(--bs-body-bg, #0b1220) 90%, #111827 10%);
  border-color: var(--gpad-border-soft);
}

.gpad-nav-link-active {
  background: linear-gradient(135deg, var(--gpad-brand), var(--gpad-brand-soft));
  color: #020617;
  border-color: transparent;
}

/* ===================== TARİH PILL (MD) ===================== */
.gpad-center {
  align-items: center;
  justify-content: center;
}

.gpad-date-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 999px;
  border: 1px solid var(--gpad-border-soft);
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--gpad-brand) 10%, transparent),
      color-mix(in srgb, var(--bs-body-bg, #0b1220) 96%, #020617 4%)
    );
  font-size: 0.78rem;
  font-weight: 600;
  padding: 0.23rem 0.85rem;
  color: color-mix(in srgb, var(--bs-body-color, #e5e7eb) 90%, #fefce8 10%);
}

.gpad-date-icon {
  font-size: 0.9rem;
}

/* ===================== SAĞ BLOK ===================== */
.gpad-right {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* ===================== BUTON SİSTEMİ ===================== */
.gpad-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.34rem 0.9rem;
  line-height: 1.1;
  background: transparent;
  color: color-mix(in srgb, var(--bs-body-color, #e5e7eb) 90%, #e5e7eb 10%);
  cursor: pointer;
  transition:
    background 0.12s ease,
    border-color 0.12s ease,
    color 0.12s ease,
    transform 0.08s ease;
}

.gpad-btn-sm {
  padding: 0.28rem 0.8rem;
}

.gpad-btn-icon {
  width: 2rem;
  height: 2rem;
  padding: 0;
}

/* Primary: dashboard’daki KPI sarısı ile aynı accent hissi */
.gpad-btn-primary {
  background: linear-gradient(135deg, var(--gpad-brand), var(--gpad-brand-soft));
  color: #020617;
  border-color: transparent;
}

.gpad-btn-primary:hover {
  transform: translateY(-1px);
}

/* Outline: hafif çerçeve, sakin */
.gpad-btn-outline {
  background: transparent;
  border-color: var(--gpad-border-soft);
  color: color-mix(in srgb, var(--bs-body-color, #e5e7eb) 92%, #e5e7eb 8%);
}

.gpad-btn-outline:hover {
  background: color-mix(in srgb, var(--bs-body-bg, #0b1220) 94%, #e5e7eb 6%);
}

/* Ghost: icon buton + user için kullandığımız tip */
.gpad-btn-ghost {
  background: transparent;
  border-color: color-mix(in srgb, var(--bs-border-color, #e5e7eb) 70%, transparent);
  color: color-mix(in srgb, var(--bs-body-color, #e5e7eb) 88%, #9ca3af 12%);
}

.gpad-btn-ghost:hover {
  background: color-mix(in srgb, var(--bs-body-bg, #0b1220) 94%, #111827 6%);
}

.gpad-menu-toggle i {
  font-size: 1.15rem;
}

/* ===================== KULLANICI BLOĞU ===================== */
.gpad-btn-user {
  padding-inline: 0.6rem;
}

.gpad-avatar {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid var(--gpad-border-soft);
  background: color-mix(in srgb, var(--bs-body-bg, #0b1220) 94%, #fefce8 6%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.gpad-user-name {
  max-width: 120px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* Dropdown */
.gpad-dropdown-menu {
  border-radius: 0.7rem;
  border: 1px solid var(--gpad-border-soft);
  font-size: 0.85rem;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 991.98px) {
  .gpad-header-inner {
    padding-inline: 0.75rem;
  }
}

@media (max-width: 575.98px) {
  .gpad-brand-title {
    display: none;
  }

  .gpad-brand-sub {
    font-size: 0.76rem;
  }

  .gpad-logo-shell {
    width: 32px;
    height: 32px;
  }

  .gpad-header-inner {
    gap: 0.5rem;
  }
}
</style>
