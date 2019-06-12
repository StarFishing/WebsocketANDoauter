export function GMTToStr (data, time) {
  let date = new Date(data)
  // let arr = []
  // arr = time.split(':')
  let arr = time.map((value, index) => {
    if (index === 0) {
      if (value.length === 1) return '00' + value
      if (value.length === 2) return '0' + value
    }
    if (value.length === 1 && index !== 0) return '0' + value
    else return value
  })
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  let Month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  let str =
    arr[2] +
    ':' +
    arr[1] +
    ':' +
    arr[0] +
    ':' +
    day +
    ':' +
    Month +
    ':' +
    date.getFullYear()
  return str
}
export function getLocalDate (data) {
  let date = new Date(data)
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  let Month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  return date.getFullYear() + '-' + Month + '-' + day
}
