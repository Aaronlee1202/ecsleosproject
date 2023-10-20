<script setup>
import { RouterView } from 'vue-router';
import NavMenu from './components/common/NavMenu.vue';
</script>

<template>
  <header>
    <NavMenu />
  </header>
  <RouterView />
</template>

<style lang="scss">
body {
  background-image: url(@/assets/images/bg.png);
  background-size: 100%;
}
</style>
