import fetch from '@/api/config'

export default {
  //新增商户优惠券规则
  addStoreCoupon(params) {
    return fetch.post('api/admin/v1.1/store-coupon-rule/insert',params)
  },
  //修改商户优惠券
  updateStoreCoupon(params) {
    return fetch.post('api/admin/v1.1/store-coupon-rule/update',params)
  },
  //删除商户优惠券
  deleteStoreCoupon(params) {
    return fetch.post('/api/admin/v1.1/store-coupon-rule/deleted',params)
  }
}
