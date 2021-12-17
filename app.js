// app.js
App({
  onLaunch() {
    const cache = wx.getStorageSync('notes')
    this.globalData.notes = (cache && JSON.parse(cache)) || []
    this.globalData.selectedId = wx.getStorageSync('selectedId') || null
    console.log(this.globalData.notes, this.globalData.selectedId)
  },
  globalData: {
    notes: [],
    selectedId: null
  }
})
