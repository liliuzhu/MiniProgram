import { Block, View, Image, Text } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './reference.scss'
let app = Taro.getApp()
var param = {
  data: {
    hasUserInfo: false,
    userInfo: {
      nickName: 'Hello MiniProgram',
    },
    list: [
      {
        id: '100',
        name: 'regeocoding',
        path: '../baiduMapDemo/pages/regeocoding/regeocoding',
        logo: '../../static/baidu.jpg',
      },
      {
        id: '101',
        name: 'search',
        path: '../baiduMapDemo/pages/search/search',
        logo: '../../static/baidu.jpg',
      },
      {
        id: '102',
        name: 'suggestion',
        path: '../baiduMapDemo/pages/suggestion/suggestion',
        logo: '../../static/baidu.jpg',
      },
      {
        id: '103',
        name: 'weather',
        path: '../baiduMapDemo/pages/weather/weather',
        logo: '../../static/baidu.jpg',
      },
    ],
  },
  onLoad(option) {
    this.getUserInfo()
  },
  getUserInfo: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    }
  },
  navigateTo(e) {
    let path = e.currentTarget.dataset.path
    Taro.navigateTo({
      url: path,
    })
  },
}
@withWeapp(param)
class _C extends React.Component {
  render() {
    const { hasUserInfo, userInfo, list } = this.data
    return (
      <View className="index">
        <View className="index-hd">
          <View className="userinfo">
            {!hasUserInfo ? (
              <Image
                className="index-logo"
                src={require('../../static/logo.png')}
              ></Image>
            ) : (
              <Image
                className="userinfo-avatar"
                src={userInfo.avatarUrl}
                backgroundSize="cover"
              ></Image>
            )}
            <Text className="userinfo-nickname">{userInfo.nickName}</Text>
          </View>
          <View className="index-desc">以下是我的小程序学习参考。</View>
        </View>
        <View className="index-bd">
          <View className="kind-list">
            {list.map((item, index) => {
              return (
                <Block key={item.id}>
                  <View className="kind-list-item">
                    <View
                      id={item.id}
                      className="kind-list-item-hd"
                      data-path={item.path}
                      onClick={this.navigateTo}
                    >
                      <View className="kind-list-text">{item.name}</View>
                      <Image className="kind-list-img" src={item.logo}></Image>
                    </View>
                  </View>
                </Block>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}
export default _C
