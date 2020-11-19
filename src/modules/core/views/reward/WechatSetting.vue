<template>
<div>
    <el-form label-position="right" label-width="180px" style="margin:40px 100px;">
        <el-form-item>
            <div class="img-box">
             <el-form-item label="" prop="wechatImgUrl">
                <ImageUpload
                :image-url="configItem.value"
                :on-success="e => (configItem.value = e)"
                ></ImageUpload>
            </el-form-item>
            </div>
        </el-form-item>
        <el-button style="float:right;" type="primary" @click="onSubmit()">保存</el-button>
    </el-form>
    <p style="margin-left:20px;color:red"><span>该公众号图片用于引导店铺关注公众号,开启新订单提醒功能</span></p>
 </div>
</template>

<script>
export default {
  props: {
    parentId: String
  },
  data() {
    return {
      wechatImgUrl:'',
      model: {},
      configItem: {},
      config:{}
    }
  },
  created() {
    this.getConfigItem();
  },
  methods: {
     getTree(row) {
      this.model = JSON.parse(JSON.stringify(row))
      this.formVisible = true
    },
    getConfigItem() {
      this.$http.getConfigByKey('WECHATIMGURL').then(res => {
        this.configItem = res.data.data
      })
    },
    onSubmit() {
        this.$http.updateConfigItem(this.configItem).then(() => {
            this.$message.success('保存成功')
        })
    },
  }
}
</script>