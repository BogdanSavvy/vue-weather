<script setup lang="ts">
import { RouterView } from 'vue-router'
import { reactive, ref, onMounted, type Ref } from 'vue'
import { doc, collection, getDocs, updateDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

import type { CityDataType, WeatherDataType } from '@/types'
import HeaderBar from '@/components/HeaderBar.vue'
import { getCoords, getCurrentWeather } from './api/weatherApi'

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

    try {
      await updateDoc(doc(db, 'cities', docSnapshot.id), weatherData)
    } catch (error) {
      console.error(error)
      throw new Error('Something went wrong!')
    } finally {
      citiesData.value.push({
        ...docSnapshot.data(),
        id: docSnapshot.id,
        weatherData: cityWeather
      } as CityDataType)
    }
  })
}



const deleteCity = async (cityId: string) => {
  // Delete the city document from Firestore
  await deleteDoc(doc(db, 'cities', cityId))

  // Update the citiesData array to remove the deleted city
  citiesData.value = citiesData.value.filter((city) => city.id !== cityId)
}

onMounted(() => fetchWeather())
</script>

<template>
  <HeaderBar :data="citiesData" />
  <main class="content">
    <RouterView v-slot="{ Component }">
      <component :is="Component" :data="citiesData" />
    </RouterView>
  </main>
</template>
