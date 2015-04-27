function carousel(element){
    function Empty(){}
    Empty.prototype=element;
    var myCarousel=new Empty();
    var width=myCarousel.clientWidth;
    var height=myCarousel.clientHeight;
    each(myCarousel.getElementsByTagName("img"), function (index, item){
        item.width=width;
        item.height=height;
        item.style.left=index*width+"px";
    });
}
window.onload=function (e){
    carousel($(".carousel"));
}
