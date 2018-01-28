let app = getApp();
import cityList from "./cityList.js";
let param = {
	data: {
		weatherCitys:[],
		queryWord:'',
		matchingCity:[]
	},
	/* 生命周期函数--监听页面加载*/
	onLoad: function (options) {
		try {
			this.setData({ weatherCitys: this.getStorage()});
		} catch (e) {
		}
	},
	input(e){
		this.requestMatching(e.detail.value);
	},
	choice(e){
		let name = e.currentTarget.dataset.name;
		let weatherCitys = this.getStorage();
		if (name && weatherCitys.indexOf(name)==-1){
			weatherCitys.push(name);
			this.setStorage(weatherCitys);
		}
		this.clear();
	},
	clear(){
		this.setData({ queryWord: "", matchingCity:[]});
	},
	optWeatherCitys(e){
		let index = e.currentTarget.dataset.index;
		let weatherCitys = this.data.weatherCitys;
		wx.showModal({
			title: '提示',
			content: '确认要删除【'+weatherCitys[index]+'】吗？',
			success: function (res) {
				if (res.confirm) {
					weatherCitys.splice(index,1);
					this.setStorage(weatherCitys);
				} else if (res.cancel) {
					// console.log('用户点击取消')
				}
			}.bind(this)
		})
	},
	requestMatching(queryWord){
		// let url ='https://api.map.baidu.com/su?callback=callback';
		// let url = './list.json';
		// let requestData={
		// 	wd: queryWord,
		// 	t:Date.now(),
		// 	from:"jsapi",
		// 	cid:1
		// }
		// app.promise(url, requestData).then(res=>{
		// 	console.log(res);
		// });
		let matchingCity = [];
		if (queryWord){
			for (var key in cityList) {
				if (cityList[key].indexOf(queryWord) != -1) {
					let obj = {};
					obj.name = cityList[key];
					if (key.slice(-4) == "0000") {//省
						obj.path = cityList[key];
					} else if (key.slice(-2) == "00") {//市
						obj.path = cityList[key] + (cityList[key.slice(0, 2) + "0000"] ? "," + cityList[key.slice(0, 2) + "0000"] : '');
					} else {//县/区
						obj.path = cityList[key] + (cityList[key.slice(0, 4) + "00"] ? "," + cityList[key.slice(0, 4) + "00"] : '') + (cityList[key.slice(0, 2) + "0000"] ? "," + cityList[key.slice(0, 2) + "0000"] : '');
					}
					matchingCity.push(obj);
				}
			}
		}
		this.setData({ matchingCity});
	},
	getStorage(){
		return wx.getStorageSync("weatherCitys")||[];
	},
	setStorage(data){
		if(data){
			wx.setStorageSync("weatherCitys", data);
			this.setData({ weatherCitys: data});
		}
	}
	
}
Page(param);