//index.js
//获取应用实例
const app = getApp();
let queryWord = null;
let isToImageDetail = false;//是否前往图片详情页查看图片
let requertLength=30;
let param = {
	data: {
		confirmUserGPS: false,
		columns: 2,
    isLoading: false,
    imageList: []  // 图片列表
	},
	onLoad: function (options) {
		try {
			// queryWord="女"
			queryWord = options.queryWord
			this.initPage();
		} catch (e) {
			// Do something when catch error
		} finally {
			wx.setNavigationBarTitle({ title: queryWord || "热门图片" });
		}
	},
  onReachBottom() { // 滑动到底部
		// console.log("触底了");
		this.getNetworkType();
	},
	onPullDownRefresh: function () { // 下拉刷新
    this.data.imageList = [];
    this.data.isLoading = false;
		this.initPage();
	},
	initPage() {//初始化页面
		this.getNetworkType();
	},
  getNetworkType() {//获取网络类型。
    let _this = this;
    wx.getNetworkType({
      success: res => { // 返回网络类型, 有效值：wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        var networkType = res.networkType;
        if (networkType == "wifi") {
          this.requestImages()
        } else if (networkType == "unknown" || networkType == "none") {
          wx.showModal({
            title: '提示',
            content: "当前无网络，请连接网络",
            showCancel: false,//是否显示取消按钮，默认为 true
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack();
              }
            },
            fail: function () {
              wx.navigateBack();
            }
          })
        } else {
					if(_this.data.confirmUserGPS){
						_this.requestImages();
						return
					}
          wx.showModal({
            title: '提示',
            content: "当前处于 " + networkType + " 网络，确认浏览图片吗?",
            success: function (res) {
              if (res.confirm) {// console.log('用户点击确定')
							_this.requestImages();
							_this.data.confirmUserGPS = true
              } else if (res.cancel) {// console.log('用户点击取消');
                wx.navigateBack();
              }
            }
          })
        }
      }
    })
  },
	requestImages() {//请求图片
    if (this.data.isLoading) { return }
		this.data.isLoading = true;
		app.showLoading(true);
		var keyWord = queryWord;//关键字
    let length = this.data.imageList.length
		var requestData = {
      pn: length,
			rn: requertLength,
      gsm: parseInt(length).toString(16),
			queryWord: keyWord,
			word: keyWord || "pcindexhot",
			catename: keyWord || "pcindexhot"
		};
		requestData["" + Date.now()] = "";
		let url = 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=';
		app.promise(url, requestData).then(res => {
			let responseData = [];
			try {
				if (typeof res.data == "object") {
					responseData = res.data.data
				} else if (typeof res.data == "string") {
					var str = res.data.replace(/|\\'|\\"/gi, "");
					var patt1 = /\\/gi;
					var result = patt1.test(str);
					responseData = JSON.parse(str).data;
				}
			} catch (e) {
        this._loaded();
			}
      let images = responseData.reduce((prev, cur) => {
        cur && cur.middleURL && prev.push(cur.middleURL);
        return prev;
      }, [])
			if (images.length < 1) {
        this._loaded();
				wx.showToast({
					title: '没有更多图片了',
					icon: 'none',
					duration: 2000
				})
			}
      this.data.imageList.push(...images);
      // console.log(this.data.imageList)
      this.setData({ imageList: this.data.imageList })
		}, error => {

		});
	},
  _lookBigImg(e) {
    let currentSrc = e.detail.currentTarget.dataset.src;
		if (isToImageDetail) {//是否前往图片详情页查看图片
			wx.navigateTo({
        url: '../imageDetail/imageDetail?bigImgSrc=' + encodeURIComponent(currentSrc)
			});
		} else {
			let urls = this.data.imageList;
			wx.previewImage({
        current: currentSrc, // 当前显示图片的http链接
				urls: urls // 需要预览的图片http链接列表
			})
		}
	},
  _loaded(){ // 所有图片加载完成
    this.data.isLoading = false;
    app.showLoading();
    wx.stopPullDownRefresh();
  }
}
Page(param);