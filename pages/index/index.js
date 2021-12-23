// index.js
var app = getApp()
Page({
  data: {
    notes: [],
    stars: [],
    isActive: false,
    choose: '全部笔记',
  },
  filterHandler () {
    this.setData({'isActive': !this.data.isActive})
  },
  typeHandler (e) {
    console.log(e)
    const type = e.currentTarget.dataset.type
    this.setData({'choose': type})
  },
  addNote: function () {
    wx.navigateTo({
      url: '/pages/edit/edit',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        saveNote: (res) => {
          const newNotes = [...this.data.notes]
          newNotes.push(res.note)
          this.updateStars(newNotes)
          this.setData({
            'notes': newNotes
          })
          wx.setStorage({
            key: 'notes',
            data: JSON.stringify(newNotes)
          })
        },
        saveChange: this.saveChange,
        deleteNote: this.deleteNote
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
        saveChange: this.saveChange,
        deleteNote: this.deleteNote
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('editNote', note)
      }
    })
  },
  saveChange (data) {
    console.log(data.note)
    const newNotes = this.changeHandler(data.note)
    this.updateStars(newNotes)
    this.setData({
      'notes': newNotes
    })
    wx.setStorage({
      key: 'notes',
      data: JSON.stringify(newNotes)
    })
  },
  deleteNote (data) {
    const newNotes = this.isDeleteHandler(data.noteId)
    this.updateStars(newNotes)
    this.setData({
      'notes': newNotes
    })
    wx.setStorage({
      key: 'notes',
      data: JSON.stringify(newNotes)
    })
  },
  changeHandler (note) {
    return [...this.data.notes].map(item => {
      if (item.id === note.id) {
        return note
      }
      return item
    })
  },
  isTopHandler (noteId, type, val) {
    let newNotes = [...this.data.notes].map(note => {
      if (note.id === noteId) {
        note[type] = val
      }
      return note
    })
    if (val) {
      newNotes.sort((a, b) => {
        if (a.isTop && b.isTop) return 0
        else if (a.isTop) return -1
        else return 1
      })
    } else {
      newNotes.sort((a, b) => parseInt(a.id) - parseInt(b.id))
      newNotes.sort((a, b) => {
        if (a.isTop && b.isTop) return 0
        else if (a.isTop) return -1
        else return 1
      })
    }
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
    this.updateStars(newNotes)
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
  updateStars (newNotes) {
    const newStars = newNotes.filter(n => n.isStar)
    this.setData({
      'stars': newStars
    })
  },
  onLoad() {
    const cache = wx.getStorageSync('notes')
    const notes = JSON.parse(cache)
    const stars = notes.filter(n => n.isStar)
    if (cache) {
      this.setData({
        'notes': notes,
        'stars': stars
      })
    }
  }
})