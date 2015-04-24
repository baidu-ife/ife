
(function() {
    var textArray = [];
    var interests = [];
    var checkbox_template = "<div><input type=\"checkbox\" name=\"{{name}}\"><p>\{\{name\}\}<\/p><\/div>";
    function splitText(text){
        //分割词组
        textArray = text.split(/[,，；;、\s\r\n\u3000]/);
    }

    function outputCheckbox(checkbox){
        //输出到checkbox
        interests = uniqArray(textArray);
        $("#checkbox").innerHTML = "";
        each(interests,function(item,index) {
            $("#checkbox").innerHTML = $("#checkbox").innerHTML + checkbox_template.replace(/\{\{name\}\}/g,item);
        })
    }

    function checkText(ele){
        //核对词组长度
        splitText(ele.value);
        console.log(textArray);
        if(textArray.length != 10){
            $("#error").style.display = "inline";
        }else{
            $("#error").style.display = "none";
        }
    }

    window.outputCheckbox = outputCheckbox;
    window.checkText = checkText;

})()

addEvent($("#text"),"keyup",function(){
    checkText($("#text"));
});
addEvent($("#button"),"click",function(){
    outputCheckbox($("#button"));
});
