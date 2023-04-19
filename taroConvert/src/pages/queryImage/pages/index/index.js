import {
  Block,
  View,
  Image,
  Form,
  Input,
  Button,
  Text,
} from '@tarojs/components'
import React from 'react'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import StatementFootTmpl from '../../../../components/StatementFootTmpl'
import './index.scss'
import {nextTick} from "@tarojs/runtime";
//index.js
//获取应用实例
const app = Taro.getApp()
let param = {
//   state: {
//     queryWord: '',
//     placeholder: '热门图片',
//     options: [],
//   },
//   onLoad: function (options) {
//     try {
//     } catch (e) {
//       console.error(e)
//     }
//   },
//   formSubmit(e) {
//     // var queryWord = e.detail.value.queryWord;
//     var queryWord = this.state.queryWord
//     this.setHistory(queryWord)
//     Taro.navigateTo({
//       url:
//         '../queryResult/queryResult?queryWord=' +
//         (queryWord || this.data.placeholder),
//     })
//   },
//   //点击
//   focusInput(e) {
//     //获取焦点事件
//     let value = e.detail.value.trim();
//     this.setState({
//       queryWord: value
//     })
//     // console.log(value, this.data.queryWord);
//     // let value = (this.data.queryWord = this.data.queryWord.trim()) // 双向绑定
//     if (value) {
//       //请求数据
//       this.requestMatching(value)
//     } else {
//       //获取历史数据
//       var options = this.getHistory() || []
//       this.setState({
//         options,
//       })
//     }
//     this.setState({
//       queryWord: value,
//     })
//   }
//     this.setState({
//       queryWord: value,
//     })
//   },
//   blur(e) {
//     this.setState({
//       options: [],
//     })
//   },
//   selectedOption(index) {
//     // let index = e.currentTarget.dataset.index
//     let queryWord = this.data.options[index]
//     this.setState({
//       queryWord,
//     })
//     nextTick(()=>{
//       this.formSubmit()
//     })
//   },
//   deleteHistory(e, index) {
//     e.stopPropagation()
//     let history = this.getHistory() || []
//     history.splice(index, 1)
//     this.setState({
//       options: history,
//     })
//     this.setHistory(history)
//   },
//   requestMatching(queryWord) {
//     let url =
//       'https://sp0.baidu.com/8qUZeT8a2gU2pMbgoY3K/su?cb=callback&ie=utf-8&prod=image&t=0.4122749605846818'
//     var requestData = {
//       wd: queryWord,
//       //关键字
//       _: Date.now(),
//     }
//     app.promise(url, requestData).then((res) => {
//       try {
//         let left = res.data.lastIndexOf('[')
//         let arr = JSON.parse(res.data.slice(left, -2))
//         this.setState({
//           options: arr,
//         })
//       } catch (e) {}
//     })
//   },
//   clearHistory(e) {
//     try {
//       Taro.removeStorageSync('queryImageHistory')
//       this.setState({
//         options: [],
//       })
//     } catch (e) {
//       console.log('清除失败' + e)
//     }
//   },
//   setHistory(word) {
//     if (word) {
//       let history = null
//       try {
//         if (typeof word == 'string') {
//           history = this.getHistory() || []
//           for (let i = history.length - 1; i >= 0; i--) {
//             if (history[i] == word) {
//               history.splice(i, 1)
//             }
//           }
//           history.unshift(word)
//           history = history.slice(0, 10)
//         } else {
//           history = word
//         }
//         Taro.setStorageSync('queryImageHistory', history)
//       } catch (e) {
//         console.error('设置失败' + e)
//       }
//     }
//   },
//   getHistory() {
//     try {
//       var value = Taro.getStorageSync('queryImageHistory')
//       return value
//     } catch (e) {
//       console.error('获取失败' + e)
//       return false
//     }
//   },
}
// @withWeapp(param)
class _C extends React.Component {
  // constructor() {// 这种相当于 如下保存在实例中，不带==号的是保存在原型中
  //   super();
  //   this.state
  // }
  state = {
    queryWord: '',
    placeholder: '热门图片',
    options: [],
  }

  onLoad(options) {
    try {
    } catch (e) {
      console.error(e)
    }
  }

