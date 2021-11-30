const app = getApp()

Page({
  data: {
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    shows2: false, //控制第二个下拉列表
    selectDatas: ['英语', '德语', '法语','西班牙语','简体中文','繁体中文','俄语','日语','韩语','意大利语'], //下拉列表的数据
    symbols: ['en','de','fr','es','zh','ch_tra','ru','ja','ko','it'], //符号列表
    indexs: 0, //输入语言的下拉列表下标,
    indexs2: 0, //目标语言的下拉列表下表
    content: '',
    result: '翻译结果',
  },

  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
      shows2: false,
    });
  },
  selectTaps2() {
    this.setData({
      shows2: !this.data.shows2,
      shows: false,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Indexs)  //输出
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows
    });
  },
  optionTaps2(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Indexs)  //输出
    this.setData({
      indexs2: Indexs,
      shows2: !this.data.shows2
    });
  },
  //获取输入的内容
  inputContent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  uploadString: function (e) {
    var that = this
    var content = that.data.content;
    // 提交请求
    console.log(content);
    wx.showLoading();
    console.log(that.data.symbols[that.data.indexs])
    wx.request({
      //url: 'https://192.168.1.110:8000/texttranslator/',  //测试用服务器网址
      url: 'https://10.162.215.80:8000/texttranslator/',
      header:{
        "content-type": "application/x-www-form-urlencoded"		
      },
      method: "POST",
      data: {		//向服务器发送的信息
        q: that.data.content,
        src: that.data.symbols[that.data.indexs],
        dst: that.data.symbols[that.data.indexs2]
      },
      success: (res) => {
        if (res.data.ok == 1) {
          this.setData({
            result: res.data.r	//服务器返回的结果
          })
        }
        if (res.ok == 0) {
          console.log(res.data.error_type)
        }
      },
      fail: function(res) {
        console.log(false); //打印到控制台
      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  }
})