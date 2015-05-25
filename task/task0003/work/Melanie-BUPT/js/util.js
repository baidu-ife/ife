//实现一个简单的Query 
function $(selector) { 
	var allchilds = []; 
	var childs = function (element) {    // 递归获取所有子元素 
	    return element.getElementsByTagName('*'); 
	} 

    var ele = document.getElementsByTagName('html')[0];    // 获取所有元素 
    var sele = selector.replace(/\s+/, ' ').split(' ');    // 去除多余的空格并分割 

    for (var i = 0, len = sele.length; i < len; i++) { 
        ele = childs(ele); 
        var eleLen = ele.length; 
        var isGet = false; 

        switch (sele[i][0]) {    // 从子节点中查找 
            case '#': 
                for (var j = 0; j < eleLen; j++) { 
                    if (ele[j].id === sele[i].substring(1)) { 
                        ele = ele[j]; 
                        isGet = true; 
                        break; 
                    } 
                } 
                break; 
            case '.': 
                for (var j = 0; j < eleLen; j++) { 
                    var name = uniqArray(ele[j].className.split(' ')); 
                    if (name.indexOf(sele[i].substring(1)) !== -1) { 
                        ele = ele[j]; 
                        isGet = true; 
                        break; 
                    } 
                } 
                break; 
            case '[': 
                var valueLoc = sele[i].indexOf('='); 
                if (valueLoc !== -1) { 
                    var key = sele[i].substring(1, valueLoc); 
                    var value = sele[i].substring(valueLoc + 1, sele[i].length - 1); 
                    for (var j = 0; j < eleLen; j++) { 
                        if (ele[j][key] === value) { 
                            ele = ele[j]; 
                            isGet = true; 
                            break; 
                        } 
                    } 
                } 
                else { 
                    var key = sele[i].substring(1, sele[i].length - 1); 
                    for (var j = 0; j < eleLen; j++) { 
                        if (ele[j][key]) { 
                            ele = ele[j]; 
                            isGet = true; 
                            break; 
                        } 
                    } 
                } 
                break; 
            default : 
                for (var j = 0; j < eleLen; j++) { 
                    if (ele[j].tagName === sele[i].toUpperCase()) {    // tagName 属性的返回值始终是大写的 
                        ele = ele[j]; 
                        isGet = true; 
                        break; 
                    } 
                } 
                break; 
        } 
    } 

    if (!isGet) { 
        ele = null; 
    } 

    return ele; 
} 

//添加鼠标点击事件
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else {
        element.attachEvent("on"+event, listener);
    }
}

// function $.on(selector, event, listener) {
//     var element = $(selector);
//     addEvent(element, event, listener);
// }