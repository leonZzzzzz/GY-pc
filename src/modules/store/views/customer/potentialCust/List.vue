<template>
  <div>
    <QcTable
      ref="table"
      :option="option"
      :search-form="searchForm"
      :menu="menu"
      :column="column"
    ></QcTable>
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
        url: 'api/admin/v1/storePc/customer/potentialCustList'
        //,showSearchAndReset: false
      },
      searchForm: [
        { value: '', formName: 'mobilePhoneNumber', type: 'input', label: '手机号码' },
        { value: '', formName: 'custName', type: 'input', label: '姓名' }
      ],
      menu: [
        {
          type: 'export',
          label: '导出',
          url: this.projectUrl + '/api/admin/v1/storePc/customer/exportPtCust?'
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
        { label: '联系人姓名', prop: 'custName' },
        { label: '购物车商品数量', prop: 'qty' }
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
        window.open(this.projectUrl + '/api/admin/v1/storePc/customer/exportPtCust')
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
