export default {
  mounted() {
    window.onresize = () => {
      this.winodwChange()
    }
  },
  created() {
    this.winodwChange()
  },
  methods: {
    winodwChange() {
      this.option.height = window.innerHeight - 200 + 'px'
    }
  },
  destroyed() {
    window.onresize = ''
  }
}
