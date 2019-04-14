/*eslint-disable*/
// import { Toast } from 'vant'
import Vue from 'vue'
const that = Vue.prototype
// 用户输入信息校验
export function InputValidation(userName, pwd) {
  let obj = { username: userName, password: pwd }
  // 用户名正则，4到16位（字母，数字，下划线，减号）
  var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
  // 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
  var pPattern = /^[a-zA-Z0-9_-]{4,8}$/
  //   var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
  if (!userName || !pwd) {
    that.$Message.warning({
      content: '用户名或密码不能为空',
      duration: 1
    })
    return false
  } else if (!uPattern.test(userName)) {
    that.$Message.warning({
      content: '用户名不合法',
      duration: 1
    })
    return false
  } else if (!pPattern.test(pwd)) {
    that.$Message.warning({
      content: '密码不合法',
      duration: 1
    })
    return false
  } else {
    return obj
  }
}
export function resetValidation(userName, pwd, repwd) {
  let obj = { username: userName, password: pwd }
  // 用户名正则，4到16位（字母，数字，下划线，减号）
  var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
  // 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
  var pPattern = /^[a-zA-Z0-9_-]{4,8}$/
  //   var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
  if (!userName || !pwd || !repwd) {
    that.$Message.warning({
      content: '用户名或密码不能为空',
      duration: 1
    })
    return false
  } else if (!uPattern.test(userName)) {
    that.$Message.warning({
      content: '用户名不合法',
      duration: 1
    })
    return false
  } else if (!pPattern.test(pwd) || !pPattern.test(repwd)) {
    that.$Message.warning({
      content: '密码不合法',
      duration: 1
    })
    return false
  } else {
    if (pwd !== repwd)
      that.$Message.warning({
        content: '密码输入不一致',
        duration: 1
      })
    else return obj
  }
}
export function adduserValidation(userName, pwd) {
  let obj = { username: userName, password: pwd }
  // 用户名正则，4到16位（字母，数字，下划线，减号）
  var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
  // 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
  var pPattern = /^[a-zA-Z0-9_-]{4,8}$/
  //   var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
  if (!userName || !pwd) {
    that.$Message.warning({
      content: '用户名或密码不能为空',
      duration: 1
    })
    return false
  } else if (!uPattern.test(userName)) {
    that.$Message.warning({
      content: '用户名不合法',
      duration: 1
    })
    return false
  } else if (!pPattern.test(pwd)) {
    that.$Message.warning({
      content: '密码不合法',
      duration: 1
    })
    return false
  } else {
    return obj
  }
}
