const [$, token, u, uri] = [parent.all.jq, parent.all.json, parent.document.getElementById('tagHref').getAttribute('src').replace('..', '/manage').split('?')[0], document.getElementById('c-container-list').getAttribute('data-uri')];
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
            tags: {},   //待定
            selectFil: '',
            selectMater: ''
        }
    },
    created: function () {
        this.list();
    },
    methods: {
        Error(err) {
            this.$message.error('错了哦，' + err);
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
            let it = this, _data = {
                id: ym.init.COMPILESTR.decrypt(token.id),
                token: ym.init.COMPILESTR.decrypt(token.asset),
                // url: u.toLowerCase(),
                url: u,
                page: it.page
            }, xml = [];
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
            ym.init.XML({
                method: (uri == 'find_machine_poi_list' ? "GET" : 'POST'),
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                        switch (uri) {
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
                                        it.tags['machineCount'] = res.machineCount;
                                        it.tags['offLineNum'] = res.offLineNum;
                                        it.tags['starvingNum'] = res.starvingNum;
                                        it.tags['faultNum'] = res.faultNum;
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
                            default:
                                break;
                        }
                        it.total = parseInt(res.pageCount * 20);
                        // it.currentPage = parseInt(res.pageCount);  数据总条数
                        it.tableData = xml;
                    })()
                        :
                        it.Error(res.statusCode.msg);
                }
            })
        }
    }
});