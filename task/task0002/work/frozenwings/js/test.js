function doLog(str){
    if(typeof console !== 'undefined'){
        console.log(str);
    }
}

// 测试用例：
doLog('>>>Test [cloneObject]:');
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    },
    c:false
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

doLog(abObj.a);             // 2
doLog(abObj.b.b1[0]);       // "Hello"

doLog(tarObj.a);          // 1
doLog(tarObj.b.b1[0]);    // "hello"

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);

doLog('>>>Test [uniqArray]:');
doLog(b); // [1, 3, 5, 7]

doLog('>>>Test [trim]:');
// 使用示例
var str = '   hi!    ';
str = trim(str);
doLog(str); // 'hi!'

// 使用示例
doLog('>>>Test [each]:');
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    doLog(item);
}
each(arr, output);  // java, c, php, html

doLog('>>>Test [indexOf]:');
doLog(indexOf([1,2,3,4,5,6],5));
doLog(indexOf([1,2,3,4,5,6],5,4));
doLog(indexOf([1,2,3,4,5,6],7));

doLog('>>>Test [removeFromArray]:');
var _removearr = [1,2,3,4,5,6];
doLog(removeFromArray(_removearr,[2,3,4,7]));
doLog(_removearr);

doLog('>>>Test [filterArray]:');
var _filterarr = [1,2,'',4,5,' ','  ',6,7];
doLog(filterArray(_filterarr,function(item){
  return +item === 0 && item !== '0';
}));
doLog(_filterarr);

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
doLog('>>>Test [getObjectLength]:');
doLog(getObjectLength(obj)); // 3

doLog('>>>Test [isEmail]:');
doLog((isEmail('frozenwings@yeah.net')));

doLog('>>>Test [isMobilePhone]:');
doLog((isMobilePhone('15812345678')));
doLog((isMobilePhone('158123456789')));
doLog((isMobilePhone('58123456789')));
doLog((isMobilePhone('1581234567s')));
doLog((isMobilePhone('1581234567')));

doLog('>>>Test [mini Query]:');

// 可以通过id获取DOM对象，通过#标示，例如
doLog($("#result")); // 返回id为result的DOM对象

// 可以通过tagName获取DOM对象，例如
doLog($("input")); // 返回第一个<input>对象

// 可以通过样式名称获取DOM对象，例如
doLog($(".c2")); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
doLog($("[data-log]")); // 返回第一个包含属性data-log的对象

doLog($("[data-time=2015]")); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
doLog($(".main .box")); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

//测试[addEnterEvent]
addEnterEvent($('#number1'),function(e){
    alert('enter!');
});

//测试
function clickHandle(e){
    var target = e.target || e.srcElement;
    alert('click li : ' + target.innerHTML);
}
$.delegate($("#list"), "li", "click", clickHandle);

//alert(isIE());

//setCookie('myName','frozenwings',new Date('4/20/2016'));
//doLog(document.cookie);

//doLog(getCookie('myName'));
//alert(getCookie('myName'));
//deleteCookie('myName');

// ajax使用示例：
doLog('>>>Test [ajax]:');
ajax(
    'http://127.0.0.1:8000/getNames', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            doLog(responseText);
            //alert('ajax response:' + responseText);
        }
    }
);

