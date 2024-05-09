<template>
  <!-- 镜头管理 -->
  <div class='base' id="device_camera" v-if="isRouterAlive" ref="deviceCamera" v-loading="pageloading"
    :element-loading-text="$t('public.batchImporting')" element-loading-background="rgba(0, 0, 0, 0.5)">
    <el-row>
      <el-col :span="4" class="el-row4">
        <el-scrollbar style="border-radius: 6px">
          <lazy-search-tree ref="lazyTree" @initList="initData" @nodeClick="treeNodeClick"
            :placeholderTitle="placeholderTitle" :withTenant="2" :treeApi="treeApi" :searchApi="searchApi"
            :locateApi="locateApi" />
        </el-scrollbar>
      </el-col>

      <el-col :span="20" class="el-row20">
        <div style="margin: 20px 0 20px">
          <el-button v-if="PermissionMove" type="primary" @click="handelChange" :disabled="changeBtn">
            {{ $t('deviceCamera.EquipmentMobile') }}
          </el-button>
          <el-button v-if="PermissionPlanSet" type="primary" :disabled="changeBtn" @click="Batchvideo">
            {{ $t('deviceCamera.VideoStrategy') }}
          </el-button>
          <el-button v-if="PermissionInfo" type="primary" @click="exportExcelModalVisible = true">
            {{ $t('deviceCamera.importCamera') }}
          </el-button>
        </div>
        <div class="search-form searchSelect">
          <el-form :inline="true" class="demo-form-inline" :label-width="locale == 'en' ? '155px' : '130px'" ref="form"
            :model="searchForm" label-position="left">
            <div class="flexstart">
              <el-form-item :label="$t('deviceCamera.cameraName') + ' ：'" prop="cameraName"
                :class="screenFlag ? 'screenthree' : 'flex-item'">
                <el-input v-model="searchForm.cameraName" auto-complete="off"
                  :placeholder="$t('deviceCamera.pleaseInputCameraName')" clearable maxlength="128"
                  @change="search_change" />
              </el-form-item>

              <el-form-item :label="$t('deviceCamera.cameraId') + ' ：'" prop="cameraId"
                :class="screenFlag ? 'screenthree' : 'flex-item'">
                <el-input v-model="searchForm.cameraId" auto-complete="off"
                  :placeholder="$t('deviceCamera.pleaseInputcameraId')" clearable maxlength="32"
                  @change="search_change" />
              </el-form-item>
              <el-form-item :label="$t('deviceCamera.ptzType') + ' ：'" prop="ptzType"
                :class="screenFlag ? 'screenthree' : 'flex-item'" v-if="screenFlag">
                <el-select v-model="searchForm.ptzType" @change="search_change">
                  <el-option :label="$t('public.all')" value></el-option>
                  <el-option v-for="(item, index) in ptzTypeData" :key="index" :label="item.name"
                    :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-show="showManyCondition">
              <div class="flexstart">
                <el-form-item :label="$t('deviceCamera.ptzType') + ' ：'" prop="ptzType"
                  :class="screenFlag ? 'screenthree' : 'flex-item'" v-if="!screenFlag">
                  <el-select v-model="searchForm.ptzType" @change="search_change">
                    <el-option :label="$t('public.all')" value></el-option>
                    <el-option v-for="(item, index) in ptzTypeData" :key="index" :label="item.name"
                      :value="item.value"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item :label="$t('deviceCamera.puIp') + ' ：'" prop="puIp"
                  :class="screenFlag ? 'screenthree' : 'flex-item'">
                  <el-input v-model="searchForm.puIp" auto-complete="off" :placeholder="$t('deviceCamera.inputPuIp')"
                    clearable />
                </el-form-item>
                <el-form-item :label="$t('public.thirdCameraId') + ' ：'" prop="thirdCameraId"
                  :class="screenFlag ? 'screenthree' : 'flex-item'" v-if="screenFlag">
                  <el-input v-model="searchForm.thirdCameraId" auto-complete="off"
                    :placeholder="$t('deviceCamera.pleaseInputthirdCameraId')" clearable maxlength="64"
                    @change="search_change" />
                </el-form-item>
                <el-form-item :label="$t('deviceCamera.platName') + ' ：'"
                  :class="screenFlag ? 'screenthree' : 'flex-item'" style="width: 36%" auto-complete="off" prop="platId"
                  v-if="screenFlag">
                  <el-select v-model="searchForm.platId" @change="search_change">
                    <el-option :label="$t('public.all')" value></el-option>
                    <el-option v-for="(item, index) in platNameList" :key="index" :label="item.platName"
                      :value="item.platId"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="flexstart">
                <el-form-item :label="$t('public.thirdCameraId') + ' ：'" prop="thirdCameraId"
                  :class="screenFlag ? 'screenthree' : 'flex-item'" v-if="!screenFlag">
                  <el-input v-model="searchForm.thirdCameraId" auto-complete="off"
                    :placeholder="$t('deviceCamera.pleaseInputthirdCameraId')" clearable maxlength="64"
                    @change="search_change" />
                </el-form-item>
                <el-form-item :label="$t('deviceCamera.platName') + ' ：'" style="width: 36%" auto-complete="off"
                  prop="platId" v-if="!screenFlag">
                  <el-select v-model="searchForm.platId" :placeholder="$t('deviceCamera.pleaseInputPlatId')"
                    @change="search_change">
                    <el-option :label="$t('public.all')" value></el-option>
                    <el-option v-for="(item, index) in platNameList" :key="index" :label="item.platName"
                      :value="item.platId"></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="flexstart">
                <el-form-item :label="$t('deviceCamera.cameraStatus') + ' ：'" prop="status"
                  :class="screenFlag ? 'screenthree' : 'flex-item'">
                  <el-select v-model="searchForm.status" @change="search_change">
                    <el-option v-for="(item, index) in statusList" :key="index" :label="item.statusname"
                      :value="item.statustype"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item :label="$t('public.manufacturer') + ' ：'" prop="manufacturer"
                  :class="screenFlag ? 'screenthree' : 'flex-item'">
                  <el-select v-model="searchForm.manufacturer" :placeholder="$t('public.pleaseInputmanufacturer')"
                    @change="search_change">
                    <el-option :label="$t('public.all')" value></el-option>
                    <el-option v-for="(item, index) in manufacturerData" :key="index" :label="item.name"
                      :value="item.value"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item :label="$t('public.longitude') + ' ：'" prop="longitude"
                  :class="screenFlag ? 'screenthree' : 'flex-item'" v-if="screenFlag">
                  <el-popover placement="bottom" width="175" trigger="click">
                    <div style="font-size: 12px">
                      <p>{{ $t('deviceCamera.longlatSearchPrompt1') }}</p>
                      <p>{{ $t('deviceCamera.longlatSearchPrompt3') }}</p>
                    </div>
                    <template #reference>
                      <el-input v-model="searchForm.longitude" auto-complete="off"
                        :placeholder="$t('public.pleaseInputlongitude')" clearable @change="search_change" />
                    </template>
                  </el-popover>
                </el-form-item>
              </div>

              <div class="flexstart">
                <el-form-item :label="$t('public.longitude') + '：'" prop="longitude"
                  :class="screenFlag ? 'screenthree' : 'flex-item'" v-if="!screenFlag">
                  <el-popover placement="bottom" width="175" trigger="click">
                    <div style="font-size: 12px">
                      <p>{{ $t('deviceCamera.longlatSearchPrompt1') }}</p>
                      <p>{{ $t('deviceCamera.longlatSearchPrompt3') }}</p>
                    </div>
                    <template #reference>
                      <el-input v-model="searchForm.longitude" auto-complete="off"
                        :placeholder="$t('public.pleaseInputlongitude')" clearable @change="search_change" />
                    </template>
                  </el-popover>
                </el-form-item>
                <el-form-item :label="$t('public.latitude') + ' ：'" prop="latitude"
                  :class="screenFlag ? 'screenthree' : 'flex-item'">
                  <el-popover placement="bottom" width="175" trigger="click">
                    <div style="font-size: 12px">
                      <p>{{ $t('deviceCamera.longlatSearchPrompt2') }}</p>
                      <p>{{ $t('deviceCamera.longlatSearchPrompt3') }}</p>
                    </div>
                    <template #reference>
                      <el-input v-model="searchForm.latitude" auto-complete="off"
                        :placeholder="$t('public.pleaseInputlatitude')" clearable @change="search_change" />
                    </template>
                  </el-popover>
                </el-form-item>
              </div>
            </div>
            <div class="search-btn">
              <el-button type="primary" @click="handleFind" class="miniBtn">
                {{ $t('public.search') }}
              </el-button>
              <div @click="manyCondition" class="manyCondition inputMiddle">
                <span>{{ $t('public.manyCondition') }}</span>
                <span :class="iconName"></span>
              </div>
            </div>
          </el-form>
        </div>
        <!-- //面包屑 -->
        <breadcrumb ref="breadcrumb" @changeTree="tree_change" />
        <div style="height: 600px" v-loading="loading" :element-loading-text="$t('public.loading')">
          <div v-if="!loading && !tableData.length" class="tableNOdata">
            <img src="@/assets/img/common/NOdata.png" alt />
            <p>{{ $t('public.noData') }}</p>
          </div>
          <!-- 表格 -->
          <el-table v-if="!loading && tableData.length" :row-class-name="tableRowClassName" :max-height="tableHeight"
            ref="multipleTable" :data="tableData" @selection-change="handleSelectionChange"
            @row-contextmenu="rowContextmenu" border>
            <template #empty>
              <span>{{ dataText }}</span>
            </template>
            <el-table-column label width="50" type="selection" />

            <el-table-column :label="$t('deviceCamera.cameraId')" min-width="110" show-overflow-tooltip prop="cameraId">
              <template #default="{ row }">
                <span>{{ row.cameraId }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('deviceCamera.cameraName')" min-width="100" show-overflow-tooltip
              prop="cameraName">
              <template #default="{ row }">
                <span>{{ row.cameraName }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('public.state')" min-width="70" show-overflow-tooltip prop="status">
              <template #default="{ row }">
                <span :class="row.status == '0'
    ? 'warning'
    : row.status == '1'
      ? 'success'
      : row.status == '2'
        ? 'danger'
        : ''
    ">
                  {{ setStatus(row.status) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('public.isEnabled')" min-width="80" show-overflow-tooltip prop="isEnabled">
              <template #default="{ row }">
                <span :class="row.isEnabled == '0' ? 'danger' : 'success'">
                  {{ setisEnabled(row.isEnabled) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('deviceCamera.puIp')" min-width="90" show-overflow-tooltip prop="puIp" />
            <el-table-column :label="$t('iotPlatform.platName')" min-width="90" show-overflow-tooltip prop="platName">
              <template #default="{ row }">
                <span>
                  {{ row.platName }}
                </span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('public.thirdCameraId')" min-width="90" show-overflow-tooltip
              prop="thirdCameraId">
              <template #default="{ row }">
                <span>
                  {{ row.thirdCameraId }}
                </span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('public.AffiliatedOrg')" min-width="100" show-overflow-tooltip
              prop="organizationName">
              <template #default="{ row }">
                <span>{{ row.organizationName }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('public.recordPolicy')" min-width="90" show-overflow-tooltip
              prop="recordPolicyName">
              <template #default="{ row }">
                <span>{{ row.recordPolicyName }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('public.createTime')" min-width="100" show-overflow-tooltip prop="createTime">
              <template #default="{ row }">
                <span>{{ row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('public.updateTime')" min-width="100" show-overflow-tooltip prop="updateTime">
              <template #default="{ row }">
                <span>{{ row.updateTime }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('public.operating')" min-width="160">
              <template #default="{ row }">
                <el-button type='text' class="cell-operate" style="word-break: break-word" @click="cameraDetails(row)"
                  v-if="PermissionInfo">
                  {{ $t('public.particulars') }}
                </el-button>
                <span style="margin-right: 7px; color: #10a9ff; cursor: pointer; word-break: break-word"
                  @click="paramsConfig(row)">
                  {{ $t('deviceCamera.paramsConfig') }}
                </span>
                <el-dropdown trigger="click" @command="handleCommand" v-if="PermissionAccessTo &&
    (row.platType == PLATFORM_TYPE.IVS || row.platType == PLATFORM_TYPE.ADS) &&
    row.drive == DRIVE_TYPE.T28181
    ">
                  <span style="color: #10a9ff; cursor: pointer; font-size: 12px" @click="GetLine(row)">
                    {{ $t('public.moreActions') }}
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item :command="beforeHandleCommand(row, 'a')">
                        <span class="blue">
                          {{ $t('deviceCamera.lensAccessConfigurationGeneration') }}
                        </span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>

          <!--分页-->
          <pagination v-if="!loading && tableData.length" :total="totalNum" v-model:pageNum="pageNum"
            v-model:limit="pageSize" @pagination="getListByPage"></pagination>
        </div>
      </el-col>
    </el-row>
    <!-- 批量设备移动 -->
    <batch-move-camera class="org_change" @orgChangeSubmit="orgChangeSubmit"></batch-move-camera>
    <!-- 批量导入失败 -->
    <import-fail-list></import-fail-list>
    <!-- 录像对话框 || 批量录像对话框 -->
    <camera-record class="camera-record" @recordSubmit="recordSubmit"
      @batchRecordSubmit="batchRecordSubmit"></camera-record>
    <!-- 批量录像失败列表 -->
    <el-dialog draggable :title="$t('deviceCamera.batchRecordingFailedList')" v-model="videoDialog"
      :close-on-click-modal="false" width="1000px" class="fail-dialog">
      <el-table max-height="469" :data="videofaList" style="margin: 20px 0 30px" :row-class-name="tableRowClassName"
        border>
        <el-table-column show-overflow-tooltip :label="$t('deviceCamera.cameraId')" prop="cameraId" min-width="130" />
        <el-table-column show-overflow-tooltip :label="$t('primaryDevice.resultDesc')" min-width="70"
          prop="resultDesc" />
      </el-table>
    </el-dialog>
    <!-- 详情对话框 -->
    <camera-detail></camera-detail>
    <!-- 修改对话框 -->
    <camera-modify></camera-modify>
    <!-- onenet配置 -->
    <camera-onenet></camera-onenet>
    <!-- 镜头接入配置生成弹框 -->
    <camera-register></camera-register>

    <batch-operate v-model:visible="batchDialogVisible" :multipleSelection="operate == $t('deviceCamera.importInfoGIS') ? batchList : multipleSelection
    " :what="$t('batchOperator.camera')" whatId="cameraId" whatName="cameraName"
      :multipleSelectionMany="multipleSelectionMany" :operate="operate" :batchApi="batchApi" @searchClear="search_clear"
      @getList="getCameraList" />

    <ExportExcelModal :title="$t('deviceCamera.exportCameraInfo')" v-model:visible="exportExcelModalVisible"
      :loadOption="exportExcelLoadFunc" :customErrorColumn="exportExcelErrorColumns"></ExportExcelModal>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { permissions } from '@/utils/common/permissions'
import { download } from '@/utils/common/download'
import { PLATFORM_TYPE } from '@/enums/platformEnum'
import { DRIVE_TYPE } from '@/enums/deviceEnum'
import { mapState, mapActions } from 'vuex'
import cameraModify from './component/camera-modify'
import cameraDetail from './component/camera-detail'
import cameraRecord from './component/camera-record'
import cameraOnenet from './component/camera-onenet'
import cameraRegister from './component/camera-register' //镜头接入配置生成
import importFailList from '@/views/mini/pages/common/component/import-fail-list'
import batchMoveCamera from './component/batch-move-camera'
import breadcrumb from '@/components/breadcrumb' //面包屑
import batchOperate from '@/components/batchOperate' //批量操作
import Excel from '@/components/excel/importExcel'
import { ExportExcelModal } from '@/components/batch'
import LazySearchTree from '@/components/lazy-search-tree'

import tableCopy from '@/mixin/tableCopy.js'

import judgeWindow from '@/mixin/judgeWindow'

export default {
  name: 'CameraManagement',
  mixins: [tableCopy, judgeWindow],
  components: {
    'camera-modify': cameraModify,
    'camera-detail': cameraDetail,
    'camera-record': cameraRecord,
    'camera-onenet': cameraOnenet,
    'camera-register': cameraRegister,
    'import-fail-list': importFailList,
    'batch-move-camera': batchMoveCamera,
    LazySearchTree,
    breadcrumb,
    'batch-operate': batchOperate,
    ExportExcelModal,
    Excel
  },
  data() {
    return {
      locale: localStorage.getItem('locale'),
      ifCanMoveDev: true, //判断是否能移动设备
      isRouterAlive: true,
      //零配置判断
      ifShowUnbind: false,
      treeLoading: false,
      //用户权限判断
      PermissionInfo: true,
      PermissionManage: true,
      PermissionPlanSet: true,
      PermissionAccessTo: true,
      PermissionMove: true,

      tableData_dialog: [],
      choosedManufacturer: '',
      aa: false,
      failList: [],
      videofaList: [],
      pageloading: false,
      downLoading: false,
      applicationTypeName: '',
      showManyCondition: false, // 高级搜索点击显示与隐藏
      iconName: 'el-icon-arrow-down', // iconClass 高级搜索的字体图标
      tableHeight: 630,
      dialogVisible: false,
      orgChangeId: null, //设备批量移动
      orgChangeShow: false, //设备批量移动
      changeBtn: true, //设备批量移动

      // 条件搜索
      searchForm: {
        cameraName: '',
        platId: '',
        thirdCameraId: '',
        cameraId: '',
        ptzType: '',
        puIp: '',
        status: '',
        manufacturer: '',
        longitude: '',
        latitude: ''
      },
      longitude: '',
      latitude: '',
      isSearch: false,
      statusList: [],

      //批量操作对话框
      batchApi: '',
      operate: '',
      multipleSelectionMany: [],
      batchDialogVisible: false,

      multipleSelection: [], //表格选中状态存放数组

      loading: true,
      tableData: [], // 表格数据
      dataText: '',

      pageNum: 1,
      pageSize: 10,
      pageSizeplat: 5000,
      totalNum: 0, // 总数量

      failDialog: false,
      videoDialog: false,
      organizationId: 0,

      modifyCameraVisible: false, // 修改对话框
      cameraDetailVisible: false, // 详情对话框
      dataForm: {}, // 表单
      openDialog: false,

      recordPolicyData: [], // 录像策略
      cameraRecordVisible: false, // 录像策略弹框
      camera_record_name: '',
      VideoDataForm: {
        recordPolicyName: null,
        recordPolicyId: null,
        recordStoreDays: undefined,
        planStreamType: undefined
      },

      belongTenantId: '',
      tenantId: '', //租户ID
      cameraOnenet: false, //  onenet配置对话框
      onenetForm: {},
      // 录像策略按钮
      HandrecordPolicy: true,

      // 镜头类型
      cameraTypeData: [],
      //移动类型
      locationTypeData: [],
      //状态
      statusData: [],
      dpiData: [],
      // 最大视频通道数
      maxVideoNumData: [],
      // 镜头协议类型
      driveData: [],

      aiTypeData: [], //智能分析类型
      mainDevName: '', //主设备名称
      platId: '', //平台Id
      platNameList: [], //平台
      interconnectCodeShow: false, //互联编码显示
      Recordloading: false,
      Cameraloading: false,

      //镜头接入配置生成
      registerInfoVisible: false,
      registerInfoForm: {
        sipId: '',
        sipDomain: '',
        sipIp: '',
        sipPort: '',
        deviceId: '',
        regPwd: '',
        localSipPort: '',
        areaCode: '',
        sipVPNIp: '',
        sipVPNPort: ''
      },
      channelList: [],

      // 点击提交按钮后蒙版
      maskloading: false,
      batchList: [],
      streamTypeList: [],
      exportExcelModalVisible: false,
      exportExcelErrorColumns: [
        {
          prop: 'cameraId',
          label: this.$t('deviceCamera.cameraId'),
          minWidth: '130'
        },
        {
          prop: 'cameraName',
          label: this.$t('deviceCamera.cameraName'),
          minWidth: '100'
        }
      ],
      platType: '',
      domainCode: undefined,
      PLATFORM_TYPE: PLATFORM_TYPE,
      DRIVE_TYPE: DRIVE_TYPE,
      placeholderTitle: this.$t('public.pleaseEnterOrg'),
      treeApi: 'getOrganizationTree',
      searchApi: 'searchInOrganizationTree',
      locateApi: 'locateInOrganizationTree'
    }
  },
  computed: {
    ...mapState({
      applicationData: state => state.dict['application-type'], //应用类型
      ptzTypeData: state => state.dict['device-type'], // 摄像机类型
      networkTypeData: state => state.dict['dev-access-mode'], // 网络类型
      manufacturerData: state => state.dict['camera_manufacturer'], // 设备厂商类型
      imgTypeAll: state => state.dict['camera-img-type'] // 智能属性
    })
  },
  watch: {
    //监听语言切换
    '$i18n.locale': function () {
      this.pageResize()
      this.setData()
    },
    $route(to, from) {
      const cameraId = from.params.cameraId
      if (from.path === '/device/camera-params-config/' + cameraId) {
        // 执行你的操作
        this.getCameraList()
      }
    }
  },

  created() {
    this.getPermissions()
  },
  mounted() {
    this.pageResize()
    this.setData()
    this.applicationTypeData()
  },
  activated() {

    this.pageResize()
  },
  methods: {
    //用户权限判断
    async getPermissions() {
      this.PermissionInfo = await permissions(21)
      this.PermissionManage = await permissions(22)
      this.PermissionPlanSet = await permissions(24)
      this.PermissionAccessTo = await permissions(248)
      this.PermissionMove = await permissions(39)
    },
    // 更多操作
    handleCommand(command) {
      switch (command.command) {
        case 'a':
          this.registerInfo(command.row)
          break
      }
    },
    beforeHandleCommand(row, command) {
      return {
        row: row,
        command: command
      }
    },
    pageResize() {
      this.locale = localStorage.getItem('locale')
      this.judgeWindow(1882)
    },
    // 国际化
    setData() {
      this.cameraTypeData = [
        {
          AmainDev: 3,
          mainDevName: this.$t('public.mainDevName3')
        },
        {
          AmainDev: 1,
          mainDevName: this.$t('public.mainDevName1')
        }
      ]

      this.aiTypeData = [
        {
          aiType: 0,
          aiTypekName: this.$t('deviceCamera.OrdinaryCamera')
        },
        {
          aiType: 1,
          aiTypekName: this.$t('deviceCamera.HumanFaceAnalysis')
        },
        {
          aiType: 2,
          aiTypekName: this.$t('deviceCamera.TrafficAnalysis')
        }
      ]

      this.maxVideoNumData = [
        { maxVideoNum: 1, maxVideoName: this.$t('public.maxVideoName1') },
        { maxVideoNum: 4, maxVideoName: this.$t('public.maxVideoName4') },
        { maxVideoNum: 8, maxVideoName: this.$t('public.maxVideoName8') },
        { maxVideoNum: 16, maxVideoName: this.$t('public.maxVideoName16') },
        { maxVideoNum: 32, maxVideoName: this.$t('public.maxVideoName32') },
        { maxVideoNum: 64, maxVideoName: this.$t('public.maxVideoName64') }
      ]

      this.dpiData = [
        {
          dpitype: 0,
          dpiname: this.$t('public.dpitype0')
        },
        {
          dpitype: 1,
          dpiname: this.$t('public.dpitype1')
        },
        {
          dpitype: 2,
          dpiname: this.$t('public.dpitype2')
        },
        {
          dpitype: 3,
          dpiname: this.$t('public.dpitype3')
        }
      ]

      this.statusData = [
        {
          statustype: 0,
          statusname: this.$t('public.statustype0')
        },
        {
          statustype: 1,
          statusname: this.$t('public.statustype1')
        },
        {
          statustype: 2,
          statusname: this.$t('public.statustype2')
        },
        {
          statustype: 3,
          statusname: this.$t('public.statustype3')
        }
      ]

      this.statusList = [
        {
          statustype: '',
          statusname: this.$t('public.all')
        },
        {
          statustype: 1,
          statusname: this.$t('public.statustype1')
        },
        {
          statustype: 2,
          statusname: this.$t('public.statustype2')
        }
      ]

      this.locationTypeData = [
        {
          value: 1,
          name: this.$t('public.applicationtype1')
        },
        {
          value: 2,
          name: this.$t('public.applicationtype2')
        }
      ]
      this.streamTypeList = [
        {
          name: this.$t('analysisTask.live'),
          value: 1
        },
        {
          name: this.$t('analysisTask.record'),
          value: 2
        }
      ]
    },
    setStatus(val) {
      let name = ''
      if (val == 0) {
        name = this.$t('public.statustype0')
      } else if (val == 1) {
        name = this.$t('public.statustype1')
      } else if (val == 2) {
        name = this.$t('public.statustype2')
      } else if (val == 3) {
        name = this.$t('public.statustype3')
      }
      return name
    },

    setisEnabled(val) {
      if (val == 0) {
        return this.$t('public.deactivate')
      } else if (val == 1) {
        return this.$t('public.enable')
      } else {
        return this.$t('primaryDevice.Abnormal')
      }
    },

    setApplicationType(val) {
      let name = ''
      this.applicationData.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },

    setPtzType(val) {
      let name = ''
      this.ptzTypeData.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },

    setNetworkType(val) {
      let name = ''
      this.networkTypeData.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },

    setLocationType(val) {
      let name = ''
      this.locationTypeData.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },

    setDpi(val) {
      let name = ''
      this.dpiData.filter(item => {
        if (val == item.dpitype) {
          name = item.dpiname
        }
      })
      return name
    },
    setManufacturer(val) {
      let name = ''
      this.manufacturerData.filter(item => {
        if (val == item.dpitype) {
          name = item.dpiname
        }
      })
      return name
    },
    // 树加载完初始化表格
    async initData(list) {
      const payload = list[0].payload
      this.organizationId = payload.organizationId
      this.tenantId = list[0].type == 1 ? payload.belongTenantId : ''

      //初始化面包屑
      this.$refs.breadcrumb.initBread(list)
      await this.getUser_TenantId() // 获取当前账号所属租户id
      await this.platformList() // 监控平台
      await this.getCameraList()
    },
    // 点击树节点
    treeNodeClick(obj) {
      // 点击树联动面包屑
      this.$refs.breadcrumb.treeLinkBread(obj.data, obj.node)

      this.tenantId = obj.data.type == 1 ? obj.data.payload.belongTenantId : ''

      //判断是否能进行批量设备移动
      if (obj.data.type == 1 && obj.data.payload.parentId != -1) {
        this.ifCanMoveDev = false
      } else {
        this.ifCanMoveDev = true
      }

      this.organizationId = obj.data.payload.organizationId
      this.search_clear()
      this.handleFind()
    },
    // 面包屑联动树
    tree_change(data) {
      this.$refs.lazyTree.handleNodeClick(
        this.$refs.lazyTree.$refs.treeList.getNode(data.id).data,
        this.$refs.lazyTree.$refs.treeList.getNode(data.id)
      )
      this.$refs.lazyTree.$refs.treeList.setCurrentKey(data.id)
    },

    getUser_TenantId() {
      this.$api.getLoginUserInfo({}).then(res => {
        this.belongTenantId = res.userInfo.belongTenantId
      })
    },
    // 加载镜头列表 ！
    getCameraList() {
      this.dataText = ''
      this.loading = true
      let data = {
        pageInfo: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        },
        organizationId: this.organizationId
      }
      if (this.isSearch) {
        Object.assign(data, this.searchForm)
        data.longitude = this.longitude
        data.latitude = this.latitude
      }

      this.$api.getCameraList(data).then(res => {
        if (res.cameraList && res.cameraList.length != 0) {
          this.tableData = res.cameraList

          if (this.platNameList) {
            this.tableData.forEach(tableDataItem => {
              //将厂商统一转为大写
              if (tableDataItem.manufacturer) {
                tableDataItem.manufacturer = tableDataItem.manufacturer.toUpperCase()
              }
              if (this.belongTenantId != tableDataItem.tenantId) {
                tableDataItem.organizationName = tableDataItem.tenantName
              }
              this.platNameList.forEach(platNameListItem => {
                if (platNameListItem.platId == tableDataItem.platId) {
                  tableDataItem.platType = platNameListItem.platType
                }
              })
            })
          }
          this.totalNum = res.pageInfo.totalNum
          this.$nextTick(() => {
            // this.$refs.multipleTable?.setScrollTop(0)
          })
        } else {
          this.tableData = []
          this.totalNum = 0
          this.dataText = this.$t('public.noData')
        }
        this.loading = false
      })
    },
    // 监控平台 !
    platformList() {
      let data = {
        organizationId: this.organizationId,
        platAbility: 'SURVEILLANCE'
      }
      this.$api.queryAccessPlatformList(data).then(res => {
        if (res.platformList && res.platformList.length) {
          res.platformList = res.platformList.map(item => {
            return {
              enableStatus: item.enableStatus,
              platId: item.platformId,
              platName: item.platformName,
              platType: item.platformType,
              platStatus: item.platformStatus
            }
          })
          this.platNameList = res.platformList || []
        }
      })
    },

    getRecordPlanList() {
      this.$api.getRecordPlanListQuery({}).then(res => {
        this.recordPolicyData = res.recordPlanList || []
      })
    },
    ...mapActions('dict', ['getSysDictData']),
    // 字典查询
    applicationTypeData() {
      this.getSysDictData([
        'application-type',
        'device-type',
        'dev-access-mode',
        'camera_manufacturer',
        'camera-img-type'
      ])
    },

    // 停启用视频通道
    stopVideo(row) {
      let isEnabled = 0
      isEnabled = row.isEnabled == 0 ? 1 : 0
      if (isEnabled) {
        this.camare_enable(row, isEnabled, this.$t('accessPlatform.enabledSuccessfully'))
      } else {
        this.$confirm(this.$t('public.StopUsingChannel'), this.$t('public.StopChannel'), {
          confirmButtonText: this.$t('public.confirm'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        })
          .then(() => {
            this.camare_enable(row, isEnabled, this.$t('accessPlatform.deactivatedSuccessfully'))
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('public.canceleddelete')
            })
          })
      }
    },
    camare_enable(row, isEnabled, message) {
      let data = {
        cameraId: row.cameraId,
        isEnabled
      }
      this.$api.enableCamera(data).then(res => {
        if (res.resultCode === 0) {
          this.$api.enableCameraRecord(data).then(resR => {
            if (resR.resultCode === 0) {
              this.$message({
                message,
                type: 'success'
              })
              this.$refs.multipleTable.clearSelection()
              row.isEnabled = isEnabled
            }
          })
        }
      })
    },

    meta(row) {
      this.$api.subscribeCameraDatas({ cameraId: row.cameraId }).then(res => {
        if (res.resultCode === 0) {
          this.$message({
            message: this.$t('deviceCamera.metadataSuccess'),
            type: 'success'
          })
        }
      })
    },

    search_change() {
      this.isSearch = false
    },
    //判断是否点击搜索
    search_clear() {
      if (!this.isSearch) {
        this.searchForm = {
          cameraName: '',
          platId: '',
          thirdCameraId: '',
          cameraId: '',
          ptzType: '',
          puIp: '',
          status: '',
          manufacturer: '',
          longitude: '',
          latitude: ''
        }
        this.longitude = ''
        this.latitude = ''
      }
    },
    // 搜索 ！
    handleFind() {
      let longitude = this.searchForm.longitude
      let latitude = this.searchForm.latitude
      if (longitude != '') {
        if (longitude.indexOf('.') != '-1') {
          let len = longitude.split('.')[1].length
          if (len > 6) {
            this.longitude = longitude.substring(0, longitude.indexOf('.') + 7)
          }
        }
        let reg =
          /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/
        if (reg.test(longitude) == false) {
          this.$message.warning(this.$t('deviceCamera.longitudePrompt'))
          return
        } else {
          this.longitude = longitude
        }
      } else {
        this.longitude = ''
      }
      if (latitude != '') {
        if (latitude.indexOf('.') != '-1') {
          let len = latitude.split('.')[1].length
          if (len > 6) {
            this.latitude = latitude.substring(0, latitude.indexOf('.') + 7)
          }
        }
        let reg = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/
        if (reg.test(latitude) == false) {
          this.$message.warning(this.$t('deviceCamera.latitudePrompt'))
          return
        } else {
          this.latitude = latitude
        }
      } else {
        this.latitude = ''
      }
      this.pageNum = 1
      this.isSearch = true
      this.getCameraList()
    },
    // 镜头协议类型选择判断互联编码是否显示 !
    driveChange(val) {
      if (val == 0) {
        this.interconnectCodeShow = true
      } else {
        this.interconnectCodeShow = false
      }
    },

    // 表格列表选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (val.length != 0) {
        this.changeBtn = false
      } else {
        this.changeBtn = true
      }
    },

    // 下载GIS地址
    getTemplateGIS() {
      this.downLoading = true
      let data = {}
      if (this.tenantId == '') {
        data = {
          organizationId: Number(this.organizationId)
        }
      } else {
        data = {
          tenantId: this.tenantId
        }
      }

      this.$api
        .getCameraGisTemplate({
          ...data,
          netType: this.$getNetType()
        })
        .then(res => {
          if (res.templateFileUrl) {
            download(res.templateFileUrl, this.$t('deviceCamera.gisImportTemplate'))
          }
          this.downLoading = false
        })
    },

    batchImport(data) {
      if (data[0].results.length > 1000) {
        this.$message.warning(this.$t('deviceCamera.batchImportPrompt'))
        return
      }
      this.batchList = data[0].results
      this.loading = true
      this.operate = this.$t('deviceCamera.importInfoGIS')
      this.batchApi = 'modifyCameraInfo'
      this.multipleSelectionMany = []
      for (let i = 0; i < this.batchList.length; i++) {
        let obj = {
          cameraId: this.batchList[i].cameraId,
          longitude: this.batchList[i].longitude,
          latitude: this.batchList[i].latitude,
          xEightyAxis: this.batchList[i].xEightyAxis,
          yEightyAxis: this.batchList[i].yEightyAxis,
          azimuth: this.batchList[i].azimuth
        }
        this.multipleSelectionMany.push(obj)
      }
      this.batchDialogVisible = true
    },

    // 导入GIS地址
    importInfoGIS() {
      let inputDOM = this.$refs.importInfoGIS
      let fil = inputDOM.files
      let isTypeTrue = /\.(xls|xlsx)$/.test(fil[0].name.toLowerCase())
      const isLtLimitSize = fil[0].size / 1024 / 1024 < 100
      if (!isTypeTrue) {
        this.$message.error(this.$t('public.uploadError'))
        return
      }
      if (!isLtLimitSize) {
        this.$message.error(this.$t('public.validate.fileSizeLimit', { size: 100 }))
        return
      }
      let formData = new FormData()
      formData.append('file', fil[0])
      formData.append('api', '/api/uvs/camera/gis/import')
      formData.append('netType', this.$getNetType())
      this.pageloading = true
      this.$api.uploadFileTemporary(formData).then(res => {
        let data = {
          importFileId: res.fileId,
          netType: this.$getNetType()
        }
        this.$api.importCameraGisInfo(data).then(res1 => {
          this.pageloading = false
          this.$refs.importInfoGIS.value = ''
          if (res1.resultCode == 0) {
            this.$message.success(this.$t('public.importSuccess'))
            this.search_clear()
            this.getCameraList()
          } else if (res1.resultCode != 10 && res1.resultCode != 2) {
            this.failList = res1.failList
            this.failList.forEach(item => {
              if (item.errorMsg === 'error:202001') {
                item.errorMsg = this.$t('deviceCamera.gisImportFailed')
              }
            })
            this.failDialog = true
          }
          this.search_clear()
          this.getCameraList()
        })
      })
    },

    // 表格斑马纹
    tableRowClassName({ rowIndex }) {
      return rowIndex % 2 == 1 ? '' : 'success-row'
    },
    async getCameraInfo(cameraId, flag, row) {
      let res = await this.$api.getCameraInfo({ cameraId })
      if (res.resultCode != 0) return
      if (res.cameraBaseInfo) {
        let cameraBaseInfo = res.cameraBaseInfo
        let cameraMaintainInfo = res.cameraMaintainInfo
        let cameraDirectionInfo = res.cameraDirectionInfo
        let platInfo = res.platInfo
        let cameraStreamInfo = res.cameraStreamInfo
        let cameraRecordInfo = res.cameraRecordInfo

        this.dataForm = {
          organizationName: cameraBaseInfo.organizationName,
          organizationId: cameraBaseInfo.organizationId,
          mainDevName: cameraBaseInfo.mainDevName,
          cameraId: cameraBaseInfo.cameraId,
          cameraName: cameraBaseInfo.cameraName,
          recordPolicyName: cameraRecordInfo.recordPolicyName,
          locationType: cameraBaseInfo.locationType,
          manufacturer: cameraBaseInfo.manufacturer,
          networkType: cameraMaintainInfo.networkType
            ? cameraMaintainInfo.networkType.toString()
            : '',
          status: cameraMaintainInfo.status,
          aiType: cameraBaseInfo.aiType ? cameraBaseInfo.aiType : 0,
          interconnectCode: cameraBaseInfo.interconnectCode || row.interconnectCode,
          model: cameraBaseInfo.model,

          platName: platInfo.platName,
          platId: platInfo.platId,
          thirdCameraId: res.thirdAccessInfo.thirdCameraId,
          ptzType: cameraBaseInfo.ptzType ? cameraBaseInfo.ptzType.toString() : '',
          imgType: cameraBaseInfo.imgType,

          channelNo: cameraBaseInfo.channelNo,
          recordRemainDays: cameraRecordInfo.recordRemainDays,
          applicationType: cameraMaintainInfo.applicationType,

          dpi: cameraStreamInfo.dpi,

          installLocate: cameraDirectionInfo.installLocate,
          azimuth: cameraDirectionInfo.azimuth,

          longitude: cameraDirectionInfo.longitude,
          xEightyAxis: cameraDirectionInfo.xEightyAxis,
          latitude: cameraDirectionInfo.latitude,
          yEightyAxis: cameraDirectionInfo.yEightyAxis,
          createTime: res.createTime,
          updateTime: res.updateTime,
          remark: res.remark,
          puIp: res.thirdAccessInfo ? res.thirdAccessInfo.puIp : '',
          puPort: res.thirdAccessInfo ? res.thirdAccessInfo.gbAccessPort : '',
          gbAccessIpv6: res.thirdAccessInfo ? res.thirdAccessInfo.gbAccessIpv6 : ''
        }
      } else {
        if (this.platNameList) {
          this.platNameList.forEach(item => {
            if (res.platId == item.platId) {
              res.platName = item.platName
            }
          })
        }
        this.dataForm = {
          organizationName: res.organizationName,
          organizationId: res.organizationId,
          mainDevName: res.mainDevName,
          cameraId: res.cameraId,
          cameraName: res.cameraName,
          recordPolicyName: res.recordPolicyName,
          locationType: res.locationType,
          manufacturer: res.manufacturer,
          networkType: res.networkType ? res.networkType.toString() : '',
          status: res.status,
          interconnectCode: res.interconnectCode || row.interconnectCode,

          aiType: res.aiType || 0,
          model: res.model,

          platName: res.platName,
          platId: res.platId,

          thirdCameraId: res.thirdCameraId,
          ptzType: res.ptzType ? res.ptzType.toString() : '',
          channelNo: res.channelNo,
          recordRemainDays: res.recordRemainDays,
          applicationType: res.applicationType,

          dpi: res.dpi,

          installLocate: res.installLocate,
          azimuth: res.azimuth,

          longitude: res.longitude,
          xEightyAxis: res.xEightyAxis,
          latitude: res.latitude,
          yEightyAxis: res.yEightyAxis,
          createTime: res.createTime,
          updateTime: res.updateTime,
          remark: res.remark,
          puIp: res.thirdAccessInfo ? res.thirdAccessInfo.gbAccessIp : ''
        }
      }

      if (flag) {
        this.modifyCameraVisible = true
      } else {
        this.cameraDetailVisible = true
      }
    },
    // 详情
    async cameraDetails(row) {
      await this.getCameraInfo(row.cameraId, 0, row)
    },
    // 修改
    async handleEdit(row) {
      await this.getCameraInfo(row.cameraId, 1, row)
    },
    // 参数配置
    paramsConfig(row) {
      this.$router.push({
        name: 'CameraParameterConfiguration',
        params: { cameraId: row.cameraId }
      })
    },
    // 修改录像策略
    async VideossRecord(row) {
      if (this.platNameList) {
        this.platNameList.forEach(item => {
          if (row.platId == item.platId) {
            row.Platformtype = item.platType
          }
        })
      }
      if (row.isExDomain == 1) {
        this.$message({
          type: 'error',
          message: this.$t('deviceCamera.EquipmentSupporteds')
        })
      } else if (row.isExDomain == 0) {
        await this.$api.getCameraInfo({ cameraId: row.cameraId }).then(res => {
          this.VideoDataForm = {
            cameraId: row.cameraId,
            recordPolicyName: res.cameraRecordInfo.recordPolicyName
              ? res.cameraRecordInfo.recordPolicyName
              : null,
            recordPolicyId: res.cameraRecordInfo.recordPolicyId
              ? res.cameraRecordInfo.recordPolicyId
              : null
          }

          if (
            res.cameraRecordInfo.recordPolicyId == undefined ||
            res.cameraRecordInfo.recordPolicyId == ''
          ) {
            this.VideoDataForm.recordPolicyName = ''
          }
        })
        this.camera_record_name = this.$t('deviceCamera.CameraRecording')
        await this.getRecordPlanList() // 获取录像计划
        this.cameraRecordVisible = true
      }
    },
    recordSubmit(data) {
      let obj = {
        cameraId: data.cameraId,
        recordMethod: 0
      }
      if (data.recordPolicyName == null || data.recordPolicyName == '') {
        this.$api.deleteCameraRecordPolicyInfo(obj).then(res => {
          this.recordSubmitSuccess(res)
        })
      } else {
        Object.assign(obj, {
          recordPlanId: data.recordPolicyId
        })
        this.$api.setCameraRecordPolicyInfo(obj).then(res => {
          this.recordSubmitSuccess(res)
        })
      }
    },
    recordSubmitSuccess(res) {
      if (res.resultCode === 0) {
        this.$message({
          type: 'success',
          message: this.$t('public.modifySuccess')
        })
        this.camera_record_name = ''
        this.cameraRecordVisible = false
        this.search_clear()
        this.getCameraList()
      }
    },

    async Batchvideo() {
      //注释不判断平台是否支持设置录像策略
      this.multipleSelection.forEach(item => {
        this.platNameList.forEach(items => {
          if (item.platId == items.platId) {
            item.platType = items.platType
          }
        })
      })
      let array = this.multipleSelection.filter(item => item.platType == 2)
      let IsExDomain = this.multipleSelection.filter(item => item.isExDomain == 1)
      const platType = this.multipleSelection[0].platType
      const cameraList = this.multipleSelection.filter(item => item.platType !== platType)
      if (array.length) {
        this.$message({
          type: 'error',
          message: this.$t('deviceCamera.NVSEquipment')
        })
      } else if (IsExDomain.length) {
        this.$message({
          type: 'error',
          message: this.$t('deviceCamera.EquipmentSupporteds')
        })
      } else if (cameraList.length > 0) {
        this.$message({
          type: 'error',
          message: this.$t('deviceCamera.batchRecordTip1')
        })
      } else {
        this.platType = this.multipleSelection[0].platType
        if (this.platType === PLATFORM_TYPE.VPAAS) {
          const domainCode = this.multipleSelection[0].domainCode
          const domainCodeList = this.multipleSelection.filter(
            item => item.domainCode !== domainCode
          )
          if (domainCodeList.length > 0) {
            return this.$message({
              type: 'error',
              message: this.$t('deviceCamera.batchRecordTip2')
            })
          }
          this.domainCode = this.multipleSelection[0].domainCode
        }
        this.camera_record_name = this.$t('deviceCamera.CameraRecordings')
        await this.getRecordPlanList() // 获取录像计划
        this.cameraRecordVisible = true
      }
    },
    batchRecordSubmit(data) {
      this.maskloading = true
      this.operate = this.$t('deviceCamera.VideoStrategyContent')
      this.batchApi = !data.recordPolicyName
        ? 'deleteCameraRecordPolicyInfo'
        : 'setCameraRecordPolicyInfo'
      let arr = []
      this.multipleSelection.forEach(item => {
        let obj = {
          recordMethod: 0,
          cameraId: item.cameraId
        }
        if (data.recordPolicyName) {
          obj.recordPlanId = data.recordPolicyId
          obj.recordStoreDays = data.recordStoreDays
        }
        if (this.platType === PLATFORM_TYPE.VPAAS) {
          obj.recordStoreDays = parseInt(data.recordStoreDays)
          obj.planStreamType = data.planStreamType
        }
        arr.push(obj)
      })
      this.multipleSelectionMany = arr
      this.batchDialogVisible = true
      this.cameraRecordVisible = false
      this.maskloading = false
    },

    // 批量设备移动
    handelChange() {
      if (!this.ifCanMoveDev) {
        this.$message({
          message: this.$t('deviceCamera.moveCameraTip'),
          type: 'warning'
        })
        return
      }
      this.orgChangeShow = true
    },
    orgChangeSubmit(organizationId) {
      this.maskloading = true
      this.operate = this.$t('deviceCamera.EquipmentMobileContent')
      this.batchApi = 'moveCameraInfo'
      let arr = []
      for (let index = 0; index < this.multipleSelection.length; index++) {
        const item = this.multipleSelection[index]
        let obj = {
          cameraId: item.cameraId,
          organizationId
        }
        this.$route.query.tenantId ? (obj.withTenant = 2) : null
        arr.push(obj)
      }
      this.multipleSelectionMany = arr
      this.batchDialogVisible = true
      this.orgChangeShow = false
      this.maskloading = false
    },

    // 同步状态
    handleStatue(row) {
      let data = {
        cameraId: row.cameraId
      }
      this.$api.syncCameraStatus(data).then(res => {
        if (res.resultCode == 0) {
          this.$message({
            type: 'success',
            message: this.$t('primaryDevice.synchronousRegime')
          })
          this.tableData.forEach(item => {
            if (item.cameraId == row.cameraId) {
              item.status = res.status
            }
          })
          this.search_clear()
          this.getCameraList()
        }
      })
    },
    // onenet配置
    onenet(row) {
      this.$api.getOnenetConfig({ cameraId: row.cameraId }).then(res => {
        if (res.cameraExtendInfo) {
          this.onenetForm = {
            cameraId: row.cameraId,
            cameraName: row.cameraName,
            masterKey: res.cameraExtendInfo.masterKey,
            onenetDevId: res.cameraExtendInfo.onenetDevId
          }
        } else {
          this.onenetForm = {
            cameraId: row.cameraId,
            cameraName: row.cameraName,
            masterKey: null,
            onenetDevId: null
          }
        }
        this.cameraOnenet = true
      })
    },

    // 导出摄像机信息
    async exportExcel() {
      let data = {
        organizationId: this.organizationId,
        netType: this.$getNetType(),
        ...this.searchForm
      }

      const res = await this.$api.exportCameraInfo(data)
      return res
    },
    exportExcelLoadFunc() {
      const normalizeExportData = data => {
        return data.map(item => {
          let {
            cameraId,
            thirdCameraId,
            cameraName,
            mainDevId,
            thirdMainDevId,
            mainDevName,
            platId,
            platName,
            status,
            organizationId,
            organizationName,
            areaCode,
            tenantId,
            tenantName,
            channelNo,
            interconnectCode,
            puIp,
            accessServerHost,
            accessServerPort,
            manufacturer,
            model,
            ptzType,
            aiType,
            locationType,
            recordPolicyId,
            recordPolicyName,
            recordRemainDays,
            applicationType,
            isExDomain,
            streamType,
            networkType,
            longitude,
            latitude,
            installLocate,
            xeightyAxis,
            yeightyAxis,
            azimuth,
            remark,
            groupId
          } = item
          status = this.setStatus(status)
          areaCode = areaCode == undefined ? '' : areaCode
          tenantId = tenantId == undefined ? '' : tenantId
          tenantName = tenantName == undefined ? '' : tenantName
          interconnectCode = interconnectCode == undefined ? '' : interconnectCode
          puIp = puIp == undefined ? '' : puIp
          accessServerHost = accessServerHost == undefined ? '' : accessServerHost
          accessServerPort = accessServerPort == undefined ? '' : accessServerPort
          manufacturer = this.selectDictLabel(this.manufacturerData, manufacturer, {
            key: 'name',
            value: 'value'
          })
          model = model == undefined ? '' : model
          ptzType = this.selectDictLabel(this.ptzTypeData, ptzType, {
            key: 'name',
            value: 'value'
          })
          aiType = this.selectDictLabel(this.aiTypeData, aiType, {
            key: 'aiTypekName',
            value: 'aiType'
          })
          locationType = this.selectDictLabel(this.locationTypeData, locationType, {
            key: 'name',
            value: 'value'
          })
          recordPolicyId = recordPolicyId == undefined ? '' : recordPolicyId
          recordPolicyId = recordPolicyId == undefined ? '' : recordPolicyId
          recordPolicyName = recordPolicyName == undefined ? '' : recordPolicyName
          groupId = groupId == undefined ? '' : groupId
          recordRemainDays = recordRemainDays == undefined ? '' : recordRemainDays
          applicationType = this.selectDictLabel(this.applicationData, applicationType, {
            key: 'name',
            value: 'value'
          })
          isExDomain =
            isExDomain == undefined
              ? ''
              : isExDomain == 1
                ? this.$t('dictConst.yes')
                : this.$t('dictConst.no')
          streamType = this.selectDictLabel(this.streamTypeList, streamType, {
            key: 'name',
            value: 'value'
          })
          networkType = this.selectDictLabel(this.networkTypeData, networkType + '', {
            key: 'name',
            value: 'value'
          })
          longitude = longitude == undefined ? '' : longitude
          latitude = latitude == undefined ? '' : latitude
          installLocate = installLocate == undefined ? '' : installLocate
          xeightyAxis = xeightyAxis == undefined ? '' : xeightyAxis
          yeightyAxis = yeightyAxis == undefined ? '' : yeightyAxis
          azimuth = azimuth == undefined ? '' : azimuth
          remark = remark == undefined ? '' : remark
          let createTime = item?.createTime == undefined ? '' : item.createTime
          let updateTime = item?.updateTime == undefined ? '' : item.updateTime

          return {
            cameraId,
            thirdCameraId,
            cameraName,
            mainDevId,
            thirdMainDevId,
            mainDevName,
            platId,
            platName,
            status,
            organizationId,
            organizationName,
            areaCode,
            tenantId,
            tenantName,
            channelNo,
            interconnectCode,
            puIp,
            accessServerHost,
            accessServerPort,
            manufacturer,
            model,
            ptzType,
            aiType,
            locationType,
            recordPolicyId,
            recordPolicyName,
            recordRemainDays,
            applicationType,
            isExDomain,
            streamType,
            networkType,
            longitude,
            latitude,
            installLocate,
            xeightyAxis,
            yeightyAxis,
            azimuth,
            remark,
            createTime,
            updateTime,
            groupId
          }
        })
      }
      return {
        listFn: this.$api.getCameraExportList,
        listFnParam: {
          pageInfo: {
            pageNum: 1,
            pageSize: 500
          },
          organizationId: this.organizationId
        },
        listFnResAttrName: 'cameraList',
        filename: this.$t('deviceCamera.cameraFileInfo'),
        bookType: 'xlsx',
        header: {
          cameraId: this.$t('deviceCamera.cameraId'),
          thirdCameraId: this.$t('deviceCamera.thirdCameraId1'),
          cameraName: this.$t('deviceCamera.cameraName'),
          mainDevId: this.$t('primaryDevice.mainDevId'),
          thirdMainDevId: this.$t('deviceCamera.accessInterconnectCode'),
          mainDevName: this.$t('deviceCamera.mainDevName'),
          platId: this.$t('deviceCamera.platFormId'),
          platName: this.$t('deviceCamera.platName'),
          status: this.$t('deviceCamera.status'),
          organizationId: this.$t('deviceCamera.organizationId'),
          organizationName: this.$t('deviceCamera.organizationName'),
          areaCode: this.$t('deviceCamera.areaCode'),
          tenantId: this.$t('deviceCamera.tenantId'),
          tenantName: this.$t('deviceCamera.tenantName'),
          channelNo: this.$t('deviceCamera.channelNo1'),
          interconnectCode: this.$t('deviceCamera.interconnectCode'),
          puIp: this.$t('deviceCamera.puIp'),
          accessServerHost: this.$t('deviceCamera.gbAccessIp'),
          accessServerPort: this.$t('deviceCamera.gbAccessPort'),
          manufacturer: this.$t('deviceCamera.manufacturer'),
          model: this.$t('deviceCamera.model1'),
          ptzType: this.$t('deviceCamera.ptzType1'),
          aiType: this.$t('deviceCamera.aiType'),
          locationType: this.$t('deviceCamera.locationType'),
          recordPolicyId: this.$t('deviceCamera.recordPolicyId'),
          recordPolicyName: this.$t('deviceCamera.recordPolicyName'),
          recordRemainDays: this.$t('deviceCamera.recordRemainDays'),
          groupId: this.$t('mainDevConfiguration.storageNodeId'),
          applicationType: this.$t('deviceCamera.applicationType1'),
          isExDomain: this.$t('deviceCamera.isExDomain'),
          streamType: this.$t('deviceCamera.streamType'),
          networkType: this.$t('deviceCamera.networkType'),
          longitude: this.$t('deviceCamera.longitude'),
          latitude: this.$t('deviceCamera.latitude'),
          installLocate: this.$t('deviceCamera.installLocate'),
          xeightyAxis: this.$t('deviceCamera.xEightyAxis'),
          yeightyAxis: this.$t('deviceCamera.yEightyAxis'),
          azimuth: this.$t('deviceCamera.azimuth'),
          remark: this.$t('deviceCamera.remark'),
          createTime: this.$t('deviceCamera.createTime'),
          updateTime: this.$t('deviceCamera.updateTime')
        },
        dataNormalizeFn: normalizeExportData
      }
    },
    // 点击更多条件控制更多条件的显示与隐藏！
    manyCondition() {
      this.showManyCondition = !this.showManyCondition
      this.iconName = this.showManyCondition ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
      this.tableHeight = this.showManyCondition ? 482 : 630
    },

    GetLine(row) {
      if (row.Platformtype == 2) {
        this.aa = true
        let video = document.getElementById('RecordPolicy')
        video.style.color = '#dde1e8'
      } else {
        this.aa = false
      }
    },

    //镜头接入配置生成
    async registerInfo(row) {
      const res = await this.$api.obtainCameraConfig({ cameraId: row.cameraId })
      if (res.resultCode != 0) return
      Object.assign(this.registerInfoForm, {
        sipId: res.sipId,
        sipDomain: res.sipDomain,
        sipIp: res.sipIp,
        sipIpv6: res.sipIpv6,
        sipPort: res.sipPort,
        sipVPNIp: res.sipVPNIp,
        sipVPNPort: res.sipVPNPort,
        deviceId: res.deviceId,
        localSipPort: res.localSipPort,
        areaCode: res.areaCode,
        vendor: res.vendor
      })

      this.channelList = res.channelList

      if (res.regPwd) {
        this.registerInfoForm.regPwd = res.regPwd
      }

      this.registerInfoVisible = true
    },

    // 解绑!
    unbind(row) {
      this.$confirm(this.$t('deviceCamera.unbindPrompt'), this.$t('public.prompt'), {
        confirmButtonText: this.$t('public.confirm'),
        cancelButtonText: this.$t('public.cancel'),
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          this.$api
            .unbindCameraOcfg({ devId: row.cameraId })
            .then(res => {
              if (res.resultCode == 0) {
                this.$message({
                  message: this.$t('deviceCamera.unbindSuccess'),
                  type: 'success'
                })
                this.getCameraList()
              }
            })
            .catch(() => { })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('deviceCamera.unbindCancel')
          })
        })
    },
    // 分页
    getListByPage() {
      this.search_clear()
      this.getCameraList()
    }
  }
}
</script>

<style lang="scss">
#device_camera {
  .searchSelect {
    .el-select {
      width: 100%;
    }
  }

  .el-dialog__body .el-form-item--small.el-form-item {
    margin-bottom: 28px;
  }

  .el-dialog__body {
    padding: 15px 0 5px;
  }

  .onenetDialog .el-dialog__body {
    padding: 15px 140px 5px 140px;
  }

  .org_change .el-dialog__body {
    padding: 15px 125px 5px;
  }

  .camera-record .el-dialog__body {
    padding: 20px 40px;
  }

  .search-btn {
    position: absolute;
    right: 0;
    bottom: 41px;
  }

  .flex-item {
    width: 36%;
  }

  .upload {
    position: relative;

    .importInfoGIS {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
      width: 100%;
      height: 40px;
    }
  }

  #RecordPolicy {
    width: 80px;
    height: 29px;
  }

  //一排三表单
  .screenthree {
    width: 25% !important;
  }
}
</style>
