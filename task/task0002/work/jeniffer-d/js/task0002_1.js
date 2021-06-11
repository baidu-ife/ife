(function(){
    
    //格式化输入的字符串，去重后存储到数组中，返回这个数组
    function formatStr(str) {
        
        var arr = trim(str).split(/[\s\n,，;；、]/g);

        var newArr = uniqArray(arr);
        
        for(var i=0; i < newArr.length; i++) {
            if(newArr[i] == "") {
                newArr.splice(i,1);
                i--;
            }
        }
        
        return newArr;
    }

    function cb1(e) {
        
        var hobby = $("#hobby1").value;
        
        $("#show1").innerText = formatStr(hobby).join(",");
    }

    function cb2(e) {
        
        var hobby = $("#hobby2").value;
        
        $("#show2").innerText = formatStr(hobby).join(",");
    }

    //判断输入个数是否在[1,10]之间
    function cb3(e) {
            
            var e = e || window.event;
            
            var target = e.target || e.srcElement;
            
            var hobby = target.value;
            
            var error = document.getElementById("error");
            
            var btn = document.getElementById("btn3");
            
            var hobbyRange = formatStr(hobby).length;
            
            if ( hobbyRange >= 1 && hobbyRange <= 10) {
                btn.disabled = false; 
                error.style.display = "";
            } else {
                btn.disabled = true;
                error.style.display = "block";

            }
        }

    //将根据输入的爱好加载dom
    function cb4(e) {
        
        var hobby = formatStr($("#hobby3").value);
        
        var container = document.getElementById("show3");
        
        var html = "";
        
        for(var i = 0; i < hobby.length; i++) {
            var id = "item" + i;
            html += "<div><label for='"+ id + "'>" + hobby[i] +"<input id='" + id +"' type='checkbox'></label></div>";  
        }
        
        container.innerHTML = html;
    }

    $.click("#btn1", cb1);
    $.click("#btn2", cb2);
    $.on("#hobby3", "keyup", cb3);
    $.click("#btn3", cb4);  

})();



