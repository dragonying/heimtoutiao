<template>
  <div class="home">
    <!-- 设置路由出口 -->
    <router-view></router-view>
    <van-tabbar v-model="active" placeholder  route>
      <van-tabbar-item name="index" icon="home-o" replace to="/home/index"
        >首页</van-tabbar-item
      >
      <van-tabbar-item name="search" icon="search" replace to="/home/search"
        >搜索</van-tabbar-item
      >
      <van-tabbar-item name="video" icon="video-o" replace to="/home/video"
        >视频</van-tabbar-item
      >
      <van-tabbar-item name="my" icon="user-o" replace to="/home/my"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      active:"my"
    }
  }
}
</script>

<style lang="less">
.home {
  height: 100%;
}
</style>
