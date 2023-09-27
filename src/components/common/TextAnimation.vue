<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps({
  propsText: String
});

onMounted(() => {
  messageText.value = props.propsText;
});

const codeletters = ref('ABCDJKLMNOPWXYZ'); //ABCDEFGHIJKLMNOPQRSTUVWXYZ
const message = ref(0);
const currentLength = ref(0);
const fadeBuffer = ref(false);
const messages = ref([]);
const messageText = ref('');

const generateRandomString = (length) => {
  let randomText = '';
  while (randomText.length < length) {
    randomText += codeletters.value.charAt(Math.floor(Math.random() * codeletters.value.length));
  }
  return randomText;
};

const animateIn = () => {
  if (currentLength.value < messages.value[message.value].length) {
    currentLength.value = currentLength.value + 2;
    if (currentLength.value > messages.value[message.value].length) {
      currentLength.value = messages.value[message.value].length;
    }
    let msg = generateRandomString(currentLength.value);
    messageText.value = msg;
    setTimeout(animateIn, 20);
  } else {
    setTimeout(animateFadeBuffer, 20);
  }
};

const animateFadeBuffer = () => {
  if (fadeBuffer.value === false) {
    fadeBuffer.value = [];
    for (let i = 0; i < messages.value[message.value].length; i++) {
      fadeBuffer.value.push({
        c: Math.floor(Math.random() * 8) + 1,
        l: messages.value[message.value].charAt(i)
      });
    }
  }
  let doCycles = false;
  let msg = '';
  for (let i = 0; i < fadeBuffer.value.length; i++) {
    let fader = fadeBuffer.value[i];
    if (fader.c > 0) {
      doCycles = true;
      fader.c--;
      msg += codeletters.value.charAt(Math.floor(Math.random() * codeletters.value.length));
    } else {
      msg += fader.l;
    }
  }
  messageText.value = msg;
  if (doCycles === true) {
    setTimeout(animateFadeBuffer, 10);
  } else {
    cycleText();
    //   setTimeout(cycleText, 2000);
  }
};

const cycleText = () => {
  message.value = message.value + 1;
  if (message.value >= messages.value.length) {
    message.value = 0;
  }
  currentLength.value = 0;
  fadeBuffer.value = false;
  //  messageText.value = ''; //效果結束後將文字清空
  // setTimeout(animateIn, 200); //無限loop
};

const init = () => {
  messages.value = [props.propsText];
  animateIn();
};
</script>

<template>
  <div id="messenger" @mouseover="init()">
    <a>
      {{ messageText }}
    </a>
  </div>
</template>

<style lang="scss" scoped>
#messenger {
  position: relative;
  clip-path: polygon(5% 0, 100% 0, 100% 0, 100% 80%, 95% 100%, 0 100%, 0% 80%, 0% 20%);
  -webkit-clip-path: polygon(5% 0, 100% 0, 100% 0, 100% 80%, 95% 100%, 0 100%, 0% 80%, 0% 20%);
}

#messenger a {
  display: block;
  height: 65px;
  text-decoration: none;
  color: #ffffff;
  box-shadow: inset 0 0 0 0 #ff6b00;
  transition: all 0.2s ease-in-out 0s;

  // 垂直置中
  display: flex;
  align-items: center;

  &:hover {
    padding: 0 20px 0 20px;
    border-radius: 0px 5px 0px 5px;
    box-shadow: inset -450px 0 0 0 #ff6b00;
    color: #000000;
  }
}
</style>
