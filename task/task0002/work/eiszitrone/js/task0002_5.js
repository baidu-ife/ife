(function () {
    //判断是不是支持html5拖放api
    if('draggable' in document.createElement('span')) {
        var first_li = $("#first_wrap").getElementsByTagName("li");
        for (var i = 0; i < first_li.length; ++i) {
            addEvent(first_li[i], "dragstart", function(e) {
                e.dataTransfer.setData("text", e.target.id);
            })
        }
        var second_li = $("#second_wrap").getElementsByTagName("li");
        for (var i = 0; i < second_li.length; ++i) {
            addEvent(second_li[i], "dragstart", function(e) {
                e.dataTransfer.setData("text", e.target.id);
            })
        }
        $.on("#second_wrap",'dragover', function (e) {
            e.preventDefault();
        });
        $.on("#first_wrap",'dragover', function (e) {
            e.preventDefault();
        });

        $.on("#second_wrap",'drop', function (e) {
            e.preventDefault();
            var id = e.dataTransfer.getData("text");
            $("#second_wrap").appendChild(document.getElementById(id));
        });

        $.on("#first_wrap",'drop', function (e) {
            e.preventDefault();
            var id = e.dataTransfer.getData("text");
            $("#first_wrap").appendChild(document.getElementById(id));
        });
    }
})();