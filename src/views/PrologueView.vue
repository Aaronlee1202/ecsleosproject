<script setup>
import Planet from '../components/PrologueView/PlanetModule.vue';
import LEOIntroCard from '../components/PrologueView/LEOIntroCard.vue';
import { onMounted, ref } from 'vue';
import lottie from 'lottie-web';
import jsonDataHover from '@/assets/icon/menu-icon-hover.json';

const fadeAnimate = ref();
const fadeAnimate2 = ref();
const fadeAnimate3 = ref();
const fadeInDown = 'animate__animated animate__fadeInDown';
const fadeOutLeft = 'animate__animated animate__fadeOutLeft';
const anLottieHover = ref(null);
const planetMoveEffectSwitch = ref(true);

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

  if (planetMoveEffectSwitch.value) {
    fadeAnimate.value = fadeInDown;
    setTimeout(() => {
      fadeAnimate2.value = fadeInDown;
    }, 200);
  }
};

const clickedPlayerButton = () => {
  if (planetMoveEffectSwitch.value) {
    fadeAnimate.value = fadeOutLeft;
    setTimeout(() => {
      fadeAnimate2.value = fadeOutLeft;
      setTimeout(() => {
        fadeAnimate3.value = fadeOutLeft;
        setTimeout(() => {
          //移除anLottieHover的svg圖片
          anLottieHover.value = null;
          planetMoveEffectSwitch.value = false;
        }, 200);
      }, 200);
    }, 200);
  }
};
</script>

<template>
  <div class="prologue-page">
    <Planet id="planet-background" :planetMoveEffectSwitch="planetMoveEffectSwitch" />
    <div id="content">
      <h1 class="animate__animated animate__fadeInDown" :class="fadeAnimate">
        LOW EARTH ORBIT SATELLITE
      </h1>
      <h2 :class="fadeAnimate2">
        自1957年發射人造衛星發射以來，已經發射了千枚火箭<br />
        搭載著一萬多顆衛星進入太空，也乘載了無數人類的夢想
      </h2>
      <div class="discover-icon-box" :class="fadeAnimate3">
        <div class="icon-box">
          <div class="img-box">
            <img src="@/assets/icon/player.svg" alt="" />
          </div>
          <div id="discover-icon-hover" @click="clickedPlayerButton"></div>
        </div>
      </div>
    </div>
    <LEOIntroCard id="intro-card" v-show="true" />
  </div>
</template>

<style scoped>
#planet-background {
  position: absolute;
  z-index: -999;
}
#intro-card {
  position: absolute;
}
.prologue-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#content {
  position: relative;
  padding: 190px 0 0 0;
}
h1 {
  height: 50px;
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
