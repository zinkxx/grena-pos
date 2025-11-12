<!-- src/views/Appointments.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'

/* ===================== STATE ===================== */
type ViewMode = 'day'|'week'|'month'
const viewMode = ref<ViewMode>('day')

const selectedDate = ref(new Date()) // merkez tarih
const staff = ['Elif','Mert','Seda','Ayşe']
const services = ['Saç Kesim','Fön','Bakım','Boyama']
const selectedStaff = ref<string[]>([])
const selectedService = ref<string>('Hepsi')

/* ===================== MOCK RANDEVULAR ===================== */
type Appt = {
  id: string
  title: string
  customer: string
  staff: string
  service: string
  start: string // ISO
  end: string   // ISO
  status: 'confirmed'|'pending'|'noshow'
  notes?: string
}
const appts = ref<Appt[]>([
  // 12 Kasım — Gün görünümünde çakışma örnekleri de var
  { id:'a1',  title:'Saç Kesim', customer:'Cansu K.', staff:'Elif', service:'Saç Kesim', start:'2025-11-12T09:00:00', end:'2025-11-12T09:40:00', status:'confirmed' },
  { id:'a2',  title:'Bakım',     customer:'Deniz T.', staff:'Mert', service:'Bakım',     start:'2025-11-12T10:00:00', end:'2025-11-12T11:10:00', status:'pending' },
  { id:'a3',  title:'Fön',       customer:'Eda Y.',   staff:'Seda', service:'Fön',       start:'2025-11-12T11:00:00', end:'2025-11-12T11:30:00', status:'confirmed' },
  { id:'a9',  title:'Boyama',    customer:'Nil S.',   staff:'Ayşe', service:'Boyama',    start:'2025-11-12T12:00:00', end:'2025-11-12T14:00:00', status:'confirmed' },
  { id:'a10', title:'Fön',       customer:'Hande Ç.', staff:'Elif', service:'Fön',       start:'2025-11-12T12:15:00', end:'2025-11-12T12:45:00', status:'confirmed' }, // a9 ile hafif çakışma (kaynak farklıysa sorun değil)
  { id:'a11', title:'Bakım',     customer:'Beren U.', staff:'Mert', service:'Bakım',     start:'2025-11-12T13:30:00', end:'2025-11-12T14:30:00', status:'confirmed' },
  { id:'a12', title:'Saç Kesim', customer:'Aytuğ K.', staff:'Seda', service:'Saç Kesim', start:'2025-11-12T15:00:00', end:'2025-11-12T15:40:00', status:'pending' },

  // 13 Kasım
  { id:'a4',  title:'Boyama',    customer:'Selin A.', staff:'Ayşe', service:'Boyama',    start:'2025-11-13T14:00:00', end:'2025-11-13T16:00:00', status:'confirmed' },
  { id:'a13', title:'Fön',       customer:'İrem D.',  staff:'Elif', service:'Fön',       start:'2025-11-13T09:30:00', end:'2025-11-13T10:00:00', status:'confirmed' },
  { id:'a14', title:'Bakım',     customer:'Ece R.',   staff:'Mert', service:'Bakım',     start:'2025-11-13T10:00:00', end:'2025-11-13T11:00:00', status:'confirmed' },
  { id:'a15', title:'Saç Kesim', customer:'Gökçe P.', staff:'Seda', service:'Saç Kesim', start:'2025-11-13T11:15:00', end:'2025-11-13T11:50:00', status:'noshow' }, // no-show örnek

  // 14 Kasım
  { id:'a5',  title:'Bakım',     customer:'Gizem Z.', staff:'Elif', service:'Bakım',     start:'2025-11-14T16:00:00', end:'2025-11-14T16:45:00', status:'confirmed' },
  { id:'a16', title:'Fön',       customer:'Sıla N.',  staff:'Ayşe', service:'Fön',       start:'2025-11-14T09:00:00', end:'2025-11-14T09:30:00', status:'confirmed' },
  { id:'a17', title:'Boyama',    customer:'Nazan M.', staff:'Seda', service:'Boyama',    start:'2025-11-14T10:30:00', end:'2025-11-14T12:30:00', status:'pending' },

  // 15 Kasım
  { id:'a6',  title:'Fön',       customer:'Hazal K.', staff:'Mert', service:'Fön',       start:'2025-11-15T10:30:00', end:'2025-11-15T11:10:00', status:'confirmed' },
  { id:'a18', title:'Saç Kesim', customer:'Seda B.',  staff:'Elif', service:'Saç Kesim', start:'2025-11-15T11:00:00', end:'2025-11-15T11:40:00', status:'confirmed' }, // a6 ile yarım çakışma
  { id:'a19', title:'Bakım',     customer:'Emre A.',  staff:'Ayşe', service:'Bakım',     start:'2025-11-15T13:00:00', end:'2025-11-15T13:50:00', status:'confirmed' },

  // 16 Kasım (Pazar)
  { id:'a20', title:'Fön',       customer:'Melis K.', staff:'Seda', service:'Fön',       start:'2025-11-16T12:00:00', end:'2025-11-16T12:30:00', status:'confirmed' },
  { id:'a21', title:'Boyama',    customer:'Ahu T.',   staff:'Elif', service:'Boyama',    start:'2025-11-16T13:00:00', end:'2025-11-16T15:00:00', status:'confirmed' },

  // 17 Kasım
  { id:'a22', title:'Saç Kesim', customer:'Eylül Z.', staff:'Mert', service:'Saç Kesim', start:'2025-11-17T09:00:00', end:'2025-11-17T09:40:00', status:'confirmed' },
  { id:'a23', title:'Bakım',     customer:'Kaan D.',  staff:'Ayşe', service:'Bakım',     start:'2025-11-17T10:00:00', end:'2025-11-17T11:00:00', status:'pending' },
  { id:'a24', title:'Fön',       customer:'Selda B.', staff:'Elif', service:'Fön',       start:'2025-11-17T11:00:00', end:'2025-11-17T11:30:00', status:'confirmed' },

  // 18 Kasım — mevcut iki kayıt + ekstra
  { id:'a7',  title:'Boyama',    customer:'Buse Ç.',  staff:'Seda', service:'Boyama',    start:'2025-11-18T12:00:00', end:'2025-11-18T14:00:00', status:'pending' },
  { id:'a8',  title:'Saç Kesim', customer:'Yasemin',  staff:'Elif', service:'Saç Kesim', start:'2025-11-18T12:30:00', end:'2025-11-18T13:00:00', status:'confirmed' }, // üst üste
  { id:'a25', title:'Bakım',     customer:'Mehmet F.',staff:'Mert', service:'Bakım',     start:'2025-11-18T15:30:00', end:'2025-11-18T16:20:00', status:'confirmed' },

  // 19 Kasım
  { id:'a26', title:'Fön',       customer:'Yeliz G.', staff:'Ayşe', service:'Fön',       start:'2025-11-19T10:00:00', end:'2025-11-19T10:30:00', status:'confirmed' },
  { id:'a27', title:'Saç Kesim', customer:'Burcu E.', staff:'Seda', service:'Saç Kesim', start:'2025-11-19T11:00:00', end:'2025-11-19T11:40:00', status:'confirmed' },
  { id:'a28', title:'Boyama',    customer:'Arzu N.',  staff:'Elif', service:'Boyama',    start:'2025-11-19T13:00:00', end:'2025-11-19T15:00:00', status:'noshow' },

  // 20 Kasım
  { id:'a29', title:'Bakım',     customer:'Derin S.', staff:'Mert', service:'Bakım',     start:'2025-11-20T09:30:00', end:'2025-11-20T10:20:00', status:'confirmed' },
  { id:'a30', title:'Fön',       customer:'Tuna K.',  staff:'Ayşe', service:'Fön',       start:'2025-11-20T10:30:00', end:'2025-11-20T11:00:00', status:'pending' }
])

