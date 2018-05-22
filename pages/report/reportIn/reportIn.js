var wxCharts = require('../report/wxcharts-min.js');
var app = getApp();
var lineChart = null;
var lineChart1 = null;
var lineChart2 = null;


Page({
  data: {
    //Tab标签栏
    id3: "week",
    id4: "month",
    id5: "year",
    hiddenW: false,
    hiddenM: true,
    hiddenY: true,
    // 页面配置
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    //列表
    reportListZ: [
      {
        img: "../../../img/1.jpg",
        title: "食物",
        msg: "人生没有如果，只有后果和结果，",
        time: "2022年 10月 9日 ",
        price: "50",
      },
      {
        img: "../../img/1.jpg",
        title: "食物",
        msg: "人生没有如果，只有后果和结果，",
        time: "2022年 10月 9日 ",
        price: "5000",
      }
    ],
    reportListM: [
      {
        img: "../../../img/1.jpg",
        title: "娱乐",
        msg: "人生没有如果，只有后果和结果，",
        time: "2022年 10月 9日 ",
        price: "50",
      },
      {
        img: "../../../img/1.jpg",
        title: "服饰",
        msg: "人生没有如果，只有后果和结果，",
        time: "2022年 10月 9日 ",
        price: "500000",
      },
      {
        img: "../../../img/1.jpg",
        title: "服饰",
        msg: "人生没有如果，只有后果和结果，",
        time: "2022年 10月 9日 ",
        price: "500000",
      }
    ],
    reportListM: [
      {
        img: "../../../img/1.jpg",
        title: "娱乐",
        msg: "人生没有如果，只有后果和结果，",
        time: "2022年 10月 9日 ",
        price: "50",
      },
      {
        img: "../../../img/1.jpg",
        title: "服饰",
        msg: "人生没有如果，只有后果和结果，",
        time: "2022年 10月 9日 ",
        price: "500000",
      },
      {
        img: "../../../img/1.jpg",
        title: "服饰",
        msg: "人生没有如果，只有后果和结果，",
        time: "2022年 10月 9日 ",
        price: "500000",
      }
    ],
    reportListY: [
      {
        img: "../../../img/1.jpg",
        year: "2018",
        month: "1",
        msg: "人生没有如果，只有后果和结果，",
        spanding: "6750",
        income: "5000",
      }, {
        img: "../../../img/1.jpg",
        year: "2018",
        month: "1",
        msg: "人生没有如果，只有后果和结果，",
        spanding: "50",
        income: "50",
      }, {
        img: "../../../img/1.jpg",
        year: "2018",
        month: "1",
        msg: "人生没有如果，只有后果和结果，",
        spanding: "50",
        income: "50",
      }
    ],
    // 图表参数
    weekTagName: "当天支出",
    monthTagName: "该月支出",
    yearTagName: "该月支出",
    monthSum: [],
    weekData: [5, 13, 44.2, 21, 11.99, 5, 17],
    monthData: [5, 44.2, 5, 17],
    yearData: [5, 11, 24, 11, 13, 44.2, 21, 15, 21, 11.99, 5, 17],
    weekXData: ["一", "二", "三", "四", "五", "六", "日"],
    monthXData: ["第1周", "第2周", "第3周", "第4周", "第5周", "第6周"],
    yearXData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  },


  /*
   * 点击图表获取对应信息
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
   * 图表X轴
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
      url: '../report/report',
    })
  },


  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var windowWidth;
    var that = this;
    /* 
     * 获取系统信息 
     */
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
          return val.toFixed(2) + '万';
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
          return val.toFixed(2) + '万';
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
          return val.toFixed(2) + '万';
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
  },

  /*
  *点击tab切换
  */
  swichNav: function (e) {
    var that = this;
    var ID = e.target.id;
    var W, M, Y;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      if (ID == "week") {
        W = false;
        M = true;
        Y = true;
      } else if (ID == "month") {
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
        hiddenW: W,
        hiddenM: M,
        hiddenY: Y,
      })
    }
  }
});

