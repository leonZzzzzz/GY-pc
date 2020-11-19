<template>
<div>
    <el-form label-position="right" label-width="180px" style="margin:40px 100px;">
      <el-form-item  :label="configItem.name">
          <!-- <el-input  v-model="configItem.value" @blur="updateConfigItem(configItem.value)" style="width:300px"></el-input> -->
          <el-input-number v-model="configItem.value" :min="1" :max="100" label="输入折扣"></el-input-number>
          <label style="margin-left:20px">折</label>&nbsp;&nbsp;&nbsp;
          <el-button type="text" @click="updateConfigItem()">保存</el-button>
          <el-popover width="400" style="color:red!important" placement="top-start" trigger="hover" content="用户充值余额享受的折扣（如99折,充100只需支付99元）">
            <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
          </el-popover>
          <!-- <p><label style="color:red">用户充值余额享受的折扣（如99折,充100只需支付99元）</label></p> -->
      </el-form-item> 
    </el-form>
 </div>
</template>

<script>
export default {
  props: {
    parentId: String
  },
  data() {
    return {
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
      this.$http.getConfigByKey('recharge_discount').then(res => {
        this.configItem = res.data.data
        this.configItem.value = parseFloat(this.configItem.value) * 100
      })
    },
    updateConfigItem() {
      let model = JSON.parse( JSON.stringify(this.configItem))
      if(!/^\d+$/.test(model.value)) {
        this.$message.warning('请输入非负整数')
        return
      }
      model.value /= 100;
      this.$http.updateLogisticsCompany(model).then(() => {
          this.loading = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.getConfigItem();
        })
    }
  }
}
</script>