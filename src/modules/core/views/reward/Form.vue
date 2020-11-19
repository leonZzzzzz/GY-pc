<template>
  <div>
    <el-dialog
      title="优惠券"
      width="700px"
      style="margin-top: 1vh!improtant;"
      append-to-body
      :close-on-click-modal="false"
      :visible="formVisible"
      :before-close="close"
    >
      <el-form ref="model" :model="model" label-position="right" label-width="150px">
        <el-form-item label="优惠券规则名称" prop="ruleName" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input v-model="model.ruleName" class="coupon-input"></el-input>
        </el-form-item>
        <el-form-item label="优惠券标题" prop="couponTitle" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input v-model="model.couponTitle" class="coupon-input"></el-input>
        </el-form-item>
        <!-- <el-form-item label="图片" prop="couponIcon" :rules="[{ required: true, message: '该字段不能为空'}]">
          <QcImageUpload
            :body="{imageType:'attachment'}"
            width="100px"
            height="100px"
            v-model="model.couponIcon"
          ></QcImageUpload>
        <p>建议尺寸750 * 320，大小不超过3M</p>
        </el-form-item>-->
        <el-form-item label="面值" prop="couponAmount" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input v-model="model.couponAmount" class="coupon-input"></el-input>
          <el-popover
            width="400"
            style="color:red!important;"
            placement="top-start"
            trigger="hover"
            content="优惠券优惠的金额，例：10"
          >
            <el-button
              class="msg-popu-error pad-popver"
              icon="el-icon-warning-outline"
              slot="reference"
            ></el-button>
          </el-popover>
        </el-form-item>
        <el-form-item
          label="需满足订单金额"
          prop="couponOrderAmount"
          :rules="[{required:true,message:'该项为必填项'}]"
        >
          <el-input v-model="model.couponOrderAmount" class="coupon-input" placeholder="0代表无门槛"></el-input>
          <el-popover
            width="400"
            style="color:red!important;"
            placement="top-start"
            trigger="hover"
            content="使用该优惠券的条件，0代表无门槛使用"
          >
            <el-button
              class="msg-popu-error pad-popver"
              icon="el-icon-warning-outline"
              slot="reference"
            ></el-button>
          </el-popover>
        </el-form-item>
        <el-form-item label="发放总量" prop="totalQuantity" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input v-model="model.totalQuantity" class="coupon-input"></el-input>
          <el-popover
            width="400"
            style="color:red!important;"
            placement="top-start"
            trigger="hover"
            content="平台一共发放该优惠券的总量，例：500"
          >
            <el-button
              class="msg-popu-error pad-popver"
              icon="el-icon-warning-outline"
              slot="reference"
            ></el-button>
          </el-popover>
        </el-form-item>
        <!-- <el-form-item label="每人限领次数" prop="memberReceiveQuantity" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input-number v-model="model.memberReceiveQuantity"></el-input-number>
        </el-form-item>-->
        <el-form-item
          label="一天内最多使用张数"
          prop="memberUseQuantityPerDay"
          :rules="[{required:true,message:'该项为必填项'}]"
        >
          <el-input v-model="model.memberUseQuantityPerDay" class="coupon-input"></el-input>
        </el-form-item>
        <el-form-item
          label="领取时间"
          prop="ruleStartTimeAndruleEndTime"
          :rules="[{ required: true, message: '该字段不能为空'}]"
        >
          <el-date-picker
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="model.ruleStartTimeAndruleEndTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="有效期"
          prop="validTimeAndExpireTime"
          :rules="[{ required: true, message: '该字段不能为空'}]"
        >
          <el-date-picker
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="model.validTimeAndExpireTime"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="优惠券规则描述" prop="ruleDescription" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input v-model="model.ruleDescription" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="优惠券规则详情" prop="content" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input v-model="model.content" type="textarea"></el-input>
        </el-form-item>-->
      </el-form>
      <span slot="footer">
        <el-button @click="close()">关闭</el-button>
        <el-button type="primary" @click="success()">保存</el-button>
      </span>
    </el-dialog>
    <el-form label-position="right" label-width="180px" style="margin:40px 100px;">
      <div v-if="parentId === 'NEW_CUSTMOER_RULES'">
        <el-form-item :label="configItem[0].name">
          <div style="display: flex;align-items: center;">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="NO_ORDER">未下单</el-checkbox>
              <el-checkbox label="JOIN_DAYS">用户加入系统未超过N天</el-checkbox>
            </el-checkbox-group>
            <el-col style="float:right;margin-left: 195px;">
              <el-button type="text" @click="updateNewCustConfig(configItem[0])">保存</el-button>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item
          v-if="configItem[2].key=='JOIN_DAYS' && checkList.findIndex(item => item === 'JOIN_DAYS') != -1"
          :label="configItem[2].name"
        >
          <el-input v-model="configItem[2].value" style="width:300px"></el-input>
          <label style="margin-left:10px">天</label>
          <el-col style="float:right;margin-left:20px">
            <el-button type="text" @click="updateConfigItem(2, true)">保存</el-button>
          </el-col>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item
          v-for="(item,index) in configItem"
          :key="item.id"
          :label="item.name"
          v-if="item.key != 'NO_ORDER'"
        >
          <span v-if="(item.key=='recommend_user_reward')">
            <el-input disabled v-model="item.value" style="width:300px"></el-input>
            <label style="margin-left:10px">元</label>
          </span>
          <span v-else-if="(item.key=='recommend_coupon_num')" style="display:flex">
            <el-input v-model="item.value" style="width:300px"></el-input>
            <label style="margin-left:10px">张</label>
            <el-col style="float:right;margin-left:20px">
              <el-button type="text" @click="updateConfigItem(index, true)">保存</el-button>
            </el-col>
            <el-popover
              width="400"
              style="color:red!important;"
              placement="top-start"
              trigger="hover"
              content="奖励给买家推荐人优惠券的数量，例：5"
            >
              <el-button
                class="msg-popu-error pad-popver"
                icon="el-icon-warning-outline"
                slot="reference"
              ></el-button>
            </el-popover>
          </span>
          <span v-else-if="(item.key=='PLATFORM_TRANSACTION_FEE_DAYS')" style="display:flex">
            <el-input v-model="item.value" style="width:300px"></el-input>
            <label style="margin-left:10px">天</label>
            <el-col style="float:right;margin-left:20px">
              <el-button type="text" @click="updateConfigItem(index, true)">保存</el-button>
            </el-col>
          </span>
          <span v-else-if="(item.key=='PLATFORM_OLD_CUSTOMER_FEE_DAYS')" style="display:flex">
            <el-input v-model="item.value" style="width:300px"></el-input>
            <label style="margin-left:10px">天</label>
            <el-col style="float:right;margin-left:20px">
              <el-button type="text" @click="updateConfigItem(index, true)">保存</el-button>
            </el-col>
          </span>
          <span v-else style="display:flex">
            <el-input v-model="item.value" style="width:300px"></el-input>
            <label style="margin-left:10px">元</label>
            <el-col style="float:right;margin-left:20px;">
              <el-button type="text" @click="updateConfigItem(index)">保存</el-button>
            </el-col>
          </span>
          <el-col
            style="float:right;margin-left:20px;"
            v-if="(item.key=='recommend_user_reward')"
            :span="3"
          >
            <el-button type="text" @click="dakai(item.showValue)">编辑优惠券</el-button>
          </el-col>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<script>
