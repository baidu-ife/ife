/*检测对象是不是数组*/
function isArray(arr) {
    return arr instanceof Array;
}

/*检测对象是不是函数*/
function isFunction(fn) {
    return fn instanceof Function;
}

/*深度复制对象cloneObject(srcObj)*/
function cloneObject(srcObj) {
    if(srcObj instanceof Object) {
        var buf={};
        for(var k in srcObj) {
            buf[k]=cloneObject(srcObj[k]);
        }
        return buf;
    }
    else if(srcObj instanceof Array) {
        var buf=[];
        for(var i=0;i<buf.length;i++) {
            buf[i]=cloneObject(srcObj[i]);
        }
        return buf;
    }
    else {
        return srcObj;
    }
}

/*去掉数组重复元素*/
function uniqArray(arr) {
    for(var i=0;i<arr.length;i++) {
        for(var j=i+1;j<arr.length;j++) {
            if(arr[j]===arr[i]) {
                arr.splice(j,1);
                j--;
            }
        }
    }
    return arr;
}

/*删除字符串前尾的空格*/
function trim(str) {
    if(str.charAt(0)==' ') {
        return trim(str.substr(1));
    }
    else if(str.charAt(str.length-1)==' ') {
        return trim(str.substr(0,str.length-2));
    }
    else {
        return str;
    }
}

/*遍历数组元素执行fn函数*/
function each(arr,fn) {
    for(var i=0;i<arr.length;i++) {
        fn(arr[i]);
    }
}

/*获取对象第一层的长度*/
function getObjectLength(obj) {
    var count=0;
    for(x in obj) {
        count++;
    }
    return count;
}




