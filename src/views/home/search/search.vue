<template>
  <div class="search">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    >
    </van-search>
    <section class="history">
      <van-cell center>
        <span slot="title" class="title black">搜索历史</span>
        <van-icon name="delete" class="black" />
      </van-cell>
      <van-cell center>
        <i class="van-icon van-icon-search" slot="icon"></i>
        <span slot="title" class="title">黑马程序猿</span>
        <van-icon name="cross" />
      </van-cell>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  components: {},
  methods: {
    onSearch (val) {},
    onCancel () {}
  }
}
</script>

<style lang="less" scoped>
.search {
  min-height: 100%;
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

  .history {
    padding-top: 4px;
    .van-cell {
      padding: 0px 15px;
      height: 45px;
      background: #ffffff;
      .van-icon {
        font-size: 12px;
        color: #c9c9c9;
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
