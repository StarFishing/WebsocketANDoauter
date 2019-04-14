import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Login = resolve => {
  import('components/login/login').then(module => {
    resolve(module)
  })
}
const Home = resolve => {
  import('components/Home/Home').then(module => {
    resolve(module)
  })
}
export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home
    }
  ]
})
