/**
 * @file 轮播图
 * @author hushicai(bluthcy@gmail.com)
 */

// 依赖于src/dom.js


// 这里没有用到css3 transition，使用js来实现动画效果
// 当然，你也可以修改下面的SlideEffect类，将它改成css3的，你要是想兼容js和css3也可以...
// 这个轮播组件当然还不是很完善，比如轮播方向、防止快速点击等功能。

// 复制
function extend(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}

// 绑定context
function bind(fn, context) {
    var args = [].slice.call(arguments, 2);
    return function () {
        args = args.concat([].slice.call(arguments));
        return fn.apply(context, args);
    };
}

// 继承
function inherits(subClass, superClass) {
    var proto = subClass.prototype;
    var F = function () {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    extend(subClass.prototype, proto);
    return subClass;
}

// 判断元素的包含关系
function contains(node1, node2) {
    if (node1 === node2) {
        return false;
    }
    if (node1.contains) {
        return node1.contains(node2);
    }
    return !!(node1.compareDocumentPosition(node2) & 16);
}

// 判断mouseover/mouseout是否跨元素边界
// 实际应用时，需要修正EventTarget
function crossElementBoundary(e) {
    // 当前处理事件的元素
    var currentTarget = e.currentTarget;
    // mouseover时，来源
    var relatedTarget = e.relatedTarget;
    // mouseout时，去处
    if (contains(currentTarget, relatedTarget)) {
        return false;
    }
    return true;
}

/**
 * 轮播
 *
 * @constructor
 * @param {Object} options 配置项
 */
var Slider = function (options) {
    this.prefix = 'slider';
    this.itemClass = 'slider-item';
    this.index = 0;
    this.interval = 2000;
    this.loop = 1;
    this.effect = null;

    extend(this, options);

    this._main = $('.' + this.prefix)[0];

    this._items = $('.' + this.prefix + ' ' + '.' + this.itemClass);

    this._count = this._items.length;
    this._stage = $('.' + this.getPartClass('inner'))[0];

    // 实际应用中，需要考虑resize
    this._stageWidth = this._stage.clientWidth;

    // control
    var div = document.createElement('div');
    div.className = this.getPartClass('control');
    for (var i = 0, len = this._items.length; i < len; i++) {
        var iEl = document.createElement('i');
        iEl.setAttribute('data-index', i);
        div.appendChild(iEl);
    }
    this._main.appendChild(div);

    var self = this;

    // 这里只用w3c标准的函数
    // 实际应用中，请自行实现事件监听
    div.addEventListener('click', function (e) {
        var node = e.target;
        if (node.tagName === 'I' && !hasClass(node, self.getPartClass('item-selected'))) {
            var index = parseInt(node.getAttribute('data-index'), 10);
            self.goTo(index);
        }
    }, false);

    // 不能直接使用mouseover、mouseout，当内部存在子元素时，mouseover、mouseout会触发多次。
    // 自己模拟mouseenter、mouseout，符合w3c规范
    // 实际应用中，可以使用jquery等库
    var main = this._main;
    main.addEventListener('mouseover', function (e) {
        if (crossElementBoundary(e)) {
            self._clearTimer();
        }
    }, false);

    main.addEventListener('mouseout', function (e) {
        if (crossElementBoundary(e)) {
            self.play();
        }
    }, false);

    this._setCurrent();
    // init select
    this.slide(this.index);
};

Slider.prototype._setCurrent = function () {
    var controlElments = $('.' + this.getPartClass('control') + ' i');
    var selectedClass = this.getPartClass('control-selected');
    if (controlElments[this.lastIndex]) {
        removeClass(controlElments[this.lastIndex], selectedClass);
    }
    if (controlElments[this.index]) {
        addClass(controlElments[this.index], selectedClass);
    }
};

Slider.prototype.getPartClass = function (part) {
    return this.prefix + '-' + part;
};

Slider.prototype.getIndex = function (index) {
    if (index === this.index) {
        return -1;
    }
    if (index >= this._count) {
        index = this.loop ? 0 : this._count - 1;
    } else if (index < 0) {
        index = this.loop ? this._count - 1 : 0;
    }
    return index;
};

Slider.prototype.prev = function () {
    this.goTo(this.index - 1);
    return this;
};

Slider.prototype.next = function () {
    this.goTo(this.index + 1);
    return this;
};

Slider.prototype.goTo = function (index) {
    index = this.getIndex(index);

    if (index === -1) {
        return;
    }

    // update index
    this.lastIndex = this.index;
    this.index = index;

    this._setCurrent();

    this.slide(this.index, this.lastIndex);

    return this;
};

Slider.prototype.slide = function (index, lastIndex) {
    if (this.effect) {
        this.effect.startWithTarget(this);
        this.effect.switchTo(index, lastIndex);
    }
};

Slider.prototype._onSwitch = function () {
    this.next();
};

Slider.prototype.play = function () {
    if (this.auto) {
        this._clearTimer();
        this._switchTimer = setInterval(bind(this._onSwitch, this), this.interval);
    }
};

Slider.prototype._clearTimer = function () {
    clearTimeout(this._switchTimer);
    this._switchTimer = null;
};





// ----------------- 简易的动画效果---------------------
var raf = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || function (callback) {
        return setTimeout(callback, 1000 / 60);
    };

var caf = window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.mozCancelAnimationFrame
    || window.oCancelAnimationFrame
    || function (id) {
        clearTimeout(id);
    };

// 缓动函数
var easing = {
    linear: function (t) {
        return t;
    }
};

/**
 * 动画类
 *
 * @constructor
 * @param {Object} options 配置项
 */
var Animation = function (options) {
    this.duration = 1000;
    extend(this, options);
};

Animation.prototype.startWithTarget = function (target) {
    this.target = target;
};

Animation.prototype.start = function () {
    var self = this;
    self._startTime = +new Date();
    function mainLoop() {
        var now = +new Date();
        var elapsedTime = now - self._startTime;
        if (elapsedTime >= self.duration) {
            self.tick(1);
            self.stop();
        }
        else {
            self.tick(elapsedTime / self.duration);;
            self._rafId = raf(mainLoop);
        }
    }
    if (!this._rafId) {
        this._rafId = raf(mainLoop);
    }
};

Animation.prototype.stop = function () {
    if (this._rafId) {
        caf(this._rafId);
        this._rafId = null;
    }
    this._done && this._done();
};

Animation.prototype.tick = function (percent) {
    var easingFn = this.easingName ? easing[this.easingName] : '';
    if (easingFn) {
        percent = easingFn(percent);
    }
    this.draw(percent);
};

Animation.prototype.transition = function (from, to, cb) {
    this.from = from;
    this.to = to;
    this.start();
    // 注册回调
    // 更好的方式应该用promise
    this._done = cb;
};

Animation.prototype.draw = function (percent) {};



// ----------- 轮播效果，继承自Animation ------------- 

/**
 * 左右滑动效果类
 *
 * @constructor
 * @param {Object} options 配置项
 */
var SlideEffect = function (options) {
    Animation.call(this, options);
};

// 切换到指定index
SlideEffect.prototype.switchTo = function (index, lastIndex) {
    var slider = this.target;
    var items = slider._items;
    var itemSelectedClass = slider.getPartClass('item-selected');
    var itemNextClass = slider.getPartClass('item-next');
    var currentItem = items[lastIndex];
    var nextItem = items[index];
    if (currentItem) {
        addClass(currentItem, itemSelectedClass);
    }
    if (nextItem) {
        addClass(nextItem, itemNextClass);
    }
    // 当只指定了一个index参数时，不播放动画
    if (index === undefined || lastIndex === undefined) {
        return this;
    }
    var from = 0;
    var to = slider._stageWidth;

    this._index = index;
    this._lastIndex = lastIndex;

    function done() {
        if (currentItem) {
            removeClass(currentItem, itemSelectedClass);
        }
        if (nextItem) {
            removeClass(nextItem, itemNextClass);
            addClass(nextItem, itemSelectedClass);
        }
    }
    // 其实，可以在这里把js动画改成css3动画
    this.transition(from, to, done);
    return this;
};

// 绘制dom元素
SlideEffect.prototype.draw = function (percent) {
    var slider = this.target;
    var delta = (this.to - this.from) * percent;
    var stageWidth = slider._stageWidth;
    var items = slider._items;
    var currentItem = items[this._lastIndex];
    var nextItem = items[this._index];

    currentItem.style.left = this.from - delta + 'px';
    nextItem.style.left = this.to - delta + 'px';
};

inherits(SlideEffect, Animation);

// 如果你想用其他轮播效果，比如淡入、淡出等，你可以自己实现一个类，继承自Animation。
// 然后以参数的形式传递给Slider即可。