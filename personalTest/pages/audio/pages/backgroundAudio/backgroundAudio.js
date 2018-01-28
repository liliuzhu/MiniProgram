let backgroundAudioManager = wx.getBackgroundAudioManager();
let param = {
	/**
 * 页面的初始数据
 */
	data: {
		poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000002Qs4kp15D0dY.jpg?max_age=2592000',
		name: '漂洋过海来看你',
		author: '王丽坤/朱亚文',
		src: 'http://dl.stream.qqmusic.qq.com/C400001gaIxC0dnLHp.m4a?vkey=37A0B7D851EB3AA4A6EA45411A5C4BD6F8E67BC8BDE064BB76F51B198E5DBE98686B8CF11B45422C85C78CCE3D98F8884AC5A39DB1924FEF&guid=2908924928&uin=0&fromtag=66'
	},
	/**
 * 生命周期函数--监听页面加载
 */
	onLoad: function (options) {
		//console.log(backgroundAudioManager);
		
	},
	/**
   * 页面的初始数据
   */
	audioManager: function () {
		backgroundAudioManager.title = this.data.name;
		backgroundAudioManager.epname = '此时此刻';
		backgroundAudioManager.singer = this.data.author;
		backgroundAudioManager.coverImgUrl = this.data.poster;
		backgroundAudioManager.src = this.data.src; // 设置了 src 之后会自动播放
		console.log(backgroundAudioManager);
	},
	getstatus(){
		wx.getBackgroundAudioPlayerState({
			success: function (res) {
				console.log(res);
				var status = res.status
				var dataUrl = res.dataUrl
				var currentPosition = res.currentPosition
				var duration = res.duration
				var downloadPercent = res.downloadPercent
			}
		})
	},
	getManageStatus() {
		console.log(backgroundAudioManager);
	},
	audioPlay: function () {
		// wx.playBackgroundAudio({
		// 	dataUrl: this.data.src,
		// 	title: this.data.name,
		// 	coverImgUrl: this.data.poster
		// })
		backgroundAudioManager.play();
	},
	audioPause: function () {
		//wx.pauseBackgroundAudio();
		backgroundAudioManager.pause();
	},
	audio14: function () {
		// wx.seekBackgroundAudio({
		// 	position: 14
		// });
		backgroundAudioManager.seek(14);
	},
	audioStart: function () {
		// wx.seekBackgroundAudio({
		// 	position: 0
		// });
		backgroundAudioManager.seek(0);
	},
	audioStop: function () {
		//wx.stopBackgroundAudio()
		backgroundAudioManager.stop();
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