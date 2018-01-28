// pages/queryImage/imageDetail.js
var param={
  /* 页面的初始数据*/
  data:{
    bigImgSrc:""
  },
  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    let bigImgSrc = decodeURIComponent(options.bigImgSrc);
    this.setData({bigImgSrc});
	console.log(this);
  },
  lookDetail:function(){
	  wx.previewImage({
		  current: this.data.bigImgSrc, // 当前显示图片的http链接
		  urls: [this.data.bigImgSrc] // 需要预览的图片http链接列表
	  });
  }
}
Page(param);