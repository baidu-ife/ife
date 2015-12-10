(function(name, factory) { // UMD Universal Module Define
    if(typeof define === "function" && !!define.amd) { // AMD loader
        define(factory);
        return;
    } else if (typeof exports === "object") { // CommonJS
        moudule.exports = factory();
        return;
    } else { // No loader export to the golbal virement
        window[name] = factory();
    }
})('Slider', function() {
/*
* constructor Slider 轮播图构造器
*/
function Slider(option) {

    this.sliderBox = this.$('#slider-box');
    this.sliderItem = this.$('.slider-item');
    this.sliderNum = this.sliderItem.length || 0; 
    this.height = this.sliderBox.offsetHeight;
    this.width = this.sliderBox.offsetWidth;
    this.interval = option.interval || 2000; // 轮播间隔
    this.sliderTime = option.sliderTime || 800; // 动画时间
    this.loop = option.loop || false; // 默认循环轮播
    // this.loop = option.loop || true;始终都会返回true！！！ 这个坑
    this.direction = option.direction || 'left'; // 默认滑动方向为向左滑动
    this.nowAt = 1; // 现在在1
    this.prefix = option.prefix || 'slider-control'
    if(this.interval <= this.sliderTime) { // 如果轮播间隔小于动画时间的话
        this.interval = this.sliderTime;
    }
    this.intervalFn = null;
    this.init();
};

/*
* create Element add EventDelegate
*/
Slider.prototype.init = function () {
    var controlBox = document.createElement('div');
    controlBox.className = 'slider-controler';
    var i, len, ele;
    for(i = 1, len = this.sliderNum; i - 1< len ; i++) {
        ele = document.createElement('i');
        if(i === 1) {
            ele.className = this.prefix + ' active';
        } else {
            ele.className = this.prefix;
        }
        ele.setAttribute('data-index', i);
        controlBox.appendChild(ele);
    };
    this.delegate(controlBox, 'click', this.prefix, function(target){
        var index = target.getAttribute('data-index');
        index = parseInt(index); // 坑坑 坑
        this.go(index);
    }.bind(this));
 
    this.sliderBox.appendChild(controlBox);
    this.controlList = this.$('.slider-controler')[0].getElementsByTagName('i'); // 复值给this
    

    this.sliderBox.addEventListener('mouseover', function(e){
        if(!this.loop) return;
        this.stop();
    }.bind(this),false);
    this.sliderBox.addEventListener('mouseout', function(e){
        if(!this.loop) return;
        this.Interval();
    }.bind(this),false);
    window.onresize = function(){ // change the slider width and height
        this.height = this.sliderBox.offsetHeight;
        this.width = this.sliderBox.offsetWidth;
    }.bind(this);

    this.Interval(); // 开始定时轮播

};

Slider.prototype.delegate = function(element, type, className, handler) {
    element.addEventListener(type, function(e){
        var target;
        e = e || window.event;
        target = e.target || e.srcElement;
        if(target&&target.nodeType === 1 && hasClassName(target, className)) {
            handler(target); // 执行handler
        };
    }, false);

    function hasClassName(element, className) {
        var classNames = element.className;
        if(!classNames) return false;
        var i, len, arr = classNames.split(' ');
        for(i = 0, len = arr.length; i < len; i++) {
            if(arr[i] === className) {
                return true;
            };
        };
        return false;
    };
};

Slider.prototype.$ = function(selec) {
    if(!selec) {
        return;
    };
    var charge = selec.substr(0, 1);
    var string = selec.substr(1);// 返回去除选择符的字符串
    switch (charge) {
        case '#': 
            return document.getElementById(string);
        case '.':
            return document.getElementsByClassName(string);
        default:
            return false;
    };
};

Slider.prototype.setActive = function(leaveIndex, comeIndex) { // 设置nowAt 类名
    removeClass(this.sliderItem[leaveIndex - 1], 'active');
    addClass(this.sliderItem[comeIndex -1], 'active');

    removeClass(this.controlList[leaveIndex - 1], 'active');
    addClass(this.controlList[comeIndex - 1], 'active');


/*
  * @para element {DOM Element}
  * @pare className {string}
  * return none 
  * add element className
  */
  function addClass(element, className) {
    removeClass(element, className);
    element.className = element.className + ' ' +className; // 坑 加上className之前要加上一个空格
  }

  /*
  * @para element {DOM Element}
  * @pare className {string}
  * return none 
  * remove element className
  */
  function removeClass(element, className) {
    var classNames = element.className;
    if(!classNames) {
      return false;
    }
    var i, len, arr = classNames.split(" ");
    for(i = 0, len = arr.length; i < len ; i ++) {
      if(arr[i] === className) {
        arr.splice(i,1);
      }
    }
    element.className = arr.join(" ");
  }
}

Slider.prototype.go = function (index) {
    if(index === this.nowAt) return false;
        // slider effect here
    if(index > this.sliderNum) { // 在最右边点击next button  实际上就等于go index one
        if(!this.loop) {
            this.stop();
            return false;
        }
        index = 1;
    };
    if(index < 1) { // 在最左边点击pre button  实际上就等于go index last
        if(!this.loop) {
            this.stop();
            return false;
        }
        index = this.sliderNum;
    };
    this.move(this.nowAt, index);
    // at bottom set nowAt
    this.nowAt = index;
};
Slider.prototype.Interval = function() {
    this.intervalFn = setInterval(function(){
       this.auto(); // 允许auto函数就ok了？
    }.bind(this), this.interval);
}

Slider.prototype.auto = function() {
    if(this.direction === 'left') { // 如果默认是向右滑动
        this.go(this.nowAt + 1);
    } else {
        this.go(this.nowAt - 1);
    }
}

Slider.prototype.pre = function() {
    this.go(this.nowAt -1);
};

Slider.prototype.next = function() {
    this.go(this.nowAt + 1);
};

Slider.prototype.move = function(leaveIndex, comeIndex) {
    //console.log(leaveIndex, comeIndex);
    var index = {
        l: leaveIndex,
        c: comeIndex
    }
    if(leaveIndex > comeIndex) {
        this.right(this.sliderItem[leaveIndex-1], this.sliderItem[comeIndex-1], index);
    } else {
        this.left(this.sliderItem[leaveIndex-1], this.sliderItem[comeIndex-1], index);
    }
};

Slider.prototype.left = function(leaveEle, comeEle, index) {
    comeEle.style.left = this.width + "px"; //先把即将移动进来的DOM移到正确的位置
    comeEle.style.top = 0 + "px";
    leaveEle.style.left = "0px";
    var begainT = + new Date(); //  what means +?
    var clock = window.setInterval(function(){
        var now =  + new Date(); //
        var prencen = (now - begainT)/400;
        if(prencen > 1) {
            prencen = 1;
            leaveEle.style.left = -this.width * prencen + 'px';
            comeEle.style.left = this.width * (1 - prencen)  + 'px';
            clearInterval(clock);
            this.setActive(index.l, index.c); // 保证滚动完成之后再添加 active类名
        } else {
            leaveEle.style.left = -this.width * prencen + 'px';
            comeEle.style.left = this.width * (1 - prencen)  + 'px';
        };
    }.bind(this), 30);
}

Slider.prototype.right = function(leaveEle, comeEle, index) {
    comeEle.style.left = -this.width + "px"; //先把即将移动进来的DOM移到正确的位置
    comeEle.style.top = 0 + "px";
    leaveEle.style.left = "0px";
   // alert('right move');
    var begainT = + new Date(); //  what means +?
    var clock = window.setInterval(function(){ // 这里是坑
        var now =  + new Date(); //
        var prencen = (now - begainT)/400;
        if(prencen > 1) {
            prencen = 1;
            leaveEle.style.left = this.width * prencen + 'px';
            comeEle.style.left = - this.width * (1 - prencen)  + 'px';
            clearInterval(clock);
            this.setActive(index.l, index.c); // 保证滚动完成之后再添加 active类名
        } else {
            leaveEle.style.left = this.width * prencen + 'px';
            comeEle.style.left = - this.width * (1 - prencen)  + 'px';
        };
    }.bind(this), 30);

}

Slider.prototype.stop = function () {
    clearInterval(this.intervalFn);
};

return Slider;
});