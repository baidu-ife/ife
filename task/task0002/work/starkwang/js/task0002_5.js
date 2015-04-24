(function(){
    var  draggingObj = null;
    var  diffX = 0;
    var  diffY = 0;
    var  moveid;
    var  left = ["item1","item2","item3","item4","space","space"],right = ["item6","item5","space","space","space","space"];
    function down(e){
        console.log(e.target.id);
        moveid = e.target.id;
        if(e.target.className.indexOf('item')!= -1){
            draggingObj = e.target;
            diffX = event.clientX-draggingObj.offsetLeft;
            diffY = event.clientY-draggingObj.offsetTop;
            console.log(draggingObj.offsetLeft,draggingObj.offsetTop);
            console.log(diffX,diffY);
        }
    }

    function move(e){
        var  dialog = document.getElementById(moveid);
        if(draggingObj){
            dialog.style.left = (e.clientX-diffX)+'px';
            dialog.style.top = (e.clientY-diffY)+'px';
        }
    }

    function up(e){
        draggingObj = e.target;
        if(draggingObj.offsetLeft<100&&right.indexOf(draggingObj.id)!= -1){
            if(draggingObj.offsetTop<50&&left[0] == "space"){
            draggingObj.style.top = "10px";
            draggingObj.style.left = "";
            left[0] = draggingObj.id;
            }
        for(var i = 1;i<6;i++){
            if(draggingObj.offsetTop>100*i-50&&draggingObj.offsetTop<100*i+50&&left[i] == "space"){
                draggingObj.style.top = (i*102).toString()+"px";
                draggingObj.style.left = "";
                left[i] = draggingObj.id;
            }
        }
        $("#box_left").innerHTML = $("#box_left").innerHTML+draggingObj.outerHTML;
        right[right.indexOf(draggingObj.id)] = "space";
        try{
            draggingObj.remove();
        }catch(exception){
            removeElement(draggingObj);
        }
    }




        if(draggingObj.offsetLeft>300&&left.indexOf(draggingObj.id)!= -1){
            if(draggingObj.offsetTop<50&&right[0] == "space"){
                draggingObj.style.top = "10px";
                draggingObj.style.left = "";
                right[0] = draggingObj.id;
            }
            for(var i = 1;i<6;i++){
                if(draggingObj.offsetTop>100*i-50&&draggingObj.offsetTop<100*i+50&&right[i] == "space"){
                    draggingObj.style.top = (i*102).toString()+"px";
                    draggingObj.style.left = "";
                    right[i] = draggingObj.id;
                }
            }
            $("#box_right").innerHTML = $("#box_right").innerHTML+draggingObj.outerHTML;
            left[left.indexOf(draggingObj.id)] = "space";
            try{
                draggingObj.remove();
            }catch(exception){
                removeElement(draggingObj);
            }
            }
        draggingObj = null;
        diffX = 0;
        diffY = 0;
        console.log(left);
        console.log(right);
    }
    function removeElement(_element){
        var _parentElement  =  _element.parentNode;
        if(_parentElement){
            _parentElement.removeChild(_element);
        }
    }
    var drag = {
        down : down,
        move : move,
        up : up
    }
    window.drag = drag;
})()

document.addEventListener('mousedown',drag.down);
document.addEventListener('mousemove',drag.move);
document.addEventListener('mouseup',drag.up);