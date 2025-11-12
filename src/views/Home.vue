<script setup lang="ts"></script>

<template>
  <!-- HERO / SLIDER -->
  <section class="bg-light border-bottom">
    <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="https://picsum.photos/1280/420?1" alt="Salon görseli" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Salonunuz için akıllı adisyon</h5>
            <p>Hızlı işlem, kolay takip, mutlu müşteriler.</p>
          </div>
        </div>

        <div class="carousel-item">
          <img class="d-block w-100" src="https://picsum.photos/1280/420?2" alt="Kasiyer ekranı" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Gelir–Gider Analizi</h5>
            <p>Anlık raporlar, net kararlar.</p>
          </div>
        </div>
      </div>

      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
        aria-label="Önceki"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
        aria-label="Sonraki"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  </section>

  <!-- HİZMETLER -->
  <section id="hizmetler" class="container py-5">
    <h2 class="section-title mb-4">Hizmetler</h2>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Adisyon & POS</h5>
            <p class="card-text">Hızlı ürün/servis ekleme, indirim, iptal, kasa devri.</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Gelir–Gider Takibi</h5>
            <p class="card-text">Günlük/haftalık raporlar, masraf kalemleri, tedarik ödemeleri.</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Randevu & Müşteri</h5>
            <p class="card-text">Müşteri kartı, hizmet geçmişi, hatırlatma entegrasyonları.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
