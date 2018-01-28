//app.js
App({
	onLaunch: function () {
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				// console.log(res);
			}
		})
		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					if (!this.globalData.userInfo) {
						this.getUserInfo();
					}
				}else{
					this.getUserInfo();
				}
			}
		})
	},
	globalData: {
		userInfo: null
	},
	getUserInfo() {
		wx.getUserInfo({
			success: res => {
				// 可以将 res 发送给后台解码出 unionId
				this.globalData.userInfo = res.userInfo;

				// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
				// 所以此处加入 callback 以防止这种情况
				if (this.userInfoReadyCallback) {
					this.userInfoReadyCallback(res)
				}
			}
		})
	},
	showLoading: function (types) {
		if (types) {
			wx.showLoading({
				title: '加载中...',
				mask: true
			})
		} else {
			wx.hideLoading();
		}
	},
	showNavigationBarLoading: function (types) {
		if (types) {
			wx.showNavigationBarLoading();
		} else {
			wx.hideNavigationBarLoading();
		}
	},
	promise(url, params, method) {//promise对象
		return new Promise((resolve, reject) => {
			wx.request({
				url: url,
				data: Object.assign({}, params),
				method: "GET",
				header: { 'Content-Type': method || 'application/x-www-form-urlencoded' },
				success: resolve,
				fail: reject
			})
		})
	},
})