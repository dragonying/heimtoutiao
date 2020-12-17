<template>
  <div class="user-page">
    <navBar :title="user.name" to="/user/fans"></navBar>
    <section class="top">
      <van-image class="top-left" :src="user.photo" />
      <div class="top-right">
        <ul class="count">
          <li class="item">
            <h4>{{ user.like_count || 0 }}</h4>
            <p>发布</p>
          </li>
          <li class="item">
            <h4>{{ user.follow_count || 0 }}</h4>
            <p>动态</p>
          </li>
          <li class="item">
            <h4>{{ user.like_count || 0 }}</h4>
            <p>关注</p>
          </li>
          <li class="item">
            <h4>{{ user.fans_count || 0 }}</h4>
            <p>粉丝</p>
          </li>
        </ul>
        <van-button class="care" block>关注用户</van-button>
      </div>
    </section>
    <ul class="tip">
      <li class="tip-item"><span>认证：</span>微软认证开发者</li>
      <li class="tip-item"><span>简介：</span>微软认证开发者</li>
    </ul>
    <section class="pro">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" :key="index">
          <div class="item">
            <div class="author">
              <van-image class="avatar" :src="item.photo" />
              <div>
                <h5 class="name">{{ item.name }}</h5>
                <div class="time">{{ item.birthday }}</div>
              </div>
            </div>
            <div class="info">
              <h4 class="title van-multi-ellipsis--l2">
                {{ item.intro }}
              </h4>
              <div class="content" @click="preview(item.pic)">
                <van-image
                  class="img"
                  v-for="(k, i) in item.pic"
                  :key="i"
                  :src="k"
                />
              </div>
            </div>
            <van-grid direction="horizontal" :column-num="3">
              <van-grid-item icon="comment-o" text="评论" />
              <van-grid-item icon="good-job-o" text="点赞" />
              <van-grid-item icon="star-o" text="收藏" />
            </van-grid>
          </div>
        </div>
      </van-list>
    </section>
  </div>
</template>
<script>
import { randomUser } from '@/api/test'
import { ImagePreview } from 'vant'

export default {
  name: 'user-page',
  data () {
    return {
      loading: false,
      finished: false,
      query: {
        page: 0,
        per_page: 10
      },
      list: []
    }
  },
  computed: {
    user () {
      return this.list[0] || {}
    }
  },
  methods: {
    async onLoad () {
      this.query.page++
      // const res = await userFollowings(this.careQuery)
      const res = await randomUser(this.careQuery)
      this.list.push(...res.data.results)
      //   // 加载状态结束
      this.loading = false
      this.finished =
        !res.data.results.length || this.list.length >= res.data.total_count
    },
    preview (imgarr) {
      ImagePreview(imgarr)
    }
  }
}
</script>
<style lang="less" scoped>
.user-page {
  min-height: 100%;
  background-color: #f7f7f7;
  & > * {
    background-color: #fff;
    margin-bottom: 5px;
  }
  .top {
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top-left {
      width: 66px;
      height: 66px;
      border-radius: 50%;
      border: 1px solid #fff;
      margin-right: 20px;
      overflow: hidden;
    }
    .top-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .count {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      font-weight: 400;
      font-size: 14px;
      color: #000;
      p {
        font-size: 12px;
        color: #757476;
      }
    }
    .care {
      width: 120px;
      height: 27px;
      background: #6bb5ff;
      border-radius: 5px;
      font-size: 14px;
      color: #ffffff;
      margin: 5px auto;
    }
  }
  .tip li {
    line-height: 30px;
    height: 30px;
    padding: 0 15px;
    font-size: 14px;
    span {
      color: #757476;
    }
  }
  .pro .item {
    padding: 13px 15px;
    .author {
      display: flex;
      align-items: center;
      .avatar {
        width: 37px;
        height: 37px;
        border-radius: 50%;
        margin-right: 7px;
        overflow: hidden;
      }
      .name {
        font-size: 14px;
        font-weight: bold;
        color: #222222;
      }
      .time {
        margin-top: 2px;
        font-size: 12px;
        color: #999999;
      }
    }
    .info {
      .title {
        font-size: 15px;
        font-weight: 400;
        text-align: left;
        color: #3a3a3a;
        margin-top: 18px;
      }
      .content {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 10px 0;
        .img {
          width: 110px;
          height: 75px;
        }
      }
    }
  }
}
</style>
