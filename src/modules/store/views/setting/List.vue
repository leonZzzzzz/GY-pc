<template>
  <QcNavigationMenu style="width:800px;margin-left:80px;padding-bottom:100px" title="店铺配置" :path="path"></QcNavigationMenu>
</template>

<script>
export default {
  data() {
    return {
      path: [
        { name: '开票配置', url: '/main/store/setting/list/invoice'}
        // { name: '其他配置', url: '/main/store/setting/list/others' }
      ]
    }
  }
}
</script>
