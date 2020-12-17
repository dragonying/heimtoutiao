<template>
  <div class="msgBox">
    <div class="info" v-for="(item, index) in msg" :key="index">
      <div class="msg" :class="item.robot ? 'other' : 'user'">
        <img class="avatar" :src="item.robot ? robot.avatar : require('@/assets/images/avatar/28.jpg')" />
        <!--文本类型-->
        <div class="msg-box" v-if="item.type === MSG_TYPE.MSG_TYPE_TXT">
          <div :class="item.robot ? 'left-triangle' : 'right-triangle'"></div>
          <div class="txt" :class="item.robot ? 'left-txt' : 'right-txt'">
            {{ item.content }}
          </div>
        </div>
        <!--图片类型-->
        <div class="msg-box" v-else-if="item.type === MSG_TYPE.MSG_TYPE_IMG">
          <img class="img" :src="item.content" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MSG_TYPE } from '@/config/enum'
import { mapState } from 'vuex'

export default {
  name: 'msgBox',
  props: {
    msg: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      MSG_TYPE: MSG_TYPE,
      robot: {
        name: '小雪',
        avatar: require('@/assets/images/avatar/26.jpg')
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>
<style lang="less" scoped>
.msgBox {
  .msg {
    display: flex;
    margin-bottom: 13px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
    &.other {
      flex-direction: row;
      .avatar {
        margin-right: 5px;
      }
    }
    &.user {
      flex-direction: row-reverse;

      .avatar {
        margin-left: 5px;
      }
    }

    // 消息盒子
    .msg-box {
      display: inline-block;
      padding: 0 5px;
      position: relative;

      .img {
        max-width: 142px;
        border-radius: 4px;
      }

      .left-triangle {
        position: absolute;
        top: 15px;
        left: -5px;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-right: 5px solid #fff;
      }

      .txt {
        min-height: 40px;
        max-width: 255px;
        line-height: 28px;
        padding: 6px 6px;
        font-size: 16px;
        border-radius: 4px;
        text-align: left;
        word-wrap: break-word;
        word-break: break-all;
      }

      .left-txt {
        background: #fff;
      }

      .right-triangle {
        position: absolute;
        top: 15px;
        right: -5px;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-left: 5px solid #a2e65b;
      }

      .right-txt {
        background: #a2e65b;
      }
    }
  }
}
</style>
