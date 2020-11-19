<template>
  <div class="qc-product-picker" v-if="visible">
    <div class="qc-product-picker__mask"></div>
    <transition name="slide-fade">
      <div v-if="show" class="qc-product-picker__container">
        <i class="qc-product-picker__close el-icon-close" @click="onClose()"></i>
        <el-tabs v-model="activeName" type="card" v-if="module == ''">
          <el-tab-pane :label="title" :name="value" v-for="(title,value) in modules" :key="value">
            <component :is="value" @on-select-row="onSelectRow" />
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeName" type="card" v-else>
          <el-tab-pane :label="modules[module]" :name="module">
            <component :is="module" @on-select-row="onSelectRow" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </transition>
  </div>
</template>

<script>
import Mall from './Mall'
import MallGroupShopping from './MallGroupShopping'
import Activity from './Activity'
import Journey from './Journey'
export default {
  components: {
    Mall,
    MallGroupShopping,
    Activity,
    Journey
  },
  props: {
    module: {
      validator: value => {
        return (
          ['', 'Mall', 'MallGroupShopping', 'Activity', 'Journey', 'News'].indexOf(value) !== -1
        )
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(val) {
      if (val) {
        setTimeout(() => {
          this.show = val
        }, 100)
      }
    },
    module: {
      handler(val) {
        if (val == '') {
          this.activeName = 'Mall'
        } else {
          this.activeName = val
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      show: false,
      activeName: 'shopping',
      modules: { Mall: '商品', Activity: '活动', Journey: '旅居', MallGroupShopping: '商品拼团' }
    }
  },
  methods: {
    onSelectRow(row) {
      this.onClose(row)
    },
    onClose(row = null) {
      this.show = false
      setTimeout(() => {
        this.$emit('close', row)
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
}
.qc-product-picker {
  &__mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.65);
  }
  &__container {
    position: fixed;
    width: 75%;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 11;
    background: #fff;
    padding: 25px;
  }
  &__close {
    position: absolute;
    left: -30px;
    background: #ff5433;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    top: 0;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
  }
}
</style>