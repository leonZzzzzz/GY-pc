<template>
  <div>
    <QcTable ref="table" :option="option" :menu="menu" :search-form="searchForm" :column="column"></QcTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        url: 'api/admin/mall/v1/guyuProduct/page'
      },
      menu: [
        {
          label: '上架',
          disabled: ({ selectionRow }) => selectionRow.length == 0,
          on: (currentRow, search, selectionRow) => {
            console.log(selectionRow)
            let ids = selectionRow.map(item => {
              return item.id
            })
            this.productSell(ids.join('_'), true)
          }
        },
        {
          label: '下架',
          disabled: ({ selectionRow }) => selectionRow.length == 0,
          on: (currentRow, search, selectionRow) => {
            console.log(selectionRow)
            let ids = selectionRow.map(item => {
              return item.id
            })
            this.productSell(ids.join('_'), false)
          }
        },
        {
          label: '删除',
          disabled: ({ selectionRow }) => selectionRow.length == 0,
          on: this.deleteConfirm
        }
      ],
      searchForm: [
        { label: '商品名称', type: 'input', formName: 'name' },
        { label: '商品分类', type: 'input', formName: 'categoryName' },
        { label: '店铺名称', type: 'input', formName: 'storeName' },
        {
          label: '商品状态',
          type: 'select',
          formName: 'salesStatus',
          option: [
            { value: '', label: '全部' },
            { value: '0', label: '已上架' },
            { value: '2', label: '已下架' },
            { value: '1', label: '已售罄' }
          ],
          value: ''
        }
      ],
      column: [
        {
          type: 'selection'
        },
        {
          label: '商品图片',
          width: '100px',
          formatter: row => {
            return <QcProductItem img={this.imgHost + row.iconUrl}></QcProductItem>
          }
        },
        {
          label: '商品名称',
          prop: 'name',
          align: 'center',
          width: '150px'
        },
        {
          label: '商品分类',
          prop: 'categoryName',
          align: 'center',
          width: '150px'
        },
        {
          label: '店铺名称',
          prop: 'storeName',
          align: 'center',
          width: '150px'
        },
        {
          label: '价格(元)',
          formatter: row => {
            return row.price / 100
          },
          align: 'center',
          width: '100px'
        },
        {
          label: '成本价(元)',
          formatter: row => {
            return row.supplierPrice / 100
          },
          align: 'center',
          width: '100px'
        },
        {
          label: '毛利率',
          formatter: row => {
            return (((row.price - row.supplierPrice) / row.price) * 100).toFixed(2) + '%'
          },
          align: 'center',
          width: '100px'
        },
        {
          label: '毛利额(元)',
          formatter: row => {
            return (row.price - row.supplierPrice) / 100
          },
          align: 'center',
          width: '100px'
        },
        {
          label: '数量(件)',
          prop: 'qty',
          align: 'center',
          width: '100px'
        },
        {
          label: '销量(件)',
          align: 'center',
          width: '100px',
          prop: 'salesQty'
        },
        {
          label: '状态',
          prop: 'isSell',
          align: 'center',
          formatter: row => {
            return row.isSell ? '上架' : '下架'
          },
          width: '100px'
        },
        {
          label: '添加时间',
          align: 'center',
          prop: 'createTime'
        }
      ]
    }
  },
  methods: {
    productSell(ids, isSell) {
      this.$http.productSell({ ids, isSell }).then(() => {
        this.selectProduct = []
        this.$refs.table.onSearchKeep()
      })
    },
    productSeqNumUpdate(id, num) {
      this.$prompt('', '修改商品排序位置', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: num
      })
        .then(({ value }) => {
          this.$http.productSeqNumUpdate({ id, seqNum: value }).then(() => {
            this.$refs.table.onSearchKeep()
          })
        })
        .catch(() => {})
    },
    deleteConfirm(row, search, selectionRow) {
      let ids = selectionRow.map(item => {
        return item.id
      })
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.deleteProduct({ ids: ids.join('_') }).then(() => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.$refs.table.onSearchKeep()
          })
        })
        .catch(() => {})
    },
    /**
     * 商品的 添加 修改 拷贝
     * @param {number} type 类型 0 添加，1修改，2拷贝
     */
    jumpProductDetail(type, id) {
      switch (type) {
        case 0:
          this.$router.push('list/form')
          break
        case 1:
          this.$router.push(`list/form?id=${id}`)
          break
        case 2:
          this.$router.push(`list/form?id=${id}&copy=true`)
          break
      }
    }
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
