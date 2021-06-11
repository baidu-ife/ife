
var EditManager = (function() {

    // EditTask 是否被实例化
    var storedInstance = null;
    // 右侧是否出现
    var show = false;
    // 右侧是否正在动画
    var mutex = false;

    function EditTask() {

        // 当前被修改的任务条
        this.taskTarget = null;
        // 上一个被单击的任务条
        this.prevClickedTask = null;
    }

    EditTask.prototype = {
        constructor: EditTask,

        // 单击任务条，被选中，加上类
        select: function(element) {
            if (element === undefined ) {
                return;
            }
            var index = element.className.indexOf("selected");
            if ((this.prevClickedTask !== null) && (this.prevClickedTask !== element)) {
                this.prevClickedTask.className = this.prevClickedTask.className.replace(" selected", "");
            }
            if (index === -1) {
                element.className = element.className + " selected";
                this.prevClickedTask = element;
            }
 
        },

        // 因为HTML的结构
        // 可能会点击到span元素的父元素li
        classify: function(element) {
            if (element.tagName === "LI") {
                return element.childNodes[1];
            } else if (element.tagName === "SPAN") {
                return element;
            } else {
                return false;
            }
        },

        reClassify: function(element) {
            if (element.tagName === "LI") {
                return element;
            } else if (element.tagName === "SPAN") {
                return element.parentNode;
            }
        },

        deleteNode: function(element){
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        },

        renderDate: function(el, place){
            
        },

        // 更新textarea的文字
        updateEditorText: function(event, editor) {
            var event = Util.getEvent(event);
            var target = Util.getTarget(event);
            var task = this.classify(target);

            if (task) {
                editor.value = task.innerHTML;
                this.taskTarget = task;
            }

        },

        // 需要传到后台
        updateTaskText: function(editor) {
            this.taskTarget.innerHTML = editor.value;
        },

        updateEditorDate: function(element){
            if (element) {
                element.value = this.taskTarget.parentNode.querySelector("time").innerHTML;
            }
            // var targetDate = this.taskTarget
        },

        updateTaskDate: function(element){
            this.taskTarget.parentNode.querySelector("time").innerHTML = element.value;
        },

        dbclickHandler: function(event, element, editor) {
            var event = Util.getEvent(event);
            var target = Util.getTarget(event);
            var that = this;

            Util.preventDefault(event);
            this.updateEditorText(event, editor);

            var editorAnimTarget = editor.parentNode.parentNode;
            var taskAnimTarget = element;
            // fixbug 任务中间的空白
            if (this.taskTarget !== null && 
                target.tagName !== "UL" && 
                target.parentNode.id !== "completetask" && 
                target.tagName !== "TIME" &&
                target.tagName !== "INPUT" &&
                target.tagName !== 'DIV') {
                // 互斥量
                if (show === false && mutex === false) {
                    // 动画对象
                    this.editorAnim = new Animation(editorAnimTarget, 400);
                    this.taskAnim = new Animation(taskAnimTarget, 400);
                    this.editorAnim.onProgress = function(p) {
                        this.target.style.right = 1.5 + (p - 1) * 35 + "%";
                    }

                    this.taskAnim.onProgress = function(p) {

                        this.target.style.width = 100 - p * 38 + "%";
                    }

                    this.taskAnim.onFinished = function() {
                        mutex = true;
                    }

                    this.editorAnim.start();
                    this.taskAnim.start();

                    this.updateEditorDate(this.editorDate);
                    show = true;

                }
            }
        },

        clickHandler: function(event, editor) {
            var event = Util.getEvent(event);
            var target = Util.getTarget(event);
            var taskClicked = this.reClassify(target);

            this.editorDate = editor.parentNode.parentNode.querySelector("input")

            this.select(taskClicked);
            if (show === true && target.parentNode.id !== "completetask") {
                this.updateEditorText(event, editor);
                this.updateEditorDate(this.editorDate);
                console.log(new Date());
            }

            Util.stopPropagation(event);
        },

        // 当内容为空是，需要删除任务条
        inputHandler: function(event, element) {
            var event = Util.getEvent(event);
            var that = this;

            if ( ( element.value !== "" ) && ( event.keyCode !== 13 ) ) {
                var tId = setTimeout(function() {
                    if (show === true) {
                        clearTimeout(tId);
                        that.updateTaskText(element);
                    }
                }, 20);
            }

            Util.stopPropagation(event);
        },

        clickOutHandler: function(event, element) {
            var event = Util.getEvent(event);
            var target = Util.getTarget(event);
            var that = this;

            if (target.id !== "editor" && 
                target.id !== "edit-task" && 
                target !== editor.parentNode &&
                target.id !== "date" &&
                target.tagName !== "LABEL" &&
                target.className !== "date" && 
                target.tagName !== "H4") {

                if (show === true && mutex === true) {
                    show = false;

                    this.editorAnim.onProgress = function(p) {
                        this.target.style.right = -p * 35 + "%";
                    }

                    this.taskAnim.onProgress = function(p) {
                        // 综合得为 100%
                        this.target.style.width = 62 + 38 * p + "%";
                    }
                    this.taskAnim.onFinished = function() {
                        // 后退与前进只能进行一个
                        mutex = false;
                    }

                    this.editorAnim.start();
                    this.taskAnim.start();
                    
                    this.updateTaskDate(this.editorDate);

                    // Util.ajax(url, {
                    //     type: "post",
                    //     data: 
                    // });
                    
                    
                    element.value = "";

                }
                // 
                if (this.prevClickedTask === null) {
                    return;
                } else {
                    this.prevClickedTask.className = this.prevClickedTask.className.replace(" selected", "");
                    this.taskTarget.className = this.prevClickedTask.className.replace(" selected", "");
                }
            }

            // 调用删除函数
            if (target.className === "delete") {
                this.deleteNode(this.taskTarget.parentNode);
            }

            Util.stopPropagation(event);
        }

    }



    return {
        addEdit: function(element, editor) {
            var et = this.getEdit();

            Util.addEvent(element, "dblclick", function(event) {
                et.dbclickHandler(event, element, editor);
            });

            Util.addEvent(element, "click", function(event) {
                et.clickHandler(event, editor);
            });

            Util.addEvent(editor, "keyup", function(event) {
                et.inputHandler(event, editor);
            });

            Util.addEvent(element.parentNode, "click", function(event) {
                et.clickOutHandler(event, editor);
            });


        },
        getEdit: function() {
            if (storedInstance == null) {
                storedInstance = new EditTask();
            }
            return storedInstance;
        }
    }
})();

var tasks = document.querySelector("div#task");
var editor = document.querySelector("textarea#editor");


EditManager.addEdit(tasks, editor);


