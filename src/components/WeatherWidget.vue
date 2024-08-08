<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'

import { convertTemperature, getDateTime } from '@/helpers/helpers'

const props = defineProps<{
  currentTemperature: number
  city: string
  weatherIcon: string
  timezone: number
}>()

const icon = computed(() => props.weatherIcon)
const currentTime = ref('')

const tempCelsium = computed(() => convertTemperature(props.currentTemperature))

const imageUrl = computed(() => {
  return new URL(`../assets/images/${icon.value}.svg`, import.meta.url).href
})

watchEffect(() => {
  currentTime.value = getDateTime(props.timezone)
})
</script>

<template>
  <div class="widget">
    <div class="widget__temperature">{{ tempCelsium }}&deg;</div>
    <div class="widget__city-info city-info">
      <h1 class="city-info__name">{{ props.city }}</h1>
      <div class="city-info__date-time">
        <time :datetime="currentTime">{{ currentTime }}</time>
      </div>
    </div>
    <div class="widget__weather-icon">
      <img :src="imageUrl" alt="current-weather" />
    </div>
  </div>
</template>

<style lang="scss">
.widget {
  padding: 100px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;

  &__temperature {
    font-size: 145px;
    line-height: 0.75;
    font-weight: 700;
  }

  &__weather-icon {
    height: 100px;
    width: 100px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.city-info {
  &__name {
    font-size: 60px;
    line-height: 1.2;
  }

  &__date-time {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.03em;
  }
}
</style>
