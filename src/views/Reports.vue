<!-- src/views/Reports.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'

/* === Kontroller === */
type TF = 'today'|'week'|'month'|'quarter'
const timeframe = ref<TF>('week')
const groupBy   = ref<'service'|'staff'|'branch'>('service')

/* === Örnek veri (mock) — sadece görsel amaçlı === */
const series = ref({
  labels: Array.from({length: 14}, (_,i)=>`G${i+1}`),
  revenue: [620,540,720,800,760,920,1010,880,940,990,1120,980,1040,1200],
  expense: [200,180,210,240,230,260,290,250,270,280,310,275,285,320],
})

/* KPI’lar */
const kpis = ref([
  { label:'Ciro',        key:'revenue',    value: '₺42.350', icon:'bi-cash-coin' },
  { label:'İşlem',       key:'tickets',    value: '1.284',    icon:'bi-receipt' },
  { label:'Sepet Ort.',  key:'basket',     value: '₺33',      icon:'bi-bag-check' },
  { label:'Geri Ödeme',  key:'refund',     value: '₺420',     icon:'bi-arrow-counterclockwise' },
])

/* Bölümler / açıklamalar */
const sections = ref([
  { title: 'Gün / Hafta / Ay', text: 'Zamana göre gelir–gider, net kârlılık ve trend analizi.' },
  { title: 'Hizmet / Personel', text: 'En çok satan hizmetler, personel performansı ve verimlilik.' },
  { title: 'Şube Karşılaştırma', text: 'Çok şubeli yapıda yan yana kıyaslama ve ısı haritası.' }
])

/* Top listeleri (mock) */
const topServices = ref([
  { name: 'Saç Kesim',         count: 410, rev: 14350 },
  { name: 'Fön',               count: 360, rev: 10800 },
  { name: 'Bakım',             count: 220, rev: 9240  },
  { name: 'Boyama',            count: 160, rev: 8800  },
])
const topStaff = ref([
  { name: 'Elif',  count: 380, rev: 14200 },
  { name: 'Mert',  count: 295, rev: 11800 },
  { name: 'Seda',  count: 225, rev: 9800  },
  { name: 'Ayşe',  count: 210, rev: 8700  },
])

/* Şube ısı haritası (0–100 ölçekli) */
const branches = ref(['Merkez','Şube-1','Şube-2','Şube-3'])
const heat = ref([
  [72,58,64,80,66,92,75],
  [55,61,52,68,70,76,60],
  [63,71,69,74,79,82,77],
  [48,57,53,59,62,66,58],
])
const weekDays = ref(['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'])

/* === Basit SVG çizimleri için yardımcılar === */
const maxY = computed(()=>Math.max(...series.value.revenue, ...series.value.expense, 1))
function barHeights(arr:number[], h=36) {
  const m = Math.max(...arr, 1)
  return arr.map(v => Math.round((v/m)*h))
}
function linePath(arr:number[], w=160, h=48, pad=4){
  const n = arr.length
  if (n === 0) return ''
  const maxv = Math.max(...arr, 1)
  const dx = (w - pad*2) / (n - 1)
  const y = (v:number) => Math.round(h - pad - (v/maxv)*(h - pad*2))
  return arr.map((v,i)=> `${i===0?'M':'L'} ${Math.round(pad + i*dx)} ${y(v)}`).join(' ')
}
function fmtTRY(n:number){ return new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:0}).format(n) }
</script>

