<!-- src/components/auth/ManagerLoginForm.vue -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useToaster } from '@/composables/useToaster'

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPass = ref(false)

const auth = useAuth()
const router = useRouter()
const toast = useToaster()

const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
const passOk = computed(() => password.value.length >= 6)
const formOk = computed(() => emailOk.value && passOk.value && !auth.loading)

const LS_KEY = 'grena-remember-email-manager'

// DEMO kullanıcı bilgileri
const DEMO_EMAIL = 'demo@grena.pos'
const DEMO_PASS = 'demo123'

const emailInput = ref<HTMLInputElement | null>(null)
onMounted(() => {
  const saved = localStorage.getItem(LS_KEY)
  if (saved) {
    email.value = saved
    remember.value = true
  }
  emailInput.value?.focus()
})

async function submit(e?: Event) {
  e?.preventDefault()

  // --- DEMO GİRİŞ KONTROLÜ ---
  if (email.value.trim() === DEMO_EMAIL && password.value === DEMO_PASS) {
    // Demo kullanıcıyı store'a yazıyoruz (tipi sende nasıl ise ona göre genişletebilirsin)
    auth.user = {
      id: 0,
      name: 'Demo Yönetici',
      email: DEMO_EMAIL,
      role: 'manager',
      demo: true,
    } as any

    toast.success('Demo yönetici olarak giriş yapıldı.')
    // Doğrudan admin dashboard'a gönder
    router.push({ name: 'admin-dashboard' })
    return
  }

  // Normal login flow
  if (!formOk.value) return

  const ok = await auth.login(email.value.trim(), password.value)

  if (ok) {
    if (remember.value) localStorage.setItem(LS_KEY, email.value.trim())
    else localStorage.removeItem(LS_KEY)

    toast.success(`Hoş geldin, ${auth.user?.name || 'yönetici'}!`)
    const redirect = (router.currentRoute.value.query.redirect as string) || '/'
    router.push(redirect)
  } else {
    toast.error(auth.error || 'Giriş başarısız')
  }
}

function goForgot() {
  router.push({ path: '/forgot-password', query: { role: 'manager' } })
}

// Ayrı bir "Demo ile gir" butonu için
async function loginAsDemo() {
  email.value = DEMO_EMAIL
  password.value = DEMO_PASS
  remember.value = false
  await submit()
}
</script>

<template>
  <section class="manager-form">
    <header class="mb-3">
      <div class="d-flex align-items-center justify-content-between gap-2 mb-1">
        <h1 class="h5 mb-0 d-flex align-items-center gap-2">
          <span class="manager-dot"></span>
          <span>Salon Yönetici Girişi</span>
        </h1>
        <span class="badge role-badge">
          <i class="bi bi-person-gear me-1"></i>
          Tam Yetki
        </span>
      </div>
      <p class="text-muted small mb-0">
        Salon sahibi / yönetici hesabınızla giriş yapın. Kullanıcı, şube ve faturalama ayarlarına buradan ulaşırsınız.
      </p>
    </header>

    <form @submit="submit" novalidate class="manager-form-body">
      <!-- E-posta -->
      <div class="mb-3">
        <label class="form-label small" for="manager-email">E-posta</label>
        <div class="input-group auth-input-group">
          <span class="input-group-text">
            <i class="bi bi-envelope"></i>
          </span>
          <input
            id="manager-email"
            ref="emailInput"
            v-model="email"
            type="email"
            class="form-control"
            placeholder="yonetici@salon.com"
            :class="{ 'is-invalid': email && !emailOk }"
            autocomplete="username"
            required
          />
        </div>
        <div v-if="email && !emailOk" class="invalid-feedback d-block small">
          Geçerli bir e-posta girin.
        </div>
      </div>

      <!-- Şifre -->
      <div class="mb-3">
        <label class="form-label small" for="manager-password">Şifre</label>
        <div class="input-group auth-input-group has-toggle">
          <span class="input-group-text">
            <i class="bi bi-lock"></i>
          </span>
          <input
            id="manager-password"
            :type="showPass ? 'text' : 'password'"
            v-model="password"
            class="form-control"
            placeholder="••••••••"
            :class="{ 'is-invalid': password && !passOk }"
            autocomplete="current-password"
            required
          />
          <button
            type="button"
            class="btn btn-ghost btn-sm auth-toggle-pass"
            @click="showPass = !showPass"
            :aria-pressed="showPass ? 'true' : 'false'"
          >
            <i :class="showPass ? 'bi bi-eye-slash' : 'bi bi-eye'" />
          </button>
        </div>
        <div v-if="password && !passOk" class="invalid-feedback d-block small mt-1">
          Şifre en az 6 karakter olmalı.
        </div>
      </div>

      <!-- Beni hatırla + Şifre linki -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="form-check small">
          <input class="form-check-input" type="checkbox" id="manager-remember" v-model="remember" />
          <label class="form-check-label" for="manager-remember">Beni hatırla</label>
        </div>
        <button
          type="button"
          class="btn btn-link btn-sm p-0 small auth-link"
          @click="goForgot"
        >
          Şifremi unuttum
        </button>
      </div>

      <!-- Submit + güvenlik notu -->
      <div class="d-grid gap-2">
        <button class="btn btn-brand auth-submit-btn" :disabled="!formOk">
          <span v-if="auth.loading" class="spinner-border spinner-border-sm me-2"></span>
          Giriş Yap
        </button>

        <!-- DEMO BUTONU -->
        <button
          type="button"
          class="btn btn-ghost btn-sm w-100 demo-btn"
          @click="loginAsDemo"
        >
          <i class="bi bi-lightning-charge me-1"></i>
          Demo yönetici olarak dene
        </button>

        <div class="security-note small text-muted d-flex flex-column text-center mt-1">
          <span>
            <i class="bi bi-shield-lock me-1"></i>
            Şifreleriniz şifrelenmiş olarak saklanır, personelle paylaşmayın.
          </span>
          <span class="demo-hint mt-1">
            Demo bilgiler: <code>demo@grena.pos</code> / <code>demo123</code>
          </span>
        </div>
      </div>

      <p v-if="auth.error" class="visually-hidden" role="alert">{{ auth.error }}</p>

      <p class="small text-muted text-center mt-4 mb-0">
        Henüz Grena POS kullanmıyor musunuz?
        <button type="button" class="btn btn-link p-0 align-baseline auth-link">
          Satış ekibiyle iletişime geçin
        </button>
      </p>
    </form>
  </section>
