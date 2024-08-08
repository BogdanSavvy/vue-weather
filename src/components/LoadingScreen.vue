<script lang="ts" setup></script>

<template>
  <div class="loader">
    <div class="camera">
      <div class="container">
        <div class="side" style="--i: 0; background: #d9ed92"></div>
        <div class="side" style="--i: 1; background: #b5e48c"></div>
        <div class="side" style="--i: 2; background: #99d98c"></div>
        <div class="side" style="--i: 3; background: #76c893"></div>
        <div class="side" style="--i: 4; background: #52b69a"></div>
        <div class="side" style="--i: 5; background: #34a0a4"></div>
        <div class="side" style="--i: 6; background: #168aad"></div>
        <div class="side" style="--i: 7; background: #1a759f"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  height: 100svh;
  width: 100%;
  display: grid;
  place-items: center;
}

.camera {
  width: 50px;
  aspect-ratio: 1 / 1;
  perspective: 500px;

  .container {
    --x-pivot: -45deg;
    transform-style: preserve-3d;
    position: relative;
    height: 100%;
    width: 100%;
    transform-origin: center;
    transform: rotateX(var(--x-pivot)) rotateY(0deg);
    animation: rotate 2.8s infinite;
  }

  .side {
    --i: 0;
    --stroke: 2px;
    height: calc(100% - var(--stroke) * 2);
    width: calc(50% - var(--stroke) * 2);

    position: absolute;
    background: white;
    border: var(--stroke) solid black;
    transform: rotate3d(0, 1, 0, calc(45deg * var(--i)));
    transform-origin: right center;
    backface-visibility: visible;
  }
}

@keyframes rotate {
  0% {
    transform: rotateX(var(--x-pivot)) rotateY(22.5deg);
    animation-timing-function: cubic-bezier(0.71, 0, 0.23, 0.99);
  }
  50% {
    transform: rotateX(var(--x-pivot)) rotateY(200.5deg);
    animation-timing-function: cubic-bezier(0.71, 0, 0.23, 0.99);
  }

  100% {
    transform: rotateX(var(--x-pivot)) rotateY(382.5deg);
    animation-timing-function: cubic-bezier(0.71, 0, 0.23, 0.99);
  }
}
</style>
