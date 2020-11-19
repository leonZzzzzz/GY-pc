<template>
  <div>
    <QcTable ref="table" :option="option" :search-form="searchForm" @get-list="onGetList">
      <el-dialog
        title="改价"
        width="400px"
        append-to-body
        :close-on-click-modal="false"
        :visible="changeOrderPrice.formVisible"
        :before-close="onCloseChangeOrder"
      >
        <el-form
          ref="modelDelivery"
          :model="changeOrderPrice.model"
          label-position="left"
          label-width="100px"
        >
          <el-form-item label="商品总价">
            {{ changeOrderPrice.model.needPayTotalAmount / 100 }}
          </el-form-item>
          <el-form-item
            label-width="0px"
            prop="isCutPrice"
            :rules="[{ required: true, message: '该项为必填项' }]"
          >
            <div class="ch-or-div">
              <el-radio v-model="changeOrderPrice.radio" label="cut">降价</el-radio>
              <el-input-number
                v-model="changeOrderPrice.cutNum"
                :precision="2"
                :step="0.5"
              ></el-input-number>
            </div>
            <div class="ch-or-div">
              <el-radio v-model="changeOrderPrice.radio" label="add">涨价</el-radio>
              <el-input-number
                v-model="changeOrderPrice.addNum"
                :precision="2"
                :step="0.5"
              ></el-input-number>
            </div>
          </el-form-item>
          <!-- <el-form-item label="物流服务费"> -->
          <div class="ch-or-div">
            <span>物流服务费</span>
            <span style="margin-left:30px;" v-html="changeOrderPrice.model.transportAmount"></span>
            <!-- <el-input-number
              v-model="changeOrderPrice.model.transportAmount"
              :precision="2"
              :step="0.5"
              type="disable"
            ></el-input-number>-->
            <!-- </el-form-item>  -->
          </div>
          <el-form-item label="总价">
            {{ changeTotalPrice }}
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="onCloseChangeOrder()">关闭</el-button>
          <el-button type="primary" @click="saveChangeOrder()">保存</el-button>
        </span>
      </el-dialog>
      <div>
        <table cellpadding="0" cellspacing="0" class="theader">
          <tbody>
            <tr>
              <td width="300">商品</td>
              <td width="70">单价（元）</td>
              <td width="50">数量</td>
              <td width="120">售后</td>
              <td width="70">订单时间</td>
              <td width="80">订单类型</td>
              <td width="80">订单状态</td>
              <td width="80">配送方式</td>
              <td width="100">支付金额（元）</td>
              <td width="120">买家</td>
              <td width="220">操作</td>
            </tr>
          </tbody>
        </table>
        <div v-if="tableData.length > 0">
          <table
            cellpadding="0"
            cellspacing="0"
            class="table"
            v-for="(item, orderIndex) in tableData"
            :key="orderIndex"
          >
            <tbody>
              <tr style="background: #ebeef5;">
                <td class="bb1" colspan="9" style="text-align:left;">
                  订单编号：{{ item.orderNo }}&nbsp;&nbsp;&nbsp;微信单号：{{
                    item.tradeNo || '--'
                  }}
                  &nbsp;&nbsp;&nbsp;<span style="color:red" v-if="item.isAccounPeriod"
                    >账期订单</span
                  >
                </td>
                <td></td>
                <td v-if="item.invoiceStatus != 'finish'" class="bb1" style="color: rgb(64, 158, 255);cursor: pointer;">
                  <span @click="finishInvoice(item.id)">
                    点击开票完成
                  </span>
                </td>
              </tr>
              <tr v-for="(list, productIndex) in item.orderItems" :key="productIndex">
                <td
                  width="300"
                  class="br1"
                  :class="{ bb1: productIndex < item.orderItems.length - 1 }"
                  style="text-align:left;"
                >
                  <QcProductItem :img="imgHost + list.iconUrl" :title="list.name">{{
                    list.specs
                  }}</QcProductItem>
                </td>
                <td
                  width="70"
                  class="br1"
                  :class="{ bb1: productIndex < item.orderItems.length - 1 }"
                >
                  {{ list.price | formatPrice }}
                </td>
                <td
                  width="50"
                  class="br1"
                  :class="{ bb1: productIndex < item.orderItems.length - 1 }"
                >
                  x{{ list.qty }}
                </td>
                <td
                  width="120"
                  class="br1"
                  :class="{ bb1: productIndex < item.orderItems.length - 1 }"
                >
                  x{{ list.afterSalesStatusName }}
                </td>
                <td
                  width="70"
                  class="br1"
                  v-if="productIndex == 0"
                  :rowspan="item.orderItems.length"
                >
                  {{ item.createTime }}
                </td>
                <td
                  width="80"
                  class="br1"
                  v-if="productIndex == 0"
                  :rowspan="item.orderItems.length"
                >
                  {{ item.bizTypeName }}
                </td>
                <td
                  width="80"
                  class="br1"
                  v-if="productIndex == 0"
                  :rowspan="item.orderItems.length"
                >
                  <div>{{ item.statusName }}</div>
                </td>
                <td
                  width="80"
                  class="br1"
                  v-if="productIndex == 0"
                  :rowspan="item.orderItems.length"
                >
                  <span v-if="item.deliveryWay == 'platformsend'">
                    <div>丰盈配送</div>
                  </span>
                  <span v-if="item.deliveryWay == 'distribution'">
                    <div>店铺配送</div>
                  </span>
                  <span v-if="item.deliveryWay == 'takeout'">
                    <div>自取</div>
                  </span>
                </td>
                <td
                  width="100"
                  class="br1"
                  v-if="productIndex == 0"
                  :rowspan="item.orderItems.length"
                >
                  <div>{{ item.needPayTotalAmount | formatPrice }}</div>
                </td>
                <td
                  class="br1"
                  width="120"
                  v-if="productIndex == 0"
                  :rowspan="item.orderItems.length"
                >
                  <p>{{ item.buyerName }}</p>
                  <p>{{ item.buyerMobile }}</p>
                </td>

                <td width="220" v-if="productIndex == 0" :rowspan="item.orderItems.length">
                  <div>
                      <p class="invoic-div"><span class="invoic-span">发票抬头：</span><span>{{item.invoiceName}}</span></p>
                      <p class="invoic-div"><span class="invoic-span">发票类型：</span><span>{{item.taxNumber ? '企业' : '个人'}}</span></p>
                      <p v-if="item.taxNumber" class="invoic-div"><span class="invoic-span">发票税号：</span><span>{{item.taxNumber}}</span></p>
                      <p class="invoic-div"><span class="invoic-span">电子邮箱：</span><span>{{item.email}}</span></p>
                  </div>
                  <!-- <p class="caozuo-p">发货</p> -->
                </td>
              </tr>
              <tr>
                <td
                  colspan="11"
                  style="border-top: 1px solid #ebeef5;text-align: left;padding-left: 15px; color:#FF6415"
                >
                  买家留言：{{ item.remark || '--' }}&nbsp;&nbsp;卖家备注：{{
                    item.storeRemark || '--'
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else style="padding: 60px;text-align: center;color: #717171;font-size: 14px;">
          暂无数据
        </div>
      </div>
    </QcTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        url: 'api/admin/mall/v1/store/guyuOrder/page'
      },
      searchForm: [
        { formName: 'status', value: 10 },
        { label: '微信订单', formName: 'tradeNo', type: 'input' },
        { label: '订单编号', formName: 'orderNo', type: 'input' },
        { label: '商品名称', formName: 'name', type: 'input' },
        { label: '买家姓名', formName: 'buyerName', type: 'input' },
        { label: '买家手机', formName: 'buyerMobile', type: 'input' },
        {
          type: 'select',
          formName: 'invoice',
          label: '开票状态',
          option: [
            { value: 'apply', label: '开票申请中' },
            { value: 'finish', label: '开票已完成' }
          ],
          value: 'apply'
        }
        // { label: '订单时间', formName: 'startCreateTime_endCreateTime', type: 'date-picker' }
      ],
      tableData: [],
      isCutPrice: true,
      changeOrderPrice: {
        formVisible: false,
        radio: 'add',
        model: {},
        cutNum: 1,
        addNum: 1
      },
      count: {},
      // 功能数据
      deliver: {
        dialog: false,
        model: {}
      }
    }
  },
  computed: {
    changeTotalPrice() {
      if (this.changeOrderPrice.radio === 'add') {
        return this.changeOrderPrice.model.needPayTotalAmount / 100 + this.changeOrderPrice.addNum
      } else {
        return this.changeOrderPrice.model.needPayTotalAmount / 100 - this.changeOrderPrice.cutNum
      }
    }
  },
  filters: {
    formatPrice(val) {
      return val / 100 || 0
    }
  },
  methods: {
    onGetList(list) {
      this.tableData = list
    },
    onSearch(v) {
      this.searchForm[0].value = v.name
      this.$refs.table.transformSearchForm().then(() => {
        this.$refs.table.onSearch()
      })
    },
    changeOrderPriceShow(row) {
      this.changeOrderPrice.model = JSON.parse(JSON.stringify(row))
      this.changeOrderPrice.model.transportAmount /= 100
      this.changeOrderPrice.model.isCutPrice = true
      this.changeOrderPrice.formVisible = true
    },
    onCloseChangeOrder() {
      this.changeOrderPrice.formVisible = false
    },
    saveChangeOrder() {
      this.$refs.modelDelivery.validate(valid => {
        if (valid) {
          let adjustAmount = 0
          if (this.changeOrderPrice.radio === 'add') {
            adjustAmount = this.changeOrderPrice.addNum * 100
          } else {
            adjustAmount = '-' + this.changeOrderPrice.cutNum * 100
          }
          this.$http
            .adjustOrderAmount({ id: this.changeOrderPrice.model.id, adjustAmount })
            .then(() => {
              this.$message.success('修改成功')
              this.$refs.table.onSearch()
              this.onCloseChangeOrder()
            })
        }
      })
    },
    finishInvoice(id) {
      this.$confirm('是否已完成开票?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { 
          this.$http.finishInvoice({ orderId: id }).then(() => {
              this.$refs.table.onSearchKeep()
            })
        })
        .catch(() => {
          return
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border: 1px solid #ebeef5;
  margin-top: 10px;
  font-size: 14px;
  color: #606266;
  td {
    padding: 10px;
    text-align: center;
  }
  .br1 {
    border-right: 1px solid #ebeef5;
  }
  .bb1 {
    border-bottom: 1px solid #ebeef5;
  }
}
.theader {
  width: 100%;
  font-size: 14px;
  background: #ebeef5;
  color: #909399;
  td {
    padding: 15px 10px;
    text-align: center;
  }
}
.caozuo-p {
  margin-top: 5px;
  margin-bottom: 10px;
  margin-right: 20px;
}
.ch-or-div {
  margin: 20px 0px 20px 0px;
}
.ch-or-span {
  margin-right: 10px;
}
.invoic-div{
    text-align: left;
    padding-bottom: 10px;
}
.invoic-span{
    color: rgb(64, 158, 255);
}
</style>
