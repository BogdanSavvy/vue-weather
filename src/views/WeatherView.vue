<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

import type { CityDataType, WeatherDataType } from '@/types'
import { getCoords, getCurrentWeather } from '@/api/weatherApi'
import WeatherCard from '@/components/WeatherCard.vue'

const citiesData: Ref<CityDataType[]> = ref([])

const fetchWeather = async () => {
  const querySnapshot = await getDocs(collection(db, 'cities'))

  querySnapshot.forEach(async (docSnapshot) => {
    const { city, country } = docSnapshot.data()

    // Fetch coordinates based on the city and country
    const { lat, lon } = await getCoords(city, country)

    // Fetch current weather data using the coordinates
    const cityWeather: WeatherDataType = await getCurrentWeather(lat, lon)

    // Create the weatherData object to be added to the document
    const weatherData = { weatherData: cityWeather }

    await updateDoc(doc(db, 'cities', docSnapshot.id), weatherData)

    citiesData.value.push({
      ...docSnapshot.data(),
      weatherData: cityWeather
    } as CityDataType)
  })
}

onMounted(() => {
  fetchWeather()
})
</script>

<template>
  <div class="container">
    <div v-if="!citiesData || citiesData.length === 0">No Data</div>
    <div v-else class="grid">
      <WeatherCard v-for="city in citiesData" :key="city.weatherData.id" :card-data="city" />
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 30px;
  align-items: center;
  justify-content: center;
}
</style>
