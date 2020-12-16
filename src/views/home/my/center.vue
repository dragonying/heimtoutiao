<template>
  <div class="user-center">
    <navBar title="个人信息" to="/home/my"></navBar>
    <div v-if="userInfo">
      <van-cell-group>
        <cell
          title="头像"
          :name="userInfo.photo"
          type="img"
          @click.native="showUploadTip = true"
        ></cell>
        <cell
          title="昵称"
          :name="userInfo.name"
          @click.native="nicknameShow = true"
        ></cell>
        <cell title="介绍" :name="userInfo.intro"></cell>
      </van-cell-group>
      <van-cell-group>
        <cell
          title="性别"
          :name="genderColumns[userInfo.gender]"
          @click.native="genderShow = true"
        ></cell>
        <cell
          title="生日"
          :name="userInfo.birthday"
          @click.native="showBrithday = true"
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
    </div>
    <van-dialog v-model="showUploadTip" :showConfirmButton="false">
      <van-cell-group class="upload-dialog">
        <van-cell center>
          <uploadAvatar @input="loadImg"
            ><span slot="title">从相册中选择</span></uploadAvatar
          >
        </van-cell>
        <van-cell title="拍照" center />
        <van-cell title="取消" center @click="showUploadTip = false" />
      </van-cell-group>
    </van-dialog>
    <van-dialog v-model="preveiwImg" :showConfirmButton="false">
      <van-image :src="tempUserInfo.photo" @click="confirmSave" />
    </van-dialog>

    <van-popup
      v-model="nicknameShow"
      position="bottom"
      @close="nicknameInputClose"
    >
      <van-cell-group>
        <van-field
          v-model.trim="tempUserInfo.name"
          required
          label="用户名"
          placeholder="请输入昵称"
        />
      </van-cell-group>
    </van-popup>

    <van-popup v-model="showBrithday" position="bottom">
      <van-datetime-picker
        v-model="tempUserInfo.birthday"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="birthdayConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import areaData from '@/assets/area'
import { mapState } from 'vuex'
import { photo, profile } from '@/api/user'
import { deepClone } from '@/utils/tool'
export default {
  name: 'user-center',
  components: {
    uploadAvatar: () => import('@/components/uploadAvatar')
  },
  data () {
    return {
      showBrithday: false,
      showUploadTip: false,
      preveiwImg: false,
      genderShow: false,
      nicknameShow: false,
      areaData,
      genderColumns: {
        0: '未知',
        1: '男',
        2: '女'
      },
      // 生日年份
      minDate: new Date(1977, 0, 1),
      maxDate: new Date(2099, 10, 1),
      tempUserInfo: {} // 用户临时信息
    }
  },
  filters: {},
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    loadImg (v) {
      this.showUploadTip = false
      this.tempUserInfo.photo = v
      this.preveiwImg = true
      console.log(v)
    },
    genderConfirm (v, k) {
      this.editUser({
        gender: k
      })
      this.genderShow = false
    },
    genderCancel (v, k) {
      // console.log(`cancel:${k} ${v}`)
      this.genderShow = false
    },
    confirmSave () {
      this.preveiwImg = false
      this.$dialog
        .confirm({
          message: '是否设置为用户头像'
        })
        .then(async () => {
          await photo(this.tempUserInfo)
          this.$store.dispatch('refreshUserInfo')
        })
        .catch(() => {
          this.tempUserInfo.photo = undefined
        })
    },
    async nicknameInputClose () {
      if (this.tempUserInfo.name) {
        await profile({
          name: this.tempUserInfo.name
        })
        this.$store.dispatch('refreshUserInfo')
      }
    },
    async birthdayConfirm (value) {
      this.tempUserInfo.birthday = this.$options.filters.formatTime(value)
      await profile({
        birthday: this.tempUserInfo.birthday
      })
      this.$store.dispatch('refreshUserInfo')

      this.showBrithday = false
    }
  },
  created () {
    setTimeout(() => {
      this.tempUserInfo = deepClone(this.userInfo) || {}
    }, 2000)
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
  .upload-dialog {
    .van-cell__title {
      text-align: center;
    }
  }
  .van-image {
    height: 100%;
    width: 100%;
    padding: 20px;
    background-color: gray;
  }
}
</style>
