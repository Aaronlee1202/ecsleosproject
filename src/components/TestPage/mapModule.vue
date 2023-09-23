<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  SpotLight,
  Object3D,
  MeshStandardMaterial,
  MeshBasicMaterial
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, spotLight, model01, model02;
const mapModule = ref();
const loader = new GLTFLoader();

onMounted(() => {
  initModule();
  loadGLTF();

  initCameraControl();
  render();
  animate();
});
onUnmounted(() => {
  console.log('onUnmounted');

  model01.traverse((obj) => {
    if (obj.type == 'Mesh') {
      obj.geometry.dispose();
      obj.material.dispose();
    }
  });
  model02.traverse((obj) => {
    if (obj.type == 'Mesh') {
      obj.geometry.dispose();
      obj.material.dispose();
    }
  });

  scene.remove(model01, model02);

  //  renderer.dispose();
  renderer.renderLists.dispose();
});

//掛載到Ref上
function render() {
  try {
    //建立渲染器
    renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.01;

    mapModule.value.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    console.log('render ..ok');
  } catch {
    console.error('render Error');
  }
}

function initModule() {
  //建立場景
  scene = new Scene();
  //建立視角
  camera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 4, 4000000);
  //建立渲染器
  renderer = new WebGLRenderer({ antialias: true });
  camera.position.x = 530;
  camera.position.y = 290;
  camera.position.z = 920;
  //  camera.lookAt(scene.position);

  initSpotLight();

  //  renderer.setClearColor(new Color(0x111111));
  renderer.setSize(window.innerWidth, window.innerHeight);

  //  console.log('initModule ..ok');
}

function loadGLTF() {
  //建立DRACOLoader實例 用來解碼
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
  loader.setDRACOLoader(dracoLoader);
  loader.load(
    // resource URL
    '/src/assets/three/ground.gltf',
    function (gltf) {
      model01 = gltf.scene;
      scene.add(model01);
      // 建立gltf本身自帶的動畫

      // 調整模型大小
      model01.scale.set(0.55, 0.55, 0.55);

      // 初始化模型位置
      model01.position.set(0, -230, 20);

      // 導入自發光的線框
      convertToWireframe(model01);
    }
  );

  loader.load(
    // resource URL
    '/src/assets/three/ground.gltf',
    function (gltf) {
      model02 = gltf.scene;
      scene.add(model02);
      // 建立gltf本身自帶的動畫

      // 調整模型大小
      model02.scale.set(0.549, 0.549, 0.549);

      // 初始化模型位置
      model02.position.set(0, -230, 20);

      // 將上面不透光材質導入
      convertToBlack(model02);
    }
  );
  //  console.log('loadGLTF ..ok');

  // 畫面大小監聽
  window.addEventListener('resize', onWindowResize);
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

// 將要導入的gltf模型轉成線框，原理是將wireframe套用在子集模型中的點＆線
function convertToWireframe(object) {
  try {
    // traverse意思是應用、遍佈於每個子對象，以及可以被調用
    object.traverse(function (child) {
      // 選取子集的所有面
      if (child.isMesh) {
        const StandardMaterial = new MeshStandardMaterial({
          wireframe: true //渲染成wireframe
          //  emissive: 0xffffff,
          //  emissiveIntensity: 5
        });

        child.material = StandardMaterial; // 將模型套用在全部子集內
      }
    });

    //   console.log('Wireframe ..ok');
  } catch {
    console.error('convertToWireframe Error');
  }
}

// 將想要導入的gltf模型轉成半透材質
function convertToBlack(object) {
  // traverse意思是應用、遍佈於每個子對象，以及可以被調用
  object.traverse(function (child) {
    // 選取子集的所有面
    if (child.isMesh) {
      const BasicMaterial = new MeshBasicMaterial({
        transparent: true,
        opacity: 0.8
      });

      child.material = BasicMaterial; // 將模型套用在全部子集內
    }
  });
}

function initSpotLight() {
  spotLight = new SpotLight(0xffffff, 30000000);
  spotLight.position.set(-100, 400, -100); // 設置聚光燈位置在模型正上方
  spotLight.angle = Math.PI / 4; // 聚光燈錐柱體角度
  spotLight.penumbra = 1; // 模糊係數
  spotLight.decay = 2; // 衰減率
  spotLight.distance = 1000; // 最大照射距離

  //  lightHelper = new SpotLightHelper(spotLight);

  //往正下方照射
  const target = new Object3D();
  scene.add(target);
  spotLight.target = target;

  // 加入場景
  scene.add(spotLight);
  //  scene.add(lightHelper);
}

function initCameraControl() {
  const controls = new OrbitControls(camera, mapModule.value);
  // 不可翻轉地平線以下
  controls.maxPolarAngle = Math.PI / 2.3;
  // 不可翻轉地平線以上
  controls.minPolarAngle = Math.PI / 3; //2=360度

  // 是否能放大縮小
  controls.enableZoom = true;

  controls.dampingFactor = 0.01; // 阻尼系數
  // controls.autoRotate = true; //啟用自動旋轉
  controls.autoRotateSpeed = 0.15;
  controls.enablePan = false;
  controls.enableDamping = true;

  // 相機香外向內移動，到時候可以用在不同狀態縮放球體功能
  controls.minDistance = 750;
  controls.maxDistance = 750;

  // 禁止所以滑鼠行為
  controls.enabled = true;
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
</script>

<template>
  <div ref="mapModule" />
</template>

<style scoped></style>
