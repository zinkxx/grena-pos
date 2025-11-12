<!-- src/views/Home.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'

/* =================== SLIDER =================== */
const slides = ref([
  { src: 'src/assets/images/b3.png', alt: 'Salon POS ekranı', title: 'Salonunuz için akıllı adisyon', desc: 'Hızlı işlem, kolay takip, mutlu müşteriler.', ctaText: 'Demo Talep Et', ctaHref: '#iletisim' },
  { src: 'src/assets/images/b1.png', alt: 'Gelir gider grafikleri', title: 'Anlık Gelir–Gider Analizi', desc: 'Kasa, stok ve masraf kalemleri tek ekranda.', ctaText: 'Raporları Gör', ctaHref: '#raporlar' },
  { src: 'src/assets/images/b2.png', alt: 'Randevu planlayıcı', title: 'Randevu & Müşteri Yönetimi', desc: 'Hatırlatma entegrasyonları ile no-show’u azaltın.', ctaText: 'Takvimi Aç', ctaHref: '#randevu' }
])

/* =================== ÖNE ÇIKANLAR =================== */
const features = ref([
  { icon: 'bi-lightning-charge', title: 'Çok Hızlı', text: 'Tek dokunuşta işlem tamamlama.' },
  { icon: 'bi-shield-check',     title: 'Güvenli',   text: 'Rol bazlı yetki + işlem logları.' },
  { icon: 'bi-cloud-arrow-up',   title: 'Bulut Senkron', text: 'Şubeler arası anlık eşitleme.' },
  { icon: 'bi-phone',            title: 'Mobil Uyumlu',  text: 'Telefon, tablet ve PC uyumu.' },
  { icon: 'bi-qr-code-scan',     title: 'QR & Ödeme',    text: 'QR menü ve temassız ödeme.' },
  { icon: 'bi-gear-wide-connected', title: 'Modüler',   text: 'İhtiyacın kadarını aktif et.' },
])

/* =================== HİZMETLER (Filtreli) =================== */
const services = ref([
  { icon: 'bi-receipt-cutoff',   title: 'Adisyon & POS',   text: 'Hızlı ürün/servis, indirim, iptal, kasa devri.', tag: 'Kasa' },
  { icon: 'bi-graph-up-arrow',   title: 'Gelir–Gider',     text: 'Günlük/haftalık rapor; masraf & tedarik.',       tag: 'Rapor' },
  { icon: 'bi-calendar2-check',  title: 'Randevu & CRM',   text: 'Müşteri kartı; hatırlatma entegrasyonları.',     tag: 'CRM' },
  { icon: 'bi-box-seam',         title: 'Stok & Tedarik',  text: 'Kritik seviye uyarıları ve sipariş planlama.',    tag: 'Stok' },
  { icon: 'bi-credit-card',      title: 'Ödeme',           text: 'Sanal POS, linkle ödeme, çoklu cihaz.',          tag: 'Ödeme' },
  { icon: 'bi-chat-dots',        title: 'Bildirimler',     text: 'SMS/WhatsApp/e-posta ile otomasyon.',            tag: 'Otomasyon' },
])
const serviceTabs = ['Tümü', 'Kasa', 'Rapor', 'CRM', 'Stok', 'Ödeme', 'Otomasyon']
const activeTab = ref('Tümü')
const filteredServices = () =>
  activeTab.value === 'Tümü' ? services.value : services.value.filter(s => s.tag === activeTab.value)

/* =================== NASIL ÇALIŞIR (sekme + timeline + checklist + faq) =================== */
const steps = ref([
  { key: 'Kurulum',      icon: 'bi-1-circle', title: 'Kurulum',      text: 'Uygulamayı açın, cihazı ekleyin.' },
  { key: 'Tanımlamalar', icon: 'bi-2-circle', title: 'Tanımlamalar', text: 'Hizmet, fiyat ve personel bilgilerini girin.' },
  { key: 'Başlayın',     icon: 'bi-3-circle', title: 'Başlayın',     text: 'Kasayı açın; adisyonu başlatın, raporlayın.' }
])
const currentStep = ref<'Kurulum' | 'Tanımlamalar' | 'Başlayın'>('Kurulum')

