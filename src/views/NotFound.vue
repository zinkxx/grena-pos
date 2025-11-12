<!-- src/views/NotFound.vue -->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="nf-wrap d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-lg-8">
          <div class="nf-card p-4 p-md-5">
            <div class="nf-code">404</div>
            <h1 class="nf-title mb-2">Sayfa bulunamadı</h1>
            <p class="text-muted mb-4">
              Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
            </p>

            <div class="d-flex flex-wrap gap-2 justify-content-center">
              <RouterLink to="/" class="btn btn-brand">
                <i class="bi bi-house-door"></i> Anasayfa’ya dön
              </RouterLink>
              <a href="/#hizmetler" class="btn btn-ghost">
                <i class="bi bi-grid"></i> Hizmetleri Gör
              </a>
            </div>

            <div class="mt-4 small text-muted">
              <i class="bi bi-info-circle"></i> Yardım mı lazım?
              <a href="/contact" class="btn-link text-decoration-none">İletişime geçin</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.nf-wrap{
  min-height: clamp(72vh, 80vh, 90vh);
  background:
    radial-gradient(60% 120% at 10% 0%, color-mix(in srgb, var(--brand) 14%, transparent) 0%, transparent 60%),
    radial-gradient(60% 120% at 95% -10%, color-mix(in srgb, var(--brand) 10%, transparent) 0%, transparent 60%);
  border-top: 1px solid var(--bs-border-color);
}
.nf-card{
  border: 1px solid var(--bs-border-color);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  backdrop-filter: blur(10px) saturate(1.1);
}
.nf-code{
  font-weight: 800;
  font-size: clamp(2.6rem, 8vw, 4.2rem);
  letter-spacing: 2px;
  line-height: 1;
  background: linear-gradient(90deg, var(--brand-700), var(--brand));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.nf-title{
  font-size: clamp(1.25rem, 3vw, 1.75rem);
}
</style>
