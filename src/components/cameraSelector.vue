<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :top="showFavorites ? '2vh' : '10vh'"
    :width="showFavorites ? '900px' : '850px'" :close-on-click-modal="false" @open="dialogOpen" @closed="dialogClosed"
    :modal="false" :draggable="false" id="camera-selector">
    <div class="selector-container">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-tabs v-if="showFavorites" v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane :label="$t('alarmList.cameraResources')" name="1">
              <div class="resources-container">
                <div class="search-container">
                  <el-input v-model="searchName" :placeholder="$t('alarmList.inputCameraNameOrOrgName')"
                    :maxlength="128" clearable />
                  <div class="search-btns">
                    <el-button v-if="!searchName" type="primary" class="searchBtn" @click="searchCamera">
                      {{ $t('public.search') }}
                    </el-button>
                    <el-popover v-if="searchName" placement="bottom-end" trigger="click" width="350">
                      <div v-loading="searchLoading">
                        <div v-if="searchCameraList.length == 0" style="text-align: center">
                          {{ $t('public.noData') }}
                        </div>
                        <div v-else-if="searchCameraList.length > 50" style="text-align: center">
                          {{ $t('public.searchPrecisely') }}
                        </div>

                        <ul v-else class="searchedUl">
                          <li v-for="(item, index) in searchCameraList" :key="index" class="searchedLi">
                            <i :class="iconSty_search(item)" />
                            <span class="camera-name" :title="item.label">
                              {{ item.label }}
                            </span>
                            <el-icon class="locateIcon" :title="$t('public.position')" @click="searchParent(item)">
                              <el-icon-location-outline />
                            </el-icon>
                          </li>
                        </ul>
                      </div>
                      <template #reference>
                        <el-button type="primary" class="searchBtn" @click="searchCamera">
                          {{ $t('public.search') }}
                        </el-button>
                      </template>
                    </el-popover>
                    <el-button type="primary" class="searchBtn" @click="refreshTree">
                      {{ $t('public.refresh') }}
                    </el-button>
                  </div>
                </div>
                <div class="tree-container" v-loading="zTreeLoading" :element-loading-text="$t('public.loading')">
                  <giant-tree ref="giantTree" :nodes="treeData" :setting="treeSetting" @onCreated="onTreeCreated" />
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('favorite.favorite1')" name="2">
              <div class="resources-container">
                <div class="tree-container" style="height: 456px" v-loading="favoriteTreeLoading"
                  :element-loading-text="$t('public.loading')">
                  <giant-tree ref="giantTree" :nodes="favoriteTreeData" :setting="favoriteTreeSetting"
                    @onCreated="onFavoriteTreeCreated" />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div v-else class="resources-container">
            <div class="title">{{ $t('alarmList.cameraResources') }}</div>
            <div class="search-container">
              <el-input v-model="searchName" :placeholder="$t('alarmList.inputCameraNameOrOrgName')" :maxlength="128"
                clearable />
              <div class="search-btns">
                <el-button v-if="!searchName" type="primary" class="searchBtn" @click="searchCamera">
                  {{ $t('public.search') }}
                </el-button>
                <el-popover v-if="searchName" placement="bottom-end" trigger="click" :width="longNav ? 330 : 305">
                  <div v-loading="searchLoading">
                    <div v-if="searchCameraList.length == 0" style="text-align: center">
                      {{ $t('public.noData') }}
                    </div>
                    <div v-else-if="searchCameraList.length > 50" style="text-align: center">
                      {{ $t('public.searchPrecisely') }}
                    </div>

                    <ul v-else class="searchedUl">
                      <li v-for="(item, index) in searchCameraList" :key="index" class="searchedLi">
                        <i :class="iconSty_search(item)" />
                        <span class="camera-name" :title="item.label">
                          {{ item.label }}
                        </span>
                        <el-icon class="locateIcon" :title="$t('public.position')" @click="searchParent(item)">
                          <el-icon-location-outline />
                        </el-icon>
                      </li>
                    </ul>
                  </div>
                  <template #reference>
                    <el-button type="primary" class="searchBtn" @click="searchCamera">
                      {{ $t('public.search') }}
                    </el-button>
                  </template>
                </el-popover>
                <el-button type="primary" class="searchBtn" @click="refreshTree">
                  {{ $t('public.refresh') }}
                </el-button>
              </div>
            </div>
            <div class="tree-container" v-loading="zTreeLoading" :element-loading-text="$t('public.loading')">
              <giant-tree ref="giantTree" :nodes="treeData" :setting="treeSetting" @onCreated="onTreeCreated" />
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="selected-container">
            <div class="title">
              <label :class="['el-checkbox', checkAll && 'is-checked']">
                <span :class="[
    'el-checkbox__input',
    checkAll && 'is-checked',
    isIndeterminate && 'is-indeterminate'
  ]">
                  <span class="el-checkbox__inner"></span>
                  <input aria-hidden="false" class="el-checkbox__original" ref="checkAll" type="checkbox"
                    @change="handleCheckAll" />
                </span>
                <span class="el-checkbox__label">
                  {{ $t('public.selectedCamera1') }}({{ checkedCameras.length
                  }}{{ locale == 'en' ? '' : '台' }})
                </span>
              </label>
            </div>
            <div class="selected-cameras" :style="{
    height: showFavorites ? '471px' : '456px'
  }">
              <label :class="['el-checkbox', checkedCameras.includes(camera.id) && 'is-checked']"
                v-for="camera in selectedCameras" :key="camera.id">
                <span :class="[
    'el-checkbox__input',
    checkedCameras.includes(camera.id) && 'is-checked'
  ]">
                  <span class="el-checkbox__inner"></span>
                  <input aria-hidden="false" :class="[
    'el-checkbox__original',
    checkedCameras.includes(camera.id) && 'is-checked'
  ]" type="checkbox" ref="checkbox" :value="camera.id" @change="handleCheckedCamerasChange" />
                </span>
                <span class="el-checkbox__label">
                  <span class="checkbox-item-text" :title="camera.name">{{ camera.name }}</span>
                </span>
              </label>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="info" @click="cancel">{{ $t('public.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">
          {{ $t('public.confirm') }}
        </el-button>
        <el-button type="danger" @click="removeCamera">
          {{ $t('public.delete') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { LocationFilled as ElIconLocationOutline } from '@element-plus/icons-vue'
import GiantTree from 'vue-giant-tree'
import devIcon from '@/utils/common/dev-icon'
const { getDevIcon } = devIcon()
const checkType = {
  multiple: 'checkbox',
  single: 'radio'
}
export default {
  components: {
    GiantTree,
    ElIconLocationOutline
  },
  name: 'cameraSelector',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '请选择镜头'
    },
    api: {
      type: String,
      default: 'getDeviceTree'
    },
    // 是否懒加载
    lazyLoad: {
      type: Boolean,
      default: true
    },
    // 设备类型 1：镜头 其他根据业务字典定义 不填或填0为查询全部
    deviceType: {
      type: Number,
      default: 0
    },
    // 平台id
    platformId: {
      type: String,
      default: ''
    },
    // 选择模式 单选 single，多选 multiple
    mode: {
      type: String,
      default: 'multiple'
    },
    max: {
      type: Number,
      default: Infinity
    },
    // 是否显示收藏夹
    showFavorites: {
      type: Boolean,
      default: false
    },
    platformType: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      locale: localStorage.getItem('locale'),
      treeData: [],
      treeSetting: {
        check: {
          enable: true,
          chkStyle: checkType[this.mode],
          radioType: 'all'
        },
        data: {
          key: {
            isParent: 'isParent',
            name: 'label'
          },
          simpleData: {
            enable: true,
            idKey: 'id',
            pIdKey: 'parentId',
            rootPId: -1
          }
        },
        view: {
          fontCss: { color: '#2d2d2d' },
          expandSpeed: '',
          showIcon: true,
          addDiyDom: this.addDiyDom
        },
        callback: {
          beforeCheck: (treeId, treeNode) => {
            return this.beforeCheck(treeNode)
          },
          onCheck: (event, treeId, treeNode) => {
            return this.onNodeCheck(treeNode)
          },
          beforeExpand: (treeId, treeNode) => {
            return this.beforeExpand(treeNode)
          }
        }
      },
      selectedCameras: [],
      zTree: null,
      zTreeLoading: false,
      searchName: '',
      searchLoading: false,
      searchCameraList: [],
      checkAll: false,
      isIndeterminate: false,
      checkedCameras: [],
      updateSelectedCameras: this.$loadash.debounce(async treeNode => {
        if (this.showFavorites) {
          if (treeNode.type === '1') {
            if (!treeNode.checked) {
              this.checkNodes(treeNode, this.favoriteTree, false)
            }
          } else if (treeNode.type === '2') {
            if (!treeNode.checked) {
              const node = this.favoriteTree.getNodeByParam('id', treeNode.id, null)
              if (node) {
                this.favoriteTree.checkNode(node, false, true, false)
              }
            }
          }
        }
        const selectedNodes = this.zTree.getCheckedNodes(true)
        if (this.showFavorites) {
          const favoriteNodes = this.favoriteTree.getCheckedNodes(true)
          const uniqNodes = this.$loadash.uniqBy([...selectedNodes, ...favoriteNodes], 'id')
          this.selectedCameras = uniqNodes
            .filter(node => node.type !== 1 && !node.isParent)
            .map(node => ({
              id: node.id,
              name: node.label
            }))
        } else {
          // 过滤非设备节点
          this.selectedCameras = selectedNodes
            .filter(node => node.type !== 1 && !node.isParent)
            .map(node => ({
              id: node.id,
              name: node.label
            }))
        }

        // 同步右侧选择数据
        this.checkedCameras = this.selectedCameras.map(camera => camera.id)
        // 设置选中状态
        if (this.$refs.checkbox && this.$refs.checkbox.length) {
          this.$refs.checkbox.forEach(checkbox => {
            checkbox.checked = true
          })
        }
        this.checkAll = this.checkedCameras.length > 0
        this.$refs.checkAll.checked = this.checkedCameras.length > 0
        this.isIndeterminate = false
      }, 200),
      activeName: '1',
      favoriteTreeLoading: false,
      favoriteTreeData: [],
      favoriteTreeSetting: {
        data: {
          key: {
            name: 'label'
          },
          simpleData: {
            enable: true,
            pIdKey: 'parentId',
            idKey: 'id',
            rootPId: -1
          }
        },
        check: {
          enable: true,
          chkStyle: checkType[this.mode],
          radioType: 'all'
        },
        view: {
          fontCss: {
            color: '#2d2d2d'
          },
          expandSpeed: '',
          showIcon: true,
          showLine: false,
          addDiyDom: this.favoriteTreeDiyDom
        },
        callback: {
          beforeCheck: (treeId, treeNode) => {
            return this.beforeCheck(treeNode)
          },
          onCheck: (event, treeId, treeNode) => {
            return this.favoriteTreeCheck(treeNode)
          }
        }
      },
      favoriteTree: null
    }
  },
  created() {
    this.fetchTreeData() // 获取顶级数据
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    longNav: {
      get() {
        return this.$store.state.menu.longNav
      },
      set(val) {
        this.$store.commit('menu/set_longNav', val)
      }
    }
  },
  methods: {
    dialogOpen() {
      this.$nextTick(() => {
        let path = this.$route.path
        if (path.indexOf('/turning') == -1) {

        } else {
          let el_dialog_wrapper = document.getElementsByClassName('el-overlay-dialog')[0]
          el_dialog_wrapper.style.width = '100%'
          el_dialog_wrapper.style.height = '100%'
          el_dialog_wrapper.style.background = 'rgba(0,0,0,0.5)'
        }
        this.$emit('open')
      })
    },
    dialogClosed() {
      this.$emit('closed')
    },
    addDiyDom(treeId, treeNode) {
      const aObj = document.getElementById(`${treeNode.tId}_a`)
      let camIcon = document.createElement('i')
      const firstDom = aObj.firstChild

      if (treeNode.type == 1 && treeNode.payload.type == 1) {
        camIcon.className = 'aci aci-organization iconCss1'
      } else if (treeNode.type == 1) {
        camIcon.className = 'aci aci-x006-folder iconCss1'
      } else {
        camIcon.className = getDevIcon(treeNode.payload.status, treeNode.payload.deviceType)
      }
      camIcon.style.marginRight = '0px'
      firstDom.appendChild(camIcon)
    },
    async fetchTreeData(parentId = '', node) {
      if (this.zTreeLoading) return
      try {
        this.zTreeLoading = true
        const response = await this.$api[this.api]({
          type: this.lazyLoad ? 1 : 2,
          deviceType: this.deviceType,
          platformId: this.platformId === '' ? undefined : this.platformId,
          platformType: this.platformType || undefined,
          parentId
        })
        if (response && response.nodeList && response.nodeList.length > 0) {
          const nodeList = response.nodeList.map(node => {
            node.isParent = !node.leaf
            if (node.type == 1) {
              node.label = `${node.label} (${node.payload.onlineCount}/${node.payload.totalCount})`
            }
            if (this.mode === 'single') {
              node.nocheck = node.type == 1
            }
            return node
          })
          if (node) {
            // 如果有 node 参数，则为懒加载子节点
            this.zTree.addNodes(node, nodeList)
          } else {
            // 如果没有 node 参数，初始化树数据
            this.treeData = nodeList
          }
        }
      } finally {
        this.zTreeLoading = false
      }
    },
    async onTreeCreated(zTree) {
      this.zTree = zTree
      const nodes = this.zTree.getNodes()
      if (nodes.length > 0 && nodes[0].isParent) {
        // 展开该节点 触发事件
        if (this.lazyLoad) {
          this.zTree.expandNode(nodes[0], true, false, true, true)
        } else {
          this.zTree.expandNode(nodes[0], true, false, true, false)
          // 检查是否存在数据已存在但树节点未勾选的镜头
          if (this.selectedCameras.length > 0) {
            this.selectedCameras.forEach(camera => {
              let node = this.zTree.getNodeByParam('id', camera.id, null)
              if (node) {
                const checked = node.getCheckStatus().checked
                if (!checked) {
                  this.zTree.checkNode(node, true, true, false)
                }
              }
            })
          }
        }
      }
    },
    beforeCheck(treeNode) {
      if (!treeNode.checked) {
        const checkedCameraList = this.flapTree([treeNode])
        if (this.selectedCameras.length >= this.max) {
          this.$message.warning(`${this.$t('public.maxSelectDevLength', { num: this.max })}`)
          return false
        }
        if (checkedCameraList.length + this.selectedCameras.length > this.max) {
          this.$alert(
            this.$t('public.maxSelectDevLengthWarn', { num: this.max }),
            this.$t('public.prompt'),
            {
              confirmButtonText: this.$t('public.confirm'),
              callback: () => {
                const list = checkedCameraList.slice(0, this.max - this.selectedCameras.length)
                list.forEach(node => {
                  this.zTree.checkNode(node, true, true, false)
                })
                this.updateSelectedCameras(list)
              }
            }
          )
          return false
        }
      }
      if (this.mode === 'single') {
        return treeNode.type != 1
      } else {
        return true
      }
    },
    onNodeCheck(treeNode) {
      // 更新右侧的已选择镜头列表
      this.updateSelectedCameras(treeNode)
    },
    async beforeExpand(treeNode) {
      if (!treeNode.children || treeNode.children.length === 0) {
        await this.fetchTreeData(treeNode.id, treeNode)
      }
    },
    removeCamera() {
      if (!this.checkedCameras.length) {
        this.$message.warning(`${this.$t('public.selectDelDev')}`)
        return
      }
      if (this.checkedCameras.length === this.selectedCameras.length) {
        // 全部删除
        this.selectedCameras = []
        if (this.mode === 'single') {
          this.zTree.checkNode(
            this.zTree.getNodeByParam('id', this.checkedCameras[0]),
            false,
            true,
            false
          )
          if (
            this.showFavorites &&
            this.favoriteTree.getNodeByParam('id', this.checkedCameras[0]) !== null
          ) {
            this.favoriteTree.checkNode(
              this.favoriteTree.getNodeByParam('id', this.checkedCameras[0]),
              false,
              true,
              false
            )
          }
        } else {
          this.showFavorites && this.favoriteTree.checkAllNodes(false)
          this.zTree.checkAllNodes(false)
        }
      } else {
        // 部分删除
        for (let i = 0; i < this.checkedCameras.length; i++) {
          let cameraId = this.checkedCameras[i]
          let index = this.selectedCameras.findIndex(camera => camera.id === cameraId)
          this.selectedCameras.splice(index, 1)
          if (this.showFavorites && this.favoriteTree.getNodeByParam('id', cameraId) !== null) {
            this.favoriteTree.checkNode(
              this.favoriteTree.getNodeByParam('id', cameraId),
              false,
              true,
              false
            )
          }
          this.zTree.checkNode(this.zTree.getNodeByParam('id', cameraId), false, true, false)
        }
      }
      this.checkedCameras = []
      this.checkAll = false
      this.$refs.checkAll.checked = false
      this.isIndeterminate = false
    },
    handleCheckAll(event) {
      const isChecked = event.target.checked
      this.checkAll = isChecked
      this.$refs.checkAll.checked = isChecked
      this.checkedCameras = isChecked ? this.selectedCameras.map(item => item.id) : []
      this.$refs.checkbox.forEach(checkbox => {
        checkbox.checked = isChecked // 设置选中状态
      })
      this.isIndeterminate = false
    },
    handleCheckedCamerasChange(event) {
      const isChecked = event.currentTarget.className.indexOf('is-checked') != -1 ? false : true
      const cameraId = event.target.value
      let checkboxIndex = this.$refs.checkbox.findIndex(item => item.value === cameraId)
      if (isChecked) {
        this.checkedCameras.push(cameraId)
        if (checkboxIndex > -1) {
          this.$refs.checkbox[checkboxIndex].checked = true
        }
      } else {
        const index = this.checkedCameras.indexOf(cameraId)
        if (index > -1) {
          this.checkedCameras.splice(index, 1)
        }
        if (checkboxIndex > -1) {
          this.$refs.checkbox[checkboxIndex].checked = false
        }
      }

      const checkedCount = this.checkedCameras.length
      this.checkAll = checkedCount === this.selectedCameras.length
      this.$refs.checkAll.checked = checkedCount === this.selectedCameras.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.selectedCameras.length
    },
    async searchCamera() {
      if (this.searchName === '') {
        this.$message({
          type: 'warning',
          message: this.$t('alarmList.inputCameraName')
        })
        return
      }
      try {
        this.searchLoading = true
        let data = {
          searchName: this.searchName,
          pageInfo: {
            pageNum: 1,
            pageSize: this.$maxPageSize
          },
          deviceType: this.deviceType
        }
        const res = await this.$api.searchInDeviceTree(data)
        if (res.resultCode == 0) {
          this.searchCameraList = res.nodeList
        }
      } finally {
        this.searchLoading = false
      }
    },
    async refreshTree() {
      await this.fetchTreeData()
      this.checkedCameras = []
      this.selectedCameras = []
      this.checkAll = false
      this.$refs.checkAll.checked = false
      this.isIndeterminate = false
    },
    iconSty_search(item) {
      if (item.type == 1) {
        return 'aci-x006-folder iconCss1 aci'
      } else {
        //图标单独的文件，更改方法
        return getDevIcon(item.status, item.subType)
      }
    },
    //搜索父节点定位
    async searchParent(item) {
      try {
        this.zTreeLoading = true
        let res = await this.$api.locateInDeviceTree({
          nodeId: item.id,
          nodeType: item.type
        })

        if (res.resultCode == 0) {
          this.zTreeLoading = false
          for (let i = 0; i < res.parents.length; i++) {
            let exNode = this.zTree.getNodeByParam('id', res.parents[i].parentId, null)
            await this.beforeExpand(exNode)
          }
          await this.$nextTick()
          let exNode_now = this.zTree.getNodeByParam('id', item.id, null)
          this.zTree.selectNode(exNode_now)
        }
      } finally {
        this.zTreeLoading = false
      }
    },
    confirm() {
      if (this.selectedCameras.length > this.max) {
        this.$message.warning(`${this.$t('public.maxSelectDevLength', { num: this.max })}`)
        return
      }
      this.$emit('confirm', JSON.parse(JSON.stringify(this.selectedCameras)))
      this.dialogVisible = false
    },
    cancel() {
      this.dialogVisible = false
      this.$emit('cancel')
    },
    async handleTabClick() {
      if (this.activeName === '1') {
        await this.fetchTreeData()
      } else {
        await this.fetchFavoriteTreeData()
      }
    },
    async fetchFavoriteTreeData() {
      try {
        this.favoriteTreeLoading = true
        const response = await this.$api.getFavoriteCamList()
        const nodeList = [
          {
            id: sessionStorage.getItem('account'),
            parentId: -1,
            label: this.$t('favorite.favorite'),
            type: '1',
            children: [],
            highlight: true
          }
        ]
        const arr = response.nodeList
        this.favoriteTreeRecursion(arr)
        nodeList[0].children = arr
        this.favoriteTreeData = nodeList
        await this.$nextTick()
        // 检查是否存在数据已存在但树节点未勾选的镜头
        if (this.selectedCameras.length > 0) {
          this.selectedCameras.forEach(camera => {
            let node = this.favoriteTree.getNodeByParam('id', camera.id, null)
            if (node) {
              const checked = node.getCheckStatus().checked
              if (!checked) {
                this.favoriteTree.checkNode(node, true, true, false)
              }
            }
          })
        }
      } finally {
        this.favoriteTreeLoading = false
      }
    },
    // 收藏夹树处理
    favoriteTreeRecursion(data) {
      data.forEach(item => {
        if (item.type == 1) {
          item.label =
            item.label + ' (' + item.payload.onlineCount + '/' + item.payload.totalCount + ')'
        }
        if (item.children) {
          this.favoriteTreeRecursion(item.children)
        }
      })
    },
    // 收藏夹
    onFavoriteTreeCreated(e) {
      this.favoriteTree = e
      this.favoriteTree.expandAll(true)
    },
    favoriteTreeDiyDom(treeId, treeNode) {
      var aObj = document.getElementById(`${treeNode.tId}_a`)
      const camIcon = document.createElement('i')

      if (treeNode.type == 1) {
        camIcon.className = 'aci aci-x006-folder iconCss1'
      } else {
        const status = treeNode.payload.status
        const deviceType = treeNode.payload.ptzType
        camIcon.className = getDevIcon(status, deviceType)
      }
      camIcon.style.marginRight = '0px'
      aObj.firstChild.appendChild(camIcon)
    },
    // 设备节点选中
    async favoriteTreeCheck(treeNode) {
      if (treeNode.type === '1') {
        if (!treeNode.checked) {
          this.checkNodes(treeNode, this.zTree, false)
        }
      } else if (treeNode.type === '2') {
        if (!treeNode.checked) {
          const node = this.zTree.getNodeByParam('id', treeNode.id, null)
          if (node) {
            this.zTree.checkNode(node, false, true, false)
          }
        }
      }
      const selectedNodes = this.zTree.getCheckedNodes(true)
      const favoriteNodes = this.favoriteTree.getCheckedNodes(true)
      const uniqNodes = this.$loadash.uniqBy([...selectedNodes, ...favoriteNodes], 'id')
      this.selectedCameras = uniqNodes
        .filter(node => node.type !== 1 && !node.isParent)
        .map(node => ({
          id: node.id,
          name: node.label
        }))
      // 同步右侧选择数据
      this.checkedCameras = this.selectedCameras.map(camera => camera.id)
      await this.$nextTick()
      // 设置选中状态
      if (this.$refs.checkbox?.length) {
        this.$refs.checkbox.forEach(checkbox => {
          checkbox.checked = true
        })
      }
      this.checkAll = this.checkedCameras.length > 0
      this.$refs.checkAll.checked = this.checkedCameras.length > 0
      this.isIndeterminate = false
    },
    async setSelected(cameras) {
      let selectCameras = []
      let checkedCameras = []
      cameras.forEach(camera => {
        selectCameras.push({
          id: camera.cameraId,
          name: camera.cameraName
        })
        checkedCameras.push(camera.cameraId)
      })
      this.selectedCameras = selectCameras
      this.checkedCameras = checkedCameras
      this.checkAll = this.checkedCameras.length > 0
      this.$refs.checkAll.checked = this.checkedCameras.length > 0
      this.isIndeterminate = false
      if (this.activeName === '1') {
        await this.fetchTreeData()
      } else {
        await this.fetchFavoriteTreeData()
      }
      // 设置选中状态
      if (this.$refs.checkbox?.length) {
        this.$refs.checkbox.forEach(checkbox => {
          checkbox.checked = true
        })
      }
    },
    checkNodes(node, tree, checked) {
      const helper = nodes => {
        if (nodes.length === 0) {
          return
        }
        const item = nodes[0]
        if (item.type === '2') {
          const node = tree.getNodeByParam('id', item.id, null)
          if (node) {
            tree.checkNode(node, checked, true, false)
          }
        }
        item.children && helper(item.children)
        helper(nodes.slice(1))
      }
      if (node) {
        helper([node])
      }
    },
    flapTree(arr) {
      let temp = []
      arr.forEach(item => {
        item.type === '2' && temp.push(item)
        if (item.children) {
          temp = temp.concat(this.flapTree(item.children))
        }
      })
      return temp
    }
  }
}
</script>

<style lang="scss" scoped>
#camera-selector {
  .el-dialog__body {
    padding: 5px 15px;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    background-color: #e5e5e5;
  }

  .resources-container {
    display: flex;
    flex-direction: column;
    background: #f2f2f2;

    .search-container {
      padding: 10px 8px 10px 15px;
      display: flex;
      justify-content: space-between;

      .search-btns {
        margin-left: 5px;
        display: flex;

        .searchBtn {
          margin-left: 5px;
          height: 36px;
        }
      }
    }

    .tree-container {
      padding: 10px 8px 10px 15px;
      flex: 1 0 auto;
      height: 400px;
      overflow: auto;

      .ztree {
        height: 100%;

        .button.radio_true_full:after,
        .chk.radio_true_full_focus:after,
        .chk.radio_true_part:after,
        .chk.radio_true_part_focus:after {
          top: 2px;
          left: 2px;
        }

        .button.checkbox_true_part:after,
        .button.checkbox_true_part_focus:after {
          left: 1px;
        }
      }
    }
  }

  .selected-container {
    background: #f2f2f2;
    overflow: auto;

    .el-checkbox__label {
      color: #2d2d2d;
    }

    .selected-cameras {
      padding: 10px 8px 10px 15px;
      height: 456px;
      overflow-x: hidden;
      overflow-y: auto;

      .el-checkbox {
        display: block;
        padding-bottom: 20px;

        &:last-child {
          padding-bottom: 0;
        }
      }

      .el-checkbox__label {
        vertical-align: middle;
      }

      .checkbox-item-text {
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
        overflow: hidden;
        width: 190px;
      }
    }
  }

  .dialog-footer {
    .el-button {
      min-width: 100px;
      margin: 0 90px;
    }
  }

  .el-tabs__header .el-tabs__item {
    background: transparent !important;
  }
}

//定位
.searchedLi {
  cursor: pointer;
  padding: 5px 5px;
  border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    background: #175290;
    color: #fff;
  }

  .camera-name {
    display: inline-block;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.locateIcon {
  position: absolute;
  right: 0;
}

.search-container {
  :deep(.el-input) {
    .el-input__wrapper {
      --el-input-border-color: unset;
      background-color: transparent;

      .el-input__inner {
        height: 36px;
        line-height: 36px;
        border: none;
        color: #000;
      }
    }
  }
}
</style>
<style lang="scss">
#camera-selector .selector-container {

  .el-input .el-input__wrapper,
  .el-input .el-input__inner,
  .el-input__inner {
    background: #f2f2f2 !important;
    border: none;
  }
}

#camera-selector .el-dialog__body {
  padding: 15px !important;
}
</style>
