<template>
  <div class="qc">
    <img src="@/assets/image/qc.png" alt="企成科技提供技术支持">
  </div>
</template>

<script>
export default {
  props: {
    fixed: {
      default: true,
      type: Boolean
    },
    bottom: {
      default: '0px',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.qc {
  overflow: hidden;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  line-height: 0;
  // height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: #f2f2f2;
  img {
    // width: 100%;
    width: 210px;
  }
}
</style>
