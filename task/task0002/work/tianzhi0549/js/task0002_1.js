window.onload=function (e){
    $.on("#ok", "click", function (e){
        var i= 0, hobbiesContainer=$("#hobbies");
        var str=$("#text-input").value;
        var hobbies=removeEmptyStrInArray(str.split(/[\uff0c,\n \u3000\u3001;]+/));
        function createCheckboxWithLabel(label, value){
            var container=document.createElement("DIV");
            container.innerHTML="<input type='checkbox' value=\""+value+"\" />";
            container.innerHTML+="<label>"+label+"</label>";
            return container;
        }
        if(hobbies.length===0){
            $(".err-msg").innerHTML="请输入爱好。";
            return true;
        }
        if(hobbies.length>10){
            $(".err-msg").innerHTML="爱好的个数不能大于10个。";
            return true;
        }
        hobbiesContainer.innerHTML="";
        for(i=0; i<hobbies.length; i++){
            hobbiesContainer.appendChild(createCheckboxWithLabel(hobbies[i], hobbies[i]));
        }
    });
};
