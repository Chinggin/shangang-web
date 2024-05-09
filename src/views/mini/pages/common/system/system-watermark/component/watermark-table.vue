<template>
  <!-- 水印添加修改 -->
  <el-dialog :title="$t('systemTatermarkManage.detail')" v-model="$parent.dialogTableFormVisible" top="10vh"
    width="1270px" :close-on-click-modal="false" class="dialog" @closed="dialogClosed" @open="dialogOpen"
    :modal-append-to-body="true" :modal="true" draggable id="system-watermark-tabale" :show-close="!allLoading">
    <div class="filter-container">
      <el-row>
        <el-form :inline="true" class="demo-form-inline flex flex-wrap justify-between" ref="searchForm"
          :model="searchForm" label-position="left" :label-width="$parent.locale == 'en' ? '180px' : '84px'" :style="{
    position: 'relative',
    height: showManyCondition ? 'initial' : '50px',
    overflow: showManyCondition ? 'auto' : 'hidden'
  }">
          <el-form-item :label="$t('systemTatermarkManage.cameraId') + ' ：'" prop="cameraId">
            <el-input v-model="searchForm.cameraId" auto-complete="off"
              :placeholder="$t('systemTatermarkManage.pleaseInputcameraId')" clearable class="flexstart-table-input" />
          </el-form-item>
          <el-form-item :label="$t('systemTatermarkManage.cameraName') + ' ：'" prop="cameraName">
            <el-input v-model="searchForm.cameraName" auto-complete="off"
              :placeholder="$t('systemTatermarkManage.pleaseInputCameraName')" clearable
              class="flexstart-table-input" />
          </el-form-item>
          <el-form-item :label="$t('deviceCamera.interconnectCode') + ' ：'" prop="interconnectCode">
            <el-input v-model="searchForm.interconnectCode" auto-complete="off"
              :placeholder="$t('primaryDevice.pleaseInputinterconnectCode')" clearable class="flexstart-table-input" />
          </el-form-item>
          <el-form-item :label="$t('systemTatermarkManage.platId') + ' ：'" auto-complete="off" prop="platId">
            <el-select v-model="searchForm.platId" class="flexstart-table-input">
              <el-option :label="$t('public.all')" value />
              <el-option v-for="(item, index) in $parent.platNameList" :key="index" :label="item.label"
                :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('systemTatermarkManage.cameraStatus') + ' ：'" prop="cameraStatus">
            <el-select v-model="searchForm.cameraStatus" class="flexstart-table-input">
              <el-option :label="$t('public.all')" value />
              <el-option v-for="(item, index) in cameraStatusOption" :key="index" :label="item.name"
                :value="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item label=" " :label-width="$parent.locale == 'en' ? '180px' : '84px'">
            <div class="flexstart-table-input flex justify-end">
              <el-button type="primary" @click="handleQuery" class="miniBtn">
                {{ $t('public.search') }}
              </el-button>
              <el-button @click="handleReset" class="miniBtn">
                {{ $t('public.reset') }}
              </el-button>
              <!--            <el-button class="miniBtn" type="primary" @click="manyCondition">-->
              <!--              {{ $t('public.manyCondition') }}-->
              <!--              <span :class="showManyCondition ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></span>-->
              <!--            </el-button>-->
            </div>
          </el-form-item>
        </el-form>
      </el-row>
      <no-table :tableLoading="loading" :tableData="tableData" style="height: 40vh">
        <el-table v-show="!loading && tableData.length" ref="multipleTable" :data="tableData"
          max-height="calc(40vh - 50px)" :row-class-name="tableRowClassName" border>
          <template #empty>
            <span>{{ dataText }}</span>
          </template>
          <el-table-column :label="$t('systemTatermarkManage.cameraId')" min-width="110" show-overflow-tooltip
            prop="cameraId">
            <template #default="{ row }">
              <span>{{ row.cameraId }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('systemTatermarkManage.cameraName')" min-width="100" show-overflow-tooltip
            prop="cameraName">
            <template #default="{ row }">
              <span>{{ row.cameraName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('systemTatermarkManage.platId')" min-width="100" show-overflow-tooltip
            prop="platName">
            <template #default="{ row }">
              <span>{{ row.platName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('systemTatermarkManage.interconnectionCoding')" min-width="100"
            show-overflow-tooltip prop="interconnectCode">
            <template #default="{ row }">
              <span>{{ row.interconnectCode }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('systemTatermarkManage.cameraStatus')" min-width="70" show-overflow-tooltip
            prop="cameraStatus">
            <template #default="{ row }">
              <span :class="{
    warning: row.cameraStatus == '0',
    success: row.cameraStatus == '1',
    danger: row.cameraStatus == '2'
  }">
                {{ setStatus(row.cameraStatus) }}
              </span>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <pagination v-show="!loading && tableData.length" :total="totalNum" v-model:pageNum="pageNum"
          v-model:limit="pageSize" @pagination="getListByPage" />
      </no-table>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogClosed">{{ $t('public.cancel') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
  },
  data() {
    return {
      showManyCondition: true,
      searchForm: {
        cameraId: '',
        cameraName: '',
        interconnectCode: '',
        platId: '',
        cameraStatus: '',
        watermarkContent: '',
        watermarkRule: '',
      },
      listQueryParams: {
        cameraId: '',
        cameraName: '',
        interconnectCode: '',
        platId: '',
        cameraStatus: '',
        watermarkContent: '',
        watermarkRule: '',
      },
      loading: false,
      tableData: [],
      dataText: '',
      pageNum: 1,
      pageSize: 10,
      totalNum: 0, // 总数量

      angleList: [
        { value: 30, label: this.$t('systemTatermarkManage.tiltLeft') },
        { value: -30, label: this.$t('systemTatermarkManage.tiltRight') }
      ],
      disabledDirection: true,
      allLoading: false,
      form: {
        watermarkTypeRadio: '1',
        systemType: '',
        watermarkType: '',
        content: '',
        tenantCheckedNum: '',
        rotate: '',
        direction: '',
        ruleName: '',
        opacity: 16,
        font: 14,
        timeLine: false,
        position: 'right-down'
      },
      positionOption: [
        {
          label: this.$t('systemTatermarkManage.lowerRight'),
          value: 'right-down'
        },
        {
          label: this.$t('systemTatermarkManage.topRight'),
          value: 'right-top'
        },
        {
          label: this.$t('systemTatermarkManage.bottomLeft'),
          value: 'left-down'
        },
        {
          label: this.$t('systemTatermarkManage.topLeft'),
          value: 'left-top'
        }
      ],
      waterRuleName: '',
      colour: '#000000',
      options: [],
      value: '',
      rules: {},
      colorarr: [],
      watermarkRuleList: [],
      watermarkRuleArray: [
        { value: 0, label: this.$t('systemTatermarkManage.organizationName') },
        { value: 1, label: this.$t('systemTatermarkManage.userNumber') }
      ],
      waterRadio: null,
      newData: this.dayjs().format('YYYY-MM-DD'),
      isSelectRule: 1,
      tenantNameList: [],
      tenantIdList: [],
      tenantRelateIdList: [],
      detailsTenantList: [],
      confirmTenantIdList: []
    }
  },
  watch: {},
  async mounted() { },
  computed: {
    ...mapState({
      cameraStatusOption: state => state.dict['device_status'] // 镜头状态
    })
  },
  methods: {
    handleQuery() {
      this.pageNum = 1
      this.getList()
    },
    handleReset() {
      this.searchForm = {
        cameraId: '',
        cameraName: '',
        interconnectCode: '',
        platId: '',
        cameraStatus: '',
        watermarkContent: '',
        watermarkRule: '',
      }
      this.$refs['searchForm'].resetFields()
      this.pageNum = 1
      this.pageSize = 10
      this.getList()
    },
    // 表格斑马纹
    tableRowClassName({ rowIndex }) {
      return rowIndex % 2 == 1 ? '' : 'success-row'
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
    getListByPage() {
      this.searchForm = Object.assign({}, this.listQueryParams)
      this.getList()
    },
    getList() {
      this.dataText = ''
      this.loading = true
      this.tableData = []
      let obj = {}
      obj = {
        ...this.searchForm,
        watermarkId: this.$parent.watermarkId,
        pageInfo: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }
      //将当前搜索表单赋值
      this.listQueryParams = Object.assign({}, this.searchForm)
      this.$api.convergenceDeviceList(obj).then(res => {
        if (res?.resultCode == 0 && res.convergenceDeviceInfoList.length) {
          this.tableData = res.convergenceDeviceInfoList
          this.totalNum = res.pageInfo.totalNum
        } else {
          this.tableData = []
          this.dataText = this.$t('public.noData')
        }
        this.loading = false
      })
    },
    manyCondition() {
      this.showManyCondition = !this.showManyCondition
    },
    // 水印弹窗打开
    dialogOpen() {
      this.getList()
    },
    // 水印弹窗关闭
    dialogClosed() {
      this.$parent.dialogTableFormVisible = false
    }
  }
}
</script>

<style lang="scss">
#system-watermark-tabale {
  .el-dialog__body {
    padding: 40px;
  }

  .flexstart-table-input {
    width: 200px !important;
  }
}
</style>
