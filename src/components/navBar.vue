<template>
  <div class="navBar">
    <van-nav-bar>
      <template #left>
        <van-icon
          name="arrow-left"
          class="left-icon"
          @click="$router.push(to)"
        />
      </template>
      <template #title>
        <span class="title">{{ title }}</span>
      </template>
      <template #right> </template>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  name: 'navBar',
  props: {
    to: {
      // 跳转路由
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.navBar {
  width: 100%;
  .van-nav-bar {
    background: #3296fa;
    padding: 0 15px;
    /deep/ .van-nav-bar__left,
    /deep/ .van-nav-bar__right {
      padding: 0;
    }

    .title,
    .left-icon {
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
