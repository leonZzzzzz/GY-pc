<template>
  <el-card>
    <el-button type="primary" size="medium" @click="insert()">添加</el-button>
    <QcTable ref="table" :option="option" :search-form="searchForm" :column="column"></QcTable>
    <!-- <QcTable ref="table" :option="option" :menu="menu" :search-form="searchForm" :column="column"></QcTable> -->
    <Form
      :visible="formVisible"
      :id="id"
      :name="name"
      :seqNum="seqNum"
      :info="info"
      @close="onFormDialogClose"
      resourceType="menu"
    ></Form>
  </el-card>
</template>

<script>
import Form from './Form'
export default {
  components: { Form },
  data() {
    return {
      name:'',
      seqNum:0,
      info:'',
      id: '',
      parentId: '',
      formVisible: false,
      option: {
        url: 'api/admin/v1/store/storeCategory/pages'
      },  
      searchForm: [
        {newType:'storeCate'},
       
      ],

      column: [
        {
          type: 'selection'
        },
        {
          label: '名称',
          width: '200px',
          prop:'name'
        },
        {
          label: '描述',
          align: 'center',
          prop: 'info'
        },
        {
          label: '创建时间',
          align: 'center',
          prop: 'createTime'
        },
        {
          label: '操作',
          fixed: 'right',
          width: '100px',
          formatter: row => {
            return (
              <div>
                <el-button type="text" onclick={this.update.bind(this,row)}>
                  修改
                </el-button>
                <el-button type="text" onclick={this.deleteConfirm.bind(this,row.id)}>
                  删除
                </el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    insert(item) {
      this.id = ''
      this.formVisible = true
      this.id = ''
      this.name=''
      this.seqNum=0
      this.info=''
    },
    update(item) {
      this.parentId = item.id
      this.id = item.id
      this.name=item.name
      this.seqNum=item.seqNum
      this.info=item.info
      this.formVisible = true
    },
    deleteConfirm(id) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.deleteStoreCategory({ id }).then(() => {
            this.$message.success('删除成功')
            // this.$router.go(0)
            this.$refs.table.onSearchKeep()
          })
        })
        .catch(() => {
          return
        })
    },
    
    onFormDialogClose(flag) {
      this.id = ''
      this.parentId = ''
      this.formVisible = false
      if (typeof flag == 'boolean' && flag) {
        // this.manageMenuTree()
        // this.$router.go(0)
        this.$refs.table.onSearchKeep()
      }
    },
    async manageMenuTree() {
      let res = await this.$http.getStoreCate()
      this.column = res.data.data
      console.log(JSON.stringify(this.manageMenu, 0, 1))
    },


  }
}
</script>

<style lang="scss" scope>
.product-item {
  display: flex;
  align-items: flex-start;
  .cover {
    margin-right: 10px;
  }
  .name {
    height: 32px;
    line-height: 15px;
    margin-bottom: 10px;
  }
  .price {
    font-size: 14px;
    line-height: 1;
  }
}
</style>
