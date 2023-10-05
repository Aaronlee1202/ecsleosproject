<script setup>
import { ref, reactive } from 'vue';
import LEOIntroCard from '../common/svgComponents/LEOIntroCard.vue';
import MEOIntroCard from '../common/svgComponents/MEOIntroCard.vue';
import HEOIntroCard from '../common/svgComponents/HEOIntroCard.vue';
import leo from '@/assets/intro/leo.svg';
import meo from '@/assets/intro/meo.svg';
import heo from '@/assets/intro/heo.svg';

const props = defineProps({
  slideIndex: {
    type: Number,
    default: 0
  }
});
const leoImg = ref([leo, meo, heo]);
const satelliteIntro = reactive([
  {
    title: '低軌衛星',
    subtitle: '對地觀測 | 寬頻應用 | 物連網 | 通訊',
    orbitalPeriod: '約90-120分鐘',
    speed: '快 (7.8-8公里/秒)',
    delay: '低 (20公尺/秒)',
    density: '高 (星系至少上百顆)',
    orbitalPeriodLevel: 1,
    speedLevel: 5,
    delayLevel: 1,
    densityLevel: 5
  },
  {
    title: '中軌衛星',
    subtitle: '氣象觀測 | 衛星電視 | 衛星電話',
    orbitalPeriod: '約12小時',
    speed: '中 (3.07-3.87公里/秒)',
    delay: '中 (100公尺/秒)',
    density: '中 (約6顆可覆蓋全球)',
    orbitalPeriodLevel: 3,
    speedLevel: 3,
    delayLevel: 3,
    densityLevel: 3
  },
  {
    title: '高軌衛星',
    subtitle: '衛星定位 | 導航 | 通信',
    orbitalPeriod: '24小時',
    speed: '慢 (3.07公里/秒)',
    delay: '高 (250公尺/秒)',
    density: '低 (3顆可覆蓋全球)',
    orbitalPeriodLevel: 5,
    speedLevel: 1,
    delayLevel: 5,
    densityLevel: 5
  }
]);
</script>
<template>
  <div id="intro-card">
    <LEOIntroCard v-show="props.slideIndex == 0" />
    <MEOIntroCard v-show="props.slideIndex == 1" />
    <HEOIntroCard v-show="props.slideIndex == 2" />
    <div class="intro container">
      <div class="row custom-row">
        <div class="col">
          <div class="leo-name">{{ satelliteIntro[props.slideIndex].title }}</div>
        </div>
      </div>
      <div class="row custom-row">
        <div class="col">
          <span class="leo-subtitle">
            {{ satelliteIntro[props.slideIndex].subtitle }}
          </span>
        </div>
      </div>
      <div class="row custom-row">
        <div class="col">
          <img class="leo-img" :src="leoImg[props.slideIndex]" alt="leo" />
        </div>
      </div>
      <div class="leo-info-box">
        <div class="leo-info-list">
          <div class="info-title">軌道週期:</div>
          <span>{{ satelliteIntro[props.slideIndex].orbitalPeriod }}</span>
        </div>
        <div class="rank-value-img">
          <svg width="205" height="6" viewBox="0 0 205 6" fill="none">
            <g clip-path="url(#clip0_237_160)">
              <path
                d="M38.8044 6.00006H4.92086C4.26533 6.00028 3.62281 5.80159 3.06587 5.42646C2.50894 5.05132 2.05979 4.51468 1.76917 3.87716L0 0.0635986H36.0744L38.8044 6.00006Z"
                fill="white"
              />
              <path
                :class="
                  satelliteIntro[props.slideIndex].orbitalPeriodLevel >= 2 ? 'rank-value-show-02' : 'rank-value-show-2'
                "
                d="M80.362 6H44.2875L41.5459 0H77.6204L80.362 6Z"
                fill="white"
              />
              <path
                :class="
                  satelliteIntro[props.slideIndex].orbitalPeriodLevel >= 3 ? 'rank-value-show-03' : 'rank-value-show-3'
                "
                d="M121.908 6H85.8334L83.0918 0H119.166L121.908 6Z"
                fill="white"
              />
              <path
                :class="
                  satelliteIntro[props.slideIndex].orbitalPeriodLevel >= 4 ? 'rank-value-show-02' : 'rank-value-show-2'
                "
                d="M163.454 6H127.379L124.649 0H160.712L163.454 6Z"
                fill="white"
              />
              <path
                :class="
                  satelliteIntro[props.slideIndex].orbitalPeriodLevel >= 5 ? 'rank-value-show-03' : 'rank-value-show-3'
                "
                d="M205 6H168.937L166.196 1.83087e-07H200.079C200.735 -0.00022017 201.377 0.198468 201.934 0.573601C202.491 0.948735 202.94 1.48538 203.231 2.1229L205 6Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_237_160">
                <rect width="205" height="6" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div class="leo-info-box">
        <div class="leo-info-list">
          <div class="info-title">速度:</div>
          <span>{{ satelliteIntro[props.slideIndex].speed }}</span>
        </div>
        <div class="rank-value-img">
          <svg width="205" height="6" viewBox="0 0 205 6" fill="none">
            <g clip-path="url(#clip0_237_160)">
              <path
                d="M38.8044 6.00006H4.92086C4.26533 6.00028 3.62281 5.80159 3.06587 5.42646C2.50894 5.05132 2.05979 4.51468 1.76917 3.87716L0 0.0635986H36.0744L38.8044 6.00006Z"
                fill="white"
              />
              <path
                :class="satelliteIntro[props.slideIndex].speedLevel >= 2 ? 'rank-value-show-02' : 'rank-value-show-2'"
                d="M80.362 6H44.2875L41.5459 0H77.6204L80.362 6Z"
                fill="white"
              />
              <path
                :class="satelliteIntro[props.slideIndex].speedLevel >= 3 ? 'rank-value-show-03' : 'rank-value-show-3'"
                d="M121.908 6H85.8334L83.0918 0H119.166L121.908 6Z"
                fill="white"
              />
              <path
                :class="satelliteIntro[props.slideIndex].speedLevel >= 4 ? 'rank-value-show-02' : 'rank-value-show-2'"
                d="M163.454 6H127.379L124.649 0H160.712L163.454 6Z"
                fill="white"
              />
              <path
                :class="satelliteIntro[props.slideIndex].speedLevel >= 5 ? 'rank-value-show-03' : 'rank-value-show-3'"
                d="M205 6H168.937L166.196 1.83087e-07H200.079C200.735 -0.00022017 201.377 0.198468 201.934 0.573601C202.491 0.948735 202.94 1.48538 203.231 2.1229L205 6Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_237_160">
                <rect width="205" height="6" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div class="leo-info-box">
        <div class="leo-info-list">
          <div class="info-title">延遲度:</div>
          <span>{{ satelliteIntro[props.slideIndex].delay }}</span>
        </div>
        <div class="rank-value-img">
          <svg width="205" height="6" viewBox="0 0 205 6" fill="none">
            <g clip-path="url(#clip0_237_160)">
              <path
                d="M38.8044 6.00006H4.92086C4.26533 6.00028 3.62281 5.80159 3.06587 5.42646C2.50894 5.05132 2.05979 4.51468 1.76917 3.87716L0 0.0635986H36.0744L38.8044 6.00006Z"
                fill="white"
              />
              <path
                :class="satelliteIntro[props.slideIndex].delayLevel >= 2 ? 'rank-value-show-02' : 'rank-value-show-2'"
                d="M80.362 6H44.2875L41.5459 0H77.6204L80.362 6Z"
                fill="white"
              />
              <path
                :class="satelliteIntro[props.slideIndex].delayLevel >= 3 ? 'rank-value-show-03' : 'rank-value-show-3'"
                d="M121.908 6H85.8334L83.0918 0H119.166L121.908 6Z"
                fill="white"
              />
              <path
                :class="satelliteIntro[props.slideIndex].delayLevel >= 4 ? 'rank-value-show-02' : 'rank-value-show-2'"
                d="M163.454 6H127.379L124.649 0H160.712L163.454 6Z"
                fill="white"
              />
              <path
                :class="satelliteIntro[props.slideIndex].delayLevel >= 5 ? 'rank-value-show-03' : 'rank-value-show-3'"
                d="M205 6H168.937L166.196 1.83087e-07H200.079C200.735 -0.00022017 201.377 0.198468 201.934 0.573601C202.491 0.948735 202.94 1.48538 203.231 2.1229L205 6Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_237_160">
                <rect width="205" height="6" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div class="leo-info-box">
        <div class="leo-info-list">
          <div class="info-title">覆蓋密度:</div>
          <span>{{ satelliteIntro[props.slideIndex].density }}</span>
        </div>
        <div class="rank-value-img">
          <svg width="205" height="6" viewBox="0 0 205 6" fill="none">
            <g clip-path="url(#clip0_237_160)">
              <path
                d="M38.8044 6.00006H4.92086C4.26533 6.00028 3.62281 5.80159 3.06587 5.42646C2.50894 5.05132 2.05979 4.51468 1.76917 3.87716L0 0.0635986H36.0744L38.8044 6.00006Z"
                fill="white"
              />
              <path
                :class="
                  satelliteIntro[props.slideIndex].densityLevel >= 2 ? 'rank-value-show-02' : 'rank-value-show-2'
                "
                d="M80.362 6H44.2875L41.5459 0H77.6204L80.362 6Z"
                fill="white"
              />
              <path
                :class="
                  satelliteIntro[props.slideIndex].densityLevel >= 3 ? 'rank-value-show-03' : 'rank-value-show-3'
                "
                d="M121.908 6H85.8334L83.0918 0H119.166L121.908 6Z"
                fill="white"
              />
              <path
                :class="
                  satelliteIntro[props.slideIndex].densityLevel >= 4 ? 'rank-value-show-02' : 'rank-value-show-2'
                "
                d="M163.454 6H127.379L124.649 0H160.712L163.454 6Z"
                fill="white"
              />
              <path
                :class="
                  satelliteIntro[props.slideIndex].densityLevel >= 5 ? 'rank-value-show-03' : 'rank-value-show-3'
                "
                d="M205 6H168.937L166.196 1.83087e-07H200.079C200.735 -0.00022017 201.377 0.198468 201.934 0.573601C202.491 0.948735 202.94 1.48538 203.231 2.1229L205 6Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_237_160">
                <rect width="205" height="6" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#intro-card {
  position: relative;
}
.intro {
  position: absolute;
  width: 307px;
  height: 588px;
  padding: 15px 0 0 0;
}
.custom-row {
  display: flex;
  text-align: center;
  margin: 15px 0 0 0;
}
.leo-name {
  font-size: 24px;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: 2.4px;
}
span {
  color: #bbbbbb;
}
.leo-img {
  width: 95%;
  height: 148px;
  background-color: #000000;
}
.leo-info-box {
  margin: 10px 0 20px 0;
}
.leo-info-list {
  display: flex;
  align-items: end;
  padding: 0 0 0 20px;
  margin: 0 0 5px 0;
}
.info-title {
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  letter-spacing: 2.4px;
  margin: 0 7px 0 0;
}
.rank-value-img {
  padding: 0 0 0 20px;
}
.rank-value-show-02 {
  opacity: 1;
  transition: all 0.1s;
}
.rank-value-show-03 {
  opacity: 1;
  transition: all 0.7s;
}
.rank-value-show-2 {
  opacity: 0.1;
  transition: all 0.7s;
}
.rank-value-show-3 {
  opacity: 0.1;
  transition: all 0.1s;
}
</style>
