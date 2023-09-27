<script setup>
import lottie from 'lottie-web';
import { onMounted } from 'vue';
import jsonData from '@/assets/three/special-hover-fast.json';
// import jsonData from '@/assets/icon/menu-click-border.json';
// import jsonData from '@/assets/three/inventory.json';

function animation() {
  const svgContainer = document.getElementById('svgContainer');
  const anLottie = lottie.loadAnimation({
    container: svgContainer,
    animType: 'svg',
    loop: true,
    autoplay: false,
    animationData: jsonData
  });

  svgContainer.addEventListener('mouseover', () => {
    anLottie.play();
  });
  svgContainer.addEventListener('mouseleave', () => {
    anLottie.stop();
  });


  // const svgContainer = document.getElementById('svgContainer');
  // const anLottie = lottie.loadAnimation({
  //   container: svgContainer,
  //   animType: 'svg',
  //   loop: true,
  //   autoplay: false,
  //   animationData: jsonData
  // });

  // svgContainer.addEventListener('mouseover', () => {
  //   anLottie.play();
  // });
  // svgContainer.addEventListener('mouseleave', () => {
  //   anLottie.stop();
  // });
}

onMounted(() => {
  animation();
});
</script>

<template>
  <a id="svgContainer"></a>
</template>

<style scoped>
#svgContainer {
  background-color: #dcdcdc00;
  cursor: pointer;
}
</style>
