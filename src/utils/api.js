import { fetch, getFetch, postFetch } from '@/api/service'
//公告详情

export const noticeDetail = (data) => fetch('/uas/v1/api/scs/notice/detail', data)
//通告列表
export const noticeList = (data) => fetch('/uas/v1/api/scs/notice/list', data)
// 人脸轨迹
// export const faceTrack = (data) => fetch('/uas/v1/api/scs/person/face/track', data);
// export const faceTrack = (data) => fetch('/uas/v1/api/sdg/person/face/track', data);

// 字典查询
export const getDictionary = (data) => fetch('/uas/v1/api/udc/assist/dictionary', data)
//获取局点信息
export const getFlavor = (data) => fetch('/uas/v1/api/udc/assist/flavor', data)

export const getName = (data) => fetch('/uas/v1/api/scs/system/info/get', data)
// 登录
// export const login = (data) => digestFetch('/uas/v1/api/user/login', data);
// 获取token
export const refreshToken = (data) => postFetch('/uas/v1/api/user/token', data)
// 用户隐私协议
export const getAgreements = (data) => fetch('/uas/v1/api/oba/agreement/get', data)

// 获取产品信息
export const getProductInfo = (data) => fetch('/uas/v1/api/scs/system/product/info', data)
// 获取全局平台信息
export const getSysPlatType = (data) => fetch('/uas/v1/api/udc/system/accessPlat/info', data)

//获取验证码
// export const captcha = (data) => digestFetch('/uas/v1/api/captcha', data);
export const captcha = (data) => fetch('/uas/v1/api/captcha', data)
// 获取当前用户信息
export const getLoginUserInfo = (data) => fetch('/uas/v1/api/udc/login/user', data)

// 查询菜单
// export const selectMenus = (data) => fetch('/uas/v1/api/udc/management/menus', data);
export const selectMenus = (data) => fetch('/uas/v1/api/udc/management/menus', data)
// 查询菜单权限
// export const selectMenuPerms = (data) => fetch('/uas/v1/api/udc/management/perms', data);
export const selectMenuPerms = (data) => fetch('/uas/v1/api/udc/management/perms', data)
// 查询用户权限列表
export const selectUserPermissions = (data) => fetch('/uas/v1/api/udc/management/use/perms', data)

// 修改密码
export const modifyPassword = (data) => fetch('/uas/v1/api/udc/management/passwd', data)

// 版权&备案
export const getCopyrightRecord = (data) => fetch('/uas/v1/api/oba/copyrightrecord/get', data)

// 设备名称
export const getDeviceName = (data) => fetch('/uas/v1/api/scs/device/name', data)

// 实况轨迹

export const getTrackList = (data) => fetch('/uas/v1/api/scs/track/list', data)

export const getDecive = (data) => fetch('/uas/v1/api/mscs/device/fence/list', data)
export const getRecentAlarmList = (data) => fetch('/uas/v1/api/alarm/recent', data)
export const dealAlarm = (data) => fetch('/uas/v1/api/alarm/dealAlarm', data)

//元数据列表
export const getMetadataList = (data) => fetch('/uas/v1/api/ars/metadata/list', data)
/*
    密码管理模块调用接口
*/
// 获取系统密码配置
export const getConfiguration = (data) => fetch('/uas/v1/api/config/password/info', data)
// 配置系统密码规则
export const setConfiguration = (data) => fetch('/uas/v1/api/config/password/modify', data)
// 密码复杂度规则获取
export const getPasswordComplex = (data) => fetch('/uas/v1/api/config/password/complex', data)

/*
    账号管理模块调用接口
*/
// 获取系统账户配置
export const getConfigurationAcc = (data) => fetch('/uas/v1/api/config/account/info', data)
// 配置系统账户规则
export const setConfigurationAcc = (data) => fetch('/uas/v1/api/config/account/modify', data)

/*
    组织管理模块调用接口
*/
// 添加组织
export const addOrganizationInfo = (data) => fetch('/uas/v1/api/udc/organization/add', data)
// 修改组织
export const modifyOrganizationInfo = (data) => fetch('/uas/v1/api/udc/organization/modify', data)
// 删除组织
export const deleteOrganizationInfo = (data) => fetch('/uas/v1/api/udc/organization/delete', data)
// 获取组织列表
// export const selectOrganizations = (data) => fetch('/uas/v1/api/udc/organization/list', data);
// 获取组织树
export const getOrganizationTree = (data) => fetch('/uas/v1/api/udc/organization/tree', data)
// 获取单个用户信息
export const getOrganizationInfo = (data) => fetch('/uas/v1/api/udc/organization/info', data)

/*
   白名单调用接口
*/
// 查询账户IP白名单列表
export const getWhiteIpList = (data) => fetch('/uas/v1/api/account/whiteIp/list', data)
// 开启/关闭用户IP白名单
export const enbale = (data) => fetch('/uas/v1/api/account/whiteIp/enable', data)
// 添加用户IP白名单
export const addWhiteIpInfo = (data) => fetch('/uas/v1/api/account/whiteIp/add', data)
// 删除用户IP白名单
export const deleteWhiteIpInfo = (data) => fetch('/uas/v1/api/account/whiteIp/delete', data)

/*
    用户管理模块调用接口
*/
// 添加用户
export const addUserInfo = (data) => fetch('/uas/v1/api/udc/user/add', data)
// 修改用户
export const modifyUserInfo = (data) => fetch('/uas/v1/api/udc/user/modify', data)
// 删除用户
export const deleteUserInfo = (data) => fetch('/uas/v1/api/udc/user/delete', data)
// 获取用户列表
export const getUserList = (data) => fetch('/uas/v1/api/udc/user/list', data)
// 获取单个用户信息
export const getUserInfo = (data) => fetch('/uas/v1/api/udc/user/info', data)
// 下载导入用户模板
export const getUserTemplate = (data) => fetch('/uas/v1/api/udc/user/template', data)
// 批量导入用户
export const importUserInfo = (data) => fetch('/uas/v1/api/udc/user/import', data)
// 设置用户Logo和登录背景
export const setUserLogo = (data) => fetch('/uas/v1/api/udc/user/logo/set', data)
// 启用/停用用户
export const enableUser = (data) => fetch('/uas/v1/api/udc/user/enable', data)

/*
   查询用户树
*/
// export const getUserTree = (data) => fetch('/uas/v1/api/udc/user/tree', data);

/*
    管理员管理模块调用接口
*/
// 添加管理员
export const addAdminInfo = (data) => fetch('/uas/v1/api/udc/admin/add', data)
// 修改管理员
export const modifyAdminInfo = (data) => fetch('/uas/v1/api/udc/admin/modify', data)
// 删除管理员
export const deleteAdminInfo = (data) => fetch('/uas/v1/api/udc/admin/delete', data)
// 获取管理员列表
export const getAdminList = (data) => fetch('/uas/v1/api/udc/admin/list', data)
// 获取单个管理员信息
export const getAdminInfo = (data) => fetch('/uas/v1/api/udc/admin/info', data)
// 启用/停用管理员
export const enableAdmin = (data) => fetch('/uas/v1/api/udc/admin/enable', data)
/*
    角色管理模块调用接口
*/
// 添加角色
export const addRoleInfo = (data) => fetch('/uas/v1/api/udc/role/add', data)
// 修改角色
export const modifyRoleInfo = (data) => fetch('/uas/v1/api/udc/role/modify', data)
// 删除角色
export const deleteRoleInfo = (data) => fetch('/uas/v1/api/udc/role/delete', data)
// 获取角色列表
export const selectRoles = (data) => fetch('/uas/v1/api/udc/role/list', data)
// 获取单个角色信息
export const getRoleInfo = (data) => fetch('/uas/v1/api/udc/role/info', data)

/*
    租户管理模块调用接口
*/
// 添加租户
export const addTenantInfo = (data) => fetch('/uas/v1/api/udc/tenant/add', data)
// 修改租户
export const modifyTenantInfo = (data) => fetch('/uas/v1/api/udc/tenant/modify', data)
// 删除租户
export const deleteTenantInfo = (data) => fetch('/uas/v1/api/udc/tenant/delete', data)
// 获取租户列表
export const getTenantList = (data) => fetch('/uas/v1/api/udc/tenant/list', data)
// 获取单个租户信息
export const getTenantInfo = (data) => fetch('/uas/v1/api/udc/tenant/info', data)
// 下载导入租户模板
export const getTenantTemplate = (data) => fetch('/uas/v1/api/udc/tenant/template', data)
// 批量导入租户
export const importTenantInfo = (data) => fetch('/uas/v1/api/udc/tenant/import', data)
// 设置租户Logo和登录背景
export const setTenantLogo = (data) => fetch('/uas/v1/api/udc/tenant/logo/set', data)
// 启用/停用租户
export const enableTenant = (data) => fetch('/uas/v1/api/udc/tenant/enable', data)
// 添加租户esop客户映射关系
export const bindEsopClinet = (data) => fetch('/uas/v1/api/oba/esop/bindEsopClient', data)
// 修改租户esop客户映射关系
export const updateEsopClinetTenantMap = (data) => fetch('/uas/v1/api/oba/esop/updateEsopClinetTenantMap', data)
// 获取esop绑定信息
export const getEsopClinetTenantMap = (data) => fetch('/uas/v1/api/oba/esop/getEsopClinetTenantMap', data)

/*
    设备管理模块调用接口
*/
// 添加设备
export const addMainDevInfo = (data) => fetch('/uas/v1/api/uvs/main-dev/add', data)
// 添加设备时设置录像策略
export const setRecordPolicyInfoByMainDevId = (data) =>
  fetch('/uas/v1/api/uvs/camera/record-policy/set-by-mainDev', data)
// 添加设备（运营商）
export const addMainDeviceOperator = (data) => fetch('/uas/v1/api/oba/main-dev/operator/add', data)
// 修改设备
export const modifyMainDevInfo = (data) => fetch('/uas/v1/api/uvs/main-dev/modify', data)
export const updateMainDeviceOperator = (data) => fetch('/uas/v1/api/oba/main-dev/operator/update', data)
// 删除设备
export const deleteMainDevInfo = (data) => fetch('/uas/v1/api/uvs/main-dev/delete', data)
// 获取设备列表
export const getMainDev_operatop_List = (data) => fetch('/uas/v1/api/oba/main-dev/list', data)
export const getMainDevList = (data) => fetch('/uas/v1/api/uvs/main-dev/list', data)
// 主设备运营信息列表查询
export const getMainDeviceOperatorList = (data) => fetch('/uas/v1/api/oba/main-dev/operator/list', data)
// 获取单个设备信息
export const getMainDevInfo = (data) => fetch('/uas/v1/api/uvs/main-dev/info', data)
// 获取域编码
export const getDomainCode = (data) => fetch('/uas/v1/api/uvs/domain/list', data)
// 获取集群编码
export const getClusterCode = (data) => fetch('/uas/v1/api/uvs/cluster/list', data)
// 获取网关ip,编码
export const getTasCode = (data) => fetch('/uas/v1/api/uvs/gateway/list', data)
// 设备所属NVR编码
export const getnvrCode = (data) => fetch('/uas/v1/api/uvs/nvr/list', data)
// // 获取上传地址
// export const DevicegetUploadUrl = (data) => fetch('/uas/v1/api/media/upload/url', data);

// 下载模板
export const getMainDevTemplate = (data) => fetch('/uas/v1/api/uvs/main-dev/template', data)
// 批量导入
export const importMainDevInfo = (data) => fetch('/uas/v1/api/uvs/main-dev/import', data)
// 调拨设备树
export const getAllocateDeviceTree = (data) => fetch('/uas/v1/api/uvs/device/allocate/tree', data)
// 调拨设备
export const allocateDevice = (data) => fetch('/uas/v1/api/uvs/device/allocate/do', data)
// 调拨同步下级设备
export const syncAllocateDevice = (data) => fetch('/uas/v1/api/uvs/device/allocate/sync', data)
// 主设备批量修改维护角色
export const modifyMaintainType = (data) => fetch('/uas/v1/api/oba/main-dev/operator/modify', data)
// 主设备批量维护角色列表查询
export const getMaintainTypeList = (data) => fetch('/uas/v1/api/oba/main-dev/maintaintype/list', data)

