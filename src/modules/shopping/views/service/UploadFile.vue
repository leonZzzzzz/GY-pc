<template>
  <div class="upload-component" >
    <el-upload
      v-if="limit === 1"
      :limit="1"
      :action="action"
      :data="data"
      :file-list="value"
      :on-preview="onPreview"
      :on-error="fileError"
      :on-success="fileSuccess"
      :on-remove="fileRemove"
      :before-upload="beforeFileUpload"
      :on-exceed="onExceed">
      <el-button v-if="value.length < 1" size="small" type="primary">点击上传</el-button>
      <span v-else style="color: #888;">上传成功</span>
    </el-upload>
    <el-upload
      v-else
      :limit="limit"
      :action="action"
      :data="data"
      multiple
      :file-list="value"
      list-type="picture-card"
      :on-preview="onPreview"
      :on-error="fileError"
      :on-success="fileSuccess"
      :on-remove="fileRemove"
      :before-upload="beforeFileUpload"
      :on-exceed="onExceed">
        <i v-if="value.length < limit" class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import { BASEURL } from '@/utils/config'

export default {
  props: {
    orderid: String,
    value: {
      type: Array,
      default: () => []
    },
    fileList: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 100
    },
  },
  data() {
    return {
      isLoading: false,
      action: '',
      file: {},
      data: {imageType: 'sellerOrderRemark'},
      url: '/api/v1/attachments/images/tencent_cloud'
    }
  },
  mounted() {
    this.action = `${BASEURL}/${this.url}`
  },
  methods: {
    clearFiles() {
      this.$refs.upload.clearFiles()
    },
    beforeFileUpload(file) {
      // console.log('beforeFileUpload ===>', file)
      if (this.limit === 1) {
        if (file.name.indexOf('_') != -1) {
          // this.$message.warning('文件名中不能含有特殊字符“ _ ”，请更改')
          this.$alert('文件名中不能含有特殊字符“ _ ”，请更改', '提示', {
            confirmButtonText: '知道了',
          });
          return false
        }
      }
      // if (this.fileType.length == 0) {
      //   const type = file.name.split('.')[1] == 'xlsx' || file.name.split('.')[1] == 'xls'
      //   if (!type) {
      //     this.$message.error('请上传xlsx或xls')
      //   }
      //   this.file = file
      //   return type
      // } else {
      //   const type = this.fileType.findIndex(item => { return item === file.type })
      //   const size = file.size / 1024 / 1024 < 4
      //   if (type < 0) {
      //     this.$message.error('上传文件格式不正确')
      //     this.file = file
      //     return file
      //   }
      //   if (!size) {
      //     this.file = file
      //     this.$message.error('上传文件大小不能超过 4MB')
      //     return file
      //   }
      // }
      this.isLoading = true
    },
    onExceed(e) {
      this.$message.warning(`最多只可上传${this.limit}个文件`)
    },
    // 点击文件列表已经上传的文件触发
    onPreview(file) {
      console.log('预览==》', file)
      let url = file.url || file.response.data.imageUrl
      if (!url) {
        this.$message.warning('文件地址不存在')
        return
      }
      window.open(url)
    },
    fileError(err) {
      this.isLoading = false
      this.$message({
        message: err || '上传失败',
        type: 'error',
      })
    },
    fileRemove(file, fileList) {
      // console.log('fileRemove==>', file, fileList)
      let list = fileList.map((item, i)=> {
        console.log(item)
        let url = item.response ? item.response.data.imageUrl : item.url
        if (url && url.indexOf('http') === -1) url = this.imgHost + url
        return {
          name: item.name || i,
          url: url
        }
      })
      // this.$emit('input', list)
      // if (this.limit === 1) {
      //   this.$emit('input', fileList)
      // } else {
        this.$emit('on-remove', list)
      // }
    },
    fileSuccess(res, file, fileList) {
      this.isLoading = false
      if (res.code === 20000) {
        console.log('fileSuccess==>', fileList)
        let list = fileList.map((item, i)=> {
          console.log(item)
          let url = item.response ? item.response.data.imageUrl : item.url
          if (url && url.indexOf('http') === -1) url = this.imgHost + url
          return {
            name: item.name || i,
            url: url
          }
        })
        // this.$emit('input', list)
        this.$emit('on-success', list)
      } else {
        this.$message({
          message: res.message || '上传失败',
          type: 'error',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.upload-component{
  /deep/.el-upload--picture-card{
    width: 80px !important;
    height: 80px !important;
    line-height: 80px !important;
  }
  /deep/.el-upload-list__item-actions{
    width: 80px !important;
    height: 80px !important;
  }
  /deep/.el-upload-list__item{
    width: 80px !important;
    height: 80px !important;
  }
  /deep/.el-icon-close-tip{
    display: none !important;
  }
}
</style>
