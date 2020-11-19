<template>
  <div>
    <el-page-header @back="$router.back()"></el-page-header>
    <div class="invoice__status">
      <p class="status">{{ model.status | orderStatus }}</p>
      <div>
        <el-button size="small" type="primary" @click="print()">订单打印</el-button>
      </div>
    </div>
    <div
      ref="printBox"
      class="invoice-format-box"
      style="width: 740px; padding: 20px;min-height:300px;"
    >
      <!-- <div style="width: 600px; height: 1028px; background: #333;"></div> -->
      <div ref="infoBox">
        <div style="width: 740px;">
          <div style="float:left;width:100%">
            <div style="color: red;float: left;width: 50%;">NO.{{ model.number }}</div>
            <div
              style="font-size: 12px;float: left;width: 50%;text-align: right;"
            >打印时间：{{ model.printingTime || printingTime }}</div>
          </div>
          <div style="width:100%; margin: 10px auto;text-align:center">
            <img src="@/assets/image/fyex.png" style="width: 180px;" />
          </div>
          <div style="text-align: center; font-size: 26px; margin-bottom: 10px;">送货清单</div>
          <div style="float:left;width:100%">
            <div style="float:left">
              <div style="padding-bottom: 5px; line-height: 1.4;">
                <span style="width: 80px; text-align: right; display: inline-block;">司机：</span>
                <span>{{ model.driverName || '--' }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{ model.driverPhoneNumber || '--' }}</span>
              </div>
              <div style="padding-bottom: 5px; line-height: 1.4;">
                <span style="width: 80px; text-align: right; display: inline-block;">车牌：</span>
                <span>{{ model.driverCarNumber || '--' }}</span>
              </div>
              <div style="padding-bottom: 5px; line-height: 1.4;width:605px">
                <span style="width: 80px; text-align: right; display: inline-block;">顾客：</span>
                <span>{{ model.receiver }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{{ model.mobile }}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span style="width: 80px; text-align: right; display: inline-block;">配送时间：</span>
                <span>{{ model.deliveryTime }}</span>
              </div>
              <!-- <div style="padding-bottom: 5px; line-height: 1.4;">
                <span style="width: 80px; text-align: right; display: inline-block;">配送时间：</span>
                <span>{{model.deliveryTime}}</span>
              </div>-->
              <div style="padding-bottom: 5px; line-height: 1.4;">
                <span style="width: 80px; text-align: right; display: inline-block;">配送地址：</span>
                <span>{{ model.address }}</span>
              </div>
            </div>
            <vue-qrcode
              class="qrcode-box"
              :value="driverUrl"
              :options="{ size: 130 }"
              tag="img"
              style="float:left"
            ></vue-qrcode>
          </div>
          <div style="height: 20px;"></div>
        </div>
      </div>
      <div v-for="(order, i) in model.orders" :key="i" :ref="`tableCell_${i}`">
        <table cellpadding="0" cellspacing="0" style="width: 740px;">
          <tbody>
            <tr>
              <td
                style="padding: 10px 5px; box-sizing: border-box; text-align: center; font-weight: bold; border-top: 1px solid #000000; width: 200px;"
              >({{ order.storeName }})</td>
              <td
                style="padding: 10px 5px; box-sizing: border-box; border-top: 1px solid #000000; width: 245px;"
              >{{ order.storePhoneNumber }}</td>
              <td
                style="padding: 5px; box-sizing: border-box; text-align: right; border-top: 1px solid #000000;"
              >共</td>
              <td
                style="padding: 5px; box-sizing: border-box; text-align: center; font-weight: bold; border-top: 1px solid #000000;"
              >{{ order.labelCount || 0 }}</td>
              <td style="padding: 5px; box-sizing: border-box; border-top: 1px solid #000000;">包</td>
            </tr>
            <tr>
              <td colspan="5" style="padding: 0;">
                <table
                  cellpadding="0"
                  cellspacing="0"
                  style="border: 1px solid #000; width: 740px; box-sizing: border-box;"
                >
                  <tr>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;border-right:1px solid #000; width: 190px;text-align:center"
                    >品名</td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;border-right:1px solid #000; width: 220px;text-align:center"
                    >规格</td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;border-right:1px solid #000;width:90px; text-align: center;"
                    >单价</td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;border-right:1px solid #000;width:60px; text-align: center;"
                    >数量</td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;border-right:1px solid #000;width:80px; text-align: center;"
                    >重量</td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;border-right:1px solid #000;width:99px; text-align: center;"
                    >金额</td>
                  </tr>
                  <tr v-for="(cell, j) in order.list" :key="j">
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;border-right:1px solid #000; border-top: 1px solid #000;text-align:center"
                    >{{ cell.name }}</td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;border-right:1px solid #000; border-top: 1px solid #000; font-size: 14px;text-align:center"
                    >{{ cell.specification }}</td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box; border-right:1px solid #000;border-top: 1px solid #000; text-align: center;"
                    >
                      ￥{{ cell.price | formatPrice }}
                      <span v-if="cell.unit">/{{ cell.unit }}</span>
                    </td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;border-right:1px solid #000; border-top: 1px solid #000; text-align: center;"
                    >x{{ cell.qty }}{{ cell.unit }}</td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box; border-right:1px solid #000;border-top: 1px solid #000; text-align: center;"
                    >
                      <span v-if="cell.qty * cell.weight">{{ (cell.qty * cell.weight) / 1000 }}kg</span>
                      <span v-else></span>
                    </td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box; border-right:1px solid #000;border-top: 1px solid #000; text-align: center;"
                    >￥{{cell.price*cell.qty | formatPrice }}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td colspan="5" style="padding: 0;">
                <table
                  cellpadding="0"
                  cellspacing="0"
                  style=" width: 740px; box-sizing: border-box;font-size: 14px;"
                >
                  <tr>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box; width: 215px;text-align:center"
                    >下单时间：{{ order.orderTime || '--' }}</td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box; width: 215px;text-align:center"
                    >备货时间：{{ order.stockuUpTime || '--' }}</td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;width:71px; text-align: center;"
                    ></td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;width:60px;text-align: center;"
                    >总计：</td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;width:80px; text-align: center;"
                    >{{(order.totalweight) /1000}}kg</td>
                    <td
                      style="padding: 8px 5px; box-sizing: border-box;heihgt:99px; text-align: center;"
                    >￥{{order.totalproductAmount | formatPrice}}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <!-- <td
                style="padding: 10px 5px 20px 5px; box-sizing: border-box; width: 245px;"
              >总计：￥{{ order.amount | formatPrice }}</td>-->
              <td
                style="padding: 10px 5px 20px 5px; box-sizing: border-box; width: 280px;"
              >支付方式：{{ order.payWay == 1 ? '账期' : '线上支付' }}</td>
              <td
                colspan="4"
                style="padding: 10px 5px 20px 5px; box-sizing: border-box; width: 200px; text-align: right;"
              >客户签名______________</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import getLodop from '@/utils/LodopFuncs'
import VueQrcode from '@xkeshi/vue-qrcode'
import dayjs from 'dayjs'
import { BASEURL } from '@/utils/config'

export default {
  components: {
    VueQrcode: VueQrcode
  },
  data() {
    return {
      model: {},
      driverUrl: '',
      printingTime: (new Date().toLocaleString()).slice(0, -3)
    }
  },
  created() {
    this.getDeliveryNote()
    console.log(dayjs().format('YYYY-MM-DD'))

    const IS_DEV = process.env.NODE_ENV == 'development'
    this.driverUrl = IS_DEV
      ? `http://192.168.1.27:8080/#/detail?id=${this.$route.query.id}`
      : `${BASEURL}/driver/POUND/detail?wo=1&wot=2&woacm=1&mpl=1&id=${this.$route.query.id}`

    // this.driverUrl = `https://fy.wego168.com/mrguyu_test/driver/POUND/index?wo=1&wot=2&woacm=1&mpl=1`
    console.log('driverUrl', this.driverUrl)
  },
  methods: {
    getDeliveryNote() {
      this.$http.getDeliveryNote({ id: this.$route.query.id }).then(res => {
        this.model = res.data.data
        // this.model.deliveryTime = dayjs().format('YYYY-MM-DD') + ' ' + this.model.deliveryTime
        this.model.deliveryTime =  this.model.deliveryTime
        this.model.orders.map(order => {
          order.totalweight=''
          order.totalproductAmount=''
          order.list.map(cell => {
            if(cell.weight){
              order.totalweight = Number(cell.weight*cell.qty)+Number(order.totalweight)
            }
            
            order.totalproductAmount = Number(cell.productAmount)+Number(order.totalproductAmount)
            // console.log(order.totalproductAmount)
            cell.specification = ''
            Object.keys(cell).map(key => {
              if (/spec/.test(key)) {
                if (/Name/.test(key)) cell.specification += `${cell[key]}：`
                if (/Value/.test(key)) cell.specification += `${cell[key]}；`
              }
            })
          })
        })
// console.log(this.model.orders)
        // let orders = JSON.parse(JSON.stringify(this.model.orders))
        // orders.map(order => {
        //   console.log(order)
        //   order.list = [...order.list, ...order.list, ...order.list]
        //   order.list = [...order.list, ...order.list]
        // })
        // orders = [...orders, ...orders, ...orders]
        // this.model.orders = orders
      })
    },
    print() {
      try {
        this.printingTime = new Date().toLocaleString().slice(0, -3)
      } catch (error) {
        console.log(error)
      }
      // this.$nextTick(() => {
        let LODOP = getLodop()
        if (LODOP === undefined) return
        // LODOP.PRINT_INIT("")
        // LODOP.PRINT_INITA(10, 10, 754, 453, "送货单");
        LODOP.PRINT_INITA('5mm', '5mm', '210mm', '297mm', '送货单')

        // LODOP.SET_PRINT_PAGESIZE()
        const a4Height = 1028
        const infoBox = this.$refs.infoBox
        let tableHtml = infoBox.innerHTML
        // let tableHtml = ''
        let height = infoBox.offsetHeight
        let htmlList = []
        this.model.orders.map((item, i) => {
          const table = this.$refs[`tableCell_${i}`]
          console.log('table', table)
          const tableCell = table[0]
          const tableCellHeight = tableCell.offsetHeight
          console.log('tableCellHeight',height, tableCellHeight)
          // tableHtml += tableCell.innerHTML
          // console.log('tableCell', tableCell.innerHTML)
          if (height + tableCellHeight < a4Height) {
            tableHtml += tableCell.innerHTML
            height += tableCellHeight
          } else {
            htmlList.push(tableHtml)
            height = infoBox.offsetHeight
            tableHtml = infoBox.innerHTML + tableCell.innerHTML
          }
          if (this.model.orders.length - 1 === i) {
            htmlList.push(tableHtml)
          }
        })
        console.log('htmlList', htmlList.length)
        htmlList.forEach(html => {
          // 当前面的对象是一页时，两个效果是一样的
          // 当前面的对象是多页时有差异
          // 例如 前面的对象占3页时
          // NEWPAGE 是从第2页开始
          // NEWPAGEA是从第4页开始
          // 如果是位置重复的话，用NEWPAGE 就覆盖了，位置不重复，就并列输出
          // NEWPAGEA 是顺序输出
          LODOP.NewPageA()
          // LODOP.NewPage()
          LODOP.ADD_PRINT_HTM('0%', '0%', '100%', '100%', html)
        })
        // return

        // LODOP.ADD_PRINT_TEXT(
        //   '286mm',
        //   '0mm',
        //   350,
        //   22,
        //   '注：此表单一式三联（白联：存根   红联：回单  蓝联：财务)'
        // )
        // 有坑--这两条命令会影响分页
        // LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
        // LODOP.SET_PRINT_STYLEA(0, 'Vorient', 1)

        LODOP.PREVIEW()
        // LODOP.PRINT_DESIGN()
      // })
    }
  },
  filters: {
    orderStatus: status => {
      return {
        waitstock: '待备货',
        stockup: '已备货',
        waitloading: '待装车',
        waitdelivery: '待送货',
        takeover: '已收货',
        finish: '已完成'
      }[status]
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice__status {
  // margin-: 30px;
  margin: 30px auto;
  padding: 35px;
  background: #fef5e5;
  border: 1px solid #ffd68a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  box-sizing: border-box;
  .status {
    font-size: 26px;
    color: #ca2108;
  }
}
.invoice-format-box {
  // width: 600px;
  background: #fff;
  margin: 0 auto;
  .top-info {
    margin-bottom: 20px;
    // .logo-img {
    //   width: 200px;
    //   margin: 10px auto;
    //   img {
    //     width: 100%;
    //     height: 100%;
    //   }
    // }
    .bottom-info {
      display: flex;
      justify-content: space-between;
      .left-info {
        .cell {
          line-height: 1.6;
          .prop {
            width: 80px;
            text-align: right;
            display: inline-block;
          }
        }
      }
      .qrcode-box {
        flex-shrink: 0;
        margin-left: 10px;
      }
    }
  }
  .table-list {
    .table {
      // width: 600px;
      td {
        padding: 5px;
        box-sizing: border-box;
      }
      .t-center {
        text-align: center;
      }
      .t-right {
        text-align: right;
      }
      .p-0 {
        padding: 0;
      }
      .bold {
        font-weight: bold;
      }
      .w-200 {
        width: 200px;
      }
      .w-150 {
        width: 150px;
      }
      .w-50 {
        width: 50px;
      }
      .b-l {
        border-left: 1px solid #000000;
      }
      .b-r {
        border-right: 1px solid #000000;
      }
      .b-t {
        border-top: 1px solid #000000;
      }
      .b-b {
        border-bottom: 1px solid #000000;
      }
      .border {
        border: 1px solid #000000;
      }
    }
  }
}
</style>
