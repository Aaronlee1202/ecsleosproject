<script setup>
import { onMounted, ref, reactive, onBeforeUnmount, nextTick } from 'vue';
import {
  Scene,
  LineSegments,
  EdgesGeometry,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  Vector3
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import * as TWEEN from '@tweenjs/tween.js';

let scene, camera, controls, targetX;
const loader = new GLTFLoader();
const renderer = ref();
const structureModule = ref();
const moduleArr = ['Structure', 'OBC', 'Battery', 'EPS', 'Payload'];
const moduleName = ['結構系統', '指令和資料處理系統', '電池', '電源系統', '有效附載'];
const title = ['structural system', 'OBC', 'LEO Battery', 'EPS system', 'Payload system'];
const moduleIntro = [
  '用於固定和保護衛星。通常採用輕質而堅固的材料製成，如鋁或碳纖維。',
  '負責供應衛星運行所需的能源。包括太陽能電池板和電池，用於收集或存儲能源。',
  '用於執行任務的儀器或設備。包括科學儀器、技術驗證硬體，教育活動硬體等。',
  '低軌衛星電池必須兼顧能量密度、循環壽命、快速充放電、輕量化和抗輻射保護等特點，以應對環境和多樣化任務需求。',
  '控制衛星的操作，處理從衛星儀器和感測器收集的數據，以及實施從地面接收的命令。'
];
const mouseMove = { mouseX: 0, mouseY: 0 };
const selectIndex = ref(0);

const cameraPosition = reactive({
  x: 530,
  y: 290,
  z: 920
});

onMounted(() => {
  initScene();
});

onBeforeUnmount(() => {
  console.log('onBeforeUnmount');
  renderer.value.dispose();
  renderer.value.renderLists.dispose();
  // 在組件卸載前移除事件監聽器，以防止內存洩漏
  window.removeEventListener('resize', onWindowResize);
  document.removeEventListener('mousemove', onMouseMove);
});

//建立場景
function initScene() {
  scene = new Scene();
  // loadGLTF
  loadGltf('src/assets/three/cubesat/structure/structure.gltf', 50, -190, 0);
  loadGltf('src/assets/three/cubesat/structure/OBC.gltf', -10, -130, -5);
  loadGltf('src/assets/three/cubesat/structure/battery.gltf', 25, -80, 0);
  loadGltf('src/assets/three/cubesat/structure/EPS.gltf', -20, -190, 0);
  loadGltf('src/assets/three/cubesat/structure/payload.gltf', -20, -190, 0);

  const Width = window.innerWidth - 90;
  const Height = window.innerHeight;

  //建立視角
  camera = new PerspectiveCamera(55, Width / Height, 4, 2000000);
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

  //建立渲染器
  renderer.value = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.value.setPixelRatio(window.devicePixelRatio);
  renderer.value.setSize(Width, Height);
  renderer.value.toneMappingExposure = 0.01;

  cameraControls(); // 鏡頭控制

  // 畫面大小監聽
  window.addEventListener('resize', onWindowResize);
  // 監聽滑鼠移動
  document.addEventListener('mousemove', onMouseMove);
  //掛載到Ref上
  structureModule.value.appendChild(renderer.value.domElement);

  animate();

  // 使用 $nextTick 來確保 DOM 更新後再執行
  nextTick(() => {
    // 此時可以確保 three.js 的相關操作已經完成
    console.log('場景已建立完成');
  });
}
function loadGltf(URL, x, y, z) {
  loader.load(
    // resource URL
    URL,
    function (gltf) {
      // 使用EdgesGeometry創建邊緣線
      const edgesGeometry = new EdgesGeometry(gltf.scene.children[0].geometry);

      // 創建包含邊緣線的網格
      const Object = new LineSegments(
        edgesGeometry,
        new MeshBasicMaterial({ color: 0x464646, transparent: true, opacity: 0.3 })
      );

      // 添加邊緣線到場景
      scene.add(Object);

      Object.position.set(x, y, z);
      Object.scale.set(26, 26, 26);

      if (scene.children.length == 5) {
        console.log('GLTF載入完成');
        // 預設外框變白
        scene.children[0].material.opacity = 0.8;
        scene.children[0].material.color.set(0xffffff);
      }
    }
  );
}
function cameraControls() {
  controls = new OrbitControls(camera, renderer.value.domElement);

  controls.enableZoom = true; // 是否能放大縮小
  //   controls.dampingFactor = 0.01; // 阻尼系數
  controls.autoRotateSpeed = 0.15;
  controls.enablePan = false;
  controls.enableDamping = true;

  // 相機香外向內移動，到時候可以用在不同狀態縮放球體功能
  controls.minDistance = 700;
  controls.maxDistance = 700;

  // 禁止所以滑鼠行為
  controls.enabled = false;
}

function onMouseMove(event) {
  mouseMove.mouseX = event.clientX - window.innerWidth / 4; //水平偏移量（客戶端x通常指螢幕左上角-螢幕一半）
  // mouseMove.mouseY = event.clientY - window.innerHeight / 4; //垂直偏移量
}
//滑鼠互動效果
function mouseMoveEffect() {
  targetX = mouseMove.mouseX * 0.0001;
  // targetY = mouseMove.mouseY * 0;
  if (camera) {
    scene.rotation.y += 0.015 * (targetX - scene.rotation.y);
    // scene.rotation.x += 0.015 * (targetY - scene.rotation.x);
  }
}
// 自適應視窗大小
function onWindowResize() {
  const width = window.innerWidth - 20;
  const height = window.innerHeight;
  // 重新設置視窗寬高比
  camera.aspect = width / height;
  // 更新相機投影矩陣
  camera.updateProjectionMatrix();
  // 重新設置重新設置渲染器渲染範圍
  renderer.value.setSize(width, height);
}
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // TWEEN.update();
  renderer.value.render(scene, camera);
  mouseMoveEffect();
}

