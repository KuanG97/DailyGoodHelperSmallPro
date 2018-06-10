const date = new Date()
const years = []
const months = []


for (let i = 1990; i <= date.getFullYear()+1; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

Page({
  data: {
    currentTab: 0,
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth()+1,
    year: date.getFullYear(),
    value: [9999, 1, 1],
    flag: true,
    
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
    })
  },
  show: function(e) {
    console.log(e)
    this.setData({
      flag:false 
      })

  },
  /*** 点击tab切换***/
  switchTab: function (e) {
    console.log(e);
    var that = this;
    if (this.data.currenttab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  /*** 滑动切换tab***/
  swiperChange: function (e) {
    console.log(e);
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  //消失

  hide: function () {
    this.setData({ 
      flag: true,
       })

  },
  /**
     * 监听日期picker选择器
     */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
    onLoad: function (options) {
      // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function () {
      // 页面渲染完成
    },
    onShow: function () {
      // 页面显示
    },
    onHide: function () {
      // 页面隐藏
    },
    onUnload: function () {
      // 页面关闭
    }
})  