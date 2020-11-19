<template>
  <div>
    <QcTable :option="optoin" :search-form="searchForm" :menu="menu" :column="column"></QcTable>
    <dig-form :visible="digFormWrap" :id="updateId" @close="digClose"></dig-form>
    <account-form :visible="accountFormWrap" :id="updateId" @close="digClose"></account-form>
  </div>
</template>

<script>
import DigForm from './Form'
import AccountForm from './AccountForm'
export default {
  components: { DigForm, AccountForm },
  data() {
    return {
      optoin: { url: 'api/admin/v1/app/page' },
      searchForm: [
        {
          formName: 'name',
          type: 'input',
          label: '应用名称'
        },
        {
          formName: 'customerName',
          type: 'input',
          label: '所属客户'
        }
      ],
      menu: [
        {
          label: '添加应用',
          type: 'primary',
          on: this.insert
        },
        {
          label: '修改应用',
          type: 'primary',
          disabled: ({currentRow}) => currentRow.id == undefined,
          on: this.update
        },
        {
          label: '添加管理账号',
          type: 'primary',
          disabled: ({currentRow}) => currentRow.id == undefined,
          on: this.addAccount
        },
        {
          label: '编辑权限',
          type: 'primary',
          disabled: ({currentRow}) => currentRow.id == undefined,
          on: this.detail
        },
        {
          label: '授权公众号',
          type: 'primary',
          disabled: ({currentRow}) => currentRow.id == undefined,
          on: this.jumpWeChatAuthorize
        },
        {
          label: '查看授权公众号',
          type: 'primary',
          disabled: ({currentRow}) => currentRow.id == undefined,
          on: this.jumpSeeWeChatAuthorize
        }
      ],
      column: [
        { type: 'index', label: '序号', align: 'center' },
        { prop: 'name', label: '应用名称', align: 'center' },
        { prop: 'code', label: '项目名（英文）', align: 'center' },
        { prop: 'customerName', label: '所属客户', align: 'center' },
        { prop: 'remark', label: '备注说明', align: 'center' },
        { prop: 'endDate', label: '到期日', align: 'center' },
        { prop: 'createTime', label: '创建时间', align: 'center' }
      ],
      updateId: '',
      digFormWrap: false,
      accountFormWrap: false
    }
  },
  methods: {
    deleteConfirm() {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delete()
        })
        .catch(() => {
          return
        })
    },
    async delete() {
      await this.$http.deleteApp({ id: this.tableList.id })
      this.$refs.table.onSearchKeep()
      this.$message.success('删除成功')
    },
    insert() {
      this.digFormWrap = true
    },
    update(row) {
      this.updateId = row.id
      this.digFormWrap = true
    },
    detail(row) {
      this.$router.push(`app/detail?id=${row.appId}`)
    },
    digClose(flag) {
      this.updateId = ''
      this.digFormWrap = false
      this.accountFormWrap = false
      if (typeof flag == 'boolean' && flag) {
        this.$refs.table.onSearchKeep()
      }
    },
    addAccount(row) {
      this.updateId = row.id
      this.accountFormWrap = true
    },
    jumpSeeWeChatAuthorize(row) {
      this.$router.push(`app/wechatDetail?appId=${row.appId}`)
    },
    jumpWeChatAuthorize(row) {
      window.open(`${this.projectUrl}/open/wx/login?appId=${row.id}`)
    }
  }
}
</script>