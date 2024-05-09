<template>
  <div class="login-body">
    <img class="login-bg" v-if="loginBackgroundUrl" :src="loginBackgroundUrl" @error="handleE" alt="" />
    <img class="login-bg" v-else :src="img" alt="" />
    <div class="login">
      <!-- title -->
      <div class="login-title">
        山港一体化可视平台
        <!--语言切换-->
        <!-- <div class="language">
          <el-select
            v-model="locale"
            :popper-append-to-body="false"
            popper-class="lang-select"
            @change="handleLangChange"
          >
            <el-option label="简体中文" value="zh" />
            <el-option label="English" value="en" />
          </el-select>
        </div> -->
      </div>
      <!-- login -->
      <el-form :model="ruleForm" status-icon ref="loginForm" class="demo-ruleForm">
        <!-- username -->
        <el-form-item prop="username" class="user">
          <img class="usernameImg" src="../../assets/login/longinUsername.png" alt />
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" class="username"
            :placeholder="$t('login.accountPrompt')"></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password" class="pwd">
          <img class="passwordImg" src="../../assets/login/longinPassword.png" alt />
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" class="password"
            @keydown.native.enter="submitForm('loginForm')" :placeholder="$t('login.psdPrompt')"></el-input>
        </el-form-item>
        <!-- //验证码 -->
        <div class="verify-form">
          <el-input type="text" autocomplete="off" class="input-verify" :placeholder="$t('login.inputVerifyCode')"
            v-model="ruleForm.verifyCode"></el-input>
          <!-- <div class="verify">zzzz</div> -->
          <img :src="verifyImg" alt class="verify" @click="changeVerifyImg" />
        </div>

        <!-- <el-checkbox-group > -->
        <el-form-item class="login-checkbox">
          <el-checkbox :label="$t('login.showMap')" @change="isRememberPwd" v-model="showimg"
            class="rememberPwd-btn"></el-checkbox>
        </el-form-item>
        <div class="agencyChecked">
          <el-checkbox v-model="agencyChecked" @change="agencyCheckedFn">{{ $t('login.proxy') }}</el-checkbox>
        </div>
        <div class="button-form">
          <el-button type="primary" @click="resetForm('loginForm')" class="reset_btn">{{ $t('login.reset') }}
          </el-button>
          <el-button type="primary" @click="submitForm('loginForm')" class="login_btn">{{ $t('login.login') }}
          </el-button>
          <!-- <el-button type="primary" @click="exitFlag=true" class="logout_btn">退出</el-button> -->
        </div>
      </el-form>

      <!-- <div class="senior-set-btn-form">
  <div class="senior-set-btn" @click="flag=!flag">
    <span>高级设置</span>
    <i class="el-icon-arrow-up" v-if="flag"></i>
    <i class="el-icon-arrow-down" v-if="!flag"></i>
  </div>
      </div>-->
    </div>
    <el-form style="display: flex; justify-content: space-between; width: 400px; margin: 0 auto">
      <div class="senior-set" v-if="flag" style="
          width: 400px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          align-self: center;
          box-sizing: border-box;
          margin-top: 9px;
        ">
        <!-- <el-input type="text" autocomplete="off" class="serverAdd" placeholder="请输入服务器地址" v-model="ruleForm.serverAdd"></el-input>
        <el-input type="text" autocomplete="off" class="port" placeholder="请输入端口" v-model="ruleForm.port" style="width:160px"></el-input>-->
        <el-input type="text" autocomplete="off" class="serverAdd" :placeholder="$t('login.inputServerAdd')"
          v-model="ruleForm.serverAdd"></el-input>
        <el-input type="text" autocomplete="off" class="port" :placeholder="$t('login.inputPort')"
          v-model="ruleForm.port" style="width: 160px"></el-input>
      </div>
    </el-form>
    <!-- <div class="exit" v-if="exitFlag">

  <div class="prompt">
    <span>提示</span>
    <i class="el-icon-close" @click="exitFlag=false"></i>
  </div>
  <p class="ifExit">是否退出客户端？</p>
  <div class="exit-btn">
    <button class="sure">确定</button>
    <button class="cancel" @click="exitFlag=false">取消</button>
  </div>
    </div>-->
    <!-- 下载 -->
    <div class="downloadLogin">
      <span class="fileDownload">
        <img src="@/assets/login/fileDownload.png" alt />
      </span>
      <el-dropdown trigger="click" class="dropdownClick" :hide-on-click="false">
        <span class="el-dropdown-linkLogin">
          {{ $t('login.download') }}
          <!-- <i class="el-icon-caret-top"></i> -->
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="dropdownMenu">
          <div style="padding: 0 12px">
            <div class="popupDownload">
              <div class="plugInDownload">
                <img class="plugInImg" src="../../assets/login/client.png" alt />
                <span style class="topDownload">{{ $t('login.client') }}</span>
                <span class="rightDownload" @click="downloadClick">{{ $t('login.download') }}</span>
              </div>
              <div class="plugInDownload">
                <img class="plugInImg" src="../../assets/login/downDocument.png" alt />
                <span class="topDownload" :title="$t('login.operaDoc')">{{ $t('login.operaDoc') }}</span>
                <span class="rightDownload" @click="downloadClickCa">{{ $t('login.download') }}</span>
              </div>
              <div class="plugInDownload">
                <img class="plugInImg" src="../../assets/login/downApp.png" alt />
                <span class="topDownload">APP</span>
                <el-popover placement="left" :title="$t('worktable.APP')" popper-class="code-popover" width="250"
                  trigger="click">
                  <span slot="reference" class="rightDownload">{{ $t('patrol.check') }}</span>
                  <img class="codeImg" src="@/views/mini/pages/myTask/img/android.png" alt="" />
                </el-popover>
                <!-- <span class="rightDownload" @click="downloadClickApp">{{ $t('login.download') }}</span> -->
              </div>
            </div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { download } from '@/utils/download'
