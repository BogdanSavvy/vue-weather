<script lang="ts" setup>
import { computed } from 'vue'

import { convertTemperature } from '@/helpers/helpers'
import type { WeatherDataType } from '@/types'
import WeatherForecast from '@/components/WeatherForecast.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const props = defineProps<{
  weatherData: WeatherDataType
}>()

const tempMin = computed(() => convertTemperature(props.weatherData.main.temp_min))
const tempMax = computed(() => convertTemperature(props.weatherData.main.temp_max))
</script>

<template>
  <LoadingSpinner v-if="!props.weatherData" />
  <div v-else class="details">
    <div class="details__container">
      <div class="details__info">
        <h2 class="details__weather">
          Weather now looks like {{ props.weatherData.weather[0].description }}
        </h2>
        <ul class="details__list">
          <li class="details__item">
            <p class="details__name">Temp max</p>
            <p class="details__value">{{ tempMax }}&deg; <span class="temp-max"></span></p>
          </li>
          <li class="details__item">
            <p class="details__name">Temp min</p>
            <p class="details__value">{{ tempMin }}&deg; <span class="temp-min"></span></p>
          </li>
          <li class="details__item">
            <p class="details__name">Humidity</p>
            <p class="details__value">
              {{ props.weatherData.main.humidity }} % <span class="humidity"></span>
            </p>
          </li>
          <li class="details__item">
            <p class="details__name">Pressure</p>
            <p class="details__value">
              {{ props.weatherData.main.pressure }} hPa <span class="pressure"></span>
            </p>
          </li>
          <li class="details__item">
            <p class="details__name">Cloudy</p>
            <p class="details__value">
              {{ props.weatherData.clouds.all }} % <span class="cloudy"></span>
            </p>
          </li>
          <li class="details__item">
            <p class="details__name">Wind</p>
            <p class="details__value">
              {{ props.weatherData.wind.speed }} meter/sec <span class="wind"></span>
            </p>
          </li>
        </ul>
      </div>
      <WeatherForecast :cityName="props.weatherData.name" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details {
  height: 100%;
  width: 100%;
  backdrop-filter: blur(20px);
  font-size: 18px;
  overflow-y: auto;

  &__container {
    padding: 50px;
    padding-top: 120px;
    display: flex;
    flex-direction: column;
    gap: 60px;
  }
  &__info {
    position: relative;
    padding-bottom: 60px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #ffffff;
    }
  }

  &__weather {
    margin-bottom: 30px;
    text-transform: uppercase;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__name {
    color: #ffffff90;
  }

  &__value {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      position: relative;
      display: inline-block;
      width: 30px;
      height: 30px;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
      }

      &.temp-min {
        &::before {
          mask: var(--temp-icon) no-repeat center / contain;
          background-color: #6c9cd8;
        }
      }
      &.temp-max {
        &::before {
          mask: var(--temp-icon) no-repeat center / contain;
          background-color: #dfa1a1;
        }
      }
      &.humidity {
        &::before {
          mask: var(--humidity-icon) no-repeat center / contain;
          background: linear-gradient(90deg, rgba(149, 182, 246, 1) 0%, rgba(81, 147, 222, 1) 100%);
        }
      }
      &.pressure {
        &::before {
          mask: var(--pressure-icon) no-repeat center / contain;
        }
      }
      &.cloudy {
        &::before {
          mask: var(--cloudy-icon) no-repeat center / contain;
          background: linear-gradient(
            180deg,
            rgba(178, 212, 247, 1) 0%,
            rgba(217, 226, 243, 1) 100%
          );
        }
      }
      &.wind {
        &::before {
          mask: var(--wind-icon) no-repeat center / contain;
          background: linear-gradient(
            156deg,
            rgba(206, 211, 234, 1) 0%,
            rgba(126, 131, 169, 1) 100%
          );
        }
      }
    }
  }
}
</style>
