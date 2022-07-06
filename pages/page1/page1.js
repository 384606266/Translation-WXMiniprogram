//文字翻译界面

const app = getApp()

Page({
  data: {
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    shows2: false, //控制第二个下拉列表
    indexs: 0, //翻译方向,
    indexs2: 0, //目标语言
    content: '',
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
    // 提交请求
    wx.showLoading();
    wx.request({
      url: 'http://202.120.36.7:55000/translate/',
      header:{
        'content-type': 'application/json'		
      },
      method: "POST",
      data: {		//向服务器发送的信息
        uuid: "ABCDEF1234",
        source: that.data.content,
        direction: that.data.direction[that.data.indexs],
        language: that.data.options[that.data.indexs2].value,
        flag:'0'
      },
      success: (res) => {
        console.log(res.data)
         this.setData({
            result: res.data.output	//服务器返回的结果
          })
        
        if (res.data.error_info != "") {
          console.log(res.data.error_info)
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