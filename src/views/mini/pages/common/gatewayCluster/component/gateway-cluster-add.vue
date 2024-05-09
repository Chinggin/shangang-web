<template>
  <div class="addGatewayClusterDialog">
    <el-dialog :title="operation
      ? $t('gatewayCluster.addGatewayCluster')
      : $t('gatewayCluster.modifyGatewayCluster')
      " :visible.sync="$parent.dialogFormVisible" top="10vh" width="1000px" :draggable='false' @closed="dialogClosed"
      @open="dialogOpen">
      <el-form ref="form" :model="form" :rules="rules" :validate-on-rule-change="false"
        :label-width="locale == 'en' ? '220px' : '145px'" label-position="left">
        <el-form-item :label="$t('gatewayCluster.gatewayName') + '：'" prop="gatewayName">
          <el-input v-model="form.gatewayName" auto-complete="off" :placeholder="$t('gatewayCluster.gatewayNamePrompt')"
            clearable />
        </el-form-item>

        <el-form-item :label="$t('gatewayCluster.accessPlatType') + '：'" prop="accessPlatType">
          <el-cascader :options="$parent.options" :placeholder="$t('gatewayCluster.accessPlatTypePrompt')"
            :props="{ expandTrigger: 'hover' }" clearable :show-all-levels="false" v-model="form.accessPlatType"
            :popper-append-to-body="false" :disabled="!operation" @change="changePlatType"></el-cascader>
        </el-form-item>

        <el-form-item :label="$t('gatewayCluster.associateServer') + '：'">
          <el-input ref="serverInput" v-model="form.associateServer" @focus="foucsServer"
            :placeholder="$t('gatewayCluster.clickToAssociate')" :disabled="!operation || associateServerLoading" />
        </el-form-item>

        <el-form-item :label="$t('gatewayCluster.gatewayGroupName') + '：'" prop="gatewayGroup">
          <el-input v-model="form.gatewayGroup" auto-complete="off"
            :placeholder="$t('gatewayCluster.associateAutoFill')" clearable disabled v-if="resetItem" />
        </el-form-item>

        <el-form-item :label="$t('gatewayCluster.gatewayIp') + '：'" prop="gatewayIp">
          <el-input v-model="form.gatewayIp" auto-complete="off" :placeholder="$t('gatewayCluster.associateAutoFill')"
            clearable disabled v-if="resetItem" />
        </el-form-item>

        <el-form-item :label="$t('gatewayCluster.nodeContainerType') + '：'" prop="nodeContainerType">
          <el-select clearable :popper-append-to-body="false" v-model="form.nodeContainerType"
            :placeholder="$t('gatewayCluster.nodeContainerTypePrompt')" :disabled="!operation">
            <el-option v-for="(item, index) in this.nodeContainerTypes" :key="index" :label="item.name"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('gatewayCluster.nodeAvailableType') + '：'" prop="nodeAvailableType" v-if="ifShowAva">
          <el-select clearable :popper-append-to-body="false" v-model="form.nodeAvailableType"
            :placeholder="$t('gatewayCluster.nodeAvailableTypePrompt')" :disabled="!operation" @change="changeAva">
            <el-option v-for="(item, index) in $parent.nodeAvailableTypeList" :key="index" :label="item.name"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('gatewayCluster.virtualIp') + '：'" prop="virtualIp" key="virtualIp"
          v-if="form.nodeAvailableType == 1">
          <el-input v-model="form.virtualIp" auto-complete="off" :placeholder="$t('gatewayCluster.virtualIpPrompt')"
            clearable :disabled="!operation" />
        </el-form-item>

        <el-form-item :label="$t('gatewayCluster.gatewayNatIp') + '：'" key="gatewayNatIp" prop="gatewayNatIp"
          v-if="form.nodeAvailableType == 1">
          <el-input v-model="form.gatewayNatIp" auto-complete="off"
            :placeholder="$t('gatewayCluster.gatewayNatIpPrompt')" clearable :disabled="!operation" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogClosed">{{ $t('public.cancel') }}</el-button>
          <el-button type="primary" :loading="$parent.maskloading" @click="submitForm">
            {{ $t('public.confirm') }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- //服务器关联 -->
    <el-dialog v-if="showServer" :title="$t('gatewayCluster.associateServer')" v-model="showServer" top="10vh"
      width="1150px" :close-on-click-modal="false" :modal="false" class="serverDialog" draggable>
      <server-choose :operation="operation" :form="form" :gatewayGroup="gatewayGroup" :platGroupName="platGroupName"
        @getChooseServer="getServer" v-if="showServerChoose"></server-choose>
      <template #footer>
        <span class="dialog-footer" style="text-align: center">
          <el-button @click="dialogClosed1">{{ $t('public.cancel') }}</el-button>
          <el-button type="primary" @click="submitForm1">{{ $t('public.confirm') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ServerChoose from './server-choose'

export default {
  props: {
    operation: {
      type: Boolean,
      default: true
    }
  },
  components: {
    ServerChoose
  },
  data() {
    return {
      locale: localStorage.getItem('locale'),
      form: {
        gatewayName: '',
        accessPlatType: '',
        gatewayGroup: '',
        gatewayGroup: '',
        gatewayIp: '',
        gatewayNatIp: '',
        nodeContainerType: 1,
        nodeAvailableType: '',

        associateServer: '',
        virtualIp: ''
      },

      rules: {},

      //视频云
      upLoadFile: '',
      showServer: false,
      choosedServer: '',
      resetItem: true,
      showServerChoose: true,

      ifShowAva: false,
      platGroupName: '',
      nodeContainerTypes: this.$parent.nodeContainerTypeList,
      associateServerLoading: false
    }
  },

  mounted() {
    this.setFormRules()
  },

  computed: {
    itemDisabled() {
      return this.form.associateServer != ''
    }
  },

  methods: {
    changeAva(val) {
      if (val == 1) {
        this.rules.virtualIp[0].required = true
      } else {
        this.rules.virtualIp[0].required = false
      }
    },
    dialogOpen() {
      if (this.$refs.form) {
        this.showServerChoose = false
        this.ifShowAva = false
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.form.associateServer = ''
          this.form.nodeAvailableType = ''
          this.choosedServer = ''
          this.nodeContainerTypes = this.$parent.nodeContainerTypeList
          //虚拟IP清缓存
          this.form.virtualIp = ''

          this.showServerChoose = true
        })
      }
      this.$nextTick(() => {

        if (!this.operation) {
          this.form = this.$parent.dataForm

          for (let i = 0; i < this.$parent.accessPlatTypeList.length; i++) {
            for (let j = 0; j < this.$parent.accessPlatTypeList[i].platTypeList.length; j++) {
              if (
                this.form.accessPlatType[1] ==
                this.$parent.accessPlatTypeList[i].platTypeList[j].platTypeCode
              ) {
                if (
                  this.$parent.accessPlatTypeList[i].platTypeList[j].availableType == 2 &&
                  this.form.nodeAvailableType != 0
                ) {
                  this.ifShowAva = true
                } else {
                  this.ifShowAva = false
                }
              }
            }
          }
        }
      })
    },

    dialogClosed() {
      this.$parent.dialogFormVisible = false
      this.$parent.maskloading = false
    },

    dialogClosed1() {
      this.showServer = false
    },

    setFormRules() {
      var regIP =
        /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/
      var regDomain = /^([0-9a-zA-Z-]{1,}\.)+([a-zA-Z]{2,})$/
      var validateGatewayIp = (rule, value, callback) => {
        if (!this.form.gatewayIp) {
          callback(new Error(this.$t('gatewayCluster.clickToAssociatePrompt')))
        } else if (regIP.test(this.form.gatewayIp) || regDomain.test(this.form.gatewayIp)) {
          callback()
        } else {
          callback(new Error(this.$t('gatewayCluster.gatewayIpFormatPrompt')))
        }
      }

      const regex = /^[\u4e00-\u9fa5a-zA-Z0-9][\u4e00-\u9fa5a-zA-Z0-9.·\-_\s]*$/u
      // 验证名称
      let validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('gatewayCluster.gatewayNamePrompt')))
        } else {
          if (!regex.test(value)) {
            callback(new Error(this.$t('public.nameError4')))
          }
          callback()
        }
      }

      this.rules = {
        gatewayName: [
          {
            required: true,
            validator: validateUsername,
            trigger: 'change'
          },
          {
            max: 256,
            message: this.$t('public.validate.charLimit', { num: 256 }),
            trigger: 'change'
          }
        ],
        accessPlatType: [
          {
            required: true,
            message: this.$t('gatewayCluster.accessPlatTypePrompt'),
            trigger: 'change'
          }
        ],
        gatewayGroup: [
          {
            required: true,
            message: this.$t('gatewayCluster.clickToAssociatePrompt'),
            trigger: 'change'
          },
          {
            max: 16,
            message: this.$t('public.validate.charLimit', { num: 16 }),
            trigger: 'change'
          }
        ],
        gatewayIp: [
          {
            required: true,
            message: this.$t('gatewayCluster.clickToAssociatePrompt'),
            trigger: 'change'
          }
          // { validator: validateGatewayIp, trigger: 'change' }
        ],
        gatewayNatIp: [
          {
            required: false,
            message: this.$t('gatewayCluster.gatewayNatIpPrompt'),
            trigger: 'change'
          },
          {
            pattern:
              /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/,
            message: this.$t('gatewayCluster.ipFormatPrompt'),
            trigger: 'change'
          }
        ],
        virtualIp: [
          {
            required: false,
            message: this.$t('gatewayCluster.virtualIpPrompt'),
            trigger: 'change'
          },
          {
            pattern:
              /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/,
            message: this.$t('gatewayCluster.ipFormatPrompt'),
            trigger: 'change'
          }
        ],
        nodeContainerType: [
          {
            required: true,
            message: this.$t('gatewayCluster.nodeContainerTypePrompt'),
            trigger: 'change'
          }
        ],
        nodeAvailableType: [
          {
            required: true,
            message: this.$t('gatewayCluster.nodeAvailableTypePrompt'),
            trigger: 'change'
          }
        ]
      }
    },

    async changePlatType(val) {
      for (let i = 0; i < this.$parent.accessPlatTypeList.length; i++) {
        let accessPlatGroup = this.$parent.accessPlatTypeList[i]
        for (let j = 0; j < accessPlatGroup.platTypeList.length; j++) {
          let accessPlatType = accessPlatGroup.platTypeList[j]
          if (val[1] == accessPlatType.platTypeCode) {
            if (accessPlatType.availableType == 2) {
              this.ifShowAva = true
            } else {
              this.ifShowAva = false
            }

            // this.nodeContainerTypes = this.$parent.nodeContainerTypeList.filter(item => {
            //   if (accessPlatType.containerTypes) {
            //     return accessPlatType.containerTypes.findIndex(it => it == item.value) >= 0
            //   }
            //   return true
            // })
            // this.platGroupName = accessPlatType.platGroupName
          }
        }
      }
      this.form.nodeContainerType = this.nodeContainerTypes[0].value
      if (this.ifShowAva) {
        this.form.nodeAvailableType = this.$parent.nodeAvailableTypeList[0].value
      } else {
        this.form.nodeAvailableType = ''
      }
      this.changeAva(this.form.nodeAvailableType)
      this.form.associateServer = ''
      if (val.length > 0 && this.operation) {
        await this.selectNodeHealths()
      }
      this.showServerChoose = false
      this.$nextTick(() => {
        this.gatewayGroup = this.form.gatewayGroup
        this.showServerChoose = true
      })
    },
    async selectNodeHealths() {
      this.associateServerLoading = true
      let tableData = []
      const obj = {
        pageInfo: {
          pageNum: 1,
          pageSize: 10
        },
        searchInfo: {
          platGroupName: this.platGroupName,
          searchType: 1
        }
      }

      let res = await this.$api.selectNodeHealths(obj)
      this.associateServerLoading = false
      if (
        res.resultCode === 0 &&
        res.nodeHealthInfos.length > 0
        // &&
        // !res.nodeHealthInfos[0].allocationStatus
      ) {
        tableData = res.nodeHealthInfos.filter(
          item => item.nodeGroup === res.nodeHealthInfos[0].nodeGroup
        )
        const selected = tableData[0]
        let nodeIpArr = []
        for (let j = 0; j < tableData.length; j++) {
          if (selected.nodeGroup == tableData[j].nodeGroup) {
            nodeIpArr.push(tableData[j].nodeIp)
          }
        }
        selected.nodeIp = nodeIpArr
        this.getServer(selected)
        this.submitForm1()
      } else {
        this.$message({
          type: 'warning',
          message: this.$t('gatewayCluster.noServer')
        })
      }
    },
    getServer(server) {
      this.choosedServer = server
    },

    foucsServer() {
      this.$refs['serverInput'].blur()
      if (!this.form.accessPlatType[1]) {
        this.$message({
          type: 'warning',
          message: this.$t('gatewayCluster.selectGatewayTypeFirst')
        })
        return
      }
      this.showServer = true
    },

    setGatewayStatus(val) {
      if (val == 'NONE') {
        return 0
      } else if (val == 'OK') {
        return 1
      } else if (val == 'DOWN') {
        return 2
      } else if (val == 'OOS') {
        return 3
      }
    },

    submitForm1() {
      if (this.choosedServer.nodeName) {
        this.form.associateServer =
          this.choosedServer.nodeGroup + '(' + this.choosedServer.nodeIp + ')'
        this.form.gatewayGroup = this.choosedServer.nodeGroup
        this.form.gatewayIp = this.choosedServer.nodeIp.join('、')

        //网关状态
        this.form.gatewayStatus = this.setGatewayStatus(this.choosedServer.status)
      } else {
        this.form.associateServer = ''
        this.form.gatewayGroup = ''
        this.form.gatewayIp = ''
      }

      this.resetItem = false
      this.$nextTick(() => {
        this.resetItem = true
      })

      this.showServer = false
    },

    // 表单提交
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$parent.maskloading = true
          let form = this.form
          let data = {
            gatewayName: form.gatewayName,
            accessPlatType:
              typeof form.accessPlatType == 'object' ? form.accessPlatType[1] : form.accessPlatType,
            gatewayGroup: form.gatewayGroup,
            gatewayIp: undefined,
            gatewayNatIp: form.gatewayNatIp,
            nodeContainerType: form.nodeContainerType,
            nodeAvailableType: this.ifShowAva ? form.nodeAvailableType : 0,
            gatewayStatus: form.gatewayStatus,
            gatewayPort: this.choosedServer.nodePort,
            virtualIp: form.virtualIp
          }
          if (this.operation) {
            // 添加
            this.$api.addAdapterGatewayInfo(data).then(res => {
              this.successResult(res, this.$t('public.addSuccess'))
            })
          } else if (!this.operation) {
            Object.assign(data, {
              gatewayId: this.$parent.choosedGatewayId
            })
            // 编辑
            this.$api.modifyAdapterGatewayInfo(data).then(res => {
              this.successResult(res, this.$t('public.modifySuccess'))
            })
          }
        }
      })
    },

    successResult(res, title) {
      if (res.resultCode === 0) {
        this.$parent.dialogFormVisible = false
        this.$message({
          type: 'success',
          message: title
        })
        this.$parent.handleFind()
      }
      this.$parent.maskloading = false
    }
  }
}
</script>

<style lang="scss">
.addGatewayClusterDialog {
  .el-dialog__body {
    .el-date-editor {

      .el-range-input,
      .el-range-separator {
        color: #262626;
      }
    }
  }

  .avatar-upload {
    width: 100px;
    height: 100px;
    line-height: 100px;
    cursor: pointer;
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: inline-block;
  }

  .serverDialog {
    .el-dialog__body {
      padding: 20px;
    }
  }

  .el-cascader {
    width: 100%;
  }
}
</style>
