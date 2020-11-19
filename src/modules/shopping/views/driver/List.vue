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
        <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '该项为必填项' }]">
          <el-input v-model="model.name" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="身份证照片" prop="idCardImage">
          <QcImageUpload
            :body="{imageType:'attachment'}"
            width="100px"
            height="100px"
            v-model="model.idCardImage"
          ></QcImageUpload>
          <p>建议尺寸340 * 251，大小不超过3M</p>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="phoneNumber"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-input v-model="model.phoneNumber" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" prop="carNumber" :rules="[{ required: true, message: '该项为必填项' }]">
          <el-input v-model="model.carNumber" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="车型大小" prop="carType">
          <el-input v-model="model.carType" style="width: 200px;"></el-input>
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
      model: { id: '' },
      updateId: '',
      tableRow: {},
      option: {
        url: 'api/admin/v1/guyuDriver/page',
        showSearchAndReset: false
      },
      searchForm: [{ formName: '', value: ' ',newType:'' },],
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
          label: '姓名',
          prop: 'name'
        },
        {
          label: '身份证照片',
          prop: 'idCardImage',
          formatter: row => {
            return (
              <el-image src={this.imgHost + row.idCardImage} style="width:90px;height:60px">
                <div slot="error" class="el-image__error">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            )
          }
        },
        {
          label: '电话',
          prop: 'phoneNumber'
        },
        {
          label: '车牌号',
          prop: 'carNumber'
        },
        {
          label: '车型大小',
          prop: 'carType'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        },
        {
          label: '状态',
          prop: 'status',
          formatter: row => {
            switch (row.status) {
              case 'frozen':
                return '冻结'
              case 'normal':  
                return '正常'
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
                <el-button
                  type="text"
                  onClick={this.frozenConfirm.bind(
                    this,
                    row.id,
                    row.status == 'frozen' ? 'normal' : 'frozen'
                  )}
                >
                  {{ frozen: '解冻', normal: '冻结' }[row.status]}
                </el-button>
              </div>
            )
          }
        }
        // {
        //   label: '结束日期',
        //   prop: 'endDay'
        // },
        // {
        //   label: '状态',
        //   prop: 'status',
        //   formatter: row => {
        //     switch (row.status) {
        //       case 'enabled':
        //         return '开启'
        //       case 'disabled':
        //         return '关闭'
        //     }
        //   }
        // },
        
      ]
    }
  },
  methods: {
    frozenConfirm(id,status) {
      this.$confirm('是否执行此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.frozenDriver({ id,status }).then(() => {
          this.$message.success('操作成功')
          this.$refs.table.onSearch()
        })
      })
    },
    getTree(row) {
      this.formVisible = true
      this.model = JSON.parse(JSON.stringify(row))
    },
    success() {
      this.$refs.model.validate(valid => {
        if (valid) {
          let model = JSON.parse(JSON.stringify(this.model))
          this.loading = true
          this.saveModel(
            this.model.id ? 'updateDriver' : 'addDriver',
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
            message: type === 'updateDriver' ? '修改成功' : '添加成功',
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
