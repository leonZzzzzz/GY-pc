<template>
  <div style="padding: 30px 110px;">
    <el-radio v-model="radio1" :label=true border>支持开发票</el-radio>
    <el-radio v-model="radio1" :label=false border>不支持开发票</el-radio>
    <el-button type="primary" @click="onSubmit()">保存</el-button>
    <div style="padding-top: 20px;color:red" v-if="!radio1">
        <span>注：设置后，买家将看不到是否开票等信息</span>
    </div>
  </div>
  </template>
  <script>
  export default {
  data () {
      return {
        radio1: false,
      };
    },
   created() {
    this.getStoreMsg()
   },
   methods: {
     getStoreMsg(){
        this.$http.getStoreDetail().then(res => {
        //  console.log(res.data.data);   
         this.radio1 = res.data.data.isOrderInvoice
      })
     },
     onSubmit() {
        this.$http.setInvoice({isOrderInvoice:this.radio1}).then(() => {
            this.$message.success('保存成功')
        })
    }
  }
  }
</script>