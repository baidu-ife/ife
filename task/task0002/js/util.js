/**
 * Created by Administrator on 2015/4/20.
 */

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return typeof arr === "object"
        && Object.prototype.toString.call(arr) === "[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof fn === "function"
        && Object.prototype.toString.call(fn) === "[object Function]";
}

// 判断是否为日期对象
function isDate(date) {
    return typeof date === 'object'
        && Object.prototype.toString.call(date) === "[object Date]";
}


// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(srcObj) {
    var tarObj;
    switch(typeof srcObj) {
        case 'undefined': break;
        case 'string': tarObj = srcObj + ''; break;
        case 'number': tarObj = srcObj - 0; break;
        case 'boolean': tarObj = srcObj; break;
        case 'object':
            if(srcObj === null) {
                tarObj = null;
            } else {
                if(srcObj instanceof Array) {
                    tarObj = [];
                    for(var i = 0; len = srcObj.length, i < len; i++) {
                        tarObj.push(cloneObject(srcObj[i]));
                    }
                } else {
                    tarObj = {};
                    for(var p in srcObj) {
                        if(typeof srcObj[p] === 'function' || srcObj[p] instanceof RegExp) continue;
                        tarObj[p] = cloneObject(srcObj[p]);
                    }
                }
            }
            break;
        default :
            tarObj = srcObj; break;
    }
    return tarObj;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    if(!arr instanceof Array) throw TypeError();
    var tarArr = [];
    for(var i=0; len = arr.length, i < len; i++) {
        var flag = false;
        for(var j = 0; lenj = tarArr.length, j < lenj; j++) {
           if(arr[i] ==='' || arr[i] === tarArr[j]) flag = true;  //去除数组中的空值，并且去重
        }
        if(flag == false) {
            tarArr.push(arr[i]);
        }
    }
    return tarArr;
}


// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现

function trim(str) {
    var startl;
    var endr;
    for(var i = 0; len = str.length, i < len; i++) {
        if(str[i] != ' ') {
            startl = i;   //存储第一个不是空格的位置
            break;
        }
    }
    for(var ir = str.length-1; ir>0; ir--) {
        if(str[ir] != ' ')  {
            endr = ir;    //存储最后一个不是空格的位置
            break;
        }
    }
    return str.substring(startl, endr+1);  //截取字符串
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(var i = 0; len = arr.length, i < len; i++) {
        fn(i,arr[i]);
    }
}
/*
function each2(arr) {
    for(var i = 0; len = arr.length, i < len; i++) {
        (function(index, arri) {
            alert('index'+index);
            alert(arri);
        }(i, arr[i]))
    }
}
*/

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var len=0;
    for(var k in obj) {
        len++
    }
    return len;
}

// 判断是否为邮箱地址
function isEmail(emailSrc) {
    var pattern = /^\w+@\w+\.[A-Za-z]{2,3}$/i;
    return pattern.test(emailSrc);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var pattern = /^\d{11}$/;
    return pattern.test(phone);
}




// 3.DOM

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(!element) return;
    var oldClassName = element.className;
    if(!newClassName == oldClassName || !oldClassName.match(new RegExp("(\\s|^)" + newClassName + "(\\s|$)"))) {
        element.className = oldClassName + ' ' + newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var elementClassName = element.className;
    element.className = elementClassName.replace(new RegExp("(\\s|^)" + oldClassName + "(\\s|$)"), '');

}
// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值

function isSiblingNode(element, siblingNode) {
    var ele1 = element.parentNode;
    var ele2 = siblingNode.parentNode;
    if(ele1 == ele2) {
        return true;
    } else {
        return false;
    }
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var x = 0;
    var y = 0;
    while(element != null) {    //原因： 对于已定位元素的后代元素和一些其他元素， 返回的是相对于祖先元素的位置
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }
    return {x: x, y: y};
}


// 实现一个简单的Query
function $(selector) {
    if(selector == null) throw TypeError();
    if(typeof selector == 'string') {
        var selectors =selector.split(' ');   //将传入的多个选择器分割成数组
        if(selectors.length == 1) {
            return sele(document, selector);
        } else {
            var selen = selectors.length;
            var child = sele(document, selectors[0]);  //从document中选取最父级元素
            for(var j = 1; j<selen; j++) {         // 逐一遍历各个选择器
                child = sele(child, selectors[j]); //简单选取元素
            }
            return child;
        }

    }
}
function sele(doc, selector) {
    var prefix = selector.charAt(0);
    switch(prefix) {
        case '#':
            //console.log(doc +' ' + selector);
            return document.getElementById(selector.substring(1)); //id特殊
        case '.':
            return doc.getElementsByClassName(selector.substring(1))[0];
        case '[':
            var pattern = /\[(\w+(-\w+)+)=(\w+)]/;
            var pat = selector.match(pattern);
            //alert(pat[1]+'   '+pat[pat.length-1]);
            var tags = doc.getElementsByTagName('*');
            if(pat) {
                for(var i = 0, len = tags.length; i < len; i++) {
                    if(tags[i].getAttribute(pat[1]) == pat[pat.length-1]) {
                        return tags[i];
                    }
                }
            }
            else {
                for(var i = 0, len = tags.length; i < len; i++) {
                    if(typeof (tags[i].getAttribute(selector.substring(1, selector.length-1))) == 'string') {
                        return tags[i];
                    }
                }
            }

            break;
        default :
            return document.getElementsByTagName(selector)[0];
    }
}





// 给一个element绑定一个针对event事件的响应，响应函数为listener

function addEvent(element, event, listener) {
    if(element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if(element.attachEvent) {
        element.attachEvent('on'+ event, listener);
    } else {
        element['on' + event] = listener;
    }
}
// 移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    if(element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    } else if(element.detachEvent) {
        element.detachEvent('on'+ event, listener);
    } else {
        element['on' + event] = null;
    }
}

// 实现对click事件的绑定

function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    if(element.keyCode == 13) {
        addEvent(element, 'keyDown', listener);
    }
}

//事件代理
function delegateEvent(element, tag, eventName, listener) {
    addEvent($(element), eventName, function(event) {
        var result = event.target || event.srcElement;
        if(result.tagName.toLowerCase() === tag.toLowerCase()) {
            listener(event);
        }
    });
}


//函数和$做一下结合

$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;
$.delegate = delegateEvent;


// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    return navigator.userAgent.indexOf("Trident") > -1;
}




function stopDefault(e) {
    if ( e && e.preventDefault )
        e.preventDefault();
    else
        window.event.returnValue = false;
    return false;
}






