import fetch from '@/api/config'

export default {
    //业务员-关联信息查询
    getSalesman(params) {
        return fetch.get('api/admin/v1/salesman/get', params)
    },
    //业务员详情
    getSalesmanById(params) {
        return fetch.get('api/admin/v1/salesman/getSalesman', params)
    },
    //增加业务员
    addSalesman(params) {
        return fetch.post('api/admin/v1/salesman/addSalesman', params)
    },
    //更新业务员
    updateSalesman(params) {
        return fetch.post('api/admin/v1/salesman/update', params)
    },
    //删除业务员
    deleteSalesman(params) {
        return fetch.post('api/admin/v1/salesman/deleted', params)
    },
    //删除业务员关联的用户
    deleteSalesMember(params) {
        return fetch.post('api/admin/v1/salesman/deleteSalesMember', params)
    } 
}