</template>

<style scoped>
.manager-form {
  animation: manager-slide-in 0.28s ease-out;
}

/* Başlık yanındaki küçük durum göstergesi */
.manager-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 20%, #facc15, #c79a00);
  box-shadow: 0 0 0 0 rgba(199, 154, 0, 0.6);
  animation: manager-dot-pulse 1.6s ease-out infinite;
}

/* Rol etiketi */
.role-badge {
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--brand, #c79a00) 55%, var(--bs-border-color) 45%);
  background: color-mix(in srgb, var(--brand, #c79a00) 16%, var(--surface, var(--bs-body-bg)) 84%);
  color: var(--bs-body-color);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 0.18rem 0.7rem;
}

/* Input grup base */
.auth-input-group {
  border-radius: 0.9rem;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 92%, transparent);
  background: color-mix(in srgb, var(--surface-2, var(--bs-body-bg)) 96%, #020617 4%);
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, transform 0.18s ease;
}

.auth-input-group:focus-within {
  border-color: color-mix(in srgb, var(--brand, #c79a00) 60%, var(--bs-border-color) 40%);
  box-shadow: 0 0 0 0.14rem color-mix(in srgb, var(--brand, #c79a00) 14%, transparent);
  background: color-mix(in srgb, var(--surface, var(--bs-body-bg)) 98%, #020617 2%);
  transform: translateY(-1px);
}

/* Sol ikon alanı */
.auth-input-group .input-group-text {
  border-radius: 0;
  border: 0;
  background: transparent;
  color: color-mix(in srgb, var(--bs-body-color) 80%, #9ca3af 20%);
  padding-inline: 0.85rem;
  transition: color 0.18s ease, transform 0.18s ease;
}

.auth-input-group:focus-within .input-group-text i {
  transform: translateY(-1px);
}

/* Ortadaki input */
.auth-input-group .form-control {
  border-radius: 0;
  border: 0;
  background: transparent;
  color: var(--bs-body-color);
  font-size: 0.9rem;
}

.auth-input-group .form-control::placeholder {
  color: color-mix(in srgb, var(--bs-body-color) 40%, #6b7280 60%);
}

/* Toggle’lı grupta radius ayarı */
.auth-input-group.has-toggle .form-control {
  border-right: 1px solid color-mix(in srgb, var(--bs-border-color) 88%, transparent);
}

/* Şifre göster/gizle düğmesi */
.auth-toggle-pass {
  border-radius: 0;
  border: 0;
  background: transparent;
  color: color-mix(in srgb, var(--bs-body-color) 82%, #9ca3af 18%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-inline: 0.75rem;
  transition: background 0.18s ease, color 0.18s ease;
}

.auth-toggle-pass:hover {
  background: color-mix(in srgb, var(--brand, #c79a00) 10%, var(--surface, var(--bs-body-bg)));
  color: #111827;
}

/* Linkler */
.auth-link {
  color: color-mix(in srgb, var(--brand, #c79a00) 80%, var(--bs-body-color) 20%);
  text-decoration: none;
}
.auth-link:hover {
  text-decoration: underline;
}

/* Checkbox */
.form-check-input {
  border-color: color-mix(in srgb, var(--bs-border-color) 90%, transparent);
  background-color: transparent;
}
.form-check-input:checked {
  background-color: var(--brand, #c79a00);
  border-color: var(--brand, #c79a00);
}

/* Submit butonu */
.auth-submit-btn {
  border-radius: 0.9rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.25);
  transform: translateY(0);
  transition: box-shadow 0.18s ease, transform 0.18s ease, opacity 0.18s ease;
}

.auth-submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.3);
}

.auth-submit-btn:disabled {
  opacity: 0.65;
  box-shadow: none;
}

/* DEMO butonu */
.demo-btn {
  border-radius: 0.9rem;
  border-color: color-mix(in srgb, var(--bs-border-color) 90%, transparent);
}

.demo-hint code {
  font-size: 0.75rem;
}

/* Güvenlik notu */
.security-note {
  opacity: 0.82;
}

/* Hata mesajları */
.is-invalid {
  border-color: #ef4444 !important;
}
.invalid-feedback {
  color: #ef4444;
}

/* Animasyonlar */
@keyframes manager-slide-in {
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes manager-dot-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(199, 154, 0, 0.65);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(199, 154, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(199, 154, 0, 0);
  }
}
</style>
