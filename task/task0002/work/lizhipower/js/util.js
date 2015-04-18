/**
 * Created by Zhi_LI on 2015/4/18.
 */

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
    // your implement
    var  i,b=0,e=str.length;
    //去左空格
    for(i=0; i<str.length;i++){
        if(str.charAt(i)!=' '){
            b=i;
            break;
        }
        if(i==str.length) {
            return  "";
        }

    }

    //去右空格
    for(i=str.length-1;i>b;i--){
        if(str.charAt(i)!=' '){
            e=i;
            break;
        }
    }

    return  str.substring(b,e+1);
}

// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
    element.classList.add(newClassName);

}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    element.classList.remove(newClassName);

}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    eleParent = element.parentNode;
    sbParent = siblingNode.parentNode;
    return eleParent.isSameNode(sbParent);
}

// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var eleViewLeft = getElementViewLeft(element);
    var eleViewTop = getElementViewTop(element);
    return {
        viewLeft: eleViewLeft,
        viewTop: eleViewTop
    };
    function getElementViewLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        var elementScrollLeft;
        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat") {
            elementScrollLeft = document.body.scrollLeft;
        } else {
            elementScrollLeft = document.documentElement.scrollLeft;
        }
        return actualLeft - elementScrollLeft;
    }

    function getElementViewTop(element) {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        var elementScrollTop;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat") {
            elementScrollTop = document.body.scrollTop;
        } else {
            elementScrollTop = document.documentElement.scrollTop;
        }
        return actualTop - elementScrollTop;
    }

}

function $(selector) {
    var elements = [];
    //console.log('hi');
    var classReg = /\.\w*/g;
    var domReg = /\#\w*/g;
    //var attrReg = /\[.*\]/g;
    //var tagReg =  /![\.\#]\w/g;

    var selClassList = selector.match(classReg);
    var selDomList =selector.match(domReg);
    //var selAttrList =selector.match(attrReg);
    //var selTagList =selector.match(tagReg);

    if (selDomList!=null && selDomList.length ==1 && selClassList!=null){
        var classSeletor = selClassList.join('');
        elements = document.querySelectorAll(classSeletor);
        var eleNew = [];
        for (i=0;i<elements.length; i++){
            if(elements[i].parentNode.hasAttribute('id')){
                if (elements[i].parentNode.id == selDomList[0].replace('#','')) {
                    eleNew.push(elements[i]);
                }
            }

        }
        elements = eleNew;
    }
    elements = document.querySelectorAll(selector);
    return elements;
}

// 给一个dom绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement

}

// 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    // your implement
}