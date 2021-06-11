/**
 * Created by T on 2015/4/20.
 */
function changeImage(options) {
    //???????
    options.order = options.order || "left";
    //left ????right????
    options.isLoop = options.isLoop || true;
    options.time = options.time || 5000;

    var panel = $("#panel");
    var container = $("#container");
    //????????
    var ul = document.createElement("ul");
    var content = "";
    var scroll;
    var currentIndex = 0;
    ul.id = "controller";
    var images = container.getElementsByTagName("img");

    for (var i = 0; i < images.length; i++) {
        content += "<li><span></span></li>";
    }
    ul.innerHTML = content;
    panel.appendChild(ul);
    var archor = $("#controller").getElementsByTagName("span");
    addClass(archor[0], "active");
    container.style.left = "0";
    for (var j = 0; j < images.length; j++) {
        (function(i) {
            //????????????????
            archor[i].onclick = function() {
                var position;
                var currentPosition;
                var positionStep;
                var test;
                currentIndex = i;
                for(var k = 0; k < images.length; k++) {
                    if (k != i) {
                        removeClass(archor[k], "active");
                    }
                    else {
                        addClass(archor[k], "active");
                    }
                }
                //IE 10???????????????????transition
                if (isIE() == -1 || isIE() > 9) {
                    position = i * -500;
                    container.style.left = position + "px";
                }
                //IE 10?????js?????
                else {
                    position = i * -500;
                    currentPosition = parseInt(container.style.left);
                    if (position > currentPosition) {
                        positionStep = (position - currentPosition) / 40;
                        test = setInterval(function() {
                            currentPosition = parseInt(container.style.left);
                            currentPosition += positionStep;
                            container.style.left = currentPosition + "px";
                            if (currentPosition >= position) {
                                clearInterval(test);
                                container.style.left = position + "px";
                            }
                        } , 15);
                    }
                    else if (position < currentPosition) {
                        positionStep = (currentPosition - position) / 40;
                        test = setInterval(function() {
                            currentPosition = parseInt(container.style.left);
                            currentPosition -= positionStep;
                            container.style.left = currentPosition + "px";
                            if (currentPosition < position) {
                                clearInterval(test);
                                container.style.left = position + "px";
                            }
                        } , 15);
                    }
                }
            };
        })(j);
    }
    //???????
    var startScroll = function(order) {
        if (order === "left") {
            return setInterval(function(){
                currentIndex++;
                if (options.isLoop) {
                    if (currentIndex > images.length - 1) {
                        currentIndex = 0;
                    }
                }
                else {
                    clearInterval(scroll);
                }
                archor[currentIndex].onclick();
            }, options.time);
        }
        else {
            return setInterval(function(){
                currentIndex--;
                if (options.isLoop) {
                    if (currentIndex < 0) {
                        currentIndex = images.length - 1;
                    }
                }
                else {
                    clearInterval(scroll);
                }
                archor[currentIndex].onclick();
            }, options.time);
        }
    };

    scroll = startScroll(options.order);

    //????????????????????
    panel.onmouseenter  = function(e) {
        e = e || window.event;
        clearInterval(scroll);
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        else {
            e.cancelBubble = true;
        }
    };

    //?????????????????????
    panel.onmouseleave  = function(e) {
        scroll = startScroll(options.order);
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