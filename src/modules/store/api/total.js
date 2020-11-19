import fetch from '@/api/config'

export default {
  //实时概况
  storeRealTimeSituation(params) {
    return fetch.get('/api/admin/v1/store/registration/indexData',params)
  },
  //店铺昨日数据
  indexDataYesterday() {
    return fetch.get('/api/admin/v1/store/registration/indexDataYesterday')
  },
  addPrinter(params){
    return fetch.post('/api/admin/v1/printer/insert',params)
  },
  getPrinterByType(params){
    return fetch.get('/api/admin/v1/printer/getPrinterByType',params)
  },
  // 删除系统配置
  deleteConfigItem(params) {
    return fetch.post('api/admin/v1/config/delete', params)
  },
  // 打标签
  printLabel(params) {
    return fetch.post('api/admin/v1/printer/printLabel', params)
  },
  // 打标签获取订单未退款商品
  printLabelGetOrderItems(params) {
    return fetch.get('api/admin/mall/v1/guyuOrder/getOrderItems', params)
  },

}
