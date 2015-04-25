/*
* task0002_5.js
*/

(function (exprots) {
    var queue={},
        itemSel="item",
        doc=document;


    var contains = function (point,corner) {
        if(point.x>corner.x && point.x<(corner.x+corner.width)
            && point.y>corner.y && point.y<(corner.y+corner.height)
            ){
            return true;
        }
        return false;
    };
    var detect = function (placeholderElem,activeItem) {
        var center={
            x:(parseInt(placeholderElem.style.left)+placeholderElem.offsetWidth/2),
            y:(parseInt(placeholderElem.style.top)+placeholderElem.offsetHeight/2)
        };

        for(var i in queue){
            if(queue.hasOwnProperty(i)){
                if(contains(center,queue[i].corner) && queue[i].isEnabledDrop){
                    var temp=queue[i].insertWhereDetect(placeholderElem);
                    queue[i].wrap.insertBefore(activeItem,temp||null);// ie8ÏÂ²»Ö§³Öundefined£¬ÐèÒª×ª»»Îªnull
                    placeholder.removePlaceholder();
                    return;
                }
            }
        }

        placeholder.removePlaceholder();
    };
    var createEvent = function () {
        var itemOffsetX=0,
            itemOffsetY=0,
            isStart,
            isFirstTimeMove,
            activeItem=null;

        $.on(doc, "mousedown", function (e) {
            e=e||window.event;

            activeItem=e.target||e.srcElement;
            if(!hasClass(activeItem, itemSel)) return;
            isStart=!0;
            isFirstTimeMove=!0;

            var posi=getPosition(activeItem);
            itemOffsetX=e.clientX-posi.x;
            itemOffsetY=e.clientY-posi.y;

        });
        $.on(doc, "mousemove", function (e) {
            if(!isStart) return;
            e=e||window.event;
            var posiX=e.clientX-itemOffsetX,
                posiY=e.clientY-itemOffsetY;

            isFirstTimeMove && (placeholder.addPlaceholder(activeItem), isFirstTimeMove=!1);

            placeholder.setPlaceholderPosi(posiX, posiY);
        });
        $.on(doc, "mouseup", function (e) {
            if(!isStart) return;
            isStart=!1;
            isFirstTimeMove=!0;
            placeholder.elem && detect(placeholder.elem, activeItem);
        })
    };


    var placeholder={
        elem:null,
        addPlaceholder:function (originNode) {
            this.elem=originNode.cloneNode(true);
            addClass(this.elem,"placeholder");
            doc.body.appendChild(this.elem);
        },
        removePlaceholder:function () {
            this.elem.style.left="";
            this.elem.style.top="";
            doc.body.removeChild(this.elem);
            this.elem=null;
        },
        setPlaceholderPosi:function (x,y) {
            this.elem.style.left=x+"px";
            this.elem.style.top=y+"px";
        }
    };


    function Drag (wrap,opt) {
        this.wrap=wrap;

        this.isEnabledDrop=!0;
        this.opt=opt;
        this.id="ipt_"+Math.floor(Math.random()*1000);
        this.corner={};

        this.init();
    }
    Drag.prototype={
        constructor:Drag,
        init:function () {
            var _wrap=this.wrap;
            this.corner={
                x:_wrap.offsetLeft,
                y:_wrap.offsetTop,
                width:_wrap.offsetWidth,
                height:_wrap.offsetHeight
            };
        },
        insertWhereDetect:function (item) {
            var that=this,
                index=-1,
                items=that.wrap.children||getElementsByClassName(that.wrap,itemSel),
                itemPosi=getPosition(item);
            for(var i=0,len=items.length; i<len; i++){
                var posi=getPosition(items[i]);
                if(itemPosi.y>posi.y){
                    index=i;
                }
            }

            return items[index+1];
        }
    }

    exprots.drag=function (opt) {
        if(!opt.wrapSel) return;
        var wraps=getElementsByClassName(doc.body,opt.wrapSel.substring(1)),
            temp;
        for(var i=0, len=wraps.length; i<len; i++){
            temp=new Drag(wraps[i],opt);
            queue[temp.id]=temp;
        }
    };

    createEvent();
})(window);


window.drag({
    wrapSel:".wrap"
});

