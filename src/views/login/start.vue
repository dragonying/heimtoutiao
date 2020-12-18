<template>
  <div class="start">
    <img src="@/assets/start.png" />
    <h1 class="title">
      黑马头条
    </h1>
    <p class="intro">有态度的技术分享</p>
  </div>
</template>
<script>
export default {
  name: 'start'
}
</script>
<style lang="less" scoped>
.start {
  min-height: 100%;
  // background: radial-gradient(#408cfc 0%, #3296fa 100%);
  background: #fff;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  text-align: center;
  color: #408cfc;
  img {
    height: 230px;
    width: 230px;
    overflow: hidden;
    margin: 100px auto 50px;
  }
  .title {
    font-size: 25px;
    font-weight: 500;
  }
  .intro {
    font-size: 22px;
    // color: #fefeff;
  }
}
</style>
