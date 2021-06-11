/**
 * Created by mengjie on 6/4/2015.
 */
window.onload=play;
function play(){
    var search_text=document.getElementById('search_text');
    var suggestData = ['Simon', 'Erik', 'Kener'];
    var content="";
    var index=-1;
    var panel=document.getElementById("panel");
    var panel_inner=document.createElement('ul');
    addClass(panel_inner,'panelul');
    for( var i= 0,len=suggestData.length;i<len;i++){
        content+="<li id='hot_"+i+"'"+" class='item'><a>"+suggestData[i]+"</a></li>"
    }
    panel_inner.innerHTML=content;
    panel.appendChild(panel_inner);
    addEvent(search_text,'click',showpanel);
    addEvent(panel,'click',showpanel);
    addEvent(document,'click',hidepanel);
    addEvent(document,'keydown',function(e){
        var panel=document.getElementById("panel");
        var search_text=document.getElementById('search_text');
        var as=panel.getElementsByTagName('li');
        e=e||window.event;
        var  target= e.target|| e.srcElement;
        if(e.keyCode==38){
            index--;
            if(index<0){
                index=as.length-1;
            }
        }else if(e.keyCode==40){
            index++;
            if(index>as.length||index==as.length){
                index=0;
            }
        }
        for(var j= 0,len=as.length;j<len;j++){
            if(as[j].getAttribute('id')=="hot_"+index){
                as[j].style.background="#fff";
                if(e.keyCode==13){
                    search_text.value=as[j].childNodes[0].innerHTML;//li的childnodes是a
                    panel.style.display='none';
                    as[j].style.background="#ccc";
                }
            }else {
                as[j].style.background="#ccc";
            }
        }
    });

}
function showpanel(e){

    var panel=document.getElementById("panel");
    var search_text=document.getElementById('search_text');
    e=e||window.event;
    if(panel.style.display=='none'){
        panel.style.display='block';
        if(e.stopPropagation){
            e.stopPropagation();
        }else {
            e.cancelBubble=true;
        }
    }else if(panel.style.display=='block'){
        var  target= e.target|| e.srcElement;
        panel.style.display='block';
        if(target.tagName.toLowerCase()=="a"){
            search_text.value=target.innerHTML;
            panel.style.display='none';
        }
        if(e.stopPropagation){
            e.stopPropagation();
        }else {
            e.cancelBubble=true;
        }
    }
}

function hidepanel(e){
    var panel=document.getElementById("panel");
    if(panel.style.display=='block'){
        panel.style.display='none';
    }
}
/*
function keyshow(e,index){
    var panel=document.getElementById("panel");
    var search_text=document.getElementById('search_text');
    var as=panel.getElementsByTagName('li');
    e=e||window.event;
    var  target= e.target|| e.srcElement;
    if(e.keyCode==38){
        index--;
        if(index<0){
            index=as.length-1;
        }
    }else if(e.keyCode==40){
        index++;
        if(index>as.length||index==as.length){
            index=0;
        }
    }
    for(var j= 0,len=as.length;j<len;j++){
        if(as[j].getAttribute('id')=="hot_"+index){
           as[j].style.background="#fff";
            if(e.keyCode==13){
                search_text.value=target.innerHTML;
                panel.style.display='none';
            }
        }
    }

}*/
