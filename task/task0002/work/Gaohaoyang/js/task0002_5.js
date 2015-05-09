/*实现一个可拖拽交互的界面
如示例图，左右两侧各有一个容器，里面的选项可以通过拖拽来左右移动
被选择拖拽的容器在拖拽过程后，在原容器中消失，跟随鼠标移动
注意拖拽释放后，要添加到准确的位置
拖拽到什么位置认为是可以添加到新容器的规则自己定
注意交互中良好的用户体验和使用引导*/
var relatX = 0;
var relatY = 0;

$.delegate(".left-block", "div", "mousedown", function(ev) {
    console.log("111")
    console.log(this)
    var oEvent = ev || event;

    relatX = oEvent.clientX - this.offsetLeft;
    relatY = oEvent.clientY - this.offsetTop;

    //鼠标移动
    this.onmousemove = function(ev) {
        var oEvent = ev || event;
        console.log("222");
        console.log(this);
        this.style.left = oEvent.clientX - relatX + "px";
        this.style.top = oEvent.clientY - relatY + "px";
    };

    //鼠标松开
    this.onmouseup = function() {
        this.onmousemove = null;
        this.onmouseup = null;
    };
});