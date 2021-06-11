function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
}

function isFunction(fn) {
    return typeof fn === "function";
}

function cloneObject(src) {
    var newObj = src;
    if (src && typeof src === "object") {
        newObj = isArray(src) ? [] : {};
        for (var i in src) {
            newObj[i] = cloneObject(src[i]);
        }
    }
    return newObj;
}

function uniqArray(arr) {
    var newarr = [];
    var obj = {};
    for (var i in arr){
        if(!obj[arr[i]]){
            obj[arr[i]] = true;
            newarr.push(arr[i]);
        }
    }
    return newarr;
}

function trim(str) {
    var pat = /(^\s*)|(\s*$)/g
    return str.replace(pat, '');
}

function each(arr, fn) {
    for(var i in arr){
        fn(arr[i]);
    }
}

function getObjectLength(obj) {
    var count = 0;
    for(var i in obj){
        count++;
    }
    return count;
}

function isEmail(emailStr) {
    var pat = /[a-zA-Z0-9_-]+@+[a-zA-Z0-9_-]+\.+[a-zA-Z0-9_-]/g;
    return pat.test(emailStr);
}

function isMobilePhone(phone) {
    var pat = /^\d{11}$/g;
    return pat.test(phone);
}

function addClass(element, newClassName) {
    var ClassName = element.className;
    if(ClassName.match(newClassName)){
        return false;
    }
    else{
        ClassName = (ClassName == "") ? ClassName : ClassName + " ";
        element.setAttribute("class", ClassName + newClassName);
    }
}

function removeClass(element, oldClassName) {
    var ClassName = element.className + " ";
    if (!ClassName || !ClassName.match(oldClassName+" ")) {
        return false;
    }
    else{
        var newClassName = ClassName.replace(oldClassName, "").replace(/(^\s*)|(\s*$)/g,"")
        element.setAttribute("class", newClassName);
    }
}

function isSiblingNode(element, siblingNode) {
    return 
}
