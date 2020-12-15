<template>
  <div class="search-result">
    <navBar title="搜索结果"></navBar>
    <div class="keyword">{{ keyword }}</div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="item">
        <div class="top">
          <h4 class="title van-multi-ellipsis--l2">
            跟着疯子学jiava罚款跟着疯子学jiava罚款跟着疯子学jiava罚款跟着疯子学jiava罚款跟着疯子学jiava罚款跟着疯子学jiava罚款跟着疯子学jiava罚款跟着疯子学jiava罚款
          </h4>
          <div class="content">fadfsafd</div>
          <div class="info">
            <span class="author">作者</span>
            <span class="comment">0 评论</span>
            <span class="time">2 年内</span>
          </div>
        </div>
        <van-grid direction="horizontal" :column-num="3">
          <van-grid-item icon="comment-o" text="0" />
          <van-grid-item icon="like-o" text="点赞" />
          <van-grid-item icon="share-o" text="分享" />
        </van-grid>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'search-result',
  data () {
    return {
      keyword: this.$route.params.key,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  .van-list .item {
    .top {
      padding: 32px 16px 16px;
    }
    .content {
      margin: 16px 0;
    }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: #000;
    }
    .info {
      & > span {
        margin-left: 10px;
      }
    }
  }
}
</style>
