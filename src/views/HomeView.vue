<script setup lang="ts">
import WeatherBanner from '@/components/WeatherBanner.vue'
import WeatherWidget from '@/components/WeatherWidget.vue'
import WeatherDetails from '@/components/WeatherDetails.vue'

const props = defineProps(['data'])
</script>

<template>
  <div class="weather-view">
    <div class="weather-view__container container">
      <div class="weather-view__widget">
        <div v-if="!props.data[0]">Loading ...</div>
        <WeatherWidget
          v-else
          :currentTemperature="props.data[0].weatherData.main.temp"
          :city="props.data[0].city"
          :weather-icon="props.data[0].weatherData.weather[0].icon"
        />
      </div>
      <div class="weather-view__details">
        <WeatherDetails />
      </div>
    </div>
    <div v-if="!props.data[0]">Loading ...</div>
    <WeatherBanner v-else :code="props.data[0].weatherData.weather[0].icon" />
  </div>
</template>

<style lang="scss" scoped>
.weather-view {
  position: relative;
  height: 100%;
  overflow: hidden;

  &__container {
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__widget {
    flex-grow: 1;
    align-self: flex-end;
  }

  &__details {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 600px;
  }
}
</style>