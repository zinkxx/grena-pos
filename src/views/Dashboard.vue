<script setup lang="ts">
import { useAuth } from '@/stores/auth'
const auth = useAuth()
</script>

<template>
  <div class="container py-4">
    <h2>Dashboard</h2>
    <p class="text-muted">Hoş geldin, {{ auth.user?.name || 'kullanıcı' }}</p>
  </div>
</template>
