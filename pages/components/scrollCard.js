Component({
  data: {
    left: 0,
    isStar: false,
    isTop: false,
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    isStar: Boolean,
    isTop: Boolean
  },
  lifetimes: {
    attached: function() {
      this.setData({
        isTop: this.properties.isTop,
        isStar: this.properties.isStar
      })
    },
  },
  methods: {
    topHandler (e) {
      this.setData({isTop: !this.data.isTop})
      const detail = {
        type: 'isTop',
        isTop: this.data.isTop
      }
      this.triggerEvent('mytap', detail)
    },
    starHandler (e) {
      this.setData({isStar: !this.data.isStar})
      const detail = {
        type: 'isStar',
        isStar: this.data.isStar
      }
      this.triggerEvent('mytap', detail)
    },
    deleteHandler (e) {
      this.setData({isDelete: !this.data.isDelete})
      const detail = {
        type: 'isDelete',
        isDelete: this.data.isDelete
      }
      this.triggerEvent('mytap', detail)
    },
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
  },
})