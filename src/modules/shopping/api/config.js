import fetch from '@/api/config'
export default {
  // 物流
  getLogisticsCompanyList(params) {
    return fetch.get('api/admin/v1/config/listByParentId', params)
  },
  addLogisticsCompany(params) {
    return fetch.json('api/admin/v1/config/insert', params)
  },
  updateLogisticsCompany(params) {
    return fetch.json('api/admin/v1/config/update', params)
  },
  deleteLogisticsCompany(params) {
    return fetch.post('api/admin/v1/config/delete', params)
  },
  addPlatformCouponRule(params) {
    return fetch.post('api/admin/v1.1/platform-coupon-rule/insert',params)
  },
  updatePlatformCouponRule(params) {
    return fetch.post('api/admin/v1.1/platform-coupon-rule/update',params)
  },
  abortPlatformCouponRule(params) {
    return fetch.post('api/admin/v1/coupon_rule/abort',params)
  },
  publishPlatformCouponRule(params) {
    return fetch.post('api/admin/v1/coupon_rule/publish',params)
  },
  //删除商户优惠券
  deletePlatformCoupon(params) {
    return fetch.post('/api/admin/v1.1/platform-coupon-rule/deleted',params)
  },
  getStaticPageAboutUs() {
    return fetch.get('/api/v1/staticConfig/about_us')
  },
  getStaticPageAboutUsStore() {
    return fetch.get('/api/v1/staticConfig/about_us_store')
  },
  updateStaticPageSetting(params) {
    return fetch.post('/api/admin/v1/staticConfig/updateConfig', params)
  },
  getCouonRuleDetail(params){
    return fetch.get('/api/admin/v1.1/platform-coupon-rule/getDetail', params)
  },
  recommendReward(params){
    return fetch.post('/api/admin/v1.1/platform-coupon-rule/recommendReward', params)
  },
  getConfigByKey(params){
    return fetch.get('api/admin/v1/config/'+params)
  },
  getAgreementByTpey(params) {
    return fetch.get('api/admin/v1/staticConfig/agreement/get', params)
  },
  updateAgreement(params) {
    return fetch.post('api/admin/v1/staticConfig/agreement/update', params)
  },

  // 添加运费补贴
  addTransporDiscountt(params) {
    return fetch.post('api/admin/v1/platform-transport-amount-discount/insert', params)
  },
  // 修改运费补贴
  updateTransporDiscountt(params) {
    return fetch.post('api/admin/v1/platform-transport-amount-discount/update', params)
  },
  // 删除运费补贴
  delTransporDiscountt(params) {
    return fetch.post('api/admin/v1/platform-transport-amount-discount/delete', params)
  },
  // 运费补贴详情
  getTransporDiscountt(params) {
    return fetch.get('api/admin/v1/platform-transport-amount-discount/get', params)
  },
}
