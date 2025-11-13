// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Genel sayfalar
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: { title: 'Anasayfa' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { title: 'Giriş' },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/ForgotPassword.vue'),
      meta: { title: 'Şifremi Unuttum' },
    },

    // Çözümler (yeni)
    {
      path: '/pos',
      name: 'pos',
      component: () => import('@/views/Pos.vue'),
      meta: { title: 'Adisyon & POS' },
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('@/views/Reports.vue'),
      meta: { title: 'Raporlama' },
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: () => import('@/views/Appointments.vue'),
      meta: { title: 'Randevu' },
    },

    // Admin (korumalı)
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, title: 'Yönetim' },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/AdminDashboard.vue'),
          meta: { title: 'Yönetim • Panel' },
        },
        {
          path: 'customers',
          name: 'admin-customers',
          component: () => import('@/views/admin/Customers.vue'),
          meta: { title: 'Yönetim • Müşteriler' },
        },
        {
          path: 'appointments',
          name: 'admin-appointments',
          component: () => import('@/views/admin/Appointments.vue'),
          meta: { title: 'Yönetim • Randevular' },
        },
        {
          path: 'expenses',
          name: 'admin-expenses',
          component: () => import('@/views/admin/Expenses.vue'),
          meta: { title: 'Yönetim • Giderler' },
        },
        {
          path: 'incomes',
          name: 'admin-incomes',
          component: () => import('@/views/admin/Incomes.vue'),
          meta: { title: 'Yönetim • Gelirler' },
        },
        {
          path: 'staff',
          name: 'admin-staff',
          component: () => import('@/views/admin/Staff.vue'),
          meta: { title: 'Yönetim • Personel' },
        },
        // DİKKAT: forgot-password BURADA DEĞİL ARTIK
      ],
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
      meta: { title: 'Sayfa Bulunamadı' },
    },
  ],

  scrollBehavior() {
    return { top: 0 }
  },
})

// Guard
router.beforeEach(async (to) => {
  const auth = useAuth()
  if (to.meta.requiresAuth && !auth.user) {
    await auth.me()
    if (!auth.user) {
      return { name: 'login', query: { redirect: to.fullPath } }
    }
  }
})

router.afterEach((to) => {
  const base = 'Grena POS'
  const t = (to.meta?.title as string) || ''
  document.title = t ? `${base} – ${t}` : base
})

export default router
