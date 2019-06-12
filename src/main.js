import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import 'common/stylus/reset.styl'
import store from '@/store/index'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import * as cookie from '@/api/getcookie'
Vue.config.productionTip = false
Vue.use(iView)
// if (cookie.getcookie()) {
//   console.log(store.state.userName + 's')
//   store.commit('SET_USER', {
//     userName: cookie.getcookie().username
//   })
//   console.log(store.state.userName + 'ssss')
//   store.commit('SET_ROLE', {
//     role: cookie.getcookie().role
//   })
//   store.commit('SET_PWD', {
//     password: cookie.getcookie().password
//   })
// }
// if (cookie.gettoken()) {
//   store.commit('SET_TOKEN', {
//     role: cookie.gettoken()
//   })
// }
if (Number.parseInt === undefined) Number.parseInt = window.parseInt
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat

/*
 *兼容IE11的vue-router
 */
if (
  '-ms-scroll-limit' in document.documentElement.style &&
  '-ms-ime-align' in document.documentElement.style
) {
  // detect it's IE11
  window.addEventListener(
    'hashchange',
    function (event) {
      var currentPath = window.location.hash.slice(1)
      if (store.state.route.path !== currentPath) {
        router.push(currentPath)
      }
    },
    false
  )
}

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    // store.state.token
    if (store.state.token || cookie.gettoken()) {
      // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    if (store.state.token || cookie.gettoken()) {
      if (to.fullPath === '/login' || to.fullPath === '/') {
        next({ path: 'home' })
      }
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
