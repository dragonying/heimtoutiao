<template>
  <div class="user-center">
    <navBar title="个人信息" to="/home/my" right="保存" @onSave="save"></navBar>
    <div v-if="tempUserInfo">
      <van-cell-group>
        <cell
          title="头像"
          :name="tempUserInfo.photo"
          type="img"
          @click.native="showUploadTip = true"
        ></cell>
        <cell
          title="昵称"
          :name="tempUserInfo.name"
          @click.native="nicknameShow = true"
        ></cell>
        <cell title="介绍" :name="tempUserInfo.intro"></cell>
      </van-cell-group>
      <van-cell-group>
        <cell
          title="性别"
          :name="genderColumns[tempUserInfo.gender]"
          @click.native="genderShow = true"
        ></cell>
        <cell
          title="生日"
          :name="tempUserInfo.birthday"
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
          :default-index="tempUserInfo.gender"
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
      <van-image class="avatar" :src="avatar" @click="confirmSave" />
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
        v-model="birthday"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="birthdayConfirm"
        :formatter="formatter"
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
        0: '男',
        1: '女'
      },
      // 生日年份
      minDate: new Date(1977, 0, 1),
      maxDate: new Date(2099, 10, 1),
      birthday: new Date(),
      avatar: null,
      tempUserInfo: {} // 用户临时信息
    }
  },
  filters: {},
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 格式化选项
    formatter (type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      } else {
        return `${val}日`
      }
    },
    loadImg (v) {
      this.showUploadTip = false
      this.avatar = v
      this.preveiwImg = true
    },
    async genderConfirm (v, k) {
      this.tempUserInfo.gender = k
      this.genderShow = false
    },
    genderCancel (v, k) {
      this.genderShow = false
    },
    confirmSave () {
      this.preveiwImg = false
      this.$dialog
        .confirm({
          message: '是否设置为用户头像'
        })
        .then(async () => {
          this.tempUserInfo.photo = this.avatar
        })
        .catch(() => {
          this.avatar = null
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
    // 生日
    async birthdayConfirm (value) {
      this.tempUserInfo.birthday = this.$options.filters.formatTime(value)
      this.showBrithday = false
    },
    // 保存
    async save () {
      if (this.avatar) {
        await photo(this.avatar)
      }
      await profile({
        name: this.tempUserInfo.name,
        gender: this.tempUserInfo.gender,
        birthday: this.tempUserInfo.birthday,
        intro: this.tempUserInfo.intro
      })
      this.$store.dispatch('refreshUserInfo')
    }
  },
  created () {
    setTimeout(() => {
      this.tempUserInfo = deepClone(this.userInfo) || {}
      this.birthday = this.tempUserInfo.birthday
      this.avatar = this.tempUserInfo.photo
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
  .avatar {
    height: 100%;
    width: 100%;
    padding: 20px;
  }
}
</style>
