//===第一阶段===
$.click('#first button',function(evn){
	var hobby = $('#first input').value;
	var hobbyArr = uniqArray(hobby.split(','));
	var hobbyLi ='';
	each(hobbyArr,function(item,index){
		if(!item.match(/^\s*$/g)){
			hobbyLi+= '<p>' +item+'</p>';
		}
	});//去重去空
	$('#first .display').innerHTML =hobbyLi;
})
//===第二阶段===
$.click('#second button', function(evn){
	var hobby = $('#second textarea').value;
	var hobbyArr = uniqArray(hobby.split(/[\s\n,，;；、]/g));
	var hobbyLi ='';
	each(hobbyArr,function(item,index){
		if(!item.match(/^\s*$/g)){
			hobbyLi+= '<p>' +item+'</p>';
		}
	});
	$('#second .display').innerHTML =hobbyLi;
})
//===第三阶段===
$.on('#third textarea','keyup',function(evn){
	var evn=evn||window.event;
	var target =evn.target||evn.srcElement;
	var hobby=target.value;
	var error=$('#error');
	var btn=$('#third button');
	var hobbyArr = uniqArray(hobby.split(/[\s\n,，;；、]/g));
	var hobbyNum =hobbyArr.length;
	if(hobbyNum>=1&&hobbyNum<=10){
		btn.disabled=false;
		error.style.display='';
	}else{
		btn.disabled =true;
		error.style.display='block'
	}
});
$.click('#third button', function(evn){
	var hobby = $('#third textarea').value;
	var hobbyArr = uniqArray(hobby.split(/[\s\n,，;；、]/g));
	var hobbyLi ='';
	each(hobbyArr,function(item,index){
		if(!item.match(/^\s*$/g)){
			hobbyLi+="<div><label for='"+ index + "'>" + item +"<input id='" + index +"' type='checkbox'></label></div>";
		}
	});
	$('#third .display').innerHTML =hobbyLi;
})