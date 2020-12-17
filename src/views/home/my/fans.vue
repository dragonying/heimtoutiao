<template>
  <div class="fans">
    <navBar to="/home/my">
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
      <div v-show="activeIndex === TYPE.FANS">
        <van-list
          class="item"
          v-model="fansloading"
          :finished="fansfinished"
          finished-text="没有更多了"
          @load="fansonLoad"
        >
          <van-cell center v-for="(item, index) in fansList" :key="index">
            <div slot="title">
              <div class="author">
                <van-image class="avatar" :src="rand()" />
                <div>
                  <h5 class="name">{{ item.name }}</h5>
                  <div class="count">粉丝数{{ item.fans_count }}</div>
                </div>
              </div>
            </div>
            <van-button v-if="item.mutual_follow" class="red"
              >已关注</van-button
            >
            <van-button v-else class="gray">取消关注</van-button>
          </van-cell>
        </van-list>
      </div>
      <div v-show="activeIndex === TYPE.CARE">
        <van-list
          class="item"
          v-model="careloading"
          :finished="carefinished"
          finished-text="没有更多了"
          @load="careonLoad"
        >
          <van-cell center v-for="(item, index) in careList" :key="index">
            <div slot="title">
              <div class="author">
                <van-image class="avatar" :src="rand()" />
                <div>
                  <h5 class="name">{{ item.name }}</h5>
                  <div class="count">粉丝数{{ item.fans_count }}</div>
                </div>
              </div>
            </div>
            <van-button v-if="item.mutual_follow" class="red">关注</van-button>
            <van-button v-else class="gray">互相关注</van-button>
          </van-cell>
        </van-list>
      </div>
    </section>
  </div>
</template>
<script>
// import { userFollowings, userFans } from '@/api/user'
import { randPic } from '@/utils/tool'

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
      activeIndex: Number(this.$route.query.active),
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
      fansList: []
    }
  },
  methods: {
    // 关注
    async careonLoad () {
      this.careQuery.page++
      // const res = await userFollowings(this.careQuery)
      const res = this.test()
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

      // const res = await userFollowings(this.fansQuery)
      const res = this.test()
      this.fansList.push(...res.data.results)
      //   // 加载状态结束
      this.fansloading = false
      this.fansfinished =
        !res.data.results.length || this.fansList.length >= res.data.total_count
    },
    rand () {
      return randPic()
    },
    // 后端接口垃圾，临时测试数据
    test () {
      const dt = []
      let start = new Date().getTime()
      const end = start + 10
      for (; start <= end; start++) {
        dt.push({
          id: start,
          name: Math.floor(Math.random() * 100000),
          photo: randPic(),
          fans_count: Math.floor(Math.random() * 1000),
          mutual_follow: Boolean(Math.floor(Math.random() * 100) % 2)
        })
      }
      return {
        data: {
          results: dt
        },
        total_count: 100
      }
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
