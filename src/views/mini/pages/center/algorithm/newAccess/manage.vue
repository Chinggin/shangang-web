<template>
  <!--  算法接入管理 -->
  <div v-if="isRouterAlive" id="algorithm-access" ref="algorithmAccess" v-loading="pageloading"
    :element-loading-text="$t('public.batchImporting')">
    <el-row>
      <el-col :span="4" class="el-row4">
        <el-scrollbar style="border-radius: 6px">
          <div id="orgTree">
            <el-tree ref="treeList" node-key="id" :props="organizationTreeProps" :load="loadNode" lazy
              v-loading="treeLoading" :default-expanded-keys="idArr" :empty-text="treeEmptyText" highlight-current
              :expand-on-click-node="false" @node-click="handleNodeClick">
              <template #default="{ node, data }">
                <span class="custom-tree-node">
                  <i :class="iconSty(data)" class="aci iconCss"></i>
                  <span>{{ node.label }}</span>
                </span>
              </template>
            </el-tree>
          </div>
        </el-scrollbar>
      </el-col>
      <!-- 查询和其他操作 -->
      <el-col :span="20" style="padding: 0px 20px">
        <div style="position: relative; min-height: 38px" class="btnMargin">
          <div>
            <el-button type="primary" @click="handleAdd">{{ $t('public.add') }}</el-button>
          </div>
          <!-- 查询和其他操作 -->
          <div class="filter-container" style="position: absolute; top: 0px; right: -8px">
            <el-form :inline="true" class="demo-form-inline" label-width="100px" ref="form" :model="queryParams"
              label-position="left" style="display: flex; flex-direction: row">
              <el-form-item>
                <el-input v-model="queryParams.accessName" auto-complete="off"
                  :placeholder="$t('newAccess.inputSearchAccName')" clearable class="inputMiddle" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleFind" class="miniBtn">
                  {{ $t('public.search') }}
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div style="height: 600px" v-loading="loading" :element-loading-text="$t('public.loading')">
          <div v-if="!loading && !tableData.length" class="tableNOdata">
            <img src="@/assets/img/common/NOdata.png" alt />
            <p>{{ $t('public.noData') }}</p>
          </div>

          <!-- 表格 -->
          <el-table :max-height="tableHeight" v-if="!loading && tableData.length" :row-class-name="tableRowClassName"
            ref="multipleTable" :data="tableData" @selection-change="handleSelectionChange" border>
            <template #empty>
              <span>{{ dataText }}</span>
            </template>
            <el-table-column :label="$t('newAccess.accName')" width="170" show-overflow-tooltip>
              <template #default="{ row }">
                <span>{{ row.accessName }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('newAccess.accHost')" show-overflow-tooltip>
              <template #default="{ row }">
                <span>{{ row.accessHost }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('newAccess.accPort')" show-overflow-tooltip>
              <template #default="{ row }">
                <span>{{ row.accessPort }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('newAccess.version')" show-overflow-tooltip>
              <template #default="{ row }">
                <span>{{ row.version }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('newAccess.manufacturer')" width="160" show-overflow-tooltip>
              <template #default="{ row }">
                <span>{{ row.vendor }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('newAccess.status')" min-width="90" show-overflow-tooltip>
              <template #default="{ row }">
                <span :class="row.status == 1 ? 'success' : 'danger'">
                  {{ row.status == 1 ? $t('newAccess.online') : $t('newAccess.offline') }}
                </span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('public.createTime')" show-overflow-tooltip>
              <template #default="{ row }">
                <span>{{ row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('public.updateTime')" show-overflow-tooltip>
              <template #default="{ row }">
                <span>{{ row.updateTime }}</span>
              </template>
            </el-table-column>

            <el-table-column :label="$t('public.operating')" min-width="120" show-overflow-tooltip>
              <template #default="{ row }">
                <span class="cell-operate" @click="handleView(row)" v-if="PermissionInfo">
                  {{ $t('public.particulars') }}
                </span>
                <span class="cell-operate" @click="handleUpdate(row)" v-if="PermissionManage">
                  {{ $t('public.modify') }}
                </span>
                <span class="cell-operate danger" @click="handleDelete(row)" v-if="PermissionManage">
                  {{ $t('public.delete') }}
                </span>
              </template>
            </el-table-column>
          </el-table>

          <pagination v-if="!loading && tableData.length" :total="total" v-model:pageNum="queryParams.pageInfo.pageNum"
            v-model:limit="queryParams.pageInfo.pageSize" @pagination="getList" />
        </div>
      </el-col>
    </el-row>

    <access-add-new v-model:visible="formDialogVisible" :title="title" :operation="operation"></access-add-new>
    <access-detail-new v-model:visible="formDialogVisible_detail" :title="title_detail"></access-detail-new>
    <status-log></status-log>
  </div>
</template>

<script>
import accessAddNew from './component/access-add-new'
import accessDetailNew from './component/access-detail-new'
import statusLog from './component/status-log'
import { mapState, mapActions } from 'vuex'

import getLazyTree from '@/mixin/getLazyTree.js'
export default {
  mixins: [getLazyTree],
  name: 'AlgorithmAccessManagement',
  components: {
    accessAddNew,
    accessDetailNew,
    statusLog
  },
  data() {
    return {
      gatewayList: [],
      PermissionManage: true,
      PermissionInfo: true,
      isRouterAlive: true,
      total: 0,
      queryParams: {
        pageInfo: {
          pageNum: 1,
          pageSize: 10
        },
        accessName: ''
      },
      pageloading: false,
      loading: false,
      sceneTypeOptions: [], // 场所
      abilityOptions: [], // 设备能力
      manufacturerOptions: [], // 设备厂商
      networkPropertyOptions: [], // 联网属性
      tableData: [], // 表格数据

      formDialogVisible: false,

      locale: localStorage.getItem('locale'),
      screenFlag: true,
      tableHeight: 630,
      dataText: '',

      //算法接入
      dialogFormVisible: false,
      operation: true,
      maskloading: false,
      dataForm: {},
      gatewayClusterDetailVisible: false,
      organizationId: '',
      organizationName: '',
      isSearch: false,
      title: '',
      title_detail: '',
      dialogFormVisible_detail: false,
      formDialogVisible_detail: false,
      delShow: true,
      multipleSelection: [],
      choosedAccessId: '',
      platformStatusList: [],
      gateWayStatusList: [],
      mediaAccessTypeList: [],
      accessPlatTypeList: [],
      accessAuthTypeListFilter: [],
      mediaAccessTypeListFilter: [],
      accessNetworkTypeList: [],
      choosedGateWayGroup: '',
      options: [],
      dialogFormVisible_status: false,
      enableList: [],
      choosedEnableStatus: '',
      platTypeList: [],
      showMediaItem: true,
      platformTypeHolder: '',

      //
      accessPassword: '',
      accessSecret: '',

      //平台配置
      schemaList: []
    }
  },
  computed: {
    ...mapState({
      accessAuthTypeList: state => state.dict['access-plat-auth-type'],
      accessProtocolTypeList: state => state.dict['access-plat-protocol-type']
    })
  },
  watch: {
    //监听语言切换
    '$i18n.locale'() {
      this.setData()
      this.locale = localStorage.getItem('locale')
    }
  },
  async created() {
    await this.setData()
    await this.getDictionaryList()
    await this.getAccessTypeList()
  },
  methods: {
    setData() {
      this.platformStatusList = [
        {
          name: this.$t('newAccess.unLink'),
          value: 0
        },
        {
          name: this.$t('newAccess.online'),
          value: 1
        },
        {
          name: this.$t('newAccess.offline'),
          value: 2
        }
      ]
      this.gateWayStatusList = [
        {
          name: this.$t('newAccess.noneDeployed'),
          value: 'NONE'
        },
        {
          name: this.$t('newAccess.online'),
          value: 'OK'
        },
        {
          name: this.$t('newAccess.offline'),
          value: 'DOWN'
        },
        {
          name: this.$t('newAccess.abnormal'),
          value: 'OOS'
        }
      ]
      this.mediaAccessTypeList = [
        {
          name: this.$t('newAccess.realTimeProtocol'),
          value: 0
        },
        {
          name: this.$t('newAccess.privateProtocol'),
          value: 1
        },
        {
          name: this.$t('newAccess.devLink'),
          value: 2
        }
      ]
      this.accessNetworkTypeList = [
        {
          name: this.$t('newAccess.publicNet'),
          value: 1
        },
        {
          name: this.$t('newAccess.privateNet'),
          value: 2
        }
      ]
      this.enableList = [
        {
          name: this.$t('newAccess.disable'),
          value: 0
        },
        {
          name: this.$t('newAccess.enable'),
          value: 1
        }
      ]
      this.platTypeList = [
        {
          name: this.$t('newAccess.superior'),
          value: 1
        },
        {
          name: this.$t('newAccess.subordinate'),
          value: 2
        }
      ]
      this.schemaList = [
        {
          name: 'http',
          value: 'http'
        },
        {
          name: 'https',
          value: 'https'
        }
      ]
    },
    setStatusClass(val) {
      if (val == 1) {
        return 'success'
      } else if (val == 2) {
        return 'danger'
      }
    },
    // 更多操作
    handleCommand(command) {
      switch (command.command) {
        case 'del':
          this.handleDelete(command.row)
          break
        case 'sta':
          this.getStaChange(command.row)
          break
        case 'ena':
          this.enable(command.row)
          break
      }
    },
    beforeHandleCommand(row, command) {
      return {
        row: row,
        command: command
      }
    },
    enable(row) {
      let enable = row.enableStatus == 1 ? 0 : 1
      this.$api
        .platformEnableModify({
          accessId: row.accessId,
          enableStatus: enable
        })
        .then(res => {
          if (res.resultCode == 0) {
            this.getList()
            this.$message({
              type: 'success',
              message:
                row.enableStatus == 1
                  ? this.$t('newAccess.disableSucc')
                  : this.$t('newAccess.enableSucc')
            })
          }
        })
    },

    setPlatType(val) {
      let name = ''
      this.platTypeList.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },
    setEnable(val) {
      let name = ''
      this.enableList.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },
    setPlatformTypeTable(val) {
      for (let i = 0; i < this.accessPlatTypeList.length; i++) {
        for (let j = 0; j < this.accessPlatTypeList[i].platTypeList.length; j++) {
          if (this.accessPlatTypeList[i].platTypeList[j].platTypeCode == val) {
            return this.accessPlatTypeList[i].platTypeList[j].platTypeName
          }
        }
      }
    },
    setPlatformType(val) {
      for (let i = 0; i < this.accessPlatTypeList.length; i++) {
        for (let j = 0; j < this.accessPlatTypeList[i].platTypeList.length; j++) {
          if (this.accessPlatTypeList[i].platTypeList[j].platTypeCode == val[1]) {
            return this.accessPlatTypeList[i].platTypeList[j].platTypeName
          }
        }
      }
    },
    setStatus(val) {
      let name = ''
      this.platformStatusList.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },
    setGateWayStatus(val) {
      let name = ''
      this.gateWayStatusList.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },

    setAccessNetworkType(val) {
      let name = ''
      this.accessNetworkTypeList.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },
    setAccessAuthType(val) {
      let name = ''
      this.accessAuthTypeList.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },
    setAccessProtocolType(val) {
      let name = ''
      this.accessProtocolTypeList.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },
    setMediaAccessType(val) {
      let name = ''
      this.mediaAccessTypeList.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },
    ...mapActions('dict', ['getSysDictData']),
    getDictionaryList() {
      this.getSysDictData(['access-plat-auth-type', 'access-plat-protocol-type'])
    },

    async getAccessTypeList() {
      let resD = await this.$api.getDictionary({ type: 'access-plat-type' })
      let res = await this.$api.getAccessType({ selectTypeCode: '2' })

      if (res.resultCode != 0) return
      this.accessPlatTypeList = res.accessTypeList

      let options = []
      for (let i = 0; i < res.accessTypeList.length; i++) {
        let groupobj = {}
        groupobj.value = res.accessTypeList[i].accessTypeCode

        for (let a = 0; a < resD.dictionaryList.length; a++) {
          if (res.accessTypeList[i].accessTypeCode == resD.dictionaryList[a].value) {
            groupobj.label = resD.dictionaryList[a].name
          }
        }

        groupobj.children = []
        for (let j = 0; j < res.accessTypeList[i].platTypeList.length; j++) {
          if (res.accessTypeList[i].platTypeList[j].abilities.indexOf('INTELLIGENCE') != -1) {
            let childrenObj = {}
            childrenObj.value = res.accessTypeList[i].platTypeList[j].platTypeCode
            childrenObj.label = res.accessTypeList[i].platTypeList[j].platTypeName
            groupobj.children.push(childrenObj)
          }
        }
        options.push(groupobj)
      }
      this.options = options

      //级联赋值
    },
    // 加载树
    async getTree(level, parentId, resolve) {
      var list = []
      let data = {
        type: 1
      }
      parentId ? (data.parentId = parseInt(parentId)) : null
      await this.$api.getOrganizationTree(data).then(res => {
        list = res.nodeList || []
        //初始化面包屑
        this.treeLoading = false
        return resolve(list)
      })
      if (level == 0 && list.length) {
        this.$nextTick().then(async () => {
          this.idArr = [list[0].id]
          this.$refs.treeList.setCurrentKey(list[0].id)
          this.organizationName = list[0].payload.organizationName
          this.organizationId = list[0].payload.organizationId
          this.queryParams.organizationId = list[0].payload.organizationId
          await this.getList()
        })
      } else if (level == 0 && list.length == 0) {
        this.treeEmptyText = this.$t('public.noData')
      }
    },
    handleNodeClick(data, node, self) {
      //点击树联动面包屑
      this.organizationName = data.payload.organizationName
      this.organizationId = data.payload.organizationId
      this.queryParams.organizationId = data.payload.organizationId
      this.handleFind()
    },
    handleFind() {
      this.queryParams.pageInfo.pageNum = 1
      this.isSearch = true
      this.getList()
    },

    handleRest() {
      this.queryParams.accessName = ''
    },

    async getList() {
      this.loading = true
      let res = await this.$api.getAlgorithmAccessList(this.queryParams)
      if (res && res.resultCode == 0) {
        res.algorithmAccessList ? (this.tableData = res.algorithmAccessList) : (this.tableData = [])
        this.total = res.pageInfo.totalNum
      } else {
        this.tableData = []
        this.total = 0
      }
      this.loading = false
    },
    // 表格斑马纹
    tableRowClassName({ rowIndex }) {
      return rowIndex % 2 == 1 ? '' : 'success-row'
    },
    /** 表格多选框选中数据 */
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (this.multipleSelection.length != 0) {
        this.delShow = false
      } else {
        this.delShow = true
      }
    },
    handleAdd() {
      this.formDialogVisible = true
      this.dialogFormVisible = true
      this.operation = true
      this.title = this.$t('newAccess.addAcc')
    },

    selectAccessPlatforms() {
      let data = {
        pageInfo: { pageNum: 1, pageSize: 10 },
        platAbility: 'SURVEILLANCE',
        platformName: '',
        platformStatus: null,
        platformType: 5
      }
      this.gatewayList = []
      this.$api.selectAccessPlatforms(data).then(res => {
        if (res.resultCode == 0) {
          this.gatewayList = res.platformList
        }
      })
    },
    setAssociation(val) {
      for (let i = 0; i < this.gatewayList.length; i++) {
        if (this.gatewayList[i].platformId == val) {
          return this.gatewayList[i].platformName
        }
      }
    },
    /** 详情按钮操作 */
    async handleView(row) {
      this.selectAccessPlatforms()
      await this.getInfo(row)
      this.choosedAccessId = row.accessId
      this.formDialogVisible_detail = true
      this.title_detail = this.$t('newAccess.accInfo1')
      this.dialogFormVisible_detail = true
    },
    /** 修改按钮操作 */
    async handleUpdate(row) {
      await this.getInfo(row)
      if (this.dataForm.accessUserId == 'undefined') {
        this.dataForm.accessUserId = ''
      }

      this.choosedAccessId = row.accessId
      this.choosedEnableStatus = row.enableStatus

      this.formDialogVisible = true
      this.title = this.$t('newAccess.editAcc')

      this.dialogFormVisible = true
      this.operation = false
    },

    async getInfo(row) {
      let res = await this.$api.getAlgorithmAccessInfo({
        accessId: row.accessId
      })
      if (res.resultCode != 0) return
      this.choosedGateWayGroup = row.gatewayGroup
      this.dataForm = {
        ...res
      }

      this.dataForm.authType = String(this.dataForm.authType)

      if (this.dataForm.authType == '1') {
        this.dataForm.accessKey = ''
        this.dataForm.accessSecret = ''
        this.dataForm.accessUserId = ''
        this.dataForm.accessToken = ''

        //回显密码
        if (this.dataForm.password) {
          this.dataForm.password = this.dataForm.password
        }
      } else if (this.dataForm.authType == '2') {
        this.dataForm.account = ''
        this.dataForm.password = ''
        this.dataForm.accessToken = ''

        //回显密码
        if (this.dataForm.appSecret) {
          this.dataForm.accessSecret = this.dataForm.appSecret
        }
      } else if (this.dataForm.authType == '3') {
        this.dataForm.account = ''
        this.dataForm.password = ''
        this.dataForm.accessKey = ''
        this.dataForm.accessSecret = ''
        this.dataForm.accessUserId = ''
      }

      for (let i = 0; i < this.accessPlatTypeList.length; i++) {
        let firstType = this.accessPlatTypeList[i].accessTypeCode
        for (let j = 0; j < this.accessPlatTypeList[i].platTypeList.length; j++) {
          if (res.platformType == this.accessPlatTypeList[i].platTypeList[j].platTypeCode) {
            this.dataForm.platformType = [firstType, res.platformType]

            this.platformTypeHolder = this.accessPlatTypeList[i].platTypeList[j].platTypeName

            this.accessAuthTypeListFilter = this.accessAuthTypeList.filter(item => {
              return (
                this.accessPlatTypeList[i].platTypeList[j].authenticationTypes.indexOf(
                  item.value
                ) != -1
              )
            })

            this.mediaAccessTypeListFilter = this.mediaAccessTypeList.filter(item => {
              return (
                this.accessPlatTypeList[i].platTypeList[j].mediaAccessTypes.indexOf(item.value) !=
                -1
              )
            })

            //判断是否显示媒体配置下的ip端口
            if (this.accessPlatTypeList[i].platTypeList[j].mediaAccessTypes.indexOf('1') != -1) {
              this.showMediaItem = true
            } else {
              this.showMediaItem = false
            }

            return
          }
        }
      }
    },

    //状态变更记录
    getStaChange(row) {
      this.choosedAccessId = row.accessId
      this.dialogFormVisible_status = true
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm(this.$t('newAccess.ifDelAlgo'), this.$t('public.prompt'), {
        confirmButtonText: this.$t('public.confirm'),
        cancelButtonText: this.$t('public.cancel'),
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          this.$api.deleteAlgorithmAccessInfo({ accessId: row.accessId }).then(res => {
            if (res.resultCode === 0) {
              this.$message({
                type: 'success',
                message: this.$t('public.delSuccess')
              })
              this.getList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('public.canceledDelete')
          })
        })
    },

    // 批量删除 ！
    handleDel() {
      let pormpt = ''
      if (this.locale == 'en') {
        pormpt =
          this.$t('public.bulkDelPrompt1') +
          ' ' +
          this.multipleSelection.length +
          ' ' +
          this.$t('algoManage.algoAccess1') +
          ',' +
          this.$t('public.bulkDelPrompt2')
      } else {
        pormpt = '此操作将删除选中的' + this.multipleSelection.length + '个算法接入,是否继续?'
      }
      this.$confirm(pormpt, this.$t('public.prompt'), {
        confirmButtonText: this.$t('public.confirm'),
        cancelButtonText: this.$t('public.cancel'),
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          this.loading = true
          for (let i = 0; i < this.multipleSelection.length; i++) {
            let item = this.multipleSelection[i]
            this.$api.deleteAccessPlatformInfo({ platformId: item.platformId }).then(res => {
              if (res.resultCode == 0 && i == this.multipleSelection.length - 1) {
                this.$message({
                  type: 'success',
                  message: this.$t('public.bulkDelSuccess')
                })
                this.getList()
              }
            })
          }
          this.loading = false
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('public.canceledDelete')
          })
        })
    }
  }
}
</script>

<style lang="scss">
#algorithm-access {
  height: 100%;

  .search-btn {
    position: absolute;
    right: 0;
    top: 0;
  }

  .el-dropdown {
    font-size: 14px;
  }

  .inputMiddle {
    width: 240px;
  }
}
</style>
