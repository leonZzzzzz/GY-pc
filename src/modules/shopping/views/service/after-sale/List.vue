<template>
  <div>
    <QcTable ref="table" :menu="menu" :option="option" :search-form="searchForm" @get-list="onGetList">
      <div>
        <el-tabs
          v-model="searchForm[2].value"
          @tab-click="onSearch"
          type="card"
          style="margin:0 15px"
        >
          <el-tab-pane :label="`全部(${count.totalQuantity || 0})`" name=" "></el-tab-pane>
          <el-tab-pane :label="`待处理(${count.unhandleQuantity || 0})`" name="1"></el-tab-pane>
          <el-tab-pane :label="`待退款(${count.unrefundQuantity || 0})`" name="2"></el-tab-pane>
          <el-tab-pane :label="`同意退款(${count.agreeQuantity || 0})`" name="0"></el-tab-pane>
          <el-tab-pane :label="`拒绝退款(${count.refuseQuantity || 0})`" name="-1"></el-tab-pane>
          <el-tab-pane :label="`退款失败(${count.failureQuantity || 0})`" name="-3"></el-tab-pane>
        </el-tabs>
        <table cellpadding="0" cellspacing="0" class="theader">
          <tbody>
            <tr>
              <td width="300">商品</td>
              <td width="80">订单状态</td>
              <td width="70">订单金额（元）</td>
              <td width="100">退款金额（元）</td>
              <td width="70">申请时间</td>
              <td width="70">退款时间</td>
              <td width="80">退款状态</td>
              <td width="120">操作</td>
            </tr>
          </tbody>
        </table>
        <div v-if="tableData.length > 0">
          <table
            cellpadding="0"
            cellspacing="0"
            class="table"
            v-for="(item, orderIndex) in tableData"
            :key="orderIndex">
            <tbody>
              <tr style="background: #ebeef5;">
                <td class="bb1" colspan="7" style="text-align:left;">
                  退款编号：{{ item.orderNumber }}&nbsp;&nbsp;&nbsp;&nbsp;订单编号：{{
                    item.orderNo
                  }}
                </td>
                <td class="bb1">
                  <span
                    @click="$router.push(`/main/mall/service/after-sale/detail?id=${item.id}`)"
                    style="color: #2a75ed;cursor: pointer;"
                    >查看详情</span
                  >
                  -
                  <span
                    style="color: #2a75ed;cursor: pointer;"
                    @click="getServiceRemark(item.orderId)"
                    >备注</span
                  >
                </td>
              </tr>
              <tr v-for="(list, productIndex) in item.afterSalesItemList" :key="productIndex">
                <td
                  width="300"
                  class="br1"
                  :class="{ bb1: productIndex < item.afterSalesItemList.length - 1 }"
                  style="text-align:left;"
                >
                  <QcProductItem :img="imgHost + list.icon" :title="list.name">{{
                    list.spec
                  }}</QcProductItem>
                </td>
                <td
                  width="80"
                  class="br1"
                  v-if="productIndex == 0"
                  :rowspan="item.afterSalesItemList.length"
                >
                  <div>{{ item.orderStatusName }}</div>
                </td>
                <td
                  width="70"
                  class="br1"
                  :class="{ bb1: productIndex < item.afterSalesItemList.length - 1 }"
                >
                  {{ item.orderAmount | formatPrice }}
                </td>
                <td
                  width="100"
                  class="br1"
                  v-if="productIndex == 0"
                  :rowspan="item.afterSalesItemList.length"
                >
                  {{ item.refundAmount | formatPrice }}
                </td>
                <td
                  width="70"
                  class="br1"
                  v-if="productIndex == 0"
                  :rowspan="item.afterSalesItemList.length"
                >
                  {{ item.createTime }}
                </td>
                <td
                  width="70"
                  class="br1"
                  v-if="productIndex == 0"
                  :rowspan="item.afterSalesItemList.length"
                >
                  {{ item.createTime }}
                </td>
                <td
                  width="80"
                  class="br1"
                  v-if="productIndex == 0"
                  :rowspan="item.afterSalesItemList.length"
                >
                  <div>{{ item.statusName }}</div>
                </td>

                <td width="120" v-if="productIndex == 0" :rowspan="item.afterSalesItemList.length">
                  <template v-if="item.status == 1">
                    <el-button type="text" @click="orderAftersalesRefundAgreeForGuyu(item.id)"
                      >同意申请</el-button
                    >
                    <el-button type="text" @click="orderAftersalesRefundRefuseForGuyu(item.id)"
                      >拒绝申请</el-button
                    >
                  </template>
                  <template v-else-if="item.status == 2">
                    <el-button
                      type="text"
                      @click="orderAftersalesRefundAmountForGuyu(item.id, item.refundAmount)"
                      >操作退款</el-button
                    >
                  </template>
                  <template v-else>--</template>
                </td>
              </tr>
              <tr>
                <td
                  colspan="9"
                  style="border-top: 1px solid #ebeef5;text-align: left;padding-left: 15px;"
                >
                  卖家备注：{{ item.storeRemark || '--' }}
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
    <el-dialog
      title="卖家备注"
      width="550px"
      append-to-body
      :close-on-click-modal="false"
      :visible="remarkVisible"
      :before-close="remarkClose"
      >
      <el-form v-if="remarkVisible" ref="remarkModel" :model="remarkModel" size="small" label-position="right" label-width="auto">
        <el-form-item label="图片" prop="images" :rules="[{required:false,message:'该项为必填项'}]">
          <div>
            <p v-if="remarkImg.length > 0" style="color: #888;">已上传的</p>
            <el-image v-for="(item, i) in remarkImg" 
              class="remarkImg"
              :key="i" 
              :src="`${imgHost}${item}`" 
              @click="onPreview(imgHost + item)"
              fit="cover"></el-image>
          </div>
          <UpLoadRemarkFile :orderid="remarkModel.id" :limit="remarkImgLimit" @on-remove="fileRemove" @on-success="fileSuccess"/>
          <!-- <UpLoadRemarkFile :limit="9" :file-list="fileList" @on-remove="fileRemove" @on-success="fileSuccess" /> -->
        </el-form-item>
        <el-form-item label="备注" prop="storeRemark" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input v-model="remarkModel.storeRemark" 
            type="textarea" 
            :autosize="{ minRows: 3, maxRows: 4}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="onSubmitRemark">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UpLoadRemarkFile from '../UploadFile'
