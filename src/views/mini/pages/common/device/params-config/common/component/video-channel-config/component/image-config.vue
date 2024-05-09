<template>
  <div class="image-config config-form" style="overflow-y: auto">
    <el-form ref="displayForm" :model="displayForm" :rules="displayFormRules" label-position="top" style="height: auto"
      :disabled="!PermissionCameraManage">
      <p class="form-title">{{ $t('cameraConfiguration.videoChannel.screenSetting') }}</p>
      <div class="mb-4">
        <span class="text-blue-400">{{ $t('cameraConfiguration.videoChannel.settingTip') }}</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('cameraConfiguration.videoChannel.brightness')" prop="brightness">
            <el-slider v-model="displayForm.brightness" :max="displayMaxNum" show-input
              @change="submitDisplayForm"></el-slider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('cameraConfiguration.videoChannel.contrast')" prop="contrast">
            <el-slider v-model="displayForm.contrast" :max="displayMaxNum" show-input
              @change="submitDisplayForm"></el-slider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('cameraConfiguration.videoChannel.hue')" prop="hue">
            <el-slider v-model="displayForm.hue" :max="displayMaxNum" show-input
              @change="submitDisplayForm"></el-slider>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('cameraConfiguration.videoChannel.saturation')" prop="saturation">
            <el-slider v-model="displayForm.saturation" :max="displayMaxNum" show-input
              @change="submitDisplayForm"></el-slider>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form ref="osdForm" :model="osdForm" :rules="osdFormRules" label-position="top" style="height: auto"
      :disabled="!PermissionCameraManage">
      <p class="form-title">{{ $t('cameraConfiguration.videoChannel.osdSetting') }}</p>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item prop="cameraTimeOsdInfo.enableOSDTime">
                <el-checkbox v-model="osdForm.cameraTimeOsdInfo.enableOSDTime" :true-label="1" :false-label="0"
                  :disabled="!boardReady || !enabledOsd" @change="handleEnableOSDTimeChange">
                  {{ $t('cameraConfiguration.videoChannel.enableOSDTime') }}
                </el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="mb-5">
        <el-col :span="12">{{ $t('cameraConfiguration.videoChannel.showOSDText') }}</el-col>
        <el-col :span="12">{{ $t('cameraConfiguration.videoChannel.videoPreview') }}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-row :gutter="20" v-for="(item, index) in osdForm.cameraOsdInfoList" :key="index">
            <el-col :span="2">
              <el-form-item :prop="`cameraOsdInfoList.${index}.enableOSDName`">
                <el-checkbox v-model="item.enableOSDName" :disabled="!boardReady || !enabledOsd" :true-label="1"
                  :false-label="0" @change="handleEnableOSDItemChange($event, index)"></el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item :prop="`cameraOsdInfoList.${index}.osdNameText`" :rules="osdFormRules.osdNameText">
                <el-input v-model.trim="item.osdNameText" :disabled="!boardReady || !enabledOsd || !item.enableOSDName"
                  :placeholder="$t('cameraConfiguration.videoChannel.osdNameTextPlaceHolder')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="text-center">
            <el-button type="text" v-show="osdForm.cameraOsdInfoList.length < osdTextMaxNum"
              :disabled="!boardReady || !enabledOsd" @click="handleAddOsdItemClick">
              <svg-icon iconClass="add-input" className="iconClass" />
            </el-button>
          </el-row>
        </el-col>
        <el-col :span="12">
          <videoDrawboard ref="drawboard" :controls="[]" :video-url="videoUrl" @board-mounted="handleBoardMounted"
            @object-mouseup="handleObjectMouseUp" />
        </el-col>
      </el-row>
    </el-form>

    <div class="footer" v-show="support">
      <el-button class="bt-defult" v-if="$parent.cuType !== '1'" @click="$parent.goBack">
        {{ $t('public.cancel') }}
      </el-button>
      <el-button v-if="PermissionCameraManage" type="primary" @click="submitOSDForm">
        {{ $t('public.confirm') }}
      </el-button>
    </div>
    <div class="empty-wrapper" v-show="!support">
      <el-empty :image="$parent.emptyImg" :image-size="388"
        :description="$t('mainDevConfiguration.platformNotSupported')" />
    </div>
  </div>
