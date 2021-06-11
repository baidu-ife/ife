var oForBtn=$(".forward");
var oRevBtn=$(".reverse");
var oImgBox=$(".imgBox");
var oStop=$(".stop");
var oImg=oImgBox.getElementsByTagName('img');
var dots=$('.dots');
var dot=dots.getElementsByTagName('li');
var index=1;

oImgBox.style.width=oImg.length*oImg[0].offsetWidth+'px';//根据图片的数目设置imgBox的宽度；
function run(offset) {
    var speed = offset / 15;             //设置每张图片轮播的速度
    var target = -oImgBox.offsetWidth+300;
    var eveTarget = oImgBox.offsetLeft + offset;
        function go() {                                      //go()函数将offset传入则不起作用；
            if ((!!speed) && (oImgBox.offsetLeft < target))// JS 中非0的数字都为true;
            {
                oImgBox.style.left = 0;                  //向左轮播到最后一张时，使left=0，即从第一张再次开始播放
                console.log("执行");
            }
            else if ((speed > 0) && (oImgBox.offsetLeft>0)) { //向右轮播时，第一张后是第四张；
                oImgBox.style.left = '-900px';

            }
           else if ((speed < 0) && (oImgBox.offsetLeft>eveTarget)||(speed > 0) && (oImgBox.offsetLeft<eveTarget)) //每张图片轮播的边界条件，
            {

               oImgBox.style.left = oImgBox.offsetLeft + speed + 'px';
                setTimeout(go, 10);

            }
        }
        go();

}

function buttonActive(){    //设置圆点的颜色变化
   var i=0;
    for(i=0;i<dot.length;i++)
    {
        if(dot[i].className=="active")
        {dot[i].className="";
        break;}
    }
    if(index==4)
        index=1;
    else
        index+=1;

    dot[index-1].className="active";

}


for(i=0;i<dot.length;i++){   //点击原点
   dot[i].index=i+1;
   dot[i].onclick=function(){
        var targetIndex=this.index;
         if(targetIndex==index)
         return;
       console.log(targetIndex);
       console.log(targetIndex-index);
        run(-(targetIndex-index)*300);
         index=targetIndex-1;

       buttonActive();
   }
}
var timer;
function play(offset){
    run(offset);
    buttonActive();
}
oRevBtn.onclick=function(){
  if(timer){
       clearInterval(timer);
    }
    timer=setInterval(function(){play(-300)},1000);
    //向左逆序
};


oForBtn.onclick=function(){
    if(timer){
        clearInterval(timer);
    }
    timer=setInterval(function(){play(300)},1000);
};//向右正序
oStop.onclick=function()
{
    clearInterval(timer);
};