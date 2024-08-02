<script lang="ts" setup>
import { computed, ref } from 'vue'
const props = defineProps(['currentTemperature', 'city', 'weatherIcon'])

const tempCelsium = Math.round(props.currentTemperature - 273.15)

const icon = ref(props.weatherIcon)

const imageUrl = computed(() => {
  return new URL(`../assets/images/${icon.value}.svg`, import.meta.url).href
})
</script>

<template>
  <div class="widget">
    <div class="widget__temperature">{{ tempCelsium }}&deg;</div>
    <div class="widget__city-info city-info">
      <h1 class="city-info__name">{{ props.city }}</h1>
      <div class="city-info__date-time"></div>
    </div>
    <div class="widget__weather-icon">
      <img :src="imageUrl" alt="current-weather" />
    </div>
  </div>
</template>

<style lang="scss">
.widget {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;

  &__temperature {
    font-size: 100px;
    line-height: 1.2;
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
    font-size: 72px;
    line-height: 1.2;
    font-weight: 500;
  }

  &__date-time {
  }
}
</style>
