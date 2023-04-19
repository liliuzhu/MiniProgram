import { Block, View, Map, Text } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './regeocoding.scss'
var bmap = require('../../libs/bmap-wx.min.js')
var wxMarkerData = []
@withWeapp({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {},
  },
  makertap: function (e) {
    var that = this
    var id = e.markerId
    that.showSearchInfo(wxMarkerData, id)
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
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png',
    })
  },
  showSearchInfo: function (data, i) {
    var that = this
    that.setData({
      rgcData: {
        address: '地址：' + data[i].address + '\n',
        desc: '描述：' + data[i].desc + '\n',
        business: '商圈：' + data[i].business,
      },
    })
  },
})
class _C extends React.Component {
  render() {
    const { longitude, latitude, markers, rgcData } = this.data
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
        <View className="rgc_info">
          <Text>{rgcData.address}</Text>
          <Text>{rgcData.desc}</Text>
          <Text>{rgcData.business}</Text>
        </View>
      </Block>
    )
  }
}
export default _C
