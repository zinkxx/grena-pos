import { defineStore } from 'pinia'

export type Customer = {
  id: number
  code: string
  name: string
  phone?: string
  lastAppointment?: string // ISO tarih
  lastService?: string
}

type State = {
  list: Customer[]
  loading: boolean
}

export const useCustomers = defineStore('customers', {
  state: (): State => ({
    loading: false,
    list: [
      {
        id: 1,
        code: 'C-0001',
        name: 'Ayşe Demir',
        phone: '0500 111 22 33',
        lastAppointment: '2025-11-10',
        lastService: 'Saç Kesim',
      },
      {
        id: 2,
        code: 'C-0002',
        name: 'Can Kaya',
        phone: '0500 444 55 66',
        lastAppointment: '2025-11-08',
        lastService: 'Sakal Tıraşı',
      },
      {
        id: 3,
        code: 'C-0003',
        name: 'Merve Ak',
        phone: '0500 999 88 77',
        lastAppointment: '2025-11-01',
        lastService: 'Boya',
      },
    ],
  }),
  actions: {
    async fetch() {
      this.loading = true
      try {
        // TODO: /api/customers/list.php (sonra)
        // const { data } = await api.get('/customers/list.php')
        // this.list = data.items
      } finally {
        this.loading = false
      }
    },
    async add(c: Omit<Customer, 'id'>) {
      // TODO: /api/customers/create.php (sonra)
      const newId = Math.max(0, ...this.list.map((x) => x.id)) + 1
      this.list.unshift({ id: newId, ...c })
    },
  },
})
