var checkValue = [];
Page({
  data: {
    // tab切换    
    currentTab:0,
    iconTab:0,
    icTab:0,
    ID:null,
    msg:"无",
    textList:[{
        kind:1,
        name:"交通",
    }, {
      kind: 1,
      name: "饮食",
      }, {
        kind: 1,
        name: "娱乐",
    }, {
      kind: 1,
      name: "服饰",
      }, {
        kind: 1,
        name: "住房",
    }, {
      kind: 1,
      name: "社交",
      }, {
        kind: 1,
        name: "技能交通",
    }, {
      kind: 1,
      name: "其他",
      }, {
        kind: 1,
        name: "自定义",
    }, {
      kind: 2,
      name: "工资",
      }, {
        kind: 2,
        name: "兼职",
    }, {
      kind: 2,
      name: "理财",
      }, {
        kind: 2,
        name: "其他",
    }, {
      kind: 2,
      name: "自定义",
      }
    ],
    imageList:[
          {
            url: "/images/income/1.png",
            hoverUrl: "/images/income/01.png"
          },
          {
            url: "/images/income/2.png",
            hoverUrl: "/images/income/02.png"
          },
          {
            url: "/images/income/3.png",
            hoverUrl: "/images/income/03.png"
          },
          {
            url: "/images/income/4.png",
            hoverUrl: "/images/income/04.png"
          },
          {
            url: "/images/income/5.png",
            hoverUrl: "/images/income/05.png"
          },
          {
            url: "/images/income/6.png",
            hoverUrl: "/images/income/06.png"
          },
          {
            url: "/images/income/7.png",
            hoverUrl: "/images/income/07.png"
          },
          {
            url: "/images/income/8.png",
            hoverUrl: "/images/income/08.png"
          },
          {
            url: "/images/income/9.png",
            hoverUrl: "/images/income/09.png"
          }, 
          {
            url: "/images/payment/1.png",
            hoverUrl: "/images/payment/01.png"
          }, 
          {
            url: "/images/payment/2.png",
            hoverUrl: "/images/payment/02.png"
          },
          {
            url: "/images/payment/3.png",
            hoverUrl: "/images/payment/03.png"
          },
          {
            url: "/images/payment/4.png",
            hoverUrl: "/images/payment/04.png"
          },
          {
            url: "/images/payment/5.png",
            hoverUrl: "/images/payment/05.png"
          }
    ],
    isStart: false,
    //计算器
    result: "0",//结果
    date:"",//写入时间
    b1: "n_7",
    b2: "n_8",
    b3: "n_9",
    b4: "time",
    b5: "n_4",
    b6: "n_5",
    b7: "n_6",
    b8: "add",
    b9: "n_1",
    b10: "n_2",
    b11: "n_3",
    b12: "sub",
    b13: "dot",
    b14: "n_0",
    b15: "back",
    b16: "equ",
    temp: "0",
    lastoper: "+",
    flag: "",
    record: true,
    expr: "",      //表达式输出值
    showView: false,
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currenttab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
    })

  }
  ,
  textChange:function (e) {
    var that = this;
    var ID = e.currentTarget.id;
    if (this.data.icontab === e.target.dataset.iconcurrent) {
      return false;
    } else {
      that.setData({
        iconTab: e.target.dataset.iconcurrent,
        showView: true,
        ID:ID,
      })
    }
  },
  // 单击按钮处理时间
  clickBtn: function (e) {
    var data = this.data.result;//获取上一个结果

    // 运算用到的变量
    var tmp = this.data.temp;//上一临时值
    var lastoper1 = this.data.lastoper;//上一运算符
    var noNumFlag = this.data.flag;//上一非数字符按钮符

    //缓存用到的变量
    var expr1 = this.data.expr;//获取前面的表达式
    if (e.target.id >= 'n_0' && e.target.id <= 'n_9') {//数字按钮
      data += e.target.id.split("_")[1];//获取运算数值
      if (this.data.result == '0' || noNumFlag) {//结果为0时和上一次按的是非数字时，只输出当前值
        data = e.target.id.split("_")[1];
      }
      noNumFlag = false;
    } else if (e.target.id == "dot") {
      //indexOf(str)，若String中没出现过str，就会返回 - 1
      if (data.toString().indexOf(".") == -1) {//如果输入的值不包含小数点才加小数点
        data += ".";
      }
      noNumFlag = false;
    } else {//非数字
      noNumFlag = true;
      console.log(e.target.id);
      if (e.target.id == "clear") {
        data = 0;
        tmp = 0;
        lastoper1 = "+";
      } else if (e.target.id == "back") {
        if (data.toString().length > 1) {
          // substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
          data = data.substr(0, data.toString().length - 1);
        } else {//长度只有一位
          data = 0;
        }
      } else if (e.target.id == "add") {
        data = calc(tmp, lastoper1, data);
        tmp = data;
        lastoper1 = "+";
      } else if (e.target.id == "sub") {
        data = calc(tmp, lastoper1, data);
        tmp = data;
        lastoper1 = "-";
      } else if (e.target.id == "equ") {
        data = calc(tmp, lastoper1, data);
        tmp = 0;
        lastoper1 = "+";
        //提交到后台
        wx.request({
          url: 'https://tw.dgut.edu.cn/baicai/api/public/api/v1/saveinfo',
          data: {
            "type": this.data.textList[this.data.ID].kind,
            "money": data,
            "category": this.data.textList[this.data.ID].name,
            "message": this.data.msg,
            "date":this.data.date,
          },
          method: 'POST',
          header: {
            'content-type': 'application/json',
            'token': wx.getStorageSync('token')
          },
          success: function (res) {
            console.log(res.data)
          }
        })

      }
    }
    this.setData({//更新计算结果
      result: data,
      lastoper: lastoper1,
      temp: tmp,
      flag: noNumFlag,
      expr: expr1
    });
  },
  getMsg:function(e){
    var msg = e.detail.value;
    console.log("msg:"+msg);
    this.setData({
      msg:msg,
    })
  },
  RecordHistory: function (e) {
    this.setData({
      record: e.detail.value
    });
  },
  btnDisplay: function (e) {
    var that = this;
    console.log(id);
    that.setData({
      showView: true
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  hideClac:function(e){
    this.setData({
      showView: false
    })
  },
  onLoad:function(options){
    var d = getDate();
    var date = d[0]+"-"+d[1]+"-"+d[2];
    this.setData({
      date:date,
    })
  }
})
 

// 运算
var calc = function (d1, oper, d2) {
  var data;
  /***********************************************************
  parseFloat() 指定字符串中的首个字符是否是数字。是，则对字符串解析直到到达数字的末端。
  第一个字符不能被转换为数字，那么 parseFloat() 会返回 NaN。
  *************************************************************/
  d1 = parseFloat(d1);
  d2 = parseFloat(d2);
  switch (oper) {
    case "+":
      data = d1 + d2;
      break;
    case "-":
      data = d1 - d2;
      break;
  }
  return data;
}

// 获取时间
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
  //判断是否闰年  
  if (month > 1 && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    result += 1;
  }
  weekResult = result / 7;
  getDate[0] = year;
  getDate[1] = month + 1;
  getDate[2] = day;
  getDate[3] = result;
  getDate[4] = parseInt(weekResult);
  console.log("今天是" + getDate[0] + "年" + getDate[1] + "月" + getDate[2] + "日,是今年的第" + getDate[3] + "天第" + getDate[4] + "周");
  return getDate;
}