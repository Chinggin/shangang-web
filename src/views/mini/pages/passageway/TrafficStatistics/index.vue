<template>
    <div class="traffic">
        <div class="traffic-left side">
            <!--  今日通行概况 -->
            <div class="item">
                <CustomCard :moduleName="$t('traffic.PassOverview')">
                    <div class="item-con con1">
                        <div class="radius" v-for="item in txData" :key="item.prop">
                            <img v-show="item.img == 'person'" src="./img/g_p.png" alt="" />
                            <img v-show="item.img == 'car'" src="./img/g_c.png" alt="" />
                            <div>
                                <div>{{ item.label }}</div>
                                <div class="value">
                                    <span>{{ statistics[item.prop] }}</span>{{ $t('traffic.times') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomCard>
            </div>
            <!--  今日门禁通行统计 -->
            <div class="item tall">
                <CustomCard :moduleName="$t('traffic.accessStatistics')">
                    <div class="item-con con3">
                        <div class="openStatic">
                            <Histogram id="openStatic" ref="openStatic"></Histogram>
                        </div>
                        <div class="errorStatic">
                            <DashboardPie id="errorStatic" ref="errorStatic"></DashboardPie>
                        </div>
                    </div>
                </CustomCard>
            </div>
        </div>
        <div class="traffic-middle side">
            <!--  通行设备概况 -->
            <div class="item passEquip">
                <CustomCard :moduleName="$t('traffic.PassEquipOverview')">
                    <div class="item-con con21">
                        <div v-for="item in txDevData" :key="item.prop" class="deviceBox">
                            <div class="value" :class="[item.imgClass]">
                                {{ statistics[item.prop] }}
                            </div>
                            <div class="label" :class="[item.class]">
                                {{ item.label }}
                            </div>
                        </div>
                    </div>
                </CustomCard>
            </div>
            <!--  今日人员进出统计 -->
            <div class="item short">
                <CustomCard :moduleName="$t('traffic.staffInOut')">
                    <div class="item-con con2">
                        <div v-for="item in staffData" :key="item.prop" class="staffBox">
                            <div class="label">
                                <img src="./img/b_p.png" alt="" />
                                {{ item.label }}
                            </div>
                            <div class="staffVal type2">
                                <span>{{ statistics[item.prop] }}</span>{{ $t('traffic.times') }}
                            </div>
                        </div>
                    </div>
                </CustomCard>
            </div>
            <!--  今日车辆进出统计 -->
            <div class="item short">
                <CustomCard :moduleName="$t('traffic.carInOut')">
                    <div class="item-con con2">
                        <div v-for="item in carData" :key="item.prop" class="staffBox">
                            <div class="label">
                                <img src="./img/b_c.png" alt="" />
                                {{ item.label }}
                            </div>
                            <div class="staffVal type2">
                                <span>{{ statistics[item.prop] }}</span>次
                            </div>
                        </div>
                    </div>
                </CustomCard>
            </div>
        </div>
        <div class="traffic-right side">
            <!--  通行设备运行概况 -->
            <div class="item operateEquip">
                <CustomCard :moduleName="$t('traffic.OperationEquip')">
                    <div class="item-con">
                        <Pie id="accessPie" ref="accessPie" :seriesName="$t('traffic.accessDev')"></Pie>
                        <Pie id="RoadGatePie" ref="RoadGatePie" :seriesName="$t('traffic.barrierDev')"></Pie>
                    </div>
                </CustomCard>
            </div>
            <!--  今日人员通行趋势 -->
            <div class="item short">
                <CustomCard :moduleName="$t('traffic.moveTrends')">
                    <div class="item-con con4">
                        <BrokenLine id="staffTraffic" ref="staffTraffic"></BrokenLine>
                    </div>
                </CustomCard>
            </div>
            <!--  今日车辆通行趋势 -->
            <div class="item short">
                <CustomCard :moduleName="$t('traffic.trafficTrends')">
                    <div class="item-con con4">
                        <BrokenLine id="carTraffic" ref="carTraffic"></BrokenLine>
                    </div>
                </CustomCard>
            </div>
        </div>
    </div>
</template>

<script>
import CustomCard from '../component/custom-card'
import Pie from '@/components/EchartComps/Pies'
import BrokenLine from '@/components/EchartComps/BrokenLine'
import Histogram from '@/components/EchartComps/Histogram'
import DashboardPie from '@/components/EchartComps/DashboardPie'
import { getTrafficData } from '@/utils/api'
export default {
    components: {
        CustomCard,
        Pie,
        BrokenLine,
        Histogram,
        DashboardPie,
    },
    data() {
        return {
            // 今日通行概况数据
            txData: [
                {
                    label: this.$t('traffic.personpassage'),
                    prop: 'personNum',
                    img: 'person',
                },
                {
                    label: this.$t('traffic.InternalPersonpassage'),
                    prop: 'staffNum',
                    img: 'person',
                },
                {
                    label: this.$t('traffic.vistorPassage'),
                    prop: 'visitorNum',
                    img: 'person',
                },
                {
                    label: this.$t('traffic.vehiclePassage'),
                    prop: 'carNum',
                    img: 'car',
                },
                {
                    label: this.$t('traffic.internalVehiclePassage'),
                    prop: 'innerCarNum',
                    img: 'car',
                },
                {
                    label: this.$t('traffic.ExternalVehiclePassage'),
                    prop: 'outterCarNum',
                    img: 'car',
                },
            ],
            // 通行设备概况
            txDevData: [
                {
                    label: this.$t('traffic.accessDev'),
                    prop: 'accessNum',
                    class: 'type1',
                    imgClass: 'access',
                },
                {
                    label: this.$t('traffic.barrierDev'),
                    prop: 'barrierNum',
                    class: 'type2',
                    imgClass: 'barrier',
                },
            ],
            staffData: [
                {
                    label: this.$t('traffic.accessPerson'),
                    prop: 'accessPerson',
                },
                {
                    label: this.$t('traffic.outgoingPerson'),
                    prop: 'outgoingPerson',
                },
            ],
            carData: [
                {
                    label: this.$t('traffic.enteringCar'),
                    prop: 'accessCar',
                },
                {
                    label: this.$t('traffic.outgoingCar'),
                    prop: 'outgoingCar',
                },
            ],
            statistics: {
                personNum: '', //人员通行
                staffNum: '', //内部人员通行
                visitorNum: '', //访客人员通行
                carNum: '', //车辆通行
                innerCarNum: '', //内部车辆通行
                outterCarNum: '', //外部车辆通行
                accessNum: '', //门禁设备
                barrierNum: '', //车辆道闸设备
                accessPerson: '', //进入人员
                outgoingPerson: '', //外出人员
                accessCar: '', //进入车辆
                outgoingCar: '', //外出车辆
            },
            timer: null,
        }
    },
    created() {
        this.getTrafficDatas()
    },
    methods: {
        // 获取数据
        getTrafficDatas() {
            if (this.timer) clearTimeout(this.timer)
            this.setTime()
            getTrafficData().then((res) => {
                if (res.resultCode == 0) {
                    let {
                        accessControlAlarmInfo, // 今日门禁通行统计 -- 异常数据
                        accessControlInfo, // 今日门禁通行统计 -- 开门次数
                        accessEquipmentInfo, // 通行设备运行概况
                        trafficOverviewInfo, // 通行概况
                        inAndOutStatisticsInfo, // 通行趋势 / 进出统计
                    } = res
                    // 处理 今日通行
                    if (trafficOverviewInfo) {
                        this.statistics.outterCarNum = trafficOverviewInfo.externalVehicles
                        this.statistics.innerCarNum = trafficOverviewInfo.interiorVehicles
                        this.statistics.staffNum = trafficOverviewInfo.internalPersonnelCount
                        this.statistics.visitorNum = trafficOverviewInfo.visitorCount
                    }
                    // 处理 通行设备
                    if (accessEquipmentInfo) {
                        let { accessControlInfo, brakeInfo } = accessEquipmentInfo
                        this.statistics.accessNum =
                            accessControlInfo.deviceFaultCount +
                            accessControlInfo.deviceOffLineCount +
                            accessControlInfo.deviceOnlineCount
                        this.statistics.barrierNum =
                            brakeInfo.deviceFaultCount + brakeInfo.deviceOffLineCount + brakeInfo.deviceOnlineCount
                        this.loadDevice(accessControlInfo, 'access')
                        this.loadDevice(brakeInfo)
                    }
                    // 处理 人员/车辆通行数
                    if (inAndOutStatisticsInfo) {
                        let { personRecognitionInfo, vehicleRecognitionInfo } = inAndOutStatisticsInfo
                        this.statistics.accessPerson = personRecognitionInfo.accessPersonnelInList?.reduce(
                            (prev, cur) => {
                                return prev + cur.orderCount
                            },
                            0
                        )
                        this.statistics.outgoingPerson = personRecognitionInfo.accessPersonnelOutList?.reduce(
                            (prev, cur) => {
                                return prev + cur.orderCount
                            },
                            0
                        )
                        this.statistics.accessCar = vehicleRecognitionInfo.enteringVehicleList?.reduce((prev, cur) => {
                            return prev + cur.orderCount
                        }, 0)
                        this.statistics.outgoingCar = vehicleRecognitionInfo.outgoingVehicleList?.reduce(
                            (prev, cur) => {
                                return prev + cur.orderCount
                            },
                            0
                        )
                        this.statistics.personNum = this.statistics.accessPerson + this.statistics.outgoingPerson
                        this.statistics.carNum = this.statistics.accessCar + this.statistics.outgoingCar
                        this.loadTrafficTrend(personRecognitionInfo, 'person')
                        this.loadTrafficTrend(vehicleRecognitionInfo)
                    }
                    if (accessControlAlarmInfo) {
                        // 处理 今日门禁通行统计 异常数据
                        this.loadOpen(accessControlInfo)
                    }
                    if (accessControlInfo) {
                        // 处理 今日门禁通行统计 开门次数
                        this.loadAccessError(accessControlAlarmInfo)
                    }
                } else {
                    if (res.resultDesc) this.$message.error(res.resultDesc)
                    else
                        this.$message.error(
                            localStorage.getItem('locale') == 'zh'
                                ? '通行统计数据获取失败'
                                : 'Failed to obtain traffic statistics'
                        )
                }
            })
        },
        // 设置人车通行趋势图标
        loadTrafficTrend(data, type) {
            let data1 = []
            let data2 = []
            let xLabel = []
            for (let i = 0; i < 25; i++) {
                data1.push(0)
                data2.push(0)
                xLabel.push(i)
            }
            if (type == 'person') {
                data.accessPersonnelList?.forEach((e) => {
                    data1[e.createTimeByMin] = e.orderCount
                })
                data.outgoingPersonnelList?.forEach((e) => {
                    data2[e.createTimeByMin] = e.orderCount
                })
                this.$refs.staffTraffic.init(data1, data2, {
                    xLabel: xLabel,
                    interval: 2,
                    legend: [
                        {
                            name: this.$t('traffic.accessPerson'),
                        },
                        {
                            name: this.$t('traffic.outgoingPerson'),
                        },
                    ],
                })
            } else {
                data.enteringVehicleList?.forEach((e) => {
                    data1[e.createTimeByMin] = e.orderCount
                })
                data.outgoingVehicleList?.forEach((e) => {
                    data2[e.createTimeByMin] = e.orderCount
                })
                this.$refs.carTraffic.init(data1, data2, {
                    xLabel: xLabel,
                    interval: 2,
                    legend: [
                        {
                            name: this.$t('traffic.enteringCar'),
                        },
                        {
                            name: this.$t('traffic.outgoingCar'),
                        },
                    ],
                })
            }
        },
        // 设置通行设备运行概况
        loadDevice(data, type) {
            let chartData = [
                {
                    name: this.$t('traffic.online'),
                    value: data.deviceOnlineCount,
                },
                {
                    name: this.$t('traffic.offline'),
                    value: data.deviceOffLineCount,
                },
                {
                    name: this.$t('traffic.fault'),
                    value: data.deviceFaultCount,
                },
            ]
            if (type == 'access') {
                this.$refs.accessPie.init(chartData)
            } else {
                this.$refs.RoadGatePie.init(chartData)
            }
        },
        loadOpen(data) {
            let arr = [
                {
                    name: this.$t('traffic.faceOpen'),
                    value: data.faceOpeningCount,
                },
                {
                    name: this.$t('traffic.cardOpen'),
                    value: data.cardOpeningCount,
                },
                {
                    name: this.$t('traffic.otherOpen'),
                    value: data.otherOpeningCount,
                },
            ]
            this.$refs.openStatic.init(arr)
        },
        loadAccessError(data) {
            let arr = [
                {
                    name: this.$t('traffic.faceOpenErr'),
                    value: data.faceAlarmCount,
                },
                {
                    name: this.$t('traffic.cardOpenErr'),
                    value: data.cardAlarmCount,
                },
                {
                    name: this.$t('traffic.otherOpenErr'),
                    value: data.otherAlarmCount,
                },
            ]
            this.$refs.errorStatic.init(arr)
        },
        // 定时请求
        setTime() {
            this.timer = setTimeout(() => {
                this.getTrafficDatas()
            }, 60 * 1000)
        },
    },
    beforeDestroy() {
        if (this.timer) clearTimeout(this.timer)
    },
}
</script>

<style lang="scss" scoped>
.traffic {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    overflow: auto;
    // width: 1700px;
    width: 100%;
    color: #fff;
    padding: 30px;

    .flex {
        display: flex;
    }

    .side {
        padding: 10px;
    }

    &-left {
        width: 33.3%;
    }

    &-middle {
        width: 33.3%;
    }

    &-right {
        width: 33.3%;
    }

    .item {
        width: 100%;
        height: 300px;
        background-color: #051e2d;
        border: 1px solid #264c67;
        margin-bottom: 20px;
        border-radius: 4px;
        font-size: 14px;
        overflow: hidden;

        &.tall {
            height: 620px;
        }

        &.short {
            height: 300px;
        }

        &-con {
            width: 100%;
            height: 100%;
            padding: 20px;
            display: flex;
        }

        .con1 {
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 40px 40px 20px;

            .radius {
                width: 30%;
                height: 100px;
                display: flex;
                align-items: flex-start;
                flex-direction: row;
                justify-content: flex-start;

                img {
                    width: 18px;
                    height: 18px;
                    margin-top: 2px;
                    margin-right: 10px;
                }

                >div {
                    font-size: 16px;
                    color: #f3fffe;

                    .value {
                        margin-top: 24px;

                        span {
                            margin-top: 20px;
                            color: #00ffff;
                            margin-right: 9px;
                            font-size: 24px;
                        }
                    }
                }
            }
        }

        .con2 {
            justify-content: space-around;
            align-items: center;

            .staffBox {
                text-align: center;
                width: 30%;
                font-size: 20px;
                color: #26b0ff;
                position: relative;

                .staffVal {
                    margin-top: 20px;
                    position: relative;
                    height: 58px;
                    line-height: 58px;

                    span {
                        font-size: 28px;
                        color: #26e3ff;
                        margin-right: 10px;
                    }
                }

                .label {
                    text-align: left;

                    img {
                        vertical-align: middle;
                        width: 20px;
                        height: 20px;
                    }
                }

                &:first-child::after {
                    content: '';
                    height: 50px;
                    position: absolute;
                    border-left: 2px dashed #0c417a;
                    left: 130%;
                    top: 20%;
                    width: 1px;
                }
            }
        }

        .con21 {
            justify-content: space-around;
            align-items: flex-start;

            .deviceBox {
                text-align: center;
                width: 30%;
                height: 60%;
                position: relative;

                &:first-child::after {
                    content: '';
                    width: 1px;
                    height: 54px;
                    position: absolute;
                    top: 37%;
                    right: -46px;
                    background: -webkit-linear-gradient(top, rgb(12, 25, 69) 0%, #26bfbf 50%, rgb(12, 25, 69) 100%);
                }

                .label {
                    margin-top: 30px;
                    border-top: 1px solid;
                    border-bottom: 1px solid;
                    border-image: -webkit-linear-gradient(left,
                            rgb(12 25 69 / 0%) 10%,
                            #0b5252 50%,
                            rgb(12 25 69 / 0%) 90%);
                    height: 32px;
                    line-height: 32px;
                    position: relative;
                }

                .value {
                    height: 110px;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    font-size: 28px;
                    line-height: 70px;

                    &.access {
                        background-image: url('./img/barrier.png');
                        filter: hue-rotate(314deg);
                    }

                    &.barrier {
                        background-image: url('./img/barrier.png');
                    }
                }
            }
        }

        .con3 {
            flex-direction: column;

            .openStatic {
                width: 100%;
                height: 190px;
            }

            .errorStatic {
                width: 100%;
                height: calc(100% - 190px);
            }
        }

        .con4 {
            padding: 0;
        }
    }

    .type1 {
        background: -webkit-linear-gradient(left, rgb(12 25 69 / 0%) 0%, #0b5252 50%, rgb(12 25 69 / 0%) 100%);

        &::before {
            background: #0b5252;
            content: '';
            width: 100%;
            height: 1px;
            position: absolute;
            left: 0;
            top: 0px;
            height: 1px;
            background: -webkit-linear-gradient(left, rgb(12, 25, 69) 0%, #26bfbf 50%, rgb(12, 25, 69) 100%);
        }

        &::after {
            background: #0b5252;
            content: '';
            width: 100%;
            height: 1px;
            position: absolute;
            left: 0;
            bottom: 0px;
            height: 1px;
            background: -webkit-linear-gradient(left, rgb(12, 25, 69) 0%, #26bfbf 50%, rgb(12, 25, 69) 100%);
        }
    }

    .type2 {
        background: -webkit-linear-gradient(left, rgb(12 25 69 / 0%) 0%, #275ab873 50%, rgb(12 25 69 / 0%) 100%);

        &::before {
            content: '';
            width: 100%;
            height: 1px;
            position: absolute;
            left: 0;
            top: 0px;
            height: 1px;
            background: -webkit-linear-gradient(left, rgb(12, 25, 69) 0%, #2794b8 50%, rgb(12, 25, 69) 100%);
        }

        &::after {
            content: '';
            width: 100%;
            height: 1px;
            position: absolute;
            left: 0;
            bottom: 0px;
            height: 1px;
            background: -webkit-linear-gradient(left, rgb(12, 25, 69) -4%, #2794b8 50%, rgb(12, 25, 69) 100%);
        }
    }
}
</style>
