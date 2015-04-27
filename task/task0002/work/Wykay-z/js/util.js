

function isArray(arr) {
    if(Object.prototype.toString.call(arr) === "[object Array]"){
        return true;
    }else { return false;}
}

function isFunction(fn) {
    if(typeof(fn) === "function"){
        return true;
    }else { return false;}
}





// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var cloneObj;
    if(typeof src === "object") {
        if(src === null) {
            cloneObj = null;
        } else {
            if(src instanceof Array){
                cloneObj = src.slice(0);
            }else {
                cloneObj = {};
                for(var i in src){
                    cloneObj[i] = cloneObject(src[i]);
                }
            }
        }
    } else {
        cloneObj = src;
    }
    return cloneObj;
}





// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
        var isEqual = function(obj1, obj2) {
            //两个对象地址相等，必相等
            if(obj1===obj2){
                return true;
            } else {
                return false;
            }
        }
        var temp = arr.slice(0);
        for(var i=0; i<temp.length; i++) {
            for(var j=i+1; j<temp.length; j++){
                if(isEqual(temp[j], temp[i])) {
                    temp.splice(j,1);
                    j--;
                }
            }
        }
        return temp;
    }


// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    var i;
    for(i=0; i<str.length; i++){
        if(str.charAt(i) != " ") break;  
    }
    str = str.substring(i);
    var j;
    for(j=str.length-1; j>=0; j--){
        if(str.charAt(j) != " ") break;
    }
    str = str.substring(0, j+1);
    return str; 
}




// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
    var argNum = fn.length;
    console.log(argNum);
    for(var i=0; i<arr.length; i++) {
        if(argNum == 1) {
            fn(arr[i]);
        }
        if(argNum == 2) {
            fn(i, arr[i]);
        } 
    }
}


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    return Object.keys(obj).length;
}




// 判断是否为邮箱地址
function isEmail(emailStr) {
    var patt = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/);
    return patt.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var patt = new RegExp(/^1[3|4|5|8][0-9]\d{4,8}$/);
    return patt.test(phone);
}







//DOM

// 为element增加一个样式名为newClassName的新样式
function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(element, newClassName) {
    if (!this.hasClass(element, newClassName)) element.className += " "+newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (hasClass(element,oldClassName)) {
        var reg = new RegExp('(\\s|^)'+oldClassName+'(\\s|$)');
        element.className=element.className.replace(reg,' ');
    }

}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if(element.parentNode == siblingNode.parentNode) {
        return true;
    } else { return false;}
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var  yP = element.offsetTop;
    var  xP = element.offsetLeft;
    return {xP, yP};
}
// your implement



// 实现一个简单的Query
function $(selector) {
    //实在不晓得怎么实现
    return document.querySelector(selector);
}





// 给一个element绑定一个针对event事件的响应，响应函数为listener
$.on = function(element, event, listener) {
    if(element.addEventListener){
        element.addEventListener(event,listener,false);
    } else if(element.attachEvent){
        element.attachEvent('on'+event, listener);
    } else {
        element['on'+event] = listener;
    }
}


// 移除element对象对于event事件发生时执行listener的响应，
//当listener为空时，移除所有响应函数(没法实现，只能一个一个remove了)
$.un = function(element, event, listener) {
    
    if(element.removeEventListener){
        element.removeEventListener(event, listener, false);
    } else if(element.detachEvent) {
        element.detachEvent(event, listener);
    } else {
        element['on'+event] = null;
    }
}


// 实现对click事件的绑定
$.click = function(element, listener) {
    $.on(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
$.enter  = function(element, listener) {
    
    $.on(element, 'keypress', function(e){
        console.log(e.keyCode);
        if(e.keyCode == 13){
            //为什么要加（）,用listener测试了老半天都没法执行这个函数。
            listener();
        }
    })
}



// 其实之前就看过很多遍的ajax，但还是没搞明白到底是怎么回事，后端server具体指什么，没学过xml或php也可以实现吗？还有这些xml以及php的文件是放在本地吗？
//只是简单地把W3school的代码复制过来了，不知道该怎么处理options这个参数。
function ajax(url, options) {
    var xmlhttp;
    if(window.XMLHttpRequest){
        //code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        //code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.state==200){
            options;
        }
    }
    xmlhttp.open("GET",url, true);
    xmlhttop.send();
}















