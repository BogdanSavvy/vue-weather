<script setup lang="ts">
import { RouterLink } from 'vue-router'

const handeleClick = (e: Event) => {
  console.log(e.target, 'was clicked')
}
</script>

<template>
  <header class="header">
    <div class="header__container container">
      <div class="header__logo">
        <RouterLink to="/">
          <img src="../assets/logo.svg" alt="logo" />
        </RouterLink>
      </div>
      <div class="menu-wrapper">
        <nav class="menu">
          <ul class="menu-list">
            <li class="menu-item">
              <RouterLink to="/weather">Weather</RouterLink>
            </li>
            <li class="menu-item">
              <RouterLink to="/about">About</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="burger">
        <button @click="handeleClick">click</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
a {
  color: inherit;
}

.header {
  position: fixed;
  display: flex;
  width: 100%;
  height: 80px;

  transition: height 0.5s linear;
}

.header__container {
  flex: 1 1 auto;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.header__logo {
  max-width: 50px;
  height: auto;
}

.header__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.menu-wrapper {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
}

.menu-list {
  display: flex;
  gap: 20px;
}

.menu-item {
  font-size: 18px;
  font-weight: 500;
}

.burger {
  display: none;
}

@media (max-width: 768px) {
  .burger {
    display: flex;
  }
}
</style>
