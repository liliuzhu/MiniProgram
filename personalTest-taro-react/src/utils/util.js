const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}
const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

class EventBus {
  constructor() {
    this._events = [];//存储自定义事件
  }

  /**
   * 注册事件和处理函数
   * @param event
   * @param fn
   */
  on(event, fn) {
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.on(event[i], fn)
      }
    } else {
      // 存在直接push, 不存在创建为空数组再push
      (this._events[event] || (this._events[event] = [])).push(fn)
    }
  }

  /**
   * 注册事件和处理函数，触发一次后销毁
   * @param event
   * @param fn
   */
  once(event, fn) {
    let _self=this;
    function handler() {
      _self.off(event, handler);
      fn.apply(_self,arguments);//emit里面调用时会给on方法传参
    }

    handler.fn = fn;//off里面根据这个判断销毁事件
    this.on(event, handler);
  }

  /**
   * 销毁事件和处理函数
   * @param event
   * @param fn
   */
  off(event, fn) {
    //不传参数表示清空所有
    if (!arguments.length) {
      this._events = [];
    }
    //数组循环清空
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.off(event[i], fn)
      }
    }
    const cbs = this._events[event];
    if (!cbs) {
      return;
    }
    //不传第二参表示清空某事件所有监听函数
    if (arguments.length == 1) {
      this._events[event] = null
    }
    let cb, i = cbs.length
    while (i--) {
      cb = cbs[i]
      if (cb === fn || cb.fn === fn) { //cb.fn===fn用来移除once注册的事件
        cbs.splice(i, 1)
        break
      }
    }
  }

  /**
   * 触发某事件所有回调并带参数
   * @param event
   */
  emit(event) {
    //once删除事件会导致下面循环过程中this._events内fn前移, 所以此处复制成新数组
    let cbs = [...this._events[event]];
    if (cbs) {
      for (let i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(null,[...arguments].slice(1))
        } catch (e) {
          new Error(e, `event handler for "${event}"`)
        }
      }
    }
  }
}

module.exports = {
  formatTime,
  compareVersion,
  EventBus
}
