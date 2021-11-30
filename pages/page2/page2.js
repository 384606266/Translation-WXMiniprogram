Page({
  data: {
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    shows2: false, //控制第二个下拉列表
    selectDatas: ['英语', '德语', '法语','西班牙语','简体中文','繁体中文','俄语','日语','韩语','意大利语'], //下拉列表的数据
    symbols: ['en','de','fr','es','zh','ch_tra','ru','ja','ko','it'], //符号列表
    indexs: 0, //输入语言的下拉列表下标,
    indexs2: 0, //目标语言的下拉列表下表
    tempFilePaths: '/imgs/img5.png',
    result: '翻译结果' //存储翻译结果
  },
  onLoad: function () {
  },
  chooseimage: function () {
   var that = this;   //备份当前对象
   wx.chooseImage({
    count: 1, // 默认9 
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
    success: function (res) {
     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
     that.setData({
      tempFilePaths: res.tempFilePaths
     })
    },
   })
  },

  uploadPhoto: function () {
    var that = this;
    wx.showLoading();
    wx.uploadFile({
      filePath: that.data.tempFilePaths[0],
      name: 'img',    
      //url: 'https://192.168.1.110:8000/texttranslator/',  //测试用服务器网址
      url: 'https://10.162.215.80:8000/imgtranslator/',
      formData: {
        src: that.data.symbols[that.data.indexs],
        dst: that.data.symbols[that.data.indexs2]
      },
      success: (res) => {
        var data = JSON.parse(res.data)
        if (data.ok == 1) {
          this.setData({
            result: data.r	//服务器返回的结果
          })
        }
        else{
          console.log(data.error_type)
        }
      },
      fail: function(res) {
        console.log(false) //打印到控制台
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
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
  
  
 })