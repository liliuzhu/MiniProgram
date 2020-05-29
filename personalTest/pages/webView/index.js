let param = {
  data: {},
  onLoad: function (options) {
    try {
      let webViewUrl = options.webViewUrl
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
