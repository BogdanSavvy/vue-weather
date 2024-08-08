<script lang="ts" setup>
import { reactive, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { CityDataType, WeatherDataType } from '@/types'
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { getCoords, getCurrentWeather } from '@/api/weatherApi'
import WeatherCard from '@/components/WeatherCard.vue'

const props = defineProps(['data'])
const citiesData: Ref<CityDataType[]> = ref(props.data)
const isOpen = ref<Boolean>(false)

const formdata = reactive({
  cityname: ''
})
const route = useRoute()
const router = useRouter()

const handleClick = () => {
  isOpen.value = !isOpen.value
}

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

    router.replace(`/weather/${newCityData.id}`)
  }
}

const deleteCity = async (cityId: string) => {
  try {
    await deleteDoc(doc(db, 'cities', cityId))
    citiesData.value = citiesData.value.filter((city) => city.id !== cityId)
  } catch (error) {
    console.error(error)
    throw new Error('Something went wrong, try again later!')
  } finally {
    if (route.params.id === cityId) {
      router.replace('/')
    }
  }
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
      </div>
      <div class="header__search">
        <form @submit.prevent="handleSubmit" class="search">
          <button type="submit"></button>
          <input v-model="formdata.cityname" type="text" required />
        </form>
      </div>
    </div>
    <div class="header__menu menu">
      <div class="menu__wrapper">
        <WeatherCard
          v-for="item in citiesData"
          :key="item.id"
          :cardData="item"
          :deleteCity="deleteCity"
        />
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

  &.opened {
    .menu {
      left: 0;
      transition: left 0.8s ease;
    }
  }

  &__container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
  }

  &__actions {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__search {
  }

  &__goBack {
    position: relative;
    z-index: 2;
    margin-right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    transition: transform 0.5s ease;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      mask: var(--go-back-icon) no-repeat center / contain;
      background-color: #ffffff;
    }

    &:hover {
      transform: translateX(-5px);
      transition: transform 0.5s ease;
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
    padding: 120px 20px 0px;
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
  width: 520px;

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
      mask: var(--search-icon) no-repeat center / cover;
      background-color: #ffffff80;
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
    background-color: #ffffff80;
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
