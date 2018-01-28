// pages/Audio/Audio.js

Page({
  
  /**
   * 页面的初始数据
   */
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../Main/Main'
    // })
    
    const  backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '汪峰'

    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
	backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46' // 设置了 src 之后会自动播放
  },

 

  data: {
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    //src:'http://fs.w.kugou.com/201711161530/b335c2bc7062f8f507b30eda0bd17ecc/G005/M08/13/05/pYYBAFS8L7SAbImxAEh0fZpjL_g844.mp3'
//src:'http://fs.w.kugou.com/201711151414/24d6984de0c1d47b9ec422c42d583ff1/G105/M06/11/09/SZQEAFk2RWGAXVvMAEIlBhfq7C0546.mp3'
//    src:'http://fs.w.kugou.com/201711151336/991155b2490565ddba4ccc1ec4cfae13/G014/M0B/18/1F/roYBAFUPcU-ARySKAB6UkcwIEo0179.mp3'
src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.audioCtx = wx.createAudioContext('myAudio')
   

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
  
  }, 
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    backgroundAudioManager.pause()
  },
  audio14: function () {
    backgroundAudioManager.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }


})