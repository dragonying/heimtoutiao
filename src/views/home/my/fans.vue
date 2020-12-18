<template>
  <div class="fans">
    <navBar to="/home/my">
      <template #titleslot>
        <ul class="bar">
          <li
            v-for="(item, index) in selectList"
            :key="index"
            :class="{ active: index === activeIndex }"
            @click="changeItem(index)"
          >
            <p>{{ item }}</p>
          </li>
        </ul>
      </template>
    </navBar>
    <section class="content">
      <div v-show="activeIndex === TYPE.CARE">
        <van-list
          class="item"
          v-model="fansloading"
          :finished="fansfinished"
          finished-text="没有更多了"
          @load="fansonLoad"
        >
          <van-cell center v-for="(item, index) in fansList" :key="index">
            <div slot="title">
              <div
                class="author"
                @click="$router.push(`/user/userinfo/${item.id}`)"
              >
                <van-image class="avatar" :src="item.photo" />
                <div>
                  <h5 class="name van-ellipsis">{{ item.name }}</h5>
                  <div class="count">粉丝数{{ item.fans_count }}</div>
                </div>
              </div>
            </div>
            <van-button class="blue" @click="cacelCare(index)"
              >取消关注</van-button
            >
          </van-cell>
        </van-list>
      </div>
      <div v-show="activeIndex === TYPE.FANS">
        <van-list
          class="item"
          v-model="careloading"
          :finished="carefinished"
          finished-text="没有更多了"
          @load="careonLoad"
        >
          <van-cell center v-for="(item, index) in careList" :key="index">
            <div slot="title">
              <div
                class="author"
                @click="$router.push(`/user/userinfo/${item.id}`)"
              >
                <van-image class="avatar" :src="item.photo" />
                <div>
                  <h5 class="name van-ellipsis">{{ item.name }}</h5>
                  <div class="count">粉丝数{{ item.fans_count }}</div>
                </div>
              </div>
            </div>
            <van-button
              :class="item.mutual_follow ? 'red' : 'gray'"
              @click="item.mutual_follow = !item.mutual_follow"
              >{{ item.mutual_follow ? '关注' : '互相关注' }}</van-button
            >
          </van-cell>
        </van-list>
      </div>
    </section>
  </div>
</template>
<script>
// import { userFollowings, userFans } from '@/api/user'
import { randomUser } from '@/api/test'

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
      careloading: false,
      carefinished: false,
      fansloading: false,
      fansfinished: false,
      activeIndex: Number(this.$route.query.active) || 0,
      selectList: ['关注', '粉丝'],
      TYPE: TYPE,
      careQuery: {
        page: 0,
        per_page: 10
      },
      fansQuery: {
        page: 0,
        per_page: 10
      },
      careList: [],
      fansList: [],
      scroll: 0 // 滚动距离
    }
  },
  methods: {
    // 获取滚动距离
    scrollDis () {
      return (
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      )
    },
    changeItem (index) {
      const tmp = this.scrollDis()
      window.scrollTo(0, this.scroll)
      this.activeIndex = index
      this.scroll = tmp
    },
    // 关注
    async careonLoad () {
      this.careQuery.page++
      // const res = await userFollowings(this.careQuery)
      const res = await randomUser(this.careQuery)
      this.careList.push(...res.data.results)
      //   // 加载状态结束
      this.careloading = false
      this.carefinished =
        !res.data.results.length || this.careList.length >= res.data.total_count
    },
    // 粉丝
    async fansonLoad () {
      this.fansQuery.page++
      // await userFans(this.fansQuery)
      const res = await randomUser(this.fansQuery)
      this.fansList.push(...res.data.results)
      //   // 加载状态结束
      this.fansloading = false
      this.fansfinished =
        !res.data.results.length || this.fansList.length >= res.data.total_count
    },
    // 取消关注
    cacelCare (index) {
      this.fansList.splice(index, 1)
    }
  },
  created () {
    this.activeIndex === CARE ? this.careonLoad() : this.fansonLoad()
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
        overflow: hidden;
      }
      .name {
        font-size: 12px;
        font-weight: 600;
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
      &.blue {
        color: #fff;
        background: #6bb6ff;
      }
    }
  }
}
</style>
