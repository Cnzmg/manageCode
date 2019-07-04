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
                madId: ''
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
                adminIds: ''
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
            machineLogs: [],  //设备日志
            machineLogViews: false,
            fileData: _data,
            num: 1,
            dialogVisible: false,
            dialogImageUrl: '',
            adevtmodel: false,  //视频添加/编辑
            adIds: []
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
                            case `find_user_list`:
                                for (let i = 0; i < res.adminShowList.length; i++) {
                                    xml.push({
                                        adminId: res.adminShowList[i].adminId,
                                        realName: res.adminShowList[i].realName,
                                        adminName: res.adminShowList[i].adminName,
                                        roleId: res.adminShowList[i].roleId,
                                        adminStatus: res.adminShowList[i].adminStatus,
                                        nickName: res.adminShowList[i].nickName + '/' + res.adminShowList[i].userId,
                                        registerTime: res.adminShowList[i].registerTime,
                                        parentAdminName: res.adminShowList[i].parentAdminName
                                    })
                                }
                                break;
                            case `find_log_list`:
                                for (let i = 0; i < res.logInfoList.length; i++) {
                                    xml.push({
                                        adminName: res.logInfoList[i].adminName,
                                        logContent: res.logInfoList[i].logContent,
                                        logTime: res.logInfoList[i].logTime,
                                        permissionName: res.logInfoList[i].permissionName,
                                        realName: res.logInfoList[i].realName,
                                        roleId: res.logInfoList[i].roleId
                                    })
                                }
                                break;
                            case `find_formula_list`:
                                for (let i = 0; i < res.formulaInfoList.length; i++) {
                                    xml.push({
                                        formulaId: res.formulaInfoList[i].formulaId,
                                        formulaName: res.formulaInfoList[i].formulaName,
                                        createTime: res.formulaInfoList[i].createTime,
                                        machineType: res.formulaInfoList[i].machineType,
                                        formulaTemperature: res.formulaInfoList[i].formulaTemperature
                                    })
                                }
                                break;
                            case `find_product_list`:
                                for (let i = 0; i < res.productShowList.length; i++) {
                                    xml.push({
                                        productId: res.productShowList[i].productId,
                                        productName: res.productShowList[i].productName,
                                        productPrice: res.productShowList[i].productPrice,
                                        productPicurl: res.productShowList[i].productPicurl,
                                        machineType: res.productShowList[i].machineType,

                                        formulaName: res.productShowList[i].formulaName,
                                        bunkerNumber: res.productShowList[i].bunkerNumber,
                                        createTime: res.productShowList[i].createTime,
                                        productRank: res.productShowList[i].productRank,
                                        productComment: res.productShowList[i].productComment
                                    })
                                }
                                break;
                            case `manage_prodcut_list_list`:
                                for (let i = 0; i < res.productListList.length; i++) {
                                    xml.push({
                                        listId: res.productListList[i].listId,
                                        listName: res.productListList[i].listName,
                                        machineType: res.productListList[i].machineType
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
                                        memberPicUrl: res.memberRuleList[i].memberPicUrl
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
                                        materialDeductionList: res.materialLog[i].materialDeductionList
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
                        it.loading = false;
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
                                                    console.log(res.productIdList != '');
                                                    res.productIdList.forEach(e => {
                                                        if (e == element.productId) {
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
            val.forEach(e => {
                this.productId.push(e.productId)
                this.machineNumber.push(e.machineNumber)
                this.adminIds.push(e.adminId)
                this.adIds.push(e.madId)
                e.userId != "无" ? this.userIdts.push(e.userId) : null;
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
            this.userIds.push(item._id);
        },
        bindUser(e) {  //执行绑定/解绑
            const it = this;
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
                default:
                    break;
            }
        },
        addEventData(_event) {
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
        }
    }
});