var arr;
$.click("#btn", function(event) {
        //清空所有提示和显示
        $("#p").innerHTML = "";
        $("#warning").innerHTML = "";
        arr = $("#hobbies").value.split(/ |\u3000|,|，|、|;|(\r?\n)/);
        arr = arr.map(function(h){
            //return h.trim();
            return h?trim(h):h;
            });
        arr = arr.filter(function(h){
            return Boolean(h);
            });
        arr = uniqArray(arr);
        if (arr.length > 10 || arr.length === 0) {
            $("#warning").innerHTML = "不允许输入多于十个爱好或不输入";
            $("#warning").style="color: red;"
            return;
        }
        each(arr, function(i, h) {
            var cb = document.createElement("input");
            cb.type = "checkbox";
            cb.name = h;
            $("#p").appendChild(cb);
            $("#p").innerHTML += h;
            $("#p").appendChild(document.createElement("br"));
            });
});
