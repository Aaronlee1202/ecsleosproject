<script setup>
import { onMounted, ref, reactive, onBeforeUnmount } from 'vue';
import { Scene, PerspectiveCamera, WebGLRenderer, SpotLight, MeshStandardMaterial } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, sphereMesh, camera, spotLight, targetX, targetY;
const loader = new GLTFLoader();
const renderer = ref();
const planetModule = ref();
const mouseMove = { mouseX: 0, mouseY: 0 };
const spotLightValue = ref(2000000);
const cameraPosition = reactive({
  x: -90,
  y: 80,
  z: 230
});

onMounted(() => {
  initScene();
});
//釋放空間
onBeforeUnmount(() => {
  console.log('onBeforeUnmount');
  // 在組件卸載前移除事件監聽器，以防止內存洩漏
  document.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('resize', onWindowResize);
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

  let Plant = '/src/assets/three/planet.glb';
  if (import.meta.env.MODE != 'development') {
    Plant = `${import.meta.env.BASE_URL}src/assets/three/planet.glb`;
  }
  // loadGLTF
  loader.load(
    // resource URL
    Plant,
    function (gltf) {
      sphereMesh = gltf.scene;
      // 調整模型大小
      sphereMesh.scale.set(1, 1, 1);
      // 導入線框
      convertToWireframe(sphereMesh);
      scene.add(sphereMesh);
    }
  );

  const Width = window.innerWidth;
  const Height = window.innerHeight;

  //建立視角
  camera = new PerspectiveCamera(30, Width / Height, 4, 2000000);
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

  //建立渲染器
  renderer.value = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.value.setPixelRatio(window.devicePixelRatio);
  renderer.value.setSize(Width, Height);
  renderer.value.toneMappingExposure = 0.01;

  initSpotLight();

  // 監聽滑鼠移動
  document.addEventListener('mousemove', onMouseMove);
  // 畫面大小監聽
  window.addEventListener('resize', onWindowResize);
  //掛載到Ref上
  planetModule.value.appendChild(renderer.value.domElement);

  animate();
}

// 將要導入的gltf模型轉成線框，原理是將wireframe套用在子集模型中的點＆線
function convertToWireframe(object) {
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
}

// 聚光燈初始化
function initSpotLight() {
  spotLight = new SpotLight(0xffffff, spotLightValue.value);
  spotLight.position.copy(camera.position);
  spotLight.angle = Math.PI / 2; // 聚光燈錐柱體角度
  spotLight.penumbra = 1; // 模糊係數
  spotLight.decay = 2.9; // 衰減率
  // spotLight.distance = 1550; // 最大照射距離

  // spotLight.target = sphereMesh;

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
  const width = window.innerWidth;
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
  renderer.value.render(scene, camera);

  // 觸發滑鼠互動效果
  mouseMoveEffect();
}
</script>

<template>
  <div>
    <div ref="planetModule"></div>
  </div>
</template>
