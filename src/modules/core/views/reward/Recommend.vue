<template>
  <div>
    <p>推荐奖励配置</p>
    <Form parent-id="recommend_setting"></Form>
  </div>
</template>

<script>
import Form from './Form'
export default {
  components: {
    Form
  }
}
</script>
<style lang="scss" scoped>
  p {
    margin-top: 80px;
    margin-left: 80px;
    font-size: 20px;
    font-weight: 600;
  }
</style>