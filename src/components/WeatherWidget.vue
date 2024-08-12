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
    <div class="widget__container container">
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
  </div>
</template>

<style lang="scss">
.widget {
  padding: 100px 0;

  &__container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 10px;
  }

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

  @media (max-width: 1023.9px) {
    padding: 200px 0 50px 0;

    &__temperature {
      font-size: 120px;
    }
  }

  @media (max-width: 768px) {
    &__temperature {
      font-size: 100px;
    }
    &__weather-icon {
      width: 80px;
      height: 80px;
    }
  }

  @media (max-width: 425px) {
    &__temperature {
      font-size: 62px;
    }
    &__weather-icon {
      width: 50px;
      height: 50px;
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

  @media (max-width: 768px) {
    &__name {
      font-size: 42px;
    }

    &__date-time {
      font-size: 14px;
    }
  }

  @media (max-width: 425px) {
    &__name {
      font-size: 24px;
    }
  }
}
</style>
