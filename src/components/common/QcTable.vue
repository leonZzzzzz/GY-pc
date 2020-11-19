<template>
  <div class="qc-table">
    <!-- 查询表单 -->
    <el-form
      class="qc-search-form"
      v-if="searchForm.length > 0 && tableConfig.showSearchAndReset"
      inline
      :model="search"
      :size="tableConfig.size"
      ref="search"
      label-width="85px"
      label-position="left"
    >
      <template v-for="(item, index) in searchForm">
        <el-form-item
          :key="index"
          :label="item.label"
          :prop="item.formName"
          v-if="item.type === 'input'"
        >
          <el-input v-model="search[item.formName]"></el-input>
        </el-form-item>
        <el-form-item
          :key="index"
          :label="item.label"
          :prop="item.formName"
          v-else-if="item.type === 'select'"
        >
          <el-select v-model="search[item.formName]">
            <el-option
              v-for="option in item.option"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :key="index"
          :label="item.label"
          :prop="item.formName"
          v-if="item.type === 'time-picker'"
        >
          <el-time-select v-model="search[item.formName]" v-bind="item.el"></el-time-select>
        </el-form-item>
        <el-form-item
          :key="index"
          :label="item.label"
          :prop="item.formName"
          v-if="item.type === 'date-picker'"
        >
          <el-date-picker v-model="search[item.formName]" v-bind="item.el"></el-date-picker>
        </el-form-item>
      </template>
      <el-form-item v-if="tableConfig.showSearchAndReset&&searchForm[0].newType!='storeCate'">
        <el-button type="primary" @click="onSearch()">查询</el-button>
        <el-button @click="onSearchFormReset('search')">重置</el-button>
      </el-form-item>
      <!-- 功能按钮 -->
      <el-form
        inline
        :size="tableConfig.size"
        class="qc-menu-form"
        v-if="menu.length > 0"
        style="display:inline"
      >
        <el-form-item
          v-for="(menuButton, index) in menu"
          v-if="menuButton.type == 'upload'"
          :key="index"
        >
          <el-upload
            class="upload-demo"
            :action="menuButton.url"
            :show-file-list="false"
            :on-success="
            res => {
              menuButton.on(res)
            }
          "
          >
            <el-button size="small" type="primary">{{ menuButton.label }}</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-else-if="menuButton.type == 'export'">
          <el-button type="primary" @click="onExport(menuButton.url)">
            {{
            menuButton.label || '导出'
            }}
          </el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button
            :disabled="
            'disabled' in menuButton ? menuButton.disabled({ currentRow, selectionRow }) : false
          "
            :type="menuButton.type"
            @click="menuButton.on(currentRow, search, selectionRow)"
          >{{ menuButton.label }}</el-button>
        </el-form-item>
      </el-form>
    </el-form>

    <!-- 表格数据 -->
    <el-table
      v-if="column.length > 0"
      id="table"
      size="medium"
      :data="tableData"
      :height="tableConfig.isFull ? height : tableConfig.height"
      @select="onSelect"
      @select-all="onSelect"
      @row-click="onRowClick"
      style="width: 100%"
      highlight-current-row
      v-loading="isLoading"
    >
      <el-table-column v-for="(item, index) in column" :key="index" v-bind="item"></el-table-column>
      <slot></slot>
    </el-table>
    <div v-else id="table" :style="{ height: height + 'px', overflow: 'auto' }">
      <slot></slot>
    </div>
    <div class="pagination" v-if="tableConfig.showPagination">
      <div class="pagination-count">
        <span class="count">共：{{ search.total }}&nbsp;条数据</span>
        <span class="selection" v-if="selectionRow.length > 0">已选中：{{ selectionRow.length }}&nbsp;条</span>
      </div>
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onPageChange"
        :page-sizes="[15, 30, 50]"
        :page-size="search.pageSize"
        :current-page="search.pageNum"
        :total="search.total"
        layout="prev, pager, next, sizes"
        background
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
const tableConfig = {
  // 接口地址
  url: '',
  // 组件的尺寸
  size: 'small',
  // table 是否充满屏幕
  isFull: true,
  // table 的高度，isFull 为false 才生效
  height: 400,
  // 查询/重置按钮
  showSearchAndReset: true,
  showPagination: true,
  response: {
    list: 'data.data.list',
    total: 'data.data.total'
  }
}

