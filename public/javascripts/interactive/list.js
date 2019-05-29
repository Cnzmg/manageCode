const [$,token,u,uri]  = [parent.all.jq,parent.all.json,parent.document.getElementById('tagHref').getAttribute('src').replace('..', '/manage').split('?')[0],document.getElementById('c-container-list').getAttribute('data-uri')];
new Vue({
    el: '#c-container-list',
    data: () => {
        return {
            loading: false,
            tableData: [],
            currentPage: 1,
            pageSize: 20,
            total: 0,
            page: 1
        }
    },
    created: function () {
        this.list();
    },
    methods: {
        Error(err) {
            this.$message.error('错了哦，' + err);
        },
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
        list(e){
            let it = this, _data = {
                id: ym.init.COMPILESTR.decrypt(token.id),
                token: ym.init.COMPILESTR.decrypt(token.asset),
                // url: u.toLowerCase(),
                url: u,
                page: it.page
            },xml = [];
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (() => {
                        console.log(res.formulaInfoList.length);
                        for (let i = 0; i < res.formulaInfoList.length; i++) {
                            xml.push({
                                formulaId: res.formulaInfoList[i].formulaId,
                                formulaName: res.formulaInfoList[i].formulaName,
                                createTime: res.formulaInfoList[i].createTime
                            })
                        }
                        it.total = parseInt(res.pageCount);
                        it.tableData = xml;
                    })()
                    : 
                    {};
                }
            })
        }
    }
});