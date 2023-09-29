<script setup>
import { ref } from 'vue';
import cardBackground from '../common/svgComponents/card_background.vue';
import leo from '../../assets/intro/leo.svg';

const leoImg = ref(leo);
</script>
<template>
  <div id="intro-card">
    <cardBackground class="svg-data" />
    <div class="intro container">
      <div class="row custom-row">
        <div class="col">
          <div class="leo-name">低軌衛星</div>
        </div>
      </div>
      <div class="row custom-row">
        <div class="col">
          <span class="leo-subtitle">
            對地觀測 &ensp;| &ensp;寬頻應用 &ensp;| &ensp;物連網 &ensp;| &ensp;通訊
          </span>
        </div>
      </div>
      <div class="row custom-row">
        <div class="col">
          <img class="leo-img" :src="leoImg" alt="leo" />
        </div>
      </div>
      <div class="leo-info-box">
        <div class="leo-info-list">
          <div class="info-title">軌道週期:</div>
          <span>約90-120分鐘</span>
        </div>
        <div class="rank-value-img">
          <svg width="205" height="6" viewBox="0 0 205 6" fill="none">
            <g clip-path="url(#clip0_237_160)">
              <path
                class="rank-value-show"
                d="M38.8044 6.00006H4.92086C4.26533 6.00028 3.62281 5.80159 3.06587 5.42646C2.50894 5.05132 2.05979 4.51468 1.76917 3.87716L0 0.0635986H36.0744L38.8044 6.00006Z"
                fill="white"
              />
              <path d="M80.362 6H44.2875L41.5459 0H77.6204L80.362 6Z" fill="white" />
              <path d="M121.908 6H85.8334L83.0918 0H119.166L121.908 6Z" fill="white" />
              <path d="M163.454 6H127.379L124.649 0H160.712L163.454 6Z" fill="white" />
              <path
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
          <span>快 (7.8-8公里/秒)</span>
        </div>
        <div class="rank-value-img">
          <svg width="205" height="6" viewBox="0 0 205 6" fill="none">
            <g clip-path="url(#clip0_237_160)">
              <path
                class="rank-value-show"
                d="M38.8044 6.00006H4.92086C4.26533 6.00028 3.62281 5.80159 3.06587 5.42646C2.50894 5.05132 2.05979 4.51468 1.76917 3.87716L0 0.0635986H36.0744L38.8044 6.00006Z"
                fill="white"
              />
              <path d="M80.362 6H44.2875L41.5459 0H77.6204L80.362 6Z" fill="white" />
              <path d="M121.908 6H85.8334L83.0918 0H119.166L121.908 6Z" fill="white" />
              <path d="M163.454 6H127.379L124.649 0H160.712L163.454 6Z" fill="white" />
              <path
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
          <span>低 (20公尺/秒)</span>
        </div>
        <div class="rank-value-img">
          <svg width="205" height="6" viewBox="0 0 205 6" fill="none">
            <g clip-path="url(#clip0_237_160)">
              <path
                class="rank-value-show"
                d="M38.8044 6.00006H4.92086C4.26533 6.00028 3.62281 5.80159 3.06587 5.42646C2.50894 5.05132 2.05979 4.51468 1.76917 3.87716L0 0.0635986H36.0744L38.8044 6.00006Z"
                fill="white"
              />
              <path d="M80.362 6H44.2875L41.5459 0H77.6204L80.362 6Z" fill="white" />
              <path d="M121.908 6H85.8334L83.0918 0H119.166L121.908 6Z" fill="white" />
              <path d="M163.454 6H127.379L124.649 0H160.712L163.454 6Z" fill="white" />
              <path
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
          <span>高 (星系至少上百顆)</span>
        </div>
        <div class="rank-value-img">
          <svg width="205" height="6" viewBox="0 0 205 6" fill="none">
            <g clip-path="url(#clip0_237_160)">
              <path
                class="rank-value-show"
                d="M38.8044 6.00006H4.92086C4.26533 6.00028 3.62281 5.80159 3.06587 5.42646C2.50894 5.05132 2.05979 4.51468 1.76917 3.87716L0 0.0635986H36.0744L38.8044 6.00006Z"
                fill="white"
              />
              <path d="M80.362 6H44.2875L41.5459 0H77.6204L80.362 6Z" fill="white" />
              <path d="M121.908 6H85.8334L83.0918 0H119.166L121.908 6Z" fill="white" />
              <path d="M163.454 6H127.379L124.649 0H160.712L163.454 6Z" fill="white" />
              <path
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
  top: 25%;
  right: 30%;
}
.svg-data {
  position: absolute;
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
</style>
