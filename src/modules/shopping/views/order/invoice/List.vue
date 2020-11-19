<template>
  <div>
    <QcTable ref="table" :option="option" :menu="menu" :search-form="searchForm" :column="column"></QcTable>
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
          prop="driverPhoneNumber"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-input v-model="model.driverPhoneNumber"></el-input>
        </el-form-item>
        <el-form-item
          label="车牌号"
          prop="driverCarNumber"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-input v-model="model.driverCarNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="onClose()">关闭</el-button>
        <el-button type="primary" @click="onSubmit()">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="结算信息"
      width="350px"
      append-to-body
      :close-on-click-modal="false"
      :visible="formSettleVisible"
      :before-close="onClose"
    >
      <el-form ref="model" :model="model" label-position="right" label-width="80px">
        <el-form-item
          label="结算运费"
          prop="settlementFreight"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-input v-model="model.settlementFreight"></el-input>
        </el-form-item>
        <el-form-item
          label="结算日期"
          prop="settlementTime"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-date-picker
            v-model="model.settlementTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
          <!-- <el-input v-model="model.settlementTime"></el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="onSettleClose()">关闭</el-button>
        <el-button type="primary" @click="onSettleSubmit()">保存</el-button>
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
      formSettleVisible:false,
      model: {
        id: '',
        driverPhoneNumber: '',
        driverName: '',
        driverCarNumber: '',
        settlementFreight:'',
        settlementTime:''
      },
      option: {
        url: 'api/admin/v1/deliveryNote/selectPages'
        //,showSearchAndReset: false
      },
      searchForm: [
        {
          type: 'input',
          formName: 'number',
          label: '送货单单号',
          value: ''
        },
        {
          type: 'input',
          formName: 'driverName',
          label: '司机姓名',
          value: ''
        },
        {
          type: 'input',
          formName: 'driverPhoneNumber',
          label: '司机手机号',
          value: ''
        },
        {
          type: 'input',
          formName: 'driverCarNumber',
          label: '司机车牌号',
          value: ''
        },
        {
          type: 'input',
          formName: 'custName',
          label: '收货人姓名',
          value: ''
        },
        {
          type: 'input',
          formName: 'custPhoneNumber',
          label: '收货人手机号',
          value: ''
        },
        {
          type: 'select',
          formName: 'status',
          label: '状态',
          option: [
            { value: '', label: '全部' },
            { value: 'waitstock', label: '待备货' },
            { value: 'stockup', label: '已备货' },
            { value: 'waitloading', label: '待装车' },
            { value: 'waitdelivery', label: '待送货' },
            { value: 'takeover', label: '已收货' },
            { value: 'finish', label: '已完成' },
            {value:'shipping',label:'配送中'}
          ],
          value: ''
        },
        // {
        //   label: '选择时间',
        //   type: 'date-picker',
        //   formName: 'startCreateTime_endCreateTime',
        //   el: {
        //     type: 'daterange',
        //     startPlaceholder: '开始日期',
        //     endPlaceholder: '结束日期',
        //     valueFormat: 'yyyy-MM-dd'
        //   },
        // },
        {
          type: 'date-picker',
          formName: 'startCreateTime_endCreateTime',
          el: {
            type: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd'
          },
          label: '选择时间',
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
          url: this.projectUrl + '/api/admin/v1/deliveryNote/importList',
          on: this.importOrder
        }
      ],
      column: [
        //{ type: 'index', label: '序号', width: '60px', align: 'center' },
        {
          label: '送货单单号',
          width: '180px',
          align: 'center',
          prop: 'number'
        },
        {
          label: '总重量(公斤)',
          width: '100px',
          align: 'center',
          prop: 'weight',
          formatter: row => {
            return (row.weight || 0) / 1000
          }
        },
        {
          label: '物流服务费(元)',
          prop: 'logisticsCost',
          align: 'center',
          width: '130px',
          formatter: row => {
            return row.logisticsCost / 100
          }
        },
        {
          label: '总金额',
          prop: 'totalAmount',
          width: '100px',
          align: 'center',
          formatter: row => {
            return row.totalAmount / 100
          }
        },
        {
          label: '货品',
          prop: 'goods',
          width: '150px',
          align: 'center',
          showOverflowTooltip: true
        },
        {
          label: '司机信息',
          width: '130px',
          formatter: row => {
            return (
              <div>
                {row.driverName && (
                  <div>
                    <p>{row.driverName}</p>
                    <p>{row.driverPhoneNumber}</p>
                    <p>{row.driverCarNumber}</p>
                  </div>
                )}
                {!row.driverName && (
                  <el-button type="text" onClick={this.setDriver.bind(this, row)}>
                    填写司机信息
                  </el-button>
                )}
              </div>
            )
          }
        },
        {
          label: '收货人信息',
          width: '160px',
          formatter: row => {
            return (
              <div>
                <p>
                  {row.custName}&nbsp;{row.custPhoneNumber}
                </p>
                <p>{row.address}</p>
              </div>
            )
          }
        },
        {
          label: '收货时间段',
          prop: 'deliveryTime'
        },
        {
          label: '结算信息',
          width: '180px',
          formatter: row => {
            return (
              <div>
                {row.settlementFreight && (
                  <div>
                    <p>结算运费:{row.settlementFreight/100}</p>
                    <p>结算日期:{row.settlementTime.substring(0,10)}</p>
                  </div>
                )}
                {!row.settlementFreight && (
                  <el-button type="text" onClick={this.setSettle.bind(this, row)}>
                    填写结算信息
                  </el-button>
                )}
              </div>
            )
          }
        },
        {
          label: '发货时间',
          prop: 'sendTime'
        },
        {
          label: '状态',
          prop: 'status',
          formatter: row => {
            return {
              'waitstock': '待备货',
              'stockup': '已备货',
              'waitloading': '待装车',
              'waitdelivery': '待送货',
              'takeover': '已收货',
              'finish': '已完成',
              "shipping":"配送中"
            }[row.status]
          }
        },
        {
          label: '操作',
          align: 'center',
          fixed: 'right',
          formatter: row => {
            return (
              <div>
                <el-button
                  type="text"
                  onClick={() => {
                    this.$router.push(`/main/mall/order/invoice/detail?id=${row.id}`)
                  }}
                >
                  查看
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
        this.$message.success(row.message)
        this.$refs.table.onSearchKeep()
      } else {
        this.$message.error(row.message)
      }
    },
    exportOrder(currt, search) {
      // if (search.startCreateTime_endCreateTime) {
      //   const [s, e] = search.startCreateTime_endCreateTime
      //   search.startCreateTime = s
      //   search.endCreateTime = e
      // }
      this.$confirm('是否导出当前列表', '操作提示', {
        confirmButtonText: '导出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.open(this.projectUrl + '/api/admin/v1/deliveryNote/export?' + qs.stringify(search))
      })
    },
    setDriver(row) {
      this.model.id = row.id
      this.formVisible = true
      console.log(this.model)
    },
    setSettle(row) {
      this.model.id = row.id
      this.formSettleVisible = true
      console.log(this.model)
    },
    onClose() {
      this.formVisible = false
      this.clearForm('model')
    },
    onSettleClose() {
      this.formSettleVisible = false
      this.clearForm('model')
    },
    onSubmit() {
      this.$refs.model.validate(value => {
        if (value) {
          let model = JSON.parse(JSON.stringify(this.model))
          this.saveOrderDriver(model)
        }
      })
    },
    onSettleSubmit() {
      this.$refs.model.validate(value => {
        if (value) {
          let model = JSON.parse(JSON.stringify(this.model))
          model.settlementFreight = parseFloat(model.settlementFreight)*100
          this.saveOrderSettle(model)
        }
      })
    },
    saveOrderDriver(params) {
      this.$http.addDriverDeliveryNote(params).then(() => {
        // this.$message.success(params.id ? '修改成功' : '添加成功')
        this.$message.success('添加成功')
        this.$refs.table.onSearch()
        this.onClose()
      })
    },
    saveOrderSettle(params) {
      this.$http.addSettleDeliveryNote(params).then(() => {
        // this.$message.success(params.id ? '修改成功' : '添加成功')
        this.$message.success('添加成功')
        this.$refs.table.onSearch()
        this.onSettleClose()
      })
    },
  }
}
</script>
