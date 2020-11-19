<template>
  <QcNavigationPage content="用户信息" style="width:950px;margin:0 auto;">
    <el-form :model="model" ref="model" label-position="right" label-width="100px">
      <QcTitle title="基础信息">
        <el-form-item label="用户手机号" prop="mobile">
          <el-input class="form-item__input" maxlength="11" v-model="model.mobile" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="name" :rules="[{required:true,message:'请填写该字段'}]">
          <el-input class="form-item__input" v-model="model.nickName"  :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="提成比例" prop="salesmanRate" :rules="[{required:true,message:'请填写该字段'}]">
          <el-input class="form-item__input"  v-model="model.salesmanRate"></el-input>（%）
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
    this.$route.query.id && this.getSalesman()
  },
  methods: {
    getStore(id) {
      this.$http.getStore({ id }).then(res => {
        console.log('店铺列表getStore接口返回',res);
      })
    },
    //用户详情
    getSalesman() {
      console.log('用户详情');
      console.log('id',this.$route.query.id);
      this.$http.getSalesman({ id: this.$route.query.id }).then(res => {
        this.model = res.data.data
        this.store.nickName=res.data.data.nickName
        this.$set(this.model)     
      })
    },
    onSubmit() {
      var sss=this.model;
      this.$refs.model.validate(value => {
        if (value) {
          let model = JSON.parse(JSON.stringify(this.model))
          this.model.id ? this.updateSalesman(model) : this.addSalesman(model)
        }
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
