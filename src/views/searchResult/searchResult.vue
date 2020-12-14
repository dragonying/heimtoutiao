<template>
  <div class="search-result">
    <navBar></navBar>
    我是搜索结果页面
  </div>
</template>

<script>
export default {
  name: 'search-result',
  components: {
    navBar: () => import('@/components/navBar')
  },
  data () {
    return {}
  }
}
</script>

<style></style>
