<template>
  <div class="product-order-detail">
    <div class="product-order-detail__status">
      <p class="status">{{ model.status }}</p>
      <div>
        <!-- <el-button
          size="small"
          @click="orderCompensationVisible = true"
          v-if="compensationStatus.showCompensationApply"
          >申请赔付</el-button
        >
        <el-button
          v-if="compensationStatus.compensationIsOngoing"
          size="small"
          @click="orderCompensationHistoryVisible = true"
          >赔付中...</el-button
        >
        <el-button
          v-if="compensationStatus.showCompensationHistory"
          size="small"
          @click="orderCompensationHistoryVisible = true"
          >赔付详情</el-button
        >-->
        <el-button
          size="small"
          type="primary"
          v-if="model.statusValue == 1 || model.statusValue == 7"
          @click="addGuyuExpress()"
        >商品发货</el-button>
      </div>
    </div>

    <div class="product-order-detail__info">
      <div class="info-plate">
        <QcTextPlate title="订单信息">
          <QcTextPlateItem label="订单编号：">{{ model.number }}</QcTextPlateItem>
          <QcTextPlateItem label="订单类型：">{{ model.type }}</QcTextPlateItem>
          <QcTextPlateItem label="门店：">{{ model.storeName }}</QcTextPlateItem>
          <QcTextPlateItem label="订单来源：">{{ model.source }}</QcTextPlateItem>
          <QcTextPlateItem label="下单时间：">{{ model.createTime }}</QcTextPlateItem>
          <QcTextPlateItem label="完成时间：">{{ model.finishTime || '--' }}</QcTextPlateItem>
          <QcTextPlateItem label="购买用户：">{{ model.buyer }}&nbsp;&nbsp;&nbsp;{{ model.buyerMobile }}</QcTextPlateItem>
        </QcTextPlate>
      </div>
      <div class="info-plate">
        <QcTextPlate title="收货人信息">
          <QcTextPlateItem label="收货人：">{{ model.receiver }}</QcTextPlateItem>
          <QcTextPlateItem label="地址：">{{ model.receiverAddress }}</QcTextPlateItem>
          <QcTextPlateItem label="手机号码：">{{ model.receiverMobile }}</QcTextPlateItem>
          <QcTextPlateItem label="买家留言：">{{ model.remark || '--' }}</QcTextPlateItem>
        </QcTextPlate>
      </div>
      <div class="info-plate">
        <QcTextPlate v-if="model.payStatus==3" title="支付信息">
          <QcTextPlateItem label="支付方式：">{{ model.payWay }}</QcTextPlateItem>
          <QcTextPlateItem label="支付时间：">{{ model.payTime }}</QcTextPlateItem>
        </QcTextPlate>
      </div>
    </div>
    <OrderDeliveryList :order-id="model.id" />
    <div class="product-order-detail__product">
      <el-table :data="model.itemList" size="small">
        <el-table-column label="商品" width="450px">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="4">
                <el-image :src="imgHost + scope.row.icon" style="width:50px;height:50px">
                  <div slot="error" class="el-image__error">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </el-col>
              <el-col :span="20">
                <div>
                  <p>{{ scope.row.name }}</p>
                  <p style="color:#878787">{{ scope.row.spec }}</p>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="单价" align="center">
          <template slot-scope="scope">
            <div>￥{{ scope.row.price | formatPrice }}</div>
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center">
          <template slot-scope="scope">x{{ scope.row.quantity }}</template>
        </el-table-column>
        <!-- <el-table-column label="发货状态" align="center">
          <template slot-scope="scope">{{ scope.row.expressed ? '已发货' : '待发货' }}</template>
        </el-table-column>-->
        <el-table-column label="售后记录" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.afterSaleItemList">{{ scope.row.afterSaleItemList.length }}条</div>
            <div v-else>无</div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.expressQuantity <= 0"
              @click="onShowOrderRefundDialog(scope.$index)"
              size="mini"
              type="primary"
              >退款</el-button
            >
          </template>
        </el-table-column>-->
      </el-table>
      <div class="total-plate">
        <QcTextPlate>
          <QcTextPlateItem label="商品金额：">￥{{ model.productAmount | formatPrice }}（元）</QcTextPlateItem>
          <QcTextPlateItem
            v-if="model.transportAmount>0"
            label="总物流服务费："
          >￥+{{ model.transportAmount | formatPrice }}（元）</QcTextPlateItem>
          <QcTextPlateItem v-if="model.transportAmount<=0" label="总物流服务费：">￥+0（元）</QcTextPlateItem>
          <QcTextPlateItem
            v-if="model.storeCouponPayAmount>0"
            label="档口优惠："
          >￥ -{{ model.storeCouponPayAmount | formatPrice }}（元）</QcTextPlateItem>
          <QcTextPlateItem v-if="model.storeCouponPayAmount<=0" label="档口优惠：">￥ -0（元）</QcTextPlateItem>
          <QcTextPlateItem
            v-if="model.couponPayAmount>0"
            label="平台优惠："
          >￥ -{{ model.couponPayAmount | formatPrice }}（元）</QcTextPlateItem>
          <QcTextPlateItem v-if="model.couponPayAmount<=0" label="平台优惠：">￥ -0（元）</QcTextPlateItem>
          <QcTextPlateItem
            v-if="model.adjustAmount>0"
            label="调整金额："
          >￥+{{ model.adjustAmount | formatPrice }}（元）</QcTextPlateItem>
          <QcTextPlateItem
            v-if="model.adjustAmount<=0"
            label="调整金额："
          >￥{{ model.adjustAmount | formatPrice }}（元）</QcTextPlateItem>
          <QcTextPlateItem
            v-if="model.transportCouponAmount>0"
            label="运费券优惠："
          >￥ -{{ model.transportCouponAmount | formatPrice }}（元）</QcTextPlateItem>
          <QcTextPlateItem
            v-if="model.transportDiscountAmount>0"
            label="运费补贴："
          >￥ -{{ model.transportDiscountAmount | formatPrice }}（元）</QcTextPlateItem>
          <QcTextPlateItem label="合计：">￥{{ totalAmount | formatPrice }}（元）</QcTextPlateItem>
        </QcTextPlate>
      </div>
    </div>
    <OrderRefundDialog
      :visible="orderRefundVisible"
      :order-id="model.id"
      :product="refundProduct"
      @onClose="onCloseOrderRefundDialog"
    />
    <OrderCompensationDialog
      :order-id="model.id"
      :visible="orderCompensationVisible"
      @close="onCloseOrderCompensationDialog"
    />
    <OrderCompenstaionHistoryDialog
      :order-id="model.id"
      :visible="orderCompensationHistoryVisible"
      @close="orderCompensationHistoryVisible = false"
    />
  </div>
