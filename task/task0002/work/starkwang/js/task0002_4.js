(function(){
    var nowChoice = -1;
    function suggest_ajax(){
        nowChoice = -1;
        $("#suggestbox").innerHTML = "";
        var str = $("#search").value;
        ajax(
        'http://localhost:1337', 
        {
            type:"GET",
            data: {
                name: str
            },
            onsuccess: function (responseText, xhr) {
                        var suggest_template = "<div class=\"suggest\" id=\"{{id}}\">{{suggest}}</div>";
                        var arr = responseText.split(",");
                        console.log(arr);
                        arr.length = arr.length - 1;
                        each(arr,function(item,index){
                            $("#suggestbox").innerHTML = $("#suggestbox").innerHTML + suggest_template.replace(/{{suggest}}/g,item).replace(/{{id}}/g,index);
                        })
                        for(var i = 0 ; i < $(".suggest").length ; i++){
                    addEvent($(".suggest")[i],"click",function(){
                        $("#search").value = this.innerHTML;
                        $("#suggestbox").innerHTML = "";
                        nowChoice = -1;
                    })
                }
                    }
                }
        );    
    }

    function chooseDown(){
        nowChoice++;
        $("#" + nowChoice.toString()).style.background = "#a0a0a0";
        $("#" + (nowChoice-1).toString()).style.background = "#ffffff";
    }
    function chooseUp(){
        nowChoice--;
        $("#" + nowChoice.toString()).style.background = "#a0a0a0";
        $("#" + (nowChoice+1).toString()).style.background = "#ffffff";    
    }
    function choose(){
        $("#search").value = $("#" + nowChoice.toString()).innerHTML;
    }
    suggest = {
        ajax : suggest_ajax ,
        chooseDown : chooseDown,
        chooseUp : chooseUp,
        choose : choose
    }
    window.suggest = suggest;
})()

addEvent($("#search"),"keyup",function(){
    e = event || window.event;
    if( (e.keyCode < 38 || e.keyCode > 40) && e.keyCode != 13){
        suggest.ajax();
    }
    
    if(e.keyCode==40){
        suggest.chooseDown();            
    }

    if(e.keyCode==38){
        suggest.chooseUp();            
    }

    if(e.keyCode == 13){
        suggest.choose();
        $("#suggestbox").innerHTML = "";
    }
});



// document.onkeydown = function(){
//     var e = event || window.event;
//     //38 up,    40 down
//     if(e.keyCode==38){
                
//     }
// }