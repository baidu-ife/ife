/*
* app.js
*/

// 对浏览器做初始化处理，如兼容性问题
;(function initialize (exports) {
    // Object.create
    if(typeof Object.create !== "function") {
        Object.prototype.create = function (par) {
            function F () { };
            F.prototype = par;
            return new F();
        }
    }

    // 该方法摘自《基于javascript的mvc富应用开发》
    Math.guid = function () {
        return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random()*16|0,
                v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        })).toUpperCase();
    }
})(window);


;(function (exports) {
    // 事件机制
    var EventManager = {
        on:function () {
            
        },
        off:function () {
            
        },
        trigger:function () {
            
        }
    };


    // 模型
    var Model = function (attrs) {
        this.attributes=[];
        this.id=Math.guid();
        Model.prototype.initialize.apply(this,attrs);
    };
    Model.prototype = {
        constructor:Model,
        initialize:function () {
            
        },
        set:function () {
            
        },
        get:function () {
            
        },
        toJSON:function () {
            
        },
        clone:function () {
            
        },
        save:function () { // 保存到服务器或localstroage
            
        },
        fetch:function () { // 从服务器或localstroage中获取数据
            
        },
        destroy:function () {
            
        }
    };
    $.extend(Model.prototype,EventManager);


    // 集合
    var List = {

    };


    // 控制器+视图
    var View = {

    };


    // @prama protoProps 添加到child的prototype的方法
    var extend = function (protoProps) {
        var parent = this,
            child;

        child = function () {
            parent.apply(this, arguments);
        };
        child.prototype=Object.create(parent.prototype);
        child.prototype.constructor=child;

        // 复制parent的静态属性到child中
        $.extend(child,parent);

        // 复制protoProps到child的prototype上
        $.extend(child.prototype, protoProps);

        //方便调用父类的方法
        child.__super__=parent.prototype;

        return child;
    };


    // 继承某个对象
    Model.extend = View.extend = List.extend = extend;

    exports.Model=Model;
    exports.View=View;
    exports.List=List;

})(window);


var Person=Model.extend({

});

var person1=new Person({
    name:"ych",
    age:19
});
person1.set({
    name:"lihua"
});