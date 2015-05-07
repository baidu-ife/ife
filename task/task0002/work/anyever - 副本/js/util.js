// JavaScript Document
// 判断arr是否为一个数组，返回一个bool值

function isArray(arr) {
    return arr instanceof Array;

}

// 判断fn是否为一个函数，返回一个bool值

function isFunction(fn) {
    return typeof fn == 'function';

}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等

function cloneObject(src) {
    var buf;
    if (src instanceof Array) {
        buf = [];
        //创建一个空的数组 
        var i = src.length;
        while (i--) {
            buf[i] = cloneObject(src[i]);

        }
        return buf;

    } else if (src instanceof Object) {
        buf = {};
        //创建一个空对象 
        for (var k in src) {
            //为这个对象添加新的属性 
            buf[k] = cloneObject(src[k]);

        }
        return buf;

    } else {
        return src;

    }

}

function uniqArray(arr) {
    var n = {},
        r = [];
    //n为hash表，r为临时数组
    for (var i = 0; i < arr.length; i++)
    //遍历当前数组
    {
        if (!n[arr[i]])
        //如果hash表中没有当前项
        {
            n[arr[i]] = true;
            //存入hash表
            r.push(arr[i]);
            //把当前数组的当前项push到临时数组里面
        }

    }
    return r;

}

function rpchar(index, character, str) {
    return str.substr(0, index) + character + str.substr(index + character.length);

}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现

function trim(str) {
    var space = new String(" \t\n\r");
    var start, end, done;
    var done = 0;
    for (var i = 0; i < str.length && done != 1; i++) {
        if (space.indexOf(str[i]) != -1) {
            start = i;

        } else {
            done = 1;

        }

    }

    done = 0;
    for (var i = str.length - 1; i >= 0 && done != 1; i--) {
        if (space.indexOf(str[i]) != -1) {
            end = i;

        } else {
            done = 1;

        }


    }

    str = str.substring(start + 1, end);

    return str;

}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递

function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i);

    }

}

// 获取一个对象里面第一层元素的数量，返回一个整数

function getObjectLength(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            size++;

        }

    }
    return size;

}

// 判断是否为邮箱地址

function isEmail(emailStr) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(emailStr)) return true;
    else return false;

}

// 判断是否为手机号

function isMobilePhone(phone) {
    var filter = /^0?1[3|4|5|8][0-9]\d{8}$/;
    if (filter.test(phone)) return true;
    else return false;

}

// 为element增加一个样式名为newClassName的新样式

function addClass(element, newClassName) {
    if (!element.className) {
        element.className = newClassName;

    } else {
        newClass = element.className;
        newClass += " ";
        newClass += newClassName;
        element.className = newClass;

    }

}

// 移除element中的样式oldClassName

function removeClass(element, oldClassName) {
    if ((element.className) && (element.className.indexOf(oldClassName) != -1)) {
        element.className = element.className.replace(oldClassName, "");
        window.alert(element.className);

    }

}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值

function isSiblingNode(element, siblingNode) {

    if (element.parentNode == siblingNode.parentNode) {
        return true;

    }
    return false;

}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}

function getPosition(element) {
    var left = element.offsetLeft;　　　　
    var temp = element.offsetParent;
    var top = element.offsetTop;

    　　　　
    while (temp !== null) {　　　　　　
        left += temp.offsetLeft;
        top += temp.offsetTop;　　　　　　
        temp = temp.offsetParent;　　　　
    }　　　　
    if (document.compatMode == "BackCompat") {
        var elementScrollLeft = document.body.scrollLeft;
        var elementScrollTop = document.body.scrollTop;　　　　
    } else {　　　　　　
        var elementScrollLeft = document.documentElement.scrollLeft;
        var elementScrollTop = document.documentElement.scrollTop;　　　　
    }
    var obj = new Object();　　　　
    obj.x = left - elementScrollLeft;
    obj.y = top - elementScrollTop;
    return obj;

}


// 实现一个简单的Query,只返回一个元素
function $ (selector,context) {
    if(typeof selector !=="string")
        return null;
    selector=trim(selector);
    // if(typeof document.querySelector ==="function")
    //     return document.querySelector(selector);// querySelector查询属性选择器是，属性值要用引号/双引号包裹着
    context=context||document;
    var reqExpr=/^([^\s]+)\s*/;
    var matchs=reqExpr.exec(selector);
    var selItem=(matchs&&matchs.length>0)?matchs[1]:"";
    if(selItem === "")
        return null;
    var temp=null;
    if(selItem[0]==="#"){
        // 还要判断是否包含级联
        temp=document.getElementById(selItem.substring(1));
    }else if(selItem[0]==="."){
        var selCssName=selItem.substring(1);
        var temp=getElementsByClassName(context,selCssName);
        if(temp&&temp.length>0){
            temp=temp[0];
        }
    }else if(selItem[0]==="["){
        temp=null;
        var attrSel=selItem.substring(1,selItem.length-1).split("=");
        var key=attrSel[0];
        var val=attrSel.length>1?attrSel[1]:"";
        var childs=context.getElementsByTagName("*");
        for (var i = 0,len=childs.length; i < len; i++) {
            var attr=childs[i].getAttribute(key);
            if(!attr)
                continue;
            !val ? (temp=childs[i]) : (val===attr ? (temp=childs[i]) : void 0);
            if(!temp)
                continue;
            else
                break;
        }
    }else{
        temp=context.getElementsByTagName(selItem)[0];
    }

    if(!temp) 
        return null;
    var nexSel=selector.replace(reqExpr,"");
    if(!nexSel)
        return temp;
    else{
        temp=$(selector.replace(reqExpr,""),temp);
        return temp;
    }
}

