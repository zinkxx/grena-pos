<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCustomers, type Customer } from '@/stores/customers'
import { useRouter } from 'vue-router'

const store = useCustomers()
const q = ref('') // arama metni
const serviceFilter = ref('') // gelecekte "verilen hizmet" filtresi genişler

onMounted(() => store.fetch())

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  return store.list.filter((c) => {
    const hay = `${c.code} ${c.name} ${c.phone ?? ''} ${c.lastService ?? ''}`.toLowerCase()
    return (
      (!term || hay.includes(term)) &&
      (!serviceFilter.value ||
        (c.lastService ?? '').toLowerCase().includes(serviceFilter.value.toLowerCase()))
    )
  })
})

// Modal state (müşteri ekleme)
const showModal = ref(false)
const form = ref<Omit<Customer, 'id'>>({
  code: '',
  name: '',
  phone: '',
  lastAppointment: '',
  lastService: '',
})
function resetForm() {
  form.value = { code: '', name: '', phone: '', lastAppointment: '', lastService: '' }
}
async function submitNew(e: Event) {
  e.preventDefault()
  if (!form.value.code || !form.value.name) return
  await store.add({ ...form.value })
  showModal.value = false
  resetForm()
}
</script>

<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h4 class="mb-0">Müşteriler</h4>
      <div class="d-flex" style="gap: 0.5rem">
        <input
          class="form-control"
          placeholder="Ara (ad, kod, tel, hizmet)"
          v-model="q"
          style="min-width: 260px"
        />
        <button class="btn btn-primary" @click="showModal = true">Müşteri Ekle</button>
      </div>
    </div>

    <!-- Filtreler -->
    <div class="row g-2 mb-3">
      <div class="col-sm-4">
        <input
          class="form-control"
          placeholder="Hizmet filtresi (örn: Boya)"
          v-model="serviceFilter"
        />
      </div>
    </div>

    <!-- Tablo -->
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th style="width: 110px">Müşteri Kodu</th>
            <th>Adı Soyadı</th>
            <th style="width: 150px">Telefon</th>
            <th style="width: 160px">Son Randevu</th>
            <th>Verilen Hizmet</th>
            <th style="width: 130px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in filtered" :key="c.id">
            <td>
              <span class="badge text-bg-light">{{ c.code }}</span>
            </td>
            <td class="fw-semibold">{{ c.name }}</td>
            <td>
              <a :href="c.phone ? 'tel:' + c.phone : undefined">{{ c.phone || '—' }}</a>
            </td>
            <td>{{ c.lastAppointment || '—' }}</td>
            <td>{{ c.lastService || '—' }}</td>
            <td class="text-end">
              <RouterLink
                class="btn btn-sm btn-outline-primary"
                :to="{ name: 'admin-customers', query: { id: c.id } }"
              >
                Detaya Git
              </RouterLink>
            </td>
          </tr>
          <tr v-if="!filtered.length">
            <td colspan="6" class="text-center text-muted">Kayıt bulunamadı</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal: Müşteri Ekle -->
    <div
      class="modal fade"
      tabindex="-1"
      :class="{ show: showModal }"
      style="display: block"
      v-if="showModal"
      @click.self="showModal = false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit="submitNew">
            <div class="modal-header">
              <h5 class="modal-title">Müşteri Ekle</h5>
              <button type="button" class="btn-close" @click="showModal = false"></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-6">
                  <label class="form-label">Müşteri Kodu</label>
                  <input class="form-control" v-model="form.code" placeholder="C-0004" required />
                </div>
                <div class="col-6">
                  <label class="form-label">Adı Soyadı</label>
                  <input class="form-control" v-model="form.name" placeholder="Ad Soyad" required />
                </div>
                <div class="col-6">
                  <label class="form-label">Telefon</label>
                  <input class="form-control" v-model="form.phone" placeholder="05xx xxx xx xx" />
                </div>
                <div class="col-6">
                  <label class="form-label">Son Randevu</label>
                  <input type="date" class="form-control" v-model="form.lastAppointment" />
                </div>
                <div class="col-12">
                  <label class="form-label">Verilen Hizmet</label>
                  <input
                    class="form-control"
                    v-model="form.lastService"
                    placeholder="Örn: Saç Kesim"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" type="button" @click="showModal = false">
                Vazgeç
              </button>
              <button class="btn btn-primary" type="submit">Kaydet</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
