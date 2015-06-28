/*
* task0002_5(2).js
*
* 不支持ie8及以下，因为要求支持addEventListener或attachEvent
*/

(function (exprots) {
    var contains=function (point,corner) {
        if(point.x>corner.x && point.x<(corner.x+corner.width)
            && point.y>corner.y && point.y<(corner.y+corner.height)
            ){
            return true;
        }
        return false;
    };

    var queue={},
        doc=document;

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
        this.activeItem=null;

        this.isEnabledDrop=!0;
        this.opt=opt;
        this.id="ipt_"+Math.floor(Math.random()*1000);

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

            if(doc.addEventListener||doc.attachEvent){
                this.createEvent();
            }
        },
        createEvent:function () {
            var that=this,
                opt=that.opt;
            var itemOffsetX=0,
                itemOffsetY=0,
                isFirstTimeMove;

            $.delegate(that.wrap, opt.itemSel, "mousedown", function (e) {
                e=e||window.event;
                that.activeItem=this;
                that.isStart=!0;

                var posi=getPosition(this);
                itemOffsetX=e.clientX-posi.x;
                itemOffsetY=e.clientY-posi.y;

                isFirstTimeMove=!0;
            });
            // 虽然给doc绑定了很多的mousemove但是由于that是不同的（闭包），所以只会触发响应的处理函数
            $.on(doc, "mousemove", function (e) {
                if(!that.isStart) return;
                e=e||window.event;
                var posiX=e.clientX-itemOffsetX,
                    posiY=e.clientY-itemOffsetY;

                isFirstTimeMove && (placeholder.addPlaceholder(that.activeItem), isFirstTimeMove=!1);

                placeholder.setPlaceholderPosi(posiX, posiY);
            });
            $.on(doc, "mouseup", function (e) {
                if(!that.isStart) return;
                that.isStart=!1;
                isFirstTimeMove=!0;
                placeholder.elem && that.detect(placeholder.elem);
            })
        },
        recover:function () {
            this.activeItem=null
            placeholder.removePlaceholder();
        },
        detect:function (placeholder) {
            var that=this,
                center=that.getCenter(placeholder);

            for(var i in queue){
                if(queue.hasOwnProperty(i)){
                    if(contains(center,queue[i].corner) && queue[i].isEnabledDrop){
                        var temp=queue[i].insertWhereDetect(placeholder);
                        queue[i].wrap.insertBefore(that.activeItem,temp||null);// ie8下不支持undefined，需要转换为null
                        that.recover();
                        return;
                    }
                }
            }

            that.recover();
        },
        insertWhereDetect:function (item) {
            var that=this,
                index=-1,
                items=that.wrap.children||getElementsByClassName(that.wrap,that.opt.itemSel),
                itemPosi=getPosition(item);
            for(var i=0,len=items.length; i<len; i++){
                var posi=getPosition(items[i]);
                if(itemPosi.y>posi.y){
                    index=i;
                }
            }

            return items[index+1];
        },
        getCenter:function (item) {
            return {
                x:(parseInt(item.style.left)+item.offsetWidth/2),
                y:(parseInt(item.style.top)+item.offsetHeight/2)
            };
        }
    }

    exprots.drag=function (opt) {
        if(!opt.wrapSel||!opt.itemSel) return;
        var wraps=getElementsByClassName(doc.body,opt.wrapSel.substring(1)),
            temp;
        for(var i=0, len=wraps.length; i<len; i++){
            temp=new Drag(wraps[i],opt);
            queue[temp.id]=temp;
        }
    }
})(window);


window.drag({
    wrapSel:".wrap",
    itemSel:".item"
});

