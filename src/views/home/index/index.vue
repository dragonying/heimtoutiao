<template>
  <div class="indexPage">
    <div class="headSeek">首页</div>
    <div class="labelBox">
      <ul class="label">
        <li>推荐</li>
        <li>后端</li>
        <li>Linux</li>
        <li>人工智能</li>
      </ul>
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
          <span class="myChannel">我的频道</span>
          <span class="compile">编辑</span>
          <ul class="recommend">
            <li>推荐</li>
            <li>后端</li>
            <li>Linux</li>
            <li>人工智能</li>
          </ul>
        </div>
        <div class="buttonWindows"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    showPopup () {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.indexPage {
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
  .headSeek {
    height: 64px;
    width: 100%;
    font-size: 14px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    text-align: left;
    line-height: 64px;
    text-align: center;
    background-color: #3296fa;
    color: #ffffff;
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
