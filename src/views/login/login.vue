<template>
  <div class="login">
    <!-- 通用头部组件 -->
    <navBar title="登录" :left-arrow="false"></navBar>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {}
  },
  components: {
    navBar: () => import('@/components/navBar.vue')
  }
}
</script>

<style></style>
