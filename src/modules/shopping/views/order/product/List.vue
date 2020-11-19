<template>
  <div>
    <QcTable
      ref="table"
      :menu="menu"
      :option="option"
      :search-form="searchForm"
      @get-list="onGetList"
      @get-count="onGetCount"
      style="position:relative"
    >
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
          <!--<el-form-item label="商品总价">
            {{ changeOrderPrice.model.needPayTotalAmount / 100 }}
          </el-form-item>-->
          <el-form-item label="商品总价">{{changeTotalPrice}}</el-form-item>
          <el-form-item
            label-width="0px"
            prop="isCutPrice"
            :rules="[{ required: true, message: '该项为必填项' }]"
          >
            <div class="ch-or-div">
              <el-radio v-model="changeOrderPrice.radio" label="cut">降价</el-radio>
              <el-input-number v-model="changeOrderPrice.cutNum" :precision="2" :step="0.5"></el-input-number>
            </div>
            <div class="ch-or-div">
              <el-radio v-model="changeOrderPrice.radio" label="add">涨价</el-radio>
              <el-input-number v-model="changeOrderPrice.addNum" :precision="2" :step="0.5"></el-input-number>
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
          <el-form-item label="调整后总价">{{ changeTotalPrice }}</el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="onCloseChangeOrder()">关闭</el-button>
          <el-button type="primary" @click="saveChangeOrder()">保存</el-button>
        </span>
      </el-dialog>
      <div>
        <!-- <div style="position:absolute;top:110px;width:100%;height:55px;background:#fff;z-index:8"></div> -->
        <div v-if="boxwidth<=1510" class="boxcontent">
          <el-tabs
            v-model="searchForm[0].value"
            @tab-click="onSearch"
            type="card"
            style="margin:0 15px"
          >
            <el-tab-pane :label="`全部(${count.totalQuantity || 0})`" :name="' '"></el-tab-pane>
            <el-tab-pane :label="`待付款(${count.unpaidQuantity || 0})`" name="0"></el-tab-pane>
            <el-tab-pane :label="`待发货(${count.undeliveredQuantity || 0})`" name="1"></el-tab-pane>
            <el-tab-pane :label="`已发货(${count.deliveredQuantity || 0})`" name="2"></el-tab-pane>
            <el-tab-pane :label="`已取消(${count.cancelQuantity || 0})`" name="-1"></el-tab-pane>
            <el-tab-pane :label="`已完成(${count.finishQuantity || 0})`" name="10"></el-tab-pane>
            <el-tab-pane :label="`待处理补单(${count.pendingSupplementQuantity || 0})`" name="100"></el-tab-pane>
          </el-tabs>
          <table cellpadding="0" cellspacing="0" class="theader">
            <tbody>
              <tr>
                <td width="300">商品</td>
                <td width="70">单价（元）</td>
                <td width="50">数量</td>
                <td width="120">售后</td>
                <td width="70">订单时间</td>
                <td width="80">订单类型</td>
                <td width="100">门店</td>
                <td width="80">订单状态</td>
                <td width="80">配送方式</td>
                <td width="80">支付金额（元）</td>
                <td width="120">买家</td>
                <td width="120">操作</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="boxcontent1">
          <el-tabs
            v-model="searchForm[0].value"
            @tab-click="onSearch"
            type="card"
            style="margin:0 15px"
          >
            <el-tab-pane :label="`全部(${count.totalQuantity || 0})`" :name="' '"></el-tab-pane>
            <el-tab-pane :label="`待付款(${count.unpaidQuantity || 0})`" name="0"></el-tab-pane>
            <el-tab-pane :label="`待发货(${count.undeliveredQuantity || 0})`" name="1"></el-tab-pane>
            <el-tab-pane :label="`已发货(${count.deliveredQuantity || 0})`" name="2"></el-tab-pane>
            <el-tab-pane :label="`已取消(${count.cancelQuantity || 0})`" name="-1"></el-tab-pane>
            <el-tab-pane :label="`已完成(${count.finishQuantity || 0})`" name="10"></el-tab-pane>
            <el-tab-pane :label="`待处理补单(${count.pendingSupplementQuantity || 0})`" name="100"></el-tab-pane>
          </el-tabs>
          <table cellpadding="0" cellspacing="0" class="theader">
            <tbody>
              <tr>
                <td width="300">商品</td>
                <td width="70">单价（元）</td>
                <td width="50">数量</td>
                <td width="120">售后</td>
                <td width="70">订单时间</td>
                <td width="80">订单类型</td>
                <td width="100">门店</td>
                <td width="80">订单状态</td>
                <td width="80">配送方式</td>
                <td width="80">支付金额（元）</td>
                <td width="120">买家</td>
                <td width="120">操作</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="boxwidth<=1510" style="margin-top:120px;">
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
                  <td class="bb1" colspan="10" style="text-align:left;">
                    订单编号：{{ item.orderNo }}&nbsp;&nbsp;&nbsp;微信单号：{{
                    item.tradeNo || '--'
                    }}
                    &nbsp;&nbsp;&nbsp;
                    <span
                      style="color:red"
                      v-if="item.isAccounPeriod"
                    >账期订单</span>
                  </td>
                  <td></td>
                  <td class="bb1" style="color: rgb(64, 158, 255);cursor: pointer;">
                    <span
                      @click="$router.push(`/main/mall/order/product/detail?id=${item.id}`)"
                    >查看详情</span>
                    &nbsp;&nbsp;
                    <span @click="remarkOrder(item.id)">卖家备注</span>
                  </td>
                </tr>
                <tr v-for="(list, productIndex) in item.orderItems" :key="productIndex">
                  <td
                    width="300"
                    class="br1"
                    :class="{ bb1: productIndex < item.orderItems.length - 1 }"
                    style="text-align:left;"
                  >
                    <QcProductItem :img="imgHost + list.iconUrl" :title="list.name">
                      {{
                      list.specs
                      }}
                    </QcProductItem>
                  </td>
                  <td
                    width="70"
                    class="br1"
                    :class="{ bb1: productIndex < item.orderItems.length - 1 }"
                  >{{ list.price | formatPrice }}</td>
                  <td
                    width="50"
                    class="br1"
                    :class="{ bb1: productIndex < item.orderItems.length - 1 }"
                  >x{{ list.qty }}</td>
                  <td
                    width="120"
                    class="br1"
                    :class="{ bb1: productIndex < item.orderItems.length - 1 }"
                  >
                    <span v-if="list.afterSalesStatusName">x{{ list.afterSalesStatusName }}</span>
                    <span v-else>--</span>
                  </td>
                  <td
                    width="70"
                    class="br1"
                    v-if="productIndex == 0"
                    :rowspan="item.orderItems.length"
                  >{{ item.createTime }}</td>
                  <td
                    width="80"
                    class="br1"
                    v-if="productIndex == 0"
                    :rowspan="item.orderItems.length"
                  >{{ item.bizTypeName }}</td>
                  <td
                    width="100"
                    class="br1"
                    v-if="productIndex == 0"
                    :rowspan="item.orderItems.length"
                  >{{ item.storeName }}</td>
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
                    width="80"
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

                  <td
                    class="br1"
                    width="120"
                    style="border-bottom:1px solid #eee"
                    v-if="productIndex == 0"
                    :rowspan="item.orderItems.length"
                  >
                    <div
                      style="color: rgb(64, 158, 255); cursor: pointer;"
                      v-if="item.isSupplementary"
                    >
                      <span v-if="item.supplementStatus == -1">补单已取消</span>
                      <span v-else-if="item.supplementStatus == 1">补单已确认</span>
                      <div v-else-if="item.supplementStatus == 0">
                        <span @click="confirmSupplementOrder(item.id)" class="caozuo-p">确认补单</span>
                        <span @click="cancelSupplementOrder(item.id)" class="caozuo-p">关闭</span>
                      </div>
                    </div>
                    <div
                      style="color: rgb(64, 158, 255); cursor: pointer;"
                      v-else-if="item.status == 0"
                    >
                      <span @click="changeOrderPriceShow(item)" class="caozuo-p">改价</span>
                      <span @click="closeOrder(item.id, item.isSupplementary)" class="caozuo-p">关闭</span>
                    </div>
                    <div v-else-if="item.isStore">
                      <div style="color: rgb(64, 158, 255); cursor: pointer;">
                        <span
                          v-if="item.status==1"
                          @click="onShowPrintLabel(true, item)"
                          class="caozuo-p"
                        >打印标签</span>
                        <span v-else>---</span>
                      </div>
                    </div>
                    <!-- <p class="caozuo-p">发货</p> -->
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="12"
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
          <div v-else style="padding: 60px;text-align: center;color: #717171;font-size: 14px;">暂无数据</div>
        </div>
        <div v-else style="margin-top:110px;">
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
                  <td class="bb1" colspan="10" style="text-align:left;">
                    订单编号：{{ item.orderNo }}&nbsp;&nbsp;&nbsp;微信单号：{{
                    item.tradeNo || '--'
                    }}
                    &nbsp;&nbsp;&nbsp;
                    <span
                      style="color:red"
                      v-if="item.isAccounPeriod"
                    >账期订单</span>
                  </td>
                  <td></td>
                  <td class="bb1" style="color: rgb(64, 158, 255);cursor: pointer;">
                    <span
                      @click="$router.push(`/main/mall/order/product/detail?id=${item.id}`)"
                    >查看详情</span>
                    &nbsp;&nbsp;
                    <span @click="remarkOrder(item.id)">卖家备注</span>
                  </td>
                </tr>
                <tr v-for="(list, productIndex) in item.orderItems" :key="productIndex">
                  <td
                    width="300"
                    class="br1"
                    :class="{ bb1: productIndex < item.orderItems.length - 1 }"
                    style="text-align:left;"
                  >
                    <QcProductItem :img="imgHost + list.iconUrl" :title="list.name">
                      {{
                      list.specs
                      }}
                    </QcProductItem>
                  </td>
                  <td
                    width="70"
                    class="br1"
                    :class="{ bb1: productIndex < item.orderItems.length - 1 }"
                  >{{ list.price | formatPrice }}</td>
                  <td
                    width="50"
                    class="br1"
                    :class="{ bb1: productIndex < item.orderItems.length - 1 }"
                  >x{{ list.qty }}</td>
                  <td
                    width="120"
                    class="br1"
                    :class="{ bb1: productIndex < item.orderItems.length - 1 }"
                  >
                    <span v-if="list.afterSalesStatusName">x{{ list.afterSalesStatusName }}</span>
                    <span v-else>--</span>
                  </td>
                  <td
                    width="70"
                    class="br1"
                    v-if="productIndex == 0"
                    :rowspan="item.orderItems.length"
                  >{{ item.createTime }}</td>
                  <td
                    width="80"
                    class="br1"
                    v-if="productIndex == 0"
                    :rowspan="item.orderItems.length"
                  >{{ item.bizTypeName }}</td>
                  <td
                    width="100"
                    class="br1"
                    v-if="productIndex == 0"
                    :rowspan="item.orderItems.length"
                  >{{ item.storeName }}</td>
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
                    width="80"
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

                  <td
                    class="br1"
                    width="120"
                    style="border-bottom:1px solid #eee"
                    v-if="productIndex == 0"
                    :rowspan="item.orderItems.length"
                  >
                    <div
                      style="color: rgb(64, 158, 255); cursor: pointer;"
                      v-if="item.isSupplementary"
                    >
                      <span v-if="item.supplementStatus == -1">补单已取消</span>
                      <span v-else-if="item.supplementStatus == 1">补单已确认</span>
                      <div v-else-if="item.supplementStatus == 0">
                        <span @click="confirmSupplementOrder(item.id)" class="caozuo-p">确认补单</span>
                        <span @click="cancelSupplementOrder(item.id)" class="caozuo-p">关闭</span>
                      </div>
                    </div>
                    <div
                      style="color: rgb(64, 158, 255); cursor: pointer;"
                      v-else-if="item.status == 0"
                    >
                      <span @click="changeOrderPriceShow(item)" class="caozuo-p">改价</span>
                      <span @click="closeOrder(item.id, item.isSupplementary)" class="caozuo-p">关闭</span>
                    </div>
                    <div v-else-if="item.isStore">
                      <div style="color: rgb(64, 158, 255); cursor: pointer;">
                        <span
                          v-if="item.status==1"
                          @click="onShowPrintLabel(true, item)"
                          class="caozuo-p"
                        >打印标签</span>
                        <span v-else>---</span>
                      </div>
                    </div>
                    <!-- <p class="caozuo-p">发货</p> -->
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="12"
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
          <div v-else style="padding: 60px;text-align: center;color: #717171;font-size: 14px;">暂无数据</div>
        </div>
      </div>
    </QcTable>
    <el-dialog
      title="批量发货信息"
      :visible="deliver.dialog"
      width="480px"
      :append-to-body="true"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-row :gutter="20">
        <el-col :span="8">共导入：{{ deliver.model.totalNum || 0 }}&nbsp;条</el-col>
        <el-col :span="8">
          成功：
          <span style="color: #67c23a">{{ deliver.model.successNum || 0 }}</span>&nbsp;条
        </el-col>
        <el-col :span="8">
          失败：
          <span style="color: #ff5433">{{ deliver.model.failNum || 0 }}</span>&nbsp;条
        </el-col>
      </el-row>
      <br />
      <el-table v-if="deliver.model.failNum > 0" :data="deliver.model.rowList">
        <el-table-column v-if="deliver.model.failNum > 10" :label="deliver.model.remark">
          <el-table-column width="50" label="行数" align="center" prop="rowNum"></el-table-column>
          <el-table-column label="错误信息" prop="colList"></el-table-column>
        </el-table-column>
        <div v-else>
          <el-table-column label="错误信息" prop="colList"></el-table-column>
          <el-table-column width="50" label="行数" align="center" prop="rowNum"></el-table-column>
        </div>
      </el-table>
      <span slot="footer">
        <el-button type="info" @click="deliver.dialog = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="卖家备注"
      width="550px"
      append-to-body
      :close-on-click-modal="false"
      :visible="remarkVisible"
      :before-close="remarkClose"
    >
      <el-form
        v-if="remarkVisible"
        ref="remarkModel"
        :model="remarkModel"
        size="small"
        label-position="right"
        label-width="auto"
      >
        <el-form-item label="图片" prop="images" :rules="[{required:false,message:'该项为必填项'}]">
          <div>
            <p v-if="remarkImg.length > 0" style="color: #888;">已上传的</p>
            <el-image
              v-for="(item, i) in remarkImg"
              class="remarkImg"
              :key="i"
              :src="`${imgHost}${item}`"
              @click="onPreview(imgHost + item)"
              fit="cover"
            ></el-image>
          </div>
          <UpLoadRemarkFile
            :orderid="remarkModel.id"
            :limit="remarkImgLimit"
            @on-remove="fileRemove"
            @on-success="fileSuccess"
          />
          <!-- <UpLoadRemarkFile :limit="9" :file-list="fileList" @on-remove="fileRemove" @on-success="fileSuccess" /> -->
        </el-form-item>
        <el-form-item label="备注" prop="storeRemark" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input
            v-model="remarkModel.storeRemark"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" size="small" @click="onSubmitRemark">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="curtOrder.printCount > 0 ? '补打标签' : '初次打标签'"
      :visible="printLabelVisible"
      width="480px"
      :append-to-body="false"
      :modal-append-to-body="false"
      :show-close="false"
      destroy-on-close
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div
        class="pro-box"
        v-if="curtOrder && curtOrder.orderItems && curtOrder.orderItems.length > 0"
      >
        <div class="row" v-for="(pro, index) in curtOrder.orderItems" :key="index">
          <span>{{pro.name}}</span>
          <span class="unit">x{{pro.qty}}{{pro.unit}}</span>
        </div>
      </div>
      <p v-if="curtOrder.printCount" style="height: 40px;line-height: 40px;">
        已打印标签
        <span style="color: #67C23A;font-size: 18px;">{{curtOrder.printCount}}</span>个
      </p>
      <el-form ref="form" :model="labelModel" label-width="auto">
        <el-form-item label="打包货物共" v-if="curtOrder.printCount">
          <el-input-number v-model="curtOrder.printCount" :min="1" disabled></el-input-number>
        </el-form-item>
        <el-form-item label="需打印标签">
          <el-input-number v-model="labelModel.value" :min="1"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="onShowPrintLabel(false)">关闭</el-button>
        <el-button type="primary" :loading="printLabelLoading" @click="onPrintLabel()">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UpLoadRemarkFile from '../../service/UploadFile'
