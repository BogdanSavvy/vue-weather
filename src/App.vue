<script setup lang="ts">
import { RouterView } from 'vue-router'

import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<template>
  <div class="wrapper">
    <HeaderBar />
    <main class="content">
      <RouterView />
    </main>
    <FooterBar />
  </div>
</template>

<style scoped>
div {
  margin-bottom: 20px;
}
</style>
