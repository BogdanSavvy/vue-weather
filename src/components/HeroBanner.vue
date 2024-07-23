<script setup>
const { image } = defineProps(['image'])
</script>

<template>
  <div>
    <img :src="image" alt="banner" />
  </div>
</template>

<style scoped></style>
