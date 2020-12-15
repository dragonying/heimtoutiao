<template>
  <div class="search-result">
    <navBar title="搜索结果" to="/home/search"></navBar>
    <div class="keyword">{{ query.q }}</div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="top">
          <h4 class="title van-multi-ellipsis--l2">
            {{ item.title }}
          </h4>
          <div class="content">
            <van-image v-for="(s, i) in item.cover.images" :key="i" :src="s" />
          </div>
          <div class="info">
            <span class="author">{{ item.aut_name }}</span>
            <span class="comment">{{ item.comm_count }} 评论</span>
            <span class="time">{{ item.pubdate | timeFormat }}</span>
          </div>
        </div>
        <van-grid direction="horizontal" :column-num="3">
          <van-grid-item icon="comment-o" :text="String(item.comm_count)" />
          <van-grid-item icon="like-o" text="点赞" />
          <van-grid-item icon="share-o" text="分享" />
        </van-grid>
      </div>
    </van-list>
  </div>
</template>

<script>
import { search } from '@/api/search'
export default {
  name: 'search-result',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      query: {
        page: 0,
        per_page: 10,
        q: this.$route.params.key || ''
      }
    }
  },
  methods: {
    async onLoad () {
      this.query.page++
      const res = await search(this.query)
      this.list.push(...res.data.results)
      //   // 加载状态结束
      this.loading = false
      this.finished =
        !res.data.results.length || this.list.length >= res.data.total_count
    }
  },
  created () {
    this.onLoad()
  }
}
</script>

<style lang="less" scoped>
.search-result {
  width:100%;
  .van-list .item {
    .top {
      padding: 32px 16px 16px;
    }
    .content {
      margin: 16px 0;
      .van-image {
        width: 100px;
        margin: 0 5px;
      }
    }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: #000;
    }
    .info {
      & > span {
        margin-right: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
