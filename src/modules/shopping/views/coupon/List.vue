<template>
  <div>
    <QcTable
      ref="table"
      :option="option"
      :search-form="searchForm"
      :menu="menu"
      :column="column"
    ></QcTable>
    <el-dialog
      title="优惠券"
      width="600px"
      append-to-body
      :close-on-click-modal="false"
      :visible="formVisible"
      :before-close="close"
    >
      <el-form ref="model" :model="model" size="small" label-position="right" label-width="120px">
        <el-form-item
          label="规则类型"
          prop="ruleType"
          :rules="[{ required: true, message: '该字段不能为空' }]">
          <el-radio v-model="model.ruleType" :label="1">商品券</el-radio>
          <el-radio v-model="model.ruleType" :label="4">运费券</el-radio>
        </el-form-item>
        <el-form-item
          label="规则名称"
          prop="ruleName"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-input v-model="model.ruleName" class="coupon-input"></el-input>
          <el-popover width="150" style="color:red!important" placement="top-start" trigger="hover" content="说明优惠券的使用规则,例:满减券">
            <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
          </el-popover>
        </el-form-item>
        <el-form-item
          label="优惠券标题"
          prop="couponTitle"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-input v-model="model.couponTitle" class="coupon-input"></el-input>
          <el-popover width="150" style="color:red!important" placement="top-start" trigger="hover" content="优惠券的标题">
            <el-button class="msg-popu-error" icon="el-icon-warning-outline" slot="reference"></el-button>
          </el-popover>
        </el-form-item>
        <!-- <el-form-item label="图片" prop="couponIcon" :rules="[{ required: true, message: '该字段不能为空'}]">
          <QcImageUpload
            :body="{imageType:'attachment'}"
            width="100px"
            height="100px"
            v-model="model.couponIcon"
          ></QcImageUpload>
        <p>建议尺寸750 * 320，大小不超过3M</p>
      </el-form-item> -->
        <el-form-item
          label="优惠券类型"
          prop="couponType"
          :rules="[{ required: false, message: '该字段不能为空' }]">
          <el-radio v-model="model.couponType" :label="1">固定金额</el-radio>
          <el-radio v-model="model.couponType" :label="2">折扣</el-radio>
        </el-form-item>
        <el-form-item
          label="领取限制"
          prop="receiveLimit" >
          <el-radio v-model="model.receiveLimit" label="">所有用户可领</el-radio>
          <el-radio v-model="model.receiveLimit" label="newcust">新用户可领</el-radio>
        </el-form-item>
        <el-form-item
          label="优惠券面值"
          prop="couponAmount"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <p v-if="model.couponType === 2" style="color: #888;">注意：折扣券时，面值填80表示8折</p>
          <el-input v-if="model.couponType === 2" v-model="model.couponAmount" class="coupon-input">
            <template slot="append">%</template>  
          </el-input>
          <el-input v-else v-model="model.couponAmount" class="coupon-input">
            <template slot="append">元</template>  
          </el-input>
        </el-form-item>
        <el-form-item
          label="需满足订单金额"
          prop="couponOrderAmount"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-input v-model="model.couponOrderAmount" class="coupon-input" placeholder="0代表无门槛">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="发放总量"
          prop="totalQuantity"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-input v-model="model.totalQuantity" class="coupon-input">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="每人限领次数"
          prop="memberReceiveQuantity"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-input-number v-model="model.memberReceiveQuantity" style="width: 200px;">
            <template slot="append">张</template>
          </el-input-number>
        </el-form-item>
        <el-form-item
          label="领取时间"
          prop="ruleStartTimeAndruleEndTime"
          :rules="[{ required: true, message: '该字段不能为空' }]"
        >
          <el-date-picker
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="model.ruleStartTimeAndruleEndTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="有效期"
          prop="validTimeAndExpireTime"
          :rules="[{ required: true, message: '该字段不能为空' }]"
        >
            <!-- type="datetimerange" -->
          <el-date-picker
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="model.validTimeAndExpireTime"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="优惠券规则描述" prop="ruleDescription" :rules="[{required:true,message:'该项为必填项'}]">
          <el-input v-model="model.ruleDescription" type="textarea"></el-input>
        </el-form-item> -->
        <!-- <el-form-item 
          prop="content"
        >
          <el-input type="hidden" v-model="model.content" value="优惠券规则"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="close()">关闭</el-button>
        <el-button size="small" type="primary" @click="success()">保存</el-button>
      </span>
    </el-dialog>
    <RecordList
      :visible="formVisibleson"
      :id="updateId"
      @onClose="formVisibleson = false"
    ></RecordList>
  </div>