type StepDetail = { bullets: string[]; tip: string }
const stepDetails = ref<Record<string, StepDetail>>({
  Kurulum: {
    bullets: [
      'Cihaz ekle ve yetki düzeyini seç',
      'Şube bilgilerini doğrula',
      'Yedekleme ve senkronu etkinleştir'
    ],
    tip: 'İlk girişte PWA kur → masaüstü kısayoluyla tek tık başlat.'
  },
  Tanımlamalar: {
    bullets: [
      'Hizmet & ürün fiyatlarını içe aktar',
      'Personel & komisyon yüzdeleri',
      'Randevu takvim slotları ve çalışma saatleri'
    ],
    tip: 'Sık kullanılan hizmetlere “hızlı buton” ata, adisyon hızlansın.'
  },
  Başlayın: {
    bullets: [
      'Kasayı aç ve POS’u başlat',
      'Randevuları teyitle, bildirimleri gönder',
      'Gün sonu raporunu PDF/Excel dışa aktar'
    ],
    tip: '“Hızlı indirim” kısa yolunu aktif et (Shift + %).'
  }
})

const stats = ref([
  { value: '12K+',  label: 'Aylık İşlem' },
  { value: '99.9%', label: 'Uptime' },
  { value: '2 dk',  label: 'Kurulum' },
  { value: '24/7',  label: 'Destek' }
])

const stepIndex = computed(() => steps.value.findIndex(s => s.key === currentStep.value))
const stepProgress = computed(() => Math.round(((stepIndex.value + 1) / steps.value.length) * 100))

/* =================== ENTEGRASYONLAR =================== */
type IntItem = { name: string; icon: string; tier: 'Yerel'|'Doğrudan'|'Webhook'|'Beta' }
const integrations = ref<IntItem[]>([
  { name: 'WhatsApp',       icon: 'bi-whatsapp',       tier: 'Doğrudan' },
  { name: 'SMS',            icon: 'bi-chat-left-text', tier: 'Doğrudan' },
  { name: 'E-posta',        icon: 'bi-envelope',       tier: 'Yerel' },
  { name: 'e-Fatura',       icon: 'bi-file-earmark',   tier: 'Webhook' },
  { name: 'Sanal POS',      icon: 'bi-credit-card',    tier: 'Doğrudan' },
  { name: 'Google Takvim',  icon: 'bi-calendar3',      tier: 'Webhook' },
  { name: 'Logo/Mikro',     icon: 'bi-diagram-3',      tier: 'Beta' },
])

/* =================== FİYATLANDIRMA =================== */
const plans = ref([
  { name: 'Başlangıç',    price: '₺599',  period: ' / ilk ay', highlight: false, perks: ['Tek cihaz', 'Adisyon & POS', 'Basit raporlar', 'Destek yok'] },
  { name: 'Profesyonel',  price: '₺1699', period: ' / ay',     highlight: true,  perks: ['Çoklu cihaz', 'Gelir–Gider & Stok', 'Randevu hatırlatma', 'Öncelikli destek'] },
  { name: 'Kurumsal',     price: 'Teklif',period: '',          highlight: false, perks: ['Sınırsız şube', 'Gelişmiş entegrasyon', 'Özel raporlama', 'SLA ile 7/24'] }
])

const billingCycle = ref<'monthly' | 'yearly'>('monthly')
const YEARLY_DISCOUNT = 0.2
const priceNumber = (priceStr: string | undefined) => {
  if (!priceStr) return null
  const n = Number(String(priceStr).replace(/[^0-9]/g, ''))
  return Number.isFinite(n) && n > 0 ? n : null
}
const fmtTRY = (n: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n)
const displayedPlans = computed(() =>
  plans.value.map(p => {
    if (p.price === 'Teklif') return { ...p, _priceText: 'Teklif', _periodText: '', _savings: null as null | string }
    const monthly = priceNumber(p.price) || 0
    if (billingCycle.value === 'monthly') {
      return { ...p, _priceText: fmtTRY(monthly), _periodText: '/ ay', _savings: null as null | string }
    } else {
      const yearly  = Math.round(monthly * 12 * (1 - YEARLY_DISCOUNT))
      const savings = Math.round(monthly * 12 - yearly)
      return { ...p, _priceText: fmtTRY(yearly), _periodText: '/ yıl', _savings: fmtTRY(savings) }
    }
  })
)

