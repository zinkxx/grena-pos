<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useToaster } from '@/composables/useToaster'

const email = ref('')
const password = ref('')
const remember = ref(false) // <-- BENİ HATIRLA
const showPass = ref(false)
const auth = useAuth()
const router = useRouter()
const toast = useToaster()

const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
const passOk = computed(() => password.value.length >= 6)
const formOk = computed(() => emailOk.value && passOk.value && !auth.loading)

const LS_KEY = 'grena-remember-email'

// Sayfa açılınca e-posta oku + odak
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
  if (!formOk.value) return
  const ok = await auth.login(email.value.trim(), password.value)

  if (ok) {
    // Beni hatırla
    if (remember.value) localStorage.setItem(LS_KEY, email.value.trim())
    else localStorage.removeItem(LS_KEY)

    toast.success(`Hoş geldin, ${auth.user?.name || 'kullanıcı'}!`)
    const redirect = (router.currentRoute.value.query.redirect as string) || '/'
    router.push(redirect)
  } else {
    toast.error(auth.error || 'Giriş başarısız')
  }
}
</script>

<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow-sm" style="max-width: 420px; width: 100%">
      <div class="card-body p-4">
        <h1 class="h4 text-center mb-3">Grena POS</h1>
        <p class="text-center text-muted mb-4">Kuaför Adisyon – Giriş</p>

        <form @submit="submit" novalidate>
          <div class="mb-3">
            <label class="form-label" for="email">E-posta</label>
            <input
              id="email"
              ref="emailInput"
              v-model="email"
              type="email"
              class="form-control"
              placeholder="ornek@salon.com"
              :class="{ 'is-invalid': email && !emailOk }"
              autocomplete="username"
              required
            />
            <div v-if="email && !emailOk" class="invalid-feedback">Geçerli bir e-posta girin.</div>
          </div>

          <div class="mb-3">
            <label class="form-label" for="password">Şifre</label>
            <div class="input-group">
              <input
                id="password"
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
                class="btn btn-outline-secondary"
                @click="showPass = !showPass"
                :aria-pressed="showPass ? 'true' : 'false'"
              >
                {{ showPass ? 'Gizle' : 'Göster' }}
              </button>
            </div>
            <div v-if="password && !passOk" class="invalid-feedback d-block">
              Şifre en az 6 karakter olmalı.
            </div>
          </div>

          <!-- Beni hatırla -->
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="remember" v-model="remember" />
            <label class="form-check-label" for="remember">Beni hatırla</label>
          </div>

          <div class="d-grid">
            <button class="btn btn-primary" :disabled="!formOk">
              <span v-if="auth.loading" class="spinner-border spinner-border-sm me-2"></span>
              Giriş Yap
            </button>
          </div>

          <p v-if="auth.error" class="visually-hidden" role="alert">{{ auth.error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-vh-100 {
  background: color-mix(in oklab, var(--surface) 96%, transparent);
}
</style>
