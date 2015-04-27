window.onload=function(){
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
				element=element.getElementsByTagName(arr[i]);
				//alert("Tag selector!")
			}
			i++;
		}
		return element;
	}

	$("btn").click=function(){
		var string=$("btn").value
	}
}