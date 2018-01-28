//index.js
//获取应用实例
var param={
  data:{
    clickMsg: "显示点击内容"
  },
}
//创建一个页面，注册一个页面 param 里面带有一个参数
//这个参数就会传到index,wxml文件中 把param.data.mytext替换成 index.weml里面的mytext
Page(param);
