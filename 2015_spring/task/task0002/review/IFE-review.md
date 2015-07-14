### PART 1:
laozhang007: hasClass/addClass/removeClass
SoAanyip: getPosition/delegateEvent(考虑到了兼容，虽然写的有点繁琐)
zhaoyuting123: cloneObject/isMobilePhone


### PART 2: 
很多问题都是大家共有的 

isArray 
使用’instanceof’或者'Array.constructor'判断，在跨iframe的情况下，有不同Array定义。考虑使用Object.prototype.toString方式判断更准确。 

isFunction 
问题同上。另外，在较老的chrome浏览器上，正则表达式(/a/)使用’typeof’判断的结果也是’function’。因此使用toString的方式判断更准确。 

cloneObject 
深度克隆需要要不同类的的数据分别处理。主要以下几个问题： 

1. 对于Object和Array的遍历，可以使用for in，这样可以保证在在Array对象上扩展的属性也可以正确复制。 
2. 对于Date,String,Boolean等引用类型的数据，需要考虑调用构造函数重新构造，直接赋值依然会有引用问题（不是真正的clone引用变量）。 
3. 使用getPrototypeOf有兼容问题。使用的同学请换个实现。 
另外，SoAanyip同学：对于null和undefined的处理：错误的返回成了字符串。 
michaelluang同学：复制Date可以简化为—new Date(+src) 

uniqArray 

1. 不要使用for in遍历数组，会遍历到数组对象扩展出来的属性，这部分数据不必要过滤。 
2. 如果只考虑数组内为字符串和数字的话，可以使用HashMap方式进行字典去重的，但需要考虑作为HashKey相同时（比如：’1’和1），要使用type区分处理。很多同学没有处理。 
3. 数组的indexOf方法不支持IE9以下，因此使用的同学在调用时，需要注意需要考虑先实现保证兼容。 

