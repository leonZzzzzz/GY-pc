import fetch from '@/api/config'

export default {
  // 新增店铺轮播
  addStoreCarousel(params) {
    return fetch.post('api/admin/v1/storePc/storePcCarousel/inserts', params)
  },
  // 轮播详情
  getStoreCarousel(params) {
    return fetch.get('api/admin/v1/storePc/storePcCarousel/get', params)
  },
  // 修改店铺轮播
  updateStoreCarousel(params) {
    return fetch.post('api/admin/v1/storePc/storePcCarousel/update', params)
  },
  // 删除店铺轮播
  deleteStoreCarousel(params) {
    return fetch.post('api/admin/v1/storePc/storePcCarousel/delete', params)
  }
}
