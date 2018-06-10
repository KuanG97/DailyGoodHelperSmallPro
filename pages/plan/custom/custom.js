Page({

  /**
   * 页面的初始数据
   */
  data: {
    setStartToday:null,
    setEndToday:null,
    //things
    things: {
      id: 0,
      thing: "xxx",//物品名称
      price:0,//总价格
      time: null,//目标时间
      week:null,//距离目标时间周期
      priceAverage:0,//每周定投价格
    },
  },
  bindDateChange: function (e) {
    var things = this.data.things;
    things.time = e.detail.value;
    things.week = getWeek(e.detail.value);
    things.priceAverage = (things.price / things.week).toFixed(0);
    this.setData({
      things: things
    })
  },
  getThing:function(e){
    var things = this.data.things;
    things.thing = e.detail.value ;
    this.setData({
      things:things
    })
  },
  getPrice: function (e) {
    var things = this.data.things;
    things.price = e.detail.value;
    things.priceAverage = (things.price / things.week).toFixed(0);
    this.setData({
      things: things
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var things = this.data.things;
    var today = getDate();
    var year = today[0];
    var month = today[1];
    var date = today[2];
    var setToday = year + "-" + (month+1) + "-" + date;
    var setStartToday = year + "-" + month + "-" + date;
    var setEndToday = (year + 30) + "-" + month + "-" + date;
    things.time = setToday;
    var week = getWeek(setToday);
    things.week = week;
    var priceAverage = (things.price / things.week).toFixed(0);
    things.priceAverage = priceAverage;
    this.setData({
      things:things,
      setEndToday: setEndToday,
      setStartToday: setStartToday,
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

//获得今天时间
var getDate = function () {
  var getDate = [];
  var dateArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth(); //getMonth()是从0开始  
  var year = date.getFullYear();
  var result = 0;
  var weekResult;
  for (var i = 0; i < month; i++) {
    result += dateArr[i];
  }
  result += day;
  weekResult = result / 7;
  getDate[0] = year;
  getDate[1] = month + 1;
  getDate[2] = day;
  getDate[3] = result;
  getDate[4] = parseInt(weekResult);
  return getDate;
}

//获得周期
var getWeek = function (dayValue) {
  var pick = dayValue.split("-");
  var today = getDate();
  var month, week, day, add;
  var year = [];
  var d1, d2;
  var getW;
  var dateArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

  if (pick[0] == today[0] && pick[1] == today[1] && pick[2] == today[2]) {
    getW = 0;
  } else if (pick[0] == today[0]) {//同年
    if (pick[1] == today[1]) {//同月
      day = pick[2] - today[2];
      getW = day;
    } else if (pick[1] != today[1]) {
      var L = pick[1] - today[1] - 1;
      day = 0;
      if (L < 1) {
        add = isYearAdd1(today[1], today[0]);
        add += isYearAdd2(pick[1], pick[0]);
        d1 = dateArr[today[1] + 1] - today[2];
        d1 = parseInt(d1);
        d2 = pick[2];
        d2 = parseInt(d2);
        getW = (day + d1 + d2 + add);
      } else {
        for (var i = today[1]; i < (today[1] + L); i++) {
          add = isYearAdd1(today[1], today[0]);
          add += isYearAdd2(pick[1], pick[0]);
          day += dateArr[i + 1];
          day = parseInt(day);
          d1 = dateArr[today[1] + 1] - today[2];
          d1 = parseInt(d1);
          d2 = pick[2];
          d2 = parseInt(d2);
          getW = (day + d1 + d2 + add);
        }
      }
    }
  } else if (pick[0] != today[0]) {//不同年
    var n = 0; var sum1;
    add = 0; day = 0;
    var sum2 = 0;
    //除去前后两年的时间
    if (pick[0] - today[0] > 1) {
      for (var i = today[0] + 1; i < pick[0]; i++) {
        add += isYearAdd1(0, i);
        n++;
      }
      day = (365 * n) + 1;
    }
    //初始年
    sum1 = 365 - parseInt(today[3]) + isYearAdd1(today[1], today[0]);
    for (var x = 0; x < (pick[1] - 1); x++) {
      sum2 += dateArr[x];
    }
    //结尾年
    sum2 += isYearAdd1(pick[1], pick[0]);
    sum1 = parseInt(sum1);
    sum2 = parseInt(sum2);
    d1 = dateArr[today[1] + 1] - today[2];
    d1 = parseInt(d1);
    d2 = pick[2];
    d2 = parseInt(d2);
    day = day + d1 + d2;
    getW = sum1 + sum2 + day;
  }
  getW = (getW / 7).toFixed(0);
  return getW;
}

//判断是否闰年  
var isYearAdd1 = function (month, year) {
  if (month < 3 && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    return 1;
  } else {
    return 0;
  }
}
var isYearAdd2 = function (month, year) {
  if (month > 1 && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    return 1;
  } else {
    return 0;
  }
}