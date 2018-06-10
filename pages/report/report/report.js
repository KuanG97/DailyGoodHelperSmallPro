var wxCharts = require('wxcharts-min.js');
var app = getApp();
var lineChart = null;
var lineChart1 = null;
var lineChart2 = null;

Page({
  data: {
    //Tab标签栏
    id3:"week",
    id4:"month",
    id5:"year",
    hiddenW:false,
    hiddenM: true,
    hiddenY: true,
    //背景改变true为白色
    spending:true,
    income: false,
    week:true,
    month:false,
    year: false,
    currentTab: 0,  
    // picker 时间数据
    weekPicker: [],//getweekPicker func（）初始化
    weekIndex: 0,
    monthPicker: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    monthIndex: 0,
    yearPicker: [],
    yearIndex: 0,
    getDate: [],//arr["年","月","日","今年的第几天","今年的第几周"]
    setMonth: "",
    setYear: "",
    setWeek: "",
    //列表
    reportListZ: [
      {
        img: "/images/1.jpg",//title对应的icon图片
        title: "食物",
        msg: "人生没有如果，只有后果和结果，",//备注
        time: "2022-10-9",
        price: "50",
      },
      {
        img: "/images/1.jpg",
        title: "食物",
        msg: "人生没有如果，只有后果和结果，",
        time: "2022-10-9",
        price: "5000",
      }
    ],
    reportListM: [
      {
        img: "/images/1.jpg",
        title: "娱乐",
        msg: "人生没有如果，只有后果和结果，",
        time: "2022-10-9",
        price: "50",
      },
      {
        img: "/images/1.jpg",
        title: "服饰",
        msg: "人生没有如果，只有后果和结果，",
        time: "2022-10-9",
        price: "500000",
      }
    ],
    reportListM: [
      {
        img: "/images/1.jpg",
        title: "娱乐",
        msg: "人生没有如果，只有后果和结果，",
        time: "2022-10-9",
        price: "50",
      }
    ],
  reportListY: [
    {
      img: "/images/1.jpg",
      year: "2018",
      month:"1",
      spanding: "500000000",
      income: "50",
    }, {
      img: "/images/1.jpg",
      year: "2018",
      month: "1",
      spanding: "500000000",
      income: "50",
    },
  ],
  listYIndex:null,
  // 图表展示固定参数
  weekTagName:"当天支出",
  monthTagName: "该月支出",
  yearTagName: "该月支出",
  monthSum: [],
      // 图表展示固定参数之X轴
  weekXData: ["一", "二", "三", "四", "五", "六", "日"],
  monthXData: ["第1周", "第2周", "第3周", "第4周", "第5周", "第6周"],
  yearXData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  //图表展示参数之对应价格
  weekData:[500,130,447.2,271,211.3,500,170],
  monthData: [5, 44.2, 5, 17],
  yearData: [5000,11000,24000,110,13000, 4400.2, 2100,1500,910, 110.99, 750, 1700],
  },

  /*
   *绑定修改
   */
  bindModifyAccount:function(e){
    var id = e.currentTarget.id;
    console.log("选中的列表项：" + id );
    wx.navigateTo({
      url: '../modify/modify?index=' + id + '&list=' + JSON.stringify(this.data.reportListZ) ,
    })
  },
  bindModifyAccountM:function(e){
    var id = e.currentTarget.id;
    console.log("选中的列表项：" + id );
    wx.navigateTo({
      url: '../modify/modify?index=' + id + '&list=' + JSON.stringify(this.data.reportListM) ,
    })
  },

  /*
   *绑定点击picker数值
   */
  bindWeekPickerChange: function (e) {
    console.log('week picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      weekIndex: e.detail.value
    })
  },
  bindMonthPickerChange: function (e) {
    console.log('week picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      monthIndex: e.detail.value
    })
  },
  bindYearPickerChange: function (e) {
    console.log('week picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      yearIndex: e.detail.value
    })
  },


 /*
  * 点击图表获取对应点信息
  */
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  touchHandler1: function (e) {
    console.log("1:" + lineChart1.getCurrentDataIndex(e));
    lineChart1.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  touchHandler2: function (e) {
    console.log("2:" + lineChart2.getCurrentDataIndex(e));
    lineChart2.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },


 /*
  * 图表X轴初始化
  */
  createSimulationData: function () {
    var categories = [];
    var data = [];
    var date = this.data.weekXData;
    for (var i = 0; i < 7; i++) {
      categories.push(date[i]);
    }
    return {
      categories: categories,
      data: data
    }
  },
  createSimulationData1: function () {
    var categories = [];
    var data = [];
    var date = this.data.monthXData;
    for (var i = 0; i < 6; i++) {
      categories.push(date[i]);
    }
    return {
      categories: categories,
      data: data
    }
  },
  createSimulationData2: function () {
    var categories = [];
    var data = [];
    var date = this.data.yearXData;
    for (var i = 0; i < 12; i++) {
      categories.push(date[i]);
    }
    return {
      categories: categories,
      data: data
    }
  },


 /*
  *  支出收入跳转页
  */
  NavChange: function (e) {
    wx.navigateTo({
      url: '../reportIn/reportIn',
    })
  },
  

  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var windowWidth;
    var that = this;
    var Date = getDate();
    console.log(Date);
    //获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });  
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.log('getSystemInfoSync failed!');
    }

    // 周报表数据
    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      series: [{
        name: this.data.weekTagName,
        data: this.data.weekData,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        format: function (val) {
          return val.toFixed(0);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });

    // 月报表数据
    var simulationData1 = this.createSimulationData1();
    console.log(simulationData1.categories);
    lineChart1 = new wxCharts({
      canvasId: 'lineCanvas1',
      type: 'line',
      categories: simulationData1.categories,
      animation: true,
      series: [{
        name: this.data.monthTagName,
        data: this.data.monthData,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        format: function (val) {
          return val.toFixed(0);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });


    // 年报表数据
    var simulationData2 = this.createSimulationData2();
    lineChart2 = new wxCharts({
      canvasId: 'lineCanvas2',
      type: 'line',
      categories: simulationData2.categories,
      animation: true,
      series: [{
        name: this.data.yearTagName,
        data: this.data.yearData,
        format: function (val, name) {
          return val.toFixed(2) + '元';
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        format: function (val) {
          return val.toFixed(0);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
    this.setData({
      monthIndex: Date[1]-1,
      weekIndex: Date[4] - 1,
      setYear: Date[0],
      weekPicker: getweekPicker(),
      getDate: Date[2],
    })
  },


  /*
  *点击tab切换
  */ 
  swichNav: function (e) {
    var that = this;
    var ID = e.target.id;
    var W,M,Y;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      if(ID=="week"){
        W = false;
        M = true;
        Y = true;
      } else if (ID == "month"){
        W = true;
        M = false;
        Y = true;
      } else if (ID == "year") {
        W = true;
        M = true;
        Y = false;
      }
      that.setData({
        currentTab: e.target.dataset.current,
        hiddenW:W,
        hiddenM:M,
        hiddenY:Y,
      })
    }
  }
});

var getweekPicker = function(){
  var weekPickerIndex = 53;
  var weekPicker = [];
  for(var i=0;i<35;i++){
    weekPicker[i]=i+1;
  }
  console.log("周picker:"+weekPicker);
  return weekPicker;
}

// 获取时间
var getDate = function(){
  var getDate=[];
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
  //判断是否闰年  
  if (month > 1 && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    result += 1;
  }
  weekResult = result / 7;
  getDate[0] = year;
  getDate[1] = month+1;
  getDate[2] = day;
  getDate[3] = result;
  getDate[4] = parseInt(weekResult);
  console.log("今天是" + getDate[0] + "年" + getDate[1] + "月" + getDate[2] + "日,是今年的第" + getDate[3] + "天第" + getDate[4] + "周"); 
  return getDate;
}