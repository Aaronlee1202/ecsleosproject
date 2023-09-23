<script setup>
import { onMounted, ref } from 'vue';
import {
 Scene,
 PerspectiveCamera,
 WebGLRenderer,
 Color,
 Mesh,
 MeshStandardMaterial,
 PMREMGenerator
} from 'three';
import { LottieLoader } from 'three/addons/loaders/LottieLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const threeRef = ref();

let scene, camera, renderer;

function init() {
 //建立場景
 scene = new Scene();
 //建立視角
 camera = new PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 1000);
 //建立渲染器
 renderer = new WebGLRenderer({ antialias: true });
 camera.position.x = 0;
 camera.position.y = 0;
 camera.position.z = 5;
 camera.lookAt(scene.position);

 renderer.setClearColor(new Color(0x111111));
 renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

 const environment = new RoomEnvironment();
 const pmremGenerator = new PMREMGenerator(renderer);
 scene.environment = pmremGenerator.fromScene(environment).texture;

 //掛載到Ref上
 threeRef.value.appendChild(renderer.domElement);
}

function loaderJson() {
 const loader = new LottieLoader();
 loader.setQuality(0.5);
 loader.load('/src/assets/three/special-hover-fast.json', function (texture) {
  setupControls(texture.animation);

  const geometry = new RoundedBoxGeometry(2, 2, 2, 7, 0.2);
  const material = new MeshStandardMaterial({
   roughness: 0.8,
   map: texture,
   transparent: true,
   opacity: 1
  });
  const mesh = new Mesh(geometry, material);
  mesh.quaternion.copy(camera.quaternion);
  scene.add(mesh);
 });
}

function setupControls(animation) {
 // Lottie animation API
 // https://airbnb.io/lottie/#/web
 const scrubber = threeRef.value;
 scrubber.max = animation.totalFrames;
 animation.stop();
 scrubber.addEventListener('mouseleave', function () {
  animation.stop();
 });
 scrubber.addEventListener('mousemove', function () {
  animation.play();
 });
}

function animate() {
 requestAnimationFrame(animate);
 renderer.render(scene, camera);
}

onMounted(() => {
 init();
 loaderJson();
 animate();
});
</script>

<template>
 <div ref="threeRef" />
</template>

<style scoped></style>
