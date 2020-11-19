import fetch from '@/api/config'

export default {
  addDriver(params) {
    return fetch.post(`api/admin/v1/guyuDriver/insert`, params)
  },
  frozenDriver(params) {
    return fetch.post(`api/admin/v1/guyuDriver/frozen`, params)
  },
  updateDriver(params) {
    return fetch.post(`api/admin/v1/guyuDriver/update`, params)
  }
}
