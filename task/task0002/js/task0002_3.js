var $$ = function(tag, obj){return (obj || document).getElementsByTagName(tag);}

var autoPlay = function(selector, seq, isloop, gaptime){
    this.init(selector, seq, isloop, gaptime);
}

autoPlay.prototype = {
    init: function(selector, seq, isloop, gaptime){
        var oThis = this;//之后会用到这个应用，而且之后this值可能改变，所以在此先做赋值处理
        this.oBox = $(selector);
        this.oUl = simSelect(".target", this.oBox);
        this.oImg = document.getElementsByTagName("img");


        this.sequence = seq|| 1;//用来设置自动播放的顺序，正序为1，倒序为-1
        console.log(this.sequence);
        this.isloop = isloop || 1;//用来设置自动播放是否循环
        console.log(isloop);
        this.gap =  gaptime || 3000;//设置自动播放切换的时间间隔

        this.timer = null;//用来实现切换动画的Interval引用
        this.autoTimer = null;//实现自动播放的Interval引用
        if(this.sequence == 1){
            this.iNow = 0;
        }else{
            this.iNow = this.oImg.length - 1;
        }
        this.createBtn();
//        var btnUl = $(".btns");
        this.oBtn = $$("li",this.oBtnBox);
//        console.log(this.oBtn);
        this.switching();//执行切换后的渲染
        this.autoTimer = window.setInterval(function(){
            oThis.next();//此时this指向变化，所以要用oThis
        }, oThis.gap);
        this.oBox.onmouseover = function(){
            window.clearInterval(oThis.autoTimer);
        };
        this.oBox.onmouseout = function(){
            oThis.autoTimer = window.setInterval(function(){
                oThis.next();
            }, oThis.gap);
        }
        for(var i = 0; i < this.oBtn.length; i++){
            this.oBtn[i].index = i;
            this.oBtn[i].onclick = function(){
                oThis.iNow = this.index;
                oThis.switching();
            }
        }
    },
    createBtn: function(){
        this.oBtnBox = document.createElement("ul");
        var oFrag = document.createDocumentFragment();
        this.oBtnBox.className = "count";
        for (var i = 0; i < this.oImg.length; i++)
        {
            var oLi = document.createElement("li");
            oLi.innerHTML = i + 1;
            oFrag.appendChild(oLi)
        }
        this.oBtnBox.appendChild(oFrag);
        this.oBox.appendChild(this.oBtnBox);
    },
    switching: function(){
        for(var i in this.oBtn){
            this.oBtn[i].className = "";
        }
//        console.log(this.oBtn[1]);
        this.oBtn[this.iNow].className = "current";
        this.doMove(-(this.iNow*this.oImg[0].offsetWidth));//参数计算要显示iNow图片，上层的ul的offLeft应该设置为这个值
    },
    next: function(){
        var oThis = this;
        if(this.sequence == 1){
            this.iNow++;
            if(this.isloop == 1){
                this.iNow == this.oBtn.length && (this.iNow = 0);
            }else{
                if(this.iNow == this.oBtn.length){
                    window.clearInterval(oThis.autoTimer);
                    return
                }
            }
        }else{
            this.iNow--;
            if(this.isloop == 1){
                this.iNow < 0 && (this.iNow = this.oBtn.length-1);
            }else{
                if(this.iNow < 0){
                    window.clearInterval(oThis.autoTimer);
                    return;
                }
            }
        }
        this.switching();
    },
    doMove: function(iTarget){
        var oThis = this;
        window.clearInterval(oThis.timer);
        oThis.timer = window.setInterval(function(){
            var speed = (iTarget - oThis.oUl.offsetLeft) / 1;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            oThis.oUl.offsetLeft == iTarget ? clearInterval(oThis.timer) : oThis.oUl.style.left = oThis.oUl.offsetLeft + speed +"px";
        },20);
    },
    reset: function(){
        var oThis = this;
        window.clearInterval(oThis.autoTimer);
        this.autoTimer = window.setInterval(function(){
            oThis.next();//此时this指向变化，所以要用oThis
        }, this.gap);

    }

};

/*-----------------------------------------------实现播放设置开始---------------------------------------------*/
function getRadioValue(target){
    var nodes = document.getElementsByName(target);
    for(var k in nodes){
        if(nodes[k].checked){
            return nodes[k].value;
        }
    }
}

function doAsSetting(){
    var seq = 1;
    var isloop = 1;
    var gaptime = 2000;
    seq = getRadioValue("sequence");
    isloop = getRadioValue("isloop");
    gaptime = $("#gap").value;
    playing.sequence = seq;
    playing.isloop = isloop;
    playing.gap = gaptime;
    playing.reset();
}

$.click(".setBtn", doAsSetting);

/*-----------------------------------------------实现播放设置结束---------------------------------------------*/
var playing = new autoPlay("#box",-1, 1, 2000);