import CryptoJS from 'crypto-js'
import { getClientNonce } from '@/utils/common/getClientNonce'
import { lStorage, sStorage } from '@/utils/common/store'
import { crypto } from '@/utils/crypto'
import {
  selectMenus,
  getFlavor,
  selectUserPermissions,
  selectMenuPerms,
  getOrganizationSubType,
  xgIpInRedis,
  getOrganizationInfo,
  getSysPlatType,
  getProductInfo,
} from '@/utils/api.js'
import { generateMixed } from '@/utils/mutil'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      locale: localStorage.getItem('locale') || 'zh',
      img: require('@/assets/login/login-background.png'),
      loginBackgroundUrl: '',
      loginTitle: '',
      menus: [],
      userId: this.$route.query.userId,
      verifyImg: '',
      //退出窗口
      exitFlag: false,
      //高级设置按钮
      flag: false,
      flag_pwd: true,
      showimg: JSON.parse(localStorage.getItem('showimg')),
      value: '',
      ruleForm: {
        username: JSON.parse(localStorage.getItem('userInfo'))
          ? JSON.parse(localStorage.getItem('userInfo')).username
          : '',
        password: JSON.parse(localStorage.getItem('userInfo'))
          ? JSON.parse(localStorage.getItem('userInfo')).password
          : '',
        // serverAdd:'',
        // port:''
        serverAdd: sessionStorage.getItem('serveadd') || '',
        port: sessionStorage.getItem('port') || '',
        verifyCode: '',
        // age: ''
      },
      // rules: {
      //   username: [
      //     { validator: validateUsername, trigger: 'blur' }
      //   ],
      //   password: [
      //     { validator: validatePassword, trigger: 'blur' }
      //   ],
      // },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      permCodeList: [],
      systemName: '',
      agencyChecked: false,
      loginType: false,
    }
  },
  created() {
    console.log('created')
    this.$loading({}).close()
    // 回车
    localStorage.setItem('locale', this.locale)
    this.$nextTick(() => {
      this.$i18n.locale = this.locale
      let params = {
        locale: this.locale,
      }
      if (window.webkitProc) {
        window.webkitProc('web_languageSwitch', JSON.stringify(params))
      }
    })
  },
  computed: {
    ...mapState({
      clientNonce: state => state.auth.clientNonce
    }),
  },
  watch: {
    // 监听语言切换
    '$i18n.locale'() {
      this.locale = localStorage.getItem('locale')
      this.$i18n.locale = this.locale
    },
  },
  mounted() {
    console.log('mounted')
    if (localStorage.getItem('showimg') != null) {
      localStorage.setItem('showimg', this.showimg)
    }
    this.agencyChecked = JSON.parse(localStorage.getItem('agencyChecked'))
      ? JSON.parse(localStorage.getItem('agencyChecked'))
      : false
    // this.$api.getSysInfo({ systemType: 2 }).then((res) => {
    //   if (res.resultCode === 0) {
    //     this.systemName = res.systemName
    //     document.title = res.systemName
    //     this.loginBackgroundUrl = res.loginBackgroundUrl
    //   }
    // })
    this.getFlavors()
    this.changeVerifyImg()
    let cuType = '4'
    // if (window.webkitProc) {
    //   cuType = '4'
    // } else {
    //   cuType = '5'
    // }
    const clientNonces = getClientNonce(4)
    sessionStorage.setItem('cuType', cuType)
    this.$store.dispatch('auth/setClientNonce', clientNonces)
    if (this.userId) {
      this.$fetch('/uas/v1/api/scs/screen/user/info', {
        userId: this.userId,
      }).then((res) => {
        if (res.resultCode === 0) {
          sessionStorage.setItem('account', res.loginName)
          sessionStorage.setItem('password', res.password)
          setTimeout(() => {
            this.$api
              .login({
                captcha: '',
              })
              .then((res) => {
                console.log(res)
                if (res.resultCode == 0) {
                  this.redictIndex()
                  sessionStorage.setItem('username', res.userInfo.userName)
                  sessionStorage.setItem('account', res.userInfo.account)
                } else {
                  this.$notify({
                    title: this.$t('login.waring'),
                    message: res.data.resultDesc,
                    type: 'warning',
                  })
                }
              })
          }, 200)
        }
      })
    }
  },
  methods: {
    ...mapActions(['set_global_platType', 'set_global_type']),
    handleLangChange(val) {
      localStorage.setItem('locale', val)
      this.$i18n.locale = val
      let params = {
        locale: val,
      }
      if (window.webkitProc) {
        window.webkitProc('web_languageSwitch', JSON.stringify(params))
      }
    },
    handleE() {
      this.loginBackgroundUrl = this.img
    },
    // 客户端基座下载
    downloadClick() {
      window.location.href = location.origin + '/download/acs_client_1.5.2.8_unified_Setup_Win32.exe'
    },
    // APP下载
    // downloadClickApp() {
    //   window.location.href = location.origin + '/download/park_2.11.1_MCU_A0011_20220905.apk'
    // },
    // 操作文档下载
    downloadClickCa() {
      window.location.href = location.origin + '/download/《综合安防智慧园区产品》客户端操作手册.docx'
    },
    agencyCheckedFn(value) {
      localStorage.setItem('agencyChecked', value)
    },
    changeVerifyImg() {
      this.$api.captcha({ api: '/api/user/login' }).then((res) => {
        this.verifyImg = res.captchaData
      })
    },
    // 获取菜单
    // 获取菜单
    async getMenuList() {
      const res = await selectMenus({})
      if (res.resultCode === 0) {
        sStorage.set('menuList', res.menuList)
        this.menus = res.menuList
      } else if (res.resultCode === 100021) {
        this.$api.logout({}).then(() => {
          this.refreshPage()
        })
      }
    },
    refreshPage() {
      sStorage.clear()
      this.$store.dispatch('auth/setClientNonce', '')
      this.$store.dispatch('auth/setRefreshToken', '')
      this.$store.dispatch('auth/setAccessToken', '')
      window.location.reload()
    },
    //用户权限列表
    async getUserPermissions() {
      await selectUserPermissions({}).then(res => {
        if (res.resultCode == 0) {
          sStorage.set('userPermList', res.permList)
        }
      })
    },
    // 获取菜单权限列表
    async getMenuPermsList() {
      await selectMenuPerms({}).then((res) => {
        if (res.resultCode === 0) {
          console.log('res.menuPermList', res)
          for (let i = 0; i < res.menuPermList.length; i++) {
            if (res.menuPermList[i].type == 12) {
              this.loginType = true
            }
          }
          if (this.loginType == false) {
            this.$notify({
              title: this.$t('login.deskAcc'),
              message: this.$t('login.waring'),
              type: 'warning',
            })
          }
        }
      })
    },
    // 获取平台
    async getPlatType() {
      // 获取对接的是1800还是3800
      let res = await this.$api.getSysPlatType({})
      if (res && res.resultCode == 0) {
        // 设为全局平台值
        if (typeof res.accessPlat !== 'undefined') this.set_global_platType(res.accessPlat)
      }
      // 获取产品类型是AIS盒子还是spc系列
      let proInfo = await getProductInfo({})
      if (proInfo && proInfo.resultCode == 0) {
        // 设为全局盒子类型值
        // 0 : AIS200 1： AVS500, 2: SPC系列
        if (typeof proInfo.productType !== 'undefined') {
          this.set_global_type(proInfo.productType)
        } else this.$message('获取产品类型数据失败')
      } else this.$message('获取产品类型数据失败')
    },
    //记住密码
    isRememberPwd(value) {
      console.log(value)
      localStorage.setItem('showimg', value)
      // console.log('isRememberPwd', value);
      // localStorage.setItem("showimg", this.showimg)
      // this.flag_pwd = !this.flag_pwd;
    },
    // 初始化获取水印是否开启
    //     async getWatermarkList() {
    //   const res = await getContentWatermarkInfo({})
    //   if (res.resultCode !== 0 || !res.watermarkInfo) return
    //   this.getCanvasInfo(res.watermarkInfo)
    // },
    //跳转客户端登录方法
    async redictIndex() {
      // await this.getPlatType()
      await this.getMenuList()

      //用户权限列表
      await this.getUserPermissions()

      // await this.getWatermarkList()
      this.$store.commit('menu/set_options')
      this.$store.commit('menu/clear_cached_views')
      this.$router.push({
        path: '/realtime-play',
      })
    },
    submitForm(formName) {
      console.log('123')
      if (!this.ruleForm.username) {
        this.$notify({
          title: this.$t('login.waring'),
          message: this.$t('login.needUsername'),
          type: 'warning',
        })
        return
      }
      if (!this.ruleForm.password) {
        this.$notify({
          title: this.$t('login.waring'),
          message: this.$t('login.needPassword'),
          type: 'warning',
        })
        return
      }
      //服务器地址
      sessionStorage.setItem('serveadd', this.ruleForm.serverAdd)
      sessionStorage.setItem('port', this.ruleForm.port)

      //记住密码
      if (this.flag_pwd) {
        localStorage.setItem('userInfo', JSON.stringify(this.ruleForm))
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { username, password, agentType, captcha } = this.ruleForm
          this.userLogin({
            username,
            password,
            agentType: this.agencyChecked ? 1 : 0, //0-内网，1-公网
            captcha: this.ruleForm.verifyCode,
          })
          /*
            login({
              captcha: this.ruleForm.verifyCode,
            }).then((res) => {
              if (res.resultCode == 0) {
                this.redictIndex(res);
                xgIpInRedis({
                  accessId: res.userInfo.userId,
                  agentType: this.agencyChecked ? 1 : 0,
                })
                sessionStorage.setItem("username", res.userInfo.userName);
                sessionStorage.setItem("account", res.userInfo.account);
                sessionStorage.setItem(
                    "userInfoResult",
                    JSON.stringify(res.userInfo)
                );
                sessionStorage.setItem(
                    "userInfoResult",
                    JSON.stringify(res.userInfo)
                );
                //获取登录时间
                sessionStorage.setItem("loginTime", getFormatDate(new Date()));
                // getOrganizationSubType({
                //   organizationId: res.userInfo.organizationId,
                // }).then((res1) => {
                //   sessionStorage.setItem("subType", JSON.stringify(res1.subType));
                // })
                // console.log("111",JSON.stringify(res.userInfo))
              } else {
                this.$notify({
                  title: "警告",
                  message: res.data.resultDesc,
                  type: "warning",
                });
              }
            });
            */
        }
      })
    },
    // 用户登录
    userLogin(data) {
      sessionStorage.setItem('account', data.username)
      this.$store
        .dispatch('user/Login', data)
        .then(async res => {
          const {
            resultCode,
            userInfo,
            accountStatus,
            accessToken,
            refreshToken,
            sessionId,
            licenseExpired,
            privacyAgreed,
            lastLoginHistoryInfo,
            waitOperateLimit,
            heartBeatInterval,
            version
          } = res
          if (resultCode == 0) {
            console.log(1);
            this.$store.dispatch('auth/setClientNonce', sessionId)
            console.log(2);
            this.$store.dispatch('auth/setRefreshToken', refreshToken)
            console.log(3);
            this.$store.dispatch('auth/setAccessToken', accessToken)
            console.log(4);
            this.$store.dispatch('user/setUserInfo', userInfo)
            sessionStorage.setItem('clientNonce', sessionId)
            console.log(5);
            sessionStorage.setItem('refreshToken', refreshToken)
            sessionStorage.setItem('token', accessToken)
            sessionStorage.setItem('userId', userInfo.userId)
            sessionStorage.setItem('username', userInfo.userName)
            sessionStorage.setItem('organizationId', userInfo.organizationId)
            sessionStorage.setItem('belongTenantId', userInfo.belongTenantId)
            console.log(6);
            if (userInfo.avatarFileId) sessionStorage.setItem('avatarFileId', userInfo.avatarFileId)

            //过期时间
            // this.$store.commit('init_time/SET_EXPIRETIME', res.expireTime)
            //心跳保活周期
            // this.$store.commit(
            //   'init_time/SET_HEARTBEATINT',
            //   res.heartBeatInterval
            // )
            // sessionStorage.setItem(
            //   'pwdStrengthScore',
            //   this.checkPwdStrength(data.password)
            // )
            //修改密码专用
            this.$store.state.modifyToken = accessToken
            this.redictIndex()
            console.log(7);
            // 账户锁定
            if (userInfo.isLocked && userInfo.isLocked == 1) {
              this.$alert(this.$t('login.accountLocked'), this.$t('login.waring'), {
                confirmButtonText: this.$t('public.confirm'),
                type: 'warning'
              })
              return
            }

            if (userInfo.firstLogin == 1) {
              sStorage.set('firstLogin', true)
              if (this.modifyOnFirstLogin == 1 && accountStatus.remindModifyPwd == 2) {
                this.$message({
                  type: 'error',
                  message: this.$t('changePwd.firstLoginTips'),
                  duration: 5 * 1000
                })
                this.changeVerifyImg('changePwd')
                this.frontToBack()
                return
              }
            } else if (res.userInfo.firstLogin == 0) {
              sStorage.set('firstLogin', false)
            }

            if (accountStatus) {
              if (accountStatus.remindModifyPwd != 0) {
                sStorage.set('remindModifyPwd', accountStatus.remindModifyPwd)
                sStorage.set('pwdLeftDays', accountStatus.pwdLeftDays)
              }

              // 密码过期
              if (accountStatus.remindModifyPwd == 2) {
                this.$message({
                  type: 'error',
                  message: this.$t('changePwd.detectionMustChangePwdAlert')
                })
                this.changeVerifyImg('changePwd')
                this.frontToBack()
                return
              }
            }

          } else {
            this.changeVerifyImg()
          }
        })
        .catch(error => {
          if (error.response) {
            const { resultCode, resultDesc } = error.response.data
            if (resultCode == 100002) {
              this.$alert(this.$t('login.userNameOrPwdWrong'), this.$t('login.waring'), {
                confirmButtonText: this.$t('public.confirm'),
                type: 'warning'
              })
            } else {
              this.$alert(`${resultDesc}`, this.$t('login.waring'), {
                confirmButtonText: this.$t('public.confirm'),
                type: 'warning'
              })
            }
          }
          this.changeVerifyImg()
        })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.username = ''
      this.ruleForm.password = ''
      this.ruleForm.serverAdd = ''
      this.ruleForm.port = ''
      this.ruleForm.verifyCode = ''
    },
    getFlavors() {
      // getFlavor({}).then((res) => {
      //   console.log(res)
      //   this.loginTitle = res.flavorName
      // })
    },
  },
}
</script>
<style lang="scss" scoped>
html {
  width: 100%;
  height: 100%;
}

