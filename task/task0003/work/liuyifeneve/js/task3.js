// JavaScript Document
window.onload = function(){
	window.onresize = function(){
		screenadjst();
	}
	localStorage.clear();	
	var tasklist=new Array(3);
	var taskcount=0;
	var editlock = false; //当处于编辑状态时该变量将阻止用户进行无关操作
	var histask='';//新创建一个tasks时用来存储上一个任务变量
	var tasklistnum;
	var subclsnum;
	
	function init(){	
		datasave();
		for(var i=0; i<tasklist.length;i++){
			var temp = tasklist[i];
			var newcls = loaditem(tasklist[i]);
			$('#classify').appendChild(newcls);;
		}
		$('#allclass').childNodes[0].childNodes[0].innerHTML='所有分类'+'('+taskcount+')';
		$('#classify').childNodes[0].innerHTML='分类列表'+'('+taskcount+')';
		//增加默认分类
		var dftcls = tasklist[tasklist.length-1];
		for(var i=0; i<dftcls.task.length;i++){
			var temp = addsubclass(dftcls.task[i]);
			$('#dftcls').appendChild(temp);
			loadstyle($('#dftcls'),temp);
			if(i==0){
				subclsnum=0;
				var prtname = $('#dftcls').childNodes[0].childNodes[1].innerHTML.slice(0,-3);
				var objname = temp.childNodes[1].innerHTML.slice(0,-3);
				loadtask(prtname,objname);
			}
		}
		var temp = JSON.parse(localStorage.getItem('200'));
		$('#tasktittle').childNodes[1].innerHTML = temp.name;
		$('#taskdate').childNodes[1].innerHTML = '任务日期：'+temp.date;
		$('#tasktext').childNodes[1].innerHTML = temp.text;
		$('#tasktittle').childNodes[2].innerHTML='200';
		if(temp.done==false){
			$('#edit').style.display = 'inline';
			$('#finish').style.display = 'inline';

		}
		else{
			$('#edit').style.display = 'none';
			$('#finish').style.display = 'none';
		}
		tasklistnum = tasklist.length-1;
		screenadjst();
	}
	$('#addallcls').onclick=function(){
		var childsnum = $('#allclass').childNodes.length;
		if(childsnum>1){
			for(var i=1; i<childsnum;i++){
				$('#allclass').removeChild($('#allclass').childNodes[1]);
			}
		}
		else{
			for(var i=0;i<tasklist.length;i++){
				for(j=0;j<tasklist[i].task.length;j++){
					var newclass = document.createElement('ul');
					$('#allclass').appendChild(newclass);
					var temp = addsubclass(tasklist[i].task[j]);
					var newtag = document.createElement('em');
					newtag.innerHTML = tasklist[i].name;
					temp.appendChild(newtag);
					newclass.appendChild(temp);

					temp.onclick = function(){
						var prtname = this.childNodes[2].innerHTML;
						var objname = this.childNodes[1].innerHTML.slice(0,-3);
						loadtask(prtname,objname);
					}
				}
			}
		}
	}
	
	var addclass = $('#addclass');
	addclass.onclick = function(){
		$('#newclsname').value='';
		var delenum = $('#newselect').childNodes.length;
		for (var i=0;i<delenum;i++){
			$('#newselect').remove($('#newselect').childNodes[0]);
		}
		var dftoption = document.createElement('option');
		dftoption.innerHTML='新建一个一级分类';
		dftoption.setAttribute('select','selected');
		$('#newselect').appendChild(dftoption);
		for (var i=0;i<tasklist.length;i++){
			var newoption = document.createElement('option');
			newoption.innerHTML=tasklist[i].name;
			$('#newselect').appendChild(newoption);
		}
		$('#popBox').style.display='block';
		$('#mask').style.display='block';
	}
	
	$('#newconfirm').onclick = function(){
		var name = $('#newclsname').value;
		if(name == ''){
				alert('分类名称不能为空!');
				return;
			}
		if(confirm("保存新建分类？")){
			var clsindex = $('#newselect').selectedIndex;
			if(clsindex==0){
				var temp=new Object();
				temp.name = name;
				temp.task = new Array();
				tasklist.unshift(temp);
				var cls = loaditem(temp);
				$('#classify').insertBefore(cls,$('.project')[0]);	
			}
			else{
				var temp=new Object();
				temp.name = name;
				temp.item = new Array();
				tasklist[clsindex-1].task.unshift(temp);
			}
		}
		$('#popBox').style.display='none';
		$('#mask').style.display='none';
	}
	$('#newcancel').onclick = function(){
		if(confirm("退出新建分类？")){
			$('#popBox').style.display='none';
			$('#mask').style.display='none';
			return;
		}
	}
	
	function loaditem(taskobj){
		var newclass = document.createElement('ul');
		newclass.className='project';
		var newdiv = document.createElement('div');
		newdiv.className= 'item';
		newclass.appendChild(newdiv);
		var newimg = document.createElement('img');
		newimg.src = 'img/file.png';
		newimg.alt = 'file';
		newimg.setAttribute('width', '20px');
		newdiv.appendChild(newimg);
		var pjttag = document.createElement('span');
		var tasklength=0;
		for(var j=0;j<taskobj.task.length;j++){
			tasklength = tasklength+taskobj.task[j].item.length;
			taskcount = taskcount+taskobj.task[j].item.length;
		}
		pjttag.innerHTML = taskobj.name+'('+tasklength+')';
		newdiv.appendChild(pjttag);
		if(taskobj.name=='默认分类'){
			var btn = document.createElement('span');
			newclass.id= 'dftcls';
			newdiv.appendChild(btn);
		}
		else{
			var btn = document.createElement('input');
			btn.type = 'submit';
			btn.value = 'X';
			btn.className='delcls';
			newdiv.appendChild(btn);
		}
		addstyle(newdiv);
		return newclass;
	}

	function addsubclass(obj){
		var newclass = document.createElement('li');
		newclass.className='subclass';
		var newimg = document.createElement('img');
		newimg.src = 'img/text.png';
		newimg.alt = 'file';
		newimg.setAttribute('width', '15px');
		newclass.appendChild(newimg);
		var pjttag = document.createElement('span');
		var tasklength=obj.item.length;
		pjttag.innerHTML = obj.name+'('+tasklength+')';
		newclass.appendChild(pjttag);
		return newclass;
	}
	
	function loadstyle(prt,obj){
		obj.onclick = function(){ 
			var prtname = prt.childNodes[0].childNodes[1].innerHTML.slice(0,-3);
			var objname = obj.childNodes[1].innerHTML.slice(0,-3);
			loadtask(prtname,objname);
		}
	}
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
	$('#alltask').onclick = function(){
		var allitems = $('#tasks').childNodes;
		for(var i=0;i<allitems.length; i++){
			var subitem = allitems[i].childNodes;
			for(var j=0;j<subitem.length; j++){
				subitem[j].style.display = 'block';
			}
			allitems[i].style.display = 'block';
		}
	}
	$('#done').onclick = function(){
		var allitems = $('#tasks').childNodes;
		for(var i=0;i<allitems.length; i++){
			var subitem = allitems[i].childNodes;
			var ulcount=0;
			for(var j=1;j<subitem.length; j++){
				if(subitem[j].style.color == 'blue')
					subitem[j].style.display = 'block';
				else{
					subitem[j].style.display = 'none';
					ulcount = ulcount+1;
				}
			}
			if(ulcount == subitem.length-1) allitems[i].style.display = 'none';
			else allitems[i].style.display = 'block';
			
		}
	}
	$('#doing').onclick = function(){
		var allitems = $('#tasks').childNodes;
		for(var i=0;i<allitems.length; i++){
			var subitem = allitems[i].childNodes;
			var ulcount=0;
			for(var j=1;j<subitem.length; j++){
				if(subitem[j].style.color == 'red')
					subitem[j].style.display = 'block';
				else{
					subitem[j].style.display = 'none';
					ulcount = ulcount+1;
				}
			}
			if(ulcount == subitem.length-1) allitems[i].style.display = 'none';
			else allitems[i].style.display = 'block';
		}
	}
	$('#addtask').onclick = function(){
		if(editlock == true){
			if(confirm("确定退出当前编辑？")){editlock == false}
			else return;
		}
		histask = $('#tasktittle').childNodes[2].innerHTML;
		$('#tasktittle').childNodes[1].innerHTML = '任务标题：';
		$('#tasktittle').childNodes[2].innerHTML = '';
		$('#taskdate').childNodes[1].innerHTML = '任务日期：';
		$('#tasktext').childNodes[1].innerHTML = '';
		$('#edit').style.display = 'none';
		$('#finish').style.display = 'none';
		$('#edititle').style.display = 'inline';
		$('#edititle').setAttribute('value','请输入任务名称');
		$('#editdate').style.display = 'inline';
		$('#editdate').setAttribute('value','请以YYYY-MM-DD格式输入任务创建时间');
		$('#edittext').style.display = 'inline';
		$('#edittext').innerHTML = '请在此输入详细内容';
		$('#save').style.display = 'inline';
		$('#cancel').style.display = 'inline';
		$('#edititle').style.width = parseInt($('#textright').style.width)-150+'px';
		$('#editdate').style.width = parseInt($('#textright').style.width)-150+'px';
		$('#edittext').style.width = parseInt($('#textright').style.width)-50+'px';
		$('#edittext').style.height = '300px';
		editlock = true;
	}
	$('#edit').onclick = function(){
		var flag = $('#tasktittle').childNodes[2].innerHTML;
		var temp = JSON.parse(localStorage.getItem(flag));
		$('#tasktittle').childNodes[1].innerHTML = '任务标题：';
		$('#taskdate').childNodes[1].innerHTML = '任务日期：';
		$('#tasktext').childNodes[1].innerHTML = '';
		$('#edit').style.display = 'none';
		$('#finish').style.display = 'none';
		$('#edititle').style.display = 'inline';
		$('#edititle').setAttribute('value',temp.name);
		$('#editdate').style.display = 'inline';
		$('#editdate').setAttribute('value',temp.date);
		$('#edittext').style.display = 'inline';
		$('#edittext').innerHTML = temp.text;
		$('#save').style.display = 'inline';
		$('#cancel').style.display = 'inline';
		$('#edititle').style.width = parseInt($('#textright').style.width)-150+'px';
		$('#editdate').style.width = parseInt($('#textright').style.width)-150+'px';
		$('#edittext').style.width = parseInt($('#textright').style.width)-50+'px';
		$('#edittext').style.height = '300px';
		editlock = true;
	}
	$('#finish').onclick = function(){
		if(confirm("该任务已完成？")){
			var flag = $('#tasktittle').childNodes[2].innerHTML;
			var temp = JSON.parse(localStorage.getItem(flag));
			temp.done = true;
			localStorage.setItem(flag, JSON.stringify(temp));
			$('#edit').style.display = 'none';
			$('#finish').style.display = 'none';
			var tempul = $('#tasks').childNodes;
			for(var i=0; i<tempul.length;i++){
				var templi=tempul[i].childNodes;
				for(var j=1; j<templi.length;j++){
					if(flag == templi[j].childNodes[1].innerHTML){
						templi[j].style.color='blue';
						break;
					}
				}
			}
		}
	}
	$('#save').onclick = function(){
		histask='';
		editlock = false;
		var flag = $('#tasktittle').childNodes[2].innerHTML;
		var temp = JSON.parse(localStorage.getItem(flag));
		var Regdate = /^\d{4}-(0?\d|1[012])-(0?\d|[12]\d|3[01])$/;
		var temp = new Object;
		if($('#edititle').value.length>20){
			alert('任务名称应小于20个字');
			return;
		}
		else temp.name = $('#edititle').value;
		
		if(Regdate.test($('#editdate').value)){
			temp.date = $('#editdate').value;
		}
		else{
			alert('日期格式错误！');
			return;
		}
		if($('#edititle').value.length>500){
			alert('任务内容应小于500个字');
			return;
		}
		else temp.text = $('#edittext').value;
		temp.done = false;
		temp.flag = '202';
		//假如是新创建的，首先需要判定各个输入值的有效性，其次创建一个新的localStorage，再次将新创建的task加入到列表中
		if(flag == ''){
			var myDate = new Date()
			temp.flag = myDate.getYear().toString()+myDate.getMonth().toString()+myDate.getDate().toString()+myDate.getHours().toString()+myDate.getMinutes().toString()+myDate.getSeconds().toString();
			flag = temp.flag;
			localStorage.setItem(flag, JSON.stringify(temp));
		}
		else{
			temp.flag = flag;
			localStorage.setItem(flag, JSON.stringify(temp));
		}
		addinfo(flag);
		tasklist[tasklistnum].task[subclsnum].item.unshift(flag);
		loadtask(tasklist[tasklistnum].name,tasklist[tasklistnum].task[subclsnum].name);
		
		delnum = $('#classify').childNodes.length;
		for(var i=2; i<delnum;i++){
			$('#classify').removeChild($('#classify').childNodes[2]);;
		}
		
		for(var i=0; i<tasklist.length;i++){
			var temp = tasklist[i];
			var newcls = loaditem(tasklist[i]);
			$('#classify').appendChild(newcls);
		}
		$('#allclass').childNodes[0].childNodes[0].innerHTML='所有分类'+'('+taskcount+')';
		$('#classify').childNodes[0].innerHTML='分类列表'+'('+taskcount+')';
	}
	$('#cancel').onclick = function(){
		histask='';
		editlock = false;
		var flag = $('#tasktittle').childNodes[2].innerHTML;
		if(flag == ''){
			if(confirm("确定退出当前编辑？")) addinfo(histask);
		}
		else{
			addinfo(flag);
		}
	}
	function addstyle(ele){
		ele.onmousemove = function(){
			this.className = 'onitem';
			var delcls = this.childNodes[2];
			if(delcls.tagName=='INPUT'){
				delcls.onclick = function(){
					if(confirm("确定删除该分类？"))
					{
						var preNode = this.parentNode.childNodes[1].innerHTML.slice(0,-3);
						for(var i=0;i<tasklist.length;i++){
							if(preNode==tasklist[i]){
								tasklist.splice(i,1);
								break;
							}
						}
						var prtcls = this.parentNode.parentNode.parentNode;
						prtcls.removeChild(this.parentNode.parentNode);
					}
				}
			}
		}
		ele.onmouseout = function(){
			this.className = 'item';
		}
		ele.onclick = function(){
			var childs = this.parentNode.childNodes;
			var childsnum = childs.length;
			if(childsnum>1){
				for(var i=1; i<childsnum;i++){
					this.parentNode.removeChild(childs[1]);
				}
			}
			else{
				var prnt = this.childNodes[1].innerHTML.slice(0,-3);
				for(var i=0; i<tasklist.length;i++){
					if(prnt==tasklist[i].name)
						for(var j=0; j<tasklist[i].task.length;j++){
							var temp = addsubclass(tasklist[i].task[j]);
							this.parentNode.appendChild(temp);
							loadstyle(this.parentNode,temp);
						}
				}
			}
		}
	}
			
	function addEvent(ele,event,fn){
		var ele = ele||document;
		if(ele.addEventListener){
			
			ele.addEventListener(event,fn,false);
		}
		else if(ele.attachEvent){
			ele.attachEvent('on'+event,fn);
		}
		else{
			ele['on'+event]=fn;
		}
	}
	function loadtask(prt,obj){
		var childs=$('#tasks').childNodes;    
		for(var i=childs.length-1;i>=0;i--){    
			$('#tasks').removeChild(childs[i]);    
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
							if(k==0){
								var newul = createNewUL(temp);
								$('#tasks').appendChild(newul);
							}
							else{
								var dates = $('#tasks').childNodes;
								var aDate = temp.date.split('-');
								var oDate1 = new Date(aDate[0],aDate[1],aDate[2]);
								for(var m=0;m<dates.length;m++){
									var aDate2 = dates[m].childNodes[0].innerHTML.split('-');
									var oDate2 = new Date(aDate2[0],aDate2[1],aDate2[2]);
									var datejudge = oDate1-oDate2;
									if( datejudge==0){
										var newli = document.createElement('li');
										newli.className='task';
										dates[m].appendChild(newli);
										var lispan = document.createElement('span');
										lispan.innerHTML = temp.name;
										if(temp.done==true) {newli.style.color = 'blue';}
										else{newli.style.color = 'red'};
										newli.appendChild(lispan);
										var flag = document.createElement('em');
										flag.innerHTML = temp.flag;
										newli.appendChild(flag);
										addetail(newli);
									}
									else if(datejudge<0){
										var newul = createNewUL(temp);
										$('#tasks').insertBefore(newul,dates[m]);
										break;
									}
									else if(m==dates.length-1){
										var newul = createNewUL(temp);
										$('#tasks').appendChild(newul);
										break;
									}
								}
							}
						}
					}
				}
			break;
			}
		}
	}
	function createNewUL(temp){
		var newul = document.createElement('ul');
		newul.className='taskdate';
		var ulspan = document.createElement('span');
		ulspan.innerHTML = temp.date;
		newul.appendChild(ulspan);
		var newli = document.createElement('li');
		newli.className='task';
		newul.appendChild(newli);
		var lispan = document.createElement('span');
		lispan.innerHTML = temp.name;
		if(temp.done==true) {newli.style.color = 'blue';}
		else{newli.style.color = 'red'};
		newli.appendChild(lispan);
		var flag = document.createElement('em');
		flag.innerHTML = temp.flag;
		newli.appendChild(flag);
		addetail(newli);
		return newul;
	}
	function addetail(newli){
		newli.onclick = function(){
			if(editlock==false){
				var flag = this.childNodes[1].innerHTML
				addinfo(flag);
			}
			else{
				
				if(confirm('确定退出当前编辑？')){
					editlock = false;
					var flag = this.childNodes[1].innerHTML
					addinfo(flag);
				}
			}
		}
	}
	function addinfo(flag){
		var temp = JSON.parse(localStorage.getItem(flag));
		$('#tasktittle').childNodes[1].innerHTML = temp.name;
		$('#tasktittle').childNodes[2].innerHTML = temp.flag;
		$('#taskdate').childNodes[1].innerHTML = '任务日期：'+temp.date;
		$('#tasktext').childNodes[1].innerHTML = temp.text;
		$('#edititle').style.display = 'none';
		$('#editdate').style.display = 'none';
		$('#edittext').style.display = 'none';
		$('#save').style.display = 'none';
		$('#cancel').style.display = 'none';
		if(temp.done==false){
			$('#edit').style.display = 'inline';
			$('#finish').style.display = 'inline';

		}
		else{
			$('#edit').style.display = 'none';
			$('#finish').style.display = 'none';
		}
	}
	function screenadjst(){
		if(document.documentElement.clientHeight>537){
			$('#index').style.height = document.documentElement.clientHeight-57+'px';
			$('#tasks').style.height = document.documentElement.clientHeight-93+'px';
			$('#tasktext').style.height = document.documentElement.clientHeight-177+'px';
		}
		else{
			$('#index').style.height = '480px';
			$('#tasks').style.height = '444px';
			$('#tasktext').style.height = '360px';
		}
		if(document.documentElement.clientWidth>980){
			$('#textright').style.width = (document.documentElement.clientWidth-400+'px');
		}
		else{
			$('#textright').style.width = '580px';
		}
		$('#edititle').style.width = parseInt($('#textright').style.width)-150+'px';
		$('#editdate').style.width = parseInt($('#textright').style.width)-150+'px';
		$('#edittext').style.width = parseInt($('#textright').style.width)-50+'px';
	}
	function datasave(){
		tasklist[0]=new Object();
		tasklist[0].name = '百度IFE项目';
		tasklist[0].task = new Array(2);
		tasklist[0].task[0]=new Object();
		tasklist[0].task[0].name ='task1';
		tasklist[0].task[0].item = new Array(4);
		
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