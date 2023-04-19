import { Block } from "@tarojs/components";
import React from "react";
import Taro from "@tarojs/taro";
import withWeapp from "@tarojs/with-weapp";
import updateManager from './common/updateManager';
let utils = require('./utils/util')
import "./app.scss";
@withWeapp({
  globalData: {
    userInfo: null
  },
  setGlobalData(key, value) {
    this.globalData[key] = value
  },
  // onShow(){
  //   console.log('onShow')
  // },
  showLoading: function (types) {
    if (types) {
      Taro.showLoading({
        title: '加载中...',
        mask: true
      });
    } else {
      Taro.hideLoading();
    }
  },
  showNavigationBarLoading: function (types) {
    if (types) {
      Taro.showNavigationBarLoading();
    } else {
      Taro.hideNavigationBarLoading();
    }
  },
  promise(url, params, ContentType, method) {
    //promise对象
    return new Promise((resolve, reject) => {
      Taro.request({
        url: url,
        data: Object.assign({}, params),
        method: method || "GET",
        header: {
          'Content-Type': ContentType || 'application/x-www-form-urlencoded'
        },
        success: (...arg) => {
          resolve(...arg)
        },
        fail: (...arg) => {
          reject(...arg)
        }
      });
    });
  }
}, true)
class App extends React.Component {
  // taroGlobalData = { // @withWeapp 中的数据会覆盖new 出来的实例的属性
  //   x: 1,
  //   globalData: {
  //     userInfo: null
  //   }
  // }
  getUserInfo() {
    const version = Taro.getSystemInfoSync().SDKVersion
    if(version){
      if(utils.compareVersion('2.27.1', version)>0){
        return
      }
      Taro.getUserInfo({ // 官方已不支持
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          this.globalData.userInfo = res.userInfo;
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res);
          }
        }
      });
    }
  }
  onLaunch() {
    // 展示本地存储能力
    var logs = Taro.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    Taro.setStorageSync('logs', logs);

    // 登录
    Taro.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log('login', res);
      }
    });
// 获取用户信息
    Taro.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          if (!this.globalData.userInfo) {
            this.getUserInfo();
          }
        } else {
          this.getUserInfo();
        }
      }
    });
  }
  componentDidShow() {
    updateManager();
  }
  render() {
    return this.props.children;
  }
} //app.js
export default App;
