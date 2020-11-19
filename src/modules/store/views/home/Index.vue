<template>
  <div>
    <div class="total-plate">
      <h1 class="total-plate__title">
        实时概况
        <span>更新时间:{{storeRealModel.updateTime}}</span>
      </h1>
      <div class="count-wrap">
        <div class="count-item">
          <div>
            <h2 class="count-item__label">订单（单）</h2>
            <p class="count-item__price">{{storeRealModel.totalNum}}</p>
          </div>
          <div class="count-item__beform">昨日&nbsp;{{storeSurveyModel.totalNum}}</div>
        </div>
        <div class="count-item">
          <div>
            <h2 class="count-item__label">应收金额（元）</h2>
            <p class="count-item__price">{{storeRealModel.mustAmount/100}}</p>
          </div>
          <div class="count-item__beform">昨日&nbsp;{{storeSurveyModel.mustAmount/100}}</div>
        </div>
        <div class="count-item">
          <div>
            <h2 class="count-item__label">订单毛利（元）</h2>
            <p class="count-item__price">{{storeRealModel.orderRelAmount/100}}</p>
          </div>
          <div class="count-item__beform">昨日&nbsp;{{storeSurveyModel.orderRelAmount/100}}</div>
        </div>
        <div class="count-item">
          <div>
            <h2 class="count-item__label">实收金额（元）</h2>
            <p class="count-item__price">{{storeRealModel.relTotalAmount/100}}</p>
          </div>
          <div class="count-item__beform">昨日&nbsp;{{storeSurveyModel.relTotalAmount/100}}</div>
        </div>
        <div class="count-item">
          <div>
            <h2 class="count-item__label">账期金额（元）</h2>
            <p class="count-item__price">{{storeRealModel.paymentAmount/100}}</p>
          </div>
          <div class="count-item__beform">昨日&nbsp;{{storeSurveyModel.paymentAmount/100}}</div>
        </div>
      </div>
    </div>
    <div class="total-plate">
      <h1 class="total-plate__title">
        店铺概览
        <span>更新时间:{{storeRealModel.updateTime}}</span>
      </h1>
      <div class="count-wrap" style="width:800px">
        <div class="count-item">
          <div>
            <h2 class="count-item__label">在架商品数（个）</h2>
            <p class="count-item__price">{{storeRealModel.onlineProductNum}}</p>
            <h2 class="count-item__label">可提现金额（元）</h2>
            <p class="count-item__price">{{storeRealModel.cashAmount/100}}</p>
          </div>
        </div>
        <div class="count-item">
          <div>
            <h2 class="count-item__label">累计客户数（个）</h2>
            <p class="count-item__price">{{storeRealModel.totalMemberNum}}</p>
            <h2 class="count-item__label">待结算金额(未完成交易订单)（元）</h2>
            <p class="count-item__price">{{storeRealModel.settlementAmount/100}}</p>
          </div>
        </div>
        <div class="count-item">
          <div>
            <h2 class="count-item__label">新客户数(最近三个月交易)（个）</h2>
            <p class="count-item__price">{{storeRealModel.threeMonthMemberNum}}</p>
            <h2 class="count-item__label">保证金（元）</h2>
            <p class="count-item__price">{{storeRealModel.surplusMoney/100}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storeRealModel: {},
      storeSurveyModel: {}
    }
  },
  created() {
    this.storeRealTimeSituation()
    this.storeSurveySituation();
  },
  methods: {
    storeRealTimeSituation() {
      this.$http.storeRealTimeSituation().then(res => {
        this.storeRealModel = res.data.data
      })
    },
    storeSurveySituation() {
      this.$http.indexDataYesterday().then(res => {
        console.log(res.data.data);
        this.storeSurveyModel = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.total-plate__title {
  font-size: 18px;
  span {
    color: #b3b3b3;
    font-size: 15px;
  }
}
.total-plate {
  background: #fff;
  padding: 20px;
}
.count-wrap {
  width: 1000px;
  padding: 30px;
  justify-content: space-between;
  display: flex;
  .count-item {
    &__label {
      font-size: 16px;
      color: #b3b3b3;
    }
    &__price {
      margin: 15px 0;
      font-size: 28px;
    }
    &__beform {
      font-size: 16px;
      color: #b3b3b3;
    }
  }
}
</style>