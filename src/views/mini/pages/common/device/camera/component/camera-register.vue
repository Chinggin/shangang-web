<template>
  <!-- 镜头接入配置生成 -->
  <el-dialog :title="$t('deviceCamera.lensAccessConfigurationGeneration')" :visible.sync="$parent.registerInfoVisible"
    top="10vh" width="1000px" :close-on-click-modal="false" class="registerInfoDialog detailDialog" :modal="false"
    :draggable="false" @closed="dialogClosed" @open="dialogOpen">
    <el-form ref="form" :model="form" label-width="146px" label-position="left">
      <div class="form-flex">
        <div class="form-left">
          <el-form-item :label="$t('deviceCamera.localSipPort') + '：'">
            <el-input v-model="form.localSipPort" readonly></el-input>
          </el-form-item>

          <el-form-item :label="$t('deviceCamera.sipDomain') + '：'">
            <el-input v-model="form.sipDomain" readonly></el-input>
          </el-form-item>
          <el-form-item :label="$t('primaryDevice.accessInterconnectCode1') + '：'">
            <el-input v-model="form.deviceId" readonly></el-input>
          </el-form-item>
        </div>
        <div class="form-right">
          <el-form-item :label="$t('deviceCamera.sipId') + '：'">
            <el-input v-model="form.sipId" readonly></el-input>
          </el-form-item>
          <el-form-item :label="$t('public.password') + '：'">
            <pwd-input v-model="form.regPwd" readonly />
          </el-form-item>
          <el-form-item :label="$t('deviceCamera.administrativeRegions') + '：'"
            v-if="form.vendor == 'HUAWEI' || form.vendor == 'DAHUA'">
            <el-input v-model="form.areaCode" readonly></el-input>
          </el-form-item>
        </div>
      </div>

      <div class="form-flex">
        <div class="form-left">
          <el-form-item :label="$t('deviceCamera.sipIp') + '：'">
            <el-input v-model="form.sipIp" readonly></el-input>
          </el-form-item>
          <el-form-item :label="$t('deviceCamera.sipVPNIp') + '：'">
            <el-input v-model="form.sipVPNIp" readonly></el-input>
          </el-form-item>
        </div>
        <div class="form-right">
          <el-form-item :label="$t('deviceCamera.sipPort') + '：'">
            <el-input v-model="form.sipPort" readonly></el-input>
          </el-form-item>
          <el-form-item :label="$t('deviceCamera.sipVPNPort') + '：'">
            <el-input v-model="form.sipVPNPort" readonly></el-input>
          </el-form-item>
        </div>
      </div>

      <div class="form-flex">
        <div class="form-left">
          <el-form-item :label="$t('deviceCamera.sipIpv6') + '：'">
            <el-input v-model="form.sipIpv6" readonly></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <el-table :data="channelList" :max-height="482" :row-class-name="$parent.tableRowClassName" border>
      <el-table-column type="index" width="50" />
      <el-table-column show-overflow-tooltip :label="$t('deviceCamera.channelId')" min-width="110">
        <template #default="{ row }">
          <span>{{ row.channelId }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip :label="$t('deviceCamera.channelName')" min-width="110">
        <template #default="{ row }">
          <span>{{ row.channelName }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        sipId: '',
        sipDomain: '',
        sipIp: '',
        sipPort: '',
        deviceId: '',
        regPwd: '',
        localSipPort: '',
        areaCode: '',
        sipVPNIp: '',
        sipVPNPort: '',
        vendor: ''
      },
      channelList: []
    }
  },
  methods: {
    dialogOpen() {
      this.$nextTick(() => {
        this.form = this.$parent.registerInfoForm
        this.channelList = this.$parent.channelList
      })
    },
    dialogClosed() {
      this.$parent.registerInfoVisible = false
      this.$parent.registerInfoForm = {}
      this.$parent.channelList = []
    }
  }
}
</script>

<style lang="scss">
.registerInfoDialog {
  .el-dialog__body .el-table {
    width: calc(100% - 20px) !important;
    margin: 10px;
  }

  .pwdType {
    line-height: 3;
    cursor: pointer;
  }
}
</style>
