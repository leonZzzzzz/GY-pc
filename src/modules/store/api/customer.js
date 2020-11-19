import fetch from '@/api/config'

export default {
  //根据手机号查询用户
  listByPhoneNum(params) {
    return fetch.get('api/admin/v1/storePc/customer/listByMobile', params)
  },
  //添加账期客户
  addPaymentCustomer(params) {
    return fetch.post('api/admin/v1/storePc/paymentDays/inserts',params)
  },
  //启用或停用账期客户
  changePaymentCustStatus(params) {
    return fetch.post('api/admin/v1/storePc/paymentDays/changeStatus',params)
  },
  //修改账期客户信息
  updatePaymentCustomer(params) {
    return fetch.post('api/admin/v1/storePc/paymentDays/updates',params)
  },
  /**
   * 标记老客户
   */
  addOldCust(params) {
    return fetch.post("api/admin/v1/store/oldCust/add", params);
  },
  /**
   * 取消标记老客户
   */
  cancelOldCust(params) {
    return fetch.post("api/admin/v1/store/oldCust/delete", params);
  }
}
