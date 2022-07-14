// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
  },
  bindViewTap1() {
    console.log("1")
    wx.switchTab({
      url: '../page1/page1'
    })
  },
  bindViewTap2() {
    wx.switchTab({
      url: '../page2/page2'
    })
  },
  bindViewTap3() {
    wx.switchTab({
      url: '../community/community'
    })
  },
})
