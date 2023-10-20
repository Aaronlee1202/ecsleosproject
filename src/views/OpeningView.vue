<script setup>
import Planet from '../components/opening/PlanetModule.vue';
import LEOIntroCard from '../components/opening/LEOIntroCard.vue';
import SubjectButton from '../components/opening/SubjectButton.vue';
import jsonDataHover from '@/assets/icon/menu-icon-hover.json';
import PlayerIcon from '@/assets/icon/player.svg';
import lottie from 'lottie-web';
import { useRoute } from 'vue-router';
import { onMounted, ref, onBeforeUnmount } from 'vue';

const fadeAnimate = ref();
const fadeAnimate2 = ref();
const fadeAnimate3 = ref();
const fadeInDown = 'animate__animated animate__fadeInDown';
const fadeOutLeft = 'animate__animated animate__fadeOutLeft';
const animateFadeIn = 'animate__animated animate__fadeIn';
const playerIcon = ref();
const anLottieHover = ref(null);
const planetMoveEffectSwitch = ref(true);
const subjectButton = ref(false);
const slideIndex = ref(0);
const satelliteName = ['LEO', 'MEO', 'HEO'];
const distanceInfo = ['離地 300-1500km', '離地 2000-30000km', '離地大於36000km'];

const plusDivs = () => {
  if (slideIndex.value < 2) slideIndex.value++;
};
const minusDivs = () => {
  if (slideIndex.value > 0) slideIndex.value--;
};

const route = useRoute();

onMounted(() => {
  if (route.query.opening == 'false') {
    planetMoveEffectSwitch.value = false;
    subjectButton.value = true;
  } else {
    animationIcon();
  }
});
onBeforeUnmount(() => {
  // anLottieHover.value.destroy();
});
//載入player Icon
const animationIcon = () => {
  const svgContainerHover = document.getElementById('discover-icon-hover');
  playerIcon.value = PlayerIcon;

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

//按下player後轉場動畫
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
          subjectButton.value = true;
        }, 200);
      }, 200);
    }, 200);
  }
};
</script>

<template>
  <div class="opening-page">
    <!-- 球體 -->
    <Planet
      id="planet-background"
      :planetMoveEffectSwitch="planetMoveEffectSwitch"
      :slideIndex="slideIndex"
    />
    <!-- 圓圈 -->
    <div class="circle-box" v-show="!planetMoveEffectSwitch">
      <img id="circle" src="@/assets/intro/circle.svg" />
      <div class="distance-content-block">
        <div class="distance-info">{{ distanceInfo[slideIndex] }}</div>
        <!-- <div class="distance-info"><Text :propsText="distanceInfo[slideIndex]" /></div> -->

        <img src="@/assets/intro/down_arrow.svg" alt="" />
      </div>
    </div>
    <!-- 按鈕操作 -->
    <div class="action-button-block" v-show="!planetMoveEffectSwitch">
      <div class="action-button">
        <img
          src="@/assets/intro/left_btn.svg"
          alt="Left"
          @click="plusDivs()"
          :style="slideIndex != 2 ? '' : 'opacity:0'"
        />
        <h1>{{ satelliteName[slideIndex] }}</h1>
        <img
          src="@/assets/intro/right_btn.svg"
          alt="Right"
          @click="minusDivs()"
          :style="slideIndex != 0 ? '' : 'opacity:0'"
        />
      </div>
    </div>
    <!-- 開場白 -->
    <div id="content" v-if="planetMoveEffectSwitch">
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
            <img :src="playerIcon" alt="" />
          </div>
          <div id="discover-icon-hover" @click="clickedPlayerButton"></div>
        </div>
      </div>
    </div>
    <!-- Page跳轉按鈕 -->
    <div class="subject-button-box" v-if="!planetMoveEffectSwitch">
      <SubjectButton
        id="subject-button-CUBESAT"
        :class="slideIndex != 0 ? fadeOutLeft : animateFadeIn"
        subjectButton="CUBESAT"
        pageName="CUBESAT"
        v-show="subjectButton"
      >
      </SubjectButton>
      <SubjectButton
        id="subject-button-ABOUT_PROJECT"
        :class="slideIndex != 0 ? fadeOutLeft : animateFadeIn"
        subjectButton="ABOUT_PROJECT"
        pageName="About Project"
        v-show="subjectButton"
      />
      <SubjectButton
        id="subject-button-PRODUCT"
        :class="slideIndex != 0 ? fadeOutLeft : animateFadeIn"
        subjectButton="PRODUCT"
        pageName="ECS Product"
        v-show="subjectButton"
      />
      <SubjectButton
        id="subject-button-APPLICATION"
        :class="slideIndex != 0 ? fadeOutLeft : animateFadeIn"
        subjectButton="APPLICATION"
        pageName="Application"
        v-show="subjectButton"
      />
    </div>
    <!-- 衛星介紹卡片 -->
    <LEOIntroCard id="intro-card" v-show="subjectButton" :slideIndex="slideIndex" />
  </div>
</template>

<style lang="scss" scoped>
.opening-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
#planet-background {
  width: 100%;
  position: absolute;
  z-index: -999;
}
.circle-box {
  position: absolute;
  width: 45%;
  display: flex;
  #circle {
    width: 100%;
  }
  .distance-content-block {
    position: absolute;
    bottom: 2%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    .distance-info {
      color: #bbb;
      font-family: Orbitron;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 16.5px;
    }
  }
}
.action-button-block {
  position: absolute;
  width: 45%;
  line-height: 16.5px;
  letter-spacing: 3.6px;
  .action-button {
    display: flex;
    margin-left: -100px;
    h1 {
      color: #ffffff;
      width: 98px;
      justify-content: left;
    }
    img {
      margin: 0 25px 0 25px;
      cursor: pointer;
    }
  }
}
#intro-card {
  position: absolute;
  margin-bottom: 650px;
  right: 410px;
}
.subject-button-box {
  width: 60vw;
  height: 50vh;
}
#subject-button-CUBESAT {
  position: absolute;
  display: inline-grid;
  justify-items: center;
  left: 40%;
  top: 37%;
}
#subject-button-ABOUT_PROJECT {
  position: absolute;
  display: inline-grid;
  justify-items: center;
  left: 53%;
  top: 27%;
}
#subject-button-PRODUCT {
  position: absolute;
  display: inline-grid;
  justify-items: center;
  left: 56%;
  top: 53%;
}
#subject-button-APPLICATION {
  position: absolute;
  display: inline-grid;
  justify-items: center;
  left: 42%;
  top: 60%;
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