export default {
  props: {
    // 配置项
    option: {
      type: Object,
      default: function() {
        return tableConfig
      }
    },
    // 表格数据
    column: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 功能菜单配置
    menu: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 查询表单
    searchForm: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      isLoading: false,
      // 组件配置项
      tableConfig: {},
      // 查询
      search: {
        pageNum: 1,
        pageSize: 15,
        total: 0
      },
      // 表单列表
      tableData: [],
      // 勾选中的行
      selectionRow: [],
      // 当前选中行
      currentRow: {},
      height: '200'
    }
  },
  watch: {
    option: {
      handler() {
        this.tableConfig = Object.assign({}, tableConfig, this.option)
      },
      deep: true
    }
  },
  created() {
    // let height= this.$refs.search.offsetHeight;
    this.tableConfig = Object.assign({}, tableConfig, this.option)
    this.transformSearchForm().then(() => {
      this.onSearch()
    })
  },
  mounted() {
    this.$nextTick(() => {
      if (this.tableConfig.isFull) {
        this.fullTableHeight()
        window.onresize = () => {
          this.fullTableHeight()
        }
      }
    })
  },
  destroyed() {
    window.onresize = ''
  },
  methods: {
    fullTableHeight() {
      const PAGINATION_HEIGHT = 52,
        PADDING_BOTTOM_HEIGHT = 20
        if(this.searchForm[0].newType=='position'){
          this.height =
          window.innerHeight -
          document.querySelector('#table').offsetTop -
          PAGINATION_HEIGHT -
          PADDING_BOTTOM_HEIGHT-80
        }else{
          this.height =
          window.innerHeight -
          document.querySelector('#table').offsetTop -
          PAGINATION_HEIGHT -
          PADDING_BOTTOM_HEIGHT
          

        }
    },
    /**
     * 将传入的searchForm 转化成 键值对象
     */
    transformSearchForm() {
      if (this.tableConfig.isFull) {
        // 是否为店铺
          if(this.searchForm[0].newType=='storeName'){
            this.search.type='store'
          }
      }
      console.log('this.searchForm',this.searchForm)
      this.searchForm.forEach(item => {
        this.$set(this.search, item.formName, item.value)
      })
      return Promise.resolve()
    },
    onSplitFormName() {
      let search = Object.assign({}, this.search)
      console.log('let search ',search )
      Object.keys(search).forEach(key => {
        if (key.indexOf('_') > -1 && typeof search[key] === 'object' && search[key] !== null) {
          let array = key.split('_')
          array.forEach((item, index) => {
            search[item] = search[key][index]
          })
          delete search[key]
        }
      })
      return Promise.resolve(search)
    },
    getList(search) {
      console.log('表格数据',search)
      this.isLoading = true
      this.$http
        .get(this.option.url, search)
        .then(res => {
          this.isLoading = false
          this.currentRow = {}
          this.tableData=[]
          this.tableData = this.responseData(this.tableConfig.response.list, res)
          // this.tableData.map(value=>{
          //   value.amount=value.amount/100
          //   value.amount=parseFloat(value.amount).toFixed(2)
          // })
          if (this.tableConfig.showPagination) {
            this.search.total = this.responseData(this.tableConfig.response.total, res)
          } else {
            this.search.total = this.tableData.length
          }
          this.selectionRow = []
          this.currentRow = {}
          this.$emit('get-list', this.tableData)
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    responseData(key, response) {
      let data = response
      let listKey = key
      listKey.split('.').forEach(item => {
        data = data[item]
      })
      return data
    },
    onSearch() {
      this.search.pageNum = 1
      this.onSplitFormName().then(search => {
        this.getList(search)
        console.log(search)
        if(this.option.url=='api/admin/mall/v1/guyuOrder/page'){
          var status = search.status
          console.log(status)
          if(status==" "){
            if(search.deliveryWay==''||search.deliveryWay){
              this.countOrder(search)
            }
          }
        }
      })
    },
    // 获取订单数量
    countOrder(search) {
      console.log(search)
      // var params={startCreateTime:search.startCreateTime,endCreateTime:search.endCreateTime}
      this.$http.countOrderForGuyu(search).then(res => {
        var count = res.data.data
        this.$emit('get-count', count)
      })
    },
    onSearchKeep() {
      this.onSplitFormName().then(search => {
        this.getList(search)
      })
    },
    onSizeChange(val) {
      this.search.pageSize = val
      this.onSearch()
    },
    onPageChange(val) {
      this.search.pageNum = val
      this.onSearchKeep()
    },
    onSearchFormReset(formName) {
      this.$refs[formName].resetFields()
      this.onSearch()
    },
    onSelect(row) {
      this.selectionRow = row
      this.$emit('select', row)
    },
    onRowClick(row) {
      this.currentRow = row
      this.$emit('row-click', row)
    },
    onExport(url) {
      this.onSplitFormName().then(search => {
        window.open(url + qs.stringify(search))
      })
    }
  }
}
</script>

<style lang="scss">
.qc-table {
  background-color: #fff;

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10px 15px;
    &-count {
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      color: #7b7b7b;
      .count {
        margin-right: 20px;
      }
    }
  }
  .qc-search-form {
    padding: 15px 15px 0;
    background: #fff;
  }
  .qc-menu-form {
    background: #fff;
    padding: 15px 15px 0 15px;
  }
}
// .el-form-item__content {
//   width: 170px !important;
// }
</style>
