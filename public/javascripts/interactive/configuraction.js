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
		xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xml.send(arguments[3]);
		arguments[2] == false ? ~function(){
			if (xml.status == 200) {
	           console.log('连接成功：状态码 ' + xml.status );
	       } else {
	           ym.init.MBOX({
	           	msg:"失败，失败状态码：" + xml.status,
	           	dely:3000
	           });
	        }
		}() : null;
		return arguments[4](JSON.parse(xml.responseText));
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
			'marginLeft':'-' + jQuery('.module').innerWidth() / 2+ 'px',
			'marginTop':'-' + jQuery('.module').innerWidth() / 2 + 'px',
		})
		setTimeout(function(){
			jQuery('.module').remove();
		},arguments[0].dely);
	},
	COMPILESTR:{
		encryption:function(_e){
			var c = String.fromCharCode(_e.charCodeAt(0) + _e.length);
		    for(var i = 1;i < _e.length; i++){
		        c += String.fromCharCode(_e.charCodeAt(i) + _e.charCodeAt(i - 1));
		    }
		     return escape(c);
		},
		decrypt:function(_e){
			_e = unescape(_e);
		    var c = String.fromCharCode(_e.charCodeAt(0)-_e.length);
		    for(var i=1;i<_e.length;i++){
		        c+=String.fromCharCode(_e.charCodeAt(i)-c.charCodeAt(i-1));
		    }
		    return c;
		}
	},
	_COLUMN:{
			template:function(template){
				const evalExpr = /<%=(.+?)%>/g; //解码
				const expr = /<%([\s\S]+?)%>/g; //解码
				template = template
				.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`') //echo 
				.replace(expr, '`); \n $1 \n  echo(`'); //expr
	
				template = 'echo(`' + template + '`);';
				let script =
					`(function parse(data){
			    		let output = "";
			
					    function echo(html){
					      output += html;
					    }
			
			    		${ template }
			
			    	return output;
			  	})`;
		
				return script;
			},
			varel:function(_e){
				let template = `
					<tr>
					  	<% for(let i=0; i < 6; i++) { %>
						    <% for(let key in data.supplies) {%>
						    	<td><%= data.supplies[i][key] %></td>
						    <% } %>
					  	<% } %>
						<% if(data.ace){ %>
							<td><%= data.ace %></td>
						<% } %>
					</tr>
				`;
				var parse = eval(ym.init._COLUMN.template(template)),
				ac = document.getElementById('ac');
				ac.innerHTML = parse({
					supplies: _e
				});
			}
	}
}

//<% for(let i=0; i < data.supplies.length; i++) { %>
//					    <% for(let j = 0; j < 12; j++) {%>
//					    	<td><%= data.supplies[i] %></td>
//					    <% } %>
//					  <% } %>