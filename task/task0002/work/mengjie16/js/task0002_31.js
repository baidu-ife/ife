/**
 * Created by dell on 2015/6/2.
 */
window.onload=lunbo;
function lunbo(){
    var pre=0;
    var timer="";
    var indicators=document.getElementById("indicators");
    addEvent(indicators,'click',clickli);
}
function clickli(){
   var e =arguments[0]||window.event,
       target = e.srcElement ? e.srcElement : e.target;
       addClass(target, "active");
       var len=target.id.length;
       var num=target.id.substr(len-1,1);
       var imgid=document.getElementById("img"+num);
   //console.log(target.id,imgid,len,num);
       addClass(imgid, "active");
       var indilen=indicators.getElementsByTagName("li").length;
       // console.log(indilen);
    for(var i= 0;i<indilen;i++){
        var imgi=document.getElementById("img"+i);
        var indicatori=document.getElementById("indicator_"+i);
        if(i!=num){
            console.log(imgi,indicatori);
            removeClass(imgi,"active");
            removeClass(indicatori,"active");
        }
    }

}