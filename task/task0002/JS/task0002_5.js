/**
 * @file task0002_5.js
 * @author AlisonZhang(zhangxuejing_62@126.com)
 * learnfrom zchen9(zxcvbnm.pop@qq.com)
 */
window.onload = function() {

    //获得所有块元素
    var myBlock = $(".block");

    //鼠标偏移
    var mouseOffsetX = 0;
    var mouseOffsetY = 0;

    //是否可拖动
    var isDragging = false;
    for (var i = 0; i < myBlock.length; i++) {
        //鼠标按下开始拖拽事件
        addEvent(myBlock[i], "mousedown", dragging);
        //鼠标按下后开始移动事件
        addEvent(myBlock[i], "mousemove", moving);
        //鼠标移开事件
        addEvent(myBlock[i], "mouseup", dropping);
    }

    //获得元素移动范围
    function getBoxRange(ele) {
        var minWidth = ele.offsetLeft;
        var minHeight = ele.offsetTop;
        var maxWidth = minWidth + ele.offsetWidth;
        var maxHeight = minHeight + ele.offsetHeight;
        return [ minWidth, maxWidth, minHeight, maxHeight ];
    }

    //定义鼠标在块上放下事件
    function dragging(e) {
        e = e || window.event;
        stopBubble(e);
        var target = e.srcElement || e.target;
        //获取鼠标相对拖拽元素的左上角的坐标
        mouseOffsetX = e.pageX - target.offsetLeft;
        mouseOffsetY = e.pageY - target.offsetTop;
        //标记元素为可拖动
        isDragging = true;
    }

    //定义鼠标移动事件
    function moving(e) {
        e = e || window.event;
        stopBubble(e);
        var target = e.srcElement || e.target;
        //鼠标当前位置
        var mouseX = e.pageX;
        var mouseY = e.pageY;
        //块元素新位置
        var moveX = 0;
        var moveY = 0;
        //判断元素是否可拖动
        if (isDragging === true) {
            //获取元素移动坐标（鼠标在当前target内相对位置）
            moveX = mouseX - mouseOffsetX;
            moveY = mouseY - mouseOffsetY;
            //给当前拖拽元素增加样式
            addClass(this, "block dragging");
            this.innerHTML = "draggingBlock";
            this.style.position = "absolute";
            this.style.left = moveX + "px";
            this.style.top = moveY + "px";
            //获取当前元素的父元素的邻元素
            var nextBox = this.parentNode.nextElementSibling;
            var prevBox = this.parentNode.previousElementSibling;
            if ( nextBox ) {
                //获得邻元素的可拖动范围
                var nextBoxRange = getBoxRange(nextBox);
                var nextBoxMinX = nextBoxRange[0];
                var nextBoxMaxX = nextBoxRange[1];
                var nextBoxMinY = nextBoxRange[2];
                var nextBoxMaxY = nextBoxRange[3];
                //判断鼠标位置是否在邻元素范围内，若是，添加当前拖拽元素
                if ((mouseX > nextBoxMinX && mouseX < nextBoxMaxX)
                    &&
                    ( mouseY > nextBoxMinY && mouseY < nextBoxMaxY )
                ) {
                    nextBox.appendChild( this );
                }
            }
            if ( prevBox ) {
                //获得邻元素的可拖动范围
                var prevBoxRange = getBoxRange(prevBox);
                var prevBoxMinX = prevBoxRange[0];
                var prevBoxMaxX = prevBoxRange[1];
                var prevBoxMinY = prevBoxRange[2];
                var prevBoxMaxY = prevBoxRange[3];
                //判断鼠标位置是否在邻元素范围内，若是，添加当前拖拽元素
                if ((mouseX > prevBoxMinX && mouseX < prevBoxMaxX)
                    &&
                    (mouseY > prevBoxMinY && mouseY < prevBoxMaxY)
                ) {
                    prevBox.appendChild(this);
                }
            }
        }
    }

    ///定义鼠标松开事件

    function dropping() {
        //元素为不可拖动状态
        isDragging = false;
        //将拖拽元素更改样式
        this.removeAttribute("style");
        addClass(this, "block");
        //重新遍历所有块元素，更新元素序号
        var boxList = $(".box");
        for (var j = 0; j < boxList.length; j++) {
            var blockList = boxList[j].children;
            for (var i =0; i < blockList.length; i++) {
                blockList[i].innerHTML = j + 1 + "-" + ( i + 1 );
            }
        }
    }
};
