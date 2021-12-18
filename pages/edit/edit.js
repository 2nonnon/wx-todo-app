import {
  marked
} from "../../utils/marked.min";
Page({
  data: {
    note: '',
    content: '',
    preview: '',
    charactersCount: 0
  },
  charactersCountCompute(content) {
    return content.split('').length
  },
  previewCompute(content) {
    return marked.parse(content)
  },
  parseDate (time) {
    const date = new Date(time)
    return `${date.getFullYear()} ${date.getMonth()+1} ${date.getDate()} ${date.getHours()} ${date.getMinutes()}`
  },
  inputHandler (e) {
    console.log(e)
    const value = e.detail.value
    this.setData({
      content: value,
      charactersCount: this.charactersCountCompute(value)
    })
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {
      data: 'test'
    });
    eventChannel.on('createNote', () => {
      const time = Date.now()
      const note = {
        id: String(time),
        title: '标题',
        content: '',
        edited: this.parseDate(time),
        favorite: false
      }
      this.setData({'note': note})
    })
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', data => {
      this.setData({'note': data[0]})
      this.setData({
        'preview': this.previewCompute(),
        'createdDate': this.createdDateCompute(),
        'linesCount': this.linesCountCompute(),
        'charactersCount': this.charactersCountCompute()
      })
    })
  }
})