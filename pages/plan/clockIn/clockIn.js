Page({

  /**
   * 页面的初始数据
   */
  data: {
    things:{
      id: 0,
      thing: "车",
      price: 116900,//总价格
      money: 1000,//目前已存
      week: 48,
      time: "2022-12-12",//目标时间
      startTime: "2018-6-8",
      setPrice:null,
    },
  },
  sumPrice: function (e) {
    var setPrice = e.detail.value;
    this.setData({
      setPrice: setPrice,
    })
  },
  formSubmit: function (e) {
    console.log("requestTest");
    var things = this.data.things;
    var index = this.data.index;
    things.money = things.money - this.data.setPrice;
    console.log(things);
    this.setData({
      things: things,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var things = JSON.parse(options.things);
    var index = options.index;
    this.setData({
      things: things,
      index: index,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.things);
    console.log(this.data.index);
    console.log("----------onReady----------");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})