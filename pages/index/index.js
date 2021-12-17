// index.js
var app = getApp()
Page({
  data: {
    notes: app.globalData.notes,
    selectedId: app.globalData.selectedId,
    x: 0
  },
  addNote: function () {
    var time = Date.now()
    var note = {
      id: String(time),
      title: 'New note' + (app.globalData.notes.length + 1),
      content: '**Hi**',
      created: time,
      favorite: false
    }
    app.globalData.notes.push(note)
    app.globalData.selectedId = note.id
    this.setData({
      'notes': app.globalData.notes,
      'selectedId': app.globalData.selectedId
    })
    wx.setStorageSync('notes', JSON.stringify(app.globalData.notes))
    wx.setStorageSync('selectedId', app.globalData.selectedId)
  },
  selectNote: function (e) {
    const id = e.currentTarget.dataset.id
    const note = this.data.notes.filter(note => note.id === id)
    console.log(note)
    wx.navigateTo({
      url: '/pages/edit/edit',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', note)
      }
    })
  },
  touchstartHandler(e) {
    // this.setData({
    //   x: e.changedTouches[0].clientX
    // })
    // console.log(this.data.x)
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
  }
})