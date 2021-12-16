// chrome://crashes/

function uuid (): string {
  /**
   * 多页签的情况下，根据时间戳 + location.href
   */
  return `${new Date().getTime()}`
}

export default function start ():boolean {
  // console.log('caches', caches)

  if ('serviceWorker' in navigator) {
    const sw = navigator.serviceWorker
    const HEARTBEAT_INTERVAL = 5 * 1000// 每5s发一次心跳
    const sessionId = uuid()
    const heartbeat = function () {
        sw.controller!.postMessage({
          type: 'heartbeat',
          id: sessionId,
          data: {}
        })
    }
    window.addEventListener('beforeunload', function () {
        sw.controller!.postMessage({
          type: 'unload',
          id: sessionId
        })
    })
    window.addEventListener('load', function () {
      sw.getRegistration('./heartbeat-detection.js').then(r => {
        if (r) {
          r!.update()
          r!.unregister().then(() => {
            sw.register('./heartbeat-detection.js', { scope: './' })
              .then(function (registration) {
                console.log('register success', registration)
                // registration.update()
                setInterval(heartbeat, HEARTBEAT_INTERVAL)
                heartbeat()
              })
              .catch(function (err) {
                console.log('register fail', err)
              })
          })
          // r!.update()
        } else {
          sw.register('./heartbeat-detection.js', { scope: './' })
            .then(function (registration) {
              console.log('register success', registration)
              // registration.update()
              setInterval(heartbeat, HEARTBEAT_INTERVAL)
              heartbeat()
            })
            .catch(function (err) {
              console.log('register fail', err)
            })
        }
      })
    })
  }
  // window.addEventListener('load', function () {
  //   const sw = window.navigator.serviceWorker

  //   if (!sw) return

  //   if (window.killSW) {
  //     sw.getRegistration('/serviceWorker').then(registration => {
  //       // 手动注销
  //       registration.unregister()

  //       // 清除缓存
  //       window.caches && caches.keys && caches.keys().then(function (keys) {
  //         keys.forEach(function (key) {
  //           caches.delete(key)
  //         })
  //       })
  //     })
  //   } else {
  //     // 表示该 sw 监听的是根域名下的请求

  //     sw.register('/serviceWorker.js', { scope: '/' }).then(registration => {
  //       // 注册成功后会进入回调

  //       console.log('Registered events at scope: ', registration.scope)
  //     }).catch(err => {
  //       console.error(err)
  //     })
  //   }
  // })
  return 'serviceWorker' in navigator
}
