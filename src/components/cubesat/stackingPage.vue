<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import stack1U from '@/assets/cubesat/stack1U.svg';
import stack1_5U from '@/assets/cubesat/stack1.5U.svg';
import stack2U from '@/assets/cubesat/stack2U.svg';
import stack3U from '@/assets/cubesat/stack3U.svg';
import stack6U from '@/assets/cubesat/stack6U.svg';
import stack12U from '@/assets/cubesat/stack12U.svg';
import lottie from 'lottie-web';
import decorationData from '@/assets/cubesat/decoration.json';

const imgArray = [stack1U, stack1_5U, stack2U, stack3U, stack6U, stack12U];
const decorationJson = ref(null);
onMounted(() => {
  animationIcon();
});
onBeforeUnmount(() => {
  decorationJson.value.destroy();
});
const animationIcon = () => {
  const decoration = document.getElementById(`structure-decoration`);

  decorationJson.value = lottie.loadAnimation({
    container: decoration,
    animType: 'svg',
    loop: true,
    autoplay: false,
    animationData: decorationData
  });
  decorationJson.value.play();
};
</script>

<template>
  <div class="container-custom">
    <div class="stacking-intro-block">
      <div class="stack-card" v-for="imgItem in imgArray" :key="imgItem">
        <img :src="imgItem" alt="Stack" loading="lazy" />
      </div>
    </div>
    <div class="introduce">
      <div id="structure-decoration"></div>
      <span class="title">堆疊</span>
      <span class="content"> 立方衛星可以由一個或多個單元組合在一起形成更大的衛星 </span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container-custom {
  position: relative;
  min-width: 100%;
  height: 100vh;
  display: flex;
  // flex-direction: column; //flex-direction :決定flex主軸線方向
  align-items: center;
  justify-content: center;
}
.stacking-intro-block {
  width: 45%;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 3em;
  .stack-card {
    width: 158px;
    height: 246px;
  }
  img {
    position: absolute;
    width: 158px;
    height: 246px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    clip-path: path(
      'M15.9334 -6.96473e-07L139.45 0.000131234C144.37 0.000131019 149.088 1.95789 152.567 5.44273C156.046 8.92756 158 13.6537 158 18.582L157.999 230.661L142.067 245.999L18.5503 245.999C13.6304 245.999 8.91209 244.042 5.43323 240.557C1.95438 237.072 2.15423e-07 232.345 0 227.417L0.00143288 15.3381L15.9334 -6.96473e-07Z'
    );
  }
}
.introduce {
  position: absolute;
  bottom: 8%;
  display: flex;
  align-items: center;
  #structure-decoration {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .title {
    padding: 3px 10px 3px 10px;
    margin: 0 15px 0 15px;
    color: #000000;
    font-size: 20px;
    font-weight: 700;
    background-color: var(--main-orange);
  }
}
/* 13吋筆電以上 */
@media (min-width: 1440px) { }
/* 平板 */
@media (max-width: 1440px) {}
</style>
