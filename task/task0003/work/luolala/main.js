

var model={
     id:0,
     getTaskIndex:function(){
          return ++model.id;
 }
};

function Category(name,categoryIndex){
    this.name=name;
    this.categoryIndex=categoryIndex;
    this.tasks={};
}

Category.prototype.addCategory=function(name) {
    if (name!='') {//写成！name为什么不对？？
        console.log('增加分类执行！');
        var theNew = document.createElement('li');
        theNew.className = 'categoryList';
        $(".container").getElementsByTagName('ul')[0].appendChild(theNew);
        theNew.innerHTML = name;
        var theSpan=document.createElement('span');
        theSpan.className='unfinishedCount';
        theSpan.innerHTML='()';
        var theA = document.createElement('a');
        theA.style.href="#";
        theA.className = 'deleteCategory';
        theNew.appendChild(theSpan);
        theNew.appendChild(theA);
        var previous=get_previoussibling(theNew);
     if(previous)
        {
            theNew.setAttribute("categoryIndex",parseInt(previous.getAttribute("categoryIndex"))+1);
        }
        else{
            theNew.setAttribute("categoryIndex",1);
        }
        console.log(theNew.getAttribute("categoryIndex"));
        return theNew;
    }
};
Category.prototype.saveCategory=function(category){
   localStorage.setItem('categoryList',category);
};
Category.prototype.deleteCategory=function(){
    localStorage.removeItem('categoryList',category);
};
Category.prototype.getCategory=function() {
    var name = prompt("请输入名称");
    //console.log(name==null);//如果不输入为什么显示为false;在点击取消的时候返回null；null和''应该不是一样的
    if (name == '' || name.length >= 10) {
        alert("请输入1或10个字符");
    }
    else if (name !== null) {
        return name;
    }

    return'';
};

Category.prototype.AddDescription=function(){
    $(".taskDescription").style.display='block';

};

