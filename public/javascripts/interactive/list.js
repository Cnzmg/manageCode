const [
    $,
    token,
    u,
    uri
] = [
        parent.all.jq,
        parent.all.json,
        parent.document.getElementById('tagHref').getAttribute('src').replace('..', '/manage').split('?')[0],
        document.getElementById('c-container-list').getAttribute('data-uri'),
    ];
const _data = {
    id: ym.init.COMPILESTR.decrypt(token.id),
    token: ym.init.COMPILESTR.decrypt(token.asset),
    // url: u.toLowerCase(),
    url: u
};
new Vue({
    el: '#c-container-list',
    data: () => {
        return {
            loading: false,
            more: false,
            tableData: [],
            currentPage: 1,
            pageSize: 20,
            total: 0,
            page: 1,
            select: '',
            searchVal: '',
            searchName: '',
            machineNumbers: {
                machineCount: 0
            },
            selectFil: '',
            selectMater: '',
            dateLog: '',
            InputAndVisible: false, //列表操作
            formData: {
                machineType: 1,
                name: '',
                mUpdateUrl: '',  //应用更新
                madTitle: '',
                madOrder: '',
                madUrl: '',
                madId: '',
                adminName: '', //超级管理员
                adminPwd: '',
                realName: '',
                adminMobile: '',
                named: '',
                roleId: '',
            },
            imageList: {
                mUpdateUrl: [], //图片li
                madUrl: [],     //视频广告
            },
            TableAndVisible: false,
            TableFormData: [],
            UpdateTableAndVisible: false,
            UpdateTableFormData: [],
            listId: '',
            productCount: 0,
            productId: [],
            detailTableAndVisible: false,
            detailTableFormData: [],
            options: [],
            unbinadmin: {
                adminIds: '',
                maintainerName: '',  //这里是运维
                maintainerPhone: '',
                bindMachine: '',
                state: ''
            },
            UnFormData: [],
            adminIds: [],
            listIds: [],
            machineNumber: [],
            restaurants: [],  //用户ID搜索相关
            state: '',
            timeout: null,
            userIds: [],
            userIdts: [],
            userMode: [],
            machineLogs: [],  //设备日志
            machineLogViews: false,
            fileData: _data,
            num: 1,
            dialogVisible: false,
            dialogImageUrl: '',
            adevtmodel: false,  //视频添加/编辑
            adIds: [],
            html: '',
            pickerOptions: {  //时间节点
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近半年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            select_user: '', //用户列表的批量操作
            user_type: 1,  //用户类型
            statues: {
                user: false,
                flow: false,
                state: false
            }, // 状态的显示/f
            overdueTime: '',
            grantCount: '',
            user_state: 1,
            order: {},
            refundMoney: {},  //订单退款
            pathUrlExe: {}, //导出
            optionsTime: [], //时间选择
            bool: '',
            StatusName: new Map([
                ['free',{
                    user: new Map([
                        [1, '超级管理员'],
                        [2, '系统管理员'],
                        [3, '商户管理员']
                    ]),
                    statues: new Map([
                        [0, '冻结'],
                        [1, '正常']
                    ]),
                    machineType: new Map([
                        [1, '大型柜式机'],
                        [2, '小型桌面机'],
                        [3, '无网单机']
                    ])
                }]
            ])
        }
    },
    created: function () {
        this.list();
    },
    methods: {
        IError(err) {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            this.$message.error('错了哦!' + err);
        },
        ISuccessfull(e) {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            this.$message({
                message: '成功了哦!,' + e,
                type: 'success'
            });
        },
        handleSizeChange(e) {
            this.pageSize = e;
            this.list();
        },
        handleCurrentChange(e) {
            this.page = e;
            this.list();
        },
        list(...arg) {
            let it = this, xml = [];
            it.loading = true;
            arg == '' ? null : ~function () {
                arg.forEach((arr, index) => {
                    if (arr.indexOf(':') != -1) {  //处理2、3数据
                        _data[arr.split(':')[0]] = arr.split(':')[1];
                    }
                })
                if (arg[0] != '' && arg[1] != '') {  //处理1、2数据
                    _data[arg[0]] = arg[1]
                };
                if (arg[4]) {  //处理时间
                    _data['startDate'] = ym.init.getDateTime(arg[4][0]);
                    _data['endDate'] = ym.init.getDateTime(arg[4][0]);
                }
            }();
            if (uri == 'manage_prodcut_list_list') _data['type'] = 1;  //临时处理存在此接口存在type 数值问题
            if (uri == 'manage_machine_version') _data['type'] = 1;  //临时处理存在此接口存在type 数值问题
            if (uri == 'find_machine_advertisement_list') _data['type'] = 1;
            if (uri == 'manage_advertisement_list_list') _data['type'] = 1;
            if (uri == 'client_user_list') _data['type'] = 1;
            if (uri == 'manage_dividend_list') _data['type'] = 1;
            _data['page'] = it.page;
            ym.init.XML({
                method: (uri == 'find_machine_poi_list' || uri == 'get_activity_list' || uri == 'statistics_list' || uri == 'maintainer_list' ? "GET" : 'POST'),
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                        switch (uri) {
                            case `find_user_list`:   //管理员列表
                                for (let i = 0; i < res.adminShowList.length; i++) {
                                    xml.push({
                                        adminId: res.adminShowList[i].adminId,
                                        realName: res.adminShowList[i].realName,
                                        adminName: res.adminShowList[i].adminName,
                                        roleId: it.StatusName.get('free').user.get(res.adminShowList[i].roleId),
                                        adminStatus: it.StatusName.get('free').statues.get(res.adminShowList[i].adminStatus),
                                        nickName: res.adminShowList[i].nickName + '/' + res.adminShowList[i].userId,
                                        registerTime: ym.init.getDateTime(res.adminShowList[i].registerTime),
                                        parentAdminName: res.adminShowList[i].parentAdminName
                                    })
                                }
                                break;
                            case `find_log_list`:  //管理员日志列表
                                for (let i = 0; i < res.logInfoList.length; i++) {
                                    xml.push({
                                        adminName: res.logInfoList[i].adminName,
                                        logContent: res.logInfoList[i].logContent,
                                        logTime: ym.init.getDateTime(res.logInfoList[i].logTime),
                                        permissionName: res.logInfoList[i].permissionName,
                                        realName: res.logInfoList[i].realName,
                                        roleId: it.statusName.get('free').user.get(res.logInfoList[i].roleId)
                                    })
                                }
                                break;
                            case `find_formula_list`: //配方列表
                                for (let i = 0; i < res.formulaInfoList.length; i++) {
                                    xml.push({
                                        formulaId: res.formulaInfoList[i].formulaId,
                                        formulaName: res.formulaInfoList[i].formulaName,
                                        createTime: ym.init.getDateTime(res.formulaInfoList[i].createTime),
                                        machineType: it.StatusName.get('free').machineType.get(res.formulaInfoList[i].machineType),
                                        formulaTemperature: res.formulaInfoList[i].formulaTemperature
                                    })
                                }
                                break;
                            case `find_product_list`:  //产品列表
                                for (let i = 0; i < res.productShowList.length; i++) {
                                    xml.push({
                                        productId: res.productShowList[i].productId,
                                        productName: res.productShowList[i].productName,
                                        productPrice: parseFloat(res.productShowList[i].productPrice / 100).toFixed(2),
                                        productPicurl: res.productShowList[i].productPicurl,
                                        machineType: it.StatusName.get('free').machineType.get(res.productShowList[i].machineType),

                                        formulaName: res.productShowList[i].formulaName,
                                        bunkerNumber: res.productShowList[i].bunkerNumber,
                                        createTime: ym.init.getDateTime(res.productShowList[i].createTime).split(' ')[0],
                                        productRank: res.productShowList[i].productRank,
                                        productComment: res.productShowList[i].productComment
                                    })
                                }
                                break;
                            case `manage_prodcut_list_list`:   //产品清单列表
                                for (let i = 0; i < res.productListList.length; i++) {
                                    xml.push({
                                        listId: res.productListList[i].listId,
                                        listName: res.productListList[i].listName,
                                        machineType: it.StatusName.get('free').machineType.get(res.productListList[i].machineType)
                                    })
                                }
                                break;
                            case `find_machine_list`:
                                ym.init.XML({
                                    method: 'POST',
                                    uri: token._j.URLS.Development_Server_ + 'find_machine_number',
                                    async: true,
                                    xmldata: {
                                        id: ym.init.COMPILESTR.decrypt(token.id),
                                        token: ym.init.COMPILESTR.decrypt(token.asset),
                                        url: u
                                    },
                                    done: function (res) {
                                        it.machineNumbers['machineCount'] = res.machineCount;
                                        it.machineNumbers['offLineNum'] = res.offLineNum;
                                        it.machineNumbers['starvingNum'] = res.starvingNum;
                                        it.machineNumbers['faultNum'] = res.faultNum;
                                    }
                                })
                                for (let i = 0; i < res.machineShowList.length; i++) {
                                    xml.push({
                                        machineNumber: res.machineShowList[i].machineNumber,
                                        adminName: res.machineShowList[i].adminName,
                                        machineAddrDesc: res.machineShowList[i].machineAddrDesc,
                                        machineType: res.machineShowList[i].machineType,
                                        machineSn: res.machineShowList[i].machineSn,
                                        machineScenePicUrl: res.machineShowList[i].machineScenePicUrl,
                                        wxacode: res.machineShowList[i].wxacode,
                                        onlineStatus: res.machineShowList[i].onlineStatus,
                                        failureStatus: res.machineShowList[i].failureStatus,
                                        materialStatus: res.machineShowList[i].materialStatus
                                    })
                                }
                                break;
                            case `manage_machine_version`:
                                for (let i = 0; i < res.machineUpdateList.length; i++) {
                                    xml.push({
                                        mUpdateId: res.machineUpdateList[i].mUpdateId,
                                        mUpdateVersion: res.machineUpdateList[i].mUpdateVersion,
                                        versionCode: res.machineUpdateList[i].versionCode,
                                        mUpdateTime: res.machineUpdateList[i].mUpdateTime,
                                        mUpdateDes: res.machineUpdateList[i].mUpdateDes,
                                        machineType: res.machineUpdateList[i].machineType,
                                        mUpdateUrl: res.machineUpdateList[i].mUpdateUrl
                                    })
                                }
                                break;
                            case `find_machine_poi_list`:
                                for (let i = 0; i < res.poiList.length; i++) {
                                    xml.push({
                                        poiId: res.poiList[i].poiId,
                                        longitude: res.poiList[i].longitude,
                                        latitude: res.poiList[i].latitude,
                                        addr: res.poiList[i].addr,
                                        mapMarkerIcon: res.poiList[i].mapMarkerIcon,
                                        province: res.poiList[i].province,
                                        city: res.poiList[i].city,
                                        district: res.poiList[i].district,
                                        machineUrl: res.poiList[i].machineUrl,
                                        hide: res.poiList[i].hide,
                                        machineCount: res.poiList[i].machineCount,
                                        numberList: res.poiList[i].numberList
                                    })
                                }
                                break;
                            case `find_machine_advertisement_list`:
                                for (let i = 0; i < res.machineAdvertisementList.length; i++) {
                                    xml.push({
                                        madId: res.machineAdvertisementList[i].madId,
                                        madTitle: res.machineAdvertisementList[i].madTitle,
                                        madUrl: res.machineAdvertisementList[i].madUrl,
                                        madStatus: res.machineAdvertisementList[i].madStatus,
                                        madTime: res.machineAdvertisementList[i].madTime,
                                        madOrder: res.machineAdvertisementList[i].madOrder
                                    })
                                }
                                break;
                            case `manage_advertisement_list_list`:
                                for (let i = 0; i < res.advertisementListList.length; i++) {
                                    xml.push({
                                        listId: res.advertisementListList[i].listId,
                                        listName: res.advertisementListList[i].listName,
                                    })
                                }
                                break;
                            case `statistics_shop`:
                                for (let i = 0; i < res.package.ShopMachine.length; i++) {
                                    xml.push({
                                        adminID: res.package.ShopMachine[i].adminID,
                                        adminName: res.package.ShopMachine[i].adminName,
                                        payMoney: res.package.ShopMachine[i].payMoney,
                                        payCount: res.package.ShopMachine[i].payCount,
                                        machineCount: res.package.ShopMachine[i].machineCount,
                                        realName: res.package.ShopMachine[i].realName
                                    })
                                }
                                break;
                            case `get_activity_list`:
                                for (let i = 0; i < res.activityList.length; i++) {
                                    xml.push({
                                        id: res.activityList[i].id,
                                        comment: res.activityList[i].comment,
                                        name: res.activityList[i].name,
                                        startTime: res.activityList[i].startTime
                                    })
                                }
                                break;
                            case `client_user_list`:
                                // ym.init.XML({ //会员类型
                                //     method: 'POST',
                                //     uri: token._j.URLS.Development_Server_ + 'find_client_user_list',
                                //     async: false,
                                //     xmldata: _data,
                                //     done: function (res) {
                                //         try {
                                //             ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                //               it.html = `<el-button>用户类型</el-button>
                                //               <el-select v-model="select" slot="prepend" placeholder="请选择">
                                //                   <el-option label="不限" value="userType:"></el-option>
                                //                   <el-option label="普通用户" value="userType:1"></el-option>
                                //                   <el-option label="测试用户" value="userType:2"></el-option>
                                //                   <el-option label="免单用户" value="userType:3"></el-option>
                                //               </el-select>`
                                //             })() :
                                //                 (() => {
                                //                     throw "收集到错误：\n\n" + res.statusCode.msg;
                                //                 })()
                                //         } catch (error) {
                                //             it.IError(error);
                                //         }
                                //     }
                                // });
                                for (let i = 0; i < res.clientUserList.length; i++) {
                                    xml.push({
                                        userId: res.clientUserList[i].userId,
                                        headPicUrl: res.clientUserList[i].headPicUrl,
                                        nickName: res.clientUserList[i].nickName,
                                        mobile: res.clientUserList[i].mobile,
                                        userType: res.clientUserList[i].userType,
                                        source: res.clientUserList[i].source,
                                        userStatus: res.clientUserList[i].userStatus,
                                        registerTime: res.clientUserList[i].registerTime,
                                        compensateMilliliter: res.clientUserList[i].compensateMilliliter,
                                        memberMilliliter: res.clientUserList[i].memberMilliliter
                                    })
                                }
                                break;
                            case `get_member_list`:
                                for (let i = 0; i < res.memberRuleList.length; i++) {
                                    xml.push({
                                        memberRuleId: res.memberRuleList[i].memberRuleId,
                                        memberRuleName: res.memberRuleList[i].memberRuleName,
                                        memberLevel: res.memberRuleList[i].memberLevel,
                                        duration: res.memberRuleList[i].duration,
                                        payMoney: res.memberRuleList[i].payMoney,
                                        discount: res.memberRuleList[i].discount,
                                        discountsStartTime: res.memberRuleList[i].discountsStartTime,
                                        discountsEndTime: res.memberRuleList[i].discountsEndTime,
                                        milliliter: res.memberRuleList[i].milliliter,
                                        memberPicUrl: res.memberRuleList[i].memberPicUrl,
                                        status: res.memberRuleList[i].status
                                    })
                                }
                                break;
                            case `find_fault_feedback_list`:
                                for (let i = 0; i < res.faultFeedbackShowList.length; i++) {
                                    xml.push({
                                        nickName: res.faultFeedbackShowList[i].nickName,
                                        faultPhone: res.faultFeedbackShowList[i].faultPhone,
                                        machineNumber: res.faultFeedbackShowList[i].machineNumber,
                                        machineAddr: res.faultFeedbackShowList[i].machineAddr,
                                        faultTime: res.faultFeedbackShowList[i].faultTime,
                                        faultContent: res.faultFeedbackShowList[i].faultContent,
                                        orderId: res.faultFeedbackShowList[i].orderId
                                    })
                                }
                                break;
                            case `find_coupon_list`:
                                for (let i = 0; i < res.couponInfoList.length; i++) {
                                    xml.push({
                                        couponId: res.couponInfoList[i].couponId,
                                        couponName: res.couponInfoList[i].couponName,
                                        couponType: res.couponInfoList[i].couponType,
                                        couponRangeName: res.couponInfoList[i].couponRangeName,
                                        couponMoney: res.couponInfoList[i].couponMoney,
                                        couponTime: res.couponInfoList[i].couponTime
                                    })
                                }
                                break;
                            case `find_order_list`:
                                for (let i = 0; i < res.orders.length; i++) {
                                    xml.push({
                                        orderId: res.orders[i].orderId,
                                        spendingMoney: res.orders[i].spendingMoney,
                                        paymentMoney: res.orders[i].paymentMoney,
                                        paymentType: res.orders[i].paymentType,
                                        consumptionType: res.orders[i].consumptionType,
                                        orderStatus: res.orders[i].orderStatus,
                                        paymentTime: res.orders[i].paymentTime
                                    })
                                }
                                break;
                            case `refund_order_list`:
                                for (let i = 0; i < res.list.length; i++) {
                                    xml.push({
                                        orderId: res.list[i].orderId,
                                        refundId: res.list[i].refundId,
                                        createTime: res.list[i].createTime,
                                        paymentTime: res.list[i].paymentTime,
                                        refundTime: res.list[i].refundTime,
                                        refundMoney: res.list[i].refundMoney,
                                        refundType: res.list[i].refundType,
                                        refundStatus: res.list[i].refundStatus,
                                        orderType: res.list[i].orderType
                                    })
                                }
                                break;
                            case `statistics_list`:
                                for (let i = 0; i < res.statisticsList.length; i++) {
                                    xml.push({
                                        statisticsId: res.statisticsList[i].statisticsId,
                                        statisticsTime: res.statisticsList[i].statisticsTime,
                                        statisticsDate: res.statisticsList[i].statisticsDate,
                                        statisticsMachine: res.statisticsList[i].statisticsMachine,
                                        adminName: res.statisticsList[i].adminName,
                                        refundMoney: res.statisticsList[i].refundMoney,
                                        orderCount: res.statisticsList[i].orderCount,
                                        cancelOrderCount: res.statisticsList[i].cancelOrderCount,
                                        refundOrderCount: res.statisticsList[i].refundOrderCount,
                                        sendCount: res.statisticsList[i].sendCount,
                                        refundAmount: res.statisticsList[i].refundAmount,
                                        sendUsers: res.statisticsList[i].sendUsers,
                                        userCount: res.statisticsList[i].userCount,
                                        completeAmount: res.statisticsList[i].completeAmount
                                    })
                                }
                                break;
                            case `manage_dividend_list`:
                                for (let i = 0; i < res.dList.length; i++) {
                                    xml.push({
                                        dId: res.dList[i].dId,
                                        orderId: res.dList[i].orderId,
                                        recId: res.dList[i].recId,
                                        recName: res.dList[i].recName,
                                        recType: res.dList[i].recType,
                                        recMoney: res.dList[i].recMoney,
                                        allMoney: res.dList[i].allMoney,
                                        recTime: res.dList[i].recTime
                                    })
                                }
                                break;
                            case `maintainer_list`:
                                for (let i = 0; i < res.maintainerList.length; i++) {
                                    xml.push({
                                        maintainerId: res.maintainerList[i].maintainerId,
                                        maintainerName: res.maintainerList[i].maintainerName,
                                        maintainerPhone: res.maintainerList[i].maintainerPhone,
                                        adminName: res.maintainerList[i].adminName,
                                        nickName: res.maintainerList[i].nickName,
                                        maintainerStatus: res.maintainerList[i].maintainerStatus,
                                        auditStatus: res.maintainerList[i].auditStatus,
                                        royaltyRate: res.maintainerList[i].royaltyRate,
                                        auditAdminName: res.maintainerList[i].auditAdminName
                                    })
                                }
                                break;
                            case `material_log_list`:
                                for (let i = 0; i < res.materialLog.length; i++) {
                                    xml.push({
                                        materialLogId: res.materialLog[i].materialLogId,
                                        machineNumber: res.materialLog[i].machineNumber,
                                        adminName: res.materialLog[i].adminName,
                                        productId: res.materialLog[i].productId,
                                        productName: res.materialLog[i].productName,
                                        orderId: res.materialLog[i].orderId,
                                        createTime: res.materialLog[i].createTime,
                                        materialDeductionList: (() => {
                                            let _arr = [];
                                            res.materialLog[i].materialDeductionList.forEach(_val => {
                                                _arr.push({
                                                    '料仓': _val.bunkerName,
                                                    '扣减': _val.deduraction
                                                });
                                            })
                                            return JSON.stringify(_arr)
                                        })()
                                    })
                                }
                                break;
                            case `machine_runtime_list`:
                                for (let i = 0; i < res.runtimeList.length; i++) {
                                    xml.push({
                                        runtimeId: res.runtimeList[i].runtimeId,
                                        machineSn: res.runtimeList[i].machineSn,
                                        machineNumber: res.runtimeList[i].machineNumber,
                                        machineType: res.runtimeList[i].machineType,
                                        createTime: res.runtimeList[i].createTime,
                                        endTime: res.runtimeList[i].endTime,
                                        limitShow: res.runtimeList[i].limitShow,
                                        status: res.runtimeList[i].status
                                    })
                                }
                                break;
                            default:
                                break;
                        }
                        it.total = parseInt(res.pageCount * 20);
                        // it.currentPage = parseInt(res.pageCount);  数据总条数
                        it.tableData = xml;
                        setTimeout(()=>{
                            it.loading = false;
                        },500)
                    })()
                        :
                        it.IError(res.statusCode.msg);
                }
            })
        },
        crud(arg) {
            window.parent.document.getElementById('tagHref').setAttribute('src', `../${arg.uri}.html?[hash]${arg.enitId ? '*' + encodeURI(JSON.stringify(arg.enitId)) : ''}`); // 编辑带参数
        },
        //列表操作
        //清单列表
        listoperation(e) {
            const it = this;
            switch (e._tag) {
                case 'manage_prodcut_list_list':
                    switch (e._type) {
                        case "A":
                            _data['type'] = 6;
                            _data['machineType'] = e._evt.machineType;
                            _data['name'] = e._evt.name;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            it.ISuccessfull(res.statusCode.msg);
                                            it.InputAndVisible = false
                                            it.list();  //刷新列表
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        case "S":
                            _data['type'] = 2;
                            _data['page'] = 1;
                            _data['listId'] = e._evt.listId;
                            it.listId = e._evt.listId;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        it.TableFormData = [];
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            res.productShowList.forEach(element => {
                                                it.TableFormData.push({
                                                    productId: element.productId,
                                                    productName: element.productName,
                                                    productPrice: element.productPrice,
                                                    formulaName: element.formulaName,
                                                    bunkerNumber: element.bunkerNumber,
                                                    createTime: element.createTime,
                                                    productRank: element.productRank,
                                                    machineType: element.machineType
                                                });
                                            });
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        case "E":
                            _data['type'] = 3;
                            _data['listId'] = it.listId;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        it.UpdateTableFormData = [];
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            res.productInfoList.forEach((element, index) => {
                                                it.UpdateTableFormData.push({
                                                    productId: element.productId,
                                                    productName: element.productName,
                                                    productPrice: element.productPrice,
                                                    productPicurl: element.productPicurl,
                                                    formulaName: element.formulaName,
                                                    bunkerNumber: element.bunkerNumber,
                                                    createTime: element.createTime,
                                                    productRank: element.productRank,
                                                    machineType: (element.machineType != 1 ? "小型桌面机" : "大型柜式机"),
                                                    productComment: element.productComment
                                                });
                                                if (res.productIdList) {
                                                    res.productIdList.forEach(e => {
                                                        if (e == element.productId) {
                                                            it.$nextTick(function () {
                                                                it.tableChecked(3);  //每次更新了数据，触发这个函数即可。
                                                            });
                                                        }
                                                    })
                                                };
                                            });
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        case "P":  //编辑清单
                            _data['type'] = 4;
                            _data['listId'] = it.listId;
                            _data['productId'] = it.productId;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        it.UpdateTableFormData = [];
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            it.ISuccessfull(res.statusCode.msg);
                                            it.UpdateTableAndVisible = false;
                                            it.listoperation({ _tag: 'manage_prodcut_list_list', _evt: { listId: it.listId }, _type: 'S' });  //刷新列表
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        case "D":
                            _data['type'] = 5;
                            _data['listId'] = e._evt.listId;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: true,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            it.ISuccessfull(res.statusCode.msg);
                                            it.list()  //刷新列表
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        default:
                            break;
                    }
                    break;
                case 'manage_advertisement_list_list':   //视频广告清单
                    switch (e._type) {
                        case "A":
                            _data['type'] = 6;
                            _data['name'] = e._evt.name;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            it.ISuccessfull(res.statusCode.msg);
                                            it.InputAndVisible = false
                                            delete _data['name']
                                            it.list();  //刷新列表
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        case "S":
                            _data['type'] = 2;
                            _data['page'] = 1;
                            _data['listId'] = e._evt.listId;
                            it.listId = e._evt.listId;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        it.TableFormData = [];
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            res.advertisementList.forEach(element => {
                                                it.TableFormData.push({
                                                    madId: element.madId,
                                                    madOrder: element.madOrder,
                                                    madSize: element.madSize,
                                                    madStatus: element.madStatus,
                                                    madTime: element.madTime,
                                                    madTitle: element.madTitle,
                                                    madType: element.madType,
                                                    madUrl: element.madUrl
                                                });
                                            });
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        case "E":
                            _data['type'] = 3;
                            _data['listId'] = it.listId;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        it.UpdateTableFormData = [];
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            res.advertisementInfoList.forEach((element, index) => {
                                                it.UpdateTableFormData.push({
                                                    madId: element.madId,
                                                    madOrder: element.madOrder,
                                                    madSize: element.madSize,
                                                    madStatus: element.madStatus,
                                                    madTime: element.madTime,
                                                    madTitle: element.madTitle,
                                                    madType: element.madType,
                                                    madUrl: element.madUrl
                                                });
                                                if (res.adIdList) {
                                                    res.adIdList.forEach(e => {
                                                        if (e == element.madId) {
                                                            it.$nextTick(function () {
                                                                it.tableChecked(index);  //每次更新了数据，触发这个函数即可。
                                                            });
                                                        }
                                                    })
                                                };
                                            });
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        case "P":  //编辑清单
                            _data['type'] = 4;
                            _data['listId'] = it.listId;
                            _data['adId'] = it.adIds;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        it.UpdateTableFormData = [];
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            it.ISuccessfull(res.statusCode.msg);
                                            it.UpdateTableAndVisible = false;
                                            it.listoperation({ _tag: 'manage_advertisement_list_list', _evt: { listId: it.listId }, _type: 'S' });  //刷新列表
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        case "D":
                            _data['type'] = 5;
                            _data['listId'] = e._evt.listId;
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + uri,
                                async: true,
                                xmldata: _data,
                                done: function (res) {
                                    try {
                                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                            it.ISuccessfull(res.statusCode.msg);
                                            it.list()  //刷新列表
                                        })() :
                                            (() => {
                                                throw "收集到错误：\n\n" + res.statusCode.msg;
                                            })()
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                }
                            });
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        },
        handleSelectionChange(val) {  //下拉选项
            this.multipleSelection = val;
            this.productCount = val.length;
            this.productId = [];
            this.adIds = [];
            this.machineNumber = [];
            this.adminIds = [];
            this.userMode = [];
            val.forEach(e => {
                this.productId.push(e.productId)
                this.machineNumber.push(e.machineNumber)
                this.adminIds.push(e.adminId)
                this.adIds.push(e.madId)
                e.userId != "无" ? this.userIdts.push(e.userId) : null;
                this.userMode.push(e); //批量操作用户类型
            });
        },
        filterTag(value, row) {
            return row.machineType === value;
        },
        tableChecked(e) {
            this.$refs.multipleTable.toggleRowSelection(this.UpdateTableFormData[e], true);
        },
        searchAPIs(_v) {  //查找API
            const it = this;
            switch (_v._uri) {
                case 'manage_machine_product_relation':  //清单的绑定解绑
                    _v._type.forEach(e => {
                        _data['type'] = e;
                        _data['adminId'] = _v._id || '';
                        _data['listId'] = _v._listid || '';
                        _data['machineNumber'] = this.machineNumber || [];
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + _v._uri,
                            async: false,
                            xmldata: _data,
                            done: function (res) {
                                try {
                                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                        switch (e) {
                                            case 1:
                                                it.listIds = [];
                                                res.productListList.forEach(data => {
                                                    it.listIds.push({
                                                        value: data.listId,
                                                        label: data.listName
                                                    });
                                                })
                                                break;
                                            case 2:
                                                it.adminIds = [];
                                                res.userList.forEach(data => {
                                                    it.adminIds.push({
                                                        value: data.adminId,
                                                        label: data.adminName
                                                    });
                                                })
                                                break;
                                            case 3:
                                                it.UnFormData = [];
                                                for (let i = 0; i < res.machineNumberList.length; i++) {
                                                    it.UnFormData.push({
                                                        listId: res.machineNumberList[i].listId,
                                                        listName: res.machineNumberList[i].listName,
                                                        machineNumber: res.machineNumberList[i].machineNumber,
                                                        machineType: res.machineNumberList[i].machineType
                                                    })
                                                }
                                                break;
                                            default:
                                                it.ISuccessfull(res.statusCode.msg);
                                                it.detailTableAndVisible = false;
                                                break;
                                        }
                                    })() :
                                        (() => {
                                            throw "收集到错误：\n\n" + res.statusCode.msg;
                                        })()
                                } catch (error) {
                                    it.IError(error);
                                }
                            }
                        });
                    })
                    break;
                case 'get_machine_number_arr':  //绑定推送/解绑 
                    _data['name'] = '';  //处理name 缓存
                    this.userIds = [];  //处理name 缓存
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + _v._uri,
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            res.list.forEach(e => {
                                _data['machineNumber'] = e;
                                ym.init.XML({
                                    method: 'GET',
                                    uri: token._j.URLS.Development_Server_ + 'statistics_user_list',  //查询绑定关系
                                    async: false,
                                    xmldata: _data,
                                    done: function (res) {
                                        let uname = "无", uid = "无";
                                        res.statusCode.status != '4444' ? res.userList.forEach(arr => {
                                            uname = arr.nickName;
                                            uid = arr.userId;
                                        }) : null;
                                        it.UnFormData.push({
                                            machineNumber: e,
                                            userName: uname,
                                            userId: uid
                                        });
                                    }
                                })
                            })
                        }
                    })
                    break;
                case 'manage_advertisement_list_relation':  //广告视频清单
                    _v._type.forEach(e => {
                        _data['type'] = e;
                        _data['adminId'] = it.adminIds || [];
                        _data['listId'] = _v._listid || '';
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + _v._uri,
                            async: false,
                            xmldata: _data,
                            done: function (res) {
                                try {
                                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                        switch (e) {
                                            case 1:
                                                it.listIds = [];
                                                res.advertisementListList.forEach(data => {
                                                    it.listIds.push({
                                                        value: data.listId,
                                                        label: data.listName
                                                    });
                                                })
                                                break;
                                            case 2:
                                                it.UnFormData = [];
                                                res.userList.forEach(data => {
                                                    it.UnFormData.push({
                                                        adminId: data.adminId,
                                                        adListId: data.adListId,
                                                        listName: data.listName,
                                                        adminName: data.adminName
                                                    });
                                                })
                                                break;
                                            default:
                                                it.ISuccessfull(res.statusCode.msg);
                                                it.detailTableAndVisible = false;
                                                break;
                                        }
                                    })() :
                                        (() => {
                                            throw "收集到错误：\n\n" + res.statusCode.msg;
                                        })()
                                } catch (error) {
                                    it.IError(error);
                                }
                            }
                        });
                    })
                    break;
                case 'find_user_milliliter_log':  //用户列表的毫升数日志
                    delete _data['type']
                    _data['userId'] = _v._id;
                    _data['page'] = 1;
                    _data['start'] = '';
                    _data['end'] = '';
                    ym.init.XML({
                        method: 'GET',
                        uri: token._j.URLS.Development_Server_ + 'find_user_milliliter_log',  //查询绑定关系
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            res.logList.forEach(e => {
                                it.TableFormData.push({
                                    logId: e.logId,
                                    userId: e.userId,
                                    userName: e.userName,
                                    createTime: e.createTime,
                                    milliliterChange: e.milliliterChange,
                                    stateComment: e.stateComment
                                })
                            })
                        }
                    })
                    break;
                case 'find_user_couponList':  //用户列表的毫升数日志
                    _data['userId'] = _v._id;
                    _data['page'] = 1;
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + 'find_user_couponList',  //查询绑定关系
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            res.logList.forEach(e => {
                                it.TableFormData.push({
                                    logId: e.logId,
                                    userId: e.userId,
                                    userName: e.userName,
                                    createTime: e.createTime,
                                    milliliterChange: e.milliliterChange,
                                    stateComment: e.stateComment
                                })
                            })
                        }
                    })
                    break;
                default:
                    break
            }
        },
        querySearchAsync(queryString, cb) {  //动态查询用户
            const it = this;
            _data['type'] = 1;
            _data['name'] = queryString || '拉';
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + 'find_user_for_bind',  //查询绑定关系
                async: false,
                xmldata: _data,
                done: function (res) {
                    let _arr = [];
                    res.list.forEach(e => {
                        _arr.push({
                            value: e.nickName,
                            _id: e.userId
                        })
                    })
                    it.UnFormData = res.list; //用户批量操作

                    var results = queryString ? _arr.filter(it.createStateFilter(queryString)) : _arr;
                    clearTimeout(it.timeout);
                    it.timeout = setTimeout(() => {
                        cb(results);
                    }, 3000 * Math.random());
                }
            })

        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {  //取得选择的用户ID
            this.userIds = item._id;
            //this.UserTableData.push(item); //用户批量操作
        },
        bindUser(e) {  //执行绑定/解绑
            const it = this;
            switch (e._uri) {
                case 'client_user_list':
                    e._session != '' ? null : it.IError('缺少参数！');
                    let _sess = JSON.parse(e._session);
                    switch (_sess._uri) {
                        case 'manage_client_user':
                            _data['userType'] = it.user_type;  //用户类型
                            _data['type'] = _sess._type;  //用户
                            it.userMode.forEach(_evnt => {
                                _data['userId'] = _evnt.userId;
                                _data['nickName'] = _evnt.nickName;
                                ym.init.XML({
                                    method: 'POST',
                                    uri: token._j.URLS.Development_Server_ + _sess._uri,
                                    async: false,
                                    xmldata: _data,
                                    done: function (res) {
                                        it.detailTableAndVisible = false;
                                        it.ISuccessfull(res.statusCode.msg);
                                    }
                                })
                            })
                            delete _data['userType']
                            delete _data['userId']
                            delete _data['nickName']
                            it.list(); //刷新列表
                            break;
                        case 'grant_compensate_milliliter': //补偿流量
                            //grant_compensate_milliliter
                            _data['grantCount'] = it.grantCount;
                            _data['overdueTime'] = it.overdueTime;
                            _data['type'] = _sess._type;  //用户
                            it.userMode.forEach(_evnt => {
                                _data['userId'] = _evnt.userId;
                                _data['nickName'] = _evnt.nickName;
                                ym.init.XML({
                                    method: 'GET',
                                    uri: token._j.URLS.Development_Server_ + _sess._uri,
                                    async: false,
                                    xmldata: _data,
                                    done: function (res) {
                                        it.detailTableAndVisible = false;
                                        it.ISuccessfull(res.statusCode.msg);
                                    }
                                })
                            })
                            delete _data['grantCount']
                            delete _data['overdueTime']
                            it.list(); //刷新列表
                            break;
                        default:
                            break;
                    }
                    break;
                case 'batch_free_user':
                    _data['type'] = 2;
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + 'batch_free_user',
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            it.detailTableAndVisible = false;
                            it.ISuccessfull(res.statusCode.msg);
                        }
                    })
                    break;
                default:
                    _data['machineNumber'] = this.machineNumber;
                    _data['type'] = e._type;
                    _data['userIds'] = (e._id ? this.userIdts : this.userIds);
                    ym.init.XML({
                        method: 'GET',
                        uri: token._j.URLS.Development_Server_ + e._uri,
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            it.detailTableAndVisible = false;
                            it.ISuccessfull(res.statusCode.msg);
                        }
                    })
                    break;
            }
        },
        machineLog(e) {
            const it = this;
            delete _data['page'];
            _data['type'] = 5;
            _data['machineNumber'] = e.enitId.machineNumber;
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + 'manage_machine',
                async: true,
                xmldata: _data,
                done: function (res) {
                    res.machineFaultList.forEach(arr => {
                        it.machineLogs.push({
                            i: arr.faultTime,
                            t: arr.faultContent
                        })
                    })
                }
            })
        },
        fileChange(e) { //上传结构
            _data['type'] = 4;
            _data['mUpdateVersion'] = this.formData.mUpdateVersion;
            this.dialogImageUrl = '../images/Android.svg';
        },
        filemadUrlChange(e) {
            _data['type'] = 9;
        },
        fileExceed() {
            this.IError('只允许一张图片')
        },
        machineSceneSuccess(e) {
            this.formData.mUpdateUrl = e.realPath;
            this.formData.madUrl = e.realPath;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = '../images/Android.svg';
            this.dialogVisible = true;
        },
        machineVersion(_idata) {
            const it = this;
            _data['type'] = _idata._type;
            _data['machineType'] = _idata._machineType;
            _data['mUpdateVersion'] = _idata._d.mUpdateVersion;
            _data['versionCode'] = _idata._d.versionCode;
            _data['mUpdateDes'] = _idata._d.mUpdateDes;
            _data['mUpdateUrl'] = this.formData.mUpdateUrl;
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + _idata._uri,
                async: true,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                        it.ISuccessfull(res.statusCode.msg);
                        it.detailTableAndVisible = false;
                        it.list();
                    })() :
                        it.IError(res.statusCode.msg);
                }
            })
        },
        deleteData(_del) {  //删除操作
            const it = this;
            switch (_del._uri) {
                case "manage_poi":
                    _data['poiIds'] = _del._delete.poiId
                    _data['type'] = _del._type
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + _del._uri,
                        async: true,
                        xmldata: _data,
                        done: function (res) {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                it.list();
                            })() :
                                it.IError(res.statusCode.msg);
                        }
                    })
                    break;
                case 'manage_machine_advertisement':
                    _data['madId'] = _del._parameter
                    _data['type'] = _del._type
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + _del._uri,
                        async: true,
                        xmldata: _data,
                        done: function (res) {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                it.list();
                            })() :
                                it.IError(res.statusCode.msg);
                        }
                    })
                    break;
                case 'manage_coupon':
                    _data['couponId'] = _del._parameter
                    _data['type'] = _del._type
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + _del._uri,
                        async: true,
                        xmldata: _data,
                        done: function (res) {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                it.list();
                            })() :
                                it.IError(res.statusCode.msg);
                        }
                    })
                    break;
                default:
                    break;
            }
        },
        addEventData(_event) {  //添加视频广告///优惠券赠送
            const it = this;
            switch (_event._uri) {
                case 'manage_machine_advertisement':
                    _data['madOrder'] = _event._parameter.madOrder;
                    _data['madTitle'] = _event._parameter.madTitle;
                    _data['madUrl'] = _event._parameter.madUrl;
                    _data['type'] = _event._type;
                    if (it.formData.madId) {
                        _data['madId'] = it.formData.madId;
                        _data['type'] = 4;
                    };
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + _event._uri,
                        async: true,
                        xmldata: _data,
                        done: function (res) {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                it.adevtmodel = false;
                                it.list();
                            })() :
                                it.IError(res.statusCode.msg);
                        }
                    })
                    break;
                case 'manage_coupon':  //赠送优惠券
                    _data['grantCount'] = _event._parameter;
                    _data['couponId'] = it.unbinadmin.couponId;
                    _data['userId'] = [];
                    it.userMode.forEach(e => {
                        _data['userId'].push(e.userId);  //用户ID
                    })
                    _data['type'] = _event._type;
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + _event._uri,
                        async: true,
                        xmldata: _data,
                        done: function (res) {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                it.detailTableAndVisible = false;
                                delete _data['name']
                                delete _data['grantCount']
                                delete _data['couponId']
                                delete _data['userId']
                                it.list();
                            })() :
                                it.IError(res.statusCode.msg);
                        }
                    })
                    break;
                default:
                    break;
            }
        },
        enitEventData(_event) {
            const it = this;
            switch (_event._uri) {
                case 'manage_machine_advertisement':
                    if (!_event._status) {
                        _data['madId'] = _event._parameter
                        _data['type'] = _event._type
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + _event._uri,
                            async: true,
                            xmldata: _data,
                            done: function (res) {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    it.formData.madTitle = res.machineAdvertisementInfo.madTitle
                                    it.formData.madUrl = res.machineAdvertisementInfo.madUrl
                                    it.formData.madOrder = res.machineAdvertisementInfo.madOrder
                                    it.formData.madId = res.machineAdvertisementInfo.madId
                                    it.imageList.madUrl.push({ name: 'madUrl', url: res.machineAdvertisementInfo.madUrl })
                                })() :
                                    it.IError(res.statusCode.msg);
                            }
                        })
                    } else { //madStatus
                        _data['madId'] = _event._parameter
                        _data['type'] = _event._type
                        _data['madStatus'] = _event._status
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + _event._uri,
                            async: true,
                            xmldata: _data,
                            done: function (res) {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.list()
                                })() :
                                    it.IError(res.statusCode.msg);
                            }
                        })
                    }
                    break;
                default:
                    break;
            }
        },
        getTime(e) {
            this.userCharts[0] = ym.init.getDateTime(e[0]);
            this.userCharts[1] = ym.init.getDateTime(e[1]);
        },
        userSelect(_event) {  //用户批量操作
            _event = JSON.parse(_event);
            const it = this;
            switch (_event._uri) {
                case 'manage_client_user':
                    if (_event._type == 2) {   //更改用户类型 
                        it.statues.user = true;
                        it.statues.state = false;
                        it.statues.flow = false;
                    } else {  //更改用户状态
                        it.statues.user = false;
                        it.statues.state = true;
                        it.statues.flow = false;
                    }
                    break;
                case 'grant_compensate_milliliter':  //更改用户毫升数
                    it.statues.user = false;
                    it.statues.state = false;
                    it.statues.flow = true;
                    break;
                default:
                    break;
            }
        },
        statusVip(e) { // 更改会员状态
            const it = this;
            _data['memberId'] = e;
            ym.init.XML({
                method: 'GET',
                uri: token._j.URLS.Development_Server_ + 'change_member_status',
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                            it.ISuccessfull(res.statusCode.msg);
                            it.list();
                        })() : (() => {
                            throw "收集到错误：\n\n" + res.statusCode.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            })
        },
        orderDetail(e) {  //订单详情
            const it = this;
            _data['orderId'] = e;
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + 'order_detail',
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                            it.order = {};
                            it.order.orderId = res.detail.orderId
                            it.order.userId = res.detail.userId
                            it.order.nickName = res.detail.nickName
                            it.order.headPicUrl = res.detail.headPicUrl
                            it.order.machineNumber = res.detail.machineNumber
                            it.order.machineType = res.detail.machineType
                            it.order.adminId = res.detail.adminId
                            it.order.adminName = res.detail.adminName

                            it.order.paymentType = res.detail.paymentType
                            it.order.spendingMoney = res.detail.spendingMoney
                            it.order.paymentMoney = res.detail.paymentMoney
                            it.order.productId = res.detail.productId
                            it.order.productName = res.detail.productName
                            it.order.flavorShow = JSON.stringify(res.detail.flavorShow)
                            it.order.couponName = res.detail.couponName
                            it.order.consumptionType = res.detail.consumptionType

                            it.order.orderStatus = res.detail.orderStatus
                            it.order.redeemCode = res.detail.redeemCode
                            it.order.paymentTime = res.detail.paymentTime
                            it.order.createTime = res.detail.createTime
                            it.order.orderType = res.detail.orderType
                            it.order.refundId = res.detail.refundId
                        })() : (() => {
                            throw "收集到错误：\n\n" + res.statusCode.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            })
        },
        refundMoneyNum(_event) { //order_refund 订单导出excel
            const it = this;
            it.loading = true
            _data['name'] = JSON.stringify({
                machineNumber: _event.machineNumber || '',
                adminName: _event.adminName || '',
                productName: _event.productName || '',
                couponName: _event.couponName || ''
            });
            _data['consumptionType'] = _event.consumptionType || '';
            _data['orderStatus'] = _event.orderStatus || '';
            _data['startTime'] = it.optionsTime[0] || '';
            _data['endTime'] = it.optionsTime[1] || '';
            _data['orderLine'] = _event.orderLine || '';
            _data['sort'] = _event.sort || '';
            _data['orderType'] = _event.orderType || '';
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + 'export_order_list',
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                            setTimeout(() => {
                                it.loading = false;
                            }, 500)
                            location.href = token._j.URLS.Development_Server_ + res.path;
                        })() : (() => {
                            throw "收集到错误：\n\n" + res.statusCode.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            })
        },
        getTime(_event) {   //时间区间
            this.optionsTime[0] = ym.init.getDateTime(_event[0]);
            this.optionsTime[1] = ym.init.getDateTime(_event[1]);
        },
        submit(_event, _type = 'POST') {
            const it = this;
            if (_event.en == 'pull') {  //编辑
                if (_event.d) {
                    _data['maintainerId'] = _event.d;
                    _type = 'GET';
                } else {
                    if (_event.unbinadmin.secc) {  //执行不同的操作
                        _data['operaType'] = 2
                        _data['operaVal'] = _event.unbinadmin.secc
                    } else if (_event.unbinadmin.bindMachine) {
                        _data['operaType'] = 5
                        _data['operaVal'] = _event.unbinadmin.bindMachine
                    } else {
                        _data['operaType'] = 4
                        _data['operaVal'] = it.userIds;
                    }
                }
            } else {   //添加
                _data['maintainerName'] = _event.formData.maintainerName || '';
                _data['maintainerPhone'] = _event.formData.maintainerPhone || '';
                _data['password'] = _event.formData.password || '';
                _data['userId'] = it.userIds;
            }
            ym.init.XML({
                method: _type,
                uri: token._j.URLS.Development_Server_ + _event.uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                            if (_event.en == 'pull' && _event.d) {
                                it.unbinadmin.maintainerName = res.maintainer.maintainerName;
                                it.unbinadmin.maintainerPhone = res.maintainer.maintainerPhone;
                                // it.unbinadmin.secc = res.maintainer.maintainerStatus;
                                it.unbinadmin.bindMachine = (res.maintainer.bindMachine == -1 ? '' : res.maintainer.bindMachine);
                                it.unbinadmin.state = (res.maintainer.nickName != '无' ? res.maintainer.nickName : '');
                                it.userIds = res.maintainer.userId;
                            } else {
                                it.ISuccessfull(res.statusCode.msg);
                                delete _data['name']
                                setTimeout(() => {
                                    it.TableAndVisible = false;
                                    it.detailTableAndVisible = false;
                                    it.loading = false;
                                }, 500)
                                it.list();
                            }
                        })() : (() => {
                            throw "收集到错误：\n\n" + res.statusCode.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            })
        },
        adminSubmit(_event) {  //超级管理员
            const it = this;
            if (_event.en == "pull") {
                _data['type'] = 1;
                _data['toAdminId'] = _event._d;
            } else {
                _data['type'] = 5;
                if (it.bool != '') {
                    delete _data['toAdminId']
                    delete _data['page']
                    _data['adminToken'] = it.bool.adminToken
                    _data['type'] = 6
                    _data['registerTime'] = it.bool.registerTime
                    _data['manageId'] = it.bool.manageId
                    _data['adminStatus'] = it.bool.adminStatus
                    _data['adminId'] = it.bool.adminId
                };
                _data['adminName'] = _event.formData.adminName;
                _data['adminPwd'] = _event.formData.adminPwd;
                _data['roleId'] = _event.formData.roleId;
                _data['realName'] = _event.formData.realName;
                _data['adminMobile'] = _event.formData.adminMobile;
                _data['userId'] = it.userIds;
                _data['named'] = _event.formData.named;
            }
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + _event.uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    try {
                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                            if (_event.en == 'pull' && _event._d) {
                                it.formData.adminName = res.adminUser.adminName;
                                it.formData.adminPwd = res.adminUser.adminPwd;
                                it.formData.roleId = res.adminUser.roleId;
                                it.formData.realName = res.adminUser.realName;
                                it.formData.adminMobile = res.adminUser.adminMobile;
                                it.formData.named = res.adminUser.named;
                                it.formData.state = (res.adminUser.nickName != '无' ? res.adminUser.nickName : '');
                                it.userIds = (res.adminUser.userId != -1 ? res.adminUser.userId : []);
                                it.bool = {
                                    adminToken: res.adminUser.adminToken || '',
                                    registerTime: ym.init.getDateTime(res.adminUser.registerTime) || '',
                                    manageId: res.adminUser.manageId || '',
                                    adminStatus: res.adminUser.adminStatus || '',
                                    adminId: res.adminUser.adminId
                                };
                            } else {
                                it.ISuccessfull(res.statusCode.msg);
                                delete _data['roleId']
                                delete _data['adminName']
                                delete _data['adminId']
                                delete _data['realName']
                                setTimeout(() => {
                                    it.TableAndVisible = false;
                                    it.detailTableAndVisible = false;
                                    it.loading = false;
                                }, 500)
                                it.list();
                            }
                        })() : (() => {
                            throw "收集到错误：\n\n" + res.statusCode.msg;
                        })();
                    } catch (error) {
                        it.IError(error);
                    }
                }
            })
        }
    }
});