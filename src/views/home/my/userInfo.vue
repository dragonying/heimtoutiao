<template>
  <div class="user-page">
    <navBar title="黑马李依依" to="/home/my"></navBar>
    <section class="top">
      <img class="top-left" src="@/assets/logo.png" />
      <div class="top-right">
        <ul class="count">
          <li class="item">
            <h4>88</h4>
            <p>发布</p>
          </li>
          <li class="item">
            <h4>88</h4>
            <p>动态</p>
          </li>
          <li class="item">
            <h4>88</h4>
            <p>关注</p>
          </li>
          <li class="item">
            <h4>88</h4>
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
      <div class="item">
        <div class="author">
          <img class="avatar" src="@/assets/logo.png" />
          <div>
            <h5 class="name">黑马李依依</h5>
            <div class="time">2010-05-09</div>
          </div>
        </div>
        <div class="info">
          <h4 class="title van-ellipsis">
            用Supervisor实现进程守护，在异常退出时...
          </h4>
          <div class="content">
            <img class="img" src="@/assets/logo.png" />
            <img class="img" src="@/assets/logo.png" />
            <img class="img" src="@/assets/logo.png" />
          </div>
          <van-grid direction="horizontal" :column-num="3">
            <van-grid-item icon="comment-o" text="评论" />
            <van-grid-item icon="good-job-o" text="点赞" />
            <van-grid-item icon="star-o" text="收藏" />
          </van-grid>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'user-page'
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
