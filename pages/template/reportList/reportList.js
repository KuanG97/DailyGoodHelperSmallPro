Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var content_for = [
      {
        date: "2020年 10月 9日 ",
        title: "那年夏天",
        header_url: "/images/3.png",
        image_url: "/images/6.jpg",
        content: "天不言自高，地不言自厚，奇迹，是不会在容易的道路上绽放的。人生没有如果，只有后果和结果，过去的不再回来，回来的不再完美。",
      },
      {
        date: "2022年 10月 9日 ",
        title: "夏天",
        header_url: "/images/3.png",
        image_url: "/images/8.jpg",
        content: "人生没有如果，只有后果和结果，过去的不再回来，回来的不再完美。",
      },

    ]
    //输出出口
    module.exports = {
      templates: content_for
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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