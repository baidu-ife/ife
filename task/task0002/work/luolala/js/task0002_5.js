var firstBox=$('.firstBox');
var secondBox=$('.secondBox');
var firstUl=firstBox.getElementsByTagName('ul')[0];
var secondUl=secondBox.getElementsByTagName('ul')[0];
var firstLi=firstBox.getElementsByTagName('li');
var secondLi=secondBox.getElementsByTagName('li');

//目前只实现了两个容器可以交替拖拽，且不能再次回到原来的容器,否则就会出现bug,还没有找到更好的解决办法。。。。。
function drag(element,anotherUl,theBox,anotherBox){
 for(var i=0;i<element.length;i++)
    {
           element[i].style.top=theBox.offsetTop+i*30+'px';
           element[i].index=i;  //获取索引值
           element[i].onmousedown=function(e){
            var that=this;
            var event=e||window.event;
            var nowT=that.offsetTop;
            var disX=event.clientX-that.offsetLeft;//鼠标位置与每个拖动块儿的距离
            var disY=event.clientY-that.offsetTop;


            document.onmousemove=function(e){

            var event=e||window.event;
            var l=event.clientX-disX;
            var t=event.clientY-disY;

              that.style.left=l+'px';
              that.style.top=t+'px';

           };

          document.onmouseup=function(){
              if(Math.abs((anotherBox.offsetLeft-that.offsetLeft))<that.offsetWidth)//如果该拖动块儿已经进入另一容器
               {
                   that.style.left=anotherBox.offsetLeft+'px';
                   that.style.top=(anotherUl.children.length)*30+anotherBox.offsetTop+'px';
                    console.log(that.parentNode);
                   var j=that.index+1;//被移动块后面的元素向上移动；

                  for(j;j<element.length;j++)
                   {
                      console.log('执行');
                       element[j].style.top=element[j].offsetTop-30+'px';
                   }
                   that.parentNode.removeChild(that);
                   anotherUl.appendChild(that);
                   //console.log(that.parentNode);

                }

               else //如果拖动到其他位置则回到所在容器；
               {
                   console.log("zhixing");
                   that.style.left=theBox.offsetLeft+'px';
                  that.style.top= nowT+'px';
               }
               document.onmousemove=null;
               document.onmouseup=null;
           };

        };

    }
}
function play(){
    drag(firstLi,secondUl,firstBox,secondBox);

    drag(secondLi,firstUl,secondBox,firstBox);
}
play();