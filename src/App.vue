<script setup>
import { RouterView } from 'vue-router';
import NavMenu from './components/common/NavMenu.vue';
</script>

<template>
  <header>
    <NavMenu />
  </header>
  <RouterView id="main-page" />
</template>

<style lang="scss">
body {
  background-image: url(./assets/images/bg.png);
  background-size: 100%;
}
#main-page {
  position: relative;
  min-height: 100vh;
}
</style>
