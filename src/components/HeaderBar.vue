<script lang="ts" setup>
import { computed, reactive, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { CityDataType, WeatherDataType } from '@/types'
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { getCoords, getCurrentWeather } from '@/api/weatherApi'
import { capitalizeFirstLetter } from '@/helpers/helpers'
import WeatherCard from '@/components/WeatherCard.vue'

const props = defineProps(['data'])
const citiesData: Ref<CityDataType[]> = ref(props.data)
const isOpen = ref<Boolean>(false)

const formdata = reactive({
  cityname: ''
})

const formErrors = reactive({
  cityname: ''
})

const route = useRoute()
const router = useRouter()

const toggleMenu = (event?: Event) => {
  if (event && (event.target as HTMLElement).tagName.toLowerCase() === 'a') {
    isOpen.value = !isOpen.value
  } else if (event && (event.target as HTMLElement).classList.contains('burger')) {
    isOpen.value = !isOpen.value
  }
}

// Validation Rules
const validateCityname = () => {
  if (!formdata.cityname) {
    formErrors.cityname = 'City name is required.'
  } else if (formdata.cityname.length < 3) {
    formErrors.cityname = 'City name must be at least 3 characters long.'
  } else {
    formErrors.cityname = ''
  }
}

// Computed property to check if the form is valid
const isFormValid = computed(() => {
  validateCityname()
  return !formErrors.cityname
})

const handleSubmit = async () => {
  validateCityname()

  if (!isFormValid.value) {
    return
  }

  try {
    const { lat, lon } = await getCoords(formdata.cityname)

    const cityWeather: WeatherDataType = await getCurrentWeather(lat, lon)

    const newCityData = doc(collection(db, 'cities'))
    const cityDoc = {
      city: capitalizeFirstLetter(formdata.cityname),
      country: '',
      id: newCityData.id,
      weatherData: cityWeather
    }

    await setDoc(newCityData, cityDoc)

    citiesData.value.push(cityDoc)
    formdata.cityname = ''
    router.replace(`/weather/${newCityData.id}`)
  } catch (error) {
    console.error(error)
  }
}

const deleteCity = async (cityId: string) => {
  try {
    await deleteDoc(doc(db, 'cities', cityId))
    citiesData.value = citiesData.value.filter((city) => city.id !== cityId)

    if (route.params.id === cityId) {
      router.replace('/')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <header :class="['header', { opened: isOpen }]">
    <div class="header__container">
      <div class="header__actions">
        <button
          v-if="route.path !== '/'"
          class="header__goBack"
          @click="() => router.go(-1)"
        ></button>
        <button @click="toggleMenu" :class="{ opened: isOpen }" class="burger"></button>
      </div>
      <div class="header__search">
        <form @submit.prevent="handleSubmit" :class="formErrors.cityname && 'error'" class="search">
          <button type="submit"></button>
          <div class="search__field">
            <input v-model="formdata.cityname" type="text" required @input="validateCityname" />
            <span v-if="formErrors.cityname">{{ formErrors.cityname }}</span>
          </div>
        </form>
      </div>
    </div>
    <aside class="menu" @click="toggleMenu">
      <div v-if="!citiesData || citiesData.length === 0" class="empty">
        <p>The weather data is empty.<br />Add more cities to explore the weather view!</p>
      </div>
      <div v-else class="menu__wrapper">
        <WeatherCard
          v-for="item in citiesData"
          :key="item.id"
          :cardData="item"
          :deleteCity="deleteCity"
        />
      </div>
    </aside>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: absolute;
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

.empty {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  p {
    max-width: 80%;
    font-size: 18px;
  }
}

.menu {
  overflow-y: auto;
  position: absolute;
  top: var(--header-height);
  left: -100%;
  height: calc(100vh - var(--header-height));
  width: 500px;
  backdrop-filter: blur(10px);
  transition: left 0.8s ease;

  &__wrapper {
    width: 100%;
    padding: 20px;
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

  &.error {
    &::before,
    &::after {
      background-color: #e63737;
    }

    .search__field {
      span {
        position: absolute;
        right: 0;
        bottom: 0;
        transform: translateY(110%);
        color: #e63737;
        font-size: 16px;
      }
    }
  }

  &__field {
    position: relative;
    width: 100%;
  }

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
