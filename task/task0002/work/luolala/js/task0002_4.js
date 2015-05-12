var oSearch=$(".search");
var oSuggestBox=$(".suggestBox");
var oLi=oSuggestBox.getElementsByTagName('li');
var index=-1;
var suggsetData=[
    "abstract",
    "black",
    "color",
    "double",
    "JavaScript"
];
var newL=[];
function show() {
    for(i=0;i<suggsetData.length;i++)
  {
    newL[i]=document.createElement('li');
    newL[i].innerHTML=suggsetData[i];
    oSuggestBox.appendChild(newL[i]);
  }
  mouseClick();
  addEvent(oSearch,"keyup",function () {
       keyMove();
 });

}
show();

function keyMove(e){                           //键盘上下箭头和Enter键事件
    var event=e||window.event;
    if(window.event) {                          // 获取键盘按下的字符
        var keyNumber = event.keyCode;
    }
    else if(event.which) {
       var keyNumber = event.which;
    }
    if(keyNumber>=65&&keyNumber<=90)
        oSuggestBox.style.display='block';
    if(index >= 0&&index<oLi.length)
    {
        for(var i=0;i<oLi.length;i++)
            if(oLi[i].className=="active")
                oLi[i].className=" ";
        }
    switch(keyNumber) {
        case 38:
            if (index > 0)
            {index--;
             oLi[index].className="active";}
            break;
        case 40:
            if(index<oLi.length-1)
            {index++;
             oLi[index].className="active";}  // 键盘向下箭头
            break;
        case 13:                             //enter键
            oSearch.value = oLi[index].innerHTML;
            clear();
            break;
        default:break;
 }

 }
function mouseClick(){               //鼠标点击获取
    for(var i=0;i<oLi.length;i++)
    {
        addClickEvent(oLi[i],function(){
              oSearch.value=this.innerHTML;
              this.className='active';
              clear();
          })

    }

}
function clear(){
    oSuggestBox.style.display='none';

}