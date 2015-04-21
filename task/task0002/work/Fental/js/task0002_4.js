/**
 * Created by T on 2015/4/21.
 */
window.onload = (function() {
    var options = {
        type: "GET",
        data: "content=text",
        onsuccess: function(msg) {
            var result = JSON.parse(msg);
            var data = options.data.split("=")[1];
            var panel = $("#result-panel");
            var content = "";
            for (var i = 0; i < result.length; i++) {
                content += "<li><span>" + data + "</span>" + result[i].slice(data.length) + "</li>"
            }
            addClass(panel, "active");
            panel.innerHTML = content;
        },
        onfail: function(msg) {
            console.log(msg);
        }
    };
    $.on("#search-box", "keyup", function() {
        var panel = $("#result-panel");
        var value = $("#search-box").value;
        if (value) {
            options.data = "content=" + value;
            ajax("php/task0002_4.php",options);
        }
        else {
            panel.innerHTML = "";
            removeClass(panel, "active");
        }
    });

    $.on("#search-box", "blur", function() {
        var panel = $("#result-panel");
        var value = $("#search-box").value;
//        console.log(value);
        if (value === null || value === "") {
            panel.innerHTML = "";
            removeClass(panel, "active");
        }
    });
    $.delegate("#result-panel", "li", "click", function(e) {
        var panel = $("#result-panel");
        var target = e.srcElement ? e.srcElement : e.target;
        $("#search-box").value = target.textContent;
        panel.innerHTML = "";
        removeClass(panel, "active");
    });
})();