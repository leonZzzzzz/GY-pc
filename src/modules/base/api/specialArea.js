import fetch from '@/api/config'

export default {
  //新增商品专区
  addSpecialArea(params) {
    return fetch.json('api/admin/v1/SpArea/inserts', params)
  },
  //修改商品专区
  updateSpecialArea(params) {
    return fetch.json('api/admin/v1/SpArea/updates', params)
  },
  //删除商品专区
  deleteSpecialArea(params) {
    return fetch.post('api/admin/v1/SpArea/delete', params)
  },
  //查看专区列表
  listSpecialArea(params) {
    return fetch.post('api/admin/v1/SpArea/page', params)
  },
  //查看专区详情
  getSpecialArea(params) {
    return fetch.get('api/admin/v1/SpArea/get', params)
  },
}
