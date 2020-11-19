<template>
  <div class="naviagetion-page" :style="{background}">
    <div class="naviagetion-page__header">
      <el-page-header @back="onBack" :title="title" :content="content"></el-page-header>
    </div>
    <div class="naviagetion-page__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '返回'
    },
    content: String,
    background: {
      type: String,
      default: '#fff'
    }
  },
  methods: {
    onBack() {
      this.$router.back()
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss">
.naviagetion-page {
  &__header {
    padding: 20px;
  }
  &__body {
    padding: 20px 20px 20px;
  }
}
</style>
