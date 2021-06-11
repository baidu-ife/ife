window.onload=function (){
    var dragging=false;
    var containerSpan=150;
    var containerWidth=150;
    function mousedown(e){
        var position=getPosition(this);
        var startX=e.clientX;
        var startY=e.clientY;
        var that=this;
        dragging=true;
        movingItem=this;
        addClass(this, "moving");
        this.addEventListener("mousemove", function (e2){
            if(dragging){
                that.style.left=e2.clientX-startX+"px";
                that.style.top=e2.clientY-startY+"px";
            }
        });
    }
    function mouseup(e) {
        var left, right;
        left=parseInt(this.style.left);
        right=parseInt(this.style.right);
        if (this.parentNode.id === "left") {
            if (left>containerSpan){
                $("#right").appendChild(this);
            }
        }
        if (this.parentNode.id === "right") {
            if (left<containerWidth-containerSpan){
                $("#left").appendChild(this);
            }
        }
        this.style.left=0;
        this.style.top=0;
        dragging=false;
        removeClass(this, "moving");
    }
    $.delegate("#left", "div", "mousedown", mousedown);
    $.delegate("#left", "div", "mouseup", mouseup);
    $.delegate("#right", "div", "mousedown", mousedown);
    $.delegate("#right", "div", "mouseup", mouseup);
}
