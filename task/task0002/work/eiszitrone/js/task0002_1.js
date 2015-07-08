(function(){

    // 第一阶段
    $.click("#button1", function() {
        var input = $("#input1").value;
        var list = input.split(',');
        var newList = [];
        for (var i = 0; i < list.length; ++i) {
            list[i] = trim(list[i]);
            if (list[i]) newList.push(list[i]);
        }
        newList = uniqArray(newList);
        var pElement = document.createElement('p');
        pElement.setAttribute('id', 'p1');
        pElement.innerText = newList.join(',');

        if ($("#p1")) $("#first").removeChild($("#p1"));
        $("#first").appendChild(pElement);

    });
    // 第二阶段 
    $.click("#button2", function() {
        var input = $("#textarea1").value;
        var list = input.split(/[,，、;]|\s+/);
        var newList = [];
        for (var i = 0; i < list.length; ++i) {
            list[i] = trim(list[i]);
            if (list[i]) newList.push(list[i]);
        }
        var newList = uniqArray(newList);
        var pElement = document.createElement('p');
        pElement.setAttribute('id', 'p2');
        pElement.innerText = newList.join(',');

        if ($("#p2")) $("#second").removeChild($("#p2"));
        $("#second").appendChild(pElement);
    });

    // 第三阶段
    $.click("#button3", function() {
        var input = $("#textarea2").value;
        var list = input.split(/[,，、;]|\s+/);
        var newList = [];
        for (var i = 0; i < list.length; ++i) {
            list[i] = trim(list[i]);
            if (list[i]) newList.push(list[i]);
        }
        var newList = uniqArray(newList);

        if ($("#error")) $("#third").removeChild($("#error"));

        if (newList.length == 0) {
            var errorElement = document.createElement('p');
            errorElement.setAttribute('id', 'error');
            errorElement.innerText = "用户输入的爱好数量不能为0";
            if ($("#p3")) $("#third").removeChild($("#p3"));
            $("#third").insertBefore(errorElement, $("#button3"));
            return;
        }
        if (newList.length > 10){
            var errorElement = document.createElement('p');
            errorElement.setAttribute('id', 'error');
            errorElement.innerText = "用户输入的爱好数量不能大于10";
            if ($("#p3")) $("#third").removeChild($("#p3"));
            $("#third").insertBefore(errorElement, $("#button3"));
            return;
        }
        var pElement = document.createElement('p');
        pElement.setAttribute('id', 'p3');
        pElement.innerText = newList.join(',');

        if ($("#p3")) $("#third").removeChild($("#p3"));
        $("#third").appendChild(pElement);
    });
})();