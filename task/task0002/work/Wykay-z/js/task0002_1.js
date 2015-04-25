window.onload = function(){


    var getHobbyArr1 = function(){
        var hobbyArr = uniqArray($("#input1").value.split(","));
        
        for(var i=0; i<hobbyArr.length; i++){
            if(hobbyArr[i] == "" || hobbyArr[i] == " "){
                hobbyArr.splice(i,1);
                i--;
            }
        }
        console.log(hobbyArr);
        $("#pas1").innerHTML = "<h4>你的爱好有:</h4>"
        for(var i=0; i<hobbyArr.length; i++) {
            $("#pas1").innerHTML += '<li>' + hobbyArr[i] + '</li>';
        }
    }
    $.click($("#btn1"), getHobbyArr1);


    var getHobbyArr2 = function(){
        var hobbyArr = uniqArray(trim($("#input2").value).split(/[',','，','、',';','，','\s+']/));
        for(var i=0; i<hobbyArr.length; i++){
            if(hobbyArr[i] == "" || hobbyArr[i] == " "){
                hobbyArr.splice(i,1);
                i--;
            }
        }
        console.log(hobbyArr);
        $("#pas2").innerHTML = "<h4>你的爱好有:</h4>"
        for(var i=0; i<hobbyArr.length; i++) {
            $("#pas2").innerHTML += '<li>' + hobbyArr[i] + '</li>';
        }
    }
    $.click($("#btn2"), getHobbyArr2);



    var getHobbyArr3 = function(){
        $("#err").innerHTML = "";
        if($("#input3").value == ""){
            $("#err").innerHTML = "请输入相关内容";
        } else {
            var hobbyArr = uniqArray(trim($("#input3").value).split(/[',','，','、',';','，','\s+']/));
            if(hobbyArr.length > 10) {
                $("#err").innerHTML = "提示：最多输入10个爱好";
            } else {
                for(var i=0; i<hobbyArr.length; i++){
                    if(hobbyArr[i] == "" || hobbyArr[i] == " "){
                        hobbyArr.splice(i,1);
                        i--;
                    }
                }
                console.log(hobbyArr);
                $("#pas3").innerHTML = "<h4>你的爱好有:</h4>"
                for(var i=0; i<hobbyArr.length; i++) {
                    $("#pas3").innerHTML += '<input type="checkbox">' + hobbyArr[i];
                }
            }
        }
    }
    $.click($("#btn3"), getHobbyArr3);


}