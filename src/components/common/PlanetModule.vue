<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import {
  IcosahedronGeometry,
  MeshStandardMaterial,
  Scene,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  SpotLight
} from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';

let scene, sphere, camera, composer, renderer, spotLight;
const mapModule = ref();

onMounted(() => {
  initModule();
  render();
  animate();
});
onUnmounted(() => {
  console.log('onUnmounted');

  // model01.traverse((obj) => {
  //   if (obj.type == 'Mesh') {
  //     obj.geometry.dispose();
  //     obj.material.dispose();
  //   }
  // });
  // model02.traverse((obj) => {
  //   if (obj.type == 'Mesh') {
  //     obj.geometry.dispose();
  //     obj.material.dispose();
  //   }
  // });

  // scene.remove(model01, model02);

  // //  renderer.dispose();
  // renderer.renderLists.dispose();
});

//掛載到Ref上
function render() {
  try {
    //建立渲染器
    renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMappingExposure = 0.01;
    mapModule.value.appendChild(renderer.domElement);
  } catch {
    console.error('render Error');
  }
}

function initModule() {
  //建立場景
  scene = new Scene();
  //建立視角
  camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 4, 2000000);
  //建立渲染器
  renderer = new WebGLRenderer({ antialias: true });
  camera.position.x = 0;
  camera.position.y = 50;
  camera.position.z = 250;
  //建立球體
  const geometry = new IcosahedronGeometry(100, 24);
  const material = new MeshStandardMaterial({ wireframe: true });
  sphere = new Mesh(geometry, material);
  scene.add(sphere);

  initSpotLight();

  renderer.setSize(window.innerWidth, window.innerHeight);

  // 畫面大小監聽
  window.addEventListener('resize', onWindowResize);
  composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  const bokehPass = new BokehPass(scene, camera, {
    focus: 1.0, // 焦点深度，可以根据需要调整
    aperture: 0.025, // 光圈大小，可以根据需要调整
    maxblur: 0.002 // 最大模糊程度
  });
  composer.addPass(bokehPass);
}

// 自適應視窗大小
function onWindowResize() {
  // 重新設置視窗寬高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相機投影矩陣
  camera.updateProjectionMatrix();
  // 重新設置重新設置渲染器渲染範圍
  renderer.setSize(window.innerWidth, window.innerHeight);
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
  renderer.render(scene, camera);
  composer.render();
  requestAnimationFrame(animate);
}
</script>

<template>
  <div ref="mapModule" />
</template>

<style scoped></style>
