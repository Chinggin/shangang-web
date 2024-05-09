<template>
  <div v-if="isRouterAlive" class='base' id="access-platform" ref="accessPlatform">
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
        <div class="btnMargin">
          <el-button type="primary" @click="handleAdd">{{ $t('public.add') }}</el-button>
        </div>

        <div class="search-form">
          <el-form :inline="true" class="demo-form-inline" :label-width="locale == 'en' ? '125px' : '84px'" ref="form"
            :model="queryParams" label-position="left">
            <div class="flexstart">
              <el-form-item :label="$t('public.platName') + ':'">
                <el-input v-model="queryParams.platformName" clearable
                  :placeholder="$t('public.pleaseInputplatName')" />
              </el-form-item>
            </div>
            <div class="search-btn">
              <el-button type="primary" class="miniBtn" @click="handleFind">
                {{ $t('public.search') }}
              </el-button>
              <el-button class="miniBtn" @click="handleRest">{{ $t('public.reset') }}</el-button>
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
          <el-table :max-height="tableHeight" v-if="!loading && tableData.length" :row-class-name="tableRowClassName"
            ref="multipleTable" :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
            <template #empty>
              <span>{{ dataText }}</span>
            </template>
            <el-table-column label width="50" type="selection" />
            <el-table-column :label="$t('accessPlatform.accessPlatformNumber')" prop="platformId" show-overflow-tooltip
              width="180" />
            <el-table-column :label="$t('accessPlatform.accessPlatformName')" prop="platformName" show-overflow-tooltip
              width="160" />
            <el-table-column :label="$t('accessPlatform.accessPlatformType')" show-overflow-tooltip
              :width="locale == 'en' ? 160 : 100">
              <template #default="{ row }">
                <span>{{ setPlatformTypeTable(row.platformType) }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('accessPlatform.accessPlatformStatus')" prop="platformStatus"
              show-overflow-tooltip :width="locale == 'en' ? 180 : 100">
              <template #default="{ row }">
                <span :class="setStatusClass(row.platformStatus)">
                  {{ setStatus(row.platformStatus) }}
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('alarmTypeManage.whetherToEnable')" show-overflow-tooltip
              :width="locale == 'en' ? 180 : 100">
              <template #default="{ row }">
                <span>{{ setEnable(row.enableStatus) }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('accessPlatform.platformAddress')" show-overflow-tooltip width="180">
              <template #default="{ row }">
                <span v-if="row.platformNetworkIp">
                  {{ row.platformNetworkIp }}({{ $t('accessPlatform.publicNetwork1') }})
                </span>
                <span v-if="row.platformIntranetIp">
                  {{ row.platformIntranetIp }}({{ $t('accessPlatform.intranet1') }})
                </span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('accessPlatform.organization')" prop="organizationName" show-overflow-tooltip
              :width="locale == 'en' ? 150 : 100" />
            <el-table-column :label="$t('public.createTime')" prop="createTime" show-overflow-tooltip
              :min-width="locale == 'en' ? 120 : 90" />
            <el-table-column :label="$t('accessPlatform.lastEditTime')" prop="updateTime" show-overflow-tooltip
              :min-width="locale == 'en' ? 120 : 90" />

            <el-table-column :label="$t('public.operating')" :min-width="locale == 'en' ? 170 : 100">
              <template #default="{ row }">
                <el-button type=text class="cell-operate" @click="handleView(row)">
                  {{ $t('public.particulars') }}
                </el-button>
                <el-button type=text class="cell-operate" @click="handleUpdate(row)">
                  {{ $t('public.modify') }}
                </el-button>
                <el-dropdown trigger="click" @command="handleCommand">
                  <span style="color: #10a9ff; cursor: pointer; font-size: 12px">
                    {{ $t('public.moreActions') }}
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <!--                      <el-dropdown-item :command="beforeHandleCommand(row, 'sta')">-->
                      <!--                        <span style="color: #10a9ff">{{ $t('accessPlatform.changeRecord') }}</span>-->
                      <!--                      </el-dropdown-item>-->
                      <el-dropdown-item :command="beforeHandleCommand(row, 'ena')">
                        <span :style="row.enableStatus == '0' ? 'color:#10a9ff;' : 'color:#ff6b6b;'">
                          {{ row.enableStatus == 0 ? $t('public.enable') : $t('public.deactivate') }}
                        </span>
                      </el-dropdown-item>
                      <el-dropdown-item :command="beforeHandleCommand(row, 'del')">
                        <span style="color: #ff6b6b">{{ $t('public.delete') }}</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>

          <pagination v-show="!loading && tableData.length" :total="total"
            v-model:pageNum="queryParams.pageInfo.pageNum" v-model:limit="queryParams.pageInfo.pageSize"
            @pagination="getList" />
        </div>
      </el-col>
    </el-row>

    <access-platform-add></access-platform-add>
    <access-platform-detail></access-platform-detail>
    <status-log></status-log>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import accessPlatformAdd from './component/access-platform-add'
import accessPlatformDetail from './component/access-platform-detail'
import statusLog from './component/status-log'
import breadcrumb from '@/components/breadcrumb'

import getLazyTree from '@/mixin/getLazyTree.js'

export default {
  mixins: [getLazyTree],
  name: 'AccessPlatformManagement',
  components: {
    accessPlatformAdd,
    accessPlatformDetail,
    statusLog,
    breadcrumb
  },
  data() {
    return {
      isRouterAlive: true,
      locale: localStorage.getItem('locale'),
      screenFlag: true,

      organizationId: '',
      organizationName: '',

      delShow: true,

      tableHeight: 630,
      dataText: '',
      total: 0,
      queryParams: {
        pageInfo: {
          pageNum: 1,
          pageSize: 10
        },
        platformName: '',
        platformStatus: '',
        platformType: '',
        organizationId: ''
      },
      loading: false,
      multipleSelection: [],
      tableData: [], // 表格数据

      //接入平台
      dialogFormVisible: false,
      operation: true,
      maskloading: false,
      dataForm: {},
      gatewayClusterDetailVisible: false,

      isSearch: false,

      dialogFormVisible_detail: false,
      choosedPlatformId: '',
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
      accessPassword: '',
      accessSecret: '',
      gatewayList: []
    }
  },
  computed: {
    ...mapState({
      accessAuthTypeList: state => state.dict['access-plat-auth-type'],
      accessProtocolTypeList: state => state.dict['access-plat-protocol-type']
    })
  },
  mounted() {
    this.setDate()
  },
  async created() {
    await this.getDictionaryList()
    await this.getAccessTypeList()
  },
  methods: {
    setDate() {
      this.platformStatusList = [
        {
          name: this.$t('accessPlatform.notConnected'),
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
          name: this.$t('accessPlatform.notDeployed'),
          value: 'NONE'
        },
        {
          name: this.$t('public.online'),
          value: 'OK'
        },
        {
          name: this.$t('public.offline'),
          value: 'DOWN'
        },
        {
          name: this.$t('primaryDevice.Abnormal'),
          value: 'OOS'
        }
      ]
      this.mediaAccessTypeList = [
        {
          name: this.$t('monitorManage.streamingProtocol'),
          value: 0
        },
        {
          name: this.$t('monitorManage.privateProtocol'),
          value: 1
        },
        {
          name: this.$t('monitorManage.equipmentDirectConnection'),
          value: 2
        }
      ]
      this.accessNetworkTypeList = [
        {
          name: this.$t('accessPlatform.publicNetwork'),
          value: 1
        },
        {
          name: this.$t('accessPlatform.privateNetwork'),
          value: 2
        }
      ]
      this.enableList = [
        {
          name: this.$t('public.deactivate'),
          value: 0
        },
        {
          name: this.$t('public.enable'),
          value: 1
        }
      ]
      this.platTypeList = [
        {
          name: this.$t('accessPlatform.superior'),
          value: 1
        },
        {
          name: this.$t('accessPlatform.subordinate'),
          value: 2
        }
      ]
    },
    ...mapActions('dict', ['getSysDictData']),
    // 字典查询
    getDictionaryList() {
      this.getSysDictData(['access-plat-auth-type', 'access-plat-protocol-type'])
    },
    async getAccessTypeList() {
      let resD = await this.$api.getDictionary({ type: 'access-plat-type' })
      let res = await this.$api.getAccessType({ selectTypeCode: '1' })

      console.log(res)
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
          let childrenObj = {}
          childrenObj.value = res.accessTypeList[i].platTypeList[j].platTypeCode
          childrenObj.label = res.accessTypeList[i].platTypeList[j].platTypeName
          groupobj.children.push(childrenObj)
        }
        options.push(groupobj)
      }
      this.options = options
    },
    // 加载树
    async getTree(level, parentId, resolve) {
      let list = []
      let data = {
        type: 1
      }
      parentId ? (data.parentId = parseInt(parentId)) : null
      await this.$api.getOrganizationTree(data).then(res => {
        list = res?.nodeList || []
        //初始化面包屑
        setTimeout(() => {
          this.$refs.breadcrumb.initBread(list)
        }, 100)
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
    handleNodeClick(data, node) {
      //点击树联动面包屑
      this.$refs.breadcrumb.treeLinkBread(data, node)
      this.organizationName = data.payload.organizationName
      this.organizationId = data.payload.organizationId
      this.queryParams.organizationId = data.payload.organizationId
      this.handleFind()
    },
    // 面包屑联动树
    tree_change(data) {
      this.handleNodeClick(
        this.$refs.treeList.getNode(data.id).data,
        this.$refs.treeList.getNode(data.id)
      )
      this.$refs.treeList.setCurrentKey(data.id)
    },
    setStatusClass(val) {
      if (val == 1) {
        return 'success'
      } else if (val == 2) {
        return 'danger'
      }
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
    handleFind() {
      this.queryParams.pageInfo.pageNum = 1
      this.isSearch = true
      this.getList()
    },

    handleRest() {
      this.queryParams.platformName = ''
      this.queryParams.platformStatus = ''
      this.queryParams.platformType = ''
      this.getList()
    },

    async getList() {
      let queryParams = JSON.parse(JSON.stringify(this.queryParams))
      queryParams.platformStatus === '' ? (queryParams.platformStatus = null) : null
      queryParams.platformType === ''
        ? (queryParams.platformType = null)
        : (queryParams.platformType = queryParams.platformType[1])
      queryParams.platAbility = 'SURVEILLANCE'
      let res = await this.$api.selectAccessPlatforms(queryParams)
      this.loading = true
      if (res.resultCode == 0) {
        this.tableData = res.platformList
        this.total = res.pageInfo.totalNum
        this.loading = false
      } else {
        this.tableData = []
        this.total = 0
        this.loading = false
      }
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
      this.operation = true
      this.dialogFormVisible = true
    },
    /** 详情按钮操作 */
    async handleView(row) {
      await this.getInfo(row)
      this.choosedPlatformId = row.platformId
      this.dialogFormVisible_detail = true
    },
    /** 修改按钮操作 */
    async handleUpdate(row) {
      await this.getInfo(row)

      if (this.dataForm.platformProtocolInfo.accessUserId == 'undefined') {
        this.dataForm.platformProtocolInfo.accessUserId = ''
      }

      this.choosedPlatformId = row.platformId
      this.choosedEnableStatus = row.enableStatus

      this.operation = false
      this.dialogFormVisible = true
    },

    async getInfo(row) {
      let res = await this.$api.getAccessPlatformInfo({
        platformId: row.platformId
      })
      if (res.resultCode != 0) return
      await this.getGatewayList(row.gatewayGroup)
      this.choosedGateWayGroup = row.gatewayGroup
      this.dataForm = {
        ...res
      }

      this.dataForm.platformProtocolInfo.accessAuthType = String(
        this.dataForm.platformProtocolInfo.accessAuthType
      )

      if (this.dataForm.platformProtocolInfo.accessAuthType == '1') {
        this.dataForm.platformProtocolInfo.accessKey = ''
        this.dataForm.platformProtocolInfo.accessSecret = ''
        this.dataForm.platformProtocolInfo.accessUserId = ''
        this.dataForm.platformProtocolInfo.accessToken = ''

        //回显密码
        this.dataForm.platformProtocolInfo['accessPassword'] =
          this.dataForm.platformProtocolInfo.accessPassword
      } else if (this.dataForm.platformProtocolInfo.accessAuthType == '2') {
        this.dataForm.platformProtocolInfo.accessAccount = ''
        this.dataForm.platformProtocolInfo.accessPassword = ''
        this.dataForm.platformProtocolInfo.accessToken = ''

        //回显密码
        this.dataForm.platformProtocolInfo['accessSecret'] =
          this.dataForm.platformProtocolInfo.accessSecret
      } else if (this.dataForm.platformProtocolInfo.accessAuthType == '3') {
        this.dataForm.platformProtocolInfo.accessAccount = ''
        this.dataForm.platformProtocolInfo.accessPassword = ''
        this.dataForm.platformProtocolInfo.accessKey = ''
        this.dataForm.platformProtocolInfo.accessSecret = ''
        this.dataForm.platformProtocolInfo.accessUserId = ''
      }

      this.dataForm.platformProtocolInfo.accessProtocolType = String(
        this.dataForm.platformProtocolInfo.accessProtocolType
      )

      for (let i = 0; i < this.accessPlatTypeList.length; i++) {
        let firstType = this.accessPlatTypeList[i].accessTypeCode
        for (let j = 0; j < this.accessPlatTypeList[i].platTypeList.length; j++) {
          if (res.platformType == this.accessPlatTypeList[i].platTypeList[j].platTypeCode) {
            this.dataForm['platformType'] = [firstType, res.platformType]

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
    async getGatewayList(gatewayGroup) {
      let res = await this.$api.selectAdapterGateways({
        pageInfo: {
          pageNum: 1,
          pageSize: this.$maxPageSize
        },
        searchInfo: {
          gatewayGroup
        }
      })
      this.gatewayList = res.gatewayList || []
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
    //状态变更记录
    getStaChange(row) {
      this.choosedPlatformId = row.platformId
      this.dialogFormVisible_status = true
    },
    deleteAccessPlatform(row) {
      this.$api.deleteAccessPlatformInfo({ platformId: row.platformId }).then(res => {
        if (res.resultCode === 0) {
          this.$message({
            type: 'success',
            message: this.$t('public.delSuccess')
          })
          this.getList()
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm(this.$t('accessPlatform.isContainer'), this.$t('public.prompt'), {
        confirmButtonText: this.$t('public.confirm'),
        cancelButtonText: this.$t('public.cancel'),
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          if (row.enableStatus == 0) {
            this.deleteAccessPlatform(row)
          } else {
            this.$api
              .platformEnableModify({
                platformId: row.platformId,
                enableStatus: 0
              })
              .then(res => {
                if (res.resultCode == 0) {
                  this.deleteAccessPlatform(row)
                }
              })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('public.canceledDelete')
          })
        })
    },
    enable(row) {
      let enable = row.enableStatus == 1 ? 0 : 1
      this.$api
        .platformEnableModify({
          platformId: row.platformId,
          enableStatus: enable
        })
        .then(res => {
          if (res.resultCode == 0) {
            this.getList()
            this.$message({
              type: 'success',
              message:
                row.enableStatus == 1
                  ? this.$t('accessPlatform.deactivatedSuccessfully')
                  : this.$t('accessPlatform.enabledSuccessfully')
            })
          }
        })
    },
    // 批量删除
    handleDel() {
      this.$confirm(
        this.$t('accessPlatform.deletePrompt', {
          num: this.multipleSelection.length
        }),
        this.$t('public.prompt'),
        {
          confirmButtonText: this.$t('public.confirm'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning',
          closeOnClickModal: false
        }
      )
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
#access-platform {
  .search-btn {
    position: absolute;
    right: 0;
    top: 0;
  }

  .el-dropdown {
    font-size: 14px;
  }

  .el-table__footer-wrapper,
  .el-table__header-wrapper {
    overflow: hidden;
  }
}
</style>
