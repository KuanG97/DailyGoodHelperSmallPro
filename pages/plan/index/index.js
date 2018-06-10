Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayFlag:false,
    url1: "/images/things/thing.png",
    url2: "/images/things/money.png",
    url3: "/images/things/store.png",
    id1: "things",
    id2: "money",
    thingsUrl: "../things/things",
    moneyUrl: "../money/money",
    countRemain:0,//计算剩余期数
    none:1,//没有计划时显示
    index:null,
    //确认跟进计划(名字，价格，周，目标时间，今天时间)
    things: [{
      id: 0,
      thing: "车",
      price: 116900,//总价格
      money:1000,//目前已存
      week:48,
      time: "2022-12-12",//目标时间
      startTime:"2018-6-8",
    }, {
      id: 1,
      thing: "单反",
      price: 116900,
      price: 116900,//总价格
      money: 1000,//目前已存
      week: 48,
      time: "2018-12-12",
      startTime: "2018-6-8",
    }],
    priceAverage:[],//建议期供给
    progress:[],
    remainWeek:[],
  },
  bindClac: function (e) {
    var id = e.currentTarget.id;
    console.log("id:" + id);
    if (id == "things") {
      wx.navigateTo({
        url: this.data.thingsUrl,
        success: function (res) {
          console.log(res);
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        },
      })
    } else if (id == "money") {
      wx.navigateTo({
        url: this.data.moneyUrl,
        success: function (res) {
          console.log(res);
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        },
      })
    }
  },
  clockIn:function(e){
    var index = e.currentTarget.dataset.idx;
    console.log("index:"+index);
    wx:wx.navigateTo({
      url: '../clockIn/clockIn?things='+JSON.stringify(this.data.things[index])+"&index="+index,
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      },
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
  modify:function(e){
    var id = e.currentTarget.dataset.idx;
    console.log("index:" + id);
    wx.navigateTo({
      url: '../modify/modify?index='+id+"&things="+JSON.stringify(this.data.things[id]),
      success: function (res) {
        console.log(res);
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var none;
    var priceAverage=[];
    var progress = [];
    var remainWeek = [];
    var things = this.data.things;
    if (JSON.stringify(this.data.things)){
      none = 0;
    }else{
      none = 1;
    }
    var L = getJsonLength(this.data.things);
    for(var i=0;i<L;i++){
      priceAverage[i]=(things[i].price/things[i].week).toFixed(0);
      progress[i] = (things[i].money/things[i].price).toFixed(2)*100;
      remainWeek[i] = things[i].week-getWeek(things[i].time);
    }
    console.log("priceAverage:" + priceAverage);
    console.log("progress:" + progress);
    console.log("remainWeek:" + remainWeek);

    this.setData({
      none:none,
      priceAverage: priceAverage,//建议期供给
      progress: progress,
      remainWeek: remainWeek,
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

//获取月供期数加的年月
var getMonthyTime = function (time) {
  var today = getDate();
  var y, m;
  y = 0; m = 0;
  var arr = [];
  if ((today[1] + time) > 12 && time < 12) {
    y = 1;
  }
  for (var i = 0; i < time; i++) {
    if ((i + 1) % 12 == 0) {
      y++;
    }
  }
  m = time % 12;
  arr[0] = y; arr[1] = m;
  return arr;
}
function getJsonLength(json) {
  var jsonLength = 0;
  for (var i in json) {
    jsonLength++;
  }
  return jsonLength;
}  