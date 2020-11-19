<template>
  <div>
    <QcTable ref="table" :option="option" :search-form="searchForm" :menu="menu" :column="column"></QcTable>
    <Form :visible="visible" :id="updateId" @onClose="onClose"></Form>
  </div>
</template>

<script>
import Form from './Form'

export default {
  components: { Form },
  data() {
    return {
      visible: false,
      updateId: '',
      searchForm: [
        {
          label: '名称',
          formName: 'name',
          type: 'input',
          value: ''
        },
        {
          label: '状态',
          type: 'select',
          formName: 'status',
          option: [
            { value: '', label: '全部' },
            { value: 'notstart', label: '未开始' },
            { value: 'ongoing', label: '进行中' },
            { value: 'ended', label: '已结束' },
          ],
          value: ''
        }
      ],
      option: {
        url: 'api/admin/v1/SpArea/page'
      },
      menu: [
        {
          label: '添加',
          type: 'primary',
          on: () => {
            this.visible = true
          }
        }
      ],
      column: [
        {
          prop: 'name',
          label: '专区名称',
        },
        { label: '开始时间', prop: 'startTime' },
        { label: '结束时间', prop: 'endTime'  },
        { label: '商品数量', prop: 'productTotal',align:'center'  },
        { label: '排序号', prop: 'sortNum' ,align:'center' },
        {
          label: '状态',
          prop: 'status',
          formatter: row => {
            return { ended: '已结束', ongoing: '进行中',notstart:'未开始' }[row.status]
          }
        },
        {
          label: '操作',
          align: 'center',
          formatter: row => {
            return (
              <div>
                <el-button
                  type="text"
                  onClick={() => {
                    this.visible = true
                    this.updateId = row.id
                  }}
                >
                  编辑
                </el-button>
                <el-button type="text" onClick={this.deleteConfirm.bind(this, row.id)}>
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
    //删除提示框
    deleteConfirm(id) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.deleteSpecialArea({ id }).then(() => {
            this.$refs.table.onSearchKeep()
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          return
        })
    },
    onClose(flag) {
      this.updateId = ''
      this.visible = false
      if (typeof flag == 'boolean' && flag) {
        this.$refs.table.onSearchKeep()
      }
    }
  }
}
</script>
