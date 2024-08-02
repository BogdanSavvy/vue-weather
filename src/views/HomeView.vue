<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, reactive, ref } from 'vue'
import { doc, collection, getDocs, updateDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

import type { CityDataType, WeatherDataType } from '@/types'
import { getCoords, getCurrentWeather } from '@/api/weatherApi'
import WeatherBanner from '@/components/WeatherBanner.vue'
import WeatherWidget from '@/components/WeatherWidget.vue'

const citiesData: Ref<CityDataType[]> = ref([])
const formdata = reactive({
  cityname: ''
})

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

onMounted(() => {
  fetchWeather()
})

const handleSubmit = async (e: any) => {
  const newCityData = doc(collection(db, 'cities'))

  const { lat, lon } = await getCoords(formdata.cityname)

  const cityWeather: WeatherDataType = await getCurrentWeather(lat, lon)

  try {
    await setDoc(newCityData, {
      city: formdata.cityname,
      country: '',
      id: newCityData.id,
      weatherData: cityWeather
    })
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong!')
  } finally {
    citiesData.value.push({
      city: formdata.cityname,
      country: '',
      id: newCityData.id,
      weatherData: cityWeather
    } as CityDataType)

    formdata.cityname = ''
  }
}

const deleteCity = async (cityId: string) => {
  // Delete the city document from Firestore
  await deleteDoc(doc(db, 'cities', cityId))

  // Update the citiesData array to remove the deleted city
  citiesData.value = citiesData.value.filter((city) => city.id !== cityId)
}
</script>

<template>
  <div class="weather-view">
    <div class="weather-view__container container">
      <div class="weather-view__widget">
        <div v-if="!citiesData[0]">Loading ...</div>
        <WeatherWidget
          v-else
          :currentTemperature="citiesData[0].weatherData.main.temp"
          :city="citiesData[0].city"
          :weather-icon="citiesData[0].weatherData.weather[0].icon"
        />
      </div>
      <div class="weather-view__details">
        
      </div>
    </div>
    <div v-if="!citiesData[0]">Loading ...</div>
    <WeatherBanner v-else :code="citiesData[0].weatherData.weather[0].icon" />
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
    align-self: flex-end;
  }

  &__details {

  }
}
</style>
