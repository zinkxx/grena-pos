<!-- src/views/Pos.vue -->
<script setup lang="ts">
import { ref } from 'vue'

/* === Hero KPI (canlı hissi) === */
const today = ref({ revenue: 3420, tickets: 128, avg: 267 })

/* === Özellik bullet’ları (genişletildi) === */
const bullets = [
  { icon: 'bi-lightning-charge', title: 'Hızlı İşlem', text: 'Tek dokunuş indirim, iptal, iade; kasa devri ve gün sonu.' },
  { icon: 'bi-qr-code-scan',     title: 'QR & Online Ödeme', text: 'QR menü, link ile ödeme, temassız tahsilat.' },
  { icon: 'bi-people',           title: 'Personel Yetkileri', text: 'Rol bazlı yetkilendirme ve işlem log’ları.' },
  { icon: 'bi-printer',          title: 'Fiş & Yazıcı', text: 'USB/Ağ yazıcı, fiş şablonu, logo ve başlık-ayak metinleri.' },
  { icon: 'bi-upc-scan',         title: 'Barkod & Hızlı Arama', text: 'Barkod okuma, PLU kısa kod, son kullanılanlar.' },
  { icon: 'bi-columns-gap',      title: 'Aynı Ekranda Çoklu Adisyon', text: 'Masalar ve bekleyen adisyonlar arası tek tık geçiş.' }
]

/* === 3 adım akış === */
const steps = [
  { icon: 'bi-1-circle', title: 'Kurulum', text: 'Uygulamayı açın, cihazı ekleyin.' },
  { icon: 'bi-2-circle', title: 'Tanımla', text: 'Ürün/hizmet, fiyat, personel ekleyin.' },
  { icon: 'bi-3-circle', title: 'Satış',   text: 'Adisyon oluşturun, tahsilatı alın.' }
]

/* === Kısayollar (cheatsheet) === */
const hotkeys = [
  { key: 'F1', label: 'Yeni adisyon' },
  { key: 'F2', label: 'İndirim (%)' },
  { key: 'F3', label: 'İade/İptal' },
  { key: 'F4', label: 'Barkod ara' },
  { key: 'F6', label: 'Müşteri seç' },
  { key: 'F9', label: 'Tahsilat' },
]

/* === Yetki matrisi (özet) === */
const roles = [
  { role: 'Kasiyer',    perms: ['Satış', 'İndirim (limitli)', 'İade (onaylı)'] },
  { role: 'Sorumlu',    perms: ['Satış', 'İndirim', 'İade', 'Gün sonu'] },
  { role: 'Yönetici',   perms: ['Tümü', 'Rapor', 'Kullanıcı', 'Şube'] },
]

/* === Entegre ödeme/yazıcılar (chip) === */
const integrations = [
  { name: 'Sanal POS',  icon: 'bi-credit-card' },
  { name: 'QR Ödeme',   icon: 'bi-qr-code' },
  { name: 'Yazıcı (USB/Ağ)', icon: 'bi-printer' },
  { name: 'E-Fatura',   icon: 'bi-file-earmark-text' },
  { name: 'Mail/SMS',   icon: 'bi-envelope-paper' },
]
</script>

