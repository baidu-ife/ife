/* Created by zhuqiao 
 * on 2015/4/24
 */


/* ------------ 2. JavaScript数据类型及语言基础   ------------- */

function isArray (arr) {
    return arr instanceof Array;
};

function isFunction(fn) {
    return typeof fn == "function";
};

function cloneObject(src) {
	var target;
	var typeOfSrc = typeof src;

	if(typeOfSrc == "string" || typeOfSrc == "number" || typeOfSrc == "boolean") {
		target = src;
		return target;
	} 
	if(src instanceof Date) {
		target = src;
		return target;
	} 
	if(src instanceof Array) {
		target = [];
		for(var index = 0; index < src.length; index ++){
			target[index] = cloneObject(src[index]);
		}
		return target;
	}

	target = {};
	for(var item in src){
		target[item] = cloneObject(src[item]);
	}
	return target;
};

function uniqArray(arr) {
	var length = arr.length,
		index = 0,
		current;

	while(index < length) {
		current = arr[index];
		
		if(index == arr.lastIndexOf(current)){
			index ++;
			continue;
		}
		arr.splice(arr.lastIndexOf(current), 1);
		length --;
	}
	return arr;
}

function trim(str) {

}

function each(arr, fn) {
    for(var index = 0; index < arr.length; index ++){
    	fn(index, arr[index]);
    }
}

function getObjectLength(obj) {
	var count = 0;
	for(var item in obj){
		count ++;
	}
	return count;
}

function isEmail(emailStr) {
	var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return emailRegex.test(emailStr);
}

function isMobilePhone(phone) {
    var phoneRegex = /^1[3,4,5,7,8][0-9]\d{8}$/i;
    return phoneRegex.test(phone);
}


/* ------------  3. DOM的一些操作   ------------- */

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
	if(element.className.indexOf(newClassName) != -1)
		return element.className;
	element.className += " " + newClassName;
	return element.className;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
	var classname = element.className,
		index = classname.indexOf(oldClassName);
	
	if(index == -1)
		return classname;

	classname = classname.substring(0, index -1) + classname.substr(index + oldClassName.length + 1);
	return classname;
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    var htmlEle = document.getElementsByTagName("html")[0];
    var elementDepth = 1,
        siblingNodeDepth = 1;
    var parentNode = element.parentNode;
    var temp = siblingNode.parentNode;

    //两个元素是相互包含的关系
    if(element.contains(siblingNode) || siblingNode.contains(element))
        return false;

    //element 是body元素
    if(parentNode == htmlEle)
    	return;

    while(parentNode.compareDocumentPosition(htmlEle) !=0)
    {
    	if(parentNode.contains(siblingNode)){
    		while(temp != parentNode){
    			temp = temp.parentNode;
    			siblingNodeDepth ++;
    		}
    		break;
    	}
    	parentNode = parentNode.parentNode;
    	elementDepth ++ ;
    }
    return siblingNodeDepth == elementDepth;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	var x = 0, y = 0;
    while (element != null) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }
    return { x: x, y: y };
}

// 实现一个简单的Query
function $(selector) {
    var selectors = selector.split(" ");
    var elements = null;
    var startWith = selectors[0].substring(0, 1);

    switch(startWith){
        case "#" :
            elements = document.getElementById(selectors[0]);
            break;
        case "." :
            if(document.getElementsByClassName){
                elements = document.getElementsByClassName(selectors[0]);
                break;
            }
            var nodes = document.getElementsByTagName("*");
            for(var index = 0; index < nodes.length; index ++){
                 if(hasClass(selectors[0],nodes[i])) {
                    elements.push(nodes[i]);
                }
            }
            break;
        case "[" :
            
            break;
        default :
            
            break;
    }

    if(!elements)
    return elements;
}



/* ------------  4. 事件   ------------- */

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
}












