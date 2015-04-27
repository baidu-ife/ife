var getElementLeft = function(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}

var getElementTop = function(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}

/*
var ajaxGet = function(url, callback) {
    var _xhr = null;
    if(window.XMLHttpRequest) {
        _xhr = new window.XMLHttpRequest;
    }else if(window.ActiveXObject) {
        _xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    _xhr.onreadystatechange = function(){
        if(_xhr.readyState == 4 && _xhr.status == 200) {
            //JSON.parse转化为可以为JS识别的对象
            callback(JSON.parse(_xhr.responseText));
        }
    }
    _xhr.open('get', url, false);
    _xhr.send();
}
*/

//测试的时候一直出现Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check http://xhr.spec.whatwg.org/.和Uncaught SyntaxError: Unexpected token v
var getSuggest = function(){
    
    /*
    ajaxGet('js/data.json', function(d){
        var html = '';
        alert(d);
        for(var i=0; i<d.length; i++){
            html += "<li>" + d[i] + "</li>";
        }
    })
    */
    var list = $("#suggest_list");
    // list.innerHTML = html;
    list.style.top = getElementTop($("#search_form")) + '40' + 'px';
    list.style.left = getElementLeft($("#search_form")) + 'px';
    list.style.position = "absolute";
    list.style.display = "block";
}


$.on($('#search_text'), 'keyup', getSuggest);

$.click(document, function(){ 
    $("#suggest_list").style.display = "none";
})
