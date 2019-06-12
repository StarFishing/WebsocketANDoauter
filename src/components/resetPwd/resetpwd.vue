<template>
  <div class='reset'>
    <div class="header-main">
      <h2>重置密码</h2>
      <div class="header-bottom">
        <div class="header-right w3agile">
          <div class="header-left-bottom agileinfo">
            <form>
              <div class="icon1">
                <input type="text"
                       placeholder="用户名"
                       required=""
                       ref="name" />
              </div>
              <div class="icon1">
                <input type="password"
                       placeholder="密码"
                       required=""
                       ref="pwd" />
              </div>
              <div class="icon1">
                <input type="password"
                       placeholder="确认密码"
                       required=""
                       ref="Confirmpwd" />
              </div>
              <div class="bottom">
                <span @click="Subchange">提交修改</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import * as oatu from '@/api/permission.js'
export default {

  data () {
    return {}
  },
  methods: {
    Subchange () {
      let userName = this.$refs.name.value
      let pwd = this.$refs.pwd.value
      let repwd = this.$refs.Confirmpwd.value
      let obj = oatu.resetValidation(userName, pwd, repwd)
      console.log(obj)
      if (!obj) return
      else this.$emit('resetpassword', obj)
    }
  },
  components: {
  }
}
</script>
<style scoped>
@import "../../common/login-style/login.css";
.reset {
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
