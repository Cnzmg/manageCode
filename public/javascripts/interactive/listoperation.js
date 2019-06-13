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
            
        }
    },
    created:function(){

    },
    methods:{
        
    }
})