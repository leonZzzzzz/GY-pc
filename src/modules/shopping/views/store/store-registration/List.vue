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
      title="选择保证金级别"
      width="400px"
      append-to-body
      :close-on-click-modal="false"
      :visible="visible"
      :before-close="onClose"
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
        <el-button @click="onClose()">关闭</el-button>
        <el-button type="primary" @click="onSubmit()">审核通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        url: 'api/admin/v1/store/registration/list'
      },
      searchForm: [
        {
          type: 'select',
          formName: 'auditStatus',
          label: '审核状态',
          option: [
            { value: '0', label: '待审核' },
            { value: '1', label: '审核通过' },
            { value: '2', label: '审核不通过' }
          ],
          value: '0'
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
          label: '申请时间',
          value: ''
        }
      ],
      column: [
        { type: 'index', label: '序号', align: 'center', width: '50px' },
        { prop: 'name', label: '店铺名称', align: 'center' },
        { prop: 'businessName', label: '企业名称', align: 'center' },
        { prop: 'categoryName', label: '经营种类', align: 'center' },
        {
          label: '身份证和门店照片',
          formatter: row => {
            var rowlist=this.mixpic(row)
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
                preview-src-list={rowlist}>
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
        //   label: '经营者身份证(反面)',
        //   formatter: row => {
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
        //     return (
        //       <el-image
        //         fit="cover"
        //         style="width:50px;height:50px;"
        //         src={this.imgHost + row.businessLicenseUrl}
        //         preview-src-list={rowlist}>
        //       <div slot="error" class="el-image__error">
        //           <i class="el-icon-picture-outline"></i>
        //         </div>
        //       </el-image>
        //     )
        //   },
        //   align: 'center',
        //   width: '80px'
        // },
        { prop: 'personInCharge', label: '联系人', align: 'center' },
        { prop: 'mobile', label: '联系电话', align: 'center' },
        { prop: 'inviterMobile', label: '推荐人', align: 'center' },
        { prop: 'createTime', label: '申请时间', width: '100px', fixed: 'right', align: 'center' },
        {
          label: '审核状态',
          formatter: row => {
            return (
              <div>
                <p>{{ 0: '待审核', 1: '审核通过', 2: '审核不通过' }[row.auditStatus]}</p>
                <p>{row.auditStatus == 2 && row.auditMsg}</p>
              </div>
            )
          },
          align: 'center'
        },
        {
          label: '操作',
          fixed: 'right',
          width: '200px',
          formatter: row => {
            return (
              row.auditStatus != 1 && (
                <div>
                  <el-button type="text" onClick={this.getTree.bind(this, row)}>
                    审核通过
                  </el-button>
                  <el-button type="text" onClick={this.auditStoreStatus.bind(this, row.id)}>
                    审核不通过
                  </el-button>
                </div>
              )
            )
          }
        }
      ],
      model: {
        type: this.type,
        name: '',
        info: '',
        seqNum: '',
        iconUrl: '',
        margin: '',
        isDisplay: true
      },
      margins: [],
      visible: false,
      flag: false
    }
  },
  created() {
    this.listBaseConfigByParentId()
  },
  methods: {
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
    getTree(row) {
      this.model = JSON.parse(JSON.stringify(row))
      this.visible = true
    },
    listBaseConfigByParentId() {
      this.$http
        .listBaseConfigByParentId({ parentId: 'PLATFORM_SERVICE_FEE_SETTING' })
        .then(res => {
          console.log(res.data)
          // this.margins = res.data.data
          this.margins = res.data.data.map(item => {
                    item.value = (parseFloat(item.value)/100).toString()
                    return item
               })
        })
    },
    auditStoreStatus(id) {
      this.$prompt('', '请输入审核不通过原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '审核不通过原因'
      })
        .then(({ value }) => {
          this.$http.auditStoreStatus({ auditStatus: 2, notPassReason: value, id }).then(() => {
            this.$message.success('操作成功')
            this.$refs.table.onSearchKeep()
          })
        })
        .catch(() => {})
    },
    onSubmit() {
      this.$refs.model.validate(value => {
        if (value) {
          var id = this.model.id
          this.$http
            .auditStoreStatus({ margin: this.model.margin, auditStatus: 1, id })
            .then(() => {
              this.onClose()
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
    }
  }
}
</script>
