<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, watch, onBeforeUnmount } from 'vue';
import lottie from 'lottie-web';
import Text from './TextAnimation.vue';
import jsonDataClick from '@/assets/icon/menu-icon-click.json';
import jsonDataHover from '@/assets/icon/menu-icon-hover.json';
import store from '@/stores/store.js';

const show = ref(false);
const mapShow = ref('opacity: 0');
const anLottieClick = ref();
const anLottieHover = ref();
const menuAnimate = ref();
const mapAnimate = ref();
const fadeInRight = 'animate__animated animate__fadeInRight animate__faster';
const fadeOutRight = 'animate__animated animate__fadeOutRight animate__faster';
const fadeOutLeft = 'animate__animated animate__fadeOutLeft animate__faster';
const animateFadeIn = 'animate__animated animate__fadeIn animate__faster';

const router = useRouter();
const route = useRoute();
const routeName = ref();

//監聽當前路由名稱
watch(
  () => route.name,
  async (newId) => {
    routeName.value = newId;
    console.log(newId);
  }
);

onMounted(() => {
  animationIcon();
});
onBeforeUnmount(() => {});

// menu開關
const menuSwitch = (show) => {
  switch (show) {
    case true:
      anLottieClick.value.setDirection(1);
      anLottieClick.value.play();
      menuAnimate.value = fadeInRight;
      mapAnimate.value = fadeInRight;
      break;

    case false:
      anLottieClick.value.setDirection(-1);
      anLottieClick.value.play();
      menuAnimate.value = fadeOutRight;
      mapAnimate.value = fadeOutRight;
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
    mapAnimate.value = fadeInRight;
  });
  svgContainerClick.addEventListener('mouseleave', () => {
    if (show.value == false) {
      anLottieHover.value.setDirection(-1);
      anLottieHover.value.play();
      mapShow.value = 'opacity: 0';
      mapAnimate.value = fadeOutRight;
    }
  });
  svgContainerClick.addEventListener('mousedown', () => {
    show.value = !show.value;
    menuSwitch(show.value);
  });
};

const toHomePage = () => {
  router.push({ path: '/', query: { opening: false } });
};
</script>

<template>
  <div :class="{ 'background-linear': show }"></div>
  <nav id="navigation" class="container-fluid" role="navigation">
    <div class="row align-items-center justify-content-between custom-row">
      <div class="col menu-logo-block">
        <img id="leo-logo" src="@/assets/icon/LEO-Logo.svg" alt="" />
        <div class="Breadcrumb-block" v-show="routeName != 'opening'">
          <a @click="toHomePage" style="cursor: pointer"> LEO &nbsp;/&nbsp;&nbsp; </a>
          <!-- 需簡化 -->
          <a
            :style="store.currentPage == 0 ? 'color: #ff6b00' : ''"
            :href="'#' + store.pageName[0] + '-page'"
          >
            {{ store.pageName[0] }}
          </a>
          <div v-show="store.currentPage == 1">&nbsp;/&nbsp;&nbsp;</div>
          <a
            v-show="store.currentPage == 1"
            :style="store.currentPage == 1 ? 'color: #ff6b00' : ''"
          >
            {{ store.pageName[1] }}
          </a>
          <div v-show="store.currentPage == 2">&nbsp;/&nbsp;&nbsp;</div>
          <a
            v-show="store.currentPage == 2"
            :style="store.currentPage == 2 ? 'color: #ff6b00' : ''"
          >
            {{ store.pageName[2] }}
          </a>
        </div>
      </div>
      <div class="col-6">
        <div id="menu-toggle">
          <div id="menu-icon-block">
            <div class="menu-icon-text" :class="mapAnimate" :style="mapShow">Map</div>
            <div class="menu-icon">
              <div id="menu-icon-click"></div>
              <div id="menu-icon-hover"></div>
            </div>
          </div>
          <ul id="menu" :class="menuAnimate">
            <li>
              <RouterLink to="/cubesat">
                <Text propsText="CUBESAT" />
              </RouterLink>
              <div class="hover-text-block">
                <div class="hover-text">SUBJECT</div>
                <div>01</div>
              </div>
            </li>
            <li>
              <RouterLink to="/">
                <Text propsText="ABOUT PROJECT" />
              </RouterLink>
              <div class="hover-text-block" style="right: 84%">
                <div class="hover-text">SUBJECT</div>
                <div>02</div>
              </div>
            </li>
            <li>
              <RouterLink to="/">
                <Text propsText="ECS-PRODUCT" />
              </RouterLink>
              <div class="hover-text-block" style="right: 72%">
                <div class="hover-text">SUBJECT</div>
                <div>03</div>
              </div>
            </li>
            <li>
              <RouterLink to="/">
                <Text propsText="LEO-APPLICATION" />
              </RouterLink>
              <div class="hover-text-block" style="right: 89%">
                <div class="hover-text">SUBJECT</div>
                <div>04</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <div
    class="previous-part-block"
    :class="store.currentPage == 0 ? animateFadeIn : fadeOutLeft"
    @click="toHomePage"
    v-show="routeName != 'opening'"
  >
    <img src="@/assets/icon/back.svg" alt="back" />
    <div class="previous-part-text">BACK</div>
  </div>
  <div class="smallSomething-block">
    <img src="@/assets/icon/smallSomething.svg" alt="" />
  </div>
</template>

<style lang="scss" scoped>
#navigation {
  position: fixed;
  padding: 50px 0 0 0;
  z-index: 999;
}
a {
  text-decoration: none;
  color: #838484;
}
.custom-row {
  padding: 0 50px 0 50px;
}
.background-linear {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 70%);
  z-index: 998;
}
.previous-part-block {
  position: fixed;
  top: 25%;
  left: 143px;
  display: flex;
  align-items: center;
  z-index: 990;
  cursor: pointer;
  .previous-part-text {
    width: 66px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-family: Orbitron, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    &:hover {
      background: #ff6b00;
      color: #000000;
    }
  }
  img {
    width: 21px;
    margin-right: 10px;
  }
}
.smallSomething-block {
  position: fixed;
  bottom: 0;
  img {
    padding: 0 0 40px 50px;
  }
}

.menu-logo-block {
  display: flex;
  align-items: end;
}
#leo-logo {
  margin-right: 100px;
}
.Breadcrumb-block {
  color: #838484;
  font-family: Orbitron, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  // &::before {
  //   content: 'LEO / ';
  // }
}

#menu-toggle {
  position: relative;
  -webkit-user-select: none;
  user-select: none;
  z-index: 999;
  a {
    text-decoration: none;
  }
}
#menu-icon-block {
  display: flex;
  float: right; //靠右對齊
  .menu-icon-text {
    font-family: 'Orbitron', sans-serif;
    font-weight: 300;
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
    cursor: pointer;

    // hover後左邊小垃圾
    .hover-text-block {
      display: inline;
      width: 90px;
      padding: 0 0 25px 0;
      font-size: 12px;
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      opacity: 0; // hover前隱藏
    }
    &:hover {
      .hover-text-block {
        display: inline;
        margin: 10px 0 0 0;
        font-size: 12px;
        font-family: 'Inter', sans-serif;
        font-weight: 300;
        color: #ffffff;
        text-align: left;
        opacity: 1; // hover出現
        transition: opacity 0.6s;
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
