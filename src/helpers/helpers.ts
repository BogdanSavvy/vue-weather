export const convertTemperature = (temp: number) => {
  return Math.round(temp - 273.15)
}

export const getDateTime = (timezone: number) => {
  const localTime = new Date().getTime()

  const localOffset = new Date().getTimezoneOffset() * 60000

  const cityTime = localTime + localOffset + timezone * 1000

  const cityDate = new Date(cityTime)

  const hours = cityDate.getHours().toString().padStart(2, '0')
  const minutes = cityDate.getMinutes().toString().padStart(2, '0')
  const dayOfWeek = cityDate.toLocaleDateString('en-US', { weekday: 'long' })
  const dayOfMonth = cityDate.getDate()
  const month = cityDate.toLocaleDateString('en-US', { month: 'long' })

  return `${dayOfWeek}, ${month} ${dayOfMonth} ${hours}:${minutes}`
}
