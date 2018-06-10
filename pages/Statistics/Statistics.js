Page({
  data:{
   
    getid:'',
    statype1:[],
    
    modalHidden: true,
   /*
    task: {
      money: '',
    },*/
    button: {
      txt: '新建'
    },
  },
  
  onLoad:function(options){
   //获取元素下标
    var id = getApp().getId;
    console.log(id);
   //接收数组
    this.setData({
      statype1:JSON.parse(options.statype),
      getid:id,
    })
     //检验传递数组是否成功
   //  console.log("打印" + options.statype);
 
  },
  onShow:function(){
    console.log(this.data.statype1);
  },
   modalChange: function (e) {
    this.setData({
      modalHidden: true
    })
  },
   // 输入的东西
  /* bindKeyInput: function (e) {
     this.setData({
       'task.name': e.detail.value
     });
   },*/
   // 提交、检验（没弄好）
   bindSubmit: function (e) {

   }

})