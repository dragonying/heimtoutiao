<template>
  <van-cell class="cell-item" is-link center>
    <template #title>
      <span class="title">{{ title }}</span>
    </template>
    <template #default>
      <img v-if="type === 'img' && name" class="img" :src="baseUrl + name" />
      <img
        class="img"
        v-else-if="type === 'img'"
        src="@/assets/images/girl.png"
      />
      <span v-else class="name">{{ name }}</span>
    </template>
  </van-cell>
</template>
<script>
export default {
  name: 'cell',
  props: ['title', 'name', 'type'],
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL
    }
  }
}
</script>
<style lang="less" scoped>
.cell-item {
  width: 100%;
  padding: 15px;
  .title {
    font-size: 14px;
    font-weight: 400;
    color: #181a39;
  }
  .name {
    font-size: 14px;
    color: #999999;
  }
  .img {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .van-cell__value {
    margin-right: 8px;
  }
}
</style>
