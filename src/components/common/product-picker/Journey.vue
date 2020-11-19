<template>
  <div>
    <QcTable :option="option" :search-form="searchForm" :column="column"></QcTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        url: 'api/admin/v1/journey-product/page'
      },
      searchForm: [{ label: '旅居名称', type: 'input', formName: 'name' }],
      column: [
        { label: '排序', type: 'index', align: 'center' },
        {
          label: '封面',
          align: 'center',
          formatter: row => {
            return (
              <el-image src={this.imgHost + row.cover} fit="cover" style="width:55px;height:55px">
                <div slot="error" class="el-image__error">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            )
          }
        },
        { label: '名称', prop: 'title', align: 'center' },
        { label: '路线分类', prop: 'category', align: 'center' },
        {
          label: '销售价',
          align: 'center',
          formatter: row => {
            return row.price / 100
          }
        },
        { label: '状态', prop: 'saleStatus', align: 'center' },
        { label: '库存', prop: 'stock', align: 'center' },
        { label: '销量', prop: 'saleQuantity', align: 'center' },
        {
          label: '操作',
          prop: '',
          align: 'center',
          formatter: row => {
            return (
              <div>
                <el-button type="text" onClick={this.onSelectRow.bind(this, row)}>
                  使用
                </el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    onSelectRow(row) {
      this.$emit('on-select-row', row)
    }
  }
}
</script>

<style></style>
