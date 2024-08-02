<script setup lang="ts">
import type { CityDataType } from '@/types'

const props = defineProps(['cardData'])
const { city, country, weatherData }: CityDataType = props.cardData
</script>

<template>
  <div class="card">
    <div class="card__body">
      <div class="card__top">
        <p class="card__temp">{{ weatherData.main.temp }}</p>
        <p class="card__wind">{{ weatherData.wind.speed }}</p>
        <p>{{ weatherData.weather[0].main }}</p>
      </div>
      <div class="card__bottom">
        <h3 class="card__city">{{ city }}{{ country ? `/${country}` : '' }}</h3>
      </div>
      <div>
        <button @click="$emit('delete', cardData.id)">Delete</button>
      </div>
    </div>
    <div class="card__bg">
      <img
        v-if="weatherData.weather[0].main === 'Clouds'"
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExemM1cnBjOW9rNTVnMjV1ZWRzMnh5dm5rc202dmkwbmJuNm5oNGV6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d5PPYjcb3caPTHM3hv/giphy.webp"
        alt="weather"
      />
      <img
        v-if="weatherData.weather[0].main === 'Clear'"
        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTB5dWRyeDVydzhsbHNqczNvaGFjM3gyZmx2emZoaXJ2MGF4bWsxYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c31WXGK1jLQBy/giphy.webp"
        alt="weather"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 400px;
  padding: 10px;
  -webkit-box-shadow: inset 0px 0px 33px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px 0px 33px 0px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px 0px 33px 0px rgba(0, 0, 0, 0.75);
  border-radius: 10px;

  &__body {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__top {
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__bottom {
    font-size: 25px;
  }

  &__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    img,
    video {
      height: 100%;
      max-width: 100%;
    }
  }
}
</style>
