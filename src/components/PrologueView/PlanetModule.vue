<script setup>
import { onMounted, ref, reactive, onUnmounted } from 'vue';
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
// import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

let scene, clock, sphereMesh, camera, spotLight, targetX, targetY, clockTime;
const renderer = ref();
const mapModule = ref();
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
  }
});

onMounted(() => {
  initScene();
});
onUnmounted(() => {
  console.log('onUnmounted');
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

function initScene() {
  //建立場景
  scene = new Scene();
  //建立時鐘
  clock = new Clock();

  //建立視角
  camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 4, 2000000);
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

  //建立渲染器
  renderer.value = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.value.setPixelRatio(window.devicePixelRatio);
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  renderer.value.toneMappingExposure = 0.01;
  //掛載到Ref上
  mapModule.value.appendChild(renderer.value.domElement);

  //建立球體
  const geometry = new IcosahedronGeometry(100, 28);
  const material = new MeshStandardMaterial({ wireframe: true });
  sphereMesh = new Mesh(geometry, material);
  scene.add(sphereMesh);

  initSpotLight();

  // 監聽滑鼠移動
  document.addEventListener('mousemove', onMouseMove);
  // 畫面大小監聽
  window.addEventListener('resize', onWindowResize);

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
  targetX = mouseMove.mouseX * 0.0001;
  targetY = mouseMove.mouseY * 0.0001;
  if (camera) {
    // camera.rotation.y += 0.003 * (targetX - camera.rotation.y);
    // camera.rotation.x += 0.003 * (targetY - camera.rotation.x);

    scene.rotation.y += 0.015 * (targetX - scene.rotation.y);
    scene.rotation.x += 0.015 * (targetY - scene.rotation.x);
  }
}
// 自適應視窗大小
function onWindowResize() {
  // 重新設置視窗寬高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相機投影矩陣
  camera.updateProjectionMatrix();
  // 重新設置重新設置渲染器渲染範圍
  renderer.value.setSize(window.innerWidth, window.innerHeight);
}

//球體緩慢變小
function meshShrinkSlowly(size) {
  if (clock.running) {
    clockTime = clock.getElapsedTime();
    if (clockTime >= size) {
      camera.position.y = 0;
      // 停止計時
      clock.stop();
      // sphereMesh.scale.set(1, 1, 1); //原來大小。
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

      if (camera.position.y != 0) {
        camera.position.y -= 0.24;
      }
      camera.position.z += 0.8;
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  // clock.getDelta();
  renderer.value.render(scene, camera);

  if (props.planetMoveEffectSwitch) {
    // 觸發滑鼠互動效果
    mouseMoveEffect();
  } else {
    clock.getDelta();
    meshShrinkSlowly(1.3);
  }
}
</script>

<template>
  <div ref="mapModule" />
</template>
