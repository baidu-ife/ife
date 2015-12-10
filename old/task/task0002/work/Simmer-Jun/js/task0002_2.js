window.onload=function(){
	var click;
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
				element=element.getElementsByTagName(arr[i]);//返回所有匹配的标签元素
				//alert("Tag selector!")
			}
			i++;
		}
		return element;
	}
	var arr=[],nowBox;
	nowBox=$("#now span");//返回所有id为now下的span元素
	function nowTime(){
		var myDate=new Date();
		var i;
		arr[0]=myDate.getYear()+1900;
		arr[1]=myDate.getMonth()+1;
		arr[2]=myDate.getDate();
		arr[3]=myDate.getHours();
		arr[4]=myDate.getMinutes();
		arr[5]=myDate.getSeconds();
		for(i=0;i<6;i++){
			nowBox[i].innerHTML=arr[i]
		}
		setTimeout(nowTime,500);//定时500ms执行nowTime()
	}
	nowTime();

	function setTime(second){//输入相差秒数，返回数组，分别是倒计时的天数/小时数/分钟数/秒数
		var arr=[];
		var myDate=new Date();//新建日期对象 不能通过通过parseInt(second/(60*60)%24)获得的小时数
		arr[0]=parseInt(second/(24*60*60));//天
		arr[1]=24-myDate.getHours()-1;//小时 不知道为什么通过parseInt(second/(60*60)%24)获得的小时数一直出错
		arr[2]=parseInt(second/60%60);//分钟
		arr[3]=parseInt(second%60);//秒
		return arr;
	}
	$("#start").onclick=function(){
		var value=$("#date").value;
		var arr,desDay,i,month,day,second,darr;
		var reg=/^\d{4}-\d{2}-\d{2}$/;
		clearInterval(click);
		if(reg.test(value)){//简单的正则判断
			desDay=reg.exec(value)[0];
			arr=desDay.split('-');
			desDay=new Date(desDay);
			month=desDay.getMonth()-0+1;//number
			day=desDay.getDate()-0;//转为number
			if(month<10){
				month = '0' + month;
			}
			if(day<10){
				day= '0' + day
			}
			if(month==arr[1] && day==arr[2]){//判断实例化的日期对象中的月份与号是否等于正则取出的月份与号数
				for(i=0;i<3;i++){
					$("#des-day span")[i].innerHTML=arr[i];
				}
				var nowDate=new Date();
				second=(desDay.getTime()-nowDate.getTime())/1000;
				if(second<0){//当倒计时相比现在已经过去则停止计时
					clearInterval(click);
					alert("倒计时完毕!");
					return false;
				}
				click=setInterval(function(){//定时器
					var nowDate=new Date();
					//clearInterval(click);
					second=(desDay.getTime()-nowDate.getTime())/1000;//获得现在与目标时间相差的秒数
					if(second<=0){//倒计时完毕
						clearInterval(click);
						alert("倒计时完毕!");
					}
					darr=setTime(second);//set返回的数组分别是倒计时的天/小时/分钟/秒					//
					for(i=0;i<4;i++){
						$("#time span")[i].innerHTML = darr[i];//倒计时的时分秒时时更新在文档中
					}
				},500);
			} else{
				alert("请确认输入的时间格式：YYYY-MM-DD！");//否则输入时间格式有误 比如2022-22-12等
			}
		}else{
			alert("请注意输入的时间格式：YYYY-MM-DD！");
		}
	}

}