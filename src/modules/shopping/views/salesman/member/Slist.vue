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
        url: '/api/admin/v1/salesman/detailPage' //请求接口
      },
      searchForm: [
        {value: this.id,formName:'salesId'},
        { value:'',label: '用户姓名', formName: 'nickName', type: 'input' },
        { value:'', label: '手机号', formName: 'mobile', type: 'input' },
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
            this.$router.push('/main/mall/salesman/member/form?id='+this.model.salesId)
          }
        },
        {
          type: 'export',
          label: '导出',
          url: this.projectUrl + '/api/admin/v1/salesman/exportMemberSales?'
        }
      ],
      column: [
        { label: '用户名称', prop: 'nickName', align: 'center' },
        { label: '手机号', prop: 'mobile', align: 'center' },
        { label: '累计订单金额（元）', prop: 'orderMoney', align: 'center' },
        { label: '提成比例（%）', prop: 'rateText', align: 'center' },
        { label: '提成金额（元）', prop: 'rateMoney', align: 'center' },
        {
          label: '操作',
          align: 'center',
          formatter: row => {
            return (
              <div>
                <el-button
                  type="text"
                  onClick={() => this.$router.push(`/main/mall/salesman/member/SlistFrom?id=${row.id}`)}
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
