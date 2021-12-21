Component({
  data: {
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
    }
  }
})