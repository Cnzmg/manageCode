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
            userCharts: [new Date(), (new Date().setDate(new Date().getDate() - 6))]
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
                    ym.init.XML({
                        method: 'GET',
                        uri: token._j.URLS.Development_Server_ + uri,
                        async: false,
                        xmldata: _data,
                        done: function (res) {
                            try {
                                ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {

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
                                data: ['邮件营销']
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
                                    data: (()=>{
                                        return ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                                    })()
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '邮件营销',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {},
                                    data: [parseInt(Math.random() * 120), parseInt(Math.random() * 132), parseInt(Math.random() * 101), parseInt(Math.random() * 134), parseInt(Math.random() * 90), parseInt(Math.random() * 230), parseInt(Math.random() * 210)]
                                }
                            ]
                        };
                        myChart.setOption(_, true);
                        // this.autoHeight = (reg.package.package.machineSoldAnalyzeList == null ? 0 : reg.package.package.machineSoldAnalyzeList.length * 35 + 200);
                        // myChart.getDom().style.height = this.autoHeight + "px";
                    }, 500)
                    break;
                default:
                    break;
            }
            it.loading = false;
        }
    }
});