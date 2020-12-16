<template>
  <div class="feed-back">
    <navBar title="意见反馈" to="/home/my"></navBar>
    <section
      class="main"
      ref="chatBox"
      @click="showTool = false"
      :style="{
        backgroundImage: 'url(' + coverImgUrl + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }"
    >
      <msgBox :msg="chatItem" :users="users"></msgBox>
    </section>
    <section class="footer" :class="{ show: showTool }">
      <div class="chat-input">
        <i class="iconfont">&#xe61f;</i>
        <van-field
          ref="input"
          center
          v-model="text"
          @keyup.enter="enter"
          @focus="showTool = false"
        />
        <i class="iconfont">&#xe605;</i>
        <van-button v-if="showSendBtn" class="send-btn">发送</van-button>
        <i v-else class="iconfont" @click="showTool = true">&#xe7d9;</i>
      </div>
      <div class="tool">
        <van-swipe class="my-swipe" indicator-color="#898c91">
          <van-swipe-item>
            <ul class="list">
              <li class="item">
                <div class="bg">
                  <uploadImg @input="loadImg"></uploadImg>
                </div>
                <p class="title">相册</p>
              </li>
              <li class="item">
                <div class="bg" @click="unDevelop">
                  <i class="iconfont">&#xe63f;</i>
                </div>
                <p class="title">拍摄</p>
              </li>
              <li class="item">
                <div class="bg" @click="unDevelop">
                  <i class="iconfont">&#xe607;</i>
                </div>
                <p class="title">视频通话</p>
              </li>
              <li class="item">
                <div class="bg" @click="unDevelop">
                  <i class="iconfont">&#xe61d;</i>
                </div>
                <p class="title">位置</p>
              </li>
              <li class="item">
                <div class="bg"><i class="iconfont">&#xe7c9;</i></div>
                <p class="title">红包</p>
              </li>
              <li class="item">
                <div class="bg"><i class="iconfont">&#xe60f;</i></div>
                <p class="title">转账</p>
              </li>
              <li class="item">
                <div class="bg"><i class="iconfont">&#xe658;</i></div>
                <p class="title">语音输入</p>
              </li>
              <li class="item">
                <div class="bg" @click="unDevelop">
                  <i class="iconfont">&#xe66e;</i>
                </div>
                <p class="title">我的收藏</p>
              </li>
            </ul>
          </van-swipe-item>
          <van-swipe-item>
            <ul class="list">
              <li class="item">
                <div class="bg"><i class="iconfont">&#xe60a;</i></div>
                <p class="title">名片</p>
              </li>
              <li class="item">
                <div class="bg"><i class="iconfont">&#xe618;</i></div>
                <p class="title">文件</p>
              </li>
              <li class="item">
                <div class="bg">
                  <uploadImg @input="setBg" icon="&#xe65b;"></uploadImg>
                </div>

                <p class="title">设置背景</p>
              </li>
              <!--为了让底部多余的li能够正常排列-->
              <li
                class="item nouse"
                v-for="i in ['a', 'b', 'c', 'd', 'e', 'f', 'g']"
                :key="i"
              ></li>
            </ul>
          </van-swipe-item>
        </van-swipe>
      </div>
    </section>
  </div>
</template>
<script>
import { MSG_TYPE } from '@/config/enum'
export default {
  name: 'feed-back',
  data () {
    return {
      coverImgUrl: require('@/assets/images/3.jpg'), // 背景图
      msg_type: MSG_TYPE,
      showTool: false,
      selectedUserId: 1, // 选中的用户
      users: [
        {
          name: '小雪',
          avatar: require('@/assets/images/avatar/26.jpg')
        },
        {
          name: '小闵',
          avatar: require('@/assets/images/avatar/28.jpg')
        }
      ],
      text: '', // 输入框输入的内容
      fileList: [], // 图片文件列表
      chatItem: [
        {
          type: MSG_TYPE.MSG_TYPE_TXT,
          content:
            '您好，欢迎反馈，反馈时请附上界面截屏，可以更便于我们查看问题',
          userId: 1
        }
      ] // 聊天内容
    }
  },
  watch: {},
  computed: {
    // 有输入内容就显示
    showSendBtn () {
      return this.text.length > 0
    }
  },
  methods: {
    // 添加消息
    appdMsg (type, content) {
      this.chatItem.push({
        userId: this.selectedUserId,
        type: type,
        content: content
      })
      // 触发失去焦点，实现键盘隐藏
      this.$refs.input.blur()
      this.showTool = false
    },
    // 输入框消息
    enter () {
      this.appdMsg(MSG_TYPE.MSG_TYPE_TXT, this.text)
      this.text = ''
    },
    // 上传图片
    loadImg (list) {
      list.forEach(v => {
        this.appdMsg(MSG_TYPE.MSG_TYPE_IMG, v)
      })
    },
    // 功能暂未开发
    unDevelop () {
      this.$toast('功能暂未开发~_~')
    },
    // 设置背景图
    setBg (img) {
      this.coverImgUrl = img[0]
      this.showTool = false
    }
  },
  components: {
    uploadImg: () => import('@/components/uploadImg'),
    msgBox: () => import('@/components/msgBox')
  }
}
</script>
<style lang="less" scoped>
.feed-back {
  min-height: 100%;
  width: 100%;
  position: relative;
  background-color: #ebebeb;

  .main {
    position: absolute;
    top: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    padding-bottom: 48px;
    background-color: #ebebeb;
    overflow: auto;
  }
  .footer {
    width: 100%;
    position: fixed;
    bottom: -235px;
    background-color: #f5f5f7;
    transition: all 0.5s;
    // border-top: 1px solid #dadadc;
    &.show {
      bottom: 0;
    }
    .chat-input {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 48px;
      // color: #717075;
      color: #000;
      & > * {
        margin: 0 5px;
      }
      .iconfont {
        font-size: 28px;
      }
      .van-field {
        height: 38px;
        // width: 248px;
        flex: 1;
        border-radius: 3px;
        // border: 1px solid #dddddf;
        background-color: #fcfcfc;
      }
      .send-btn {
        height: 32px;
        width: 65px;
        font-size: 16px;
        color: #fff;
        background-color: #06c15f;
        border-radius: 4px;
      }
    }
    .tool {
      width: 100%;
    }
    .my-swipe {
      width: 100%;
      height: 235px;
      background-color: #f5f5f5;
      border-top: 1px solid #dadadc;

      ::v-deep .van-swipe__indicator {
        background-color: #dadbdc;
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 20px 15px;

        .item {
          text-align: center;
          margin: 0 14px 20px;
          &.nouse {
            height: 0;
          }
          .title {
            font-size: 12px;
          }
          .bg {
            width: 58px;
            height: 58px;
            line-height: 58px;
            border-radius: 12px;
            border: 1px solid #d8d8d8;
            background-color: #fbfbfb;
            text-align: center;
            margin-bottom: 6px;
            /deep/ .iconfont {
              font-size: 31px;
              // color: #7c8186;
              color: #000;
            }
          }
        }
      }
    }
  }
}
</style>
