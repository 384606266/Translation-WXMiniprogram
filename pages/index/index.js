// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    
  },
  
  bindViewTap1() {
    wx.navigateTo({
      url: '../page1/page1'
    })
  },
  bindViewTap2() {
    wx.navigateTo({
      url: '../page2/page2'
    })
  },

})
