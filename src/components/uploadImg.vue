<template>
  <div class="upload">
    <van-uploader
      multiple
      :before-read="beforeRead"
      :after-read="afterRead"
      :preview-image="false"
      ><i class="iconfont" v-html="icon"></i>
    </van-uploader>
  </div>
</template>
<script>
export default {
  name: 'upload-img',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    icon: {
      type: String,
      default: '&#xe50e;'
    }
  },
  data () {
    return {}
  },
  methods: {
    beforeRead (file) {
      return true
    },
    afterRead (res) {
      res.status = 'uploading'
      this.$emit(
        'input',
        Array.isArray(res) ? res.map(v => v.content) : [res.content]
      )
      res.status = 'done'
    }
  }
}
</script>
<style lang="less"></style>
