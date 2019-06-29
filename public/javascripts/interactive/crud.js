import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
const [
    $,
    token,
    uri,
    assetUri,
    callBackHtml,
    dataHref
] = [
        parent.all.jq,
        parent.all.json,
        document.getElementById('c-container-list').getAttribute('data-uri'),
        document.getElementById('c-container-list').getAttribute('data-asset'),
        document.getElementById('c-container-list').getAttribute('data-goback'),
        parent.document.getElementById('tagHref').getAttribute('src')
    ];
const _data = {
    id: ym.init.COMPILESTR.decrypt(token.id),
    token: ym.init.COMPILESTR.decrypt(token.asset),
    url: assetUri
}
new Vue({
    el: '#c-container-list',
    data: () => {
        return {
            loading: false,
            boxshow: false,
            tagshow: false,
            select: '',
            formData: {
                formulaMakeList: [{
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }, {
                    delayTime: '',
                    waterVolume: '',
                    gradientWeight: '',
                    mixSpeed: '',
                    recipeOutSpeed: '',
                    recipeOutOrder: '',
                    flavorName: ''
                }],
                formulaName: ''
            },
            formDataSmall: {
                formulaMakeList: [{
                    coffeeFlow: '',
                    coffeeTemporature: '',
                    coffeeWeight: '',
                    playMilkTime: '',
                    pumpPressure: '',
                    americanHotWaterWeight: '',
                    milkFlow: '',
                    formulaType: '',
                    formulaName: ''
                }],
                formulaName: ''
            },
            recipeOutOrder: [{
                value: '0',
                label: '不出料'
            },
            {
                value: '1',
                label: '第一次出料'
            },
            {
                value: '2',
                label: '第二次出料'
            },
            {
                value: '3',
                label: '第三次出料'
            },
            {
                value: '4',
                label: '第四次出料'
            },
            {
                value: '5',
                label: '第五次出料'
            },
            {
                value: '6',
                label: '第六次出料'
            },
            {
                value: '7',
                label: '第七次出料'
            }],
            flavorCanChange: '',
            ruleForm: {
                formulaId: '',
                productName: '',
                productPrice: '',
                productMachinePicurl: '',
                productPicurl: '',
                productMachineDetailPicurl: '',
                productRank: '',
                operateType: 0,
                productStatus: 1,
                productTemperature: 1,
                productComment: '',
                bunkerNumberArr: [],
                machineType: 1,
                province: ['440100'],   //地址数组
                machineLatitude: '',  //纬度
                machineLongitude: ''  //经度

            },
            rules: {
                productName: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 3, max: 15, message: '中英文结合以,分隔', trigger: 'blur' }
                ],
                formulaId: [
                    { required: true, message: '请选择配方', trigger: 'change' }
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            dialogVisibleData: false,
            num: 1,
            fileData: _data,
            samllfileUpdata: false,
            formulaIds: [],
            productFlavorList: [],
            radioclod: false,
            imageList: {
                machine: [],
                product: [],
                detail: []
            },
            address: regionData   // 地址选择
        }
    },
    created: function () {
        const it = this;
        if (dataHref.split('*').length > 1) {
            this.Ienit(decodeURI(dataHref.split('*')[1]));
            this.tagshow = true;
        };
        switch (document.getElementById('c-container-list').getAttribute('data-search')) {
            case 'manage_product':  //回显所有的配方选项
                _data['type'] = 2;
                ym.init.XML({
                    method: 'POST',
                    uri: token._j.URLS.Development_Server_ + uri,
                    async: false,
                    xmldata: _data,
                    done: function (res) {
                        res.formulaInfoList.forEach(e => {
                            it.formulaIds.push({
                                value: e.formulaId,
                                label: e.formulaName,
                                machineType: e.machineType,
                                formulaTemperature: e.formulaTemperature
                            })
                        });
                    }
                })
                break;
            default:
                break;
        }
    },
    methods: {
        IError(err) {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            this.$message.error('错了哦，' + err);
        },
        ISuccessfull(e) {
            setTimeout(() => {
                this.loading = false;
            }, 1000);
            this.$message({
                message: 'ok 了哦,' + e,
                type: 'success'
            });
        },
        Ichange(e) {
            const it = this;
            switch (e.options) {
                case 'machineType':
                    e.value != "big" && e.value != '' ? it.boxshow = true : it.boxshow = false;
                    break;
                default:
                    break;
            }
        },
        Ipush(e) {
            const it = this, type = [
                'manage_formula:2'
            ];
            it.loading = true;
            _data['formulaName'] = e.formulaName;
            _data['machineType'] = e.machineType;
            _data['type'] = e.type;
            if (dataHref.split('*').length > 1) {
                _data['type'] = 3;
                _data['formulaId'] = JSON.parse(decodeURI(dataHref.split('*')[1])).formulaId
            }
            if (e.machineType == 2) {  //小机器
                _data['officeFormulaMakeList[0].coffeeFlow'] = e.formulaMakeList[0].coffeeFlow || '';
                _data['officeFormulaMakeList[0].coffeeTemporature'] = e.formulaMakeList[0].coffeeTemporature || '';
                _data['officeFormulaMakeList[0].coffeeWeight'] = e.formulaMakeList[0].coffeeWeight || '';
                _data['officeFormulaMakeList[0].playMilkTime'] = e.formulaMakeList[0].playMilkTime || '';
                _data['officeFormulaMakeList[0].pumpPressure'] = e.formulaMakeList[0].pumpPressure || '';
                _data['officeFormulaMakeList[0].americanHotWaterWeight'] = e.formulaMakeList[0].americanHotWaterWeight || '';
                _data['officeFormulaMakeList[0].formulaType'] = e.formulaMakeList[0].formulaType || '';
                _data['officeFormulaMakeList[0].milkFlow'] = e.formulaMakeList[0].milkFlow || '';
            } else {
                for (let i = 0; i < e.formulaMakeList.length; i++) {
                    _data['formulaMakeList[' + i + '].canisterId'] = e.formulaMakeList[i].canisterId || '';
                    _data['formulaMakeList[' + i + '].delayTime'] = e.formulaMakeList[i].delayTime || '';
                    _data['formulaMakeList[' + i + '].flavorCanChange'] = e.formulaMakeList[i].flavorCanChange || '';
                    _data['formulaMakeList[' + i + '].flavorName'] = e.formulaMakeList[i].flavorName || '';
                    _data['formulaMakeList[' + i + '].gradientWeight'] = e.formulaMakeList[i].gradientWeight || '';
                    _data['formulaMakeList[' + i + '].mixSpeed'] = e.formulaMakeList[i].mixSpeed || '';
                    _data['formulaMakeList[' + i + '].recipeOutOrder'] = e.formulaMakeList[i].recipeOutOrder || '';
                    _data['formulaMakeList[' + i + '].recipeOutSpeed'] = e.formulaMakeList[i].recipeOutSpeed || '';
                    _data['formulaMakeList[' + i + '].waterVolume'] = e.formulaMakeList[i].waterVolume || '';
                }
            }

            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                        it.ISuccessfull(res.statusCode.msg);
                        setTimeout(() => {
                            parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                        }, 500);
                    })() : (() => {
                        it.IError(res.statusCode.msg);
                        throw "收集到错误：\n\n" + res.statusCode.status;
                    })();
                }
            })
        },
        Ienit(e) {
            const it = this;
            switch (uri) {
                case 'manage_formula':
                    _data['type'] = 1;
                    _data['formulaId'] = JSON.parse(e).formulaId;
                    break;
                case 'manage_product':
                    _data['type'] = 1;
                    _data['productId'] = JSON.parse(e).productId;
                    break;
                case 'manage_machine':
                    _data['type'] = 3;
                    _data['machineNumber'] = JSON.parse(e).machineNumber;
                    break;
                default:
                    break;
            }
            it.loading = true;
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                        switch (uri) {
                            case 'manage_formula':
                                if (res.formulaInfo.machineType == 1) {
                                    try {
                                        res.formulaInfo.formulaMakeList.forEach(e => {
                                            if (e.canisterId != 170) {
                                                it.formData.formulaMakeList[e.canisterId - 1].delayTime = e.delayTime;
                                                it.formData.formulaMakeList[e.canisterId - 1].waterVolume = e.waterVolume;
                                                it.formData.formulaMakeList[e.canisterId - 1].gradientWeight = e.gradientWeight;
                                                it.formData.formulaMakeList[e.canisterId - 1].mixSpeed = e.mixSpeed;
                                                it.formData.formulaMakeList[e.canisterId - 1].recipeOutSpeed = e.recipeOutSpeed;
                                                it.formData.formulaMakeList[e.canisterId - 1].recipeOutOrder = it.recipeOutOrder[e.recipeOutOrder].value;
                                                it.formData.formulaMakeList[e.canisterId - 1].flavorName = e.flavorName;
                                            } else {
                                                it.formData.formulaMakeList[e.canisterId - 164].delayTime = e.delayTime;
                                                it.formData.formulaMakeList[e.canisterId - 164].waterVolume = e.waterVolume;
                                                it.formData.formulaMakeList[e.canisterId - 164].gradientWeight = e.gradientWeight;
                                                it.formData.formulaMakeList[e.canisterId - 164].mixSpeed = e.mixSpeed;
                                                it.formData.formulaMakeList[e.canisterId - 164].recipeOutSpeed = e.recipeOutSpeed;
                                                it.formData.formulaMakeList[e.canisterId - 164].recipeOutOrder = it.recipeOutOrder[e.recipeOutOrder].value;
                                                it.formData.formulaMakeList[e.canisterId - 164].flavorName = e.flavorName;
                                            }
                                        });
                                        it.formData.formulaName = res.formulaInfo.formulaName;
                                    } catch (error) {
                                        it.IError(error);
                                    }
                                } else {  //小机器
                                    document.getElementsByClassName('offFormulaMakeList')[0].style.display = 'block';  //方法待定
                                    document.getElementsByClassName('formulaMakeList')[0].style.display = 'none';  //方法待定
                                    try {
                                        // it.$set(it, it.formDataSmall.formulaMakeList[0].coffeeFlow, res.formulaInfo.officeFormulaMakeList[0].coffeeFlow)
                                        it.formDataSmall.formulaMakeList[0].coffeeFlow = res.formulaInfo.officeFormulaMakeList[0].coffeeFlow;
                                        it.formDataSmall.formulaMakeList[0].coffeeTemporature = res.formulaInfo.officeFormulaMakeList[0].coffeeTemporature;
                                        it.formDataSmall.formulaMakeList[0].coffeeWeight = res.formulaInfo.officeFormulaMakeList[0].coffeeWeight;
                                        it.formDataSmall.formulaMakeList[0].playMilkTime = res.formulaInfo.officeFormulaMakeList[0].playMilkTime;
                                        it.formDataSmall.formulaMakeList[0].pumpPressure = res.formulaInfo.officeFormulaMakeList[0].pumpPressure;
                                        it.formDataSmall.formulaMakeList[0].americanHotWaterWeight = res.formulaInfo.officeFormulaMakeList[0].americanHotWaterWeight;
                                        it.formDataSmall.formulaMakeList[0].milkFlow = res.formulaInfo.officeFormulaMakeList[0].milkFlow;
                                        it.formDataSmall.formulaMakeList[0].formulaType = res.formulaInfo.officeFormulaMakeList[0].formulaType;
                                        it.formDataSmall.formulaName = res.formulaInfo.formulaName;
                                    } catch (error) {
                                        it.IError(error);
                                        throw error
                                    }
                                }
                                break;
                            case 'manage_product':
                                try {
                                    it.formulaIds.forEach(ex => {
                                        if (ex.value == res.productInfo.formulaId) {
                                            it.ruleForm.formulaId = ex.value;  //配方
                                        }
                                    });
                                    it.ruleForm.productName = res.productInfo.productName;  //产品名称
                                    it.ruleForm.productPrice = res.productInfo.productPrice;  //产品价格
                                    it.imageList.machine.push({ name: 'machinePic', url: res.productInfo.productMachinePicurl }); //机器产品图片
                                    it.imageList.product.push({ name: 'product', url: res.productInfo.productPicurl }); //手机产品图片
                                    it.imageList.detail.push({ name: 'detail', url: res.productInfo.productMachineDetailPicurl }); //小机器详情图片

                                    it.ruleForm.productMachinePicurl = res.productInfo.productMachinePicurl; //机器产品图片
                                    it.ruleForm.productPicurl = res.productInfo.productPicurl; //手机产品图片
                                    it.ruleForm.productMachineDetailPicurl = res.productInfo.productMachineDetailPicurl; //小机器详情图片

                                    it.ruleForm.productRank = res.productInfo.productRank;  //排序
                                    it.ruleForm.operateType = res.productInfo.operateType;  //产品属性
                                    it.ruleForm.productStatus = res.productInfo.productStatus;  //是否上架
                                    it.ruleForm.productTemperature = res.productInfo.productTemperature;  //冷热状态
                                    it.ruleForm.machineType = res.productInfo.machineType;  //设备类型
                                    if (res.productInfo.productTemperature == 1) { //冷热锁定
                                        it.radioclod = true;
                                    }
                                    if (res.productInfo.machineType == 1) {  //大机器才有
                                        res.productFlavorList.forEach(e => { //口味信息
                                            it.productFlavorList.push({
                                                value: e.bunkerNumber,
                                                label: e.flavorName,
                                                hide: e.hide
                                            });
                                        });
                                    } else {
                                        it.samllfileUpdata = true;  //详情图片开启
                                    }

                                    it.ruleForm.productComment = res.productInfo.productComment;  //冷热状态
                                } catch (error) {
                                    it.IError(error);
                                    throw error;
                                }
                                break;
                            case 'manage_machine':  //
                                it.ruleForm.adminId = res.machineInfo.adminId;  //管理员id
                                it.ruleForm.adminName = res.machineInfo.adminName;  //管理员名称
                                it.ruleForm.machineNumber = res.machineInfo.machineNumber;  //设备编号
                                it.ruleForm.machineLatitude = res.machineInfo.machineLatitude;  //纬度
                                it.ruleForm.machineLongitude = res.machineInfo.machineLongitude;  //经度

                                console.log(TextToCode['广东省']);
                                // it.ruleForm.province.push(TextToCode[res.machineInfo.province].code);
                                // it.ruleForm.province.push(TextToCode[res.machineInfo.city].code);
                                // it.ruleForm.province.push(TextToCode[res.machineInfo.district].code);
                                // console.log(TextToCode[res.machineInfo.province].code);
                                // console.log(it.ruleForm.province);
                                //it.ruleForm.province.push(res.machineInfo.machineAddrDesc)  //反显地址

                                var map = new AMap.Map('cityg', {
                                    resizeEnable: true, //是否监控地图容器尺寸变化
                                    zoom: 12 //初始化地图层级
                                });
                                map.on('click', function (e) {
                                    it.ruleForm.machineLatitude = e.lnglat.lat;  //纬度
                                    it.ruleForm.machineLongitude = e.lnglat.lng; //经度
                                });
                                AMap.plugin('AMap.PlaceSearch', function () {
                                    var placeSearch = new AMap.PlaceSearch({
                                        city: '020'
                                    });
                                    placeSearch.search(it.ruleForm.province, function (status, result) {
                                        // 查询成功时，result即对应匹配的POI信息
                                        if (typeof result.poiList === "undefined") {
                                            it.IError('Impact error! wrong keywords?');
                                            return false;
                                        }
                                        map.setFitView();
                                    })
                                })
                                //加载云图层插件
                                jQuery.ajax({
                                    url: 'https://yuntuapi.amap.com/datasearch/local?tableid=5bebc2507bbf195c079c50d6&city=全国&keywords=' + res.machineInfo.machineNumber + '&filter=machineNumber:' + res.machineInfo.machineNumber + '&limit=50&page=1&key=8d7d4594c6fdff4624696ba71f9e4c8a',
                                    type: 'post',
                                    dataType: 'jsonp'
                                }).done(function (res) {
                                    for (var i = 0; i < res.datas.length; i++) {
                                        // 创建点覆盖物
                                        var marker = new AMap.Marker({
                                            position: new AMap.LngLat(res.datas[i]._location.split(',')[0], res.datas[i]._location.split(',')[1]),
                                            icon: res.datas[i].marker,
                                            offset: new AMap.Pixel(-13, -30)
                                        });
                                        map.add(marker);
                                    }
                                });

                                break;
                            default:
                                break;
                        }

                        it.ISuccessfull(res.statusCode.msg);
                    })() : (() => {
                        it.IError(res.statusCode.msg);
                        throw "收集到错误：\n\n" + res.statusCode.status;
                    })();
                }
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        fileExceed() {
            this.IError('只允许一张图片')
        },
        fileChange() {
            this.fileData['type'] = 3;  //动态配置
        },
        filePicChange() {
            this.fileData['type'] = 2;  //动态配置
        },
        fileMachineSuccess(e) {
            this.ruleForm.productMachinePicurl = e.realPath;
        },
        filePicSuccess(e) {
            this.ruleForm.productPicurl = e.realPath;
        },
        fileDateilSuccess(e) {
            this.ruleForm.productMachineDetailPicurl = e.realPath;
        },
        submitForm(formName) {
            _data['type'] = 3;
            if (dataHref.split('*').length > 1) {
                _data['type'] = 4;
                _data['productCreateTime'] = ym.init.getDateTime(JSON.parse(decodeURI(dataHref.split('*')[1])).createTime)
            }
            const it = this;
            _data['formulaId'] = formName.formulaId || '';
            _data['productName'] = formName.productName || '';
            _data['productPrice'] = formName.productPrice || '';
            _data['productMachinePicurl'] = formName.productMachinePicurl || '';
            _data['productPicurl'] = formName.productPicurl || '';
            _data['productMachineDetailPicurl'] = formName.productMachineDetailPicurl || '';
            _data['productRank'] = formName.productRank || '';
            _data['operateType'] = formName.operateType || 0;
            _data['productStatus'] = formName.productStatus || '';
            _data['productTemperature'] = formName.productTemperature || '';
            _data['productComment'] = formName.productComment || '';
            _data['bunkerNumberArr'] = formName.bunkerNumberArr || '';
            _data['machineType'] = this.ruleForm.machineType;
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + uri,
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
            // this.ISuccessfull('提交成功');
        },
        tagChange(e) {  //处理select 的机器类型
            try {
                const it = this;
                e.ID != "" ? (() => {
                    e._arr.forEach((element) => {
                        if (e.ID == element.value) {
                            this.ruleForm.machineType = element.machineType;
                            this.productFlavorList = [];
                            element.machineType != 1 ? this.samllfileUpdata = true : (() => {
                                _data['formulaId'] = e.ID;
                                ym.init.XML({
                                    method: 'POST',
                                    uri: token._j.URLS.Development_Server_ + 'find_product_flavor',
                                    async: false,
                                    xmldata: _data,
                                    done: function (res) {
                                        res.productFlavorList.forEach(e => {
                                            it.productFlavorList.push({
                                                value: e.bunkerNumber,
                                                label: e.flavorName,
                                                hide: e.hide
                                            });
                                        });
                                    }
                                });
                                this.samllfileUpdata = false;
                                //this.dialogVisibleData = true;   //第三张图片显示模态背景问题i
                            })(); //判断是否显示小设备的详情图片
                            element.formulaTemperature != 1 ? this.radioclod = true : this.radioclod = false; //判断是否可以冷热切换
                        }
                    });
                })() : null;
            } catch (error) {
                this.IError(error);
            }
        },
        handleChange(e) {
            //地区选项 CodeToText 
            this.ruleForm.province = e;
            this.newAMap();
        },
        newAMap() {
            const it = this;
            var map = new AMap.Map('cityg', {
                resizeEnable: true, //是否监控地图容器尺寸变化
                zoom: 12 //初始化地图层级
            });
            map.on('click', function (e) {
                it.ruleForm.machineLatitude = e.lnglat.lat;  //纬度
                it.ruleForm.machineLongitude = e.lnglat.lng; //经度
            });
            map.clearMap();
            it.ruleForm.province.push(CodeToText[it.ruleForm.province[0]] + CodeToText[it.ruleForm.province[1]] + CodeToText[it.ruleForm.province[2]]);
            AMap.plugin('AMap.PlaceSearch', function () {
                var placeSearch = new AMap.PlaceSearch();
                placeSearch.search(it.ruleForm.province, function (status, result) {
                    // 查询成功时，result即对应匹配的POI信息
                    if (typeof result.poiList === "undefined") {
                        it.IError('Impact error! wrong keywords?');
                        return false;
                    }
                    var pois = result.poiList.pois;
                    for (var i = 0; i < pois.length; i++) {
                        var poi = pois[i];
                        var marker = [];
                        marker[i] = new AMap.Marker({
                            position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                            title: poi.name
                        });
                        // 将创建的点标记添加到已有的地图实例：
                        map.add(marker[i]);
                    }
                    map.setFitView();
                })
            })
        }
    }
})