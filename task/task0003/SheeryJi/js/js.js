/**
 * @author Administrator
 */
addEvent(window,"load",function(){
    var xmlDoc = checkXMLDocObj('xml/xml.xml');//读取到xml文件中的数据   xml不能save   所以数据不能最终保存
    //加载xml  显示界面
    var loadClass=function(){
    var classes=$("#js_class");
    var temp_str="";
    var nodelist=xmlDoc.getElementsByTagName("class");
    alert("加载中...");
    $("#root").innerHTML=xmlDoc.getElementsByTagName("root").item(0).getAttribute("name");
    for(var i=0;i<nodelist.length;i++){
        temp_str+=("<li class='li_class'>"+nodelist.item(i).getAttribute("name")+"（"+nodelist.item(i).getAttribute("number")+"）"+"</li>");
        var sub_temp_str="<ul class='ul_subclass' father='"+nodelist.item(i).getAttribute("name")+"'>";
        var subnodelist=nodelist.item(i).getElementsByTagName("subclass");
        for(var j=0;j<subnodelist.length;j++){
            sub_temp_str+=("<li>"+subnodelist.item(j).getAttribute("name")+"（"+subnodelist.item(j).getAttribute("number")+"）"+"</li>");
        }
        sub_temp_str+="</ul>";
        temp_str+=(sub_temp_str);
    }
    $("#js_class").innerHTML=temp_str;
    $("#sum").innerHTML=xmlDoc.getElementsByTagName("root").item(0).getAttribute("number");
    };
    
    //为每一个分类添加事件    当前所选分类被click_class所标识   
    var addclickevent=function(){
        var classes=$("#js_class").getElementsByTagName("li");
        for(i=0;i<classes.length;i++){
            addEvent(classes[i],"click",function(event){
                for(j=0;j<classes.length;j++){
                    classes[j].removeAttribute("id");
                }
                var nodelist=xmlDoc.getElementsByTagName("class");
                this.setAttribute("id","click_class");
                //显示分类中的任务  添加函数
                var display_ul=this.parentNode;
                var display_li=this;
                var display_name=display_li.firstChild.nodeValue;
                display_name=display_name.substr(0,display_name.indexOf("（"));
                if(display_ul.getAttribute("father")){
                    //处理二级分类的
                    for(var i=0;i<nodelist.length;i++){
                                 if(nodelist.item(i).getAttribute("name")==display_ul.getAttribute("father")){
                                    // console.log(nodelist.item(i).getAttribute("name"));
                                    var subnodelist=nodelist.item(i).getElementsByTagName("subclass");
                                    for(var k=0;k<subnodelist.length;k++){
                                        if(subnodelist.item(k).getAttribute("name")==display_name){
                                            var tasks=subnodelist.item(k).getElementsByTagName("task");
                                            var temp_ele;
                                            var temp_str="";
                                            $("#js_displaytask").innerHTML="";
                                             for(j=0;j<tasks.length;j++){
                                             temp_str="";
                                             temp_ele=document.createElement("div");
                                             temp_ele.setAttribute("class","usual_task");
                                             temp_str+=(tasks[j].getAttribute("date")+"<ul class='ul_task'>");
                                             if(tasks[j].getAttribute("status")=="已完成"){
                                                 temp_str+=("<li class='endding' id='task"+tasks[j].getAttribute("taskid")+"'>"+tasks[j].getAttribute("name")+"</li>");
                                             }else{
                                                 temp_str+=("<li id='task"+tasks[j].getAttribute("taskid")+"'>"+tasks[j].getAttribute("name")+"</li>");
                                             }
                                             temp_str+="</ul>";
                                             temp_ele.innerHTML=temp_str;
                                             $("#js_displaytask").appendChild(temp_ele);
                                             var task_look=document.getElementById("task"+tasks[j].getAttribute("taskid"));
                                             var task_title=tasks[j].getAttribute("name");
                                             var task_date=tasks[j].getAttribute("date");
                                             var task_content=tasks[j].childNodes[0].nodeValue;
                                             (function(title,date,content){
                                                  addClickEvent(task_look,function(){
                                                      document.getElementById("task_title").innerHTML=title;
                                                      document.getElementById("task_date").innerHTML=date;
                                                      document.getElementById("task_content").innerHTML=content;
                                                      var uls=$(".ul_task");
                                                      for(var p=0;p<uls.length;p++){
                                                          uls[p].setAttribute("id","");
                                                      }
                                                      this.parentNode.setAttribute("id","click_task");
                                                  });
                                             })(task_title,task_date,task_content);
                                             }
                                        }
                                        
                                        
                                    }
                                    
                                     
                                     //nodelist.item(i).parentNode.removeChild(nodelist.item(i));
                                     //readyWork();
                                 }
                     }
                 }else{
                     for(var i=0;i<nodelist.length;i++){
                         //处理一级分类的
                                 if(nodelist.item(i).getAttribute("name")==display_name){
                                    // console.log(nodelist.item(i).getAttribute("name"));
                                     var tasks=nodelist.item(i).getElementsByTagName("task");
                                     var temp_ele;
                                     var temp_str="";
                                     $("#js_displaytask").innerHTML="";
                                     for(j=0;j<tasks.length;j++){
                                         temp_str="";
                                         temp_ele=document.createElement("div");
                                         temp_ele.setAttribute("class","usual_task");
                                         temp_str+=(tasks[j].getAttribute("date")+"<ul class='ul_task'>");
                                         if(tasks[j].getAttribute("status")=="已完成"){
                                                 temp_str+=("<li class='endding' id='task"+tasks[j].getAttribute("taskid")+"'>"+tasks[j].getAttribute("name")+"</li>");
                                         }else{
                                                 temp_str+=("<li id='task"+tasks[j].getAttribute("taskid")+"'>"+tasks[j].getAttribute("name")+"</li>");
                                         }
                                         temp_str+="</ul>";
                                         temp_ele.innerHTML=temp_str;
                                         $("#js_displaytask").appendChild(temp_ele);
                                         var task_look=document.getElementById("task"+tasks[j].getAttribute("taskid"));
                                         var task_title=tasks[j].getAttribute("name");
                                         var task_date=tasks[j].getAttribute("date");
                                         var task_content=tasks[j].childNodes[0].nodeValue;
                                         (function(title,date,content){
                                             addClickEvent(task_look,function(){
                                                  document.getElementById("task_title").innerHTML=title;
                                                  document.getElementById("task_date").innerHTML=date;
                                                  document.getElementById("task_content").innerHTML=content;
                                                  var uls=$(".ul_task");
                                                  for(var p=0;p<uls.length;p++){
                                                      uls[p].setAttribute("id","");
                                                  }
                                                  this.parentNode.setAttribute("id","click_task");
                                              });
                                         })(task_title,task_date,task_content);
                                     }
                                     
                                     //nodelist.item(i).parentNode.removeChild(nodelist.item(i));
                                     //readyWork();
                                 }
                     }
                 }
                
             });
        }
    };
    
    //为每一个分类添加删除按钮
    var adddeleteevent=function(){
        var classes=$("#js_class").getElementsByTagName("li");
        var delete_button=document.createElement("img");
        delete_button.setAttribute("src","img/delete.jpg");
        delete_button.setAttribute("id","delete_button");
        for(i=0;i<classes.length;i++){
            addEvent(classes[i],"mouseover",function(){
                this.appendChild(delete_button);
                addEvent($("#delete_button"),"click",function(event){
                     var nodelist=xmlDoc.getElementsByTagName("class");
                     if($("#delete_button")){
                         var delete_ul=$("#delete_button").parentNode.parentNode;
                         var delete_li=$("#delete_button").parentNode;
                         var delete_name=delete_li.firstChild.nodeValue;
                         delete_name=delete_name.substr(0,delete_name.indexOf("（"));
                         if(delete_ul.getAttribute("father")){
                             for(var i=0;i<nodelist.length;i++){
                                 if(nodelist.item(i).getAttribute("name")==delete_ul.getAttribute("father")){
                                     var linodelist=nodelist.item(i).getElementsByTagName("subclass");
                                     for(var j=0;j<linodelist.length;j++){
                                         if(linodelist.item(j).getAttribute("name")==delete_name){
                                             if(confirm("该分类下有任务，是否确认删除？")){
                                                 
                                                 linodelist.item(j).parentNode.setAttribute("number",(linodelist.item(j).parentNode.getAttribute("number")-linodelist.item(j).getAttribute("number")));
                                                 xmlDoc.getElementsByTagName("root").item(0).setAttribute("number",(xmlDoc.getElementsByTagName("root").item(0).getAttribute("number")-linodelist.item(j).getAttribute("number")));
                                                 linodelist.item(j).parentNode.removeChild(linodelist.item(j));
                                                 readyWork();
                                             }
                                             
                                          }
                                    }
                                 }
                             }
                         }else{
                             for(var i=0;i<nodelist.length;i++){
                                 if(nodelist.item(i).getAttribute("name")==delete_name){
                                     if(confirm("该分类下有任务，是否确认删除？")){
                                         
                                         xmlDoc.getElementsByTagName("root").item(0).setAttribute("number",(xmlDoc.getElementsByTagName("root").item(0).getAttribute("number")-nodelist.item(i).getAttribute("number")));
                                         nodelist.item(i).parentNode.removeChild(nodelist.item(i));
                                         readyWork();
                                     }
                                     
                                 }
                             }
                        }
                     }
                     //event.stopPropagation();
                }); 
             });
        }
        //为删除按钮添加功能
    };
    
    var readyWork=function(){
        loadClass();
        addclickevent();
        adddeleteevent();
    };
    readyWork();
    //为添加按钮添加单击函数
    addEvent($("#js_addclass"),"click",function(){
        if($("#click_class")){
            var classname=window.prompt("请输入添加分类名称","");
            var newclass=xmlDoc.createElement("subclass");
            newclass.setAttribute("name",classname);
            newclass.setAttribute("number","0");
            var father=$("#click_class").firstChild.nodeValue;
            father=father.substr(0,father.indexOf("（"));
            var nodelist=xmlDoc.getElementsByTagName("class");
            for(var i=0;i<nodelist.length;i++){
                if(nodelist.item(i).getAttribute("name")==father){
                    nodelist.item(i).appendChild(newclass);
                    if(nodelist.item(i).appendChild(newclass)){
                        alert("添加成功！");
                    }else{
                        alert("添加失败！");
                    }
                }
            }
            readyWork();
        }else{
            var classname=window.prompt("请输入添加分类名称","");
            var nodelist=xmlDoc.getElementsByTagName("root");
            var newclass=xmlDoc.createElement("class");
            newclass.setAttribute("name",classname);
            newclass.setAttribute("number","0");
            nodelist.item(0).appendChild(newclass); 
            if(nodelist.item(0).appendChild(newclass)){
                alert("添加成功！");
            }else{
                alert("添加失败！");
            }
            readyWork();
        }
     });
     //添加任务
     addEvent($("#js_addtask"),"click",function(){
        if($("#click_class")){
            var nowclass=$("#click_class");
            var taskname=window.prompt("请输入任务名称","");
            var taskdate=window.prompt("请输入任务时间","");
            var taskcontent=window.prompt("请输入任务内容","");
            var newtask=xmlDoc.createElement("task");
            newtask.setAttribute("name",taskname);
            newtask.setAttribute("date",taskdate);
            newtask.setAttribute("status","未完成");
            var root=xmlDoc.getElementsByTagName("root");
            newtask.setAttribute("taskid",(root[0].getAttribute("number")*1+1));
            var content=xmlDoc.createTextNode(taskcontent);
            newtask.appendChild(content);
            if(nowclass.parentNode.getAttribute("father")){
                var father=nowclass.parentNode.getAttribute("father");//二级分类下加任务
                var nodelist=xmlDoc.getElementsByTagName("class");
                for(var i=0;i<nodelist.length;i++){
                    if(nodelist.item(i).getAttribute("name")==father){
                        var subnodelist=nodelist.item(i).getElementsByTagName("subclass");
                        for(var k=0;k<subnodelist.length;k++){
                            if(subnodelist.item(k).getAttribute("name")==nowclass.innerHTML.substring(0,(nowclass.innerHTML.indexOf("（")))){
                                subnodelist.item(k).appendChild(newtask);
                                subnodelist.item(k).setAttribute("number",(subnodelist.item(k).getAttribute("number")*1+1));
                                nodelist.item(i).setAttribute("number",(nodelist.item(i).getAttribute("number")*1+1));
                                root.item(0).setAttribute("number",((root.item(0).getAttribute("number")*1)+1));
                                if(subnodelist.item(k).appendChild(newtask)){
                                    alert("添加成功！");
                                }else{
                                    alert("添加失败！");
                                }
                            }
                        }
                    }
                }
            }else{
                var father=$("#click_class").firstChild.nodeValue;//一级分类下加任务
                father=father.substr(0,father.indexOf("（"));
                var nodelist=xmlDoc.getElementsByTagName("class");
                for(var i=0;i<nodelist.length;i++){
                    if(nodelist.item(i).getAttribute("name")==father){
                        nodelist.item(i).appendChild(newtask);
                        nodelist.item(i).setAttribute("number",((nodelist.item(i).getAttribute("number")*1)+1));
                        root.item(0).setAttribute("number",(root.item(0).getAttribute("number")*1+1));
                        if(nodelist.item(i).appendChild(newtask)){
                            alert("添加成功！");
                        }else{
                            alert("添加失败！");
                        }
                    }
                }
            }
            readyWork();
        }else{
            alert("请选择分类");
        }
     });
     //添加完成未完成的分类  单击事件
     addEvent($("#all_task"),"click",function(){
        var tasks=$(".usual_task");
        for(var i=0;i<tasks.length;i++){
            var task=tasks[i].getElementsByTagName("li");
            tasks[i].style.display="block";
        }
     });
     addEvent($("#do_task"),"click",function(){
        var tasks=$(".usual_task");
        for(var i=0;i<tasks.length;i++){
            var task=tasks[i].getElementsByTagName("li");
            if(task[0].getAttribute("class")){
                tasks[i].style.display="none";
            }else{
                tasks[i].style.display="block";
            }
        }
     });
     addEvent($("#end_task"),"click",function(){
        var tasks=$(".usual_task");
        for(var i=0;i<tasks.length;i++){
            var task=tasks[i].getElementsByTagName("li");
            if(task[0].getAttribute("class")){
                tasks[i].style.display="block";
            }else{
                tasks[i].style.display="none";
            }
        }
     });
     //完成任务事件
     addClickEvent($("#sub"),function(){
         var taskid=$("#click_task").firstChild.getAttribute("id");
         var tasklist=xmlDoc.getElementsByTagName("task");
         for(var i=0;i<tasklist.length;i++){
             if(tasklist[i].getAttribute("taskid")==taskid.replace("task","")){
                 if(tasklist[i].getAttribute("status")=="已完成"){
                     alert("当前任务已完成");
                     return;
                 }
                 tasklist[i].setAttribute("status","已完成");
                 alert("提交成功，重新进入生效");
             }
         }
     });
     //修改任务事件
     addClickEvent($("#update"),function(){
         var taskid=$("#click_task").firstChild.getAttribute("id");
         var tasklist=xmlDoc.getElementsByTagName("task");
         for(var i=0;i<tasklist.length;i++){
             if(tasklist[i].getAttribute("taskid")==taskid.replace("task","")){
                 if(tasklist[i].getAttribute("status")=="已完成"){
                     alert("当前任务已完成,不能修改");
                     return;
                 }
                 document.getElementById("task_title").innerHTML="<input type='text' id='update_title' value='"+document.getElementById("task_title").innerHTML+"'/>";
                 document.getElementById("task_date").innerHTML="<input type='text' id='update_date' value='"+document.getElementById("task_date").innerHTML+"'/>";
                 document.getElementById("task_content").innerHTML="<textarea id='update_content'>"+document.getElementById("task_content").innerHTML+"</textarea>";
                 document.getElementById("task_update").innerHTML="<input type='button' value='提交更新' id='update_submit'/>";
                 //修改任务提交按钮的单击事件
     addClickEvent($("#update_submit"),function(){
         var taskid=$("#click_task").firstChild.getAttribute("id");
         var tasklist=xmlDoc.getElementsByTagName("task");
         var newname=document.getElementById("update_title").value;
         var newdate=document.getElementById("update_date").value;
         var newcontent=document.getElementById("update_content").value;
         for(var i=0;i<tasklist.length;i++){
             if(tasklist[i].getAttribute("taskid")==taskid.replace("task","")){
                 if(tasklist[i].getAttribute("status")=="已完成"){
                     alert("当前任务已完成,不能修改");
                     return;
                 }
                 tasklist[i].setAttribute("name",newname);
                 tasklist[i].setAttribute("date",newdate);
                 tasklist[i].firstChild.nodeValue=newcontent;
                 alert("修改成功");
                 document.getElementById("task_title").innerHTML=newname;
                 document.getElementById("task_date").innerHTML=newdate;
                 document.getElementById("task_content").innerHTML=newcontent;
                 document.getElementById("task_update").innerHTML="";
             }
         }
     });
             }
         }
     });
     
});
