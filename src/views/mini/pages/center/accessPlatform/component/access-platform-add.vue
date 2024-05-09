<template>
  <div id="accessPlatformAddDialog">
    <el-dialog :title="$parent.operation
      ? $t('accessPlatform.addAccessPlatform')
      : $t('accessPlatform.accessPLatformModification')
      " :visible.sync="$parent.dialogFormVisible" top="10vh" :width="locale == 'en' ? '1400px' : '1000px'"
      :close-on-click-modal="false" @open="dialogOpen" :draggable="false">
      <el-form ref="form" :model="form" :rules="formRules()" class="archivesForm"
        :label-width="locale == 'en' ? '190px' : '142px'" label-position="left" :validate-on-rule-change="false">
        <!-- 基本信息 -->
        <collapse-card :title="$t('accessPlatform.essentialInformation')" v-model:collapse="show1">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.organization') + '：'" prop="organizationName">
                <el-input v-model="form.organizationName" :placeholder="$t('accessPlatform.selectYourOrganization')"
                  disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.accessPlatformType') + '：'" prop="platformType">
                <el-input v-model="$parent.platformTypeHolder" disabled v-show="!$parent.operation" />

                <el-cascader v-if="$parent.operation" :options="$parent.options" :props="{ expandTrigger: 'hover' }"
                  clearable :show-all-levels="false" v-model="form.platformType" :popper-append-to-body="false"
                  @change="changePlatType"></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.accessPlatformName') + '：'" prop="platformName">
                <el-input v-model="form.platformName" :placeholder="$t('accessPlatform.inputAccessplatformName')" />
              </el-form-item>
            </el-col>
            <el-col :span="12" class="platformScaleCol">
              <el-form-item :label="$t('accessPlatform.platformScale') + '：'" prop="platformScale">
                <el-input v-model="form.platformScale" :placeholder="$t('accessPlatform.accessPlatformScale')" />
                <div style="display: inline; padding-left: 5px">
                  {{ $t('accessPlatform.road') }}
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item class="long-error" :label="$t('accessPlatform.gatewaySlection') + '：'" prop="gatewayGroup">
                <el-input ref="focuswayInput" v-model="form.gatewayGroup" @focus="foucsGateWay"
                  :placeholder="$t('accessPlatform.clickSelect')"
                  :disabled="!$parent.operation && $parent.choosedEnableStatus == 1" />
              </el-form-item>
            </el-col>
            <el-col v-if="currentPlatType === PLATFORM_TYPE.ADS" :span="12">
              <el-form-item class="long-error" :label="$t('accessPlatform.domainCode') + '：'" prop="regionCode">
                <el-input v-model="form.regionCode" :placeholder="$t('accessPlatform.inputDomainCode')" clearable />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item :label="$t('accessPlatform.remarkInformation') + '：'" class="single-line" prop="remark">
                <el-input v-model="form.remark" type="textarea" maxlength="1024"
                  :placeholder="$t('accessPlatform.fillInTheRemarks')" />
              </el-form-item>
            </el-col>
          </el-row>
        </collapse-card>

        <!-- 平台对接信息 -->
        <collapse-card :title="$t('accessPlatform.dockinginformation')" v-model:collapse="show2">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.networkType') + '：'"
                prop="platformProtocolInfo.accessNetworkType" :label-width="locale == 'en' ? '285px' : '142px'">
                <el-select v-model="form.platformProtocolInfo.accessNetworkType" clearable
                  :placeholder="$t('accessPlatform.selectTheDockingNEtworkType')">
                  <el-option v-for="item in $parent.accessNetworkTypeList" :key="item.value" :label="item.name"
                    :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="currentPlatType !== PLATFORM_TYPE.ADS && currentPlatType !== PLATFORM_TYPE.VPAAS
      " :label="$t('accessPlatform.authenticationMode') + '：'" prop="platformProtocolInfo.accessAuthType"
                :label-width="locale == 'en' ? '300px' : '142px'">
                <el-select v-model="form.platformProtocolInfo.accessAuthType" clearable
                  :placeholder="$t('accessPlatform.selectAuthenticationMode')" @focus="focusAuthType">
                  <el-option v-for="item in $parent.accessAuthTypeListFilter" :key="item.value" :label="item.name"
                    :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item v-if="currentPlatType !== PLATFORM_TYPE.ADS && currentPlatType !== PLATFORM_TYPE.VPAAS
      " :label="$t('accessPlatform.protocolVersion') + '：'" prop="platformProtocolInfo.accessProtocolVersion"
                :label-width="locale == 'en' ? '285px' : '142px'">
                <el-input v-model="form.platformProtocolInfo.accessProtocolVersion"
                  :placeholder="$t('accessPlatform.inputProtocolVersion')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="form.platformProtocolInfo.accessNetworkType == 1 &&
      currentPlatType !== PLATFORM_TYPE.AVS
      ">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.platformPublicNetworkIP') + '：'" prop="platformNetworkIp"
                :label-width="locale == 'en' ? '285px' : '142px'">
                <el-input v-model="form.platformNetworkIp"
                  :placeholder="$t('accessPlatform.inputPlatformPublicNetworkIP')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.publicNetworkPort') + '：'" prop="platformNetworkPort"
                :label-width="locale == 'en' ? '300px' : '142px'">
                <el-input v-model="form.platformNetworkPort"
                  :placeholder="$t('accessPlatform.inputPublicNetworkPort')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="form.platformProtocolInfo.accessNetworkType == 2 &&
      currentPlatType !== PLATFORM_TYPE.AVS
      ">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.privateNetworkIP') + '：'" prop="platformIntranetIp"
                :label-width="locale == 'en' ? '285px' : '142px'">
                <el-input v-model="form.platformIntranetIp" :placeholder="$t('accessPlatform.InputPrivateNetworkIP')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.privateNetworkPort') + '：'" prop="platformIntranetPort"
                :label-width="locale == 'en' ? '300px' : '142px'">
                <el-input v-model="form.platformIntranetPort"
                  :placeholder="$t('accessPlatform.InputPrivateNetworkPort')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="form.platformProtocolInfo.accessAuthType == 1">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.dockingAccount') + '：'" prop="platformProtocolInfo.accessAccount"
                key="accessAccount" :label-width="locale == 'en' ? '285px' : '142px'">
                <el-input v-model="form.platformProtocolInfo.accessAccount"
                  :placeholder="$t('accessPlatform.InputDockingAccount')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.dockingPassword') + '：'"
                prop="platformProtocolInfo.accessPassword" key="accessPassword"
                :label-width="locale == 'en' ? '300px' : '142px'">
                <el-input type="password" v-model="form.platformProtocolInfo.accessPassword"
                  :placeholder="$t('accessPlatform.inputDockingPassword')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="form.platformProtocolInfo.accessAuthType == 2">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.dockingAK') + '：'" prop="platformProtocolInfo.accessKey"
                key="accessKey" :label-width="locale == 'en' ? '285px' : '142px'">
                <el-input v-model="form.platformProtocolInfo.accessKey"
                  :placeholder="$t('accessPlatform.inputDockingAK')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.dockingSk') + '：'" prop="platformProtocolInfo.accessSecret"
                key="accessSecret" :label-width="locale == 'en' ? '300px' : '142px'">
                <el-input v-model="form.platformProtocolInfo.accessSecret"
                  :placeholder="$t('accessPlatform.inputDockingSk')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="form.platformProtocolInfo.accessAuthType == 2">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.userNumber') + '：'" prop="platformProtocolInfo.accessUserId"
                key="accessUserId" :label-width="locale == 'en' ? '285px' : '142px'">
                <el-input v-model="form.platformProtocolInfo.accessUserId"
                  :placeholder="$t('accessPlatform.dockingUserNumber')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="form.platformProtocolInfo.accessAuthType == 3">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.dockingToken') + '：'" prop="platformProtocolInfo.accessToken"
                key="accessToken" :label-width="locale == 'en' ? '285px' : '142px'">
                <el-input v-model="form.platformProtocolInfo.accessToken"
                  :placeholder="$t('accessPlatform.inputDockingToken')" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-if="form.platformProtocolInfo.accessProtocolType == 3">
            <el-col :span="12">
              <el-form-item :label="$t('deviceCamera.platId') + '：'" prop="platformLevelType"
                :label-width="locale == 'en' ? '285px' : '142px'">
                <el-select v-model="form.platformLevelType" clearable
                  :placeholder="$t('deviceCamera.pleaseInputPlatId')" :disabled="!$parent.operation">
                  <el-option v-for="item in $parent.platTypeList" :key="item.value" :label="item.name"
                    :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-if="form.platformProtocolInfo.accessProtocolType == 3">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.platformNo') + '：'" prop="platformProtocolInfo.platformGbId"
                :label-width="locale == 'en' ? '285px' : '142px'">
                <el-input v-model="form.platformProtocolInfo.platformGbId"
                  :placeholder="$t('accessPlatform.inputPlatformNo')" key="platformGbId"
                  :disabled="!$parent.operation" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.numberOfThisLevel') + '：'" prop="platformProtocolInfo.accessGbId"
                key="accessGbId" :label-width="locale == 'en' ? '300px' : '142px'">
                <el-input v-model="form.platformProtocolInfo.accessGbId"
                  :placeholder="$t('accessPlatform.inputNumberOfThisLevel')" :disabled="!$parent.operation" />
              </el-form-item>
            </el-col>
          </el-row>
        </collapse-card>

        <!-- 媒体播放配置 -->
        <collapse-card :title="$t('accessPlatform.playbackConfiguration')" v-model:collapse="show3" v-if="ifShowMedia">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.mediaDocking') + '：'" prop="platformMediaInfo.mediaAccessType"
                :label-width="locale == 'en' ? '285px' : '142px'">
                <el-select v-model="form.platformMediaInfo.mediaAccessType" clearable
                  :placeholder="$t('accessPlatform.inputMediaDocking')">
                  <el-option v-for="item in $parent.mediaAccessTypeListFilter" :key="item.value" :label="item.name"
                    :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="ifShowMediaItem">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.accessPublicIP') + '：'" prop="platformMediaInfo.sdkNetworkIp"
                :label-width="locale == 'en' ? '285px' : '142px'">
                <el-input v-model="form.platformMediaInfo.sdkNetworkIp"
                  :placeholder="$t('accessPlatform.inputAccessPublicIP')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.SDKpublicNetworkPort') + '：'"
                prop="platformMediaInfo.sdkNetworkPort" :label-width="locale == 'en' ? '300px' : '142px'">
                <el-input v-model="form.platformMediaInfo.sdkNetworkPort"
                  :placeholder="$t('accessPlatform.inputSDKpublicNetworkPort')" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" v-if="ifShowMediaItem">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.SDKaccess')" prop="platformMediaInfo.sdkIntranetIp"
                :label-width="locale == 'en' ? '285px' : '142px'">
                <el-input v-model="form.platformMediaInfo.sdkIntranetIp"
                  :placeholder="$t('accessPlatform.inputSDKaccess')" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.SDKaccessPort')" prop="platformMediaInfo.sdkIntranetPort"
                :label-width="locale == 'en' ? '300px' : '142px'">
                <el-input v-model="form.platformMediaInfo.sdkIntranetPort"
                  :placeholder="$t('accessPlatform.inputSDKaccessPort')" />
              </el-form-item>
            </el-col>
          </el-row>
        </collapse-card>

        <!-- 平台参数配置 -->
        <collapse-card v-if="currentPlatType === PLATFORM_TYPE.AVS" :title="$t('accessPlatform.avsConfig.title')"
          v-model:collapse="show5">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.avsConfig.storageEnable') + '：'" prop="avsConfig.storageEnable">
                <el-switch v-model="form.avsConfig.storageEnable" active-color="#0085d0" inactive-color="#dee2e6" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.avsConfig.storageServerAddr') + '：'"
                prop="avsConfig.storageServerAddr">
                <el-input v-model="form.avsConfig.storageServerAddr"
                  :placeholder="$t('accessPlatform.avsConfig.inputStorageServerAddr')" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.avsConfig.mediaServerAddr') + '：'"
                prop="avsConfig.mediaServerAddr">
                <el-input v-model="form.avsConfig.mediaServerAddr"
                  :placeholder="$t('accessPlatform.avsConfig.inputMediaServerAddr')" clearable />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="$t('accessPlatform.avsConfig.accessGatewayConfig') + '：'"
                prop="avsConfig.accessGatewayConfig">
                <el-switch v-model="form.avsConfig.accessGatewayConfig" active-color="#0085d0"
                  inactive-color="#dee2e6" />
              </el-form-item>
            </el-col>
          </el-row>

          <div v-show="form.avsConfig.accessGatewayConfig" class="accessGatewayConfig">
            <el-radio-group v-model="form.avsConfig.driveRadio">
              <el-radio-button :label="1">
                {{ $t('accessPlatform.avsConfig.T28181Dev') }}
              </el-radio-button>
              <el-radio-button :label="2">
                {{ $t('accessPlatform.avsConfig.HWSDKDev') }}
              </el-radio-button>
            </el-radio-group>

            <el-row v-show="form.avsConfig.driveRadio == 1" :gutter="20">
              <el-col :span="12">
                <el-form-item :label="$t('accessPlatform.avsConfig.serverDomain') + '：'" prop="avsConfig.serverDomain">
                  <el-input v-model="form.avsConfig.serverDomain"
                    :placeholder="$t('accessPlatform.avsConfig.inputServerDomain')" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('accessPlatform.avsConfig.sipServerIp') + '：'" prop="avsConfig.sipServerIp">
                  <el-input v-model="form.avsConfig.sipServerIp"
                    :placeholder="$t('accessPlatform.avsConfig.inputSipServerIp')" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('accessPlatform.avsConfig.sipServerPort') + '：'"
                  prop="avsConfig.sipServerPort">
                  <el-input v-model.number="form.avsConfig.sipServerPort"
                    :placeholder="$t('accessPlatform.avsConfig.inputSipServerPort')" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('accessPlatform.avsConfig.syncChannelNameEnable') + '：'"
                  prop="avsConfig.syncChannelNameEnable">
                  <el-switch v-model="form.avsConfig.syncChannelNameEnable" active-color="#0085d0"
                    inactive-color="#dee2e6" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row v-show="form.avsConfig.driveRadio == 2" :gutter="20">
              <el-col :span="12">
                <el-form-item :label="$t('accessPlatform.avsConfig.accessServerIp') + '：'"
                  prop="avsConfig.accessServerIp">
                  <el-input v-model="form.avsConfig.accessServerIp"
                    :placeholder="$t('accessPlatform.avsConfig.inputAccessServerIp')" clearable />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$t('accessPlatform.avsConfig.accessServerPort') + '：'"
                  prop="avsConfig.accessServerPort">
                  <el-input v-model.number="form.avsConfig.accessServerPort"
                    :placeholder="$t('accessPlatform.avsConfig.inputAccessServerPort')" clearable />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </collapse-card>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$parent.dialogFormVisible = false">
            {{ $t('public.cancel') }}
          </el-button>
          <el-button type="primary" :loading="$parent.maskloading" @click="submitHandler">
            {{ $t('public.confirm') }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 网关选择 -->
    <el-dialog :title="$t('accessPlatform.gatewaySelection')" v-model="showGateWay" top="10vh" width="1230px"
      :close-on-click-modal="false" :modal="false" draggable>
      <gateway-choose v-if="showGateWayChoose" ref="gateWayChoose" @getChooseGateWay="getGateWay"
        :choosedAccessPlatType="choosedAccessPlatType" :operation="$parent.operation" :form="form"></gateway-choose>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogClosed1">{{ $t('public.cancel') }}</el-button>
          <el-button type="primary" @click="submitForm1">
            {{ $t('public.confirm') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import CollapseCard from '@/components/collapse-card.vue'
import GatewayChoose from './gateway-choose'
import { PLATFORM_TYPE } from '@/enums/platformEnum'
export default {
  name: 'accessPlatformAdd',
  components: {
    CollapseCard,
    GatewayChoose
  },
  data() {
    return {
      locale: localStorage.getItem('locale'),
      show1: true,
      show2: true,
      show3: true,
      show5: true,
      loading: false,
      form: {
        // 基本信息
        organizationId: '',
        organizationName: '',
        platformType: [],
        platformName: '',
        platformScale: '',
        gatewayGroup: '',
        regionCode: '',
        remark: '',

        platformNetworkIp: '',
        platformNetworkPort: '',
        platformIntranetIp: '',
        platformIntranetPort: '',
        platformLevelType: '',
        // 平台对接信息
        platformProtocolInfo: {
          accessNetworkType: 1,
          accessAuthType: '',
          accessProtocolType: '',
          accessProtocolVersion: '',

          accessAccount: '',
          accessPassword: '',
          accessKey: '',
          accessSecret: '',
          accessUserId: '',
          accessToken: '',
          platformGbId: '',
          accessGbId: ''
        },
        // 媒体播放配置
        platformMediaInfo: {
          mediaAccessType: 0,
          sdkNetworkIp: '',
          sdkNetworkPort: '',
          sdkIntranetIp: '',
          sdkIntranetPort: ''
        },
        avsConfig: {
          storageEnable: false,
          storageServerAddr: '',
          mediaServerAddr: '',
          serverDomain: '',
          sipServerIp: '',
          sipServerPort: null,
          syncChannelNameEnable: false,
          accessServerIp: '',
          accessServerPort: null,
          accessGatewayConfig: true,
          driveRadio: 1
        }
      },
      queryParams: {
        pageNum: 1,
        pageSize: 20
      },

      //接入平台
      showGateWay: false,
      choosedGateWay: null,
      showGateWayChoose: true,
      sendGatewayGroup: '',
      sendGatewayIp: '',
      ifShowMedia: false,
      ifShowMediaItem: true,
      choosedAccessPlatType: '',
      PLATFORM_TYPE: PLATFORM_TYPE
    }
  },
  mounted() {
    this.formRules()
  },
  computed: {
    currentPlatType() {
      if (this.form.platformType) {
        return this.form.platformType[1]
      } else {
        return ''
      }
    }
  },
  methods: {
    formRules() {
      var zhengshu = /^\d+$/
      var validateScale = (rule, value, callback) => {
        if (value !== '') {
          if (!zhengshu.test(value)) {
            callback(new Error(this.$t('accessPlatform.scale200000')))
          } else if (Number(value) > 200000) {
            callback(new Error(this.$t('accessPlatform.scale200000')))
          }
        }
        callback()
      }

      var regGbId = /^[0-9a-zA-Z]{20}$/
      var validatePlatformGbId = (rule, value, callback) => {
        if (value == '') {
          callback(new Error(this.$t('accessPlatform.inputDockingPlatformNumber')))
        } else if (!regGbId.test(value)) {
          callback(new Error(this.$t('accessPlatform.dockingPlatformNo20')))
        } else if (value == this.form.platformProtocolInfo.accessGbId) {
          callback(new Error(this.$t('accessPlatform.dockingPlatformNotEqual')))
        }
        callback()
      }
      var validateAccessGbId = (rule, value, callback) => {
        if (value == '') {
          callback(new Error(this.$t('accessPlatform.inputNumberOfThisLevel')))
        } else if (!regGbId.test(value)) {
          callback(new Error(this.$t('accessPlatform.numberOfThisLevel20')))
        } else if (value == this.form.platformProtocolInfo.platformGbId) {
          callback(new Error(this.$t('accessPlatform.dockingPlatformNotEqual')))
        }
        callback()
      }
      var regEn = /[<>?:"{})(*&^%$#@!~]/im
      var validatePass1 = (rule, value, callback) => {
        if (regEn.test(value)) {
          callback(new Error(this.$t('repo.cantContainSpecial')))
        }
        callback()
      }
      return {
        //基本信息
        organizationName: [
          {
            required: true,
            message: this.$t('accessPlatform.selectYourOrganization'),
            trigger: 'change'
          }
        ],
        platformType: [
          {
            required: true,
            message: this.$t('accessPlatform.selectAccessPlatformType'),
            trigger: 'change'
          }
        ],
        platformName: [
          {
            required: true,
            message: this.$t('accessPlatform.inputAccessplatformName'),
            trigger: 'change'
          },
          { validator: validatePass1, trigger: 'change' },
          {
            max: 256,
            message: this.$t('accessPlatform.lengthNot256'),
            trigger: 'change'
          }
        ],
        platformScale: [{ required: false, validator: validateScale, trigger: 'change' }],
        gatewayGroup: [
          {
            required: true,
            message: this.$t('accessPlatform.selectLoadGateway'),
            trigger: 'change'
          }
        ],
        regionCode: [
          {
            pattern: /^[0-9a-zA-Z-_]{16}$/,
            message: this.$t('accessPlatform.domainCodePrompt'),
            trigger: 'change'
          },
          {
            required: true,
            message: this.$t('accessPlatform.inputDomainCode'),
            trigger: 'change'
          }
        ],
        remark: [
          {
            required: false,
            message: this.$t('accessPlatform.fillInTheRemarks'),
            trigger: 'change'
          }
        ],
        //平台对接信息
        'platformProtocolInfo.accessNetworkType': [
          {
            required: true,
            message: this.$t('accessPlatform.selectTheDockingNEtworkType'),
            trigger: 'change'
          }
        ],
        'platformProtocolInfo.accessAuthType': [
          {
            required: true,
            message: this.$t('accessPlatform.selectAuthenticationMode'),
            trigger: 'change'
          }
        ],
        'platformProtocolInfo.accessProtocolType': [
          {
            required: true,
            message: this.$t('accessPlatform.selectTheDockingProtocolType'),
            trigger: 'change'
          }
        ],
        'platformProtocolInfo.accessProtocolVersion': [
          {
            max: 128,
            message: this.$t('accessPlatform.lengthNot128'),
            trigger: 'change'
          }
        ],
        platformNetworkIp: [
          {
            required: true,
            message: this.$t('accessPlatform.inputPlatformPublicNetworkIP'),
            trigger: 'change'
          },
          {
            pattern:
              /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/,
            message: this.$t('public.puIpError'),
            trigger: 'change'
          }
        ],
        platformNetworkPort: [
          {
            required: true,
            message: this.$t('accessPlatform.inputPublicNetworkPort'),
            trigger: 'change'
          },
          {
            pattern:
              /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: this.$t('public.puPortError'),
            trigger: 'change'
          }
        ],
        platformIntranetIp: [
          {
            required: true,
            message: this.$t('accessPlatform.InputPrivateNetworkIP'),
            trigger: 'change'
          },
          {
            pattern:
              /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/,
            message: this.$t('public.puIpError'),
            trigger: 'change'
          }
        ],
        platformIntranetPort: [
          {
            required: true,
            message: this.$t('accessPlatform.privateNetworkPortContent'),
            trigger: 'change'
          },
          {
            pattern:
              /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: this.$t('public.puPortError'),
            trigger: 'change'
          }
        ],
        'platformProtocolInfo.accessAccount': [
          {
            required: true,
            message: this.$t('accessPlatform.InputDockingAccount'),
            trigger: 'change'
          },
          {
            max: 128,
            message: this.$t('accessPlatform.lengthNot128'),
            trigger: 'change'
          }
        ],
        'platformProtocolInfo.accessPassword': [
          {
            required: true,
            message: this.$t('accessPlatform.inputDockingPassword'),
            trigger: 'change'
          },
          {
            max: 32,
            message: this.$t('accessPlatform.lengthNot32'),
            trigger: 'change'
          }
        ],
        'platformProtocolInfo.accessKey': [
          {
            required: true,
            message: this.$t('accessPlatform.inputDockingAK'),
            trigger: 'change'
          },
          {
            max: 128,
            message: this.$t('accessPlatform.lengthNot128'),
            trigger: 'change'
          }
        ],
        'platformProtocolInfo.accessSecret': [
          {
            required: true,
            message: this.$t('accessPlatform.inputDockingSk'),
            trigger: 'change'
          },
          {
            max: 32,
            message: this.$t('accessPlatform.lengthNot32'),
            trigger: 'change'
          }
        ],
        'platformProtocolInfo.accessUserId': [
          {
            required: true,
            message: this.$t('accessPlatform.dockingUserNumber'),
            trigger: 'change'
          },
          {
            max: 128,
            message: this.$t('accessPlatform.lengthNot128'),
            trigger: 'change'
          }
        ],
        'platformProtocolInfo.accessToken': [
          {
            required: true,
            message: this.$t('accessPlatform.inputDockingToken'),
            trigger: 'change'
          },
          {
            max: 1024,
            message: this.$t('accessPlatform.lengthNot1024'),
            trigger: 'change'
          }
        ],
        'platformProtocolInfo.platformGbId': [
          {
            required: true,
            validator: validatePlatformGbId,
            trigger: 'change'
          }
        ],
        'platformProtocolInfo.accessGbId': [
          { required: true, validator: validateAccessGbId, trigger: 'change' }
        ],
        platformLevelType: [
          {
            required: true,
            message: this.$t('deviceCamera.pleaseInputPlatId'),
            trigger: 'change'
          }
        ],
        //媒体播放配置
        'platformMediaInfo.mediaAccessType': [
          {
            required: true,
            message: this.$t('accessPlatform.inputMediaDocking'),
            trigger: 'change'
          }
        ],
        'platformMediaInfo.sdkNetworkIp': [
          {
            required: false,
            message: this.$t('accessPlatform.inputAccessPublicIP'),
            trigger: 'change'
          },
          {
            pattern:
              /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/,
            message: this.$t('whiteList.inputTureIp'),
            trigger: 'change'
          }
        ],
        'platformMediaInfo.sdkNetworkPort': [
          {
            required: false,
            message: this.$t('accessPlatform.inputSDKpublicNetworkPort'),
            trigger: 'change'
          },
          {
            pattern:
              /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: this.$t('public.puPortError'),
            trigger: 'change'
          }
        ],
        'platformMediaInfo.sdkIntranetIp': [
          {
            required: false,
            message: this.$t('accessPlatform.inputSDKaccess'),
            trigger: 'change'
          },
          {
            pattern:
              /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/,
            message: this.$t('whiteList.inputTureIp'),
            trigger: 'change'
          }
        ],
        'platformMediaInfo.sdkIntranetPort': [
          {
            required: false,
            message: this.$t('accessPlatform.inputSDKaccessPort'),
            trigger: 'change'
          },
          {
            pattern:
              /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: this.$t('public.puPortError'),
            trigger: 'change'
          }
        ],
        // 平台参数配置
        'avsConfig.storageEnable': [
          {
            required: true
          }
        ],
        'avsConfig.storageServerAddr': [
          {
            required: true,
            message: this.$t('accessPlatform.avsConfig.inputStorageServerAddr'),
            trigger: 'change'
          }
        ],
        'avsConfig.mediaServerAddr': [
          {
            required: true,
            message: this.$t('accessPlatform.avsConfig.inputMediaServerAddr'),
            trigger: 'change'
          }
        ],
        'avsConfig.serverDomain': [
          {
            required: true,
            message: this.$t('accessPlatform.avsConfig.inputServerDomain'),
            trigger: 'change'
          }
        ],
        'avsConfig.sipServerIp': [
          {
            required: true,
            message: this.$t('accessPlatform.avsConfig.inputSipServerIp'),
            trigger: 'change'
          },
          {
            pattern:
              /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/,
            message: this.$t('public.puIpError'),
            trigger: 'change'
          }
        ],
        'avsConfig.sipServerPort': [
          {
            required: true,
            message: this.$t('accessPlatform.avsConfig.inputSipServerPort'),
            trigger: 'change'
          },
          {
            pattern:
              /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: this.$t('public.puPortError'),
            trigger: 'change'
          }
        ],
        'avsConfig.syncChannelNameEnable': [
          {
            required: true
          }
        ],
        'avsConfig.accessServerIp': [
          {
            required: true,
            message: this.$t('accessPlatform.avsConfig.inputAccessServerIp'),
            trigger: 'change'
          },
          {
            pattern:
              /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^::([\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:):([\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){2}:([\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){3}:([\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$|^:((:[\da-fA-F]{1,4}){1,6}|:)$|^[\da-fA-F]{1,4}:((:[\da-fA-F]{1,4}){1,5}|:)$|^([\da-fA-F]{1,4}:){2}((:[\da-fA-F]{1,4}){1,4}|:)$|^([\da-fA-F]{1,4}:){3}((:[\da-fA-F]{1,4}){1,3}|:)$|^([\da-fA-F]{1,4}:){4}((:[\da-fA-F]{1,4}){1,2}|:)$|^([\da-fA-F]{1,4}:){5}:([\da-fA-F]{1,4})?$|^([\da-fA-F]{1,4}:){6}:$/,
            message: this.$t('public.puIpError'),
            trigger: 'change'
          }
        ],
        'avsConfig.accessServerPort': [
          {
            required: true,
            message: this.$t('accessPlatform.avsConfig.inputAccessServerPort'),
            trigger: 'change'
          },
          {
            pattern:
              /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: this.$t('public.puPortError'),
            trigger: 'change'
          }
        ]
      }
    },
    dialogOpen() {
      //媒体缓存
      this.form.platformMediaInfo.mediaAccessType = 0
      this.form.platformMediaInfo.sdkNetworkIp = ''
      this.form.platformMediaInfo.sdkNetworkPort = ''
      this.form.platformMediaInfo.sdkIntranetIp = ''
      this.form.platformMediaInfo.sdkIntranetPort = ''
      this.ifShowMedia = false
      if (this.$refs.form) {
        this.showGateWayChoose = false
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.choosedGateWay = null
          this.gatewayGroup = ''
          this.form.platformProtocolInfo.accessProtocolType = ''
          this.form.platformProtocolInfo.platformGbId = ''
          this.form.platformProtocolInfo.accessGbId = ''
          this.form.platformType = []

          if (this.$parent.operation) {
            this.$parent.accessAuthTypeListFilter = []
          }

          this.showGateWayChoose = true
        })
      }
      this.$nextTick(async () => {
        if (!this.$parent.operation) {
          this.form = Object.assign({}, this.form, this.$parent.dataForm)
          this.sendGatewayGroup = this.form.gatewayGroup
          if (this.$parent.gatewayList.length != 0) {
            this.sendGatewayIp = this.$parent.gatewayList[0].gatewayIp
            this.form.gatewayGroup = this.sendGatewayGroup + '(' + this.sendGatewayIp + ')'
            this.getAvsConfig()
          }
        } else {
          Object.assign(this.form, {
            organizationName: this.$parent.organizationName,
            organizationId: this.$parent.organizationId
          })
        }
      })
    },

    foucsGateWay() {
      this.$refs['focuswayInput'].blur()
      if (!this.currentPlatType) {
        this.$message({
          type: 'warning',
          message: this.$t('accessPlatform.selectTheAccess')
        })
        return
      }
      this.showGateWay = true
    },
    focusAuthType() {
      if (!this.currentPlatType) {
        this.$message({
          type: 'warning',
          message: this.$t('accessPlatform.selectTheAccess')
        })
        return
      }
    },
    async getAvsConfig() {
      if (this.currentPlatType !== PLATFORM_TYPE.AVS) return
      const res = await this.$api.avsConfigSelect({
        gatewayGroup: this.sendGatewayGroup,
        gatewayIp: this.sendGatewayIp
      })
      if (res.resultCode != 0) return
      const {
        storageEnable,
        storageServerAddr,
        mediaServerAddr,
        serverDomain,
        sipServerIp,
        sipServerPort,
        syncChannelNameEnable,
        accessServerIp,
        accessServerPort
      } = res
      this.form.avsConfig = {
        storageEnable,
        storageServerAddr,
        mediaServerAddr,
        serverDomain,
        sipServerIp,
        sipServerPort,
        syncChannelNameEnable,
        accessServerIp,
        accessServerPort,
        accessGatewayConfig: true,
        driveRadio: 1
      }
    },
    getGateWay(gateway) {
      this.choosedGateWay = gateway
    },

    dialogClosed1() {
      this.showGateWay = false
    },

    async changePlatType(val) {
      this.form.platformLevelType = ''

      this.choosedAccessPlatType = val

      this.showGateWayChoose = false
      this.$nextTick(() => {
        this.showGateWayChoose = true
      })

      console.log(1)
      this.choosedGateWay = {}
      this.form.gatewayGroup = ''
      if (val.length > 0 && this.$parent.operation) {
        await this.getSelectAdapterGateways()
      }
      if (val) {
        for (let i = 0; i < this.$parent.accessPlatTypeList.length; i++) {
          for (let j = 0; j < this.$parent.accessPlatTypeList[i].platTypeList.length; j++) {
            if (val[1] == this.$parent.accessPlatTypeList[i].platTypeList[j].platTypeCode) {
              //鉴权方式(切换类型时清空) vpaas设置为不鉴权
              this.form.platformProtocolInfo.accessAuthType = ''
              this.form.platformProtocolInfo.accessAccount = ''
              this.form.platformProtocolInfo.accessPassword = ''

              this.form.platformProtocolInfo.accessKey = ''
              this.form.platformProtocolInfo.accessSecret = ''
              this.form.platformProtocolInfo.accessUserId = ''

              this.form.platformProtocolInfo.accessToken = ''

              //平台编号清空
              this.form.platformProtocolInfo.platformGbId = ''
              this.form.platformProtocolInfo.accessGbId = ''

              this.form.regionCode = ''

              if (val.length) {
                this.$parent.accessAuthTypeListFilter = this.$parent.accessAuthTypeList.filter(
                  item => {
                    return (
                      this.$parent.accessPlatTypeList[i].platTypeList[
                        j
                      ].authenticationTypes.indexOf(item.value) != -1
                    )
                  }
                )
              } else {
                this.$parent.accessAuthTypeListFilter = []
              }

              if (val.length) {
                this.$parent.mediaAccessTypeListFilter = this.$parent.mediaAccessTypeList.filter(
                  item => {
                    return (
                      this.$parent.accessPlatTypeList[i].platTypeList[j].mediaAccessTypes.indexOf(
                        item.value + ''
                      ) != -1
                    )
                  }
                )
              } else {
                this.$parent.mediaAccessTypeListFilter = []
              }

              //媒体配置判断
              if (
                this.$parent.accessPlatTypeList[i].platTypeList[j].mediaAccessTypes.indexOf('1') !=
                -1
              ) {
                this.form.platformMediaInfo.mediaAccessType = Number(
                  this.$parent.accessPlatTypeList[i].platTypeList[j].mediaAccessTypes[0]
                )

                this.ifShowMedia = true
                this.ifShowMediaItem = true
              } else {
                if (
                  this.$parent.accessPlatTypeList[i].platTypeList[j].mediaAccessTypes.length < 2
                ) {
                  this.ifShowMedia = false
                  this.ifShowMediaItem = false
                  this.form.platformMediaInfo.mediaAccessType = Number(
                    this.$parent.accessPlatTypeList[i].platTypeList[j].mediaAccessTypes[0]
                  )
                } else {
                  this.form.platformMediaInfo.mediaAccessType = Number(
                    this.$parent.accessPlatTypeList[i].platTypeList[j].mediaAccessTypes[0]
                  )
                  this.ifShowMedia = true
                  this.ifShowMediaItem = false
                }
              }

              //对接协议
              this.form.platformProtocolInfo.accessProtocolType =
                this.$parent.accessPlatTypeList[i].platTypeList[j].protocolType
              return
            }
          }
        }
      }
      this.showGateWayChoose = false
      this.$nextTick(() => {
        this.showGateWayChoose = true
      })
    },
    async getSelectAdapterGateways() {
      let tableData = []
      const obj = {
        pageInfo: {
          pageNum: 1,
          pageSize: 10
        },
        searchInfo: {
          accessPlatType: this.choosedAccessPlatType[1]
        },
        type: 2
      }
      let res = await this.$api.selectAdapterGateways(obj)
      if (
        res.resultCode === 0 &&
        res.gatewayList.length > 0
        //  &&
        // !res.gatewayList[0].allocationStatus
      ) {
        tableData = res.gatewayList.filter(
          item => item.multipleIvsGroupName === res.gatewayList[0].multipleIvsGroupName
        )
        const selected = JSON.parse(JSON.stringify(tableData[0]))
        selected.gatewayIp = []
        tableData.forEach(item => {
          selected.gatewayIp.push(item.gatewayIp)
        })
        this.getGateWay(selected)
        this.submitForm1()
      }
    },
    submitForm1() {
      if (!this.choosedGateWay.gatewayGroup || !this.choosedGateWay.gatewayIp) {
        this.form.gatewayGroup = ''
        this.sendGatewayGroup = ''
        this.sendGatewayIpArr = ''
      } else {
        let gatewayIpArr = []
        for (let i = 0; i < this.choosedGateWay.gatewayIp.length; i++) {
          gatewayIpArr.push(' ' + this.choosedGateWay.gatewayIp[i])
        }
        this.form.gatewayGroup =
          this.choosedGateWay.gatewayGroup + '(' + gatewayIpArr.join(',') + ')'
        this.sendGatewayGroup = this.choosedGateWay.gatewayGroup
        this.sendGatewayIp = gatewayIpArr[0]
        if (this.currentPlatType === PLATFORM_TYPE.AVS) {
          this.getAvsConfig()
        }
      }

      this.showGateWay = false
    },

    changeAuthType() {
      this.$nextTick(() => {
        this.$refs['form'].clearValidate(['platformProtocolInfo.accessUserId'])
        this.$refs['form'].clearValidate(['platformProtocolInfo.accessToken'])
      })
    },

    submitHandler() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$parent.maskloading = true

          let form = JSON.parse(JSON.stringify(this.form))

          form.platformType = form.platformType[1]

          form.platformProtocolInfo.accessAuthType = Number(
            form.platformProtocolInfo.accessAuthType
          )

          form.gatewayGroup = this.sendGatewayGroup

          if (form.platformProtocolInfo.accessProtocolType != 3) {
            form.platformLevelType = 2
          }

          if (form.platformProtocolInfo.accessNetworkType == 1) {
            delete form.platformIntranetIp
            delete form.platformIntranetPort
          } else if (form.platformProtocolInfo.accessNetworkType == 2) {
            delete form.platformNetworkIp
            delete form.platformNetworkPort
          }

          if (this.$parent.operation) {
            if (form.platformId) {
              delete form.platformId
            }

            this.$api.addAccessPlatformInfo(form).then(res => {
              this.successBack(res)
            })
          } else {
            Object.assign(form, {
              platformId: this.$parent.choosedPlatformId
            })
            // AVS平台 不传密码
            if (this.currentPlatType === PLATFORM_TYPE.AVS) {
              if (form.platformProtocolInfo.accessPassword) {
                delete form.platformProtocolInfo.accessPassword
              }
              if (form.platformProtocolInfo.accessSecret) {
                delete form.platformProtocolInfo.accessSecret
              }
            }

            this.$api.modifyAccessPlatformInfo(form).then(res => {
              this.successBack(res)
            })
          }
        }
      })
    },
    async setAvsConfig() {
      const {
        storageEnable,
        storageServerAddr,
        mediaServerAddr,
        serverDomain,
        sipServerIp,
        sipServerPort,
        syncChannelNameEnable,
        accessServerIp,
        accessServerPort
      } = this.form.avsConfig
      await this.$api.avsConfigUpdate({
        gatewayGroup: this.sendGatewayGroup,
        gatewayIp: this.sendGatewayIp,
        storageEnable,
        storageServerAddr,
        mediaServerAddr,
        serverDomain,
        sipServerIp,
        sipServerPort,
        syncChannelNameEnable,
        accessServerIp,
        accessServerPort
      })
    },
    successBack(res) {
      if (res.resultCode == 0) {
        this.$message({
          type: 'success',
          message: this.$parent.operation
            ? this.$t('public.addSuccess')
            : this.$t('public.modifySuccess')
        })
        this.$parent.dialogFormVisible = false
        if (this.currentPlatType === PLATFORM_TYPE.AVS) {
          this.setAvsConfig()
        }
        this.$parent.getList()
      }
      this.$parent.maskloading = false
    }
  }
}
</script>

<style lang="scss">
#accessPlatformAddDialog {
  .el-dialog__body {
    padding: 20px;
  }

  .appendIpt {
    .el-input .el-input__inner {
      width: 180px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    .el-input .el-input-group__append {
      color: #000;
      background-color: transparent;
      padding: 0 8px;
      border: none;
    }
  }

  .el-form-item.long-error {
    margin-bottom: 28px;
  }

  .el-cascader {
    width: 100%;
  }

  .el-input__inner {
    height: 36px;
    border-radius: 4px;
    background: transparent;
    color: #232c3b;
  }

  .el-form-item__label {
    color: #333;
    padding: 0 5px 0 0;
  }

  .single-line {
    width: 100%;
    box-sizing: border-box;

    .el-textarea__inner {
      background: transparent;
      border-radius: 4px;
      height: 100px;
      border: 1px solid #c1c7d0;
      color: #232c3b;
    }
  }

  .platformScaleCol {
    .el-form-item {
      width: 100%;
    }

    .el-input {
      width: 80% !important;
    }
  }

  .accessGatewayConfig {
    padding: 20px;
    background: #f8f8f9;
    border-radius: 4px;

    .el-radio-group {
      margin-bottom: 25px;

      .el-radio-button__inner {
        margin-right: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #595959;
        background: transparent;
      }

      .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        border-radius: 100px;
        background: rgba(44, 109, 210, 0.1);
        color: #2c6dd2;
        box-shadow: none;
      }
    }
  }
}
</style>
