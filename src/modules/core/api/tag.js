import fetch from '@/api/config'

export default {
  // 标签列表
  pageTag(params) {
    return fetch.get('api/admin/v1/tag/page', params)
  },
  // 添加标签
  addTag(params) {
    return fetch.json('api/admin/v1/tag/insert', params)
  },
  // 更新标签
  updateTag(params) {
    return fetch.json('api/admin/v1/tag/update', params)
  },
  // 查看标签
  getTag(params) {
    return fetch.get('api/admin/v1/tag/get', params)
  },
  // 删除标签
  deleteTag(params) {
    return fetch.post('api/admin/v1/tag/delete', params)
  },
}
