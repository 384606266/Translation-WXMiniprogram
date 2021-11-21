Page({
  data: {
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    shows2: false, //控制第二个下拉列表
    selectDatas: ['英语', '德语', '法语','西班牙语'], //下拉列表的数据
    indexs: 0, //输入语言的下拉列表下标,
    indexs2: 0, //目标语言的下拉列表下表
    tempFilePaths: '',
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
      filePath: 'that.data.tempFilePaths',
      name: 'img',    
      url: 'url',    //服务器地址
      formData: {
        'src': that.data.indexs,
        'dst': that.data.indexs2
      },
      success: function(res) {
        if (res.data.ok == 1) {
          this.setData({
            result: res.data.r	//服务器返回的结果
          })
        }
        else{
          console.log(res.data.error_type)
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