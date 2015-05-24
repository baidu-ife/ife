//写的好混乱 虽然功能基本写出来了 但是代码一团糟根本不具备可读性
window.onload=function(){
var newwrap=$('.newwrap').getElementsByTagName('span');//新建分类
var alertDiv=$('#alertDiv');//新建分类弹出层
var mask=$('#mask');//遮蔽层
var cancle=$('#cancle');
var ensure=$('#ensure');
var catalog=$('#catalog');
var list=$('#list');//分类列表
var arr=$('#list').getElementsByTagName('li');
var mainLeft=$('.mainLeft');
//把本地存储的分类目录字符串转成节点
function init(){
	var strr='';
	var obo=getStorage('file');
	if(obo){
	for(var i=0;i<obo.length;i++){
		var listr='';
		if(obo[i].children.length){
		for(var j=0;j<obo[i].children.length;j++){
		listr+='<div class='+'smortdiv'+'><span>'+obo[i].children[j]+'</span><img src="img/c5.jpg" class="dell"></div>';
		}
	}
		strr+='<li><span class='+'listspan'+'>'+obo[i].name+'</span><img src="img/c5.jpg" class="del">'+listr+'</li>';
		list.innerHTML=strr;
	}
}
		
}
//弹出自建浮层和遮蔽层
$.click(newwrap[0],function(){
	catalog.value='';
	alertDiv.style.display='block';
	mask.style.display='block';	
})
//自建浮层里的取消操作
$.click(cancle,function(){
	alertDiv.style.display='none';
	mask.style.display='none';
})
if(getStorage('file')){
		var file=getStorage('file');
		file.key='file';
	}
	else{
		var file=[];
		file.key='file';
		file.push({
		'name': '默认分类()',
		'children': []
	})
		file.push({
			'name': 'IFE()',
			children: []
		})
		saveStorage(file);
	}
	init();
//自建浮层里的确定操作增加目录或者子目录
$.click(ensure,function(){
	var newcatalog=catalog.value;
	alertDiv.style.display='none';
	mask.style.display='none';
	if($('.active')){
		var ss=$('.active').getElementsByTagName('span');
		var obj=getStorage('file');
		for(var i=0;i<obj.length;i++){
			if(obj[i].name==ss[0].innerText&&ss[0].innerText!='默认分类()'){
				obj[i].children.push(newcatalog+'()');
			}
		}
		obj.key='file';
		saveStorage(obj);
	}
	else{
		file.push({
			'name': newcatalog+'()',
			'children': [],
		})
		saveStorage(file);
}
init();
})
//为点击增加背景 可以用来识别增加目录或者子目录
var ondisplay=true;
var onli='';
var divarr=document.getElementsByTagName('div');
$.on(mainLeft,'click',function(e){
	e=window.e||e;
	var target=e.target||e.srcElement;
	if(target!=newwrap[0]){
		for(var i=0;i<arr.length;i++){
		removeClass(arr[i],'active');
	}
	for(var i=0;i<divarr.length;i++){
		removeClass(divarr[i],'active');
	}
	}
	if(target.className.toLowerCase()=='listspan'){
		 onli=target.parentNode;
		  addClass(onli,'active');
	}
	else if(target.nodeName.toLowerCase()=='li'){
		 onli=target;
		  addClass(onli,'active');
	}
	else if(target.parentNode.className.toLowerCase()=='smortdiv'){
		onli=target.parentNode;
		addClass(onli,'active');
	}
	 else if(target.className.toLowerCase()=='smortdiv'){
		onli=target;
		addClass(onli,'active');
	}
	show();
})
//增加点击隐藏和显示子目录
 $.click(list,function(e){
 	e=window.e||e;
 	var tar=e.target||e.srcElement;
 	var ee;
 	 if(tar.className.toLowerCase()=='listspan'){
		 ee=tar.parentNode;	  
	}
	 if(tar.nodeName.toLowerCase()=='li'){
		 ee=tar;
	}
	if(ee==onli){
	 	var smortdivs=onli.getElementsByTagName('div');
	 	if(ondisplay){
	 	for(var j=0;j<smortdivs.length;j++){
	 		smortdivs[j].style.display='none';
	 	}
	 	ondisplay=false;
	 }
	 	else{
	 		if(ondisplay){
	 			for(var j=0;j<smortdivs.length;j++){
	 			smortdivs[j].style.display='none';
	 			}
	 		ondisplay=false;
	 		}
	 		else if(!ondisplay){
	 			for(var j=0;j<smortdivs.length;j++){
	 			smortdivs[j].style.display='block';
	 			}
	 			ondisplay=true;
	 		}
	 	}

	 }
	 
})
 //增加删除事件
$.click(list,function(e){
	e=e||window.e;
	var target=e.srcElement||e.target;
	var dele='';
	var filee=getStorage('file');
	filee.key='file';
	if(target.className.toLowerCase()=='del'){
		alert('文件夹下面所有的数据都会被删除哦?');
		dele=target.parentNode;
		dele.parentNode.removeChild(dele);
		var parentname=dele.getElementsByTagName('span');
		var stora=window.localStorage;
			for(var j=0;j<parentname.length;j++){
				for(var i=0;i<stora.length;i++){
					var obj=getStorage(stora.key(i));
				if(obj.parentname==parentname[j].innerText){
					localStorage.removeItem(stora.key(i));
				}
			}
		}
		for(var g=0;g<filee.length;g++){
			if(filee[g].name==parentname[0].innerText){
				filee.splice(g,1);
			}	
		}
		saveStorage(filee);
	}
	else if(target.className.toLowerCase()=='dell'){
		dele=target.parentNode;
		dele.parentNode.removeChild(dele);
		var stora=window.localStorage;
		for(var i=0;i<stora.length;i++){
		var obj=getStorage(stora.key(i));
			if(obj.parentname==dele.innerText){
				localStorage.removeItem(stora.key(i));
			}
		}
		for(var h=0;h<filee.length;h++){
			var children=filee[h].children;
			for(var f=0;f<children.length;f++){
				if(children[f]==dele.innerText){
					children.splice(f,1);
				}
			}
		}
		saveStorage(filee);
	}
})
//新增任务操作
var inTitle=$('#inTitle');
var inTime=$('#inTime');
var articler=$('.articler');
var secSpan=$('#secWrap').getElementsByTagName('span');
var mainBottom=$('#mainBottom');
var storage=$('#storage');
var remove=$('#remove');
$.click(secSpan[0],function(e){
	if($('.active')){
	block();
	empty();
	inTitle.focus();
	var date = [];
	var nowDate = new Date();
	date.push(nowDate.getFullYear());
	var nowmonth=nowDate.getMonth() + 1;
	date.push(transform(nowmonth));
	var nowDate=nowDate.getDate();
	date.push(transform(nowDate));
	var placeholder = date.join('-');
	inTime.value = placeholder;
}
else{
	alert('请选择分类再添加任务');
}
	function transform(num){
		if(num<10){
			num="0"+num;
			return num;
		}
		return num;
	}
})
//任务保存操作
$.click(storage,function(){
	var reg = /^(\d{4})-(\d{2})-(\d{2})$/;
	var isdate=reg.exec(inTime.value);
	var data={};
	var parentname=$('.active').getElementsByTagName('span');
	if (inTitle.value=='') {
		inTitle.value='你的任务居然木有标题~~~~';
		return;
	}
	else if(articler.value==''){
		articler.value='这是个无意义的任务唉。。。';
		return;
	}
	else if(!isdate){
		inTime.value='日期格式要YYYY-MM-MM';
	}
	else{
		data.Title=inTitle.value;
		data.timer=inTime.value;
		data.articler=articler.value;
		data.parentname=parentname[0].innerHTML;
		data.key=inTime.value+inTitle.value;
		data.situation='false';
		saveStorage(data);
		if($('.centeractive')){
		var ss=$('.centeractive').parentNode.getElementsByTagName('dt')[0];
		var key=ss.innerHTML+$('.centeractive').innerText;
		window.localStorage.removeItem(key);
	}
		empty();
		remo();
		show();
	}
})
//初始化任务
function initdata(){
	var indata={};
	indata.Title='Task0003';
	indata.timer='2015-05-22';
	indata.articler='完成但是代码不具有可读性呀';
	indata.parentname='IFE()';
	indata.situation='finish';
	indata.key=indata.timer+indata.Title;
	saveStorage(indata);
}
initdata();
$.click(remove,remo);
$.click(remove,empty);
function saveStorage(obj){	
	var str=JSON.stringify(obj);
	localStorage.setItem(obj.key,str);	
}
function getStorage(str){
	return JSON.parse(window.localStorage.getItem(str));
}
function empty(){
	inTime.value='';
	inTitle.value='';
	articler.value='';
}
function remo(){
	inTime.setAttribute("disabled", "disabled");
	inTitle.setAttribute("disabled", "disabled");
	articler.setAttribute('disabled','disabled');
	mainBottom.style.display='none';
	inTime.style.border='none';
	inTitle.style.border='none';
}
function block(){
	inTitle.removeAttribute('disabled');
	inTime.removeAttribute('disabled');
	articler.removeAttribute('disabled');
	mainBottom.style.display='block';
	inTime.style.border='1px solid #D8D2D2';
	inTitle.style.border='1px solid #D8D2D2';
}
//主函数 展示中间栏和右边栏
function show(){
	var cata=[];
	if($('.active')){
		var parentname=$('.active').getElementsByTagName('span');
		var stora=window.localStorage;
		if(stora){
		for(var i=0;i<stora.length;i++){
			var ss=getStorage(stora.key(i));
			for(var j in ss){
				for(var g=0;g<parentname.length;g++){
				if(ss[j]==parentname[g].innerHTML){
					cata.push(ss);
				}
			}
			}
		}
	}
		if(cata.length!=0){
			var str='';
			var hash={};
			for(var i=0;i<cata.length;i++){
				if(swith==1){
			if(cata[i].situation=='finish'){
			hash[cata[i].timer]+="<dd class='ddfinish'>"+cata[i].Title+'<img src="img/c5.jpg" class="dddel"></dd>';
			hash[cata[i].timer]=hash[cata[i].timer].replace('undefined','');
			}
			else{
			hash[cata[i].timer]+="<dd>"+cata[i].Title+'<img src="img/c5.jpg" class="dddel"></dd>';
			hash[cata[i].timer]=hash[cata[i].timer].replace('undefined','');
			}
			}
			else if(swith==2){
				if(cata[i].situation=='false'){
			hash[cata[i].timer]+="<dd>"+cata[i].Title+'<img src="img/c5.jpg" class="dddel"></dd>';
			hash[cata[i].timer]=hash[cata[i].timer].replace('undefined','');
				}
			}
			else if(swith==3){
			if(cata[i].situation=='finish'){
			hash[cata[i].timer]+="<dd class='ddfinish'>"+cata[i].Title+'<img src="task0003/img/c5.jpg" class="dddel"></dd>';
			hash[cata[i].timer]=hash[cata[i].timer].replace('undefined','');
			}
			}
			}
		for(var j in hash){
			str+='<dl><dt>'+j+hash[j]+'</dt></dl>';
		}
		$('#showdl').innerHTML=str;
	}
	else{
		$('#showdl').innerHTML='';
	}
	swith=1;
}
	else{
		return;
	}

}
//点击目录展示SHOW()函数
var maincenter=$('#maincenter');
$.on(maincenter,'click',function(e){
	e=e||window.e;
	var target=e.target||e.srcElement;
	var ddarr=maincenter.getElementsByTagName('dd');
	for(var i=0;i<ddarr.length;i++){
		removeClass(ddarr[i],'centeractive');
	}
	if(target.nodeName.toLowerCase()=='dd'){
		addClass(target,'centeractive');
	}
	showmain();
	if(target.className.toLowerCase()=='dddel'){
		var obj=target.parentNode;
		var ss=obj.parentNode.getElementsByTagName('dt')[0];
		var key=ss.innerHTML+obj.innerText;
		window.localStorage.removeItem(key);
		show();
		empty();
		remo();
	}
})
function showmain(){
	if($('.centeractive')){
		var ss=$('.centeractive').parentNode.getElementsByTagName('dt')[0];
		var key=ss.innerHTML+$('.centeractive').innerText;
		var obj=getStorage(key);
		articler.value=obj.articler;
		inTime.value=obj.timer;
		inTitle.value=obj.Title;	
		remo();
	}
}
var edit=$('.edit');
$.click(edit,function(){
	if($('.centeractive')){
		block();
	}
	else{
		alert('请选择任务再修改');
	}
});
//完成任务
$.click($('.finish'),function(){
	if($('.centeractive')){
		alert('你确定完成任务吗?');
		var ss=$('.centeractive').parentNode.getElementsByTagName('dt')[0];
		var key=ss.innerHTML+$('.centeractive').innerText;
		var obj=getStorage(key);
		obj.situation='finish';
		saveStorage(obj);
		show();
	}
	else{
		alert('请选择你的任务');
	}
})
//中间栏上面所有 未完成 已完成
var swith=1;
$.click($('.newTop'),function(e){
	e=e||window.e;
	var target=e.srcElement||e.target;
	var array=$('.newTop').getElementsByTagName('a');
	for(var i=0;i<array.length;i++){
		array[i].style.background='';
	}
	if(target==array[0]){
		swith=1;
		show();
		target.style.background='#fff';
	}
	else if(target==array[1]){
		swith=2;
		show();
		target.style.background='#fff';
	}
	else if(target==array[2]){
		swith=3;
		show();
		target.style.background='#fff';
	}
})
}