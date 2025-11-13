<!-- src/views/admin/AdminDashboard.vue -->
<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'

/**
 * Buradaki veriler tamamen DEMO.
 * Sonra API / store’dan gerçek verilerle doldurursun.
 */

import TodayAppointmentsWidget from '@/components/admin/dashboard/TodayAppointmentsWidget.vue'
import RecentSalesWidget from '@/components/admin/dashboard/RecentSalesWidget.vue'
import StaffStatusWidget from '@/components/admin/dashboard/StaffStatusWidget.vue'
import AlertsWidget from '@/components/admin/dashboard/AlertsWidget.vue'
import OpenTicketsWidget from '@/components/admin/dashboard/OpenTicketsWidget.vue'

const salonName = 'Grena Studio'

const stats = [
  { key: 'todayRevenue', label: 'Bugün Kasa', value: '₺4.320', trend: '+%18', trendType: 'up' },
  { key: 'todayAppointments', label: 'Bugün Randevu', value: '27', trend: '3 iptal', trendType: 'neutral' },
  { key: 'occupancy', label: 'Koltuk Doluluk', value: '%78', trend: '16:00 piki', trendType: 'up' },
  { key: 'activeStaff', label: 'Aktif Personel', value: '6/8', trend: '2 izinli', trendType: 'down' },
]

const todayAppointments = [
  { time: '10:00', customer: 'Elif K.', service: 'Kesim + Fön', staff: 'Merve', status: 'Tamamlandı' },
  { time: '11:30', customer: 'Mert Y.', service: 'Sakal + Saç', staff: 'Ali', status: 'Devam ediyor' },
  { time: '13:00', customer: 'Seda T.', service: 'Bakım + Boya', staff: 'Zeynep', status: 'Bekliyor' },
  { time: '15:30', customer: 'Ayşe D.', service: 'Manikür', staff: 'Derya', status: 'Onaylandı' },
]

const recentSales = [
  { time: '09:42', ticket: '#1042', total: '₺380', method: 'Kart', staff: 'Merve' },
  { time: '10:15', ticket: '#1043', total: '₺520', method: 'Nakit', staff: 'Ali' },
  { time: '11:05', ticket: '#1044', total: '₺260', method: 'Kart', staff: 'Zeynep' },
  { time: '12:48', ticket: '#1045', total: '₺810', method: 'Kart', staff: 'Merve' },
]

const staffShifts = [
  { name: 'Merve', role: 'Stilist', status: 'Müsait', color: 'success' },
  { name: 'Ali', role: 'Barber', status: 'Randevuda', color: 'warning' },
  { name: 'Zeynep', role: 'Colorist', status: 'Randevuda', color: 'warning' },
  { name: 'Derya', role: 'Manikürist', status: 'Müsait', color: 'success' },
  { name: 'Burak', role: 'Resepsiyon', status: 'Mola', color: 'secondary' },
]

const alerts = [
  { type: 'stock', text: 'Şampuan – X Marka stoğu kritik seviyede.', level: 'warning' },
  { type: 'cash', text: 'Kasada yüksek nakit birikti, gün ortası sayım önerilir.', level: 'info' },
  { type: 'system', text: 'Bu hafta için 6 randevuda no-show tespit edildi.', level: 'danger' },
]

const openTickets = [
  { id: '#A-1203', chair: 'Koltuk 1', customer: 'Elif K.', staff: 'Merve', total: '₺380', since: '09:45' },
  { id: '#A-1204', chair: 'Koltuk 3', customer: 'Mert Y.', staff: 'Ali', total: '₺520', since: '10:10' },
  { id: '#A-1205', chair: 'Koltuk 2', customer: 'Seda T.', staff: 'Zeynep', total: '₺260', since: '11:00' },
]

const todayLabel = computed(() => {
  const d = new Date()
  return d.toLocaleDateString('tr-TR', { weekday: 'long', day: '2-digit', month: 'short' })
})

/* ==================== Widget Registry ==================== */

