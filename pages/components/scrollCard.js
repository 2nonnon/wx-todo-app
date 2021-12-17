Component({
  data: {
    left: 0
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  methods: {
    touchstartHandler(e) {
      console.log(e)
    },
    touchmoveHandler(e) {
      // const query = wx.createSelectorQuery()
      // query.select(`#${e.currentTarget.id}`).fields({
      //   scrollOffset: true,
      // })
      // query.exec(function (res) {
      //   console.log(res[0].scrollLeft)
      // })
    },
    touchendHandler(e) {
      // const query = wx.createSelectorQuery()
      // query.select(`#${e.currentTarget.id}`).fields({
      //   scrollOffset: true,
      // })
      // query.exec(function (res) {
      //   console.log(res)
      // })
      this.setData({'left': 100})
    }
  }
})
