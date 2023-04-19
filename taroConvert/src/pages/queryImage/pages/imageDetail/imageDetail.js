import { Block, View, Image } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './imageDetail.scss'
// pages/queryImage/imageDetail.js
var param = {
  /* 页面的初始数据*/
  data: {
    bigImgSrc: '',
  },
  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    let bigImgSrc = decodeURIComponent(options.bigImgSrc)
    this.setData({
      bigImgSrc,
    })
    console.log(this)
  },
  lookDetail: function () {
    Taro.previewImage({
      current: this.data.bigImgSrc,
      // 当前显示图片的http链接
      urls: [this.data.bigImgSrc], // 需要预览的图片http链接列表
    })
  },
}
@withWeapp(param)
class _C extends React.Component {
  render() {
    const { bigImgSrc } = this.data
    return (
      <View className="container">
        <View className="image_box">
          <Image
            onClick={this.lookDetail}
            src={bigImgSrc}
            mode="aspectFit"
          ></Image>
        </View>
      </View>
    )
  }
}
export default _C