</template>

<script>
import RecordList from '@/modules/store/views/coupon/recordList'
export default {
  components: { RecordList },
  data() {
    return {
      formVisibleson: false,
      radio: '1',
      list: [],
      model: {
        id: '',
        ruleType: 1,
        couponType: 1,
        validTimeAndExpireTime: '',
        ruleStartTimeAndruleEndTime: '',
        couponValidDaysType: '',
        receiveLimit:""
      },
      updateId: '',
      tableRow: {},
      formVisible: false,
      option: {
        url: 'api/admin/v1.1/platform-coupon-rule/page'
        //,showSearchAndReset: false
      },
      searchForm: [
        { value: '', formName: 'ruleName', type: 'input', label: '标题' },
        {
          label: '状态',
          type: 'select',
          formName: 'status',
          option: [
            { value: '', label: '全部' },
            { value: 'ongoing', label: '进行中' },
            { value: 'not_start', label: '未开始' },
            { value: 'draft', label: '待发布' },
            { value: 'end', label: '已结束' }
          ],
          value: ''
        },
        {
          label: '规则类型',
          type: 'select',
          formName: 'ruleType',
          option: [
            { value: '', label: '全部' },
            { value: 1, label: '商品券' },
            { value: 4, label: '运费券' },
          ],
          value: ''
        }
      ],
      menu: [
        {
          type: 'primary',
          label: '添加',
          on: () => {
            this.formVisible = true
          }
        }
      ],

      column: [
        //{ type: 'index', label: '序号', width: '60px', align: 'center' },
        {
          label: '规则名称',
          width: '150px',
          prop: 'ruleName'
        },
        {
          label: '规则类型',
          width: '100px',
          prop: 'ruleType',
          formatter: row => {
            if (row.ruleType === 4) return '运费券'
            else return '商品券'
          }
        },
        {
          label: '优惠券标题',
          width: '150px',
          prop: 'couponTitle'
        },
        {
          label: '优惠内容',
          width: '120px',
          //prop: 'mobilePhoneNumber'
          formatter: row => {
            return (
              <div>
                {row.couponType === 2 
                ? (<span>{row.couponOrderAmount == 0 ? '无门槛' : '满' + row.couponOrderAmount / 100} 享 {row.couponAmount / 10}折</span>)
                : (<span>{row.couponOrderAmount == 0 ? '无门槛' : '满' + row.couponOrderAmount / 100} 减{row.couponAmount / 100}</span>)
                }
              </div>
            )
          }
        },
        {
          label: '发放总量（张）',
          prop: 'totalQuantity',
          width: '100px',
          align: 'center',
        },
        {
          label: '已领取/剩余',
          width: '100px',
          align: 'center',
          align: 'center',
          formatter: row => {
            return (
              <div>
                {row.receivedQuantity}/{row.totalQuantity - row.receivedQuantity}
              </div>
            )
          }
        },
        {
          label: '领取限制',
          width: '110px',
          align: 'center',
          formatter: row => {
            return (
              <div>
                {row.memberReceiveQuantity == 0
                  ? '不限'
                  : '限领' + row.memberReceiveQuantity + '张'}
              </div>
            )
          }
        },
        {
          label: '领取时间',
          align: 'center',
          'show-overflow-tooltip': true,
          formatter: row => {
            return (
              <div>
                {row.ruleStartTime.slice(0, 10)}至{row.ruleEndTime.slice(0, 10)}
              </div>
            )
          }
        },
        {
          label: '有效时间',
          align: 'center',
          'show-overflow-tooltip': true,
          formatter: row => {
            return (
              <div>
                {row.couponValidTime.slice(0, 10)}至{row.couponExpireTime.slice(0, 10)}
              </div>
            )
          }
        },
        {
          label: '状态',
          prop: 'status',
          width: '80px',
          formatter: row => {
            if (row.isAborted) {
              return '已失效'
            } else {
              if (new Date(row.couponValidTime).getTime() > new Date().getTime()) {
                return '未开始'
              } else if (new Date(row.couponExpireTime).getTime() < new Date().getTime()) {
                return '已结束'
              } else if (!row.isPublished) {
                return '待发布'
              } else {
                return '进行中'
              }
            }
          }
        },
        {
          label: '操作',
          align: 'center',
          width: '150px',
          fixed: 'right',
          formatter: row => {
            return (
              <div>
                {!row.isPublished && (
                  <el-button type="text" onClick={this.publish.bind(this, row.id)}>
                    发布
                  </el-button>
                )}
                {!row.isPublished &&
                  (!row.isAborted ||
                    new Date(row.couponExpireTime).getTime() < new Date().getTime()) && (
                    <el-button type="text" onClick={this.getTree.bind(this, row)}>
                      修改
                    </el-button>
                  )}
                {new Date(row.couponExpireTime).getTime() > new Date().getTime() &&
                  new Date().getTime() > new Date(row.couponValidTime).getTime() &&
                  !row.isAborted && (
                    <el-button type="text" onClick={this.abort.bind(this, row.id)}>
                      中止
                    </el-button>
                  )}
                <el-button type="text" onClick={this.deleteCoupon.bind(this, row.id)}>
                  删除
                </el-button>
                <el-button type="text" onClick={this.couponRecord.bind(this, row.id)}>
                  查看领取记录
                </el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    deleteCoupon(id) {
      this.$confirm('是否删除该优惠券?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.deletePlatformCoupon({ id }).then(() => {
          this.$message.success('删除成功')
          this.$refs.table.onSearch()
        })
      })
    },
    couponRecord(id) {
      this.formVisibleson = true
      this.updateId = id
    },
    publish(id) {
      this.$confirm('是否发布该优惠券?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.publishPlatformCouponRule({ id }).then(() => {
          this.$message.success('发布成功')
          this.$refs.table.onSearch()
        })
      })
    },
    abort(id) {
      this.$confirm('是否中止该优惠券?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.abortPlatformCouponRule({ id }).then(() => {
          this.$message.success('已中止')
          this.$refs.table.onSearch()
        })
      })
    },
    getTree(row) {
      this.formVisible = true
      this.model = JSON.parse(JSON.stringify(row))
      this.model.couponOrderAmount /= 100
      if (this.model.couponType != 2) this.model.couponAmount /= 100
      if (!this.model.receiveLimit) {
        this.model.receiveLimit = ''
      }
      this.$set(this.model, 'validTimeAndExpireTime', [
        this.model.couponValidTime,
        this.model.couponExpireTime
      ])
      this.$set(this.model, 'ruleStartTimeAndruleEndTime', [
        this.model.ruleStartTime,
        this.model.ruleEndTime
      ])
    },
    success() {
      this.$refs.model.validate(valid => {
        if (valid) {
          let model = JSON.parse(JSON.stringify(this.model))
          model.couponValidTime = model.validTimeAndExpireTime[0]
          model.couponExpireTime = model.validTimeAndExpireTime[1]
          model.ruleStartTime = model.ruleStartTimeAndruleEndTime[0]
          model.ruleEndTime = model.ruleStartTimeAndruleEndTime[1]
          // model.couponOrderAmount *= 100
          model.couponOrderAmount = parseFloat(model.couponOrderAmount) * 100
          if (model.couponType != 2) model.couponAmount = parseFloat(model.couponAmount) * 100
          model.content='优惠券规则详情'
          model.couponValidDaysType = '1'
          this.loading = true
          this.saveModel(
            this.model.id ? 'updatePlatformCouponRule' : 'addPlatformCouponRule',
            model
          )
        }
      })
    },
    saveModel(type, model) {
      this.$http[type](model)
        .then(() => {
          this.loading = false
          this.$message({
            message: type === 'updatePlatformCouponRule' ? '修改成功' : '添加成功',
            type: 'success'
          })
          this.close()
        })
        .catch(() => {
          this.loading = false
        })
    },
    close() {
      this.model = this.$options.data().model
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
      this.formVisible = false
      this.$refs.table.onSearchKeep()
      this.clearForm('model')
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon-input {
  width: 200px;
}
</style>