trim 
1. 使用正则时，可以使用’\s’代替’ \f\n\r\t\v ‘等空白字符、另外要注意chrome下’\s’可以匹配全角空格，但是考虑兼容的话，需要加上’\uFEFF\xA0’，去掉BOM头和全角空格。不需要同时使用’\s’和’\t’。 
2. 遍历去空格时，注意匹配效率和’\t’的匹配，有不少同学只匹配了半角空格一种类型。可以先定义一个空白字符串集合(whitespaces =  ‘\f\n\r\t\v')，然后whitespaces.indexOf(str) !== -1来一次性判断。 zhaoyuting123同学可以参考这个方式判断空字符串。 
3. 正则去空格时，有使用’*’进行匹配的同学，建议使用’+’。可以自己查一下这两者的区别。 

each 
不要使用for in遍历数组。for(;;)时，注意for(var i = 0, len = arr.length; i < len; i++) 和 for(var i = 0; i < arr.length; i++)在执行时的区别。建议使用前者。 

getObjectLength 
在for in的时候，要了解在IE9以下，有枚举bug。a = {toString:1}时，for in不出toString这个key。查找关于propertyIsEnumerable的使用方法，来判断'toString' 'toLocaleString' 'valueOf' 'hasOwnProperty' 'isPrototypeOf' 'propertyIsEnumerable' ‘constructor' 这几个不可枚举(for in)出来的key。 

isMobilePhone 
简单点的，判断11位数字，但完整的话，还要考虑手机位数的组合（会有不存在字段），以及’+86’区号的情况。 


###PARTS 3: 

1. addClass/removeClass 
setAttribute(‘class’, value)这种方式在IE6/7下有不兼容的问题。需要一律使用element.className设置。 
需要判断传入的className是否存在，然后在添加。有人没有判断，有使用indexOf判断（比如’navigator’.indexOf(’navi’) != -1），都是错误的。 
michaelluang同学，不能使用classList移除class。 
liuyifeneve同学，没有自己实现啊。 
zmiaozzz同学：一次性处理完className，在进行赋值。减少浏览器重新计算。 
2. position 
递归的计算元素的offsetTop和offsetLeft, 距离窗口的位置再减去滚动区域的高度。 

###IPARTS 4:  

1. addEvent  
element[‘on’ + eventName]的方式可以不用写了，不支持标准的浏览器几乎没有了。除非你的应用要考虑及特殊的运行环境。 
2. addClickEvent 
部分同学可以考虑使用上面的addEvent封装，不用再写一遍了。 
3. addEnterEvent 
部分同学取event时，未考虑浏览器兼容。（UtopiaScript和tianzhi0549同学） 
大部分使用了 e = e || event的方式，考虑到了兼容问题。但是event与上下文定义的event冲突了，这里要写成window.event。 
keyCode的处理也要考虑兼容问题。建议写成e.keyCode || e.which。关于keyCode、keyChar、which和key的标准问题，请自己查找。 
封装好的listener在调用时没有传入event。 
另外zmiaozzz、caizone、UtopiaScript同学，直接通过.onKeyXXX=的写法是不对的。 
zhaoyuting123同学，没有’enter’事件，要通过onKeyXXX来模拟enter事件。 
4. delegateEvent 
event.target有兼容问题。使用event.target || event.srcElement这种方式。 
target.tagName输出的是大写的字符串，因此比较时，请先将等号判断符两边转换一致。最好把输入的toUpperCase()一下（因为不确定输入为大写还是小写）。 
UtopiaScript同学的代理写法不正确，这个还是把内部的元素依次做了事件绑定而已。 


###PARTS 5: 

1. isIE 
大都是用navigator增值匹配得到的版本号。但是在IE8+，可以选择不同版本的浏览区渲染模式，因此在这种情况下，navigator的信息就不准确了。 
所以需要使用documentMode来判断实际的渲染模式。参考: /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp[‘$1']) : -1; 
2. cookie 
Date需要转换成字符串，W3C标准中建议使用toUTCString代替toGMTString。 
value要使用encodeURIComponent处理，W3C标准钟不建议使用escape方法。 
3. ajax 
因为浏览器兼容问题，除了XMLHttpRequest外，还要使用ActiveXObject创建”Microsoft.XMLHTTP”，"Msxml2.XMLHTTP”（低版本IE）。 
POST请求是需要setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8') 


小练习 

1. 输入练习
不要在for循环里进行element.innerHTML += '…’和element.appendChild(ele)的操作。统一拼接好innerHTML后，一次性插入innerHTML。append可以使用documentFragment插入代码片段。 

2. 倒计时
不建议使用setInterval倒计时，因为每次执行后都有一些误差，累计多了，误差会比较大。因此请使用setTimeout函数，并且在每次倒计时的时候，进行误差的补偿计算。 
lucky7ky同学的代码考虑到了这一点。 

3. 轮播
实现方式各式各样，主要就是注意利用一些缓动函数处理动画，以及定时器的clear时机，减少css重绘和重排计算。

4. autosuggest
大都使用的input和keyup事件，但是存在兼容和监听不全面的问题，具体看下后面讲的思路。 
很多使用element.onXXX = function(){}的方式实现，请改成使用addEvent的方式。 
上下选择suggestion时，清除选中样式可以考虑记录上一次的位置，减少遍历（尽管数据不多）。 
注意css样式和html结构分离。 

xionCode: 使用事件代理的方式处理subItem的事件。 
laozhang007的问题：阻止光标移动不通过移除keyup事件，而是阻止默认事件——event.preventDefault()和event.returnValue = false。（现代浏览器和低版本IE） 
Aralic: 代码合并时有冲突。 

### 练习4的思路： 
autosuggest几个注意的点 

1. 监听input框内文字变化。 
除IE下监听onpropertychange，webkit下监听oninput事件外，还要考虑通过鼠标右键剪切和粘贴的oncut, onpaste。 
以及键盘上下选择的keydown——最好使用keydown，按下后会触发多次keydown，直到松开按键才会触发一次keyup，因为有长按向下按键来快速选择的情况。 
另外，上下选择不会触发keypress。 
2. 关闭默认的自动提示，autocomplete=“off”，防止系统的补全和自定义的补全冲突。 
3. 下拉备选的click事件使用事件代理监听。 
4. 可以考虑曾经使用过的query保存起来，下次点开是有历史记录。在一次检索过程中(对query词Enter或者Click之前)，拉回来的autosuggest回来的数据也可以缓存，减少重复请求。 
5. input.value需要做trim处理。 
6. 如果需要window.open一个结果窗口时，不能将open调用放在回调函数里，否则会被浏览器当做自动弹窗屏蔽。 
7. W3C标准中有‘textinput’事件，不过实际在chrome发现，这个事件有bug，因此先目前只能考虑用前面说的方式实现监听。 




### js基础部分（2）

大家主要出现的问题有：

- 类型判断

xionCode 同学 分别用了 instanceof 和 typeof

Object.prototype.toString.call 优于 instanceof 优于 typeof

- uniqArray

重复的不一定相邻

比如 eiszitrone 同学的代码如下：

```
 for (var j = 0; j < ret.length; ++j) {
        if (j === 0 || ret[j] !== ret[j - 1]) ret[pos++] = ret[j];
    }
    return ret.slice(0, pos);
```

没有考虑到不相邻的重复，比较好的方式是利用 hash 
hash 性能远优于 for  

- trim 

trim 是去掉 两边的空白，中间需要保留

比如 fondadam 同学的代码如下：

```
function trim(str) {
    var result = [];
    for(var i = 0, len = str.length; i < len; i++) {
        if(str[i] == ' ' || str[i] == '\t' || str[i] == '\u3000') {
            continue;
        }
        result.push(str[i]);
    }
    result = result.join('');
    return result;
}

```
这个都去掉了，一般做法是 正反向两次循环，找个第一个有效字符的位置，最后一起截取一下


－ each  

for 的时候 注意 提前取数组长度，性能更优

比如 eiszitrone 同学的代码如下：

```
function each(arr, fn) {
    // your implement
    for (var i = 0; i < arr.length; ++i) fn(arr[i], i);
}
```

推荐用法

```
function each(arr, fn) {
    // your implement
    for (var i = 0, len = arr.length; i < len; ++i) fn(arr[i], i);
}
```

- getObjectLength

最全面的方法是 hasOwnProperty 加 hasDontEnumBug 

ES5 可以直接用 Object.keys

- isEmail

有同学 提到 RFC 5322 , 写了很多，也有同学只写了 [a-z0-9]
有个 case x+xx.xxx@s.xx-x.com 
正则需要考虑到子域和标点符号等的问题

- isMobilePhone

虚拟移动运营开放后，各种号段出现 如京东170等
所以 一般检查 1\d{10} 就好了
高级需求 需要考虑 国际区号 分割号等


### DOM（3）

－ addClass 需要判断是非存在 存在就不要加多次了

xionCode

```
function addClass(element, newClassName) {
    var classNames = element.className.split(/\s+/);
    classNames.push(newClassName);
    element.className = classNames.join(" ");

}
```

－ getPosition 要递归获取绝对位置

比如 fondadam 同学代码如下

function getPosition(ele) {
    obj = {};
    if(typeof ele !== 'object') return;
    obj.x = ele.offsetLeft;
    obj.y = ele.offsetTop;
    return obj;
} 

这个是相对父元素位置， 要 while 递归到顶层元素，加起来

### 事件（4）

－ addEvent

event 注意兼容 e = e || window.event;


### BOM（5）

- isIE 注意 documentMode

- setCookie 参数 encodeURIComponent


比如 lin-qf 同学代码如下

function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

value 应 encodeURIComponent
toGMTString 建议 toUTCStting


### AJAX（6）

XMLHttpRequest 和 ActiveXObject 解决兼容性

### 小练习1

大家主要出现的问题有：

- 在循环里 操作dom 如：appendChild 

比如 Sunmgal 同学的代码如下：

```
for(var i=0;i<arr.length;i++){

    var oinput = document.createElement("input");
    var oLable = document.createElement("label");
    oinput.type = "checkbox";
    oLable.innerHTML = arr[i];
    oLikes.appendChild(oinput);
    oLikes.appendChild(oLable);
}

```

在循环里操作dom 会造成频繁的重绘，有性能问题
建议，用js 拼好，最好一次性 append 或者 innerHTML

### 小练习2

大家主要出现的问题有：

- setInterval 用完记得清除，另外这个东西会有误差


比如 onekissbornfree 同学的代码如下：

```
var now = new Date();
    
    result= endDate.getTime()-now.getTime();
    result = Math.floor(result/1000);

    timer();
    setInterval(function(){     
    timer();
    },1000);
```

在开始的时候计算了时间差，然后就一直开这个计时器
建议，使用 setTimeout 

- 未准确判断计时结束

比如 fondadam 同学的代码如下：

```
var inputTime = $("#time").value;
arr = inputTime.split("-");
sInput = Date.parse(arr[1] + " " + arr[2] + "," + arr[0]);
...
var sOutput = oT.getTime();
var oDiffer = sInput - sOutput;
...
if (oDiffer == 0) {
    clearInterval(timer);
    show.innerHTML = "时间都去哪了？";
}
```

new Date 的时间戳精确到毫秒的, 所以 oDiffer 不能为 0， 无法停止计时器
建议：精确到秒，或者用 < 容错

－ 

### 小练习3

功能基本都满足了，有几个同学封装组件了，有这个意识很赞
多数代码还是混在一起，建议动画，事件绑定分开
让代码通用性更好

### 小练习4

有一个点，多数同学没有注意
因为ajax数据请求时异步的，需要考虑加一个锁，防止同时多个请求，数据错乱

### 小练习5

多数同学之间用了 drag 事件, ie7- 悲剧了

@Fental 不建议用 document.body.onmouseup 绑定事件，可以把相关状态存起来，统一处理


## `util.js`第三部分

参考实现：

[dom](https://github.com/hushicai/ife-task0002/blob/master/src/dom.js)

## 小练习3

参考实现：

[Slider](https://github.com/hushicai/ife-task0002/blob/master/src/Slider.js)

## review

### common

* 代码严重不规范
* 有不少同学的任务没有做完...
* 也有不少同学做得不完整，练习跑不起来。

### DOM部分

* 很多操作符没有弄明白就使用了，比如`instanceof`、`typeof`等，这些其实都是运算符，感觉很多人把它当作函数使用了，虽然可以这么用...
* 代码复用度不足，比如`addClass`、`removeClass`，其实可以先实现一个`hasClass`来复用，但不少人都是直接复制使用。
* 感觉目前大部分的功能实现都是用百度搜出来，比如`getPosition`这个方法的实现，大部分人用了`offsetParent`，这已经过时了...何况算出来的还不是相对浏览器窗口的，相对于文档左上角和相对于浏览器窗口是两回事...
* `mini $`这部分代码，有几个人的代码是一样的...

### 小练习3

* 不少人没有做轮播组件...
* 组件实现方面，接口设计能力不足，耦合太严重，缺乏面向对象编程思想。
* dom事件理解不足，比如Slider的组件，需要用到mouseenter、mouseleave，但很多同学直接使用mouseover、mouseout了
* 定时器控制紊乱，感觉对js这门语言的理解还不足...
