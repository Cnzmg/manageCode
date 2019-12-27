if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    window.onload = function (params) {
        for (let i = 0; i < document.getElementsByClassName('el-dialog').length; i++) {
            document.getElementsByClassName('el-dialog')[i].style.width = '100%';  //iframe 里面的class 
        }
        for (let i = 0; i < document.getElementsByClassName('w400').length; i++) {
            document.getElementsByClassName('w400')[i].style.width = '100%'; //限定的表单宽度
        }
    }
}

window.addEventListener('pageshow', function (params) {
    let par = params.target.URL.split('*').length > 1 ? params.target.URL.split('*')[0] : params.target.URL;
    const [
        $,
        token,
        u,
        uri
    ] = [
            parent.all.jq,
            parent.all.json,
            // parent.document.getElementById('tagHref').getAttribute('src').replace('..', '/manage').split('?')[0],
            '/manage' + par.substring(par.lastIndexOf('/'), par.lastIndexOf('?') == -1 ? par.length : par.lastIndexOf('?')),
            document.getElementById('c-container-list').getAttribute('data-uri'),
        ];
    var _data = {
        id: ym.init.COMPILESTR.decrypt(token.id),
        token: ym.init.COMPILESTR.decrypt(token.asset),
        url: u
    };
    new Vue({
        el: '#c-container-list',
        data: () => {
            return {
                fileUpdata: (process.env.NODE_ENV == "development" ? parent.all.json._j.URLS.Development_Files_ : parent.all.json._j.URLS.ForMal_Files_) + 'upload_file',
                loading: false,
                testAdmin: ym.init.COMPILESTR.decrypt(JSON.parse(sessionStorage.getItem('_a'))._i) == "yuanmenghhx" || ym.init.COMPILESTR.decrypt(JSON.parse(sessionStorage.getItem('_a'))._i) == "yuanmengKSX" ? false : true,  //指定的账号不能显示订单查看
                more: false,
                tableData: [],
                currentPage: 1,
                pageSize: 20,
                total: 0,
                page: 1,
                select: '',
                searchVal: '',
                searchName: 'name',
                search: '',  //优惠券 table 搜索
                listSearch: {
                    hasTest: 0,  //默认是排除测试数据
                    timeUnit: 3, //默认查询的是以日为单位的统计日志
                    _time_: ''
                },  //新的列表查询对象
                selectLong: '',
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
                    isShow: 1,  //是否显示
                    isSys: 0, //是否系统配置
                    disableConf: false, //disable 是否可操作
                    disableConfMahineName: '', //机器类型名
                    machineBunkerConfigAllId: '',//绑定机器的配置ID
                    numberBigConf: [  //料仓配置
                        {
                            name: '',
                            isShow: 1,
                            number: 1
                        },
                        {
                            name: '',
                            isShow: 1,
                            number: 2
                        },
                        {
                            name: '',
                            isShow: 1,
                            number: 3
                        },
                        {
                            name: '',
                            isShow: 1,
                            number: 4
                        },
                        {
                            name: '',
                            isShow: 1,
                            number: 5
                        },
                        {
                            name: '',
                            isShow: 1,
                            number: 6
                        },
                        {
                            name: '水',
                            isShow: 1,
                            number: 100
                        },
                        {
                            name: '杯子',
                            isShow: 1,
                            number: 160
                        },
                        {
                            name: '咖啡',
                            isShow: 1,
                            number: 170
                        },
                    ],
                    numberSmallConf: [
                        {
                            name: '水',
                            isShow: 1,
                            number: 100
                        },
                        {
                            name: '咖啡',
                            isShow: 1,
                            number: 170
                        },
                        {
                            name: '牛奶',
                            isShow: 1,
                            number: 180
                        }
                    ],
                    has: '',
                    bunkerConfigName: '',
                    raffleName: '',   //小程序大转盘配置
                    allowConsumeChance: 0,
                    allowMemberConvert: 0,
                    allowShareChance: 0,
                    convertMilliliter: 0,
                    maxLuckyValue: 500,
                    status: 1,
                    allowGrant: 0, //营销商户配置
                    grantMilliliter: 0, //营销商户配置
                    allowShare: 0, //营销商户配置
                    shareMilliliter: 0, //营销商户配置
                    allowSignIn: 0, //营销商户配置
                    signInMilliliter: 0, //营销商户配置
                    allowChangeCup: 0, //营销商户配置
                    changeMilliliter: 0, //营销商户配置
                    convertMilliliter: 0, //营销商户配置
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
                addressTable: false, //用户地址 
                addressTables: [],//地址数组
                pageTableNum: 1, //循环数组起始值
                pageTimerOut: false, // 终止值
                pageCount: 0, //总数值
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
                bunkerConf: {
                    name: '',
                    time: ''
                },
                bunkerConfNumber: true, //大小机器的料仓显示
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
                    state: false,
                    ount: false
                }, // 状态的显示/f
                overdueTime: '',
                grantCount: '',
                ount: '',  //赠送抽奖次数
                user_state: 1,
                order: {},
                refundMoney: {},  //订单退款
                pathUrlExe: {}, //导出
                optionsTime: [], //时间选择
                bool: '',
                StatusName: new Map([
                    ['free', {
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
                    }],
                    ['time', {
                        machineRun: new Map([
                            [1, '正常'],
                            [2, '故障'],
                            [3, '离线'],
                            [4, '维护'],
                            [5, '维修'],
                            [6, '维修完成']
                        ]),
                        couponTime: new Map([
                            [1, '年'],
                            [2, '月'],
                            [3, '日'],
                            [4, '周'],
                            [5, '小时']
                        ])
                    }]
                ]),
                miniTurnableMore: true,  //小程序大转盘添加按钮是否显示
                appointmentPay: {}, //预约详情
                objectId: '', //开通会员的查询 会员id
                objectIds: [], //开通会员的查询 会员id
                pageparams: {},  // 预存的页面搜索参数
            }
        },
        created: function () {
            this.list();
        },
        methods: {
            IError(err) {
                setTimeout(() => {
                    this.loading = false;
                    if (err == `未登录或身份验证过时`) {
                        // window.top.location.href = `../login.htm?hash:[]`;
                        parent.location.href = `../login.htm?hash:[nK6t7a]`;
                    }
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
                this.list(this.pageparams ? this.pageparams : null, true);
            },
            handleCurrentChange(e) {
                this.page = e;
                this.list(this.pageparams ? this.pageparams : null, true);
            },
            list(params, bool) {
                let _data_ = {}, it = this, xml = [];
                if (params) {
                    it.pageparams = params; //保存搜索条件
                    params._name_ && params._value_ ? params[params._name_] = params._value_ : null;  //第一搜索key of value
                    if (params._time_) {
                        params['startDate'] = ym.init.getDateTime(params._time_[0]).split(' ')[0];
                        params['endDate'] = ym.init.getDateTime(params._time_[1]).split(' ')[0];
                        if (uri == 'statistics_shop' || uri == 'find_order_list') {
                            params['startTime'] = params['startDate'];
                            params['endTime'] = params['endDate'];
                            delete params['startDate']
                            delete params['endDate']
                        }
                        if (uri == 'admin_statistics_log_list') {
                            if (params.timeUnit == 2) {
                                params['startDate'] = params['startDate'].substring(0, params['startDate'].lastIndexOf('-'));
                                params['endDate'] = params['endDate'].substring(0, params['endDate'].lastIndexOf('-'));
                            } else if (params.timeUnit == 1) {
                                params['startDate'] = params['startDate'].split('-')[0];
                                params['endDate'] = params['endDate'].split('-')[0];
                            }
                        }
                    }
                }
                _data_ = Object.assign({  //初始对象
                    id: ym.init.COMPILESTR.decrypt(token.id),
                    token: ym.init.COMPILESTR.decrypt(token.asset),
                    url: u
                }, params)
                it.loading = true;

                if (uri == 'manage_prodcut_list_list') _data_['type'] = 1;  //临时处理存在此接口存在type 数值问题
                if (uri == 'manage_machine_version') _data_['type'] = 1;
                if (uri == 'find_machine_advertisement_list') _data_['type'] = 1;
                if (uri == 'manage_advertisement_list_list') _data_['type'] = 1;
                if (uri == 'client_user_list') _data_['type'] = 1;
                if (uri == 'manage_dividend_list') _data_['type'] = 1;
                if (uri == 'find_order_list') {   //处理订单的操作
                    let _machin_ = parent.document.getElementById('tagHref').getAttribute('src').split('*'); // 处理从设备列表过来的订单查看
                    _data_['name'] = JSON.stringify(
                        {
                            machineNumber: _machin_.length > 1 ? JSON.parse(decodeURI(_machin_[1])).machineNumber : '',
                            orderId: params ? params['name'] : ''
                        }
                    )
                    _data_['url'] = '/manage/orderList.html';
                }
                if (uri == 'admin_statistics_list' || uri == 'machine_statistics_list' || uri == 'admin_statistics_log_list') {  //新商户统计
                    _data_['startDate'] = _data_['startDate'] || ym.init.getDateTime(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)).split(' ')[0];
                    _data_['endDate'] = _data_['endDate'] || ym.init.getDateTime(new Date()).split(' ')[0];
                    it.listSearch._time_ = [_data_['startDate'], _data_['endDate']]
                    _data_['hasTest'] = _data_['hasTest'] || it.listSearch.hasTest;
                    if (uri == 'admin_statistics_log_list') {
                        _data_['timeUnit'] = params ? params['timeUnit'] : it.listSearch.timeUnit;
                    }
                };
                _data_['page'] = !bool ? (() => {
                    it.currentPage = 1;
                    return it.currentPage
                })() : it.page;
                ym.init.XML({
                    method: (uri == 'find_machine_poi_list' || uri == 'get_activity_list' || uri == 'statistics_list' || uri == 'maintainer_list' || uri == 'sys_draw_raffle_info' || uri == 'sys_user_raffle_share_list' ? "GET" : 'POST'),
                    uri: token._j.URLS.Development_Server_ + uri,
                    async: false,
                    xmldata: _data_,
                    done: function (res) {
                        ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                            _data_ = {}; //清空
                            switch (uri) {
                                case `find_user_list`:   //admin users list
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
                                case `find_log_list`:  //admin logs list
                                    for (let i = 0; i < res.logInfoList.length; i++) {
                                        xml.push({
                                            adminName: res.logInfoList[i].adminName,
                                            logContent: res.logInfoList[i].logContent,
                                            logTime: ym.init.getDateTime(res.logInfoList[i].logTime),
                                            permissionName: res.logInfoList[i].permissionName,
                                            realName: res.logInfoList[i].realName,
                                            roleId: it.StatusName.get('free').user.get(res.logInfoList[i].roleId)
                                        })
                                    }
                                    break;
                                case `find_formula_list`: //formula list
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
                                case `find_product_list`:  //product list
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
                                case `manage_prodcut_list_list`:   //product detailed list
                                    for (let i = 0; i < res.productListList.length; i++) {
                                        xml.push({
                                            listId: res.productListList[i].listId,
                                            listName: res.productListList[i].listName,
                                            machineType: it.StatusName.get('free').machineType.get(res.productListList[i].machineType)
                                        })
                                    }
                                    break;
                                case `find_machine_list`:   //machine list
                                    ym.init.XML({   //machine sum、now state..
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
                                            it.machineNumbers['maintainNum'] = res.maintainNum;
                                            it.machineNumbers['repairNum'] = res.repairNum;
                                        }
                                    })
                                    for (let i = 0; i < res.machineShowList.length; i++) {
                                        xml.push({
                                            machineNumber: res.machineShowList[i].machineNumber,
                                            adminName: res.machineShowList[i].adminName,
                                            machineAddrDesc: res.machineShowList[i].machineAddrDesc,
                                            machineType: it.StatusName.get('free').machineType.get(res.machineShowList[i].machineType),
                                            machineSn: res.machineShowList[i].machineSn,
                                            machineScenePicUrl: res.machineShowList[i].machineScenePicUrl,
                                            wxacode: res.machineShowList[i].wxacode,
                                            onlineStatus: res.machineShowList[i].onlineStatus,
                                            failureStatus: res.machineShowList[i].failureStatus,
                                            materialStatus: res.machineShowList[i].materialStatus,
                                            maintainStatus: res.machineShowList[i].maintainStatus,
                                            runTimeStatus: res.machineShowList[i].runTimeStatus
                                        })
                                    }
                                    break;
                                case `manage_machine_version`:   //apk versions
                                    for (let i = 0; i < res.machineUpdateList.length; i++) {
                                        xml.push({
                                            mUpdateId: res.machineUpdateList[i].mUpdateId,
                                            mUpdateVersion: res.machineUpdateList[i].mUpdateVersion,
                                            versionCode: res.machineUpdateList[i].versionCode,
                                            mUpdateTime: ym.init.getDateTime(res.machineUpdateList[i].mUpdateTime),
                                            mUpdateDes: res.machineUpdateList[i].mUpdateDes,
                                            machineType: res.machineUpdateList[i].machineType,
                                            mUpdateUrl: res.machineUpdateList[i].mUpdateUrl
                                        })
                                    }
                                    break;
                                case `find_machine_poi_list`:  //small machine map setup
                                    for (let i = 0; i < res.poiList.length; i++) {
                                        xml.push({
                                            poiId: res.poiList[i].poiId,
                                            longitude: res.poiList[i].longitude,
                                            latitude: res.poiList[i].latitude,
                                            addr: res.poiList[i].addr,
                                            mapMarkerIcon: res.poiList[i].mapMarkerIcon,
                                            province: res.poiList[i].province + '/' + res.poiList[i].city + '/' + res.poiList[i].district,  //省市区组合
                                            machineUrl: res.poiList[i].machineUrl,
                                            hide: res.poiList[i].hide,
                                            machineCount: res.poiList[i].machineCount,
                                            numberList: res.poiList[i].numberList
                                        })
                                    }
                                    break;
                                case `find_machine_advertisement_list`:    //machine vedio advertisement list
                                    for (let i = 0; i < res.machineAdvertisementList.length; i++) {
                                        xml.push({
                                            madId: res.machineAdvertisementList[i].madId,
                                            madTitle: res.machineAdvertisementList[i].madTitle,
                                            madUrl: res.machineAdvertisementList[i].madUrl,
                                            madStatus: res.machineAdvertisementList[i].madStatus,
                                            madTime: ym.init.getDateTime(res.machineAdvertisementList[i].madTime),
                                            madOrder: res.machineAdvertisementList[i].madOrder
                                        })
                                    }
                                    break;
                                case `manage_advertisement_list_list`:  //machine vedio detail list
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
                                case `get_activity_list`:    // activity charts
                                    for (let i = 0; i < res.activityList.length; i++) {
                                        xml.push({
                                            id: res.activityList[i].id,
                                            comment: res.activityList[i].comment,
                                            name: res.activityList[i].name,
                                            startTime: ym.init.getDateTime(res.activityList[i].startTime)
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
                                    for (let i = 0; i < res.clientUserList.length; i++) {  //client user list
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
                                case `get_member_list`:  // client user member list
                                    for (let i = 0; i < res.memberRuleList.length; i++) {
                                        xml.push({
                                            memberRuleId: res.memberRuleList[i].memberRuleId,
                                            memberRuleName: res.memberRuleList[i].memberRuleName,
                                            memberLevel: res.memberRuleList[i].memberLevel,
                                            duration: res.memberRuleList[i].duration,
                                            payMoney: res.memberRuleList[i].payMoney,
                                            discount: res.memberRuleList[i].discount,
                                            discountsStartTime: ym.init.getDateTime(res.memberRuleList[i].discountsStartTime).split(' ')[0],
                                            discountsEndTime: ym.init.getDateTime(res.memberRuleList[i].discountsEndTime).split(' ')[0],
                                            milliliter: res.memberRuleList[i].milliliter,
                                            memberPicUrl: res.memberRuleList[i].memberPicUrl,
                                            status: res.memberRuleList[i].status
                                        })
                                    }
                                    break;
                                case `find_fault_feedback_list`:  //feedback list
                                    for (let i = 0; i < res.faultFeedbackShowList.length; i++) {
                                        xml.push({
                                            nickName: res.faultFeedbackShowList[i].nickName,
                                            faultPhone: res.faultFeedbackShowList[i].faultPhone,
                                            machineNumber: res.faultFeedbackShowList[i].machineNumber,
                                            // machineAddr: res.faultFeedbackShowList[i].machineAddr,
                                            faultTime: ym.init.getDateTime(res.faultFeedbackShowList[i].faultTime),
                                            faultContent: res.faultFeedbackShowList[i].faultContent,
                                            orderId: res.faultFeedbackShowList[i].orderId
                                        })
                                    }
                                    break;
                                case `find_coupon_list`:  //coupon list
                                    for (let i = 0; i < res.couponInfoList.length; i++) {
                                        xml.push({
                                            couponId: res.couponInfoList[i].couponId,
                                            couponName: res.couponInfoList[i].couponName,
                                            couponType: res.couponInfoList[i].couponType == 1 ? '优惠券' : res.couponInfoList[i].couponType == 2 ? '换购券' : res.couponInfoList[i].couponType == 3 ? '咖啡券' : res.couponInfoList[i].couponType == 4 ? '会员优惠券' : '折扣券',
                                            couponRangeName: res.couponInfoList[i].couponRangeName,
                                            couponMoney: parseFloat(res.couponInfoList[i].couponMoney / 100).toFixed(2),
                                            couponTime: res.couponInfoList[i].couponTime + `( ` + it.StatusName.get('time').couponTime.get(res.couponInfoList[i].timeUnit) + ` )`
                                        })
                                    }
                                    break;
                                case `find_order_list`:  //order list
                                    for (let i = 0; i < res.orders.length; i++) {
                                        xml.push({
                                            orderId: res.orders[i].orderId,
                                            spendingMoney: parseFloat(res.orders[i].spendingMoney).toFixed(2),
                                            paymentMoney: parseFloat(res.orders[i].paymentMoney).toFixed(2),
                                            paymentType: res.orders[i].paymentType,
                                            consumptionType: res.orders[i].consumptionType,
                                            orderStatus: res.orders[i].orderStatus,
                                            paymentTime: res.orders[i].paymentTime
                                        })
                                    }
                                    break;
                                case `refund_order_list`:  // refund order
                                    for (let i = 0; i < res.list.length; i++) {
                                        xml.push({
                                            orderId: res.list[i].orderId,
                                            refundId: res.list[i].refundId,
                                            createTime: res.list[i].createTime,
                                            paymentTime: res.list[i].paymentTime,
                                            refundTime: res.list[i].refundTime,
                                            refundMoney: parseFloat(res.list[i].refundMoney).toFixed(2),
                                            refundType: (res.list[i].refundType == -1 ? '未知' : res.list[i].refundType),
                                            refundStatus: res.list[i].refundStatus,
                                            orderType: res.list[i].orderType
                                        })
                                    }
                                    break;
                                case `statistics_list`:  //order charts list
                                    for (let i = 0; i < res.statisticsList.length; i++) {
                                        xml.push({
                                            statisticsId: res.statisticsList[i].statisticsId,
                                            statisticsTime: ym.init.getDateTime(res.statisticsList[i].statisticsTime).split(' ')[0],
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
                                case `manage_dividend_list`:  //share in the benefit or profit
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
                                case `maintainer_list`:  //maintainer users list
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
                                            auditAdminName: res.maintainerList[i].auditAdminName,
                                            bindMachine: (res.maintainerList[i].bindMachine == -1 ? '无' : res.maintainerList[i].bindMachine)
                                        })
                                    }
                                    break;
                                case `material_log_list`:  //material logs
                                    for (let i = 0; i < res.materialLog.length; i++) {
                                        xml.push({
                                            materialLogId: res.materialLog[i].materialLogId,
                                            machineNumber: res.materialLog[i].machineNumber,
                                            adminName: res.materialLog[i].adminName,
                                            productId: res.materialLog[i].productId,
                                            productName: res.materialLog[i].productName,
                                            orderId: res.materialLog[i].orderId,
                                            createTime: ym.init.getDateTime(res.materialLog[i].createTime),
                                            materialDeductionList: (() => {
                                                let _arr = [], productlogs = JSON.parse(res.materialLog[i].materialDeductionList);
                                                productlogs.forEach(_val => {
                                                    _arr.push(
                                                        '名称：' + _val.bunkerName,
                                                        '---扣减量：' + _val.deduraction + '---'
                                                    );
                                                })
                                                return _arr
                                            })()
                                        })
                                    }
                                    break;
                                case `machine_runtime_list`:  // machine run time logs
                                    for (let i = 0; i < res.runtimeList.length; i++) {
                                        xml.push({
                                            runtimeId: res.runtimeList[i].runtimeId,
                                            machineSn: res.runtimeList[i].machineSn,
                                            machineNumber: res.runtimeList[i].machineNumber,
                                            machineType: it.StatusName.get('free').machineType.get(res.runtimeList[i].machineType),
                                            createTime: ym.init.getDateTime(res.runtimeList[i].createTime),
                                            endTime: (res.runtimeList[i].endTime ? ym.init.getDateTime(res.runtimeList[i].endTime) : '无'),
                                            limitShow: res.runtimeList[i].limitShow,
                                            status: it.StatusName.get('time').machineRun.get(res.runtimeList[i].status)
                                        })
                                    }
                                    break;
                                case `draw_raffle_info_list`:  // draw_raffle_info_list run time logs
                                    for (let i = 0; i < res.data.length; i++) {
                                        xml.push({
                                            drawId: res.data[i].drawId,
                                            title: res.data[i].title,
                                            startTime: res.data[i].startTime ? ym.init.getDateTime(res.data[i].startTime) : '无',
                                            endTime: res.data[i].endTime ? ym.init.getDateTime(res.data[i].endTime) : '无',
                                            raffleType: res.data[i].raffleType,
                                            limit: res.data[i].limit,
                                            status: res.data[i].status,
                                            raffleVersion: res.data[i].raffleVersion,
                                            itemCount: res.data[i].itemCount
                                        })
                                    }
                                    break;
                                case `user_draw_raffle_log_list`:  // draw_raffle_info_list run time logs
                                    for (let i = 0; i < res.data.length; i++) {
                                        xml.push({
                                            drawInstanceId: res.data[i].drawInstanceId,
                                            userId: res.data[i].userId,
                                            nickName: res.data[i].nickName,
                                            drawId: res.data[i].drawId,
                                            drawName: res.data[i].drawName,
                                            raffleVersion: res.data[i].raffleVersion,
                                            itemName: res.data[i].itemName,
                                            itemType: res.data[i].itemType,
                                            objectId: res.data[i].objectId,
                                            objectInstanceId: res.data[i].objectInstanceId,
                                            machineNumber: res.data[i].machineNumber,
                                            isMember: res.data[i].isMember,
                                            createTime: ym.init.getDateTime(res.data[i].createTime),
                                            status: res.data[i].status,
                                            hasAddress: res.data[i].hasAddress,
                                            addressId: res.data[i].addressId
                                        })
                                    }
                                    break;
                                case `order_log_list`:  // order_log_list order logs
                                    for (let i = 0; i < res.data.length; i++) {
                                        xml.push({
                                            orderId: res.data[i].orderId,
                                            userId: res.data[i].userId,
                                            nickName: res.data[i].nickName,
                                            machineNumber: res.data[i].machineNumber,
                                            orderMoney: parseFloat(res.data[i].orderMoney).toFixed(2),
                                            paymentMoney: parseFloat(res.data[i].paymentMoney).toFixed(2),
                                            orderType: res.data[i].orderType,
                                            paymentType: res.data[i].paymentType,
                                            paymentTime: res.data[i].paymentTime
                                        })
                                    }
                                    break;
                                case `maintain_flow_log_list`:  //maintenanceLogs 
                                    for (let i = 0; i < res.data.length; i++) {
                                        xml.push({
                                            maintainFlowLogId: res.data[i].maintainFlowLogId,
                                            maintainerId: res.data[i].maintainerId,
                                            maintainerName: res.data[i].maintainerName,
                                            machineNumber: res.data[i].machineNumber,
                                            flowType: res.data[i].flowType,
                                            createTime: res.data[i].createTime,
                                            endTime: res.data[i].endTime,
                                            status: res.data[i].status
                                        })
                                    }
                                    break;
                                case `machine_bunker_config_list`:  //bunkerConf 
                                    for (let i = 0; i < res.data.length; i++) {
                                        xml.push({
                                            bindMachine: res.data[i].bindMachine,
                                            bunkerConfigName: res.data[i].bunkerConfigName,
                                            createTime: ym.init.getDateTime(res.data[i].createTime),
                                            isSys: (res.data[i].isSys == 1 ? '是' : '否'),
                                            machineBunkerConfigId: res.data[i].machineBunkerConfigId,
                                            machineType: it.StatusName.get('free').machineType.get(res.data[i].machineType)
                                        })
                                    }
                                    break;
                                case `sys_draw_raffle_info`:  //sys_draw_raffle_info 
                                    it.miniTurnableMore = false;  //是否可以出现新增
                                    let _obj = {};
                                    Object.keys(res.data).forEach((element, index) => {
                                        if (element == 'createTime' || element == 'updateTime') {
                                            _obj[element] = Object.values(res.data)[index] == -1 ? "无" : ym.init.getDateTime(Object.values(res.data)[index]);
                                        } else {
                                            _obj[element] = Object.values(res.data)[index] == -1 ? "无" : Object.values(res.data)[index];
                                        }
                                    })
                                    xml.push(_obj);
                                    res.totalCount = 1;
                                    break;
                                case `sys_draw_item_info_list`:  //add_or_update_sys_draw_item_info 
                                    for (let i = 0; i < res.data.length; i++) {
                                        xml.push({
                                            isMember: res.data[i].isMember,
                                            itemId: res.data[i].itemId,
                                            itemName: res.data[i].itemName,
                                            itemPicUrl: res.data[i].itemPicUrl,
                                            itemType: res.data[i].itemType,
                                            probability: res.data[i].probability,
                                            sort: res.data[i].sort,
                                            status: res.data[i].status
                                        })
                                    }
                                    break;
                                case `sys_user_draw_chance_list`:  //sys_user_draw_chance_list 
                                    for (let i = 0; i < res.data.length; i++) {  // 
                                        xml.push({
                                            chanceId: res.data[i].chanceId,
                                            drawChance: res.data[i].drawChance,
                                            luckyValue: res.data[i].luckyValue,
                                            nickName: res.data[i].nickName,
                                            userId: res.data[i].userId
                                        })
                                    }
                                    break;
                                case `sys_user_draw_chance_log_list`:  //sys_user_draw_chance_list 
                                    for (let i = 0; i < res.data.length; i++) {  // 
                                        xml.push({
                                            chanceLogId: res.data[i].chanceLogId,
                                            createTime: ym.init.getDateTime(res.data[i].createTime),
                                            logContent: res.data[i].logContent,
                                            logType: res.data[i].logType,
                                            orderId: res.data[i].orderId,
                                            raffleVersion: res.data[i].raffleVersion,
                                            status: res.data[i].status,
                                            userId: res.data[i].userId,
                                            nickName: res.data[i].nickName
                                        })
                                    }
                                    break;
                                case `sys_user_raffle_share_list`:  //分享列表 
                                    for (let i = 0; i < res.data.length; i++) {  // 
                                        xml.push({
                                            raffleShareId: res.data[i].raffleShareId,
                                            newNickName: res.data[i].newNickName,
                                            newUserId: res.data[i].newUserId,
                                            originNickName: res.data[i].originNickName,
                                            originUserId: res.data[i].originUserId,
                                            orderId: res.data[i].orderId
                                        })
                                    }
                                    break;
                                case `pre_sell_nape_log_list`:  //预约活动列表 
                                    for (let i = 0; i < res.data.length; i++) {  // 
                                        xml.push({
                                            address: res.data[i].address,
                                            createTime: res.data[i].createTime,
                                            mobile: res.data[i].mobile,
                                            named: res.data[i].named,
                                            napeName: res.data[i].napeName,
                                            nickName: res.data[i].nickName,
                                            userId: res.data[i].userId,
                                            orderId: res.data[i].orderId,
                                            paymentMoney: res.data[i].paymentMoney,
                                            redeemCode: res.data[i].redeemCode,
                                            status: res.data[i].status,
                                            target: res.data[i].target,
                                            targetId: res.data[i].targetId,
                                            statusStr: res.data[i].statusStr,
                                            preSellLogId: res.data[i].preSellLogId
                                        })
                                    }
                                    break;
                                case `sys_user_draw_log_list`:  //抽奖记录列表 
                                    for (let i = 0; i < res.data.length; i++) {  // 
                                        xml.push({
                                            drawLogId: res.data[i].drawLogId,
                                            createTime: res.data[i].createTime,
                                            userId: res.data[i].userId,
                                            itemName: res.data[i].itemName,
                                            createTime: res.data[i].createTime,
                                            nickName: res.data[i].nickName,
                                            address: res.data[i].address,
                                            itemType: res.data[i].itemType,
                                            status: res.data[i].status
                                        })
                                    }
                                    break;
                                case `admin_statistics_list`:  //新商户统计 
                                case `machine_statistics_list`:  //新设备统计 
                                    xml = res.data;
                                    break;
                                case `admin_marketing_config_list`:  //营销配置
                                    let _arr_ = [];
                                    res.dataList.forEach(element => {
                                        element.createTime = ym.init.getDateTime(element.createTime);
                                        _arr_.push(element)
                                    })
                                    xml = _arr_;
                                    break;
                                default:
                                    break;
                            }
                            it.total = parseInt(res.totalCount ? res.totalCount : res.pageCount * 20);//数据总条数
                            // it.currentPage = parseInt(res.pageCount); 
                            it.tableData = xml;
                            setTimeout(() => {
                                it.loading = false;
                            }, 500)
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
                                                        productPrice: parseFloat(element.productPrice / 100).toFixed(2),
                                                        formulaName: element.formulaName,
                                                        bunkerNumber: element.bunkerNumber,
                                                        createTime: ym.init.getDateTime(element.createTime).split(' ')[0],
                                                        productRank: element.productRank,
                                                        machineType: it.StatusName.get('free').machineType.get(element.machineType)
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
                                                        productPrice: parseFloat(element.productPrice / 100).toFixed(2),
                                                        productPicurl: element.productPicurl,
                                                        formulaName: element.formulaName,
                                                        bunkerNumber: element.bunkerNumber,
                                                        createTime: ym.init.getDateTime(element.createTime).split(' ')[0],
                                                        productRank: element.productRank,
                                                        machineType: it.StatusName.get('free').machineType.get(element.machineType),
                                                        productComment: element.productComment
                                                    });
                                                    if (res.productIdList) {
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
                    case 'manage_advertisement_list_list':   //machine vedio detail list
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
                                                        // madSize: element.madSize,  //视频大小
                                                        madStatus: (element.madStatus ? '上架' : '下架'),
                                                        madTime: ym.init.getDateTime(element.madTime).split(' ')[0],
                                                        madTitle: element.madTitle,
                                                        // madType: element.madType,  //广告类型
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
                                                        // madSize: element.madSize,
                                                        madStatus: (element.madStatus ? '上架' : '下架'),
                                                        madTime: ym.init.getDateTime(element.madTime).split(' ')[0],
                                                        madTitle: element.madTitle,
                                                        // madType: element.madType,
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
                if (uri == 'manage_prodcut_list_list') return false;   //阻止继续渲染清单的操作
                this.productId = [];
                this.adIds = [];
                this.machineNumber = [];
                this.adminIds = [];
                this.userMode = [];
                val.forEach(e => {
                    this.productId.push(e.productId || [])
                    this.machineNumber.push(e.machineNumber || [])  //机器编号数组
                    this.adminIds.push(e.adminId || [])
                    this.adIds.push(e.madId || [])
                    e.userId != "无" ? this.userIdts.push(e.userId) : null;
                    this.userMode.push(e || []); //批量操作用户类型
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
                        if (_v._type == 4) {  //针对料仓配置绑定的机器查询
                            _data['adminId'] = _v._id;
                            delete _data['page']
                            delete _data['listId']
                            delete _data['type']
                            delete _data['machineNumber']
                            ym.init.XML({
                                method: 'GET',
                                uri: token._j.URLS.Development_Server_ + 'find_admin_machine',  //查询绑定关系
                                async: false,
                                xmldata: _data,
                                done: function (res) {
                                    it.UnFormData = [];
                                    res.data.forEach(_params_ => {
                                        it.UnFormData.push({
                                            machineNumber: _params_.machineNumber,
                                            listName: _params_.listName,
                                            machineType: it.StatusName.get('free').machineType.get(_params_.machineType),
                                        })
                                    })
                                }
                            });
                            return false;
                        }
                        _v._type.forEach(e => {
                            if (e == 6) e = 4;  //暂时解决产品清单绑定问题
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
                                            console.log(res)
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
                        res.list ? res.list.forEach(e => {
                            _arr.push({
                                value: e.nickName,
                                _id: e.userId
                            })
                        }) : it.IError(res.statusCode.msg)
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
                            case 'grant_sys_user_draw_chance': //小程序大转盘 赠送抽奖次数
                                _data['grantCount'] = it.ount;
                                it.userMode.forEach(_evnt => {
                                    _data['userId'] = _evnt.userId;
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
                                delete _data['name']
                                delete _data['userId']
                                it.list(); //刷新列表
                                break;
                            case 'dredge_member': //后台开通会员
                                _data['memberRuleId'] = it.objectId;
                                it.userMode.forEach(_evnt => {
                                    _data['userId'] = _evnt.userId;
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
                                delete _data['memberRuleId']
                                delete _data['userId']
                                it.list(); //刷新列表
                                break;
                            default:  //赠送抽奖次数 （1.0版本赠送）
                                _data['grantCount'] = it.ount;
                                it.userMode.forEach(_evnt => {
                                    _data['userId'] = _evnt.userId;
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
                                delete _data['grantCount']
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
                                i: ym.init.getDateTime(arr.faultTime),
                                t: arr.faultContent
                            })
                        })
                    }
                })
            },
            fileChange(e) { //上传结构
                _data['type'] = 4;
                _data['mUpdateVersion'] = this.formData.mUpdateVersion;
            },
            filemadUrlChange(e) {
                _data['type'] = 9;
            },
            fileExceed() {
                this.IError('只允许单个上传')
            },
            machineSceneSuccess(e) {
                this.formData.mUpdateUrl = e.realPath;  // 应用地址
                this.formData.madUrl = e.realPath;  //视频地址
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {  //点击查看放大的时候
                this.dialogVisible = true;
                this.dialogImageUrl = 'http://www.cbcoffee.cn/rundev/manage/images/Android.svg';
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
                        if (!_event.hasOwnProperty('_status')) {
                            _data['madId'] = _event._parameter
                            _data['type'] = _event._type
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + _event._uri,
                                async: true,
                                xmldata: _data,
                                done: function (res) {
                                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                        it.imageList.madUrl = []; // 先清空视频地址列表
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
                            _data['madStatus'] = +!_event._status
                            ym.init.XML({
                                method: 'POST',
                                uri: token._j.URLS.Development_Server_ + _event._uri,
                                async: true,
                                xmldata: _data,
                                done: function (res) {
                                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                        delete _data['madId'];
                                        delete _data['madStatus'];
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
            userSelect(_event) {  //用户批量操作
                _event = JSON.parse(_event);
                const it = this;
                switch (_event._uri) {
                    case 'manage_client_user':
                        if (_event._type == 2) {   //更改用户类型 
                            it.statues.user = true;
                            it.statues.state = false;
                            it.statues.flow = false;
                            it.statues.ount = false;
                            it.statues.objectId = false;
                        } else {  //更改用户状态
                            it.statues.user = false;
                            it.statues.state = true;
                            it.statues.flow = false;
                            it.statues.ount = false;
                            it.statues.objectId = false;
                        }
                        break;
                    case 'grant_compensate_milliliter':  //更改用户毫升数
                        it.statues.user = false;
                        it.statues.state = false;
                        it.statues.flow = true;
                        it.statues.ount = false;
                        it.statues.objectId = false;
                        break;
                    case 'dredge_member':  //后台开通会员-- 查询会员
                        it.statues.user = false;
                        it.statues.state = false;
                        it.statues.flow = false;
                        it.statues.ount = false;
                        it.statues.objectId = true;
                        ym.init.XML({
                            method: 'POST',
                            uri: token._j.URLS.Development_Server_ + 'get_member_list',
                            async: false,
                            xmldata: _data,
                            done: function (res) {
                                try {
                                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                        setTimeout(() => {
                                            it.objectIds = [];
                                            res.memberRuleList.forEach((key, index) => {
                                                it.objectIds.push({
                                                    memberRuleId: key.memberRuleId,
                                                    memberRuleName: `ID：${key.memberRuleId}   名称：${key.memberRuleName}`
                                                })
                                            })
                                        }, 500);
                                    })() : (() => {
                                        throw "收集到错误：\n\n" + res.statusCode.msg;
                                    })();
                                } catch (error) {
                                    it.IError(error);
                                }
                            }
                        })
                        break;
                    default:  //赠送抽奖次数
                        it.statues.user = false;
                        it.statues.state = false;
                        it.statues.ount = true;
                        it.statues.flow = false;
                        it.statues.objectId = false;
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
            refundMoneyNum(_event) { //order_refund  订单退款
                const it = this;
                it.loading = true;
                _data['orderId'] = _event.orderId;
                _data['refundLimit'] = parseFloat(_event.payNum * 100).toFixed(0) || 0;
                _data['milliliterLimit'] = _event.milliliterLimit || '';
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'order_refund',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                it.InputAndVisible = false;
                                setTimeout(() => {
                                    it.loading = false;
                                    it.list();
                                }, 500)
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },
            exportOrder(_event) { // 订单导出 excel
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
            exportPushOrder(_event) { // 资金管理导出 excel
                const it = this;
                it.loading = true
                _data['orderId'] = _event.consumptionType || '';
                _data['machineNumber'] = _event.orderStatus || '';
                _data['startTime'] = it.optionsTime[0] || '';
                _data['endTime'] = it.optionsTime[1] || '';
                _data['adminName'] = _event.orderLine || '';
                _data['userId'] = _event.sort || '';
                _data['orderType'] = _event.orderType || '';
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'export_order_log_list',
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
            },
            showtruntablelogs(params) {  //转盘记录
                console.log(params)
                const it = this;
                _data['addressId'] = params;
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'user_address_detail',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.UnFormData.push({
                                    userId: res.data.userId,
                                    named: res.data.named,
                                    phone: res.data.phone,
                                    province: res.data.province,
                                    city: res.data.city,
                                    district: res.data.district,
                                    address: res.data.address,
                                    createTime: res.data.createTime
                                })
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            exportTurntableUserLogs(params) {  //导出用户抽奖记录
                const it = this;
                _data['userId'] = params.userId || '';
                _data['drawInstanceId'] = params.drawInstanceId || '';
                _data['drawId'] = params.drawId || '';
                _data['drawName'] = params.drawName || '';
                _data['raffleVersion'] = params.raffleVersion || '';
                _data['itemName'] = params.itemName || '';
                _data['itemType'] = params.itemType || '';
                _data['status'] = params.status || '';
                _data['hasAddress'] = params.hasAddress || '';
                if (params.startTime > 1) {
                    _data['startTime'] = ym.init.getDateTime(params.startTime[0]) || '';
                    _data['endTime'] = ym.init.getDateTime(params.startTime[1]) || '';
                }

                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'export_user_draw_raffle_log_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
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

            //查询运维流程详情
            machineMaintenance(params) {
                const it = this;
                _data['maintainerId'] = params.maintainerId
                _data['maintainFlowId'] = params.maintainFlowLogId
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'maintain_question_log_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.UnFormData = [];
                                res.data.forEach(element => {
                                    it.UnFormData.push({
                                        question: element.question,
                                        answerPic: element.answerPic,
                                        answer: (() => {
                                            let _code = element.answer.split('$')[0], _code_ = '';
                                            element.answer.split('$')[0].includes('{') ? void function () {
                                                Object.keys(JSON.parse(_code)).forEach((element, index) => {
                                                    if (Object.keys(JSON.parse(_code)).length <= 2) {
                                                        _code_ = `料仓：${Object.values(JSON.parse(_code))[0]},坏料：${Object.values(JSON.parse(_code))[1]}`;
                                                    } else {
                                                        // _code_ += ` 【 料仓：${index + 1}, 数值：${Object.values(JSON.parse(_code))[index]} 】 `;
                                                        _code_ += `【 ${index + 1}、${Object.keys(JSON.parse(_code))[index].split('g')[0]}：${Object.values(JSON.parse(_code))[index]} g 】 `
                                                    }
                                                });
                                                _code = _code_;
                                            }() : null;
                                            return _code;
                                        })()
                                    })
                                })
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            //查看料仓配置
            machineBunkerConfig(params, enitBunkerConf) {
                const it = this;
                _data['machineBunkerConfigId'] = params.machineBunkerConfigId
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'machine_bunker_config',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.TableFormData = [];
                                it.formData.numberBigConf = [];  //编辑时的回显
                                it.formData.numberSmallConf = []; // 小机器
                                it.bunkerConf = {
                                    name: res.bunkerConfig.bunkerConfigName,
                                    time: ym.init.getDateTime(res.bunkerConfig.createTime)
                                };
                                JSON.parse(res.bunkerConfig.bunkerConfiguration).forEach(element => {
                                    it.TableFormData.push({
                                        name: element.name,
                                        number: element.number,
                                        isShow: element.isShow == +true ? '是' : '否',
                                    });
                                    if (enitBunkerConf) {  //编辑的时候回显
                                        it.numberConf(res.bunkerConfig.machineType); //重置大小机器的tag
                                        it.formData.disableConf = true;
                                        it.formData.disableConfMahineName = res.bunkerConfig.machineType == 2 ? "小型桌面机" : "大型柜式机";
                                        it.formData.has = res.bunkerConfig.machineBunkerConfigId; //是编辑操作的ID
                                        it.formData.bunkerConfigName = res.bunkerConfig.bunkerConfigName;  //配置名称
                                        it.formData.machineType = res.bunkerConfig.machineType; //设备类型
                                        it.formData.isSys = res.bunkerConfig.isSys;  //是否系统配置 
                                        if (res.bunkerConfig.machineType == 2) {
                                            it.formData.numberSmallConf.push({
                                                name: element.name,
                                                number: element.number,
                                                isShow: element.isShow,
                                            });
                                        } else {
                                            it.formData.numberBigConf.push({
                                                name: element.name,
                                                number: element.number,
                                                isShow: element.isShow,
                                            });
                                        }
                                    }
                                })
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            numberConf(params) { //切换料仓类型
                if (params == +true) {
                    this.bunkerConfNumber = true;
                } else {
                    this.bunkerConfNumber = false;
                }
            },

            pushNumberConf(params) { //提交 料仓配置
                const it = this;
                _data['bunkerConfigName'] = params.bunkerConfigName;
                _data['machineType'] = params.machineType;
                if (params.machineType == +true) {
                    _data['bunkerConfiguration'] = JSON.stringify(params.numberBigConf);
                } else {
                    _data['bunkerConfiguration'] = JSON.stringify(params.numberSmallConf);
                }
                _data['isSys'] = params.isSys;
                if (it.formData.has) {
                    _data['machineBunkerConfigId'] = it.formData.has;
                }
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'add_or_update_machine_bunker_config',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.InputAndVisible = false;
                                it.ISuccessfull(res.statusCode.msg);
                                delete _data['machineBunkerConfigId']
                                delete _data['bunkerConfigName'];
                                delete _data['machineType'];
                                delete _data['bunkerConfiguration'];
                                delete _data['isShow'];
                                delete _data['isSys'];
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

            bindMachineBunker(params) {  //绑定料仓配置
                const it = this;
                _data['machineBunkerConfigId'] = it.formData.machineBunkerConfigAllId;
                _data['machineNumbers'] = it.machineNumber;  //数组
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'bind_machine_bunker',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.detailTableAndVisible = false;
                                it.ISuccessfull(res.statusCode.msg);
                                delete _data['machineBunkerConfigId']
                                delete _data['machineNumbers'];
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

            miniTurntableUApush(params) {   //小程序大转盘新建 /更新提交
                const it = this;
                _data['raffleName'] = params.raffleName;
                _data['allowConsumeChance'] = params.allowConsumeChance;
                _data['allowMemberConvert'] = params.allowMemberConvert;
                _data['allowShareChance'] = params.allowShareChance;
                _data['convertMilliliter'] = params.convertMilliliter || 0;
                _data['maxLuckyValue'] = params.maxLuckyValue;
                _data['status'] = params.status;
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'add_or_update_sys_draw_raffle_info',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.InputAndVisible = false;
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

            miniTurntablePrizeExe(params) {  //导出抽奖记录
                const it = this;
                this.loading = true;
                _data['userId'] = params.userId || '';
                _data['nickName'] = params.nickName || '';
                _data['adminName'] = params.adminName || '';
                _data['raffleVersion'] = params.raffleVersion || '';
                _data['itemType'] = params.itemType || '';
                _data['status'] = params.status || '';
                _data['startDate'] = params.startTime ? ym.init.getDateTime(params.startTime[0]).split(' ')[0] : '';
                _data['endDate'] = params.startTime ? ym.init.getDateTime(params.startTime[1]).split(' ')[0] : '';
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'export_sys_user_draw_log_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.UpdateTableAndVisible = false;
                                it.ISuccessfull(res.statusCode.msg);
                                location.href = token._j.URLS.Development_Server_ + res.path;
                                it.loading = false;
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.loading = false;
                            it.IError(error);
                        }
                    }
                })
            },

            maintenanceLogsOutPut(params) {  //导出运维日志
                const it = this;
                this.loading = true;
                _data['maintainerId'] = params.maintainerId || '';
                _data['maintainerName'] = params.maintainerName || '';
                _data['machineNumber'] = params.machineNumber || '';
                _data['status'] = params.status || '';
                _data['startDate'] = params.startTime ? ym.init.getDateTime(params.startTime[0]).split(' ')[0] : '';
                _data['endDate'] = params.startTime ? ym.init.getDateTime(params.startTime[1]).split(' ')[0] : '';
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'export_maintain_material_answer_log_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.UpdateTableAndVisible = false;
                                it.ISuccessfull(res.statusCode.msg);
                                location.href = token._j.URLS.Development_Server_ + res.path;
                                it.loading = false;
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.loading = false;
                            it.IError(error);
                        }
                    }
                })
            },

            miniTurntableUA(params, prize) {  //小程序大转盘配置查看， 奖品查看
                if (prize) {  //奖品查看
                    this.formData.raffleName = params[0].raffleName;
                    this.formData.allowConsumeChance = params[0].allowConsumeChance;
                    this.formData.allowMemberConvert = params[0].allowMemberConvert;
                    this.formData.allowShareChance = params[0].allowShareChance;
                    this.formData.convertMilliliter = params[0].convertMilliliter;
                    this.formData.maxLuckyValue = params[0].maxLuckyValue;
                    this.formData.status = params[0].status;
                } else {
                    this.formData.raffleName = params[0].raffleName;
                    this.formData.allowConsumeChance = params[0].allowConsumeChance;
                    this.formData.allowMemberConvert = params[0].allowMemberConvert;
                    this.formData.allowShareChance = params[0].allowShareChance;
                    this.formData.convertMilliliter = params[0].convertMilliliter;
                    this.formData.maxLuckyValue = params[0].maxLuckyValue;
                    this.formData.status = params[0].status;
                }
            },

            updateTurntableVersion() {  //大转盘版本升级，将会把所有用户数据记录重置
                //  upgrade_sys_draw_raffle_version
                let it = this;
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'upgrade_sys_draw_raffle_version',
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

            exportLogExe(params) {  //导出预约记录
                let it = this;
                it.loading = true;
                _data = Object.assign(_data, { napeName: params.napeName || '', status: params.status })
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + 'export_pre_sell_nape_log_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                location.href = token._j.URLS.Development_Server_ + res.path;
                                setTimeout(() => {
                                    it.loading = false;
                                }, 1000)
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            appointmentPayEdesit(params) {  //预约详情
                let it = this;
                _data = Object.assign(_data, { preSellLogId: params })
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'pre_sell_nape_log_detail',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.appointmentPay = {};
                                Object.keys(res.data).forEach((element, index) => {
                                    it.appointmentPay[element] = Object.values(res.data)[index];
                                });
                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            appointmentPayGrant(params) {  //核销 发券
                let it = this;
                _data = Object.assign(_data, { preSellLogId: params })
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'pre_sell_grant',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                delete _data['preSellLogId'];
                                it.TableAndVisible = false;
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
            appointmentPayGrantCancel(params) {  //确认核销 信息【不发券】
                let it = this;
                _data = Object.assign(_data, { preSellLogId: params })
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'pre_sell_cancel',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                delete _data['preSellLogId']
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

            statusPrize(params) { // 更改奖品状态
                const it = this;
                _data = Object.assign(_data, params);
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'change_sys_draw_item_info_status',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.ISuccessfull(res.statusCode.msg);
                                delete _data['itemId'];
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

            addressTableList(params) {  //查看单个用户地址
                const it = this;
                let xml = [];
                typeof params === 'object' ? params['page'] = it.pageTableNum : params['page'] = params;
                _data = Object.assign(_data, params);
                ym.init.XML({
                    method: 'GET',
                    uri: token._j.URLS.Development_Server_ + 'user_address_list',
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        try {
                            ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                it.addressTables = [];
                                for (let i = 0; i < res.data.length; i++) {  // 
                                    xml.push({
                                        address: res.data[i].address,
                                        phone: res.data[i].phone,
                                        named: res.data[i].named
                                    });
                                }
                                it.addressTables = xml;
                                // page++;

                                // it.pageTimerOut = setTimeout(() => {
                                //     if (it.pageCount - page < 0) {  //页数 > 总页数
                                //       clearTimeout(it.pageTimerOut);
                                //       return false;
                                //     }
                                //     it.addressTableList(page);
                                //   }, 500);

                            })() : (() => {
                                throw "收集到错误：\n\n" + res.statusCode.msg;
                            })();
                        } catch (error) {
                            it.IError(error);
                        }
                    }
                })
            },

            marketingConfig(params, name) {  //营销配置编辑
                let it = this;
                if (name) {
                    _data['adminId'] = params.adminId;
                    _data['adminMarketingConfigId'] = params.adminMarketingConfigId;
                    _data['allowGrant'] = params.allowGrant;
                    params.allowGrant != 1 ? null : _data['grantMilliliter'] = 0 < params.grantMilliliter && params.grantMilliliter < params.changeMilliliter ? params.grantMilliliter: it.IError('数值异常！');
                    _data['allowShare'] = params.allowShare;
                    params.allowShare != 1 ? null : _data['shareMilliliter'] = 0 < params.shareMilliliter && params.shareMilliliter < params.changeMilliliter ? params.shareMilliliter: it.IError('数值异常！');
                    _data['allowSignIn'] = params.allowSignIn;
                    params.allowSignIn != 1 ? null : _data['signInMilliliter'] = 0 < params.signInMilliliter && params.signInMilliliter < params.changeMilliliter ? params.signInMilliliter: it.IError('数值异常！');
                    _data['allowChangeCup'] = params.allowChangeCup; 
                    params.allowChangeCup != 1 ? null : _data['changeMilliliter'] = 0 < params.changeMilliliter && params.changeMilliliter < params.changeMilliliter ? params.changeMilliliter: it.IError('数值异常！');
                    _data['convertMilliliter'] = 0 < params.convertMilliliter ? params.convertMilliliter: it.IError('数值异常！');
                    ym.init.XML({
                        method: 'POST',
                        uri: token._j.URLS.Development_Server_ + 'update_admin_marketing_config',
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.ISuccessfull(res.statusCode.msg);
                                    setTimeout(() => {
                                        parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                                    }, 500);
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.statusCode.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    })
                } else {
                    _data['adminMarketingConfigId'] = params;
                    ym.init.XML({
                        method: 'GET',
                        uri: token._j.URLS.Development_Server_ + 'admin_marketing_config_detail',
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    Object.keys(res.data).forEach((element, index) => {
                                        it.formData[element] = Object.values(res.data)[index];
                                    })
                                    it.$forceUpdate(); //input 输入问题
                                })() : (() => {
                                    throw "收集到错误：\n\n" + res.statusCode.msg;
                                })();
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    })
                }
            },

        }
    });
}, false)
