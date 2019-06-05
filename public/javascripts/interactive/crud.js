const [
    $,
    token,
    uri,
    assetUri,
    callBackHtml
] = [
    parent.all.jq,
    parent.all.json,
    document.getElementById('c-container-list').getAttribute('data-uri'),
    document.getElementById('c-container-list').getAttribute('data-asset'),
    document.getElementById('c-container-list').getAttribute('data-goback'),
]
new Vue({
    el: '#c-container-list',
    data: () => {
        return {
            loading: false,
            boxshow: false,
            select:'',
            formData: {
                formulaMakeList:[{
                    
                }]
            },
            recipeOutOrder:[{
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
            flavorCanChange: []
        }
    },
    created: function () {

    },
    methods: {
        Ichange(e){
            const it = this;
            switch(e.options){
                case 'machineType':
                    e.value != "big" && e.value != '' ? it.boxshow = true : it.boxshow = false;
                    break;
                default:
                    break;
            }
        },
        Ipush(e){
            const it = this,_data = {
                id: ym.init.COMPILESTR.decrypt(token.id),
                token: ym.init.COMPILESTR.decrypt(token.asset),
                url: assetUri
            },type = [
                'manage_formula:2'
            ];
            it.loading = true;
            _data['type'] = 2;
            _data['machineType'] = 1;
            console.log($("#AddProduct").serialize());
            ym.init.XML({
                method: 'POST',
                uri: token._j.URLS.Development_Server_ + uri,
                async: false,
                xmldata: _data,
                done: function (res) {
                    ym.init.RegCode(token._j.successfull).test(res.statusCode.status) ? (()=>{
                        
                    })() :{

                    }
                    setTimeout(()=>{
                        it.loading = false;
                    },1000);
                }
            })
        }
    }
})