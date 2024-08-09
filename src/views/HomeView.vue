<script setup lang="ts">
import type { CityDataType } from '@/types'
import WeatherBanner from '@/components/WeatherBanner.vue'

const cities = defineProps<{
  data: CityDataType[]
}>()
</script>

<template>
  <div class="home-view">
    <div class="home-view__container container">
      <h1>Welcome to weather app</h1>
      <p>
        Stay up-to-date with the latest weather conditions using our app. Easily select a city from
        the menu to view its weather, or simply enter the name of your desired location in the
        search bar located in the top right corner. Get accurate forecasts for anywhere, anytime!
      </p>
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
    flex-direction: column;
    gap: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  h1 {
    font-size: 100px;
    line-height: 1;
    font-weight: 600;
  }

  p {
    max-width: 60%;
    font-size: 22px;
  }
}
</style>
