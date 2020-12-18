<template>
  <div class="detail" v-if="bol">
    <navBar
      right
      name="ellipsis"
      to="/searchResult/123"
      title="文章详情"
      id="top"
    ></navBar>
    <div class="content">
      <div class="content-i" v-if="comList">
        <div class="title">{{ comList.title }}</div>
        <div class="user">
          <div class="user-head">
            <!-- <img :src="comList.aut_photo" alt="" v-if="comList.aut_photo" />
            <img src="../../assets/empty.jpg" alt="" v-else /> -->
            <img src="../../assets/img5.jpg" alt="" />
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
            @click="onLike(true)"
            >点赞</van-button
          >
          <van-button
            icon="good-job-o"
            class="good"
            v-else-if="comList.attitude === -1"
            @click="onLike(false)"
            >点赞</van-button
          >
          <van-button
            icon="delete"
            class="good tored1"
            v-if="comList.attitude === 0"
            @click="unLike(true)"
            >不喜欢</van-button
          >
          <van-button icon="delete" class="good" v-else @click="unLike(false)"
            >不喜欢</van-button
          >
        </div>
      </div>
      <div class="adv">
        <div class="adv-img">
          <img src="../../assets/happynewyear.png" alt="" />
        </div>
        <div class="txt-item1">
          「版权所有未经许可请勿使用」
        </div>
        <div class="txt-item2">FUCK ALL</div>
      </div>
      <template v-if="remarkList">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="木得了(︶.̮︶✽)"
          offset="100"
          @load="onLoad"
          ><div
            class="comment"
            v-for="(item, index) in remarkList"
            :key="index"
          >
            <div class="com-left">
              <!-- <img :src="item.aut_photo" v-if="item.aut_photo" alt="" />
              <img src="../../assets/empty.jpg" v-else alt="" /> -->
              <img src="../../assets/empty.jpg" alt="" />
            </div>
            <div class="com-right">
              <div class="com-item1">
                <div class="com-name">{{ item.aut_name }}</div>
                <div class="give-like">
                  <van-icon
                    name="good-job-o"
                    :class="{ tored: item.like_count > 0 }"
                    @click="onLiking(item)"
                  />
                  <div>{{ item.like_count }}</div>
                </div>
              </div>
              <div class="com-txt">评论:{{ item.content }}</div>
              <div class="com-item2">
                <div class="com-time">{{ item.pubdate | formatTime }}</div>
              </div>
            </div>
          </div>
        </van-list>
      </template>
    </div>
    <div class="footer">
      <div class="foot">
        <div class="search" @click="showInput = true">写评论</div>
        <van-icon name="chat-o" :badge="num || 0" />
        <van-icon
          :name="comList.is_collected ? 'like' : 'like-o'"
          :class="{ tored: comList.is_collected }"
          @click="collectAct"
        />
        <van-icon name="back-top" @click="goTop" />
      </div>
    </div>
    <van-popup v-model="showInput" position="bottom">
      <van-field
        v-model="inputValue"
        type="textarea"
        placeholder="歪日Σσ(・Д・；)我我我什么都没做!!!"
        rows="4"
        @keydown.enter="onSend"
      ></van-field>
      <span
        class="send"
        @click="onSend"
        :class="{ tored: inputValue.length > 0 }"
        >发送</span
      >
    </van-popup>
    <div id="houhou"></div>
  </div>
</template>

