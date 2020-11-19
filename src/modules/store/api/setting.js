import fetch from '@/api/config'

export default {

  //是否支持开票
  setInvoice(params) {
    return fetch.post('api/admin/v1/store/registration/setInvoice',params)
  },
  //获取店铺详情
  getStoreDetail() {
    return fetch.get('api/admin/v1/store/registration/getStoreDetail')
  }
  
}
