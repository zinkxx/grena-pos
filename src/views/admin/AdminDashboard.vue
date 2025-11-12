<script setup lang="ts">
type Ticket = {
  id: number
  customer: string
  phone?: string
  items: string[] // verilen hizmetler kısa liste
  total: number // tutar
  openedAt: string // ISO tarih
}

const openTickets: Ticket[] = [
  {
    id: 101,
    customer: 'Ayşe Demir',
    phone: '0500 111 22 33',
    items: ['Saç Kesim', 'Fön'],
    total: 450,
    openedAt: '2025-11-12T10:30:00',
  },
  {
    id: 102,
    customer: 'Can Kaya',
    items: ['Sakal Tıraşı'],
    total: 200,
    openedAt: '2025-11-12T10:50:00',
  },
  {
    id: 103,
    customer: 'Merve Ak',
    items: ['Boya', 'Keratin Bakım'],
    total: 1400,
    openedAt: '2025-11-12T11:10:00',
  },
]
</script>

<template>
  <div>
    <h4 class="mb-3">Açık Adisyonlar</h4>

    <div class="row g-3">
      <div class="col-sm-6 col-lg-4" v-for="t in openTickets" :key="t.id">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <strong>#{{ t.id }}</strong>
              <span class="badge text-bg-warning">Açık</span>
            </div>
            <div class="mt-2">
              <div class="fw-semibold">{{ t.customer }}</div>
              <div class="text-muted small">{{ t.phone || '—' }}</div>
            </div>
            <ul class="mt-2 mb-3 small text-muted">
              <li v-for="(it, i) in t.items" :key="i">{{ it }}</li>
            </ul>
            <div class="d-flex justify-content-between align-items-center">
              <div class="fw-bold">{{ t.total.toLocaleString('tr-TR') }} ₺</div>
              <button class="btn btn-sm btn-primary">Adisyona Git</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!openTickets.length" class="col-12">
        <div class="alert alert-info">Şu an açık adisyon yok.</div>
      </div>
    </div>
  </div>
</template>
