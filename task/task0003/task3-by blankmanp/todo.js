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
				elem.style.display = "none";
			},
			show: function(elem) {
				elem.style.display = "inline-block";
			},
			removeNode: function(node) {
				if (confirm("Are you sure?")) {
					var parent = document.getElementById("taskClass");
					parent.removeChild(node);
				}
			}
		}
	};
	//任务构造器:
	function Task() {};
	Task.prototype.showDelete = function() {
		var li = document.getElementsByClassName("taskList");
		console.log(li);
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
		addTodo.onclick = function() {};
	}
	//编辑构造器:
	function Edit() {};
	var task = new Task();
	task.showDelete();
	task.addClass();
})()