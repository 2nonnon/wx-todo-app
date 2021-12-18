import {
  marked
} from "../../utils/marked.min";
Page({
  data: {
    id: '',
    title: '标题',
    content: '',
    edited: '',
    favorite: false,
    charactersCount: 0,
    isEditing: false,
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
      'title': e.detail.value
    })
  },
  contentInputHandler(e) {
    const value = e.detail.value
    this.setData({
      content: value,
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
    const time = Date.now()
    const note = {
      id: String(time),
      title: this.data.title,
      content: this.data.content,
      edited: this.parseDate(time),
      favorite: this.data.favorite
    }
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('saveNote', {
      note
    });
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('createNote', () => {
      this.setData({
        edited: this.parseDate(Date.now())
      })
    })
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', data => {
      const note = data[0]
      this.setData({
        id: note.id,
        title: note.title,
        content: note.content,
        edited: note.edited,
        favorite: note.favorite,
        charactersCount: this.charactersCountCompute(note.content),
      })
    })
  }
})