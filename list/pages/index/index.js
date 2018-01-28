//index.js
//获取应用实例
var param={
  data:{
    message: "微信小程序",
    array:[1,2,3,4,5,"hello","wx"],
    length:6,
    zhangshan:{name:"张三",age:"18"},
    // lisi: { name: "李四", age: "19" },
    users: [{ name: "张三", age: "18" }, { name: "李四", age: "19" }],
    count:0,
    hidden:false,
    x:"张",
    y:"28",
    a:"深圳"
  },
  add(e){
    console.log(this);
    // 把count2重新刷新到界面上
    // this.setData({count:count2});
    this.setData({ count: ++this.data.count, zhangshan: { name: "张三",age:20}});
    console.log(this);
  }
}
//创建一个页面，注册一个页面 param 里面带有一个参数
//这个参数就会传到index,wxml文件中 把param.data.mytext替换成 index.weml里面的mytext
Page(param);
