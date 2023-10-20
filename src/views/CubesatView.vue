<script setup>
import Planet from '@/components/cubesat/PlanetModule.vue';
// 優化lottie使用方式
import lottie from 'lottie-web';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import dialogueJsonData from '@/assets/cubesat/dialogue-all.json';
import decorationData from '@/assets/cubesat/decoration.json';
import scrollButton from '@/components/common/scrollButton.vue';
import structurePage from '@/components/cubesat/structurePage.vue';
import stackingPage from '@/components/cubesat/stackingPage.vue';
import store from '../stores/store.js';

const dialogueJson = ref(null);
const decorationJson = ref(null);

const pageElement = ref(null);
const cubesat = ref(null);
const structure = ref(null);
const stacking = ref(null);
const showPlant = ref(true);
const animateFadeIn = 'animate__animated animate__fadeIn animate__faster';
// const fadeOutToRight = 'animate__animated animate__fadeOutRight';

onMounted(() => {
  animationIcon();
  store.pageName = ['cubesat', 'structure', 'stacking'];
  store.currentPage = 0;
  // 在頁面載入後註冊滾動事件監聽器
  pageElement.value.addEventListener('scroll', scrollEvent);
});
onBeforeUnmount(() => {
  dialogueJson.value.destroy();
  decorationJson.value.destroy();
  // 在組件卸載前移除滾動事件監聽器，以防止內存洩漏
  pageElement.value.removeEventListener('scroll', scrollEvent);
});

const scrollEvent = () => {
  // console.log('滾動位置', pageElement.value.scrollTop);
  // console.log('cubesat頁面位置:', cubesat.value.offsetTop);
  // console.log('structure頁面位置:', structure.value.offsetTop);
  // console.log('stacking頁面位置:', stacking.value.offsetTop);
  if (pageElement.value.scrollTop == 0) {
    store.currentPage = 0;
    showPlant.value = true;
  } else if (pageElement.value.scrollTop == structure.value.offsetTop) {
    store.currentPage = 1;
    showPlant.value = false;
  } else if (pageElement.value.scrollTop >= stacking.value.offsetTop) {
    store.currentPage = 2;
  }
};

const animationIcon = () => {
  const dialogue = document.getElementById(`dialogue`);
  const decoration = document.getElementById(`decoration`);

  dialogueJson.value = lottie.loadAnimation({
    container: dialogue,
    animType: 'svg',
    loop: false,
    autoplay: false,
    animationData: dialogueJsonData
  });
  decorationJson.value = lottie.loadAnimation({
    container: decoration,
    animType: 'svg',
    loop: true,
    autoplay: false,
    animationData: decorationData
  });

  dialogueJson.value.play();

  setTimeout(() => {
    decorationJson.value.play();
  }, 1500);
};
</script>

<template>
  <div ref="pageElement" id="scroll-y">
    <Planet id="planet-background" :class="showPlant ? animateFadeIn : ''" v-show="showPlant" />
    <div ref="cubesat" id="cubesat-page">
      <div class="dialogue-img">
        <div id="dialogue" />
      </div>
      <div class="dialogue-block">
        <div class="dialogue-content">
          <div class="title-block">
            CUBESAT
            <div id="decoration"></div>
          </div>
          <div class="title2">立方衛星</div>
          <span>
            單顆立方衛星大小為10x10x10公分，重量約為1.33公斤，其可以經由不同模式的組合後，成為不同功能之低軌衛星。
          </span>
        </div>
      </div>
      <scrollButton />
    </div>
    <div ref="structure" id="structure-page">
      <structurePage />
    </div>
    <div ref="stacking" id="stacking-page">
      <stackingPage />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#scroll-y {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
#cubesat-page {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  scroll-snap-align: start;
  .title2 {
    font-family: Inter;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 2px;
    margin: 10px 0 25px 0;
  }
}
#planet-background {
  position: absolute;
  width: 100%;
  z-index: -999;
}
#structure-page {
  position: relative;
  min-height: 100vh;
  scroll-snap-align: start;
}
#stacking-page {
  position: relative;
  min-height: 100vh;
  scroll-snap-align: start;
}

.title-block {
  display: flex;
  align-items: center;
  font-family: Orbitron;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 2.4px;
}
#decoration {
  margin-left: 10px;
}

.dialogue-block {
  width: 60%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  .dialogue-content {
    width: 35%;
    position: relative;
    line-height: 26px;
  }
}
.dialogue-img {
  width: 70%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
