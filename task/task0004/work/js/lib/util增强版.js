/*
 * util.js
 *
 * @author: ych
 * 更新说明:
 * 1.所有函数改为以$为命名空间
 */

(function() {
    var doc=document,
        slice=Array.prototype.slice;

    // $函数返回的对象
    var SObj = function () {
        this.length=0;
        this.domArr=[];
    };

    SObj.prototype = {
        constructor: SObj,
        _push:function (nObj) {
          this.arrs.push(nObj);  
          this.length++;
        },
        get: function (i) {
            return this.domArr[i];
        },
        eq: function (i) {
            var o=this.domArr[i];
            if(!o) {
                return new SObj();
            }
            var n=$(o);
            return n;
        },
        each: function (func) {
            var len=this.length,
                domArr=this.domArr;
            for(var i=0; i<len; i++){
                func.call(this, i, domArr[i], domArr);
            }
            return this;
        },
        clone: function () {
            var res = new SObj();
            res.length=this.length;
            this.each(function (index, item, arr) {
                var n=_createDom(item.tagName, item);
                var htm=item.innerHTML;
                var n.innerHTML=htm;
                res._push(item);
            });
            return res;
        },
        addClass: function (nclass) {
            if(isArray(nclass)){
                for(var i=0; i<nclass.length; i++){
                    this.each(function (index, item, arr) {
                        addClass(item, nclass[i]);
                    })
                }
            }else{
                this.each(function (index, item, arr) {
                    addClass(item, nclass);
                })
            }
        },
        toggleClass: function (testClass) {
            this.each(function (index, item, arr) {
                toggleClass(item, testClass);
            })
        },
        hasClass: function (testClass) {
            if(this.length<1) return;
            var one=this.domArr[0];
            return hasClass(one, testClass);
        },
        removeClass: function (delClass) {
            if(isArray(nclass)){
                for(var i=0; i<nclass.length; i++){
                    this.each(function (index, item, arr) {
                        removeClass(item, nclass[i]);
                    })
                }
            }else{
                this.each(function (index, item, arr) {
                    removeClass(item, nclass);
                })
            }
        },
        isSiblingNodeWith: function (testNode) {
            if(this.length<1) return;
            var one=this.domArr[0];
            return isSiblingNode(one, testNode);
        },
        getPosition: function () {
            if(this.length<1) return;
            var one=this.domArr[0];
            return getPosition(one);
        },
        next: function () {
            
        },
        prev: function () {
            
        },
        on: function (event, selector, listener) {
            if(isFunction(selector)) {
                listener=selector;
                selector=null;
            }
            if(!selector) {
                this.each(function (index, item, arr) {
                    _addEvent(item, event, listener);
                });
            }else {
                this.each(function (index, item, arr) {
                    _delegateEvent(item, selector, event, listener);
                });
            }
            
        },
        off: function (event, listener) {
            var that=this;
            that.each(function (index, item, arr) {
                _removeEvent(item, event, listener);
            });
        },
        one: function (event, selector, listener) {
            
        },
        trigger: function (event) {// ques: 怎样传递额外的参数给事件处理程序
            if(isString(event)) {
                event=$.Event(event);
            }
            if(event instanceof Event) {
                var that=this;
                if(isFunction(doc.dispatchEvent)) {
                    that.each(function (index, item, arr) {
                        item.dispatchEvent(event);
                    });
                }else if(isFunction(doc.fireEvent)) {
                    that.each(function (index, item, arr) {
                        item.fireEvent("on"+event.type, event);
                    });
                }else {
                    alert("你的浏览器不支持自定义dom事件")
                    return;
                }
            }
        },
        click: function (listener) {
            if(!isFunction(listener)){
                this.trigger("click");
                return;
            }
            this.on("click", listener);
        },
        append: function () {
            
        },
        prepend: function () {
            
        },
        html: function (htm) {
            
        },
        find: function (selector) {
            
        }
    };


    // $函数实现部分
    // ==================================================
    /* 
     * 实现一个简单的Query,只返回一个元素
     * 匹配选择器要逆向思维,从后往前查找，有两个情况列外：
     * 1.第一个选择器是id的时候，他会用byid缩小范围;  
     * 2.最后一个是tag的时候会用bytag缩小范围;  其他的情况就是把body里面的东西全拿出来挨个筛选
     */
    function util(selector, context) {
        if (typeof selector !== "string")
            return null;
        selector = trim(selector);
        // if(typeof document.querySelector ==="function")
        //     return document.querySelector(selector);// querySelector查询属性选择器是，属性值要用引号/双引号包裹着
        context = context || document;
        var reqExpr = /^([^\s]+)\s*/;
        var matchs = reqExpr.exec(selector);
        var selItem = (matchs && matchs.length > 0) ? matchs[1] : "";
        if (selItem === "")
            return null;
        var temp = null;
        if (selItem[0] === "#") {
            // 还要判断是否包含级联
            temp = document.getElementById(selItem.substring(1));
        } else if (selItem[0] === ".") {
            var selCssName = selItem.substring(1);
            var temp = getElementsByClassName(context, selCssName);
            if (temp && temp.length > 0) {
                temp = temp[0];
            }
        } else if (selItem[0] === "[") {
            temp = null;
            var attrSel = selItem.substring(1, selItem.length - 1).split("=");
            var key = attrSel[0];
            var val = attrSel.length > 1 ? attrSel[1] : "";
            var childs = context.getElementsByTagName("*");
            for (var i = 0, len = childs.length; i < len; i++) {
                var attr = childs[i].getAttribute(key);
                if (!attr)
                    continue;
                !val ? (temp = childs[i]) : (val === attr ? (temp = childs[i]) : void 0);
                if (!temp)
                    continue;
                else
                    break;
            }
        } else {
            temp = context.getElementsByTagName(selItem)[0];
        }

        if (!temp)
            return null;
        var nexSel = selector.replace(reqExpr, "");
        if (!nexSel)
            return temp;
        else {
            temp = $(selector.replace(reqExpr, ""), temp);
            return temp;
        }
    }
    var $=util;
    $.fn=SObj.prototype;

    // 保存正则匹配规则，字符串形式
    var re={
        email:"^[a-zA-Z\\d_-]+@[a-zA-Z\\d_-]+\\.com$",
        mobile:"^1[3|4|5|8][0-9]\\d{4,8}$"
    };
    $.re=re;
    

    // 私有方法
    // ==================================================
    function _createDom (tagName, srcDom) {
        var n=doc.createElement(tagName);
        for(var i in srcDom){
            if(srcDom.hasOwnProperty(i)){
                if(srcDom[i]===srcDom.style && srcDom.style.cssText !== ""){
                    n.style.cssText=srcDom.style.cssText;
                }else{
                    n[i]=srcDom[i];
                }
            }
        }
        return n;
    }

    function _getElementsByClassName (context,selCssName) {
        var temp=[];
        if(context.getElementsByClassName){
            temp=context.getElementsByClassName(selCssName);
        }else{
            var nodes=context.getElementsByTagName("*");
            for(var i=0,len=nodes.length; i<len; i++){
                if(hasClass(nodes[i],selCssName)){
                    temp.push(nodes[i]);
                }
            }
        }
        return temp;
    }

    // 对事件对象做封装处理
    function _extendEvent (srcEvent) {
        srcEvent = srcEvent || window.event;
        var res={};
        extend(res, srcEvent);
        res.target=srcEvent.target || srcEvent.srcElement;
        res.preventDefault=function () {
            if (srcEvent.preventDefault){
                srcEvent.preventDefault();
            } else {
                srcEvent.returnValue = false;
            }
        };
        res.stopPropagation=function(){
            if (srcEvent.stopPropagation){
                srcEvent.stopPropagation();
            } else {
                srcEvent.cancelBubble = true;
            }
        }
        res.srcEvent=srcEvent;
        return srcEvent;
    }

    // 给一个dom绑定一个针对event事件的响应，响应函数为listener
    function _addEvent(element, event, listener) {
        var handlers = element.handlers || (element.handlers={});
        var callbacks = handlers[event] || (handlers[event]=[]);
        if(isFunction(element.addEventListener)){
            callbacks.push(listener);
            element.addEventListener(event, function (e) {
                e=_extendEvent(e);
                listener.call(this, e);
            });
        }else if(isFunction(element.attachEvent)){
            callbacks.push(listener);
            element.attachEvent("on"+event, function (e) {
                e=_extendEvent(e);
                listener.call(this, e);
            });
        }else {
            callbacks.push(listener);
            element["on"+event]=function (e) {
                e=_extendEvent(e);
                for(var i=0; i<callbacks.length; i++){
                    callbacks[i].call(this, e);
                }
            };
        }
    }

    // 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
    function _removeEvent(element, event, listener) {
        var handlers,   
            callbacks;
        if(!(handlers = element.handlers) || !(callbacks = handlers[event])) return;

        if(isFunction(element.removeEventListener)){
            if(listener){
                element.removeEventListener(event, listener);
                var index=-1,i;
                for(i=0; i<callbacks.length; i++){
                    if(callbacks[i] === listener){
                        index=i;
                        break;
                    }
                }
                index !== -1 && callbacks.splice(index, 1);
            }else{
                var i;
                for(i=0; i<callbacks.length; i++){
                    element.removeEventListener(event, callbacks[i]);
                }
                handlers[event]=null;
            }
        }else if(isFunction(element.detachEvent)){
            if(listener){
                element.detachEvent("on"+event, listener);
                var index=-1,i;
                for(i=0; i<callbacks.length; i++){
                    if(callbacks[i] === listener){
                        index=i;
                        break;
                    }
                }
                index !== -1 && callbacks.splice(index, 1);
            }else{
                var i;
                for(i=0; i<callbacks.length; i++){
                    element.detachEvent("on"+event, callbacks[i]);
                }
                handlers[event]=null;
            }
        }else {
            if(listener){
                var index=-1,i;
                for(i=0; i<callbacks.length; i++){
                    if(callbacks[i] === listener){
                        index=i;
                        break;
                    }
                }
                index !== -1 && callbacks.splice(index, 1);
                element["on"+event]=function (e) {
                    e=e||window.event;
                    for(var i=0; i<callbacks.length; i++){
                        callbacks[i].call(this, e);
                    }
                };
            }else{
                element["on"+event]=null;
                handlers[event]=null;
            }
        }
    }

    // 判断一个选择器是什么类别
    function _getSelectorType (selector) {
        var res={
            idSelector:0,
            classSelector:0,
            attrSelector:0,
            tagSelector:0
        };
        trim(selector);
        if(selector[0]==="#"){
            res.idSelector=1;
        }else if(selector[0]==="."){
            res.classSelector=1;
        }else if(selector[0]==="["){
            res.attrSelector=1;
        }else{
            res.tagSelector=1;
        }
        return res;
    }

    // 事件委托，需完善
    function _delegateEvent(element, tag, eventName, listener) {
        element=element||document.body;
        _addEvent(element, eventName, function (e) {
            var target=e.target;
            var filters=tag.split(" ");//要考虑多个选择器时怎么办
            for(var i=filters.length-1;i>=0;i--){
                var temp=filters[i].replace(/[#\.\[\]]/g,"");
                var selectorType=_getSelectorType(filters[i]);
                if(selectorType.tagSelector===1){
                    if(target.nodeName.toLowerCase()!==temp.toLowerCase()){
                        return;
                    }
                    listener.call(target,e);
                }else if(selectorType.idSelector===1){
                    if(target.getAttribute("id")!==temp){
                        return;
                    }
                    listener.call(target,e);
                }else if(selectorType.classSelector===1){
                    if(!hasClass(target, temp)){
                        return;
                    }
                    // if(target.getAttribute("className")!==temp){
                    //     return;
                    // }
                    listener.call(target,e);
                }else if(selectorType.attrSelector===1){
                    temp=temp.split("=");
                    var key=temp[0],
                        val=temp.length>1?temp[1]:"";
                    if(val&&val===target.getAttribute(key)){
                        listener.call(target,e);
                    }else if(!val&&target.getAttribute(key)){
                        listener.call(target,e);
                    }
                    return;
                }
            }
        })
    }


    // 静态方法
    // ==================================================
    // 判断arr是否为一个数组，返回一个bool值
    function isArray(arr) {
        isArray = function() {
            if (typeof Array.isArray === "function") {
                return Array.isArray; // ECMA5自带
            } else {
                return function(arr) {
                    // Object.prototype.toString的行为：首先，取得对象的一个内部属性[[Class]]
                    return Object.prototype.toString.call(arr) === "[object Array]"; // 不同的文档的数组是不一样的，直接用typeof无法识别这个区别
                }
            }
        }();
        return isArray(arr);
    }
    $.isArray=isArray;

    // 判断arr是否为一个数组，返回一个bool值
    function isString(arr) {
        return (typeof fn).toLowerCase() === "string";
    }
    $.isString=isString;

    // 判断fn是否为一个函数，返回一个bool值
    function isFunction(fn) {
        return (typeof fn).toLowerCase() === "function";
    }
    $.isFunction=isFunction;

    // 判断fn是否为一个Object，返回一个bool值
    function isObject(obj) {
        return (typeof obj).toLowerCase() === "object";
    }
    $.isObject=isObject;

    // 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
    function cloneObject(src) {
        if (typeof src === "undefined") return;
        if (isArray(src)) {
            var res = [];
            for (var i = 0, len = src.length; i < len; i++) {
                res[i] = cloneObject(src[i]);
            };
            return res;
        } else if (isObject(src)) {
            var res={};
            if(src instanceof SObj){// 不能用来克隆SObj对象，直接返回引用，因为里面保存的是dom对象！？？
                res=src;
            }else{
                for (var prop in src) { // 也会遍历原型上的属性和方法
                    if (src.hasOwnProperty(prop)) {
                        res[prop] = cloneObject(src[prop]);
                    }
                }
            }
            return res;
        } else {
            return src;
        }
    }
    $.cloneObject=cloneObject;

    // 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
    function uniqArray(arr) {
        //temp使用对象，1.防止arr中的某些项的值过大  2.如果是字符串的不能用字符串来当索引
        var temp = {},
            res = [];
        for (var i = 0; i < arr.length; i++) {
            var val = arr[i];
            if(!val){
                continue;
            }
            if (typeof val === "string") {
                temp[val] = "1";
            } else if (typeof val === "number") {
                temp[val] = 1;
            }
        }
        for (var prop in temp) {
            if (typeof temp[prop] === "string") {
                res.push(prop);
            } else if (typeof temp[prop] === "number") {
                res.push(parseInt(prop));
            }
        }
        return res;
    }
    $.uniqArray=uniqArray;

    // 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串。先暂时不要简单的用一句正则表达式来实现
    function trim(str) {
        var isSpaceChar = function (achar) {
            // 空白符：\f,\n,\r,\t,\v," "
            var reqArr=[' ','\f','\n','\r','\t','\v'];
            for (var i = 0; i < reqArr.length; i++) {
                if(achar===reqArr[i]){
                    return true;
                }
            }
            return false;
        };

        var res = str,
            index = 0;
        for (var i = 0; i < str.length; i++) {
            if (!isSpaceChar(str[i])) {
                index = i;
                break;
            }
        }
        res = res.substring(index, res.length);
        index = res.length;
        for (var i = res.length - 1; i >= 0; i--) {
            if (!isSpaceChar(res[i])) {
                index = i + 1;
                break;
            }
        }
        res = res.substring(0, index);
        return res;
    }
    $.trim=trim;

    // 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
    function each(arr, fn) {
        for(var i=0; i<arr.length; i++){
            fn(arr[i],i);
        }
    }
    $.each=each;

    // 获取一个对象里面第一层元素的数量，返回一个整数
    function getObjectLength(obj) {
        var total=0;
        for(var prop in obj){
            if(obj.hasOwnProperty(prop)){
                total++;
            }
        }
        return total;
    }
    $.getObjectLength=getObjectLength;

    // 判断是否为邮箱地址
    function isEmail(emailStr) {
        var regex=new RegExp(re.email);
        return regex.test(emailStr);
    }
    $.isEmail=isEmail;

    // 判断是否为手机号
    function isMobilePhone(phone) {
        var regex=new RegExp(re.mobile);
        return regex.test(phone);
    }
    $.isMobilePhone=isMobilePhone;

    // 为dom增加一个样式名为newClassName的新样式
    function addClass(element, newClassName) {
        if(element.classList){
            element.classList.add(newClassName);
        }else{
            var oldClassName=element.className;
            var regex=new RegExp("\\b"+newClassName+"\\b","g");
            if(!regex.test(oldClassName)){
                element.className=oldClassName+" "+newClassName;
            }
        }
    }
    $.addClass=addClass;

    // 有，添加；没有删除
    function toggleClass(element, testClassName){
        if(hasClass(element, testClassName)){
            removeClass(element, testClassName);
        }else{
            addClass(element, testClassName);
        }
    }
    $.toggleClass=toggleClass;

    // 检测是否存在样式
    function hasClass(element, testClassName) {
        if(element.classList){
            return element.classList.contains(testClassName);
        }else{
            var oldClassName=element.className;
            var regex=new RegExp("\\b"+testClassName+"\\b","g");
            return regex.test(oldClassName);
        }
    }
    $.hasClass=hasClass;

    // 移除dom中的样式oldClassName
    function removeClass(element, delClassName) {
        if(element.classList){
            element.classList.remove(delClassName);
        }else{
            var oldClassName=element.className;
            var regex=new RegExp("\\b"+delClassName+"\\b\\s*","g");
            if(regex.test(oldClassName)){
                element.className=oldClassName.replace(regex,"");;
            }
        }
    }
    $.removeClass=removeClass;

    // 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
    function isSiblingNode(element, siblingNode) {
        var parNode1=element.parentNode,
            parNode2=siblingNode.parentNode;
        return parNode2===parNode1;
    }
    $.isSiblingNode=isSiblingNode;

    // 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
    function getPosition(element) {
        var res={x:0,y:0};
        var temp=element;
        while(temp.offsetParent !== null && temp.offsetParent!==document.body){
            res.x+=temp.offsetLeft;
            res.y+=temp.offsetTop;
            temp=temp.offsetParent;
        }
        res.x+=temp.offsetLeft;
        res.y+=temp.offsetTop;
        return res;
    }
    $.getPosition=getPosition;

    // 获取当前元素的下一个兄弟元素
    function getNextSiblingElement (curDom) {
        if(curDom.nextElementSibling){
            return curDom.nextElementSibling;
        }else{
            var res=curDom.nextSibling;
            while(res!==null && res.nodeType!==1){
                res=res.nextSibling;
            }
            return res;
        }
    }
    $.getNextSiblingElement=getNextSiblingElement;

    // 设置cookie
    function setCookie(cookieName, cookieValue, expiredays) {
        var res="";
        if(!cookieName||!cookieValue) return;
        res+=encodeURIComponent(cookieName)+encodeURIComponent(cookieValue);
        if(expiredays instanceof Date){
            res+="; expires="+expiredays.toGMTString();
        }
        doc.cookie=res;
    }
    $.setCookie=setCookie;

    // 获取cookie值
    function getCookie(cookieName) {
        var cookie=doc.cookie;
        cookieName=encodeURIComponent(cookieName);
        var start=cookie.indexOf(cookieName),
            val=null;
        if(start>-1){
            var end=cookie.indexOf(";",start);
            if(end===-1){
                end=cookie.length;
            }
            val=decodeURIComponent(cookie.substring(start+cookieName.length+1,end));
        }
        return val;
    }
    $.getCookie=getCookie;

    // 扩展对象
    function extend (oldObj) {
        var args=slice.call(arguments, 0);
        if(args.length <= 1) return oldObj;

        var temp;
        for(var i=1; i<args.length; i++){
            temp=cloneObject(args[i]);
            for(var prop in temp){
                if(temp.hasOwnProperty(prop)){
                    oldObj[prop]=temp[prop];
                }
            }
        }

        return oldObj;
    }
    $.extend=extend;


    // 平台检测, 参考《javascript高级程序设计》
    // ==================================================
    $.os=function () {
        var o={
            phone: 0,
            pc:0,

            ie: 0,
            chrome: 0,
            safari: 0,
            firefox: 0,
            opera: 0,

            // 浏览器的版本
            ver: 0
        };
        var s={};

        var ua=navigator.userAgent.toLowerCase();
        var pf=navigator.platform.toLowerCase();

        // 检测移动设备平台
        s.iphone=ua.indexOf("iphone") > -1;
        s.ipad=ua.index("iphone") > -1;
        if(/android (\d+\.\d+)/.test(ua)) {
            s.android=1;
            s.ver=parseFloat(RegExp.$1);
        }
        // 检测ios版本
        if(s.iphone || s.ipad){
            if(/cpu (?:iphone )?os (\d+_\d+)/.test(ua)){
                s.ver=parseFloat(RegExp.$1.replace("_", "."));
            }else{
                s.ver=2;
            }
        }

        // 检测浏览器
        if(window.opera){
            o.opera=1;
            o.ver=window.opera.version();
        }else if(/applewebkit\s(\S+)/.test(ua)) {
            if(/chrome\/(\S+)/.test(ua)){
                o.chrome=1;
                o.ver=RegExp["$1"];
            }else if(/version\/(\S+)/.test(ua)) {
                o.safari=1;
                o.ver=RegExp["$1"];
            }
        }else if(/firefox\/(\S+)/.test(ua)) {
            o.firefox=1;
            o.ver=RegExp["$1"];
        }else if(/msie ([^;]+)/.test(ua)) {
            o.ie=1;
            o.ver=RegExp["$1"];
        }

        var res = {
            sys: s,
            browser: o
        };

        if(/mobile/.test(ua)){
            res.phone=1;
        }else{
            res.pc=1;
        }

        return res;
    }();


    // ajax 模块
    // ==================================================
    /*
    *  参数：
    *  type: get/post
    *  url: 发送请求的地址，默认当前的地址
    *  data: 发送到服务器的数据；如果是GET请求，它会自动被作为参数拼接到url上。非String对象将通过 $.param 得到序列化字符串
    *  dataType (默认： text)：预期服务器返回的数据类型(“json”, “text”)
    *  global (默认：true): 请求将触发全局Ajax事件处理程序，设置为 false 将不会触发全局 Ajax 事件
    *  username & password (默认： none): HTTP基本身份验证凭据
    *  async (默认：true): 默认设置下，所有请求均为异步。如果需发送同步请求，请将此设置为 false。
    *  beforeSend(xhr, settings)：请求发出前调用，它接收xhr对象和settings作为参数对象。如果它返回 false ，请求将被取消。
    *  success(data, status, xhr)：请求成功之后调用。传入返回后的数据，以及包含成功代码的字符串。
    *  error(xhr, errorType, error)：请求出错时调用。 (超时，解析错误，或者状态码不在HTTP 2xx)。
    *  complete(xhr, status)：请求完成时调用，无论请求失败或成功。
    *
    *  事件：
    *  ajaxBeforeSend (data: xhr, options)：再发送请求前，可以被取消。
    */
    (function ($) {
        var nop=function(){};
        var defOpts={
            type:"get",
            url:"./",
            async: true,
            data: null,
            global:true,
            dataType: "text",

            username: null,
            password: null,

            beforeSend: nop,
            success: nop,
            error: nop,
            complete: nop
        };

        var getXHR=function () {
            if(window.XMLHttpRequest){
                 return function () {
                     return new XMLHttpRequest();
                 }
            }else if(window.ActiveXObject){
                return function () {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
            }else{
                return function () {
                    alert("你的浏览器不支持ajax，请升级浏览器");
                    return null;
                }
            }
        }();

        var addUrlParam=function (url, paramStr) {
            url += (url.indexOf("?") == -1) ? "?" : "&";
            url += paramStr;
            return url;
        };

        // 需要在传入时就做好编码
        var make_base_auth= function (user, password) {
          var tok = user + ':' + pass;
          // var hash = Base64.encode(tok);
          return "Basic " + hash;
        };

        // 是否是类型中的一种
        var isRightDataType = function (testVal) {
            testVal=testVal.toLowerCase();
            if(testVal === "json" || testVal === "text") {
                return true;
            }
            return false;
        };

        // 用于：使用get和post时获取正确参数
        var getOptions=function (data, callback, dataType) {
            if($.isFunction(data)) {
                callback=data;
                data=null;
            }
            var flag=false;
            if((falg = dataType !== undefined) && !isRightDataType(dataType)) {
                throw new Error("dataType不是正确的类型");
            }
            var options={
                type: "post",
                url: url,
                data: data,
                callback: callback,
                dataType: flag ? dataType : "text",
                success:callback
            };

            return options;
        };

        // 只支持序列化一层对象
        $.param=function(data){
            if($.isString(data)){
                return encodeURIComponent(data);
            }
            var res=[],
                temp;
            for(var prop in data){
                if(data.hasOwnProperty(prop)) {
                    temp = encodeURIComponent(prop)+"="+encodeURIComponent(data[prop]);
                    res.push(temp);
                }
            }
            return res.join("&");
        };

        $.ajax=function (options) {
            var xhr;
            if(!(xhr=getXHR)) return;
            var resOpts=$.extend({}, defOpts, options);

            // 触发请求发送前的ajaxBeforeSend的全局事件
            if(resOpts.global) {
                var xhrEvent=$.Event("ajaxBeforeSend");
                $(document).trigger(xhrEvent, [xhr, options]);
            }

            // 触发请求发送前的beforeSend回调函数
            if(resOpts.beforeSend(xhr) === false){
                // xhr.abort();
                return;
            }

            var uploadDataStr=(resOpts.data && $.param(resOpts.data)) || "";

            // 绑定回调函数
            xhr.onreadystatechange=function () {
                if(xhr.readyState === 4){
                    if((xhr.status >=200 && xhr.status < 300) || xhr.status===304){
                        if(resOpts.dataType.toLowerCase() === "json") {
                            try {
                                var jsonRes=JSON.parse(xhr.responseText);
                                resOpts.success(jsonRes);
                            }catch(err) {
                                resOpts.error(xhr, err);
                            }
                        }else {
                            resOpts.success(xhr.responseText);
                        }
                    }else{
                        resOpts.error(xhr, {
                            message: "状态码错误或其他原因"
                        });
                    }
                    resOpts.complete(xhr);
                }
            };

            var _type="get";
            if(resOpts.type.toLowerCase() === "get") {
                _type="get";
                xhr.open(addUrlParam(resOpts.url, uploadDataStr), resOpts.async);
            }else if(resOpts.type.toLowerCase() === "post") {
                _type="post";
                xhr.open("post",url);
                // xhr.setRequestHeader的调用要在open之后send之前
                xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            }

            // HTTP Basic Authentication认证
            if(resOpts.username && resOpts.password) {
                xhr.setRequestHeader("Authorization", make_base_auth(resOpts.username, resOpts.password));
            }

            xhr.send(_type === "get" ? null : uploadDataStr);
        };

        $.get=function(url, data, callback, dataType){
            var res=getOptions(data, callback, dataType);
            res.type="get";
            $.ajax(options);
        };

        $.post=function(url, data, callback, dataType){
            var res=getOptions(data, callback, dataType);
            res.type="post";
            $.ajax(options);
        };

        // r如果存在选择器，则区集合中的第一个元素添加到当前元素中
        $.fn.load=function (url, selector) {
            var that=this;
            var callback=function (data) {
                if(!selector) {
                    that.html(data);
                }else {
                    var temp=$(data).find(selector);
                    temp.length>0 && this.html("").append(temp.get(0));
                }
            };
            $.get(url,callback);
        };
    })(util);


    // 动画
    // ==================================================
    $.animate=function () {
        
    }


    // 创建Dom事件
    // ==================================================
    $.Event=function (type, options) {
        var ne;
        isObject(options) || (options={});
        if(isArray(doc.createEvent)) {
            ne=doc.createEvent("Events");
        }else if(isArray(doc.createEventObject)) {
            ne=doc.createEventObject();
        }
        ne.type=type;
        ne.bubbles=true;
        ne.cancelable=true;
        extend(ne, options);
        return ne;
    };


})();