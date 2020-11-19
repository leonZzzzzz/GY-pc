import fetch from '@/api/config'
import { PROJECT_PATH } from './project-path'
export default {
  // 各项订单总数
  countOrder() {
    return fetch.get(`${PROJECT_PATH}order/selectOrderCount`)
  },
  // 各项订单总数
  countOrderForGuyu(params) {
    return fetch.get(`api/admin/mall/v1/guyuOrder/getStatusQuantity`, params)
  },
  // 查看订单
  getOrder(params) {
    return fetch.get(`${PROJECT_PATH}order/detail`, params)
  },
  // 送货单详情
  getDeliveryNote(params) {
    return fetch.get(`api/admin/v1/deliveryNote/get`, params)
  },
  // 添加送货单司机信息
  addDriverDeliveryNote(params) {
    return fetch.post('api/admin/v1/deliveryNote/addDriver', params)
  },
  // 添加结算信息
  addSettleDeliveryNote(params) {
    return fetch.post('api/admin/v1/deliveryNote/addFreightInfo', params)
  },
  confirmSupplementOrder(params) {
    return fetch.post(`api/admin/mall/v1/store/guyuOrder/confirmSupplementOrder`, params)
  },
  cancelSupplementOrder(params) {
    return fetch.post(`api/admin/mall/v1/store/guyuOrder/cancelSupplementOrder`, params)
  },
  //#region 拼团参团订单
  getListJoinOrder(params) {
    return fetch.get(`api/admin/mall/v1/groupOrder/listJoinOrder`, params)
  },
  //#endregion
  //#region 订单发货
  addExpress(params) {
    return fetch.json(`${PROJECT_PATH}order-express-bill/insert`, params)
  },
  addGuyuExpress(params) {
    return fetch.post(`api/admin/mall/v1/order/deliver`, params)
  },
  updateExpress(params) {
    return fetch.post(`${PROJECT_PATH}order-express-bill/update`, params)
  },
  // 获取包裹信息
  pageExpress(params) {
    return fetch.get(`${PROJECT_PATH}order-express-bill/get-by-order`, params)
  },
  //#endregion

  //#region  订单退款
  addRrderRefund(params) {
    return fetch.json(`${PROJECT_PATH}after-sale/refund/insert`, params)
  },
  // 订单退款的选项
  orderRefundReasonType(params) {
    return fetch.get(`${PROJECT_PATH}after-sale/refund/reason-type`, params)
  },
  //#endregion

  //#region 订单赔付
  orderCompensationReasonType(params) {
    return fetch.get('api/mall/v1/order-compensation/reason-type', params)
  },
  addOrderCompensation(params) {
    return fetch.post(`${PROJECT_PATH}order-compensation/apply`, params)
  },
  statusOrderCompensation(params) {
    return fetch.get(`${PROJECT_PATH}order/get-compensation-status`, params)
  },
  countOrderCompensation() {
    return fetch.get(`${PROJECT_PATH}order-compensation/count-by-status`)
  },
  pageOrderCompensation(params) {
    return fetch.get(`${PROJECT_PATH}order-compensation/page`, params)
  },
  getOrderCompensation(params) {
    return fetch.get(`${PROJECT_PATH}order-compensation/get`, params)
  },
  cancelOrderCompensation(params) {
    return fetch.post(`${PROJECT_PATH}order-compensation/cancel`, params)
  },
  agreeOrderCompensation(params) {
    return fetch.post(`${PROJECT_PATH}order-compensation/agree`, params)
  },
  historyOrderCompensation(params) {
    return fetch.get(`${PROJECT_PATH}order-compensation/list-by-order`, params)
  },
  //#endregion

  addOrderDriver(params) {
    return fetch.post('api/admin/v1/orderDriver/insert', params)
  },
  updateOrderDriver(params) {
    return fetch.post('api/admin/v1/orderDriver/update', params)
  },
  //关闭普通订单
  closeNomalOrder(params) {
    return fetch.post('api/admin/mall/v1/order/cancel', params)
  },
  //关闭补单
  closeSupOrder(params) {
    return fetch.post('api/admin/mall/v1/store/guyuOrder/cancelSupplementOrder', params)
  },
  //关闭补单
  updateOrderRemark(params) {
    return fetch.post('api/admin/mall/v1/store/guyuOrder/updateRemark', params)
  },
  // 修改订单金额
  adjustOrderAmount(params) {
    return fetch.post('api/admin/mall/v1/store/guyuOrder/adjustAmount', params)
  },
  finishInvoice(params) {
    return fetch.post('api/admin/mall/v1/store/guyuOrder/finishInvoice', params)
  }
}
