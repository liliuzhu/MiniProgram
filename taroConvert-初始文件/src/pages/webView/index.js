import { Block, View, WebView } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
let param = {
  data: {},
  onLoad: function (options) {
    try {
      let webViewUrl = options.webViewUrl
      this.setData({
        webViewUrl,
      })
    } catch (e) {
      // Do something when catch error
    }
  },
  postMessageHandler(e) {
    // console.log(123213)
    console.log(e)
  },
}
@withWeapp(param)
class _C extends React.Component {
  render() {
    const { webViewUrl } = this.data
    return (
      <View className="page-body">
        <View className="page-section page-section-gap">
          <WebView
            onMessage={this.postMessageHandler}
            src={webViewUrl}
          ></WebView>
        </View>
      </View>
    )
  }
}
export default _C
