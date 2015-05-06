(function() {
    //全局变量:
    var g = {
        storage: {
        	file: {0: '默认分类'},
            task: {'默认分类': []},
            todo: {'默认分类': {"folder": []}}
        },
        toLocal: function() {
        	if (arguments.length == 0) {
        		for (var val in g.storage) {
	        		var json = g.storage[val];
	        		json = JSON.stringify(json);
	        		localStorage.setItem(val, json);
	        	}
	        }
            else {
        		var name = arguments[0], json = g.storage[name];
        		json = JSON.stringify(json);
        		localStorage.setItem(name, json);
        	}
        },
        fromLocal: function() {
        	for (var name in g.storage) {
	        	var json = localStorage.getItem(name);
	        	json = JSON.parse(json);
	        	this.storage[name] = json;
	        }
        },
        att: function(element, name, value) {
            if (!value)
                return element.getAttribute(name);
            else
                return element.setAttribute(name, value);
        },
        stopBubble: function(e) {
        	if (e && e.stopPropagation) {
        		e.stopPropagation();
        	}
        	else {
        		window.event.cancelBubble = true;
        	}
        },
        UI: {
            hide: function(elem) {
                if (!elem.length) {
                    elem.style.display = "none";
                }
                else {
                    for (var i = 0; i < elem.length; i ++) {
                        elem[i].style.display = "none";
                    }
                }
            },
            show: function(elem) {
                if (!elem.length) {
                    elem.style.display = "";
                }
                else {
                    for (var i = 0; i < elem.length; i ++) {
                        elem[i].style.display = "";
                    }
                }
            },
            slideDown: function() {}
        },
        DOM: {
            removeNode: function(node) {
                var parent = node.parentNode;
                parent.removeChild(node);
            },
            addClass: function(elem, cla) {
            	if (!elem.length) {
	                var c = elem.className;
	                c = c.split(" ");
	                for (var i = 0; i < c.length; i ++) {
	                    if (cla == c[i])
	                        return false;
	                }
	                c.push(cla);
	                elem.className = c.join(" ");
                }
                else {
                	for (var i = 0; i < elem.length; i ++) {
                		var c = elem[i].className;
		                c = c.split(" ");
		                for (var j = 0; j < c.length; j ++) {
		                    if (cla == c[j])
		                        return false;
		                }
		                c.push(cla);
		                elem[i].className = c.join(" ");
                	}
                }
            },
            removeClass: function(elem, cla) {
                if (!elem.length) {
                	var c = elem.className;
	                c = c.split(" ");
	                for (var i = 0; i < c.length; i ++) {
	                    if (c[i] == cla) {
	                        c.splice(i, 1);
	                    };
	                };
	                elem.className = c.join(" ");
                }
                else {
                	for (var i = 0; i < elem.length; i ++) {
                		var c = elem[i].className;
		                c = c.split(" ");
		                for (var j = 0; j < c.length; j ++) {
		                    if (c[j] == cla) {
		                        c.splice(j, 1);
		                    };
		                };
		                elem[i].className = c.join(" ");
                	}
                }
            },
            siblings: function(elem) {
                var sibling = [], previous = elem, next = elem;
                while (previous.previousSibling != null) {
                    previous = previous.previousSibling;
                    if (previous.nodeType == 1)
                        sibling.push(previous);
                }
                while (next.nextSibling != null) {
                    next = next.nextSibling;
                    if (next.nodeType == 1)
                        sibling.push(next);
                }
                return sibling;
            }
        }
    };
    //任务构造器:
    function Task() {};
    Task.prototype.showDelete = function() {
        var li = document.getElementsByClassName("taskList");
        for (var i = li.length - 1; i >= 0; i --) {
            li[i].onmouseenter = function() {
                g.UI.show(this.lastChild);
            }
            li[i].onmouseleave = function() {
                g.UI.hide(this.lastChild);
            }
        }
        task.delete();
    };
    Task.prototype.delete = function() {
        var del = document.getElementsByClassName("menuDelete");
        for (var i = del.length - 1; i >= 0; i --) {
            del[i].onclick = function(e) {
                if (g.att(this.parentNode.parentNode, "delete") != 0) {
                	if (confirm("sure?")) {
                        g.DOM.removeNode(this.parentNode.parentNode);
                        var file = this.parentNode.parentNode.id.slice(4),
                        	f = g.att(this.parentNode, "f");
                        delete g.storage.file[file];
                        delete g.storage.task[f];
                        delete g.storage.todo[f];
                        if (document.getElementsByClassName("choosen").length == 2) {
                        	task.initTodo(g.att(document.getElementsByClassName("choosen")[0], "f"));
                        }
                        else {
                        	var temp = g.att(document.getElementById("task0").firstChild, "f")
                        	task.initTodo(temp);
                        	g.stopBubble(e);
                        };
                        edit.undo();
                        g.toLocal()
                    }
                }
                else {
                    alert("You can't delete this class!")
                }
            }
        }
    };
    Task.prototype.addClass = function() {
        var addCla = document.getElementById("addClass");
        addCla.onclick = function() {
            g.UI.show(document.getElementsByClassName("pop"));
            document.getElementById("addConfirm").onclick = function() {
                var text = document.getElementById("addTitle").value,
                    str = [],
                    ul = document.getElementsByClassName("taskUl"),
                    choosen = document.getElementsByClassName("choosen")[0];
                if (!document.getElementById("subClass").checked) {
                	var i = 0;
                    for (var val in g.storage.file) {
                    	if (g.storage.file[val] == text) {
                    		alert("The name is used!");
                    		return false;
                    	}
                    	if (g.storage.file.hasOwnProperty(val)) {
                    		i ++;
                    	}
                    }
                    g.storage.file[i] = text;
                    g.storage.task[text] = new Array();
                    g.storage.todo[text] = {"folder": []};
                    str.push("<ul class='taskUl' id='task" + ul.length + "' delete='1' add='1'>");
                    str.push("<li class='titleli taskList' f='" + text + "'>");
                    str.push("<img src='img/file.png' />")
                    str.push("<p>" + text + "</p>");
                    str.push("<span class='taskNum' id='taskNum" + ul.length + "'>(0)</span>");
                    str.push("<span class='pullRight menuDelete' style='display:none'><b>X</b></span>");
                    str.push("</li>");
                    str.push("</ul>");
                    str = str.join("");
                    ul[0].parentNode.innerHTML += str;
                }
                else {
                	if (text == "folder") {
                		alert("The name is unaccessable!");
                		return false;
                	}
                	if (g.att(choosen.parentNode, 'add') != 0) {
	                	var ulnum = choosen.parentNode.id.slice(4),
	                	    num = g.DOM.siblings(choosen).length;
	                	    f = g.att(choosen, 'f');
	                    for (var i = 0; i < g.storage.task[f].length; i ++) {
	                    	if (g.storage.task[f][i] == text) {
	                    		alert("The name is used!");
	                    		return false;
	                    	}
	                    }
	                    g.storage.task[f].push(text);
	                    g.storage.todo[f][text] = new Array();
	                	str.push("<li class='titleli subTaskList' f='" + f + "' t='" + text + "'>");
	                    str.push("<img src='img/subfile.png' />")
	                    str.push("<p>" + text + "</p>");
	                    str.push("<span class='taskNum' id='taskNum" + ulnum + "_" + num + "'>(0)</span>");
	                    str.push("</li>");
	                    str = str.join("");
	                    ul[ulnum].innerHTML += str;
                	}
                	else {
                		alert("Can't add task to this class!");
                		return false;
                	}
	            }
        	g.toLocal();
	        g.UI.hide(document.getElementsByClassName("pop"));
	        task.classChoosen();
	        task.showDelete();
            }
            document.getElementById("addClose").onclick = function() {
                g.UI.hide(document.getElementsByClassName("pop"));
            }
        };
    };
    Task.prototype.addTask = function() {
        var addTodo = document.getElementById("addTask");
        addTodo.onclick = function() {
            edit.view();
            document.getElementById("buttonSave").onclick = function() {
            	edit.save("add");
            	return false;
            }
        };
    };
    Task.prototype.editTask = function() {
        var todoEdit = document.getElementById("todoEdit");
        todoEdit.onclick = function() {
            edit.view();
            document.getElementById("buttonSave").onclick = function() {
            	edit.save("edit");
            	return false;
            }
        }
    };
    Task.prototype.taskDone = function() {
        var todoDone = document.getElementById("todoDone");
        todoDone.onclick = function() {
            var choosen = document.getElementsByClassName("todochoosen")[0];
            if (choosen) {
           		g.DOM.addClass(choosen, "done");
            }
        }
    };
    Task.prototype.classChoosen = function() {
    	var titleli = document.getElementsByClassName("titleli");
    	for (var i = 0; i < titleli.length; i ++) {
    		titleli[i].onclick = function() {
    			g.DOM.removeClass(titleli, "choosen");
    			g.DOM.addClass(this, "choosen");
    			if (g.att(this, 'f') != undefined && g.att(this, 't') != undefined) {
    				var f = g.att(this, 'f'), t = g.att(this, 't');
    				task.initTodo(f, t);
    			}
    			else {
    				var f = g.att(this, 'f');
    				task.initTodo(f);
    			}
    		}
    	}
    }
    Task.prototype.taskChoosen = function() {
        var taskli = document.getElementsByClassName("todotaskLi");
        for (var i = 0; i < taskli.length; i ++) {
            taskli[i].onclick = function() {
            	g.DOM.removeClass(document.getElementsByClassName("todotaskLi"), "todochoosen");
                g.DOM.addClass(this, "todochoosen");
                var time = g.att(this, "time"), 
                    title = g.att(this, "todo"), 
                    f = g.att(this, "f"), 
                    t = g.att(this, "t"), 
                    a = g.storage.todo[f][t],
                    reg = /\d+/g,
                    result = [],
                    temp;
                while ((temp = reg.exec(time)) != null) {
                	result.push(temp);
                }
                var timeTemp = result[0] + result[1] + result[2];
                for (var i = 0; i < a.length; i ++) {
                	if ((title + timeTemp) == a[i][0]) {
                		var content = a[i][1];
                		break;
                	}
                }
                document.getElementById("todoText").innerHTML = title;
                document.getElementById("taskTime").innerHTML = "<p>任务日期：<span>" + time + "</span></p>";
                if (content) {
                	document.getElementById("taskContent").innerHTML = "<p>" + content + "</p>";
                }
            }
        }
    };
    Task.prototype.titleChoosen = function() {
        var title = document.getElementsByClassName("subMenuTitle");
        for (var i = 0; i < title.length; i ++) {
            title[i].onclick = function() {
                g.DOM.addClass(this, "choosen");
                var sibling = g.DOM.siblings(this);
                for (var j = 0; j < sibling.length; j ++) {
                    g.DOM.removeClass(sibling[j], "choosen");
                }
                if (this.id == "all") {
                    g.UI.show(document.getElementsByClassName("todotaskLi"));
                }
                else if (this.id == "done") {
                    g.UI.hide(document.getElementsByClassName("todotaskLi"));
                    if (document.getElementsByClassName("done").length != 0){
                    	g.UI.show(document.getElementsByClassName("done"));
                    }
                }
                else if (this.id == "notdone") {
                    g.UI.show(document.getElementsByClassName("todotaskLi"));
                    if (document.getElementsByClassName("done").length != 0){
                    	g.UI.hide(document.getElementsByClassName("done"));
                    }
                }
            }
        }
    };
    Task.prototype.init = function() {
    	if (localStorage.length == 0) {
    		g.toLocal();
    	}
    	else {
    		g.fromLocal();
    	};
    	var i = 0;
    	for (var val in g.storage.file) {
    		var str = [], f = g.storage.file[val];
    		str.push('<ul class="taskUl" id="task' + i + '"');
    		if (f == "默认分类") {
    			str.push("delete=0 add=0");
    		}
    		else {
    			str.push("delete=1 add=1")
    		}
    		str.push(">");
            str.push('<li class="titleli taskList ');
            if (f == "默认分类") {
    			str.push("choosen");
    		}
            str.push('" f="' + f + '"><img src="img/file.png" />');
            str.push('<p>' + f + '  </p><span class="taskNum" id="taskNum' + i + '">(0)</span>')
            str.push('<span class="pullRight menuDelete" style="display:none"><b>X</b></span>')
            str.push('</li>');
            var t = g.storage.task[f];
            if (t.length != 0) {
	            for (var j = 0; j < t.length; j ++) {
	            	str.push('<li class="titleli subTaskList" f="' + f + '" t="' + t[j] + '">');
	            	str.push('<img src="img/subfile.png" /><p>' + t[j] + '  </p>');
	            	str.push('<span class="taskNum" id="taskNum' + i + '_' + j + '">(0)</span>');
	            	str.push('</li>');
	            }
	        };
	        str.push("</ul>")
            htmlstr = str.join("");
            document.getElementById("taskClass").innerHTML += htmlstr;
            str = [];
            task.initTodo(g.storage.file['0']);
            i ++;
    	}
    	task.showDelete();
	    task.addClass();
	    task.addTask();
	    task.editTask();
	    task.taskDone();
	    task.taskChoosen();
	    task.titleChoosen();
	    task.classChoosen();
    };
    Task.prototype.initTodo = function(f, t) {
    	var time = [], todo = [], d = [];
    	if (!t) {
    		var a = g.storage.todo[f]["folder"];
    		for (var val in g.storage.todo[f]) {
    			if (val != "folder") {
    				for (var i = 0; i < g.storage.todo[f][val].length; i ++) {
    					d.push([g.storage.todo[f][val][i][0], val]);
    				}
    			}
    		}
    	}
    	else {
    		var a = g.storage.todo[f][t];
    	}	
    	for (var i = 0; i < a.length; i ++) {
	    	var b = a[i][0].slice(-8),
	    		c = a[i][0].slice(0, -8);
	    	if (time.length != 0) {
	    		for (var j = 0; j < time.length; j ++) {
	    			if (time[j] == b) {
	    				todo[j] += " " + c;
	    				break;
	    			}
	    			else if (j == time.length - 1) {
	    				time.push(b);
	    				todo.push(c);
	    				break;
	    			}
	   			}
	    	}    				
	    	else {
	    		time.push(b);
	    		todo.push(c);
	    	}
   		}
    	var temp = [];
    	for (var i = 0; i < time.length; i ++) {
    		temp.push([time[i], todo[i]]);
    	}
    	temp.sort(function(a, b) {
    		return a[0] - b[0];
    	});
    	for (var i = 0; i < temp.length; i ++) {
    		time[i] = temp[i][0];
    		todo[i] = temp[i][1];
    	}
    	var str = [], timeTemp = [];
    	for (var i = 0; i < time.length; i ++) {
    		str.push('<div id="task' + time[i] + '">');
    		timeTemp[i] = time[i].split("");
    		timeTemp[i].splice(4, 0, '-');
    		timeTemp[i].splice(7, 0, '-');
    		timeTemp[i] = timeTemp[i].join("");
    		str.push('<div class="time todotime"><p>' + timeTemp[i] + '</p></div>')
    		str.push('<div class="task">');
    		str.push('<ul class="todotask">');
    		var temp = todo[i].split(" ");
    		for (var j = 0; j < temp.length; j ++) {
    			str.push('<li class="todotaskLi" f="' + f + '"todo="' + temp[j] + '"time="' + timeTemp[i]);
    			if (t) {
    				str.push('" t="' + t + '"><p>' + temp[j] + '</p></li>');
    			}
    			else {
    				if (d.length > 0) {
	    				for (var k = 0; k < d.length; k ++) {
	    					if (temp[j] + time[i] == d[k][0])
	    						str.push('" t="' + d[k][1] + '"><p>' + temp[j] + '</p></li>');
	    				}
	    			}
	    			else {
	    				str.push('" t="folder"><p>' + temp[j] + '</p></li>')
	    			}
    			}
    		}
    		str.push("</ul></div></div>")
    	}
    	document.getElementById("todolist").innerHTML = str.join("");
    	task.taskChoosen();
    }
    //编辑构造器:
    function Edit() {
        this.normal = document.getElementsByClassName("edit")[0].innerHTML;
    };
    Edit.prototype.view = function() {
        var str = [], choosen = document.getElementsByClassName("todochoosen")[0]
        str.push('<form id="todoForm">');
        if (choosen) {
        	str.push('<input type="text" id="formTitle" value="' + g.att(choosen, "todo") + '" />');
        }
        else {
        	str.push('<input type="text" id="formTitle" value="请输入标题" />');
        }
        str.push('<span class="pullRight" id="click">')
        str.push('<a class="formButton" id="buttonSave">save</a>')
        str.push('<a class="formButton pullRight" id="buttonDelete">Undo</a></span>');
        if (choosen) {
        	str.push('<input type="date" class="time" id="formTime" value="' + g.att(choosen, "time") + '" />');
        }
        else {
        	str.push('<input type="date" class="time" id="formTime" value="1970-01-01" />');
        }
        str.push('<textarea id="formContent" cols="30" rows="10"></textarea>');
        str.push('</from>');
        str = str.join("");
        document.getElementsByClassName("edit")[0].innerHTML = str;
        document.getElementById("buttonDelete").onclick = function() {
            edit.undo();
        }
    };
    Edit.prototype.undo = function() {
        document.getElementsByClassName("edit")[0].innerHTML = this.normal;
        if (document.getElementsByClassName("todochoosen").length > 0) {
        	document.getElementById("todoText").innerHTML = g.att(document.getElementsByClassName("todochoosen")[0], 'todo');
        	document.getElementById("taskTime").innerHTML = "<p>任务日期：<span>" + g.att(document.getElementsByClassName("todochoosen")[0], "time") + "</span></p>";
        }
        task.editTask();
    };
    Edit.prototype.save = function(type) {
        var title = document.getElementById("formTitle").value,
            time = document.getElementById("formTime").value,
            content = document.getElementById("formContent").value,
            choosen = document.getElementsByClassName("choosen")[0],
            reg = /\d+/g,
            temp,
            result = [];
        if (!title) {
        	alert("Please enter title");
        	return false;
        }
        else if (!time) {
        	alert("Please enter time");
        	return false;
        }
        else if (!(/\d{4}-\d{2}-\d{2}/.test(time))) {
        	alert("The time is wrong");
        	return false;
        }
        while ((temp = reg.exec(time)) != null) {
           	result.push(temp);
        }
        var todo = title + result[0] + result[1] + result[2], t = g.att(choosen, 't'), f = g.att(choosen, 'f');
        if (type == "edit") {
        	var  todochoosen = document.getElementsByClassName("todochoosen")[0],
            	timeBefore = g.att(todochoosen, "time"), 
            	t = g.att(todochoosen, 't'),
            	f = g.att(todochoosen, 'f');
            	titleBefore = g.att(todochoosen, "todo");
        	result = [];
	        while ((temp = reg.exec(timeBefore)) != null) {
	        	result.push(temp);
	        };
	        var todoBefore = titleBefore + result[0] + result[1] + result[2];
	        if (t != "folder") {
		        for (var i = 0; i < g.storage.todo[f][t].length; i ++) {
		        	if (g.storage.todo[f][t][i][0] == todoBefore) {
		        		g.storage.todo[f][t][i][0] = todo;
		        		g.storage.todo[f][t][i][1] = content;
		        	}
		        }
		        for (var i = 0; i < g.storage.todo[f]["folder"].length; i ++) {
		        	if (g.storage.todo[f]["folder"][i][0] == todoBefore) {
		        		g.storage.todo[f]["folder"][i][0] = todo;
		        		g.storage.todo[f]["folder"][i][1] = content;
		        	}
		        }
		    }
        }
        else if (type == "add") {
        	if (t) {
	        	g.storage.todo[f][t].push([todo, content]);
	        }
	        g.storage.todo[f]["folder"].push([todo, content]);
        }
        task.initTodo(f, t);
        document.getElementsByClassName("edit")[0].innerHTML = this.normal;
        task.editTask();
        g.toLocal("todo");
    };
    //初始化
    var task = new Task(), edit = new Edit();
    task.init();
})()