export default {
  components: { UpLoadRemarkFile },
  data() {
    return {
      remarkVisible: false,
      remarkModel: {
        id: '',
        remarkModel: '',
        images: ''
      },
      remarkImg: [],
      fileList: [],
      option: {
        url: 'api/admin/mall/v1/after-sale/guyu-refund/page'
      },
      searchForm: [
        { label: '订单编号', formName: 'orderNo', type: 'input' },
        { label: '售后单号', formName: 'orderNumber', type: 'input' },
        { formName: 'status', value: ' ' },
        {
          label: '申请时间',
          formName: 'startCreateTime_endCreateTime',
          type: 'date-picker',
          el: {
            type: 'daterange',
            rangeSeparator: '至',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd'
          }
        }
      ],
      menu: [
        {
          type: 'export',
          label: '导出',
          url: this.projectUrl + '/api/admin/mall/v1/after-sale/guyu-refund/export?'
        }
      ],
      tableData: [],
      count: {}
    }
  },
  computed: {
    remarkImgLimit() {
      return Math.abs(this.remarkImg.length + this.fileList.length - 9)
    }
  },
  created() {
    this.$http.get('api/admin/mall/v1/after-sale/guyu-refund/getStatusQuantity').then(res => {
      this.count = res.data.data
    })
  },
  methods: {
    onGetList(list) {
      this.tableData = list
    },
    onSearch(v) {
      this.searchForm[2].value = v.name
      this.$refs.table.transformSearchForm().then(() => {
        this.$refs.table.onSearch()
      })
    },
    onPreview(url) {
      window.open(url)
    },
    updateServiceRemark(data) {
      this.$http.updateServiceRemark(data).then(rse => {
        this.$message.success('备注成功')
        this.remarkClose()
        this.$refs.table.onSearchKeep()
      })
    },
    remarkClose() {
      this.remarkVisible = false
      this.remarkModel = {}
      this.fileList = []
      this.remarkImg = []
    },
    getServiceRemark(id) {
      this.remarkVisible = true
      this.remarkModel.id = id || ''
      if (!id) return
      this.$http.getServiceRemark({ id }).then(res => {
        this.remarkModel = res.data.data  
        let fileList = []
        let { images, storeRemark } = this.remarkModel
        if (!this.remarkModel.id) this.remarkModel.id = id
        if (!storeRemark) this.remarkModel.storeRemark = ''
        if (images) {
          this.remarkImg = images.split('_')
        } else {
          this.remarkImg = []
        }
        this.fileList = []
      })
    },
    onSubmitRemark() {
      let data = {
        id: this.remarkModel.id || '',
        storeRemark: this.remarkModel.storeRemark,
        images: ''
      }
      let fileList = JSON.parse(JSON.stringify(this.fileList))
      if (fileList && fileList.length > 0) {
        data.images = this.fileList.map(item => {
          let url = item.url.replace(this.imgHost, '')
          return url
        })
        data.images  = data.images.join('_')
      }
      if (this.remarkImg && this.remarkImg.length > 0) {
        if (data.images) data.images += '_'
        data.images += this.remarkImg.join('_')
      }
      if (!data.storeRemark) {
        this.$message.warning('请输入备注')
        return
      }
      this.updateServiceRemark(data)
    },
    fileRemove(fileList) {
      this.fileList = fileList
    },
    fileSuccess(fileList) {
      this.fileList = fileList
    },
    orderAftersalesRefundAgreeForGuyu(afterSaleOrderId) {
      this.$confirm('确定要同意退款申请吗？', '同意申请', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.orderAftersalesRefundAgreeForGuyu({ afterSaleOrderId }).then(() => {
            this.$refs.table.onSearchKeep()
          })
        })
        .catch(() => {})
    },
    orderAftersalesRefundAmountForGuyu(afterSaleOrderId, refundAmount) {
      // let price = refundAmount / 100
      this.$prompt('', '请输入退款金额', {
        confirmButtonText: '确定',
        inputErrorMessage: '请填写正确的金额',
        inputPattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
        inputValue: 0,
      })
        .then(({ value }) => {
          this.$http
            .orderAftersalesRefundAmountForGuyu({ afterSaleOrderId, refundAmount: value * 100 })
            .then(() => {
              this.$refs.table.onSearchKeep()
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
            this.$refs.table.onSearchKeep()
          })
          .catch(() => {})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.remarkImg{
  display: inline-block;
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  margin: 0 8px 8px 0;
  cursor: pointer;
}
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
</style>
