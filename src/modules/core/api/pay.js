import fetch from '@/api/config'

export default {
  addPayment(params) {
    return fetch.post('api/admin/v1/wxpayConfig/insert', params)
  },
  deletePayment(params) {
    return fetch.post('api/admin/v1/wxpayConfig/delete', params)
  },
  updatePayment(params) {
    return fetch.post('api/admin/v1/wxpayConfig/update', params)
  },
  getPayment(params) {
    return fetch.get('api/admin/v1/wxpayConfig/get', params)
  },
  pagePayment() {
    return fetch.get('api/admin/v1/wxpayConfig/page')
  }
}
