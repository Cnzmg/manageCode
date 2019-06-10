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
                formulaMakeList: [{}, {}, {}, {}, {}, {}, {}],
                formulaName: ''
            },
            formDataSmall: {
                formulaMakeList: [{}],
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
            flavorCanChange: ''
        }
    },
    created: function () {
        if (dataHref.split('*').length > 1) {
            this.Ienit(decodeURI(dataHref.split('*')[1]));
        }
    },
    methods: {
        IError(err) {
            this.loading = false;
            this.$message.error('错了哦，' + err);
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
            if (e.machineType == 2) {  //小机器
                _data['formulaMakeList[0].coffeeFlow'] = e.formulaMakeList[0].coffeeFlow || '';
                _data['formulaMakeList[0].coffeeTemporature'] = e.formulaMakeList[0].coffeeTemporature || '';
                _data['formulaMakeList[0].coffeeWeight'] = e.formulaMakeList[0].coffeeWeight || '';
                _data['formulaMakeList[0].playMilkTime'] = e.formulaMakeList[0].playMilkTime || '';
                _data['formulaMakeList[0].pumpPressure'] = e.formulaMakeList[0].pumpPressure || '';
                _data['formulaMakeList[0].americanHotWaterWeight'] = e.formulaMakeList[0].americanHotWaterWeight || '';
                _data['formulaMakeList[0].formulaType'] = e.formulaMakeList[0].formulaType || '';
                _data['formulaMakeList[0].milkFlow'] = e.formulaMakeList[0].milkFlow || '';
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
                        setTimeout(() => {
                            it.loading = false;
                            parent.document.getElementById('tagHref').setAttribute('src', callBackHtml);
                        }, 1000);
                    })() : (() => {
                        it.IError(res.statusCode.msg);
                        throw "收集到错误：\n\n" + res.statusCode.status;
                    })();
                }
            })
        },
        Ienit(e) {
            const it = this;
            it.tagshow = false;
            _data['type'] = 1;
            _data['formulaId'] = JSON.parse(e).formulaId;
            it.loading = true;
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                        res.formulaInfo.formulaMakeList.forEach(e => {
                            if(e.canisterId != 170){
                                it.formData.formulaMakeList[e.canisterId - 1].delayTime = e.delayTime;
                                it.formData.formulaMakeList[e.canisterId - 1].waterVolume = e.waterVolume;
                                it.formData.formulaMakeList[e.canisterId - 1].gradientWeight = e.gradientWeight;
                                it.formData.formulaMakeList[e.canisterId - 1].mixSpeed = e.mixSpeed;
                                it.formData.formulaMakeList[e.canisterId - 1].recipeOutSpeed = e.recipeOutSpeed;
                                it.formData.formulaMakeList[e.canisterId - 1].recipeOutOrder = it.recipeOutOrder[e.recipeOutOrder].value;
                                it.formData.formulaMakeList[e.canisterId - 1].flavorName = e.flavorName;
                            }else{
                                it.formData.formulaMakeList[e.canisterId - 164].delayTime = e.delayTime;
                                it.formData.formulaMakeList[e.canisterId - 164].waterVolume = e.waterVolume;
                                it.formData.formulaMakeList[e.canisterId - 164].gradientWeight = e.gradientWeight;
                                it.formData.formulaMakeList[e.canisterId - 164].mixSpeed = e.mixSpeed;
                                it.formData.formulaMakeList[e.canisterId - 164].recipeOutSpeed = e.recipeOutSpeed;
                                it.formData.formulaMakeList[e.canisterId - 164].recipeOutOrder = it.recipeOutOrder[e.recipeOutOrder].value;
                                it.formData.formulaMakeList[e.canisterId - 164].flavorName = e.flavorName;
                            }
                        });
                        it.formData.flavorName = res.flavorName;
                        setTimeout(() => {
                            it.loading = false;
                        }, 1000);
                    })() : (() => {
                        it.IError(res.statusCode.msg);
                        throw "收集到错误：\n\n" + res.statusCode.status;
                    })();
                }
            })
        }
    }
})