/* =================== KULLANICI YORUMLARI =================== */
type Testi = { name: string; quote: string; rating: number; role?: string }
const testimonials = ref<Testi[]>([
  { name: 'Elif', role: 'Kuaför',   quote: 'Adisyon hızı müşteriyi bekletmiyor, iptal/indirimler çok pratik.', rating: 5 },
  { name: 'Mert', role: 'Barber',   quote: 'Randevu hatırlatmaları no-show’u belirgin azalttı.',               rating: 4 },
  { name: 'Seda', role: 'Spa',      quote: 'Gelir–gider raporları ile gün sonu sürpriz yok.',                  rating: 5 },
  { name: 'Ayşe', role: 'Güzellik', quote: 'Stok uyarıları kritik seviyeyi kaçırmıyor.',                       rating: 4 },
])
</script>

<template>
  <!-- HERO -->
  <section class="hero-wrap border-bottom">
    <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="6500">
      <div class="carousel-indicators">
        <button v-for="(s,i) in slides" :key="i" type="button" data-bs-target="#heroCarousel" :data-bs-slide-to="i" :class="{ active: i===0 }" :aria-label="`Slide ${i+1}`"></button>
      </div>
      <div class="carousel-inner">
        <div v-for="(s,i) in slides" :key="s.src" class="carousel-item" :class="{ active: i===0 }">
          <img class="d-block w-100 hero-img" :src="s.src" :alt="s.alt" loading="lazy" />
          <div class="carousel-caption d-none d-md-block hero-caption">
            <h1 class="hero-title">{{ s.title }}</h1>
            <p class="hero-desc">{{ s.desc }}</p>
            <a class="btn btn-brand btn-lg shadow-sm" :href="s.ctaHref">{{ s.ctaText }}</a>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev" aria-label="Önceki"><span class="carousel-control-prev-icon" aria-hidden="true"></span></button>
      <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next" aria-label="Sonraki"><span class="carousel-control-next-icon" aria-hidden="true"></span></button>
    </div>
  </section>

  <!-- ÖNE ÇIKANLAR -->
  <section class="container py-5">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
      <h2 class="section-title m-0">Öne Çıkanlar</h2>
      <a href="#hizmetler" class="btn btn-outline-brand btn-sm">Tüm Hizmetler</a>
    </div>
    <div class="row g-4">
      <div v-for="(f,i) in features" :key="i" class="col-12 col-sm-6 col-lg-4">
        <div class="feature-pro h-100 p-3">
          <div class="d-flex align-items-center gap-3">
            <div class="feature-pro-icon"><i :class="`bi ${f.icon}`" aria-hidden="true"></i></div>
            <div>
              <h6 class="mb-1">{{ f.title }}</h6>
              <p class="mb-0 text-muted small">{{ f.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HİZMETLER + Filtre -->
  <section id="hizmetler" class="container py-5">
    <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
      <h2 class="section-title m-0">Hizmetler</h2>
      <div class="btn-group btn-group-sm billing-toggle" role="tablist" aria-label="Hizmet filtreleri">
        <button v-for="t in serviceTabs" :key="t" type="button" class="btn btn-outline-brand" :class="{ active: activeTab === t }" @click="activeTab = t">{{ t }}</button>
      </div>
    </div>

    <div class="row g-4">
      <div v-for="(s,i) in filteredServices()" :key="i" class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm card-hover">
          <div class="card-body d-flex flex-column">
            <div class="d-flex align-items-center gap-2 mb-2">
              <i :class="`bi ${s.icon}`" aria-hidden="true"></i>
              <h5 class="card-title mb-0">{{ s.title }}</h5>
              <span class="ms-auto badge bg-light text-dark border">{{ s.tag }}</span>
            </div>
            <p class="card-text flex-grow-1">{{ s.text }}</p>
            <div class="d-flex gap-2">
              <a href="#" class="btn btn-ghost w-50">Detay Gör</a>
              <a href="#fiyat" class="btn btn-brand w-50">Hemen Başla</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- NASIL ÇALIŞIR (sekme + timeline + progress + checklist + mini SSS + mini rapor) -->
  <section class="how-stats-wrap py-5">
    <div class="container">
      <div class="row g-5 align-items-start">
        <!-- Sol: Sekmeli içerik -->
        <div class="col-lg-7">
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <h2 class="section-title m-0">Nasıl Çalışır?</h2>
            <div class="btn-group btn-group-sm" role="tablist" aria-label="Adımlar">
              <button
                v-for="s in steps"
                :key="s.key"
                type="button"
                class="btn btn-outline-brand"
                :class="{ active: currentStep === s.key }"
                @click="currentStep = s.key as any"
              >
                <i :class="`bi ${s.icon}`"></i> <span class="d-none d-sm-inline">{{ s.key }}</span>
              </button>
            </div>
          </div>

          <!-- İlerleme -->
          <div class="progress soft mb-3" style="height: 10px" aria-label="İlerleme">
            <div class="progress-bar" :style="{ width: stepProgress + '%' }" />
          </div>

          <!-- Timeline -->
          <ol class="timeline list-unstyled m-0">
            <li v-for="(s,i) in steps" :key="s.key" class="timeline-item" :class="{ active: currentStep === s.key }">
              <div class="tl-bullet"><i :class="`bi ${s.icon}`" aria-hidden="true"></i></div>
              <div class="tl-body">
                <h6 class="mb-1">{{ s.title }}</h6>
                <p class="mb-0 text-muted small">{{ s.text }}</p>
              </div>
            </li>
          </ol>

          <!-- Checklist + ipucu -->
          <div class="row g-3 mt-3">
            <div class="col-md-7">
              <div class="checklist p-3 rounded-3">
                <strong class="d-block mb-2">{{ currentStep }}</strong>
                <ul class="list-unstyled m-0 d-grid gap-2 small">
                  <li v-for="(b,bi) in stepDetails[currentStep].bullets" :key="bi" class="d-flex gap-2 align-items-start">
                    <i class="bi bi-check2-circle text-success"></i><span>{{ b }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-5">
              <div class="tipbox p-3 rounded-3 small">
                <i class="bi bi-lightbulb"></i>
                <span class="ms-2">{{ stepDetails[currentStep].tip }}</span>
              </div>
            </div>
          </div>

          <!-- Mini SSS (accordion) -->
          <div class="accordion mt-3" id="miniFaq">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#f1">
                  Veri kaybolur mu?
                </button>
              </h2>
              <div id="f1" class="accordion-collapse collapse" data-bs-parent="#miniFaq">
                <div class="accordion-body small">
                  Otomatik yedekleme + bulut senkron ile verileriniz güvenle tutulur.
                </div>
              </div>
            </div>
            <div class="accordion-item mt-2">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#f2">
                  Çoklu cihazda performans?
                </button>
              </h2>
              <div id="f2" class="accordion-collapse collapse" data-bs-parent="#miniFaq">
                <div class="accordion-body small">
                  Gerçek zamanlı eşitleme ile POS, randevu ve rapor ekranları eşgüdümlüdür.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sağ: KPI + mini rapor + demo kutusu -->
        <div class="col-lg-5">
          <div class="row g-3 text-center mb-3">
            <div v-for="(st,i) in stats" :key="i" class="col-6">
              <div class="stat-box p-3 rounded-3">
                <div class="stat-value">{{ st.value }}</div>
                <div class="stat-label">{{ st.label }}</div>
              </div>
            </div>
          </div>

          <div class="report-preview p-3 rounded-3">
            <div class="d-flex align-items-center justify-content-between">
              <strong>Bugün — Gelir / Gider</strong>
              <span class="badge bg-success-subtle text-success border">+₺3.420</span>
            </div>
            <div class="tiny-bars mt-2" aria-hidden="true">
              <span v-for="i in 24" :key="i" class="bar"></span>
            </div>
            <div class="text-end mt-2">
              <a href="/reports" class="btn btn-sm btn-outline-brand">Raporlara Git</a>
            </div>
          </div>

          <div class="demo-card p-3 rounded-3 mt-3 d-flex align-items-center gap-3">
            <div class="demo-icon"><i class="bi bi-play-circle"></i></div>
            <div class="small">
              <strong>2 dakikada kurulum</strong>
              <div class="text-muted">Kısa video ile adım adım başla.</div>
            </div>
            <a href="#" class="btn btn-ghost btn-sm ms-auto">İzle</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ENTEGRASYONLAR -->
  <section class="integrations-wrap border-top border-bottom py-5">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        <h2 class="section-title m-0">Entegrasyonlar</h2>
        <a href="/appointments" class="btn btn-outline-brand btn-sm">Randevuyu Aç</a>
      </div>

      <div class="row g-3">
        <div v-for="(it,i) in integrations" :key="i" class="col-12 col-sm-6 col-lg-4">
          <div class="int-card p-3">
            <div class="d-flex align-items-center gap-2">
              <i :class="`bi ${it.icon} fs-5`" aria-hidden="true"></i>
              <strong>{{ it.name }}</strong>
              <span class="ms-auto int-tier" :data-tier="it.tier">{{ it.tier }}</span>
            </div>
          </div>
        </div>
      </div>

      <p class="small text-muted mt-3 mb-0">
        <i class="bi bi-info-circle"></i> “Yerel”: uygulama içi hazır özellik · “Doğrudan”: anahtar ile bağlanır · “Webhook”: iki yönlü veri akışı · “Beta”: sınırlı erişim.
      </p>
    </div>
  </section>

  <!-- FİYATLANDIRMA -->
  <section id="fiyat" class="container py-5 pricing-wrap">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
      <h2 class="section-title m-0">Fiyatlandırma</h2>
      <div class="btn-group btn-group-sm billing-toggle" role="tablist" aria-label="Faturalama sıklığı">
        <button type="button" class="btn btn-outline-brand" :class="{ active: billingCycle === 'monthly' }" @click="billingCycle = 'monthly'">Aylık</button>
        <button type="button" class="btn btn-outline-brand" :class="{ active: billingCycle === 'yearly' }" @click="billingCycle = 'yearly'">
          Yıllık <span class="badge bg-success-subtle text-success border ms-1">-%20</span>
        </button>
      </div>
    </div>

    <div class="row g-4 align-items-stretch">
      <div v-for="(p,i) in displayedPlans" :key="i" class="col-12 col-md-6 col-lg-4">
        <div class="pricing-card pro h-100" :class="{ featured: p.highlight }">
          <div class="ribbon" v-if="p.highlight"><span>En Popüler</span></div>

          <div class="pricing-head">
            <h5 class="mb-1 d-flex align-items-center gap-2">
              {{ p.name }}
              <span v-if="billingCycle==='yearly' && p._savings" class="badge bg-warning-subtle text-dark border ms-1">Tasarruf: {{ p._savings }}</span>
            </h5>
            <div class="price"><span class="num">{{ p._priceText }}</span><span class="period"> {{ p._periodText }}</span></div>
          </div>

          <ul class="list-unstyled d-grid gap-2 px-3 mb-3">
            <li
              v-for="(perk,pi) in p.perks"
              :key="pi"
              class="d-flex gap-2 align-items-start"
              :class="{ 'text-muted': perk.toLowerCase().includes('destek yok') }"
            >
              <i :class="perk.toLowerCase().includes('destek yok') ? 'bi bi-x-circle text-danger' : 'bi bi-check2-circle text-success'"></i>
              <span>{{ perk }}</span>
            </li>
          </ul>

          <!-- Tema uyumlu kart içi butonlar -->
          <div class="pricing-actions px-3 pb-3 d-grid gap-2">
            <a href="#" class="btn btn-brand btn-lg w-100">
              <i class="bi bi-rocket-takeoff"></i> Hemen Başla
            </a>
            <a href="#" class="btn btn-ghost w-100">
              <i class="bi bi-info-circle"></i> Detayları Gör
            </a>
          </div>

          <div class="pricing-foot small text-muted px-3 pb-3">
            <i class="bi bi-shield-lock"></i> 14 gün ücretsiz deneme · İstediğiniz an iptal
          </div>
        </div>
      </div>
    </div>

    <p class="text-muted small mt-3 mb-0"><i class="bi bi-info-circle"></i> Tüm fiyatlara KDV dahil değildir. Büyük hacimli kullanım için <a href="#" class="text-decoration-none">özel fiyat</a> isteyin.</p>
  </section>

  <!-- KULLANICI YORUMLARI -->
  <section class="container py-5">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
      <h2 class="section-title m-0">Kullanıcı Yorumları</h2>
      <a href="/pos" class="btn btn-outline-brand btn-sm">POS’u Gör</a>
    </div>

    <div class="row g-4">
      <div v-for="(t,i) in testimonials" :key="i" class="col-12 col-md-6">
        <div class="testimonial-modern h-100 p-3">
          <div class="d-flex align-items-start gap-3">
            <div class="avatar placeholder"><i class="bi bi-person"></i></div>
            <div class="flex-grow-1">
              <div class="d-flex align-items-center gap-2">
                <strong>{{ t.name }}</strong>
                <small class="text-muted">• {{ t.role }}</small>
              </div>
              <div class="stars" role="img" :aria-label="`Puan: ${t.rating}/5`">
                <i v-for="n in 5" :key="n" :class="n <= t.rating ? 'bi bi-star-fill' : 'bi bi-star'" />
              </div>
              <p class="mb-0 mt-2">“{{ t.quote }}”</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-wrap py-5">
    <div class="container text-center">
      <h3 class="mb-2">Hemen başlamak ister misiniz?</h3>
      <p class="text-muted mb-4">Kurulum dakikalar içinde. İlk ay ücretsiz deneyin.</p>
      <a href="#fiyat" class="btn btn-brand btn-lg">Ücretsiz Dene</a>
      <div class="d-flex gap-3 justify-content-center mt-3 small text-muted">
        <span><i class="bi bi-shield-lock"></i> KVKK uyumlu</span>
        <span><i class="bi bi-hdd-network"></i> Türkiye veri merkezi</span>
        <span><i class="bi bi-lock"></i> SSL / HTTPS</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ============ HERO ============ */
.hero-wrap {
  position: relative;
  background: var(--surface-2);
  overflow: hidden; /* Görsel taşmasın, tam otursun */
}

/* Banner görselleri banner alanına tam sığsın */
.hero-img {
  display: block;
  margin-inline: auto;

  /* 1536x1024 => 3:2 oran */
  width: 100%;
  aspect-ratio: 3 / 2;
  height: auto;

  /* Görsel her zaman TAM gözüksün (kesme yok) */
  object-fit: contain;
  object-position: center center;

  /* Yüksekliği ekranı taşmasın, büyük ekranda da orantılı küçülsün */
  max-height: 100vh;

  /* Arka plan boş kalmasın diye hafif ton */
  background: radial-gradient(circle at center,
    rgba(0,0,0,0.25),
    var(--surface-2)
  );

  filter: saturate(1.05);
}


/* Şeffaf sarı cam efekti (tema uyumlu) */
.hero-caption {
  bottom: clamp(1rem, 6vw, 4rem);
  text-align: left;
  max-width: 780px;
  margin-inline: auto;
  padding: clamp(1rem, 3vw, 1.5rem);
  border-radius: 1rem;
  backdrop-filter: blur(14px);

  /* Cam + sarı overlay */
  background:
    linear-gradient(
      135deg,
      color-mix(in srgb, #facc15 26%, rgba(0, 0, 0, 0.55)),
      color-mix(in srgb, #facc15 14%, rgba(0, 0, 0, 0.35))
    );
  border: 1px solid color-mix(in srgb, #facc15 45%, var(--bs-border-color));
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.45);
}

/* Yazılar sarı camın üstünde net görünsün */
.hero-title {
  font-size: clamp(1.6rem, 3.6vw, 2.4rem);
  margin: 0 0 .25rem;
  color: #111; /* Sarı cam üzerinde koyu yazı */
  font-weight: 700;
}
.hero-desc  {
  font-size: clamp(1rem, 2vw, 1.125rem);
  margin: 0 0 .75rem;
  color: rgba(15, 23, 42, 0.9);
}

@media (prefers-reduced-motion: reduce){
  .carousel-item{ transition: none !important; }
}

/* ============ SECTION TITLE ============ */
.section-title { font-weight: 700; font-size: clamp(1.2rem, 2.4vw, 1.6rem); position: relative; display: inline-block; }
.section-title::after { content: ''; position: absolute; left: 0; bottom: -6px; width: 56%; height: 3px; background: var(--brand); border-radius: 999px; }

/* ============ ÖNE ÇIKANLAR ============ */
.feature-pro{
  border: 1px solid var(--bs-border-color);
  border-radius: 1rem;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--brand) 6%, transparent), transparent) padding-box,
    radial-gradient(120% 60% at 0% 0%, color-mix(in srgb, var(--brand) 12%, transparent), transparent) border-box;
}
.feature-pro-icon{
  width: 44px; height: 44px; display: grid; place-items: center;
  border-radius: .9rem;
  border: 1px solid var(--bs-border-color);
  background: color-mix(in srgb, var(--brand) 10%, var(--surface));
  font-size: 1.1rem;
}

/* ============ HİZMETLER ============ */
.card-hover { transition: transform .2s ease, box-shadow .2s ease; }
.card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,.09); }
.card-body i { font-size: 1.2rem; color: var(--brand-700); }

