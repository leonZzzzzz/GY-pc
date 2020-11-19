<template>
  <div>
    <QcTable ref="table" :option="option" :search-form="searchForm" :menu="menu" :column="column"></QcTable>
    <el-dialog
      title="司机信息"
      width="300px"
      append-to-body
      :close-on-click-modal="false"
      :visible="formVisible"
      :before-close="onClose"
    >
      <el-form ref="model" :model="model" label-position="right" label-width="80px">
        <el-form-item label="姓名" prop="driverName" :rules="[{ required: true, message: '该项为必填项' }]">
          <el-input v-model="model.driverName"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phoneNumber"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-input v-model="model.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" prop="carNumber" :rules="[{ required: true, message: '该项为必填项' }]">
          <el-input v-model="model.carNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="onClose()">关闭</el-button>
        <el-button type="primary" @click="onSubmit()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  data() {
    return {
      formVisible: false,
      model: {
        id: '',
        carNumber: '',
        driverName: '',
        phoneNumber: '',
        orderId: ''
      },
      option: {
        url: 'api/admin/mall/v1/guyuOrder/fyDelPages'
        //,showSearchAndReset: false
      },
      searchForm: [
        {
          type: 'input',
          formName: 'orderNo',
          label: '订单编号',
          value: ''
        },
        {
          type: 'input',
          formName: 'storeName',
          label: '店铺名称',
          value: ''
        },
        {
          type: 'input',
          formName: 'carNum',
          label: '车牌号',
          value: ''
        },
        {
          type: 'select',
          formName: 'status',
          label: '状态',
          option: [
            { value: '', label: '全部' },
            { value: '-2', label: '已退款' },
            { value: '-1', label: '已取消' },
            { value: '0', label: '待支付' },
            { value: '1', label: '待发货' },
            { value: '2', label: '已发货' },
            { value: '3', label: '已收货' },
            { value: '4', label: '退货中' },
            { value: '5', label: '换货中' },
            { value: '6', label: '退款中' },
            { value: '7', label: '部分发货' },
            { value: '10', label: '已完成' }
          ],
          value: '1'
        },
        {
          type: 'date-picker',
          formName: 'startCreateTime_endCreateTime',
          el: {
            type: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd'
          },
          label: '下单时间',
          value: ''
        }
      ],
      menu: [
        {
          type: 'primary',
          label: '导出',
          on: this.exportOrder
        },
        {
          type: 'upload',
          label: '导入',
          url: this.projectUrl + '/api/admin/mall/v1/guyuOrder/importList',
          on: this.importOrder
        }
      ],
      column: [
        //{ type: 'index', label: '序号', width: '60px', align: 'center' },
        {
          label: '订单号',
          width: '140px',
          prop: 'orderNum'
        },
        {
          label: '店铺名',
          prop: 'storeName'
        },
        { label: '下单时间', prop: 'createTime' },
        {
          label: '订单总价',
          prop: 'orderAmount',
          width: '80px',
          align: 'center',
          formatter: row => {
            return row.orderAmount / 100
          }
        },
        {
          label: '总重量(公斤)',
          width: '80px',
          prop: 'weight',
          formatter: row => {
            return row.weight / 1000
          }
        },
        {
          label: '物流服务费(元)',
          prop: 'logisticsCost',
          align: 'center',
          formatter: row => {
            return row.logisticsCost / 100
          }
        },
        {
          label: '收货人信息',
          width: '180px',
          formatter: row => {
            return (
              <div>
                <p>
                  {row.buyerName}&nbsp;{row.buyerPnum}
                </p>
                <p>{row.address}</p>
              </div>
            )
          }
        },
        {
          label: '司机信息',
          width: '150px',
          formatter: row => {
            return (
              <div>
                {row.driverId && (
                  <div>
                    <p>
                      {row.driverName}&nbsp;{row.driverPnum}
                    </p>
                    <p>{row.carNum}</p>
                  </div>
                )}
                {row.orderStatus >= 0 && row.driverId && (
                  <el-button type="text" onClick={this.setDriver.bind(this, row)}>
                    修改司机信息
                  </el-button>
                )}
                {!row.driverId && (
                  <el-button type="text" onClick={this.setDriver.bind(this, row)}>
                    填写司机信息
                  </el-button>
                )}
              </div>
            )
          }
        },
        { label: '配送时间', prop: 'delTime' },
        { label: '发货时间', prop: 'deliverTime' },
        { label: '收货时间', prop: 'receiveTime' },
        {
          label: '状态',
          prop: 'orderStatus',
          width: '100px',
          formatter: row => {
            return {
              '-2': '已退款',
              '-1': '已取消',
              '0': '待支付',
              '1': '待发货',
              '2': '已发货',
              '3': '已收货',
              '4': '退货中',
              '5': '换货中',
              '6': '退款中',
              '7': '部分发货',
              '10': '已完成'
            }[row.orderStatus]
          }
        },
        {
          label: '操作',
          align: 'center',
          formatter: row => {
            return (
              <div>
                <el-button
                  type="text"
                  onClick={() => {
                    this.$router.push(`/main/mall/order/product/detail?id=${row.orderId}`)
                  }}
                >
                  查看订单
                </el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    importOrder(row) {
      if (row.code === 20000) {
        this.$refs.table.searchKeep()
      } else {
        this.$message.error(row.message)
      }
    },
    exportOrder(currt, search) {
      if (search.startCreateTime_endCreateTime) {
        const [s, e] = search.startCreateTime_endCreateTime
        search.startCreateTime = s
        search.endCreateTime = e
      }
      this.$confirm('是否导出当前列表', '操作提示', {
        confirmButtonText: '导出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.open(this.projectUrl + '/api/admin/mall/v1/guyuOrder/export?' + qs.stringify(search))
      })
    },
    setDriver(row) {
      this.model.carNumber = row.carNum
      this.model.driverName = row.driverName
      this.model.phoneNumber = row.driverPnum
      this.model.orderId = row.orderId
      this.model.id = row.driverId
      this.formVisible = true
    },
    onClose() {
      this.formVisible = false
      this.clearForm('model')
    },
    onSubmit() {
      this.$refs.model.validate(value => {
        if (value) {
          let model = JSON.parse(JSON.stringify(this.model))
          model.id ? this.updateOrderDriver(model) : this.addOrderDriver(model)
          //this.addPaymentCust()
        }
      })
    },
    updateOrderDriver(model) {
      this.$http.updateOrderDriver(model).then(() => {
        this.$message.success('修改成功')
        this.$refs.table.onSearch()
        this.onClose()
      })
    },
    addOrderDriver(model) {
      this.$http.addOrderDriver(model).then(() => {
        this.$message.success('添加成功')
        this.$refs.table.onSearch()
        this.onClose()
      })
    }
  }
}
</script>
