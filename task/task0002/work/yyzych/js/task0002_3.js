/*
* task0002_3.js
*/

(function (exprots) {
    var rendor=function () {
        var domStyle=document.createElement("div").style;
        var rendors=['t', 'webkitT', 'MozT', 'msT', 'OT'],
            tranform;

        for(var i=0;i<rendors.length;i++){
            tranform=rendors[i]+"ransition";
            if(tranform in domStyle){
                return rendors[i].substring(0,rendors[i].length-1);
            }
        }

        return false;
    }();
    var querySelectorAll=function (context,selector) {
        if(typeof context.querySelectorAll === "function"){
            return context.querySelectorAll(selector);
        }else{
            var temp=selector.replace(/[\.#]/g,"");
            return getElementsByClassName(context,temp);
        }
    };
    var getSiblingElement=function (curDom) {
        if(curDom.nextElementSibling){
            return curDom.nextElementSibling;
        }else{
            var res=curDom.nextSibling;
            while(res!==null && res.nodeType!==1){
                res=res.nextSibling;
            }
            return res;
        }
    };

    var queue={},
        defOpt={
            direction:true,// true:正序即left  false:反序即right
            isLoop:true,
            duration:400
        };

    function Slide (opt) {
        this.wrap=$(opt.wrapSelector);
        this.items=querySelectorAll(this.wrap,opt.itemSelector);
        this.isLoop=opt.isLoop;
        this.direction=opt.direction;
        this.duration=opt.duration;
        this.itemWidth=opt.itemWidth;

        this.curItem=this.items[0];
        this.curIndex=0;
        addClass(this.curItem,"z-current");
        this.curSqure=null;
        this.isDisabled=!1;
        this.id="s"+Date.now()+Math.floor(Math.random()*100);
        this.timer=null;

        this.init();
    };
    Slide.prototype={
        constructor:Slide,
        init:function () {
            var that=this;

            that.createSqure();
            that.createEvent();

            if(rendor===false){
                // 不支持css3
                that.itemWidth=that.curItem.offsetWidth;
                if(that.itemWidth===0){
                    // IE8下有时会为0,这是为什么???
                    that.itemWidth=that.curItem.offsetWidth;
                }
                this.curItem.style.left="0px";
                that.start();
            }else{
                var transition=rendor?(rendor+"Transition"):"transition";
                for(var i=0,len=that.items.length; i<len; i++){
                    that.items[i].style[transition]="left .6s ease-out";
                }
                that.start();
            }
        },
        refresh:function (opt) {
            this.isLoop=opt.isLoop;
            this.direction=opt.direction;
            this.duration=opt.duration;
            clearInterval(this.timer);
            this.timer=null;

            this.start();
        },
        pouse:function () {
            clearInterval(this.timer);
            this.timer=null;
            return;
        },
        run:function () {
            var that=this;
            if(that.isDisabled) return;
            var next=that.getSiblingElement();
            if(!next){
                // 不循环的状况
                clearInterval(that.timer);
                that.timer=null;
                return;
            }
            if(rendor===false){
                next.nextItem.style.left=that.direction?(that.itemWidth+"px"):(-that.itemWidth+"px");
            }else{
                next.nextItem.style.left=that.direction?"100%":"-100%";
            }
            
            that.setSqureCurrent(next.nextSqure);
            that.segue(next.nextItem,next.nextItemIndex,that.direction?"left":"right");
        },
        start:function () {
            var that=this;
            that.timer=setInterval(function(){
                that.run();
            },that.duration);
        },
        createEvent:function () {
            var that=this;
            $.on(this.wrap,"mouseover",function (e) {
                that.pouse();
            });
            $.on(this.wrap,"mouseout",function (e) {
                that.start();
            });
        },
        getSiblingElement:function () {
            var that=this,
                isLoop=that.isLoop;
            var nextItem=getSiblingElement(that.curItem),
                nextItemIndex=that.curIndex+1,
                nextSqure=getSiblingElement(that.curSqure);

            if(!nextItem){
                if(isLoop){
                    nextItem=that.items[0];
                    nextItemIndex=0;
                    nextSqure=that.curSqure.parentNode.children[0];
                }else{
                    return null;
                }
            }

            return {
                nextItem:nextItem,
                nextItemIndex:nextItemIndex,
                nextSqure:nextSqure
            };
        },
        createSqure:function () {
            var that=this;
            var ft=document.createElement("div");
            for(var i=0,len=this.items.length; i<len; i++){
                var squre=document.createElement("a");
                squre.className="squre";
                squre.setAttribute("theItemIndex",i);
                ft.appendChild(squre);
                if(i===0){
                    that.curSqure=squre;
                    addClass(that.curSqure,"z-current");
                }
            }
            ft.className="ft";
            ft.style.width=len*25+"px";
            $.delegate(ft,"a","click",function (e) {
                if(that.isDisabled) return;
                var theItemIndex=this.getAttribute("theItemIndex");
                var theItem=that.items[theItemIndex];
                if(theItem===that.curItem) return;
                that.setSqureCurrent(this);
                if(rendor===false){
                    theItem.style.left=theItemIndex>that.curIndex?(that.itemWidth+"px"):(-that.itemWidth+"px");
                }else{
                    theItem.style.left=theItemIndex>that.curIndex?"100%":"-100%";
                }
                
                that.segue(theItem,theItemIndex);
            });
            that.wrap.appendChild(ft);
        },
        setSqureCurrent:function (actSqure) {
            removeClass(this.curSqure,"z-current");
            this.curSqure=actSqure;
            addClass(actSqure,"z-current");
        },
        segue:function (nextItem,nextItemIndex,direction) {
            var that=this;
            that.isDisabled=!0;
            addClass(that.curItem,"z-active");
            addClass(nextItem,"z-active");
            if(rendor===false){
                if(that.moveTimer){
                    clearInterval(that.moveTimer);
                    that.moveTimer=null;
                }
                that.moveTimer=setInterval(function () {
                    var nextItemCurLeft=parseInt(nextItem.style.left),
                        curItemCurLeft=parseInt(that.curItem.style.left);

                    if(nextItemCurLeft===0){
                        clearInterval(that.moveTimer);
                        that.moveTimer=null;
                        endAnim();
                        return;
                    }

                    var moveDist=0;
                    if(nextItemCurLeft<0){
                        moveDist=Math.floor((nextItemCurLeft-0)/10);
                    }else if(nextItemCurLeft>0){
                        moveDist=Math.ceil((nextItemCurLeft-0)/10);
                    }
                    nextItemCurLeft-=moveDist;
                    curItemCurLeft-=moveDist;

                    nextItem.style.left=nextItemCurLeft+"px";
                    that.curItem.style.left=curItemCurLeft+"px";
                },16.7);
            }else{
                setTimeout(function () {
                    if(direction){
                        direction==="left"?(that.curItem.style.left="-100%"):(that.curItem.style.left="100%");
                    }else{
                        that.curItem.style.left=nextItemIndex>that.curIndex?"-100%":"100%";
                    }
                    nextItem.style.left="0";
                },10);
                setTimeout(function () {
                    endAnim();
                },650);
            }

            function endAnim () {
                addClass(nextItem,"z-current");
                removeClass(nextItem,"z-active");
                removeClass(that.curItem,"z-active");
                removeClass(that.curItem,"z-current");
                that.curItem=nextItem;
                that.curIndex=parseInt(nextItemIndex);
                that.isDisabled=!1;
            };
        }
    };

    exprots.slidePlugin={
        slide:function (opt) {
            if(!opt.itemSelector||!opt.wrapSelector) return;
            opt=extend(defOpt,opt);
            var temp=new Slide(opt);
            queue[temp.id]=temp;
            return temp.id;
        },
        refresh:function (id,opt) {
            var obj=queue[id];
            if(!obj) return;
            opt=extend(defOpt,opt);
            obj.refresh(opt);
        }
    }
})(window);

window.onload=function () {
    var id = slidePlugin.slide({
        wrapSelector:".wrap",
        itemSelector:".item",
        duration:1500,
        direction:true
    });

    var directionDom=$("#direction"),
        isLoopDom=$("#isLoop"),
        durationDom=$("#duration");
    $.on("#sure","click",function (e) {
        var _direction=directionDom.value==="1"?true:false,
            _isLoop=isLoopDom.value==="1"?true:false,
            _duration=parseInt(durationDom.value);

        if(_duration<0){
            alert("间隔要大于0且为数字");
            return;
        }
        slidePlugin.refresh(id,{
            duration:_duration||1500,
            direction:_direction,
            isLoop:_isLoop
        });
    })
}

