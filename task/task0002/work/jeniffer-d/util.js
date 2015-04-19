
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // your implement
    var str = Object.prototype.toString.call(arr).slice(8,-1).toLowerCase();
    if (str == "array") {
        return true;
    }
    else {
        return false;
    }
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    var str = typeof fn;
    if (str == "function") {
        return true;
    }
    else {
        return false;
    }
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
    function cloneObject(src) {
        //不能包括函数
        if (typeof src == "function") {
            return console.log("error! can not include function");
        };
        //若是基本数据类型：number，string，undefined，boolean，null,直接返回
        if (typeof src != "object" || src == null) {
            return src;
        } 
        
        //Array
        if (isArray(src)) {
            var newArray =[];
            for(var i=0; i<src.length; i++){
                newArray[i] = src[i];
            }
            return newArray;
        }

        //Date
        if (src instanceof Date){
            var newDate = new Date(src.getTime());
            return newDate;
        }

        //Object
        if (src instanceof Object) {
            var newObject = new Object();
            for (var j in src) {
                if (src.hasOwnProperty(j)) {
                    newObject[j] = arguments.callee(src[j]);
                }
            }
            return newObject;  
        }
      
    }
