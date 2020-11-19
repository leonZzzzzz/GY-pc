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
        // url: '/api/admin/v1/salesman/salesmanMemberPage', //请求接口
        url: '/api/admin/v1/salesman/page' //请求接口
      },
      searchForm: [
        { label: '业务员姓名', formName: 'name', type: 'input' },
        { label: '手机号', formName: 'mobile', type: 'input' },
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
            this.$router.push('/main/mall/salesman/member/form')
          }
        },
        {
          type: 'export',
          label: '导出',
          url: this.projectUrl + '/api/admin/v1/salesman/exportSalesman?'
        }
      ],
      column: [
        { label: '业务员', prop: 'name', align: 'center' },
        { label: '手机号', prop: 'mobile', align: 'center' },
        // { label: '用户名称', prop: 'nickName', align: 'center' },
        { label: '累计提成金额（元）', prop: 'totalAmount', align: 'center' },
        // { label: '提成比例（%）', prop: 'rateText', align: 'center' },
        // { label: '提成金额（元）', prop: 'rateMoney', align: 'center' },
        { label: '添加时间', prop: 'createTime', align: 'center' },
        {
          label: '操作',
          align: 'center',
          formatter: row => {
            return (
              <div>
                <el-button
                  type="text"
                  onClick={() => this.$router.push(`/main/mall/salesman/member/Slist?id=${row.id}`)}
                >
                  查看关联用户
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
    changeStatus(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.deleteSalesman({ id }).then(() => {
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
