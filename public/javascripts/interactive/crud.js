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
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            num: 1,
            fileData: _data,
            samllfileUpdata: false,
            formulaIds: []
        }
    },
    created: function () {
        const it = this;
        if (dataHref.split('*').length > 1) {
            this.Ienit(decodeURI(dataHref.split('*')[1]));
            this.tagshow = true;
        };
        switch (document.getElementById('c-container-list').getAttribute('data-search')) {
            case 'manage_product':
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
                                machineType: e.machineType
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
            switch (assetUri) {
                case 'manage_formula':
                    _data['type'] = 1;
                    _data['formulaId'] = JSON.parse(e).formulaId;
                    break;
                case 'manage_product':
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
        fileSuccess(e){
            console.log(e)
        },
        submitForm(formName) {
            _data['formulaId'] = formName.formulaId;
            _data['productName'] = formName.productName;
            _data['productPrice'] = formName.productPrice;
            _data['productMachinePicurl'] = formName.productMachinePicurl;
            _data['productPicurl'] = formName.productPicurl;
            _data['productMachineDetailPicurl'] = formName.productMachineDetailPicurl;
            _data['productRank'] = formName.productRank;
            _data['operateType'] = formName.operateType;
            _data['productStatus'] = formName.productStatus;
            _data['productTemperature'] = formName.productTemperature;
            _data['productComment'] = formName.productComment;
            _data['type'] = 3;
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
            // this.ISuccessfull('提交成功');
        },
        resetForm(formName) {  //重置表单
            this.$refs[formName].resetFields();
        },
        tagChange(e){
            // console.log(e)
        }
    }
})