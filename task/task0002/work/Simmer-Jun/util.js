window.onload=function(){

// 判断arr是否为一个数组，返回一个bool值
	function isArray(arr){
		return (arr instanceof Array);
	}
// 判断fn是否为一个函数，返回一个bool值
	function isFunction(fn) {
	    return (fn instanceof Function);
	}
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
	function cloneObject(src){
		var o,i,j;
		if(src ==(null || undefined)){
		return false;
		}else if((src instanceof Function) || (src instanceof RegExp)){
			return false;
		}else if(typeof(src)!="object"){
			return src;
		}else if(src instanceof Array){
			o=[];
			j=src.length;
			for(i=0;i<j;i++){
				if(typeof(src[i])=="object" && src[i]!=null){
					o[i]=arguments.callee(src[i]);
				}else{
					o[i]=src[i]
				}
			}
		}else {
			o={};
			if(src instanceof Date){ return src;}
			if(src instanceof Error){ return src;}
			for(i in src){
				if(typeof(src[i])=="object" && src[i]!=null){
					o[i]=arguments.callee(src[i]);
				}else{
					o[i]=src[i]
				}
			}
		}
		return o;
	}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
	function uniqArray(arr) {
		if(!(arr instanceof Array)){
			return false
		}
	    function compare(num1,num2){
	    	if(num1>num2){
	    		return 1;
	    	}else if(num1 == num2){
	    		return 0;
	    	}else {
	    		return -1;
	    	}
	    }
	    var i,j=arr.length;
	    arr=arr.sort(compare); 
	    for(i=0;i<j;){
	    	if(arr[i]==arr[i+1]){
	    		arr.splice(i,1);
	    		j=arr.length
	    	}else{
	    		i++;
	    	}
	    }
	    console.log(arr);
	    return arr;
	    
	}
	uniqArray([33,44,33,55,11,22,66,33,55,99,11,88,77,66]);//[11,22,33,44,55,66,77,88,99]


// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
	function trim(str) {
	    return /\S\w*\s\w*/ig.exec(str)[0]
	}
	console.log(trim("  	   hello word 	"))//"hello word"


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
	function each(arr, fn) {
		var i;
	    for(i in arr){
	    	fn(arr[i],i);
	    }
	}
	function output(item,index){
		console.log(index+':'+item);
	}
    var aaa=['html','css','javascript'];
    each(aaa,output);//[0:html,1:css,2:javascript]

// 获取一个对象里面第一层元素的数量，返回一个整数
    function getObjectLength(obj) {
    	var i,j=0;
    	for(i in obj){
    		j++;
    	}
    	return j;
    }
	var obj={
		a:1,
		b:2,
		c:3,
		d:{
			d1:1,
			d2:2
		}
	}
	getObjectLength(obj);//j=4

// 判断是否为邮箱地址
	function isEmail(emailStr) {
	return /^[A-Za-z0-9]{0,20}[.-_]*[A-Za-z0-9]*@[A-Za-z0-9]{2,5}\.[a-z]{2,3}/i.test(emailStr);
	}
	var email='xushujun_sunny@qq.com';
	console.log(isEmail(email));//true

// 判断是否为手机号
	function isMobilePhone(phone) {
	   return /^[1]{1}[3-8]{1}[0-9]{9}$/.test(phone);
	}


// 为element增加一个样式名为newClassName的新样式
	function addClass(element, newClassName) {
	    if(element.className==""){
	    	element.className=newClassName;
	    }else{
	    	var arr=element.className.split(' ');//将className用空格分隔成数组
	    	arr.push(newClassName);//在数组的最后加上newclassName
	    	element.className=arr.join(' ');//将新数组使用空格组合成字符串赋给className
	    }
	}

// 移除element中的样式oldClassName
	function removeClass(element, oldClassName) {
		if(element.className==""){
			element.className="";
		}else{
			var arr=element.className.split(' ');
			var index=arr.indexOf(oldClassName);//找到将要删除的oldclassName在数组中索引
			arr.splice(index,1);//使用数组的splice方法删除
			element.className=arr.join(' ');//将新数组使用空格组合成字符串赋给className
		}
	}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
	function isSiblingNode(element, siblingNode) {
	    // your implement
	}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
	function getPosition(element) {
	    var x,y,arr,elementScrollLeft,elementScrollTop,current;
	    x=element.offsetLeft;//获取当前元素左上角距离父元素左边的距离
	    y=element.offsetTop;//获取当前元素左上角距离父元素顶部的距离
	    current=element.offsetParent;
	   // alert(element.offsetLeft);
	    while(current != null){//当父元素不为空时，则循环
	    	y += current.offsetTop;
	    	x += current.offsetLeft;
	    	current = current.offsetParent;
	    }
	    elementScrollLeft=document.documentElement.scrollLeft || document.body.scrollLeft;//兼容IE获取当前的左边滚动长度
	    elementScrollTop=document.documentElement.scrollTop || document.body.scrollTop;//兼容IE获取当前的顶部滚动长度
	    x -= elementScrollLeft;//获得element的相对浏览器窗口左边的距离
	    y -= elementScrollTop;
	    return arr=[x,y];//返回相对位置
	}
//	var ttt="name";
//	alert(ttt.split(' ').length);
// 实现一个简单的Query
	function $(selector) {
		var i,arr,length,element,selec;
		element=document;//element默认为document对象
		arr=selector.split(' ');//将选择字符串用空格分开
		length=arr.length;//获取选择器的层级数
		i=0;
		while(i<length){
			if(arr[i].charAt(0)=="#"){
				selec=/[^#].*/.exec(arr[i])[0];//使用正则提取id选择器
				element=element.getElementById(selec);
				//alert("ID selector!")
			}else if(arr[i].charAt(0)=="."){
				selec=/[^.].*/.exec(arr[i]);//使用正则提取class选择器
				element=element.getElementsByClassName(selec)[0];
				//alert("class selector!")
			}else if(arr[i].charAt(0)=="["){

				alert("attr selector!")
			}else {
				element=element.getElementsByTagName(arr[i])[0];
				//alert("Tag selector!")
			}
			i++;
		}
		return element;
	}
//alert($("#box .box p").innerHTML);


// 给一个element绑定一个针对event事件的响应，响应函数为listener
	function addEvent(element, event, listener) {
	    if(element.addEventListener){
              element.addEventListener(event,listener,false)
            }else if(element.attachEvent){
              element.attachEvent("on"+event,listener)
            }
            else{ 
              element["on"+event]=listener;
            }
	}


// 移除element对象对于event事件发生时执行listener的响应
	function removeEvent(element, event, listener) {
		if(element.removeEventListener){
              element.removeEventListener(event,listener,false)
            }else if(element.detach){
              element.detach("on"+event,listener);

            }else{
              element["on"+event]=null;
            }
	}

// 实现对click事件的绑定
	function addClickEvent(element, listener) {
	    if(element.addEventListener){
              element.addEventListener("click",listener,false)
            }else if(element.attachEvent){
              element.attachEvent("onclick",listener)
            }
            else{ 
              element.onclick=listener;
            }
	}

// 实现对于按Enter键时的事件绑定
	function addEnterEvent(element, listener) {
		if(element.which != 13) {return false;}//ENTER键的ASCII码值为13
		if(element.addEventListener){
              element.addEventListener("keydown",listener,false)
            }else if(element.attachEvent){
              element.attachEvent("onkeydown",listener)
            }
            else{ 
              element.onkeydown=listener;
            }
	}


/*接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法

addEvent(element, event, listener) -> $.on(element, event, listener);
removeEvent(element, event, listener) -> $.un(element, event, listener);
addClickEvent(element, listener) -> $.click(element, listener);
addEnterEvent(element, listener) -> $.enter(element, listener);*/
var $={
	on:function(element, event, listener){
		if(element.addEventListener){
              element.addEventListener(event,listener,false)
            }else if(element.attachEvent){
              element.attachEvent("on"+event,listener)
            }
            else{ 
              element["on"+event]=listener;
            }
	},
	un:function(element, event, listener){
		if(element.removeEventListener){
              element.removeEventListener(event,listener,false)
            }else if(element.detach){
              element.detach("on"+event,listener);

            }else{
              element["on"+event]=null;
            }
	},
	click:function(element, listener){
		if(element.addEventListener){
              element.addEventListener("click",listener,false)
            }else if(element.attachEvent){
              element.attachEvent("onclick",listener)
            }
            else{ 
              element.onclick=listener;
            }
	},
	enter:function(element, listener){
		if(element.which != 13) {return false;}//ENTER键的ASCII码值为13
		if(element.addEventListener){
              element.addEventListener("keydown",listener,false)
            }else if(element.attachEvent){
              element.attachEvent("onkeydown",listener)
            }
            else{ 
              element.onkeydown=listener;
            }
	}
}
// 判断是否为IE浏览器，返回-1或者版本号
	function isIE() {
	    var version;
	    var ua=navigator.userAgent.toLowerCase();
	    alert(ua);
	    if(/trident/.test(ua)){//IE特有的tridend内核
	     version=/\d*.\d{1}(?=; )/.exec(ua)[0];	//提取出IE版本
	     return version;
	    } else {
	    	return -1;
	    }
	   // alert(version);   
	}


// 设置cookie
	function setCookie(name, value, expiredays) {
	    var Days = 30; //此 cookie 将被保存 30 天
        var exp = new Date();    //new Date("");
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	}
	setCookie("admin","cfaugusg",20);

// 获取cookie值
	function getCookie(cookieName) {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
        if(arr != null){  
            return (arr[2]);  
        }
        else{  
            return "";  
        }  
	}

    function ajax(url, options) {
        var xml;
        function getXml() {
            var xml;
            if (window.XMLHttpRequest) {
                xml = new XMLHttpRequest;
            } else {
                xml = new ActiveXObject("Microsoft.XMLHTTP")
            }
            return xml;
	   }
	   xml = getXml();
	   xml.onreadystatechange = function () {
	   	if (xml.readyState == 4 && xml.status == 200) { // 如果顺利发送数据并成功应答
	   	    options.onsuccess();// 调用options的onsuccess方法
	   	}
	   	else if (xml.readyState == 4) {
	   	    options.onfail();// 数据发送失败
	   	}

	   	}
	   }
	}


  /*--------END Line---------*/
}