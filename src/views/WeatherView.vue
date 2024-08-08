<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch, type Ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'

import type { CityDataType } from '@/types'
import { db } from '@/firebase/config'
import WeatherBanner from '@/components/WeatherBanner.vue'
import WeatherDetails from '@/components/WeatherDetails.vue'
import WeatherWidget from '@/components/WeatherWidget.vue'
import LoadingCircle from '@/components/LoadingScreen.vue'

const route = useRoute()
const currentCityData: Ref<CityDataType | null> = ref(null)

const getCityDataById = async () => {
  const cityId = route.params.id as string

  const querySnapshot = await getDocs(collection(db, 'cities'))

  querySnapshot.forEach((docSnapshot) => {
    if (docSnapshot.id === cityId) {
      currentCityData.value = {
        ...docSnapshot.data(),
        id: docSnapshot.id
      } as CityDataType
    }
  })
}

watch(
  () => route.params.id,
  async () => {
    await getCityDataById()
  }
)

onMounted(() => getCityDataById())
</script>

<template>
  <LoadingCircle v-if="!currentCityData" />
  <div v-else class="weather-view">
    <div class="weather-view__container container">
      <div class="weather-view__widget">
        <WeatherWidget
          :currentTemperature="currentCityData.weatherData.main.temp"
          :city="currentCityData.city"
          :weather-icon="currentCityData.weatherData.weather[0].icon"
          :timezone="currentCityData.weatherData.timezone"
        />
      </div>
      <div class="weather-view__details">
        <WeatherDetails :wetherData="currentCityData.weatherData" />
      </div>
    </div>
    <WeatherBanner :code="currentCityData.weatherData.weather[0].icon" />
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
