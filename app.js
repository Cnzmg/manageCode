(function(){

    var ym = window.ym = window.y = function(selector){
        return new ym.fn.init(selector);
    }; // 暴露ym 可以外部 使用的接口
    
    ym.fn = ym.prototype = {
        init:function(selector){
            var elent = document.getElementById(selector);
            Array.prototype.push.apply(this,elent);  //array 性能 1
            return this;
        },
        length:0,
        size:function(){
            return this.length;
        }
    };  //处理原型对象
    //处理外部接口
    ym.fn.init.prototype = ym.fn;

    ym.extend = ym.fn.extend = function(){
        //只处理一个参数，也就是拓展插件
        var o = arguments[0];
        for(var p in o){
            this[p] = o[p];
        }
    };  //实现继承

    ym.extend({});  //添加静态方法

    ym.fn.extend({}); //添加实例方法

})();