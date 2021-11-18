const app = getApp()

Page({
  data: {
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    shows2: false, //控制第二个下拉列表
    selectDatas: ['英语', '德语', '法语','西班牙语'], //下拉列表的数据
    indexs: 0, //输入语言的下拉列表下标,
    indexs2: 0, //目标语言的下拉列表下表
    content: '',
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
  save: function (e) {
    var title = this.data.title;
    var content = this.data.content;
    // 提交请求
    console.log(content);
  }
})