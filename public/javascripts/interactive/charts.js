var echarts = require('echarts');
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
            userCharts: [ym.init.getDateTime(new Date().setDate(new Date().getDate() - 6)).split(' ')[0], ym.init.getDateTime(new Date()).split(' ')[0]],
            sum: 0,
            paySum: 0
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
                        // uri: token._j.URLS.Development_Server_ + uri,
                        uri: 'http://mapi.cbcoffee.cn/' + uri,
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.sum = res.package.sum;  //总金额
                                    let _date = ym.init.getAllDate(it.userCharts[0].split(' ')[0], it.userCharts[1].split(' ')[0]);
                                    for (let i = 0; i < _date.length; i++) {
                                        _DayTime.push(_date[i]);  //记录日期
                                        for (let j of res.package.content) {
                                            if (_date[i] == j.moneyDay) {
                                                _content.push(j.money); //对应的数值
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
                                    data: _content
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
                            // uri: token._j.URLS.Development_Server_ + uri,
                            uri: 'http://mapi.cbcoffee.cn/statistics_adduser',
                            async: false,
                            xmldata: _data,
                            done: function (res) {
                                try {
                                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                        // it.sum = res.package.sum;  //总金额
                                        let _date = ym.init.getAllDate(it.userCharts[0].split(' ')[0], it.userCharts[1].split(' ')[0]);
                                        for (let i = 0; i < _date.length; i++) {
                                            _DayTime.push(_date[i]);  //记录日期
                                            for (let j of res.package.userContent) {
                                                if (_date[i] == j.registerDate) {
                                                    _content.push(j.userCount); //对应的数值
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
                                    text: '新增人数柱状图'
                                },
                                tooltip: {
                                    trigger: 'axis'
                                },
                                legend: {
                                    data: ['新增人数']
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
                    _data['url'] = '/manage/chartsFinance.html'
                    _data['adminId'] = JSON.parse(decodeURI(parent.document.getElementById('tagHref').getAttribute('src').split('*')[1])).adminID
                    _data['startTime'] = it.userCharts[0]
                    _data['endTime'] = it.userCharts[1]
                    ym.init.XML({
                        method: 'GET',
                        // uri: token._j.URLS.Development_Server_ + uri,
                        uri: 'http://mapi.cbcoffee.cn/statistics_admin_sold_graph',
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                                    it.paySum = res.package.allPayMoney;  //总金额
                                    it.sum = res.package.allCountNum;  //总数量
                                    let _date = ym.init.getAllDate(it.userCharts[0].split(' ')[0], it.userCharts[1].split(' ')[0]);
                                    for (let i = 0; i < _date.length; i++) {
                                        _DayTime.push(_date[i]);  //记录日期
                                        for (let j of res.package.userContent) {
                                            if (_date[i] == j.registerDate) {
                                                _content.push(j.userCount); //对应的数值
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
                    setTimeout(()=>{
                        let ech = echarts.init(document.getElementById('echartsCanvasNumber')), _ = {
                            title : {
                                text: '某地区蒸发量和降水量'
                            },
                            tooltip : {
                                trigger: 'axis'
                            },
                            legend: {
                                data:['蒸发量','降水量']
                            },
                            toolbox: {
                                show : true,
                                feature : {
                                    dataView : {show: true, readOnly: false},
                                    magicType : {show: true, type: ['line', 'bar']},
                                    restore : {show: true},
                                    saveAsImage : {show: true}
                                }
                            },
                            calculable : true,
                            xAxis : [
                                {
                                    type : 'category',
                                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                {
                                    name:'蒸发量',
                                    type:'bar',
                                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                                    markPoint : {
                                        data : [
                                            {type : 'max', name: '最大值'},
                                            {type : 'min', name: '最小值'}
                                        ]
                                    },
                                    markLine : {
                                        data : [
                                            {type : 'average', name: '平均值'}
                                        ]
                                    }
                                },
                                {
                                    name:'降水量',
                                    type:'bar',
                                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                                    markPoint : {
                                        data : [
                                            {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                                            {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                                        ]
                                    },
                                    markLine : {
                                        data : [
                                            {type : 'average', name : '平均值'}
                                        ]
                                    }
                                }
                            ]
                        };
                        ech.setOption(_, true);
                        
                    }, 1000)
                    break;
                default:
                    break;
            }
            it.loading = false;
        }
    }
});