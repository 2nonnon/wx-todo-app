import {
  marked
} from "../../utils/marked.min";
Page({
  data: {
    note: '',
    preview: '',
    createdDate: '',
    linesCount: '',
    charactersCount: ''
  },
  createdDateCompute() {
    console.log(new Date(this.data.note.created))
    return new Date(this.data.note.created).toDateString()
  },
  linesCountCompute() {
    return this.data.note.content.split(/\r\n|\r|\n/).length
  },
  charactersCountCompute() {
    return this.data.note.content.split('').length
  },
  previewCompute() {
    return marked.parse(this.data.note.content)
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {
      data: 'test'
    });
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