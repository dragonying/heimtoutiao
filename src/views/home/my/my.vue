<template>
  <div class="my-page">
    <section v-if="isLogin" class="top">
      <div class="user">
        <van-image
          :src="userInfo.photo"
          class="u-left"
          @click="$router.push('/user/center')"
        />
        <div class="u-middle">
          <div class="name">{{ userInfo.name }}</div>
          <van-button
            class="applyAudit"
            @click="$router.push('/user/authentication')"
            >申请认证</van-button
          >
        </div>
        <div class="u-right">
          <van-icon name="fire-o" />
          <div class="today-read">
            <p>今日阅读</p>
            <p>{{ Math.abs(userInfo.like_count) }}分钟</p>
          </div>
        </div>
      </div>
      <ul class="count">
        <li class="item" @click="$router.push('/user/userInfo')">
          <h4>{{ userInfo.art_count }}</h4>
          <p>动态</p>
        </li>
        <li class="item" @click="$router.push('/user/fans?active=0')">
          <h4>{{ userInfo.follow_count }}</h4>
          <p>关注</p>
        </li>
        <li class="item" @click="$router.push('/user/fans?active=1')">
          <h4>{{ userInfo.fans_count }}</h4>
          <p>粉丝</p>
        </li>
      </ul>
    </section>
    <section v-else class="top">
      <van-icon class="mobile" name="user-o" />
    </section>
    <section class="tool">
      <ul class="tool-item">
        <li class="item">
          <van-icon class="star" name="star-o" />
          <p>收&nbsp;藏</p>
        </li>
        <li class="item">
          <van-icon class="like" name="clock-o" />
          <p>历&nbsp;史</p>
        </li>
        <li class="item" v-if="isLogin">
          <van-icon class="flower" name="flower-o" />
          <p>作&nbsp;品</p>
        </li>
      </ul>
    </section>
    <van-cell-group class="itemBar">
      <van-cell title="消息通知" center is-link to="" />
      <van-cell title="实名认证" center is-link to="/user/authentication" />
    </van-cell-group>
    <van-cell-group class="itemBar">
      <van-cell title="用户反馈" center is-link to="/user/feedback" />
      <van-cell title="小智同学" center is-link to="/user/robot" />
      <van-cell title="系统设置" center is-link to="/user/setting" />
    </van-cell-group>
  </div>
</template>

<script>
// import { userSelfInfo } from '@/api/user'
import { mapState } from 'vuex'

export default {
  name: 'my-page',
  data () {
    return {}
  },
  methods: {
    // async userInfo () {}
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      isLogin: state => state.isLogin
    })
  },
  created () {
    if (!this.isLogin) {
      this.$store.dispatch('refreshUserInfo')
    }
  }
}
</script>
<style lang="less" scoped>
.my-page {
  min-height: 100%;
  background: #f5f7f9;
  & > * {
    background-color: #fff;
    border-bottom: 4px solid #f5f7f9;
  }
  .top {
    padding: 16px 0;
    height: 155px;
    background: url(~@/assets/images/banner.png) no-repeat center;
    background-size: cover;
    color: #ffffff;
    position: relative;
    .mobile {
      width: 61px;
      height: 61px;
      line-height: 61px;
      border-radius: 50%;
      background-color: #fff;
      font-size: 34px;
      text-align: center;
      color: #208aff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .u-left {
      width: 66px;
      height: 66px;
      border-radius: 50%;
      border: 1px solid #fff;
      margin-left: 20px;
      overflow: hidden;
    }
    .u-middle {
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 1px;
      flex: 1;
      margin-left: 14px;
    }
    .applyAudit {
      width: 58px;
      height: 16px;
      line-height: 16px;
      background: #ffffff;
      border-radius: 8px;
      font-size: 10px;
      font-weight: 700;
      color: #3296fa;
      letter-spacing: 1px;
    }
    .u-right {
      width: 94px;
      height: 40px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 20px 0 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .van-icon {
        font-size: 17px;
        font-weight: 700;
      }
      .today-read {
        font-size: 12px;
        font-weight: 400;
        margin-left: 8px;
      }
    }

    .count {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 27px;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      letter-spacing: 1px;
    }
  }

  .tool-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    padding: 14px 0;
    .van-icon {
      font-size: 22px;
      &.star {
        color: #eb5253;
      }
      &.like {
        color: #ff9d1d;
      }
      &.flower {
        color: #678eff;
      }
    }
    p {
      font-size: 12px;
      font-weight: 400;
      color: #333333;
      text-align: center;
    }
  }
  .itemBar {
    .van-cell {
      padding: 18px 15px 18px 25px;
      font-size: 15px;
      font-weight: 400;
      color: #333333;
    }
  }
}
</style>
