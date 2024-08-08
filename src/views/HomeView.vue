<script setup lang="ts">
import WeatherBanner from '@/components/WeatherBanner.vue'
import type { CityDataType } from '@/types'

const cities = defineProps<{
  data: CityDataType[]
}>()
</script>

<template>
  <div class="home-view">
    <div class="home-view__container container">
      <h1>Welcome to weather app</h1>
    </div>
    <WeatherBanner :code="cities.data[0].weatherData.weather[0].icon" />
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  position: relative;
  height: 100%;
  overflow: hidden;

  &__container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  h1 {
    font-size: 120px;
    font-weight: 600;
  }
}
</style>
