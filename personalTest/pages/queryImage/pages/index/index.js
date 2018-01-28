//index.js
//获取应用实例
const app = getApp();
let param={
  data:{
    queryWord:"",
    options:[]
  },
  onLoad:function(options){
    try {
    } catch (e) {
      console.error(e);
    }
  },
  formSubmit(e){
    var queryWord = e.detail.value.queryWord;
    this.setHistory(queryWord);
    wx.navigateTo({
      url: '../queryResult/queryResult?queryWord=' + queryWord
    })
  },
  inputTap(){},//点击
  focusInput(e){//获取焦点事件
    let value = e.detail.value;
    if (value){//请求数据
      this.requestMatching(value);
    }else{//获取历史数据
     var options=this.getHistory()||[];
     this.setData({options});
    }
    this.setData({ queryWord: value});
  },
  blur(e){
    this.setData({ options:[]});
  },
  selectedOption(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({ queryWord: this.data.options[index]});
  },
  deleteHistory(e) {
    var index = e.currentTarget.dataset.index;
    let history=this.getHistory()||[];
    history.splice(index,1);
    this.setData({ options: history});
    this.setHistory(history);
  },
  requestMatching(queryWord){
	let url ='https://sp0.baidu.com/8qUZeT8a2gU2pMbgoY3K/su?cb=callback&ie=utf-8&prod=image&t=0.4122749605846818';
    var requestData = {
		wd: queryWord,//关键字
		_: Date.now()
    };
	app.promise(url, requestData).then(res => {
		try {
          let left = res.data.lastIndexOf("[");
          let arr = JSON.parse(res.data.slice(left, -3));
          this.setData({ options: arr }); 
        }catch(e){
		}
	});
  },
  clearHistory(e){
    try {
      wx.removeStorageSync('queryImageHistory');
      this.setData({ options: []});
    } catch (e) {
     console.log("清除失败"+e);
    }

  },
  setHistory(word){
    if (word) {
      let history =null;
      try {
        if (typeof word == "string") {
          history = this.getHistory() || [];
          for (let i = history.length - 1; i >= 0; i--) {
            if (history[i] == word) {
              history.splice(i, 1);
            }
          }
          history.unshift(word);
          history = history.slice(0, 10);
        }else{
          history=word;
        }
        wx.setStorageSync('queryImageHistory', history);
      } catch (e) {
        console.error("设置失败"+e);
      }
    }
  },
  getHistory(){
    try {
      var value = wx.getStorageSync('queryImageHistory');
      return value;
    } catch (e) {
      console.error("获取失败"+e);
      return false;
    }
  }
}
Page(param);