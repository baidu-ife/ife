/**
 * Created by dell on 2015/6/1.
 */
/*第一阶段*/
window.onload=step;
function step(){
    var step_1 = document.getElementById("btn");
    var step_2 = document.getElementById("btn2");
    var step_3 = document.getElementById("btn3");
    addEvent(step_1,'click',function(){
        var step_inner1=document.getElementById("inputHobby");
        var arr=  step_inner1.value.split(',');
        var arruni= uniqArray(arr);
        var index=arruni.indexOf('');
        console.log(index);
        if(index>-1){
            arruni.splice(index,1);
        }
        console.log(arruni);
        console.log(arruni.length);
        var textId=document.getElementById("showHobby");
        textId.innerHTML=arruni.toString();
    });
    addEvent(step_2,'click',function(){
        var step_inner2=document.getElementById("inputHobby2");
        var re=/[,，、；;\s\n\t]+/;
        var arr=  step_inner2.value.split(re);
        var arruni= uniqArray(arr);
        var index=arruni.indexOf('');
        console.log(index);
        if(index>-1){
            arruni.splice(index,1);
        }
        console.log(arruni);
        console.log(arruni.length);
        var textId=document.getElementById("showHobby");
        textId.innerHTML=arruni.toString();
    });
    addEvent(step_3,'click',function(){
        var info=document.getElementById("info");
        var step_inner3=document.getElementById("inputHobby3");
        info.style.display='none';
        info.style.color='red';
        var re=/[,，、；;\s\n\t]+/;
        var arr=  step_inner3.value.split(re);
        var arruni= uniqArray(arr);
        var index=arruni.indexOf('');
        console.log(index);
        if(index>-1){
            arruni.splice(index,1);
        }
        if(arruni.length>10){
            info.innerHTML="爱好数量不能超过10个";
            info.style.display='block';

        }else if (arruni.length===0){
            info.innerHTML="不能什么都不输入";
            info.style.display='block';

        }else {
        console.log(arruni);
        console.log(arruni.length);
            var box= document.getElementById("box");
            var checkbox="";
            for(var i= 0,len=arruni.length;i<len;i++ ){
            checkbox+="<label for='hobby-"+i+"'>"+arruni[i].toString()+"</label><input type='checkbox' name='hobby' id='hobby-"+i+"'><br>";
            }
            box.innerHTML=checkbox;
        }
    });

}
