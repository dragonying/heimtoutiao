<template>
  <div class="navBar">
    <van-sticky>
      <van-nav-bar
        @click-left="$router.push(to)"
        @click-right="$emit('onSave')"
      >
        <template #left v-if="leftIconShow">
          <van-icon name="arrow-left" class="left-icon" />
        </template>
        <template #title>
          <span class="title">{{ title }}</span>
        </template>
        <template #right>
          <span class="right-title" v-html="right">{{ right }}</span>
        </template>
      </van-nav-bar>
    </van-sticky>
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
      // 标题
      type: String,
      default: ''
    },
    // 右边文案
    right: {
      type: String
    },
    // 是否显示左箭头
    leftIconShow: {
      type: Boolean,
      default: true
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
    .right-title {
      font-size: 14px;
      font-weight: 400;
      text-align: right;
      color: #181a39;
    }
  }
}
</style>
