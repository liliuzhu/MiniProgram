let param={
	/**
 * 页面的初始数据
 */
	data: {
		poster: '//y.gtimg.cn/music/photo_new/T002R300x300M000002Qs4kp15D0dY.jpg?max_age=2592000',
		name: '漂洋过海来看你',
		author: '王丽坤/朱亚文',
		src: 'http://dl.stream.qqmusic.qq.com/C400001gaIxC0dnLHp.m4a?vkey=37A0B7D851EB3AA4A6EA45411A5C4BD6F8E67BC8BDE064BB76F51B198E5DBE98686B8CF11B45422C85C78CCE3D98F8884AC5A39DB1924FEF&guid=2908924928&uin=0&fromtag=66'
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