body {
  background: none;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}

// 下载
.downloadLogin {
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #ffffff;
  position: fixed;
  cursor: pointer;
  right: 38px;
  top: 32px;
  text-align: center;
}

.el-dropdown-linkLogin {
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  opacity: 1;
}

.fileDownload {
  padding-right: 5px;
}

.dropdownClick {
  padding-top: 1px;
}

.dropdownMenu {
  background: url('../../assets/login/popupDownload.png') no-repeat;
  background-size: 100% 100%;
}

.el-dropdown-menu__item {
  background-color: transparent;
}

.el-dropdown-menu {
  border: 0px solid #ebeef5;
}

.popupDownload {
  pointer-events: auto;
  // width: 450px;
  // min-height: 90%;
  // height: 89.8vh;
  // position: absolute;
  // right: 21px;
  // margin-top: 16px;
  width: 100%;
}

.plugInDownload {
  margin: 16px 0;
  position: relative;
  width: 280px;
  height: 72px;
  overflow: hidden;
  background-image: url('../../assets/login/downBackground.png');
}

.plugInImg {
  width: 52px;
  position: absolute;
  top: 11px;
  left: 16px;
}

.topDownload {
  position: absolute;
  left: 80px;
  top: 35%;
  font-size: 16px;
  color: #fff;
  opacity: 1;
  width: 140px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  /*文字超出宽度则显示ellipsis省略号*/
  text-overflow: ellipsis;
}

