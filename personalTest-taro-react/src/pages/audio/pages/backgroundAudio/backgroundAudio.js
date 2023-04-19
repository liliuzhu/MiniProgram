import { Block, Button } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './backgroundAudio.scss'
let backgroundAudioManager = Taro.getBackgroundAudioManager()
let param = {
  /**
   * 页面的初始数据
   */
  data: {
    poster:
      'http://p1.music.126.net/84FJjDgb51TmRqixaUpshg==/109951163094476391.jpg',
    name: '空空如也',
    author: '任然',
    src: 'http://m10.music.126.net/20180306142200/4b060e4603f8b1c27cce8422aad6deb7/ymusic/6428/0c3d/4a14/cef6263c9a09bfc03fafbb15f6a99533.mp3',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(backgroundAudioManager);
    // this.audioManager();
  },
  /**
   * 页面的初始数据
   */
  audioManager: function () {
    backgroundAudioManager.title = this.data.name
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = this.data.author
    backgroundAudioManager.coverImgUrl = this.data.poster
    backgroundAudioManager.src = this.data.src // 设置了 src 之后会自动播放
    console.log(backgroundAudioManager)
  },
  getstatus() {
    Taro.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res)
        var status = res.status
        var dataUrl = res.dataUrl
        var currentPosition = res.currentPosition
        var duration = res.duration
        var downloadPercent = res.downloadPercent
      },
    })
  },
  getManageStatus() {
    console.log(backgroundAudioManager)
  },
  audioPlay: function () {
    // wx.playBackgroundAudio({
    // 	dataUrl: this.data.src,
    // 	title: this.data.name,
    // 	coverImgUrl: this.data.poster
    // })
    // backgroundAudioManager.play();
    this.audioManager()
  },
  audioPause: function () {
    //wx.pauseBackgroundAudio();
    backgroundAudioManager.pause()
  },
  audio14: function () {
    // wx.seekBackgroundAudio({
    // 	position: 14
    // });
    backgroundAudioManager.seek(14)
  },
  audioStart: function () {
    // wx.seekBackgroundAudio({
    // 	position: 0
    // });
    backgroundAudioManager.seek(0)
  },
  audioStop: function () {
    //wx.stopBackgroundAudio()
    backgroundAudioManager.stop()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
}
@withWeapp(param)
class _C extends React.Component {
  render() {
    return (
      <Block>
        <Button type="primary" onClick={this.audioPlay}>
          播放
        </Button>
        <Button type="primary" onClick={this.audioPause}>
          暂停
        </Button>
        <Button type="primary" onClick={this.audioStop}>
          停止
        </Button>
        <Button type="primary" onClick={this.audio14}>
          设置当前播放时间为14秒
        </Button>
        <Button type="primary" onClick={this.audioStart}>
          回到开头
        </Button>
        <Button type="primary" onClick={this.audioManager}>
          播放背景音乐管理
        </Button>
        <Button type="info" onClick={this.getstatus}>
          获取状态
        </Button>
        <Button type="info" onClick={this.getManageStatus}>
          获取管理状态
        </Button>
      </Block>
    )
  }
}
export default _C
