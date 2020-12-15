<template>
  <div>
    <!-- 设置路由出口 -->
    <router-view></router-view>
    <van-tabbar v-model="active" placeholder>
      <van-tabbar-item icon="home-o" replace to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/search">搜索</van-tabbar-item>
      <van-tabbar-item icon="video-o" replace to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" replace to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style></style>
