(function() {
	//全局变量:
	var g = {
		att: function(element, name, value) {
			if (!value)
				return element.getAttribute(name);
			else
				return element.setAttribute(name, value);
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
			removeNode: function(node) {
				if (confirm("Are you sure?")) {
					var parent = document.getElementById("taskClass");
					parent.removeChild(node);
				}
			},
			slideDown: function() {}
		},
		DOM: {
			addClass: function(elem, cla) {
				var c = elem.className;
				console.log(c);
				c = c.split(" ");
				for (var i = 0; i < c.length; i ++) {
					if (cla == c[i])
						return false;
				}
				c.push(cla);
				elem.className = c.join(" ");
			},
			removeClass: function(elem, cla) {
				var c = elem.className;
				c = c.split(" ");
				for (var i = 0; i < c.length; i ++) {
					if (c[i] == cla) {
						c.splice(i, 1);
					};
				};
				elem.className = c.join(" ");
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
			del[i].onclick = function() {
				if (g.att(this.parentNode.parentNode, "delete") != 0) {
					g.UI.removeNode(this.parentNode.parentNode);
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
			var text = prompt("Class Title:"), str = [], ul = document.getElementsByClassName("taskUl");
			str.push("<ul class='taskUl' id='task" + ul.length + "' delete='1'>");
			str.push("<li class='taskList'>");
			str.push("<p>" + text + "</p>");
			str.push("<span class='taskNum' id='taskNum" + ul.length + "'>(0)</span>");
			str.push("<span class='pullRight menuDelete' style='display:none'><b>X</b></span>");
			str.push("</li>");
			str.push("</ul>");
			str = str.join("");
			ul[0].parentNode.innerHTML += str;
			task.showDelete();
		}
	};
	Task.prototype.addTask = function() {
		var addTodo = document.getElementById("addTask");
		addTodo.onclick = function() {
			edit.view();
		};
	};
	Task.prototype.editTask = function() {
		var todoEdit = document.getElementById("todoEdit");
		todoEdit.onclick = function() {
			edit.view();
		}
	};
	Task.prototype.taskDone = function() {
		var todoDone = document.getElementById("todoDone");
		todoDone.onclick = function() {
			var choosen = document.getElementsByClassName("todochoosen")[0];
			g.DOM.addClass(choosen, "done");
		}
	};
	Task.prototype.taskChoosen = function() {
		var taskli = document.getElementsByClassName("todotaskLi");
		for (var i = 0; i < taskli.length; i ++) {
			taskli[i].onclick = function() {
				g.DOM.addClass(this, "todochoosen");
				var sibling = g.DOM.siblings(this);
				for (var j = 0; j < sibling.length; j ++) {
					g.DOM.removeClass(sibling[j], "todochoosen");
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
					g.UI.show(document.getElementsByClassName("done"));
				}
				else if (this.id == "notdone") {
					g.UI.show(document.getElementsByClassName("todotaskLi"));
					g.UI.hide(document.getElementsByClassName("done"));
				}
			}
		}
	}
	//编辑构造器:
	function Edit() {
		this.normal = document.getElementsByClassName("edit")[0].innerHTML;
	};
	Edit.prototype.view = function() {
		var str = [];
		str.push('<form id="todoForm">');
		str.push('<input type="text" id="formTitle" value="请输入标题" />');
		str.push('<span class="pullRight" id="click"><button class="formButton" id="buttonSave" type="submit">save</button><button class="formButton pullRight" id="buttonDelete">Undo</button></span>');
		str.push('<input type="text" class="time" id="formTime" value="请输入时间" />');
		str.push('<textarea name="" id="formContent" cols="30" rows="10"></textarea>');
		str.push('</from>');
		str = str.join("");
		document.getElementsByClassName("edit")[0].innerHTML = str;
		document.getElementById("buttonDelete").onclick = function() {
			edit.undo();
		}
	}
	Edit.prototype.undo = function() {
		document.getElementsByClassName("edit")[0].innerHTML = this.normal;
	}
	//初始化
	var task = new Task(), edit = new Edit();
	task.showDelete();
	task.addClass();
	task.addTask();
	task.editTask();
	task.taskDone();
	task.taskChoosen();
	task.titleChoosen();
})()