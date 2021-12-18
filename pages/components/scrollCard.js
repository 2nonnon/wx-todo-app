Component({
  data: {
    left: 0
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  methods: {
    touchstartHandler(e) {
      // console.log(e)
    },
    touchmoveHandler(e) {
      // const query = wx.createSelectorQuery().in(this)
      // query.select('.scroll').fields({
      //   scrollOffset: true,
      // })
      // query.exec(function (res) {
      //   console.log(res)
      // })
    },
    touchendHandler(e) {
      // const query = wx.createSelectorQuery().in(this)
      // query.select('.scroll').fields({
      //   scrollOffset: true,
      // })
      // query.exec((res) => {
      //   console.log(res)
      //   const cur = res[0].scrollLeft
      //   if (cur > 70) {
      //     this.delay(cur, 144.8, 0.3, 30)
      //   } else {
      //     this.delay(cur, 0, 0.3, 30)
      //   }
      // })
    },
    // delay(start, end, duration, frame) {
    //   const step = Math.abs(start - end) / (duration / (1 / frame))
    //   const speed = 1 / frame * 1000
    //   const flag = start > end
    //   let timer = null
    //   const raf = () => {
    //     if (flag) {
    //       start -= step
    //       this.setData({
    //         'left': start
    //       })
    //       if (start > end) {
    //         timer = null
    //         timer = setTimeout(raf, speed)
    //       }
    //     } else {
    //       start += step
    //       this.setData({
    //         'left': start
    //       })
    //       if (start < end) {
    //         timer = null
    //         timer = setTimeout(raf, speed)
    //       }
    //     }
    //   }
    //   raf()
    // }
  }
})