<script lang="ts" setup>
import { onMounted, ref, watch, type Ref } from 'vue'

import type { DailyForecast, WeatherForecast } from '@/types'
import { getForecast } from '@/api/weatherApi'
import { convertTemperature } from '@/helpers/helpers'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const props = defineProps<{
  cityName: string
}>()

const forecastData: Ref<DailyForecast[]> = ref([])

const fetchForecast = async (cityName: string) => {
  const today = new Date().toISOString().split('T')[0]

  const data: WeatherForecast = await getForecast(cityName)

  forecastData.value = data.list.filter((forecast) => forecast.dt_txt.startsWith(today))
}

const getImageUrl = (icon: string) => {
  return new URL(`../assets/images/${icon}.svg`, import.meta.url).href
}

watch(
  () => props.cityName,
  (newCityName) => {
    fetchForecast(newCityName)
  }
)

onMounted(() => fetchForecast(props.cityName))
</script>

<template>
  <LoadingSpinner v-if="!forecastData || forecastData.length === 0" />
  <div v-else class="forecast">
    <div class="forecast__conteiner">
      <h2>Today`s forecast</h2>
      <ul class="forecast__list">
        <li v-for="(item, index) in forecastData" :key="index" class="forecast__item">
          <div class="forecast__icon">
            <img :src="getImageUrl(item.weather[0].icon)" alt="weather" />
          </div>
          <div class="forecast__info">
            <div class="forecast__weather">
              <p>{{ item.dt_txt.split(' ')[1] }}</p>
              <p>{{ item.weather[0].main }}</p>
            </div>
            <p class="forecast__temp">{{ convertTemperature(item.main.temp) }}&deg;</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.forecast {
  h2 {
    margin-bottom: 40px;
    text-transform: uppercase;
  }
  &__list {
    display: flex;
    flex-direction: column;
  }

  &__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 40px;

    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }

  &__icon {
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
  }
  &__weather {
    p {
      &:first-of-type {
        color: #ffffff;
        margin-bottom: 4px;
      }

      &:last-of-type {
        opacity: 0.7;
      }
    }
  }
  &__temp {
    font-size: 24px;
    opacity: 0.7;
  }
}
</style>
