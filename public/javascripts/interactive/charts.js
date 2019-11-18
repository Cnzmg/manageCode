// var echarts = require('echarts');
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入柱状图
require('echarts/lib/chart/line');
//引入饼状图
require('echarts/lib/chart/pie');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/title');
require('echarts/lib/component/markPoint');
require('echarts/lib/component/markLine');

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
    url: u
};
new Vue({
    el: '#c-container-list',
    data: () => {
        return {
            loading: false,
            more: false,
            pickerOptions: {
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
            tableData: [],
            userCharts: [ym.init.getDateTime(new Date().setDate(new Date().getDate() - 6)).split(' ')[0], ym.init.getDateTime(new Date()).split(' ')[0]],
            sum: 0,
            paySum: 0,
            page: 1,
            pageSize: 20,
            currentPage: 1,
            total: 0
        }
    },
    created: function () {
        this.charts();
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
        getTime(e) {
            this.userCharts[0] = ym.init.getDateTime(e[0]);
            this.userCharts[1] = ym.init.getDateTime(e[1]);
            this.charts();
        },
        handleSizeChange(e) {
            this.pageSize = e;
            this.list();
        },
        handleCurrentChange(e) {
            this.page = e;
            this.list();
        },
        charts() {
            const it = this;
            it.loading = true;
            switch (uri) {
                case 'statistics_income':
                    if (!document.getElementById('echartsCanvas')) {
                        let dom = document.createElement('div')
                        dom.setAttribute('id', 'echartsCanvas');
                        dom.setAttribute('style', 'width:100%;height:600px;');
                        document.getElementById('dom').appendChild(dom);
                    }
                    _data['startTime'] = it.userCharts[0];
                    _data['endTime'] = it.userCharts[1];
                    let _content = [], _DayTime = [];  //时间对应值
                    ym.init.XML({
                        method: 'GET',
                        uri: token._j.URLS.Development_Server_ + uri,
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.sum = res.package.sum;  //总金额
                                    let _ate = ym.init.getAllDate(it.userCharts[0].split(' ')[0], it.userCharts[1].split(' ')[0]);
                                    for (let i = 0; i < _ate.length; i++) {
                                        _DayTime.push(_ate[i]);  //记录日期
                                        _content.push(0); //先赋值 0
                                        if(res.package.content == 0) continue
                                        for (let j of res.package.content) {
                                            if (_ate[i] == j.moneyDay) {
                                                _content[i] = j.money; //对应的数值
                                            }
                                        }
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
                    setTimeout(() => {
                        let myChart = echarts.init(document.getElementById('echartsCanvas')), _ = {
                            title: {
                                text: '收入金额曲线图'
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    label: {
                                        backgroundColor: '#6a7985'
                                    }
                                }
                            },
                            legend: {
                                data: ['收入金额']
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    magicType: { show: true, type: ['line', 'bar'] },
                                    restore: { show: true },
                                    saveAsImage: { show: true }
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: _DayTime
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '收入金额',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {},
                                    data: _content,
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: {
                                        data: [
                                            { type: 'average', name: '平均值' }
                                        ]
                                    }
                                }
                            ]
                        };
                        myChart.setOption(_, true);
                        // this.autoHeight = (reg.package.package.machineSoldAnalyzeList == null ? 0 : reg.package.package.machineSoldAnalyzeList.length * 35 + 200);
                        // myChart.getDom().style.height = this.autoHeight + "px";
                    }, 500);

                    setTimeout(function () {
                        let _content = [], _DayTime = [];  //时间对应值
                        ym.init.XML({
                            method: 'GET',
                            uri: token._j.URLS.Development_Server_ + 'statistics_adduser',
                            async: false,
                            xmldata: _data,
                            done: function (res) {
                                try {
                                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                        let _date = ym.init.getAllDate(it.userCharts[0].split(' ')[0], it.userCharts[1].split(' ')[0]);
                                        for (let i = 0; i < _date.length; i++) {
                                            _DayTime.push(_date[i]);  //记录日期
                                            _content.push(0); //先赋值 0
                                            if(res.package.userContent == +false) continue; 
                                            for (let j of res.package.userContent) {
                                                if (_date[i] == j.registerDate) {
                                                    _content[i] = j.userCount; //对应的数值
                                                }
                                            }
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
                        setTimeout(() => {
                            let ech = echarts.init(document.getElementById('echartsCanvasNumber')), _ = {
                                title: {
                                    text: '新增人数柱状图'
                                },
                                tooltip: {
                                    trigger: 'axis'
                                },
                                legend: {
                                    data: ['新增人数']
                                },
                                toolbox: {
                                    show: true,
                                    feature: {
                                        magicType: { show: true, type: ['line', 'bar'] },
                                        restore: { show: true },
                                        saveAsImage: { show: true }
                                    }
                                },
                                calculable: true,
                                xAxis: [
                                    {
                                        type: 'category',
                                        data: _DayTime
                                    }
                                ],
                                yAxis: [
                                    {
                                        type: 'value'
                                    }
                                ],
                                series: [
                                    {
                                        name: '新增人数',
                                        type: 'bar',
                                        data: _content,
                                        markPoint: {
                                            data: [
                                                { type: 'max', name: '最大值' },
                                                { type: 'min', name: '最小值' }
                                            ]
                                        },
                                        markLine: {
                                            data: [
                                                { type: 'average', name: '平均值' }
                                            ]
                                        }
                                    }
                                ]
                            };

                            ech.setOption(_, true)
                        }, 1000)
                    }, 1000);
                    break;
                case 'statistics_machinelist':
                    it.list();
                    _data['url'] = '/manage/chartsFinance.html'
                    _data['adminId'] = JSON.parse(decodeURI(parent.document.getElementById('tagHref').getAttribute('src').split('*')[1])).adminID
                    _data['startTime'] = it.userCharts[0]
                    _data['endTime'] = it.userCharts[1]
                    _content = { payMoney: [], countNum: [] }, _DayTime = [];  //时间对应值
                    ym.init.XML({
                        method: 'GET',
                        uri: token._j.URLS.Development_Server_ + 'statistics_admin_sold_graph',
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    let _date = ym.init.getAllDate(it.userCharts[0].split(' ')[0], it.userCharts[1].split(' ')[0]);
                                    it.paySum = res.package.allPayMoney
                                    it.sum = res.package.allCountNum
                                    for (let i = 0; i < _date.length; i++) {
                                        _DayTime.push(_date[i]);  //记录日期
                                        _content.payMoney.push(0); //总金额数值
                                        _content.countNum.push(0); //总销售数值
                                        if(res.package.adminSoldGraphList == null)  continue
                                        for (let j of res.package.adminSoldGraphList) {
                                            if (_date[i] == j.date) {
                                                _content.payMoney[i] = j.payMoney; //总金额数值
                                                _content.countNum[i] = j.countNum; //总销售数值
                                                break;
                                            }
                                        }
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
                    setTimeout(() => {
                        let ech = echarts.init(document.getElementById('echartsCanvasNumber')), _ = {
                            title: {
                                text: '销售量'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: ['总销售', '总金额']
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    magicType: { show: true, type: ['line', 'bar'] },
                                    restore: { show: true },
                                    saveAsImage: { show: true }
                                }
                            },
                            calculable: true,
                            xAxis: [
                                {
                                    type: 'category',
                                    data: _DayTime
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '总销售',
                                    type: 'bar',
                                    data: _content.countNum,
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: {
                                        data: [
                                            { type: 'average', name: '平均值' }
                                        ]
                                    }
                                },
                                {
                                    name: '总金额',
                                    type: 'bar',
                                    data: _content.payMoney,
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: {
                                        data: [
                                            { type: 'average', name: '平均值' }
                                        ]
                                    }
                                }
                            ]
                        };
                        ech.setOption(_, true);
                        // uri: token._j.URLS.Development_Server_ + uri,
                        // ym.init.XML({
                        //     uri: 'https://yuntuapi.amap.com/datasearch/local?tableid=5bebc2507bbf195c079c50d6&city=全国&keywords= &filter=adminId:40&limit=50&page=1&key=8d7d4594c6fdff4624696ba71f9e4c8a',
                        //     method: 'post',
                        //     done: function (res) {
                        //         console.log(res);
                        //         // for (var i = 0; i < res.datas.length; i++) {
                        //         //     // 创建点覆盖物
                        //         //     var marker = new AMap.Marker({
                        //         //         position: new AMap.LngLat(res.datas[i]._location.split(',')[0], res.datas[i]._location.split(',')[1]),
                        //         //         icon: res.datas[i].marker,
                        //         //         offset: new AMap.Pixel(-13, -30)
                        //         //     });
                        //         //     map.add(marker);
                        //         // }
                        //     }
                        // });

                    }, 2000)
                    break;
                case 'statistics_machineorder':
                    it.list();  //统计列表
                    _data['url'] = '/manage/chartsFinance.html'
                    _data['startTime'] = it.userCharts[0]
                    _data['endTime'] = it.userCharts[1]
                    _data['machineNumber'] = JSON.parse(decodeURI(parent.document.getElementById('tagHref').getAttribute('src').split('*')[1])).machineNumber;
                    _content = { payMoney: [], countNum: [], _contentNum: [], _contentY: [], _contentTNum: [] }, _DayTime = [];  //时间对应值
                    ym.init.XML({
                        method: 'GET',
                        uri: token._j.URLS.Development_Server_ + 'statistics_machine_sold_graph',
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    let _date = ym.init.getAllDate(it.userCharts[0].split(' ')[0], it.userCharts[1].split(' ')[0]);
                                    it.paySum = res.package.allPayMoney
                                    it.sum = res.package.allCountNum
                                    for (let i = 0; i < _date.length; i++) {
                                        _DayTime.push(_date[i]);  //记录日期
                                        _content.payMoney.push(0); //总金额数值
                                        _content.countNum.push(0); //总销售数值
                                        if(res.package.machineSoldGraphList == null) continue
                                        for (let j of res.package.machineSoldGraphList) {
                                            if (_date[i] == j.date) {
                                                _content.payMoney[i] = j.payMoney; //总金额数值
                                                _content.countNum[i] = j.countNum; //总销售数值
                                                break;
                                            }
                                        }
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
                    ym.init.XML({   //产品销量
                        method: 'GET',
                        uri: token._j.URLS.Development_Server_ + 'statistics_machine_sold_analyze',
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    if(res.package.package.machineSoldAnalyzeList == null){
                                        _content._contentNum.push('0'); //销售元
                                        _content._contentY.push('无产品'); //产品名称
                                        _content._contentTNum.push('0'); //销售杯
                                        return false;
                                    }
                                    for (var i = 0; i < res.package.package.machineSoldAnalyzeList.length; i++) {
                                        for (var j = 0; j < res.package.package.machineSoldAnalyzeList.length - 1 - i; j++) {
                                            if (res.package.package.machineSoldAnalyzeList[j].payMoney > res.package.package.machineSoldAnalyzeList[j + 1].payMoney) {
                                                let temp = res.package.package.machineSoldAnalyzeList[j + 1];
                                                res.package.package.machineSoldAnalyzeList[j + 1] = res.package.package.machineSoldAnalyzeList[j];
                                                res.package.package.machineSoldAnalyzeList[j] = temp;
                                            }
                                        }
                                    };
                                    res.package.package.machineSoldAnalyzeList.forEach((arr, index) => {
                                        _content._contentNum.push(arr.payMoney); //销售元
                                        _content._contentY.push(arr.productName); //产品名称
                                        _content._contentTNum.push(arr.countNum); //销售杯
                                    })
                                })() :
                                    (() => {
                                        throw "收集到错误：\n\n" + res.statusCode.msg;
                                    })()
                            } catch (error) {
                                it.IError(error);
                            }
                        }
                    });
                    setTimeout(() => {
                        let ech = echarts.init(document.getElementById('echartsCanvasNumber')), _ = {
                            title: {
                                text: '销售量'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: ['总金额', '总销售']
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    magicType: { show: true, type: ['line', 'bar'] },
                                    restore: { show: true },
                                    saveAsImage: { show: true }
                                }
                            },
                            calculable: true,
                            xAxis: [
                                {
                                    type: 'category',
                                    data: _DayTime
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '总金额',
                                    type: 'bar',
                                    data: _content.payMoney,
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: {
                                        data: [
                                            { type: 'average', name: '平均值' }
                                        ]
                                    }
                                },
                                {
                                    name: '总销售',
                                    type: 'bar',
                                    data: _content.countNum,
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: {
                                        data: [
                                            { type: 'average', name: '平均值' }
                                        ]
                                    }
                                }
                            ]
                        };
                        ech.setOption(_, true);

                    }, 1000)
                    setTimeout(() => {
                        let ech = echarts.init(document.getElementById('echartsCanvasProduct')), _ = {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data: ['销售额(元)', '销量(杯)']
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'value',
                                axisLine: {
                                    lineStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            yAxis: {
                                type: 'category',
                                data: _content._contentY
                            },
                            series: [{
                                name: '销售额(元)',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideLeft'
                                    }
                                },
                                data: _content._contentNum
                            },
                            {
                                name: '销量(杯)',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: _content._contentTNum
                            }
                            ]
                        };
                        ech.setOption(_, true);

                    }, 2000)
                    break;
                case 'get_activity_log_list':
                    it.list();
                    let _contentBt = {unused: [], used: [], due: [], Sum: []};
                    _DayTime = []
                    ym.init.XML({   //产品销量
                        method: 'GET',
                        uri: token._j.URLS.Development_Server_ + 'get_activity_statistics',
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                res.statusCode.status == 0o10534 ? res.statusCode.status = 0o15012 : null;   //判空调用
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    _contentBt.unused = res.unused || 0
                                    _contentBt.used = res.used || 0
                                    _contentBt.due = res.due || 0
                                    let _date = ym.init.getAllDate(it.userCharts[0].split(' ')[0], it.userCharts[1].split(' ')[0]);
                                    for (let i = 0; i < _date.length; i++) {
                                        _DayTime.push(_date[i]);  //记录日期
                                        _contentBt.Sum.push(0);  //0 
                                        for (let j of res.dataList) {
                                            if (_date[i] == j.date) {
                                                _contentBt.Sum[i] = j.count; //总数量
                                                break;
                                            }
                                        }
                                    }
                                })() :
                                    (() => {
                                        throw "收集到错误：\n\n" + res.statusCode.msg;
                                    })()
                            } catch (error) {
                                // it.IError(error);
                            }
                        }
                    });
                    setTimeout(()=>{
                        let eachts = echarts.init(document.getElementById('echartsCanvasPanel')), _ = {title : {
                            text: '活动日志明细',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['领取却未使用优惠券的用户数','领取并且已使用优惠券的用户数','领取后优惠券过期的用户数']
                        },
                        series : [
                            {
                                name: '明细',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data:[
                                    {value: _contentBt.unused, name:'领取却未使用优惠券的用户数'},
                                    {value:_contentBt.used, name:'领取并且已使用优惠券的用户数'},
                                    {value:_contentBt.due, name:'领取后优惠券过期的用户数'},
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]}
                        eachts.setOption(_, true);
                    },1000)
                    setTimeout(() => {
                        let ech = echarts.init(document.getElementById('echartsCanvasBeg')), _ = {
                            title: {
                                text: '每日产生日志数量'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data: ['数量']
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    magicType: { show: true, type: ['line', 'bar'] },
                                    restore: { show: true },
                                    saveAsImage: { show: true }
                                }
                            },
                            calculable: true,
                            xAxis: [
                                {
                                    type: 'category',
                                    data: _DayTime
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '数量',
                                    type: 'bar',
                                    data: _contentBt.Sum,
                                    markPoint: {
                                        data: [
                                            { type: 'max', name: '最大值' },
                                            { type: 'min', name: '最小值' }
                                        ]
                                    },
                                    markLine: {
                                        data: [
                                            { type: 'average', name: '平均值' }
                                        ]
                                    }
                                }
                            ]
                        };
                        ech.setOption(_, true);

                    }, 2000)
                    break;
                default:
                    break;
            }
            it.loading = false;
        },
        list() {
            const it = this;
            _data['url'] = '/manage/chartsFinance.html';
            if (uri == 'statistics_machineorder') {
                _data['checkMachineNum'] = JSON.parse(decodeURI(parent.document.getElementById('tagHref').getAttribute('src').split('*')[1])).machineNumber
                _data['startTime'] = it.userCharts[0]
                _data['endTime'] = it.userCharts[1]
                _data['PageNum'] = 1
            } else if (uri == 'get_activity_log_list') {
                _data['page'] = it.page
                _data['activityType'] = 1
                _data['startTime'] = it.userCharts[0]
                _data['endTime'] = it.userCharts[1]
                _data['url'] = `/manage/chartsActive.html`
            }else if(uri == 'statistics_machinelist'){
                _data['startTime'] = it.userCharts[0];
                _data['endTime'] = it.userCharts[1];
                _data['adminID'] = JSON.parse(decodeURI(parent.document.getElementById('tagHref').getAttribute('src').split('*')[1])).adminID;
                //暂定
                JSON.parse(decodeURI(parent.document.getElementById('tagHref').getAttribute('src').split('*')[1])).adminID ? null : parent.document.getElementById('tagHref').setAttribute('src', '../chartsFinance.html?hash:iforx197'); //不存在admin ID情况下
            }
            ym.init.XML({
                method: 'GET',
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? ((xml = []) => {
                        switch (uri) {
                            case `statistics_machinelist`:
                                for (let i = 0; i < res.package.MachineCountList.length; i++) {
                                    xml.push({
                                        machineNumber: res.package.MachineCountList[i].machineNumber,
                                        addr: res.package.MachineCountList[i].addr,
                                        machineType: (res.package.MachineCountList[i].machineType == 1 ? '大型柜式机' : '小型桌面机'),
                                        payMoney: res.package.MachineCountList[i].payMoney,
                                        payCount: res.package.MachineCountList[i].payCount,
                                        longitude: res.package.MachineCountList[i].longitude,
                                        latitude: res.package.MachineCountList[i].latitude
                                    })
                                }
                                break;
                            case 'statistics_machineorder':
                                for (let i = 0; i < res.package.MachineOrderList.length; i++) {
                                    xml.push({
                                        orderID: res.package.MachineOrderList[i].orderID,
                                        productName: res.package.MachineOrderList[i].productName,
                                        payMoney: res.package.MachineOrderList[i].payMoney,
                                        payType: res.package.MachineOrderList[i].payType,
                                        payTime: res.package.MachineOrderList[i].payTime
                                    })
                                }
                                break;
                            case 'get_activity_log_list':
                                for (let i = 0; i < res.logList.length; i++) {
                                    xml.push({
                                        activityLogId: res.logList[i].activityLogId,
                                        userId: res.logList[i].userId,
                                        userName: res.logList[i].userName,
                                        createTime: res.logList[i].createTime,
                                        comment: res.logList[i].comment,
                                        verify: res.logList[i].verify,
                                        rCouponId: res.logList[i].rCouponId,
                                        couponId: res.logList[i].couponId,
                                        couponName: res.logList[i].couponName,
                                        couponTime: (res.logList[i].couponTime ? ym.init.getDateTime(res.logList[i].couponTime) : ''),
                                        status: (res.logList[i].status ? '未使用' : '已使用')
                                    })
                                }
                                break;
                            default:
                                break;
                        }
                        it.total = parseInt(res.pageCount * 20);
                        it.tableData = xml;
                        it.loading = false;
                    })() : it.IError(res.statusCode.msg);
                }
            })
        },
        crud(arg) {
            window.parent.document.getElementById('tagHref').setAttribute('src', `../${arg.uri}.html?[hash]${arg.enitId ? '*' + encodeURI(JSON.stringify(arg.enitId)) : ''}`); // 编辑带参数
        },
    }
});