// src/stores/auth.ts
import { api } from '@/lib/api'
import { defineStore } from 'pinia'

export type User = {
  id: number
  name: string
  role: 'owner' | 'manager' | 'cashier' | 'staff'
  email: string
  phone?: string
}

type State = {
  user: User | null
  loading: boolean
  error: string | null
}

export const useAuth = defineStore('auth', {
  state: (): State => ({
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuth: (s) => !!s.user,
  },
  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        // PHP tarafında /api/login.php bekleyeceğiz (JSON)
        const { data } = await api.post('/login.php', { email, password })
        // Örnek beklenen yanıt:
        // { ok: true, user: { id, name, role, email } }
        if (!data?.ok) {
          throw new Error(data?.message || 'Giriş başarısız')
        }
        this.user = data.user
        return true
      } catch (err: any) {
        this.error = err?.message || 'Giriş hatası'
        this.user = null
        return false
      } finally {
        this.loading = false
      }
    },
    async logout() {
      try {
        await api.post('/logout.php') // PHP’de oturumu kapatacağız
      } finally {
        this.user = null
      }
    },
    async me() {
      // Sayfa yenilenince oturumu geri yüklemek için
      try {
        const { data } = await api.get('/me.php')
        if (data?.ok && data.user) this.user = data.user
      } catch {
        this.user = null
      }
    },
  },
})
