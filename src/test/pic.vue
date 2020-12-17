<template>
  <div>
  <h1>测试摄像头</h1>
    <!--开启摄像头-->
    <img @click="callCamera" :src="headImgSrc" alt="摄像头" />
    <!--canvas截取流-->
    <canvas ref="canvas" width="640" height="480"></canvas>
    <!--图片展示-->
    <video ref="video" width="640" height="480" autoplay></video>
    <!--确认-->
    <button @click="photograph">确认</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      headImgSrc: require('@/assets/logo.png')
    }
  },
  methods: {
    // 调用摄像头
    callCamera () {
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
      const ctx = this.$refs.canvas.getContext('2d')
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs.video, 0, 0, 640, 480)
      // 转base64格式、图片格式转换、图片质量压缩
      const imgBase64 = this.$refs.canvas.toDataURL('image/jpeg', 0.7) // 由字节转换为KB 判断大小

      const str = imgBase64.replace('data:image/jpeg;base64,', '')
      const strLength = str.length
      const fileLength = parseInt(strLength - (strLength / 8) * 2) // 图片尺寸  用于判断
      const size = (fileLength / 1024).toFixed(2)
      console.log(size) // 上传拍照信息  调用接口上传图片 .........
      // 保存到本地
      const ADOM = document.createElement('a')
      ADOM.href = this.headImgSrc
      ADOM.download = new Date().getTime() + '.jpeg'
      ADOM.click()
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
