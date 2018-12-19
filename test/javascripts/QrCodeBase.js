var config = {
    parages:{
    	httpUpdataInlocalUri:'https://api.cbcoffee.cn/',
        httpUpdataInlocal:'https://case.cbcoffee.cn/operate_acode',
        httpUpdataInline:'https://api.cbcoffee.cn/operate_acode',
        secret: '',
        sharedId:891,
        token:'c66b2dc5c26eff85cbe6109367b5886a',
        sign: '&sign=2-98-70-50-74-87-73-72-76-75&code=',
        time: 300,
        pulgin:'yiban_token',
        secter:'zhimeng',
        clsid:'d27cdb6e-ae6d-11cf-96b8-444553540000',
        m:'2c7f05249a69e73bbb2c5324c3bc3e39,794c7640f72836c41c0c943b21bd3da5',
        Magnification:{
        	top:0.68,
        	left:0.28,
        	iwidth:0.427,
        	iheight:0.24
        },
        SharedCoffee:function(){
        	jQuery.get(config.parages.httpUpdataInlocalUri + 'share_coupon_verification?userId='+ config.parages.sharedId +'&userToken='+ config.parages.token +'&url='+encodeURIComponent(location.href.split('#')[0]),function(data,status){
		      wx.config({
		          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		          appId: 'wx71c7dc4f5208bb07', // 必填，公众号的唯一标识
		          timestamp: data.timestamp, // 必填，生成签名的时间戳
		          nonceStr: data.nonceStr, // 必填，生成签名的随机串
		          signature: data.signature,// 必填，签名，见附录1
		          jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		      });
		      wx.ready(function (){
		          wx.onMenuShareAppMessage({ //微信分享朋友
		          title: "咖啡蜗", // 分享标题
		          desc: "接纳每一颗热衷共享的种子，一同繁衍它的“城市大共享”", // 分享描述
		          link: location.href, // 分享链接
		          imgUrl: "http://www.cbcoffee.cn/sharedcoffee/coffee2.png", // 分享图标
		          type: '', // 分享类型,music、video或link，不填默认为link
		          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		          success: function (reg) {
		              console.log(reg);
		          },
		          cancel: function (err) {
		              console.log(err);
		          }
		      });
		
		      });
		
		});
        }
    },
    reoutes:function(uri){
    	location.pathname.split('path') ? uri = '2-98-70-50-74-87-73-72-76-75' : uri = config.parages.sign;  //待定参数
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
            var m = "", i = 0;
            for(; i < e; i++){
                m +=  clsid.charAt(Math.floor(Math.random() * clsid.length));
            };
            return new Date().getTime() + m;
        }
    },
    setQrcode:function(e){  //二维码失效
        var parages = this.parages;
        jQuery.ajax({
            url: parages.httpUpdataInline + '?v=' + config.reoutes(),
            type:'GET',
            dataType:'json',
            data:{type:3,verify:config.parages.m.split(',')[0],secret:e}
        }).done(function(res){
            if(res.statusCode.status == 6666){
                config.init();
            }else{
                alert('error code message! msg:'+ res.statusCode.msg);
            }
            
        })
    },
    verificationQrcode:function(e,arg){  //重新获取验证
        (function t(){
            var outtime = setTimeout(function(){
                t();
            },1000);
            if(e == 0){
            	clearTimeout(outtime);
                jQuery('#module').show().off().bind('click',function(){
                    config.setQrcode(arg);
                });
                return false;
            }else{
            	e--;
                sessionStorage.setItem('time',e);
                e = sessionStorage.getItem('time');
            };
        }());
    },
    init:function(parages){  //初始化
        parages = this.parages;
        config.parages.SharedCoffee();
        jQuery.ajax({
            url:parages.httpUpdataInline + '?v=' + config.reoutes(),
            type:'GET',
            dataType:'json',
            data:{type:1,verify:config.getQrcode.getQueryString('secter')}
        }).done(function(res){
            switch(res.statusCode.status){
            	case 6666:
            		jQuery('#module').hide()
	                jQuery('#img').attr('src',res.url).css({
	                	'width':document.getElementById('c').offsetWidth * config.parages.Magnification.iwidth +'px',
	                    'left':document.getElementById('c').offsetWidth * config.parages.Magnification.left +'px',
	                    'top': document.getElementById('c').offsetHeight * config.parages.Magnification.top +"px"
	                });
	                jQuery('#module').css({
	                    'height':jQuery('#img').width() + 3,
	                    'width':jQuery('#img').width() + 3,
	                    'left':document.getElementById('c').offsetWidth * config.parages.Magnification.left +'px',
	                    'top': document.getElementById('c').offsetHeight * config.parages.Magnification.top  +"px",
	                    'lineHeight':jQuery('#img').width() + 'px'
	                })
	                sessionStorage.setItem('time',300);
	                config.verificationQrcode(parages.time,res.secret);
            	break;
            	default:
            	 	alert('error code message! msg:'+ res.statusCode.msg);
            }
        })
    }
}

