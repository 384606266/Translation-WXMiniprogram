// app.js
App({
  onLaunch() {
  },
  globalData: {
    TabBarLists: [{
      "pagePath": "/pages/index/index",
      "text": "้ฆ้กต",
      //"iconPath": "/image/common/home_normal_icon.png",
      //"selectedIconPath": "/image/common/home_hover_icon.png"
      // dot: true
    },
    {
      "pagePath": "/pages/page1/page1",
      "text": "ๆ็",
      //"iconPath": "/image/common/home_mine_normal_icon.png",
      //"selectedIconPath": "/image/common/home_mine_hover_icon.png"
      // badge: 'New'
    }
    ]
  }
})