.bottomDownload {
  position: absolute;
  left: 80px;
  top: 42px;
  font-size: 14px;
  color: #ffffff;
  opacity: 0.8;
}

.rightDownload {
  // pointer-events: none;
  opacity: 1;
  z-index: 5000 !important;
  min-width: 48px;
  height: 24px;
  background: rgba(180, 255, 224, 0.1);
  border-radius: 2px;
  line-height: 24px;
  text-align: center;
  position: absolute;
  top: 35%;
  left: 202px;
  color: #b4ffe0;
  font-size: 14px;
  cursor: pointer;
}

.login-body {
  width: 100%;
  height: 100vh;
  font-weight: 400;
  font-size: 14px;
  position: relative;
  box-sizing: border-box;

  .login-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}

.login {
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-title {
  text-align: justify;
  text-align-last: justify;
  box-sizing: border-box;
  /* width:429px; */
  //height: 36px;
  //line-height: 36px;
  font-size: 30px;
  font-weight: 400;
  margin: 0 0 0px 0;
  vertical-align: top;
  font-family: Microsoft YaHei;
  color: #00dcfd;
  text-shadow: 0px 8px 12px rgba(3, 111, 107, 0.78);
  opacity: 1;
  position: relative;

  //语言处理
  .language {
    color: #ffffff;
    position: absolute;
    right: -120px;
    top: -10px;

    ::v-deep.el-input__inner {
      width: 110px;
      height: 30px;
      font-size: 12px;
      border: none;
      box-shadow: 0 0 0 0 transparent !important;
    }
  }
}

.login .el-form {
  /* width: 500px;
      height: 350px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: white;
      margin: 200px auto;
      margin-bottom: 0; */
}

.login div.el-form-item__content {
  margin-left: 0px !important;
}

.login button.login_btn:hover,
button.reset_btn:hover,
button.logout_btn:hover {
  background: #32d5ed;
  color: #000000;
}

.login .senior-set-btn-form {
  width: 400px;
  height: 14px;
  position: relative;
}

.login .senior-set-btn {
  cursor: pointer;
  position: absolute;
  right: 0;
}

.login .senior-set {
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-top: 9px;
}

.login div.port.el-input {
  width: 160px;
  /* margin-left: 20px; */
}

::v-deep.login div.port input.el-input__inner {
  width: 160px;
  height: 48px;
  font-size: 14px;
}

::v-deep.login div.serverAdd input.el-input__inner {
  width: 220px;
  height: 48px;
  background-color: transparent !important;
  border: 1px solid rgba(54, 229, 255, 1);
  box-shadow: 1px 1px 5px 1px #fff020 !important;
  font-size: 14px;
  color: rgba(217, 217, 217, 1);
}

div.user,
div.pwd {
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  margin-bottom: 31px;
}

/* div.pwd{
        margin-top:31px;
    } */
div.username,
div.password {
  width: 400px;
  height: 48px;
  border-radius: 4px;
}

::v-deep.login input.el-input__inner {
  height: 48px;
  background-color: rgba(21, 41, 81, 0.6) !important;
  border: 1px solid #00dcfd;
  box-shadow: 0px 0px 3px 1px #00e8fd !important;
  font-size: 14px;
  color: #ffffff;
}

::v-deep.login .username input.el-input__inner {
  padding-left: 40px;
}

::v-deep.login .password input.el-input__inner {
  padding-left: 40px;
}

.passwordImg,
.usernameImg {
  position: absolute;
  width: 38px;
  top: 5px;
  left: 5px;
  z-index: 20;
}

.login .verify-form {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 400px;
}

img.verify {
  width: 162px;
  height: 48px;
  border-radius: 2px;
  cursor: pointer;
}

.login .input-verify {
  width: 220px;
}

.login .button-form {
  /* width: 400px; */
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
}

.login div.login-checkbox {
  margin: 23px 0;
  // margin-top: 0;
  align-self: flex-start;
}

.login label.el-checkbox.autoLogin-btn {
  margin-left: 107px;
}

.login div.login-checkbox .el-checkbox-group,
div.login-checkbox label.el-checkbox {
  height: 19px;
  line-height: 19px;
  margin: 0;
  color: #ffffff;
}

.login ::v-deep.el-checkbox__label {
  color: #ffffff;
}

.login div.login-checkbox span.el-checkbox__label,
div.senior-set-btn-form span,
div.senior-set-btn-form i {
  color: #ffffff;
}

div.exit {
  width: 410px;
  height: 200px;
  background: rgba(7, 61, 113, 1);
  border-radius: 4px;
  position: absolute;
  top: 408px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2;

  color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 13px 13px 14px;
  box-sizing: border-box;
}

div.exit button.sure,
div.exit button.cancel {
  width: 80px;
  height: 40px;
  background: rgba(6, 129, 248, 1);
  border-radius: 4px;
  border: 0;
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;
}

div.exit .prompt {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

div.exit p.ifExit {
  width: 123px;
  height: 16px;
  line-height: 16px;

  text-align: justify;
  text-align-last: justify;
  box-sizing: border-box;
  margin: 50px 0;
}

div.exit button.cancel {
  background: rgba(58, 120, 180, 1);
  margin-left: 83px;
}

.login .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #ffffff;
}

.login .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #36e5ff;
  border-color: #36e5ff;
}

