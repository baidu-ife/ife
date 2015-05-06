/************************
   Melanie-BUPT  2015/5/6
***************************/

var leftPar = document.getElementById("left-parent");
var rightPar = document.getElementById("right-parent");
var leftChild = leftPar.getElementsByTagName("div");
var rightChild = rightPar.getElementsByTagName("div");

//选项的高度。设置为51是为了让选项之间的边框只显示1px
var childHeight = 51;

//左边容器的左右边界的坐标
var leftParLB = leftPar.offsetLeft;
var leftParRB = leftPar.offsetLeft + leftPar.offsetWidth;
//右边容器的左右边界的坐标
var rightParLB = rightPar.offsetLeft;
var rightParRB = rightPar.offsetLeft + rightPar.offsetWidth;

//设置左右两边容器里的选项，内容设为随机数用来分辨
for (var i = 0; i < leftChild.length; i++) {
    leftChild[i].index = i;
    leftChild[i].style.top = i * childHeight + "px";
    leftChild[i].innerHTML = parseInt(Math.random()*10);
    dragDiv(leftChild[i]);
}
for (var i = 0; i < rightChild.length; i++) {
    rightChild[i].index = i;
    rightChild[i].style.top = i * childHeight + "px";
    rightChild[i].innerHTML = parseInt(Math.random()*10);
    dragDiv(rightChild[i]);
}

function dragDiv(obj) {
    var mousedown = false;

    obj.addEventListener("mousedown", function() {
        this.className = "active";
        mousedown= true;
    }, false);

    obj.addEventListener("mousemove", function() {
        if (mousedown) {
            this.style.zIndex = 5;
            this.style.left = event.clientX - this.parentNode.offsetLeft 
                                - this.offsetWidth/2 + "px";
            this.style.top  = event.clientY - this.parentNode.offsetTop 
                                - this.offsetHeight/2 + "px";
        }
    }, false);

    obj.addEventListener("mouseup", function() {
        this.className = "";
        //对左边容器的选项进行判断
        if (this.parentNode.className == "left") {
            if (event.clientX >= rightParLB && event.clientX <= rightParRB) {
                remove(leftChild, this);
                add(rightPar, rightChild);
            }
            else {
                reset(this);
            }
        }
        //右边容器
        else {
            if (event.clientX >= leftParLB && event.clientX <= leftParRB) {
                remove(rightChild, this);
                add(leftPar, leftChild);
            }
            else {
                reset(this);
            }
        }
        mousedown = false;
    }, false);
    //删除选项
    function remove(list, obj) {
        obj.parentNode.removeChild(obj);
        for (var i = 0; i < list.length; i++) {
            list[i].index = i;
            list[i].style.top = i * childHeight + "px";
        }
    }
    //添加选项
    function add(par, list) {
        var newDiv = document.createElement("div");
        newDiv.innerHTML = parseInt(Math.random()*10);
        newDiv.index = list.length;
        newDiv.style.top = list.length * childHeight + "px";
        par.appendChild(newDiv);
        dragDiv(newDiv);
    }
    //归位选项
    function reset(obj) {
        obj.style.zIndex = 1;
        obj.style.left = -1 + "px";
        obj.style.top  = obj.index * childHeight + "px";
    }
}


/************************************************\
总结一下下：
    主要考察点应该还是鼠标事件。好好玩！
    这个练习之后，对于事件理解的稍微好了一些。
    不过，在设置offsetLeft那里的时候纠结了好久。
    其实现在也没太懂，只是碰巧试到这个的时候对了
    就用了。+_+
    后期还可以再加入更多的拖动细节。
    如根据鼠标放开前的位置，将选项插入容器中。
\***********************************************/