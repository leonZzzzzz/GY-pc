<template>
  <div>
    <!-- <p class="config-title">综合服务费配置</p>
    <FormBlock parent-id="PLATFORM_DELIVERY" style="margin-left:0" />-->
    <p class="config-title">
      丰盈配送配置
      <el-popover
        width="400"
        style="color:red!important"
        placement="top-start"
        trigger="hover"
        content="丰盈配送的配送订单最低金额、配送时间段、发货地址"
      >
        <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
      </el-popover>
    </p>
    <el-form label-width="140px" label-position="right">
      <template v-for="item in fyDelivery">
        <el-form-item
          v-if="item.key == 'PLATFORM_DELIVERY_LOWEST'"
          :key="item.id"
          :label="item.name"
        >
          <el-row style="display:flex">
            <el-col>
              <el-input v-model="item.value"></el-input>
            </el-col>
            <el-col>
              &nbsp;&nbsp;&nbsp;
              <el-button type="text" @click="updateConfigItem(item, item.key)">保存</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          v-if="item.key == 'PLATFORM_SERVICE_FEE_PACK'"
          :key="item.id"
          :label="item.name"
        >
          <el-row>
            <el-col>
              <el-input v-model="item.value"></el-input>
            </el-col>
            <el-col>
              &nbsp;&nbsp;&nbsp;
              <el-button type="text" @click="updateConfigItem(item, item.key)">保存</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-if="item.key == 'PLATFORM_DELIVERY_TIME'" :key="item.id" :label="item.name">
          <el-row style="display:flex">
            <el-col>
              <el-time-select
                :clearable="false"
                style="width:100px;margin-right:10px"
                placeholder="起始时间"
                v-model="item.value[0]"
                :picker-options="{ start: '00:00', step: '00:15', end: '23:59' }"
              ></el-time-select>
              <el-time-select
                :clearable="false"
                style="width:100px"
                placeholder="结束时间"
                v-model="item.value[1]"
                :picker-options="{ start: '00:00', step: '00:15', end: '23:59', minTime: item.value[0] }"
              ></el-time-select>
            </el-col>
            <el-col>
              &nbsp;&nbsp;&nbsp;
              <el-button type="text" @click="updateConfigItem(item, item.key)">保存</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          v-if="item.key == 'PLATFORM_DELIVERY_ADDRESS'"
          :key="item.id"
          :label="item.name"
        >
          <el-row>
            <el-col>
              <el-input v-model="item.value"></el-input>
            </el-col>
            <el-col>
              &nbsp;&nbsp;&nbsp;
              <el-button type="text" @click="updateConfigItem(item, item.key)">保存</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </template>
    </el-form>
    <p class="config-title">
      丰盈配送时间段
      <el-popover
        width="400"
        style="color:red!important"
        placement="top-start"
        trigger="hover"
        content="可配置多个配送时间段,供用户下单时选择合适的配送时间"
      >
        <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
      </el-popover>
    </p>
    <el-form label-width="140px" label-position="left">
      <template v-for="item in deliveryTime">
        <el-form-item :key="item.id">
          <el-row>
            <el-col style="display:flex">
              <el-time-select
                :clearable="false"
                style="width:100px;margin-right:10px"
                placeholder="起始时间"
                v-model="item.value[0]"
                :picker-options="{ start: '00:00', step: '00:15', end: '23:59' }"
              ></el-time-select>
              <el-time-select
                :clearable="false"
                style="width:100px"
                placeholder="结束时间"
                v-model="item.value[1]"
                :picker-options="{ start: '00:00', step: '00:15', end: '23:59', minTime: item.value[0] }"
              ></el-time-select>
            </el-col>
            <el-col style="margin-left:20px;margin-right:20px;">
              <el-button type="text" @click="updateFyDeliveryTime(item, item.id)">保存</el-button>
            </el-col>
            <el-col>
              <el-button type="text" @click="deletedFyDeliveryTime(item.id)">删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </template>
      <div style="margin-left:137px" @click="addFyDeliveryTime()">
        <el-button type="text">+ 添加一个时间段</el-button>
      </div>
    </el-form>
    <p class="config-title">
      配送起步价(超出范围不可使用丰盈配送)
      <!-- <el-popover width="400" style="color:red!important" placement="top-start" trigger="hover" content="配送计算公式：起步价 + 商品A重量 * 商品A配送品类系数 + 商品B重量 * 商品B配送品类系数 + 店铺包装服务费"> -->
      <el-popover
        width="400"
        style="color:red!important"
        placement="top-start"
        trigger="hover"
        content="配送计算公式：起步价 + 商品A重量 * 商品A配送品类系数 + 商品B重量 * 商品B配送品类系数"
      >
        <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
      </el-popover>
    </p>
    <el-form label-width="140px" label-position="right">
      <el-form-item v-for="item in delivery" :key="item.id">
        <el-row>
          <el-col>
            <el-input v-model="item.value[0]"></el-input>
          </el-col>
          <el-col style="text-align:center">至</el-col>
          <el-col>
            <el-input v-model="item.value[1]"></el-input>
          </el-col>
          <el-col style="text-align:center">公里：</el-col>
          <el-col>
            <el-input v-model="item.value[2]"></el-input>
          </el-col>
          <el-col>&nbsp;&nbsp;元</el-col>
          <el-col>
            <el-button type="text" @click="updateConfigItem(item)">保存</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { PRICE } from '@/utils/regex'
