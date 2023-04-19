import { Block, View, Input, Text } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './suggestion.scss'
var bmap = require('../../libs/bmap-wx.min.js')
@withWeapp({
  data: {
    sugData: '',
  },
  bindKeyInput: function (e) {
    var that = this
    if (e.detail.value === '') {
      that.setData({
        sugData: '',
      })
      return
    }
    var BMap = new bmap.BMapWX({
      ak: 'GaNz2QUoC8XtolQcdScjcDvxMGwftiGC',
    })
    var fail = function (data) {
      console.log(data)
    }
    var success = function (data) {
      var sugData = ''
      for (var i = 0; i < data.result.length; i++) {
        sugData = sugData + data.result[i].name + '\n'
      }
      that.setData({
        sugData: sugData,
      })
    }
    BMap.suggestion({
      query: e.detail.value,
      region: '北京',
      city_limit: true,
      fail: fail,
      success: success,
    })
  },
})
class _C extends React.Component {
  render() {
    const { sugData } = this.data
    return (
      <Block>
        <View className="section">
          <Input
            placeholder="输入关键字"
            type="text"
            onInput={this.bindKeyInput}
          ></Input>
        </View>
        <View className="sug_info">
          <Text>{sugData}</Text>
        </View>
      </Block>
    )
  }
}
export default _C
