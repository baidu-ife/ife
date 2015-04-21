/**
 * Created by T on 2015/4/20.
 */
function changeImage(options) {
    //ƒ¨»œ…Ë÷√
    options.order = options.order || "left";
    //left ’˝–Ú£¨rightƒÊ–Ú
    options.isLoop = options.isLoop || true;
    options.time = options.time || 5000;

    var panel = $("#panel");
    var container = $("#container");
    var ul = document.createElement("ul");
    var content = "";
    var position;
    var scroll;
    var currentIndex = 0;
    ul.id = "controller";
    var images = container.getElementsByTagName("img");
    console.log(images);
    for (var i = 0; i < images.length; i++) {
        content += "<li><span></span></li>";
    }
    ul.innerHTML = content;
    panel.appendChild(ul);
    var archor = $("#controller").getElementsByTagName("span");
    addClass(archor[0], "active");
    for (var j = 0; j < images.length; j++) {
        (function(i) {
            archor[i].onclick = function() {
                currentIndex = i;
                for(var k = 0; k < images.length; k++) {
                    if (k != i) {
                        removeClass(archor[k], "active");
                    }
                    else {
                        addClass(archor[k], "active");
                    }
                }
                position = i * -500;
                container.style.left = position + "px";
            };
        })(j);
    }
    if (options.order === "left") {
        scroll = setInterval(function(){
            archor[currentIndex].onclick();
            currentIndex++;
            if (options.isLoop) {
                if (currentIndex > images.length - 1) {
                    currentIndex = 0;
                }
            }
            else {
                clearInterval(scroll);
            }
        }, options.time);
    }
    else {
        scroll = setInterval(function(){
            archor[currentIndex].onclick();
            currentIndex--;
            if (options.isLoop) {
                if (currentIndex < 0) {
                    currentIndex = images.length - 1;
                }
            }
            else {
                clearInterval(scroll);
            }
        }, options.time);
    }
    panel.onmouseenter  = function(e) {
        clearInterval(scroll);
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        else {
            e.cancelBubble = true;
        }
    };
    panel.onmouseleave  = function(e) {
        if (options.order === "left") {
            scroll = setInterval(function(){
                archor[currentIndex].onclick();
                currentIndex++;
                if (options.isLoop) {
                    if (currentIndex > images.length - 1) {
                        currentIndex = 0;
                    }
                }
                else {
                    clearInterval(scroll);
                }
            }, options.time);
        }
        else {
            scroll = setInterval(function(){
                archor[currentIndex].onclick();
                currentIndex--;
                if (options.isLoop) {
                    if (currentIndex < 0) {
                        currentIndex = images.length - 1;
                    }
                }
                else {
                    clearInterval(scroll);
                }
            }, options.time);
        }
    };
}
window.onload = function() {
    var options = {
        order: "right",
        isLoop: true,
        time: 5000
    };
    changeImage(options);
};