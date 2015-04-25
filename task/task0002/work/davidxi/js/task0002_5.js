/**
 * https://raw.githubusercontent.com/google/closure-library/master/closure/goog/fx/dragger.js
 */
function Dragger(target, id) {
    _.bindAll(this);

    if (!target) throw new Error('@param target is empty');
    this.id = id;
    this.target = target;

    $.on(this.target, 'mousedown', this.startDrag);
};

Dragger.EventType = {
    EARLY_CANCEL: 'dragEarlycancel',
    START: 'dragStart',
    BEFOREDRAG: 'dragBeforedrag',
    DRAG: 'dragDrag',
    END: 'dragEnd'
};

Dragger.prototype.getTarget = function() {
    return this.target;
};

Dragger.prototype.dispatchEvent = function(eventType, dragobj, clientX, clientY, browserEvent) {
    var memo = {
        dragobj: dragobj,
        clientX: clientX,
        clientY: clientY,
        browserEvent: browserEvent
    };
    var event = new CustomEvent(eventType, {
        'bubbles': true,
        'detail': memo
    });
    dragobj.target.dispatchEvent(event);
};

Dragger.prototype.startDrag = function(e) {
    this.dragging_ = true;
    this.dispatchEvent(Dragger.EventType.START, this, e.clientX, e.clientY, e);

    this.setupDragHandlers();

    this.clientX = this.startX = e.clientX;
    this.clientY = this.startY = e.clientY;
    this.screenX = e.screenX;
    this.screenY = e.screenY;

    this.deltaX = this.target.offsetLeft;
    this.deltaY = this.target.offsetTop;

    this.target.style.position = 'absolute';
};

Dragger.prototype.setupDragHandlers = function() {
    $.on(document, 'mousemove', this.handleMove_);
    $.on(document, 'mouseup', this.endDrag);
    /**
     * http://stackoverflow.com/questions/7059039/prevent-accidental-select-drag-highlight
     */
    this._cancelSelectStart = this._cancelSelectStart || function(event) {
        event.preventDefault();
        return false;
    };
    $.on(document.body, 'selectstart', this._cancelSelectStart);
};

Dragger.prototype.removeDragHandlers = function() {
    $.un(document, 'mousemove', this.handleMove_);
    $.un(document, 'mouseup', this.endDrag);
    $.un(document.body, 'selectstart', this._cancelSelectStart);
}

Dragger.prototype.doDrag = function(e, x, y, dragFromScroll) {
    this.target.style.left = x + 'px';
    this.target.style.top = y + 'px';

    this.dispatchEvent(Dragger.EventType.DRAG, this, e.clientX, e.clientY, e, x, y);
};

Dragger.prototype.endDrag = function(e, opt_dragCanceled) {
    this.removeDragHandlers();

    if (this.dragging_) {
        this.dragging_ = false;

        var x = this.deltaX;
        var y = this.deltaY;
        this.dispatchEvent(Dragger.EventType.END, this, e.clientX, e.clientY, e, x, y);
    } else {
        this.dispatchEvent(Dragger.EventType.EARLY_CANCEL);
    }
};

Dragger.prototype.handleMove_ = function(e) {
    var dx = e.clientX - this.clientX;
    var dy = e.clientY - this.clientY;
    this.clientX = e.clientX;
    this.clientY = e.clientY;
    this.screenX = e.screenX;
    this.screenY = e.screenY;

    this.deltaX += dx;
    this.deltaY += dy;
    var x = this.deltaX;
    var y = this.deltaY;

    if (this.dragging_) {

        this.dispatchEvent(Dragger.EventType.BEFOREDRAG, this, e.clientX, e.clientY,
            e, x, y);


        this.doDrag(e, x, y, false);
        e.preventDefault();
    }
};

/**
 * drag box across lists
 * (simplified version) assume no page scroll is involved
 */
function DragBoxControls() {
    _.bindAll(this);

    this._dragLists = [];
    this._cachedListBound = [];
    this._dragItems = [];

    var self = this;
    var docEl = document.documentElement;
    $.on(document, Dragger.EventType.START, this.cacheListBound);
    $.on(document, Dragger.EventType.END, function(event) {
        var target = event.target;
        self.insertElemToList(target);
    });
}

DragBoxControls.prototype.addList = function(elList, childrenSelector) {
    if (!elList) return;
    var items = _.dom.query(childrenSelector, elList);
    var self = this;
    _.each(items, function(item) {
        self._dragItems.push(new Dragger(item));
    });
    self._dragLists.push(elList);
};

function getElementBound(elem) {
    elem.offsetLeft;
    return {
        x: elem.offsetLeft,
        y: elem.offsetTop,
        x1: elem.offsetLeft + elem.offsetWidth,
        y1: elem.offsetTop + elem.offsetHeight
    };
}

DragBoxControls.prototype.cacheListBound = function() {
    for (var i = 0; i < this._dragLists.length; i++) {
        this._cachedListBound[i] = getElementBound(this._dragLists[i]);
    }
};

DragBoxControls.prototype.insertElemToList = function(elem) {
    var overlapped = [];
    var boundSelf = getElementBound(elem);
    var boundTarget;
    var item;
    for (var i = 0; i < this._dragItems.length; i++) {
        item = this._dragItems[i].getTarget();
        if (item === elem) continue;
        boundTarget = getElementBound(item);

        if ((boundSelf.y >= boundTarget.y && boundSelf.y <= boundTarget.y1) ||
            (boundSelf.y1 >= boundTarget.y && boundSelf.y1 <= boundTarget.y1)) {
            if ((boundSelf.x >= boundTarget.x && boundSelf.x <= boundTarget.x1) ||
                (boundSelf.x1 >= boundTarget.x && boundSelf.x1 <= boundTarget.x1)) {
                overlapped.push(item);
            }
        }
    }
    overlapped.sort(function(a, b) {
        return a.y < b.y;
    });
    overlapped = overlapped.slice(0, 2);
    // change the node positon in the list
    if (overlapped.length === 2) {
        item = overlapped[1];
        _.dom.insertBefore(elem, item);
    } else if (overlapped.length === 1) {
        item = overlapped[0];
        boundTarget = getElementBound(item);
        if (boundTarget.y <= boundSelf.y) {
            // append after the last element
            _.dom.append(elem, item.parentNode);
        } else {
            // append before the first elemnt
            _.dom.insertBefore(elem, item);
        }
    }
    // reset back to normal layout flow
    elem.style.position = '';
    elem.style.left = elem.style.top = '';
}