<script>
import {
  userArticles,
  giveLike,
  disLike,
  replyComments,
  collectArticle,
  commentLike
} from '@/api/news'
import { followings } from '@/api/user'
export default {
  name: 'detail',
  components: {
    navBar: () => import('@/components/navBar')
  },
  data () {
    return {
      comList: '', // 文章详情
      acticleId: this.$route.params.artid, // 文章id
      bol: true, // 静默刷新
      showInput: false, // 输入框是否显示
      inputValue: '', // 用户输入的字
      remarkList: [], // 用户评论
      huiFuData: '',
      replyData: '',
      num: '',
      loading: false,
      finished: false,
      currindex: 10
    }
  },
  async created () {
    await this.refreshData() // 获取文章信息
    await this.onDiscuss(false, 'a') // 获取评论
    // await this.onDiscuss(false, 'c') // 获取评论回复
  },
  methods: {
    // 刷新文章信息
    async refreshData () {
      const res = await userArticles(this.acticleId)
      this.comList = res.data
    },
    goTop () {
      document.querySelector('#top').scrollIntoView(true)
    },
    // 收藏文章和取消收藏文章
    async collectAct () {
      this.$toast.loading({
        duration: 0
      })
      await collectArticle(this.acticleId, this.comList.is_collected)
      this.refreshData()
      this.$toast.success('修改成功')
    },
    // 滚动刷新评论
    onLoad () {
      this.onDiscuss(false, 'a')
    },
    // 取消关注用户 和 关注用户
    async onFollow (isTrue) {
      this.$toast.loading({
        duration: 0
      })
      await followings(this.comList.aut_id, isTrue)
      this.refreshData()
      this.$toast.success('修改成功')
    },
    // 对文章点赞和取消对文章点赞
    async onLike (isTrue) {
      this.$toast.loading({
        duration: 0
      })
      await giveLike(this.comList.art_id, isTrue)
      this.$toast.success('修改成功')
      this.refreshData()
    },
    async unLike (isTrue) {
      this.$toast.loading({
        duration: 0
      })
      await disLike(this.comList.art_id, isTrue)
      this.refreshData()
      this.$toast.success('修改成功')
    },
    // 对评论点赞
    async onLiking (item) {
      this.$toast.loading({
        duration: 0
      })
      await commentLike(item.com_id, item.is_liking)
      // this.onDiscuss(false, 'a')
      item.like_count++
      this.$toast.success('点赞成功')
    },
    // 评论回复
    onSend () {
      if (this.inputValue.length > 0) {
        this.$toast.loading({
          duration: 0
        })
        this.onDiscuss(true, 'a')
        this.onDiscuss(false, 'a')
        this.showInput = false
        this.inputValue = ''
        this.$toast.success('发布成功')
      }
    },
    async onDiscuss (isTrue, type, item) {
      if (isTrue) {
        if (type === 'a') {
          await replyComments(
            {
              target: this.comList.art_id,
              content: this.inputValue
            },
            isTrue
          )
        } else {
          await replyComments(
            {
              target: item.aut_id,
              content: this.inputVal,
              art_id: this.acticleId
            },
            isTrue
          )
        }
      } else {
        if (type === 'a') {
          const res = await replyComments(
            {
              type,
              source: this.$route.params.artid,
              limit: this.currindex,
              offset: this.comList.com_id
            },
            isTrue
          )
          this.currindex = this.currindex + 2
          this.loading = false
          if (res.data.total_count <= this.currindex - 1) {
            this.finished = true
          }
          this.remarkList = res.data.results
          this.num = res.data.total_count
        } else {
          const res = await replyComments(
            {
              type,
              source: this.huiFuData.aut_id
            },
            isTrue
          )
          this.replyData = res.data
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  background: url('../../assets/timg.jpg') no-repeat;
  background-size: cover;
  font-size: 14px;
  font-family: YouYuan, Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
  ::v-deep .van-icon {
    color: #fff;
    font-size: 22px;
  }
  #houhou {
    position: fixed;
    bottom: 50px;
    right: 10px;
    width: 58px;
    height: 50px;
    background: url('../../assets/8f34658.svg') no-repeat;
    background-position: 50%;
    animation: swing-data-v-22f7755e 0.5s cubic-bezier(0.7, 0.01, 0.35, 1)
      infinite alternate;
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.7, 0.01, 0.35, 1);
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: none;
    animation-play-state: running;
    animation-name: swing-data-v-22f7755e;
  }
  @keyframes swing-data-v-22f7755e {
    0% {
      -webkit-transform: rotate(-5deg);
      transform: rotate(-5deg);
    }
    100% {
      -webkit-transform: rotate(5deg);
      transform: rotate(5deg);
    }
  }

  .content {
    padding: 0 19px 52px 12px;
    .title {
      text-align: center;
      padding-top: 24px;
      font-size: 20px;
      font-weight: 700;
      color: #3a3a3a;
      line-height: 32px;
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
        flex: 1;
        margin-left: 4px;
        .user-name1 {
          color: #313131;
          font-weight: 400;
        }
        .user-time {
          color: #bebebe;
          font-size: 12px;
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
      font-size: 12px;
      font-weight: 400;
      color: #222222;
      text-indent: 36px;
    }
    .like {
      padding-top: 25px;
      .like-item1 {
        font-size: 15px;
        font-weight: 700;
        color: #333333;
        line-height: 32px;
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
          font-weight: 400;
          color: #666666;
          line-height: 32px;
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
      padding-bottom: 10px;
      border-radius: 8px;
      .adv-img {
        width: 100%;
        img {
          width: 100%;
          border-radius: 8px;
        }
      }
      .txt-item1 {
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: #222222;
      }
      .txt-item2 {
        text-align: center;
        font-size: 20px;
        font-family: STHupo YouYuan, Microsoft YaHei Regular,
          Microsoft YaHei Regular-Regular;
        font-weight: 700;
        color: deeppink;
      }
    }
    .comment {
      display: flex;
      padding: 6px;
      justify-content: space-between;
      border: 1px solid deeppink;
      border-radius: 8px;
      margin-bottom: 6px;

      .com-left {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .com-right {
        flex: 1;
        .com-item1 {
          display: flex;
          justify-content: space-between;
          line-height: 20px;
          padding-bottom: 5px;
          .com-name {
            color: #446a9d;
          }
          .give-like {
            display: flex;
            color: #343434;
            .van-icon {
              color: #343434;
            }
          }
        }
        .com-txt {
          font-size: 16px;
          font-weight: 400;
          color: #1c1c1c;
          line-height: 22px;
          padding-bottom: 7px;
          padding-right: 6px;
          word-wrap: break-word;
          word-break: break-all;
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
      .van-icon-back-top {
        color: deeppink;
      }
    }
  }
  .tored {
    color: deeppink !important;
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
    }
    .send {
      float: right;
      font-weight: 400;
      font-size: 16px;
      color: #b4b4bd;
      margin-top: 6px;
    }
    .now {
      margin: 0 -15px;
      padding-bottom: 10px;
      text-indent: 32px;
      line-height: 20px;
      border-bottom: 1px solid #ccc;
      font-size: 16px;
      color: #ccc;
    }
    .replay {
      display: flex;
      justify-content: space-between;
      .left-data {
        width: 36px;
        height: 36%;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .right-data {
        flex: 1;
        margin-left: 10px;
        .t1 {
          display: flex;
          justify-content: space-between;
          color: #ccc;
          .d-title {
            margin-top: 10px;
          }
          .d-like {
            display: flex;
            margin-top: 10px;
            .van-icon {
              color: #333;
            }
            .d-num {
              color: #ccc;
              font-size: 12px;
              margin-left: 4px;
            }
          }
        }
        .t2 {
          color: deeppink;
          margin-bottom: 10px;
        }
        .t3 {
          font-size: 12px;
          display: flex;
          align-items: center;
          margin-bottom: 6px;
          .t31 {
            margin-right: 10px;
          }
          .t32 {
            padding: 2px 10px;
            border-radius: 20px;
            background-color: #ccc;
          }
        }
      }
    }
  }
}
</style>
