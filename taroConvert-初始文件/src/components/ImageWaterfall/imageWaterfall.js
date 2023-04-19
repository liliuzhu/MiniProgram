import { Block, View, Image } from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './imageWaterfall.scss'
@withWeapp({
  /**
   * 组件的属性列表
   */
  properties: {
    columns: {
      // 行数
      type: Number,
      value: 2,
    },
    imageList: {
      // 所有的图片
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选）
        // console.log(newVal, oldVal, changedPath);
        this.diff(newVal, oldVal)
      },
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    columnsObj: [],
    // 列对象
    imgWidth: 0,
    // 图片宽度
    loadingImg: null,
    // 加载中的图片
    loadingImgs: [],
    // 加载的图片列表
    allImages: [], // 图片数据列表
  },

  /**
   * 组件生命周期声明对象
   */
  lifetimes: {
    created: function () {
      // console.log(this)
    },
    ready: function () {
      // console.log(this.data)
      this.initComponent()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initComponent() {
      //初始化组件
      let res = Taro.getSystemInfoSync()
      let ww = res.windowWidth
      this.data.imgWidth = (ww * 0.96) / this.data.columns
      let columnsObj = []
      for (let i = 0; i < this.data.columns; i++) {
        columnsObj[i] = {}
        columnsObj[i].height = 0
        columnsObj[i].images = []
      }
      this.data.columnsObj = columnsObj
    },
    diff(newVal, oldVal) {
      // diff算法
      if (newVal.length <= oldVal.length) {
        this.data.columnsObj = []
        this.data.allImages = []
        this.initComponent()
        this.loadImages(newVal)
        return
      }
      let newArray = newVal.slice(oldVal.length)
      this.loadImages(newArray)
    },
    loadImages(srcArr) {
      //放到页面进行加载
      if (!srcArr || !srcArr.length) {
        return
      }
      let now = 'img_' + Date.now()
      let tempArll = srcArr.map((item, index) => {
        return {
          imgSrc: item,
          responseHeight: 0,
          id: now + '_' + index,
        }
      })
      this.data.allImages.push(...tempArll)
      this.data.loadingImgs = tempArll.reverse()
      this.dataloadingImg = this.data.loadingImgs.pop()
      this.setData({
        loadingImg: this.dataloadingImg,
      })
    },
    imagesLoaded: function () {
      // 图片加载完成
      let myEventDetail = {} // detail对象，提供给事件监听函数
      let myEventOption = {} // 触发事件的选项
      this.triggerEvent('loaded', myEventDetail, myEventOption)
    },
    onImageLoad(e) {
      //图片loading完成
      let oimgH = e.detail.height
      let oimgW = e.detail.width
      let scale = this.data.imgWidth / oimgW
      let imgHeight = oimgH * scale
      let loadingImg = this.data.loadingImg
      loadingImg.responseHeight = imgHeight
      let minIndex = 0
      let columnsObj = this.data.columnsObj
      for (let i = 1; i < columnsObj.length; i++) {
        if (columnsObj[minIndex].height > columnsObj[i].height) {
          minIndex = i
        }
      }
      columnsObj[minIndex].height += imgHeight
      columnsObj[minIndex].images.push(loadingImg)
      var data = {
        columnsObj,
      }
      if (this.data.loadingImgs.length == 0) {
        data.loadingImg = this.data.loadingImg = null
        this.imagesLoaded()
      } else {
        data.loadingImg = this.data.loadingImg = this.data.loadingImgs.pop()
      }
      this.setData(data)
    },
    onImageError(e) {
      if (this.data.loadingImgs.length > 0) {
        this.data.loadingImg = this.data.loadingImgs.pop()
        this.setData({
          loadingImg: this.data.loadingImg,
        })
      }
    },
    lookBigImg(e) {
      // 点击图片
      let myEventDetail = e // detail对象，提供给事件监听函数
      let myEventOption = {} // 触发事件的选项
      this.triggerEvent('lookBigImg', myEventDetail, myEventOption)
    },
  },
})
class _C extends React.Component {
  render() {
    const { loadingImg, columnsObj } = this.data
    return (
      <View className="waterfall_container">
        <View style="display:none;">
          {loadingImg && (
            <Image
              id={'loadingImg_' + loadingImg.id}
              src={loadingImg.imgSrc}
              onLoad={this.onImageLoad}
              onError={this.onImageError}
            ></Image>
          )}
        </View>
        <View
          scrollY="true"
          lowerThreshold="50"
          upperThreshold="0"
          className="scroll-list"
          scrollWithAnimation="true"
          onScrollToLower={this.getNetworkType}
        >
          <View className="columns">
            {columnsObj.map((item, index) => {
              return (
                <View className="img_list" key={item.index}>
                  {item.images.map((item, index) => {
                    return (
                      <View
                        className="cell"
                        key={item.id}
                        style={'height:' + item.responseHeight + 'px'}
                      >
                        <Image
                          mode="widthFix"
                          onClick={this.lookBigImg}
                          data-src={item.imgSrc}
                          src={item.imgSrc}
                        ></Image>
                      </View>
                    )
                  })}
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
} // components/ImageWaterfall/imageWaterfall.js
export default _C
