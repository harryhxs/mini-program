import format from 'date-fns/format'

const currency = (value, currency, decimals) => {
  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : ''
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  var i = _int.length % 3
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  var _float = decimals ? stringified.slice(-1 - decimals) : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
}

const currencySpecial = (value, currency, decimals) => {
  if (!value) {
    return '-'
  }
  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : ''
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  var i = _int.length % 3
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
  var _float = decimals ? stringified.slice(-1 - decimals) : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
}
const dateFormat = (val, type) => {
  if (!val) {
    return '-'
  }
  const time = new Date(val).getTime()
  if (time && time !== 'NaN') {
    if (type === 'date') {
      return format(time, 'yyyy-MM-dd')
    }
    if (type === 'time') {
      return format(time, 'yyyy-MM-dd HH:mm:ss')
    }
  } else {
    return '-'
  }
}
const percentage = val => {
  if (!val) {
    return '-'
  } else {
    return val * 100 + '%'
  }
}
export { currency, dateFormat, currencySpecial, percentage }