function Task(name,date,content,taskIndex){
    this.name=name;
    this.date=date;
    this.content=content;
    this.taskIndex=taskIndex;
    this.finished=false;
}
var controller=(function()
{

 function addCate(){
        var theNew=new Category();
        var name=theNew.getCategory();
        theNew.addCategory(name);

    }
 function deleteCategory(){
     var parent=this.parentElement;
     var containerUl=$('.container').getElementsByTagName('ul')[0];
     console.log(parent);
     if(parent==$('.default'))
       alert('默认分类不能删除~');
     else if(confirm('确定删除此分类吗？')&&parent!==$('.default'))

     {
         containerUl.removeChild(parent);
      var taskArray=parent.getAttribute('tasks').split(',');
     for(var i= 0,len=taskArray.length;i<len;i++)
     {
         localStorage.removeItem(taskArray[i]);
         $('.taskList').innerHTML='';
         $('.perTask').style.display='none';
     }
     }

 }
 function addTask(){
        var current=$('.active');
        removeClass(current,'active');
        var taskDes=$(".taskDescription");
        var categorys=$('.clicked');
        if(!categorys){
            alert("添加任务前请先选择分类！")
        }
        else{
        taskDes.style.display='block';
       $('.perTask').style.display='none';
 }

}
 function getTask(name,date,content,taskIndex){
      return new Task(name,date,content,taskIndex);
 }
 function compareDate(a, b) {    //日期比较
        var arr = a.split("-");
        var starttime = new Date(arr[0], arr[1], arr[2]);
        var starttimes = starttime.getTime();

        var arrs = b.split("-");
        var lktime = new Date(arrs[0], arrs[1], arrs[2]);
        var lktimes = lktime.getTime();

        if (starttimes >= lktimes)
             return false;
        else
            return true;

    }
 function saveTask(){

        if(checkTitle($('.taskTitle').value)&&checkDate($('.taskDate').value))
        {
        var existence=$('.active');
         removeClass(existence,'active');
         console.log(existence);

       var selectedCategory=$('.clicked');
        console.log(selectedCategory);
        var tasksList=(selectedCategory.getAttribute("tasks"));
        if(selectedCategory) { //判断是否已经选择分类
            if(!existence||!tasksList)    //判断是已经存在的任务还是新增的任务以及是否是在前一个分类已经点击了taskList中的p之后在新
             {   console.log('不存在的情况');//增的分类下保存任务
                var index=model.getTaskIndex();
                var task=getTask($('.taskTitle').value,$('.taskDate').value,$('.taskDe').value,index);
                var key="taskList_"+index;
                localStorage.setItem(key,JSON.stringify(task));//不用JSON.stringify()则taskList为空；

                if(tasksList)
            {
                var tasksArray=tasksList.split(',');
                var lastDate=JSON.parse(localStorage.getItem(tasksArray[tasksArray.length-1])).date;//获得tasks属性中的taskList中的最后一个
                 if(compareDate(lastDate,task.date))                                                 //task的时间，将其与新添加的任务日期比较，根据
                         selectedCategory.setAttribute("tasks", selectedCategory.getAttribute("tasks") +','+ key);//任务日期，对tasks中的taskList进行升序排列
                 else
                        selectedCategory.setAttribute("tasks", key+','+selectedCategory.getAttribute("tasks"));
            }
                else{
                   selectedCategory.setAttribute("tasks",key);
                 }
               selectedCategory.getElementsByTagName('span')[0].innerHTML='('+countUnfinishedTask(selectedCategory)+')';
        }
        else{    //编辑已经存在的任务并保存
                console.log('此处执行');
                //var current=$('.active');
                var currentTask=existence.getAttribute('taskId');
               console.log(existence);
                console.log(currentTask);
                console.log(localStorage.getItem(currentTask));
                console.log(localStorage[currentTask]);
                console.log(localStorage[currentTask].finished);
                 localStorage[currentTask]=JSON.stringify({

                   name:$('.taskTitle').value,
                   date:$('.taskDate').value,
                   content:$('.taskDe').value,
                   taskIndex:JSON.parse(localStorage[currentTask]).taskIndex,
                   finished:JSON.parse(localStorage[currentTask]).finished
                });
                console.log(localStorage.getItem(currentTask));
                /*.name=$('.taskTitle').value;
                localStorage.currentTask.date=$('.taskDate').value;
                localStorage.currentTask.content=$('.taskDe').value;*/
            }
        }

            countAllTask();
            cancel();

        }
    }
 function countUnfinishedTask(category){//每个分类未完成的任务
       var tasks=category.getAttribute('tasks');
     var count=0;
     if(tasks) {
         var taskArray = tasks.split(',');

         for (var i = 0, len = taskArray.length; i < len; i++) {

             if (JSON.parse(localStorage.getItem(taskArray[i])).finished == false) {
                 ++count;

             }
         }
     }
           return count;
       }
 function countAllTask(){    //计算所有未完成的任务
        var liArray=$('.container').getElementsByTagName('li');
        var allCount=0;
        for(var i= 0,len=liArray.length;i<len;i++)
        {
            allCount+=countUnfinishedTask(liArray[i]);
        }
        $('.allTask').innerHTML='('+allCount+')';
        console.log('所有任务');
    }

 function cancel(){
        $(".taskDescription").style.display='none';
        $('.taskTitle').value='';
        $('.taskDate').value='';
        $('.taskDe').value='任务描述';
    }

 function showTask(element){
        //console.log(element);
        var selectedCategory=$('.clicked');
        var html=[];
        if(!selectedCategory){
             selectedCategory=$('.container').getElementsByTagName('ul')[0].getElementsByTagName('li')[0];
        }
        var task=selectedCategory.getAttribute('tasks');
        var taskArray=task.split(",");
        var elementName=element.className;
        var spans=$('.finishOrNot').getElementsByTagName('span');
        for(i=0,len=spans.length;i<len;i++)
        {
            spans[i].style.backgroundColor='';
        }
        element.style.backgroundColor='#edcfd3';
        console.log(elementName);
        console.log(element);
        console.log(taskArray);
        $('.taskList').innerHTML='';
        for(var i= 0,len=taskArray.length;i<len;i++)
        {
            var taskContent;

            if(elementName=='unFinished')
            {
                 if(!JSON.parse(localStorage.getItem(taskArray[i])).finished)
                  taskContent=JSON.parse(localStorage.getItem(taskArray[i]));
                  else continue;
              }
            else if(elementName=='finished')
            {
                console.log('finished');
                if(JSON.parse(localStorage.getItem(taskArray[i])).finished)
                {console.log('zaici');
                   taskContent=JSON.parse(localStorage.getItem(taskArray[i]));}
                else continue;
            }
            else{
                taskContent=JSON.parse(localStorage.getItem(taskArray[i]));

            }

            html.push('<h4>'+taskContent.date+'</h4>');
            html.push('<p'+'  taskId='+'"'+'taskList_'+taskContent.taskIndex+'"'+'>'+taskContent.name+'</p>');
           console.log('taskList_'+taskContent.taskIndex);
           $('.taskList').innerHTML=html.join('');

         console.log(selectedCategory.getAttribute('tasks'));
        console.log(taskContent);
}
    }
 function completeTask(){
        var perTask=$('.perTask');
        var currentTask=$('.active');
       var selectedCategory=$('.clicked');
        var currentTaskList=currentTask.getAttribute('taskId');
        if(confirm('确认完成任务吗？'))
        {
            console.log('完成任务执行');
            console.log(JSON.parse(localStorage[currentTaskList]).finished);
            localStorage[currentTaskList]=JSON.stringify({

                name:JSON.parse(localStorage[currentTaskList]).name,
                date:JSON.parse(localStorage[currentTaskList]).date,
                content:JSON.parse(localStorage[currentTaskList]).content,
                taskIndex:JSON.parse(localStorage[currentTaskList]).taskIndex,
                finished:true
            });
            selectedCategory.getElementsByTagName('span')[0].innerHTML='('+countUnfinishedTask(selectedCategory)+')';
            countAllTask();//重新计算在此分类下未完成的任务数和总的未完成任务数
            $('.taskDescription').style.display='none';
            perTask.style.display='block';



        //perTask.getElementsByTagName('h4')[0].value=$('.taskTitle').value;
       // perTask.getElementsByTagName('h5')[0].value=$('.taskDate').value;
        //perTask.getElementsByTagName('p')[0].value=$('.taskDe').value;
        }
     }
 function editTask(){//点击编辑时的状态
        var perTask=$('.perTask');
        var current=$('.active');
        var currentTask=JSON.parse(localStorage.getItem(current
            .getAttribute('taskId')));
        console.log(currentTask);
        console.log(currentTask.name);
        console.log(currentTask.date);
        console.log(currentTask.content);
        perTask.style.display='none';
        $('.taskDescription').style.display='block';
        $('.taskTitle').value=currentTask.name;
        $('.taskDate').value=currentTask.date;
        $('.taskDe').value=currentTask.content;
        //$('.saveOrNot').setAttribute('exist',true);
     }
 function checkTitle(title){
     var newTitle=trim(title);
     if(!newTitle||newTitle.length>20)
     {
         alert("标题内容请控制在1~20个字符内！");
      return false;
     }
     return true;
 }
  function checkDate(date){
      var dateArray=date.split('-');
      var reg=/\d{4}-\d{2}-\d{2}/;
      if(!reg.test(date))
      {
        alert('请按规定格式输入日期！');
       return false;
      }
       else if(dateArray[0]<1990||dateArray[0]>2020||dateArray[1]<1||dateArray[1]>12||dateArray[2]<1||dateArray[1]>30)
      {
          alert('请输入正确的日期！');
          return false;
      }
      return true;
  }

  function getClickStatus(){  //点击分类时的状态
        var parent=$(".container");
        var child=parent.getElementsByTagName('ul')[0].getElementsByTagName('li');
        for(var i= 0,len=child.length;i<len;i++)
        {
            removeClass(child[i],'clicked');
        }
        addClass(this,'clicked');
        showTask($('.all'));
     }

    function taskDetail(element){
        console.log('执行');
        var tasks=$('.taskList').getElementsByTagName('p');
        for(var i= 0,len=tasks.length;i<len;i++)
        {
            removeClass(tasks[i],'active');
        }
        addClass(element,'active');
        $('.perTask').style.display='block';
        var task=JSON.parse(localStorage.getItem(element.getAttribute('taskId')));
        var html=[];
        html.push('<h4>'+task.name+'<span class="edit">'+'</span>'+'<span class="complete">'+'</span>'+'</h4>');
        html.push('<h5>'+task.date+'</h5>');
        html.push('<p>'+task.content+'</p');
        $('.perTask').innerHTML=html.join('');
    }
  return {
      run: function () {

          addClickEvent($(".addCategory"), addCate);
          addClickEvent($(".addTask"), addTask);
          addClickEvent($(".saveOrNot"), saveTask);
          addClickEvent($(".cancelOrNot"), cancel);
          addClickEvent($('.all'), function () {
              showTask($('.all'));
          }); //这里直接写addClickEvent($('.unFinished'),showTask($('.unFinished')));是不对的！！！这是为什么？
          addClickEvent($('.finished'), function () {
              showTask($('.finished'))
          });
          addClickEvent($('.unFinished'), function () {
              showTask($('.unFinished'))
          });
          delegateEvent($('.container'), 'li', 'click', getClickStatus);
          delegateEvent($('.taskList'), 'p', 'click', function () {
              var that = this;
              taskDetail(that);
              addClickEvent($('.complete'), completeTask);
              addClickEvent($('.edit'), editTask);
          });
          delegateEvent($('.container'), 'a', 'click', deleteCategory)
      }

  }


})();

controller.run();