type WidgetId =
  | 'todayAppointments'
  | 'recentSales'
  | 'staffStatus'
  | 'alerts'
  | 'openTickets'

interface WidgetDef {
  id: WidgetId
  label: string
  description: string
  component: any
  defaultVisible: boolean
  getProps: () => Record<string, any>
}

const widgetRegistry: WidgetDef[] = [
  {
    id: 'todayAppointments',
    label: 'Bugün Randevular',
    description: 'Günün randevu listesi ve yoğunluk çubuğu.',
    component: TodayAppointmentsWidget,
    defaultVisible: true,
    getProps: () => ({
      appointments: todayAppointments,
    }),
  },
  {
    id: 'recentSales',
    label: 'Son Satışlar',
    description: 'POS’tan geçen son fişler.',
    component: RecentSalesWidget,
    defaultVisible: true,
    getProps: () => ({
      sales: recentSales,
    }),
  },
  {
    id: 'staffStatus',
    label: 'Personel Durumu',
    description: 'Kim müsait, kim randevuda görün.',
    component: StaffStatusWidget,
    defaultVisible: true,
    getProps: () => ({
      staff: staffShifts,
    }),
  },
  {
    id: 'alerts',
    label: 'Uyarılar',
    description: 'Stok, kasa ve sistem uyarıları.',
    component: AlertsWidget,
    defaultVisible: true,
    getProps: () => ({
      alerts,
    }),
  },
  {
    id: 'openTickets',
    label: 'Açık Adisyonlar',
    description: 'Kapatılmamış fişler ve koltuklar.',
    component: OpenTicketsWidget,
    defaultVisible: true,
    getProps: () => ({
      tickets: openTickets,
    }),
  },
]

const STORAGE_KEY = 'gp-admin-visible-widgets'

const activeWidgetIds = ref<WidgetId[]>([])
const showWidgetModal = ref(false)

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as WidgetId[]
      const valid = parsed.filter((id) => widgetRegistry.some((w) => w.id === id))
      if (valid.length) {
        activeWidgetIds.value = valid
        return
      }
    } catch {
      // ignore
    }
  }
  activeWidgetIds.value = widgetRegistry.filter((w) => w.defaultVisible).map((w) => w.id)
})

watch(
  activeWidgetIds,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  },
  { deep: true }
)

const activeWidgets = computed(() =>
  widgetRegistry.filter((w) => activeWidgetIds.value.includes(w.id))
)

const activeCount = computed(() => activeWidgetIds.value.length)

function resetWidgets() {
  activeWidgetIds.value = widgetRegistry.filter((w) => w.defaultVisible).map((w) => w.id)
}

function selectAllWidgets() {
  activeWidgetIds.value = widgetRegistry.map((w) => w.id)
}
</script>

