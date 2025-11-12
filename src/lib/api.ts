// src/lib/api.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api', // prod'da /api/login.php vb.
  withCredentials: true, // PHP oturum çerezi için
})

// (isteğe bağlı) 401 yakalama — ileride guard'larla kullanırız
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      // örn: logout edip /login'e yönlendirme
    }
    return Promise.reject(err)
  },
)
