<template>
  <div>
    <QcTable ref="table" :option="option" :search-form="searchForm" :menu="menu" :column="column"></QcTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updateId: '',
      tableRow: {},
      formVisible: false,
      option: {
        url: 'api/admin/v1/customer/getCustomerList'
        //,showSearchAndReset: false
      },
      searchForm: [
        { value: '', formName: 'mobilePhoneNumber', type: 'input', label: '手机号码' },
        { value: '', formName: 'appellation', type: 'input', label: '昵称' },
        {
          label: '加入时间',
          formName: 'startCreateTime_endCreateTime',
          type: 'date-picker',
          el: {
            //type: 'daterange',
            type: 'datetimerange',
            rangeSeparator: '至',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd HH:mm:ss'
          }
        }
      ],
      menu: [
        {
          type: 'export',
          label: '导出',
          url: this.projectUrl + '/api/admin/v1/customer/export?'
        },
      ],
      column: [
        //{ type: 'index', label: '序号', width: '60px', align: 'center' },
        {
          label: '头像',
          prop: 'headImage',
          formatter: row => {
            return (
              <el-image src={row.headImage} fit="cover" style="width:60px;height:60px;">
                <div slot="error" class="el-image__error">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            )
          }
        },
        {
          label: '手机号',
          prop: 'mobilePhoneNumber'
          //,formatter:row => {
          //return {product:'商品',noskip:'不跳转'}[row.skipType]
          //}
        },
        { label: '昵称', prop: 'appellation' },
        {
          label: '身份类型',
          prop: 'identityType',
          formatter: row => {
            return { personal: '个人', company: '企业' }[row.identityType]
          }
        },
        { label: '联系人姓名', prop: 'custName' },
        { label: '单位名称', prop: 'unitName', align: 'center' },
        {
          label: '账户余额（元）',
          formatter: row => {
            return row.amount / 100
          }
        },
        { label: '成交订单数（单）', prop: 'orderCount' ,
         formatter: row => {
           console.log(row)
           if(row.orderCount!=null){
             row.orderCount = row.orderCount
           }else{
             row.orderCount=0
           }
            return row.orderCount
          }},
        {
          label: '成交金额（元）',
          prop: 'orderAmount',
          formatter: row => {
            return row.orderAmount / 100
          }
        },
        {
          label: '账期金额（元）',
          prop: 'paymentAmount',
          formatter: row => {
            return row.paymentAmount / 100
          }
        },
        { label: '最近登录', prop: 'lastLoginTime' },
        { label: '加入时间', prop: 'joinTime' }
      ]
    }
  },
  methods: {
    exportCust() {
      this.$confirm('是否导出客户列表', '操作提示', {
        confirmButtonText: '导出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.open(this.projectUrl + '/api/admin/v1/customer/export')
      })
    },
    onFormDialogClose(flag) {
      this.updateId = ''
      this.formVisible = false
      if (typeof flag == 'boolean' && flag) {
        this.$refs.table.onSearchKeep()
      }
    }
  }
}
</script>
