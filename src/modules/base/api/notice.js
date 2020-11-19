import fetch from '@/api/config'

export default {
  //新增公告
  addNotice(params) {
    return fetch.post('api/admin/v1/Notice/inserts', params)
  },
  //修改公告
  updateNotice(params) {
    return fetch.post('api/admin/v1/Notice/updates', params)
  },
  //改变公告状态
  changeNoticeStatus(params) {
    return fetch.post('api/admin/v1/Notice/changeStatus', params)
  },
  //公告详情
  getNotice(params) {
    return fetch.get('api/admin/v1/Notice/get', params)
  },
  //删除公告
  deleteNotice(params) {
    return fetch.post('api/admin/v1/Notice/delete', params)
  }
}
