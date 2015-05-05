/**
 * Created by wsk on 15/4/28.
 */
//


function myLog() {
    arg = Array.prototype.slice.call(arguments);
    for (var i = 0; i < arg.length; i++) {
        console.log(arg[i]);
    }
}


console.log("test1-- is Array is Function");
console.log(isArray([1,2,2]));
console.log(isFunction(function a(){}));
//-----------------------------
console.log("test2-- swallow & deep copy");
 var abObj = srcObj;
 var tarObj = cloneObject(srcObj);
 srcObj.a = 2;//swallow copy
 srcObj.b.b1[0] = "Hello";//deep copy

 console.log(abObj.a);
 console.log(abObj.b.b1[0]);

 console.log(tarObj.a);      // 1
 console.log(tarObj.c);    // "hello"*/

//----------------------------

console.log("test3-- make array unique");

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]
//-----------------------------------


// 使用示例
console.log("test4--  trim string");

var str = '  hi!  ';
str = trim(str);
console.log(str); // 'hi!'

//-----------------
//使用例子:
console.log("test5--  Array each");

var arr1 = [1, 2, 3, 4, 5, 6, 7];
each(arr1, function (item, i) {
    if (i != 0) arr1[i - 1] += item
});
console.log("after each add:" + arr1);

//-------------------
// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

//----------------------

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

//------------------------
// 例如：
myLog("test6--  my $");
myLog($("#adom"),$("a"),$(".classa"),$("[data-log]"),$("[data-time=2015]"),$("#adom .classa")); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

function clicklistener(event) {
    alert(this);
    EventUtil.stopPropagation(event);
}
addEvent($("#doma"), "click", clicklistener);
addEvent($("#doma"), clicklistener);
addEnterEvent($(".classa"), clicklistener);
//AFTER seal
$.click("[data-log]", clicklistener);
$.delegate('#list', "li", "click", clicklistener);


//-------------------------------
myLog("test7--  my AJAX");
var getOpt = {
    type: 'get',
    data: {
        name: 'simon',
        password: '123456'
    },
    onsuccess: function (responseText, xhr) {
        console.log(responseText);
    },
    onfail: function(responseText){
        console.log(responseText);
    }
};

var postOpt = {
    type: 'post',
    data: {
        name: 'simon',
        password: '123456'
    },
    onsuccess: function (responseText, xhr) {
        console.log(responseText);
    },
    onfail: function(responseText){
        console.log(responseText);
    }
};

ajax('http://localhost:8888/getJSON', getOpt);
ajax('http://localhost:8888/', postOpt);
