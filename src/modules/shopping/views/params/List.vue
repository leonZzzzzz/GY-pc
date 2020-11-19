<template>
  <div>
    <QcTable ref="table" :option="option" :search-form="searchForm" :menu="menu" :column="column"></QcTable>
    <el-dialog
      title="分类信息"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
      :visible="visible"
      :before-close="onClose"
    >
      <el-form ref="model" size="small" :model="model" label-position="left" label-width="80px">
        <el-form-item label="名称" prop="name" :rules="[{required:true,message:'请填写该字段'}]">
          <el-input v-model="model.name" placeholder="建议20个字内" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="默认值" prop="value">
          <el-input v-model="model.value" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" prop="value">
          <el-select v-model="model.categoryId" style="width:100%">
            <el-option
              v-for="item in categoryList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号" prop="seqNum">
          <el-input v-model="model.seqNum"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">保存</el-button>
          <el-button @click="onClose()">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        url: 'api/admin/mall/v1/productParamCategory/page'
      },
      searchForm: [{ label: '名称', type: 'input', formName: 'name' }],
      menu: [{ type: 'primary', label: '新建', on: () => (this.visible = true) }],
      column: [
        { label: '序号', type: 'index', align: 'center' },
        { label: '名称', prop: 'name', align: 'center' },
        { label: '默认值', prop: 'value', align: 'center' },
        { label: '创建时间', prop: 'createTime', align: 'center' },
        {
          label: '操作',
          align: 'center',
          formatter: row => {
            return (
              <div>
                <el-button type="text" onClick={this.getParams.bind(this, row)}>
                  修改
                </el-button>
                <el-button type="text" onClick={this.deleteParams.bind(this, row.id)}>
                  删除
                </el-button>
              </div>
            )
          }
        }
      ],
      model: {
        name: '',
        value: '',
        seqNum: '',
        parentId: 0,
        categoryId: ''
      },
      visible: false,
      categoryList: []
    }
  },
  created() {
    this.pageCategory()
  },
  methods: {
    pageCategory() {
      this.$http.pageCategory({ type: 1, pageSize: 1000 }).then(res => {
        this.categoryList = res.data.data.list
      })
    },
    getParams(row) {
      this.model = JSON.parse(JSON.stringify(row))
      this.visible = true
    },
    addParams() {
      this.$http.addParams(this.model).then(() => {
        this.$message.success('添加成功')
        this.$refs.table.onSearch()
        this.onClose()
      })
    },
    updateParams() {
      this.$http.updateParams(this.model).then(() => {
        this.$message.success('修改成功')
        this.$refs.table.onSearch()
        this.onClose()
      })
    },
    deleteParams(id) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.deleteCategory({ id }).then(() => {
            this.$refs.table.onSearchKeep()
          })
        })
        .catch(() => {
          return
        })
    },
    onSubmit() {
      this.$refs.model.validate(value => {
        if (value) {
          this.model.id ? this.updateParams() : this.addParams()
        }
      })
    },
    onClose() {
      this.visible = false
      this.model = this.$options.data().model
      this.model.type = this.type
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
    }
  }
}
</script>

<style>
</style>
