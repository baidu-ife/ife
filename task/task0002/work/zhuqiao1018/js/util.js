/* Created by zhuqiao 
 * on 2015/4/24
 */

function isArray (arr) {
    // body...
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
	} else {
		if(src instanceof Date) {
			target = src;
			return target;
		} else if(src instanceof Array) {
			target = [];
			for(var index = 0; index < src.length; index ++){
				target[index] = cloneObject(src[index]);
			}
			return target;
		} else {
			target = {};
			for(var item in src){
				target[item] = cloneObject(src[item]);
			}
			return target;
		}
	}

};

function uniqArray(arr) {

}

function trim(str) {

}