const Add = () => {
  if (selectIndex.value < 4) {
    selectIndex.value++;
    if (selectIndex.value == 1) {
      const vector = new Vector3(235.71170047212502, 90.02554766529394, -82.41356129520716);
      camera.fov = 80;
      camera.updateProjectionMatrix();
      controls.minDistance = 300;
      controls.maxDistance = 300;
      const targetPosition = vector.clone().normalize().multiplyScalar(300);
      // new TWEEN.Tween(camera.position)
      //   .to(targetPosition, 1300)
      //   .easing(TWEEN.Easing.Quadratic.Out)
      //   .start();
    } else if (selectIndex.value == 2) {
      const vector = new Vector3(272.200908606223, 107.69011693047166, 191.8580310267151);
      camera.fov = 80;
      camera.updateProjectionMatrix();
      controls.minDistance = 350;
      controls.maxDistance = 350;
      const targetPosition = vector.clone().normalize().multiplyScalar(350);
      // new TWEEN.Tween(camera.position)
      //   .to(targetPosition, 1400)
      //   .easing(TWEEN.Easing.Quadratic.Out)
      //   .start();
    } else if (selectIndex.value == 3) {
      const vector = new Vector3(259.24754539417444, 235.13877856472016, -0.6819253529141636);
      camera.fov = 80;
      camera.updateProjectionMatrix();
      controls.minDistance = 350;
      controls.maxDistance = 350;
      const targetPosition = vector.clone().normalize().multiplyScalar(350);
      // new TWEEN.Tween(camera.position)
      //   .to(targetPosition, 1400)
      //   .easing(TWEEN.Easing.Quadratic.Out)
      //   .start();
    } else if (selectIndex.value == 4) {
      const vector = new Vector3(16.982807185505145, 197.36348554409597, -288.54677061784173);
      camera.fov = 90;
      camera.updateProjectionMatrix();
      controls.minDistance = 350;
      controls.maxDistance = 350;
      const targetPosition = vector.clone().normalize().multiplyScalar(350);
      // new TWEEN.Tween(camera.position)
      //   .to(targetPosition, 1800)
      //   .easing(TWEEN.Easing.Quadratic.Out)
      //   .start();
    }
    scene.children[selectIndex.value - 1].material.opacity = 0.3;
    scene.children[selectIndex.value - 1].material.color.set(0x464646);
    scene.children[selectIndex.value].material.opacity = 0.8;
    scene.children[selectIndex.value].material.color.set(0xffffff);
  }
};
const Subtraction = () => {
  if (selectIndex.value > 0) {
    selectIndex.value--;
    if (selectIndex.value == 0) {
      const vector = new Vector3(530, 290, 920);
      camera.fov = 55;
      camera.updateProjectionMatrix();
      controls.minDistance = 700;
      controls.maxDistance = 700;
      const targetPosition = vector.clone().normalize().multiplyScalar(700);
      // new TWEEN.Tween(camera.position)
      //   .to(targetPosition, 1300)
      //   .easing(TWEEN.Easing.Quadratic.Out)
      //   .start();
    } else if (selectIndex.value == 1) {
      const vector = new Vector3(235.71170047212502, 90.02554766529394, -82.41356129520716);
      camera.fov = 80;
      camera.updateProjectionMatrix();
      controls.minDistance = 300;
      controls.maxDistance = 300;
      const targetPosition = vector.clone().normalize().multiplyScalar(300);
      // new TWEEN.Tween(camera.position)
      //   .to(targetPosition, 1300)
      //   .easing(TWEEN.Easing.Quadratic.Out)
      //   .start();
    } else if (selectIndex.value == 2) {
      const vector = new Vector3(272.200908606223, 107.69011693047166, 191.8580310267151);
      camera.fov = 80;
      camera.updateProjectionMatrix();
      controls.minDistance = 350;
      controls.maxDistance = 350;
      const targetPosition = vector.clone().normalize().multiplyScalar(350);
      // new TWEEN.Tween(camera.position)
      //   .to(targetPosition, 1400)
      //   .easing(TWEEN.Easing.Quadratic.Out)
      //   .start();
    } else if (selectIndex.value == 3) {
      const vector = new Vector3(259.24754539417444, 235.13877856472016, -0.6819253529141636);
      camera.fov = 80;
      camera.updateProjectionMatrix();
      controls.minDistance = 350;
      controls.maxDistance = 350;
      const targetPosition = vector.clone().normalize().multiplyScalar(350);
      // new TWEEN.Tween(camera.position)
      //   .to(targetPosition, 1400)
      //   .easing(TWEEN.Easing.Quadratic.Out)
      //   .start();
    } else if (selectIndex.value == 4) {
      const vector = new Vector3(16.982807185505145, 197.36348554409597, -288.54677061784173);
      camera.fov = 90;
      camera.updateProjectionMatrix();
      controls.minDistance = 350;
      controls.maxDistance = 350;
      const targetPosition = vector.clone().normalize().multiplyScalar(350);
      // new TWEEN.Tween(camera.position)
      //   .to(targetPosition, 1800)
      //   .easing(TWEEN.Easing.Quadratic.Out)
      //   .start();
    }
    scene.children[selectIndex.value + 1].material.opacity = 0.3;
    scene.children[selectIndex.value + 1].material.color.set(0x464646);
    scene.children[selectIndex.value].material.opacity = 0.8;
    scene.children[selectIndex.value].material.color.set(0xffffff);
  }
};
</script>

