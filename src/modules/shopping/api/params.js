import fetch from '@/api/config'
import { PROJECT_PATH } from './project-path'
export default {
  listParams(params) {
    return fetch.get(`${PROJECT_PATH}productParamCategory/listByCategoryId`, params)
  },
  pageParams(params) {
    return fetch.get(`${PROJECT_PATH}productParamCategory/page`, params)
  },
  addParams(params) {
    return fetch.json(`${PROJECT_PATH}productParamCategory/add`, params)
  },
  deleteParams(params) {
    return fetch.post(`${PROJECT_PATH}productParamCategory/delete`, params)
  },
  updateParams(params) {
    return fetch.json(`${PROJECT_PATH}productParamCategory/update`, params)
  }
}
