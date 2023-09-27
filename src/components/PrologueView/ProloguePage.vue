<script setup>
import { onMounted, ref } from 'vue';
import lottie from 'lottie-web';
import Planet from '../common/PlanetModule.vue';
import jsonDataHover from '@/assets/icon/menu-icon-hover.json';

const anLottieHover = ref();

onMounted(() => {
  animationIcon();
});

const animationIcon = () => {
  const svgContainerHover = document.getElementById('discover-icon-hover');

  anLottieHover.value = lottie.loadAnimation({
    container: svgContainerHover,
    animType: 'svg',
    loop: false,
    autoplay: false,
    animationData: jsonDataHover
  });

  // 監聽icon事件
  svgContainerHover.addEventListener('mouseover', () => {
    anLottieHover.value.setDirection(1);
    anLottieHover.value.play();
  });
  svgContainerHover.addEventListener('mouseleave', () => {
    anLottieHover.value.setDirection(-1);
    anLottieHover.value.play();
  });
};
</script>

<template>
  <Planet id="planet-background" />
  <div id="content">
    <h1>LOW EARTH ORBIT SATELLITE</h1>
    <h2>
      自1957年發射人造衛星發射以來，已經發射了千枚火箭<br />
      搭載著一萬多顆衛星進入太空，也乘載了無數人類的夢想
    </h2>
    <div class="discover-icon-box">
      <div class="icon-box">
        <div class="img-box">
          <img src="../../assets/icon/player.svg" alt="" />
        </div>
        <div id="discover-icon-hover"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#planet-background {
  position: absolute;
  z-index: -999;
}
#content {
  position: relative;
  padding: 110px 0 0 0;
}
h1 {
  height: 90px;
  color: var(--color-special-mark);
  display: flex;
  align-items: center;
  justify-content: center;
}
h2 {
  text-align: center;
  line-height: 32px;
}
.discover-icon-box {
  position: relative;
  top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon-box {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    .img-box {
      position: absolute;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .discover-icon-hover {
      position: absolute;
    }
    &:hover {
      &::after {
        content: 'Discover';
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        font-size: 14px;
        font-family: 'Orbitron', sans-serif;
        font-weight: 400;
        line-height: 16.5px;
      }
    }
  }
}
</style>
