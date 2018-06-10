// pages/clac/salaryClac/salaryClac.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Show:false,
    displayFlag: false,
    //基本工资、公积金基数、五险一金缴纳比例、税率、速算扣除数
    X:0,
    Rate:100,
    r: [],//0=个人缴纳比例；1=单位比例
    //五险一金（PR个人比例,UP单位比例；以下初始化数值）
    oldPR:8,//养老
    oldUR: 20,
    medicalPR: 2,//医疗
    medicalUR: 11,
    unemploymentPR: 0.5,//失业
    unemploymentUR: 1.5,
    injuryPR: 0,//工伤
    injuryUR: 0.5,
    birthPR: 0,//生育
    birthUR: 1,
    afPR: 7,//公积金
    afUR: 7,
    //(个人缴纳、单位缴纳)
    person:[],//长度6
    unit:[],
    //计算结果
    R:0,
    U:0,
    salary:0,
  },
  //帮助模态框
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
  //获取input值
  getRate:function(e){
    var id = e.target.id;
    var value = e.detail.value;
    if (id == "person-0"){
      this.setData({
        oldPR:value
      })
    } else if (id == "unit-0"){
      this.setData({
        oldUR: value
      })
    } else if (id == "person-1") {
      this.setData({
        medicalPR: value
      })
    } else if (id == "unit-1") {
      this.setData({
        medicalUR: value
      })
    } else if (id == "person-2") {
      this.setData({
        unemploymentPR: value
      })
    } else if (id == "unit-2") {
      this.setData({
        unemploymentUR: value
      })
    } else if (id == "person-3") {
      this.setData({
        injuryPR: value
      })
    } else if (id == "unit-3") {
      this.setData({
        injuryUR: value
      })
    } else if (id == "person-4") {
      this.setData({
        birthPR: value
      })
    } else if (id == "unit-4") {
      this.setData({
        birthUR: value
      })
    } else if (id == "person-5") {
      this.setData({
        afPR: value
      })
    } else if (id == "unit-5") {
      this.setData({
        afUR: value
      })
    } else if (id == "Rate") {
      this.setData({
        Rate: value
      })
    } else if (id == "X") {
      this.setData({
        X: value
      })
    }
  },


  //计算
  clac:function(e){
    var a1 = this.data.oldPR;
    var a2 = this.data.oldUR;
    var b1 = this.data.medicalPR;
    var b2 = this.data.medicalUR;
    var c1 = this.data.unemploymentPR;
    var c2 = this.data.unemploymentUR;
    var d1 = this.data.injuryPR;
    var d2 = this.data.injuryUR;
    var e1 = this.data.birthPR;
    var e2 = this.data.birthUR;
    var f1 = this.data.afPR;
    var f2 = this.data.afUR;
    var person=[];
    var unit=[];
    var r = [];
    var R=0;
    var U=0;
    var salary=0;
    var X=this.data.X;
    var Show=this.data.Show;
    if(X<=0){
      Show=true;
    }else{
      Show = false;
    }
    var Rate = this.data.Rate;
    r[0] = allRateClac(a1, b1, c1, d1, e1, f1, Rate);
    r[1] = allRateClac(a2, b2, c2, d2, e2,f2, Rate);
    console.log("【个人五险一金总比例】"+r[0]);
    console.log("【单位五险一金总比例】" + r[1]);
  //五险一金各个缴纳
  for(var i=0;i<6;i++){
    switch (i){
      case 0:
        person[i]=X*a1*0.01;
        unit[i] = X * a2 * 0.01;
        break;
      case 1:
        person[i] = X * b1 * 0.01;
        unit[i] = X * b2 * 0.01;
        break;
      case 2:
        person[i] = X * c1 * 0.01;
        unit[i] = X * c2 * 0.01;
        break;
      case 3:
        person[i] = X * d1 * 0.01;
        unit[i] = X * d2 * 0.01;
        break;
      case 4:
        person[i] = X * e1 * 0.01;
        unit[i] = X * e2 * 0.01;
        break;
      case 5:
        person[i] = X * f1 * Rate * 0.0001;
        unit[i] = X * f2 * Rate * 0.0001;
        break;
      default:
        break;
    }
    R+=person[i];
    U+= unit[i];
  }
  salary = X-R-3500;
  if (salary<=0){
    salary = salary+3500;
    console.log("【【不用交税】】");
  }else{
    console.log("【【应纳税所得额】】:" + salary);
    salary = salaryClac(salary);
  }
  console.log("【个人五险一金个缴纳数额】" + person);
  console.log("【单位五险一金个缴纳数额】" + unit);
  this.setData({
    person: person,
    unit: unit,
    R:R,
    U:U,
    salary: salary,
    Show: Show,
  })
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




//五险一金全部比例总和
var allRateClac=function(a,b,c,d,e,f,Rate){
  var rate = a + b + c + d + e + (f * Rate*0.01);
  return rate;
}

//税后工资计算
var salaryClac = function (salary){
    var rate= [0.03, 0.1, 0.2, 0.25, 0.3, 0.35, 0.45];
    var dNum= [0, 105, 555, 1005, 2755, 5505, 13505];
    if (salary<1500 ){
      salary = salary*(1-rate[0]);
    } else if (salary >= 1500 && salary<4500) {
      salary = salary * (1 - rate[1]) +dNum[1];
    } else if (salary >= 4500 && salary < 9000) {
      salary = salary * (1 - rate[2]) +dNum[2];
    } else if (salary >= 9000 && salary < 35000) {
      salary = salary * (1 - rate[3]) +dNum[3];
    } else if (salary >= 35000 && salary < 55000) {
      salary = salary * (1 - rate[4]) +dNum[4];
    } else if (salary >= 55000 && salary < 80000) {
      salary = salary * (1 - rate[5]) +dNum[5];
    } else if (salary >= 80000) {
      salary = salary * (1 - rate[6]) +dNum[6];
    }
    salary = salary+3500;
    return salary;
} 