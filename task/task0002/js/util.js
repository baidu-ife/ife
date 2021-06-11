//1
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    if (Object.prototype.toString.call(arr) === "[object Array]") {
        return true;
    } else{
        return false;
    };
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    if (Object.prototype.toString.call(fn)==='[object Function]') {
        return true;
    } else{
        return false;
    };
}
//2
//使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    if (!src||typeof src!=='object') {
        return src;
    }else{
        var result={};
        for (var i = 0; i < src.length; i++) {
            result[i]=src[i]
        }
    }
    return result;
}
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var result=[];
    var hash={};
    for (var i = 0; i < arr.length; i++) {
        if (!hash[arr[i]]) {
            hash[arr[i]]=true;
            result.push(arr[i]);
        } 
    }
   return result;
}
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
function simpleTrim(str) {
    var result = [];
    for (var i = 0; i < str.length; i++) {
        if (str[i].indexOf(" ")===-1) {
            result.push(str[i]);
        }
    }
    return result.join("")
}
//正则表达式实现的trim
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g,"");    

}
//实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0;i < arr.length;i++) {
        fn(arr[i], i);
    }
}
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {}
//判断是否为邮箱地址
function isEmail(emailStr) {
    var reg = /^[\da-z]+@[a-z]+.[a-z]+$/i;
    return emailStr.search(reg) !== -1;
}
//判断是否为手机号
function isMobilePhone(phone) {
    var reg = /^\d{11}$/;
    return phone.search(reg) !== -1;
}
//3
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (element.className === null || element.className === "") {
        element.className = newClassName;
    }
    else {
        if (element.className.indexOf(newClassName) === -1) {
            element.className += " " + newClassName;
        }
    }
}
////移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    var oldClass = element.className.split(/\s+|\t+/);
    var newClass = [];
    for (var i = 0; i < oldClass.length; i++) {
        if (oldClass[i] !== oldClassName) {
            newClass.push(oldClass[i]);
        }
    }
    element.className = newClass.join(" ");
}
// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}
// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
     return {
        x: element.getBoundingClientRect().left,
        y: element.getBoundingClientRect().top,
    };
}
// 实现一个简单的Query
function $(selector){
    var ele,Name;
    switch (selector.charAt(0)) {
        case "#":
            ele = selector.substring(1);
            Name = document.getElementById(ele);
            break;
        case ".":
            ele = selector.substring(1);
            Name=document.getElementsByClassName(ele);
            
        case "[":
            ele = selector.substring(1,selector.length-1);
            var eles = document.getElementsByTagName("*");
            for(var i=0;i<eles.length;i++) {
                if(ele.indexOf("=") != -1) {
                    var arr = ele.split("=");
                    if(arr[1] == eles[i].getAttribute(arr[0])) {
                        return eles[i];
                    }
                } else {
                    if(eles[i].getAttribute(ele)) {
                        return eles[i];
                    }
                }
            }
            break;
        default:
            Name = document.getElementsByTagName(ele);
            break;
        }
        return Name;
    }
// 4，给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener) {
       element.addEventListener(event, listener, false);
    }else {
        element.attachEvent("on"+event, listener);
    }
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}


// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(event) {
        event = event || window.event;
        if(event.keyCode == 13) {
            addEvent(element, "keydown", listener);
        }
    })
}