/* ============ NASIL ÇALIŞIR ============ */
.how-stats-wrap { background: linear-gradient(0deg, var(--surface-2), var(--surface-2)); border-top: 1px solid var(--bs-border-color); border-bottom: 1px solid var(--bs-border-color); }

.progress.soft{
  background: color-mix(in srgb, var(--brand) 10%, var(--surface));
  border: 1px solid var(--bs-border-color);
  border-radius: 999px;
  overflow: hidden;
}
.progress.soft .progress-bar{
  background: var(--brand);
}

.timeline { display: grid; gap: 12px; }
.timeline-item{ display:flex; gap:12px; align-items:flex-start; opacity:.7; transition: opacity .2s ease; }
.timeline-item.active{ opacity:1; }
.tl-bullet{
  width: 36px; height: 36px; display:grid; place-items:center; flex:0 0 36px;
  border-radius:.75rem; border:1px solid var(--bs-border-color);
  background: color-mix(in srgb, var(--brand) 10%, var(--surface));
}
.tl-body{ border-bottom: 1px dashed var(--bs-border-color); padding-bottom: .6rem; }
.timeline-item:last-child .tl-body{ border-bottom: 0; }

.checklist{ border: 1px solid var(--bs-border-color); background: var(--surface); }
.tipbox   { border: 1px dashed var(--bs-border-color); background: color-mix(in srgb, var(--brand) 6%, var(--surface)); }
.demo-card{ border: 1px solid var(--bs-border-color); background: var(--surface); }
.demo-icon{ width: 40px; height: 40px; border-radius: 50%; display:grid; place-items:center; border:1px solid var(--bs-border-color); background: color-mix(in srgb, var(--brand) 10%, var(--surface)); }

