<template>
  <div>
    <QcTable ref="table" :option="option" :menu="menu" :column="column" :search-form="searchForm"></QcTable>
    <el-dialog
      title="公告"
      width="550px"
      append-to-body
      :close-on-click-modal="false"
      :visible="formVisible"
      :before-close="onClose"
    >
      <el-form ref="model" :model="model" label-position="right" label-width="100px">
        <el-form-item label="公告内容" prop="content" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input type="textarea" style="width:400px" v-model="model.content"></el-input>
        </el-form-item>
        <el-form-item
          label="有效期"
          prop="startTimeAndEndTime"
          :rules="[{ required: true, message: '该字段不能为空'}]"
        >
          <el-date-picker
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="model.startTimeAndEndTime"
          ></el-date-picker>
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
      model: { id: '' },
      formVisible: false,
      updateId: '',
      searchForm:[
        { formName: '', value: ' ',newType:'' },
      ],
      option: {
        url: 'api/admin/v1/Notice/page'
      },
      menu: [
        {
          label: '添加',
          type: 'primary',
          on: () => {
            this.formVisible = true
          }
        }
      ],
      column: [
        { label: '公告内容', prop: 'content' },
        { label: '开始时间', prop: 'startTime' },
        { label: '结束时间', prop: 'endTime'  },
        {
          label: '状态',
          prop: 'status',
          formatter: row => {
            return { running: '启用', disable: '停用' }[row.status]
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
                  onClick={this.getTree.bind(this, row)}
                >
                  编辑
                </el-button>
                <el-button
                  type="text"
                  onClick={this.changestatus.bind(
                    this,
                    row.id,
                    row.status == 'running' ? 'disable' : 'running'
                  )}
                >
                  {{ running: '停用', disable: '启用' }[row.status]}
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
    //删除提示框
    deleteConfirm(id) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.deleteNotice({ id }).then(() => {
            this.$refs.table.onSearchKeep()
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          return
        })
    },
    changestatus(id, status) {
      this.$http.changeNoticeStatus({ id, status }).then(() => {
        this.$message.success('修改成功')
        this.$refs.table.onSearch()
      })
    },
    getTree(row) {
      this.formVisible = true
      this.model = JSON.parse(JSON.stringify(row))
      this.$set(this.model, 'startTimeAndEndTime', [this.model.startTime, this.model.endTime])
    },
    updateNotice(model) {
      this.$http.updateNotice(model).then(() => {
        this.$message.success('修改成功')
        this.$refs.table.onSearch()
        this.onClose()
      })
    },
    addNotice(model) {
      this.$http.addNotice(model).then(() => {
        this.$message.success('添加成功')
        this.$refs.table.onSearch()
        this.onClose()
      })
    },
    onClose() {
      this.formVisible = false
      this.clearForm('model')
    },
    onSubmit() {
      this.$refs.model.validate(value => {
        if (value) {
          let model = JSON.parse(JSON.stringify(this.model))
          model.startTime = model.startTimeAndEndTime[0]
          model.endTime = model.startTimeAndEndTime[1]
          model.lines = parseFloat(model.lines) * 100
          !model.id ? this.addNotice(model) : this.updateNotice(model)
          //this.addPaymentCust()
        }
      })
    },
  }
}
</script>