/*
    镜头管理模块调用接口
*/
// 添加镜头
export const addCameraInfo = (data) => fetch('/uas/v1/api/uvs/camera/add', data)
// 修改镜头
export const modifyCameraInfo = (data) => fetch('/uas/v1/api/uvs/camera/modify', data)
// 删除镜头
export const deleteCameraInfo = (data) => fetch('/uas/v1/api/uvs/camera/delete', data)
// 获取镜头列表
export const getCameraList = (data) => fetch('/uas/v1/api/uvs/camera/list', data)
// 获取单个镜头信息
export const getCameraInfo = (data) => fetch('/uas/v1/api/uvs/camera/info', data)
// 获取镜头状态
export const syncCameraStatus = (data) => fetch('/uas/v1/api/uvs/camera/status/sync', data)
// 获取主设备下摄像机列表查询信息
export const getCameraListByMainDevId = (data) => fetch('/uas/v1/api/uvs/camera/list-by-main-dev', data)
// 停用摄像机
export const enableCamera = (data) => fetch('/uas/v1/api/uvs/camera/enable', data)
// 停用摄像机录像
export const enableCameraRecord = (data) => fetch('/uas/v1/api/uvs/camera/record/enable', data)
// 镜头批量录像策略设置
export const batchSetCameraRecordPolicyInfo = (data) => fetch('/uas/v1/api/uvs/camera/record-policy/batch-set', data)
// 导出摄像机信息
export const exportCameraInfo = (data) => fetch('/uas/v1/api/uvs/camera/export', data)
// 下载导入摄像机GIS模板
export const getCameraGisTemplate = (data) => fetch('/uas/v1/api/uvs/camera/gis/template', data)

// 下载导入摄像机GIS模板
export const importCameraGisInfo = (data) => fetch('/uas/v1/api/uvs/camera/gis/import', data)
// 摄像机抓拍数据订阅
export const subscribeCameraDatas = (data) => fetch('/uas/v1/api/uvs/camera/data/subscribe/', data)
// 媒体转码
// 获取转码模板
export const queryTemplateList = (data) => fetch('/uas/v1/api/media/template/list', data)
// 添加转码模板
export const addTemplate = (data) => fetch('/uas/v1/api/media/template/add', data)
// 修改转码模板
export const modifyTemplate = (data) => fetch('/uas/v1/api/media/template/modify', data)
// 删除转码模板
export const delTemplate = (data) => fetch('/uas/v1/api/media/template/delete', data)
// 单个转码模板信息
export const getTranscodeTemplateById = (data) => fetch('/uas/v1/api/media/template/get', data)

// 创建镜头转码任务
export const createCameraTranscode = (data) => fetch('/uas/v1/api/media/camera/transcode/create', data)
// 获取镜头转码任务列表
export const getCameraTranscodeTasks = (data) => fetch('/uas/v1/api/media/camera/transcode/list', data)
// 暂停转码任务
export const delCameraTranscodeTasks = (data) => fetch('/uas/v1/api/media/camera/transcode/delete', data)
// 单个转码任务信息
export const getTranscodeTaskInfo = (data) => fetch('/uas/v1/api/media/camera/transcode/get', data)
//停止镜头转码任务
export const stopTranscodeTask = (data) => fetch('/uas/v1/api/media/camera/transcode/list', data)
//删除镜头转码任务
export const CameraTranscodeManageService = (data) => fetch('/uas/v1/api/media/camera/transcode/list', data)
//删除镜头转码任务
export const getCameraTranscodeTask = (data) => fetch('/uas/v1/api/media/camera/transcode/delete', data)
//创建直播流转码任务
export const createLiveTranscode = (data) => fetch('/uas/v1/api/media/live/transcode/create', data)
//删除直播流转码任务
export const deleteTranscode = (data) => fetch('/uas/v1/api/media/live/transcode/delete', data)
//查询直播流转码任务详情
export const getTranscodeDetail = (data) => fetch('/uas/v1/api/media/live/transcode/detail', data)
//离线文件转码
export const startVideoTranscode = (data) => fetch('/uas/v1/api/media/video/transcode/start', data)
//取消或删除离线文件转码
export const deleteVideoTranscode = (data) => fetch('/uas/v1/api/media/video/transcode/cancel', data)
//查询离线文件转码详情
export const getVideoTranscodeDetail = (data) => fetch('/uas/v1/api/media/video/transcode/detail', data)
//离线文件转码任务回调

// onenet配置
// 获取onenet下的产品信息
export const getOnenetProductList = (data) => fetch('/uas/v1/api/oba/onenet/product/list', data)
// 获取产品下的设备列表信息
export const getOnenetDeviceList = (data) => fetch('/uas/v1/api/oba/onenet/device/list', data)
// onenet设备绑定镜头
export const addOnetConfig = (data) => fetch('/uas/v1/api/oba/onenet/config/add', data)
// 镜头onenet配置查询
export const getOnenetConfig = (data) => fetch('/uas/v1/api/oba/onenet/config/get', data)

// 运营管理
// 域列表
export const syncAllPlat = (data) => fetch('/uas/v1/api/oba/domain/sync', data)
// 域列表
export const getDomainList = (data) => fetch('/uas/v1/api/oba/domain/list', data)
// 域删除
export const deleteDomainInfo = (data) => fetch('/uas/v1/api/oba/domain/delete', data)
//查看单个域下集群列表
export const deleteClusterInfo = (data) => fetch('/uas/v1/api/oba/cluster/delete', data)
//集群删除
export const getClusterList = (data) => fetch('/uas/v1/api/oba/cluster/list', data)
//集群（取消）支持存储
export const modifyClusterStorage = (data) => fetch('/uas/v1/api/oba/cluster/storage/modify', data)
//查看单个集群下网关列表
export const getGatewayList = (data) => fetch('/uas/v1/api/oba/gateway/list', data)
//网关删除
export const deleteGatewayInfo = (data) => fetch('/uas/v1/api/oba/gateway/delete', data)
// 配置网关
export const modifyGatewayConf = (data) => fetch('/uas/v1/api/oba/gateway/configure/modify', data)
//分配集群列表
export const getClusterByOrgId = (data) => fetch('/uas/v1/api/oba/cluster/organization/list', data)
//查询地区平台尚未被分配的集群
export const getClusterByOrganizationPlat = (data) => fetch('/uas/v1/api/oba/cluster/organizationplat/list', data)
//查询地区在该集群尚未分配的网关
export const getGatewayByOrganizationPlat = (data) => fetch('/uas/v1/api/oba/gateway/organizationplat/list', data)
//分配集群信息
export const addOrganizationGateway = (data) => fetch('/uas/v1/api/oba/gateway/organization/add', data)
//取消集群信息
export const delOrganizationGateway = (data) => fetch('/uas/v1/api/oba/gateway/organization/delete', data)
//Boss开通（不）使用
export const modifyBossTag = (data) => fetch('/uas/v1/api/oba/cluster/bosstag/modify', data)
/*
    监控平台管理模块调用接口
    告警类型管理模块调用接口
*/
//查询告警级别列表
export const listAlarmLevelByPage= (data) => fetch('/uas/v1/api/ecs/alarm/level/list/page', data)
// 导出告警中心数据
export const exportAlarm = (data) => fetch('/uas/v1/api/alarm/export', data)
// 查询告警类型信息
export const getAlarmTypes = (data) => fetch('/uas/v1/api/alarm/type/list', data)
//新的告警类型信息
export const getAlarmNewTypes = (data) => fetch('/uas/v1/api/alarmtype/list', data)
// 添加告警类型信息
export const addAlarmType = (data) => fetch('/uas/v1/api/alarm/type/add', data)
// 修改告警类型信息
export const modifyAlarmType = (data) => fetch('/uas/v1/api/alarm/type/modify', data)
// 启停用告警类型信息
export const enableAlarmType = (data) => fetch('/uas/v1/api/alarm/type/enable', data)
//  告警组查询
export const getGroups = (data) => fetch('/uas/v1/api/alarm/group/list', data)
//  根据告警类型码查询告警信息
export const getAlarmType = (data) => fetch('/uas/v1/api/alarm/type/info', data)
export const getAlarmTypeGroup = (data) => fetch('/uas/v1/api/alarm/group/query', data)
//告警趋势
export const getAlarmTypeTrend = (data) => fetch('/uas/v1/api/scs/alarm/trend', data)
//告警频发地点
export const getAlarmFrequentPlace = (data) => fetch('/uas/v1/api/scs/alarm/frequent-place', data)
//告警处理情况统计
export const alarmHandelMode = (data) => fetch('/uas/v1/api/scs/stat/alarm-handel-mode', data)
/*
    告警联动管理模块调用接口
*/
// 添加告警联动策略
export const addLinkagePolicyInfo = (data) => fetch('/uas/v1/api/ecs/alarm/linkage/add', data)
// 修改告警联动策略
export const modifyLinkagePolicyInfo = (data) => fetch('/uas/v1/api/ecs/alarm/linkage/modify', data)
// 删除告警联动策略
export const deleteLinkagePolicyInfo = (data) => fetch('/uas/v1/api/ecs/alarm/linkage/delete', data)
// 查询告警联动列表
export const getLinkagePolicyList = (data) => fetch('/uas/v1/api/ecs/alarm/linkage/list', data)
// 获取告警联动策略信息
export const getLinkagePolicyInfo = (data) => fetch('/uas/v1/api/ecs/alarm/linkage/info', data)
// 短信模板列表查询
export const getSmsTemplateList = (data) => fetch('/uas/v1/api/mgw/sms/template/list', data)
// 添加短信模板
export const addSmsTemplateInfo = (data) => fetch('/uas/v1/api/mgw/sms/template/add', data)
// 修改短信模板
export const modifySmsTemplateInfo = (data) => fetch('/uas/v1/api/mgw/sms/template/modify', data)
// 删除短信模板
export const deleteSmsTemplateInfo = (data) => fetch('/uas/v1/api/mgw/sms/template/delete', data)
// 单个短信模板信息查询
export const getSmsTemplateInfo = (data) => fetch('/uas/v1/api/mgw/sms/template/info', data)
// 查询告警联动动作类型列表
export const getLinkageActionTypeList = (data) => fetch('/uas/v1/api/ecs/alarm/linkage/action-type/list', data)
// 查询邮件模板列表
export const getMailTemplateByType = (data) => fetch('/uas/v1/api/mgw/mail/template/getMailTemplateByType', data)
// 查询微信模板列表
export const searchWeChatTemplate = (data) => fetch('/uas/v1/api/mgw/wechat/template/searchWeChatTemplate', data)

/*
    告警列表查询模块调用接口
*/
// (老接口)
// 获取设备列表请求信息
export const getDevList = (data) => fetch('/uas/v1/api/dev/list', data)
// 获取设备位置
export const getDevPos = (data) => fetch('/uas/v1/api/dev/location/list', data)
//查询组织结构信息
export const getList = (data) => fetch('/uas/v1/api/org/list', data)
//镜头名称模糊查询
export const search = (data) => fetch('/uas/v1/api/camera/search', data)
//获取用户信息
export const getUserInfos = (data) => fetch('/uas/v1/api/user/get', data)

//获取告警信息列表
export const getAlarmList = (data) => fetch('/uas/v1/api/api/alarm/list', data)
// 新的告警列表接口
// export const getAlarmListNew = (data) => fetch('/uas/v1/api/ecs/alarm/list', data);
//获取告警抓拍url
export const getAlarmSnap = (data) => fetch('/uas/v1/api/alarm/snap/get', data)

//智能告警类型分布
export const getTypeDistribution = (data) => fetch('/uas/v1/api/dac/alarm/type', data)

/*
    告警处理模块调用接口
*/
// 告警消息正误检
export const checkAlarmReport = (data) => fetch('/uas/v1/api/alarm/check', data)
// 告警消息确认
// export const confirmAlarm = (data) => fetch('/uas/v1/api/alarm/confirm', data);
//查询告警详情
export const getAlarmById = (data) => fetch('/uas/v1/api/alarm/info', data)

/*
    监控平台管理模块调用接口
*/
// 添加监控平台
export const addPlatformInfo = (data) => fetch('/uas/v1/api/uvs/platform/add', data)
// 监控平台列表查询
export const getPlatformList = (data) => fetch('/uas/v1/api/uvs/platform/list', data)
export const getPlatformQuery = (data) => fetch('/uas/v1/api/uvs/platform/query', data)
// 监控平台信息查询
export const getPlatformInfo = (data) => fetch('/uas/v1/api/uvs/platform/info', data)
// 修改监控平台
export const modifyPlatformInfo = (data) => fetch('/uas/v1/api/uvs/platform/modify', data)
// 删除监控平台
export const deletePlatformInfo = (data) => fetch('/uas/v1/api/uvs/platform/delete', data)

