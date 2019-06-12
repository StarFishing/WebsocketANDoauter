import Cookies2 from 'js-cookie'
// import bcrypt from 'bcryptjs'
// const Cookies2 = Cookies.noConflict()
// 获取cookie
export function getcookie () {
  let obj = Cookies2.getJSON('information')
  return obj
}
// 设置cookie
export function setcookie (data) {
  let obj = {
    username: '',
    password: '',
    token: '',
    role: 0
  }
  for (let items in obj) {
    if (data[items]) {
      if (items === 'token') {
        Cookies2.set(items, data[items])
      } else {
        obj[items] = data[items]
      }
    }
  }
  Cookies2.set('information', obj)
}
// 清除cookie
export function removecookie () {
  Cookies2.remove('information')
}
// 设置记住密码的标志位到cookie
export function remember () {
  Cookies2.set('remember', 'y') //, { expires: 20 }
}
// 获得记住密码的标志位
export function getremember () {
  return Cookies2.get('remember')
}
export function removeremember () {
  return Cookies2.remove('remember')
}
export function gettoken () {
  return Cookies2.get('token')
}

// 清除token
export function removetoken () {
  return Cookies2.remove('token')
}
