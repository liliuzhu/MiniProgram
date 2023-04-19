import { Block, View, Input, Icon, ScrollView } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
let app = Taro.getApp()
import cityList from './cityList.js'
import './manageCity.scss'
let param = {
  data: {
    weatherCitys: [],
    queryWord: '',
    matchingCity: [],
  },
  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    try {
      this.setData({
        weatherCitys: this.getStorage(),
      })
    } catch (e) {}
  },
  input(e) {
    this.requestMatching(e.detail.value)
  },
  choice(e) {
    let name = e.currentTarget.dataset.name
    let weatherCitys = this.getStorage()
    if (name && weatherCitys.indexOf(name) == -1) {
      weatherCitys.push(name)
      this.setStorage(weatherCitys)
    }
    this.clear()
  },
  clear() {
    this.setData({
      queryWord: '',
      matchingCity: [],
    })
  },
  optWeatherCitys(e) {
    let index = e.currentTarget.dataset.index
    let weatherCitys = this.data.weatherCitys
    Taro.showModal({
      title: '提示',
      content: '确认要删除【' + weatherCitys[index] + '】吗？',
      success: function (res) {
        if (res.confirm) {
          weatherCitys.splice(index, 1)
          this.setStorage(weatherCitys)
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }.bind(this),
    })
  },
  requestMatching(queryWord) {
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
    let matchingCity = []
    if (queryWord) {
      for (var key in cityList) {
        if (cityList[key].indexOf(queryWord) != -1) {
          let obj = {}
          obj.name = cityList[key]
          if (key.slice(-4) == '0000') {
            //省
            obj.path = cityList[key]
          } else if (key.slice(-2) == '00') {
            //市
            obj.path =
              cityList[key] +
              (cityList[key.slice(0, 2) + '0000']
                ? ',' + cityList[key.slice(0, 2) + '0000']
                : '')
          } else {
            //县/区
            obj.path =
              cityList[key] +
              (cityList[key.slice(0, 4) + '00']
                ? ',' + cityList[key.slice(0, 4) + '00']
                : '') +
              (cityList[key.slice(0, 2) + '0000']
                ? ',' + cityList[key.slice(0, 2) + '0000']
                : '')
          }
          matchingCity.push(obj)
        }
      }
    }
    this.setData({
      matchingCity,
    })
  },
  getStorage() {
    return Taro.getStorageSync('weatherCitys') || []
  },
  setStorage(data) {
    if (data) {
      Taro.setStorageSync('weatherCitys', data)
      this.setData({
        weatherCitys: data,
      })
    }
  },
}
@withWeapp(param)
class _C extends React.Component {
  render() {
    const { queryWord, matchingCity, weatherCitys } = this.data
    return (
      <Block>
        <View className="container">
          <View className="search_box">
            <Input
              onInput={this.input}
              value={queryWord}
              placeholder="城市搜索"
              className="search_inpt"
            ></Input>
            <Icon
              type="clear"
              onClick={this.clear}
              className="search_clear"
            ></Icon>
            <View className="respons_list">
              {matchingCity.map((item, index) => {
                return (
                  <View
                    key={item.index}
                    onClick={this.choice}
                    data-name={item.name}
                    className="respons_item"
                  >
                    {item.name + ' - ' + item.path}
                  </View>
                )
              })}
            </View>
          </View>
          <ScrollView scrollY="true" className="city_list">
            {weatherCitys.map((item, index) => {
              return (
                <View
                  key={item.index}
                  onLongtap={this.optWeatherCitys}
                  data-index={index}
                  className="city_item"
                >
                  {item}
                </View>
              )
            })}
          </ScrollView>
        </View>
        {/*  <template data="{{statement:'声明：以上数据均来自百度'}}" is="statementFoot" /> */}
      </Block>
    )
  }
}
export default _C
