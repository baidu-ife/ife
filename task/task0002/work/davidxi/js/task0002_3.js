var isTransitionSupport = (function() {
    /**
     * https://raw.githubusercontent.com/twbs/bootstrap/master/js/transition.js
     */
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false;
})();

function mockTransitionEnd(cb) {
    // 600ms corresponds to the duration value of transition we set in css
    window.setTimeout(cb, 600);
}

/**
 * main class
 */
function Slide(container, options) {
    this._elContainer = container;
    this.options = Object.assign({
        direction: 'left',
        interval: 3000,
        cycle: true
    }, options);

    this._items = _.dom.query('.item', this._elContainer);
    this._buttons = _.dom.query('[data-slide-to]', this._elContainer);

    var self = this;
    $.on(this._elContainer, '[data-slide-to]', 'click', function(event) {
        var target = event.target;
        var nextIndex = target.getAttribute('data-slide-to');
        self.slide('byIndex', nextIndex >>> 0);
    });

    this.options.cycle && this.cycle();
}

Slide.prototype.cycle = function() {
    this._interval && clearInterval(this._interval);
    var self = this;
    this._interval = window.setInterval(function() {
        if (self.sliding) return;
        self.slide(self.options.direction === 'left' ? 'next' : 'prev');
    }, this.options.interval);
};

function getCurrentNode(type) {
    var selector = type === 'item' ? '.item.active' : '.active[data-slide-to]';
    var current = _.dom.query(selector, this._elContainer);
    return current.length ? current[0] : null;
}
Slide.prototype.getCurrentItem = function() {
    return getCurrentNode('item');
};
Slide.prototype.getCurrentButton = function() {
    return getCurrentNode('button');
};

Slide.prototype.getCurrentIndex = function(current) {
    current || (current = this.getCurrentItem(current));
    return _.indexOf(this._items, current);
};

function getNextIndex(direction, current) {
    var len = this._items.length;
    var index = this.getCurrentIndex(current);
    index = (index + (direction === 'left' ? 1 : -1) + len) % len;
    return index;
}
Slide.prototype.getNextItem = function(direction, current) {
    return this._items[getNextIndex.call(this, direction, current)];
};
Slide.prototype.getNextButton = function(direction, current) {
    return this._buttons[getNextIndex.call(this, direction, current)];
};
Slide.prototype.getItemByIndex = function(index) {
    return this._items[index];
};
Slide.prototype.getButtonByIndex = function(index) {
    return this._buttons[index];
}

Slide.prototype.slide = function(type, next) {
    // do not use if (sliding) return, in case user clicks number to navigate
    var direction;
    var current = this.getCurrentItem();
    var currentButton = this.getCurrentButton();
    var next;
    var nextButton;
    var shouldRestartCycle = false;
    if (type === 'next' || type === 'prev') {
        direction = this.options.direction;
    } else {
        if (typeof next !== 'number') throw new Error('invalid param type');
        var currentIndex = this.getCurrentIndex(current);
        var nextIndex = next;
        if (nextIndex == currentIndex) {
            return;
        }
        direction = nextIndex > currentIndex ? 'left' : 'right';
        next = this.getItemByIndex(nextIndex);
        nextButton = this.getButtonByIndex(nextIndex);
        type = nextIndex > currentIndex ? 'next' : 'prev';
        shouldRestartCycle = true;
    }
    next || (next = this.getNextItem(direction, current));
    nextButton || (nextButton = this.getNextButton(direction, current));

    this.sliding = true;

    _.dom.removeClass(currentButton, 'active');
    _.dom.addClass(nextButton, 'active');

    var self = this;

    if (isTransitionSupport) {
        _.dom.addClass(next, type);
        next.offsetWidth // force reflo
        _.dom.addClass(next, direction);
        _.dom.addClass(current, direction);
        mockTransitionEnd(function() {
            onSlideDone();
            _.dom.removeClass(current, direction);
            _.dom.removeClass(next, direction);
            _.dom.removeClass(next, type);
        });
    } else {
        onSlideDone();
    }

    function onSlideDone() {
        _.dom.removeClass(current, 'active');
        _.dom.addClass(next, 'active');
        self.sliding = false;
        shouldRestartCycle && self.cycle();
    }
};

/**
 * initialize slide instance
 */
var slider = new Slide($('#carousel-example-generic'));