</template>

<script>
import OrderRefundDialog from './OrderRefundDialog'
// import OrderDeliveryDialog from './OrderDeliveryDialog'
import OrderCompensationDialog from './OrderCompensationDialog'
import OrderCompenstaionHistoryDialog from './OrderCompenstaionHistoryDialog'
import OrderDeliveryList from './OrderDeliveryList'
export default {
  components: {
    OrderRefundDialog,
    // OrderDeliveryDialog,
    OrderCompensationDialog,
    OrderCompenstaionHistoryDialog,
    OrderDeliveryList
  },
  data() {
    return {
      model: {},
      orderRefundVisible: false,
      refundProduct: {},
      orderCompensationVisible: false,
      compensationStatus: {},
      orderCompensationHistoryVisible: false
    }
  },
  computed: {
    totalAmount() {
      return (
        this.model.productAmount +
        this.model.transportAmount +
        this.model.adjustAmount -
        this.model.storeCouponPayAmount -
        this.model.couponPayAmount -
        this.model.transportCouponAmount -
        this.model.transportDiscountAmount
      )
    },
    products() {
      if (!this.model.itemList) return
      let product = JSON.parse(JSON.stringify(this.model.itemList))
      return product.filter(res => {
        return !res.expressed && res.expressQuantity > 0
      })
    },
    address() {
      return {
        receiver: this.model.receiver,
        mobile: this.model.receiverMobile,
        address: this.model.receiverAddress,
        province: this.model.province,
        city: this.model.city,
        area: this.model.area
      }
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    getOrder() {
      this.$http.getOrder({ id: this.$route.query.id }).then(res => {
        this.model = res.data.data
        this.statusOrderCompensation(this.model.id)
      })
    },
    //#region 退款
    onShowOrderRefundDialog(index) {
      this.refundProduct = this.model.itemList[index]
      this.orderRefundVisible = true
    },
    onCloseOrderRefundDialog(update) {
      if (update) {
        this.getOrder()
      }
      this.orderRefundVisible = false
    },
    //#endregion

    //#region 赔付
    statusOrderCompensation(orderId) {
      this.$http.statusOrderCompensation({ orderId }).then(res => {
        this.compensationStatus = res.data.data
      })
    },
    onCloseOrderCompensationDialog(update) {
      if (update) {
        this.getOrder()
      }
      this.orderCompensationVisible = false
    },
    addGuyuExpress() {
      this.$confirm('是否确认发货', '提示')
        .then(() => {
          this.$http.addGuyuExpress({ id: this.$route.query.id }).then(() => {
            this.$message.success('发货成功')
            this.getOrder()
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.product-order-detail {
  width: 1100px;
  margin: 0 auto;
  &__status {
    margin-bottom: 30px;
    padding: 35px;
    background: #fef5e5;
    border: 1px solid #ffd68a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .status {
      font-size: 26px;
      color: #ca2108;
    }
  }
  &__info {
    padding: 30px 15px;
    background: #fff;
    display: flex;
    margin-bottom: 30px;
    .info-plate {
      flex: 1;
      padding-right: 20px;
      &:not(:last-child) {
        margin-right: 20px;
        border-right: 1px solid #eee;
      }
    }
  }
  &__product {
    background: #fff;
    overflow: hidden;
    padding-bottom: 40px;
    .total-plate {
      float: right;
      padding: 30px 40px 0 0;
    }
  }
}
</style>
