Page({
  data: {
    note: null,
    charactersCount: 0,
    isEditing: false,
    isCreat: false,
    autoFocus: false,
    goback: false,
    gofront: false,
    backStack: [],
    frontStack: [],
    bottom: 0,
  },
  charactersCountCompute(content) {
    return content.split('').length
  },
  previewCompute(content) {
    return marked.parse(content)
  },
  parseDate(time) {
    const date = new Date(time)
    return `${date.getFullYear()} ${date.getMonth()+1} ${date.getDate()} ${date.getHours()} ${date.getMinutes()}`
  },
  titleInputHandler(e) {
    this.setData({
      'note.title': e.detail.value
    })
  },
  contentInputHandler(e) {
    const value = e.detail.value
    const tmpb = [...this.data.backStack]
    tmpb.push(this.data.note.content)
    const flag = tmpb.length > 0 ? true : false
    this.setData({
      'note.content': value,
      backStack: tmpb,
      goback: flag,
      charactersCount: this.charactersCountCompute(value)
    })
  },
  focusHandler(e) {
    this.setData({
      'isEditing': true
    })
  },
  gobackHandler(e) {
    if (this.data.backStack.length > 0) {
      const tmpb = [...this.data.backStack]
      const val = tmpb.pop()
      const flag = tmpb.length > 0 ? true : false
      const tmpf = [...this.data.frontStack]
      tmpf.push(val)
      this.setData({
        'note.content': val,
        backStack: tmpb,
        frontStack: tmpf,
        goback: flag,
        gofront: true
      })
    }
  },
  gofrontHandler(e) {
    if (this.data.frontStack.length > 0) {
      const tmpf = [...this.data.frontStack]
      const val = tmpf.pop()
      const flag = tmpf.length > 0 ? true : false
      const tmpb = [...this.data.backStack]
      tmpb.push(val)
      this.setData({
        'note.content': val,
        backStack: tmpb,
        frontStack: tmpf,
        gofront: flag,
        goback: true
      })
    }
  },
  storeHandler(e) {
    this.setData({
      isEditing: false,
      goback: false,
      gofront: false,
      backStack: [],
      frontStack: [],
      'note.edited': this.parseDate(Date.now())
    })
    this.setData({
      
    })
    const eventChannel = this.getOpenerEventChannel()
    if (this.data.isCreat) {
      eventChannel.emit('saveNote', {
        note: this.data.note
      });
    } else {
      eventChannel.emit('saveChange', {
        note: this.data.note
      });
    }
  },
  shareHandler(e) {
    console.log(e)
  },
  topHandler(e) {
    this.setData({
      'note.isTop': !this.data.note.isTop
    })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('saveChange', {
      note: this.data.note
    })
  },
  starHandler(e) {
    this.setData({
      'note.isStar': !this.data.note.isStar
    })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('saveChange', {
      note: this.data.note
    })
  },
  deleteHandler(e) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('deleteNote', {
      noteId: this.data.note.id
    })
    wx.navigateBack({
      delta: 1
    })
  },
  printHandler(e) {
    console.log(e)
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('createNote', () => {
      const time = Date.now()
      const note = {
        id: String(time),
        title: '标题',
        content: '',
        edited: this.parseDate(time),
        isStar: false,
        isTop: false,
        isDelete: false
      }
      this.setData({
        note,
        isEditing: true,
        isCreat: true,
        autoFocus: true
      })
    })
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('editNote', data => {
      const note = data[0]
      this.setData({
        note: note,
        charactersCount: this.charactersCountCompute(note.content),
      })
    })
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    }),
    wx.onKeyboardHeightChange(res => {
      console.log(res.height)
    })
  }
})