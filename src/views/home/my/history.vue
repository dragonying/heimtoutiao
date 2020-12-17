<template>
  <div class="collection">
    <navBar to="/home/my" title="收藏/历史" />
    <van-tabs
      v-model="activeIndex"
      title-active-color="#3296fa"
      color="#3296fa"
    >
      <van-tab title="收藏" name="collection">
        <van-list
          v-model="collectionloading"
          :finished="collectionfinished"
          finished-text="没有更多了"
          @load="collectionOnLoad"
        >
          <div v-for="(item, index) in collectionList" :key="index">
            <div class="item">
              <div class="info">
                <h4 class="title van-multi-ellipsis--l2">
                  {{ item.title }}
                </h4>
                <div class="content" @click="preview(item.cover.images)">
                  <van-image
                    class="img"
                    v-for="(k, i) in item.cover.images"
                    :key="i"
                    :src="k"
                  />
                </div>
                <p class="push">
                  <span>{{ item.aut_name }}</span
                  ><span>{{ item.pubdate | formatTime }}</span>
                </p>
              </div>
              <van-grid direction="horizontal" :column-num="3">
                <van-grid-item
                  icon="comment-o"
                  :text="String(item.comm_count)"
                />
                <van-grid-item
                  :class="{ red: item.is_liking }"
                  icon="good-job-o"
                  :text="item.is_liking ? '已赞' : '点赞'"
                  @click="like(item)"
                />
                <van-grid-item icon="star-o" :text="String(item.like_count)" />
              </van-grid>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="历史" name="history">
        <van-list
          class="item"
          v-model="historyloading"
          :finished="historyfinished"
          finished-text="没有更多了"
          @load="historyfinished"
        >
          <div v-for="(item, index) in historyList" :key="index">
            <div class="item">
              <div class="author">
                <van-image class="avatar" :src="item.photo" />
                <div>
                  <h5 class="name">{{ item.name }}</h5>
                  <div class="time">{{ item.birthday }}</div>
                </div>
              </div>
              <div class="info">
                <h4 class="title van-multi-ellipsis--l2">
                  {{ item.intro }}
                </h4>
                <div class="content" @click="preview(item.pic)">
                  <van-image
                    class="img"
                    v-for="(k, i) in item.pic"
                    :key="i"
                    :src="k"
                  />
                </div>
              </div>
              <van-grid direction="horizontal" :column-num="3">
                <van-grid-item icon="comment-o" text="评论" />
                <van-grid-item icon="good-job-o" text="点赞" />
                <van-grid-item icon="star-o" text="收藏" />
              </van-grid>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { collections, history, giveLike } from '@/api/news'

const COLLECTION = 'collection' // 收藏
const HISTORY = 'history' // 历史
const TYPE = {
  HISTORY,
  COLLECTION
}
export default {
  name: 'collection',
  data () {
    return {
      collectionloading: false,
      collectionfinished: false,
      historyloading: false,
      historyfinished: false,
      activeIndex: Number(this.$route.query.active) || COLLECTION,
      TYPE: TYPE,
      collectionQuery: {
        page: 0,
        per_page: 10
      },
      historyQuery: {
        page: 0,
        per_page: 10
      },
      historyList: [],
      collectionList: [],
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
    // 收藏
    async collectionOnLoad () {
      this.collectionQuery.page++
      const res = await collections(this.careQuery)
      this.collectionList.push(...res.data.results)
      //   // 加载状态结束
      this.collectionloading = false
      this.collectionfinished =
        !res.data.results.length ||
        this.collectionList.length >= res.data.total_count
    },
    // 历史
    async historyOnLoad () {
      this.historyQuery.page++
      const res = await history(this.historyQuery)
      this.historyList.push(...res.data.results)
      //   // 加载状态结束
      this.historyloading = false
      this.historyfinished =
        !res.data.results.length ||
        this.historyList.length >= res.data.total_count
    },
    // 点赞
    async like (item) {
      await giveLike(item.art_id, item.is_liking)
      item.is_liking = !item.is_liking
    }
  },
  created () {
    this.activeIndex === HISTORY
      ? this.historyOnLoad()
      : this.collectionOnLoad()
  }
}
</script>
<style lang="less" scoped>
.collection {
  min-height: 100%;
  background-color: #fff;

  .van-list {
    background-color: #f4f6f8;
    padding-top: 6px;
  }
  .item {
    .van-grid-item.red {
      color: red;
    }
    background-color: #fff;
    padding: 12px 10px 0;
    margin-bottom: 6px;
    .info {
      .title {
        font-size: 15px;
        font-weight: 400;
        text-align: left;
        color: #3a3a3a;
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
    .push {
      font-size: 12px;
      color: #b4b4b4;
      span {
        margin-right: 8px;
      }
      margin-bottom: 6px;
    }
  }
}
</style>
