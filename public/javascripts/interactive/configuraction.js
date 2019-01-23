ym.init = {
	plugin:{
		fn:function(){},
		bool:false,
		loading:`<div class="k-ball7a"></div><div class="k-ball7b"></div><div class="k-ball7c"></div><div class="k-ball7d"></div>`,
		ui:function(){
			return this.arguments;
		}
	},
	XML:function(){
		var xml = null;
		if(window.XMLHttpRequest){
			xml = new XMLHttpRequest();
		}else{
			xml = new ActiveXObject("Microsoft.XMLHTTP");
		};
		
		xml.open(
			arguments[0],
			arguments[1],
			arguments[2]
		);
		xml.send(arguments[3]);
		return arguments[4](xml.responseText);
	},
	GETURI:function(){
		var req = new RegExp("(^|&)" + arguments[0] + "=([^&]*)(&|$)", "i") ,res = window.location.search.substr(1).match(req);
		if(res != null) return decodeURI(res[2]);
		return null;
	},
	GETRANDOM:function(){
		arguments = arguments[0] || 12;
		var m = "", i = 0; str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		for(let i = 0; i < arguments; i++){
			m += str.charAt(Math.floor(Math.random() * str.length));
		}
		return m;
	},
	ERROR:function(){
		var code = {};
		if( typeof arguments[0] === 'function' ){
			code = {
				start:200,
				msg:arguments[0].msg
			}
		}else{
			code = {
				start:400,
				msg:'状态错误'
			}
		}
		return code;
	},
	LOADING:function(){
		switch(typeof arguments[0]){
			case 'object':
				jQuery(arguments[0].tap).html(`<div class="k-ball-holder" style="${arguments[0].style}">${ym.init.plugin.loading}<div style="margin-left:60%;">${arguments[0].select}</div></div>`);  //改变提交的方式
				break;
			default:
				console.log(2);
		}
	},
	MBOX:function(){
		if(arguments[0].redom){
			jQuery(arguments[0].redom).html(arguments[0].resetdom.inner);
			jQuery(arguments[0].resetdom.tag).html(arguments[0].resetdom.inner);
		}
		var dom = `<div class="module">${arguments[0].msg}</div>`;
		jQuery('body').append(dom);
		jQuery('.module').css({
			'marginLeft':'-' + jQuery('.module').width() + 'px',
			'marginTop':'-' + jQuery('.module').height() * 2 + 'px',
		})
		setTimeout(function(){
			jQuery('.module').remove();
		},arguments[0].dely);
	}
}
