<template>
  <div>
    <QcTable
      ref="table"
      :option="option"
      :search-form="searchForm"
      :menu="menu"
      :column="column"
    ></QcTable>
    <el-dialog
      title="账期明细"
      width="800px"
      append-to-body
      :close-on-click-modal="false"
      :visible="formVisibleson"
      :before-close="onCloseson"
    >
      <div style="padding: 0 10px 10px;font-size: 16px;">合计：{{ unpayAmount | formatPrice }}元</div>
      <QcTable
        ref="tableson"
        :option="optionson"
        :search-form="searchFormson"
        :column="columnson"
        v-if="formVisibleson"
      ></QcTable>
    </el-dialog>
    <el-dialog
      title="账期客户"
      width="300px"
      append-to-body
      :close-on-click-modal="false"
      :visible="formVisible"
      :before-close="onClose"
    >
      <el-form ref="model" :model="model" label-position="right" label-width="80px">
        <el-form-item
          label="手机号"
          prop="custName"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-select
            :disabled="model.paymentDaysId"
            :maxlength="60"
            filterable
            remote
            reserve-keyword
            :placeholder="model.appellation"
            v-model="model.custName"
            :remote-method="remoteMethod"
          >
            <el-option
              style="height:60px; margin-bottom:10px"
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
              <div>
                <img width="60px" height="60px" style="margin-right: 20px;" :src="item.headImage" />
                <span
                  style="vertical-align: top;
                  display: inline-block;
                  height: 60px;
                  line-height: 60px;"
                  >{{ item.name }}</span
                >
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="model.remark"></el-input>
        </el-form-item>
        <el-form-item label="账期" prop="timeLimit" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input v-model="model.timeLimit"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="lines" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input v-model="model.lines"></el-input>
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
export default {
  data() {
    return {
      unpayAmount: 0,
      list: [],
      model: { id: '' },
      updateId: '',
      tableRow: {},
      formVisible: false,
      formVisibleson: false,
      option: {
        url: 'api/admin/v1/storePc/customer/paymentCustList'
        //,showSearchAndReset: false
      },
      optionson: {
        url: 'api/admin/v1/storePc/paymentDays/paymentDetail',
        showSearchAndReset: false
      },
      searchFormson: [{ value: '', formName: 'paymentDaysId' }],
      searchForm: [
        { value: '', formName: 'mobilePhoneNumber', type: 'input', label: '手机号码' },
        { value: '', formName: 'custName', type: 'input', label: '姓名' }
      ],
      menu: [
        {
          type: 'export',
          label: '导出',
          url: this.projectUrl + '/api/admin/v1/storePc/paymentDays/export?'
        },
        {
          type: 'primary',
          label: '添加',
          on: () => {
            this.formVisible = true
          }
        }
      ],
      columnson: [
        { label: '日期', prop: 'createTime' },
        {
          label: '金额（元）',
          prop: 'totalAmount',
          formatter: row => {
            return row.totalAmount / 100
          }
        },
        {
          label: '状态',
          prop: 'status',
          formatter: row => {
            return { '1': '未支付', '-1': '交易失败', '2': '进行中', '3': '已支付' }[row.status]
          }
        },
        {
          label: '订单详情',
          align: 'center',
          formatter: row => {
            return (
              <div>
                <el-button
                  type="text"
                  onClick={() => {
                    this.$router.push(`/main/mall/order/product/detail?id=${row.id}`)
                  }}
                >
                  查看订单
                </el-button>
              </div>
            )
          }
        }
      ],
      column: [
        //{ type: 'index', label: '序号', width: '60px', align: 'center' },
        {
          label: '头像',
          prop: 'headImage',
          formatter: row => {
            return (
              <el-image src={row.headImage} fit="cover" style="width:60px;height:60px;"></el-image>
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
        { label: '备注', prop: 'remark' },
        { label: '结算帐期（天）', prop: 'timeLimit' },
        {
          label: '金额上限（元）',
          prop: 'lines',
          formatter: row => {
            return row.lines / 100
          }
        },
        {
          label: '未支付账期金额（元）',
          prop: 'unpayAmount',
          formatter: row => {
            return row.unpayAmount / 100 || 0
          }
        },
        { label: '添加时间', prop: 'createTime' },
        {
          label: '状态',
          prop: 'status',
          formatter: row => {
            return { normal: '正常', disable: '不可用' }[row.status]
          }
        },
        {
          label: '操作',
          align: 'center',
          formatter: row => {
            return (
              <div>
                <el-button type="text" onClick={this.getTree.bind(this, row)}>
                  修改
                </el-button>
                <el-button
                  type="text"
                  onClick={this.changestatus.bind(
                    this,
                    row.paymentDaysId,
                    row.status == 'normal' ? 'disable' : 'normal'
                  )}
                >
                  {{ normal: '停用', disable: '启用' }[row.status]}
                </el-button>
                <el-button
                  type="text"
                  onClick={this.paymentDetail.bind(this, row.paymentDaysId, row.unpayAmount)}
                >
                  查看账期明细
                </el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    paymentDetail(paymentDaysId, unpayAmount) {
      this.unpayAmount = unpayAmount
      this.formVisibleson = true
      this.searchFormson[0].value = paymentDaysId
    },
    changestatus(paymentDaysId, status) {
      this.$http.changePaymentCustStatus({ paymentDaysId, status }).then(() => {
        this.$message.success('修改成功')
        this.$refs.table.onSearch()
      })
    },
    getTree(row) {
      this.model = JSON.parse(JSON.stringify(row))
      this.model.lines /= 100
      this.formVisible = true
    },
    onSubmit() {
      this.$refs.model.validate(value => {
        if (value) {
          let model = JSON.parse(JSON.stringify(this.model))
          model.lines = parseFloat(model.lines) * 100
          if (model.paymentDaysId) {
            this.updatePaymentCust(model)
          } else {
            model.memberId = model.custName
            this.addPaymentCust(model)
          }
          //this.addPaymentCust()
        }
      })
    },
    updatePaymentCust(model) {
      model.id = model.paymentDaysId
      this.$http.updatePaymentCustomer(model).then(() => {
        this.$message.success('修改成功')
        this.$refs.table.onSearch()
        this.onClose()
      })
    },
    addPaymentCust(model) {
      this.$http.addPaymentCustomer(model).then(() => {
        this.$message.success('添加成功')
        this.$refs.table.onSearch()
        this.onClose()
      })
    },
    onClose() {
      this.list = []
      this.formVisible = false
      this.clearForm('model')
    },
    onCloseson() {
      this.formVisibleson = false
    },
    remoteMethod(query) {
      if (query !== '') {
        this.$http.listByPhoneNum({ phoneNum: query }).then(res => {
          this.list = res.data.data
        })
      }
    },
    exportCust() {
      this.$confirm('是否导出客户列表', '操作提示', {
        confirmButtonText: '导出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.open(this.projectUrl + '/api/admin/v1/storePc/paymentDays/export')
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
