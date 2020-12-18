<template>
  <div class="start">
    <van-image :src="require('@/assets/logo.png')" />
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
  background: #000;
  text-align: center;
  .van-image {
    height: 230px;
    width: 230px;
    overflow: hidden;
    margin: 100px auto 50px;
  }
  .title {
    font-size: 25px;
    font-weight: 500;
    color: #fefeff;
  }
  .intro {
    font-size: 22px;
    color: #fefeff;
  }
}
</style>
