let param = {
  data: {
    webViewHost: 'http://owner-pay.shanyishanmei.com:8081/owner-pay-public/miniprogram-look-protocol?protocolUrl=',
    webViewUrl: ''
  },
  onLoad: function (options) {
    try {
      let url = options.webViewUrl
      let webViewUrl = this.data.webViewHost + url;
      this.setData({ webViewUrl })
    } catch (e) {
      // Do something when catch error
    }
  },
  postMessageHandler(e){
    // console.log(123213)
    console.log(e)
  }
}
Page(param)
