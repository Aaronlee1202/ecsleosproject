<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
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
// import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';

let scene, clock, sphere, camera, spotLight;
const renderer = ref();
const mapModule = ref();

onMounted(() => {
  initScene();
});
onUnmounted(() => {
  console.log('onUnmounted');
  sphere.traverse((obj) => {
    if (obj.type == 'Mesh') {
      obj.geometry.dispose();
      obj.material.dispose();
    }
  });
  scene.remove(sphere);
  renderer.value.dispose();
  renderer.value.renderLists.dispose();
});

function initScene() {
  console.log('init');
  //建立場景
  scene = new Scene();
  clock = new Clock();

  //建立視角
  camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 4, 2000000);
  camera.position.set(0, 50, 250);

  //建立渲染器
  renderer.value = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.value.setPixelRatio(window.devicePixelRatio);
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  renderer.value.toneMappingExposure = 0.01;
  //掛載到Ref上
  mapModule.value.appendChild(renderer.value.domElement);

  //建立球體
  const geometry = new IcosahedronGeometry(100, 24);
  const material = new MeshStandardMaterial({ wireframe: true });
  sphere = new Mesh(geometry, material);
  scene.add(sphere);

  initSpotLight();

  // 畫面大小監聽
  window.addEventListener('resize', onWindowResize);

  animate();
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

function initSpotLight() {
  spotLight = new SpotLight(0xffffff, 1000000);
  spotLight.position.copy(camera.position);
  spotLight.angle = Math.PI / 2; // 聚光燈錐柱體角度
  spotLight.penumbra = 1; // 模糊係數
  spotLight.decay = 3; // 衰減率
  spotLight.distance = 1550; // 最大照射距離

  spotLight.target = sphere;

  // 加入場景
  scene.add(spotLight);
}

function animate() {
  requestAnimationFrame(animate);
  clock.getDelta();
  renderer.value.render(scene, camera);
}
</script>

<template>
  <div ref="mapModule" />
</template>
