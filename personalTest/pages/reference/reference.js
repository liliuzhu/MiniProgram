let app = getApp();
var param = {
	data: {
		hasUserInfo: false,
		userInfo: {
			nickName:"Hello MiniProgram"
		},
		list: [
			{
				id: '100',
				name: 'regeocoding',
				path: "../baiduMapDemo/pages/regeocoding/regeocoding",
				logo: "../../static/baidu.jpg"
			},
			{
				id: '101',
				name: 'search',
				path: "../baiduMapDemo/pages/search/search",
				logo: "../../static/baidu.jpg"
			},
			{
				id: '102',
				name: 'suggestion',
				path: "../baiduMapDemo/pages/suggestion/suggestion",
				logo: "../../static/baidu.jpg"
			},
			{
				id: '103',
				name: 'weather',
				path: "../baiduMapDemo/pages/weather/weather",
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
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		}
	},
	navigateTo(e) {
		let path = e.currentTarget.dataset.path;
		wx.navigateTo({
			url: path
		})
	}
}
Page(param);