<template>
  <div class="gp-admin-dashboard gpdash-root">
    <div class="container-fluid py-4">
      <!-- Üst başlık / quick info (SABİT) -->
      <header class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 class="h4 mb-1 d-flex align-items-center gap-2">
            <span class="dash-pill"></span>
            <span>{{ salonName }} – Yönetici Paneli</span>
          </h1>
          <p class="text-muted small mb-0">
            Bugünün randevu, kasa ve personel özetini buradan takip edin.
          </p>
        </div>
        <div class="d-flex flex-wrap align-items-center gap-2">
          <span class="badge rounded-pill dash-date">
            <i class="bi bi-calendar-event me-1"></i>
            {{ todayLabel }}
          </span>

          <button type="button" class="gpdash-btn gpdash-btn-ghost gpdash-btn-sm">
            <i class="bi bi-arrow-clockwise me-1"></i> Yenile
          </button>

          <!-- Widget düzenleyici aç -->
          <button
            type="button"
            class="gpdash-btn gpdash-btn-outline gpdash-btn-sm d-flex align-items-center gap-1"
            @click="showWidgetModal = true"
          >
            <i class="bi bi-grid-3x3-gap"></i>
            <span class="d-none d-sm-inline">Widget’ları düzenle</span>
          </button>
        </div>
      </header>

      <!-- KPI kartları (SABİT) -->
      <section class="row g-3 mb-4">
        <div
          v-for="s in stats"
          :key="s.key"
          class="col-12 col-sm-6 col-xl-3"
        >
          <div class="kpi-card h-100 p-3 rounded-3">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="kpi-label small text-muted">{{ s.label }}</span>
              <span
                class="kpi-trend small"
                :data-type="s.trendType"
              >
                <i
                  v-if="s.trendType === 'up'"
                  class="bi bi-graph-up-arrow me-1"
                />
                <i
                  v-else-if="s.trendType === 'down'"
                  class="bi bi-graph-down-arrow me-1"
                />
                <i
                  v-else
                  class="bi bi-dot me-1"
                />
                {{ s.trend }}
              </span>
            </div>
            <div class="d-flex align-items-end justify-content-between">
              <div class="kpi-value">{{ s.value }}</div>
              <div class="kpi-mini-bars" aria-hidden="true">
                <span v-for="n in 9" :key="n" class="bar"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== Widget Alanı ==================== -->
      <section class="row g-4">
        <div
          v-for="w in activeWidgets"
          :key="w.id"
          class="col-12 col-xl-6"
        >
          <component :is="w.component" v-bind="w.getProps()" />
        </div>

        <!-- Hiç widget seçilmemişse -->
        <div
          v-if="activeWidgets.length === 0"
          class="col-12"
        >
          <div class="dash-card rounded-3 p-4 text-center">
            <p class="mb-2">Gösterilecek widget seçilmedi.</p>
            <p class="text-muted small mb-3">
              Dashboard’da görmek istediğiniz alanları seçmek için aşağıdaki butonu kullanın.
            </p>
            <button
              type="button"
              class="gpdash-btn gpdash-btn-outline gpdash-btn-sm"
              @click="showWidgetModal = true"
            >
              <i class="bi bi-grid-3x3-gap me-1" /> Widget’ları seç
            </button>
          </div>
        </div>
      </section>
    </div>

    <!-- ==================== Widget Seçim Modalı ==================== -->
    <div
      v-if="showWidgetModal"
      class="gp-widget-modal-backdrop"
      @click.self="showWidgetModal = false"
    >
      <div class="gp-widget-modal card">
        <div class="gp-widget-modal-head card-header d-flex align-items-center justify-content-between">
          <div>
            <h2 class="h6 mb-0 d-flex align-items-center gap-2">
              <i class="bi bi-grid-3x3-gap" />
              <span>Dashboard Widget’ları</span>
            </h2>
            <p class="small text-muted mb-0">
              Yönetici panelinde görmek istediğin alanları seç.
            </p>
          </div>
          <button
            type="button"
            class="gpdash-btn gpdash-btn-ghost gpdash-btn-sm"
            @click="showWidgetModal = false"
          >
            <i class="bi bi-x-lg" />
          </button>
        </div>

        <div class="card-body gp-widget-modal-body">
          <div class="d-flex justify-content-between align-items-center mb-3 small text-muted">
            <span>Aktif widget sayısı: <strong>{{ activeCount }}</strong></span>
            <div class="d-flex gap-2">
              <button
                type="button"
                class="btn btn-link btn-sm p-0"
                @click="resetWidgets"
              >
                Varsayılana dön
              </button>
              <button
                type="button"
                class="btn btn-link btn-sm p-0"
                @click="selectAllWidgets"
              >
                Tümünü seç
              </button>
            </div>
          </div>

          <div class="row g-2">
            <div
              v-for="w in widgetRegistry"
              :key="w.id"
              class="col-12 col-sm-6"
            >
              <label class="gp-widget-option">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`widget-${w.id}`"
                    v-model="activeWidgetIds"
                    :value="w.id"
                    :disabled="activeCount === 1 && activeWidgetIds.includes(w.id)"
                  />
                  <span class="form-check-label">
                    {{ w.label }}
                  </span>
                </div>
                <p class="small text-muted mb-0">
                  {{ w.description }}
                </p>
              </label>
            </div>
          </div>
        </div>

        <div class="card-footer d-flex justify-content-end gap-2">
          <button
            type="button"
            class="gpdash-btn gpdash-btn-ghost gpdash-btn-sm"
            @click="showWidgetModal = false"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ===================== ROOT / THEME ===================== */
