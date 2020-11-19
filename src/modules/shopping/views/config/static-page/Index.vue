<template>
  <QcNavigationMenu title="静态页面配置" :path="path" style="width:900px;margin:0 auto"></QcNavigationMenu>
</template>

<script>
export default {
  data() {
    return {
      path: [
        { name: '关于我们-买家端', url: '/main/mall/config/static-page/about-us'},
        { name: '关于我们-卖家端', url: '/main/mall/config/static-page/about-us-store'}
      ]
    }
  }
}
</script>