<template>
  <div class="container-custom">
    <div ref="structureModule" id="structureModule"></div>
    <div class="swiper-block">
      <div
        class="btn subtraction-btn"
        :class="selectIndex != 0 ? '' : 'not-allowed'"
        @click="Subtraction"
      >
        <div class="svg-container">
          <svg
            width="23"
            height="25"
            viewBox="0 0 23 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_460_4005)">
              <path
                :style="selectIndex != 0 ? 'fill: white' : 'fill: #464646'"
                d="M4.31009 10.3738L-1.81381e-06 10.3738L6.12521 1.07097e-06L10.4353 1.82457e-06L4.31009 10.3738Z"
                fill="white"
              />
              <path
                :style="selectIndex != 0 ? 'fill: white' : 'fill: #464646'"
                d="M10.3712 25L6.06107 25L0 14.7454L4.31009 14.7454L10.3712 25Z"
                fill="white"
              />
              <path
                :style="selectIndex != 0 ? 'fill: white' : 'fill: #464646'"
                d="M16.8042 6.36603C18.0309 6.36603 19.23 6.72174 20.25 7.38817C21.2699 8.0546 22.0649 9.00181 22.5343 10.11C23.0037 11.2183 23.1265 12.4377 22.8872 13.6142C22.6479 14.7907 22.0572 15.8714 21.1898 16.7196C20.3224 17.5678 19.2173 18.1454 18.0142 18.3795C16.8111 18.6135 15.5641 18.4934 14.4308 18.0343C13.2975 17.5753 12.3288 16.7979 11.6473 15.8005C10.9658 14.8031 10.602 13.6306 10.602 12.431C10.6037 10.823 11.2577 9.2813 12.4205 8.14425C13.5833 7.00721 15.1598 6.36769 16.8042 6.36603ZM16.8042 15.0401C17.3335 15.0401 17.8508 14.8866 18.2908 14.5989C18.7308 14.3113 19.0736 13.9024 19.2758 13.4242C19.4781 12.9459 19.5306 12.4197 19.4269 11.9122C19.3232 11.4047 19.0678 10.9387 18.6932 10.5731C18.3185 10.2076 17.8413 9.95903 17.3221 9.85882C16.8028 9.75861 16.2649 9.81131 15.7763 10.0102C15.2877 10.2091 14.8704 10.5453 14.5773 10.9763C14.2842 11.4072 14.1284 11.9135 14.1297 12.431C14.1398 13.1181 14.426 13.7737 14.9265 14.2561C15.427 14.7385 16.1015 15.0088 16.8042 15.0088L16.8042 15.0401Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_460_4005">
                <rect width="23" height="25" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="btn-text subtraction-text" :class="selectIndex != 0 ? 'btn-text-effect' : ''">
          {{ moduleArr[selectIndex - 1] }}
        </div>
      </div>
      <div class="btn add-btn" :class="selectIndex != 4 ? '' : 'not-allowed'" @click="Add">
        <div
          class="btn-text add-text"
          :class="selectIndex != 4 ? 'btn-text-effect' : 'not-allowed'"
        >
          {{ moduleArr[selectIndex + 1] }}
        </div>
        <div class="svg-container">
          <svg
            width="23"
            height="25"
            viewBox="0 0 23 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_460_4043)">
              <path
                :style="selectIndex != 4 ? 'fill: white' : 'fill: #464646'"
                d="M18.6899 14.6262L23 14.6262L16.8748 25L12.5647 25L18.6899 14.6262Z"
                fill="white"
              />
              <path
                :style="selectIndex != 4 ? 'fill: white' : 'fill: #464646'"
                d="M12.6288 -2.81402e-06L16.9389 -2.43722e-06L23 10.2546L18.6899 10.2546L12.6288 -2.81402e-06Z"
                fill="white"
              />
              <path
                :style="selectIndex != 4 ? 'fill: white' : 'fill: #464646'"
                d="M6.19576 18.634C4.96909 18.634 3.76998 18.2783 2.75003 17.6118C1.73009 16.9454 0.93514 15.9982 0.465712 14.89C-0.00371604 13.7817 -0.126548 12.5623 0.112764 11.3858C0.352076 10.2093 0.942785 9.12861 1.81017 8.28041C2.67756 7.43221 3.78269 6.85457 4.98579 6.62055C6.1889 6.38653 7.43594 6.50664 8.56924 6.96569C9.70254 7.42473 10.6712 8.2021 11.3527 9.19948C12.0342 10.1969 12.3979 11.3694 12.3979 12.569C12.3963 14.177 11.7423 15.7187 10.5795 16.8557C9.41673 17.9928 7.84016 18.6323 6.19576 18.634ZM6.19577 9.95987C5.66651 9.95987 5.14917 10.1134 4.7092 10.4011C4.26923 10.6887 3.92643 11.0976 3.72418 11.5758C3.52194 12.0541 3.46936 12.5803 3.57308 13.0878C3.6768 13.5953 3.93216 14.0613 4.30685 14.4269C4.68153 14.7924 5.15869 15.041 5.67793 15.1412C6.19717 15.2414 6.73514 15.1887 7.22374 14.9898C7.71234 14.7909 8.1296 14.4547 8.42272 14.0237C8.71583 13.5928 8.87161 13.0865 8.87034 12.569C8.86023 11.8819 8.57399 11.2263 8.07351 10.7439C7.57302 10.2615 6.89849 9.99115 6.19577 9.99122L6.19577 9.95987Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_460_4043">
                <rect
                  width="23"
                  height="25"
                  fill="white"
                  transform="translate(23 25) rotate(-180)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
    <div class="module-intro-block">
      <img src="../../assets/cubesat/module-content-bg.svg" alt="contentBG" />
      <div class="content-block">
        <div class="intro-title">{{ title[selectIndex] }}</div>
        <div class="intro-title2">{{ moduleName[selectIndex] }}</div>
        <div class="intro-content">{{ moduleIntro[selectIndex] }}</div>
      </div>
      <div class="more-info-block" v-show="selectIndex == 1 || selectIndex == 3">
        <div class="text">More info</div>
      </div>
    </div>
    <div class="module-info-block">
      <div class="current-page">0{{ selectIndex + 1 }}</div>
      <div class="total-page">&nbsp;&nbsp;/0{{ moduleName.length }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#structureModule {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}
.container-custom {
  display: grid;
  height: 100vh;
  font-family: 'Orbitron', sans-serif;
}
.swiper-block {
  width: 100%;
  align-self: center;
  justify-self: center;
  display: flex;
  justify-content: space-between;
  .svg-container {
    width: 20px;
    display: flex;
    align-self: center;
    svg {
      width: 100%;
    }
  }
  .btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover .btn-text-effect {
      // background-color: var(--main-orange);
      color: #ffffff;
    }
  }
  .not-allowed {
    cursor: not-allowed;
  }
  .btn-text {
    width: 100px;
    padding: 5px;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    color: #838484;
    letter-spacing: 2px;
    // text-align: center;
  }
  .subtraction-btn {
    margin-left: 50px;
    text-align: left;
  }
  .subtraction-text {
    margin-left: 20px;
  }
  .add-btn {
    margin-right: 50px;
    text-align: right;
  }
  .add-text {
    margin-right: 20px;
  }
}
.module-info-block {
  position: absolute;
  bottom: 0%;
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  align-items: end;
  justify-content: center;
  font-weight: 700;
  letter-spacing: 1.4px;
  z-index: -1;
  .current-page {
    font-size: 20px;
    width: 30px;
    color: #ffffff;
  }
  .total-page {
    font-size: 12px;
    color: #838484;
  }
}
/* 13吋筆電以上 */
@media (min-width: 1440px) {
  .module-intro-block {
    width: 450px; //374px
    height: 235px;
    margin-left: 50px;
    position: absolute;
    top: 60%;
    left: 0%;
    img {
      position: absolute;
      display: block;
      max-width: 100%;
      opacity: 0.6;
    }
    .content-block {
      font-family: Inter;
      width: 100%;
      padding: 45px 0px 0px 40px;
      .intro-title {
        font-family: Orbitron;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        letter-spacing: 2.4px;
      }
      .intro-title2 {
        margin: 5px 0 35px 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        letter-spacing: 2px;
      }
      .intro-content {
        width: 300px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
    }

    .more-info-block {
      width: 91.145px;
      height: 24px;
      background-image: url('../../assets/cubesat/more-info-btn.png');
      background-repeat: no-repeat;
      position: absolute;
      right: 5%;
      bottom: 8%;
      display: flex;
      align-items: center;
      cursor: pointer;
      .text {
        width: 100%;
        color: #000;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        text-align: center;
      }
    }
  }
}
/* 平板 */
@media (max-width: 1440px) {
  .module-intro-block {
    width: 450px; //374px
    height: 235px;
    margin-left: 50px;
    position: absolute;
    top: 63%;
    left: 0%;
    img {
      position: absolute;
      display: block;
      max-width: 90%;
      opacity: 0.5;
    }
    .content-block {
      font-family: Inter;
      width: 100%;
      padding: 45px 0px 0px 40px;
      .intro-title {
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        letter-spacing: 2.4px;
      }
      .intro-title2 {
        margin: 5px 0 20px 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        letter-spacing: 2px;
      }
      .intro-content {
        width: 300px;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
    }

    .more-info-block {
      width: 91.145px;
      height: 24px;
      background-image: url('../../assets/cubesat/more-info-btn.png');
      background-repeat: no-repeat;
      position: absolute;
      right: 13%;
      bottom: 15%;
      display: flex;
      align-items: center;
      cursor: pointer;
      .text {
        width: 100%;
        color: #000;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        text-align: center;
      }
    }
  }
}
</style>
