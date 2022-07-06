const app = getApp()

Page({
  data: {
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    shows2: false, //控制第二个下拉列表
    indexs: 0, //输入语言的下拉列表下标,
    indexs2: 0, //目标语言的下拉列表下表
    tempFilePaths: '/imgs/logo.jpg',
    result: '',
    direction : [
      {value:'1',label:"中文->小语种"},
      {value:'0',label:"小语种->中文"}
  ],
    options: [
      { value: 'Romanian', label: '罗马尼亚语' },
      { value: 'Polish', label: '波兰语' },
      { value: 'Czech', label: '捷克语' },
      { value: 'Greek', label: '希腊语' },
      { value: 'Hungary', label: '匈牙利语' },
      { value: 'Bulgarian', label: '保加利亚语' },
      { value: 'Latvian', label: '拉脱维亚语' },
      { value: 'Lithuanian', label: '立陶宛语' },
      { value: 'Arabic', label: '阿拉伯语' },
      { value: 'Russian', label: '俄语' },
      { value: 'Hindi', label: '印地语' },
      { value: 'Hebrew', label: '希伯来语' },
      { value: 'Bengalese', label: '孟加拉语' },
      { value: 'Malaysian', label: '马来西亚语' },
      { value: 'Farsi', label: '波斯语' },
      { value: 'Indonesian', label:'印度尼西亚语'},
      { value: 'Slovenian', label:'斯洛文尼亚语'},
      { value: 'Serbian', label:'塞尔维亚语'},
      { value: 'Turkish', label:'土耳其语'},
      { value: 'Slovak', label:'斯洛伐克语'},
      { value: 'Vietnamese', label:'越南语'},
      { value: 'Thai', label:'泰语'},
      { value: 'Macedonia', label:'马其顿语'},
      { value: 'Albanian', label:'阿尔巴尼亚语'},
      { value: 'Estonian', label:'爱沙尼亚语'},
      { value: 'Bosnian', label:'波斯尼亚语'},
      { value: 'Azerbaijan', label:'阿塞拜疆语'},
      { value: 'Byelorussian', label:'白俄罗斯语'},
      { value: 'Georgian', label:'格鲁尼亚语'},
      { value: 'Kazakhstan', label:'哈萨克斯坦语'},
      { value: 'Kampuchean', label:'柬埔寨语'},
      { value: 'Mongolian', label:'蒙古语'},
      { value:'Burmese', label:'缅甸语'},
      { value:'Sinhala', label:'僧伽罗语'},
      { value:'Tamil', label:'泰米尔语'},
      { value:'Ukrainian', label:'乌克兰语'}
    ]
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
    console.log(that.data.direction[that.data.indexs].value)
    console.log(that.data.options[that.data.indexs2].value)
    console.log(that.data.tempFilePaths[0])
    wx.uploadFile({
      filePath: that.data.tempFilePaths[0],
      name: 'image',    
      url: 'http://202.120.36.7:55000/image/',
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        uuid: "ABCDEF1234",
        direction: that.data.direction[that.data.indexs].value,
        language: that.data.options[that.data.indexs2].value,
        flag:'0'
      },
      success: (res) => {
        var jsonObj = JSON.parse(res.data);
        this.setData({
          result: jsonObj.output	//服务器返回的结果
        })
        
        if (res.data.error_info != "") {
          console.log(res.data.error_info)
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