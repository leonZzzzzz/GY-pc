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
import { rosybrown } from 'color-name';
export default {
  data() {
    return {
      updateId: '',
      tableRow: {},
      formVisible: false,
      option: {
        url: 'api/admin/v1/storePc/customer/orderCustList'
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
          url: this.projectUrl + '/api/admin/v1/storePc/customer/export?'
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
        { label: '成交订单数（单）', prop: 'orderTotal' },
        {
          label: '成交金额（元）',
          prop: 'tradingAmount',
          formatter: row => {
            return row.tradingAmount / 100
          }
        },
        { label: '退款笔数（笔）', prop: 'refundTotal' },
        { label: '客户标识', prop: 'memberType', formatter: row => {
          return (
            <div>
              {row.storeType == 'oldcust' 
                ? <el-tag type="info">老客户</el-tag>
                : row.memberType == 'newcust' ? <el-tag type="success">新客户</el-tag>
                : row.memberType == 'oldcust' ? <el-tag type="info">老客户</el-tag>
                : row.memberType == 'commomccust' ? <el-tag type="info">普通</el-tag>
                : ''
              }
            </div>
          )
        }},
        {
          label: '操作',
          align: 'center',
          width: '150px',
          formatter: row => {
            return (
              <div>
              {
                (row.storeType == 'oldcust' || row.memberType == 'oldcust')
                ? <el-button type="text" onClick={() => { this.onCancelOldCust(row.memberId)  }}>取消老客户</el-button>
                : <el-button type="text" onClick={() => { this.onAddOldCust(row.memberId)  }}>标记为老客户</el-button>
              }
              </div>
            )
          }
        }
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
        window.open(this.projectUrl + '/api/admin/v1/storePc/customer/export')
      })
    },
    onFormDialogClose(flag) {
      this.updateId = ''
      this.formVisible = false
      if (typeof flag == 'boolean' && flag) {
        this.$refs.table.onSearchKeep()
      }
    },
    async onAddOldCust(memberId) {
      await this.$http.addOldCust({memberId})
      this.$message.success('已标记')
      this.$refs.table.onSearchKeep()
    },
    async onCancelOldCust(memberId) {
      await this.$http.cancelOldCust({memberId})
      this.$message.success('已取消')
      this.$refs.table.onSearchKeep()
    }
  }
}
</script>
