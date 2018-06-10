Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    index:null,
    list:null,
    title:null,
    mony:null,
    msg:null,
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //修稿成功时
  modifySuccess:function(e){
    wx:wx.navigateBack({
      delta: 1,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var list = JSON.parse(options.list);//解析得到集合
    console.log("传参index:" + options.index);
    console.log("传参Y:" + options.list);
    console.log("----------onLoad------------");
    var date = list[options.index].time;
    this.setData({
      list: list,
      index: options.index,
      title: null,
      date: date,
      mony: null,
      msg: null,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("【list】");
    console.log(this.data.list);
    console.log("----------onReady------------");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("----------onShow------------");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("----------onHide------------");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("----------onUnload------------");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("----------onPullDownRefresh------------");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("----------onReachBottom------------");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("----------onShareAppMessage------------");
  }
})