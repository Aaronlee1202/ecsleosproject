<script setup>
import { RouterView } from 'vue-router';
import NavMenu from './components/common/NavMenu.vue';
</script>

<template>
  <header>
    <NavMenu />
  </header>

  <RouterView id="RouterView" />
</template>

<style lang="scss">
body {
  background-color: black;
  color: #ffffff;
  margin: 0;
  #RouterView {
    // padding: 110px 0 0 0;
  }
}
</style>