/*************

本来希望靠indexof检测 .#[]这些符号来进行操作判断，然后通过正则表达式提取出对应的单词来进行处理的，但是高了很久也没有研究出怎么在
“.aaa bbb”这个字符串中只提取出bbb，而不提取aaa。用\b(\w*)\b这个表达式地话它不但提取aaa，连.bbb它也会提取。

// 实现一个简单的Query
function $(selector) {
	var finalobj=null;
    var allElements = document.getElementsByTagName('*');
	
	if ((selector.indexOf('#') != -1)) {
        var result = selector.match(/#(\w*)\b/);
        finalobj = document.getElementById(result[1]);
    }

    // [data]
    if ((selector.indexOf('[') != -1)) {
        var result = selector.match(/\[(.*)\]/);
        var attribute = result[1];
        var matchingElements;
		if(finalobj!==null)
		{
			allElements = finalobj.getElementsByTagName('*');
		}
        for (var i = 0,
        n = allElements.length; i < n; i++) {
            if (allElements[i].getAttribute(attribute) !== null) {
                // Element exists with attribute. Add to array.
                finalobj = allElements[i];
                break;
				//console.log(finalobj);
            }
        }
    }
	
	
	 // tagname
    if (1) {
        var result = selector.match(/[\s|^](\b\w*\b)/);
		console.log(result);
        var tagname = result[1];
		if(finalobj!==null)
		{
			allElements = finalobj.getElementsByTagName(tagname);
			return allElements[0];
		}
		else
		{
			allElements = document.getElementsByTagName(tagname);
			return allElements[0];
		}

    }
	
	

	
			
   return finalobj;
}

**/ ///////////////////////////



/**
function $(selector) {
	var opname = selector.split(" ");
	var finalobj = document.getElementsByTagName('*');

	if ((selector.indexOf('#') != -1)) {
			var result = selector.match(/#(\w*)\b/);
			finalobj = document.getElementById(result[1]);
			console.log(finalobj);
	}

	for (var i = 0; i < opname.length; i++) {

		// [data]
		if ((opname[i].indexOf('[') != -1)) {

			var match = [];
			var temp = trim(opname[i]);
			temp = temp.substring(1, temp.length - 1)
			temp = temp.split("=");
			var attr = temp[0];
			var value = temp[1];
			for (var ii = 0, ln = finalobj.length; ii < ln; ii++) {
				if (finalobj[ii].hasAttribute(attr)) {
					if (value) {
						if (finalobj[ii].getAttribute(attr) === value) {
							match.push(finalobj[ii]);
						}
					} else { // Else, simply push it
						match.push(finalobj[ii]);
					}
				}
			}
			finalobj = match;
		}

	}
	console.log(finalobj[0]);
	//console.log(opname[i]);
	return (finalobj);

}
**/ ////////////////////////////////////////////////



// 给一个element绑定一个针对event事件的响应，响应函数为listener

 function addEvent(element, event, listener) {
    var handlerlist = element.handlerlist || (element.handlerlist = {});
    if (element.addEventListener) {
        element.addEventListener(event, listener);
        handlerlist[(new Date().getTime()) * Math.random()] = listener;
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
        handlerlist[(new Date().getTime()) * Math.random()] = listener;
    } else {
        element["on" + event] = listener;
    }
}


// 移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数

function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        if (listener)
            element.removeEventListener(event, listener);
        else if (element.handlerlist) {
            for (var handeler in handlerlist) {
                element.removeEventListener(event, handlerlist[handeler]);
            } 

        }			else {
                return;
            }
    } else if (element.detachEvent) {
        if (listener)
            element.detachEvent("on" + event, listener);
        else if (element.handlerlist) {
            for (var handeler in handlerlist) {
                element.detachEvent("on" + event, handlerlist[handeler]);
            }
        } else {
                return;
            }
    }
}


// 实现对click事件的绑定

function addClickEvent(element, listener) {
    addEvent(element,"click",listener);
}

// 实现对于按Enter键时的事件绑定

function addEnterEvent(element, listener) {
    addEvent(element,"keydown",function (e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if(code==13){
            listener.call(element,e);
        }
    });
}






window.onload = function() {


    function clickListener(event) {
    console.log(event);
}

$.click($("#item1"), clickListener);


    var element = document.getElementById('test');

    var element2 = document.getElementById('test2');

    //console.log($("[aaaa]"));

}