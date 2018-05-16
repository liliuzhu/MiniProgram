let param={
	/**
 * 页面的初始数据
 */
	data: {
		poster: 'http://p1.music.126.net/84FJjDgb51TmRqixaUpshg==/109951163094476391.jpg',
		name: '空空如也',
		author: '任然',
		src: 'http://m10.music.126.net/20180306142200/4b060e4603f8b1c27cce8422aad6deb7/ymusic/6428/0c3d/4a14/cef6263c9a09bfc03fafbb15f6a99533.mp3'
	},
	/**
 * 生命周期函数--监听页面加载
 */
	onLoad: function (options) {
		// 使用 wx.createAudioContext 获取 audio 上下文 context
		this.audioCtx = wx.createAudioContext('myAudio');
	},
	audioPlay: function () {
		this.audioCtx.play()
	},
	audioPause: function () {
		this.audioCtx.pause()
	},
	audio14: function () {
		this.audioCtx.seek(14)
	},
	audioStart: function () {
		this.audioCtx.seek(0)
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
   * 用户点击右上角分享
   */
	onShareAppMessage: function () {

	},
}
Page(param);