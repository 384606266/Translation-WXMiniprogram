Page({
  data: {
      current: 'tab1',
  },

  handleChange ({ detail }) {
      this.setData({
          current: detail.key
      });
  },
});