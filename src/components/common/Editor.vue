<template>
  <div class="editor" :style="{'width': `${config.initialFrameWidth}px`}">
    <div class="upload-img" v-if="editor !== null">
      <input
        type="file"
        multiple
        accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
        @change="fileChange"
      >
      <el-button type="primary" size="mini">上传图片</el-button>
    </div>
    <div ref="editor"></div>
    <img-select :visible="isImgSelect" :list="imgSelectList" @close="closeSelect"></img-select>
  </div>
</template>

<script>
// import { ROOT_URL } from '@/utils/config'
import lrz from 'lrz'
const UE = require('UE')

export default {
  props: {
    content: String,
    configs: Object,
    value: String,
  },
  computed: {
    config() {
      let config = Object.assign(this.default, this.configs)
      console.log(config)
      return config
    },
  },
  data() {
    return {
      action: '',
      editor: null,
      id:
        Math.random()
          .toString(36)
          .substr(2) + 'ueditorId',
      digImgWrap: false,
      default: {
        initialFrameWidth: 750,
        initialFrameHeight: 500,
        toolbars: [
          [
            'bold',
            'italic',
            'underline',
            '|',
            'forecolor',
            'backcolor',
            '|',
            // 'emotion', 'insertimage', 'map','horizontal','|',
            'emotion',
            'insertimage',
            'insertvideo',
            'map',
            'horizontal',
            '|',
            'fontfamily',
            'fontsize',
            '|',
            'rowspacingtop',
            'rowspacingbottom',
            'lineheight',
            '|',
            'indent',
            '|',
            'justifyleft',
            'justifycenter',
            'justifyright',
            'justifyjustify',
            '|',
            'link',
            'unlink',
            '|',
            'undo',
            'redo',
            'removeformat',
            'pasteplain',
            'source',
            'fullscreen',
            '|',
          ],
        ],
      },
      isImgSelect: false,
      imgSelectList: []
    }
  },
  created() {
    this.initEditor()
  },
  methods: {
    fileChange(e) {
      let files = [...e.target.files]
      files.map((file, i) => {
        this.myUpload(file, i, files.length - 1)
      })
    },
    myUpload(file, count, max) {
      if (file.size / 1024 > 1024) {
        lrz(file).then((file) => {
          console.log('lrz')
          file.formData.append('imageType', 'product')
          this.$http.upLoadImg(file.formData).then(res => {
            this.imgSelectList.push(res.data.data)
            if (max === count && count !== 0) {
              this.isImgSelect = true
            }
            if (max === 0) this.onImgSuccess(res.data.data)
          })
        })
      } else {
        let form = new FormData()
        form.append('imageType', 'product')
        form.append('file', file)
        this.$http.upLoadImg(form).then(res => {
          this.imgSelectList.push(res.data.data)
          if (max === count && count !== 0) {
            this.isImgSelect = true
          }
          if (max === 0) this.onImgSuccess(res.data.data)
        })
      }
    },
    onImgSuccess(data) {
      console.log(data.imageUrl)
      this.editor.execCommand('insertimage', {
        src: this.imgHost + data.imageUrl,
        width: 375
      })
    },
    closeSelect(imgList) {
      this.isImgSelect = false
      this.imgSelectList = []
      imgList.map(item => {
        this.onImgSuccess(item)
      })
    },
    initEditor() {
      setTimeout(() => {
        this.$refs.editor.id = this.id
        this.editor = UE.getEditor(this.id, this.config)
        this.editor.ready(() => {
          this.editor.setContent(this.value)
          this.editor.addListener('contentChange', () => {
            this.$emit('input', this.editor.getContent())
          })
          console.log('initEditor');
        })
      }, 1000)
    }
  },
  
  beforeDestroy() {
    console.log('beforeDestroy ');
    // this.editor.destory()
  },
  destoryed() {
    console.log('destoryed');
    // this.editor.destory()
  },
}
</script>

<style lang="scss">
.edui-default .edui-editor {
  z-index: 10 !important;
}
.editor {
  line-height: 1.2;
  position: relative;
  .upload-img {
    position: absolute;
    z-index: 11;
    top: 30px;
    right: 3px;
    padding: 0;
    line-height: 23px;
    font-size: 12px;
    text-align: center;
    color: #fff;
    border-radius: 2px;
    input {
      position: absolute;
      width: 58px;
      opacity: 0;
    }
    button {
      padding: 5px 6px;
      font-size: 11px;
    }
  }
}
</style>
