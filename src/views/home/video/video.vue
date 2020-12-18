<template>
  <div class="video">
    <div class="title">
      <iframe
        src="https://m.bilibili.com/"
        frameborder="0"
        class="iframe"
      ></iframe>
    </div>
    <div class="kon"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.video {
  width: 100%;
  height: 100%;
  .title {
    height: 120%;
    .iframe {
      width: 100%;
      height: 100%;
    }
  }
  .kon {
    height: 60px;
  }
}
</style>
