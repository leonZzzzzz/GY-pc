<template>
  <div>
    <QcTable ref="table" :option="option" :search-form="searchForm" :menu="menu" :column="column"></QcTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        isFull:true,
        url: '/api/admin/v1/salesman/page' //请求接口
      },
      searchForm: [
        { label: '业务员姓名', formName: 'name', type: 'input',newType:'storeName'},
        { label: '手机号', formName: 'mobile', type: 'input'},
        {
          label: '交易时间',
          formName: 'startTime_endTime',
          type: 'date-picker',
          el: {
            type: 'daterange',
            rangeSeparator: '至',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd'
          }
        }
      ],
      menu: [
        {
          type: 'primary',
          label: '添加',
          on: () => {
            this.$router.push('/main/mall/salesman/form')
          }
        },
        {
          type: 'export',
          label: '导出',
          url: this.projectUrl + '/api/admin/v1/salesman/export?'
        }
      ],
      column: [
        { label: '业务员', prop: 'name', align: 'center' },
        { label: '手机号', prop: 'mobile', align: 'center' },
        // { label: '店铺名称', prop: 'storeName', align: 'center' },
        // { label: '总客户数（个）', prop: 'customerNum', align: 'center' },
        // { label: '累计订单总金额（元）', prop: 'orderMoney', align: 'center' },
        // { label: '累计交易服务费（元）', prop: 'transactionFee', align: 'center' },
        // { label: '提成比例（%）', prop: 'rateText', align: 'center' },
        { label: '累计提成金额（元）', prop: 'totalAmount', align: 'center' },
        { label: '添加时间', prop: 'createTime', align: 'center' },
        {
          label: '操作',
          align: 'center',
          formatter: row => {
            return (
              <div>
              <el-button
                  type="text"
                  onClick={() => this.$router.push(`/main/mall/salesman/Slist?id=${row.id}`)}
                >
                  查看关联店铺
                </el-button>
              </div>
            )
          }
        }
      ],
      model: {
        type: this.type,
        name: '',
        info: '',
        seqNum: '',
        storeInfo: ''
      },
      visible: false
    }
  },

  methods: {
    //导出数据
    exportStore(search) {
      console.log('search', search)
      let params = ''
      params =
        params +
        '&pageNum=' +
        search['pageNum'] +
        '&pageSize=' +
        search['pageSize'] +
        '&total=' +
        search['total']
      if (search['name']) {
        params = params + '&name=' + search['name']
      }
      if (search['storeName']) {
        params = params + '&storeName=' + search['storeName']
      }
      if (search['startTime_endTime']) {
        params =
          params +
          '&startTime=' +
          search['startTime_endTime'][0] +
          '&endTime=' +
          search['startTime_endTime'][1]
      }

      console.log('params', params)
      let export_url = 'platform/salesman/index?export=1' + params
      console.log(export_url)

      location.href = export_url
    },
    changeStatus(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.deleteSalesMember({ id }).then(() => {
            this.$message.success('删除成功')
            this.$refs.table.onSearchKeep()
          })
        })
        .catch(() => {
          return
        })
    }
  }
}
</script>

<style>
form > label {
  width: 90px;
}
</style>
