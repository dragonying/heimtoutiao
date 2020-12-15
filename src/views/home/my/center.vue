<template>
  <div class="user-center">
    <navBar title="个人信息" to="/home/my"></navBar>
    <van-cell-group>
      <cell title="头像" :name="userInfo.avatar" type="img"></cell>
      <cell title="昵称" name="圈圈789"></cell>
      <cell title="介绍" :name="userInfo.intro"></cell>
    </van-cell-group>
    <van-cell-group>
      <cell
        title="性别"
        :name="genderColumns[userInfo.gender]"
        @click.native="genderShow = true"
      ></cell>
      <cell title="生日" :name="userInfo.intro"></cell>
      <cell
        title="地区"
        :name="areaData.city_list[userInfo.area]"
        @click.native="cityShow = true"
      ></cell>
    </van-cell-group>

    <!--性别选择框-->
    <van-popup v-model="genderShow" position="bottom">
      <van-picker
        title="请选择性别"
        show-toolbar
        :columns="Object.values(genderColumns)"
        @confirm="genderConfirm"
        @cancel="genderCancel"
        :default-index="userInfo.gender"
      ></van-picker>
    </van-popup>
    <!--城市选择框-->
    <van-popup v-model="cityShow" position="bottom">
      <van-area
        title="请选择地区"
        :value="userInfo.area"
        :area-list="areaData"
        :columns-num="2"
        @cancel="cityCancel"
        @confirm="cityConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import areaData from '@/assets/area'

export default {
  name: 'user-center',
  components: {},
  data () {
    return {
      userInfo: {},
      genderShow: false,
      cityShow: false,
      areaData,
      genderColumns: {
        0: '未知',
        1: '男',
        2: '女'
      }
    }
  },
  filters: {},
  computed: {},
  methods: {
    cityCancel () {},
    cityConfirm () {}
  }
}
</script>
<style lang="less">
.user-center {
  height: 100%;
  background-color: #f7f4f5;
  .van-cell-group {
    margin-bottom: 6px;
  }
}
</style>
