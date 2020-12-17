<template>
  <div class="upload">
    <van-uploader :before-read="beforeRead" :after-read="afterRead">
      <slot name="title">{{ title }}</slot>
    </van-uploader>
  </div>
</template>
<script>
export default {
  name: 'upload-img',
  data () {
    return {
      preview: false
    }
  },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    beforeRead (file) {
      return true
    },
    afterRead (res) {
      this.preview = true
      res.status = 'uploading'
      this.$emit('input', res.content)
      res.status = 'done'
    }
  }
}
</script>
<style lang="less">
.upload {
  text-align: center;
}
</style>
