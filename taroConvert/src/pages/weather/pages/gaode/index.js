import {
  Block,
  View,
  Swiper,
  SwiperItem,
  Image,
  Text,
  Navigator,
} from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import bmap from '../libs/bmap-wx/bmap-wx.js'
import StatementFootTmpl from '../../../../components/StatementFootTmpl'
import './index.scss'
// let bmap = require('../libs/bmap-wx/bmap-wx.min.js')
let myAk = 'GaNz2QUoC8XtolQcdScjcDvxMGwftiGC'
let app = Taro.getApp()
let templateData = {
  currentCity: '定位中...',
  pm25: '73',
  weather_data: [
    {
      date: '周三 11月07日 (实时：8℃)',
      dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/yin.png',
      nightPictureUrl: 'http://api.map.baidu.com/images/weather/night/yin.png',
      weather: '阴',
      wind: '东南风微风',
      temperature: '16 ~ 4℃',
    },
    {
      date: '周四',
      dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/yin.png',
      nightPictureUrl:
        'http://api.map.baidu.com/images/weather/night/duoyun.png',
      weather: '阴转多云',
      wind: '西北风微风',
      temperature: '14 ~ 6℃',
    },
    {
      date: '周五',
      dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
      nightPictureUrl: 'http://api.map.baidu.com/images/weather/night/qing.png',
      weather: '晴',
      wind: '西北风3-4级',
      temperature: '10 ~ -1℃',
    },
    {
      date: '周六',
      dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
      nightPictureUrl:
        'http://api.map.baidu.com/images/weather/night/duoyun.png',
      weather: '晴转多云',
      wind: '西南风微风',
      temperature: '10 ~ 0℃',
    },
  ],
}
let param = {
  data: {
    weatherDatas: [],
    isNight: new Date().getHours() >= 18 || new Date().getHours() < 6 ? true : false,
    indicatorDots: false,
    duration: 300,
    circular: false,
    showed: false,
    current: 0,
    currentData: null,
    ////当前城市数组
    BMap: null, // 地图对象
  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    try {
      this.setData({
        currentData: this.getWeatherCitys()
      })
      this.initApp()
    } catch (e) {}
  },
  onShow() {
    this.setData({
      showed: true,
    })
    let weatherCitys = this.getWeatherCitys()
    if (weatherCitys || this.data.currentData) {
      if (JSON.stringify(weatherCitys) != JSON.stringify(this.data.currentData)) {
        this.initApp()
      }
    }
  },
  onHide() {
    this.setData({
      showed: false,
      currentData: this.getWeatherCitys()
    })
  },
  initApp() {
    this.showData(Taro.getStorageSync('weatherHistory') || [templateData])
    app.showLoading(true)
    this.setData({
      BMap: new bmap.BMapWX({ak: myAk})
    })
    this.data.BMap.regeocoding({
      // 发起regeocoding检索请求
      fail(e) {
        // console.error(e);
        Taro.showToast({
          title: '位置授权未通过',
          mask: true,
          icon: 'loading',
          image: '../../static/error.png',
          duration: 2000,
        })
        setTimeout(function () {
          Taro.navigateBack()
        }, 2000)
      },
      success: function (res) {
        let city = res.originalData.result.addressComponent.city
        let district = res.originalData.result.addressComponent.district
        let weatherCitys = this.getWeatherCitys() || []
        weatherCitys.unshift(city + district)
        this.getWeatherInfo(weatherCitys)
      }.bind(this),
    })
  },
  getWeatherCitys() {
    return Taro.getStorageSync('weatherCitys')
  },
  getWeatherInfo(citys = []) {
    app.showLoading(true)
    let url = 'https://api.map.baidu.com/weather/v1'
    var requestData = {
      ak: myAk,
      location: citys.join('|'),
      // location: '116.40387,39.91489'
      // data_type: 'all',
      output: 'json',
      coordtype: 'gcj02',
    }
    // var fail = function(data) {
    // 	console.log(1234567, data)
    // };
    // var success = function(data) {
    // 	console.log(1234566, data)
    // 	app.showLoading();
    // }
    // this.data.BMap.weather({
    // 	fail: fail,
    // 	success: success
    // });
    app.promise(url, requestData, 'application/json').then((res) => {
      try {
        Taro.setStorageSync('weatherHistory', res.data.results)
        this.showData(res.data.results)
        app.showLoading()
      } catch (e) {
        app.showLoading()
      }
    })
  },
  showData(datas) {
    let weatherDatas = datas
    weatherDatas.forEach(function (val, index, old) {
      let today = val.weather_data[0]
      let dateStr = today.date
      today.timelyTemperature = dateStr.slice(
        dateStr.indexOf('：') + 1,
        dateStr.indexOf(')')
      )
      today.date = dateStr.slice(0, dateStr.indexOf('('))
      val.today = today
      let future = val.weather_data.slice(1)
      val.future = future
      delete val.weather_data
    })
    let indicatorDots = weatherDatas.length > 1 ? true : false
    this.setData({
      indicatorDots,
      weatherDatas,
      current: 0,
    })
  },
}
@withWeapp(param)
class _C extends React.Component {
  render() {
    const {
      current,
      indicatorDots,
      duration,
      circular,
      weatherDatas,
      isNight,
      today,
      showed,
    } = this.data
    return (
      <Block>
        <View className="container">
          <Swiper
            className="swiper_box"
            current={current}
            indicatorDots={indicatorDots}
            duration={duration}
            circular={circular}>
            {weatherDatas.map((city, index) => {
              return (
                <Block key={city.index}>
                  <SwiperItem>
                    <View className="content">
                      <View className="today">
                        <View className="info">
                          <View className="info_content">
                            <View className="todayPictureUrl">
                              <Image
                                mode="widthFix"
                                src={
                                  isNight
                                    ? city.today.nightPictureUrl
                                    : city.today.dayPictureUrl
                                }
                              ></Image>
                            </View>
                            <View>{city.today.date}</View>
                            <View className="temp">
                              {city.today.timelyTemperature}
                            </View>
                            <View className="weather">
                              <Text decode="true">
                                {city.today.weather +
                                  '&emsp;' +
                                  city.today.temperature}
                              </Text>
                            </View>
                            <View>{city.today.wind}</View>
                            <View>
                              {'PM2.5浓度：' + (city.pm25 || '无数据')}
                            </View>
                            <View className="city">
                              {index == 0 && (
                                <Text className="location">📍</Text>
                              )}
                              {city.currentCity}
                            </View>
                          </View>
                        </View>
                      </View>
                      <View className="future">
                        {city.future.map((item, index) => {
                          return (
                            <View key={item.index} className="future-item">
                              <View className="pictures">
                                <View className="picture">
                                  <Image
                                    mode="widthFix"
                                    src={item.dayPictureUrl}
                                  ></Image>
                                  <Text>白天</Text>
                                </View>
                                <View className="picture">
                                  <Image
                                    mode="widthFix"
                                    src={item.nightPictureUrl}
                                  ></Image>
                                  <Text>夜间</Text>
                                </View>
                              </View>
                              <View>{item.date}</View>
                              <View>{item.weather}</View>
                              <View>{item.temperature}</View>
                              <View>{item.wind}</View>
                            </View>
                          )
                        })}
                      </View>
                    </View>
                  </SwiperItem>
                </Block>
              )
            })}
          </Swiper>
          <Navigator
            url="../manageCity/manageCity"
            className={'manageCity ' + (showed ? 'show' : '')}
            openType="navigate">
            ＋
          </Navigator>
        </View>
        <StatementFootTmpl statement='声明：以上数据均来自高德'/>
      </Block>
    )
  }
}
export default _C
