/**
 * Created by Zhi_LI on 2015/4/18.
 */
//Array.forEach implementation for IE support..
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}

Array.prototype.unique= function () {
    var obj = {},
        res = [] ;
    this.forEach(function(v){
        if (!obj[v]) {
            obj[v] = true;
            res.push(v);
        }
    });
    return res ;
}


