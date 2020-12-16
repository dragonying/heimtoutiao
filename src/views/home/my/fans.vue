<template>
  <div class="fans">
    <navBar>
      <template #titleslot>
        <ul class="bar">
          <li
            v-for="(item, index) in selectList"
            :key="index"
            :class="{ active: index === activeIndex }"
            @click="activeIndex = index"
          >
            <p>{{ item }}</p>
          </li>
        </ul>
      </template>
    </navBar>
    <section class="content">
      <van-cell-group v-if="activeIndex === TYPE.CARE" class="item">
        <van-cell center>
          <div slot="title">
            <div class="author">
              <img class="avatar" src="@/assets/logo.png" />
              <div>
                <h5 class="name">黑马李依依</h5>
                <div class="count">粉丝数2</div>
              </div>
            </div>
          </div>
          <van-button class="red">关注</van-button>
        </van-cell>
        <van-cell center>
          <div slot="title">
            <div class="author">
              <img class="avatar" src="@/assets/logo.png" />
              <div>
                <h5 class="name">黑马李依依</h5>
                <div class="count">粉丝数2</div>
              </div>
            </div>
          </div>
          <van-button class="gray">互相关注</van-button>
        </van-cell>
      </van-cell-group>
    </section>
  </div>
</template>
<script>
const CARE = 0 // 关注
const FANS = 1 // 粉丝
const TYPE = {
  FANS,
  CARE
}
export default {
  name: 'fans',
  data () {
    return {
      activeIndex: CARE,
      selectList: ['关注', '粉丝'],
      TYPE: TYPE
    }
  }
}
</script>
<style lang="less" scoped>
.fans {
  min-height: 100%;
  .bar {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    li {
      padding: 0px 30px;
      font-size: 14px;
      &.active {
        font-size: 16px;
        p {
          padding-bottom: 4px;
          border-bottom: 3px solid #fff;
        }
      }
    }
  }
  .item {
    .van-cell {
      padding: 15px;
    }
    .author {
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 7px;
      }
      .name {
        font-size: 12px;
        font-weight: bold;
        color: #222222;
      }
      .count {
        font-size: 12px;
        color: #999999;
      }
    }
    .van-button {
      width: 58px;
      height: 28px;
      background: #ffffff;
      border-radius: 3px;
      font-size: 12px;
      &.red {
        background: #f85959;
        color: #fff;
      }
      &.gray {
        color: #999999;
      }
    }
  }
}
</style>
