import { ref, onMounted, onUnmounted } from 'vue';

export function useScroll() {
  const pageElement = ref(null);
  const page1 = ref(null);
  const page2 = ref(null);
  const scrollTop = ref(0);
  const offsetTop1 = ref(0);
  const offsetTop2 = ref(0);

  function scrollEvent() {
    // console.log('Element ID :', myElement.value.id);
    // console.log(myElement.value.scrollTop);
    // console.log('cubesat:', cubesat.value.offsetTop);
    // console.log('structure:', structure.value.offsetTop);
    scrollTop.value = pageElement.value.scrollTop;
    offsetTop1.value = page1.value.offsetTop;
    offsetTop2.value = page2.value.offsetTop;
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => pageElement.value.addEventListener('scroll', scrollEvent));
  onUnmounted(() => pageElement.value.removeEventListener('scroll', scrollEvent));

  return { pageElement, page1, page2, scrollTop, offsetTop1, offsetTop2 };
}