</template>
<script>
import videoDrawboard from '@/components/videoDrawboard'
import { SHAPE_TYPE } from '@/components/videoDrawboard/constant'
import { mapGetters, mapState } from 'vuex'
import { validateSpecialWord1 } from '@/utils/common/validator'
import { handleGetPreviewWss } from '@/utils/common/preViewImg'
export default {
  props: {
    support: {
      type: Boolean,
      default: true
    }
  },
  components: {
    videoDrawboard
  },
  data() {
    return {
      displayForm: {
        brightness: 0,
        contrast: 0,
        hue: 0,
        saturation: 0
      },
      displayFormRules: {},
      osdForm: {
        allEnableOsd: 0,
        cameraTimeOsdInfo: {
          enableOSDTime: 0,
          timeFormat: 1,
          rectInfo: {}
        },
        cameraOsdInfoList: [
          {
            enableOSDName: 0,
            osdNameText: '',
            rectInfo: {}
          }
        ]
      },
      videoUrl: '',
      boardReady: false,
      osdWidth: 0.35,
      osdHeight: 0.06,
      osdGutter: 0.06
    }
  },
  computed: {
    ...mapState({
      selectedCameraId: state => state.deviceConfig.cameraId
    }),
    ...mapGetters('deviceConfig', ['drive', 'PermissionCameraManage']),
    osdFormRules() {
      return {
        osdNameText: [
          {
            max: 44,
            message: this.$t('public.validate.charLimit', { num: 44 }),
            trigger: 'change'
          },
          {
            validator: validateSpecialWord1,
            trigger: 'blur'
          }
        ]
      }
    },
    enabledOsd() {
      return this.osdForm.allEnableOsd === 1
    },
    osdTextMaxNum() {
      return this.drive == 'HWSDK-ACREG' ? 6 : 8
    },
    displayMaxNum() {
      return this.drive == 'ONVIF' || this.drive == 'HWSDK-ACREG' ? 100 : 255
    }
  },
  watch: {
    selectedCameraId: {
      handler: async function () {
        await this.getCameraInfo()
      },
      immediate: true
    }
  },
  methods: {
    async getCameraInfo() {
      let res = await this.$api.getDevConfig({ deviceCode: this.selectedCameraId, configType: 6 })
      let res1 = await this.$api.getDevConfig({ deviceCode: this.selectedCameraId, configType: 22 })
      if (res.resultCode === 0) {
        this.displayForm = res.configItem
      }
      if (res1.resultCode === 0) {
        const defaultOsd = {
          allEnableOsd: 0,
          cameraTimeOsdInfo: {
            enableOSDTime: 0,
            timeFormat: 1,
            rectInfo: {},
          },
          cameraOsdInfoList: [
            {
              enableOSDName: 0,
              osdNameText: '',
              rectInfo: {},
            },
          ],
        }
        this.osdForm = { ...defaultOsd, ...res1.configItem }
        this.$refs.drawboard?.createPlayer()
      }
    },
    handleDelOsdItemClick(index) {
      this.osdForm.cameraOsdInfoList.splice(index, 1)
      this.updateRectInfo()
      this.reRenderKlass()
    },
    handleAddOsdItemClick() {
      const { cameraOsdInfoList } = this.osdForm
      if (cameraOsdInfoList.length >= 8) {
        this.$message({
          message: this.$t('cameraConfiguration.videoChannel.osdNameTextMaxNumPrompt', {
            num: this.osdTextMaxNum,
          }),
          type: 'warning',
        })
        return
      }
      cameraOsdInfoList.push({
        enableOSDName: 1,
        osdNameText: '',
        rectInfo: {
          type: SHAPE_TYPE.RECT,
          points: [
            {
              x: 0.01,
              y:
                (cameraOsdInfoList.length + 1) * this.osdHeight +
                cameraOsdInfoList.length * this.osdGutter
            }
          ]
        }
      })
      this.$refs.drawboard.render(
        [
          this.calcRenderData(
            cameraOsdInfoList[cameraOsdInfoList.length - 1],
            cameraOsdInfoList.length - 1
          )
        ],
        false
      )
    },
    // 获取实时浏览url
    async getLiveUrl() {
      try {
        const res = await this.$api.getLiveUrl({
          cameraId: this.selectedCameraId,
          streamType: 1,
          urlType: 6
        })
        return handleGetPreviewWss(res.url)
      } catch (e) {
        this.$message.error(this.$t('cameraConfiguration.videoChannel.getLiveUrlFailed'))
      }
    },
    // 初始化画板
    async initDrawboard() {
      const url = await this.getLiveUrl()
      if (url && this.$refs.drawboard) {
        this.boardReady = false
        this.videoUrl = url
      }
    },
    // 显示时间checkbox change事件处理
    handleEnableOSDTimeChange(val) {
      if (val === 1) {
        this.$refs.drawboard.render([this.calcRenderData(this.osdForm.cameraTimeOsdInfo)], false)
      } else {
        const { fCanvas } = this.$refs.drawboard.drawboard
        const objects = this.$refs.drawboard.getObjects()
        const klass = objects.find(item => item.get('id') === 8)
        if (klass) {
          fCanvas.remove(klass)
          fCanvas.renderAll()
        }
      }
    },
    handleEnableOSDItemChange(val, index) {
      if (val === 1) {
        this.$refs.drawboard.render(
          [this.calcRenderData(this.osdForm.cameraOsdInfoList[index], index)],
          false
        )
      } else {
        const { fCanvas } = this.$refs.drawboard.drawboard
        const objects = this.$refs.drawboard.getObjects()
        const klass = objects.find(item => item.get('id') === index)
        if (klass) {
          fCanvas.remove(klass)
          fCanvas.renderAll()
        }
      }
    },
    handleBoardMounted() {
      this.boardReady = true
      this.reRenderKlass()
    },
    async handleObjectMouseUp(klass, option) {
      await this.submitOSDForm()
    },
    reRenderKlass() {
      let rectInfos = []
      // 时间开启 渲染框
      if (this.osdForm.cameraTimeOsdInfo.enableOSDTime === 1) {
        rectInfos.push(this.calcRenderData(this.osdForm.cameraTimeOsdInfo))
      }
      if (this.osdForm.cameraOsdInfoList.length) {
        this.osdForm.cameraOsdInfoList.forEach((item, index) => {
          // osdtext 开启 渲染
          if (item.enableOSDName === 1) {
            rectInfos.push(this.calcRenderData(item, index))
          }
        })
      }
      if (rectInfos.length > 0) {
        this.$refs.drawboard.render(rectInfos)
      }
    },
    calcRenderData(item, index = 8) {
      const { type, points } = item.rectInfo
      return {
        type,
        points: [
          points[0],
          {
            x: Number((points[0].x + this.osdWidth).toFixed(2)),
            y: Number((points[0].y + this.osdHeight).toFixed(2))
          }
        ],
        options: {
          id: index
        }
      }
    },
    async submitOSDForm() {
      const osdFormValid = await this.$refs['osdForm'].validate()
      if (osdFormValid) {
        this.updateRectInfo()
        const osdForm = this.$loadash.cloneDeep(this.osdForm)
        osdForm.cameraTimeOsdInfo.rectInfo.points.splice(1, 1)
        osdForm.cameraOsdInfoList.forEach(item => {
          item.rectInfo.points.splice(1, 1)
        })
        const cameraMultiOsdConfig = {
          deviceCode: this.selectedCameraId,
          configType: 22,
          configItem: osdForm
        }
        const res = await this.$api.setDevConfig(cameraMultiOsdConfig)
        if (res.resultCode === 0) {
          this.$message({
            message: this.$t('cameraConfiguration.videoChannel.osdSetupSuccessful'),
            type: 'success'
          })
        }
      }
    },
    async submitDisplayForm() {
      const formValid = await this.$refs['displayForm'].validate()
      if (formValid) {
        const displayForm = this.$loadash.cloneDeep(this.displayForm)
        const res = await this.$api.setDevConfig({
          deviceCode: this.selectedCameraId,
          configType: 6,
          configItem: displayForm
        })
        if (res.resultCode === 0) {
          this.$message({
            message: this.$t('cameraConfiguration.videoChannel.displaySetupSuccessful'),
            type: 'success'
          })
        }
      }
    },
    updateRectInfo() {
      const drawboard = this.$refs.drawboard
      const objects = drawboard.getObjects()
      const timeKlass = objects.find(item => item.id === 8)
      if (timeKlass) {
        this.osdForm.cameraTimeOsdInfo.rectInfo = drawboard.normalizeSingleData(timeKlass)
      }
      if (this.osdForm.cameraOsdInfoList.length) {
        this.osdForm.cameraOsdInfoList.forEach((item, index) => {
          const textKlass = objects.find(item => item.id === index)
          if (textKlass) {
            this.osdForm.cameraOsdInfoList[index].rectInfo =
              drawboard.normalizeSingleData(textKlass)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.image-config {
  padding-right: 10px;
  height: 100%;
  overflow-y: auto;

  .el-radio-button__inner {
    background: transparent;
    color: #fffefe;
    border: 1px solid #0b537e;
    border-right: 0;
    height: auto;
  }

  .el-radio-button:first-child {
    .el-radio-button__inner {
      border-left: 1px solid #0b537e;
    }
  }

  .el-radio-button:last-child {
    .el-radio-button__inner {
      border-right: 1px solid #0b537e;
    }
  }

  .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background-color: #0e6294;
    border-color: #0e6294;
    -webkit-box-shadow: -1px 0 0 0 #0e6294;
    box-shadow: -1px 0 0 0 #0e6294;
  }

  .iconClass {
    display: inline-block;
    font-size: 20px;
    margin-top: -2px;
  }

  .el-slider__runway.show-input {
    margin-left: 10px;
  }
}
</style>
