<template>
  <div class='add'>
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
              <!-- <div class="icon1">
                <input type="password"
                       placeholder="Confirm Password"
                       required=""
                       ref="Confirmpwd" />
              </div> -->
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
      let obj = oatu.adduserValidation(userName, pwd)
      if (!obj) return
      else this.$emit('adduser', obj)
    }
  },
  components: {
  }
}
</script>
<style scoped>
@import "../../common/login-style/login.css";
.add {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #444;
}
</style>
