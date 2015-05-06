
	var	 btn1=$('#btn1'),
		 input1=$("#input1"),
		 f1=$('#f1'),
	   	 btn2=$('#btn2'),
		 input2=$('#input2'),
		 f2=$('#f2');
		 //第一阶段和第二阶段
	var p1=document.createElement('p');
	var fn1=function(){
		if(input1.value){
			var va1=uniqArray(input1.value.split(','));			
			f1.appendChild(p1);
			p1.innerHTML='您的爱好为:'+va1.join('||');
		}
		else{
			alert('请输入爱好')
		}
		input1.value='';
	}
	var fn2=function(){
		if(input2.value){
			var reg=/[\s;，,、；]/;
			var va2=uniqArray(input2.value.split(reg));
			console.log(va2);
			f2.appendChild(p1);
			p1.innerHTML='您的爱好为:'+va2.join('||');
		}
		else{
			alert('请输入爱好')
		}
		input2.value='';
	}	
	//第三阶段
	var      btn3=$('#btn3'),
	           input3=$('#input3'),
		 p2=$('#p2'),
		 show=$('#show');
	var reg=/[\s,，；;、]+/;
	//文本框的onkeyup事件的响应函数
	var fn3=function(){
		var va=uniqArray(trim(input3.value).split(reg));//对字符串去重去两边空格
		var i=va.length;
		if(i>10){
			p2.innerHTML='爱好不能超过10个';
			p2.style.display='block';
			btn3.setAttribute('disabled','disabled');
		}
		else{
			p2.style.display='none';
			btn3.removeAttribute('disabled');			
		}
	}
	//按钮的click响应事件
	var fn4=function(){
		if(input3.value){
		var str='';
		var vi=uniqArray(trim(input3.value).split(reg));
		//添加cheneck和label
		for(var i=0;i<vi.length;i++){
			 str += '<label><input type="checkbox">'+vi[i]+'</label>';
		}
		show.innerHTML=str;
	}
	else{
		p2.innerHTML='您需要输入爱好';
		p2.style.display='block';
	}
	input3.value='';
	}
	$.click(btn1,fn1);
	$.click(btn2,fn2);
	$.on(input3,'keyup',fn3);
	$.click(btn3,fn4);

