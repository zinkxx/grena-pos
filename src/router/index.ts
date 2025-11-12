import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/Home.vue') },
    { path: '/login', name: 'login', component: () => import('@/views/Login.vue') },

    {
      path: '/admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true }, // giriş şartı
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/AdminDashboard.vue'),
        },
        {
          path: 'customers',
          name: 'admin-customers',
          component: () => import('@/views/admin/Customers.vue'),
        },
        {
          path: 'appointments',
          name: 'admin-appointments',
          component: () => import('@/views/admin/Appointments.vue'),
        },
        {
          path: 'expenses',
          name: 'admin-expenses',
          component: () => import('@/views/admin/Expenses.vue'),
        },
        {
          path: 'incomes',
          name: 'admin-incomes',
          component: () => import('@/views/admin/Incomes.vue'),
        },
        { path: 'staff', name: 'admin-staff', component: () => import('@/views/admin/Staff.vue') },
      ],
    },
  ],
})

// basit guard (login sayfasında zaten var; burada admin koruması)
router.beforeEach(async (to) => {
  const auth = useAuth()
  if (to.meta.requiresAuth && !auth.user) {
    await auth.me()
    if (!auth.user) {
      return { name: 'login', query: { redirect: to.fullPath } }
    }
  }
})

export default router