  formSubmit(e) {
    // var queryWord = e.detail.value.queryWord;
    var queryWord = this.state.queryWord
    this.setHistory(queryWord)
    Taro.navigateTo({
      url:
        '../queryResult/queryResult?queryWord=' +
        (queryWord || this.state.placeholder),
    })
  }

  //点击
  focusInput(e) {
    //获取焦点事件
    let value = e.detail.value.trim();
    this.setState({
      queryWord: value
    })
    // console.log(value, this.data.queryWord);
    // let value = (this.data.queryWord = this.data.queryWord.trim()) // 双向绑定
    if (value) {
      //请求数据
      this.requestMatching(value)
    } else {
      //获取历史数据
      var options = this.getHistory() || []
      this.setState({
        options,
      })
    }
    this.setState({
      queryWord: value,
    })
  }

  blur(e) {
    this.setState({
      options: [],
    })
  }

  selectedOption(index) {
    // let index = e.currentTarget.dataset.index
    let queryWord = this.state.options[index]
    this.setState({
      queryWord,
    })
    nextTick(() => {
      this.formSubmit()
    })
  }

  deleteHistory(e, index) {
    e.stopPropagation()
    let history = this.getHistory() || []
    history.splice(index, 1)
    this.setState({
      options: history,
    })
    this.setHistory(history)
  }

  requestMatching(queryWord) {
    let url =
      'https://sp0.baidu.com/8qUZeT8a2gU2pMbgoY3K/su?cb=callback&ie=utf-8&prod=image&t=0.4122749605846818'
    var requestData = {
      wd: queryWord,
      //关键字
      _: Date.now(),
    }
    app.promise(url, requestData).then((res) => {
      try {
        let left = res.data.lastIndexOf('[')
        let arr = JSON.parse(res.data.slice(left, -2))
        this.setState({
          options: arr,
        })
      } catch (e) {
      }
    })
  }

  clearHistory(e) {
    try {
      Taro.removeStorageSync('queryImageHistory')
      this.setState({
        options: [],
      })
    } catch (e) {
      console.log('清除失败' + e)
    }
  }

  setHistory(word) {
    if (word) {
      let history = null
      try {
        if (typeof word == 'string') {
          history = this.getHistory() || []
          for (let i = history.length - 1; i >= 0; i--) {
            if (history[i] == word) {
              history.splice(i, 1)
            }
          }
          history.unshift(word)
          history = history.slice(0, 10)
        } else {
          history = word
        }
        Taro.setStorageSync('queryImageHistory', history)
      } catch (e) {
        console.error('设置失败' + e)
      }
    }
  }

  getHistory() {
    try {
      var value = Taro.getStorageSync('queryImageHistory')
      return value
    } catch (e) {
      console.error('获取失败' + e)
      return false
    }
  }
  render () {
    const { queryWord, placeholder, options } = this.state
    return (
      <Block>
        <View className="container" onClick={()=>{this.blur()}}>
          <View className="logo">
            <Image
              mode="widthFix"
              src="https://www.baidu.com/img/bd_logo1.png"/>
          </View>
          <Form onSubmit={()=>{this.formSubmit()}}>
            <View className="query_box">
              <Input
                name="queryWord"
                onInput={(e)=>{this.focusInput(e)}}
                onFocus={(e)=>{this.focusInput(e)}}
                onClick={(e)=>{ e.stopPropagation() }}
                value={queryWord}
                className="weui-input"
                placeholder={placeholder}/>
              <Button formType="submit">
                <Text>百度图片</Text>
              </Button>
            </View>
          </Form>
          <View className="options">
            {options.map((item, index) => {
              return (
                <View
                  onClick={()=>{this.selectedOption(index)}}
                  key={index}
                  className="option_box"
                >
                  <View className="option">
                    {queryWord == '' && (
                      <Text
                        onClick={(e)=>{ this.deleteHistory(e, index) }}
                        className="right">×</Text>
                    )}
                    <Text className="matching_str">{item}</Text>
                  </View>
                </View>
              )
            })}
            {queryWord == '' && options.length > 0 && (
              <View className="option_box" style="text-align:right;">
                <View className="option">
                  <Text onClick={(e)=>{this.clearHistory(e)}}>
                    清空历史记录
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
        <StatementFootTmpl statement="声明：以上数据均来自百度"/>
      </Block>
    )
  }
}
export default _C