export default {
  components: { UpLoadRemarkFile },
  data() {
    return {
      boxwidth:'',
      remarkVisible: false,
      remarkModel: {
        id: '',
        remarkModel: '',
        images: ''
      },
      remarkImg: [],
      fileList: [],
      option: {
        url: 'api/admin/mall/v1/guyuOrder/page'
      },
      searchForm: [
        { formName: 'status', value: ' ',newType:'position' },
        { label: '微信订单', formName: 'tradeNo', type: 'input' },
        { label: '订单编号', formName: 'orderNo', type: 'input' },
        { label: '商品名称', formName: 'name', type: 'input' },
        { label: '收货人', formName: 'receiver', type: 'input' },
        { label: '收货手机', formName: 'mobile', type: 'input' },
        { label: '买家姓名', formName: 'buyerName', type: 'input' },
        { label: '买家手机', formName: 'buyerMobile', type: 'input' },
        {
          type: 'select',
          formName: 'deliveryWay',
          label: '配送方式',
          option: [
            { value: '', label: '请选择' },
            { value: 'platformsend', label: '丰盈配送' },
            { value: 'distribution', label: '店铺配送' },
            { value: 'takeout', label: '自取' }
          ],
          value: ''
        },
        {
          label: '选择时间',
          type: 'date-picker',
          formName: 'startCreateTime_endCreateTime',
          el: {
            type: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd'
          },
        },
        // { label: '订单时间', formName: 'startCreateTime_endCreateTime', type: 'date-picker' }
      ],
      menu: [
        {
          type: 'export',
          label: '导出',
          url: this.projectUrl + '/api/admin/mall/v1/guyuOrder/exportOrder?'
        },
        {
          type: 'export',
          label: '导出备货单',
          url: this.projectUrl + '/api/admin/mall/v1/guyuOrder/exportStockingList?'
        }
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
      },
      printLabelVisible: false,
      printLabelLoading: false,
      labelModel: {
        value: 1
      },
      curtOrder: {
        orderItems: []
      },
    }
  },
  computed: {
    changeTotalPrice() {
      if (this.changeOrderPrice.radio === 'add') {
        return this.changeOrderPrice.model.needPayTotalAmount / 100 + this.changeOrderPrice.addNum
      } else {
        return this.changeOrderPrice.model.needPayTotalAmount / 100 - this.changeOrderPrice.cutNum
      }
    },
    remarkImgLimit() {
      return Math.abs(this.remarkImg.length + this.fileList.length - 9)
    }
  },
  mounted(){
    let me = this;
    this.$nextTick(function () {
      me.width = me.$refs.table.$el.clientWidth;
      console.log(me.width)
      this.boxwidth=me.width
    
    })
  },
  created() {
    this.countOrder()
  },
  filters: {
    formatPrice(val) {
      return val / 100 || 0
    }
  },
  methods: {
    countOrder() {
      this.$http.countOrderForGuyu().then(res => {
        this.count = res.data.data
      })
    },
    onGetList(list) {
      console.log(list)
      this.tableData = list
    },
    onGetCount(count){
      console.log(count)
      this.count = count
    },
    onSearch(v) {
      console.log('vvvvv',v)
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
    confirmSupplementOrder(id) {
      this.$confirm('是否确认该补单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.confirmSupplementOrder({ id }).then(() => {
            this.$refs.table.onSearchKeep()
          })
        })
        .catch(() => {})
    },
    cancelSupplementOrder(id) {
      this.$confirm('是否关闭该补单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.cancelSupplementOrder({ id }).then(() => {
            this.$refs.table.onSearchKeep()
          })
        })
        .catch(() => {})
    },
    // 显示/关闭打标签弹窗
    onShowPrintLabel(state, item) {
      this.printLabelVisible = state
      if (state) {
        this.curtOrder = JSON.parse(JSON.stringify(item))
        this.curtOrder.orderItems = []
        this.printLabelGetOrderItems(item.id)
      } else {
        this.labelModel = { value: 1 }
        this.curtOrder = { orderItems: [] }
      }
    },
    // 获取订单未退款订单项
    async printLabelGetOrderItems(orderId) {
      const res = await this.$http.printLabelGetOrderItems({orderId})
      this.curtOrder.orderItems = res.data.data
    },

    // 打印标签
    async onPrintLabel() {
      let { curtOrder, labelModel} = this
      let data = {
        orderId: curtOrder.id,
        printCount: labelModel.value
      }
      if (!data.printCount) {
        this.$message.warning('请输入要打印的标签数量')
        return
      }
      try {
        this.printLabelLoading = true
        await this.$http.printLabel(data)
        this.$message.success('已发出打印请求')
        this.printLabelLoading = false
        this.printLabelVisible = false
        this.$refs.table.onSearchKeep()
      } catch (error) {
        this.printLabelLoading = false
      }
    },
    remarkOrder(id) {
      this.getServiceRemark(id)
      // this.$prompt('', '请输入备注信息', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   inputPlaceholder: '备注信息'
      // })
      //   .then(({ value }) => {
      //     this.$http.updateOrderRemark({ storeRemark: value, id }).then(() => {
      //       this.$message.success('操作成功')
      //       this.$refs.table.onSearchKeep()
      //     })
      //   })
      //   .catch(() => {})
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
    closeOrder(id, isSupplementary) {
      this.$confirm('是否关闭该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (isSupplementary) {
            //关闭补单
            this.$http.closeSupOrder({ id }).then(() => {
              this.$refs.table.onSearchKeep()
            })
          } else {
            this.$http.closeNomalOrder({ id }).then(() => {
              this.$refs.table.onSearchKeep()
            })
          }
        })
        .catch(() => {
          return
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.boxcontent {
  position: absolute;
  width: 100%;
  background: #fff;
  top: 165px;
  z-index: 8;
}
.boxcontent1 {
  position: absolute;
  width: 100%;
  background: #fff;
  top: 110px;
  z-index: 8;
}
.remarkImg {
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

// 打标签
.pro-box {
  max-height: 120px;
  overflow: auto;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  background: #f2f2f2;
  .row {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding-left: 10px;
    font-size: 14px;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -5px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #1bbc3d;
      transform: translate(0, -50%);
    }
    &:last-child {
      margin-bottom: 0;
    }
    .unit {
      color: #999;
      font-size: 13px;
    }
  }
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
</style>
