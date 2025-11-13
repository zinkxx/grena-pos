# Grena POS

Kuaför ve güzellik salonları için tasarlanmış modern, web tabanlı **adisyon & POS ve randevu yönetimi** uygulaması.

- 💳 **Adisyon & POS** – Hizmet, ürün ve indirimleri tek ekrandan yönet
- 📅 **Randevu Yönetimi** – Gün/hafta/ay bazında takvim görünümü ile randevularını organize et
- 📊 **Gelir / Gider & Raporlar** – Kasa, gelir-gider ve performans raporlarını takip et
- 👥 **Müşteri & Personel Yönetimi** – Müşterilerini ve çalışanlarını tek panelden yönet
- 📱 **PWA (Progressive Web App)** – Mobil cihazlarda uygulama gibi kurulabilen, offline destekli front-end

> Bu repo şu an **frontend (Vue 3 + Vite) tarafını** içeriyor. Back-end entegrasyonu için API endpoint’leri kolayca eklenebilir.

---

## İçindekiler

- [Özellikler](#özellikler)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Ekran Görüntüleri](#ekran-görüntüleri)
- [Kurulum](#kurulum)
- [Geliştirme Komutları](#geliştirme-komutları)
- [Proje Mimarisi](#proje-mimarisi)
- [Rotalar & Sayfalar](#rotalar--sayfalar)
- [PWA Desteği](#pwa-desteği)
- [Kod Kalitesi](#kod-kalitesi)
- [Gelecek Geliştirmeler](#gelecek-geliştirmeler)
- [Lisans](#lisans)

---

## Özellikler

### Genel

- ⚡ **SPA mimarisi** – Vue 3 + Vue Router ile tek sayfa uygulama
- 🔐 **Basit auth guard** – `/admin` altındaki sayfalar için `Pinia` tabanlı auth kontrolü
- 🔄 **Dinamik sayfa başlıkları** – Route meta bilgisine göre `document.title` güncellemesi :contentReference[oaicite:0]{index=0}
- 🌙 **Koyu tema odaklı tasarım** – Grena POS için özel renk paleti (`#0b1220` arka plan, `#c79a00` vurgu tonu) :contentReference[oaicite:1]{index=1}

### Modüller (Kullanıcı tarafı)

- **Ana Sayfa (`/`)**
  - Ürünü tanıtan hero alanı
  - Modül kartları (Adisyon & POS, Randevu, Raporlama vb.)
  - Call-to-Action butonları (Hemen başla, Canlı demo vb.)

- **Giriş (`/login`)**
  - Salon sahipleri / personel için login ekranı
  - Gelecekte API ile bağlanacak auth form

- **Adisyon & POS (`/pos`)**
  - Salon içi satışların ve hizmetlerin yönetimi için temel POS ekranı
  - Kuaför odaklı kullanım senaryoları: hizmet, ürün, indirim, ödeme yöntemleri

- **Raporlama (`/reports`)**
  - Gelir/gider ve performans raporları için özet ekran
  - Tarih filtreleme altyapısına uygun tasarım

- **Randevu (`/appointments`)**
  - Gün / hafta / ay gibi farklı görünüm senaryolarına uygun layout
  - Kuaför randevu planlamasına göre kurgulanmış yapı

### Admin Paneli (`/admin` altında)

Router config’e göre aşağıdaki alt modüller bulunur: :contentReference[oaicite:2]{index=2}

- `/admin` → **Admin Dashboard**
- `/admin/customers` → Müşteri yönetimi
- `/admin/appointments` → Randevu yönetimi
- `/admin/expenses` → Gider yönetimi
- `/admin/incomes` → Gelir yönetimi
- `/admin/staff` → Personel yönetimi

Bu sayfaların hepsi `meta.requiresAuth = true` ile korunur ve router guard `useAuth()` store’u üzerinden kontrol eder. :contentReference[oaicite:3]{index=3}

---

## Teknoloji Yığını

**Frontend**

- [Vue 3](https://vuejs.org/) (Composition API)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite 7](https://vite.dev/) – Hızlı geliştirme ve build :contentReference[oaicite:4]{index=4}
- [Vue Router 4](https://router.vuejs.org/) – Sayfa yönlendirme :contentReference[oaicite:5]{index=5}
- [Pinia](https://pinia.vuejs.org/) – State management (auth vb.) :contentReference[oaicite:6]{index=6}
- [Bootstrap 5](https://getbootstrap.com/) + [Bootstrap Icons](https://icons.getbootstrap.com/) – UI iskeleti ve ikonlar :contentReference[oaicite:7]{index=7}
- [@vueuse/core](https://vueuse.org/) & [@vueuse/motion / @motionone/vue](https://motion.dev/) – küçük etkileşimler ve animasyon altyapısı :contentReference[oaicite:8]{index=8}
- [Axios](https://axios-http.com/) – API entegrasyonları için hazır :contentReference[oaicite:9]{index=9}

**Tooling**

- [Vite Plugin PWA](https://vite-pwa-org.netlify.app/) – PWA manifest & service worker :contentReference[oaicite:10]{index=10}
- ESLint + Vue/TS config – Kod kalitesi
- Prettier – Kod formatlama
- Vue TSC – Type-check (build öncesi)

---

## Ekran Görüntüleri

### 1. Ana Sayfa (Hero)

![Ana Sayfa – Hero](/public/screenshots/01-home-hero.png)

Kısa açıklama: Ürünün öne çıkan faydalarını anlattığın hero, CTA butonları ve modül kartları.

### 2. Giriş Ekranı

![Giriş Ekranı](/public/screenshots/02-login.png)

Kısa açıklama: Salon sahipleri ve yetkili personel için login sayfası.

### 3. Adisyon & POS

![Adisyon & POS](/public/screenshots/03-pos.png)

Kısa açıklama: Hizmet ve ürün satışı, ödeme alma ekranı.

### 4. Randevu Takvimi

![Randevu Takvimi](/public/screenshots/04-appointments.png)

Kısa açıklama: Gün / hafta / ay görünüm senaryolarına uygun randevu ekranı.

### 5. Admin Login

![Admin Login](/public/screenshots/05-admin-login.png)

Kısa açıklama: Yönetici giriş ekraın.

### 6. Employee Login

![Admin Login](/public/screenshots/08-employee-login.png)

Kısa açıklama: Personel giriş ekraın.

### 7. Admin Dashboard

![Admin Dashboard](/public/screenshots/05-admin-dashboard-demo.png)

Kısa açıklama: Müşteri, randevu, gelir-gider ve personel modüllerine giriş ekranı.

### 7. Admin Dashboard

![Admin Dashboard](/public/screenshots/05-admin-dashboard-widget.png)

Kısa açıklama: Müşteri, randevu, gelir-gider ve personel modüllerine giriş ekranı içerisinde seçilebilir ve özelleştirilebilir widget.