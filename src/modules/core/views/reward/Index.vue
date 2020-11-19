<template>
  <QcNavigationMenu style="width:900px !important;margin-left:80px;padding-bottom:100px" title="系统配置" :path="path"></QcNavigationMenu>
</template>

<script>
export default {
  data() {
    return {
      path: [
        { name: '推荐奖励', url: '/main/core/config/reward/recommend' },
        { name: '平台服务费配置', url: '/main/core/config/reward/svcharge' },
        { name: '丰盈配送配置', url: '/main/core/config/reward/fydelivery' },
        { name: '用户充值折扣', url: '/main/core/config/reward/recharge-setting'},
        { name: '公众号配置', url: '/main/core/config/reward/wechat-setting' },
        { name: '店铺提现配置', url: '/main/core/config/reward/poundage' },
        { name: '买家提现配置', url: '/main/core/config/reward/poundage-member' }
      ]
    }
  }
}
</script>