.gpdash-root {
  --gpdash-brand: var(--brand, #c79a00);
  --gpdash-brand-soft: color-mix(in srgb, var(--gpdash-brand) 65%, #fde68a 35%);
  --gpdash-border-soft: color-mix(in srgb, var(--bs-border-color, #e5e7eb) 90%, transparent);

  min-height: 100vh;
  background:
    radial-gradient(
      120% 160% at 0% 0%,
      color-mix(in srgb, var(--gpdash-brand) 7%, transparent) 0%,
      transparent 55%
    ),
    radial-gradient(
      120% 160% at 100% 0%,
      color-mix(in srgb, var(--gpdash-brand) 5%, transparent) 0%,
      transparent 55%
    ),
    var(--bs-body-bg);
}

/* Container biraz nefes alsın */
:deep(.container-fluid) {
  max-width: 1320px;
}

/* ===================== BAŞLIK - PILL ===================== */
.dash-pill {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 20%, #facc15, #c79a00);
  box-shadow: 0 0 0 0 rgba(199, 154, 0, 0.55);
  animation: dash-pill-pulse 1.9s ease-out infinite;
}

/* Tarih badge’i – açık/koyu tema uyumlu */
.dash-date {
  border-radius: 999px;
  border: 1px solid var(--gpdash-border-soft);
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--gpdash-brand) 10%, transparent),
      color-mix(in srgb, var(--bs-body-bg) 96%, #0f172a 4%)
    );
  color: color-mix(in srgb, var(--bs-body-color) 90%, #f9fafb 10%);
}

/* ===================== KPI KARTLARI ===================== */
.kpi-card {
  border-radius: 1rem;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 88%, transparent);
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--gpdash-brand) 6%, transparent),
      color-mix(in srgb, var(--bs-body-bg) 98%, #111827 2%)
    );
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.22),
    0 0 0 1px color-mix(in srgb, var(--bs-border-color) 70%, transparent);
  transition:
    transform 0.18s ease,
    box-shadow 0.2s ease,
    border-color 0.18s ease,
    background 0.18s ease;
}

.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 22px 50px rgba(15, 23, 42, 0.3),
    0 0 0 1px color-mix(in srgb, var(--gpdash-brand) 26%, var(--bs-border-color) 74%);
  border-color: color-mix(in srgb, var(--gpdash-brand) 26%, var(--bs-border-color) 74%);
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--gpdash-brand) 10%, transparent),
      color-mix(in srgb, var(--bs-body-bg) 96%, #111827 4%)
    );
}

.kpi-label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
  color: color-mix(in srgb, var(--bs-body-color) 70%, #9ca3af 30%);
}

.kpi-value {
  font-weight: 800;
  font-size: clamp(1.25rem, 2.4vw, 1.6rem);
  letter-spacing: 0.02em;
}

/* Trend badge’leri */
.kpi-trend {
  padding: 0.1rem 0.6rem;
  border-radius: 999px;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  font-size: 0.7rem;
}
.kpi-trend[data-type='up'] {
  border-color: rgba(22, 163, 74, 0.45);
  background: rgba(22, 163, 74, 0.12);
  color: #22c55e;
}
.kpi-trend[data-type='down'] {
  border-color: rgba(239, 68, 68, 0.45);
  background: rgba(239, 68, 68, 0.12);
  color: #fb7185;
}
.kpi-trend[data-type='neutral'] {
  border-color: rgba(148, 163, 184, 0.45);
  background: rgba(148, 163, 184, 0.12);
  color: color-mix(in srgb, var(--bs-body-color) 80%, #9ca3af 20%);
}

/* Mini bar graph */
.kpi-mini-bars {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 3px;
  width: 94px;
}
.kpi-mini-bars .bar {
  height: 20px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--gpdash-brand) 20%, var(--bs-body-bg));
  opacity: 0.85;
}
.kpi-mini-bars .bar:nth-child(3n) {
  height: 12px;
}
.kpi-mini-bars .bar:nth-child(4n) {
  height: 26px;
}

