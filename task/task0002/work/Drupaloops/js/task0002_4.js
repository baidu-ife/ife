/**
 * Created by Ooop on 2015/5/4.
 */
window.onload=function(){
    var lexicon=[
        "Oops",
        "Drupal",
        "HTML",
        "Tom",
        "Javascript",
        "Javascript for web developer"
    ];
    var thread=-1;
    function createAutoHtml(autoCompleteList,str){
        var _html="",
            i,
            _lexicon=lexicon,
            regStr=null,
            n= 0,
            v="";
        regStr=new RegExp("^("+str+")","g");
        for(i in _lexicon){
            if(n>=3)
                break;
            v=_lexicon[i];
            if(regStr.test(v)){
                n++;
                _html+="<div onclick='addContent(this)'>"+v+"</div>";
            }
        }
        if(!_html){
            autoCompleteList.style.display="none";
            return false;
        }
        else{
            autoCompleteList.innerHTML=_html;
            autoCompleteList.style.display="block";
            return true;
        }
    }
    function getTypeElement(es,type){
        var esLen=es.length;
        var eArr=[];
        var esl=null;
        for(var i=0;i<esLen;i++){
            esl=es[i];
            if(esl.nodeName.replace("#","").toLocaleLowerCase()==type)
                eArr.push(esl);
        }
        return eArr;
    }
    function autoComplete(){
        var autoComplete=document.getElementById("autoComplete"),
            autoCompleteList=null,
            str="";
        var createAuto=function(_this){
            clearTimeout(thread);
            str=_this.value;
            if(!str)
                return ;
            thread=setTimeout(function(){
                if(str.length>2&&!lexicon[str])
                    lexicon[str]=str;
            },500);
            autoCompleteList=document.getElementById("autoCompleteList");
            if(!createAutoHtml(autoCompleteList,str))
                return;
            var autoCompleteLists=getTypeElement(autoCompleteList.childNodes,"div");
            for(var i=0;i<autoCompleteLists.length;i++){
                autoCompleteLists[i].onclick=function(){
                    autoComplete.value=this.innerHTML;
                    autoCompleteList.style.display="none";
                }
            }
        }
        var index=0;
        autoComplete.onkeydown=function(event){
            createAuto(this);
            var list=getTypeElement(autoCompleteList.childNodes,"div");
            if (event == undefined)
                event = window.event;
            switch (event.keyCode)
            {
                case 38:
                    console.log("Up");
                    if(index>0)
                        index--;
                    list[index].style.backgroundColor="gray";
                    break;
                case 40:
                    console.log("Down");
                    index++;
                    list[index].style.backgroundColor="gray";
                    break;
                case 13:
                    console.log("OK");
                    console.log(autoComplete);
                    autoComplete.value=list[index].innerHTML;
                    break;
            }
            console.log(list[index]);
        }
        autoComplete.onfocus=function(){
            createAuto(this);
        }
    }
    autoComplete();
    console.log(lexicon);
    //var upKeyCode = 38;
    //var downKeyCode = 40;
    //var enterKeyCode = 13;
};
