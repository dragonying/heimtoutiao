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
        <van-tab title="推荐">内容 1</van-tab>
        <van-tab title="后端">内容 2</van-tab>
        <van-tab title="Linux">内容 3</van-tab>
        <van-tab title="人工智能">内容 4</van-tab>
        <van-tab title="推荐">内容 5</van-tab>
        <van-tab title="后端">内容 6</van-tab>
        <van-tab title="Linux">内容 7</van-tab>
        <van-tab title="人工智能">内容 8</van-tab>
      </van-tabs>
      <img src="@/assets/01.png" @click="showPopup" class="showPopup" />
    </div>
    <div class="exhibition">
      <span>用Supervisor实现进程守护，在异常退</span>
      <div class="exhibitionImg">
        <ul>
          <li>
            <img src="@/assets/logo.png" alt />
          </li>
          <li>
            <img src="@/assets/logo.png" alt />
          </li>
          <li>
            <img src="@/assets/logo.png" alt />
          </li>
        </ul>
      </div>
      <div class="details">
        <van-row>
          <van-col span="4" class="d1">文章作者</van-col>
          <van-col span="4" class="d2">87评论</van-col>
          <van-col span="4" class="d3">3小时前</van-col>
          <van-col span="12" class="d4">
            <van-icon name="cross" color="#777777" />
          </van-col>
        </van-row>
      </div>
    </div>
        <div class="exhibition">
      <span>用Supervisor实现进程守护，在异常退</span>
      <div class="exhibitionImg">
        <ul>
          <li>
            <img src="@/assets/logo.png" alt />
          </li>
          <li>
            <img src="@/assets/logo.png" alt />
          </li>
          <li>
            <img src="@/assets/logo.png" alt />
          </li>
        </ul>
      </div>
      <div class="details">
        <van-row>
          <van-col span="4" class="d1">文章作者</van-col>
          <van-col span="4" class="d2">87评论</van-col>
          <van-col span="4" class="d3">3小时前</van-col>
          <van-col span="12" class="d4">
            <van-icon name="cross" color="#777777" />
          </van-col>
        </van-row>
      </div>
    </div>
        <div class="exhibition">
      <span>用Supervisor实现进程守护，在异常退</span>
      <div class="exhibitionImg">
        <ul>
          <li>
            <img src="@/assets/logo.png" alt />
          </li>
          <li>
            <img src="@/assets/logo.png" alt />
          </li>
          <li>
            <img src="@/assets/logo.png" alt />
          </li>
        </ul>
      </div>
      <div class="details">
        <van-row>
          <van-col span="4" class="d1">文章作者</van-col>
          <van-col span="4" class="d2">87评论</van-col>
          <van-col span="4" class="d3">3小时前</van-col>
          <van-col span="12" class="d4">
            <van-icon name="cross" color="#777777" />
          </van-col>
        </van-row>
      </div>
    </div>
        <div class="exhibition">
      <span>用Supervisor实现进程守护，在异常退</span>
      <div class="exhibitionImg">
        <ul>
          <li>
            <img src="@/assets/logo.png" alt />
          </li>
          <li>
            <img src="@/assets/logo.png" alt />
          </li>
          <li>
            <img src="@/assets/logo.png" alt />
          </li>
        </ul>
      </div>
      <div class="details">
        <van-row>
          <van-col span="4" class="d1">文章作者</van-col>
          <van-col span="4" class="d2">87评论</van-col>
          <van-col span="4" class="d3">3小时前</van-col>
          <van-col span="12" class="d4">
            <van-icon name="cross" color="#777777" />
          </van-col>
        </van-row>
      </div>
    </div>
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
export default {
  data () {
    return {
      show: false,
      value: '', // 输入框
      showRecommend: true // 推荐栏标签
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    close () {
      this.showRecommend = false
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
      img {
        height: 80px;
        width: 123px;
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
