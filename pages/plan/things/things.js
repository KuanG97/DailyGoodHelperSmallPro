Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayFlag: false,
    current: 0,//当前物品索引值
    Title:"选择你的梦想之物",
    monthy:[],
    things:[{
      id:0,
      brand:"本田",
      thing:"车",
      modal:"C-TREK蔚领",
      imgUrls:"/images/things/car.png",
      price:116900,//总价格
      startTime:null,
      time:48,//期数
      monthy:null,//月供
    }, {
      id: 1,
      brand: "Canon",
      thing: "单反",
      modal: "EOS 800D",
      imgUrls: "/images/things/camera.png",
      price: 7099,
      startTime: null,
      time: 12,
      monthy: null,
      }, {
        id: 2,
        brand: "Nike",
        thing: "球鞋",
        modal: "Air Foamposite One",
        imgUrls: "/images/things/shoes.png",
        price: 1749,
        startTime: null,
        time: 6,
        monthy: null,
    }],
  },

  getCurrent:function(e){
    var current = e.detail.current;
    console.log("当前梦想物的下标:"+current);
    this.setData({
      current:current,
    })
  }, 
  close: function (e) {
    this.setData({
      displayFlag: false
    })
  },
  open: function (e) {
    this.setData({
      displayFlag: true
    })
  },

  planNext:function(e){
    wx:wx.navigateTo({
      url: '/pages/plan/next/next?things=' + JSON.stringify(this.data.things)+'&index='+this.data.current,
      success: function (e) {
        console.log(e);
      }
    })
  },
  planAuto: function (e) {
    wx: wx.navigateTo({
      url: '/pages/plan/custom/custom',
      success:function(e){
        console.log(e);
      }
    })
  },
  changSwiper:function(e){
    var id = e.currentTarget.id;
    var current = this.data.current;
    var L = getJsonLength(this.data.things);
    if (id == "right" && current==L-1){
      current = 0;
    } else if (id == "left" && current == 0) {
      current = L - 1;
    }else if(id =="right" ){
      current++;
    }else if (id == "left") {
      current--;
    }
    this.setData({
      current: current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var price = [];
    var time =[];
    var L =getJsonLength(this.data.things);
    var clac = [];
    for(var i=0;i<L;i++){
      price[i]=this.data.things[i].price;
      time[i] = this.data.things[i].time;
      clac[i] = price[i]/time[i];
      clac[i] = clac[i].toFixed(0);
    }
    console.log("price:"+price);
    console.log("time:" + time);
    console.log("clac:" + clac);
    this.setData({
      monthy: clac
    })
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

function getJsonLength(json) {
  var jsonLength = 0;
  for (var i in json) {
    jsonLength++;
  }
  return jsonLength;
}  