<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { WeatherDataType } from '@/types'
import { getCoords, getCurrentWeather } from '@/api/weatherApi'

const weatherData = ref<WeatherDataType | null>(null)

const fetchWeather = async (city: string, country?: string) => {
  const { lat, lon } = await getCoords(city, country)

  weatherData.value = await getCurrentWeather(lat, lon)
}

onMounted(() => {
  fetchWeather('Poltava', 'Ukraine')
})
</script>

<template>
  <div>{{ weatherData?.name }}</div>
  <div>{{ weatherData?.weather[0].main }}</div>
  <div>{{ weatherData?.weather[0].description }}</div>
  <div>{{ weatherData?.wind.speed }}</div>
</template>
