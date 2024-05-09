<template>
  <div id="gateway-cluster" class='base' ref="gatewayCluster" v-loading="pageloading"
    :element-loading-text="$t('public.batchImporting')">
    <!-- 查询和其他操作 -->
    <div v-has-permi="[93]" class="btnMargin">
      <el-button type="primary" @click="autoHandleAdd" :loading="autoAddLoading">
        {{ $t('gatewayCluster.autoAdd') }}
      </el-button>
      <el-button type="primary" @click="handleAdd">{{ $t('public.add') }}</el-button>
      <el-button type="danger" @click="handleDel" :disabled="delShow">
        {{ $t('public.batchDeletion') }}
      </el-button>
    </div>

    <div class="search-form">
      <el-form :inline="true" class="demo-form-inline" :label-width="locale == 'en' ? '120px' : '110px'" ref="form"
        :model="queryParams" label-position="left">
        <div class="flexstart">
          <el-form-item :label="$t('gatewayCluster.gatewayName') + ':'">
            <el-input v-model="queryParams.gatewayName" :placeholder="$t('gatewayCluster.gatewayNamePrompt')"
              clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('gatewayCluster.gatewayStatus') + ':'">
            <el-select v-model="queryParams.gatewayStatus" clearable
              :placeholder="$t('gatewayCluster.gatewayStatusPrompt')">
              <el-option v-for="(item, index) in gatewayStatusList" :key="index" :label="item.name"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('gatewayCluster.accessPlatType') + ':'">
            <el-cascader :options="options" :placeholder="$t('gatewayCluster.accessPlatTypePrompt')"
              :props="{ expandTrigger: 'hover' }" clearable :show-all-levels="false"
              v-model="queryParams.accessPlatType" :popper-append-to-body="false"></el-cascader>
          </el-form-item>
        </div>
        <div class="search-btn">
          <el-button type="primary" style="display: inline-block" @click="handleFind">
            {{ $t('public.search') }}
          </el-button>
          <el-button @click="handleRest">{{ $t('public.reset') }}</el-button>
        </div>
      </el-form>
    </div>

    <div style="height: 600px" v-loading="loading" :element-loading-text="$t('public.loading')">
      <div v-if="!loading && !tableData.length" class="tableNOdata">
        <img src="@/assets/img/common/NOdata.png" alt style="margin-top: 0px" />
        <p>{{ $t('public.noData') }}</p>
      </div>
      <!-- 表格 -->
      <el-table v-if="!loading && tableData.length" :max-height="tableHeight" :loading="loading"
        :row-class-name="tableRowClassName" ref="multipleTable" :data="tableData"
        @selection-change="handleSelectionChange" border :span-method="objSpanMethod">

        <el-table-column label width="50" type="selection" />
        <el-table-column :label="$t('gatewayCluster.multipleIvsGroupName')" prop="multipleIvsGroupName"
          show-overflow-tooltip />
        <el-table-column :label="$t('gatewayCluster.allocationStatus')" prop="allocationStatus" show-overflow-tooltip>
          <template #default="{ row }">
            <span>
              {{ setAllocationStatus(row.allocationStatus) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('gatewayCluster.gatewayName')" prop="gatewayName" show-overflow-tooltip />
        <el-table-column :label="$t('gatewayCluster.gatewayIp1')" prop="gatewayIp" show-overflow-tooltip />
        <el-table-column :label="$t('gatewayCluster.gatewayPort')" prop="gatewayPort" show-overflow-tooltip />
        <el-table-column :label="$t('gatewayCluster.gatewayStatus1')" prop="gatewayStatus">
          <template #default="{ row }">
            <span :class="setStatusClass(row.gatewayStatus)">
              {{ setStatus(row.gatewayStatus) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('gatewayCluster.isEnabled')">
          <template #default="{ row }">
            <span>{{ setEnable(row.enableStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.operating')" min-width="90">
          <template #default="{ row }">
            <el-button type="text" v-has-permi="[92]" class="cell-operate" @click="handleView(row)">
              {{ $t('public.particulars') }}
            </el-button>
            <el-button type="text" v-has-permi="[93]" class="cell-operate" @click="handleUpdate(row)">
              {{ $t('public.modify') }}
            </el-button>
            <el-dropdown trigger="click" @command="handleCommand">
              <el-button type="text" v-has-permi="[93]" style="color: #10a9ff; cursor: pointer; font-size: 12px">
                {{ $t('public.moreActions') }}
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="beforeHandleCommand(row, 'ena')">
                    <el-button type="text" :style="row.enableStatus == '0' ? 'color:#10a9ff;' : 'color:#ff6b6b;'">
                      {{ row.enableStatus == 0 ? $t('public.enable') : $t('public.deactivate') }}
                    </el-button>
                  </el-dropdown-item>
                  <el-dropdown-item :command="beforeHandleCommand(row, 'del')">
                    <el-button type="text" style="color: #ff6b6b">{{ $t('public.delete') }}</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="!loading && tableData.length" :total="total" :pageNum="queryParams.pageInfo.pageNum"
        :limit="queryParams.pageInfo.pageSize" @pagination="getList" />
    </div>

    <gateway-cluster-add :operation="operation"></gateway-cluster-add>
    <gateway-cluster-detail></gateway-cluster-detail>
    <!-- 批量操作 -->
    <batch-operate :multipleSelection="deleteSelection" :what="$t('gatewayCluster.gateway')" @getList="getList"
      :operate="$t('public.batchDeletionContent')" batchApi="deleteAdapterGatewayInfo" whatId="gatewayId"
      whatName="gatewayName" v-model:loading="loading" v-model:visible="batchDialogVisible" @searchClear="handleRest" />
  </div>
</template>

<script>
import gatewayClusterAdd from './component/gateway-cluster-add'
import gatewayClusterDetail from './component/gateway-cluster-detail'
import BatchOperate from '@/components/batchOperate'
import { mapState } from 'vuex'
export default {
  name: 'GatewayClusterManagement',
  components: {
    gatewayClusterAdd,
    gatewayClusterDetail,
    BatchOperate
  },
  data() {
    return {
      locale: localStorage.getItem('locale'),
      total: 0,
      queryParams: {
        pageInfo: {
          pageNum: 1,
          pageSize: 10
        },
        gatewayName: '',
        gatewayStatus: '',
        accessPlatType: ''
      },
      pageloading: false,
      loading: false,
      tableData: [], // 表格数据

      formDialogVisible: false,

      screenFlag: true,
      tableHeight: 630,
      dataText: '',

      //网关集群
      dialogFormVisible: false,
      operation: true,
      maskloading: false,
      dataForm: {},
      gatewayClusterDetailVisible: false,
      choosedGatewayId: '',
      multipleSelection: [],
      deleteSelection: [],
      delShow: true,
      ifGetPlat: false,
      accessPlatTypeList: [],
      options: [],
      batchDialogVisible: false,
      autoAddLoading: false
    }
  },
  computed: {
    ...mapState({
      allocationStatusList: state => state.dict['allocation_status'] // 智能分析任务状态
    }),
    nodeAvailableTypeList() {
      return [
        {
          name: this.$t('gatewayCluster.masterNode'),
          value: 1
        },
        {
          name: this.$t('gatewayCluster.standbyNode'),
          value: 2
        }
      ]
    },
    nodeAvailableTypeListDetail() {
      return [
        {
          name: this.$t('gatewayCluster.clusterNode'),
          value: 0
        },
        {
          name: this.$t('gatewayCluster.masterNode'),
          value: 1
        },
        {
          name: this.$t('gatewayCluster.standbyNode'),
          value: 2
        }
      ]
    },
    gatewayStatusList() {
      return [
        {
          name: this.$t('gatewayCluster.notDeployed'),
          value: 'NONE'
        },
        {
          name: this.$t('gatewayCluster.online'),
          value: 'OK'
        },
        {
          name: this.$t('gatewayCluster.offline'),
          value: 'DOWN'
        },
        {
          name: this.$t('gatewayCluster.abnormal'),
          value: 'OOS'
        }
      ]
    },
    nodeContainerTypeList() {
      return [
        {
          name: this.$t('gatewayCluster.sharedAccess'),
          value: 1
        },
        {
          name: this.$t('gatewayCluster.exclusiveAccess'),
          value: 2
        }
      ]
    },
    enableList() {
      return [
        {
          name: this.$t('public.deactivate'),
          value: 0
        },
        {
          name: this.$t('public.enable'),
          value: 1
        }
      ]
    },
    serverStatusList() {
      return [
        {
          name: 'NONE',
          value: 'NONE'
        },
        {
          name: 'OK',
          value: 'OK'
        },
        {
          name: 'DOWN',
          value: 'DOWN'
        },
        {
          name: 'OOS',
          value: 'OOS'
        }
      ]
    }
  },
  async created() {
    await this.getAccessTypeList()
    await this.getList()
  },
  methods: {
    // 更多操作
    handleCommand(command) {
      switch (command.command) {
        case 'del':
          this.handleDelete(command.row)
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
      this.$api
        .gatewayEnableModify({
          gatewayId: row.gatewayId,
          enableStatus: row.enableStatus == 1 ? 0 : 1
        })
        .then(res => {
          if (res.resultCode == 0) {
            this.getList()
            this.$message({
              type: 'success',
              message:
                row.enableStatus == 1
                  ? this.$t('gatewayCluster.deactivatedSuccess')
                  : this.$t('gatewayCluster.activatedSuccess')
            })
          }
        })
    },
    async getAccessTypeList() {
      let resD = await this.$api.getDictionary({ type: 'access-plat-type' })
      let res = await this.$api.getAccessType({})

      if (res.resultCode != 0 && !res.accessTypeList.length) return
      this.accessPlatTypeList = res.accessTypeList
      let options = []
      for (let i = 0; i < res.accessTypeList.length; i++) {
        let groupobj = {}
        groupobj.value = res.accessTypeList[i].accessTypeCode

        for (let a = 0; a < resD.dictionaryList.length; a++) {
          if (res.accessTypeList[i].accessTypeCode == resD.dictionaryList[a].value) {
            console.log(resD.dictionaryList[a].name)
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
    setEnable(val) {
      let name = ''
      this.enableList.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },
    setStatus(val) {
      let name = ''
      this.gatewayStatusList.filter(item => {
        if (val) {
          if (val.startsWith(item.value)) {
            name = item.name
          }
        }
      })
      return name
    },

    setStatusClass(val) {
      if (val) {
        if (val.startsWith('OK')) {
          return 'success'
        } else if (val.startsWith('OOS')) {
          return 'warning'
        } else if (val.startsWith('DOWN')) {
          return 'danger'
        }
      }
    },

    setNodeContainerType(val) {
      let name = ''
      this.nodeContainerTypeList.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },
    setNodeAvailableType(val) {
      let name = ''
      this.nodeAvailableTypeList.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },
    setNodeAvailableTypeDetail(val) {
      let name = ''
      this.nodeAvailableTypeListDetail.filter(item => {
        if (val == item.value) {
          name = item.name
        }
      })
      return name
    },
    setAccessPlatType(val) {
      if (typeof val == 'object') {
        for (let i = 0; i < this.accessPlatTypeList.length; i++) {
          for (let j = 0; j < this.accessPlatTypeList[i].platTypeList.length; j++) {
            if (this.accessPlatTypeList[i].platTypeList[j].platTypeCode == val[1]) {
              return this.accessPlatTypeList[i].platTypeList[j].platTypeName
            }
          }
        }
      }
    },

    handleFind() {
      this.queryParams.pageInfo.pageNum = 1
      this.getList()
    },

    handleRest() {
      this.queryParams.gatewayName = ''
      this.queryParams.gatewayStatus = ''
      this.queryParams.accessPlatType = ''
    },

    async getList() {
      this.loading = true
      let obj = {
        pageInfo: this.queryParams.pageInfo,
        searchInfo: {
          gatewayName: this.queryParams.gatewayName,
          gatewayStatus:
            this.queryParams.gatewayStatus !== '' ? this.queryParams.gatewayStatus : null,
          accessPlatType:
            this.queryParams.accessPlatType !== '' ? this.queryParams.accessPlatType[1] : null
        }
      }
      let res = await this.$api.selectAdapterGateways(obj)
      if (res.resultCode == 0) {
        this.tableData = this.handleListData(res.gatewayList)
        this.total = res.pageInfo.totalNum
        this.loading = false
      } else {
        this.tableData = []
        this.total = 0
        this.loading = false
      }
    },
    handleListData(data) {
      const list = JSON.parse(JSON.stringify(data))
      const nameList = []
      const formattedData = []
      list.forEach(item => {
        !nameList.includes(item.gatewayGroup) && nameList.push(item.gatewayGroup)
      })
      nameList.forEach(item => {
        const groups = list.filter(i => i.gatewayGroup === item)
        groups[0].total = groups.length
        formattedData.push(...groups)
      })
      return formattedData
    },
    objSpanMethod({ row, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
        if (row.total) {
          return [row.total, 1]
        } else {
          return [0, 0]
        }
      } else {
        return [1, 1]
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
    async autoHandleAdd() {
      this.autoAddLoading = true
      const res = await this.$api.autoAddAdapterGateway()
      if (res.resultCode === 0) {
        this.$message.success(this.$t('gatewayCluster.autoAddSuccess'))
        await this.getList()
      }
      this.autoAddLoading = false
    },
    handleAdd() {
      this.ifGetPlat = false
      this.dialogFormVisible = true
      this.operation = true
    },
    /** 详情按钮操作 */
    async handleView(row) {
      await this.getInfo(row)
      this.choosedGatewayId = row.gatewayId
      this.ifGetPlat = true
      this.gatewayClusterDetailVisible = true
    },
    /** 修改按钮操作 */
    async handleUpdate(row) {
      await this.getInfo(row)
      this.choosedGatewayId = row.gatewayId
      this.ifGetPlat = false
      this.dialogFormVisible = true
      this.operation = false
    },

    async getInfo(row) {
      let res = await this.$api.getAdapterGatewayInfo({
        gatewayId: row.gatewayId
      })
      if (res.resultCode != 0) return
      this.dataForm = {
        gatewayId: res.gatewayId,
        gatewayName: res.gatewayName,
        gatewayStatus: res.gatewayStatus,
        gatewayGroup: res.gatewayGroup,
        gatewayIp: res.gatewayIp,
        gatewayNatIp: res.gatewayNatIp,
        nodeContainerType: res.nodeContainerType,
        nodeAvailableType: res.nodeAvailableType,

        associateServer: res.gatewayGroup + '(' + res.gatewayIp + ')',

        virtualIp: res.virtualIp
      }
      console.log(this.dataForm)

      for (let i = 0; i < this.accessPlatTypeList.length; i++) {
        let firstType = this.accessPlatTypeList[i].accessTypeCode
        for (let j = 0; j < this.accessPlatTypeList[i].platTypeList.length; j++) {
          if (res.accessPlatType == this.accessPlatTypeList[i].platTypeList[j].platTypeCode) {
            this.dataForm.accessPlatType = [firstType, res.accessPlatType]
            return
          }
        }
      }
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm(`${this.$t('gatewayCluster.deletePrompt')}`, `${this.$t('public.prompt')}`, {
        confirmButtonText: `${this.$t('public.confirm')}`,
        cancelButtonText: `${this.$t('public.cancel')}`,
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          this.$api.deleteAdapterGatewayInfo({ gatewayId: row.gatewayId }).then(res => {
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
    async handleDel() {
      this.$confirm(
        `${this.$t('gatewayCluster.batchDeletePrompt', {
          num: this.multipleSelection.length
        })}`,
        `${this.$t('public.prompt')}`,
        {
          confirmButtonText: `${this.$t('public.confirm')}`,
          cancelButtonText: `${this.$t('public.cancel')}`,
          type: 'warning',
          closeOnClickModal: false
        }
      )
        .then(() => {
          this.loading = true
          this.batchDialogVisible = true
          this.deleteSelection = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            let item = this.multipleSelection[i]
            this.deleteSelection.push(
              ...this.tableData.filter(
                info => info.multipleIvsGroupName === item.multipleIvsGroupName
              )
            )
          }
          this.loading = false
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('public.canceledDelete')
          })
        })
    },
    setAllocationStatus(val) {
      return this.allocationStatusList.find((t) => t.code == val)?.name
    }

  }
}
</script>

<style lang="scss">
#gateway-cluster {


  .search-btn {
    position: absolute;
    right: 0;
    top: 0;
  }

  .el-dropdown {
    font-size: 14px;
  }
}
</style>
