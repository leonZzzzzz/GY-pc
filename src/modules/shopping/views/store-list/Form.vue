<template>
  <el-dialog
    :title="id ? '修改分类' : '添加分类'"
    :visible.sync="visible"
    width="480px"
    :append-to-body="true"
    :before-close="close"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form :model="model" ref="model" label-position="right" label-width="90px" size="medium">
      <el-form-item label="分类名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="model.info"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="model.seqNum" :min="0"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="close(false)">取 消</el-button>
      <el-button size="medium" type="primary" @click="success()" :loading="loading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    id: {
      type: String,
      default: ''
    },
    // parentId: String,
    // resourceType: String
    name: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    },
    seqNum: Number,
  },
  data() {
    return {
      ischoose:false,
      digLogin: false,
      model: {
        id:'',
        name: '',
        info: '',
        seqNum: 0,
        type:'15'
      },
      loading: false,
      dataLoading: false
    }
  },
  created() {
    // this.getList()
  },
  
  watch: {
    visible(val) {
      if (val) {
        // this.model.parentId = this.parentId
        // this.model.resourceType = this.resourceType
        this.model.id = this.id
        this.model.name = this.name
        this.model.info = this.info
        this.model.seqNum = this.seqNum

      }
    }
  },
  methods: {
    
    addVaule(){
      this.ischoose = true
    },
    delValue(){
      this.ischoose = false
    },
    // async getPermission() {
    //   try {
    //     let res = await this.$http.getPermission({ id: this.id })
    //     this.model = res.data.data
    //     this.dataLoading = false
    //   } catch (err) {
    //     //
    //   }
    // },
    async saveModel(type) {
      try {
        await this.$http[type](this.model)
        this.loading = false
        this.$message({
          message: type === 'updataStoreCategory' ? '修改成功' : '添加成功',
          type: 'success'
        })
        this.close(true)
      } catch (err) {
        this.loading = false
      }
    },
    success() {
      this.$refs.model.validate(valid => {
        if (valid) {
          this.loading = true
          this.saveModel(this.id ? 'updataStoreCategory' : 'addStoreCategory')
        } else {
          return false
        }
      })
    },
    close(flag) {
      this.model = this.$options.data().model
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
      this.$emit('close', flag)
    }
  }
}
</script>
<style>
.el-icon-error {
  position: absolute;
  right: 5px;
  top: 10px;
  color: red;
}
</style>