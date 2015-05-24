var oContainer = document.getElementById('container');
var oTab = document.getElementById('tab');
var aLi = oTab.getElementsByTagName('li');
var oPane = document.getElementById('pane');
var aImg = oPane.getElementsByTagName('img');
var oArrow = document.getElementById('arrow');
var aSpan = oArrow.getElementsByTagName('span');
var index = 0;
for(var i=0; i<aLi.length; i++){
    aLi[i].index = i;
    aLi[i].onclick = function(){
        index = this.index;
        switchImg( this.index );
    };
}
function switchImg(idx){//切换图片函数
    for(var i=0; i<aLi.length; i++){
            aLi[i].className = "";
            aImg[i].className = "";
        }
        aLi[idx].className = "active";
        aImg[idx].className= "active";
}

aSpan[0].onclick = function(){
    index--;
    if(index < 0){
        index = aLi.length - 1;
    }
    switchImg(index);
}
aSpan[1].onclick = function(){
    index++;
    if(index > aLi.length - 1){
        index = 0;
    }
    switchImg(index);
}
var timer;
function start(){
    timer = setInterval(function(){
    aSpan[1].onclick();
    },2000);
}
start();
oContainer.onmouseover = function(){
        clearInterval(timer);
    }
oContainer.onmouseout = function(){
    start();
}
