const store = require('store')
export function set (name, obj) {
  // 系统校时，系统控制，分级控制
  let initObj = { date: {}, systemcommand: {}, extention: {} }
  let arr = Object.getOwnPropertyNames(obj)
  initObj[arr[0]] = obj
  store.set(name, initObj)
}
export function get (name) {
  // 如果当前没有这个值，则会返回undefiend
  return store.get(name)
}
export function clearAll () {
  // 清空localstorage
  store.clearAll()
}
export function remove (name) {
  store.remove(name)
}
export function refresh (name, params, obj) {
  // name->设备
  // params->要更新的对象
  // obj->更新的对象值
  let newValue = store.get(name)
  newValue.params = obj
  store.set(name, newValue)
}
