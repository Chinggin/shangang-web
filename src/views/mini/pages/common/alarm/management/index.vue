<template>
  <!-- 告警级别管理 -->
  <div id="alarm-management" class="base" v-if="isRouterAlive" ref="alarmManagement">
    <div class="btnMargin">
      <el-button v-has-permi="[78]" type="primary" @click="handleAdd">
        {{ $t('alarmList.add') }}
      </el-button>
      <el-button v-has-permi="[78]" type="danger" @click="handleDel" :disabled="disabled">
        {{ $t('public.batchDeletion') }}
      </el-button>
    </div>
    <div style="height: 600px" v-loading="loading" :element-loading-text="$t('public.loading')">
      <div v-if="!loading && !tableData.length" class="tableNOdata">
        <img src="@/assets/img/common/NOdata.png" alt />
        <p>{{ $t('public.noData') }}</p>
      </div>

      <el-table ref="multipleTable" v-loading="loading" :data="tableData" style="width: 100%; margin-top: 20px"
        @selection-change="handleSelectionChange" class="elTable" :element-loading-text="$t('public.loading')" border
        v-if="!loading && tableData.length">
        <template #empty>
          <span>{{ dataText }}</span>
        </template>
        <el-table-column label width="50" type="selection" :selectable="checkSelectable" />
        <el-table-column :label="$t('alarmList.alarmLevel')" min-width="150"
          :prop="locale == 'en' ? 'alarmLevelEnName' : 'alarmLevelName'" show-overflow-tooltip />
        <el-table-column :label="$t('alarmList.alarmWeight')" prop="alarmLevelValue" show-overflow-tooltip />
        <el-table-column :label="$t('alarmList.color')" prop="color" show-overflow-tooltip>
          <template #default="{ row }">
            <div :style="'width:40%;min-height:30px;margin:auto;background-color:' + row.color"></div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('alarmList.alarmType')" prop="alarmTypeInfoList" show-overflow-tooltip>
          <template #default="{ row }">
            {{
    $t('alarmList.associated', {
      num: row.alarmTypeInfoList ? row.alarmTypeInfoList.length : 0
    })
  }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('alarmList.describe')" prop="remark" show-overflow-tooltip />
        <el-table-column :label="$t('public.operating')" min-width="120">
          <template #default="{ row }">
            <span class="cell-operate" @click="handleEdit(row)">
              {{ $t('public.edit') }}
            </span>
            <span v-has-permi="[78]" v-if="row.alarmLevelId != 1 && row.alarmLevelId != 2 && row.alarmLevelId != 3"
              class="cell-operate danger" @click="handleDelete(row)">
              {{ $t('public.delete') }}
            </span>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <pagination v-if="!loading && tableData.length" :total="totalNum" v-model:pageNum="pageNum"
        v-model:limit="pageSize" @pagination="getListByPage"></pagination>
    </div>
    <!-- 添加修改对话框 -->
    <management-add></management-add>
    <!-- 批量操作 -->
    <batch-operate :multipleSelection="multipleSelection" :what="$t('alarmList.alarmLevel')" @getList="getTemplateList"
      :operate="operate" :batchApi="batchApi" whatId="alarmLevelId" whatName="alarmLevelName" v-model:loading="loading"
      v-model:visible="batchDialogVisible" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import managementAdd from './component/management-add.vue' //添加修改对话框
import batchOperate from '@/components/batchOperate' //批量操作
export default {
  name: 'AlarmLevelManagement',
  components: {
    'management-add': managementAdd,
    batchOperate
  },
  data() {
    return {
      locale: localStorage.getItem('locale'),
      isRouterAlive: true,
      disabled: true, //批量删除
      loading: false,
      tableData: [], //表格数据
      multipleSelection: [], //表格选中状态存放数组
      dataText: '',
      pageNum: 1,
      pageSize: 10,
      totalNum: 0, // 总数量
      operation: false, // true:新增, false:编辑
      dialogFormVisible: false, // 添加或者编辑
      dataForm: {}, // 添加修改框表单
      // 点击提交按钮后蒙版
      maskloading: false,
      batchDialogVisible: false, //批量操作对话框
      operate: '', //批量操作提示
      batchApi: '', //批量操作api
      disabledArr: [], //禁用的告警类型
      preSetId: '00000000000000000201009999999999'
    }
  },
  watch: {
    //监听语言切换
    '$i18n.locale': function () {
      this.locale = localStorage.getItem('locale')
      this.pageResize()
      if (this.map) {
        this.map.setLang(this.locale == 'en' ? 'en' : 'zh_cn')
      }
    }
  },
  mounted() {
    this.getTemplateList()
  },
  methods: {
    checkSelectable(row) {
      return row.alarmLevelId != 1 && row.alarmLevelId != 2 && row.alarmLevelId != 3
    },
    handleAdd() {
      this.dataForm = {
        alarmLevelName: '',
        alarmLevelEnName: '',
        alarmLevelValue: '',
        color: '#409EFF',
        remark: '',
        alarmTypes: []
      }
      this.operation = true
      this.dialogFormVisible = true
    },
    //修改
    async handleEdit(row) {
      let res = await this.$api.getAlarmLevelInfo({
        alarmLevelId: row.alarmLevelId
      })
      if (res.resultCode != 0) return
      this.dataForm = {
        alarmLevelName: res.alarmLevelName,
        alarmLevelEnName: res.alarmLevelEnName,
        alarmLevelValue: res.alarmLevelValue,
        color: res.color,
        remark: res.remark,
        alarmTypes: res.alarmTypeList,
        alarmLevelId: res.alarmLevelId
      }
      this.operation = false
      this.dialogFormVisible = true
    },
    //删除
    handleDelete(row) {
      this.$confirm(this.$t('alarmList.deleteAlarmLevel'), this.$t('public.prompt'), {
        confirmButtonText: this.$t('public.confirm'),
        cancelButtonText: this.$t('public.cancel'),
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          this.$api.deleteAlarmLevel({ alarmLevelId: row.alarmLevelId }).then(res => {
            if (res.resultCode === 0) {
              this.$message({
                type: 'success',
                message: this.$t('public.delSuccess')
              })
              this.getTemplateList()
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
    //批量删除
    handleDel() {
      let pormpt = this.$t('alarmList.batchDeleteAlarmLevel', {
        num: this.multipleSelection.length
      })
      this.$confirm(pormpt, this.$t('public.prompt'), {
        confirmButtonText: this.$t('public.confirm'),
        cancelButtonText: this.$t('public.cancel'),
        type: 'warning',
        closeOnClickModal: false
      })
        .then(async () => {
          this.loading = true

          this.operate = this.$t('public.batchDeletionContent')
          this.batchApi = 'deleteAlarmLevel'
          this.batchDialogVisible = true
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('public.canceledDelete')
          })
        })
    },
    getTemplateList() {
      this.dataText = ''
      this.loading = true
      // 请求
      let data = {
        pageInfo: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }
      this.$api.listAlarmLevelByPage(data).then(res => {
        console.log(res)
        if (res.alarmLevelList) {
          this.tableData = res.alarmLevelList
          this.totalNum = res.pageInfo.totalNum
          this.disabledArr = res.allAlarmTypeList
        } else {
          this.tableData = []
          this.totalNum = 0
          this.dataText = this.$t('public.noData')
        }
        this.loading = false
      })
    },
    // 表格列表选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (val.length !== 0) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    // 分页
    getListByPage() {
      this.getTemplateList()
    }
  }
}
</script>

<style lang="scss">
#alarm-management {
  padding: 0 20px;
}
</style>
