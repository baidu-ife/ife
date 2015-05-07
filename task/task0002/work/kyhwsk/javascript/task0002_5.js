/**
 * Created by wsk on 15/5/7.
 */
function Dragger(){
    $.delegate('.box','div','dragstart',function(e){
        console.log(e.target);
    });
    //change specify elements to dragtarget



}

var a = new Dragger();
