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
      <van-tabs
        v-model="active"
        color="#2F97FA"
        line-width="20px"
        title-active-color="#000000"
      >
        <van-tab
          v-for="(value, index) in info"
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
      loading-text
    >
      <div class="exhibition" v-for="(item, index) in list" :key="index">
        <span
              @click="$router.push(`/detail/${item.art_id}?ref=${$route.fullPath}`) "
        >{{ item.title }}</span>
        <div class="exhibitionImg">
          <ul>
            <li v-if="item.cover.images">
              <van-image
                class="img"
                v-for="(item2, index2) in item.cover.images"
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
            <van-col span="4" class="d1">{{ item.aut_name }}</van-col>
            <van-col span="4" class="d2">{{ item.comm_count }}评论</van-col>
            <van-col span="4" class="d3">3小时前</van-col>
            <van-col span="8" class="d4">
              <van-cell @click="opinionClack">
                <van-icon class="incosz" name="cross" color="#777777" />
              </van-cell>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-list>
    <van-popup v-model="showopinion" round
      ><div class="opinionBox">
        <ul class="tickling">
          <li>不敢兴趣</li>
          <li>反馈垃圾内容</li>
          <li>拉黑作者</li>
        </ul>
      </div></van-popup
    >
    <van-popup v-model="show" position="bottom" :style="{ height: '75%' }">
      <div class="windows">
        <div class="topWindows">
          <div class="myChannel">我的频道</div>
          <div class="compile" v-if="compile" @click="add">编辑</div>
          <div class="compile" v-else @click="add">完成</div>
        </div>
        <div v-if="compile">
          <van-tag
            v-for="(value, index) in reserve"
            :key="index"
            color="#F4F5F6"
            size="large"
            type="primary"
            class="showRecommend"
            >{{ value.name }}</van-tag
          >
        </div>
        <div v-if="!compile">
          <van-tag
            v-for="(value, index) in reserve"
            :key="index"
            color="#F4F5F6"
            size="large"
            type="primary"
            class="showRecommend"
            @click="addChannel(value.id)"
            ><span>－ </span>{{ value.name }}</van-tag
          >
        </div>
      </div>
      <div class="windows">
        <div class="topWindows">
          <div class="myChannel">频道推荐</div>
        </div>
        <div v-if="compile">
          <van-tag
            v-for="(value, index) in appChannel"
            :key="index"
            color="#F4F5F6"
            size="large"
            type="primary"
            class="showRecommend"
            >{{ value.name }}</van-tag
          >
        </div>
        <div v-if="!compile">
          <van-tag
            v-for="(value, index) in appChannel"
            :key="index"
            color="#F4F5F6"
            size="large"
            type="primary"
            class="showRecommend"
            @click="appRecommend(value.id)"
            >+ {{ value.name }}</van-tag
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { userChannels, appChannels, allChannels } from '@/api/user' // 导入获取用户频道列表
import { appArticles } from '@/api/news' // 导入频道新闻推荐_v1.1
import { deepClone } from '@/utils/tool'
// import loginVue from '../../login/login.vue'
export default {
  data () {
    return {
      showopinion: false,
      opinionshow: false,
      show: false,
      value: '', // 输入框
      active: '1',
      info: [], // 储存当前用户列表
      list: [], // 储存新闻列表
      loading: false,
      finished: false,
      pagrTop: true,
      compile: true,
      reserve: [], // 克隆的数组
      appChannel: [], // 推荐频道
      myReserve: [] // 储存当前用户频道参数
    }
  },
  async created () {
    // 获取全部用户频道
    const res = await userChannels()
    this.info = res.data.channels
    // 调用深克隆方法
    // deepClone为深克隆函数
    this.reserve = deepClone(this.info)
    console.log(this.reserve)
  },

  // 事件
  methods: {
    opinionClack () {
      this.showopinion = true
    },
    // 编辑和完成切换按钮
    async add () {
      this.compile = !this.compile
      this.reserve.forEach((value, index) => {
        // 设置空对象来储存参数
        const reserveId = {}
        if (value.id !== 0) {
          reserveId.id = value.id
          reserveId.seq = index + 1
          // 传入的参数
          this.myReserve.push(reserveId)
        }
      })
      await allChannels({ channels: this.myReserve })
    },
    // 弹窗点击事件
    async showPopup () {
      this.show = true
      // 点击弹出框时调用推荐频道
      const res = await appChannels()
      console.log(res)
      this.appChannel = res.data.channels
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    // 点击弹窗获取的我的列表可传入传出
    addChannel (id) {
      this.reserve.forEach((value, index) => {
        if (value.id === id) {
          this.appChannel.push(this.reserve[index])
          this.reserve.splice(index, 1)
        }
      })
    },
    // 点击弹窗获取的推荐列表可传入传出
    appRecommend (id) {
      this.appChannel.forEach((value, index) => {
        if (value.id === id) {
          this.reserve.push(this.appChannel[index])
          this.appChannel.splice(index, 1)
        }
      })
    },
    // 用户频道点击高亮
    tabCheck (name, title) {
      // 传入当前点击的频道名和name的绑定
      this.active = name
    },
    async onLoad () {
      const res = await appArticles({
        channelId: this.active,
        withTop: 0
      })
      // console.log(res);
      this.list = res.data.results
      this.loading = false
      if (res.data.results.length <= 1) {
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
  .opinionBox {
    width: 300px;
    height: 200px;
    .tickling li {
      width: 100%;
      height: 50px;
      text-align: center;
      font-size: 16px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      line-height: 18px;
      letter-spacing: 2px;
      line-height: 50px;
      padding-left: 40px;
      margin-bottom: 12px;
    }
  }
  .recommend {
    font-size: 16px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    line-height: 18px;
    letter-spacing: 2px;
  }
  .showRecommend {
    display: inline-block;
    width: 80px;
    height: 43px;
    text-align: center;
    line-height: 43px;
    font-size: 14px;
    color: #000000;
    margin: 6px;
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
        background-color: #f8f9fa;
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
  .topWindows {
    display: flex;
    justify-content: space-between;
    height: 35px;
    text-align: center;
    line-height: 35px;
    padding: 15px;
    margin-bottom: 30px;
    .myChannel {
      display: block;
      font-size: 16px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 400;
      text-align: left;
      color: #2f97fa;
      letter-spacing: 2px;
    }
    .compile {
      width: 65px;
      height: 35px;
      border: 1px solid red;
      text-align: center;
      color: red;
      border-radius: 20px;
      font-size: 16px;
      line-height: 35px;
    }
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
