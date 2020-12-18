<template>
  <div class="search">
    <van-sticky>
      <van-search
        v-model.trim="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @input="suggest"
      >
      </van-search>
    </van-sticky>

    <section v-if="value.length" class="suggestion">
      <van-cell center>
        <span slot="title" class="title black">你是否要搜索？</span>
      </van-cell>
      <van-cell
        center
        v-for="(item, index) in suggestion"
        :key="index"
        @click="goSearch(item)"
      >
        <i class="van-icon van-icon-search" slot="icon"></i>
        <span slot="title" class="title black" v-html="item"></span>
      </van-cell>
    </section>
    <section v-else class="history">
      <van-cell center>
        <span slot="title" class="title black">搜索历史</span>
        <van-icon name="delete" class="black" @click.stop="clearHistory()" />
      </van-cell>
      <van-cell
        center
        v-for="(item, index) in history"
        :key="index"
        @click="goSearch(item)"
      >
        <i class="van-icon van-icon-search" slot="icon"></i>
        <span slot="title" class="title">{{ item }}</span>
        <van-icon name="cross" @click.stop="clearHistory(index)" />
      </van-cell>
    </section>
  </div>
</template>

<script>
import { searchCache } from '@/utils/storage'
import { suggestion } from '@/api/search'
export default {
  name: 'search-page',
  data () {
    return {
      value: '',
      suggestion: [],
      history: []
    }
  },
  methods: {
    /** 搜索 */
    goSearch (v) {
      this.$router.push(`/searchResult/${v.replace(/<[^>]+>/g, '')}`)
    },
    onSearch (val) {
      if (this.value.length) {
        if (!this.history.includes(this.value)) {
          this.history.unshift(this.value)
          searchCache.set(this.history)
        }
        // 路由跳转
        this.goSearch(this.value)
      }
    },
    // 联想搜索
    async suggest (v) {
      if (this.value.length) {
        const res = await suggestion(v)
        this.suggestion = res.data.options.map(
          v => this.$options.filters.highLight(v, this.value) // 高亮处理
        )
      }
    },
    // 清除历史
    clearHistory (index = null) {
      if (index === null) {
        this.$dialog
          .confirm({
            title: '提示',
            message: '是否删除所有历史'
          })
          .then(() => {
            this.history = []
          })
          .catch(() => {})
      } else {
        this.history.splice(index, 1)
      }
      searchCache.set(this.history)
    }
  },
  created () {
    this.history = searchCache.get() || []
  }
}
</script>

<style lang="less" scoped>
.search {
  min-height: 100%;
  width: 100%;
  background-color: #f5f7f9;
  .van-search {
    padding: 8px 15px;
    font-size: 12px;
    background-color: #3296fa;
    .van-cell {
      height: 28px;
      line-height: 28px;
      display: flex;
      align-items: center;
    }

    /deep/ .van-field__control {
      font-size: 12px;
    }
  }
  /deep/ .van-icon {
    font-size: 12px;
    margin-left: 9px;
  }
  /deep/ .van-search__action {
    color: #fff;
    margin-left: 12px;
  }

  .history,
  .suggestion {
    padding-top: 4px;
    .van-cell {
      padding: 0 15px;
      height: 45px;
      background: #ffffff;
      .van-icon {
        font-size: 12px;
        color: #c9c9c9;
      }
      .van-cell__title {
        // overflow: hidden;
        // white-space: nowrap;
        // text-overflow: ellipsis;
      }
      .title {
        font-size: 12px;
        color: #3296fa;
        letter-spacing: 1px;
        margin-left: 9px;
      }
      .black {
        color: #000;
      }
    }
  }
}
</style>
