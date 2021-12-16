import { ServiceEvent, ServiceCallback } from './type'

class Heartbeat {
  versionName: string
  eventList: Array<ServiceEvent>

  constructor () {
    this.versionName = '0.0.1'
    this.eventList = []
  }

  start ():void {
    this.bindEvent('message', function (e) {
      console.log('data form page', e)
    })
  }

  destory ():void {
    this.eventList.map(event => {
      this.unbindEvent(event.evName, event.evCallBack)
    })
  }

  initHeart ():void {
    // event.source.postMessage('来自serviceWorker的信息')
  }

  // ------------------public methods---------------
  bindEvent (eventName: string, callback: ServiceCallback): ServiceEvent {
    addEventListener(eventName, callback, false)
    return {
      evName: eventName,
      evCallBack: callback
    }
  }

  unbindEvent (eventName: string, callback: ServiceCallback): void {
    removeEventListener(eventName, callback, false)
  }
}

export default Heartbeat
