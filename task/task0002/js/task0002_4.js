var suggestData = ['Simon', 'Erik', 'Kener'];
var iCount = -1;
function inputSuggest(selector){
    var element = $(selector);
    addEvent(element, "focus", showSuggest);
    addEvent(element, "blur", hideSuggest);
    addEvent(element, "keydown", function(e){
        doKeySelect(e);
    });
}

function showSuggest(selector, event){
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
    suggestions.style.display = "block";
    addEvent(sItems, "mousedown", function(e){ //此处注意不能用click因为上级元素的onblur会在click先触发而隐藏目标元素
        doSelect(e);
    });
}

function hideSuggest(){
    var element = $(".suggestions");
    element.innerHTML = "";
    element.style.display = "none";
}

function doSelect(event){
    var e = event || window.event;
    var target = e.srcElement || e.target;
    var item = target.innerHTML;
    var input = $(".search");
    input.value = item;
}

function doKeySelect(event) {
    var e = event || window.event;
    var target = e.srcElement || e.target;
    var items = $(".sugItems");
    var itemArr = items.childNodes;
    var pre = iCount;
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
//        removeClass(itemArr[pre], "current");
    }
    itemArr[iCount].className += " current";
//    addClass(itemArr[iCount], "current");
}
inputSuggest(".search");
