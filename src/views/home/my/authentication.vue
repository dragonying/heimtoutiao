<template>
  <div class="authorize">
    <navBar title="实名认证" to="/home/my"></navBar>
    <div v-if="active < 2">
      <van-steps
        :active="active"
        active-color="#3296FA"
        inactive-color="#C9C9C9"
      >
        <van-step>实名认证</van-step>
        <van-step>脸部识别</van-step>
        <van-step>认证完成</van-step>
      </van-steps>
    </div>
    <div v-else>
      <van-cell-group>
        <van-cell title="真实姓名" center to="" />
        <van-cell title="合法的用户名" center to="" />
        <van-cell title="所在行业" center to="" />
      </van-cell-group>
    </div>
    <div class="user" v-if="active === 0">
      <div class="auth">
        <uploadAvatar @input="stepOne">
          <img slot="title" :src="imgArr.stepOneImg" />
        </uploadAvatar>
      </div>
      <a class="btn" href="javascript:void(0);">返回上一步</a>
    </div>
    <div class="user pface" v-else-if="active === 1">
      <div class="face">
        <h4 class="title">上传身份证明（仅用于黑马头条认证）</h4>
        <div class="idcard">
          <div class="img">
            <div class="img-box">
              <img :src="imgArr.stetTwoFaceImg" />
            </div>
            <uploadAvatar @input="stetTwoFace">
              <p slot="title">上传身份证正面</p>
            </uploadAvatar>
          </div>
          <div class="img">
            <div class="img-box">
              <img :src="imgArr.stetTwoBackImg" />
            </div>
            <uploadAvatar @input="stetTwoBack">
              <p slot="title">上传身份证反面</p>
            </uploadAvatar>
          </div>
        </div>
        <div class="hold">
          <div v-if="showCamera">
            <video
              v-show="showVideo"
              ref="video"
              autoplay
              @click="photograph"
            ></video>
            <canvas v-show="!showVideo" ref="canvas"></canvas>
          </div>
          <img v-else src="@/assets/images/holdCard.png" />
        </div>
      </div>
      <a class="btn" href="javascript:void(0);" @click="callCamera"
        >上传手持身份证照片</a
      >
    </div>
    <div class="user pface" v-else-if="active === 2">
      <div class="face">
        <h4 class="title">上传身份证明（仅用于黑马头条认证）</h4>
        <div class="idcard">
          <div class="img">
            <div class="img-box">
              <img src="@/assets/images/idCardface.png" />
            </div>
            <p>上传身份证正面</p>
          </div>
          <div class="img">
            <div class="img-box">
              <img src="@/assets/images/idCardback.png" />
            </div>
            <p>上传身份证反面</p>
          </div>
        </div>
        <div class="hold">
          <img src="@/assets/images/holdCard.png" />
        </div>
      </div>
      <a class="btn" href="javascript:void(0);">上传手持身份证照片</a>
    </div>
    <van-button block @click="active++">下一步</van-button>
  </div>
</template>
<script>
export default {
  name: 'authorize',
  data () {
    return {
      showCamera: false,
      showVideo: true,
      active: 0, // 0实名认证 1脸部识别 2 认证完成,
      imgArr: {
        stepOneImg: require('@/assets/images/girl.png'),
        stetTwoFaceImg: require('@/assets/images/idCardface.png'),
        stetTwoBackImg: require('@/assets/images/idCardback.png')
      }
    }
  },
  components: {
    uploadAvatar: () => import('@/components/uploadAvatar')
  },
  methods: {
    // 第一步
    stepOne (v) {
      this.imgArr.stepOneImg = v
    },
    // 第二步正面
    stetTwoFace (v) {
      this.imgArr.stetTwoFaceImg = v
    },
    // 第二步 反面
    stetTwoBack (v) {
      this.imgArr.stetTwoBackImg = v
    },
    // 调用摄像头
    callCamera () {
      this.showCamera = true
      this.showVideo = true
      // H5调用电脑摄像头API
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then(success => {
          // 摄像头开启成功
          this.$refs.video.srcObject = success
          // 实时拍照效果
          this.$refs.video.play()
        })
        .catch(error => {
          console.error('摄像头开启失败，请检查摄像头是否可用！', error)
        })
    },
    // 拍照
    photograph () {
      this.showVideo = false
      const ctx = this.$refs.canvas.getContext('2d')
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(
        this.$refs.video,
        0,
        0,
        this.$refs.video.offsetWidth,
        this.$refs.video.offsetHeight * 0.5
      )
      // 转base64格式、图片格式转换、图片质量压缩
      const imgBase64 = this.$refs.canvas.toDataURL('image/jpeg', 0.7) // 由字节转换为KB 判断大小
      console.log(imgBase64)
      this.closeCamera()
    },
    // 关闭摄像头
    closeCamera () {
      if (!this.$refs.video.srcObject) return
      const stream = this.$refs.video.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
      this.$refs.video.srcObject = null
    }
  }
}
</script>
<style lang="less" scoped>
.authorize {
  min-height: 100%;
  background: #f5f7f9;
  .van-steps {
    padding: 24px 22px;
    font-size: 14px;
    font-weight: 400;
    color: #2a8ee3;
    margin-bottom: 5px;
  }
  .van-cell-group {
    margin-bottom: 5px;
    .van-cell {
      padding: 14px 22px;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
    }
  }

  .user {
    width: 100%;
    padding-top: 43px;
    padding-bottom: 35px;
    &.pface {
      padding: 16px 22px;
    }
    background-color: #fff;
    text-align: center;
    .auth {
      width: 286px;
      height: 307px;
      margin: 0 auto;
      background-color: black;
      img {
        width: 286px;
        height: 307px;
        vertical-align: bottom;
      }
      margin-bottom: 43px;
    }
  }
  .btn {
    font-size: 14px;
    color: #3296fa;
  }
  .van-button {
    width: 347px;
    height: 44px;
    background: #3296fa;
    border-radius: 5px;
    margin: 13px auto;
    font-size: 15px;
    color: #ffffff;
  }

  .face {
    .title {
      font-size: 12px;
      font-weight: 400;
      text-align: left;
      color: #666666;
    }
    .idcard {
      display: flex;
      justify-content: space-between;
      text-align: center;
      margin-top: 18px;
      margin-bottom: 14px;
      .img-box {
        width: 150px;
        height: 113px;
        background: #ffffff;
        border: 1px dashed #cccccc;
        padding: 15px 10px;
        margin-bottom: 7px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      p {
        font-size: 13px;
        color: #3296fa;
      }
    }
    .hold {
      width: 330px;
      height: 315px;
      background: #ffffff;
      border: 1px dashed #cccccc;
      padding: 15px 10px;
      margin-bottom: 20px;
      & > * {
        width: 100%;
        height: 100%;
      }
      img,
      canvas,
      video {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
  }
}
</style>
