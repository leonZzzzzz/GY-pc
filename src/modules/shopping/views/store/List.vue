<template>
  <div>
    <QcTable
      ref="table"
      :option="option"
      :menu="menu"
      :search-form="searchForm"
      :column="column"
    ></QcTable>
   <el-dialog title="请选择需要调整的具体日期" width="400px" append-to-body :close-on-click-modal="false" :visible="visible" :before-close="onClose">
      <div class="block">
        <span>日期选择：</span>
        <el-date-picker 
          v-model="endUseDate"
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <span slot="footer">
        <el-button @click="onClose()">关闭</el-button>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="选择保证金级别"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
      :visible="visible_2"
      :before-close="onClose_2"
    >
      <el-form ref="model" :model="model" label-position="right" label-width="100px">
        <el-form-item label="保证金级别" prop="margin">
          
          <el-select v-model="model.margin">
            <el-option
              v-for="item in margins"
              :label="item.value"
              :value="item.key"
              :key="item.id"
            ></el-option>
          </el-select>

        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="onClose_2()">关闭</el-button>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
      </span>
    </el-dialog>

    <el-dialog title="退还店铺剩余保证金" width="450px" append-to-body :close-on-click-modal="false" :visible="visible_3" :before-close="onClose_3">
      <p style="padding-bottom: 20px;padding-left: 30px;">当前保证金：
        <span style="font-size: 26px;color: #E6A23C;">{{model.surplusMoney || model.surplusMoney === 0 ? model.surplusMoney / 100 : ''}}</span> 元
      </p>
      <el-form ref="model" :model="model" label-position="right" label-width="100px">
        <el-form-item label="退还方式" prop="rebackBzjType">
          <el-select v-model="rebackBzjType" @change="rebackBzjTypeMet">
            <el-option label="线上退还" value="online"></el-option>
            <el-option label="线下退还" value="offline"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息" prop="rebackBzjType">
            <el-input v-model="rebackBzjMsg" style="width:218px"></el-input>
        </el-form-item>
        <div style="margin:20px 0px 22px 32px;color:red" :hidden="!rebackBzjValueBDv">
           <span>线上退款保存后将自动调用汇聚退款进行退保证金操作</span>
        </div>
        <el-form-item  :hidden="rebackBzjValueBDv" label="还款途径" prop="rebackBzjValue">
          <el-select v-model="rebackBzjValue">
            <el-option label="支付宝" value="支付宝"></el-option>
            <el-option label="微信" value="微信"></el-option>
            <el-option label="现金" value="现金"></el-option>
            <el-option label="pos刷卡" value="pos刷卡"></el-option>
            <el-option label="银联" value="银联"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="onClose_3()">关闭</el-button>
        <el-button type="primary" @click="onSubmitReBackBzj()">提交</el-button>
      </span>
    </el-dialog>

    <el-dialog title="请选择需要调整的具体日期" width="400px" append-to-body :close-on-click-modal="false" :visible="visible_4" :before-close="onClose_4">
      <div class="block">
        <span>日期选择：</span>
        <el-date-picker 
          v-model="serviceFreeDate"
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <span slot="footer">
        <el-button @click="onClose_4()">关闭</el-button>
        <el-button type="primary" @click="onSubmitUpdateEndDaysDate()">提交</el-button>
      </span>
    </el-dialog>
    
    <el-dialog title="请选择需要调整的具体日期" width="400px" append-to-body :close-on-click-modal="false" :visible="visible_5" :before-close="onClose_5">
      <div class="block">
        <span>日期选择：</span>
        <el-date-picker 
          v-model="signOcrDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <span slot="footer">
        <el-button @click="onClose_5()">关闭</el-button>
        <el-button type="primary" @click="onSubmitUpdateOldCustomerDate()">提交</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="丰盈配送"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
      :visible="formVisible"
      :before-close="onCloseDelivery"
    >
      <el-form ref="modelDelivery" :model="model" label-position="right" label-width="120px">
        <el-form-item
          label="是否支持:"
          prop="isPlatformDelivery"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-radio v-model="model.isPlatformDelivery" :label="true">支持</el-radio>
          <el-radio v-model="model.isPlatformDelivery" :label="false">不支持</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="onCloseDelivery()">关闭</el-button>
        <el-button type="primary" @click="saveDelivery()">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="包装服务费(每单)"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
      :visible="chargesVisible"
      :before-close="onCloseCharges"
    >
      <el-form ref="modelCharges" :model="model" label-position="right" label-width="150px">
        <el-form-item
          label="包装服务费(每单):"
          prop="packingCharges"
          :rules="[{ required: true, message: '该项为必填项' }]"
        >
          <el-input v-model="model.packingCharges" style="width:180px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="onCloseCharges()">关闭</el-button>
        <el-button type="primary" @click="saveCharges()">保存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="身份证、门店照片"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
      :visible="visible_6"
      :before-close="onClose_6"
      >
         <el-form ref="modelCharges" :model="phones" label-position="right" label-width="150px">
          <el-form-item label="身份证正面图" prop="iconUrl">
          <ImageUpload
            :image-url="phones.idCardFrontUrl"
            :on-success="e => (phones.idCardFrontUrl = e)"
          ></ImageUpload>
        </el-form-item>
        <el-form-item label="身份证背面图" prop="iconUrl">
          <ImageUpload
            :image-url="phones.idCardBackUrl"
            :on-success="e => (phones.idCardBackUrl = e)"
          ></ImageUpload>
        </el-form-item>
        <el-form-item label="营业执照" prop="iconUrl">
          <ImageUpload
            :image-url="phones.businessLicenseUrl"
            :on-success="e => (phones.businessLicenseUrl = e)"
          ></ImageUpload>
        </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="onClose_6()">关闭</el-button>
          <el-button type="primary" @click="savePhones()">保存</el-button>
        </span>
        <!-- idCardFrontUrl,
        businessName,
        businessLicenseUrl, -->
    </el-dialog>

  </div>
