function isArray(arr){
	if(arr.constructor == Array){
        return true;
    }else{
        return false;
    }
}
function isFunction(fn){
	return typeof fn == 'function';
}
function cloneObject(src) {
    var clone = {};
		for(x in src){
			if(typeof src.x == 'object'){
				cloneObject(src.x);
			}else{
				clone.x=src.x;
			}
		}
		return clone;
}
//数组去重
function uniqArray(arr){
	var result = [];
	for(var i=0;i<arr.length;i++){
		if(result.indexOf(arr[i],result)==-1)
			result.push(arr[i]);
	}
	return result;
}



//循环实现trim
function simpleTrim(arr){
	var result='';
	for(var i=0;i<arr.length;i++){
		if(arr.charAt(i)!=' '){
			result+=arr.charAt(i);
		}
	}
	return result;
}

//正则表达式实现去除空白
function simpleTrim(str){
	return str.replace(/(^\s*)|(\s*$)/g, '');
}


//遍历数组
function each(arr,fn){
	for(var i=0;i<arr.length;i++){
		fn(arr[i],i);
	}
}

function output(item){
	console.log(item);
}

function output(item,index){
	console.log(item+':'+index);
}


//获取一个对象里面第一层元素的数量
function getObjectLength(obj){
		var count =0;
		for(p in obj){
			count++;

		}
		return count;

	}
	var obj = {
		a : 1,
		b : 2,
		c: {
			c1 :3,
			c2:4
		}
	};
	
	//判断是否为邮箱
	function isEmail(emailStr){
		var re = /^([0-9]|[a-z]|[A-Z])+@([0-9]|[a-z]|[A-Z])+.([0-9]|[a-z]|[A-Z])+$/;
		return re.test(emailStr);

	}
	//判断是否为手机号
	function isMobilePhone(phone){
		var re = /^(13|14|15|18)[0-9]{9}$/;
		return re.test(phone);
	}

	//为element增加一个样式名为newClassName的新样式
	function addClass(element,newClassName){
		if(element.className!=""){
			element.className=element.className+" "+newClassName;
		}else{
			element.className=newClassName;
		}
	}
	//移除element中的样式oldClassName
	function removeClass(element,oldClassName){
		if(element.className!=""){
			var newName="";
			var names = element.className.split(' ');
			for(var i=0;i<names.length;i++){
				if(names[i]!=oldClassName){
					newName+=names[i];
				}
			}
			element.className=newName;
		}
	}
	//判断element和siblingNode是否为同一个父元素下的同一级元素
	function isSiblingNode(element,siblingNode){
		var parent = element.parentNode;
		var chils = parent.childNodes;
		for(var i=0;i<chils.length;i++){
			if(chils[i]==siblingNode){
				return true;
			}
		}
		return false;
	}
	//获取element相对于浏览器窗口的位置
	 function getPosition(element){
    	var position = {};
    	var left = element.offsetLeft;
    	var top = element.offsetTop;
    	while(element.offsetParent!=null){
    		left+=element.offsetLeft;
    		top+= element.offsetTop;
    		element=element.offsetParent;
    	}
    	position.x=left;
    	position.y=top;
    	return position;
    }
    //实现一个简单Query
    function $(selector){
    	var first = selector.charAt(0);
    	//console.log(first);
    	if(first=='#'){
    		if(selector.indexOf('.')==-1){
    			var id = selector.substring(1);
    			return document.getElementById(id);
    		}
    		else{
    			var idAndName = selector.substring(1);
    			var idName = idAndName.split('.');
    			var idElement = document.getElementById(idName[0]);
    			var names = idElement.getElementsByClassName(idName[1]);
    			if(names!=null&&names.length>0){
    			return names[0];
    			}
    			return null;
    		}
    	}
    	else if(first=='.'){
    		var name = selector.substring(1);
    		var elements=document.getElementsByClassName(name);
    		if(elements!=null&&elements.length>0){
    			return elements[0];
    		}
    		return null;

    	}
    	else if(first=='['){
    		var str = selector.substring(1,selector.length-1);
    		//console.log(str);
    		if(str.indexOf('=')==-1){
    			var elements = document.getElementsByTagName('*');
    			for(var i=0;i<elements.length;i++){
    				//console.log(elements[i]);
    				var attr = elements[i].attributes;
    				for(var j=0;j<attr.length;j++){
    					
    					
    					var attrname=attr[j].name;
    					if(attrname==str){
    						return elements[i];
    					}
    				}
    			}
    			return null
    		}
    		else{
    			var str1=str.split('=');
    			console.log(str1[0]);
    			console.log(str1[1]);
    			var elements = document.getElementsByTagName('*');
    			for(var i=0;i<elements.length;i++){
    				var attr = elements[i].attributes;
    				for(var j=0;j<attr.length;j++){
    					var attrname=attr[j].name;
    					if(attrname==str1[0]&&elements[i].getAttribute(attrname)==str1[1]){
    						return elements[i];
    					}
    				}
    			}
    			return null

    		}

    	}
    	else{
    		var elements=document.getElementsByTagName(selector);
    		if(elements!=null&&elements.length>0){
    			return elements[0];
    		}
    		return null;
    		
    	}
    }
    //判断是否为IE浏览器
    function isIE(){
    	var name = navigator.appName;
    	if(name='Microsoft Internet Explorer'){
    		return navigator.appVersion;
    	}
    }
    //设置cookie
    function setCookie(cookieName,cookieValue,expiredays){
    	var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=cookieName+ "=" +escape(cookieValue)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString());


    }
    //获取cookie值
    function getCookie(cookieName){
    	if (document.cookie.length>0){
  			c_start=document.cookie.indexOf(cookieName + "=");
  			if (c_start!=-1){ 
    			c_start=c_start + c_name.length+1 ;
   		    	c_end=document.cookie.indexOf(";",c_start);
        		if (c_end==-1) c_end=document.cookie.length;
    				return unescape(document.cookie.substring(c_start,c_end));
    		} 
  		}
		return "";
    }
    function getValue(element){
        return element.value;
    }
