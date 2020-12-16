<template>
  <div class="indexPage">
    <div class="top">
      <van-search
        shape="round"
        class="headSeek"
        v-model="value"
        placeholder="搜索"
        input-align="center"
      />
    </div>
    <div class="labelBox">
      <van-tabs v-model="active" color="#2F97FA" line-width="20px" title-active-color="#000000">
        <van-tab
          v-for="(value,index) in info"
          :key="index"
          :title="value.name"
          :name="value.id"
          @click="tabCheck"
        ></van-tab>
      </van-tabs>
      <img src="@/assets/01.png" @click="showPopup" class="showPopup" />
    </div>
    <van-list
      v-if="pagrTop"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了ღ( ´･ᴗ･` )ღ"
      @load="onLoad"
    >
      <div class="exhibition" v-for="(item,index) in list" :key="index">
        <span>{{item.title}}</span>
        <div class="exhibitionImg">
          <ul>
            <li v-if="item.cover.images">
              <van-image
                class="img"
                v-for="(item2,index2) in item.cover.images"
                :key="index2"
                :src="item2"
              >
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </li>
          </ul>
        </div>
        <div class="details">
          <van-row>
            <van-col span="4" class="stick">置顶</van-col>
            <van-col span="4" class="d1">{{item.aut_name}}</van-col>
            <van-col span="4" class="d2">{{item.comm_count}}评论</van-col>
            <van-col span="4" class="d3">3小时前</van-col>
            <van-col span="8" class="d4">
              <van-icon name="cross" color="#777777" />
            </van-col>
          </van-row>
        </div>
      </div>
    </van-list>
    <van-popup v-model="show" position="bottom" :style="{height:'60%'}">
      <div class="windows">
        <div class="topWindows">
          <div class="myChannel">我的频道</div>
          <div class="compile">编辑</div>
        </div>
        <van-tag
          v-if="showRecommend"
          color="#F4F5F6"
          size="large"
          type="primary"
          @close="close"
          class="showRecommend"
        >推荐</van-tag>
        <van-tag
          v-if="showRecommend"
          color="#F4F5F6"
          size="large"
          type="primary"
          @close="close"
          class="showRecommend"
        >推荐</van-tag>
        <van-tag
          v-if="showRecommend"
          color="#F4F5F6"
          size="large"
          type="primary"
          @close="close"
          class="showRecommend"
        >推荐</van-tag>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { appChannels } from '@/api/user' // 导入获取用户频道列表
import { appArticles } from '@/api/news' // 导入频道新闻推荐_v1.1
// import loginVue from '../../login/login.vue'
export default {
  data () {
    return {
      show: false,
      value: '', // 输入框
      showRecommend: true, // 推荐栏标签
      active: '0',
      info: [], // 储存当前全部用列表
      list: [],
      loading: false,
      finished: false,
      pagrTop: true
    }
  },
  async created () {
    // 获取全部用户频道
    const res = await appChannels()
    this.info = res.data.channels
    // console.log(this.info);
  },
  // 事件
  methods: {
    // 用户频道点击高亮
    tabCheck (name, title) {
      // 传入当前点击的频道名和name的绑定
      this.active = name
    },
    // 弹窗点击事件
    showPopup () {
      this.show = true
    },
    // 弹窗浏览列表清除事件
    close () {
      this.showRecommend = false
    },
    async onLoad () {
      this.loading = false,
      this.finished = false,
      this.list = []
      const res = await appArticles({
        channel_id: this.active,
        with_top: 0
      })
      console.log(res)
      this.list = res.data.results
      this.loading = false
      if (this.list.length >= 10) {
        this.finished = true
      }
      this.pagrTop = false
      this.$nextTick(() => {
        this.pagrTop = true
      })
    }
  },
  watch: {
    active: function () {
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.indexPage {
  .showRecommend {
    display: inline-block;
    width: 80px;
    height: 43px;
    text-align: center;
    line-height: 43px;
    font-size: 14px;
    color: #000000;
    border-radius: 25px;
    margin: 15px;
  }
  .top {
    width: 100%;
    height: 44px;
    background-color: #2f97fa;
    /deep/ .headSeek {
      display: block;
      margin: 0 auto;
      padding-top: 5px;
      width: 275px;
      height: 34px;
      background-color: #2f97fa;
      text-align: center;
      line-height: 34px;
      padding: 0 auto;
      .van-search__content {
        background-color: #a4c8eb;
      }
    }
  }
  .labelBox {
    position: relative;
    .showPopup {
      position: absolute;
      line-height: 20px;
      width: 30px;
      height: 20px;
      right: 0;
      top: 13px;
    }
  }
  .label {
    display: flex;
    justify-content: space-around;
    li {
      font-size: 14px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 400;
      text-align: left;
      color: #777777;
      height: 40px;
      line-height: 40px;
      text-align: center;
      width: 100px;
      height: 40px;
      border-bottom: 0.5px solid #777777;
      border-right: 0.5px solid #777777;
    }
  }
  .exhibition {
    span {
      padding: 0 15px;
      font-size: 16px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 400;
      text-align: left;
      color: #3a3a3a;
      letter-spacing: 2px;
    }
    .exhibitionImg {
      display: flex;
      justify-content: space-around;
      li {
        display: inline-block;
      }
      .img {
        height: 80px;
        width: 123px;
        padding: 8px;
      }
    }
  }
  .details {
    font-size: 12px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    text-align: left;
    letter-spacing: 1px;
    color: #cecece;
    padding: 0 15px;
    .stick {
      color: rgb(243, 110, 110);
    }
    /deep/ .d4 {
      text-align: right;
      font-size: 16px;
    }
  }
  .compile,
  .myChannel {
    font-size: 16px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 18px;
    letter-spacing: 2px;
    padding: 15px 15px;
  }
  .compile {
    float: right;
    color: red;
    border-radius: 50px;
  }
  .recommend {
    width: 100%;
    display: flex;
    justify-content: space-around;
    li {
      width: 80px;
      height: 43px;
      line-height: 43px;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 400;
      color: #222222;
      letter-spacing: 1px;
      border: 1px solid #000;
    }
  }
}
</style>
