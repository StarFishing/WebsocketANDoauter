<template>
  <div class='reset'>
    <div class="header-main">
      <h2>Rest Password</h2>
      <div class="header-bottom">
        <div class="header-right w3agile">
          <div class="header-left-bottom agileinfo">
            <form>
              <div class="icon1">
                <input type="text"
                       placeholder="User Name"
                       required=""
                       ref="name" />
              </div>
              <div class="icon1">
                <input type="password"
                       placeholder="Password"
                       required=""
                       ref="pwd" />
              </div>
              <div class="icon1">
                <input type="password"
                       placeholder="Confirm Password"
                       required=""
                       ref="Confirmpwd" />
              </div>
              <div class="bottom">
                <span @click="Subchange">Submite</span>
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
