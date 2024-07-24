<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpened = ref<boolean>(false)

const toggleMenu = (e: Event) => {
  e.preventDefault()

  isOpened.value = !isOpened.value
}
</script>

<template>
  <header class="header" :class="isOpened && 'active'">
    <div class="header__container">
      <div class="menu-wrapper">
        <nav class="menu-nav">
          <ul class="menu-list">
            <li class="menu-item">
              <RouterLink to="/">Home</RouterLink>
            </li>
            <li class="menu-item">
              <RouterLink to="/weather">Weather</RouterLink>
            </li>
            <li class="menu-item">
              <RouterLink to="/about">About</RouterLink>
            </li>
          </ul>
        </nav>
        <div class="menu-actions">
          <div class="menu-auth">
            <button class="primary-button">Sign In</button>
            <button class="outline-button">Sign Up</button>
          </div>
          <button class="theme-toggler">
            <img src="../assets/logo.svg" alt="toggle_theme" />
          </button>
        </div>
      </div>
      <div class="menu-trigger" @click="toggleMenu">
        <img src="../assets/logo.svg" alt="logo" />
      </div>
    </div>
  </header>
</template>

<style scoped>
a {
  color: inherit;
}

button {
  min-width: 30px;
  background: transparent;
  color: inherit;
}

.header {
  position: fixed;
  top: -350px;
  z-index: 100;
  display: flex;
  width: 100%;
  height: auto;

  transition: top 0.3s linear;
}

.header.active {
  top: 0;
}

.header__container {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.menu-wrapper {
  width: 100%;
  height: 410px;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  border-radius: 0 0 20px 20px;

  background-color: var(--dark-grey);
}

.menu-trigger {
  cursor: pointer;
  position: relative;
  width: 70px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 10px 20px;
  margin-right: 50px;
  border-radius: 0 0 50% 50%;
  background-color: var(--dark-grey);

  transition:
    padding 0.3s ease-in-out,
    height 0.3s ease-in-out;
}
.menu-trigger:hover {
  height: 55px;
}
.menu-trigger img {
  max-width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.menu-nav {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.menu-list {
  text-align: center;
}

.menu-item {
  font-size: 32px;
  line-height: 1.3;
}

.menu-actions {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.menu-auth {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>
