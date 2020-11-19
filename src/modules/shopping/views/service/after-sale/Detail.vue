<template>
  <div class="service-order-detail">
    <div class="plate" style="display: flex;justify-content: space-between;align-items: center;">
      <p style="font-size: 22px;">{{ model.statusName }}</p>
      <div>
        <template v-if="model.status == 1">
          <el-button type="primary" @click="orderAftersalesRefundAgreeForGuyu(model.id)"
            >同意申请</el-button
          >
          <el-button type="primary" @click="orderAftersalesRefundRefuseForGuyu(model.id)"
            >拒绝申请</el-button
          >
        </template>
        <template v-else-if="model.status == 2">
          <el-button @click="orderAftersalesRefundAmountForGuyu(model.id, model.needRefundAmount)"
            >操作退款</el-button
          >
        </template>
      </div>
    </div>
    <div
      class="plate"
      v-if="model.storeRemark"
      style="margin-top: -30px;padding: 10px 15px;background: #fff8e5;font-size: 14px;color: #ff782c;"
    >
      卖家备注：{{ model.storeRemark }}
    </div>
    <div class="plate flows">
      <QcTextPlate title="退款信息">
        <QcTextPlateItem label="退款编号：">{{ model.orderNumber }}</QcTextPlateItem>
        <QcTextPlateItem label="订单编号：">{{ model.order.orderNo }}</QcTextPlateItem>
        <QcTextPlateItem label="买家电话：">{{ model.order.mobile }}</QcTextPlateItem>
        <QcTextPlateItem label="申请时间：">{{ model.createTime }}</QcTextPlateItem>
        <QcTextPlateItem label="申请原因：">{{ model.reasonType }}</QcTextPlateItem>
        <QcTextPlateItem label="备注信息：" v-if="model.reason">{{ model.reason }}</QcTextPlateItem>
        <QcTextPlateItem label="图片举证：" v-if="model.voucherImage">
          <el-image
            v-for="img in model.voucherImage.split(',')"
            :key="img"
            :src="imgHost + img"
            style="width:100px;height:100px;"
          >
            <div slot="error" class="el-image__error">
              <i class="el-icon-picture-outline"></i></div
          ></el-image>
        </QcTextPlateItem>
      </QcTextPlate>
    </div>
    <el-table :data="model.afterSalesItemList" :span-method="objectSpanMethod">
      <el-table-column label="商品">
        <template slot-scope="scope">
          <div style="display:flex">
            <el-image
              :src="`${imgHost}${scope.row.icon}`"
              fit="cover"
              style="flex:70px 0;height:70px;"
            >
              <div slot="error" class="el-image__error">
                <i class="el-icon-picture-outline"></i></div
            ></el-image>
            <div style="margin-left:10px;flex:1">
              <p class="title">{{ scope.row.name }}</p>
              <p class="title">{{ scope.row.spec }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" width="200px">
        <template>
          <div>{{ model.statusName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="订单金额(元)" align="center" width="150px">
        <template>{{ model.order.totalAmount | formatPrice }}</template>
      </el-table-column>
      <el-table-column label="退款金额(元)" align="center" width="150px">
        <template>{{ model.refundAmount | formatPrice }}</template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="重新发货"
      :visible="expressModelVisible"
      :show-close="false"
      append-to-body
      width="520px"
    >
      <el-form label-width="85px" label-position="left">
        <el-form-item style="margin:0" label="收货人：">{{ model.receiver }}</el-form-item>
        <el-form-item style="margin:0" label="收货手机：">{{ model.mobile }}</el-form-item>
        <el-form-item label="收货地址：">{{ model.address }}</el-form-item>
        <el-form-item label="快递信息：">
          <el-input placeholder="请输入物流单号" v-model="expressModel.expressNumber">
            <el-select
              slot="prepend"
              style="width:130px"
              placeholder="选择快递"
              v-model="expressModel.expressCompany"
            >
              <el-option
                :value="item.value"
                :label="item.value"
                v-for="item in logisticsData"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="expressClose()">取消</el-button>
          <el-button type="primary" @click="orderAfterSalesExchangeGoodsDelivery()">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 重新发货
      expressModelVisible: false,
      expressModel: {
        expressCompany: '',
        expressNumber: ''
      },
      // 快递列表
      logisticsData: [],
      model: {
        order: {}
      }
    }
  },
  created() {
    this.getServiceOrder()
    this.getLogisticsCompanyList()
  },
  methods: {
    getLogisticsCompanyList() {
      this.$http.getLogisticsCompanyList({ parentId: 'SHOPPING_LOGISTICS_COMPANY' }).then(res => {
        this.logisticsData = res.data.data
      })
    },
    getServiceOrder() {
      this.$http.getServiceOrder({ id: this.$route.query.id }).then(res => {
        this.model = res.data.data
      })
    },

    orderAftersalesRefundAgreeForGuyu(afterSaleOrderId) {
      this.$confirm('确定要同意退款申请吗？', '同意申请', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.orderAftersalesRefundAgreeForGuyu({ afterSaleOrderId }).then(() => {
            this.getServiceOrder()
          })
        })
        .catch(() => {})
    },
    orderAftersalesRefundAmountForGuyu(afterSaleOrderId, refundAmount) {
      // let price = refundAmount / 100
      this.$prompt('', '请输入退款金额', {
        confirmButtonText: '确定',
        inputValue: 0,
        inputPattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      })
        .then(({ value }) => {
          this.$http
            .orderAftersalesRefundAmountForGuyu({ afterSaleOrderId, refundAmount: value * 100 })
            .then(() => {
              this.getServiceOrder()
            })
        })
        .catch(() => {})
    },
    orderAftersalesRefundRefuseForGuyu(afterSaleOrderId) {
      this.$prompt('', '拒绝原因', {
        confirmButtonText: '拒绝申请',
        inputValue: ''
      }).then(({ value }) => {
        this.$http
          .orderAftersalesRefundRefuseForGuyu({ afterSaleOrderId, refuseReason: value })
          .then(res => {
            this.getServiceOrder()
          })
          .catch(() => {})
      })
    },
    objectSpanMethod({ columnIndex }) {
      if (columnIndex > 2) {
        return {
          rowspan: this.model.afterSalesItemList.length,
          colspan: 1
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.service-order-detail {
  width: 1100px;
  margin: 0 auto;
  .plate {
    padding: 30px 15px;
    background: #fff;
    display: flex;
    margin-bottom: 30px;
  }
  .flows {
    &__timeline {
      display: inline-block;
      width: 725px;
      height: 200px;
      overflow: auto;
      padding-top: 10px;
      padding-left: 55px;
      margin-left: 55px;
      box-sizing: border-box;
      border-left: 1px solid #eee;
    }
  }
  .product-order-detail__info {
    .info-plate {
      flex: 1;
      padding-right: 20px;
      &:not(:last-child) {
        margin-right: 20px;
        border-right: 1px solid #eee;
      }
    }
  }
}
</style>
