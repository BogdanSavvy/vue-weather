<script setup lang="ts">
import type { CityDataType } from '@/types'

const props = defineProps(['cardData'])
const { city, country, weatherData }: CityDataType = props.cardData
</script>

<template>
  <div class="card">
    <div class="card__body">{{ city }}</div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 80px;
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
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
