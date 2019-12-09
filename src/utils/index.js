/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
export function parseRouteToPath(route) {
  var path = []
  for (var i = 0, l = route.steps.length; i < l; i++) {
    var step = route.steps[i]
    for (var j = 0, n = step.path.length; j < n; j++) {
      path.push(step.path[j])
    }
  }
  return path
}

export function setDrievingLine(startLngLat, endLngLat, AMap, _this) {
  _this.detailMap.plugin('AMap.Driving', function() {
    var driving = new AMap.Driving({
      // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
      policy: AMap.DrivingPolicy.LEAST_TIME
    })
    driving.search(
      new AMap.LngLat(startLngLat[0], startLngLat[1]),
      new AMap.LngLat(endLngLat[0], endLngLat[1]),
      function(status, result) {
        // 未出错时，result即是对应的路线规划方案
        if (status === 'complete') {
          if (result.routes && result.routes.length) {
            var path = parseRouteToPath(result.routes[0])
            var startMarker = new AMap.Marker({
              position: path[0],
              icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
              map: _this.detailMap
            })
            var endMarker = new AMap.Marker({
              position: path[path.length - 1],
              icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
              map: _this.detailMap
            })
            var routeLine = new AMap.Polyline({
              path: path,
              isOutline: true,
              outlineColor: '#ffeeee',
              borderWeight: 2,
              strokeWeight: 5,
              strokeColor: '#0091ff',
              lineJoin: 'round'
            })
            routeLine.setMap(_this.detailMap)
            _this.detailMap.setFitView([startMarker, endMarker, routeLine])
            // 缩放地图到合适的视野级别
            _this.detailMap.setFitView()
          }
        } else {
          _this.$message({
            message: '获取驾车数据失败：' + result,
            type: 'warning'
          })
        }
      }
    )
  })
}
