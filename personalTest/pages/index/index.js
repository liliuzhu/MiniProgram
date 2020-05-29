let app = getApp();
var param = {
	data: {
		userInfo: {
			nickName:"Hello MiniProgram"
		},
		list: [
			{
				id: '01',
				name: '百度图片',
				path: "../queryImage/pages/index/index",
				logo: "../../static/baidu.jpg"
			},
			{
				id: '02',
				name: '天气查询',
				path: "../weather/pages/index/index",
				logo: "../../static/baidu.jpg"
			},
			{
				id: '03',
				name: '音乐播放器',
				path: "../audio/pages/index/index",
				logo: "../../static/baidu.jpg"
      },
			{
				id: '04',
				name: '背景音乐播放器',
				path: "../audio/pages/backgroundAudio/backgroundAudio",
				logo: "../../static/baidu.jpg"
			},
      {
        id: '05',
        name: 'webView',
        path: "../webView/index?webViewUrl=https://liliuzhu.gitee.io",
        logo: "../../static/baidu.jpg"
      }
		]
	},
	onLoad(option) {
		this.getUserInfo();
	},
	getUserInfo: function () {	
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo
			})
		} else {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo
				})
			}
		}
	},
  onGotUserInfo: function (e) {
    // console.log(e.detail.errMsg)
    // console.log(e.detail.userInfo)
    // console.log(e.detail.rawData)
    app.globalData.userInfo = e.detail.userInfo
    this.getUserInfo();
  },
	navigateTo(e) {
		let path = e.currentTarget.dataset.path;
		wx.navigateTo({
			url: path
		})
	}
}
Page(param);