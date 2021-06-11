/**
 * Created by dell on 2015/6/4.
 */
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

    //点击轮播
    for (var j = 0; j < images.length; j++) {
        (function(i) {
           /* alert(i);//0,1,2,3,4*/
            //????????????????
            archor[i].onclick = function() {

                var position;
                var currentPosition;
                var positionStep;
                var test;
                currentIndex = i;/*哪个点击是哪个i*/
                for(var k = 0; k < images.length; k++) {
                    if (k != i) {
                        removeClass(archor[k], "active");/*不是点击的圆点去掉active类*/
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
                    position = i * -500;/*点击位置*/
                    currentPosition = parseInt(container.style.left);/*还没改变的位置*/
                    if (position > currentPosition) {/*-500>-1000  这是从右往左的情况*/
                        positionStep = (position - currentPosition)/40 ;//????/40
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
                        positionStep = (currentPosition - position)/40 ;
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
            };/*onclick*/
       }
       )(j);

    }
    //???????
    //自动轮播
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