/*
    前端参数配置模块调用接口
*/
// 主设备基础信息查看
export const mainDevBasicInfo = (data) => fetch('/uas/v1/api/uvs/main-dev/basic-info', data)
// 主设备基础信息设置
export const mainDevBasicConfig = (data) => fetch('/uas/v1/api/uvs/main-dev/basic-config', data)
// 主设备网络参数查看
export const mainDevNetworkInfo = (data) => fetch('/uas/v1/api/uvs/main-dev/network-info', data)
// 主设备网络参数设置
export const mainDevNetworkConfig = (data) => fetch('/uas/v1/api/uvs/main-dev/network-config', data)
// 摄像机基础信息查看
export const cameraBasicInfo = (data) => fetch('/uas/v1/api/uvs/camera/basic-info', data)
// 摄像机基础信息设置
export const cameraBasicConfig = (data) => fetch('/uas/v1/api/uvs/camera/basic-config', data)
// 视频编码查看
export const cameraStreamInfo = (data) => fetch('/uas/v1/api/uvs/camera/stream-info', data)
// 视频编码设置
export const cameraStreamConfig = (data) => fetch('/uas/v1/api/uvs/camera/stream-config', data)
// 图像参数查看
export const cameraDisplayInfo = (data) => fetch('/uas/v1/api/uvs/camera/display-info', data)
// 图像参数设置
export const cameraDisplayConfig = (data) => fetch('/uas/v1/api/uvs/camera/display-config', data)
// OSD参数查看
export const cameraOSDInfo = (data) => fetch('/uas/v1/api/uvs/camera/osd-info', data)
// OSD参数设置
export const cameraOSDConfig = (data) => fetch('/uas/v1/api/uvs/camera/osd-config', data)
// 前端抓拍参数查看
export const cameraSnapInfo = (data) => fetch('/uas/v1/api/uvs/camera/snap-info', data)
// 前端抓拍参数设置
export const cameraSnapConfig = (data) => fetch('/uas/v1/api/uvs/camera/snap-config', data)
// 前端串口参数查看
export const cameraSerialInfo = (data) => fetch('/uas/v1/api/uvs/camera/serial-info', data)
// 前端串口参数设置
export const cameraSerialConfig = (data) => fetch('/uas/v1/api/uvs/camera/serial-config', data)
// 前端云台参数查看
export const cameraPTZInfo = (data) => fetch('/uas/v1/api/uvs/camera/ptz-info', data)
// 前端云台参数设置
export const cameraPTZConfig = (data) => fetch('/uas/v1/api/uvs/camera/ptz-config', data)
// 前端重启
export const resetDevice = (data) => fetch('/uas/v1/api/uvs/device/reset', data)
// 前端视频遮挡告警查看
export const cameraOcclusionInfo = (data) => fetch('/uas/v1/api/uvs/camera/occlusion-info', data)
// 前端视频遮挡告警设置
export const cameraOcclusionConfig = (data) => fetch('/uas/v1/api/uvs/camera/occlusion-config', data)
// 前端移动侦测查看
export const cameraVmdInfo = (data) => fetch('/uas/v1/api/uvs/camera/vmd-info', data)
// 前端移动侦测设置
export const cameraVmdConfig = (data) => fetch('/uas/v1/api/uvs/camera/vmd-config', data)
// 前端音频参数查看
export const cameraAudioInfo = (data) => fetch('/uas/v1/api/uvs/camera/audio-info', data)
// 前端音频参数设置
export const cameraAudioConfig = (data) => fetch('/uas/v1/api/uvs/camera/audio-config', data)
// 摄像机录像策略查看
export const getCameraRecordPolicyInfo = (data) => fetch('/uas/v1/api/uvs/camera/record-policy/info', data)
// 摄像机录像策略删除
export const deleteCameraRecordPolicyInfo = (data) => fetch('/uas/v1/api/uvs/camera/record-policy/delete', data)

// 日志管理
// 查询日志操作类型
export const getOperationTypeList = (data) => fetch('/uas/v1/api/udc/log/operation/type', data)
// 查询日志记录
export const getLogList = (data) => fetch('/uas/v1/api/udc/log/list', data)
// 导出日志记录
export const exportLogInfo = (data) => fetch('/uas/v1/api/udc/log/export', data)

/*
    任务管理模块调用接口
*/
// 新增任务
export const addTicketInfo = (data) => fetch('/uas/v1/api/tts/ticket/add', data)
// 变更任务
export const updateTicketInfo = (data) => fetch('/uas/v1/api/tts/ticket/update', data)
// 处理&&审核任务
export const dealTicketInfo = (data) => fetch('/uas/v1/api/tts/ticket/deal', data)
// 取消任务
export const deleteTicketInfo = (data) => fetch('/uas/v1/api/tts/ticket/del', data)
// 获取任务列表
export const getTicketList = (data) => fetch('/uas/v1/api/tts/ticket/list', data)
// 搜索任务
export const selectTicketList = (data) => fetch('/uas/v1/api/tts/ticket/select', data)
// 获取操作历史列表
export const getOperationList = (data) => fetch('/uas/v1/api/tts/ticket/operationList', data)
// 获取人员列表
// export const getPersonList = (data) => fetch('/uas/v1/api/tts/ticket/personList', data);
// 获取事件类型
export const getEventTypeList = (data) => fetch('/uas/v1/api/tts/ticket/eventList', data)

// 告警用设备树

//设备树的模糊查询
export const searchInDeviceTree = (data) => fetch('/uas/v1//api/udc/device/search', data)
//用户设备或设备组定位
export const locateInDeviceTree = (data) => fetch('/uas/v1//api/udc/device/locate', data)
// 获取当月告警概况
export const getAlarmSituation = (data) => fetch('/uas/v1/api/dac/alarm/survey', data)
export const getAlarmStatistics = (data) => fetch('/uas/v1/api/tts/ticket/alarm/statistics', data)
// 获取当月告警处理
export const getConfirmDistribution = (data) => fetch('/uas/v1/api/dac/alarm/confirm', data)
// 智能告警设备分析
export const getDevDistribution = (data) => fetch('/uas/v1/api/dac/alarm/dev', data)

//获取上传地址
export const getUploadUrl = (data) => fetch('/uas/v1/api/media/upload/url', data)

//获取文件下载url
export const getDownloadUrl = (data) => fetch('/uas/v1/api/media/download/url', data)

// 吸烟列表
export const getSmokeInfoList = (data) => fetch('/uas/v1/api/scs/smoke/info/list', data)

// 任务统计
export const getTaskStatistics = (data) => fetch('/uas/v1/api/tts/ticket/task/statistics', data)

////录像计划管理
//录像计划列表查看
export const getRecordPlanList = (data) => fetch('/uas/v1/api/uvs/record-plan/list', data)
//录像计划添加
export const addRecordPlanInfo = (data) => fetch('/uas/v1/api/uvs/record-plan/add', data)
//录像计划修改
export const modifyRecordPlanInfo = (data) => fetch('/uas/v1/api/uvs/record-plan/modify', data)
//录像计划删除
export const deleteRecordPlanInfo = (data) => fetch('/uas/v1/api/uvs/record-plan/delete', data)
//录像计划查询
export const getRecordPlanInfo = (data) => fetch('/uas/v1/api/uvs/record-plan/info', data)

// 摄像机录像策略设置
export const setCameraRecordPolicyInfo = (data) => fetch('/uas/v1/api/uvs/camera/record-policy/set', data)

//租户设备分享
//查询租户设备树
export const getTenantTree = (data) => fetch('/uas/v1/api/udc/tenant/tree', data)
//查询共享设备树
export const getShareDeviceTree = (data) => fetch('/uas/v1/api/udc/device/share/tree', data)
//查询租户共享组织详情
export const getTenantShareDetail = (data) => fetch('/uas/v1/api/udc/device/share/detail', data)
//共享分配设备
export const shareDeviceToTenant = (data) => fetch('/uas/v1/api/udc/device/share/do', data)
//模糊查询搜索共享设备
export const searchInShareDeviceTree = (data) => fetch('/uas/v1/api/udc/device/share/search', data)
//租户共享权限查询
export const getSharedPerms = (data) => fetch('/uas/v1/api/udc/device/share/perm/get', data)
//设置租户共享设备权限
export const setSharedPerms = (data) => fetch('/uas/v1/api/udc/device/share/perm/set', data)

//用户设备分配
//用户已分配设备权限查询
export const getAllocatedPerms = (data) => fetch('/uas/v1/api/udc/device/allocate/perm/get', data)
//用户已分配设备权限设置
export const setAllocatedPerms = (data) => fetch('/uas/v1/api/udc/device/allocate/perm/set', data)
//用户组织分配详情
export const getUserAllocateDetail = (data) => fetch('/uas/v1/api/udc/device/allocate/detail', data)
//用户设备分配
export const allocateDeviceToUser = (data) => fetch('/uas/v1/api/udc/device/allocate/do', data)

//移动共享设备或组
export const MoveSharedDevices = (data) => fetch('/uas/v1/api/udc/device/share/move', data)

//获取实时浏览地址
export const getLiveUrl = (data) => fetch('/uas/v1/api/media/live', data)

// 轮巡管理
// 轮巡任务列表
export const getTurningList = (data) => fetch('/uas/v1/api/uvs/turning/list', data)
// 查询单个轮巡任务
export const getTurningInfo = (data) => fetch('/uas/v1/api/uvs/turning/info', data)
// 轮巡任务添加
export const addTurningInfo = (data) => fetch('/uas/v1/api/uvs/turning/add', data)
// 轮巡任务修改
export const modifyTurningInfo = (data) => fetch('/uas/v1/api/uvs/turning/modify', data)
// 轮巡任务删除
export const deleteTurningInfo = (data) => fetch('/uas/v1/api/uvs/turning/delete', data)
// 轮巡组添加
export const addTurningGroupInfo = (data) => fetch('/uas/v1/api/uvs/turning/group/add', data)
// 轮巡组修改
export const modifyTurningGroupInfo = (data) => fetch('/uas/v1/api/uvs/turning/group/modify', data)
// 轮巡组删除
export const deleteTurningGroupInfo = (data) => fetch('/uas/v1/api/uvs/turning/group/delete', data)
// 轮巡组下摄像机添加
export const addTurningCameraInfo = (data) => fetch('/uas/v1/api/uvs/turning/camera/add', data)
// 轮巡组下摄像机修改
export const modifyTurningCameraInfo = (data) => fetch('/uas/v1/api/uvs/turning/camera/modify', data)
// 轮巡组下摄像机删除
export const deleteTurningCameraInfo = (data) => fetch('/uas/v1/api/uvs/turning/camera/delete', data)
// 查询预置位
export const getPreset = (data) => fetch('/uas/v1/api/preset/get', data)
export const getPresetId = (data) => fetch('/uas/v1/api/ecs/alarm/preset-id/get', data)

//获取用户树
export const getUserTree = (data) => fetch('/uas/v1/api/udc/user/tree', data)

//获取方位角
export const getAngle = (data) => fetch('/uas/v1/api/tts/ticket/azimuth', data)
export const getAlarmAzimuth = (data) => fetch('/uas/v1/api/oba/camera/alarm-position/get', data)
// export const getAlarmAzimuth = (data) => fetch('/uas/v1/api/alarm/camera/azimuth', data);

//抓拍管理
export const getSnapList = (data) => fetch('/uas/v1/api/snap/list', data)

//录像下载
export const getVideoRecord = (data) => fetch('/uas/v1/api/record/list', data)

/*
   报表统计
*/
// 首页各地市发展情况 | 驾驶舱地市摄像机达到排名
export const getDeviceAreaTotal = (data) => fetch('/uas/v1/api/dac/device/area/total', data)
// 首页top10
export const getAppDeviceTotalStat = (data) => fetch('/uas/v1/api/dac/device/app/total', data)

// 驾驶舱
// 用户数按月统计（驾驶舱）
export const getMonthlyUserNumStat = (data) => fetch('/uas/v1/api/dac/user/number/monthly', data)
// 设备数按月统计（驾驶舱）
export const getMonthlyDeviceNumStat = (data) => fetch('/uas/v1/api/dac/device/number/monthly', data)
// 查询设备应用分类统计（驾驶舱）
export const getAppDeviceNumStat = (data) => fetch('/uas/v1/api/dac/device/number/application', data)
// 查询设备厂商分类统计（驾驶舱）
export const getVendorDeviceNumStat = (data) => fetch('/uas/v1/api/dac/device/number/vendor', data)

// 查询驾驶舱在线率统计（驾驶舱）
export const getRealOnlineRateStat = (data) => fetch('/uas/v1/api/dac/onoffline/real/online/rate', data)
// 查询驾驶舱集群使用情况（驾驶舱）
export const getDomainDetail = (data) => fetch('/uas/v1/api/dac/domain/detail', data)
// 查询驾驶舱实时业务统计（驾驶舱）
export const getRealUsageStat = (data) => fetch('/uas/v1/api/dac/usage/realtime/stat', data)
// 查询各地市业务发展统计（驾驶舱）
export const getAreaGrowthStat = (data) => fetch('/uas/v1/api/dac/area/growth/stat', data)
// 获取区域实时概况统计（驾驶舱）
export const getAreaRealStat = (data) => fetch('/uas/v1/api/dac/area/real/stat', data)

