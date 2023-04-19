import { Block, View, Map, Text } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './search.scss'
var bmap = require('../../libs/bmap-wx.min.js')
var wxMarkerData = []
@withWeapp({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
  },
  makertap: function (e) {
    var that = this
    var id = e.markerId
    that.showSearchInfo(wxMarkerData, id)
    that.changeMarkerColor(wxMarkerData, id)
  },
  onLoad: function () {
    var that = this
    var BMap = new bmap.BMapWX({
      ak: 'GaNz2QUoC8XtolQcdScjcDvxMGwftiGC',
    })
    var fail = function (data) {
      console.log(data)
    }
    var success = function (data) {
      wxMarkerData = data.wxMarkerData
      that.setData({
        markers: wxMarkerData,
      })
      that.setData({
        latitude: wxMarkerData[0].latitude,
      })
      that.setData({
        longitude: wxMarkerData[0].longitude,
      })
    }
    BMap.search({
      query: '美食',
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png',
    })
  },
  showSearchInfo: function (data, i) {
    var that = this
    that.setData({
      placeData: {
        title: '名称：' + data[i].title + '\n',
        address: '地址：' + data[i].address + '\n',
        telephone: '电话：' + data[i].telephone,
      },
    })
  },
  changeMarkerColor: function (data, id) {
    var that = this
    var markersTemp = []
    for (var i = 0; i < data.length; i++) {
      if (i === id) {
        data[i].iconPath = '../../img/marker_yellow.png'
      } else {
        data[i].iconPath = '../../img/marker_red.png'
      }
      markersTemp[i] = data[i]
    }
    that.setData({
      markers: markersTemp,
    })
  },
})
class _C extends React.Component {
  render() {
    const { longitude, latitude, markers, placeData } = this.data
    return (
      <Block>
        <View className="map_container">
          <Map
            className="map"
            id="map"
            longitude={longitude}
            latitude={latitude}
            scale="14"
            showLocation="true"
            markers={markers}
            onMarkertap={this.makertap}
          ></Map>
        </View>
        <View className="place_info">
          <Text>{placeData.title}</Text>
          <Text>{placeData.address}</Text>
          <Text>{placeData.telephone}</Text>
        </View>
      </Block>
    )
  }
}
export default _C
