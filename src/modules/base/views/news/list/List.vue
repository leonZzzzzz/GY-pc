<template>
  <QcTable ref="table" :option="option" :menu="menu" :column="column" :search-form="searchForm"></QcTable>
</template>

<script>
export default {
  data() {
    return {
      option: {
        url: 'api/admin/v1/singleContent/page'
      },
       searchForm:[
        { formName: '', value: ' ',newType:'' },
      ],
      menu: [
        {
          label: '添加',
          type: 'primary',
          on: () => {
            this.$router.push('/main/base/news/detail')
          }
        }
      ],
      column: [
        { type: 'index', label: '序号', align: 'center' },
        {
          label: '封面',
          align: 'center',
          formatter: row => {
            return (
              <el-image src={this.imgHost + row.iconUrl} style="width:50px;height:50px">
                <div slot="error" class="el-image__error">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            )
          }
        },
        { prop: 'title', label: '标题', align: 'center' },
        { prop: 'categoryName', label: '分类', align: 'center' },
        { prop: 'info', label: '简介', align: 'center' },
        { prop: 'createTime', label: '创建时间', align: 'center' },
        {
          label: '操作',
          align: 'center',
          formatter: row => {
            return (
              <div>
                <el-button
                  type="text"
                  onClick={() => {
                    this.$router.push(`/main/base/news/detail?id=${row.id}`)
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
          this.$http.deleteNews({ id }).then(() => {
            this.$refs.table.onSearchKeep()
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          return
        })
    }
  }
}
</script>
