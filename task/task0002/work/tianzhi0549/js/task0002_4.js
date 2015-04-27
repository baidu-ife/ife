function list(element){
    var theList={};
    var selectedIndex=-1;
    theList.getSelectedIndex=function (){
        return selectedIndex;
    }
    theList.setSelectedIndex=function (index){
        if(selectedIndex!==-1){
            removeClass(element.getElementsByTagName("li")[selectedIndex], "selected");
        }
        selectedIndex=index;
        addClass(element.getElementsByTagName("li")[index], "selected");
    }
    theList.getCount=function (){
        return element.getElementsByTagName("li").length;
    }
    theList.next=function (){
        if(theList.getCount()<=0) return;
        if(selectedIndex>=theList.getCount()-1){
            theList.setSelectedIndex(0);
            return;
        }
        theList.setSelectedIndex(selectedIndex+1);
    }
    theList.prev=function (){
        if(theList.getCount()<=0) return;
        if(selectedIndex<=0){
            theList.setSelectedIndex(theList.getCount()-1);
            return;
        }
        theList.setSelectedIndex(selectedIndex-1);
    }
    theList.clear=function (){
        selectedIndex=-1;
        element.innerHTML="";
    }
    theList.addItem=function (html){
        element.innerHTML+="<li class=\"item\">"+html+"</li>";
    }
    return theList;
}
function searchBox(element){
    var inputText=$("#input-text", element);
    var suggestionList=list($(".list", element));
    function highlight(text, start, end){
        if(end>=text.length) end=text.length-1;
        if(start<=0) start=0;
        var front=text.substring(0, start);
        var behind=text.substring(end+1);
        var center=text.substring(start, end+1);
        return front+"<a class=\"highlight\">"+center+"</a>"+behind;
    }
    inputText.addEventListener("input", function (){
        ajax("ajax.txt", {
            data: {
                wd: inputText.value
            },
            onsuccess: function (json){
                var i=0;
                if(json.state===0){
                    suggestionList.clear();
                    for(i=0; i<json.data.length; i++){
                        suggestionList.addItem(highlight(json.data[i], 0, inputText.value.length-1));
                    }
                }
            }
        });
    });
    inputText.addEventListener("keydown", function (e){
        switch(e.keyCode){
            case 40:
                suggestionList.next();
                break;
            case 38:
                suggestionList.prev();
                break;
            default:;
        }
    });
}
window.onload=function (e){
    searchBox($("#search-box"));
}
