<template>
  <el-dialog :visible="visible" title="店铺选择" :before-close="onClose" width="750px">
    <QcTable :option="option" :column="column" :search-form="searchForm"></QcTable>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      option: {
        isFull: false,
        height: 400,
        url: 'api/admin/v1/Statistics/salesmanStorePage'
      },
      model:{
        storeName:'',
        storeMobile:''
      },
      searchForm: [
        { label: '店铺名称', formName: 'storeName', type: 'input'},
        { label: '电话', formName: 'storeMobile', type: 'input'},
      ],
      column: [
        {
          label: '序号',
          type:'index',
          align: 'center',
        },
        {
          label: '店铺名称',
          width: '200px',
          prop: 'name'
        },
        {
          label: '联系人',
          width: '100px',
          prop: 'personInCharge'
        },
        {
          label: '联系人电话',
          width: '150px',
          prop: 'mobile'
        },
        {
          label: '操作',
          formatter: row => {
            return (
              <el-button type="primary" size="mini" onClick={this.onSelect.bind(this, row)}>
                使用
              </el-button>
            )
          }
        },
        //console.log('row',row);
      ]
    }
  },
  methods: {
    onSelect(row) {
      this.$emit('onSelect', row)
    },
    onClose() {
      this.$emit('onClose')
    }
  }
}
</script>