// 获取区域列表
export const getAreaChild = (data) => fetch('/uas/v1/api/dac/area/child/list', data)
// 获取区域列表(一次性获取全部数据)
export const getAreaChildAll = (data) => fetch('/uas/v1/api/dac/area/all-area', data)
// 获取区域编码
export const getAreaCode = (data) => fetch('/uas/v1/api/udc/organization/info', data)
// 用户开通统计查询----
// 查询用户开通统计(按月)
export const getMonthUserOpenStat = (data) => fetch('/uas/v1/api/dac/user/stat/survey', data)
// 查询用户开通统计(按区域)
export const getAreaUserOpenStat = (data) => fetch('/uas/v1/api/dac/user/stat/area', data)
// 查询用户开通统计(按行业)
export const getAppUserOpenStat = (data) => fetch('/uas/v1/api/dac/user/stat/industry', data)
// 用户开通详情
export const getUserIncreaseDetail = (data) => fetch('/uas/v1/api/dac/user/open/detail', data)
// 用户退订详情
export const getUserDecreaseDetail = (data) => fetch('/uas/v1/api/dac/user/cancel/detail', data)
// 查询用户开通月度增长统计(按区域)
export const getAreaUserMonthlyIncreaseStat = (data) => fetch('/uas/v1/api/dac/user/stat/monthly', data)
// 导出用户开通销户详情
export const exportUserInDecreaseDetail = (data) => fetch('/uas/v1/api/dac/user/export/indecrease/detail', data)
// 导出用户开通统计(按区域)
export const exportAreaUserOpenStat = (data) => fetch('/uas/v1/api/dac/user/export/area/user/open', data)
// 导出用户开通统计(按行业)
export const exportAppUserOpenStat = (data) => fetch('/uas/v1/api/dac/user/export/app/user/open', data)

// 设备开通统计查询----
// 查询设备开通统计(月增长)
export const getMonthDeviceOpenStat = (data) => fetch('/uas/v1/api/dac/device/month/stat', data)
// 查询设备开通统计(按区域)
export const getAreaDeviceOpenStat = (data) => fetch('/uas/v1/api/dac/device/area/stat', data)
// 导出设备开通统计(按区域)
export const exportDeviceAreaOpentStat = (data) => fetch('/uas/v1/api/dac/device/area/export', data)
// 查询设备开通统计(按应用)
export const getAppDeviceOpenStat = (data) => fetch('/uas/v1/api/dac/device/application/stat', data)
// 导出设备开通统计(按应用)
export const exportAppDeviceOpenStat = (data) => fetch('/uas/v1/api/dac/device/app/export', data)
// 设备开通详细信息
export const getCameraIncreaseDetail = (data) => fetch('/uas/v1/api/dac/device/open/detail', data)
// 设备销户详细信息
export const getCameraDecreaseDetail = (data) => fetch('/uas/v1/api/dac/device/decrease/detail', data)
// 导出设备开销户详情
export const exportCameraIndecreaseDetail = (data) => fetch('/uas/v1/api/dac/device/indecrease/export', data)
// 设备开通月增长趋势（按区域）
export const getAreaMonthlyIncreaseDetail = (data) => fetch('/uas/v1/api/dac/device/area/monthlyIncreaseDetail', data)
// 查询设备开通统计（按区域和应用）
export const getAreaApplicationDeviceTotal = (data) => fetch('/uas/v1/api/dac/device/area/app/stat', data)
// 平台域列表查看
export const getDomainLists = (data) => fetch('/uas/v1/api/oba/domain/list', data)

// 设备在线离线统计查询----
// 查询镜头真实在线统计 | 查询驾驶舱实时在线统计
export const getAreaRealOnlineRateStat = (data) => fetch('/uas/v1/api/dac/onoffline/real/stat', data)
// 导出摄像机实时在线率统计
export const exportAreaRealOnlineStat = (data) => fetch('/uas/v1/api/dac/onoffline/real/export', data)
// 查询摄像机频繁上下线统计(按区域)
export const getAreaOftenOnOfflineStat = (data) => fetch('/uas/v1/api/dac/onoffline/often/stat/area', data)
// 查询摄像机频繁上下线统计(按次数)
export const getLongOfflineStatByCounts = (data) => fetch('/uas/v1/api/dac/onoffline/often/stat/count', data)
// 查询摄像机频繁上下线详情
export const getOftenOnOfflineDetail = (data) => fetch('/uas/v1/api/dac/onoffline/often/detail', data)
// 导出摄像机频繁上下线详情
export const exportOftenOnOfflineDetail = (data) => fetch('/uas/v1/api/dac/onoffline/often/export', data)
// 查询摄像机长期离线统计(按区域)
export const getAreaLongOfflineStat = (data) => fetch('/uas/v1/api/dac/onoffline/long/stat/area', data)
// 查询摄像机长期离线统计(按天数)
export const getDayLongOfflineStat = (data) => fetch('/uas/v1/api/dac/onoffline/long/stat/day', data)
// 查询摄像机长期离线详情
export const getLongOfflineDetail = (data) => fetch('/uas/v1/api/dac/onoffline/long/detail', data)
// 导出摄像机长期离线详情
export const exportLongOfflineDetail = (data) => fetch('/uas/v1/api/dac/onoffline/long/export', data)
// 查询摄像机历史在线率统计(按区域)
export const getAreaOnlineRateStat = (data) => fetch('/uas/v1/api/dac/onoffline/history/stat/area', data)
// 查询摄像机历史在线率统计
export const getOnlineRateStat = (data) => fetch('/uas/v1/api/dac/onoffline/history/survey', data)
// 查询摄像机在线率详情
export const getOnlineRateDetail = (data) => fetch('/uas/v1/api/dac/onoffline/history/detail', data)
// 导出摄像机在线率详情
export const exportOnlineRateDetail = (data) => fetch('/uas/v1/api/dac/onoffline/history/export', data)
// 查询摄像机每日在线率详情(按天)
export const getDailyOnlineRateDetail = (data) => fetch('/uas/v1/api/dac/onoffline/history/stat/day', data)
// 查询摄像机每日上下线明细
export const getDailyOnOffDetail = (data) => fetch('/uas/v1/api/dac/onoffline/history/event/detail', data)

// 用户业务统计查询----
// 查询用户登录详情
export const getLoginStat = (data) => fetch('/uas/v1/api/dac/usage/login/stat', data)
// 查询实时视频详情
export const getLiveStat = (data) => fetch('/uas/v1/api/dac/usage/live/stat', data)
// 查询录像回放详情
export const getRecordPlayStat = (data) => fetch('/uas/v1/api/dac/usage/record/play/stat', data)
// 查询录像下载详情
export const getRecordDownStat = (data) => fetch('/uas/v1/api/dac/usage/record/down/stat', data)
// 查询云镜控制详情
export const getPtzControlStat = (data) => fetch('/uas/v1/api/dac/usage/ptz/control/stat', data)
// 查询抓拍详情
export const getSnapStat = (data) => fetch('/uas/v1/api/dac/usage/snap/stat', data)
// 查询用户业务使用详情
export const getUsageStatDetail = (data) => fetch('/uas/v1/api/dac/usage/detail/get', data)
// 导出用户业务使用详情
export const exportUsageStatDetail = (data) => fetch('/uas/v1/api/dac/usage/detail/export', data)
// 查询第三方业务使用详情
export const getThirdUsageStatDetail = (data) => fetch('/uas/v1/api/dac/third/usage/detail/get', data)
// 导出第三方业务使用详情
export const exportThirdUsageStatDetail = (data) => fetch('/uas/v1/api/dac/third/usage/detail/export', data)

// 录像完整性
// 查询录像策略完整性分布信息
export const getRecordIntegralityDistributionStat = (data) =>
  fetch('/uas/v1/api/dac/recordintegrality/distribution', data)
// 查询录像策略分布信息
export const getRecordPlanDistributionStat = (data) =>
  fetch('/uas/v1/api/dac/recordintegrality/distribution/stat', data)
// 查询近七日录像完整性信息
export const getSevenDaysDistribution = (data) =>
  fetch('/uas/v1/api/dac/recordintegrality/sevendays/distribution/stat', data)
// 获取录像完整性详情列表
export const getRecordIntegralityStatDetail = (data) => fetch('/uas/v1/api/dac/recordintegrality/stat/detail', data)
// 导出录像完整性详情列表
export const exportRecordIntegralityStatDetail = (data) => fetch('/uas/v1/api/dac/recordintegrality/stat/export', data)

// 专线开通统计
// 查询专线开通统计(按月)
export const getMonthSplnOpenStat = (data) => fetch('/uas/v1/api/dac/spln/month/stat', data)
// 查询专线开通统计(按区域)
export const getAreaSplnOpenStat = (data) => fetch('/uas/v1/api/dac/spln/area/stat', data)
// 导出专线开通统计(按区域)
export const exportAreaSplnOpenStat = (data) => fetch('/uas/v1/api/dac/spln/area/export', data)
// 专线开通详细信息
export const getSplnIncreaseDetail = (data) => fetch('/uas/v1/api/dac/spln/open/detail', data)
// 专线销户详细信息
export const getSplnDecreaseDetail = (data) => fetch('/uas/v1/api/dac/spln/decrease/detail', data)
// 导出专线开销户详情
export const exportSplnInDecreaseDetail = (data) => fetch('/uas/v1/api/dac/spln/indecrease/export', data)
// 查询专线开通月度增长统计(按区域)
export const getAreaSplnMonthlyIncreaseStat = (data) => fetch('/uas/v1/api/dac/spln/month-increase/area/stat', data)

// 镜头监控管理
// 镜头详情列表页查询
export const getCameraDetail = (data) => fetch('/uas/v1/api/dac/camera-manage/detail', data)
// 下载镜头导入模板
export const downloadCameraDetailTemplate = (data) => fetch('/uas/v1/api/dac/camera-manage/template', data)
// 导入excel
export const importCameraDetail = (data) => fetch('/uas/v1/api/dac/camera-manage/import', data)
// 导出镜头详情
export const exportCameraDetail = (data) => fetch('/uas/v1/api/dac/camera-manage/export/detail', data)
// 批量修改
export const batchUpdateCamera = (data) => fetch('/uas/v1/api/dac/camera-manage/batch-update', data)
// 批量删除
export const batchDeleteCamera = (data) => fetch('/uas/v1/api/dac/camera-manage/batch-delete', data)
// 批量同步(批量添加onenet设备接口)
export const onenetAddDevice = (data) => fetch('/uas/v1/api/dac/camera-manage/onenet-add-camera', data)
// 批量取消同步(批量删除onenet设备接口)
export const onenetDelDevice = (data) => fetch('/uas/v1/api/dac/camera-manage/onenet-delete-camera', data)

// 告警区域维度统计
// 客户业务告警统计(按月)
export const getMonthAlarmStat = (data) => fetch('/uas/v1/api/dac/alarm/stat/month', data)
// 客户业务告警统计(按区域)
export const listAreaAlarmStat = (data) => fetch('/uas/v1/api/dac/alarm/stat/area', data)

// 导出任务相关----
// 获取excel导出任务信息
export const exportTaskInfo = (data) => fetch('/uas/v1/api/dac/export/task/get', data)
// 添加导出任务
export const addExportTask = (data) => fetch('/uas/v1/api/dac/export/task/add', data)
// 删除导出任务
export const deleteExportTask = (data) => fetch('/uas/v1/api/dac/export/task/delete', data)
// 清空导出任务
export const clearExportTask = (data) => fetch('/uas/v1/api/dac/export/task/clear', data)
// 获取导出任务文件下载地址
export const getExportTaskDownloadUrl = (data) => fetch('/uas/v1/api/dac/export/task/url/get', data)

/*
    数据中心
 */
//事件分类
export const getEventClassify = (data) => fetch('/uas/v1/api/tts/event/statistics', data)
// 任务总数
export const getTaskTotal = (data) => fetch('/uas/v1/api/tts/task/statistics', data)

/*
    算法平台管理
 */
//查询算法平台列表
export const getAlgorithmPlatformList = (data) => fetch('/uas/v1/api/ars/platform/list', data)
//添加算法平台
export const addAlgorithmPlatformInfo = (data) => fetch('/uas/v1/api/ars/platform/add', data)
//修改算法平台
export const modifyAlgorithmPlatformInfo = (data) => fetch('/uas/v1/api/ars/platform/modify', data)
//删除算法平台
export const deleteAlgorithmPlatformInfo = (data) => fetch('/uas/v1/api/ars/platform/delete', data)
//查询单个算法平台信息
export const getAlgorithmPlatformInfo = (data) => fetch('/uas/v1/api/ars/platform/info', data)

/*
    算法管理
 */
//查询用户算法列表
export const getAlgorithmList = (data) => fetch('/uas/v1/api/ars/algorithm/list', data)
//查询算法详情
export const getAlgorithmInfo = (data) => fetch('/uas/v1/api/ars/algorithm/info', data)
//创建算法
export const addAlgorithmInfo = (data) => fetch('/uas/v1/api/ars/algorithm/add', data)
//修改算法
export const modifyAlgorithmInfo = (data) => fetch('/uas/v1/api/ars/algorithm/modify', data)
//删除(下线)算法
export const deleteAlgorithmInfo = (data) => fetch('/uas/v1/api/ars/algorithm/delete', data)

/*
    算法分配
 */
