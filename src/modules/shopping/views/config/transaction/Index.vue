<template>
  <QcNavigationMenu
    style="width:880px;margin:0 auto;"
    title="交易配置"
    :path="path"
  ></QcNavigationMenu>
</template>

<script>
export default {
  data() {
    return {
      path: [
        { name: '订单配置', url: '/main/mall/config/transaction/order' }
        //  { name: '运费配置', url: '/main/mall/config/transaction/logistics' }
      ]
    }
  }
}
</script>
