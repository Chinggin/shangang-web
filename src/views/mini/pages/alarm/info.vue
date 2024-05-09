<template>
  <div class="alarm-info-wrapper">
    <div class="top-filter-wrapper">
      <el-tabs v-model="filterForm.confirmState" @tab-click="handleChangeStatus">
        <el-tab-pane :label="$t('home.noHandle')" name="0"></el-tab-pane>
        <el-tab-pane :label="$t('home.handled')" name="1"></el-tab-pane>
        <el-tab-pane :label="$t('public.all')" name="2"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="filter-wrapper">
      <el-form :inline="true" :model="filterForm">
        <el-form-item :label="$t('alarm.alarmScene')">
          <el-select v-model="filterForm.scene" @change="handleChangeScene" :placeholder="$t('alarm.alarmSource')">
            <el-option :label="$t('public.all')" value=""></el-option>
            <el-option v-for="(item, index) in alarmSceneData" :key="index" :label="item.name"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('alarm.alarmType')">
          <el-select v-model="filterForm.typeCodes" :placeholder="$t('alarm.alarmType')">
            <el-option :label="$t('public.all')" value></el-option>
            <el-option v-for="item in alarmTypeList" :key="item.alarmType"
              :label="isZh ? item.alarmName : item.alarmEnName" :value="item.alarmType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('alarm.alarmLevel')">
          <el-select v-model="filterForm.alarmLevel" :placeholder="$t('alarm.alarmLevel')">
            <el-option :label="$t('public.all')" value></el-option>
            <el-option v-for="(item, index) in alarmLevelList" :key="index" :label="item.alarmLevelName"
              :value="item.alarmLevelId"></el-option>
            <!-- <el-option :label="$t('home.level1')" :value="1"></el-option>
            <el-option :label="$t('home.level2')" :value="2"></el-option>
            <el-option :label="$t('home.level3')" :value="3"></el-option>
            <el-option :label="$t('home.level4')" :value="4"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('public.startTime')">
          <el-date-picker v-model="filterForm.beginTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00" :editable="false" :picker-options="pickerOptions" :clearable="false"
            :placeholder="$t('public.startTime')"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('public.endTime')">
          <el-date-picker v-model="filterForm.endTime" :picker-options="pickerOptions" type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :editable="false" :clearable="false"
            :placeholder="$t('public.endTime')"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('public.similarity')">
          <el-slider v-model="filterForm.similarity" :min="0" :max="100" style="width: 100px;"></el-slider>
        </el-form-item>
        <el-form-item :label="$t('alarm.alarmDevice')" class="deviceSel">
          <div class="camera-resource">
            <div class="camera-radio">
              <el-radio-group v-model="filterForm.type">
                <el-radio :label="1">{{ $t('public.all') }}</el-radio>
                <el-radio :label="2">{{ $t('public.selectCamera') }}</el-radio>
              </el-radio-group>
            </div>
            <div class="camera" v-if="filterForm.type == 2">
              <el-input readonly :placeholder="placeholder" @click.native="handleClickCamera">
                <img slot="suffix" class="tree-img" src="./images/tree.png" />
              </el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item style="float: right" class="btns">
          <el-button type="primary" @click="exportAlarms">{{ $t('public.export') }}</el-button>
          <el-button type="primary" @click="handleSearch">{{ $t('public.search') }}</el-button>
          <el-button @click="handleReset">{{ $t('public.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="alarm-content-wrapper">
      <CardList :data="tableData" :columns="5" :total="total" :pageNo="listQuery.pageNo" :pageSize="listQuery.pageSize"
        :pager="true" @page-change="handlePageChange" @size-change="handleSizeChange">
        <template slot-scope="{ item }">
          <div class="alarm-item">
            <div class="alarm-title">
              <div class="left">
                <div class="alarm-icon">
                  <div class="icon iconfont icon-jinggao" :class="setLevelClass(item.alarmLevel)"></div>
                  <!--                  <img src="./images/alarm.png" alt="" />-->
                  <!--                  <i class="el-icon-warning"></i>-->
                </div>
                <div class="alarm-type" :title="item.alarmTypeName">{{ item.alarmTypeName }}</div>
              </div>
              <div class="handle-status" :class="item.confirmState == 0 ? 'red' : ''">
                {{ item.confirmState == 0 ? $t('home.noHandle') : $t('home.handled') }}
              </div>
            </div>
            <div class="alarm-content">
              <!-- 高频人员告警不以相似度值做判断 只显示一张图 ，其他的有相似度就显示双图和相似度 -->
              <template v-if="!!item.alarmSnapUrl">
                <div class="alarm-img" v-if="item.alarmType == 'STRANGER_HIGH_FREQUENCY_PERSONNEL_ALARM' ||
        !item.similarity ||
        item.similarity == '0.0' ||
        item.similarity == 'null'
        ">
                  <img v-viewer :src="item.alarmSnapUrl" alt />
                </div>
                <div class="alarm-img-person" v-else>
                  <div class="person-img">
                    <img v-viewer :src="item.alarmSnapUrl" alt />
                    <img v-viewer :src="item.facePhoto" alt />
                  </div>
                  <div class="alarm-detail-item" v-if="item.similarity">
                    <div class="item-label similarity">{{ $t('public.similarity') }}</div>
                    <div class="item-value">{{ Number(item.similarity).toFixed(2) }}%</div>
                  </div>
                </div>
              </template>
              <div class="alarm-detail" @click.stop="handleDetail(item)">
                <div class="alarm-detail-item">
                  <div class="item-label">{{ $t('alarm.alarmLevel') }}</div>
                  <div class="item-value" :class="setLevelClass(item.alarmLevel)">
                    {{ item.alarmLevel | formatStatus(that) }}
                  </div>
                </div>
                <div class="alarm-detail-item">
                  <div class="item-label">{{ $t('alarm.alarmDevice') }}</div>
                  <div class="item-value" :title="item.alarmDevName">{{ item.alarmDevName }}</div>
                </div>
                <div class="alarm-detail-item">
                  <div class="item-label">{{ $t('alarm.alarmTime') }}</div>
                  <div class="item-value" :title="item.alarmTime">{{ item.alarmTime }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </CardList>
    </div>

    <choseCamera v-if="choseCameraDialog" @close="handleCloseChoseCamera" @updateChoseDevice="updateChoseDevice"
      :choseDeviceList="choseDeviceList"></choseCamera>
    <alarmDetail :visible.sync="bigCardVisible" :infoObj="alarmData" @closeIcon="closeIconMethod"
      @handleRight="handleRight"></alarmDetail>
  </div>
</template>

<script>
import { download } from '@/utils/download'
import CardList from '../../../../components/CardList'
import Dayjs from '../../../../utils/Dayjs'
import {
  getAlarmNewTypes,
  getAlarmTypeGroup,
  getAlarmTypes,
  getGuardHitInfo,
  getAlarmInfo,
  exportAlarm,
  listAlarmLevelByPage

} from '../../../../utils/api'


import alarmDetail from './component/alarmDetail.vue'
import choseCamera from '../IntelligentApplication/components/chose-camera'
import { permissions } from '../../../../utils/permissions'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'info',
  components: {
    CardList,
    alarmDetail,
    choseCamera,
  },
  computed: {
    isZh() {
      return localStorage.getItem('locale') != 'en'
    },
    ...mapState({
      alarmSceneData: (state) => state.dict['ecs-alarm-type-scene'], // 告警场景
    }),
  },
  data() {
    return {
      that: this,
      placeholder: this.$t('public.selectCamera'),
      choseDeviceList: [],
      bigCardVisible: false,
      choseCameraDialog: false,
      pickerOptions: {
        // selectableRange: (() => {
        //   let data = new Date()
        //   let hour = data.getHours()
        //   let minute = data.getMinutes()
        //   let second = data.getSeconds()
        //   return [`00:00:00-${hour}:${minute}:${second}`]
        // })(),
        disabledDate(time) {
          //Date.now()是javascript中的内置函数，它返回自1970年1月1日00:00:00 UTC以来经过的毫秒数。
          return time.getTime() > Date.now()
        },
      },
      alarmData: {},
      filterForm: {
        type: 1,
        scene: '',
        typeCodes: '',
        alarmLevel: '',
        confirmState: '0',
        beginTime: '',
        endTime: '',
      },
      tableData: [],
      total: 0,
      isHandle: true,
      filterDate: [],
      alarmTypeList: [],
      //警告等级列表
      alarmLevelList: [],
      alarmGroupTypeArray: [],
      listQuery: {
        pageNo: 1,
        pageSize: 20,
      },
      alarmTypes: {
        WHITELIST_PERSONNEL_ALERT: 1, //白名单
        BLACKLIST_PERSONNEL_ALERT: 2, //嘿名单
        STRANGER_HIGH_FREQUENCY_PERSONNEL_ALARM: 3, //高频人员
      },
    }
  },
  filters: {
    formatStatus(val, that) {
      if (val == 1) {
        return that.$t('home.level1')
      } else if (val == 2) {
        return that.$t('home.level2')
      } else if (val == 3) {
        return that.$t('home.level3')
      } else if (val == 4) {
        return that.$t('home.level4')
      }
    },
  },
  created() {
    this.handleGetAlarmType()
    this.getSysDictData(['ecs-alarm-type-scene'])
    this.handleDict()
  },
  mounted() {
    // web端带参跳转接收处理
    if (this.$route.params.deviceId) {
      this.filterForm.type = 2
      this.choseDeviceList = [{ id: this.$route.params.deviceId, label: this.$route.params.deviceName }]
      this.placeholder = this.$t('public.placeholder', { num: 1 })
    }
    this.filterForm.beginTime = `${Dayjs().format('YYYY-MM-DD')} 00:00:00`
    this.filterForm.endTime = `${Dayjs().format('YYYY-MM-DD')} 23:59:59`
    this.getAlarmList()
    this.$EventBus.$on('update', this.handleSearch)
    // qt端带参跳转接收处理
    this.$EventBus.$on('setAlarmParam', (item) => {
      if (item && item.deviceId) {
        this.filterForm.type = 2
        this.choseDeviceList = [{ id: item.deviceId, label: item.deviceName }]
        this.placeholder = this.$t('public.placeholder', { num: 1 })
      }
      this.getAlarmList()
    })
  },
  beforeDestroy() {
    this.$EventBus.$off('update', this.handleSearch)
    this.$EventBus.$off('setAlarmParam')
  },
  methods: {
    ...mapActions('dict', ['getSysDictData']),
    //用户权限判断
    async getPermissions() {
      this.isHandle = await permissions(715) //处理权限
      if (this.isHandle) {
        this.filterForm.confirmState = '0'
        this.handleGetList()
      } else {
        this.filterForm.confirmState = '2'
        this.handleGetList()
      }
    },
    exportAlarms() {
      let params = {
        // pageInfo: {
        //   pageNum: this.listQuery.pageNo,
        //   pageSize: this.listQuery.pageSize,
        // },
      }
      if (this.filterForm.typeCodes !== '') {
        params.typeCodes = [this.filterForm.typeCodes]
      }
      if (this.filterForm.alarmLevel !== '') {
        params.alarmLevels = [this.filterForm.alarmLevel]
      }
      if (this.filterForm.similarity != '') {
        params.similarity = this.filterForm.similarity
      }
      if (this.filterForm.scene != '') {
        params.scene = this.filterForm.scene
      }
      if (this.filterForm.confirmState !== '2') {
        params.confirmStates = this.filterForm.confirmState == 0 ? [0] : [1, 2, 3]
      }
      if (this.filterForm.type == 2) {
        if (!this.choseDeviceList.length) {
          this.$message.warning(`${this.$t('public.please')}${this.$t('public.camera')}`)
          return
        } else {
          params.deviceIds = this.choseDeviceList.map((item) => item.id)
          console.log(params.deviceIds)
        }
      } else {
        params.deviceIds = []
      }

      params.beginTime = this.filterForm.beginTime
      params.endTime = this.filterForm.endTime
      exportAlarm(params).then((res) => {
        if (res.resultCode == 0) {
          download(res.fileUrl, 'alarm data')
        }
      })
    },
    async handleDict() {
      const result = await getAlarmTypeGroup({})
      if (result.resultCode == 0) {
        this.alarmGroupTypeArray = result.alarmGroups
      }
    },
    handleCloseChoseCamera(cameraNum, cameraList) {
      // console.log(cameraNum, cameraList)
      this.placeholder = this.$t('public.placeholder', { num: cameraNum })
      this.choseDeviceList = cameraList
      if (!this.choseDeviceList.length) {
        this.placeholder = this.$t('public.selectCamera')
      }
      this.choseCameraDialog = false
    },
    updateChoseDevice(cameraList) {
      this.choseDeviceList = cameraList
    },
    //点击弹窗摄像机列表
    handleClickCamera() {
      // console.log('aaa')
      this.choseCameraDialog = true
    },
    setLevelClass(val) {
      if (val == 1) {
        return 'level1'
      } else if (val == 2) {
        return 'level2'
      } else if (val == 3) {
        return 'level3'
      } else if (val == 4) {
        return 'level4'
      }
    },
    handleChangeStatus(val) {
      this.handleSearch()
    },
    closeIconMethod() {
      this.bigCardVisible = false
      this.alarmData = {}
    },
    handleDetail(item) {
      const loading = this.$loading({
        lock: true,
        text: this.$t('public.loading'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      //告警详情
      getGuardHitInfo({ alarmId: item.alarmId })
        .then(async (res) => {

          if (res.resultCode == 0) {
            if (res.guardHitInfo && Object.keys(res.guardHitInfo).length) {
              loading.close()
              this.alarmData = {
                ...item,
                ...res.guardHitInfo,
                alarmId: item.alarmId,
              }
            } else {
              await getAlarmInfo({ alarmId: item.alarmId, alarmTime: item.alarmTime }).then((res) => {
                loading.close()
                if (res.alarmInfo && Object.keys(res.alarmInfo).length) {
                  this.alarmData = {
                    ...item,
                    captureImage: item.alarmSnapUrl,
                    alarmName: item.alarmTypeName,
                    deviceName: item.alarmDevName,
                    hitTime: item.alarmTime,
                    ...res.alarmInfo,
                    facePhoto: item.facePhoto, //前端相机告警，es此字段不正确，使用列表数据
                  }
                  console.log(this.alarmData)
                } else {
                  this.alarmData = {
                    ...item,
                    captureImage: item.alarmSnapUrl,
                    alarmName: item.alarmTypeName,
                    deviceName: item.alarmDevName,
                    hitTime: item.alarmTime,
                  }
                }
              })
            }
            this.alarmData.alarmGroupName = this.alarmGroupTypeArray.find(
              (a) => a.groupCode == item.alarmGroup
            )?.groupName
            this.bigCardVisible = true
          }
        })
        .catch(() => {
          loading.close()
        })
    },
    handleChangeScene() {
      this.$set(this.filterForm, 'typeCodes', '')
      this.handleGetAlarmType()
    },
    async handleGetAlarmType() {


      let data = {
        pageInfo: {
          pageNum: 1,
          pageSize: 10
        }
      }
      console.log(listAlarmLevelByPage)
      const a = await listAlarmLevelByPage(data)

      await listAlarmLevelByPage(data).then(res => {
        console.log(res)
        if (res.alarmLevelList) {
          this.alarmLevelList = res.alarmLevelList
        }
      })


      let params = {
        pageInfo: {
          pageNum: 1,
          pageSize: 1000,
        },
        searchInfo: { scene: this.filterForm.scene },
      }
      const result = await getAlarmTypes(params)

      if (result.resultCode == 0) {
        this.alarmTypeList = result.alarmTypeList
      }
      // console.log(result)
    },
    handlePageChange(pageNo) {
      this.listQuery.pageNo = pageNo
      this.getAlarmList()
    },
    handleSizeChange(size) {
      this.listQuery.pageNo = 1
      this.listQuery.pageSize = size
      this.getAlarmList()
    },
    handleSearch() {
      if (this.filterForm.beginTime && !this.filterForm.endTime) {
        this.$message.warning(`${this.$t('public.please')}${this.$t('public.endTime')}`)
        return
      }
      if (!this.filterForm.beginTime && this.filterForm.endTime) {
        this.$message.warning(`${this.$t('public.please')}${this.$t('public.startTime')}`)
        return
      }
      // if (new Date(this.filterForm.endTime).getTime() > new Date().getTime()) {
      //   this.filterForm.endTime = `${Dayjs().format('YYYY-MM-DD HH:mm:ss')}`
      // }
      if (new Date(this.filterForm.beginTime).getTime() > new Date(this.filterForm.endTime).getTime()) {
        this.$message.warning(this.$t('public.startGtEnd'))
        return
      }
      this.listQuery.pageNo = 1
      this.getAlarmList()
    },
    handleReset() {
      this.filterForm = {
        type: 1,
        scene: '',
        typeCodes: '',
        alarmLevel: '',
        confirmState: this.filterForm.confirmState,
        beginTime: `${Dayjs().format('YYYY-MM-DD')} 00:00:00`,
        endTime: `${Dayjs().format('YYYY-MM-DD')} 23:59:59`,
      }
      this.choseDeviceList = []
      this.placeholder = this.$t('public.selectCamera')
      this.listQuery.pageNo = 1
      this.handleSearch()
    },
    // 处理成功
    handleRight() {
      this.handleSearch()
    },
    async getAlarmList() {
      let params = {
        pageInfo: {
          pageNum: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
        },
        // ...this.filterForm,
        // typeCodes:!!this.filterForm.typeCodes ? [this.filterForm.typeCodes] : [],
        // alarmLevel:!!this.filterForm.alarmLevel ? [this.filterForm.alarmLevel] : [],
        // confirmState:!!this.filterForm.confirmState ? [this.filterForm.confirmState] : [],
      }
      if (this.filterForm.typeCodes !== '') {
        params.typeCodes = [this.filterForm.typeCodes]
      }
      if (this.filterForm.alarmLevel !== '') {
        params.alarmLevels = [this.filterForm.alarmLevel]
      }
      if (this.filterForm.similarity != '') {
        params.similarity = this.filterForm.similarity
      }
      if (this.filterForm.scene != '') {
        params.scene = this.filterForm.scene
      }
      if (this.filterForm.confirmState !== '2') {
        params.confirmStates = this.filterForm.confirmState == 0 ? [0] : [1, 2, 3]
      } else {
        params.confirmStates = ''
      }
      if (this.filterForm.type == 2) {
        if (!this.choseDeviceList.length) {
          this.$message.warning(`${this.$t('public.please')}${this.$t('public.camera')}`)
          return
        } else {
          params.deviceIds = this.choseDeviceList.map((item) => item.id)
          console.log(params.deviceIds)
        }
      } else {
        params.deviceIds = []
      }

      params.beginTime = this.filterForm.beginTime
      params.endTime = this.filterForm.endTime
      Object.keys(params).map((key) => {
        if (params[key] === '') {
          delete params[key]
        }
      })
      const loading = this.$loading({
        lock: true,
        text: this.$t('public.loading'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      let res = await this.$api.API.getAlarmListNew(params)
      loading.close()
      if (res && res.resultCode == 0) {
        this.tableData = res.alarmList
        this.total = res.pageInfo.totalNum
      }
    },
  },
}
</script>

<style scoped lang="scss">
.alarm-info-wrapper {
  background-color: transparent;
  box-sizing: border-box;
  width: 1700px;
  height: 100%;
  margin: 20px auto;
  position: relative;

  ::v-deep.el-tabs {
    .el-tabs__item {
      color: #fff;
      font-size: 16px;
      font-weight: bold;

      &.is-active {
        color: #409eff;
      }
    }

    .el-tabs__nav-wrap {
      &::after {
        height: 1px;
      }
    }
  }

  .filter-wrapper {
    ::v-deep.el-form {
      .el-slider {
        width: 140px;
      }

      .el-form-item {
        width: 20%;
        margin-right: 0;
      }

      .deviceSel {
        width: fit-content;
      }
    }

    .el-date-editor,
    .el-select {
      width: 200px;
    }

    .btns {
      text-align: right;
    }
  }

  .alarm-content-wrapper {
    width: 100%;
    height: calc(100% - 130px);
    clear: both;
  }
}

.camera-resource {
  display: flex;
  width: 400px;

  // margin-right: 15px;
  .camera-radio {
    flex: 1;
    white-space: nowrap;
  }

  .camera {
    flex: 1;
    width: 100%;
  }

  .tree-img {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 5px;
    top: 6px;
  }
}

.level1 {
  color: #ff4d4f;
}

.level2 {
  color: #ff4e00;
}

.level3 {
  color: #ffa900;
}

.level4 {
  color: #00ccff;
}

.alarm-item {
  font-size: 14px;
  background-color: #173252;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 5px;
  color: #fff;

  .alarm-title {
    display: flex;
    margin-bottom: 15px;
    font-size: 14px;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      .alarm-icon {
        width: 16px;
        height: 14px;
        color: #ff4d4f;

        .icon {
          background-color: transparent;
          font-size: 14px;
        }

        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .alarm-type {
        flex: 1;
        margin-left: 5px;
        overflow: hidden;
        white-space: nowrap;
        /*文字超出宽度则显示ellipsis省略号*/
        text-overflow: ellipsis;
      }
    }

    .handle-status {
      color: #17cd57;
      font-size: 12px;
      white-space: nowrap;

      &.red {
        color: #ff4d4f;
      }
    }
  }

  .alarm-content {
    display: flex;
    height: 80px;

    .alarm-img {
      width: 90px;
      height: 80px;
      background-color: #ccc;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .similarity {
      color: #1efffc;
    }

    .alarm-img-person {
      width: 90px;
      height: 80px;
      display: flex;
      flex-direction: column;

      .person-img {
        display: flex;
        height: 45px;
        justify-content: space-between;

        img {
          width: 45%;
          height: 90%;
        }
      }

      .alarm-detail-item {
        display: flex;
        color: #ddd;
        margin-bottom: 5px;
        font-size: 12px;

        .item-label {
          margin-right: 5px;
          color: #ccc;
          white-space: nowrap;

          &:after {
            content: ':';
          }
        }

        .item-value {
          overflow: hidden;
          white-space: nowrap;
          /*文字超出宽度则显示ellipsis省略号*/
          text-overflow: ellipsis;
        }
      }
    }

    .alarm-detail {
      margin-left: 10px;
      flex: 1;
      overflow: hidden;
      font-size: 12px;
      cursor: pointer;

      .alarm-detail-item {
        display: flex;
        color: #ddd;
        margin-bottom: 5px;

        .item-label {
          margin-right: 5px;
          color: #ccc;
          white-space: nowrap;

          &:after {
            content: ':';
          }
        }

        .item-value {
          overflow: hidden;
          white-space: nowrap;
          /*文字超出宽度则显示ellipsis省略号*/
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
