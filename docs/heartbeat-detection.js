
class Heartbeat {
  versionName = ''
  eventList = []

  constructor () {
    this.versionName = '0.0.1'
    this.eventList = []
  }

  start () {
    this.bindEvent('install', function (e) {})
    this.bindEvent('message', function (e) {
      /**
       * e.data // 页面发送的数据
       * e.source // 表示来源
       * e.source.id // 唯一id
       * e.source.url // orgin
       * e.source.type // window
       * e.source.visibilityState // hidden visible
       */
      console.log('data form page', e.data)
    })
  }

  destory () {
    this.eventList.map(event => {
      this.unbindEvent(event.evName, event.evCallBack)
    })
  }

  initHeart () {
    // event.source.postMessage('来自serviceWorker的信息')
  }

  // ------------------public methods---------------
  bindEvent (eventName, callback) {
    self.addEventListener(eventName, callback, false)
    return {
      evName: eventName,
      evCallBack: callback
    }
  }

  unbindEvent (eventName, callback) {
    self.removeEventListener(eventName, callback, false)
  }
}

new Heartbeat().start()
