import {
  Block,
  View,
  Swiper,
  SwiperItem,
  Image,
  Text,
  Navigator,
} from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
export default class StatementFootTmpl extends React.Component {
  render() {
    const {
      data: { statement },
    } = this.props
    return (
      <Block>
        <View className="page-foot">{statement}</View>
      </Block>
    )
  }
}
