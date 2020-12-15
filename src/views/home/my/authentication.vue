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
        <img src="@/assets/images/girl.png" />
      </div>
      <a class="btn" href="javascript:void(0);">返回上一步</a>
    </div>
    <div class="user pface" v-else-if="active === 1">
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
    <van-button block>下一步</van-button>
  </div>
</template>
<script>
export default {
  name: 'authorize',
  data () {
    return {
      active: 2 // 0实名认证 1脸部识别 2 认证完成
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
        width: 100%;
        height: 100%;
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
        margin-bottom: 14px;
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
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
  }
}
</style>
