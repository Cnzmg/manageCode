var httpUpdata = 'https://api.cbcoffee.cn/operate_acode';
var config = {
    reoutes:function(){
        this.secret = 'secret';
        this.token = 'token';
        this.sign = 'secter=zhimeng&sign=2-98-70-50-74-87-73-72-76-75&code=yiban_token';
        window.uri = '2-98-70-50-74-87-73-72-76-75';
        return uri;
    },
    getQrcode:{
        getQueryString:function(e){  //获取参数
            var reg = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);   // 编码问题 decodeURI  unescape
            return null;
        },
        codeMsg:function(e){
            e = e || 12;
            var m = "", i = 0; str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for(; i < e; i++){
                m +=  str.charAt(Math.floor(Math.random() * str.length));
            };
            return new Date().getTime() + m;
        }
    },
    setQrcode:function(e){  //二维码失效
        jQuery.ajax({
            url: httpUpdata + '?v=' + config.reoutes(),
            type:'GET',
            dataType:'json',
            data:{type:3,verify:config.getQrcode.getQueryString('secter'),secret:e}
        }).done(function(res){
            if(res.statusCode.status == 6666){
                config.init();
            }else{
                alert('error code message! msg:'+ res.statusCode.msg);
            }
            
        })
    },
    verificationQrcode:function(e,arg){  //重新获取验证
        (function time(){
            if (e == 0) {
                clearTimeout(t);
                jQuery('#module').show().off().bind('click',function(){
                    config.setQrcode(arg);
                });
                return false;
            }else {
                e--;
                sessionStorage.setItem('time',e);
                e = sessionStorage.getItem('time');
            }
            var t = setTimeout(function(){
                time();
            },1000);
        }());
    },
    init:function(e){  //初始化
        console.log(config.reoutes());
        jQuery.ajax({
            url:httpUpdata + '?v=' + config.reoutes(),
            type:'GET',
            dataType:'json',
            data:{type:1,verify:config.getQrcode.getQueryString('secter')}
        }).done(function(res){
            if(res.statusCode.status == 6666){
                jQuery('#module').hide()
                jQuery('#img').attr('src',res.url).css({
                    'left':"27%",
                    'bottom':"7%"
                });
                jQuery('#module').css({
                    'width':jQuery('#img').width(),
                    'left':"27%",
                    'bottom':"7%"
                })
                sessionStorage.setItem('time',300);
                config.verificationQrcode(30,res.secret);
            }else{
                alert('error code message! msg:'+ res.statusCode.msg);
            }
            
        })
    }
}