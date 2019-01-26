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
    e = event ? event : (window.event ? window.event : null);
    if (e.keyCode == 13){
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
    ym.init.XML('POST',JSON.parse(localStorage.getItem('_e')).URLS.Development_Server_ + "admin_login",false,`adminName=${user.value}&adminPwd=${pwd.value}`,function(_e){
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
				ym.init.XML(
					'POST',
					JSON.parse(localStorage.getItem('_e')).URLS.Development_Server_ + "index_info",
					false,
					"id="+ ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem("token")).uname) +"&token="+ ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem("token")).utoken) + "&url=/manage/index.html",
					function(res) {
						ym.init._COLUMN.varel(res.adminInfo.roleInfo.permissionInfoList);
				});
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
    })
};
