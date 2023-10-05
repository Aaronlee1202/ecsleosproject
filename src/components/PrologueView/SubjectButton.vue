<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
import lottie from 'lottie-web';
import subjectJsonData from '@/assets/intro/subject-hover.json';

const anLottieHover_Subject = ref(null);

onMounted(() => {
  animationIcon();
});
onUnmounted(() => {
  anLottieHover_Subject.value.destroy();
});

const props = defineProps({
  subjectButton: {
    type: String
  },
  pageName: {
    type: String
  }
});

const animationIcon = () => {
  const subJectHover = document.getElementById(`subJect-hover-${props.subjectButton}`);

  anLottieHover_Subject.value = lottie.loadAnimation({
    container: subJectHover,
    animType: 'svg',
    loop: false,
    autoplay: false,
    animationData: subjectJsonData
  });

  // 監聽icon事件
  subJectHover.addEventListener('mouseover', () => {
    anLottieHover_Subject.value.setDirection(1);
    anLottieHover_Subject.value.play();
  });
  subJectHover.addEventListener('mouseleave', () => {
    anLottieHover_Subject.value.setDirection(-1);
    anLottieHover_Subject.value.play();
  });
};
</script>

<template>
  <div class="subject-button">
    <div :id="`subJect-hover-${props.subjectButton}`"></div>
    <div class="subJect-text">{{ props.pageName }}</div>
  </div>
</template>

<style lang="scss" scoped>
.subject-button {
  #subJect-hover-CUBESAT {
    width: 35px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  #subJect-hover-ABOUT_PROJECT {
    width: 35px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  #subJect-hover-PRODUCT {
    width: 35px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  #subJect-hover-APPLICATION {
    width: 35px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .subJect-text {
    font-size: 14px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 400;
  }
}
</style>