</template>

<script>
import { Collapse } from 'element-ui'
export default {
  data() {
    return {
      option: {
        url: 'api/admin/v1/store/registration/pageAllStore'
      },
      numberValidateForm: {
        days: ''
      },
      formVisible: false,
      chargesVisible: false,
      searchForm: [
        {
          type: 'select',
          formName: 'categoryId',
          label: '经营种类',
          option: [{ value: '', label: '请选择' }],
          value: ''
        },
        {
          type: 'select',
          formName: 'storeStatus',
          label: '店铺状态',
          option: [
            { value: '1', label: '正常' },
            { value: '2', label: '即将到期' },
            { value: '3', label: '已到期' },
            { value: '4', label: '已禁用' },
            { value: '', label: '所有' }
          ],
          value: '1'
        },
        {value: '', formName: 'storeName', type: 'input', label: '店铺名称' },
        {value: '', formName: 'mobile', type: 'input', label: '手机号码' },
        {
          type: 'date-picker',
          formName: 'startTime_endTime',
          el: {
            type: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd'
          },
          label: '入驻时间',
          value: ''
        }
      ],
      menu: [
        {
          type: 'export',
          label: '导出',
          url: this.projectUrl + '/api/admin/v1/store/registration/exportStore?'
        },
      ],
      column: [
        { type: 'index', label: '序号', align: 'center', width: '50px' },
        { prop: 'name', label: '店铺名称', align: 'center' },
        { prop: 'businessName', label: '企业名称', align: 'center' },

        {
          label: '店铺资金',
          formatter: row => {
            return (
              <div>
                <p>可提现余额(元)：{row.storeMoney.withdrawable / 100}</p>
                <p>待结算余额(元)：{row.storeMoney.settlement / 100}</p>
                <p>待处理提现(元)：{row.storeMoney.pendingDisposal / 100}</p>
                <p>剩余保证金(元)：{row.storeMoney.surplusMoney / 100}</p>
              </div>
            )
          },
          align: 'center',
          width: '200px'
        },
        {
          label: '保证金级别(元)',
          formatter: row => {
            return [row.earnestMoney] / 100
          },
          align: 'center'
        },
        { prop: 'categoryName', label: '经营种类', align: 'center' },
        {
          label: '身份证和门店照片',
          formatter: row => {
            var rowlist=this.mixpic(row)
            console.log(rowlist)
            // return <img  src={this.imgHost + row.idCardFrontUrl} width="50" height="50" />
            return (
              <div>
              <el-image
                fit="cover"
                style="width:50px;height:50px;"
                src={this.imgHost + row.idCardFrontUrl}
                preview-src-list={rowlist}
              >
                <div slot="error" class="el-image__error">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <el-image
                fit="cover"
                style="width:50px;height:50px;"
                src={this.imgHost + row.idCardBackUrl}
                preview-src-list={rowlist}
              >
                <div slot="error" class="el-image__error">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <el-image
                fit="cover"
                style="width:50px;height:50px;"
                src={this.imgHost + row.businessLicenseUrl}
                preview-src-list={rowlist}
              >
                <div slot="error" class="el-image__error">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              </div>   
            )
          },
          align: 'center',
          width: '80px'
        },
        // {
        //   label: '经营者身份证(背面)',
        //   formatter: row => {
        //      var rowlist=this.mixpic(row)
        //     return (
        //       <el-image
        //         fit="cover"
        //         style="width:50px;height:50px;"
        //         src={this.imgHost + row.idCardBackUrl}
        //         preview-src-list={rowlist}
        //       >
        //         <div slot="error" class="el-image__error">
        //           <i class="el-icon-picture-outline"></i>
        //         </div>
        //       </el-image>
        //     )
        //   },
        //   align: 'center',
        //   width: '80px'
        // },
        // {
        //   label: '门店正面照',
        //   formatter: row => {
        //      var rowlist=this.mixpic(row)
        //     return (
        //       <el-image
        //         fit="cover"
        //         style="width:50px;height:50px;"
        //         src={this.imgHost + row.businessLicenseUrl}
        //         preview-src-list={rowlist}
        //       >
        //         <div slot="error" class="el-image__error">
        //           <i class="el-icon-picture-outline"></i>
        //         </div>
        //       </el-image>
        //     )
        //   },
        //   align: 'center',
        //   width: '80px'
        // },
        { prop: 'businessTime', label: '接单时间', align: 'center', width: '60px' },
        { prop: 'address', label: '店铺地址', align: 'center' },
        { prop: 'personInCharge', label: '联系人', align: 'center' },
        { prop: 'customerServiceNumbers', label: '联系人电话', align: 'center', width: '120px' },
        { prop: 'info', label: '店铺介绍', align: 'center', width: '120px' },
        {
          label: '退货信息',
          formatter: row => {
            return [row.personInCharge] + [row.mobile] + [row.address]
          },
          align: 'center'
        },
        {
          formatter: row => {
            return this.formatTime(row.createTime)
          },
          label: '入驻日期',
          width: '100px',
          fixed: 'right',
          align: 'center'
        },
        {
          formatter: row => {
            return this.formatTime(row.endDate)
          },
          label: '到期日期',
          width: '100px',
          fixed: 'right',
          align: 'center'
        },
        {
          formatter: row => {
            return this.formatTime(row.serviceFreeDate)
          },
          label: '免服务费截止日期',
          width: '100px',
          fixed: 'right',
          align: 'center'
        },
        {
          formatter: row => {
            return this.formatTime(row.signOcrDate)
          },
          label: '标记老客户截止日期',
          width: '100px',
          fixed: 'right',
          align: 'center'
        },
        { prop: 'inviterMobile', label: '推荐人', align: 'center', width: '120px' },
        { prop: 'auditMsg', label: '店铺状态', align: 'center' },
        {
          label: '丰盈配送',
          fixed: 'right',
          formatter: row => {
            return (
              <div>
                <el-button type="text" onClick={this.openDeliveryForm.bind(this, row)}>
                  {row.isPlatformDelivery ? '支持' : '不支持'}
                </el-button>
              </div>
            )
          }
        },
        // {
        //   label: '包装服务费',
        //   fixed: 'right',
        //   formatter: row => {
        //     return (
        //       <div>
        //         <el-button type="text" onClick={this.openChargesForm.bind(this, row)}>
        //           {row.packingCharges / 100}
        //         </el-button>
        //       </div>
        //     )
        //   }
        // },
        {
          label: '操作',
          fixed: 'right',
          width: '170px',
          formatter: row => {
            return (
              <div>
                {(row.storeStatus == 1 || row.storeStatus == 0) && row.auditStatus == 1 && (
                    <el-button
                      type="text"
                      onClick={this.changeStatus.bind(this, row.id, -1, '禁用')}
                    >
                      禁用
                    </el-button> 
                )}
                {row.storeStatus == -1 && row.auditStatus == 1 && (
                    <el-button
                      type="text"
                      onClick={this.changeStatus.bind(this, row.id, 1, '启用')}>
                      启用  
                    </el-button>                   
                )}
                {row.auditStatus == 1 && (
                  <div>
                    <p>
                    <p>
                      <el-button type="text" onClick={this.getTree_2.bind(this, row)}>
                        调整保证金
                      </el-button>
                    </p>
                    <p>
                      <el-button type="text" onClick={this.rebackBzj.bind(this,row)}>
                        退还保证金
                      </el-button>
                    </p>
                    <p>
                      <el-button type="text" onClick={this.editPhone.bind(this,row)}>
                        修改身份证\门店照片
                      </el-button>
                    </p>
                      <el-button type="text" onClick={this.getTree.bind(this, row,row.endDate)}>
                        修改店铺使用期限
                      </el-button>
                    </p>
                    <p>
                      <el-button type="text" onClick={this.updateEndDateDays.bind(this,row.id,row.serviceFreeDate)}>
                        修改免交易费截止日期
                      </el-button>
                    </p>
                    <p>
                      <el-button type="text" onClick={this.updateOldCustomerDate.bind(this,row.id,row.signOcrDate)}>
                        修改标记老客户截止日期
                      </el-button>
                    </p>
                  </div>
                )}
              </div>
            )
          }
        }
      ],
      model: {
        type: this.type,
        name: '',
        margin: '',
      },
      visible: false,
      visible_2: false,
      visible_3: false,
      visible_4: false,
      visible_5: false,
      visible_6: false,
      phones:{
          id:'',
          idCardFrontUrl:'',
          idCardBackUrl:'',
          businessLicenseUrl:'',
      },
      margins: [],
      margin: '',
      rebackBzjType:'online',
      rebackBzjValue:'支付宝',
      rebackBzjMsg:'',
      rebackBzjValueBDv:true,
      flag: false,
      serviceFreeDate:'',
      signOcrDate:'',
      endUseDate:'',
    }
  },
  created() {
    this.listBaseConfigByParentId()
    this.listStoreCategory()
  },
  mounted() {
    this.gundong()
  },
  methods: {
    openChargesForm(row) {
      console.log('row',row)
      this.model = JSON.parse(JSON.stringify(row))
      this.model.packingCharges /= 100
      this.chargesVisible = true
    },
    onCloseCharges() {
      this.chargesVisible = false
    },
    saveCharges() {
      this.$refs.modelCharges.validate(valid => {
        if (valid) {
          this.stCharges(this.model.registrationId, this.model.packingCharges * 100)
        }
      })
    },
    stCharges(id, amount) {
      this.$http.stCharges({ id, amount }).then(() => {
        this.$message.success('修改成功')
        this.$refs.table.onSearch()
        this.onCloseCharges()
      })
    },
    openDeliveryForm(row) {
      this.model = JSON.parse(JSON.stringify(row))
      this.formVisible = true
    },
    onCloseDelivery() {
      this.formVisible = false
    },
    saveDelivery() {
      this.$refs.modelDelivery.validate(valid => {
        if (valid) {
          this.stDelivery(this.model.registrationId, this.model.isPlatformDelivery)
        }
      })
    },
    savePhones(){
      this.$http.updateStorePhones({ id:this.phones.id,idCardFrontUrl:this.phones.idCardFrontUrl,idCardBackUrl:this.phones.idCardBackUrl,businessLicenseUrl:this.phones.businessLicenseUrl}).then(() => {
        this.$message.success('修改成功')
        this.onClose_6()
        this.$refs.table.onSearch()
      })
    },
    stDelivery(id, isSupport) {
      this.$http.stDelivery({ id, isSupport }).then(() => {
        this.$message.success('修改成功')
        this.$refs.table.onSearch()
        this.onCloseDelivery()
      })
    },
    mixpic(row){
      var piclist = []
      var pic = this.imgHost+row.idCardFrontUrl
      var pic1 = this.imgHost+row.idCardBackUrl
      var pic2 = this.imgHost+row.businessLicenseUrl
      piclist.push(pic)
      piclist.push(pic1)
      piclist.push(pic2)
      return piclist
    },
    formatTime(val) {
      return val.split(' ')[0]
    },
    getTree(row,endDate) {
      this.model = JSON.parse(JSON.stringify(row))
      this.visible = true
      this.endUseDate=endDate
    },
    getTree_2(row) {
      this.model = JSON.parse(JSON.stringify(row))
      this.model.margin = this.model.earnestLevel
      this.visible_2 = true
    },
    rebackBzjTypeMet(e){
        if(this.rebackBzjType=='online'){
            this.rebackBzjValueBDv=true
        }else if(this.rebackBzjType=='offline'){
            this.rebackBzjValueBDv=false
        }
    },
    // 退还保证金
    rebackBzj(row){
        this.visible_3 = true
        this.model.id = row.id
        this.model.surplusMoney = row.surplusMoney
    },
    //修改门店、身份证图片
    editPhone(row){
      this.visible_6 = true
      this.model.id = row.id
      this.phones.id=row.id
      this.phones.idCardFrontUrl=row.idCardFrontUrl
      this.phones.idCardBackUrl=row.idCardBackUrl
      this.phones.businessLicenseUrl=row.businessLicenseUrl
      // this.model.surplusMoney = row.surplusMoney
    },
    //延长免交易费截止日期
    updateEndDateDays(id,serviceFreeDate){
        this.visible_4 = true
        this.model.id=id;
        this.serviceFreeDate=serviceFreeDate
    },
    onSubmitUpdateEndDaysDate() {
        var id = this.model.id
        var s=this.serviceFreeDate
        console.log(s)
        this.$http.updateDateDays({serviceFreeDate:this.serviceFreeDate, id }).then(() => {
          this.onClose_4()
          this.$message.success('操作成功')
          this.$refs.table.onSearchKeep()
        })
    },
    //标记老客户截止日期
    updateOldCustomerDate(id,signOcrDate){
        this.visible_5 = true
        this.model.id=id;
        this.signOcrDate=signOcrDate
    },
    onSubmitUpdateOldCustomerDate() {
        var id = this.model.id
        var s=this.signOcrDate
        this.$http.updateDateDays({signOcrDate:this.signOcrDate, id }).then(() => {
          this.onClose_5()
          this.$message.success('操作成功')
          this.$refs.table.onSearchKeep()
        })
    },

    listBaseConfigByParentId() {
      this.$http.listBaseConfigByParentId({ parentId: 'PLATFORM_SERVICE_FEE_SETTING' }).then(res => { 
          this.margins = res.data.data.map(item => {
                    item.value = (parseFloat(item.value)/100).toString()
                    return item
               })
        })
    },
    listStoreCategory() {
      this.$http.listStoreCategory({ type: 20 }).then(res => {
        res.data.data.map(item => {
          this.searchForm[0].option.push({ value: item.id, label: item.name })
        })
      })
    },
    exportStore() {
      location.href = this.projectUrl + '/api/admin/v1/store/registration/exportStore'
    },
    changeStatus(id, status, msg) {
      this.$confirm('是否' + msg + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.changeStatus({ id, status }).then(() => {
            this.$message.success(msg + '成功')
            this.$refs.table.onSearchKeep()
          })
        })
        .catch(() => {
          return
        })
    },
    deleteConfirm(id) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.deleteStoresss({ id }).then(() => {
            this.$message.success('删除成功')
            this.$refs.table.onSearchKeep()
          })
        })
        .catch(() => {
          return
        })
    },
    submitForm(formName) {
        var id = this.model.id
        var s=this.endUseDate
        this.$http.changeEndDate({endUseDate:this.endUseDate, id }).then(() => {
          this.onClose()
          this.$message.success('操作成功')
          this.$refs.table.onSearchKeep()
        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit() {
      this.$refs.model.validate(value => {
        if (value) {
          var id = this.model.id
          this.$http.changeMargin({ margin: this.model.margin, id }).then(() => {
            this.onClose_2()
            this.$message.success('操作成功')
            this.$refs.table.onSearchKeep()
          })
        }
      })
    },
    onSubmitReBackBzj() {
      this.$refs.model.validate(value => {
        if (value) {
          var id = this.model.id
          this.$http.rebackBzj({rebackBzjType:this.rebackBzjType, rebackBzjValue: this.rebackBzjValue , rebackBzjMsg:this.rebackBzjMsg, id }).then(() => {
            this.onClose_3()
            this.$message.success('操作成功')
            this.$refs.table.onSearchKeep()
          })
        }
      })
    },
    onClose() {
      this.visible = false
      this.model = this.$options.data().model
      this.model.type = this.type
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
    },
    onClose_2() {
      this.visible_2 = false
      this.model = this.$options.data().model
      this.model.type = this.type
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
    },
    onClose_3() {
      this.visible_3 = false
      this.model = this.$options.data().model
      this.model.type = this.type
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
    },
    onClose_4() {
      this.visible_4 = false
      this.model = this.$options.data().model
      this.model.type = this.type
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
    },
    onClose_5() {
      this.visible_5 = false
      this.model = this.$options.data().model
      this.model.type = this.type
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
    },
    onClose_6() {
      this.visible_6 = false
      this.model = this.$options.data().model
      this.model.type = this.type
      this.$nextTick(() => {
        this.$refs.model.clearValidate()
      })
    },
    gundong() {
      var dom = this.$refs['table']
      console.log(dom)
      // dom.el.target.sor
      // el.target.scrollLeft
    }
  }
}
</script>