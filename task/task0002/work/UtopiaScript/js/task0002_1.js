window.onload = function(){
    getHobby();
};
function getHobby(){
    var hobby = $("#hobby");
    var btn = $("#btn");
    addEvent(hobby, "keyup", checkItem);
    addEvent(btn, "click", btnHandle);
       
    function btnHandle() {
        var hobby = $("#hobby");
        var num = splitInput(hobby.value);

        if (num.length<1 || num.length>10) { 
            checkItem();
        } 
        else {
            addCheck(num);
        }

    }   
    
    function splitInput(item){
        var splitReg = /[\n\u3000\s，；,;、.。]+/g;
        var arr = item.split(splitReg).sort(),
            temp = [];

        for(var i=0;i<arr.length;i++){
            arr[i] = trim(arr[i]);
            if((arr[i] != "")&&(arr[i] !== arr[i+1])){
                temp.push(arr[i]);
            }
        }
        return temp;
    }
   
    function checkItem() {
        var hobby = $("#hobby"); 
        var num = splitInput( hobby.value ); 
        var hobbies = $("#hobbies"); 

        hobbies.innerHTML = ""; 

        var tips = $("#tip");
        if (num.length > 10) {
            tips.innerHTML = "输入的爱好数量不能超过10个！"; 
        }
        else if (num.length == 0) {
            tips.innerHTML = "请填写您的爱好！"; 
        }
        else {
            tips.innerHTML = "";
        }
    }
    
    function addCheck(arr) {
        var hobbies = $("#hobbies");
        hobbies.innerHTML = "";
        for (var i=0; i < arr.length; i++) {
            var checkLabel = document.createElement("label");
            var checkItem = document.createElement("input");
            
            checkItem.type = "checkbox";
            checkItem.name = "hobbies";
            checkItem.check = "check";
            
            checkItem.value = arr[i];
            checkLabel.appendChild( checkItem );
            checkLabel.appendChild( document.createTextNode(arr[i]) );

            hobbies.appendChild( checkLabel );
        }
    }
}
