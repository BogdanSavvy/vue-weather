<script setup lang="ts">
import { RouterView } from 'vue-router'

import Header from '@/components/HeaderBar.vue'
</script>

<template>
  <div class="wrapper">
    <Header />
    <main class="content">
      <RouterView />
    </main>
    <footer>footer</footer>
  </div>
</template>

<style scoped></style>
