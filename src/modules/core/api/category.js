import fetch from '@/api/config'

export default {
  // 根据类型获取商品分类列表
  treeCategory(params) {
    return fetch.get('api/admin/v1/category/treeByType', params)
  },
  // 分类列表
  pageCategory(params) {
    return fetch.get('api/admin/v1/category/page', params)
  },
  //添加分类
  addCategory(params) {
    return fetch.json('api/admin/v1/category/insert', params)
  },
  //更新分类
  updateCategory(params) {
    return fetch.json('api/admin/v1/category/update', params)
  },
  //查询分类
  getCategory(params) {
    return fetch.get('api/admin/v1/category/get', params)
  },
  //删除分类
  deleteCategory(params) {
    return fetch.post('api/admin/v1/category/delete', params)
  }
}
