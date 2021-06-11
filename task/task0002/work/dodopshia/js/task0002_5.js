function $(id) {
    return document.getElementById(id);
}
 
/**
 * 创建可拖拽对象的工厂方法
 */
 function Parentxy(element){
    obj=new Object();
    obj.y=element.offsetTop;
    obj.x=element.offsetLeft;
    return obj;

 }
 //console.log(Parentxy($("leftBox")));
// console.log(Parentxy($("rightBox")));
function createDraggableObject() {
    return {
        obj: null, left: 0, top: 0,
        oldX: 0, oldY: 0, isMouseLeftButtonDown: false,
        init: function (obj) {
            this.obj = obj;
            var that = this;
            this.obj.onmousedown = function (args) {
                var evt = args || event;
                this.style.zIndex = 100;
                that.isMouseLeftButtonDown = true;
                that.oldX = evt.clientX;
                that.oldY = evt.clientY;
                if (this.currentStyle) {
                    that.left = parseInt(this.currentStyle.left);
                    that.top = parseInt(this.currentStyle.top);
                }
                else {
                    var divStyle = document.defaultView.getComputedStyle(this, null);
                    that.left = parseInt(divStyle.left);
                    that.top = parseInt(divStyle.top);
                }
            };
            this.obj.onmousemove = function (args) {
                that.move(args || event);
            };
            this.obj.onmouseup = function () {
                
                that.isMouseLeftButtonDown = false;
                this.style.zIndex = 0;
                console.log(this.style.left);
                console.log(this.style.top);
                var parent=this.parentNode;
            if(parent.id=="leftBox"){
                var str=this.style.left
                var left=str.substring(0,str.length-2);
                if(left>300){
                    parent.removeChild(this);
                    this.style.left=0+'px';
                    this.style.top=0+'px';
                    $('rightBox').appendChild(this);
                }else{
                    this.style.left=0+'px';
                    this.style.top=0+'px';
                }

            }else{
                var str=this.style.left
                var left=str.substring(0,str.length-2);
                if(left<-300){
                    parent.removeChild(this);
                    this.style.left=0+'px';
                    this.style.top=0+'px';
                    $('leftBox').appendChild(this);
                }else{
                    this.style.left=0+'px';
                    this.style.top=0+'px';
                }
            }
            };
        },
        move: function (evt) {
            if (this.isMouseLeftButtonDown) {
                var dx = parseInt(evt.clientX - this.oldX);
                var dy = parseInt(evt.clientY - this.oldY);
                this.obj.style.left = (this.left + dx) + 'px';
                this.obj.style.top = (this.top + dy) + 'px';
            }

        }

        
        /*line: function(obj){
            var parent=this.obj.parentNode;
            if(parent.id=="leftBox"){
                if(this.obj.style.left>300){
                    console.log("hi");
                }

            }else{

            }
            
        }*/
    };
}
