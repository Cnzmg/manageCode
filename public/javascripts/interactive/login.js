let vue = new Vue({
    el: '#app',
    data: () => {
        return {
            remember: false,  //记住缓存
            user:{
                name: '',  //用户
                pwd: ''		//密码
            },
            loading: false
        }
    },
    created:function(){
        const user = document.getElementById("user"),pwd =document.getElementById("pwd"),itself = this;
        document.addEventListener('DOMContentLoaded', function(){
            localStorage.removeItem("token");
            //box position
                ym().css('box-login',{
                    'left':window.innerWidth/2 - 250,
                    'top':window.innerHeight/2 - 185
            });

            if(localStorage.getItem('remember')){  //历史账号回显
                itself.remember = true;
                itself.user.name = ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem('remember')).name);
                itself.user.pwd = ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem('remember')).pwd);
            }
        
            document.onkeydown = function(event){  //键盘回车出发
                event = event ? event : (window.event ? window.event : null);
                if (event.keyCode == 13){
                        itself.login();
                    };
            };
    });
    },
    methods:{
        Error(err){
            this.$message.error('错了哦，' + err);
        },
        checked_change(){
            if(this.remember == true){
                localStorage.setItem("remember",JSON.stringify({name:ym.init.COMPILESTR.encryption(user.value),pwd:ym.init.COMPILESTR.encryption(pwd.value)}));
            }
        },
        login(){
            const itself = this;
            itself.loading = true;
            ym.init.XML({
                method:'POST',
                uri:JSON.parse(localStorage.getItem('_e')).URLS.Development_Server_ + "admin_login",
                async:false,
                xmldata:{
                    adminName: user.value,
                    adminPwd: pwd.value
                },
                done:function(_e){
                    if (_e.statusCode.status == 2000){
                        if(!itself.remember) localStorage.removeItem('remember');
                        localStorage.setItem("token",JSON.stringify({uname:ym.init.COMPILESTR.encryption(_e.id.toString()),utoken:ym.init.COMPILESTR.encryption(_e.token)}));
                        ym.init.XML({
                            method:'POST',
                            uri:JSON.parse(localStorage.getItem('_e')).URLS.Development_Server_ + "index_info",
                            async:false,
                            xmldata:{id: ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem("token")).uname),token:ym.init.COMPILESTR.decrypt(JSON.parse(localStorage.getItem("token")).utoken),url:"/manage/index.html"},
                            done:function(res) {
                                ym.init._COLUMN.varel(res.adminInfo.roleInfo.permissionInfoList,'tr');
                        }});
                     setTimeout(()=> {
                        location.href = "./views/common/index.htm?hash:" + ym.init.GETRANDOM(8);
                     }, 500);
                    }
                else{
                        itself.Error(_e.statusCode.msg);
                        setTimeout(()=> {
                            itself.loading = false;
                        },500)
                    };
            }})
        }
    }
});


// var el = document.createElement("script"), tyihead = document.querySelector("head"), fn = res.Fn;
// var _thislength = "";
// for (let i = 0; i < res.Ciphertext; i++) {
// 	_thislength += res.SecretKey.charAt(Math.floor(Math.random() * res.SecretKey.length));
// };
// fn = fn.replace(/eml/g, 'amt = ' + JSON.stringify(_thislength));
// el.innerHTML = fn;
// tyihead.appendChild(el);
// jQuery('#no').html(res.Trgus);
