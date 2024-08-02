<script lang="ts" setup>
import logo from '@/assets/images/logo.svg'
import { ref } from 'vue'

const isOpen = ref<Boolean>(false)
const handleClick = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <header class="header" :class="isOpen && 'opened'">
    <div class="header__container container">
      <div @click="handleClick" class="header__logo">
        <img :src="logo" alt="logo" />
      </div>
      <div class="header__menu menu">
        <div class="menu__wrapper">some weather cards</div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
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
.menu {
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
  }
}
</style>
