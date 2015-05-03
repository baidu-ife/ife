/**
 * Created by Gaohaoyang on 2015.4.30
 */
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return typeof arr === "object" && Object.prototype.toString.call(arr) === "[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof fn === "function";
}

//--------------------------------------------------
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    var o; //result
    if (Object.prototype.toString.call(src) === "[object Array]") {
        o = []; //判断是否是数组，并赋初始值
    } else {
        o = {};
    }
    for (var i in src) { //遍历这个对象
        if (src.hasOwnProperty(i)) { //排出继承属性
            if (typeof src[i] === "object") {
                o[i] = cloneObject(src[i]); //递归赋值
            } else {
                o[i] = src[i]; //直接赋值
            }
        }
    }
    return o;
}

//--------------------------------------------------------------
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var newArr = []; //创建空数组
    for (var i in arr) { //遍历旧数组
        if (newArr.indexOf(arr[i]) == -1) { //如果新数组中不存在当前元素
            newArr.push(arr[i]); //新数组中加入当前元素
        }
    }
    return newArr;
}


// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var i;
    var j;
    for (i = 0; i < str.length; i++) { //从头遍历字符串
        if (str.charAt(i) != " " && str.charAt(i) != "\t") { //当不为空的时候
            break; //跳出循环
        }
    }
    for (j = str.length - 1; j >= 0; j--) {
        if (str.charAt(j) != " " && str.charAt(j) != "\t") { //当不为空的时候
            break; //跳出循环
        }
    }
    return str.slice(i, j + 1); //返回子字符串
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
    //匹配开头和结尾的空白字符，并全局匹配
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i in arr) {
        fn(arr[i], i);
    }
}



// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    return Object.keys(obj).length;
}



//---------------------------------------------------------
// 判断是否为邮箱地址
function isEmail(emailStr) {
    var pattern = /^(\w+\.)*\w+@\w+(\.\w+)+$/;
    return pattern.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var pattern = /^(\+\d{1,4})?\d{7,11}$/;
    return pattern.test(phone);
}



//-----------------------------------------------------------
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var oldClassName = element.className; //获取旧的样式类
    element.className = oldClassName === "" ? newClassName : oldClassName + " " + newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var originClassName = element.className; //获取原先的样式类
    var pattern = new RegExp("\\b" + oldClassName + "\\b"); //使用构造函数构造动态的正则表达式
    element.className = originClassName.replace(pattern, '').trim();
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var pos = {};
    pos.x = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    pos.y = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    return pos;
}



//---------------------------------------------------------
// 实现一个简单的Query
function $(selector) {

    if (!selector) {
        return null;
    }

    if (selector == document) {
        return document;
    }

    selector = selector.trim();
    if (selector.indexOf(" ") !== -1) { //若存在空格
        var selectorArr = selector.split(/\s+/); //拆成数组
        //多个选择器有点难到我了，看了一些资料觉得思路应该如下：
        //1.如果存在#，直接从#开始向后查
        //2.如果存在tag直接找到所有的tag然后向后查
        //3.样式类，属性，从后向前查，得到它所有的父节点名称，去筛选匹配
        
        
    } else { //只有一个，直接查询
        var signal = selector[0]; //
        var allElements = null;
        var i = null;
        var content = selector.substr(1);
        var currAttr = null;
        switch (signal) {
            case "#":
                return document.getElementById(content);
            case ".":
                allElements = document.getElementsByTagName("*");
                for (i = 0; i < allElements.length; i++) {
                    currAttr = allElements[i].getAttribute("class");
                    if (currAttr !== null && currAttr.search(content) != -1) {
                        return allElements[i];
                    }
                }
                break;
            case "[": //属性选择
                if (content.search("=") == -1) { //只有属性，没有值
                    allElements = document.getElementsByTagName("*");
                    for (i = 0; i < allElements.length; i++) {
                        if (allElements[i].getAttribute(selector.slice(1, -1)) !== null) {
                            return allElements[i];
                        }
                    }
                } else { //既有属性，又有值
                    allElements = document.getElementsByTagName("*");
                    var pattern = /\[(\w+)\s*\=\s*(\w+)\]/;
                    var result = selector.match(pattern);
                    var key = result[1];
                    var value = result[2];
                    for (i = 0; i < allElements.length; i++) {
                        if (allElements[i].getAttribute(key) == value) {
                            return allElements[i];
                        }
                    }
                }
                break;
            default: //tag
                console.log("in");
                return document.getElementsByTagName(selector)[0];
        }
    }
}
console.log($("#div1").getElementsByTagName('div'));

// 可以通过id获取DOM对象，通过#标示，例如
// 返回id为adom的DOM对象
//console.log($("#div1").getAttribute("class").search("class2")!=-1);
// console.log($(".gao"));
// $(".class1").innerHTML = "testttttclasssssssssss";

// 可以通过tagName获取DOM对象，例如
// $("a"); // 返回第一个<a>对象

// // 可以通过样式名称获取DOM对象，例如
// $(".classa"); // 返回第一个样式定义包含classa的对象

// // 可以通过attribute匹配获取DOM对象，例如
//$("[data-log]"); // 返回第一个包含属性data-log的对象

// $("[date]").innerHTML = "date1111";
// $("[person=gaohaoyang]").innerHTML = "gaohaoyang";
// $("[gaohaoyang=gaohaoyang]").innerHTML = "h2 gaohaoyang";

// $("[person=gaohaoyang]").innerHTML = "attr";
// var pattern = /\[(\w+)\=(\w+)\]/;
// var result = "[person=gaohaoyang]".match(pattern);
// console.log("key---->" + result[1]);
// console.log("value--->" + result[2]);

// $("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

