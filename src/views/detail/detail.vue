<template>
  <div class="detail" v-if="bol">
    <navBar
      right
      name="ellipsis"
      to="/searchResult/123"
      title="文章详情"
    ></navBar>
    <div class="content">
      <div class="content-i" v-if="comList">
        <div class="title">{{ comList.title }}</div>
        <div class="user">
          <div class="user-head">
            <img :src="comList.aut_photo" alt="" v-if="comList.aut_photo" />
            <img src="../../assets/empty.jpg" alt="" v-else />
          </div>
          <div class="user-name">
            <div class="user-name1">{{ comList.aut_name }}</div>
            <div class="user-time">{{ comList.pubdate | formatTime }}</div>
          </div>
          <div class="user-right">
            <van-button
              type="warning"
              round
              v-if="comList.is_followed"
              @click="onFollow(true)"
              >取消关注</van-button
            >
            <van-button
              icon="plus"
              type="info"
              round
              v-else
              @click="onFollow(false)"
              >关注</van-button
            >
          </div>
        </div>
        <div class="context" v-html="comList.content"></div>
        <div class="like" v-if="comList.recomments.length > 0">
          <h4 class="like-item1">猜你喜欢</h4>
          <ul class="like-item2">
            <li>了解微信小程序</li>
            <li>了解微信小程序</li>
            <li>了解微信小程序</li>
            <li>了解微信小程序</li>
            <li>了解微信小程序</li>
            <li>了解微信小程序</li>
          </ul>
        </div>
        <div class="like-item3">
          <van-button
            icon="good-job-o"
            class="good tored1"
            v-if="comList.attitude === 1"
            @click="onLike(false)"
            >点赞</van-button
          >
          <van-button
            icon="good-job-o"
            class="good"
            v-else
            @click="onLike(true)"
            >点赞</van-button
          >
          <van-button
            icon="delete"
            class="good tored1"
            v-if="comList.attitude === 0"
            @click="unLike(false)"
            >不喜欢</van-button
          >
          <van-button icon="delete" class="good" v-else @click="unLike(true)"
            >不喜欢</van-button
          >
        </div>
      </div>
      <div class="adv">
        <div class="adv-img">
          <img src="../../assets/guanggao.png" alt="" />
        </div>
        <div class="txt-item1">
          前端与移动开发-课程升级V6.0 高薪技术全覆盖
        </div>
        <div class="txt-item1">学前端 选择-传智播客</div>
      </div>
      <div class="comment">
        <div class="com-left">
          <img src="../../assets/logo.png" alt="" />
        </div>
        <div class="com-right">
          <div class="com-item1">
            <div class="com-name">哈撒给i</div>
            <div class="give-like"><van-icon name="good-job-o" />26</div>
          </div>
          <div class="com-txt">我出去就跟别人说我的是iPhoneXS就完事了呗</div>
          <div class="com-item2">
            <div class="com-time">09-13 15:51</div>
            <div class="reply" @click="showInput = true">18回复</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="foot">
        <div class="search" @click="showInput = true">写评论</div>
        <van-icon name="chat-o" badge="9" />
        <van-icon
          :name="comList.is_collected ? 'like' : 'like-o'"
          :class="{ tored: comList.is_collected }"
        />
        <van-icon name="share-o" />
      </div>
    </div>
    <van-popup v-model="showInput" position="bottom">
      <van-field
        v-model="inputValue"
        type="textarea"
        placeholder="歪日Σσ(・Д・；)我我我什么都没做!!!"
        rows="4"
      ></van-field>
      <span class="send" @click="onSend">发送</span>
    </van-popup>
  </div>
</template>

