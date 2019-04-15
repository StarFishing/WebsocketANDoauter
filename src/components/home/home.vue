<template>
  <div class="home">
    <div class="wrapper">
      <transition name="fade">
        <div class="eqWrapper">
          <div class="eq"
               v-for="(item, id) in items"
               :key="id">
            <span class="description">{{websockData}}</span>
            <div class="choice">
              <span @click="getchoice(id,index)"
                    :class="computeClass(id, index)"
                    v-for="(item,index) in itembutton"
                    :key="index">{{itembutton[index].description}}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="LogOut">
      <span class="userlist"
            @click="seeInformation"
            v-show="role==2">管理用户</span>
      <span class="pwd"
            @click="changePassword">修改密码</span>
      <span class="exit"
            @click="exit">退出登陆</span>
      <!-- <span class="adduser"
            @click="setadd">添加</span> -->
    </div>
    <table-information v-show="addclick&&role==2"
                       :userlist="userlist"
                       :loading="loading"></table-information>
    <adduser v-show="adduserflag"
             @adduser="addUser(obj)"></adduser>
    <change-password ref="changepassword"
                     :currentuserId="resetUserid"></change-password>
    <information-list :showList="showList"
                      :loading="loadinginformationList"
                      :datalist="datalist"></information-list>
  </div>

