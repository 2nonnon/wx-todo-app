// index.js
var app = getApp()
Page({
  data: {
    notes: [],
  },
  addNote: function () {
    wx.navigateTo({
      url: '/pages/edit/edit',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        saveNote: (res) => {
          const newNotes = [...this.data.notes]
          newNotes.push(res.note)
          this.setData({
            'notes': newNotes
          })
          wx.setStorage({
            key: 'notes',
            data: JSON.stringify(newNotes)
          })
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('createNote')
      }
    })
  },
  selectNote: function (e) {
    console.log(e)
    const id = e.currentTarget.dataset.id
    const note = this.data.notes.filter(note => note.id === id)
    console.log(note)
    wx.navigateTo({
      url: '/pages/edit/edit',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        saveChange: function (data) {
          console.log(data.note)
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('editNote', note)
      }
    })
  },
  isTopHandler (noteId, type, val) {
    let newNotes = [...this.data.notes].map(note => {
      if (note.id === noteId) {
        note[type] = val
      }
      return note
    })
    return newNotes
  },
  isStarHandler (noteId, type, val) {
    let newNotes = [...this.data.notes].map(note => {
      if (note.id === noteId) {
        note[type] = val
      }
      return note
    })
    return newNotes
  },
  isDeleteHandler (noteId) {
    let newNotes = [...this.data.notes]
    const note = newNotes.filter(note => note.id === noteId)
    newNotes = newNotes.filter(note => note.id !== noteId)
    return newNotes
  },
  mytapHandler(e) {
    console.log(e)
    const type = e.detail.type
    const noteId = e.currentTarget.dataset.id
    const newNotes = this[`${type}Handler`](noteId, type, e.detail[type])
    console.log(newNotes)
    this.setData({
      'notes': newNotes
    })
    wx.setStorage({
      key: 'notes',
      data: JSON.stringify(newNotes)
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
    // console.log(e)
    // const query = wx.createSelectorQuery()
    // query.select(`#${e.currentTarget.id}>.scroll`).fields({
    //   scrollOffset: true,
    // })
    // query.exec(function (res) {
    //   console.log(res)
    // })
  },
  onLoad() {
    const cache = wx.getStorageSync('notes')
    if (cache) {
      this.setData({
        'notes': JSON.parse(cache)
      })
    }
  }
})