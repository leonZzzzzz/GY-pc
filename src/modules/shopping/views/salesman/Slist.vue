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
        url: '/api/admin/v1/salesman/salesmanPage' //请求接口
      },
      searchForm: [
        {value: this.id,formName:'salesId'},
        { value:'',label: '店铺名称', formName: 'nickName', type: 'input' },
        // { value:'', label: '手机号', formName: 'mobile', type: 'input' },
        { value:'',
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
        },
        
      ],
     menu: [
        {
          type: 'primary',
          label: '添加用户',
          on: () => {
            this.$router.push('/main/mall/salesman/SlistFrom?id='+this.model.salesId)
          }
          // on: () => {
          //   this.$router.push('/main/mall/salesman/form')
          // }
        },
        {
          type: 'export',
          label: '导出',
          url: this.projectUrl + '/api/admin/v1/salesman/export?'
        }
      ],
      column: [
        // { label: '业务员', prop: 'name', align: 'center' },
        // { label: '手机号', prop: 'mobile', align: 'center' },
        { label: '店铺名称', prop: 'storeName', align: 'center' },
        { label: '总客户数（个）', prop: 'customerNum', align: 'center' },
        { label: '累计订单总金额（元）', prop: 'orderMoney', align: 'center' },
        { label: '累计交易服务费（元）', prop: 'transactionFee', align: 'center' },
        { label: '提成比例（%）', prop: 'rateText', align: 'center' },
        { label: '提成金额（元）', prop: 'totalAmount', align: 'center' },
        { label: '添加时间', prop: 'createTime', align: 'center' },
        {
          label: '操作',
          align: 'center',
          formatter: row => {
            return (
              <div>
                <el-button
                  type="text"
                  onClick={() => this.$router.push(`/main/mall/salesman/form?id=${row.id}`)}
                >
                  修改提成比例
                </el-button>
                <el-button type="text" onClick={this.changeStatus.bind(this, row.id)}>
                  删除
                </el-button>
              </div>
            )
          }
        }
      ],
      model: {      
        nickName:'',
        mobile:'',
        startTime:'',
        endTime:'',
        salesId:'',
      },
      visible: false
    }
  },
    created() {
    console.log('query-salesId-->',this.$route.query);
    let id=this.$route.query.id;
    this.model.salesId=id
    this.searchForm[0].value = id
    //传递了店铺ID(sid)过来当查询条件
    // if(id){
    //   this.inputVisible=true
    // }

    // this.$route.query.id && this.getSalesman()
  },
  methods: {
    //导出数据
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