/* KPI + mini rapor */
.stat-box  { background: var(--surface); border: 1px solid var(--bs-border-color); }
.stat-value{ font-weight: 800; font-size: clamp(1.25rem, 4vw, 1.8rem); }
.stat-label{ color: var(--muted-500); font-size: .95rem; }

.report-preview { border: 1px solid var(--bs-border-color); background: var(--surface); }
.tiny-bars { display: grid; grid-template-columns: repeat(24, 1fr); gap: 3px; }
.tiny-bars .bar { display: block; height: 28px; border-radius: 4px; background: color-mix(in srgb, var(--brand) 22%, var(--surface-2)); }
.tiny-bars .bar:nth-child(3n){ height: 18px; }
.tiny-bars .bar:nth-child(5n){ height: 34px; }
.tiny-bars .bar:nth-child(7n){ height: 22px; }

/* ============ ENTEGRASYONLAR ============ */
.integrations-wrap .int-card{
  border: 1px solid var(--bs-border-color);
  border-radius: 1rem;
  background: var(--surface);
}
.int-tier{
  border: 1px solid var(--bs-border-color);
  border-radius: 999px;
  padding: .1rem .5rem;
  font-size: .75rem;
  background: var(--bs-tertiary-bg);
}
.int-tier[data-tier="Yerel"]    { background: color-mix(in srgb, var(--brand) 10%, var(--surface)); }
.int-tier[data-tier="Doğrudan"] { background: color-mix(in srgb, var(--brand) 6%, var(--surface)); }
.int-tier[data-tier="Webhook"]  { background: color-mix(in srgb, var(--brand) 4%, var(--surface)); }
.int-tier[data-tier="Beta"]     { background: color-mix(in srgb, var(--brand) 2%, var(--surface)); }