<template>
  <section class="container py-5">
    <!-- HERO / Üst blok -->
    <div class="row align-items-center g-4">
      <div class="col-lg-6">
        <h1 class="mb-2">Raporlama &amp; Analitik</h1>
        <p class="text-muted">
          Karar vermeyi hızlandıran metrikler, segmentler ve temiz görseller. Dönem, kırılım ve karşılaştırma
          seçenekleriyle “nereden kazanıyor, nerede kaybediyoruz?” sorularına net yanıt.
        </p>

        <div class="d-flex flex-wrap gap-2 mt-3">
          <a href="/#fiyat" class="btn btn-brand"><i class="bi bi-rocket-takeoff"></i> Hemen Başla</a>
          <a href="#icerik" class="btn btn-ghost"><i class="bi bi-info-circle"></i> Detay Gör</a>
        </div>
      </div>

      <!-- KPI grid + mini grafikler -->
      <div class="col-lg-6">
        <div class="kpi-grid">
          <div v-for="(k,i) in kpis" :key="i" class="kpi-box">
            <div class="d-flex align-items-center justify-content-between">
              <div class="kpi-icon"><i :class="`bi ${k.icon}`" /></div>
              <span class="kpi-label">{{ k.label }}</span>
            </div>
            <div class="kpi-value mt-1">{{ k.value }}</div>

            <!-- spark line -->
            <svg class="spark" viewBox="0 0 160 48" role="img" aria-label="trend">
              <path :d="linePath(series.revenue)" class="spark-line" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Zaman/kırılım kontrolleri -->
    <div class="d-flex flex-wrap align-items-center gap-2 mt-4">
      <div class="btn-group btn-group-sm" role="tablist" aria-label="Zaman">
        <button class="btn btn-outline-brand" :class="{active: timeframe==='today'}"   @click="timeframe='today'">Gün</button>
        <button class="btn btn-outline-brand" :class="{active: timeframe==='week'}"    @click="timeframe='week'">Hafta</button>
        <button class="btn btn-outline-brand" :class="{active: timeframe==='month'}"   @click="timeframe='month'">Ay</button>
        <button class="btn btn-outline-brand" :class="{active: timeframe==='quarter'}" @click="timeframe='quarter'">Çeyrek</button>
      </div>

      <div class="btn-group btn-group-sm" role="tablist" aria-label="Kırılım">
        <button class="btn btn-outline-brand" :class="{active: groupBy==='service'}" @click="groupBy='service'">Hizmet</button>
        <button class="btn btn-outline-brand" :class="{active: groupBy==='staff'}"   @click="groupBy='staff'">Personel</button>
        <button class="btn btn-outline-brand" :class="{active: groupBy==='branch'}"  @click="groupBy='branch'">Şube</button>
      </div>

      <div class="ms-auto d-flex gap-2">
        <button class="btn btn-ghost btn-sm"><i class="bi bi-download"></i> CSV</button>
        <button class="btn btn-ghost btn-sm"><i class="bi bi-filetype-pdf"></i> PDF</button>
      </div>
    </div>

    <!-- Gelir / Gider sütunları -->
    <div class="card mt-3">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <strong>Gelir / Gider ({{ timeframe.toUpperCase() }})</strong>
          <span class="small text-muted">Maksimum: {{ fmtTRY(maxY) }}</span>
        </div>

        <div class="bars-wrap">
          <div class="bar-col" v-for="(lab,idx) in series.labels" :key="lab">
            <div class="bar bg-expense" :style="{ height: barHeights(series.expense, 48)[idx] + 'px' }" title="Gider"></div>
            <div class="bar bg-revenue" :style="{ height: barHeights(series.revenue, 64)[idx] + 'px' }" title="Gelir"></div>
            <small class="tick">{{ lab }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Üst hizmetler / personel -->
    <div class="row g-3 mt-3">
      <div class="col-lg-6">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="mb-3">En Çok Satan Hizmetler</h6>
            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead><tr><th>Hizmet</th><th class="text-center">Adet</th><th class="text-end">Ciro</th></tr></thead>
                <tbody>
                  <tr v-for="s in topServices" :key="s.name">
                    <td class="fw-semibold">{{ s.name }}</td>
                    <td class="text-center">{{ s.count }}</td>
                    <td class="text-end">{{ fmtTRY(s.rev) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-end mt-3">
              <a class="btn btn-sm btn-outline-brand" href="/pos">POS’a Git</a>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="mb-3">Personel Performansı</h6>
            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead><tr><th>Personel</th><th class="text-center">Adet</th><th class="text-end">Ciro</th></tr></thead>
                <tbody>
                  <tr v-for="p in topStaff" :key="p.name">
                    <td class="fw-semibold">{{ p.name }}</td>
                    <td class="text-center">{{ p.count }}</td>
                    <td class="text-end">{{ fmtTRY(p.rev) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="text-muted small mt-3 mb-0">İade/indirim etkisi net kâra yansıtılır.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Şube ısı haritası -->
    <div class="card mt-3">
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <strong>Şube Karşılaştırma — Isı Haritası</strong>
          <span class="small text-muted">0 (düşük) — 100 (yüksek)</span>
        </div>

        <div class="heat">
          <div class="heat-head">
            <div class="cell"></div>
            <div v-for="d in weekDays" :key="d" class="cell cell-h">{{ d }}</div>
          </div>

          <div v-for="(row,ri) in heat" :key="ri" class="heat-row">
            <div class="cell cell-r">{{ branches[ri] }}</div>
            <div v-for="(v,ci) in row" :key="ci" class="cell"
                 :style="{'--v': v/100}"
                 :title="`${branches[ri]} – ${weekDays[ci]}: ${v}`"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- İçerik kartları -->
    <div id="icerik" class="row g-4 mt-3">
      <div v-for="(s,i) in sections" :key="i" class="col-12 col-md-4">
        <div class="card h-100 shadow-sm card-hover">
          <div class="card-body">
            <h5 class="mb-2">{{ s.title }}</h5>
            <p class="mb-0 text-muted">{{ s.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center mt-5">
      <a href="/#fiyat" class="btn btn-brand btn-lg">Planları Gör</a>
      <a href="/pos" class="btn btn-link-brand ms-2">POS’a Dön</a>
    </div>
  </section>
</template>

<style scoped>
/* KPI grid */
.kpi-grid{
  display:grid; grid-template-columns:repeat(2,1fr); gap:12px;
}
@media(min-width:768px){ .kpi-grid{ grid-template-columns:repeat(4,1fr); } }
.kpi-box{
  border:1px solid var(--bs-border-color); background:var(--surface);
  border-radius:1rem; padding:14px;
}
.kpi-icon{ font-size:1.15rem; }
.kpi-label{ color: var(--muted-500); font-size:.9rem; }
.kpi-value{ font-weight:800; font-size:1.35rem }

/* Spark line */
.spark{ width:100%; height:48px; margin-top:.25rem }
.spark-line{
  fill:none; stroke: color-mix(in srgb, var(--brand) 70%, #6ea8fe);
  stroke-width:2;
}

/* Bars */
.bars-wrap{
  display:grid; grid-template-columns: repeat(14, minmax(0,1fr));
  gap:6px; align-items:end;
  height: 92px; padding-top: 6px;
}
.bar-col{ display:flex; flex-direction:column; align-items:center; gap:4px }
.bar{
  width: 12px; border-radius: 6px;
  border: 1px solid var(--bs-border-color);
  background: var(--surface-2);
}
.bg-revenue{ background: color-mix(in srgb, var(--brand) 30%, var(--surface)); }
.bg-expense{ background: color-mix(in srgb, var(--brand) 10%, var(--surface)); }
.tick{ font-size:.7rem; color: var(--muted-500); }

/* Heatmap */
.heat{ display:grid; gap:6px }
.heat-head{ display:grid; grid-template-columns: 120px repeat(7,1fr); gap:6px }
.heat-row{ display:grid; grid-template-columns: 120px repeat(7,1fr); gap:6px }
.cell{
  border:1px solid var(--bs-border-color); background: var(--surface); border-radius:.5rem; height:34px;
}
.cell-h, .cell-r{
  display:grid; place-items:center; font-size:.85rem; color: var(--muted-500); height:34px; background: var(--bs-tertiary-bg);
}
.heat-row .cell:not(.cell-r){
  background: linear-gradient(180deg,
    color-mix(in srgb, var(--brand) calc(var(--v, .3)*35%), var(--surface)) 0%,
    var(--surface) 100%);
}

/* Hover/click affordance */
.card-hover{ transition:transform .18s ease, box-shadow .2s ease }
.card-hover:hover{ transform:translateY(-3px); box-shadow:0 12px 30px rgba(0,0,0,.1) }

/* Tema uyumlu butonlar global sınıflarını kullanır (btn-brand, btn-ghost vb.) */
</style>
