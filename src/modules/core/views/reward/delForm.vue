<template>
  <el-form label-position="right" :inline="true" label-width="180px" style="margin:40px 100px;">
    <el-form-item v-for="(item,index) in configItem" :key="item.id" :label="item.name">
      <div>
        <el-input v-model="item.value.split('-')[0]" @blur="updateConfigItem(index)" style="width:60px" ></el-input>
        ~
        <el-input v-model="item.value.split('-')[1]" @blur="updateConfigItem(index)" style="width:60px"></el-input>
        公里:
        <el-input v-model="item.value.split('-')[2]" @blur="updateConfigItem(index)" style="width:80px" ></el-input>
        元
      </div>
      <span></span>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    parentId: String
  },
  data() {
    return {
      configItem: []
    }
  },
  created() {
    this.getConfigItem()
  },
  methods: {
    getConfigItem() {
      this.$http.getConfigItem({ parentId: this.parentId }).then(res => {
        res.data.data.map(item => {
          switch (item.showType) {
            case 2: // 百分比
              item.value = parseFloat(item.value) * 100
              break
            case 4: // 金额单位/分
              item.value /= 100
              break
          }
          return item
        })
        this.configItem = res.data.data
      })
    },
    updateConfigItem(index) {
      let model = JSON.parse(JSON.stringify(this.configItem[index]))
      switch (model.showType) {
        case 2: // 百分比
          model.value /= 100
          break
        case 4: // 金额单位/分
          model.value = parseFloat(model.value) * 100
          break
      }
      this.$http.updateConfigItem(model).then(() => {})
    }
  }
}
</script>
