<template>
  <el-dialog
    :title="id ? '修改' : '添加'"
    :visible.sync="visible"
    width="600px"
    :append-to-body="true"
    :before-close="close"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      :model="model"
      ref="model"
      label-width="100px"
      label-position="left"
      hide-required-asterisk
    >
      <el-form-item label="专区名称" prop="name" :rules="[{ required: true, message: '该字段不能为空'}]">
        <el-input v-model="model.name"  style="width:400px" :maxlength="10"></el-input>
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
      <el-form-item label="排序" prop="sortNum" :rules="[{ required: true, message: '该字段不能为空'}]">
        <el-input-number v-model="model.sortNum"></el-input-number>
      </el-form-item>
      <el-form-item label="选择商品" prop="list" :rules="[{ required: true, message: '该字段不能为空'}]">
        <el-table :data="model.list" style="width: 100%">
          <el-table-column prop="productIcon" label="商品图片" width="80px">
            <template slot-scope="scope">
              <img :src="imgHost+scope.row.productIcon" width="50px" height="50px" />
            </template>
          </el-table-column>
          
          <el-table-column prop="productName" label="商品名称"></el-table-column>
          <el-table-column prop="sortNum" label="排序号" width="180px"  align="center">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.sortNum" style="width:120px"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="address" width="50px" label="操作">
            <template slot-scope="scope">
              <div>
                <span class="el-icon-close" @click="deletePro(scope.$index)"></span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-input v-model="model.skipLinks" v-if="model.skipType === 'linkurl'"></el-input>
        <div v-else>
          <QcProductItem
            v-if="model.productName"
            :img="imgHost+model.productIcon"
            :title="model.productName"
          ></QcProductItem>
          <el-button style="margin-top:10px" @click="productPickerVisible = true" size="mini">选择商品</el-button>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close(false)">取 消</el-button>
      <el-button type="primary" @click="success()" :loading="loading">确 定</el-button>
    </span>
    <QcProductPicker
      :visible="productPickerVisible"
      :module="module"
      @close="onQcProductPickerClose"
    />
  </el-dialog>
</template>

<script>
import QcProductPicker from '@/components/common/product-picker/Index'
export default {
  components: {
    QcProductPicker
  },
  props: {
    visible: Boolean,
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      model: {
        name: '',
        startTime: '',
        endTime: '',
        sortNum: '',
        startTimeAndEndTime: '',
        list: []
      },
      productPickerVisible: false,
      types: [
        {
          index: 'product',
          name: '商品'
        },
        {
          index: 'noskip',
          name: '不跳转'
        }
      ],
      loading: false
    }
  },
  // created() {
  //   this.pageAttachmentType()
  // },
  computed: {
    module() {
      return 'Mall'
    }
  },
  watch: {
    visible(val) {
      if (val) {
        if (this.id) {
          this.getSpecialArea()
        }
      }
    }
  },
  methods: {
    deletePro(index) {
      this.model.list.splice(index, 1)
    },
    onChangeType() {
      this.model.skipLinks = ''
      this.model.productIcon = ''
      this.model.productName = ''
    },
    pageAttachmentType() {
      this.$http.pageAttachmentType().then(res => {
        this.types = res.data.data
      })
    },
    getSpecialArea() {
      this.$http.getSpecialArea({ id: this.id }).then(res => {
        this.model = res.data.data
        this.$set(this.model, 'startTimeAndEndTime', [this.model.startTime, this.model.endTime])
      })
    },
    success() {
      this.$refs.model.validate(valid => {
        if (valid) {
          let model = JSON.parse(JSON.stringify(this.model))
          model.startTime = model.startTimeAndEndTime[0]
          model.endTime = model.startTimeAndEndTime[1]
          this.loading = true
          this.saveModel(this.id ? 'updateSpecialArea' : 'addSpecialArea', model)
        }
      })
    },
    saveModel(type, model) {
      this.$http[type](model)
        .then(() => {
          this.loading = false
          this.$message({
            message: type === 'updateSpecialArea' ? '修改成功' : '添加成功',
            type: 'success'
          })
          this.close(true)
        })
        .catch(() => {
          this.loading = false
        })
    },
    close(flag) {
      this.model = this.$options.data().model
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
      this.$emit('onClose', flag)
    },
    onQcProductPickerClose(row) {
      if (row) {
        let productId = row.id
        let productName = row.name
        let productIcon = row.iconUrl
        let sortNum = row.seqNum
        this.model.list.push({ productId, productName, productIcon, sortNum })
      }
      this.productPickerVisible = false
    }
  }
}
</script>