.login .rememberPwd-btn {
  position: absolute;
  top: 0px;
  left: 320px;
}

.login .rememberPwd-btn span.el-checkbox__inner,
.login .autoLogin-btn span.el-checkbox__inner {
  background-color: transparent;
  border-color: #36e5ff;
}

.login i.el-icon-close {
  cursor: pointer;
}

.login .el-form {
  /* width: 500px;
  height: 350px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: white;
  margin: 200px auto;
  margin-bottom: 0; */
}

.login div.el-form-item__content {
  margin-left: 0px !important;
}

.login button.login_btn,
.login button.logout_btn,
.login button.reset_btn {
  background: #00dcfd;
  border: 1px solid #7d7d7d;
  border-radius: 4px;
  color: #ffffff;
  width: 100px;
  height: 48px;
}

.login button.reset_btn {
  background: rgba(13, 15, 16, 0.6);
}

.login .senior-set-btn-form {
  width: 400px;
  height: 14px;
  position: relative;
}

.login .senior-set-btn {
  cursor: pointer;
  /* width: 100px; */
  position: absolute;
  /* bottom:10px; */
  right: 0;
}

.login .senior-set {
  width: 400px;
  /* height: 100px; */
  /* background:white; */
  /* margin: 2px auto; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-top: 9px;
}

div.port input.el-input__inner {
  width: 160px;
  height: 48px;
  background-color: transparent !important;
  border: 1px solid rgba(54, 229, 255, 1);
  box-shadow: 1px 1px 5px 1px #36e5ff !important;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(217, 217, 217, 1);
}

div.serverAdd input.el-input__inner {
  width: 220px;
  height: 48px;
  background-color: transparent !important;
  border: 1px solid rgba(54, 229, 255, 1);
  box-shadow: 1px 1px 5px 1px #36e5ff !important;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(217, 217, 217, 1);
}

.login input.el-input__inner {
  height: 48px;
  background-color: transparent;
  border: 1px solid rgba(54, 229, 255, 1);
  box-shadow: 1px 1px 5px 1px #36e5ff;
  font-size: 14px;
  color: rgba(217, 217, 217, 1);
}

.login label.el-checkbox.autoLogin-btn {
  margin-left: 107px;
}

.login div.login-checkbox .el-checkbox-group,
div.login-checkbox label.el-checkbox {
  height: 19px;
  line-height: 19px;
  margin: 0;
  color: #36e5ff;
}

.login div.login-checkbox span.el-checkbox__label,
div.senior-set-btn-form span,
div.senior-set-btn-form i {
  color: #ffffff;
}

.login .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #ffffff;
}

.login .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #36e5ff;
  border-color: #36e5ff;
}

.login .rememberPwd-btn span.el-checkbox__inner,
.login .autoLogin-btn span.el-checkbox__inner {
  background-color: transparent;
  border-color: #36e5ff;
}

.login .demo-ruleForm {
  width: 520px;
  height: 400px;
  padding-top: 50px;
  background-image: url('../../assets/login/login_demo_ruleForm.png');
  filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
}

.login .agencyChecked {
  position: absolute;
  top: 315px;
  left: 98px;
}
</style>

<style lang="scss">
.code-popover {
  background: #0b435b;
  border: 1px solid #14678b;

  .el-popover__title {
    color: #fff;
  }

  .codeImg {
    width: 210px;
  }
}
</style>
