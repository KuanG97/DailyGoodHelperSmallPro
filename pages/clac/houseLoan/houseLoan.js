Page({

  /**
   * 页面的初始数据
   */
  data: {
    displayFlag:false,
    // array: [],
    // index: 0,
    //获取参数
    X: 0,//贷款金额/（万）
    Y: 0,//贷款期限/（年）
    rate: 4.75,
    flag:true,
    totalInterest:0,
    totalMonthly:0,
    //等额本息
    Result1: [],//每月应还本金
    Result2: [],//每月应还利息
    Result3: [],//每月月供
    //等额本金
    result1: [],//每月应还本金
    result2: [],//每月应还利息
    result3: [],//每月月供

    tableShow:0,//0为隐藏，1为显示，2alert第一个，3alert第二个,4两个alert
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  close: function (e) {
    console.log(false);
    this.setData({
      displayFlag: false
    })
  },
  open: function (e) {
    this.setData({
      displayFlag: true
    })
  },
  /*
   * 触发等额本息计算
   */
  equRate: function (e) {
    var X = this.data.X;//贷款金额
    var Y = this.data.Y;//贷款期限
    var R = this.data.rate * 0.01 / 12;//基准利率
    var R2, Y2;
    var totalInterest=0;
    var totalMonthly=0;
    var r = [];
    var r2 = [];
    var r3 = [];
    var show;
    if (X > 0 && Y > 0 && (!isNaN(X)) && (!isNaN(Y))) {//如果不为空
      X = X * 10000;
      Y = Y * 12;
      show = 1;
      R2 = 1+R;
      Y2 = Y-1;
      for (var i = 0; i < Y; i++) {
        var n = i + 1;//月
        //每月本金
        r[i] = X* R*Math.pow(R2,i)/(Math.pow(R2,Y)-1);
        r[i] = r[i].toFixed(0);
        //每月应还利息
        r3[i] = X * R *(Math.pow(R2, Y) - (Math.pow(R2, i))) / (Math.pow(R2, Y) - 1);
        totalInterest += r3[i];
        r3[i] = r3[i].toFixed(0);
        //每月月供
        r2[i] = (X * R * Math.pow(R2, Y)) / (Math.pow(R2, Y) - 1);
        totalMonthly += r2[i];
        r2[i] = r2[i].toFixed(0);
      }
      totalInterest = totalInterest.toFixed(0);
      totalMonthly = totalMonthly.toFixed(0);
      console.log("【总本息】" + totalInterest + "【总月供】" + totalMonthly );
      this.setData({
        result1: r,
        result2: r3,
        result3: r2,
        resultTitle: "等额本息",
        tableShow: show,
        totalInterest: totalInterest,
        totalMonthly: totalMonthly,
      });
    } else {
      if (X <= 0 && Y <= 0) {
        show = 4;
      } else if (X <= 0 && ((!isNaN(X)))) {
        show = 2;
      } else if (Y <= 0 && ((!isNaN(Y)))) {
        show = 3;
      }
      console.log("不能小于等于0:" + show);
    }
    this.setData({
      tableShow: show,
    });
  },
  /*
   * 触发等额本金计算
   */
  equCapital: function (e) {
    var X = this.data.X;//贷款金额
    var Y = this.data.Y;//贷款期限
    var Rate = this.data.rate * 0.01 / 12;//基准利率
    var totalInterest = 0;
    var totalMonthly = 0;
    var r = [];
    var r2 = [];
    var r3 = [];
    var show;
    if (X > 0 && Y > 0 && (!isNaN(X)) && (!isNaN(Y))) {//如果不为空
      X = X*10000;
      Y = Y * 12;
      show = 1;
      for (var i = 0; i < Y; i++) {
        //每月应还本金
        r[i] = X / Y;
        r[i] = r[i].toFixed(0);
        //每月应还利息
        r2[i] = [X - (r[i] * i)] * Rate;
        totalInterest += r2[i];
        r2[i] = r2[i].toFixed(0);//四舍五入，不保留小数(注意且为字符串)
        //每月月供
        r3[i] = parseInt(r) + parseInt(r2[i]);
        totalMonthly += r3[i];
      }
      totalInterest = totalInterest.toFixed(0);
      totalMonthly = totalMonthly.toFixed(0);
      console.log("【总本息】" + totalInterest + "【总月供】" + totalMonthly);
      this.setData({
        result1: r,
        result2: r2,
        result3: r3,
        resultTitle: "等额本金",
        tableShow: show,
        totalInterest: totalInterest,
        totalMonthly: totalMonthly,
      });
    }else{
      if(X<=0&&Y<=0){
        show = 4;
      } else if (X <= 0 &&( (!isNaN(X)) )) {
        show = 2;
      } else if (Y <= 0 && ((!isNaN(Y)))) {
        show = 3;
      }
      console.log("不能小于等于0:"+show);
    }
    this.setData({
      tableShow: show,
    });
  },

  bindInput1: function (e) {
    var n = e.detail.value;
    if (!isNaN(n)) {//如果输入的是数字
      console.log("X:" + n);
      this.setData({
        X: n
      });
    } else {
      console.log("非数字");
    }
  },
  bindInput2: function (e) {
    var n = e.detail.value;
    if (!isNaN(n)) {//如果输入的是数字
      console.log("Y:" + n);
      this.setData({
        Y: n
      });
    } else {
      console.log("非数字");
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      Y:this.data.Y,
    });
    console.log("----------onLoad------------");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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

var getYPicker = function () {
  var index = 30;
  var YPicker = [];
  for (var i = 0; i < index; i++) {
    if(i<20){//1-20
      YPicker[i] = i + 1;
    }else{//25,30,35...
      YPicker[i] = YPicker[i-1] + 5;
    }
  }
  console.log("周picker:" + weekPicker);
  return YPicker;
}