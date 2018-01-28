//index.js
//获取应用实例
// const app = getApp();
let col1H=0;
let col2H=0;
let loadingCount=0;
let param={
  data:{
    col1:[],
    col2:[],
    scrollH:null,
    imgWidth:null,
    images:[],
    lookBigImg:false,
    bigImgSrc:""
  },
  onLoad:function(options){
    wx.getSystemInfo({
      success: function(res) {
        let ww=res.windowWidth;
        let wh=res.windowHeight;
        let imgWidth=ww*0.48;
        let scrollH=wh;
        this.setData({
          scrollH, imgWidth
        });
        this.loadImages();
      }.bind(this),
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  loadImages(){
   if(loadingCount!=0){return}
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    let images=[
      { pic: "../../images/1.jpg" ,height:0},
      { pic: "../../images/2.jpg" ,height:0},
      { pic: "../../images/3.jpg" ,height:0},
      { pic: "../../images/4.jpg" ,height:0},
      { pic: "../../images/5.jpg" ,height:0},
      { pic: "../../images/6.jpg" ,height:0},
      { pic: "../../images/7.jpg" ,height:0},
      { pic: "../../images/8.jpg" ,height:0 }
    ];
    let baseId="img"+Date.now();
    for (let i = 0; i < images.length;i++){
      images[i].id = baseId+"_"+i;
    }
    loadingCount = images.length;
    this.setData({ images})
  },
  onImageLoad(e){
    loadingCount--;
    let imageId=e.target.id;
    let oimgH=e.detail.height;
    let oimgW=e.detail.width;
    let imgWidth=this.data.imgWidth;
    let scale = imgWidth / oimgW;
    let imgHeight = oimgH * scale;
    let images = this.data.images;
    let imageObj=null;
    for(let i=0;i<images.length;i++){
      if (images[i].id === imageId){
        imageObj = images[i];
        break;
      }
    }
    imageObj.height = imgHeight;
    let col1=this.data.col1;
    let col2=this.data.col2;
    if(col1H<=col2H){
      col1H += imgHeight;
      col1.push(imageObj);
    }else{
      col2H += imgHeight;
      col2.push(imageObj);
    }
    var data={
      col1, col2
    }
    if (loadingCount==0){
      wx.hideLoading();
      data.images=[];
    }
    this.setData(data);
  },
  toggleBigImg(e){
    if (e.currentTarget.id == "hideBigImg"){
      this.setData({ bigImgSrc:"" ,lookBigImg: false });
    }else{
      this.setData({ bigImgSrc: e.currentTarget.dataset.src, lookBigImg: true });
    }
  }
}
Page(param);