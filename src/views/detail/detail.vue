<template>
  <div class="detail">
    <navBar right name="ellipsis"></navBar>
    <div class="content">
      <div class="title">牛逼程序员都用的开源工具，你用了 几个？</div>
      <div class="user">
        <div class="user-head">
          <img src="../../assets/logo.png" alt="" />
        </div>
        <div class="user-name">
          <div class="user-name1">天涯小行客</div>
          <div class="user-time">14小时前</div>
        </div>
        <div class="user-right">
          <van-button icon="plus" type="info" round>关注</van-button>
        </div>
      </div>
      <div class="context">
        五岁的小男孩汉克和爸爸、妈妈、哥哥一齐到森林干活。突然天下起了大雨来，可是，他们只带了一块雨披。爸爸将雨披给了妈妈，妈妈给了哥哥，哥哥又给了小汉克。汉克不解地问道：“为什么爸爸给了妈妈，妈妈给了哥哥，哥哥又给了我呢”爸爸回答道：“因为爸爸比妈妈强大，妈妈比哥哥强大，哥哥又比你强大呀。我们都会保护比较弱小的人。”小汉克左右看了看，跑过去将雨披撑开，挡在了一朵风雨中飘摇的娇弱小花上头。
      </div>
      <div class="like">
        <h4 class="like-item1">猜你喜欢</h4>
        <ul class="like-item2">
          <li>了解微信小程序</li>
          <li>了解微信小程序</li>
          <li>了解微信小程序</li>
          <li>了解微信小程序</li>
          <li>了解微信小程序</li>
          <li>了解微信小程序</li>
        </ul>
        <div class="like-item3">
          <van-button icon="good-job-o">点赞</van-button>
          <van-button icon="delete">不喜欢</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  components: {
    navBar: () => import('../../components/navBar')
  }
}
</script>

<style lang="less" scoped>
.detail {
  ::v-deep .van-icon {
    color: #fff;
    font-size: 22px;
  }
  .content {
    padding-left: 12px;
    padding-right: 19px;
    .title {
      padding-top: 24px;
      font-size: 20px;
      font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
      font-weight: 700;
      text-align: left;
      color: #3a3a3a;
      line-height: 32px;
      letter-spacing: 1px;
    }
    .user {
      padding-top: 25px;
      display: flex;
      justify-content: space-between;
      .user-head {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
        }
      }
      .user-name {
        font-size: 14px;
        .user-name1 {
          color: #313131;
          font-weight: 400;
          text-align: left;
        }
        .user-time {
          color: #bebebe;
          font-size: 12px;
          text-align: left;
        }
      }
      .user-right {
        .van-button {
          width: 85px;
          height: 29px;
          background: #3296fa;
          border-radius: 19px;
        }
        ::v-deep .van-icon-plus {
          font-size: 14px;
        }
      }
    }
    .context {
      padding: 20px 6px 4px;
      font-size: 18px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 400;
      text-align: left;
      color: #222222;
      letter-spacing: 1px;
      text-indent: 36px;
    }
    .like {
      padding-top: 25px;
      .like-item1 {
        font-size: 15px;
        font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
        font-weight: 700;
        text-align: left;
        color: #333333;
        line-height: 32px;
        letter-spacing: 1px;
        padding-bottom: 10px;
      }
      .like-item2 {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-left: 20px;
        li {
          width: 50%;
          font-size: 15px;
          font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
          font-weight: 400;
          text-align: left;
          color: #666666;
          line-height: 32px;
          letter-spacing: 1px;
        }
      }
      .like-item3 {
        font-size: 12px;
        text-align: center;
        ::v-deep .van-icon {
          font-size: 16px;
          color: #666;
        }
      }
    }
  }
}
</style>
