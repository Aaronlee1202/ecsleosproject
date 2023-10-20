<script setup>
import { onMounted, ref, reactive, watch, onBeforeUnmount } from 'vue';
import {
  Clock,
  IcosahedronGeometry,
  MeshStandardMaterial,
  Scene,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  SpotLight
} from 'three';

let scene, clock, sphereMesh, camera, spotLight, targetX, targetY, clockTime;
const meshShrinkSlowlyFirst = ref(true);
const renderer = ref();
const geometry = ref();
const detail = ref(28);
const planetModule = ref();
const sphereMeshScale_Buff = ref();
const mouseMove = reactive({
  mouseX: 0,
  mouseY: 0
});
const spotLightValue = ref(1500000);
const cameraPosition = reactive({
  x: 0,
  y: 45,
  z: 230
});
const props = defineProps({
  planetMoveEffectSwitch: {
    type: Boolean,
    default: true
  },
  slideIndex: {
    type: Number,
    default: 0
  }
});

watch(
  () => props.slideIndex,
  (newIdx) => {
    // console.log('newIdx', newIdx);
    // console.log('oldIdx', oldIdx);
    if (newIdx == 0) {
      sphereMesh.scale.set(
        sphereMeshScale_Buff.value,
        sphereMeshScale_Buff.value,
        sphereMeshScale_Buff.value
      );
    }
    if (newIdx == 1) {
      clock.start();
      meshShrinkSlowly_Medium();
    }
    if (newIdx == 2) {
      meshShrinkSlowly_High();
    }
  }
);

onMounted(() => {
  initScene();
});
//釋放空間
onBeforeUnmount(() => {
  sphereMesh.traverse((obj) => {
    if (obj.type == 'Mesh') {
      obj.geometry.dispose();
      obj.material.dispose();
    }
  });
  scene.remove(sphereMesh);
  renderer.value.dispose();
  renderer.value.renderLists.dispose();
});
//建立場景
function initScene() {
  scene = new Scene();
  //建立時鐘
  clock = new Clock();

  const Width = window.innerWidth;
  const Height = window.innerHeight;

  //建立視角
  camera = new PerspectiveCamera(40, Width / Height, 4, 2000000);
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

  //建立渲染器
  renderer.value = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.value.setPixelRatio(window.devicePixelRatio);
  renderer.value.setSize(Width, Height);
  renderer.value.toneMappingExposure = 0.01;

  //建立球體
  geometry.value = new IcosahedronGeometry(100, detail.value);
  const material = new MeshStandardMaterial({ wireframe: true });
  sphereMesh = new Mesh(geometry.value, material);
  scene.add(sphereMesh);

  initSpotLight();

  // 監聽滑鼠移動
  document.addEventListener('mousemove', onMouseMove);
  // 畫面大小監聽
  window.addEventListener('resize', onWindowResize);
  //掛載到Ref上
  planetModule.value.appendChild(renderer.value.domElement);

  animate();
}
// 聚光燈初始化
function initSpotLight() {
  spotLight = new SpotLight(0xffffff, spotLightValue.value);
  spotLight.position.copy(camera.position);
  spotLight.angle = Math.PI / 2; // 聚光燈錐柱體角度
  spotLight.penumbra = 1; // 模糊係數
  spotLight.decay = 3; // 衰減率
  // spotLight.distance = 1550; // 最大照射距離

  spotLight.target = sphereMesh;

  // 加入場景
  scene.add(spotLight);
}
function onMouseMove(event) {
  mouseMove.mouseX = event.clientX - window.innerWidth / 4; //水平偏移量（客戶端x通常指螢幕左上角-螢幕一半）
  mouseMove.mouseY = event.clientY - window.innerHeight / 4; //垂直偏移量
}
//滑鼠互動效果
function mouseMoveEffect() {
  targetX = mouseMove.mouseX * 0.0005;
  targetY = mouseMove.mouseY * 0.0005;
  if (camera) {
    // camera.rotation.y += 0.003 * (targetX - camera.rotation.y);
    // camera.rotation.x += 0.003 * (targetY - camera.rotation.x);

    scene.rotation.y += 0.015 * (targetX - scene.rotation.y);
    scene.rotation.x += 0.015 * (targetY - scene.rotation.x);
  }
}
// 自適應視窗大小
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  // 重新設置視窗寬高比
  camera.aspect = width / height;
  // 更新相機投影矩陣
  camera.updateProjectionMatrix();
  // 重新設置重新設置渲染器渲染範圍
  renderer.value.setSize(width, height);
}

//球體緩慢變小
function meshShrinkSlowly(size) {
  if (clock.running) {
    clockTime = clock.getElapsedTime();
    if (clockTime >= size) {
      if (camera.position.y > 0) {
        //修正到置中位置附近
        camera.position.y -= 0.79;
      } else {
        sphereMeshScale_Buff.value = sphereMesh.scale.x;
        //直接將球體置中
        camera.position.y = 0;
        meshShrinkSlowlyFirst.value = false;
        // 停止計時
        // clock.stop();
      }
      // sphereMesh.scale.set(1, 1, 1); //原來大小
    } else {
      // 球體旋轉
      sphereMesh.rotation.y += 0.015;
      // 距離大小
      sphereMesh.scale.x = 1 - clockTime / 3.0;
      sphereMesh.scale.y = 1 - clockTime / 3.0;
      sphereMesh.scale.z = 1 - clockTime / 3.0;

      // 亮度
      spotLightValue.value += 90000;
      spotLight.decay -= 0.0025; // 衰減率

      if (camera.position.y > 0) {
        camera.position.y -= 0.79;
      }
      camera.position.z += 0.8;
    }
  }
}

function meshShrinkSlowly_Medium() {
  // 距離大小
  sphereMesh.scale.x = 1 - 0.5;
  sphereMesh.scale.y = 1 - 0.5;
  sphereMesh.scale.z = 1 - 0.5;

  // 亮度
  // spotLightValue.value += 90000;
  // spotLight.decay -= 0.0025; // 衰減率
}

function meshShrinkSlowly_High() {
  // 距離大小
  sphereMesh.scale.x = 1 - 0.65;
  sphereMesh.scale.y = 1 - 0.65;
  sphereMesh.scale.z = 1 - 0.65;

  // 亮度
  // spotLightValue.value += 90000;
  // spotLight.decay -= 0.0025; // 衰減率
}

function animate() {
  requestAnimationFrame(animate);
  renderer.value.render(scene, camera);

  // 觸發滑鼠互動效果
  if (props.planetMoveEffectSwitch) mouseMoveEffect();
  //
  if (!props.planetMoveEffectSwitch && meshShrinkSlowlyFirst.value) {
    clock.getDelta();
    meshShrinkSlowly(0.94);
  }
}
</script>

<template>
  <div>
    <div ref="planetModule"></div>
  </div>
</template>
