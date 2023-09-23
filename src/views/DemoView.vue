<script setup>
import mapModule from '@/components/TestPage/mapModule.vue';
</script>

<template>
  <div class="demo">
    <mapModule />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .demo {
    min-height: 100vh;
    background-color: black;
    display: flex;
    align-items: center;
  }
}
</style>
