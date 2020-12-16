<template>
  <div class="setting">
    <navBar title="账号和隐私设置" to="/home/my"></navBar>
    <van-cell-group class="itemBar">
      <van-cell title="手机号" center is-link to="" />
      <van-cell title="修改密码" center is-link to="" />
    </van-cell-group>
    <p class="tip">开启后，可以让你的好友找到你</p>
    <van-cell-group class="itemBar">
      <van-cell title="允许将我推荐给好友" center to="">
        <van-switch v-model="checked" />
      </van-cell>
    </van-cell-group>
    <p class="tip">开启后，可以想你推荐好友</p>
    <van-cell-group class="itemBar">
      <van-cell title="允许给我推荐可能认识的人" center to="">
        <van-switch v-model="checked" />
      </van-cell>
    </van-cell-group>
    <p class="tip">开启后，分享到微信QQ等平台的页面会展示你的头像</p>
    <van-cell-group class="itemBar">
      <van-cell title="分享页显示我的头像" center to="">
        <van-switch v-model="checked" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'setting',
  data () {
    return {
      checked: true
    }
  }
}
</script>

<style lang="less" scoped>
.setting {
  min-height: 100%;
  background-color: #f5f7f9;
  .itemBar {
    background-color: #fff;
    .van-cell {
      padding: 16px 15px;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
    }
    .van-switch {
      font-size: 17px;
    }
  }
  .tip {
    padding: 11px 15px;
    font-size: 12px;
    color: #999999;
  }
}
</style>
