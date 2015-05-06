var suggestData = ['Simon', 'Erik', 'Kener'];
var iCount = -1;
function inputSuggest(selector){
    var element = $(selector);
    element.onfocus = showSuggest;
    element.onblur = hideSuggest;
    element.onkeydown = function(){
       doKeySelect();
    }
}

function showSuggest(selector){
    var oFrag = document.createDocumentFragment();
    var suggestions = $(".suggestions");
    suggestions.innerHTML = "";
    var sItems = document.createElement("ul");
    sItems.className = "sugItems";
    for(var i = 0; i < suggestData.length; i++){
        var sItem = document.createElement("li");
        sItem.className = "item";
        sItem.id = i;
        sItem.innerHTML = suggestData[i];
        oFrag.appendChild(sItem);
    }
    sItems.appendChild(oFrag);
    suggestions.appendChild(sItems);
    suggestions.style.display = "run-in";
    sItems.onmousedown = doSelect;
    sItem.onkeydown = doKeySelect;
//    suggestions.focus();
//    console.log(suggestions.className);
}

function hideSuggest(){
    var element = $(".suggestions");
    element.innerHTML = "";
    element.style.display = "none";
}

function doSelect(){
    var e = event || window.event;
    var target = e.srcElement || e.target;
    var item = target.innerHTML;
    var input = $(".search");
    input.value = item;
}

function doKeySelect() {
    var e = event || window.event;
    var target = e.srcElement || e.target;
    var items = $(".sugItems");
    var itemArr = items.childNodes;
    var pre = iCount;
//    console.log(iCount);
//    itemArr[iCount].className += " current";
//    console.log(itemArr[0].className);
//    itemArr[iCount].className = "item";
    if(e.keyCode == 40){
        iCount == itemArr.length-1 ? iCount = 0 : iCount++;
    }else if(e.keyCode == 38){
        iCount == 0 ? iCount = itemArr.length-1 : iCount--;
    }else if(e.keyCode == 13){
        if(iCount >= 0){
            target.value = itemArr[iCount].innerHTML;
            hideSuggest();
        }
    }
    if(pre >= 0){
        itemArr[pre].className = "item";
    }
    itemArr[iCount].className += " current";
}
inputSuggest(".search");
//console.log(suggestData);

//new inputSuggest(".search", ".suggestions");