//查询可分配给下级租(用)户的算法资源
export const getUnallocatedAlgList = (data) => fetch('/uas/v1/api/ars/algorithm/unallocated/info', data)
//给租(用)户分配算法
export const allocate = (data) => fetch('/uas/v1/api/ars/algorithm/allocate', data)
//查询租户分配给下级租(用)户的算法资源
export const getAllocatedInfo = (data) => fetch('/uas/v1/api/ars/algorithm/allocated/info', data)
//修改租(用)户算法资源
export const modifyAllocateInfo = (data) => fetch('/uas/v1/api/ars/algorithm/allocated/modify', data)
//取消租(用)户算法分配
export const cancel = (data) => fetch('/uas/v1/api/ars/algorithm/allocated/cancel', data)

/*
    实时流任务
 */
//查询任务列表
export const getTaskList = (data) => fetch('/uas/v1/api/ars/task/list', data)
//查询任务信息
export const getTaskInfo = (data) => fetch('/uas/v1/api/ars/task/info', data)
//创建实时流任务
export const addTaskInfo = (data) => fetch('/uas/v1/api/ars/task/add', data)
//修改实时流任务
export const modifyTaskInfo = (data) => fetch('/uas/v1/api/ars/task/modify', data)
//删除实时流任务
export const deleteTaskInfo = (data) => fetch('/uas/v1/api/ars/task/delete', data)
//启动实时流任务
export const startTask = (data) => fetch('/uas/v1/api/ars/task/start', data)
//停止实时流任务
export const stopTask = (data) => fetch('/uas/v1/api/ars/task/stop', data)

/*
    人员库
 */
//查询人员库
export const queryRepositoryList = (data) => fetch('/uas/v1/api/ars/person/repository/list', data)
export const queryVehicleRepositoryList = (data) => fetch('/uas/v1/api/ars/vehicle/repository/list', data)
//创建人员库
export const addRepositoryInfo = (data) => fetch('/uas/v1/api/scs/person/repository/add', data)
//修改人员库
export const modifyRepositoryInfo = (data) => fetch('/uas/v1/api/ars/person/repository/modify', data)
//删除人员库
export const deleteRepositoryInfo = (data) => fetch('/uas/v1/api/ars/person/repository/delete', data)
//查询单个人员库信息
// export const getRepositoryInfo = (data) => fetch('/uas/v1/api/ars/person/repository/info', data);

/*
    人员管理
 */
//添加人员
export const addPersonInfo = (data) => fetch('/uas/v1/api/ars/repository/person/add', data)
//修改人员
export const modifyPersonInfo = (data) => fetch('/uas/v1/api/ars/repository/person/modify', data)
//删除人员
export const deletePersonInfo = (data) => fetch('/uas/v1/api/ars/repository/person/delete', data)
//查询单个人员信息
export const getPersonInfo = (data) => fetch('/uas/v1/api/ars/repository/person/info', data)
//查询人员列表
export const getPersonList_repo = (data) => fetch('/uas/v1/api/ars/repository/person/list', data)
//人员库人员检索
export const searchPerson = (data) => fetch('/uas/v1/api/ars/repository/person/search', data)

// 人员抓拍
export const personCaptureList = (data) => fetch('/uas/v1/uas/v1/api/ars/face/list', data)
// 下载地址
export const downloadFile = (data) => getfetch('/uas/v1/fgw/file/download', data)
// 人员告警列表
// export const getPersonHitList = (data) => getfetch('/uas/v1/api/ars/guard/personhit/list', data);
export const getPersonHitList = (data) => fetch('/uas/v1/api/ars/guard/personhit/list', data)

/*
    车辆库管理
 */
//添加车辆库
export const addRepositoryInfo_car = (data) => fetch('/uas/v1/api/ars/vehicle/repository/add', data)
//修改车辆库
export const modifyPersonInfo_car = (data) => fetch('/uas/v1/api/ars/vehicle/repository/modify', data)
//删除车辆库
export const deletePersonInfo_car = (data) => fetch('/uas/v1/api/ars/vehicle/repository/delete', data)
//查询单个车辆库信息
export const getPersonInfo_car = (data) => fetch('/uas/v1/api/ars/vehicle/repository/info', data)
//查询车辆库列表
export const getPersonList_car = (data) => fetch('/uas/v1/api/scs/vehicle/repository/list', data)

/*
    车辆管理
 */
//添加车辆
export const addVehicleInfo = (data) => fetch('/uas/v1/api/ars/repository/vehicle/add', data)
//修改车辆
export const modifyVehicleInfo = (data) => fetch('/uas/v1/api/ars/repository/vehicle/modify', data)
//删除车辆
export const deleteVehicleInfo = (data) => fetch('/uas/v1/api/ars/repository/vehicle/delete', data)
//查询单个车辆信息
export const getVehicleInfo = (data) => fetch('/uas/v1/api/ars/repository/vehicle/info', data)
//查询车辆列表
// export const getRepositoryList = (data) => fetch('/uas/v1/api/ars/repository/vehicle/list', data);

// 查询车牌抓拍上报数据
export const getVehicleList = (data) => fetch('/uas/v1/api/ars/vehicle/list', data)
// 查询人脸抓拍上报数据
export const getFaceList = (data) => fetch('/uas/v1/api/ars/face/list', data)
// 删除车牌抓拍上报数据
export const delVehicleList = (data) => fetch('/uas/v1/api/ars/vehicle/delete', data)
// 删除人脸抓拍上报数据
export const delFaceList = (data) => fetch('/uas/v1/api/ars/face/delete', data)

export const api = {}

/*
    智慧门店
*/
// 树
export const getShopTree = (data) => fetch('/uas/v1/api/sss/shop/tree', data)
// 店铺列表
export const getShopList = (data) => fetch('/uas/v1/api/sss/shop/list', data)
// 添加店铺
export const addShops = (data) => fetch('/uas/v1/api/sss/shop/add', data)
// 删除店铺
export const removeShop = (data) => fetch('/uas/v1/api/sss/shop/delete', data)
// 修改店铺
export const modifyShop = (data) => fetch('/uas/v1/api/sss/shop/modify', data)

// 店员列表
export const getUsersList = (data) => fetch('/uas/v1/api/sss/user/list', data)
// 新增店员
export const addUser = (data) => fetch('/uas/v1/api/sss/user/add', data)
// 修改店员
export const updateUser = (data) => fetch('/uas/v1/api/sss/user/update', data)
// 删除店员
export const deleteUser = (data) => fetch('/uas/v1/api/sss/user/delete', data)
// 删除店员
export const getUsersInfo = (data) => fetch('/uas/v1/api/sss/user/info', data)

// 获取未分配镜头(根据管理员获取镜头)
export const getCamerasByManage = (data) => fetch('/uas/v1/api/sss/device/clientList', data)
// 根据区域获取镜头
export const getCamerasByZone = (data) => fetch('/uas/v1/api/sss/device/getZoneList', data)
// 获取镜头
export const getCameras = (data) => fetch('/uas/v1/api/sss/shop/device/list', data)
// 移动镜头到店铺下面
export const allocateCameras = (data) => fetch('/uas/v1/api/sss/device/allocate', data)
// 移除镜头
export const removeCameras = (data) => fetch('/uas/v1/api/sss/device/remove', data)
// 获取客户未分配镜头
export const unallocatedDevice = (data) => fetch('/uas/v1/api/sss/device/unallocated', data)
// 查询客户所属店铺和摄像头
export const getShopDevices = (data) => fetch('/uas/v1/api/sss/shop/devices', data)
// 镜头管理模糊查询
export const searchCamera = (data) => fetch('/uas/v1/api/sss/device/select', data)

/* 分割----all-midia---全媒体 */
//
export const getLoginVerifCode = (data) => fetch('/api/user/login/verif/get', data)
// RTMP直播添加
export const addRtmpLive = (data) => fetch('/uas/v1/api/mss/live/push/add', data)
//Rtmp推流地址获取
export const getRtmpPushLive = (data) => fetch('/uas/v1/api/mss/live/push/url', data)
//Rtmp直播列表查询
export const queryLiveList = (data) => fetch('/uas/v1/api/mss/live/push/list', data)
// 直播详情查询
export const queryLiveDetail = (data) => fetch('/uas/v1/api/mss/live/push/info', data)
// Rtmp直播开启
export const startLive = (data) => fetch('/uas/v1/api/mss/rtmp-live/start', data)
// Rtmp直播关闭
export const stopLive = (data) => fetch('/uas/v1/api/mss/rtmp-live/stop', data)
// 删除Rtmp直播
export const delRtmpLive = (data) => fetch('/uas/v1/api/mss/live/push/delete', data)
// 4.2.8	镜头直播添加
export const addCameraLive = (data) => fetch('/uas/v1/api/mss/transcode/camera/add', data)
// 4.2.9	镜头直播列表查询
export const queryCamLiveList = (data) => fetch('/uas/v1/api/mss/transcode/camera/list', data)
// 4.2.10	镜头直播详情查询
export const queryCamLive = (data) => fetch('/uas/v1/api/mss/transcode/camera/info', data)
// 镜头直播 启停
export const controlCameraLive = (data) => fetch('/uas/v1/api/mss/transcode/camera/control', data)
// 4.2.13	镜头直播删除
export const delCameraLive = (data) => fetch('/uas/v1/api/mss/transcode/camera/delete', data)
// 获取转码模板
export const getTemplateList = (data) => fetch('/uas/v1/api/media/template/list', data)
// 5.2.3	获取镜头转码任务列表
export const getCameraTranscodelist = (data) => fetch('/uas/v1/api/media/camera/transcode/list', data)
// 删除文件列表
export const delUploadFiles = (data) => fetch('/uas/v1/api/media/upload/del', data)

// 获取已上传文件
export const getUploadFiles = (data) => fetch('/uas/v1/api/media/upload/list', data)
// 获取文件详情
export const getFileDetail = (data) => fetch('/uas/v1/api/media/file/detail', data)
// rtsp  第三方直播列表查询
export const getThirdLiveList = (data) => fetch('/uas/v1/api/mss/transcode/third/list', data)
// 第三方直播添加
export const addThirdLive = (data) => fetch('/uas/v1/api/mss/transcode/third/add', data)
// 第三方直播详情查询
export const getThirdLiveDetail = (data) => fetch('/uas/v1/api/mss/transcode/third/info', data)
// 第三方直播启停
export const controlThirdLive = (data) => fetch('/uas/v1/api/mss/transcode/third/control', data)
// 4.2.15	第三方直播删除
export const deleteThirdLive = (data) => fetch('/uas/v1/api/mss/transcode/third/delete', data)
// 获取直播播放地址
export const requestLiveUrl = (data) => fetch('/uas/v1/api/media/live/url', data)
// 点播列表查询
export const getVodList = (data) => fetch('/uas/v1/api/mss/live/vod/query', data)
// 点播添加
export const addVodInfo = (data) => fetch('/uas/v1/api/mss/vod/add', data)
// 点播详情查询
export const getVodDetail = (data) => fetch('/uas/v1/api/mss/vod/info', data)
// 文件点播上架
export const controlVod = (data) => fetch('/uas/v1/api/mss/vod/control', data)
// 文件点播删除
export const deleteVodInfo = (data) => fetch('/uas/v1/api/mss/live/rtsp/delete', data)
// 查询离线文件转码详情
// export const getVideoTranscodeDetail = (data) => fetch('/uas/v1/api/media/video/transcode/detail', data);
// 获取点播视频播放地址
export const getVodUrl = (data) => fetch('/uas/v1/api/media/play/url', data)
// 上报视频播放信息
export const reportedMsg = (data) => fetch('/uas/v1/api/dddddd', data)
// 播放之前调用onplay
export const playManage = (data) => fetch('/uas/v1/api/mss/hls/transcode/play', data)
/* 统计管理 */
// 直播数量实时统计
export const getLiveNumberRecord = (data) => fetch('/uas/v1/api/mss/live/number/record', data)
// 4.6.1	直播数量实时统计
export const getLiveNumberPresent = (data) => fetch('/uas/v1/api/mss/live/number/present', data)
// 4.6.3	直播数量历史统计导出
export const exportLiveNumber = (data) => fetch('/uas/v1/api/mss/live/number/export', data)
// 4.6.4	直播播放次数实时统计
export const getPLayNumberPresent = (data) => fetch('/uas/v1/api/mss/play/number/present', data)
// 4.6.5	直播播放次数历史统计
export const getPLayNumberRecord = (data) => fetch('/uas/v1/api/mss/play/number/record', data)
// 4.6.6	直播数量历史统计导出
export const exportPLayNumberRecord = (data) => fetch('/uas/v1/api/mss/play/number/export', data)
// 4.6.7	实时活跃Top10统计
export const getLiveTopTenPresent = (data) => fetch('/uas/v1/api/mss/live/top/present', data)
// 4.6.8	直播播放次数Top10历史统计
export const getLiveTopTenRecord = (data) => fetch('/uas/v1/api/mss/live/top/record', data)
// 4.6.9	直播播放次数Top10统计导出
export const exportTopTenRecord = (data) => fetch('/uas/v1/api/mss/live/top/export', data)
// 4.6.10	点播实时Top10统计
export const getVodTopTenPresent = (data) => fetch('/uas/v1/api/mss/vod/top/present', data)
// 4.6.11	点播播放次数历史统计
export const getVodTopTenRecord = (data) => fetch('/uas/v1/api/mss/vod/play/record', data)
// 4.6.12	点播播放次数历史统计导出
export const exportVodPlayRecord = (data) => fetch('/uas/v1/api/mss/vod/play/export', data)
/* 全媒体音频 */
//音频提取任务添加
export const addStripTask = (data) => fetch('/uas/v1/api/mss/strip/task/add', data)
//音频提取任务修改
export const updateStripTask = (data) => fetch('/uas/v1/api/mss/strip/task/update', data)
//音频提取任务列表查询
export const getStripTaskList = (data) => fetch('/uas/v1/api/mss/strip/task/list', data)
//音频提取任务详情
export const getStripTaskInfo = (data) => fetch('/uas/v1/api/mss/strip/task/info', data)
//提取任务启动
export const controlStripTask = (data) => fetch('/uas/v1/api/mss/strip/task/control', data)
//提取任务删除
export const deleteStripTask = (data) => fetch('/uas/v1/api/mss/strip/task/delete', data)
//提取文件列表查询
export const getStripAudioList = (data) => fetch('/uas/v1/api/mss/strip/audio/list', data)
//提取文件详情查询
export const getStripAudioInfo = (data) => fetch('/uas/v1/api/mss/strip/audio/info', data)

