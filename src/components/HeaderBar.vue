<script lang="ts" setup>
import { reactive, ref, type Ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import type { CityDataType, WeatherDataType } from '@/types'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { getCoords, getCurrentWeather } from '@/api/weatherApi'
import WeatherCard from '@/components/WeatherCard.vue'

const props = defineProps(['data'])
const citiesData: Ref<CityDataType[]> = ref(props.data)

const formdata = reactive({
  cityname: ''
})
const route = useRoute()
const router = useRouter()

const handleSubmit = async () => {
  const newCityData = doc(collection(db, 'cities'))

  if (!formdata.cityname || formdata.cityname.length < 3) {
    return
  }

  const { lat, lon } = await getCoords(formdata.cityname)

  const cityWeather: WeatherDataType = await getCurrentWeather(lat, lon)

  try {
    await setDoc(newCityData, {
      city: formdata.cityname,
      country: '',
      id: newCityData.id,
      weatherData: cityWeather
    })
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong!')
  } finally {
    citiesData.value.push({
      city: formdata.cityname,
      country: '',
      id: newCityData.id,
      weatherData: cityWeather
    } as CityDataType)

    formdata.cityname = ''

    router.push(`weather/${newCityData.id}`)
  }
}

const isOpen = ref<Boolean>(false)

const handleClick = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header class="header" :class="isOpen && 'opened'">
    <div class="header__container">
      <div class="header__actions">
        <button
          v-if="route.path !== '/'"
          class="header__goBack"
          @click="() => router.go(-1)"
        ></button>
        <button @click="handleClick" :class="isOpen && 'opened'" class="burger"></button>
        <div class="header__menu menu">
          <div class="menu__wrapper">
            <RouterLink
              class="link"
              v-for="item in citiesData"
              :to="`/weather/${item.id}`"
              @click="handleClick"
              :key="item.id"
            >
              <WeatherCard :card-data="item" />
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="header__search">
        <form @submit.prevent="handleSubmit" class="search">
          <button type="submit"></button>
          <input v-model="formdata.cityname" type="text" />
        </form>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
a {
  color: inherit;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  height: var(--header-height);
  width: 100%;
  z-index: 99;

  &__container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
  }

  &__actions {
  }

  &__search {
  }

  &__goBack {
    position: relative;
    margin-right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      height: 50%;
      background: url("data:image/svg+xml,%3Csvg fill='%23ffffff' version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 299.021 299.021' xml:space='preserve' stroke='%23ffffff'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cg%3E%3Cg%3E%3Cpath d='M292.866,254.432c-2.288,0-4.443-1.285-5.5-3.399c-0.354-0.684-28.541-52.949-146.169-54.727v51.977 c0,2.342-1.333,4.48-3.432,5.513c-2.096,1.033-4.594,0.793-6.461-0.63L2.417,154.392C0.898,153.227,0,151.425,0,149.516 c0-1.919,0.898-3.72,2.417-4.888l128.893-98.77c1.87-1.426,4.365-1.667,6.461-0.639c2.099,1.026,3.432,3.173,3.432,5.509v54.776 c3.111-0.198,7.164-0.37,11.947-0.37c43.861,0,145.871,13.952,145.871,143.136c0,2.858-1.964,5.344-4.75,5.993 C293.802,254.384,293.34,254.432,292.866,254.432z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        no-repeat center / contain;
    }
  }

  &__logo {
    cursor: pointer;
    width: 100px;
    height: auto;
    z-index: 10;
    img {
      max-width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  &.opened {
    .menu {
      left: 0;
      transition: left 0.8s ease;
    }
  }
}

.burger {
  position: relative;
  width: 50px;
  height: 60px;
  background-color: transparent;
  z-index: 2;

  &::before,
  &::after,
  div {
    background: #fff;
    content: '';
    display: block;
    height: 6px;
    border-radius: 3px;
    margin: 7px 0;
    transition: 0.5s;
  }

  &:hover {
    &::before {
      transform: translateY(12px) rotate(135deg);
    }

    &::after {
      transform: translateY(-12px) rotate(-135deg);
    }

    div {
      transform: scale(0);
    }
  }

  &.opened {
    &::before {
      transform: translateY(12px) rotate(135deg);
    }

    &::after {
      transform: translateY(-12px) rotate(-135deg);
    }

    div {
      transform: scale(0);
    }
  }
}

.menu {
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: -100%;
  height: 100vh;
  width: 500px;
  backdrop-filter: blur(10px);
  transition: left 0.8s ease;

  &__wrapper {
    height: 100%;
    width: 100%;
    padding: 0 20px 0;
    padding-top: 120px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}

.search {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 450px;

  input {
    background: transparent;
    color: #ffff;
    font-size: 18px;
    line-height: 1.4;
    padding: 8px 10px;
    width: 100%;
  }

  button {
    background-color: transparent;
    position: relative;
    width: 30px;
    height: 30px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      mask: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACq0lEQVR4nO2ZT4jNURTHP2/GiJ5nwbCZ8WeBjX8pYWyEUlYjRfI3xVvNxI6Gkj8LZVIWStmxEL0SESKEUSQhC7GjqFEWZDDMPJ06r0633/vHvTP31e9Tt/dev9/7nnPu+91z7j0PUlJSUoCJwCKgE1gPrAZmAc0xz84M4CjwDBgCignjO3AF2A6MIRLagQvAnzJOlxvHiIBdwNcE5waBV8BV4BJwG3jv3HNmNB1vAnodh4aBm8A6YEKZ780E9gLHgcmMIr2O8zLby2kQ8o7zBWC8B905wGZPWhUzzTfHeXmc/pdJZi1dJCAF4/xLj7PVbrLYMNBBAGab/C6vSzzrnzeTc4cAnDAGJD36RjLUoJmgNt8GXpsA1hKGG8bGHp/CU4zwQMBMsdvYkerujQ4j/JRwLDV2nvsU3uCkzlC0GjuffQpvDPXTJtSDoo5+n8KdRvg64Wgzdj76FJ5nhN8RjjXGzkOfwuOAn6ZSSuUMwUETwOmQOVrSXQjeGBubfIvvNOLbfIsDq4y+7Ium+jaQAbbqkPc+kR3tC2eb3gfkaBCOlDk39zVCEDs0MZScvux8fqxtGu8sBj7pJu9f9u8ZnXnr7DXtHeVHIoiTzqKr56AuAT9yHhc5IFkngwchv8CXhMbVWd07TTPNK3mOF2pH4oHjWGnmk5wLHoSU/ltVGli/Klz7ARyucq7Ohw4io5u9J3V05X4D54DpNdrodoK4B7QQgGXAIe3E9ZvZH9DFXtCC6K6VuTrqCaKHEWJsDRu4IR1dVe7d55wXouh2dzntye4K9zY5PdYFREBWK26tQdw3964gEnI1BpF1Urf0qog5iP0mxWb1OFu6/pYIyTlByPgA3E0omluIlJzm+Up15BSR0wIc0FRZdM7j0oJvGJqB+cBK/f8gJSWFyvwFRfU1LGRw0SMAAAAASUVORK5CYII=')
        no-repeat center / cover;
      background-color: #ffffff69;
      transition: background-color 0.3s ease;
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #ffffff69;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 1px;
    background-color: #ffffff;
    transition: width 0.3s ease;
  }

  &:has(input:focus) {
    &::after {
      height: 2px;
      width: 100%;
      transition: width 0.3s ease;
    }
    button {
      &::before {
        background-color: #ffffff;
        transition: background-color 0.3s ease;
      }
    }
  }
}
</style>
