<script setup>
import jsonData from '@/assets/icon/scroll-icon.json';
import { onMounted, ref, watch, onBeforeUnmount } from 'vue';
import lottie from 'lottie-web';
import store from '@/stores/store';

const anLottie = ref(null);
const showScrollTop = ref(false);

onMounted(() => {
  animationIcon();
});
onBeforeUnmount(() => {
  anLottie.value.destroy();
});

watch(store, (page) => {
  const currentPage = page.currentPage;
  const totalPage = page.pageName.length - 1;
  if (currentPage == 0) {
    anLottie.value.setDirection(1);
    anLottie.value.play();
  } else if (currentPage == 1) {
    anLottie.value.setDirection(-1);
    anLottie.value.play();
  }
  if (currentPage == totalPage) {
    showScrollTop.value = true;
  } else {
    showScrollTop.value = false;
  }
});

//載入player Icon
const animationIcon = () => {
  const svgContainer = document.getElementById('scroll-icon');

  anLottie.value = lottie.loadAnimation({
    container: svgContainer,
    animType: 'svg',
    loop: false,
    autoplay: true,
    animationData: jsonData
  });
};
</script>

<template>
  <div id="scroll-icon"></div>
  <a
    class="scroll-top animate__animated animate__fadeIn animate__faster"
    v-if="showScrollTop"
    :href="'#' + store.pageName[0] + '-page'"
  >
    <img src="@/assets/icon/scroll-top-icon.svg" alt="scroll-top" />
  </a>
</template>

<style lang="scss" scoped>
#scroll-icon {
  position: absolute;
  right: 5%;
  bottom: 5%;
  width: 58px;
  z-index: 998;
}
.scroll-top {
  position: fixed;
  right: 5%;
  bottom: 5%;
  cursor: pointer;
  z-index: 998;
  img {
    width: 85%;
  }
}
</style>
