<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps(['code'])

const video = ref(props.code)

const videoUrl = computed(() => {
  return new URL(`../assets/videos/${video.value}.mp4`, import.meta.url).href
})
</script>

<template>
  <div class="banner">
    <video preload="auto" :src="videoUrl" autoplay muted playsinline loop></video>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
