//index.js
//获取应用实例
var count=0;
var param={
  data:{
    clickMsg: "显示点击内容"
  },
  //e就是点击对象，包含很多信息，比如谁被点击了，点击时间，在xy位置点击
  clickMe(e){
    console.log(arguments);
    count++;
    // console.log(this);
    console.log(e);
    //如何区分到底是view0还是view1
    //通过id就可以区分点击的是那个按钮
    var id=e.target.id
    //把view0上点击的显示出来
    this.data.clickMsg = "显示点击内容 " + id + " 点击次数 " + count;
    //取得data-xx的值，控件wxml里面可以携带私有数据
    console.log(e.target.dataset);
    //setData重新刷新界面数据
    this.setData(this.data);
  }
}
const app = getApp()
//创建一个页面，注册一个页面 param 里面带有一个参数
//这个参数就会传到index,wxml文件中 把param.data.mytext替换成 index.weml里面的mytext
Page(param);
