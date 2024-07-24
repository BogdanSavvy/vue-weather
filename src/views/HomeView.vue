<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

import type { CityDataType } from '@/types'
import { getCoords, getCurrentWeather } from '@/api/weatherApi'

const citiesData: Ref<CityDataType[]> = ref([])

const fetchWeather = async () => {
  // const { lat, lon } = await getCoords(city, country)

  // weatherData.value = await getCurrentWeather(lat, lon)

  const querySnapshot = await getDocs(collection(db, 'cities'))

  querySnapshot.forEach(async (docSnapshot) => {
    // Extract data from the document
    const { city, country } = docSnapshot.data()

    // Fetch coordinates based on the city and country
    const { lat, lon } = await getCoords(city, country)

    // Fetch current weather data using the coordinates
    const cityWeather = await getCurrentWeather(lat, lon)

    // Create the weatherData object to be added to the document
    const weatherData = { weatherData: cityWeather }

    await updateDoc(doc(db, 'cities', docSnapshot.id), weatherData)
  })
}

onMounted(() => {
  fetchWeather()

  console.log(citiesData.value)
})
</script>

<template>
  <div v-for="city in citiesData" :key="city.weatherData.id">
    <div>{{ city.weatherData?.name }}</div>
    <div>{{ city.weatherData?.weather[0].main }}</div>
    <div>{{ city.weatherData?.weather[0].description }}</div>
    <div>{{ city.weatherData?.wind.speed }}</div>
  </div>
</template>
