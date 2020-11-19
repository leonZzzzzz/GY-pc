import fetch from '@/api/config'

export default {
  //商户列表
  page(params) {
    return fetch.get('api/admin/v1/store/registration/pageAllStore', params)
  },
  // 查询商户
  getStore(params) {
    return fetch.get('api/admin/mall/v1/store/get', params)
  },
  //删除商户
  deleteStore(params) {
    return fetch.post('api/admin/mall/v1/store/delete', params)
  },
  // 业务员列表
  salesdata(params){
    return fetch.get('api/admin/v1/salesman/page',params)
  },
  // 业务员关联的买家列表
  salesdetail(params){
    return fetch.get('api/admin/v1/salesman/detailPage',params)
  },
  // 新增业务员
  insertSalesman(params){
    return fetch.json('api/admin/v1/salesman/insertSalesman',params)
  },
  //添加商户
  addStore(params) {
    return fetch.json('api/admin/mall/v1/store/add', params)
  },
  //更新客户
  updateStore(params) {
    return fetch.json('api/admin/mall/v1/store/update', params)
  },
  //查看所有的保证金
  listBaseConfigByParentId(params) {
    return fetch.get('api/admin/v1/config/listByParentId',params)
  },
  auditStoreStatus(params){
    return fetch.post('api/admin/v1/store/registration/auditStore',params)
  },
  listStoreCategory(params){
    return fetch.get('api/v1/category/listByType',params)
  },
  exportStore(){
    return fetch.get('api/admin/v1/store/registration/exportStore');
  },
  changeStatus(params){
    return fetch.post('api/admin/v1/store/registration/changeStatus',params);
  },
  changeEndDate(params){
    return fetch.post('api/admin/v1/store/registration/changeEndDate',params);
  },
  changeMargin(params){
    return fetch.post('api/admin/v1/store/registration/changeMargin',params);
  },
  changeStatus(params){
    return fetch.post('api/admin/v1/store/registration/changeStatus',params);
  },
  stDelivery(params){
    return fetch.post('api/admin/v1/store/registration/stDelivery',params);
  },
  stCharges(params){
    return fetch.post('api/store/v1/registration/stCharges',params);
  },
  getSalesByMobile(params){
    return fetch.get('api/admin/v1/salesman/getSalesByMobile',params);
  },
  rebackBzj(params){
    return fetch.post('api/admin/v1/store/refundEarnest',params);
  },
  updateDateDays(params){
    return fetch.post('api/admin/v1/store/registration/updateDateDays',params);
  },
  updateStorePhones(params){
    return fetch.post('api/admin/v1/store/registration/updateStorePhones',params);
  }
}
