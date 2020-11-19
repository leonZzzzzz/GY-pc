<template>
  <QcNavigationPage content="业务员信息" style="width:950px;margin:0 auto;">
    <el-form :model="model" ref="model" label-position="right" label-width="100px">
      <QcTitle title="基础信息">
        <el-form-item label="手机号" prop="mobile" :rules="[{required:true,message:'请填写该字段'}]">
          <el-input
            class="form-item__input"
            @blur="getSalesByMobile()"
            maxlength="11"
            v-model="model.mobile"
            :disabled="inputVisible"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务员姓名" prop="name" :rules="[{required:true,message:'请填写该字段'}]">
          <el-input class="form-item__input" v-model="model.name" :disabled="inputVisible"></el-input>
        </el-form-item>
        <el-form-item label="选择用户" :rules="[{required:true,message:'请填写该字段'}]">
          <div>
            <span style="margin-right:15px" v-for="value,index in storenickName">{{value}}</span>
          </div>
          <el-button type="primary" size="small" @click="dialogVisible = true">关联用户</el-button>
          <MemberWrap :visible="dialogVisible" @onSelect="getStoreRow" @onClose="onClose"></MemberWrap>
        </el-form-item>
        <!-- <el-form-item label="店铺名称" prop="storeName" :rules="[{required:true,message:'请填写该字段'}]">
          <el-input class="form-item__input" v-model="model.storeName" :disabled="inputVisible"></el-input>
        </el-form-item>-->
        <el-form-item label="提成比例" prop="salesmanRate" :rules="[{required:true,message:'请填写该字段'}]">
          <el-input class="form-item__input" v-model="model.salesmanRate"></el-input>（%）
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">保存</el-button>
        </el-form-item>
      </QcTitle>
    </el-form>
  </QcNavigationPage>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      inputVisible: false,
      inputVisibleName:false,
      storenickName: [],
      sourceId:'',
      model: {
        type:'member',
        name: '',
        mobile: '',
        sourceIds:[],
        salesmanRate: ''
      }
    }
  },
  created() {
    console.log('query',this.$route.query);
    let id=this.$route.query.id;
    //传递了店铺ID(sid)过来当查询条件
    if(id){
      this.model.salesId=id;
      this.inputVisible=true
    }
    this.$route.query.id && this.getSalesman()
  },
  methods: {
    getStore(id) {
      this.$http.getStore({ id }).then(res => {
        console.log('店铺列表getStore接口返回',res);
      })
    },
    //业务员详情
    getSalesman() {
      console.log('业务员详情');
      console.log('id',this.$route.query.id);
      this.$http.getSalesmanById({ id: this.$route.query.id }).then(res => {
        this.model = res.data.data
        this.$set(this.model)     
      })
    },
    //获取选择的店铺信息
    getStoreRow(row) {
      console.log('565656',row)
      this.dialogVisible = false
      this.sourceId = row.id
      this.model.sourceIds ? this.model.sourceIds.push(row.id):this.model.sourceIds = [row.id]
      var arr=this.model.sourceIds
      var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (array .indexOf(arr[i]) === -1) {
            array .push(arr[i])
        }
    }
    this.model.sourceIds=array
    // this.model.storeName = row.name
    this.storenickName.push(row.nickName)
    var array1 = [];
    var arr1=this.storenickName
    for (var i = 0; i < arr1.length; i++) {
        if (array1 .indexOf(arr1[i]) === -1) {
            array1 .push(arr1[i])
        }
    }
    this.storenickName=array1
      this.store = row
      this.getStore(row.id)
    },
    getSalesByMobile(){
       var mobile=this.model.mobile;
       if(mobile.length==11){
          this.$http.getSalesByMobile({ mobile:this.model.mobile,type:'member' }).then(res => {
            if(res.data.data==undefined){
                this.inputVisibleName=false;
                this.model.name=''
            }else{
                this.inputVisibleName=true;
                this.model.name=res.data.data.name
                // this.model.sourceIds.push(res.data.data.id)
                // this.model.sourceId=res.data.data.id
            }
          })   
       }else{
           this.inputVisibleName=false;
           this.$message.error('手机号应为11位')
       }
    },
    onSubmit() {
      var sss=this.model;
      this.$refs.model.validate(value => {
        if (value) {
          let model = JSON.parse(JSON.stringify(this.model))
          this.addSalesman(model)
          // this.model.id ? this.updateSalesman(model) : this.addSalesman(model)
        }
      })
    },
    //添加操作
    addSalesman(model) {
      console.log(model)
      this.$http.insertSalesman(model).then(() => {
        this.$message.success('保存成功，2秒后将进行跳转')
        setTimeout(() => {
          this.$router.back()
        }, 2000)
      })
    },
    //更新操作
    updateSalesman(model) {
      this.$http.updateSalesman(model).then(() => {
        this.$message.success('保存成功，2秒后将进行跳转')
        setTimeout(() => {
          this.$router.back()
        }, 2000)
      })
    },
    onClose() {
      this.dialogVisible = false
    },
  }
}
</script>

<style lang="scss" scoped>
.form-item__input {
  width: 400px;
}
.qty-form-wrap {
  padding: 10px;
  width: 700px;
  .qty-form-item {
    &.label {
      width: 100px;
      text-align: center;
      line-height: 16px;
      vertical-align: middle;
    }
    &.value {
      width: 160px;
    }
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
