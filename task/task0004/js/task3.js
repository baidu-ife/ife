// JavaScript Document
window.onload = function(){

	localStorage.clear();	
	var tasklist=new Array(3);
	var taskcount=0;
	var editlock = false; //当处于编辑状态时该变量将阻止用户进行无关操作
	var histask='';//新创建一个tasks时用来存储上一个任务变量
	var tasklistnum;
	var subclsnum;
	
	function init(){	
		datasave();
		$('#index').style.display = 'block';
		$('#clslist').style.display = 'none';
		$('#tasklist').style.display = 'none';
		$('#taskdetail').style.display = 'none';
		for(var i=0; i<tasklist.length;i++){
			var temp = tasklist[i];
			var newcls = loaditem(temp);
			$('#indexlist').appendChild(newcls);
		}
	}
	//事件代理
	$('#indexlist').addEventListener('touchstart', function(e){
		var e = e || window.event;
	  	var target = e.target || e.srcElement;
		$('#clslist').style.display = 'block';
		$('#index').style.display = 'none';
		var prnt = target.innerHTML.slice(0,-3);
		$('#head1').innerHTML = prnt;
		for(var i=0; i<tasklist.length;i++){
			if(prnt==tasklist[i].name)
				for(var j=0; j<tasklist[i].task.length;j++){
					var temp = addsubclass(tasklist[i].task[j]);
					$('#clslistul').appendChild(temp);
				}
		}
	}
	, false);
	
	$('#clslistul').addEventListener('touchstart', function(e){
		var e = e || window.event;
	  	var target = e.target || e.srcElement;
		$('#clslist').style.display = 'none';
		$('#tasklist').style.display = 'block';
		var prtname = $('#head1').innerHTML;
		var objname = target.innerHTML.slice(0,-3);
		$('#head2').innerHTML=objname;
		loadtaskliststyle(prtname,objname);
	}
	, false);
	
	$('#tasklistul').addEventListener('touchstart', function(e){
		var e = e || window.event;
	  	var target = e.target || e.srcElement;
		$('#tasklist').style.display = 'none';
		$('#taskdetail').style.display = 'block';
		var flag = target.childNodes[1].innerHTML;
		var temp = JSON.parse(localStorage.getItem(flag));
		$('#tasktittle').childNodes[1].innerHTML = temp.name;
		$('#head3').innerHTML=temp.name;
		$('#tasktittle').childNodes[2].innerHTML = temp.flag;
		$('#taskdate').childNodes[1].innerHTML = temp.date;
		$('#tasktext').childNodes[1].innerHTML = temp.text;
	}
	, false);

	
	function loaditem(taskobj){
		var newclass = document.createElement('li');
		newclass.className='project';
		var newdiv = document.createElement('div');
		newdiv.className= 'listcls';
		newclass.appendChild(newdiv);
		var tasklength=0;
		for(var j=0;j<taskobj.task.length;j++){
			tasklength = tasklength+taskobj.task[j].item.length;
			taskcount = taskcount+taskobj.task[j].item.length;
		}
		newdiv.innerHTML = taskobj.name+'('+tasklength+')';
		return newclass;
	}
	function addsubclass(obj){
		var newclass = document.createElement('li');
		newclass.className='listcls';
		var tasklength=obj.item.length;
		newclass.innerHTML = obj.name+'('+tasklength+')';
		return newclass;
	}
	
	function loadtaskliststyle(prt,obj){
		var childs=$('#tasklistul').childNodes;    
		for(var i=childs.length-1;i>=0;i--){    
			$('#tasklistul').removeChild(childs[i]);    
		}
		var clsname = prt;
		var taskname = obj;
		for(var i=0;i<tasklist.length;i++){
			if(tasklist[i].name==clsname){
				for(var j=0;j<tasklist[i].task.length;j++){
					if(tasklist[i].task[j].name==taskname){
						tasklistnum = i;
						subclsnum = j;
						for(var k=0;k<tasklist[i].task[j].item.length;k++){
							var temp = JSON.parse(localStorage.getItem(tasklist[i].task[j].item[k]));
							var newli = addtasks(temp);
							$('#tasklistul').appendChild(newli);
						}
					}
				}
			break;
			}
		}
	}
	function addtasks(temp){
		var newli = document.createElement('li');
		newli.className='listcls';
		newli.innerHTML = temp.name;
		if(temp.done==true) {newli.style.color = 'blue';}
		else{newli.style.color = 'red'};
		var flag = document.createElement('span');
		flag.innerHTML = temp.flag;
		flag.className = 'invis';
		newli.appendChild(flag);
		return newli;
	}
	
	$('#return3').addEventListener('touchstart', function(){
		$('#taskdetail').style.display = 'none';
		$('#tasklist').style.display = 'block';
	}
	, false);
	
	$('#return2').addEventListener('touchstart', function(){
		$('#tasklist').style.display = 'none';
		$('#clslist').style.display = 'block';
	}
	, false);
	
	$('#return1').addEventListener('touchstart', function(){
		var childs=$('#clslistul').childNodes;    
		for(var i=childs.length-1;i>=0;i--){    
			$('#clslistul').removeChild(childs[i]);    
		}
		$('#clslist').style.display = 'none';
		$('#index').style.display = 'block';
	}
	, false);
	
	
	function $(str){
		if(/^[a-z]{1,10}$/.test(str)){
			return document.getElementsByTagName(str); 
			}
		else{
			switch(str[0]){
			case "#":
				return document.getElementById(str.slice(1));
			case ".":
				return document.getElementsByClassName(str.slice(1));
			default: return;
			}
		}
	}
	function datasave(){
		tasklist[0]=new Object();
		tasklist[0].name = '百度IFE项目';
		tasklist[0].task = new Array(2);
		tasklist[0].task[0]=new Object();
		tasklist[0].task[0].name ='task1';
		tasklist[0].task[0].item = new Array(5);
		
		tasklist[0].task[0].item[0] = '000';
		var temp = new Object();
		temp.name = 'to-do-1';
		temp.date = '2014-04-28';
		temp.done = true;
		temp.text = '完成编码工作';
		temp.flag = '000';
		localStorage.setItem('000', JSON.stringify(temp));
		
		tasklist[0].task[0].item[1] = '001';
		temp.name = 'to-do-2';
		temp.date = '2014-04-28';
		temp.done = true;
		temp.text = '完成编码工作';
		temp.flag = '001';
		localStorage.setItem('001', JSON.stringify(temp));
		
		tasklist[0].task[0].item[2] = '002';
		temp.name = 'to-do-3';
		temp.date = '2014-05-03';
		temp.done = false;
		temp.text = '完成编码工作';
		temp.flag = '002';
		localStorage.setItem('002', JSON.stringify(temp));
		
		tasklist[0].task[0].item[3] = '003';
		temp.name = 'to-do-4';
		temp.date = '2014-05-17';
		temp.done = false;
		temp.text = '完成编码工作';
		temp.flag = '003';
		localStorage.setItem('003', JSON.stringify(temp));
		
		tasklist[0].task[0].item[4] = '004';
		temp.name = 'to-do-5';
		temp.date = '2014-05-27';
		temp.done = false;
		temp.text = '完成编码工作';
		temp.flag = '004';
		localStorage.setItem('004', JSON.stringify(temp));
		
		tasklist[0].task[1]=new Object();
		tasklist[0].task[1].name ='task2';
		tasklist[0].task[1].item = new Array(1);
		tasklist[0].task[1].item[0] = '010';
		temp.name = 'to-do-5';
		temp.date = '2014-03-21';
		temp.done = true;
		temp.text = '完成编码工作';
		temp.flag = '010';
		localStorage.setItem('010', JSON.stringify(temp));
		
		tasklist[1]=new Object();
		tasklist[1].name = '社团活动';
		tasklist[1].task = new Array();
		
		tasklist[2]=new Object();
		tasklist[2].name='默认分类'
		tasklist[2].task = new Array(1);
		tasklist[2].task[0]=new Object();
		tasklist[2].task[0].name ='task3';
		tasklist[2].task[0].item = new Array(3);

		tasklist[2].task[0].item[0] = '200';
		temp.name = 'job1';
		temp.date = '2014-05-28';
		temp.done = true;
		temp.text = '第一次完成编码工作';
		temp.flag = '200';
		localStorage.setItem('200', JSON.stringify(temp));
		
		tasklist[2].task[0].item[1] = '201';
		temp.name = 'job2';
		temp.date = '2014-05-03';
		temp.done = false;
		temp.text = '第二次完成编码工作';
		temp.flag = '201';
		localStorage.setItem('201', JSON.stringify(temp));
		
		tasklist[2].task[0].item[2] = '202';
		temp.name = 'job3';
		temp.date = '2014-04-17';
		temp.done = false;
		temp.text = '第三次完成编码工作';
		temp.flag = '202';
		localStorage.setItem('202', JSON.stringify(temp));
	}
	init();
}