// 视频浓缩摘要任务管理
// 视频浓缩摘要任务添加
export const addConcentrateTask = (data) => fetch('/uas/v1/api/oba/concentrate/task/add', data)
// 视频浓缩摘要任务修改
export const updateConcentrateTask = (data) => fetch('/uas/v1/api/oba/concentrate/task/update', data)
// 视频浓缩摘要任务列表
export const getConcentrateTaskList = (data) => fetch('/uas/v1/api/oba/concentrate/task/list', data)
// 视频浓缩摘要任务详情
export const getConcentrateTaskInfo = (data) => fetch('/uas/v1/api/oba/concentrate/task/info', data)
// 视频浓缩摘要任务启动
export const controlConcentrateTask = (data) => fetch('/uas/v1/api/oba/concentrate/task/control', data)
// 视频浓缩摘要任务暂停
export const stopConcentrateTask = (data) => fetch('/uas/v1/api/oba/concentrate/task/stop', data)
// 视频浓缩摘要任务删除
export const deleteConcentrateTask = (data) => fetch('/uas/v1/api/oba/concentrate/task/delete', data)

// 视频浓缩摘要文件
// 视频浓缩摘要文件列表查询
export const getConcentrateVideoList = (data) => fetch('/uas/v1/api/oba/concentrate/video/list', data)
// 视频浓缩摘要任务详情
export const getConcentrateVideoInfo = (data) => fetch('/uas/v1/api/oba/concentrate/video/info', data)

// 镜头故障管理
// 摄像机故障列表查询
export const alarmCameraInfoList = (data) => fetch('/uas/v1/api/oba/alarm-dev/list', data)
// 摄像机故障恢复告警接口
export const tblColStatusModify = (data) => fetch('/uas/v1/api/oba/alarm-dev/status/modify', data)
// 摄像机故障忽略接口
export const tblColIgnoreModify = (data) => fetch('/uas/v1/api/oba/alarm-dev/isIgnore/modify', data)

/*
    智能数据检索
*/
// 图片检索数据
export const getSearchpicList = (data) => fetch('/uas/v1/api/oba/ytst/search', data)

/*
    智能数据提取
*/
// 获取任务列表
export const searchImg_getTaskData = (data) => fetch('/uas/v1/api/oba/ytst/list', data)
// 创建任务
export const searchImg_addTask = (data) => fetch('/uas/v1/api/oba/ytst/add', data)
// 启动任务
export const searchImg_startTask = (data) => fetch('/uas/v1/api/oba/ytst/start', data)
// 停止任务
export const searchImg_stopTask = (data) => fetch('/uas/v1/api/oba/ytst/stop', data)
// 删除任务
export const searchImg_delTask = (data) => fetch('/uas/v1/api/oba/ytst/delete', data)

// AR镜头直播
// AR镜头直播列表查询
export const queryArAliveInfoList = (data) => fetch('/uas/v1/api/oba/ar-alive/list', data)
// AR镜头直播添加
export const arAliveManageAdd = (data) => fetch('/uas/v1/api/oba/ar-alive/add', data)
// AR镜头直播删除
export const arAliveManageDel = (data) => fetch('/uas/v1/api/oba/ar-alive/del', data)

// gis地图
export const getUserInfo1 = (data) => fetch('/wgis/v1/api/user/get', data)
export const getCameraList1 = (data) => fetch('/wgis/v1/api/dev/list', data)
export const getLocationList = (data) => fetch('/wgis/v1/api/locus/list', data)
export const getFenceList = (data) => fetch('/wgis/v1/api/locus/fence', data)
export const getPresentAzimuth = (data) => fetch('/uas/v1/api/oba/camera/present-position/get', data)
// export const getPresentAzimuth = (data) => fetch('/uas/v1/api/present/camera/azimuth', data);

/* 故障上报 */
//视频故障列表查询
export const getVideoFaultList = (data) => fetch('/oba/v1/api/oba/video-fault/list', data)
//视频故障添加
export const addVideoFault = (data) => fetch('/oba/v1/api/oba/video-fault/add', data)

// 收藏夹
// 添加收藏夹信息
export const addFavoriteInfo = (data) => postFetch('/uas/v1/api/favorite/add', data)
// 修改收藏夹信息
export const modifyFavoriteInfo = (data) => postFetch('/uas/v1/api/favorite/mod', data)
// 删除收藏夹信息
export const deleteFavoriteInfo = (data) => postFetch('/uas/v1/api/favorite/del', data)
// 收藏/取消收藏摄像机
export const operFavoriteCamera = (data) => postFetch('/uas/v1/api/favorite/collect', data)
// 镜头所在收藏夹信息
export const queryFavoriteCamera = (data) => postFetch('/uas/v1/api/favorite-camera/get', data)
// 查看收藏夹列表
export const getFavoriteList = (data) => postFetch('/uas/v1/api/favorite/get', data)
// 查看收藏夹摄像机列表
export const getFavoriteCamList = (data) => postFetch('/uas/v1/api/favorite-camera/list', data)

/*
    智能工单
*/
// 新增任务
export const add_ticketInfo = (data) => fetch('/uas/v1/api/oba/ticket/add', data)
// 变更任务
export const update_ticketInfo = (data) => fetch('/uas/v1/api/oba/ticket/update', data)
// 处理&&审核任务
export const deal_ticketInfo = (data) => fetch('/uas/v1/api/oba/ticket/deal', data)
// 取消任务
export const delete_ticketInfo = (data) => fetch('/uas/v1/api/oba/ticket/del', data)
// 获取任务列表
export const get_ticketList = (data) => fetch('/uas/v1/api/oba/ticket/list', data)
// 搜索任务
export const select_ticketList = (data) => fetch('/uas/v1/api/oba/ticket/select', data)
// 获取操作历史列表
export const get_operationList = (data) => fetch('/uas/v1/api/oba/ticket/operationList', data)
// 获取人员列表
export const get_personList = (data) => fetch('/uas/v1/api/oba/ticket/personList', data)
// 获取事件类型
export const get_eventTypeList = (data) => fetch('/uas/v1/api/oba/ticket/eventList', data)

//创建任务(元数据)
// 创建任务
export const createMetadataTask = (data) => fetch('/uas/v1/api/oba/metadata/createMetadataTask', data)
// 获取任务列表
export const getMetadataTaskList = (data) => fetch('/uas/v1/api/oba/metadata/getMetadataTaskList', data)
// 删除任务
export const delMetadataTask = (data) => fetch('/uas/v1/api/oba/metadata/delMetadataTask', data)

/*
    镜头型号管理
*/
// 摄像机兼容性列表查询
export const listCameraCompatibleInfo = (data) => fetch('/uas/v1/api/oba/camera/compatible/list', data)
// 摄像机兼容性详情查询
export const getCameraCompatibleInfo = (data) => fetch('/uas/v1/api/oba/camera/compatible/detail', data)

/*
    摄像机配置生成
*/
// 配置页查询
export const getCameraConfig = (data) => fetch('/uas/v1/api/oba/camera/config/detail', data)

/*
    大喇叭sn号
*/
// 镜头与大喇叭设备sn号关联
export const connectCameraAndSuoNa = (data) => fetch('/uas/v1/api/oba/camera/suona/sn/connect', data)
// 判断镜头是否配置大喇叭sn号有的话返回sn号
export const checkAndGetCameraSn = (data) => fetch('/uas/v1/api/oba/camera/suona/sn/check-get', data)

/*
    零配置 镜头 解绑
*/
// 摄像机零配置信息查询
export const queryCameraOcfgStatus = (data) => fetch('/uas/v1/api/ocfg/device/status', data)
// 判断镜头是否配置大喇叭sn号有的话返回sn号
export const unbindCameraOcfg = (data) => fetch('/uas/v1/api/ocfg/device/unbind', data)

/*
    元数据(长尾算法)
*/
// 查询元数据
export const getLongTailList = (data) => fetch('/uas/v1/api/ars/longTail/list', data)
// 删除元数据
export const delLongTailAlgo = (data) => fetch('/uas/v1/api/ars/longTail/delete', data)

//大屏展示
//查询楼层情况
export const getFloorDetail = (data) => fetch('/uas/v1/api/iscs/building/getfloordetail', data)
//查看楼层人员数据
export const getFloorUser = (data) => fetch('/uas/v1/api/iscs/building/getflooruser', data)
//在家人员情况
export const getOnHome = (data) => fetch('/uas/v1/api/iscs/building/getonhome', data)
//查询住户详情
export const getStoreDetail = (data) => fetch('/uas/v1/api/iscs/building/getstoredetail', data)
//门禁推送
export const pushMessage = (data) => fetch('/uas/v1/api/iscs/building/pushmessage', data)
//人员进出记录
export const getPersonRecognitionList = (data) => fetch('/uas/v1/api/iscs/building/getinoutrecord', data)

/*
    社会资源面信息
*/
// 社会资源面列表查询
export const selectSocialResourcesList = (data) => fetch('/uas/v1/api/iscs/social/resource/list', data)
// 场所数量
export const getSiteCount = (data) => fetch('/uas/v1/api/iscs/social/resource/site/count', data)
// 社会资源面下属场所列表查询
export const selectSiteList = (data) => fetch('/uas/v1/api/iscs/social/resource/site/list', data)
// 获取辖区所有的社会资源信息列表
export const getAllSocialResList = (data) => fetch('/uas/v1/api/iscs/social/resource/all/list', data)

/*
    党建宣传
*/
// 党建宣传列表查询
export const getPartyBuildList = (data) => fetch('/uas/v1/api/iscs/propagate/list', data)

/*
    智能研判
*/
// 获取社区或小区列表
// export const getCommunityCourtList = (data) => fetch('/uas/v1/api/iscs/building/communityAndCourt', data);
// 智能研判列表详情查询
export const getJudgeList = (data) => fetch('/uas/v1/api/judge/detail/list', data)

/* 首页 */
// 辖区人口信息
export const getDistrictPopulation = (data) => fetch('/uas/v1/api/iscs/population/districtPopulation', data)
// 社区人口年龄分布查询
export const getPopulationDistribution = (data) => fetch('/uas/v1/api/iscs/population/populationDistribution', data)
//感知设备列表
export const getPerceptionDeviceList = (data) => fetch('/uas/v1/api/iscs/physical/device/perceptionDevice', data)
//社会面信息列表
export const countSite = (data) => fetch('/uas/v1/api/iscs/social/resource/site/count', data)
// 车辆分布
export const getVehicleDistribution = (data) => fetch('/uas/v1/api/iscs/vehicle/vehicleDistribution', data)
// 人员进出统计
export const getPersonOutInLists = (data) => fetch('/uas/v1/api/iscs/person/recognition/list', data)
// 车辆进出记录
export const getCarOutInLists = (data) => fetch('/uas/v1/api/iscs/vehicle/recognition/list', data)
// 智能研判
export const getJudgeLists = (data) => fetch('/uas/v1/api/judge/overview', data)
// 智能告警
export const getAlarmLists = (data) => fetch('/uas/v1/api/alarm/stat/type', data)
// 获取登录用户所在区域id
export const getAreaCodeByLogin = (data) => fetch('/uas/v1/api/iscs/organization/areaCode', data)

/*物联监控*/
//设备数量s
export const getDeviceCount = (data) => fetch('/uas/v1/api/scs/physical/device/perceptionDevice', data)
// //普通摄像机列表查询
export const getCameraList2 = (data) => fetch('/uas/v1/api/uvs/camera/list', data)
// //摄像机信息查询
// export const getCameraInfo1 = (data) => fetch('/uas/v1/api/scs/physical/camera/info', data);
// //获取实时浏览url接口
// export const getLiveUrl1 = (data) => fetch('/uas/v1/api/scs/physical/media/live', data);
// //获取录像列表
// export const getRecordList = (data) => fetch('/uas/v1/api/scs/physical/record/list', data);
// //获取录像回放url
// export const getRecordUrl = (data) => fetch('/uas/v1/api/scs/physical/record/url', data);