<script>
import {
  userArticles,
  giveLike,
  disLike,
  appComments,
  replyComments
} from '../../api/news'
import { followings } from '../../api/user'
export default {
  name: 'detail',
  components: {
    navBar: () => import('../../components/navBar')
  },
  data () {
    return {
      comList: '', // 文章详情
      acticleId: this.$route.params.artid, // 文章id
      bol: true, // 静默刷新
      showInput: false, // 输入框是否显示
      inputValue: '' // 用户输入的字
    }
  },
  async created () {
    const res = await userArticles(this.acticleId)
    this.comList = res.data
    // console.log(res.data)
    // 获取评论或评论回复
    const res2 = await appComments({
      type: 'a',
      source: this.comList.art_id
    })
    console.log(res2)
  },
  methods: {
    // 取消关注用户 和 关注用户
    async onFollow (isTrue) {
      this.$toast.loading({
        duration: 0
      })
      const res = await followings(this.comList.aut_id, isTrue)
      console.log(res)
      this.bol = false
      this.$nextTick(() => {
        this.bol = true
      })
      this.$toast.success('修改成功')
    },
    // 对文章点赞和取消对文章点赞
    async onLike (isTrue) {
      this.$toast.loading({
        duration: 0
      })
      const res = await giveLike(this.comList.art_id, isTrue)
      console.log(res)
      this.bol = false
      this.$nextTick(() => {
        this.bol = true
      })
      this.$toast.success('修改成功')
    },
    async unLike (isTrue) {
      this.$toast.loading({
        duration: 0
      })
      const res = await disLike(this.comList.art_id, isTrue)
      console.log(res)
      this.bol = false
      this.$nextTick(() => {
        this.bol = true
      })
      this.$toast.success('修改成功')
    },
    // 添加评论或评论回复
    async onSend () {
      const res = replyComments({
        target: this.comList.art_id,
        content: this.inputValue
      })
      console.log(res)
    }
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
    padding-bottom: 52px;
    .title {
      text-align: center;
      padding-top: 24px;
      font-size: 20px;
      font-family: Microsoft YaHei Bold, Microsoft YaHei Bold-Bold;
      font-weight: 700;
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
          height: 100%;
          border-radius: 50%;
        }
      }
      .user-name {
        font-size: 14px;
        flex: 1;
        margin-left: 4px;
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
          border-radius: 19px;
        }
        ::v-deep .van-icon-plus {
          font-size: 14px;
        }
      }
    }
    .context {
      padding: 20px 6px 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      // white-space: nowrap;
      font-size: 12px;
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
    }
    .like-item3 {
      font-size: 12px;
      text-align: center;
      ::v-deep .van-icon {
        font-size: 16px;
        color: #666;
      }
      .good {
        width: 78px;
        height: 29px;
        border: 1px solid #eeeeee;
        border-radius: 15px;
        margin-right: 18px;
        margin-top: 20px;
      }
    }
    .adv {
      margin-top: 25px;
      margin-bottom: 36px;
      border: 1px solid #e8e8e8;
      padding: 20px 20px 20px 36px;
      .adv-img {
        height: 182px;
        width: 100%;
        img {
          width: 100%;
        }
      }
      .txt-item1 {
        font-size: 12px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #222222;
        letter-spacing: 1px;
      }
    }
    .comment {
      display: flex;
      justify-content: space-between;
      .com-left {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        img {
          width: 100%;
        }
      }
      .com-right {
        .com-item1 {
          display: flex;
          justify-content: space-between;
          line-height: 20px;
          padding-bottom: 5px;
          .com-name {
            color: #446a9d;
            font-size: 14px;
          }
          .give-like {
            .van-icon {
              line-height: 20px;
              color: #343434;
              font-size: 14px;
            }
            color: #343434;
            font-size: 14px;
          }
        }
        .com-txt {
          font-size: 16px;
          font-weight: 400;
          text-align: left;
          color: #1c1c1c;
          line-height: 22px;
          letter-spacing: 1px;
          padding-bottom: 7px;
        }
        .com-item2 {
          display: flex;
          line-height: 24px;
          .com-time {
            font-size: 12px;
            color: #222222;
          }
          .reply {
            margin-left: 10px;
            text-align: center;
            border-radius: 40px;
            width: 70px;
            background-color: #f4f5f6;
            font-size: 12px;
          }
        }
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    .foot {
      display: flex;
      justify-content: space-between;
      padding-left: 15px;
      padding-right: 20px;
      padding-top: 5px;
      padding-bottom: 7px;
      border-top: 1px solid #eee;
      .search {
        height: 32px;
        border: 2px solid #eee;
        border-radius: 16px;
        font-size: 15px;
        color: #777777;
        line-height: 32px;
        padding-left: 18px;
        width: 60%;
      }
      .van-icon {
        line-height: 32px;
        color: #777777;
      }
      .van-info {
        top: 10px;
      }
    }
  }
  .tored {
    color: #ed5a65 !important;
  }
  .tored1 {
    color: #ed5a65 !important;
    border-color: #ed5a65 !important;
    .van-icon {
      color: #ed5a65 !important;
    }
  }
  .van-popup {
    padding: 20px 15px 5px;
    .van-field {
      border-radius: 6px;
      background-color: #f7f4f5;
      padding: 8px;
      font-size: 14px;
    }
    .send {
      float: right;
      font-size: 16px;
      color: #b4b4bd;
      margin-top: 6px;
    }
  }
}
</style>