import FormBlock from './Form'
export default {
  props: {
    parentId: String
  },
  components: {
    FormBlock
  },
  data() {
    return {
      fyDelivery: [],
      delivery: [],
      deliveryTime:[]
    }
  },
  created() {
    this.getFYDelivery()
    this.getDelivery()
    this.getDeliveryTime()
  },
  methods: {
    getFYDelivery() {
      this.$http.getConfigItem({ parentId: 'PLATFORM_DELIVERY' }).then(res => {
        this.fyDelivery = res.data.data.map(item => {
          if (item.key == 'PLATFORM_DELIVERY_TIME') {
            item.value = item.value.split('-')
          }
          if (item.key == 'PLATFORM_DELIVERY_LOWEST') {
            item.value = item.value /= 100
          }
          return item
        })
      })
    },
    getDelivery() {
      this.$http.getConfigItem({ parentId: 'PLATFORM_START_PRICE' }).then(res => {
        this.delivery = res.data.data.map(item => {
          item.value = item.value.split('-')
          item.value[2] /= 100
          return item
        })
      })
    },
    getDeliveryTime() {
      this.$http.getConfigItem({ parentId: 'FY_DELIVERY_TIME' }).then(res => {
        this.deliveryTime = res.data.data.map(item => {
            item.value = item.value.split('-')
            return item
        })
      })
    },
    addFyDeliveryTime(){
        var item={ "type": 0, "parentId": "FY_DELIVERY_TIME", "name": "配送时间段", "value": [ "06:00", "12:30" ],seqNum:0,"isShow": true, "showType": 2 }
        this.deliveryTime.push(item);
    },
    deletedFyDeliveryTime(id){
      console.log(id+"---id");
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          if(id!=undefined){
            this.$http.deleteConfigItem({ id }).then(() => {
              this.$message.success('删除成功');
              this.getDeliveryTime();
            })
          }else{
              this.$message.success('删除成功');
              this.getDeliveryTime();
          }
        })        
        .catch(() => {
          return
        })
    },
    updateFyDeliveryTime(item,key){
      let model = JSON.parse(JSON.stringify(item))
      model.value = model.value.join('-')
      if(!key){
        model.key=model.value
        this.$http.insertConfigItem(model).then(() => {
            this.$message.success('保存成功')
         })            
      }else{
        this.$http.updateConfigItem(model).then(() => {
            this.$message.success('保存成功')
         })
      }
    },
    updateConfigItem(item, key) {
      let model = JSON.parse(JSON.stringify(item))
      if (!key) {
        if (!/^\d+$/.test(model.value[0])) {
          this.$message.error('请输入正确的值')
          return
        } else if (!/^\d+$/.test(model.value[1])) {
          this.$message.error('请输入正确的值')
          return
        } else if (!PRICE.test(model.value[2])) {
          this.$message.error('请输入正确的金额')
          return
        }
        // model.value[2] *= 100
        model.value[2] = parseFloat(model.value[2]) * 100
        model.value = model.value.join('-')
      } else if (key == 'PLATFORM_DELIVERY_TIME') {
        model.value = model.value.join('-')
      } else if (key == 'PLATFORM_DELIVERY_LOWEST' || key == 'PLATFORM_SERVICE_FEE_PACK') {
        if (!PRICE.test(model.value)) {
          this.$message.error('请输入正确的金额')
          return
        }
        model.value = parseFloat(model.value) * 100
      }
      this.$http.updateConfigItem(model).then(() => {
        this.$message.success('保存成功')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.config-title {
  margin: 60px 0 20px 140px;
  font-size: 20px;
  font-weight: 600;
}
.el-row {
  display: flex;
}
</style>