</template>
<script>
/*eslint-disable*/
import { get, post } from '@/api/axios.js'
// import { Toast } from 'vant'
import { mapState, mapMutations } from 'vuex'
import * as cookie from '@/api/getcookie'
import tableInformation from 'components/tableInformation/tableInformation'
import informationList from 'components/informationList/informationList'
import adduser from 'components/adduser/adduser'
import changePassword from 'components/changePassword/changePassword'
export default {
  data () {
    return {
      websockData: '',
      websock: null,
      datalist: [],//请求设备的信息
      resetUserid: '',
      loading: true,// 用于table-information的表格加载状态
      loadinginformationList: true,
      showList: false,
      addclick: false,// 默认false，测试用true
      adduserflag: false,
      items: [0, 1, 2, 3],
      currentButtonIndex: [{ 'button': -1 }, { 'button': -1 }, { 'button': -1 }, { 'button': -1 }],//维护每个按钮的状态
      itembutton: [
        { 'description': '打开', 'class': 'on' },
        { 'description': '关闭', 'class': 'off' },
        { 'description': '获取', 'class': 'put' },
        { 'description': '发送', 'class': 'post' }
      ],
      userlist: []
    }
  },
  created () {
    this.initWebSocket();
  },
  mounted: function () {
  },
  methods: {
    getchoice (id, index) {
      this.currentButtonIndex[id].button = index
      // 获取当前点击的设备，和对当前设备做的哪一步操作（index）
      if (this.itembutton[index].description === "获取") {
        get('/list').then((data) => {
          this.datalist = data.data.content
          this.showList = true
          this.loadinginformationList = false
        }).catch(() => {
          this.$Message.error({
            content: '请求出错，请稍后重试',
            duration: 1
          })
        })
        //请求数据
      }
      else {
        this.showList = false
        this.loadinginformationList = true
      }
    },
    exit () {
      let obj = { 'exituser': this.userName }
      post('/logout', obj).then((data) => {
        this.$Message.success({
          content: '退出成功',
          duration: 1
        })
        // 清除token
        this._setToken('')
        cookie.removetoken()
        this.$router.push({
          name: 'Login'
        })
      }).catch(() => {
        this.$Message.error({
          content: '请求出错',
          duration: 1
        })
      })
    },
    seeInformation () {
      // 查看用户信息时隐藏设备信息
      this.showList = false
      // 获取所有用户信息
      if (this.addclick) {
        this.addclick = false
        // 界面收起后，恢复加载状态初始值
        this.loading = true
      }
      else {
        get('/users').then((data) => {
          this.addclick = true
          // 将数据传给列表组件
          this.userlist = data.data.content
          this.loading = false
        }).catch(() => {
          this.addclick = false
          this.$Message.error({
            content: '请求出错 , 请重试',
            duration: 1
          })
        })
      }

    },
    addUser (obj) {
      post('/adduser', obj).then((data) => {
        // 更新列表组件数据
        this.data = data
        this.adduserflag = false
        this.$Message.success({
          content: '添加成功',
          duration: 1
        })
      }).catch(() => {
        this.adduserflag = false
        this.$Message.error({
          content: '添加失败，请重试',
          duration: 1
        })
      })

    },
    setadd () {
      // 关闭查看页面
      this.addclick = false
      this.adduserflag = true
    },
    changePassword () {
      this.$refs.changepassword.isshow(true)
    },
    ...mapMutations({
      _setToken: 'SET_TOKEN'    }),
    initWebSocket () { // 初始化weosocket
      const wsuri = `ws://192.168.18.169:8059/websocket`// 这个地址由后端童鞋提供
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      let actions = { "test": "12345" };
      this.websocketsend(JSON.stringify(actions));
      console.log(111)
    },
    websocketonerror () { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage (e) {
      let _this = this // 数据接收
      const redata = JSON.parse(e.data)
      console.log("接收数据  " + redata)

    },
    websocketsend (Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose (e) { // 关闭
      console.log('断开连接', e)
    }
  },
  computed: {
    computeClass () {
      return function (id, index) {
        let obj = this.itembutton[index].class
        if (this.currentButtonIndex[id].button === index) {
          obj = 'active' + ' ' + this.itembutton[index].class
        }
        return obj
      }
    },
    ...mapState([
      // 映射 this.count 为 store.state.count
      'userName',
      'role'
    ])
  },
  components: {
    tableInformation,
    adduser,
    changePassword,
    informationList
  }
}
</script>
<style scoped>
.home {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: black;
  /* background: url(../../assets/bg.jpg);
  background-size: 100% 100%; */
  background-image: linear-gradient(135deg, #f6d4d8, #b3c2db);
}
.wrapper {
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  bottom: 0;
  /* width: 100vw;
  height: 100vh; */
  overflow: hidden;
  /* background: rgba(32, 32, 35, 0.5); */
}
.eqWrapper {
  position: relative;
  display: flex;
  width: 100%;
  /* background: #eee; */
  height: 300px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  top: 10%;
  justify-content: space-around;
}
.eqWrapper .eq {
  margin-right: 30px;
  flex: 0 0 1;
  width: 260px;
  height: 260px;
  /* border: 1px solid white; */
  border-radius: 10px;
  position: relative;
  background-image: url("http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg");
  background-size: cover;
  overflow: hidden;
  box-shadow: 2px 1px 8px 0px #444;
}
.eqWrapper .eq:last-child {
  margin-right: 0;
}
.choice {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  background: #ffffff47;
  /* border-top: 1px solid black; */
  padding: 5px 10px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
}
.choice span {
  flex: 1;
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
  /* background: #2d8cf052; */
  /* border: 1px solid #2d8cf0; */
  box-shadow: 0px 1px 5px #3f3333;
  margin-right: 5px;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
}
.choice span:last-child {
  margin-right: 0;
}
.choice span:hover {
  background: #2d8cf0;
}
.active {
  background: #2d8cf0;
}
.fade {
  transition: all 0.5s;
}
.LogOut {
  position: absolute;
  right: 40px;
  top: 0;
  width: 80px;
  height: 150px;
  text-align: center;
  padding: 30px 0 0 0;
}
.LogOut .exit {
  text-align: center;
  line-height: 40px;
  /* border: 1px solid; */
  display: inline-block;
  cursor: pointer;
  background: #ff000082;
  user-select: none;
  width: 60px;
  height: 40px;
  box-shadow: 2px 1px 8px 0px #444;
  border-radius: 8px;
}
.LogOut .userlist,
.LogOut .adduser,
.LogOut .pwd {
  text-align: center;
  line-height: 40px;
  /* border: 1px solid; */
  display: inline-block;
  cursor: pointer;
  background: #2d8cf078;
  user-select: none;
  width: 60px;
  height: 40px;
  box-shadow: 2px 1px 8px 0px #444;
  border-radius: 8px;
  margin-bottom: 10px;
}
</style>