//物联监控列表查询
export const getCamOrDeviceList = (data) => fetch('/uas/v1/api/scs/sys-device/list', data)
//摄像机信息查询
// export const getCameraInfo1 = (data) => fetch('/uas/v1/api/scs/physical/camera/info', data);
export const getIotDeviceInfo = (data) => fetch('/uas/v1/api/iot/device/info', data)

//物联设备信息查询
// export const getDeviceInfo = (data) => fetch('/uas/v1/api/scs/physical/camera/info', data);
//物联设备信息查询
export const getlocationRadius = (data) => fetch('/uas/v1/api/scs/physical/device/location/radius', data)

// 获取人脸门禁pad列表
export const getDevicePadInfo = (data) => fetch('/uas/v1/api/scs/physical/device/access/list', data)

/*楼栋信息*/
//楼栋查询
export const getcommunityAndCourt = (data) => fetch('/uas/v1/api/iscs/building/communityAndCourt', data)
//1.楼栋列表
export const getBuildingList = (data) => fetch('/uas/v1/api/iscs/building/list', data)
//2.楼栋详情
export const getBuildingInfo = (data) => fetch('/uas/v1/api/iscs/building/info', data)
//3.获取社区名称
export const getOrganizationInfo1 = (data) => fetch('/uas/v1/api/iscs/organization/info', data)
//4.楼栋详情(管理员)
export const getBuildingManagers = (data) => fetch('/uas/v1/api/iscs/building/managers', data)
//5.楼栋详情（分布比例）
export const getPopulationDistributionInBuilding = (data) =>
  fetch('/uas/v1/api/iscs/building/population/distribution', data)

//6.人房关联---楼栋信息
export const getBuildingFloorList = (data) => fetch('/uas/v1/api/iscs/building/house/floorList', data)
//7.人房关联---房间信息
export const getPeopleListInHouse = (data) => fetch('/uas/v1/api/iscs/building/house/peopleList', data)
//8.人员信息
export const getPersonPhotosInHouse = (data) => fetch('/uas/v1/api/iscs/house/person/photo', data)
//9.基本信息
export const getPersonArchivesInfo = (data) => fetch('/uas/v1/api/iscs/archives/person/info', data)
//10.车辆信息
export const getPersonVehicleArchivesList = (data) => fetch('/uas/v1/api/iscs/archives/person/vehicle/list', data)
//11.关系图
export const getFamilyRelation = (data) => fetch('/uas/v1/api/iscs/person/family/relation', data)
//12.居住信息下拉列表
export const getCourtList = (data) => fetch('/uas/v1/api/iscs/court/byCardNo/list', data)
//13.居住详情
export const getCourtListByCardNo = (data) => fetch('/uas/v1/api/iscs/court/residence/info', data)
// //15.活动轨迹设备ID
// export const getAccessDeviceInfo = (data) => fetch('/uas/v1/api/iscs/device/access/info', data);
//14.活动轨迹
export const getPersonRecognitionList1 = (data) => fetch('/uas/v1/api/iscs/person/recognition/list', data)

/*告警中心*/
//1.人员布控
// export const getAlarmList1 = (data) => fetch('/uas/v1/api/ecs/alarm/list', data);
//2.布控
export const getGuardList1 = (data) => fetch('/uas/v1/api/iscs/guard/list', data)
//查询布控列表
export const getNewGuardList = (data) => fetch('/uas/v1/api/ars/guard/list', data)
//3.设备树
export const getDeviceTree2 = (data) => fetch('/uas/v1/api/scs/algorithm/device/tree', data)

//5.告警类型查询（下拉列表）
export const queryAlarmTypes = (data) => fetch('/uas/v1/api/alarm/type/query', data)
//6.告警列表查询（智能分析、物联业务告警）
export const getAlarmList1 = (data) => fetch('/uas/v1/api/alarm/list', data)

//7.具体智能研判事件详情列表查询（智能研判告警）
export const getDetailList = (data) => fetch('/uas/v1/api/judge/detail/list', data)

/* 车辆应用 */
// 获取所有车辆布控库列表
export const getRepositoryInfo = (data) => fetch('/uas/v1/api/scs/vehicle/repository/list', data)
// 查询车辆布控
export const getScsGuardList = (data) => fetch('/uas/v1/api/scs/guard/list', data)
// 布控告警列表
// export const getGuardList = (data) => fetch('/uas/v1/api/ars/guard/vehiclehit/list', data);

// 获取所有社区
export const selectOrganizations = (data) => fetch('/uas/v1/api/udc/organization/list', data)
// 所有小区
export const getSubAreaList = (data) => fetch('/uas/v1/api/udc/sub-area/list', data)

/* 人员应用 */
// 获取以图搜人结果列表（静态）
export const searchByImageStatic = (data) => fetch('/uas/v1/api/iscs/face/searchByImage/static', data)
// 获取以图搜人结果列表（动态）
export const searchByImageDynamic = (data) => fetch('/uas/v1/api/iscs/face/searchByImage/dynamic', data)
// 条件检索结果
export const getPersonList = (data) => fetch('/uas/v1/api/iscs/archives/person/list', data)
// 布控告警详情
export const getHitDetailList = (data) => fetch('/uas/v1/api/ars/guard/personhit/detail', data)
// 抓拍机记录
export const searchByToken = (data) => fetch('/uas/v1/api/iscs/person/searchByToken', data)

/*
    告警中心
*/
// 告警列表查询(新)
export const getAlarmListNew = (data) => fetch('/uas/v1/api/ecs/alarm/list', data)
export const confirmEcsAlarm = (data) => fetch('/uas/v1/api/ecs/alarm/confirm', data)
// 告警确认记录列表查询
export const getAlarmConfirmList = (data) => fetch('/uas/v1/api/ecs/alarm/confirm/list', data)

// 静态搜索选中图片人员信息
export const getPersonArchivesInfos = (data) => fetch('/uas/v1/api/iscs/archives/person/info', data)
// 车辆信息
// export const getPersonVehicleArchivesList = (data) => fetch('/uas/v1/api/iscs/archives/person/vehicle/list', data);
// 居住信息
export const getPersonHouseArchivesList = (data) => fetch('/uas/v1/api/iscs/archives/person/house/list', data)
// 家庭关系
// export const getFamilyRelation = (data) => fetch('/uas/v1/api/iscs/person/family/relation', data);
// 人员活动轨迹
export const getPersonRecognitionLists = (data) => fetch('/uas/v1/api/iscs/person/recognition/list', data)

// 组织类型
export const getOrganizationSubType = (data) => fetch('/uas/v1/api/iscs/organization/subtype/get', data)

/*yxj */
/*
    首页
*/
//告警状态统计
export const getAlarmStatus = (data) => fetch('/uas/v1/api/scs/stat/alarm-confirm-state', data)
export const getTypeCount = (data) => fetch('/uas/v1/api/scs/alarm/all/type/count', data)

//查询告警等级
export const getAlarmLevel = (data) => fetch('/uas/v1/api/scs/stat/alarm-level', data)
//疫情统计数据
export const epidemicStatistic = (data) => fetch('/uas/v1/api/ais/visit/epidemicStatistic', data)

//告警列表查询
export const getAlarmList2 = (data) => fetch('/uas/v1/api/scs/query/old/alarm/list', data)

//告警类型统计
export const getAlarmType2 = (data) => fetch('/uas/v1/api/scs/stat/alarm-type', data)

//巡逻计划
export const patrolPlan = (data) => fetch('/uas/v1/api/scs/stat/patrol-state', data)

//布控数量
export const getControlNum = (data) => fetch('/uas/v1/api/scs/sapp/stat/guard', data)

// 物联设备统计
export const getIotStatic = (data) => fetch('/uas/v1/api/iot/getDeviceStatistics', data)

//人员识别记录列表查询
export const getPeopleRecognize = (data) => fetch('/uas/v1/api/iot/platform/door/record/list', data)
//人员识别记录列表导出
export const exportPerson = (data) => fetch('/uas/v1/api/iot/platform/door/record/list/export', data)
//车辆识别记录列表导出
export const exportVehicle = (data) => fetch('/uas/v1/api/iot/platform/vehicle/record/list/export', data)
//获取通行统计数据
export const getTrafficData = (data) => fetch('/uas/v1/api/iot/getTrafficStatistics', data)

// 门禁道闸设备远程控制接口
export const controlIotDev = (data) => fetch('/uas/v1/api/iot/platform/device/control', data)
// 批量门禁道闸设备远程控制接口
export const batchControlIotDev = (data) => fetch('/uas/v1/api/iot/platform/device/controlList', data)

//访客登记统计
export const vistorCount = (data) => fetch('/uas/v1/api/ais/visit/registration/count', data)

//首页考勤统计模块
export const getAttendancePie = (data) => fetch('/uas/v1/api/ams/app/attendance/pieChart', data)

//卡口列表查询
export const getCheckpoints = (data) => fetch('/uas/v1/api/scs/check-point/list', data)

//添加卡口
export const addCheckpoint = (data) => fetch('/uas/v1/api/scs/check-point/add', data)

//修改卡口
export const modifyPoint = (data) => fetch('/uas/v1/api/scs/check-point/modify', data)

//删除卡口
export const deletePoint = (data) => fetch('/uas/v1/api/scs/check-point/delete', data)

//查询卡口摄像机
export const checkCamera = (data) => fetch('/uas/v1/api/scs/check-point/camera/list', data)

//电子围栏列表查询

export const getElectricFenceList = (data) => fetch('/uas/v1/api/iot/electric-fence/list', data)
//电子围栏设备信息

export const getDeviceEletron = (data) => fetch('/uas/v1/api/iot/electric-fence/info', data)

export const searchWulian = (data) => fetch('/uas/v1/api/iot/device/list', data)

//查询防区
export const getDefenceAreaList = (data) => fetch('/uas/v1/api/iot/defence-area/list', data)

//告警中心的布控
export const getGuardList2 = (data) => fetch('/uas/v1/api/ars/guard/list', data)

/*
    布控任务
 */
//查询布控列表
export const getGuardList = (data) => fetch('/uas/v1/api/ars/guard/list', data)
//布控命中列表
export const getGuardHitList = (data) => fetch('/uas/v1/api/ars/guard/hit/list', data)
//命中详情
export const getGuardHitInfo = (data) => fetch('/uas/v1/api/ars/guard/hit/info', data)
//单个布控任务信息
export const getGuardInfo = (data) => fetch('/uas/v1/api/ars/guard/info', data)
//创建布控任务
export const addGuardInfo = (data) => fetch('/uas/v1/api/ars/guard/add', data)
//修改布控任务
export const modifyGuardInfo = (data) => fetch('/uas/v1/api/ars/guard/modify', data)
//删除布控任务
export const deleteGuardInfo = (data) => fetch('/uas/v1/api/ars/guard/delete', data)
// 删除布控源 (多个布控源设备或任务的其中有部分被删除时调用)
export const delSource = (data) => fetch('/uas/v1/api/ars/guard/remove-deleted-source', data)
//布控任务开关
export const switchGuard = (data) => fetch('/uas/v1/api/ars/guard/switch', data)

/*车辆检索 */
export const getDeviceTree = (data) => fetch('/uas/v1/api/udc/device/tree', data)
//车辆检索
export const vehiclesearchByImage = (data) => fetch('/uas/v1/api/ars/snap/vehicle/searchByImage', data)
//车辆条件检索
export const vehiclesearchByCondition = (data) => fetch('/uas/v1/api/ars/snap/vehicle/searchByCondition', data)
// export const vehiclesearchByCondition = (data) => fetch('/uas/v1/api/sdg/fake/vehicle/search', data);
// export const vehicleTrack = (data) => fetch('/uas/v1/api/sdg/vehicle/track', data);
export const vehicleTrack = (data) => fetch('/uas/v1/api/ars/snap/vehicle/searchTrail', data)
//车辆字典树
export const vehicleDictionary = (data) => fetch('/uas/v1/api/udc/assist/dictionary', data)

//车辆识别记录列表查询
export const getCarList = (data) => fetch('/uas/v1/api/iot/platform/vehicle/record/list', data)
// 车辆检索
export const getVehicleArchivesList = (data) => fetch('/uas/v1/api/scs/archives/vehicle/list', data)
// 车辆档案信息
export const getVehicleArchivesInfo = (data) => fetch('/uas/v1/api/scs/archives/vehicle/info', data)
// 车主信息
export const getDriverInfo = (data) => fetch('/uas/v1/api/scs/archives/driver/info', data)
// 活动轨迹
export const getVehicleRecognitionList = (data) => fetch('/uas/v1/api/scs/vehicle/recognition/list', data)
// 车辆布控告警列表
export const getVehicleHitList = (data) => fetch('/uas/v1/api/ars/guard/vehiclehit/list', data)
// 车辆布控告警详情
export const getVehicleHitLists = (data) => fetch('/uas/v1/api/ars/guard/vehiclehit/detail', data)

