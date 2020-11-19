<template>
  <el-cascader :value="position" :options="address" :props="props" filterable @change="onChange"></el-cascader>
</template>

<script>
import address from './address'
export default {
  props: {
    value: Array,
    type: String
  },
  data() {
    return {
      address,
      props: {
        checkStrictly: true,
        value: 'label',
        label: 'label'
      },
      position: []
    }
  },
  created() {
    if (this.type === 'city') {
      let address = JSON.parse(JSON.stringify(this.address))
      this.address = address.map(province => {
        if (province.children) {
          province.children.map(city => {
              delete city.children
          })
        }
        return province
      })
    }
  },
  watch: {
    value(v) {
      this.position = JSON.parse(JSON.stringify(v))
    }
  },
  methods: {
    onChange(v) {
      console.log(v)
      this.$emit('input', v)
    }
  }
}
</script>

<style>
</style>