export default {
  props: {
    parentId: String,
    propsKey: String
  },
  data() {
    return {
      model: {},
      configItem: [],
      formVisible: false,
      checkList: [],
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
    dakai(id){
      this.formVisible = true
      this.getCouponDetail(id);
    },
    close() {
      this.model = this.$options.data().model
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
      this.formVisible = false
      // this.$refs.table.onSearchKeep()
      this.clearForm('model')
    },
    success() {
      this.$refs.model.validate(valid => {
        if (valid) {
          let model = JSON.parse(JSON.stringify(this.model))
          model.couponValidTime = model.validTimeAndExpireTime[0]
          model.couponExpireTime = model.validTimeAndExpireTime[1]
          model.ruleStartTime = model.ruleStartTimeAndruleEndTime[0]
          model.ruleEndTime = model.ruleStartTimeAndruleEndTime[1]
          model.couponOrderAmount*=100
          model.couponAmount*=100
          model.couponValidDaysType = '1'
          model.content='规则详情'
          model.ruleDescription='规则描述'
          this.loading = true
          this.saveModel('recommendReward', model)
        }
      })
    },
    saveModel(type, model) {
      this.$http[type](model)
        .then(() => {
          this.loading = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.getConfigItem();
          this.close();
        })
        .catch(() => {
          this.loading = false
        })
    },
    getConfigItem() {
      this.$http.getConfigItem({ parentId: this.parentId, key: this.propsKey }).then(res => {
        console.log(res.data)
        if (this.parentId === 'NEW_CUSTMOER_RULES') {
          if (res.data.data[0].value === 'DEFAULT_RULE') {
            this.checkList = []
          } else {
            this.checkList = res.data.data[0].value.split('-')
            console.log(this.checkList)
          }
          this.configItem = res.data.data
          return
        }
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
   getCouponDetail(id) {
     if(id!=undefined){
        this.$http.getCouonRuleDetail({id}).then(res => {
          this.model = res.data.data
          this.model.validTimeAndExpireTime=[this.model.couponValidTime,this.model.couponExpireTime]
          this.model.ruleStartTimeAndruleEndTime=[this.model.ruleStartTime,this.model.ruleEndTime]
          this.model.couponOrderAmount/=100
          this.model.couponAmount/=100
        })
      }
    },
    // 修改新用户判定规则
    async updateNewCustConfig(item) {
      let res = this.$http.updateNewCustConfig({
        id: item.id,
        value: this.checkList.join('-')
      })
      this.$message.success('保存成功')
    },
    updateConfigItem(index, isNeedZheng) {
      let model = JSON.parse(JSON.stringify(this.configItem[index]))
      if (isNeedZheng) {
        if(!/^\d+$/.test(model.value)) {
          this.$message.warning('请输入非负整数')
          return
        }
      }
      if (model.key != 'JOIN_DAYS') {
        switch (model.showType) {
          case 2: // 百分比
            model.value /= 100
            break
          case 4: // 金额单位/分
            model.value = parseFloat(model.value) * 100
            break
        }
      }
      this.$http.updateConfigItem(model).then(() => {
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
<style scoped>
[role='dialog'] {
  margin-top: 2vh !important;
}
.el-form-item__content .el-input {
  width: 72%;
}
.pad-popver {
  padding: 0 20px;
}
.qc-navigation-menu {
  width: 830px !important;
}
</style>