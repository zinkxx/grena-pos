<!-- src/views/ForgotPassword.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToaster } from '@/composables/useToaster'
import logo from '@/assets/images/logo.png'
// Backend hazır olduğunda kullanılmak üzere:
// import { useAuth } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const toast = useToaster()
// const auth = useAuth()

const email = ref('')
const loading = ref(false)

const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))

// ?role=manager / staff bilgisi (şimdilik sadece metinde kullanıyoruz)
const role = computed< 'manager' | 'staff' >(() =>
  route.query.role === 'staff' ? 'staff' : 'manager'
)

const roleLabel = computed(() =>
  role.value === 'manager' ? 'Yönetici hesabı' : 'Personel hesabı'
)

const formOk = computed(() => emailOk.value && !loading.value)

async function submit(e?: Event) {
  e?.preventDefault()
  if (!formOk.value) return

  loading.value = true
  try {
    const mail = email.value.trim()

    // TODO: Backend hazır olunca burayı gerçek API ile değiştir:
    // const ok = await auth.requestPasswordReset(mail)
    // if (!ok) throw new Error(auth.error || 'İşlem başarısız')

    // Şimdilik demo amaçlı anında başarılı sayıyoruz:
    await new Promise((r) => setTimeout(r, 700))

    toast.success('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.')
    router.push('/login')
  } catch (err) {
    console.error(err)
    toast.error('İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.')
  } finally {
    loading.value = false
  }
}

function backToLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="auth-wrap">
    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
      <div class="row w-100 justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="auth-card card border-0 rounded-4">
            <div class="card-body p-4 p-lg-5">
              <!-- Logo -->
              <div class="text-center mb-4">
                <div class="d-inline-flex align-items-center gap-2 mb-2">
                  <img :src="logo" alt="Grena POS Logo" class="auth-logo" />
                  <span class="auth-brand">Grena POS</span>
                  <span class="badge auth-beta">BETA</span>
                </div>
                <p class="small auth-sub mb-0">Şifremi unuttum</p>
              </div>

              <h1 class="h5 mb-2">Şifremi Unuttum</h1>
              <p class="text-muted small mb-4">
                {{ roleLabel }} için kayıtlı e-posta adresinizi yazın. Şifre sıfırlama bağlantısını bu adrese gönderelim.
              </p>

              <form @submit="submit" novalidate>
                <div class="mb-3">
                  <label class="form-label small" for="forgot-email">E-posta</label>
                  <div class="input-group auth-input-group">
                    <span class="input-group-text">
                      <i class="bi bi-envelope"></i>
                    </span>
                    <input
                      id="forgot-email"
                      v-model="email"
                      type="email"
                      class="form-control"
                      placeholder="ornek@salon.com"
                      :class="{ 'is-invalid': email && !emailOk }"
                      autocomplete="username"
                      required
                    />
                  </div>
                  <div v-if="email && !emailOk" class="invalid-feedback d-block small">
                    Geçerli bir e-posta girin.
                  </div>
                </div>

                <div class="d-grid gap-2 mt-3">
                  <button class="btn btn-brand reset-submit-btn" :disabled="!formOk">
                    <span
                      v-if="loading"
                      class="spinner-border spinner-border-sm me-2"
                    ></span>
                    Bağlantı Gönder
                  </button>

                  <button
                    type="button"
                    class="btn btn-ghost btn-sm back-btn"
                    @click="backToLogin"
                  >
                    <i class="bi bi-arrow-left me-1"></i>
                    Giriş ekranına dön
                  </button>
                </div>

                <p class="small text-muted mt-3 mb-0">
                  Eğer bu e-posta adresi kayıtlı değilse, güvenlik gereği hangi hesabın
                  size ait olduğunu belirtmeyiz.
                </p>
              </form>
            </div>
          </div>

          <p class="text-center small text-muted mt-3">
            Herhangi bir sorun yaşarsanız salon yöneticiniz veya destek ekibimizle iletişime geçin.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-wrap {
  min-height: 100vh;
  background:
    radial-gradient(140% 200% at 0% 0%, color-mix(in srgb, var(--brand, #c79a00) 14%, transparent) 0%, transparent 60%),
    radial-gradient(140% 200% at 100% 0%, color-mix(in srgb, var(--brand, #c79a00) 10%, transparent) 0%, transparent 60%),
    color-mix(in srgb, var(--bs-body-bg) 96%, #020617 4%);
}

.min-vh-100 {
  min-height: 100vh !important;
}

/* Login ile aynı kart havası */
.auth-card {
  border-radius: 1.5rem;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--brand, #c79a00) 4%, transparent), transparent),
    color-mix(in srgb, var(--surface, var(--bs-body-bg)) 100%, transparent);
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 92%, transparent);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.22);
  animation: card-pop 0.35s ease-out;
}

.auth-logo {
  height: 28px;
  width: auto;
}

.auth-brand {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.auth-sub {
  color: color-mix(in srgb, var(--bs-body-color) 80%, #9ca3af 20%);
}

.auth-beta {
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

/* Input grup (login ile aynı stil) */
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

.auth-input-group .input-group-text {
  border-radius: 0;
  border: 0;
  background: transparent;
  color: color-mix(in srgb, var(--bs-body-color) 80%, #9ca3af 20%);
  padding-inline: 0.85rem;
  transition: transform 0.18s ease;
}

.auth-input-group:focus-within .input-group-text i {
  transform: translateY(-1px);
}

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

/* Ana buton */
.reset-submit-btn {
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

.reset-submit-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.3);
}

.reset-submit-btn:disabled {
  opacity: 0.65;
  box-shadow: none;
}

/* Geri dön butonu */
.back-btn {
  border-radius: 999px;
  border-color: color-mix(in srgb, var(--bs-border-color) 92%, transparent);
}

/* Hata mesajları */
.is-invalid {
  border-color: #ef4444 !important;
}
.invalid-feedback {
  color: #ef4444;
}

/* Animasyon */
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
</style>
