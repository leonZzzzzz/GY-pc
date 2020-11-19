<template>
  <div>
    <QcTable
      ref="table"
      :option="option"
      :column="column"
      :menu="menu"
      :search-form="searchForm"
    ></QcTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        url: 'api/admin/v1/Statistics/listOrderStatistics?type=period', //请求接口
        showPagination: false, //不显示分页信息
        response: {
          list: 'data.data'
        } 
      },
     searchForm: [
        {
          ifKey: 'keyword',
          ifValue: '0',
          label: '',
          formName: 'startTime_endTime',
          type: 'date-picker',
          el: {
            type: 'daterange',
            rangeSeparator: '至',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd'
          }
        }
      ],
      menu: [
        {
          type: 'export',
          label: '导出',
          url: this.projectUrl + '/api/admin/v1/Statistics/orderExport?as=1&type=period&'
        }
      ],
      column: [
        { label: '店铺经营种类', prop: 'category', align: 'center' },
        { label: '账期订单数（单）', prop: 'count', align: 'center' },
        { label: '账期金额（元）', prop: 'money', align: 'center' }
      ],
      model: {
        type: 'period'
      },
      visible: false
    }
  },
  methods: {
    //导出数据
    exportStore(search) {
      console.log('search', search)
      let params = ''
      params =
        params +
        '&pageNum=' +
        search['pageNum'] +
        '&pageSize=' +
        search['pageSize'] +
        '&total=' +
        search['total']

      if (search['keyword']) {
        params = params + '&keyword=' + search['keyword']
      }

      if (search['startTime_endTime']) {
        params =
          params +
          '&startTime=' +
          search['startTime_endTime'][0] +
          '&endTime=' +
          search['startTime_endTime'][1]
      }

      console.log('params', params)
      let export_url = 'platform/data/creditOrder?export=1' + params
      console.log(export_url)

      location.href = export_url
    }
  }
}
</script>

<style></style>
