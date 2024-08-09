<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { CityDataType } from '@/types'

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
    flex: 1 1 auto;

    a {
      position: relative;
      color: inherit;
      font-size: 24px;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -10px;
        transform: translate(100%, -50%);
        width: 30px;
        height: 100%;
        mask: var(--airplane-icon) no-repeat center / contain;
        background-color: #ffffff;
        transition: transform 0.5s ease;
      }
    }

    &:hover {
      a {
        &::after {
          transform: translate(200%, -50%);
          transition: transform 0.5s ease;
        }
      }
    }
  }

  &__delete {
    position: relative;
    width: 40px;
    height: 40px;
    padding: 10px;
    background-color: transparent;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 35px;
      height: 35px;
      mask: var(--delete-icon) no-repeat center / cover;
      background-color: #ffffff;
    }

    &:hover {
      background-color: #e63737;
      transition: background-color 0.3s ease;
    }
  }
}
</style>
