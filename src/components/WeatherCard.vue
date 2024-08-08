<script setup lang="ts">
import type { CityDataType } from '@/types'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  cardData: CityDataType
  deleteCity: (id: string) => void
}>()

const { id, city } = props.cardData
</script>

<template>
  <div class="card">
    <div class="card__body">
      <div class="card__city">
        <RouterLink :to="`/weather/${id}`">{{ city }}</RouterLink>
      </div>
      <button @click.prevent="() => deleteCity(id)" class="card__delete"></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 80px;
  padding: 10px;

  &__body {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__city {
    a {
      color: inherit;
    }
  }

  &__delete {
    position: relative;
    width: 30px;
    height: 30px;
    background-color: transparent;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      mask: var(--delete-icon) no-repeat center / cover;
      background-color: #ffffff;
      transition: background-color 0.3s ease;
    }

    &:hover {
      &::before {
        background-color: #e63737;
        transition: background-color 0.3s ease;
      }
    }
  }
}
</style>
