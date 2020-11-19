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
        url: 'api/admin/v1/Statistics/storeIncidentals', //请求接口
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
          url: this.projectUrl + '/api/admin/v1/Statistics/storeIncidentalsExport?'
        }
      ],
      column: [
        { label: '店铺经营种类', prop: 'category', align: 'center' },
        { label: '已收年费金额（元）', prop: 'annualFee', align: 'center' },
        { label: '留存保证金金额（元）', prop: 'deposit', align: 'center' },
        { label: '未提现（元）', prop: 'money', align: 'center' }
      ],
      model: {
        type: this.type
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
      let export_url = 'platform/data/storeIncidentals?export=1' + params
      console.log(export_url)

      location.href = export_url
    }
  }
}
</script>

<style></style>