/* ===================== DASHBOARD BUTON SİSTEMİ ===================== */
.gpdash-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.34rem 0.9rem;
  line-height: 1.1;
  background: transparent;
  color: color-mix(in srgb, var(--bs-body-color, #111827) 90%, #e5e7eb 10%);
  cursor: pointer;
  transition:
    background 0.12s ease,
    border-color 0.12s ease,
    color 0.12s ease,
    transform 0.08s ease;
}

.gpdash-btn-sm {
  padding: 0.28rem 0.8rem;
}

/* Primary (gerekirse ileride) */
.gpdash-btn-primary {
  background: linear-gradient(135deg, var(--gpdash-brand), var(--gpdash-brand-soft));
  color: #020617;
  border-color: transparent;
}

.gpdash-btn-primary:hover {
  transform: translateY(-1px);
}

/* Outline */
.gpdash-btn-outline {
  background: transparent;
  border-color: var(--gpdash-border-soft);
  color: color-mix(in srgb, var(--bs-body-color) 92%, #6b7280 8%);
}

.gpdash-btn-outline:hover {
  background: color-mix(in srgb, var(--bs-body-bg) 94%, #e5e7eb 6%);
}

/* Ghost */
.gpdash-btn-ghost {
  background: transparent;
  border-color: color-mix(in srgb, var(--bs-border-color, #e5e7eb) 70%, transparent);
  color: color-mix(in srgb, var(--bs-body-color) 88%, #9ca3af 12%);
}

.gpdash-btn-ghost:hover {
  background: color-mix(in srgb, var(--bs-body-bg) 94%, #111827 6%);
}

/* ==================== Widget kart base (child component’ler için :deep) ==================== */
:deep(.dash-card) {
  border-radius: 1rem;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 88%, transparent);
  background: color-mix(in srgb, var(--bs-body-bg) 99%, #0f172a 1%);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.18);
}

:deep(.dash-card-head) {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid color-mix(in srgb, var(--bs-border-color) 92%, transparent);
  background: color-mix(in srgb, var(--bs-body-bg) 97%, #020617 3%);
}

:deep(.dash-card-head h2) {
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

:deep(.dash-card-head i) {
  font-size: 1rem;
  color: color-mix(in srgb, var(--gpdash-brand) 80%, var(--bs-body-color) 20%);
}

:deep(.dash-card-body) {
  padding: 0.9rem 1rem 1rem;
}

/* Tablo tipografisi */
:deep(.dash-table thead th) {
  border-bottom-color: color-mix(in srgb, var(--bs-border-color) 92%, transparent);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: color-mix(in srgb, var(--bs-body-color) 70%, #9ca3af 30%);
}
:deep(.dash-table tbody td) {
  border-top-color: color-mix(in srgb, var(--bs-border-color) 90%, transparent);
  font-size: 0.85rem;
}

/* Randevu statü badge */
:deep(.status-badge) {
  border-radius: 999px;
  font-size: 0.7rem;
  padding: 0.18rem 0.65rem;
  border: 1px solid transparent;
}
:deep(.status-badge[data-status='Tamamlandı']) {
  border-color: rgba(22, 163, 74, 0.4);
  background: rgba(22, 163, 74, 0.12);
  color: #22c55e;
}
:deep(.status-badge[data-status='Devam ediyor']),
:deep(.status-badge[data-status='Onaylandı']) {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(245, 158, 11, 0.12);
  color: #fbbf24;
}
:deep(.status-badge[data-status='Bekliyor']) {
  border-color: rgba(148, 163, 184, 0.4);
  background: rgba(148, 163, 184, 0.12);
}

/* Gün içi yoğunluk barları */
:deep(.tiny-bars) {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: 3px;
}
:deep(.tiny-bars .bar) {
  height: 24px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--gpdash-brand) 18%, var(--bs-body-bg));
  opacity: 0.8;
}
:deep(.tiny-bars .bar:nth-child(4n)) {
  height: 14px;
}
:deep(.tiny-bars .bar:nth-child(6n)) {
  height: 30px;
}
:deep(.tiny-bars .bar:nth-child(9n)) {
  height: 20px;
}

/* Satış listesi */
:deep(.sales-item) {
  padding: 0.4rem 0.25rem;
  border-radius: 0.7rem;
  transition: background 0.16s ease, transform 0.1s ease;
}
:deep(.sales-item:hover) {
  background: color-mix(in srgb, var(--bs-body-bg) 96%, #020617 4%);
  transform: translateY(-1px);
}
:deep(.sales-total) {
  font-size: 0.9rem;
}

/* Personel listesi */
:deep(.staff-avatar) {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 90%, transparent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  background: color-mix(in srgb, var(--bs-body-bg) 96%, #020617 4%);
}

:deep(.staff-status) {
  border-radius: 999px;
  font-size: 0.7rem;
  padding: 0.18rem 0.7rem;
}
:deep(.staff-status[data-color='success']) {
  background: rgba(22, 163, 74, 0.12);
  color: #22c55e;
}
:deep(.staff-status[data-color='warning']) {
  background: rgba(245, 158, 11, 0.12);
  color: #facc15;
}
:deep(.staff-status[data-color='secondary']) {
  background: rgba(148, 163, 184, 0.14);
  color: #e5e7eb;
}

/* Uyarılar */
:deep(.alert-item) {
  padding: 0.4rem 0.35rem;
  border-radius: 0.7rem;
  border: 1px dashed color-mix(in srgb, var(--bs-border-color) 88%, transparent);
}
:deep(.alert-item[data-level='warning']) {
  border-color: rgba(245, 158, 11, 0.55);
}
:deep(.alert-item[data-level='info']) {
  border-color: rgba(59, 130, 246, 0.55);
}
:deep(.alert-item[data-level='danger']) {
  border-color: rgba(239, 68, 68, 0.65);
}
:deep(.alert-dot) {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  margin-top: 0.35rem;
  background: color-mix(in srgb, var(--gpdash-brand) 40%, #ef4444 60%);
}

/* Widget seçim modalı */
.gp-widget-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.78);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 2000;
}

.gp-widget-modal {
  max-width: 720px;
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 86%, transparent);
  background: color-mix(in srgb, var(--bs-body-bg) 98%, #020617 2%);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.7);
}

.gp-widget-modal-body {
  max-height: 60vh;
  overflow: auto;
}

/* Widget seçenek kartları */
.gp-widget-option {
  display: block;
  width: 100%;
  border-radius: 0.75rem;
  padding: 0.55rem 0.75rem;
  border: 1px solid color-mix(in srgb, var(--bs-border-color) 88%, transparent);
  background: color-mix(in srgb, var(--bs-body-bg) 97%, #020617 3%);
  cursor: pointer;
  transition: border-color 0.16s ease, background 0.16s ease, transform 0.12s ease;
}
.gp-widget-option:hover {
  border-color: color-mix(in srgb, var(--gpdash-brand) 28%, var(--bs-border-color) 72%);
  background: color-mix(in srgb, var(--bs-body-bg) 95%, #020617 5%);
  transform: translateY(-1px);
}
.gp-widget-option .form-check {
  margin-bottom: 0.2rem;
}

/* Animasyonlar */
@keyframes dash-pill-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(199, 154, 0, 0.65);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(199, 154, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(199, 154, 0, 0);
  }
}

/* Küçük ekran düzeni */
@media (max-width: 767.98px) {
  :deep(.dash-card-head),
  :deep(.dash-card-body) {
    padding-inline: 0.75rem;
  }
}
</style>
