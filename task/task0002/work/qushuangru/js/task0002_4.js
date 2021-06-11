var oInput = document.getElementById("search");
var oSugul = $("#suggests");

function getSuggest(selector){
	var inputVal = $(selector).value;
	var suggestsArr = [];    
	ajax("http://localhost/api",{
        type: "post",
        data: "sug=" + inputVal,
        onsuccess: function(res){
            oSugul.style.display = "block";
        	var data = JSON.parse(res).data;
            var liStr = "";
            for (var i = data.length - 1; i >= 0; i--) {
                var oLi = "<li>" + data[i].substring(0,data[i].indexOf(inputVal)) + "<em>"+ inputVal +"</em>"+ data[i].substr(data[i].indexOf(inputVal)+inputVal.length) +"</li>"
                liStr += oLi;
            };
            oSugul.innerHTML = liStr;
        },
        onfail: function(){}
    })
	
}
function seletNext(bool){
    var next = bool? 1 : -1 ;
    var oLiArr = oSugul.getElementsByTagName("li");
    var now = -1;

    for (var i = oLiArr.length - 1; i >= 0; i--) {
        if(oLiArr[i].className === "active"){
            now = i;
        }
        if (bool && now === oLiArr.length-1) return;
        if (!bool && now === 0 ) return;
        oLiArr[i].className = "";
    };
    oLiArr[now+next].className = "active";
}

function getSelect(){

    oInput.value = oSugul.getElementsByClassName("active")[0].innerHTML.replace(/<[^>]+>/g, "");
    oSugul.style.display = "none";
}

$.on("#search","keyup",function(ev){
    switch (ev.keyCode) {
        case 40 :
        seletNext(true);
        break;
        case 38 :
        seletNext(false);
        break;
        case 13 :
        getSelect();
        break;
        case 37 :
        case 39 :
        break;
        default:
        getSuggest("#search");
        break;
    }
});
$.on("#search","focus",function(ev){
    getSuggest("#search");
});
$.on("#search","blur",function(ev){
    var delay = setTimeout(function(){
        oSugul.style.display = "none";
    },100);
    
});
$.delegate("#suggests","li","mouseover",function(e){
    var oLiArr = oSugul.getElementsByTagName("li");
    for( var i = oLiArr.length-1;i>=0;i--){
        oLiArr[i].className = "";
    }
    e.target.className = "active";
})
$.delegate("#suggests","li","click",getSelect)