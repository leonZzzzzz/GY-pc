<template>
  <div>
    <div class="printer">
      <el-form ref="model" :model="orderPrinter" label-position="right" label-width="120px">
        <div class="title-printer">
          <span>新订单小票打印机</span>
          <el-popover width="280" style="color:red!important" placement="top-start" trigger="hover" content="打印机终端号和秘钥可在机器底部标签看到 打印机状态为' 在线 '状态时，方可正常工作，打印机状态显示稍有延迟属正常现象">
                <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
          </el-popover>
        </div>
        <el-form-item
          label="打印机终端号"
          prop="key"
        >
          <el-input v-model="orderPrinter.key" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item
          label="打印机秘钥"
          prop="value"
        >
          <el-input v-model="orderPrinter.value" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="打印机状态">
            <span v-if="(orderPrinter.state=='0')">离线</span>
            <span v-else-if="(orderPrinter.state=='1')">在线</span>
            <span v-else-if="(orderPrinter.state=='2')">缺纸</span>
            <span v-else-if="(orderPrinter.state=='3')">配置错误</span>
        </el-form-item>
      </el-form>
      <div class="printer-right">
        <el-button type="primary" @click="addOrderPrinter()">保存</el-button>
      </div>
     </div>
     <div class="printer">
      <el-form ref="model" :model="lablePrinter" label-position="right" label-width="120px">
        <div class="title-printer">
          <span>标签打印机(带粘胶)</span>
          <el-popover width="280" style="color:red!important" placement="top-start" trigger="hover" content="打印机终端号和秘钥可在机器底部标签看到 打印机状态为' 在线 '状态时，方可正常工作，打印机状态显示稍有延迟属正常现象">
                <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
          </el-popover>
        </div>
        <el-form-item
          label="打印机终端号"
          prop="key"
        >
          <el-input v-model="lablePrinter.key" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item
          label="打印机秘钥"
          prop="value"
        >
          <el-input v-model="lablePrinter.value" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="打印机状态">
            <span v-if="(lablePrinter.state=='0')">离线</span>
            <span v-else-if="(lablePrinter.state=='1')">在线</span>
            <span v-else-if="(lablePrinter.state=='2')">缺纸</span>
            <span v-else-if="(lablePrinter.state=='3')">配置错误</span>
        </el-form-item>
      </el-form>
      <div class="printer-right">
        <el-button type="primary" @click="addLablePrinter()">保存</el-button>
      </div>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lablePrinter:{
          showType:2,
          key:'',
          value:''
      },
      orderPrinter:{
          showType:1,
          key:'',
          value:''
      }
    }
  },
  created() {
    this.getLablePrinter();
    this.getOrderPrinter();
  },
  methods: {
    getLablePrinter(){
       this.$http.getPrinterByType({showType:2}).then(res => {
          if(res.data.data){
              this.lablePrinter = res.data.data
          }
      })
    },
    getOrderPrinter(){
       this.$http.getPrinterByType({showType:1}).then(res => {
         if(res.data.data){
          this.orderPrinter = res.data.data
         }
      })
    },
    addOrderPrinter() {
      this.$http.addPrinter(this.orderPrinter).then(() => {
        this.$message.success('保存成功');
        this.getOrderPrinter();
      })
    },
    addLablePrinter(){
      this.$http.addPrinter(this.lablePrinter).then(() => {
        this.$message.success('保存成功')
        this.getLablePrinter();
      })
    }
  }
}
</script>
<style>
  .printer{
    width: 400px;
    padding-bottom: 30px;
    margin-top: 40px; 
  }
  .printer-right{
    float:right;
    padding-bottom: 30px;
  }
  .title-printer{
    padding-bottom: 15px;
    text-align: center;
  }
  .el-main{
    background-color: #ffffff!important;
  }
</style>