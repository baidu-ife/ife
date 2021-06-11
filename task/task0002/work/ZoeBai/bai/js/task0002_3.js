window.onload =function(){
    var autoSlide = setInterval(carousel,3000);
    $.delegate("ol", "li", "click", liClicker);

    function carousel(){
        var active = $("ol .active");
        var sibling = active.nextSibling; 
        while (sibling && sibling.nodeType != 1) {
            sibling = sibling.nextSibling;
        }
        if(!sibling) {
            sibling = $("[data-slide=1]");
        }
        removeClass(active, "active");
        addClass(sibling, "active");

        var activeSlide = $(".banner .active");
        var activeRight = $(".banner .right");
        addClass(activeSlide, "slideleft");
        addClass(activeRight, "slideleft");
        setTimeout(function (){
            prepare(activeSlide, activeRight, "right");
        }, 1000);
        
    }

    function prepare(activeSlide, activeRight, str) { 
        removeClass(activeRight, str);
        addClass(activeRight, "active");
        removeClass(activeSlide, "active");
        var str1 = (str === "right") ? "slideleft" : "slideright";
        removeClass(activeSlide, str1);
        removeClass(activeRight, str1);
        if (activeRight.nextElementSibling) {
            var right = activeRight.nextElementSibling;
        }
        else {
            var right = activeRight.parentNode.firstElementChild;
        }
        addClass(right, "right");
    }

    function liClicker(e) {
        //清空计数器
        clearInterval(autoSlide);
        //disable事件响应
        $.disDelegate("ol", "li", "click", liClicker);
        var element = e.srcElement ? e.srcElement : e.target;
        var clickNum = element.getAttribute("data-slide");
        clickNum = parseInt(clickNum);
        var current = $("ol .active");
        var currentNum = current.getAttribute("data-slide");
        currentNum = parseInt(currentNum);
        addClass(element, "active");
        removeClass(current, "active");
        var activeSlide = $(".banner .active");
        var activeRight = $(".banner .right");
        var children = $(".banner").children;
        var next = children[clickNum-1];
        //向右滑动
        if (currentNum < clickNum) {
            if (next !== activeRight) {
                removeClass(activeRight, "right");
                addClass(next, "right");
            }
            addClass(next, "slideleft");
            addClass(activeSlide, "slideleft");
            
            setTimeout(function (){
                prepare(activeSlide, next, "right");
                $.delegate("ol", "li", "click", liClicker);
                autoSlide = setInterval(carousel, 3000);
            }, 1000);
            
        }
        //向左滑动
        else if (currentNum > clickNum) {
            removeClass(activeRight, "right");
            addClass(next, "left");
            addClass(activeSlide, "slideright");
            addClass(next, "slideright");
            setTimeout(function (){
                prepare(activeSlide, next, "left");
                $.delegate("ol", "li", "click", liClicker);
                autoSlide = setInterval(carousel, 3000);
            }, 1000);
            
        }
        else {
            autoSlide = setInterval(carousel, 3000);
        }
           
    }
}