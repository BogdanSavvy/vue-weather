import axios from 'axios'

import type { WeatherDataType, WeatherForecast } from '@/types'

const instance = axios.create({
  baseURL: 'http://api.openweathermap.org',
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY
  }
})

export const getCoords = async (city: string, country?: string) => {
  try {
    const response = await instance.get(`/geo/1.0/direct?q=${city},${country}&limit=1`)

    if (response.status === 200 && response.data.length > 0) {
      const { lat, lon } = response.data[0]
      return { lat, lon }
    } else {
      throw new Error('Location not found')
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    throw new Error('Failed to fetch coordinates')
  }
}

export const getCurrentWeather = async (lat: number, lon: number): Promise<WeatherDataType> => {
  try {
    const response = await instance.get(`/data/2.5/weather?lat=${lat}&lon=${lon}`)

    if (response.status === 200) {
      return response.data as WeatherDataType
    } else {
      throw new Error('Failed to fetch weather data')
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw new Error('Failed to fetch weather data')
  }
}

export const getForecast = async (cityName: string): Promise<WeatherForecast> => {
  try {
    const response = await instance.get(`/data/2.5/forecast?q=${cityName}`)

    if (response.status === 200) {
      return response.data as WeatherForecast
    } else {
      throw new Error('Failed to fetch weather data')
    }
  } catch (error) {
    console.error('Error fetching hourly forecast weather data:', error)
    throw new Error('Failed to fetch weather data')
  }
}
