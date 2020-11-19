import fetch from '@/api/config'

export default {
  // 配置订单服务费
  settingSvcharge(params) {
    return fetch.post('/api/admin/v1/serviceChargeCategory/dispose', params)
  },
  // 获取一级分类服务费配置
  getSvCharge(params) {
    return fetch.get('/api/admin/v1/serviceChargeCategory/page',params)
  }
}
