ym.init = {
	plugin:{
		fn:function(){},
		bool:false,
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
	error:function(){
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
	}
}
