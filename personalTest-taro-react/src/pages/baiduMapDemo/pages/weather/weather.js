import { Block, View, Text } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './weather.scss'
var bmap = require('../../libs/bmap-wx.min.js')
@withWeapp({
  data: {
    weatherData: '',
  },
  onLoad: function () {
    var that = this
    var BMap = new bmap.BMapWX({
      ak: 'GaNz2QUoC8XtolQcdScjcDvxMGwftiGC',
    })
    var fail = function (data) {
      console.log('fail!!!!')
    }
    var success = function (data) {
      console.log('success!!!')
      var weatherData = data.currentWeather[0]
      weatherData =
        '城市：' +
        weatherData.currentCity +
        '\n' +
        'PM2.5：' +
        weatherData.pm25 +
        '\n' +
        '日期：' +
        weatherData.date +
        '\n' +
        '温度：' +
        weatherData.temperature +
        '\n' +
        '天气：' +
        weatherData.weatherDesc +
        '\n' +
        '风力：' +
        weatherData.wind +
        '\n'
      that.setData({
        weatherData: weatherData,
      })
    }
    BMap.weather({
      fail: fail,
      success: success,
    })
  },
})
class _C extends React.Component {
  render() {
    const { weatherData } = this.data
    return (
      <View className="weather">
        <Text>{weatherData}</Text>
      </View>
    )
  }
}
export default _C
