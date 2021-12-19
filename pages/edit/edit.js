import {
  marked
} from "../../utils/marked.min";
Page({
  data: {
    note: null,
    charactersCount: 0,
    isEditing: false,
    isCreat: false
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
    this.setData({
      'note.content': value,
      charactersCount: this.charactersCountCompute(value)
    })
  },
  focusHandler(e) {
    this.setData({
      'isEditing': true
    })
  },
  storeHandler(e) {
    this.setData({
      'isEditing': false
    })
    this.setData({'note.edited': this.parseDate(Date.now())})
    const eventChannel = this.getOpenerEventChannel()
    if (this.data.isCreat) {
      eventChannel.emit('saveNote', {
        note
      });
    } else {
      eventChannel.emit('saveChange', {
        note
      });
    }
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
        isCreat: true
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
  }
})