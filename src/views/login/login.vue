<template>
  <div class="login">
    <navBar title="登录" :leftIconShow="false"></navBar>
    <van-form ref="form" class="login-form">
      <van-field
        v-model="form.mobile"
        name="mobile"
        :rules="rules.mobile"
        placeholder="请输入手机号"
      >
        <template #left-icon>
          <van-icon name="user-o" />
        </template>
      </van-field>
      <van-field
        v-model="form.code"
        name="code"
        :rules="rules.code"
        placeholder="请输入验证码"
      >
        <template #left-icon>
          <van-icon name="goods-collect-o" />
        </template>
        <template #button>
          <span class="code" @click="codeClick" v-if="totalTime === 6"
            >获取验证码</span
          >
          <span class="code" v-else>{{ totalTime }} 后重试</span>
        </template>
      </van-field>
    </van-form>
    <van-button type="info" @click="loginClick">登录</van-button>
    <div class="deal">隐私条款</div>
  </div>
</template>

<script>
import { mobileCode, authorizations } from '@/api/user'
import { token } from '@/utils/storage'
export default {
  name: 'login',
  data () {
    return {
      totalTime: 6,
      form: {
        mobile: 13911111199,
        code: 246810
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'onChange' },
          {
            validator: value => {
              return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                value
              )
            },
            message: '请正确输入手机号',
            trigger: 'onChange'
          }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'onChange' }]
      }
    }
  },
  components: {
    navBar: () => import('@/components/navBar.vue')
  },
  methods: {
    codeClick () {
      this.$refs.form
        .validate('mobile')
        .then(() => {
          this.totalTime--
          const s = setInterval(() => {
            this.totalTime--
            if (this.totalTime <= 0) {
              clearInterval(s)
              this.totalTime = 6
            }
          }, 1000)
          mobileCode(this.form.mobile).then(res => {
            console.log(res)
            this.$toast.success('验证码：246810')
          })
        })
        .catch(() => {
          this.$toast.fail('手机号码错误')
        })
    },
    async loginClick () {
      const res = await authorizations(this.form)
      token.set(res.data)
      this.$toast.success('欢迎回来')
      this.$router.push('/home/my')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  min-height: 100%;
  .login-form {
    padding: 0 15px;
    .van-field {
      height: 45px;
      line-height: 45px;
      .code {
        width: 63px;
        height: 23px;
        padding: 6px 10px;
        background-color: #ededed;
        border-radius: 15px;
      }
    }
  }
  .van-button {
    height: 44px;
    width: 92%;
    border-radius: 10px;
    margin: 24px 15px;
    font-size: 15px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
  }
  .deal {
    font-size: 14px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    text-align: center;
    color: #666666;
    margin-top: 75%;
  }
}
</style>
