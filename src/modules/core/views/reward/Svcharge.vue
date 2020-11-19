<template>
  <div>
    <p>
      店铺保证金配置
      <el-popover
        width="400"
        style="color:red!important"
        placement="top-start"
        trigger="hover"
        content="店铺入驻时缴纳的保证金级别配置"
      >
        <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
      </el-popover>
    </p>
    <Form parent-id="PLATFORM_SERVICE_FEE_SETTING" style="margin-left:0"></Form>
    <p>
      平台服务费配置
      <el-popover
        width="400"
        style="color:red!important"
        placement="top-start"
        trigger="hover"
        content="平台服务收取的费用，比如：年费等"
      >
        <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
      </el-popover>
    </p>
    <Form parent-id="PLATFORM_SERVICE_FEE" style="margin-left:0"></Form>
    <p>
      店铺免交易费天数配置
      <el-popover
        width="400"
        style="color:red!important"
        placement="top-start"
        trigger="hover"
        content="设置统一的新店铺免服务费天数，如设置为90天，店铺审核时，自动计算当天开始的90天的日期，作为交易服务费减免到期日"
      >
        <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
      </el-popover>
    </p>
    <Form parent-id="PLATFORM_TRANSACTION_FEE_SETTING" style="margin-left:0"></Form>
    <p>
      店铺标记老客户天数配置
      <el-popover
        width="400"
        style="color:red!important"
        placement="top-start"
        trigger="hover"
        content="设置统一的新店铺标记老客户天数，如设置为30天，店铺审核时，自动计算当天开始的30天的日期，作为标记老客户到期日"
      >
        <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
      </el-popover>
    </p>

    <Form parent-id="PLATFORM_OLD_CUSTOMER_SETTING" style="margin-left:0"></Form>
    <p>新用户判定规则配置</p>
    <Form parent-id="NEW_CUSTMOER_RULES" style="margin-left:0"></Form>

    <p>
      交易服务费配置
      <el-popover
        width="400"
        style="color:red!important"
        placement="top-start"
        trigger="hover"
        content="每笔订单根据商品一级分类配置的服务费"
      >
        <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
      </el-popover>
    </p>
    <QcTable
      ref="table"
      :option="option"
      :search-form="searchForm"
      :column="column"
      style="margin:40px 80px;width:700px"
    ></QcTable>
    <el-dialog
      title="商品分类服务费"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
      :visible="formVisible"
      :before-close="onClose"
    >
      <el-form ref="model" :model="model" label-position="right" label-width="170px">
        <el-form-item label="订单服务费比例" prop="proportion" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input v-model="model.proportion" style="width:120px">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="老客户订单服务费比例"
          prop="ocrProportion"
          :rules="[{required:true,message:'该项为必填项'}]"
        >
          <el-input v-model="model.ocrProportion" style="width:120px">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="配送品类系数" prop="coefficient" :rules="[{required:true,message:'该项为必填项'}]">
          <!-- <el-input v-model="model.coefficient" style="width:120px">%</el-input> -->
          <el-input v-model="model.coefficient" style="width:120px">
            %
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="onClose()">关闭</el-button>
        <el-button type="primary" @click="onSubmit()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Form from './Form'
export default {
  components: {
    Form
  },
  data() {
    return {
      model: {
        id:'',
        proportion:'',
        coefficient:''
      },
      formVisible: false,
      option: {
        url: 'api/admin/v1/serviceChargeCategory/page',
        isFull: false,
        height: 600
      },
       searchForm:[
        { formName: '', value: ' ',newType:'' },
      ],
      column: [
        {
          prop: 'categoryName',
          label: '商品一级分类',
          width: '120px'
        },
        {
          prop: 'proportion',
          label: '服务费比例%',
          width:'120px',
          align: 'center',
          formatter: row => {
            return row.proportion / 10000+'%'
          }
          // formatter: row => {
          //   this.propt = row.proportion/10000
          //   return (
          //     <el-input
          //       placeholder={this.propt}
                
          //       onInput={value => {
          //         //console.log(123, value)
          //         row.proportion = value
          //       }}
          //     >
          //       <template slot="append">%</template>
          //     </el-input>
          //   )
          // }
        },
        {
          prop: 'ocrProportion',
          label: '老客户服务费比例%',
          width:'150px',
          align: 'center',
          formatter: row => {
            return row.ocrProportion / 10000+'%'
          }
        },
        {
          prop: 'coefficient',
          label: '配送品类系数%',
          width:'120px',
          align: 'center',
          formatter: row => {
            return row.coefficient / 10000+'%'
          }
          // formatter: row => {
          //   return (
          //     <el-input 
          //       value={row.coefficient}
          //       onInput={value => {
          //         //console.log(123, value)
          //         row.coefficient = value
          //       }}
          //     >
          //     </el-input>
          //   )
          // }
        },
        {
          label: '操作',
          align: 'center',
          formatter: row => {
            return (
              <div>
                <el-button type="text" onClick={this.getTree.bind(this, row)}>
                  编辑
                </el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    getTree(row) {
      this.formVisible = true
      this.model = JSON.parse(JSON.stringify(row))
      this.model.proportion /=10000
      this.model.ocrProportion /=10000
      this.model.coefficient /=10000
    },
    onSubmit() {
      this.$refs.model.validate(value => {
        if (value) {
          let model = JSON.parse(JSON.stringify(this.model))
          // model.proportion *= 10000
          // model.ocrProportion *= 10000
          // model.coefficient *=10000
          model.proportion = parseFloat(model.proportion) * 10000
          model.ocrProportion = parseFloat(model.ocrProportion) * 10000
          model.coefficient = parseFloat(model.coefficient) * 10000
          this.$http.settingSvcharge(model).then(() => {
            this.$refs.table.onSearchKeep()
            this.onClose()
            this.$message.success('修改成功')
          })
        }
      })
    },
    onClose() {
      this.formVisible = false
      this.clearForm('model')
    },
    updateSvc(row) {
      this.$http.settingSvcharge(row).then(() => {
        this.$refs.table.onSearchKeep()
        this.$message.success('修改成功')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
p {
  margin-top: 80px;
  margin-left: 80px;
  font-size: 20px;
  font-weight: 600;
}
</style>