import { Block, View, Image, Text, Button } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
// import withWeapp from '@tarojs/with-weapp'
import baiduJpg  from '../../static/baidu.jpg'
import './index.scss'
let app = Taro.getApp()
// var param = {
//   onShow() {
//     console.log('onShow')
//   },
//   onHide() {
//     console.log('onHide')
//   }
// }
// @withWeapp(param)
// 小程序生命周期	  Taro 生命周期 // react不支持的生命周期可以写到@withWeapp参数中
// onShow	             componentDidShow
// onHide	             componentDidHide
// App.onLaunch	       onLaunch
// Page.onLoad	       onLoad
// Page.onReady	       onReady
// Page.onUnload	     componentWillUnmount
// Component.created	 componentWillMount
// Component.attached	 componentDidMount
// Component.ready	   Page.onReady
// Component.detached	 componentWillUnmount
class _C extends React.Component {
  state = {
    userInfo: {
      nickName: 'Hello MiniProgram',
    },
    list: [
      {
        id: '01',
        name: '百度图片',
        path: '/pages/queryImage/pages/index/index',
        logo: baiduJpg,
      },
      {
        id: '02',
        name: '百度天气查询-已失效',
        path: '/pages/weather/pages/index/index',
        logo: baiduJpg,
      },
      {
        id: '03',
        name: '音乐播放器',
        path: '/pages/audio/pages/index/index',
        logo: baiduJpg,
      },
      {
        id: '04',
        name: '背景音乐播放器',
        path: '/pages/audio/pages/backgroundAudio/backgroundAudio',
        logo: baiduJpg,
      },
      {
        id: '05',
        name: 'webView',
        path: '/pages/webView/index?webViewUrl=https://liliuzhu.gitee.io',
        logo: baiduJpg,
      },
    ],
  }
  onLoad(option) {
    this.getUserInfo()
  }
  // componentDidMount(){
  //   console.log('componentDidMount')
  //   const pageObj = Taro.getCurrentInstance().page
  //   const tabbar = Taro.getTabBar(pageObj)
  //   console.log(pageObj, tabbar)
  // }
  // componentDidShow () {
  //   console.log('componentDidShow')
  //   const pageObj = Taro.getCurrentInstance().page
  //   const tabbar = Taro.getTabBar(pageObj)
  //   tabbar.setSelected(0)
  // }
  // onReady(){
  //   console.log(this)
  //   const pageObj = Taro.getCurrentInstance().page
  //   const tabbar = Taro.getTabBar(pageObj)
  //   console.log('onReady', tabbar)
  //   tabbar.setSelected(0)
  // }

  navigateTo(path) {
    // let path = e.currentTarget.dataset.path
    Taro.navigateTo({
      url: path,
    })
  }

  onGotUserInfo() {
    if (!app.globalData.userInfo) {
      Taro.getUserProfile({
        desc: '用于完善会员资料',
        // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          app.setGlobalData('userInfo', res.userInfo)
          this.getUserInfo()
        },
      })
    } else {
      this.getUserInfo()
    }
  }

  getUserInfo () {
    if (app.globalData.userInfo) {
      this.setState({
        userInfo: app.globalData.userInfo,
      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.$app.userInfoReadyCallback = (res) => {
        this.setState({
          userInfo: res.userInfo,
        })
      }
    }
  }

  render() {
    const { userInfo, list } = this.state
    return (
      <View className="index">
        <View className="index-hd">
          <View className="userinfo">
            {!userInfo.avatarUrl ? (
              <Image
                className="index-logo"
                onClick={() => { this.onGotUserInfo()}}
                src={require('../../static/logo.png')}></Image>
            ) : (
              <Image
                className="userinfo-avatar"
                src={userInfo.avatarUrl}
                backgroundSize="cover"></Image>
            )}
            <Text className="userinfo-nickname">{userInfo.nickName}</Text>
            {/*{!userInfo.avatarUrl && (*/}
            {/*  <Button openType="getUserInfo" onClick={() => { this.onGotUserInfo() }}>*/}
            {/*    获取用户信息*/}
            {/*  </Button>*/}
            {/*)}*/}
          </View>
          <View className="index-desc">以下是我的小程序学习与测试集合。</View>
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
                      onClick={()=>{ this.navigateTo(item.path) }}
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
