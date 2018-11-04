//index.js
//获取应用实例
const app = getApp();
let allImages = [];
let imgWidth = null;
let loadingImgs = [];
let queryWord = null;
let isToImageDetail = false;//是否前往图片详情页查看图片
let requertLength=30;
let param = {
	data: {
		columns: 2,
		columnsObj: [],
		loadingImg: null
		// lookBigImg:false
		// bigImgSrc:""
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
	onReachBottom() {
		// console.log("触底了");
		this.getNetworkType();
	},
	onPullDownRefresh: function () {
		this.initPage();
	},
	initPage() {//初始化页面
		allImages = [];
		loadingImgs = [];
		let res = wx.getSystemInfoSync();
		let ww = res.windowWidth;
		imgWidth = ww * 0.96 / this.data.columns;
		let columnsObj = [];
		for (let i = 0; i < this.data.columns; i++) {
			columnsObj[i] = {};
			columnsObj[i].height = 0;
			columnsObj[i].images = [];
		}
		this.data.columnsObj = columnsObj;
		this.getNetworkType();
	},
	loadImages(imgArr) {//放到页面进行加载
		// let images=[
		//   { pic: "../../images/1.jpg" ,height:0},
		//   { pic: " http://img0.imgtn.bdimg.com/it/u=2302918630,1086443006&fm=27&gp=0.jpg", height: 0 }
		// ];
		if (!imgArr) { return }
		let tempArll = [];
		let now = "img_" + Date.now();
		for (let i = 0; i < imgArr.length; i++) {
			tempArll.push({ imgSrc: imgArr[i], responseHeight: 0, id: now + "_" + i });
		}
		loadingImgs = tempArll;
		allImages.push.apply(allImages, loadingImgs);
		loadingImgs.reverse();
		this.setData({ loadingImg: loadingImgs.pop() });
	},
	getNetworkType() {//获取网络类型。
		// console.log("请求");
		let _this = this;
		wx.getNetworkType({
			success: function (res) {
				// 返回网络类型, 有效值：
				// wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
				var networkType = res.networkType;
				if (networkType == "wifi") {
					_this.requestImages();
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
					wx.showModal({
						title: '提示',
						content: "当前处于 " + networkType + " 网络，确认浏览图片吗?",
						success: function (res) {
							if (res.confirm) {
								// console.log('用户点击确定')
								_this.requestImages();
							} else if (res.cancel) {
								// console.log('用户点击取消');
								wx.navigateBack();
							}
						}
					})
				}
			}
		})
	},
	requestImages() {//请求图片
		if (loadingImgs.length != 0) { return }
		loadingImgs.push("don't requestImages");
		app.showLoading(true);
		var keyWord = queryWord;//关键字
		var requestData = {
			pn: allImages.length,
			rn: requertLength,
			gsm: parseInt(allImages.length).toString(16),
			queryWord: keyWord,
			word: keyWord || "pcindexhot",
			catename: keyWord || "pcindexhot"
		};
		requestData["" + Date.now()] = "";
		let url = 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=';
		app.promise(url, requestData).then(res => {
			let responseData = [];
			try {
				// console.log(res.data);
				if (typeof res.data == "object") {
					responseData = res.data.data
				} else if (typeof res.data == "string") {
					var str = res.data.replace(/|\\'|\\"/gi, "");
					var patt1 = /\\/gi;
					var result = patt1.test(str);
					console.log(result);
					// console.log(str);
					responseData = JSON.parse(str).data;
				}
			} catch (e) {
				console.error(e);
				for (let i = 0; i < requertLength; i++) {
					allImages.push(null);
				}
				loadingImgs = [];
				app.showLoading();
				return;
			}
			let images = [];
			for (let i = 0; i < responseData.length; i++) {
				responseData[i] && responseData[i].middleURL && images.push(responseData[i].middleURL);
			}
			if (images.length < 1) {
				// app.showLoading();
				wx.showToast({
					title: '没有更多图片了',
					icon: 'none',
					duration: 2000
				})
			}
			this.loadImages(images);
		}, error => {

		});
	},
	onImageLoad(e) {//图片loading完成
		let oimgH = e.detail.height;
		let oimgW = e.detail.width;
		let scale = imgWidth / oimgW;
		let imgHeight = oimgH * scale;
		let loadingImg = this.data.loadingImg;
		loadingImg.responseHeight = imgHeight;
		let minIndex = 0;
		let columnsObj = this.data.columnsObj;
		for (let i = 1; i < columnsObj.length; i++) {
			if (columnsObj[minIndex].height > columnsObj[i].height) {
				minIndex = i;
			}
		}
		columnsObj[minIndex].height += imgHeight;
		columnsObj[minIndex].images.push(loadingImg);
		var data = { columnsObj };
		if (loadingImgs.length == 0) {
			data.loadingImg = {};
			app.showLoading();
			wx.stopPullDownRefresh();
		} else {
			data.loadingImg = loadingImgs.pop();
		}
		this.setData(data);
	},
	onImageError(e) {
		if (loadingImgs.length > 0) {
			let loadingImg = loadingImgs.pop();
			this.setData({ loadingImg });
		}
	},
	lookBigImg(e) {
		if (isToImageDetail) {//是否前往图片详情页查看图片
			wx.navigateTo({
				url: '../imageDetail/imageDetail?bigImgSrc=' + encodeURIComponent(e.currentTarget.dataset.src)
			});
		} else {
			let urls=[];
			for (let i = 0, len = allImages.length; i < len;i++){
				urls.push(allImages[i].imgSrc);
			}
			wx.previewImage({
				current: e.currentTarget.dataset.src, // 当前显示图片的http链接
				urls: urls // 需要预览的图片http链接列表
			})
		}
	}
}
Page(param);