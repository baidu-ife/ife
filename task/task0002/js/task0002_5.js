window.onload = function() {

    var oInnerLeft = $('#inner_left');
    var oInnerRight = $('#inner_right');
    document.onmousedown = function(event) {
        var event = event || window.event;
        var target = event.target || event.srcElement;
        if(target.tagName.toLowerCase() == 'li') {
            var mousePos = getMousePos(event);
            var liPos = getElementPos(target);
            //console.log(liPos);
            var iX = mousePos.x - liPos.x;
            var iY = mousePos.y - liPos.y;
            var oLi = document.createElement('li');
            oLi.style.position = 'absolute';
            oLi.style.left = liPos.x -2 + 'px';
            oLi.style.top = liPos.y -2 + 'px';
            oLi.style.border = 'dashed #777 2px';
            oLi.style.opacity = '0.7';
            oLi.style.background = '#f88';
            oLi.id='active';
            document.body.appendChild(oLi);

            document.onmousemove = function(event) {
                var event = event || window.event;
                var current = getMousePos(event);
                document.body.style.cursor = 'move';
                
                stopDefault(event);

                oLi.style.left = current.x - iX + 'px';
                oLi.style.top = current.y - iY + 'px';
                //碰撞检测
                if((current.x - iX + oLi.offsetWidth >= getElementPos(oInnerRight).x) && (current.x - iX <= getElementPos(oInnerRight).x+oInnerLeft.offsetWidth))  {
                    oInnerRight.style.border = 'dashed #777 2px';
                } else {
                    oInnerRight.style.border = 'none';
                }
                if((current.x - iX < getElementPos(oInnerLeft).x + oInnerLeft.offsetWidth) && (current.x - iX + oLi.offsetWidth >getElementPos(oInnerLeft).x)) {
                    oInnerLeft.style.border = 'dashed #777 2px';
                }
                else {
                    oInnerLeft.style.border = 'none';
                }
            }


            document.onmouseup = function(event) {
                var event = event || window.event;
                var current = getMousePos(event);
                if((current.x - iX + oLi.offsetWidth >= getElementPos(oInnerRight).x) && (current.x - iX <= getElementPos(oInnerRight).x+oInnerLeft.offsetWidth))  {
                    oInnerRight.appendChild(target);

                }
                if((current.x - iX < getElementPos(oInnerLeft).x + oInnerLeft.offsetWidth) && (current.x - iX + oLi.offsetWidth >getElementPos(oInnerLeft).x)) {
                    oInnerLeft.appendChild(target);
                }
                document.onmousemove = null;
                if($('#active')) document.body.removeChild(oLi);
                document.body.style.cursor = 'default';
                oInnerRight.style.border = 'none';
                oInnerLeft.style.border = 'none';
                document.onmouseup = null;
            }

        }

    }





};

//获取鼠标位置
function getMousePos(e) {
    var e = e || window.event;
    return {
        x:  e.pageX || e.clientX + document.body.scrollLeft,
        y:  e.pageY || e.clientY + document.body.scrollTop
    }
}

//获取元素相对于父级的位置
function getElementPosR(element) {
    return{
        x: element.offsetLeft,
        y: element.offsetTop
    }

}
//获取元素的位置在页面的位置
function getElementPos(element) {
    var x = 0, y = 0;
    //循环累加偏移量
    for(var ele  = element; ele!=null; ele = ele.offsetParent) {
        x += ele.offsetLeft;
        y += ele.offsetTop;
    }
    // 再次循环所有的祖先元素, 减去滚动的偏移量
    for(var ele =element.parentNode; ele != null && ele.nodeType == 1; ele = ele.parentNode) {
        x  -= ele.scrollLeft;
        y -= ele.scrollTop;
    }
    return {x: x, y: y};
}


//获取元素尺寸
function getElementSize(element){
    return {
        width : element.offsetWidth,
        height : element.offsetHeight
    }
}