<template>
  <section class="container py-5">
    <div class="row align-items-center g-4">
      <!-- Sol: başlık + CTA -->
      <div class="col-lg-6">
        <h1 class="mb-2">Adisyon &amp; POS</h1>
        <p class="text-muted">
          Kuaför ve güzellik işletmeleri için ışık hızında adisyon, tahsilat ve kasa yönetimi.
          Barkod, kısayol, QR ödeme, yazıcı ve rol bazlı yetki—hepsi tek ekranda.
        </p>
        <div class="d-flex flex-wrap gap-2 mt-3">
          <a href="/#fiyat" class="btn btn-brand"><i class="bi bi-rocket-takeoff"></i> Hemen Başla</a>
          <a href="#ozellikler" class="btn btn-ghost"><i class="bi bi-info-circle"></i> Detay Gör</a>
        </div>

        <!-- Hızlı KPI -->
        <div class="kpis row g-3 mt-4">
          <div class="col-4">
            <div class="kpi-box text-center p-3">
              <div class="kpi-h">{{ new Intl.NumberFormat('tr-TR', { style:'currency', currency:'TRY', maximumFractionDigits:0 }).format(today.revenue) }}</div>
              <div class="kpi-l">Bugün Gelir</div>
            </div>
          </div>
          <div class="col-4">
            <div class="kpi-box text-center p-3">
              <div class="kpi-h">{{ today.tickets }}</div>
              <div class="kpi-l">Adisyon</div>
            </div>
          </div>
          <div class="col-4">
            <div class="kpi-box text-center p-3">
              <div class="kpi-h">{{ new Intl.NumberFormat('tr-TR').format(today.avg) }} ₺</div>
              <div class="kpi-l">Seans Ort.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sağ: POS ön-izleme (mock) -->
      <div class="col-lg-6">
        <div class="preview-box rounded-3 p-3">
          <div class="d-flex justify-content-between align-items-center">
            <strong>Bugün</strong>
            <span class="badge bg-success-subtle text-success border">+₺3.420</span>
          </div>

          <div class="tiny-bars mt-2" aria-hidden="true">
            <span v-for="i in 32" :key="i" class="bar"></span>
          </div>

          <div class="pos-mock row g-2 mt-3">
            <div class="col-7">
              <div class="adisyon p-2 rounded-3">
                <div class="d-flex justify-content-between small text-muted mb-2">
                  <span>#4532</span><span>Maske — Stil — Boya</span>
                </div>
                <div class="line d-flex justify-content-between"><span>Saç Kesim</span><span>₺350</span></div>
                <div class="line d-flex justify-content-between"><span>Fön</span><span>₺250</span></div>
                <div class="line d-flex justify-content-between"><span>Bakım</span><span>₺420</span></div>
                <div class="total d-flex justify-content-between mt-2"><strong>Toplam</strong><strong>₺1.020</strong></div>
              </div>
            </div>
            <div class="col-5">
              <div class="keys d-grid">
                <button class="btn btn-outline-brand btn-sm">% İndirim</button>
                <button class="btn btn-outline-brand btn-sm">İade</button>
                <button class="btn btn-outline-brand btn-sm">Barkod</button>
                <button class="btn btn-brand btn-sm">Tahsilat</button>
              </div>
            </div>
          </div>

          <div class="text-end mt-3">
            <a href="/reports" class="btn btn-sm btn-outline-brand">Raporlara Git</a>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-5" />

    <!-- Özellikler -->
    <div id="ozellikler" class="row g-4">
      <div v-for="(b,i) in bullets" :key="i" class="col-12 col-md-6 col-xl-4">
        <div class="card h-100 shadow-sm card-hover">
          <div class="card-body d-flex gap-3">
            <i :class="`bi ${b.icon} fs-4`"></i>
            <div>
              <h5 class="mb-1">{{ b.title }}</h5>
              <p class="mb-0 text-muted">{{ b.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3 Adım -->
    <h3 class="mt-5 mb-3">3 Adımda Kurulum</h3>
    <div class="d-grid gap-3">
      <div v-for="(s,i) in steps" :key="i" class="d-flex gap-3 align-items-start step-item">
        <div class="step-icon"><i :class="`bi ${s.icon}`" /></div>
        <div><strong>{{ s.title }}</strong><div class="text-muted small">{{ s.text }}</div></div>
      </div>
    </div>

    <!-- Kısayollar + Yetkiler -->
    <div class="row g-4 mt-5">
      <div class="col-lg-6">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="mb-3">Klavye Kısayolları</h5>
            <div class="d-flex flex-wrap gap-2">
              <span v-for="h in hotkeys" :key="h.key" class="kbd-chip">
                <kbd>{{ h.key }}</kbd> <span class="ms-1">{{ h.label }}</span>
              </span>
            </div>
            <p class="text-muted small mt-3 mb-0">Not: Dokunmatik ekranda bu aksiyonlar “Hızlı Tuşlar” panelinde.</p>
          </div>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="mb-3">Rol Bazlı Yetkiler</h5>
            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Rol</th>
                    <th>Yetkiler</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in roles" :key="r.role">
                    <td class="fw-semibold">{{ r.role }}</td>
                    <td class="text-muted">
                      <span v-for="(p,idx) in r.perms" :key="idx" class="badge bg-light text-dark border me-1 mb-1">{{ p }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="text-muted small mt-3 mb-0">Tüm kritik aksiyonlar ayrıntılı işlem log’larına yazılır.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Entegrasyon şeridi -->
    <div class="integrations row g-3 mt-5">
      <div class="col-12"><h5>Entegrasyonlar</h5></div>
      <div v-for="it in integrations" :key="it.name" class="col-auto">
        <span class="int-chip"><i :class="`bi ${it.icon}`"></i> {{ it.name }}</span>
      </div>
    </div>

    <!-- SSS -->
    <div class="accordion mt-5" id="posFaq">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
            Yazıcı kurulumunu nasıl yaparım?
          </button>
        </h2>
        <div id="q1" class="accordion-collapse collapse" data-bs-parent="#posFaq">
          <div class="accordion-body small">
            Ayarlar &gt; Yazıcılar menüsünden USB/Ağ yazıcı ekleyin; fiş şablonu ve logo ekini aynı ekrandan tanımlayın.
          </div>
        </div>
      </div>
      <div class="accordion-item mt-2">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
            İndirim ve iade yetkisini kimler kullanır?
          </button>
        </h2>
        <div id="q2" class="accordion-collapse collapse" data-bs-parent="#posFaq">
          <div class="accordion-body small">
            Rol ayarlarından “Kasiyer/Sorumlu/Yönetici” için limit ve onay koşullarını ayrı ayrı belirleyebilirsiniz.
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="text-center mt-5">
      <a href="/#fiyat" class="btn btn-brand btn-lg">Planları Gör</a>
      <a href="/#hizmetler" class="btn btn-link-brand ms-2">Diğer Hizmetler</a>
    </div>
  </section>
</template>

<style scoped>
/* Hero KPI kutuları */
.kpi-box{ border:1px solid var(--bs-border-color); background:var(--surface); border-radius: .75rem; }
.kpi-h{ font-weight:800; font-size: clamp(1.1rem, 2.6vw, 1.4rem); }
.kpi-l{ color:var(--muted-500); font-size:.9rem }

/* POS preview */
.preview-box{ border:1px solid var(--bs-border-color); background:var(--surface); }
.tiny-bars{ display:grid; grid-template-columns:repeat(32,1fr); gap:3px; }
.tiny-bars .bar{ height:24px; border-radius:4px; background:color-mix(in srgb, var(--brand) 20%, var(--surface-2)); }
.tiny-bars .bar:nth-child(3n){ height:16px } .tiny-bars .bar:nth-child(5n){ height:30px } .tiny-bars .bar:nth-child(7n){ height:20px }
.pos-mock .adisyon{ border:1px solid var(--bs-border-color); background:var(--surface) }
.pos-mock .adisyon .line{ border-bottom:1px dashed var(--bs-border-color); padding:.25rem 0 }
.pos-mock .adisyon .line:last-child{ border-bottom:0 }
.pos-mock .keys{ grid-template-columns: 1fr 1fr; }
.pos-mock .keys .btn{ width:100% }

/* Kart ve hover */
.card-hover{ transition:transform .18s ease, box-shadow .2s ease } 
.card-hover:hover{ transform:translateY(-3px); box-shadow:0 12px 30px rgba(0,0,0,.1) }

/* 3 adım timeline */
.step-item{ border-bottom:1px dashed var(--bs-border-color); padding-bottom:.6rem } 
.step-item:last-child{ border-bottom:0 }
.step-icon{ width:36px;height:36px;display:grid;place-items:center;border-radius:.75rem;background:color-mix(in srgb, var(--brand) 10%, var(--surface));border:1px solid var(--bs-border-color) }

/* Kısayol chip’leri */
.kbd-chip{
  border:1px solid var(--bs-border-color);
  background: var(--surface);
  border-radius: .6rem;
  padding: .35rem .6rem;
  font-size: .9rem;
}
.kbd-chip kbd{
  background: color-mix(in srgb, var(--brand) 8%, var(--surface));
  padding: .15rem .35rem;
  border-radius: .35rem;
  border:1px solid var(--bs-border-color);
}

/* Entegrasyon chip’leri */
.int-chip{
  display:inline-flex; align-items:center; gap:.5rem;
  border:1px solid var(--bs-border-color);
  background: var(--surface);
  padding:.35rem .6rem; border-radius:999px; font-size:.9rem;
}

/* Tablo */
.table thead th{ border-bottom:1px solid var(--bs-border-color); }
.table td, .table th{ border-color: var(--bs-border-color); }
</style>
