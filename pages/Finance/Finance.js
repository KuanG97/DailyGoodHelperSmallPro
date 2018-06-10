Page({
  data: {
    currentTab: '',
    sort:"资产",
    fundname:"基金名称或代码",
    fundexp: "如'国泰聚安' '00362'",
    stockname:"股票拼音、名称或代码",
    stockexp:"如'贵州茅台' '600519' 'gzmt'",
    staType:[
      {
        typeIs: '资产',
        statype:'现金',
        balance: "0.00元",
      },
      {
        typeIs: '资产',
        statype: '银行卡',
        balance: "0.00元",
      },{
        typeIs: '资产',
        statype: '微信零钱',
        balance: "0.00元",
      },{
        typeIs: '资产',
        statype: '支付宝零钱',
        balance: "0.00元",
      },{
        typeIs: '资产',
        statype: '车位',
        balance: "0.00元",
      },{
        typeIs: '资产',
        statype: '房产',
        balance: "0.00元",
      },{
        typeIs: '资产',
        statype: '定期存款',
        balance: "0.00元",
      },{
        typeIs: '资产',
        statype: '公积金',
        balance: "0.00元",
      },{
        typeIs: '资产',
        statype: '借出',
        balance: "0.00元",
      },{
        typeIs: '资产',
        statype: '其他',
        balance: "0.00元",
      }, {
        typeIs: '资产',
        statype: '银行理财',
        balance: "0.00元",
      }, {
        typeIs: '资产',
        statype: '基金+',
        balance: "市值0.00元",
      }, {
        typeIs: '资产',
        statype: '股票+',
        balance:"市值0.00元",
      }, {
        typeIs: '资产',
        statype: '其他理财',
        balance: "0.00元",
      },
      {
        typeIs: '负债',
        statype: '信用卡',
        balance: "0.00元",
      }, {
        typeIs: '负债',
        statype: '房贷',
        balance: "0.00元",
      }, {
        typeIs: '负债',
        statype: '车贷',
        balance: "0.00元",
      }, {
        typeIs: '负债',
        statype: '信用贷款',
        balance: "0.00元",
      }, {
        typeIs: '负债',
        statype: '小额贷款',
        balance: "0.00元",
      }, {
        typeIs: '负债',
        statype: '质押贷款',
        balance: "0.00元",
      }, {
        typeIs: '负债',
        statype: 'P2P贷款',
        balance: "0.00元",
      }, {
        typeIs: '负债',
        statype: '民间借款',
        balance: "0.00元",
      }, {
        typeIs: '负债',
        statype: '其他负债',
        balance: "0.00元",
      },
      {
        typeIs: '收入',
        statype: '工资',
        balance: "0.00元",
      }, {
        typeIs: '收入',
        statype: '兼职',
        balance: "0.00元",
      }, {
        typeIs: '收入',
        statype: '理财',
        balance: "0.00元",
      }, {
        typeIs: '收入',
        statype: '其他',
        balance: "0.00元",
      },
      {
        typeIs: '支出',
        statype: '交通',
        balance: "0.00元",
      } ,
      {
        typeIs: '支出',
        statype: '饮食',
        balance: "0.00元",
      },
      {
        typeIs: '支出',
        statype: '娱乐',
        balance: "0.00元",
      },
      {
        typeIs: '支出',
        statype: '服饰',
        balance: "0.00元",
      },
      {
        typeIs: '支出',
        statype: '住房',
        balance: "0.00元",
      },
      {
        typeIs: '支出',
        statype: '社交',
        balance: "0.00元",
      },
      {
        typeIs: '支出',
        statype: '技能',
        balance: "0.00元",
      },
      {
        typeIs: '支出',
        statype: '其他',
        balance: "0.00元",
      },
      {
        typeIs: '支出',
        statype: '自定义',
        balance: "0.00元",
      }
    ]
  },
  /*** 滑动切换tab***/
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /*** 点击tab切换***/
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },
  /*传递基金股票字符串*/ 
  obtainfund:function (e) {
    //字符串传递
    var getexp = this.data.fundexp;
    var getsort = this.data.sort;
    var getfund = this.data.fundname;
    var getexp = this.data.fundexp;
    var getstock = this.data.stockname;
    var stoexp = this.data.stockexp;


    // 取得下标（全局变量传递）
    var index = e.currentTarget.id;
    // 取出id值
    var app = getApp()
    app.getId = index;

    wx.navigateTo({
      url: '../fundSearch/fundSearch?getfund=' + getfund + "&getsort=" + getsort + "&getexp=" + getexp + "&getstock= " + getstock + "&getsort=" + getsort + "&stoexp=" + stoexp + "&statype=" + JSON.stringify(this.data.staType)
    });
   // console.log(getsort);
  },
  obtainid:function(e){
    
    // 取得下标（全局变量传递）
    var index = e.currentTarget.id;
    //console.log(index);
    // 取出id值
    var app =getApp()
    app.getId = index;
    //数组传递
    wx.navigateTo({
      url: '../Statistics/Statistics?statype=' + JSON.stringify(this.data.staType)
    });
  },
  onLoad: function () {

  },
  /**
    * 生命周期函数--监听页面隐藏/并未关闭返回
    */
  onHide: function () {
   
  },
  
  /**
   * 生命周期函数--监听页面卸载/
   */
  onUnload: function () {
    console.log(222)
  },
})