/* ===================== DATE HELPERS ===================== */
const pad = (n:number)=> String(n).padStart(2,'0')
const ymd = (d:Date)=> `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
const hm  = (d:Date)=> `${pad(d.getHours())}:${pad(d.getMinutes())}`

function addDays(base:Date, n:number){ const d=new Date(base); d.setDate(d.getDate()+n); return d }
function addMonths(base:Date, n:number){ const d=new Date(base); d.setMonth(d.getMonth()+n); return d }
function startOfWeek(d:Date){ const x=new Date(d); const day=(x.getDay()+6)%7; x.setDate(x.getDate()-day); x.setHours(0,0,0,0); return x } // Monday
function endOfWeek(d:Date){ const s=startOfWeek(d); return addDays(s,6) }
function startOfMonth(d:Date){ const x=new Date(d.getFullYear(), d.getMonth(), 1); return x }
function endOfMonth(d:Date){ const x=new Date(d.getFullYear(), d.getMonth()+1, 0); return x }

/* Ay görünümü matrisi (6x7) */
const monthMatrix = computed(()=>{
  const start = startOfMonth(selectedDate.value)
  const end = endOfMonth(selectedDate.value)
  const offset = (start.getDay()+6)%7 // Mon=0
  const firstCell = addDays(start, -offset)
  const weeks: Date[][] = []
  for(let w=0; w<6; w++){
    const row: Date[] = []
    for(let i=0;i<7;i++) row.push(addDays(firstCell, w*7+i))
    weeks.push(row)
  }
  return weeks
})

/* ===================== FİLTRELER ===================== */
function toggleStaff(name: string){
  const i = selectedStaff.value.indexOf(name)
  if (i >= 0) selectedStaff.value.splice(i,1)
  else selectedStaff.value.push(name)
}

const filteredAppts = computed(()=>{
  return appts.value.filter(a=>{
    if (selectedStaff.value.length && !selectedStaff.value.includes(a.staff)) return false
    if (selectedService.value!=='Hepsi' && a.service!==selectedService.value) return false
    return true
  })
})

/* Görünüme göre randevular */
const dayAppts = computed(()=>{
  const key = ymd(selectedDate.value)
  return filteredAppts.value
    .filter(a=> a.start.startsWith(key))
    .sort((x,y)=> +new Date(x.start) - +new Date(y.start))
})

const weekAppts = computed(()=>{
  const s = startOfWeek(selectedDate.value)
  const e = endOfWeek(selectedDate.value)
  return filteredAppts.value.filter(a=>{
    const d = new Date(a.start)
    return d>=s && d<=addDays(e,1)
  })
})

const monthAppts = computed(()=>{
  const s = startOfMonth(selectedDate.value)
  const e = endOfMonth(selectedDate.value)
  return filteredAppts.value.filter(a=>{
    const d = new Date(a.start)
    return d>=s && d<=e
  })
})

/* Günlük zaman çizelgesi (09:00-20:00, 30dk adım) */
const timeline = Array.from({length: (11*2)+1}, (_,i)=> {
  const h = 9 + Math.floor(i/2)
  const m = i%2 ? 30 : 0
  return `${pad(h)}:${pad(m)}`
})

/* Çakışma / bekleme listesi (demo) */
const collisions = computed(()=>{
  const list: {id1:string; id2:string}[] = []
  const day = dayAppts.value.map(a=>({a, s:+new Date(a.start), e:+new Date(a.end)}))
  for(let i=0;i<day.length;i++){
    for(let j=i+1;j<day.length;j++){
      const x=day[i], y=day[j]
      if (x.s < y.e && y.s < x.e) list.push({id1:x.a.id,id2:y.a.id})
    }
  }
  return list
})

/* ===================== NAV ===================== */
function toToday(){ selectedDate.value = new Date() }
function prev(){ 
  if (viewMode.value==='day') selectedDate.value = addDays(selectedDate.value, -1)
  else if (viewMode.value==='week') selectedDate.value = addDays(selectedDate.value, -7)
  else selectedDate.value = addMonths(selectedDate.value, -1)
}
function next(){
  if (viewMode.value==='day') selectedDate.value = addDays(selectedDate.value, +1)
  else if (viewMode.value==='week') selectedDate.value = addDays(selectedDate.value, +7)
  else selectedDate.value = addMonths(selectedDate.value, +1)
}
</script>

<template>
  <section class="container py-5">
    <!-- HERO / Başlık -->
    <div class="row align-items-center g-4 mb-2">
      <div class="col-lg-7">
        <h1 class="mb-2">Randevu Yönetimi</h1>
        <p class="text-muted mb-0">
          Gün/Hafta/Ay takvimleri, sürükle-bırak mantığına uygun grid, otomatik hatırlatma (SMS/WhatsApp),
          çift yönlü takvim aboneliği (ICS/Webhook) ve çakışma uyarılarıyla doluluk odaklı planlama.
        </p>
      </div>
      <div class="col-lg-5">
        <div class="kpi-grid">
          <div class="kpi-box"><div class="kpi-label"><i class="bi bi-calendar2-check"></i> Bugünkü Randevu</div><div class="kpi-value">{{ dayAppts.length }}</div></div>
          <div class="kpi-box"><div class="kpi-label"><i class="bi bi-graph-up-arrow"></i> Hafta Toplam</div><div class="kpi-value">{{ weekAppts.length }}</div></div>
          <div class="kpi-box"><div class="kpi-label"><i class="bi bi-people"></i> Personel</div><div class="kpi-value">{{ staff.length }}</div></div>
          <div class="kpi-box"><div class="kpi-label"><i class="bi bi-bell"></i> Hatırlatma</div><div class="kpi-value">Aktif</div></div>
        </div>
      </div>
    </div>

    <!-- Kontroller -->
    <div class="card controls mt-3">
      <div class="card-body d-flex flex-wrap align-items-center gap-2">
        <!-- View toggle -->
        <div class="btn-group btn-group-sm" role="tablist" aria-label="Görünüm">
          <button class="btn btn-outline-brand" :class="{active:viewMode==='day'}"   @click="viewMode='day'">Gün</button>
          <button class="btn btn-outline-brand" :class="{active:viewMode==='week'}"  @click="viewMode='week'">Hafta</button>
          <button class="btn btn-outline-brand" :class="{active:viewMode==='month'}" @click="viewMode='month'">Ay</button>
        </div>

        <!-- Date nav -->
        <div class="date-nav d-inline-flex align-items-center gap-1 ms-2">
          <button class="btn btn-ghost btn-sm" @click="prev"><i class="bi bi-chevron-left"></i></button>
          <div class="date-label">
            <input
              class="form-control form-control-sm"
              type="date"
              :value="ymd(selectedDate)"
              @change="(e:any)=> selectedDate = new Date(e.target.value+'T00:00:00')"
            />
          </div>
          <button class="btn btn-ghost btn-sm" @click="next"><i class="bi bi-chevron-right"></i></button>
          <button class="btn btn-outline-brand btn-sm ms-1" @click="toToday">Bugün</button>
        </div>

        <!-- Staff chips -->
        <div class="chips">
          <span class="chip" :class="{active: !selectedStaff.length}" @click="selectedStaff=[]">Tüm Personel</span>
          <span v-for="s in staff" :key="s" class="chip" :class="{active:selectedStaff.includes(s)}" @click="toggleStaff(s)">{{ s }}</span>
        </div>

        <!-- Service dropdown -->
        <div class="dropdown ms-auto">
          <button class="btn btn-ghost btn-sm dropdown-toggle" data-bs-toggle="dropdown">
            <i class="bi bi-sliders"></i> Hizmet: {{ selectedService }}
          </button>
          <ul class="dropdown-menu shadow-sm">
            <li><button class="dropdown-item" @click="selectedService='Hepsi'">Hepsi</button></li>
            <li v-for="srv in services" :key="srv"><button class="dropdown-item" @click="selectedService=srv">{{ srv }}</button></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Content: Day / Week / Month -->
    <div class="mt-3">
      <!-- DAY VIEW: zaman çizelgesi + kartlar -->
      <div v-if="viewMode==='day'" class="day-view">
        <div class="row g-3">
          <div class="col-lg-8">
            <div class="timeline-grid">
              <div class="tl-col tl-time">
                <div v-for="t in timeline" :key="t" class="tl-time-cell">{{ t }}</div>
              </div>
              <div class="tl-col tl-events">
                <div v-for="t in timeline" :key="t" class="tl-slot">
                  <div class="slot-line"></div>
                  <!-- randevular (saat eşleşmesi basit görünüm) -->
                  <template v-for="a in dayAppts" :key="a.id">
                    <div
                      v-if="hm(new Date(a.start))===t"
                      class="appt"
                      :data-status="a.status"
                      :title="`${a.title} • ${a.customer} • ${a.staff}`"
                    >
                      <div class="d-flex justify-content-between">
                        <strong>{{ a.title }}</strong>
                        <span class="badge text-bg-light border">{{ a.staff }}</span>
                      </div>
                      <div class="small text-muted">{{ hm(new Date(a.start)) }}–{{ hm(new Date(a.end)) }} · {{ a.customer }}</div>
                    </div>
                  </template>
                </div>
              </div>
            </div>

            <!-- Çakışmalar / bekleme listesi info -->
            <div v-if="collisions.length" class="alert alert-warning mt-3" role="alert">
              <i class="bi bi-exclamation-triangle"></i>
              <strong> Çakışmalar:</strong>
              <span class="ms-1">Bazı randevular birbiriyle üst üste. Bekleme listesi öner: yakın boş slotlara kaydır.</span>
            </div>
          </div>

          <!-- Gün özeti -->
          <div class="col-lg-4">
            <div class="card shadow-sm">
              <div class="card-body">
                <h6 class="mb-2">Gün Özeti</h6>
                <div class="d-grid gap-2 small">
                  <div class="d-flex justify-content-between"><span>Toplam randevu</span><strong>{{ dayAppts.length }}</strong></div>
                  <div class="d-flex justify-content-between"><span>Onaylı</span><strong>{{ dayAppts.filter(a=>a.status==='confirmed').length }}</strong></div>
                  <div class="d-flex justify-content-between"><span>Beklemede</span><strong>{{ dayAppts.filter(a=>a.status==='pending').length }}</strong></div>
                </div>
                <hr>
                <a href="/#fiyat" class="btn btn-brand w-100">Planları Gör</a>
                <a href="/reports" class="btn btn-link-brand w-100 mt-2">Raporlama</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- WEEK VIEW: gün/saat ızgarası (mini) -->
      <div v-else-if="viewMode==='week'" class="week-view">
        <div class="week-grid">
          <div class="w-head">
            <div class="cell cell-h"></div>
            <div v-for="i in 7" :key="i" class="cell cell-h">
              {{ ['Pzt','Sal','Çar','Per','Cum','Cmt','Paz'][i-1] }}
            </div>
          </div>
          <div class="w-body">
            <div v-for="h in [9,11,13,15,17,19]" :key="h" class="w-row">
              <div class="cell cell-r">{{ pad(h) }}:00</div>
              <div v-for="d in 7" :key="d" class="cell">
                <!-- hücre içi rozetler -->
                <template v-for="a in weekAppts" :key="a.id">
                  <span
                    v-if="(new Date(a.start)).getDay()=== (d%7) /* Mon=1 ... Sun=0 */ &&
                           (new Date(a.start)).getHours()===h"
                    class="badge text-bg-light border me-1"
                    :title="`${a.title} • ${a.customer} • ${a.staff}`"
                  >
                    {{ a.staff }}
                  </span>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="small text-muted mt-2">Ayrıntı için Gün görünümüne geçebilir, sürükle-bırak yeniden planlamayı etkinleştirebilirsiniz (UI hazır).</div>
      </div>

      <!-- MONTH VIEW: 6x7 takvim -->
      <div v-else class="month-view">
        <div class="month-grid">
          <div class="m-head">
            <div v-for="d in ['Pzt','Sal','Çar','Per','Cum','Cmt','Paz']" :key="d" class="cell cell-h">{{ d }}</div>
          </div>
          <div class="m-body">
            <div v-for="(week,wi) in monthMatrix" :key="wi" class="m-row">
              <div v-for="day in week" :key="day.toISOString()" class="cell" :class="{'is-other': day.getMonth()!==selectedDate.getMonth()}">
                <div class="cell-hd">
                  <span class="num">{{ day.getDate() }}</span>
                </div>
                <div class="cell-body">
                  <template v-for="a in monthAppts" :key="a.id">
                    <a
                      v-if="a.start.startsWith(ymd(day))"
                      href="javascript:void(0)"
                      class="pill"
                      :class="{'pill-ok': a.status==='confirmed','pill-wait': a.status==='pending'}"
                      :title="`${a.title} (${a.staff}) • ${hm(new Date(a.start))}`"
                    >
                      {{ hm(new Date(a.start)) }} — {{ a.title }}
                    </a>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="small text-muted mt-2 mb-0">İpucu: Ay görünümünde hücre içindeki randevu “pill” bağlantıları, detay popup’ına bağlanacak şekilde tasarlandı.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===== Genel kutular / temaya uyum ===== */
.kpi-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:12px }
@media(min-width:768px){ .kpi-grid{ grid-template-columns:repeat(4,1fr) } }
.kpi-box{ border:1px solid var(--bs-border-color); background:var(--surface); border-radius:1rem; padding:14px }
.kpi-label{ color:var(--muted-500); font-size:.9rem }
.kpi-value{ font-weight:800; font-size:1.35rem }

/* Kontroller */
.controls .chips{ display:flex; flex-wrap:wrap; gap:6px; margin-left:.5rem }
.chip{ border:1px solid var(--bs-border-color); background:var(--surface-2); color:var(--bs-body-color); padding:.25rem .6rem; border-radius:999px; font-size:.85rem; cursor:pointer }
.chip.active{ background: color-mix(in srgb, var(--brand) 12%, var(--surface)); border-color: var(--brand) }
.date-label input{ min-width: 9.5rem }

/* ===== Day View ===== */
.timeline-grid{ display:grid; grid-template-columns: 82px 1fr; gap:10px }
.tl-time .tl-time-cell{ height:42px; display:grid; place-items:center; font-size:.85rem; color:var(--muted-500) }
.tl-slot{ height:42px; position:relative; border-bottom:1px dashed var(--bs-border-color) }
.slot-line{ position:absolute; left:0; right:0; top:calc(50% - 1px); height:2px; background: color-mix(in srgb, var(--brand) 8%, var(--surface)) }
.appt{
  position:absolute; inset:2px 6px auto 6px;
  border:1px solid var(--bs-border-color); border-radius:.75rem; padding:.4rem .5rem;
  background: var(--surface);
}
.appt[data-status="confirmed"]{ outline:2px solid color-mix(in srgb, var(--brand) 22%, transparent) }
.appt[data-status="pending"]  { outline:2px dashed color-mix(in srgb, var(--brand) 22%, transparent) }

/* ===== Week View ===== */
.week-grid{ display:grid; gap:6px }
.w-head{ display:grid; grid-template-columns: 120px repeat(7,1fr); gap:6px }
.w-body{ display:grid; gap:6px }
.w-row{ display:grid; grid-template-columns: 120px repeat(7,1fr); gap:6px }
.cell{ border:1px solid var(--bs-border-color); background:var(--surface); border-radius:.5rem; min-height:40px; padding:6px }
.cell-h{ display:grid; place-items:center; font-size:.85rem; color:var(--muted-500); background:var(--bs-tertiary-bg) }
.cell-r{ display:grid; place-items:center; font-size:.85rem; color:var(--muted-500); background:var(--bs-tertiary-bg) }

/* ===== Month View ===== */
.month-grid{ display:grid; gap:8px }
.m-head{ display:grid; grid-template-columns: repeat(7,1fr); gap:8px }
.m-head .cell-h{ border:1px solid var(--bs-border-color); background:var(--bs-tertiary-bg); border-radius:.6rem; padding:.4rem; text-align:center; color:var(--muted-500) }
.m-body{ display:grid; gap:8px }
.m-row{ display:grid; grid-template-columns: repeat(7,1fr); gap:8px }
.m-row .cell{ border:1px solid var(--bs-border-color); background:var(--surface); border-radius:.75rem; min-height:110px; display:flex; flex-direction:column }
.m-row .cell.is-other{ opacity:.65 }
.cell-hd{ display:flex; align-items:center; justify-content:space-between; padding:.45rem .55rem; border-bottom:1px dashed var(--bs-border-color) }
.cell-hd .num{ font-weight:600 }
.cell-body{ display:flex; flex-direction:column; gap:6px; padding:.5rem }
.pill{
  display:block; width:100%; font-size:.85rem; border:1px solid var(--bs-border-color);
  border-radius:.6rem; padding:.25rem .4rem; background:var(--surface-2); text-decoration:none; color:inherit
}
.pill-ok{ outline:2px solid color-mix(in srgb, var(--brand) 20%, transparent) }
.pill-wait{ outline:2px dashed color-mix(in srgb, var(--brand) 20%, transparent) }

/* Hover affordance */
.card{ border-color: var(--bs-border-color) }
.card.shadow-sm{ background:var(--surface) }
</style>
