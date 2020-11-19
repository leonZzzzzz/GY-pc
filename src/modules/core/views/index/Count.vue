<template>
  <div class="card-count">
    <div class="card-count-icon" :style="`background:${color}`">
      <i :class="`icon iconfont ${icon}`"></i>
    </div>
    <div class="card-count-body">
      <p class="number">
        <slot></slot>
      </p>
      <p class="title">{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#fff'
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card-count {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  height: 100px;
  overflow: hidden;
  border: 1px solid #f3f3f3;
  &-icon {
    padding: 0 15px;
    height: 100px;
    line-height: 100px;
    .icon {
      font-size: 35px;
      color: #fff;
    }
  }
  &-body {
    flex: 1;
    color: #515a6e;
    text-align: center;
    .number {
      font-size: 35px;
    }
    .title {
      font-size: 14px;
      margin-top: 15px;
    }
  }
}
</style>
