window.onload = function(){
	var arr = ['fsdf','sdfsd'];
	var a = 1;
	var fn = function(){};
	var pattern1 = /at/g;
	var [attern2 = /[bc]ac/gi;


	console.log(isArray(arr));
	console.log(isFunction(fn));
	console.log(arr.toString());

	function isArray(arr) {
		return arr instanceof Array;}
	
	function isFunction(fn) {
		return typeof fn;}
	
	//复制目标对象
	function cloneObject(src) {
		
	}
}