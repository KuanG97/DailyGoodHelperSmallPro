Page({

  /**
   * 页面的初始数据
   */
  data: {
    url1:"/images/things/houseLoanClac.png",
    url2: "/images/things/salaryClac.png",
    url3: "/images/things/health.png",
    url4: "/images/things/else.png",
    id1:"houseLoan",
    id2:"salary",
    id3:"health",
    houseLoanUrl:"../houseLoan/houseLoan",
    salaryClacUrl: "../salaryClac/salaryClac",
  },
  bindClac:function(e){
    var id = e.currentTarget.id;
    console.log("id:"+id);
    if(id=="houseLoan"){
      wx.navigateTo({
        url: this.data.houseLoanUrl,
      })
    } else if (id == "salary") {
      wx.navigateTo({
        url: this.data.salaryClacUrl,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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