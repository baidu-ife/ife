/**
 * Created by zcp2123 on 2015/4/25.
 */
function Slide(selector, options) {
    options || (options = {});
    this.options = {
        direction: options.direction == undefined ? true : options.direction,
        interval: options.interval == undefined ? 3000 : options.interval,
        cycle: options.cycle == undefined ? true : options.cycle
    }

    this.selector = selector;
    this.list = $(this.selector);
    this.imgList = $(this.selector + " .imgList li", false);
    this.numList = $(this.selector + " .numList li", false);
    this.index = 0;
    this.order = this.options.direction;
    var self = this;
    this.autoMove = setInterval(function(){
        self.next();
    }, this.options.interval);

    this.list.onmouseover = function(){
        clearInterval(self.autoMove);
    }

    this.list.onmouseout = function(){
        self.autoMove = setInterval(function(){
            self.next();
        }, self.options.interval);
    }

    this.numListHover();
}

Slide.prototype.startMove = function(current, target) {
    clearInterval(this.timer);
    if (this.order) {
        addClass(target, "next");
        target.style.left = target.offsetWidth + "px";
    } else {
        addClass(target, "prev");
        target.style.left = -target.offsetWidth + "px";
    }
    var self = this;
//        zOrder ? addClass(target, "next") : addClass(target, "prev");
    this.timer = setInterval(function(){
        self.move(current, target);
    },30);
}

Slide.prototype.move = function(current, target) {
    var curDistance = current.offsetLeft;
    var tarDistance = target.offsetLeft;
    var width = current.offsetWidth;
    var speed = this.order ? -width / 10 : width / 10;
//        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    if (target.offsetLeft == 0) {
        clearInterval(this.timer);
        this.timer = null;
        removeClass(current, "active");
//            removeClass(target, "next prev");
        removeClass(target, "next prev");
        addClass(target, "active");
        target.style.left = "0px";
    } else {
        current.style.left = curDistance + speed + "px";
        target.style.left = tarDistance + speed + "px";
    }
}

Slide.prototype.next = function() {
    this.order = this.options.direction;
    var current = $(this.selector + " .imgList .active");
    this.order ? this.index++ : this.index--;
//        index++;
//        index < 0 && (index = 0, zOrder = true);
//        index > numBtn.length -1 && (index = numBtn.length -1, zOrder = false);
    if (this.options.cycle) {
        this.index > this.numList.length -1 && (this.index = 0);
        this.index < 0 && (this.index = this.numList.length -1);
        for(var j=0; j<this.numList.length; j++){
            this.numList[j].className = "";
        }
        this.numList[this.index].className = "current";
        this.startMove(current, this.imgList[this.index]);
    } else {
        if (this.index <= this.numList.length -1 && this.index >= 0) {
            for(var j=0; j<this.numList.length; j++){
                this.numList[j].className = "";
            }
            this.numList[this.index].className = "current";
            this.startMove(current, this.imgList[this.index]);
        } else {
            clearInterval(this.autoMove);
        }
    }

}

Slide.prototype.numListHover = function(){
    var self = this;
    for(var i=0; i<this.numList.length; i++){
        this.numList[i].index = i;
        this.numList[i].onmouseover = function(){
            if (!self.timer) {
                var currentBtn = $(self.selector + " .numList .current");
                for(var j=0; j<self.numList.length; j++){
                    self.numList[j].className = "";
                }
                this.className = "current";
                self.index = this.index;

                var current = $(self.selector + " .imgList .active");
                self.order = currentBtn.index < self.index;
                currentBtn.index == self.index || self.startMove(current, self.imgList[self.index]);
            }

        }
    }
}

var slider = new Slide('.list',{direction:false,cycle:true});