//算法名称
export const algorithmAccess = (data) => fetch('/uas/v1/api/ars/algorithm/access/list', data)

// 人员库
export const queryFaceList = (data) => fetch('/uas/v1/api/scs/person/repository/list', data)

//人员库图片检索
// export const facesearchByImage = (data) => fetch('/uas/v1/api/ars/snap/face/searchByImage', data);
export const facesearchByImage = (data) => postFetch('/uas/v1/api/ars/snap/face/searchByImage', data, 180000)
export const faceTrack = (data) => fetch('/uas/v1/api/ars/snap/face/searchTrail', data)
// export const facesearchByImage = (data) => fetch('/uas/v1/api/sdg/snap/face/searchByImage', data);
//人体条件检索
export const bodysearchByCondition = (data) => fetch('/uas/v1/api/ars/snap/body/searchByCondition', data)
// export const bodysearchByCondition = (data) => fetch('/uas/v1/api/sdg/snap/body/searchByCondition', data);
//人脸条件检索
export const facesearchByCondition = (data) => fetch('/uas/v1/api/ars/snap/face/searchByCondition', data)
// export const facesearchByCondition = (data) => fetch('/uas/v1/api/sdg/snap/face/searchByCondition', data);

//查询地图设置信息
export const mapConfigInfo = (data) => fetch('/uas/v1/api/scs/map/management/config/info', data)

//首页模块配置
export const getHomePageModulePosition = (data) => fetch('/uas/v1/api/scs/system/module/position/info', data)

export const getDeviceAll = (data) => fetch('/uas/v1/api/scs/stat/device-type', data)

// 获取设置
export const getWatermaskConfig = (data) => fetch('/uas/v1/api/udc/watermark/info/getWatermarkInfoList', data)

/*
巡逻应用
*/

//巡逻报告列表查询
export const patrolTask = (data) => fetch('/uas/v1/api/ais/patrol/taskrecord/list', data)

//数据巡查动态
export const dataPatrolDynamic = (data) => fetch('/uas/v1/api/ais/patrol/point/report/list', data)
// 删除工单
export const deleteWorkSheet = (data) => fetch('/uas/v1/api/ais/workSheet/delete', data)
//删除子工单
export const deleteChildSheet = (data) => fetch('/uas/v1/api/ais/childWorkSheet/delete', data)
//获取工单详情树形列表
export const getWorkSheetTreeList = (data) => fetch('/uas/v1/api/ais/workSheet/tree/list', data)
export const getWorkList = (data) => fetch('/uas/v1/api/ais/workSheet/worklist', data)
export const viewWorkSheet = (data) => fetch('/uas/v1/api/ais/workSheet/view', data)
//获取用户树
export const getWorkOrderTree = (data) => fetch('/uas/v1/api/udc/user/getWorkOrderTree', data)
export const issuedWork = (data) => fetch('/uas/v1/api/ais/workSheet/issued', data)
export const submitWorkSheet = (data) => fetch('/uas/v1/api/ais/workSheet/submit', data)
export const auditWorkSheet = (data) => fetch('/uas/v1/api/ais/workSheet/audit', data)
export const insertCollaborateWorkSheet = (data) => fetch('/uas/v1/api/ais/workSheet/insertCollaborate', data)

//巡逻新增工单

export const addWorkSheet = (data) => fetch('/uas/v1/api/ais/workSheet/add', data)

//获取父工单详情
export const getWorkSheetInfo = (data) => fetch('/uas/v1/api/ais/workSheet/info', data)

//获取子工单列表
export const getChildWorkSheet = (data) => fetch('/uas/v1/api/ais/childWorkSheet/list', data)
//子工单审核
export const modifyChildWorkSheet = (data) => fetch('/uas/v1/api/ais/childWorkSheet/modify', data)
//子工单处理流程
export const childProgress = (data) => fetch('/uas/v1/api/ais/workSheet/progress', data)
/*
    物联应用
*/
//查询当前平台下面物联设备列表
export const getIotDeviceList = (data) => fetch('/uas/v1/api/scs/all/device/list', data)

//查询所有物联设备列表
export const getAllDeviceList = (data) => fetch('/uas/v1/api/scs/device/fatherType', data)

/*
    出入口
*/

//人员

export const faceAccessState = (data) => fetch('/uas/v1/api/scs/person/recognition/accessState', data)

//查询人员流量趋势
export const faceFlowTrend = (data) => fetch('/uas/v1/api/scs/person/recognition/flowTrend', data)

//查询人员进出类型

export const faceComeTye = (data) => fetch('/uas/v1/api/scs/person/recognition/type/list', data)

//人员轨迹列表
export const trajectoryLIst = (data) => fetch('/uas/v1/api/scs/person/recognition/trajectory/list', data)

//播放轨迹
export const playFaceTrack = (data) => fetch('/uas/v1/api/scs/person/recognition/playTrack/list', data)

//查询门禁关联摄像机

export const getRelativeCameraList = (data) => fetch('/uas/v1/api/scs/access/camera/list', data)

//远程关门

export const closeRemoteDoor = (data) => fetch('/uas/v1/api/iot/access-device/remote-close-door', data)

//远程开门

export const openRemoteDoor = (data) => fetch('/uas/v1/api/iot/access-device/remote-open-door', data)

//车辆

export const carAccessState = (data) => fetch('/uas/v1/api/scs/vehicle/access/getAccessStateCount', data)

export const getVehicleNumByType = (data) => fetch('/uas/v1/api/scs/vehicle/access/getVehicleNumByType', data)

//车辆流量趋势
export const getVehicleNumByInOutType = (data) => fetch('/uas/v1/api/scs/vehicle/access/getVehicleNumByInOutType', data)

//车辆轨迹
export const getVehicleTrail = (data) => fetch('/uas/v1/api/scs/vehicle/access/getVehicleOneDayTrails', data)

//播放轨迹
export const playCarTrack = (data) => fetch('/uas/v1/api/scs/vehicle/access/getVehicleTrail', data)

//电子围栏布防
export const openDefence = (data) => fetch('/uas/v1/api/iot/electric-fence/pushDefenceList', data)

export const closeDefence = (data) => fetch('/uas/v1/api/iot/electric-fence/pushDisDefenceList', data)

//物联业务告警

export const getAllAlarmDevice = (data) => fetch('/uas/v1/api/scs/device/getAlarmDeviceInfo', data)

/*我的任务mytask */

//查询我的任务列表

export const getMyTaskList = (data) => fetch('/uas/v1/api/scs/mytasks/getMostTaskJson', data)

//新增日程

export const addRoutes = (data) => fetch('/uas/v1/api/scs/mytasks/addSchedules', data)

//修改日程
export const modifyRoutes = (data) => fetch('/uas/v1/api/scs/mytasks/modifySchedule', data)

//删除日程
export const deleteRoutes = (data) => fetch('/uas/v1/api/scs/mytasks/deleteSchedule', data)

//查询某一天任务列表
export const getOneDayRoute = (data) => fetch('/uas/v1/api/scs/mytasks/getOneDaySchedules', data)

//获取一个月中有哪些天有任务
export const getRouteListsDate = (data) => fetch('/uas/v1/api/scs/mytasks/getScheduleDayInMonth', data)

//查询工单柱状图

export const getGongdanData = (data) => fetch('/uas/v1/api/scs/mytasks/getWorkOrderHistogram', data)

//请求组织树
export const getOrganizationTreeUdc = (data) => fetch('/uas/v1/api/udc/organization/tree', data)

/**
 * 工作台
 */
export const getWorkTableAlarmCount = (data) => fetch('/uas/v1/api/scs/mytasks/getCountTaskAndMyTask', data)
// 获取列表
export const getNoticeList = (data) => fetch('/uas/v1/api/scs/noticetype/list', data)
// 获取当月考勤统计
export const getAttendance = (data) => fetch('/uas/v1/api/ams/app/attendance/statistics', data)
// 获取当天统计详情
export const getAttendanceDetail = (data) => fetch('/uas/v1/api/ams/app/attendance/info', data)
// 获取第三方平台
// export const getThirdParty = (data) => fetch('/uas/v1/api/iot/query/back/system/info', data)
// 获取物联平台列表
export const getIotPlatformList = (data) => fetch('/uas/v1/api/iot/platform/list', data)
/*
访客
*/
//访客列表
export const getVistorList = (data) => fetch('/uas/v1/api/ais/visit/list', data)

///api/ais/visit/statistic

//访客数据

export const getVistorData = (data) => fetch('/uas/v1/api/ais/visit/statistic', data)

export const getVisitorList = (data) => fetch('/uas/v1/api/ais/visit/list', data)
//详情
export const visitorInfo = (data) => fetch('/uas/v1/api/ais/visit/Info', data)
//增加
export const addVisitor = (data) => fetch('/uas/v1/api/ais/visit/add', data)
//被访人校验
export const checkInterviewee = (data) => fetch('/uas/v1/api/ais/visit/interviewee-check', data)
//导出
export const exportVisitor = (data) => fetch('/uas/v1/api/ais/visit/export', data)
//安保审核
export const signInVisitor = (data) => fetch('/uas/v1/api/ais/visit/signIn', data)
//删除
export const deleteVisitor = (data) => fetch('/uas/v1/api/ais/visit/delete', data)
// ai告警tab列表
export const AItablistSearch = (data) => fetch('/uas/v1/api/scs/alarmCenter/list', data)

//告警区域查询
export const searchArea = (data) => fetch('/uas/v1/api/scs/area/scope/list', data)
// 算法告警态势分布
export const allAlarmSituation = (data) => fetch('/uas/v1/api/scs/alarm/treatment', data)
//告警详情联动查询
export const getLinkagePlanByDeviceId = (data) => fetch('/uas/v1/api/ecs/linkageExt/getLinkagePlanByDeviceId', data)

//获取区域列表
export const getMyAreaList = (data) => fetch('/uas/v1/api/scs/area/scope/list', data)
// 告警区域TOP5
export const getAlarmArea = (data) => fetch('/uas/v1/api/scs/alarm/area/ranking', data)
// 告警分类及总数
export const GetalarmClassification = (data) => fetch('/uas/v1/api/scs/alarm/statistics', data)
// 告警趋势图
// export const AlarmTrendChart = (data) => fetch('/uas/v1/api/scs/alarm/time', data)

//区域摄像机带告警数的
export const getAlarmCamera = (data) => fetch('/uas/v1/api/scs/device/withAlarmNum', data)
// 获取物联设备列表
export const getIotDevList = (data) => fetch('/uas/v1/api/iot/platform/all/device/list', data)

/*
ai算法

*/
//态势图
export const getAlarmTaishi = (data) => fetch('/uas/v1/api/scs/alarm/statistics', data)

//设备运行统计
export const getDeviceWork = (data) => fetch('/uas/v1/api/scs/alarm/device/online', data)
export const getAIDeviceWork = (data) => fetch('/uas/v1/api/scs/alarm/device/onlineAi', data)

//告警趋势图
export const getAlarmTrend = (data) => fetch('/uas/v1/api/scs/alarm/time', data)
// 区域设备查询
export const getDeviceListInArea = (data) => fetch('/uas/v1/api/scs/area/relate/device', data)

export const xgIpInRedis = (data) => fetch('/uas/v1/api/scs/algorithm/xg/ip', data)
// 未代理告警
export const getAlarmInfo = (data) => fetch('/uas/v1/api/ecs/alarm/info', data)

// 查询告警图片URL
export const getAlarmPicUrl = (data) => fetch('/uas/v1/api/scs/query/alarm/pic/url', data)

/**
 * map.vue 点击标注出树形弹框部分
 */
// 查询是否关联组织
export const getOrgState = (data) => fetch('/uas/v1/api/xgapt/map/getOrganizationMapById', data)
// 组织树形结构
export const getTree = (data) => fetch('/uas/v1/api/udc/organization/tree', data)
// 查询组织下的摄像头
export const getCameraFromTree = (data) => fetch('/uas/v1/api/uvs/camera/list', data)

/**巡更应用 **/

// 巡更子任务列表
export const getChildTaskList = (data) => fetch('/uas/v1/api/ais/patrol/childtask/list', data)
//子任务详情
export const getChildTaskInfo = (data) => fetch('/uas/v1/api/ais/patrol/childtask/info', data)
//巡更问题列表
export const getPatrolReportList = (data) => fetch('/uas/v1/api/ais/patrol/point/report/list', data)
export const getPatrolReportInfo = (data) => fetch('/uas/v1/api/ais/patrol/handle/submit/info', data)
// 批量获取详情信息
export const getRoleUserCameraOrgRequest = (data) => fetch('/uas/v1/api/udc/user/getRoleUserCameraOrgRequest', data)
