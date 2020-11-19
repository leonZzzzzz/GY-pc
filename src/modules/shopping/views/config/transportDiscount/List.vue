<template>
  <div>
    <QcTable ref="table" :option="option" :search-form="searchForm" :menu="menu" :column="column"></QcTable>
    <el-dialog
      :title="model.id?'修改':'添加'"
      width="550px"
      ppend-to-body
      :close-on-click-modal="false"
      :visible="formVisible"
      :before-close="close"
    >
      <el-form ref="model" :model="model" label-position="left" label-width="120px">
        <el-form-item label="开启/关闭" prop="status" :rules="[{ required: true, message: '该项为必填项' }]">
          <el-switch
            v-model="model.status"
            active-color="#13ce66"
            inactive-color="#ccc"
            active-value="enabled"
            inactive-value="disabled"
          ></el-switch>
        </el-form-item>
        <el-form-item label="折扣百分比" prop="amount" :rules="[{ required: true, message: '该项为必填项' }]">
          <p style="padding: 10px 0;font-size: 12px;color: #888;">单位：百分之一，例如10表示10%</p>
          <el-form-item>
            <el-input v-model="model.amount" style="width: 220px;"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="开始日期" prop="startDay" :rules="[{ required: true, message: '该项为必填项' }]">
          <el-date-picker
            v-model="model.startDay"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="endDay" :rules="[{ required: true, message: '该项为必填项' }]">
          <el-date-picker
            v-model="model.endDay"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="close()">关闭</el-button>
        <el-button type="primary" @click="success()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formVisible: false,
      model: {
        id: '',
        amount: '',
        status: 'enabled',
        startDay: '',
        endDay: '',
      },
      updateId: '',
      tableRow: {},
      option: {
        url: 'api/admin/v1/platform-transport-amount-discount/page',
        showSearchAndReset: false
      },
      searchForm:[
        { formName: '', value: ' ',newType:'' },
      ],
      menu: [
        {
          type: 'primary',
          label: '添加',
          on: () => {
            this.formVisible = true
          }
        }
      ],
      column: [
        {
          label: '折扣比例(单位:百分之一)',
          prop: 'amount',
          formatter: row => {
            return row.amount/100
          }
        },
        {
          label: '开始日期',
          prop: 'startDay'
        },
        {
          label: '结束日期',
          prop: 'endDay'
        },
        {
          label: '状态',
          prop: 'status',
          formatter: row => {
            switch (row.status) {
              case 'enabled':
                return '开启'
              case 'disabled':
                return '关闭'
            }
          }
        },
        {
          label: '操作',
          align: 'center',
          width: '150px',
          formatter: row => {
            return (
              <div>
                <el-button type="text" onClick={this.getTree.bind(this, row)}>
                  修改
                </el-button>
                <el-button type="text" onClick={this.deleteConfirm.bind(this, row.id)}>
                  删除
                </el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    deleteConfirm(id) {
      this.$confirm('是否删除该条补贴?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delTransporDiscountt({ id }).then(() => {
          this.$message.success('删除成功')
          this.$refs.table.onSearch()
        })
      })
    },
    getTree(row) {
      this.formVisible = true
      row.amount = row.amount/100
      this.model = JSON.parse(JSON.stringify(row))
    },
    success() {
      this.$refs.model.validate(valid => {
        if (valid) {
          this.model.amount=this.model.amount*100
          let model = JSON.parse(JSON.stringify(this.model))
          console.log(model)
          this.loading = true
          this.saveModel(
            this.model.id ? 'updateTransporDiscountt' : 'addTransporDiscountt',
            model
          )
        }
      })
    },
    saveModel(type, model) {
      this.$http[type](model)
        .then(() => {
          this.loading = false
          this.$message({
            message: type === 'updateTransporDiscountt' ? '修改成功' : '添加成功',
            type: 'success'
          })
          this.close()
        })
        .catch(() => {
          this.loading = false
        })
    },
    close() {
      this.model = this.$options.data().model
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
      this.formVisible = false
      this.$refs.table.onSearchKeep()
      this.clearForm('model')
    }
  }
}
</script>
