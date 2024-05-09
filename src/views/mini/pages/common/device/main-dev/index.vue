<template>
  <!-- 设备管理 -->
  <div
    id="main-dev"
    class="base"
    v-if="isRouterAlive"
    ref="deviceMainDev"
    v-loading="pageloading"
    :element-loading-text="$t('public.batchImporting')"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <el-row>
      <el-col :span="4" class="el-row4">
        <el-scrollbar style="border-radius: 6px">
          <lazy-search-tree
            ref="lazyTree"
            @initList="initData"
            @nodeClick="treeNodeClick"
            :placeholderTitle="placeholderTitle"
            :withTenant="2"
            :treeApi="treeApi"
            :searchApi="searchApi"
            :locateApi="locateApi"
          />
        </el-scrollbar>
      </el-col>

      <el-col :span="20" class="el-row20">
        <div style="margin: 20px 0 20px">
          <el-dropdown
            v-if="PermissionManage"
            trigger="click"
            @command="handleAdd"
            style="margin-left: 10px"
          >
            <el-button type="primary">
              {{ $t('primaryDevice.addDevice') }}
              <el-icon class="el-icon--right"><el-icon-arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item  :command="1">
                  <span v-hasPermi="[19]">{{ $t('primaryDevice.batchAccess') }}</span>
                </el-dropdown-item>
                <el-dropdown-item :command="2">
                  {{ $t('primaryDevice.singleAccess') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown
            v-if="PermissionManage"
            trigger="click"
            @command="getTemplate"
            style="margin-left: 10px"
          >
            <el-button type="primary">
              {{ $t('public.getTemplate') }}
              <el-icon class="el-icon--right"><el-icon-arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item  :command="1">
                  {{ $t('primaryDevice.DownloadIVS') }}
                </el-dropdown-item>
                <el-dropdown-item :command="5">
                  {{ $t('primaryDevice.DownloadADS') }}
                </el-dropdown-item>
                <el-dropdown-item  :command="4">
                  {{ $t('primaryDevice.DownloadAVS') }}
                </el-dropdown-item>

                <el-dropdown-item  :command="16">
                  {{ $t('primaryDevice.DownloadvPaaS') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-dropdown v-if="PermissionManage" trigger="click" style="margin: 0 10px">
            <el-button type="primary">
              {{ $t('public.batchImport') }}
              <el-icon class="el-icon--right"><el-icon-arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item >
                  <div class="upload">
                    <Excel @success="batchImportIVS">
                      <div>{{ $t('primaryDevice.importIVS') }}</div>
                    </Excel>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item >
                  <div class="upload">
                    <Excel @success="batchImportADS">
                      <div>{{ $t('primaryDevice.importADS') }}</div>
                    </Excel>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item >
                  <div class="upload">
                    <Excel @success="batchImportAVS">
                      <div>{{ $t('primaryDevice.importAVS') }}</div>
                    </Excel>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item >
                  <div class="upload">
                    <Excel @success="batchImportIVS">
                      <div>{{ $t('primaryDevice.importvPaaS') }}</div>
                    </Excel>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button type="primary" @click="Allocating" v-if="PermissionAllot">
            {{ $t('primaryDevice.AllocatingEquipment') }}
          </el-button>
          <el-button type="danger" @click="handleDel" :disabled="delShow" v-if="PermissionDelete">
            {{ $t('public.batchDeletion') }}
          </el-button>
        </div>

        <div class="search-form searchSelect">
          <el-form
            :inline="true"
            class="demo-form-inline"
            :label-width="locale == 'en' ? '170px' : '137px'"
            ref="form"
            :model="searchForm"
            label-position="left"
          >
            <div class="flexstart">
              <el-form-item
                :label="$t('public.mainDevName') + ' ：'"
                :class="screenFlag ? 'screenthree' : 'flex-item'"
              >
                <el-input
                  v-model="searchForm.mainDevName"
                  auto-complete="off"
                  :placeholder="$t('public.pleaseInputMainDevName')"
                  clearable
                  maxlength="128"
                  @change="search_change"
                />
              </el-form-item>
              <el-form-item
                :label="$t('primaryDevice.mainDevId') + ' ：'"
                prop="cameraId"
                :class="screenFlag ? 'screenthree' : 'flex-item'"
              >
                <el-input
                  v-model="searchForm.mainDevId"
                  auto-complete="off"
                  :placeholder="$t('primaryDevice.pleaseInputmainDevId')"
                  clearable
                  maxlength="32"
                  @change="search_change"
                />
              </el-form-item>
              <el-form-item
                :label="$t('public.thirdMainDevId') + ' ：'"
                :class="screenFlag ? 'screenthree' : 'flex-item'"
                v-if="screenFlag"
              >
                <el-input
                  v-model="searchForm.thirdMainDevId"
                  auto-complete="off"
                  :placeholder="$t('public.inputThirdMainDevId')"
                  clearable
                  maxlength="64"
                  @change="search_change"
                />
              </el-form-item>
            </div>

            <div v-show="showManyCondition">
              <div class="flexstart">
                <el-form-item
                  :label="$t('public.thirdMainDevId') + ' ：'"
                  :class="screenFlag ? 'screenthree' : 'flex-item'"
                  v-if="!screenFlag"
                >
                  <el-input
                    v-model="searchForm.thirdMainDevId"
                    auto-complete="off"
                    :placeholder="$t('public.inputThirdMainDevId')"
                    clearable
                    maxlength="64"
                    @change="search_change"
                  />
                </el-form-item>

                <el-form-item
                  :label="$t('primaryDevice.puIp') + ' ：'"
                  prop="platId"
                  :class="screenFlag ? 'screenthree' : 'flex-item'"
                >
                  <el-input
                    v-model="searchForm.puIp"
                    auto-complete="off"
                    :placeholder="$t('primaryDevice.pleaseInputpuIp')"
                    clearable
                    maxlength="16"
                    @change="search_change"
                  />
                </el-form-item>
                <el-form-item
                  :label="$t('deviceCamera.platId') + ' ：'"
                  auto-complete="off"
                  prop="platId"
                  :class="screenFlag ? 'screenthree' : 'flex-item'"
                  v-if="screenFlag"
                >
                  <el-select
                    clearable
                    :popper-append-to-body="false"
                    v-model="searchForm.platId"
                    :placeholder="$t('deviceCamera.pleaseInputPlatId')"
                    @change="search_change"
                  >
                    <el-option :label="$t('public.all')" value></el-option>
                    <el-option
                      v-for="(item, index) in platNameList"
                      :key="index"
                      :label="item.platName"
                      :value="item.platId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  :label="$t('public.state') + ' ：'"
                  auto-complete="off"
                  prop="status"
                  :class="screenFlag ? 'screenthree' : 'flex-item'"
                  v-if="screenFlag"
                >
                  <el-select
                    clearable
                    :popper-append-to-body="false"
                    v-model="searchForm.status"
                    :placeholder="$t('primaryDevice.statusProp')"
                    @change="search_change"
                  >
                    <el-option :label="$t('public.all')" value></el-option>
                    <el-option
                      v-for="(item, index) in deviceRegisterStatusListFormattered"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="flexstart">
                <el-form-item
                  :label="$t('deviceCamera.platId') + ' ：'"
                  auto-complete="off"
                  prop="platId"
                  :class="screenFlag ? 'screenthree' : 'flex-item'"
                  v-if="!screenFlag"
                >
                  <el-select
                    clearable
                    :popper-append-to-body="false"
                    v-model="searchForm.platId"
                    :placeholder="$t('deviceCamera.pleaseInputPlatId')"
                    @change="search_change"
                  >
                    <el-option :label="$t('public.all')" value></el-option>
                    <el-option
                      v-for="(item, index) in platNameList"
                      :key="index"
                      :label="item.platName"
                      :value="item.platId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  :label="$t('public.state') + ' ：'"
                  auto-complete="off"
                  prop="status"
                  :class="screenFlag ? 'screenthree' : 'flex-item'"
                  v-if="!screenFlag"
                >
                  <el-select
                    clearable
                    :popper-append-to-body="false"
                    v-model="searchForm.status"
                    :placeholder="$t('primaryDevice.statusProp')"
                    @change="search_change"
                  >
                    <el-option :label="$t('public.all')" value></el-option>
                    <el-option
                      v-for="(item, index) in deviceRegisterStatusListFormattered"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="flexstart">
                <el-form-item
                  :label="$t('primaryDevice.accessInterconnectCode') + ' ：'"
                  prop="accessInterconnectCode"
                  :class="screenFlag ? 'screenthree' : 'flex-item'"
                >
                  <el-input
                    v-model="searchForm.accessInterconnectCode"
                    auto-complete="off"
                    :placeholder="$t('primaryDevice.pleaseInputinterconnectCode')"
                    clearable
                    @change="search_change"
                  />
                </el-form-item>
              </div>
            </div>

            <div class="search-btn" style="margin-bottom:18px;">
              <el-button type="primary" @click="handleFind" class="miniBtn">
                {{ $t('public.search') }}
              </el-button>
             
                <el-button  @click="manyCondition">{{ $t('public.manyCondition') }}</el-button>
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

          <el-table
            :max-height="tableHeight"
            v-if="!loading && tableData.length"
            :row-class-name="tableRowClassName"
            ref="multipleTable"
            :data="tableData"
            @selection-change="handleSelectionChange"
            @row-contextmenu="rowContextmenu"
            border
          >
            <template #empty>
              <span>{{ dataText }}</span>
            </template>
            <el-table-column label width="50" type="selection" />
            <el-table-column
              :label="$t('primaryDevice.mainDevId')"
              min-width="110"
              show-overflow-tooltip
              prop="mainDevId"
            >
              <template #default="{ row }">
                <span>{{ row.mainDevId }}</span>
              </template>
            </el-table-column>

            <el-table-column
              :label="$t('public.thirdMainDevId')"
              min-width="110"
              show-overflow-tooltip
              prop="thirdMainDevId"
            >
              <template #default="{ row }">
                <span>{{ row.thirdMainDevId }}</span>
              </template>
            </el-table-column>

            <el-table-column
              :label="$t('public.mainDevName')"
              min-width="100"
              show-overflow-tooltip
              prop="mainDevName"
            >
              <template #default="{ row }">
                <span>{{ row.mainDevName }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('primaryDevice.drive')" show-overflow-tooltip prop="drive">
              <template #default="{ row }">
                <span>{{ row.drive }}</span>
              </template>
            </el-table-column>

            <el-table-column
              :label="$t('public.mainDevType')"
              min-width="95"
              show-overflow-tooltip
              prop="mainDevType"
            >
              <template #default="{ row }">
                <span>{{ setmainDevType(row.mainDevType) }}</span>
              </template>
            </el-table-column>

            <el-table-column
              :label="$t('primaryDevice.puIp')"
              min-width="65"
              show-overflow-tooltip
              prop="mainDevConfigInfo"
            >
              <template #default="{ row }">
                <span>{{ row.mainDevConfigInfo.puIp }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('public.state')"
              min-width="60"
              show-overflow-tooltip
              prop="status"
            >
              <template #default="{ row }">
                <span
                  :class="
                    row.status == '0'
                      ? 'warning'
                      : row.status == '1'
                      ? 'success'
                      : row.status == '2'
                      ? 'danger'
                      : ''
                  "
                >
                  {{ deviceRegister(row.status) }}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              :label="$t('public.createTime')"
              min-width="90"
              show-overflow-tooltip
              prop="createTime"
            >
              <template #default="{ row }">
                <span>{{ row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column
              :label="$t('public.updateTime')"
              min-width="90"
              show-overflow-tooltip
              prop="updateTime"
            >
              <template #default="{ row }">
                <span>{{ row.updateTime }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('public.operating')" min-width="150">
              <template #default="{ row }">
                <el-button type='text'
                  class="cell-operate"
                  style="word-break: break-word"
                  @click="handleEdits(row)"
                  v-if="PermissionInfo"
                >
                  {{ $t('public.particulars') }}
                </el-button>
                <span
                  style="margin-right: 7px; color: #f56c6c; cursor: pointer; word-break: break-word"
                  @click="handleDelete(row)"
                >
                  {{ $t('public.delete') }}
                </span>
                <span
                  style="margin-right: 7px; color: #10a9ff; cursor: pointer; word-break: break-word"
                  @click="paramsConfig(row)"
                >
                  {{ $t('primaryDevice.paramsConfig') }}
                </span>
              </template>
            </el-table-column>
          </el-table>
          <!-- <pagination
        v-show="!loading && tableData.length"
        :total="total"
        :pageNum="queryParams.pageInfo.pageNum"
        :limit="queryParams.pageInfo.pageSize"
        @pagination="getAccessTypeList"
      /> -->
          <!--分页-->
          <pagination
            :total="totalNum"
            :pageNum="pageNum"
            :limit="pageSize"
            @pagination="getListByPage"
          ></pagination>
        </div>
      </el-col>
    </el-row>

    <!-- 添加对话框 -->
    <device-add></device-add>
    <!-- 自动批量接入对话框 -->
    <device-batch-add></device-batch-add>
    <!-- 添加设备录像策略失败列表 -->
    <recordPolicy-failList></recordPolicy-failList>
    <!-- 修改对话框 -->
    <device-modify></device-modify>
    <!-- 详情对话框 -->
    <device-detail></device-detail>
    <!-- 设备视频通道信息 -->
    <device-video-channel></device-video-channel>
    <!-- 参数配置弹框 -->
    <el-dialog
      
      :title="$t('public.editFrontInfo')"
      :visible.sync="baseInfoShows"
      :width="locale == 'en' ? '1500px' : '1200px'"
      class="baseInfoDialog"
      :close-on-click-modal="false"
      :modal="false"
      @open="dialogOpen"
      @closed="dialogClosed"
    >
      <base-info :showOthersMenu="1"></base-info>
    </el-dialog>
    <!-- 批量导入失败列表 -->
    <import-fail-list></import-fail-list>
    <!-- 调拨主设备 -->
    <device-allcate></device-allcate>
    <!-- 调拨设备失败列表 -->
    <device-allcate-error-list></device-allcate-error-list>

    <!-- 批量操作 -->
    <batch-operate
      :multipleSelection="
        operate == $t('public.batchImport') || operate == $t('primaryDevice.importADS')
          ? batchList
          : multipleSelection
      "
      :what="$t('batchOperator.device')"
      @getList="getMainDevList"
      :operate="operate"
      :batchApi="batchApi"
      whatId="mainDevId"
      whatName="mainDevName"
      v-model:loading="loading"
      v-model:visible="batchDialogVisible"
      :multipleSelectionMany="multipleSelectionMany"
      @searchClear="search_clear"
    />

    <ExportExcelModal
      :title="$t('primaryDevice.exportMainDev')"
      v-model:visible="exportExcelModalVisible"
      :loadOption="exportExcelLoadFunc"
      :customErrorColumn="exportExcelErrorColumns"
    ></ExportExcelModal>
    <!-- 是否接入图片 -->
    <add-failList
      v-model:addDialogVisible="imageDialogVisible"
      :addFailList="imageFailList"
      :title="$t('primaryDevice.failedPicAccessInfoList')"
    ></add-failList>
    <!-- 删除提示确认框 -->
    <el-dialog
      :title="$t('primaryDevice.inputFollowingText') + '：'"
      v-model="dialogDeleteVisible"
      :close-on-click-modal="false"
      width="420px"
    >
      <div style="padding: 20px 20px 10px" class="delBgColor">
        <el-input v-model="deleteConfirm" clearable />
        <p style="-webkit-user-select: none">
          {{
            $t('primaryDevice.deleteVideotape', {
              num: isBatchDelete ? multipleSelection.length : 1,
              s: this.isBatchDelete ? (this.multipleSelection.length > 1 ? 's' : '') : ''
            })
          }}
        </p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelDelete">
            {{ $t('public.cancel') }}
          </el-button>
          <el-button
            type="primary"
            @click="isBatchDelete ? confirmDeleteBatch() : confirmDelete()"
            :loading="maskloading"
          >
            {{ $t('public.confirm') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      :title="$t('batchOperator.failList')"
      v-model="batchVisible"
      width="800px"
      class="failDialog"
      draggable
    >
      <el-table
        max-height="200"
        :data="failInfos"
        style="width: 100%; margin: 0px 0 30px"
        :row-class-name="tableRowClassNameDialog"
        border
      >
        <el-table-column
          :label="$t('public.thirdMainDevId')"
          prop="thirdId"
          width="200"
          show-overflow-tooltip
        />

        <el-table-column
          :label="$t('primaryDevice.resultDesc')"
          prop="remarks"
          show-overflow-tooltip
        />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { PLATFORM_TYPE } from '@/enums/platformEnum'
import { permissions } from '@/utils/common/permissions'
import { download } from '@/utils/common/download'
import { mapState, mapActions } from 'vuex'
import Excel from '@/components/excel/importExcel'
import { ExportExcelModal } from '@/components/batch'
import deviceAdd from './component/device-add'
import deviceBarchAdd from './component/device-batch-add.vue'
import deviceModify from './component/device-modify'
import deviceDetail from './component/device-detail'
import deviceVideoChannel from './component/device-video-channel'
import deviceAllcate from './component/device-allcate'
import deviceAllcateErrorList from '../component/device-allcate-error-list.vue'
import importFailList from '@/views/mini/pages/common/component/import-fail-list'
import recordPolicyFailList from './component/recordPolicy-failList'
import baseInfo from '@/views/mini/pages/common/config/pu-config'
import batchOperate from '@/components/batchOperate' //批量操作
import breadcrumb from '@/components/breadcrumb' //面包屑
import addFailList from './component/add-failList'
import LazySearchTree from '@/components/lazy-search-tree'

import tableCopy from '@/mixin/tableCopy.js'
import judgeWindow from '@/mixin/judgeWindow'

export default {
  components: {
    'base-info': baseInfo,
    'device-add': deviceAdd,
    'device-modify': deviceModify,
    'device-detail': deviceDetail,
    'device-video-channel': deviceVideoChannel,
    'device-allcate': deviceAllcate,
    'device-allcate-error-list': deviceAllcateErrorList,
    'import-fail-list': importFailList,
    'recordPolicy-failList': recordPolicyFailList,
    'batch-operate': batchOperate,
    LazySearchTree,
    'device-batch-add': deviceBarchAdd,
    'add-failList': addFailList,
    breadcrumb,
    Excel,
    ExportExcelModal,
  },
  name: 'MainDeviceManagement',
  mixins: [tableCopy, judgeWindow],
  data() {
    return {
      baseInfoShows:false,
      locale: localStorage.getItem('locale'),
      isRouterAlive: true,
      //用户权限判断
      PermissionInfo: true,
      PermissionManage: true,
      PermissionAllot: false,
      PermissionInfoView: true,
      PermissionInfoSet: true,
      PermissionCameraView: true,
      PermissionCameraManage: true,
      PermissionDelete: true,
      batchVisible: false,
      organizationId: undefined,
      organizationName: '', //组织名称

      showManyCondition: false, // 高级搜索点击显示与隐藏
      iconName: 'el-icon-arrow-down', // iconClass 高级搜索的字体图标

      PLATFORM_TYPE: PLATFORM_TYPE,
      // 条件搜索
      searchForm: {
        mainDevName: '',
        mainDevId: '',
        puIp: '',
        thirdMainDevId: '',
        platId: '',
        status: '',
        accessInterconnectCode: ''
      },
      isSearch: false,
      failInfos: [],
      operate: '',
      batchApi: '',
      batchDialogVisible: false, //批量操作对话框
      multipleSelection: [], //表格选中状态存放数组
      loading: true,
      tableData: [], // 表格数据
      dataText: '',
      tableHeight: 630,

      deivcoData: [], //视频通道信息
      pageSizeplat: 5000,

      pageNum: 1,
      pageSize: 10,
      totalNum: 0, // 总数量

      domainResultCode: '', //集群列表接口返回码
      rowmainDevId: [],
      PlatformAccountShow: true,
      PlatformPasswordShow: true,

      failDialog: false, //导入失败对话框
      failList: [], //导入失败列表

      pageloading: false,

      infoDialogVisible: false, //前端参数弹框
      videoChannelDialogVisible: false, //视频通道
      mainDevId: '',

      addMainDevVisible: false, // 添加对话框
      addMainDevBatchVisible: false, //批量添加对话框

      recordPolicyDialogVisible: false, //添加设备录像策略失败弹框
      recordPolicyFailList: [],

      mainDevDetailVisible: false, // 详情对话框
      mainDevDetailForm: {}, // 详情表单
      operatorForm: {},

      modifyMainDevVisible: false, // 修改对话框
      modifyMainForm: {}, // 修改表单
      modifyMainOperatorForm: {},

      delShow: true, //批量删除

      recordPolicyData: [], // 录像策略

      allcateForm: {}, // 调拨主设备
      allcateDialogVisible: false, //调拨设备
      allcateErrorDialogVisible: false, //调拨失败对话框
      resultlist: [], //调拨失败列表

      mainDevTypeData: [], // 设备类型
      maxVideoNumData: [], // 最大视频通道数
      driveData: [
        {
          0: { name: 'ONVIF', value: 'ONVIF' },
          1: { name: 'T28181', value: 'T28181' },
          2: { name: this.$t('dictConst.HWSDKACREG'), value: 'HWSDK-ACREG' }
        }
      ], // 设备协议类型

      platNameList: [], //平台
      platNameLists: [], //调拨平台
      AddplatNameLists: [], //添加设备平台
      platType: '', //平台类型
      platId: '', //平台Id

      maskloading: false,

      choosedPlatType: '',
      batchList: [],
      multipleSelectionMany: [],
      exportExcelModalVisible: false,
      exportExcelErrorColumns: [
        {
          prop: 'mainDevId',
          label: this.$t('primaryDevice.mainDevId'),
          minWidth: '130'
        },
        {
          prop: 'mainDevName',
          label: this.$t('primaryDevice.mainDevName'),
          minWidth: '100'
        }
      ],
      imageDialogVisible: false, //是否接入图片中的图片存储时间
      imageFailList: [],
      placeholderTitle: this.$t('public.pleaseEnterOrg'),
      treeApi: 'getOrganizationTree',
      searchApi: 'searchInOrganizationTree',
      locateApi: 'locateInOrganizationTree',
      //删除验证文字
      deleteConfirm: '',
      //删除确认提示语弹窗
      dialogDeleteVisible: false,
      isBatchDelete: false,
      //当前删除的数据
      selectedRow: {}
    }
  },
  computed: {
    ...mapState({
      applicationData: state => state.dict['application-type'], //应用类型
      ptzTypeData: state => state.dict['device-type'], // 摄像机类型
      networkTypeData: state => state.dict['dev-access-mode'], // 网络类型
      manufacturerData: state => state.dict['camera_manufacturer'], // 设备厂商类型
      driveTypeAll: state => state.dict['drive_type_all'], // 设备厂商类型
      imgTypeAll: state => state.dict['camera-img-type'], // 智能属性
      deviceRegisterStatusList: state => state.dict['device-register-status']
    }),
    deviceRegisterStatusListFormattered() {
      let arr = []
      this.deviceRegisterStatusList.forEach(item => {
        let obj = { name: item.name, value: parseInt(item.value) }
        arr.push(obj)
      })
      return arr
    }
  },
  watch: {
    //监听语言切换
    '$i18n.locale': function () {
      this.pageResize()
      this.setData()
    },
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
    // 表格斑马纹
    tableRowClassNameDialog({ rowIndex }) {
      return rowIndex % 2 == 1 ? '' : 'success-row'
    },
    exportdev() {
      this.dataText = ''
      this.loading = true
      let data = {
        organizationId: this.organizationId,
        netType: this.$getNetType()
      }
      this.$api.exportMainDevList(data).then(res => {
        if (res.url) {
          download(res.url, this.$t('primaryDevice.devInfo'))
        }
        this.loading = false
      })
    },
    exportExcelLoadFunc() {
      const normalizeExportData = data => {
        return data.map(item => {
          let {
            mainDevId,
            thirdMainDevId,
            mainDevName,
            mainDevType,
            mainDevAccessInfo,
            organizationName,
            platId,
            manufacturer,
            drive,
            applicationType,
            status,
            installLocate,
            longitude,
            latitude,
            createTime,
            updateTime,
            mainDevNetworkInfo,
            mainDevConfigInfo
          } = item
          let mainDevTypeName =  this.mainDevTypeData.find((t) => t.value == mainDevType)?.key
          let platName = this.platNameList.find((t) => t.value == platId)?.key
          let accessInterconnectCode = ''
          if (mainDevAccessInfo && mainDevAccessInfo.accessInterconnectCode != undefined) {
            accessInterconnectCode = mainDevAccessInfo.accessInterconnectCode
          }
           manufacturer= this.manufacturerData.find((t) => t.value == manufacturer)?.name
     
          drive = this.driveTypeAll.find((t) => t.code == drive)?.name
          applicationType =this.applicationData.find((t) => t.value == applicationType)?.key
          status = this.deviceRegisterStatusListFormattered.find((t) => t.value == status)?.name
          installLocate = installLocate == undefined ? '' : installLocate
          let networkType =this.networkTypeData.find((t) => t.value ==  mainDevNetworkInfo?.networkType == 'undefined'
              ? ''
              : mainDevNetworkInfo?.networkType + '',)?.key
          let puIp = mainDevConfigInfo?.puIp == undefined ? '' : mainDevConfigInfo.puIp
          longitude = longitude == undefined ? '' : longitude
          latitude = latitude == undefined ? '' : latitude
          createTime = createTime == undefined ? '' : createTime
          updateTime = updateTime == undefined ? '' : updateTime
          return {
            mainDevId,
            thirdMainDevId,
            mainDevName,
            mainDevTypeName,
            accessInterconnectCode,
            organizationName,
            platName,
            manufacturer,
            drive,
            applicationType,
            status,
            installLocate,
            networkType,
            puIp,
            longitude,
            latitude,
            createTime,
            updateTime
          }
        })
      }
      return {
        listFn: this.$api.exportMainDevList,
        listFnParam: {
          pageInfo: {
            pageNum: 1,
            pageSize: 500
          },
          organizationId: this.organizationId
        },
        listFnResAttrName: 'mainDevList',
        filename: this.$t('primaryDevice.devInfo'),
        bookType: 'xlsx',
        header: {
          mainDevId: this.$t('primaryDevice.mainDevId'),
          thirdMainDevId: this.$t('primaryDevice.thirdMainDevId'),
          mainDevName: this.$t('primaryDevice.mainDevName'),
          mainDevTypeName: this.$t('primaryDevice.mainDevType'),
          accessInterconnectCode: this.$t('primaryDevice.accessInterconnectCode'),
          organizationName: this.$t('primaryDevice.AffiliatedOrg'),
          platName: this.$t('primaryDevice.platForm'),
          manufacturer: this.$t('primaryDevice.manufacturer'),
          drive: this.$t('primaryDevice.drive'),
          applicationType: this.$t('primaryDevice.applicationType'),
          status: this.$t('primaryDevice.state'),
          installLocate: this.$t('primaryDevice.installLocate'),
          networkType: this.$t('primaryDevice.networkType'),
          puIp: this.$t('primaryDevice.puIp'),
          longitude: this.$t('public.longitude'),
          latitude: this.$t('public.latitude'),
          createTime: this.$t('public.createTime'),
          updateTime: this.$t('public.updateTime')
        },
        dataNormalizeFn: normalizeExportData
      }
    },
    pageResize() {
      this.locale = localStorage.getItem('locale')
      this.judgeWindow(1916)
    },
    //用户权限判断
    async getPermissions() {
      this.PermissionInfo = await permissions(17)
      this.PermissionManage = await permissions(18)
      this.PermissionAllot = await permissions(20)
      this.PermissionInfoView = await permissions(161)
      this.PermissionInfoSet = await permissions(162)
      this.PermissionDelete = await permissions(2002)

      this.PermissionCameraView = await permissions(21) //镜头查看
      this.PermissionCameraManage = await permissions(22) //镜头管理
    },

    // 树加载完初始化表格
    async initData(list) {
      //初始化面包屑
      setTimeout(() => {
        this.$refs.breadcrumb.initBread(list)
      }, 100)
      const payload = list[0].payload
      this.organizationId = payload.organizationId
      this.organizationName = payload.organizationName
      await this.platformList() // 监控平台
      await this.getMainDevList()
    },
    // 点击树节点
    async treeNodeClick(obj) {
      // 点击树联动面包屑
      this.$refs.breadcrumb.treeLinkBread(obj.data, obj.node)
      this.organizationId = obj.data.payload.organizationId
      this.organizationName = obj.data.payload.organizationName
      this.search_clear()
      await this.getMainDevList()
      await this.platformList()
    },
    // 面包屑联动树
    tree_change(data) {
      this.$refs.lazyTree.handleNodeClick(
        this.$refs.lazyTree.$refs.treeList.getNode(data.id).data,
        this.$refs.lazyTree.$refs.treeList.getNode(data.id)
      )
      this.$refs.lazyTree.$refs.treeList.setCurrentKey(data.id)
    },

    // 加载设备列表 ！
    getMainDevList(e) {
      console.log(e)
      if (this.organizationId !== undefined) {
        this.dataText = ''
        this.loading = true
        if(e){
          this.pageNum = e.pageNum
        }
        let data = {
          pageInfo: {
            pageNum: this.pageNum,
            pageSize: this.pageSize
          },
          organizationId: this.organizationId
        }
        if (this.isSearch) {
          Object.assign(data, this.searchForm)
        }

        this.$api.getMainDevList(data).then(res => {
          this.devListBack(res)
        })
      }
    },
    devListBack(res) {
      if (res.mainDevList && res.mainDevList.length != 0) {
        this.tableData = res.mainDevList
        this.totalNum = res.pageInfo.totalNum

        this.tableData.forEach(tableDataItem => {
          this.platNameList.forEach(platNameListItem => {
            if (platNameListItem.platId == tableDataItem.platId) {
              tableDataItem.platType = platNameListItem.platType
            }
          })
        })
        this.$nextTick(() => {
          // this.$refs.multipleTable.setScrollTop(0)
        })
      } else {
        this.tableData = []
        this.totalNum = 0
        this.dataText = this.$t('public.noData')
      }
      this.loading = false

      console.log(this.totalNum,this.pageNum,this.pageSize)
    },

    // 监控平台 !
    async platformList() {
      if (this.organizationId !== undefined) {
        await this.$api
          .queryAccessPlatformList({
            organizationId: this.organizationId,
            platAbility: 'SURVEILLANCE'
          })
          .then(res => {
            this.platNameLists = []
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
              this.platNameList = res.platformList
            }
          })

        if (this.organizationId !== undefined) {
          await this.$api
            .getPlatformListQuery({
              organizationId: this.organizationId,
              pageInfo: {
                pageNum: 1,
                pageSize: 100
              }
            })
            .then(res => {
              this.platNameLists = []
              this.AddplatNameLists = []
              if (res.platList && res.platList.length) {
                this.platNameLists = res.platList
                this.AddplatNameLists = res.platList.filter(item => item.platType != 7)
              }
            })
        }
      }
    },
    ...mapActions('dict', ['getSysDictData']),
    // 字典查询
    applicationTypeData() {
      this.getSysDictData([
        'application-type',
        'device-type',
        'dev-access-mode',
        'camera_manufacturer',
        'camera-img-type',
        'device-register-status'
      ])
    },
deviceRegister(val){
  return this.deviceRegisterStatusListFormattered.find((t) => t.value == val)?.name
},
    setmainDevType(val) {
      if (val == 0) {
        return this.$t('public.mainDevName0')
      } else if (val == 1) {
        return this.$t('public.mainDevName1')
      } else if (val == 2) {
        return this.$t('public.mainDevName2')
      } else if (val == 3) {
        return this.$t('public.mainDevName3')
      } else if (val == 4) {
        return this.$t('public.mainDevName4')
      } else {
        return ''
      }
    },

    // 国际化
    setData() {
      this.mainDevTypeData = [
        {
          AmainDev: 3,
          mainDevName: this.$t('public.mainDevName3')
        },
        {
          AmainDev: 1,
          mainDevName: this.$t('public.mainDevName1')
        }
      ]

      this.maxVideoNumData = [
        { maxVideoNum: 1, maxVideoName: this.$t('public.maxVideoName1') },
        { maxVideoNum: 4, maxVideoName: this.$t('public.maxVideoName4') },
        { maxVideoNum: 8, maxVideoName: this.$t('public.maxVideoName8') },
        { maxVideoNum: 16, maxVideoName: this.$t('public.maxVideoName16') },
        { maxVideoNum: 32, maxVideoName: this.$t('public.maxVideoName32') },
        { maxVideoNum: 64, maxVideoName: this.$t('public.maxVideoName64') },
        { maxVideoNum: 128, maxVideoName: this.$t('public.maxVideoName128') },
        { maxVideoNum: 256, maxVideoName: this.$t('public.maxVideoName256') },
        { maxVideoNum: 512, maxVideoName: this.$t('public.maxVideoName512') }
      ]
    },

    search_change() {
      this.isSearch = false
    },
    //判断是否点击搜索
    search_clear() {
      if (!this.isSearch) {
        this.searchForm = {
          mainDevName: '',
          mainDevId: '',
          puIp: '',
          thirdMainDevId: '',
          platId: '',
          status: '',
          accessInterconnectCode: ''
        }
      }
    },
    // 搜索 ！
    handleFind() {
      this.pageNum = 1
      this.isSearch = true
      this.getMainDevList()
    },

    getTemplateCommand(command) {
      switch (command) {
        case 1:
          this.getTemplate(1) // 下载模板IVS
          break
        case 2:
          this.getTemplate(2) // 下载模板SVS
          break
        case 3:
          this.getTemplate(3) // 下载模板VSS
          break
        case 5:
          this.getTemplate(5) // 下载模板VSS
          break
      }
    },
    getTemplate(templateType) {
      let data = {
        templateType,
        netType: this.$getNetType()
      }

      this.$api.getMainDevTemplate(data).then(res => {
        if (res.templateFileUrl) {
          let name = ''
          name =
            templateType == 1
              ? 'IVS'
              : templateType == 5
              ? 'ADS'
              : templateType == 4
              ? 'AVS'
              : 'vPaaS'
          download(res.templateFileUrl, name + '-' + this.$t('public.importTemplate'))
        }
      })
    },

    // 批量导入
    importInfoIVS() {
      this.$refs.importIVS.click()
      this.importInfo('importIVS', 1)
    },
    importInfoSVS() {
      this.$refs.importSVS.click()
      this.importInfo('importSVS', 2)
    },
    importInfoAVS() {
      this.$refs.importAVS.click()
      this.importInfo('importAVS', 4)
    },
    batchImportADS(data) {
      if (data[0].results.length > 1000) {
        this.$message.warning(this.$t('deviceCamera.batchImportPrompt'))
        return
      }
      this.batchList = []
      data[0].results &&
        data[0].results.map(v => {
          this.batchList.push(Object.assign(v, { platType: PLATFORM_TYPE.ADS }))
        })
      this.loading = true
      this.operate = this.$t('primaryDevice.importADS')
      this.batchApi = 'addMainDevInfo'
      this.multipleSelectionMany = []
      for (let i = 0; i < this.batchList.length; i++) {
        let obj = {
          platType: PLATFORM_TYPE.ADS,
          mainDevName: this.batchList[i].mainDevName,
          organizationNames: this.batchList[i].organizationNames,
          applicationType: this.batchList[i].applicationType,
          mainDevType: this.setMainDevTypeEX(this.batchList[i].mainDevType),
          longitude: this.batchList[i].longitude,
          latitude: this.batchList[i].latitude,
          drive: this.batchList[i].drive,
          mainDevAccessInfo: {
            accessInterconnectCode: this.batchList[i].accessInterconnectCode
          },
          installLocate: this.batchList[i].installLocate,
          platId: this.batchList[i].platId,
          manufacturer: this.batchList[i].manufacturer,
          mainDevConfigInfo: {
            puAccount: this.batchList[i].puAccount,
            puPasswd: this.batchList[i].puPasswd,
            puIp: this.batchList[i].puIp,
            puPort: this.batchList[i].puPort,
            puAccessPasswd: this.batchList[i].puAccessPasswd,
            maxVideoNum: this.batchList[i].maxVideoNum,
            domainCode: this.batchList[i].domainCode,
            clusterCode: this.batchList[i].clusterCode,
            tasIp: this.batchList[i].gateway ? this.batchList[i].gateway.split('_')[0] : undefined,
            tasCode: this.batchList[i].gateway
              ? this.batchList[i].gateway.split('_')[1]
              : undefined,
            nvrCode: this.batchList[i].nvrCode
          },
          mainDevNetworkInfo: {
            networkType: this.setNetworkTypeEX(this.batchList[i].networkType)
          },
          cameraConfigInfo: {
            ptzType: parseInt(this.setPtzTypeEX(this.batchList[i].ptzType)),
            recordRemainDays: this.batchList[i].recordRemainDays,
            recordPolicyId: this.batchList[i].recordPolicyId
          },
          registerType: this.batchList[i].drive == 'T28181' ? 1 : undefined
        }
        this.multipleSelectionMany.push(obj)
      }
      this.batchDialogVisible = true
    },
    batchImportAVS(data) {
      if (data[0].results.length > 1000) {
        this.$message.warning(this.$t('deviceCamera.batchImportPrompt'))
        return
      }
      this.batchList = data[0].results
      this.loading = true
      this.operate = this.$t('public.batchImport')
      this.batchApi = 'addMainDevInfo'
      this.multipleSelectionMany = []
      for (let i = 0; i < this.batchList.length; i++) {
        let obj = {
          mainDevName: this.batchList[i].mainDevName,
          mainDevType: this.setMainDevTypeEX(this.batchList[i].mainDevType),
          mainDevConfigInfo: {
            maxVideoNum: this.batchList[i].maxVideoNum,
            puAccount: this.batchList[i].puAccount,
            puPasswd: this.batchList[i].puPasswd,
            puAccessPasswd: this.batchList[i].puAccessPasswd,
            puIp: this.batchList[i].puIp,
            puPort: this.batchList[i].puPort
          },
          cameraConfigInfo: {
            ptzType: parseInt(this.setPtzTypeEX(this.batchList[i].ptzType)),
            recordRemainDays: this.batchList[i].recordRemainDays,
            recordPolicyId: this.batchList[i].recordPolicyId
          },
          drive: this.batchList[i].drive,
          mainDevAccessInfo: {
            accessInterconnectCode: this.batchList[i].accessInterconnectCode
          },
          installLocate: this.batchList[i].installLocate,
          model: this.batchList[i].model,
          manufacturer: this.setManufacturerEX(this.batchList[i].manufacturer),
          mainDevNetworkInfo: {
            networkType: this.setNetworkTypeEX(this.batchList[i].networkType)
          },
          longitude: this.batchList[i].longitude,
          latitude: this.batchList[i].latitude,
          organizationNames: this.batchList[i].organizationNames,
          platId: this.batchList[i].platId,
          applicationType: this.batchList[i].applicationType,
          registerType: 1
        }
        this.multipleSelectionMany.push(obj)
      }
      this.batchDialogVisible = true
    },
    batchImportIVS(data) {
      if (data[0].results.length > 1000) {
        this.$message.warning(this.$t('deviceCamera.batchImportPrompt'))
        return
      }
      this.batchList = data[0].results
      this.loading = true
      this.operate = this.$t('public.batchImport')
      this.batchApi = 'addMainDevInfo'
      this.multipleSelectionMany = []
      for (let i = 0; i < this.batchList.length; i++) {
        let obj = {
          mainDevName: this.batchList[i].mainDevName,
          organizationNames: this.batchList[i].organizationNames,
          applicationType: this.batchList[i].applicationType,
          mainDevType: this.setMainDevTypeEX(this.batchList[i].mainDevType),
          longitude: this.batchList[i].longitude,
          latitude: this.batchList[i].latitude,
          drive: this.batchList[i].drive,
          mainDevAccessInfo: {
            accessInterconnectCode: this.batchList[i].accessInterconnectCode
          },
          installLocate: this.batchList[i].installLocate,
          platId: this.batchList[i].platId,
          manufacturer: this.setManufacturerEX(this.batchList[i].manufacturer),
          mainDevConfigInfo: {
            puAccount: this.batchList[i].puAccount,
            puPasswd: this.batchList[i].puPasswd,
            puIp: this.batchList[i].puIp,
            puPort: this.batchList[i].puPort,
            puAccessPasswd: this.batchList[i].puAccessPasswd,
            maxVideoNum: this.batchList[i].maxVideoNum,
            domainCode: this.batchList[i].domainCode,
            clusterCode: this.batchList[i].clusterCode,
            tasIp: this.batchList[i].gateway ? this.batchList[i].gateway.split('_')[0] : undefined,
            tasCode: this.batchList[i].gateway
              ? this.batchList[i].gateway.split('_')[1]
              : undefined,
            nvrCode: this.batchList[i].nvrCode
          },
          mainDevNetworkInfo: {
            networkType: this.setNetworkTypeEX(this.batchList[i].networkType)
          },
          cameraConfigInfo: {
            ptzType: parseInt(this.setPtzTypeEX(this.batchList[i].ptzType)),
            recordRemainDays: this.batchList[i].recordRemainDays,
            recordPolicyId: this.batchList[i].recordPolicyId,
            recordStoreDays: this.batchList[i].recordStoreDays
              ? this.batchList[i].recordStoreDays
              : undefined
          },
          registerType: this.batchList[i].drive == 'T28181' ? 1 : undefined
        }
        this.multipleSelectionMany.push(obj)
      }
      this.batchDialogVisible = true
    },
    importInfo(refName, templateType) {
      let inputDOM = this.$refs[refName]
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
      formData.append('api', '/api/uvs/main-dev/import')
      formData.append('netType', this.$getNetType())
      this.pageloading = true
      this.$api.uploadFileTemporary(formData).then(res => {
        let data = {
          importFileId: res.fileId,
          templateType,
          netType: this.$getNetType()
        }
        this.$api.importMainDevInfo(data, 60000).then(res1 => {
          this.pageloading = false
          this.$refs[refName].value = ''
          if (res1.resultCode == 0) {
            this.$message.success(this.$t('public.importSuccess'))
            this.search_clear()
            this.getMainDevList()
          } else {
            if (Object.prototype.hasOwnProperty.call(res1, 'failList')) {
              this.failList = res1.failList
              this.failList.forEach(item => {
                if (item.errorMsg === 'error:104012') {
                  item.errorMsg = this.$t('primaryDevice.deviceInfoCannotSame')
                }
                if (item.errorMsg === 'error:201006') {
                  item.errorMsg = this.$t('primaryDevice.recordingDaysCannotEmpty')
                }
              })
              this.failDialog = true
            } else {
              this.$message.error(res1.resultDesc)
            }
          }
        })
      })
    },

    // 获取录像策略
    getRecordPlanList() {
      if (this.recordPolicyData.length) return

      this.$api.getRecordPlanListQuery({}).then(res => {
        if (res.recordPlanList) {
          this.recordPolicyData = res.recordPlanList
        }
      })
    },

    // 添加 !
    handleAdd(command) {
      switch (command) {
        case 1:
          this.addMainDevBatchVisible = true
          break
        case 2:
          this.singleAccessDevice()
          break
      }
    },

    async singleAccessDevice() {
      if (this.AddplatNameLists.length === 0) {
        this.$confirm(this.$t('primaryDevice.singleAccessWarn'), this.$t('public.prompt'), {
          confirmButtonText: this.$t('public.confirm'),
          cancelButtonText: this.$t('public.cancel')
        })
          .then(() => {
            this.$router.push({ path: '/system/cluster-allocate' })
          })
          .catch(() => {})
      } else {
        if (!this.applicationData.length) {
          this.getSysDictData(['application-type'])
        }
        await this.getRecordPlanList()
        this.addMainDevVisible = true
      }
    },
    // 调拨设备
    Allocating() {
      this.allcateForm = {
        organizationId: this.organizationId,
        organizationName: this.organizationName,
        platform: '',
        domainCode: '',
        PlatformAccount: '',
        PlatformPassword: '',
        devicelist: ''
      }
      this.allcateDialogVisible = true
    },

    // 批量删除 ！
    handleDel() {
      if (this.multipleSelection.length > 50) {
        this.$message.warning(this.$t('primaryDevice.delete50'))
        return
      }
      this.isBatchDelete = true
      let pormpt = ''
      if (this.locale == 'en') {
        pormpt =
          this.$t('public.bulkDelPrompt1') +
          ' ' +
          this.multipleSelection.length +
          ' ' +
          this.$t('batchOperator.device1') +
          ',' +
          this.$t('public.bulkDelPrompt2')
      } else {
        pormpt = this.$t('GBShare.deleteEquipment', {
          num: this.multipleSelection.length
        })
      }
      this.$confirm(pormpt, this.$t('public.prompt'), {
        confirmButtonText: this.$t('public.confirm'),
        cancelButtonText: this.$t('public.cancel'),
        type: 'warning',
        closeOnClickModal: false
      })
        .then(async () => {
          this.dialogDeleteVisible = true
          this.deleteConfirm = ''
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('public.canceledDelete')
          })
        })
    },
    //取消删除操作
    cancelDelete() {
      this.dialogDeleteVisible = false
      this.$message({
        type: 'info',
        message: this.$t('public.canceledDelete')
      })
    },
    //删除验证确认操作
    confirmDelete() {
      if (
        this.deleteConfirm ==
        this.$t('primaryDevice.deleteVideotape', {
          num: this.isBatchDelete ? this.multipleSelection.length : 1,
          s: this.isBatchDelete ? (this.multipleSelection.length > 1 ? 's' : '') : ''
        })
      ) {
        this.maskloading = true
        this.$api
          .deleteMainDevInfo({ mainDevId: this.selectedRow.mainDevId })
          .then(res => {
            if (res.resultCode === 0) {
              this.$message({
                type: 'success',
                message: this.$t('public.delSuccess')
              })
              this.dialogDeleteVisible = false
              this.maskloading = false
              this.search_clear()
              this.getMainDevList()
            }
          })
          .finally(() => {
            this.maskloading = false
          })
      } else {
        this.$message.error(this.$t('primaryDevice.tryAgainContent'))
      }
    },
    async confirmDeleteBatch() {
      if (
        this.deleteConfirm ==
        this.$t('primaryDevice.deleteVideotape', {
          num: this.multipleSelection.length,
          s: this.isBatchDelete ? (this.multipleSelection.length > 1 ? 's' : '') : ''
        })
      ) {
        this.dialogDeleteVisible = false
        this.maskloading = false
        let devids = []
        this.multipleSelection.forEach(item => {
          devids.push(item.mainDevId)
        })
        let params = {
          mainDevIds: devids
        }
        let res = await this.$api.deleteMainBatchDeleteInfo(params)
        if (res.resultCode === 0) {
          this.$message.success(this.$t('primaryDevice.batchSuccess'))
          this.handleFind()
          this.delShow = true
        } else {
          this.batchVisible = true
          this.failInfos = res.failInfos
        }
      } else {
        this.$message.error(this.$t('primaryDevice.tryAgainContent'))
      }
    },

    // 点击更多条件控制更多条件的显示与隐藏！
    manyCondition() {
      this.showManyCondition = !this.showManyCondition
      this.iconName = this.showManyCondition ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
      this.tableHeight = this.showManyCondition ? 556 : 630
    },

    // 表格斑马纹
    tableRowClassName({ rowIndex }) {
      return rowIndex % 2 == 1 ? '' : 'success-row'
    },
    // 表格列表选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (this.multipleSelection.length != 0) {
        this.delShow = false
      } else {
        this.delShow = true
      }
    },

    // 修改
    async handleEdit(row) {
      this.choosedPlatType = row.platType
      let res = await this.$api.getMainDevInfo({ mainDevId: row.mainDevId })
      if (res.resultCode != 0) return
      this.modifyMainForm = {
        organizationId: res.organizationId,
        organizationName: res.organizationName,
        mainDevId: res.mainDevId,
        mainDevName: res.mainDevName,
        drive: res.drive,
        installLocate: res.installLocate,
        thirdMainDevId: res.thirdMainDevId,
        mainDevType: res.mainDevType,
        manufacturer: res.manufacturer,
        remark: res.remark,
        platId: res.platId,
        accessInterconnectCode: res?.mainDevAccessInfo?.accessInterconnectCode,
        longitude: res.longitude,
        latitude: res.latitude
      }
      this.modifyMainDevVisible = true
    },

    // 详情
    async handleEdits(row) {
      let res = await this.$api.getMainDevInfo({ mainDevId: row.mainDevId })
      if (res.resultCode != 0) return
      this.mainDevDetailForm = {
        organizationName: res.organizationName,
        tenantName: res.tenantName,
        mainDevId: res.mainDevId,
        platId: res.platId,
        mainDevName: res.mainDevName,
        applicationType: res.applicationType,
        drive: res.drive,
        installLocate: res.installLocate,
        thirdMainDevId: res.thirdMainDevId,
        mainDevType: res.mainDevType,
        manufacturer: res.manufacturer,
        status: res.status,
        networkType: res.mainDevNetworkInfo ? res.mainDevNetworkInfo.networkType : '',
        longitude: res.longitude,
        latitude: res.latitude,
        createTime: res.createTime,
        updateTime: res.updateTime,
        remark: res.remark,
        puIp: res.mainDevConfigInfo ? res.mainDevConfigInfo.puIp : '',
        puPort: res.mainDevConfigInfo ? res.mainDevConfigInfo.puPort : '',
        platType: res.platType,
        clusterName: res.mainDevConfigInfo ? res.mainDevConfigInfo.clusterName : undefined,
        domainName: res.mainDevConfigInfo ? res.mainDevConfigInfo.domainName : undefined,
        tasIp: res.mainDevConfigInfo ? res.mainDevConfigInfo.tasIp : undefined,
        tasCode: res.mainDevConfigInfo ? res.mainDevConfigInfo.tasCode : undefined,
        accessInterconnectCode: res.mainDevAccessInfo
          ? res.mainDevAccessInfo.accessInterconnectCode
          : ''
      }
      if (res.mainDevAccessInfo) {
        Object.assign(this.mainDevDetailForm, {
          accessInterconnectCode: res.mainDevAccessInfo.accessInterconnectCode,
          accessServerId: res.mainDevAccessInfo.accessServerId,
          accessServerDomain: res.mainDevAccessInfo.accessServerDomain,
          accessServerHost: res.mainDevAccessInfo.accessServerHost,
          accessServerPort: res.mainDevAccessInfo.accessServerPort,
          accessServerVPNHost: res.mainDevAccessInfo
            ? res.mainDevAccessInfo.accessServerVPNHost
            : undefined,
          accessServerVPNPort: res.mainDevAccessInfo
            ? res.mainDevAccessInfo.accessServerVPNPort
            : undefined,
          accessServerIpv6Host: res.mainDevAccessInfo?.accessServerIpv6Host
        })
      }
      this.platNameList.filter(item => {
        if (item.platId == res.platId) {
          this.mainDevDetailForm.platName = item.platName
        }
      })
      this.mainDevDetailVisible = true
    },

    // 更多操作
    handleCommand(command) {
      switch (command.command) {
        case 'a':
          this.mainDevCameraList(command.row)
          break
        case 'b':
          this.handleFrontInfo(command.row)
          break
        case 'c':
          this.handleDelete(command.row)
          break
        case 'd':
          this.syncNvr(command.row)
          break
      }
    },
    beforeHandleCommand(row, command) {
      return {
        row: row,
        command: command
      }
    },
    // 视频通道
    mainDevCameraList(row) {
      this.mainDevId = row.mainDevId
      this.videoChannelDialogVisible = true
    },

    handleDelete(row) {
      this.selectedRow = row
      this.isBatchDelete = false
      this.$confirm(this.$t('public.deletedev'), this.$t('public.prompt'), {
        confirmButtonText: this.$t('public.confirm'),
        cancelButtonText: this.$t('public.cancel'),
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          this.dialogDeleteVisible = true
          this.deleteConfirm = ''
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('public.canceledDelete')
          })
        })
    },

    // 配置前端参数
    handleFrontInfo(row) {
      this.$store.commit('config/set_frontDevId', row.mainDevId)
      this.$store.commit('config/set_frontPlatType', row.platType)
      this.$store.commit('config/set_frontDrive', row.drive)
    },

    // nvr800设备同步
    syncNvr(row) {
      this.$api.nvrSync({ mainDevId: row.mainDevId }).then(res => {
        if (res.resultCode == 0) {
          this.$message({
            type: 'success',
            message: this.$t('primaryDevice.syncSuccess')
          })
          this.getMainDevList()
        }
      })
    },
    // 参数配置
    paramsConfig(row) {
      this.$router.push({
        name: 'MainDeviceFrontEndParameterConfiguration',
        params: { mainDevId: row.mainDevId }
      })
    },

    dialogOpen() {
      this.baseInfoShows=true
      this.$nextTick(() => {
        
      })
    },
    dialogClosed() {
      this.baseInfoShows=false
      this.$store.commit('config/set_baseInfoShow', false)
    },

    // 分页
    getListByPage(e) {
      this.search_clear()
      this.getMainDevList(e)
    },
    //excel 中文转 value
    setMainDevTypeEX(val) {
      let value = ''
      this.mainDevTypeData.filter(item => {
        if (val == item.mainDevName) {
          value = item.AmainDev
        }
      })
      return value
    },
    setPtzTypeEX(val) {
      let value = ''
      this.ptzTypeData.filter(item => {
        if (val == item.name) {
          value = item.value
        }
      })
      return value
    },
    setDriveEX(val) {
      let value = ''
      this.driveTypeAll.filter(item => {
        if (val == item.name) {
          value = item.value
        }
      })
      return value
    },
    setManufacturerEX(val) {
      let value = ''
      this.manufacturerData.filter(item => {
        if (val == item.name) {
          value = item.value
        }
      })
      return value
    },
    setNetworkTypeEX(val) {
      let value = ''
      this.networkTypeData.filter(item => {
        if (val == item.name) {
          value = item.value
        }
      })
      return value
    }
  }
}
</script>

<style lang="scss">
#main-dev {
  .flex-item {
    width: 36%;
  }
  //一排三表单
  .screenthree {
    width: 25% !important;
  }

  .searchSelect {
    .el-select {
      width: 100%;
    }
  }

  .el-dialog__body {
    padding: 15px 0 5px;

    .el-form-item--small.el-form-item {
      margin-bottom: 28px;
    }
  }

  .el-step__icon.is-text {
    width: 68px;
    height: 68px;
    background: transparent;
  }

  .el-step__head.is-process .el-step__icon.is-text {
    border-color: #64befd !important;
    color: #64befd;
  }

  .el-step__title.is-process {
    color: #64befd;
  }

  .el-step__title.is-success {
    color: #ccc;
  }

  .el-icon-check:before {
    font-size: 25px;
    color: #fff;
  }

  .el-step__head.is-success .el-step__icon.is-text {
    border-color: #64befd !important;
    background: #64befd;
  }

  .el-step__head.is-success {
    border-color: #bfbfbf;
  }
}
.delBgColor {
  .el-input .el-input__inner {
    background: #f2f2f2;
    border: 1px solid #f2f2f2;
  }
}
.failDialog {
  .el-dialog__body {
    padding: 15px 28px 0px !important;
  }
}
.search-btn {
  position:absolute;
  top:78px;
  right:28px;
}
</style>
