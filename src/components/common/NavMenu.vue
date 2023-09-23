<script setup>
import { onMounted, ref } from 'vue';
import lottie from 'lottie-web';
import { RouterLink } from 'vue-router';
import Text from './textAnimation.vue';
import jsonDataClick from '@/assets/icon/menu-icon-click.json';
import jsonDataHover from '@/assets/icon/menu-icon-hover.json';

const show = ref(false);
const mapShow = ref('opacity: 0');
const anLottieClick = ref();
const anLottieHover = ref();
const menuAnimate = ref();
const mapAnimate = ref();
const fadeInRight = ref('animate__animated animate__fadeInRight animate__faster');
const fadeOutRight = ref('animate__animated animate__fadeOutRight animate__faster');

onMounted(() => {
  animationIcon();
});

// menu開關
const menuSwitch = (show) => {
  switch (show) {
    case true:
      anLottieClick.value.setDirection(1);
      anLottieClick.value.play();
      menuAnimate.value = fadeInRight.value;
      mapAnimate.value = fadeInRight.value;
      break;

    case false:
      anLottieClick.value.setDirection(-1);
      anLottieClick.value.play();
      menuAnimate.value = fadeOutRight.value;
      mapAnimate.value = fadeOutRight.value;
      break;
  }
};

// 載入icon
const animationIcon = () => {
  if (!show.value) menuAnimate.value = 'display--none';

  const svgContainerClick = document.getElementById('menu-icon-click');
  const svgContainerHover = document.getElementById('menu-icon-hover');
  anLottieClick.value = lottie.loadAnimation({
    container: svgContainerClick,
    animType: 'svg',
    loop: false,
    autoplay: false,
    animationData: jsonDataClick
  });

  anLottieHover.value = lottie.loadAnimation({
    container: svgContainerHover,
    animType: 'svg',
    loop: false,
    autoplay: false,
    animationData: jsonDataHover
  });

  // 監聽icon事件
  svgContainerClick.addEventListener('mouseover', () => {
    anLottieHover.value.setDirection(1);
    anLottieHover.value.play();
    mapShow.value = 'opacity: 1';
    mapAnimate.value = fadeInRight.value;
  });
  svgContainerClick.addEventListener('mouseleave', () => {
    if (show.value == false) {
      anLottieHover.value.setDirection(-1);
      anLottieHover.value.play();
      mapShow.value = 'opacity: 0';
      mapAnimate.value = fadeOutRight.value;
    }
  });
  svgContainerClick.addEventListener('mousedown', () => {
    show.value = !show.value;
    menuSwitch(show.value);
  });
};
</script>

<template>
  <nav id="navigation" class="container-fluid" role="navigation">
    <div class="row align-items-center justify-content-between">
      <div class="col-6">
        <img id="leo-logo" src="@/assets/icon/LEO-Logo.svg" alt="" />
      </div>
      <div class="col-6">
        <div id="menu-toggle">
          <div id="menu-icon-box">
            <div class="menu-icon-text" :class="mapAnimate" :style="mapShow">MAP</div>
            <div class="menu-icon">
              <div id="menu-icon-click"></div>
              <div id="menu-icon-hover"></div>
            </div>
          </div>
          <ul id="menu" :class="menuAnimate">
            <li>
              <RouterLink to="/">
                <Text propsText="CUBESAT" />
              </RouterLink>
              <div class="hover-text-box">
                <p class="hover-text">SUBJECT</p>
                <p>01</p>
              </div>
            </li>
            <li>
              <RouterLink to="/">
                <Text propsText="ABOUT PROJECT" />
              </RouterLink>
              <div class="hover-text-box" style="right: 84%">
                <p class="hover-text">SUBJECT</p>
                <p>02</p>
              </div>
            </li>
            <li>
              <RouterLink to="/">
                <Text propsText="ECS-PRODUCT" />
              </RouterLink>
              <div class="hover-text-box" style="right: 72%">
                <p class="hover-text">SUBJECT</p>
                <p>03</p>
              </div>
            </li>
            <li>
              <RouterLink to="/">
                <Text propsText="LEO-APPLICATION" />
              </RouterLink>
              <div class="hover-text-box" style="right: 89%">
                <p class="hover-text">SUBJECT</p>
                <p>04</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
#navigation {
  position: fixed;
  margin: 40px 0 0 0;
  padding: 0 50px 0 50px;
  background-color: #00000000;
}
#leo-logo {
  cursor: pointer;
}
#menu-toggle {
  position: relative;
  -webkit-user-select: none;
  user-select: none;
  a {
    text-decoration: none;
  }
}
#menu-icon-box {
  display: flex;
  float: right; //靠右對齊
  .menu-icon-text {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #ffffff;
    margin-right: 10px;
    // 垂直置中
    display: flex;
    align-items: center;
  }
}

// 將兩個icon圖片疊在一起
.menu-icon {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  #menu-icon-click {
    position: absolute;
    cursor: pointer;
    z-index: 999;
  }
  #menu-icon-hover {
    position: absolute;
  }
}
.display--none {
  display: none;
}

#menu {
  width: 550px;
  position: absolute;
  right: 0%;
  margin: 65px 5px 0 0;
  padding: 0;
  direction: rtl; // 排版從右到左
  list-style-type: none;
  -webkit-font-smoothing: antialiased;

  // menu的每一行li
  li {
    height: 80px;
    padding: 0px 0;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 36px;
    // 垂直置中
    display: flex;
    align-items: center;

    // hover後左邊小垃圾
    .hover-text-box {
      display: inline;
      width: 90px;
      opacity: 0; // hover前隱藏
    }
    &:hover {
      .hover-text-box {
        display: inline;
        margin: 10px 0 0 0;
        font-family: 'Inter', sans-serif;
        font-weight: 300;
        font-size: 12px;
        color: #ffffff;
        text-align: left;
        opacity: 1; // hover出現
        transition: opacity 0.6s;
        p {
          line-height: 5px;
        }
      }
      //白色方塊
      .hover-text::before {
        content: '';
        display: inline-block;
        margin: 0 0 2px 10px;
        width: 6px;
        height: 6px;
        background-color: #ffffff;
      }
    }
  }
}
</style>