/* ============ PRICING ============ */
.pricing-wrap { position: relative; }
.billing-toggle .btn.active { background: color-mix(in srgb, var(--brand) 14%, var(--surface)); color: var(--bs-body-color); }

.pricing-card { border: 1px solid var(--bs-border-color); background: var(--surface); border-radius: 1rem; overflow: hidden; display: grid; grid-template-rows: auto 1fr auto; position: relative; }
.pricing-card .pricing-head { padding: 1rem 1.25rem; border-bottom: 1px solid var(--bs-border-color); background: color-mix(in srgb, var(--brand) 6%, var(--surface)); }
.pricing-card .price { font-weight: 800; font-size: 1.5rem; }
.pricing-card .price .period { font-weight: 500; font-size: .95rem; color: var(--muted-500); margin-left: .25rem; }

.pricing-card.pro { transition: transform .18s ease, box-shadow .2s ease, border-color .2s ease; }
.pricing-card.pro:hover { transform: translateY(-4px); box-shadow: 0 16px 44px rgba(0,0,0,.10); border-color: color-mix(in srgb, var(--brand) 30%, var(--bs-border-color)); }
.pricing-card.featured { outline: 2px solid var(--brand); box-shadow: 0 10px 40px rgba(0,0,0,.08); }
.ribbon { width: 140px; height: 140px; overflow: hidden; position: absolute; top: -6px; right: -6px; }
.ribbon span { position: absolute; display: block; width: 200px; padding: .35rem 0; background: var(--brand); color: #111; font-weight: 700; text-align: center; transform: rotate(45deg); top: 20px; right: -46px; box-shadow: 0 6px 20px rgba(0,0,0,.12); }

.pricing-foot { border-top: 1px dashed var(--bs-border-color); background: var(--surface); }

.pricing-actions .btn-brand{
  box-shadow: 0 6px 18px rgba(0,0,0,.08);
}
.pricing-actions .btn-brand:hover{
  transform: translateY(-1px);
}
.pricing-actions .btn-ghost{
  border-color: var(--bs-border-color);
  background: color-mix(in srgb, var(--brand) 4%, var(--surface));
}
.pricing-actions .btn-ghost:hover{
  background: color-mix(in srgb, var(--brand) 10%, var(--surface));
  border-color: color-mix(in srgb, var(--brand) 35%, var(--bs-border-color));
}

/* ============ TESTIMONIAL ============ */
.testimonial-modern{
  border: 1px solid var(--bs-border-color);
  border-radius: 1rem;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--brand) 5%, transparent), transparent),
    var(--surface);
}
.testimonial-modern .avatar{
  width: 40px; height: 40px; border-radius: 50%;
  border: 1px solid var(--bs-border-color); display:grid; place-items:center;
  background: var(--surface-2);
}
.stars{ color: var(--brand-700); font-size: .9rem; }

/* ============ CTA ============ */
.cta-wrap {
  background:
    radial-gradient(60% 120% at 10% 0%, color-mix(in srgb, var(--brand) 18%, transparent) 0%, transparent 60%),
    radial-gradient(60% 120% at 95% -10%, color-mix(in srgb, var(--brand) 12%, transparent) 0%, transparent 60%);
  border-top: 1px solid var(--bs-border-color);
}

/* Küçük ekran iyileştirmeleri */
@media (max-width: 576px){
  .hero-caption { margin: .75rem; border-radius: .75rem; }
}
</style>
