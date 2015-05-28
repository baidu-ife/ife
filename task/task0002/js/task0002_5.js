var dragItem = {
    init: function(event){
        var oThis = this;
        var e = event || window.event;
        this.dropable = false;
        this.container = $(".container");
        this.target = e.srcElement || e.target;
        this.disX = e.clientX - this.target.offsetLeft;
        this.disY = e.clientY - this.target.offsetTop;
        this.conFrom = this.target.parentNode;
        this.conTo = this.target.parentNode.nextElementSibling || this.target.parentNode.previousElementSibling;
        this.dropRange = {
            dLeft: oThis.conTo.offsetLeft - oThis.target.offsetWidth,
            dRight: oThis.conTo.offsetLeft +oThis.conTo.offsetWidth,
            dTop: oThis.conTo.offsetTop,
            dBottom: oThis.conTo.offsetTop + oThis.conTo.offsetHeight + this.target.offsetHeight
        };
        this.moveRange = {
            mLeft : oThis.container.offsetLeft,
            mRight: oThis.container.offsetLeft + oThis.container.offsetWidth - oThis.target.offsetWidth,
            mTop: oThis.container.offsetTop,
            mBottom: oThis.container.offsetTop + oThis.container.offsetHeight - oThis.target.offsetHeight
        }
        this.target.style.position = "absolute";
        this.target.style.cursor = "move";
        this.target.style.top = this.target.offsetTop + "px";
        this.target.style.left = this.target.offsetLeft + "px";
        this.target.onmousemove = function(e){
			var e = e || window.event;
            oThis.doMove(oThis.target,e);

        };
        this.target.onmouseup = function(){
            oThis.doChange(oThis.target);
        }
    },
    doMove: function(element, event){
        var oThis = this;
        var e = event || window.event;
        element.style.top = (e.clientY - this.disY) + "px";
        element.style.left = (e.clientX - this.disX) + "px";
        if(element.offsetLeft > this.moveRange.mRight ){
            element.style.left = this.moveRange.mRight + "px";
        }
        if(element.offsetLeft < this.moveRange.mLeft){
            element.style.left = this.moveRange.mLeft + "px";
        }
        if(element.offsetTop < this.moveRange.mTop){
            element.style.top = this.moveRange.mTop + "px";
        }
        if(element.offsetTop > this.moveRange.mBottom){
            element.style.top = this.moveRange + "px";
        }
        if(element.offsetLeft > this.dropRange.dLeft && element.offsetLeft < this.dropRange.dRight && element.offsetTop > this.dropRange.dTop && element.offsetTop < this.dropRange.dBottom){
            this.dropable = true;
        }
    },
    doChange: function (element) {
        if(this.dropable){
            element.onmousemove = null;
            this.conFrom.removeChild(element);
            this.conTo.appendChild(element);
            element.style.position = "static";
            element.style.cursor = "default";
        }else{
            element.style.position = "static";
            element.style.cursor = "default";
        }
    }
}
$("#leftContent").onmousedown = function(e){
	var e = e || window.event;
    dragItem.init(e);
}

$("#rightContent").onmousedown = function(e){
	var e = e || window.event;
    dragItem.init(e);
}

//$("#rightContent", "mousedown", function(){
//    dragItem();
//});
//addEvent($("#leftContent"), "dragstart", function(){
//
//})
