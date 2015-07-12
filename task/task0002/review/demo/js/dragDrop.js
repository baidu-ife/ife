define(function (require) {

    var util = require('./util');

    /**
     * dragDropIns:
     * {
     *     {Array.<HTMLElement>} items
     *     {number} startX
     *     {number} startY
     *     {HTMLElement} draggedObject
     *     {HTMLElement} dropTargetItem
     *     {HTMLElement} dropTargetBucket
     *     {number} initialOffsetX
     *     {number} initialOffsetY
     *     {string} originParent
     *     {string} originBucket
     *     {string} originCssPosition
     *     {string} originCssLeft
     *     {string} originCssTop
     * }
     */

    /**
     * 为给定的dom添加drag drop功能。
     *
     * @public
     * @param  {Object} options
     * @return {HTMLElement} [options.containerEl]
     * @return {string} [options.itemCss]
     * @return {string} [options.bucketCss]
     * @return {string} [options.draggedCss]
     * @return {string} [options.dragOverCss]
     * @return {string} [options.bucketOverCss]
     */
    function dragDrop(options) {
        var dragDropIns = {};
        dragDropIns.items = util.query(options.itemCss, options.containerEl);
        dragDropIns.buckets = util.query(options.bucketCss, options.containerEl);
        dragDropIns.draggedCss = options.draggedCss;
        dragDropIns.dragOverCss = options.dragOverCss;
        dragDropIns.bucketOverCss = options.bucketOverCss;

        for (var i = 0, len = dragDropIns.items.length; i < len; i++) {
            var item = dragDropIns.items[i];
            util.addEventListener(item, 'mousedown', util.curry(handleMouseDown, dragDropIns));
        }

        return dragDropIns;
    }

    /**
     * @inner
     */
    function handleMouseDown(dragDropIns, e) {
        var evt = new util.EventArg(e);

        // 对于某些浏览器（如IE11-，老版本的firefox），在窗口外松开鼠标不触发mouseup事件。
        // 或许，在mousemove时检测鼠标离开浏览器窗口就视作drop，是一种解决方式，但是这可能带来并不好的用户体验。
        // 而且，如果鼠标按住没松手时，键盘按ctrl+alt切换当前应用程序窗口，再松鼠标，也仍然有问题。
        // 我们可以用window的blur事件来减少这个问题触发的场景（按ctrl+alt）。
        // 并且至少保证，在窗口外松开鼠标又回来后，能够以原先的拖拽上下文继续，而不是出现不可恢复的影响。
        if (dragDropIns.draggedObject) {
            dragRelease(dragDropIns);
        }
        dragStart(dragDropIns, evt.getTarget(), evt);

        evt.stop();
    }

    /**
     * @inner
     */
    function handleMouseMove(dragDropIns, e) {
        var evt = new util.EventArg(e);

        updateDragPosition(dragDropIns, evt.pageX, evt.pageY);
        updateDragOver(dragDropIns, evt.clientX, evt.clientY);
        evt.stop();
    }

    /**
     * @inner
     */
    function handleMouseUp(dragDropIns) {
        dragRelease(dragDropIns);
    }

    /**
     * @inner
     */
    function dragStart(dragDropIns, targetEl, initialPos) {
        dragDropIns.draggedObject = targetEl;

        var pos = util.getPosition(targetEl);
        dragDropIns.startX = pos.left;
        dragDropIns.startY = pos.top;
        dragDropIns.initialPageX = initialPos.pageX;
        dragDropIns.initialPageY = initialPos.pageY;

        dragDropIns.handleMouseMove = util.curry(handleMouseMove, dragDropIns);
        dragDropIns.handleMouseUp = util.curry(handleMouseUp, dragDropIns);

        dragDropIns.originParent = util.getParent(targetEl);
        dragDropIns.originCssPosition = targetEl.style.position;
        dragDropIns.originCssLeft = targetEl.style.left;
        dragDropIns.originCssTop = targetEl.style.top;
        targetEl.style.position = 'absolute';
        util.addClass(targetEl, dragDropIns.draggedCss);

        // 放到body中，避免拖拽中受祖先容器的影响，如IE7-的z-index。
        document.body.appendChild(targetEl);

        updateDragPosition(dragDropIns, dragDropIns.initialPageX, dragDropIns.initialPageY);

        // mousemove和mouseup设在document，因为如果设在节点上，可能因移动过快而失去控制。
        util.addEventListener(document, 'mousemove', dragDropIns.handleMouseMove);
        util.addEventListener(document, 'mouseup', dragDropIns.handleMouseUp);
        util.addEventListener(window, 'blur', dragDropIns.handleMouseUp);
    }

    /**
     * @inner
     */
    function dragRelease(dragDropIns) {
        doDrop(dragDropIns);
        clearDragDrop(dragDropIns);
    }

    /**
     * @inner
     */
    function doDrop(dragDropIns) {
        var draggedObject = dragDropIns.draggedObject;

        if (draggedObject) {
            draggedObject.style.position = dragDropIns.originCssPosition;
            draggedObject.style.left = dragDropIns.originCssLeft;
            draggedObject.style.top = dragDropIns.originCssTop;

            // drop到targetItem处
            var dropTargetItem = dragDropIns.dropTargetItem;
            var dropTargetBucket = dragDropIns.dropTargetBucket;
            if (dropTargetItem) {
                util.removeClass(dropTargetItem, dragDropIns.dragOverCss);
                dragDropIns.dropTargetItem = null;
                util.insertBefore(draggedObject, dropTargetItem);
            }
            // drop到targetBucket最后
            else if (dropTargetBucket) {
                dropTargetBucket.appendChild(draggedObject);
                dragDropIns.dropTargetBucket = null;
                util.removeClass(dropTargetBucket, dragDropIns.bucketOverCss);
            }
            // drop到原bucket最后
            else {
                dragDropIns.originParent.appendChild(draggedObject);
            }

            dragDropIns.originParent = null;
        }
    }

    /**
     * @inner
     */
    function clearDragDrop(dragDropIns) {
        if (dragDropIns.draggedObject) {
            // release后要从document上清除mousemove和mouseup，保证干净。
            util.removeEventListener(document, 'mousemove', dragDropIns.handleMouseMove);
            util.removeEventListener(document, 'mouseup', dragDropIns.handleMouseUp);
            util.removeEventListener(window, 'blur', dragDropIns.handleMouseUp);
            dragDropIns.handleMouseMove = null;
            dragDropIns.handleMouseUp = null;

            util.removeClass(dragDropIns.draggedObject, dragDropIns.draggedCss);
            dragDropIns.draggedObject = null;
        }
    }

    /**
     * @inner
     */
    function updateDragPosition(dragDropIns, pageX, pageY) {
        // 有几种方式能计算拖拽实时位置。选取兼容性好的方式。
        // 方式一：mouseDown时得到evt.offsetX，evt.offsetY，drag实时得到evt.pageX，evt.pageY，再加。
        // 但是offsetX和offsetY浏览器兼容性问题没有很理想的实现。
        // 所以用此方式二：计算偏移量。
        // 注意，如果用clientX/clientY来计算，如果边drag鼠标滚轮变滚则会出问题。所以使用pageX/pageY。
        var dx = pageX - dragDropIns.initialPageX;
        var dy = pageY - dragDropIns.initialPageY;

        var draggedObject = dragDropIns.draggedObject;
        if (draggedObject) {
            draggedObject.style.left = dragDropIns.startX + dx + 'px';
            draggedObject.style.top = dragDropIns.startY + dy + 'px';
        }
    }

    /**
     * @inner
     */
    function updateDragOver(dragDropIns, clientX, clientY) {
        var items = dragDropIns.items;
        var buckets = dragDropIns.buckets;
        var dragOverItem;

        dragDropIns.dropTargetItem = null;
        dragDropIns.dropTargetBucket = null;

        // 清除hover样式
        for (var i = 0, len = buckets.length; i < len; i++) {
            util.removeClass(buckets[i], dragDropIns.bucketOverCss);
        }
        for (var i = 0, len = items.length; i < len; i++) {
            util.removeClass(items[i], dragDropIns.dragOverCss);
        }

        // 先寻找是否hover到某块上
        for (var i = 0, len = items.length; i < len; i++) {
            if (items[i] !== dragDropIns.draggedObject
                && intersect(clientX, clientY, items[i])
            ) {
                dragOverItem = items[i];
                break;
            }
        }

        if (dragOverItem) {
            dragDropIns.dropTargetItem = dragOverItem;
            util.addClass(dragOverItem, dragDropIns.dragOverCss);
        }
        else {
            // 如果没有hover到某块上，再寻找是否hover到某桶上
            for (var i = 0, len = buckets.length; i < len; i++) {
                if (intersect(clientX, clientY, buckets[i])) {
                    dragDropIns.dropTargetBucket = buckets[i];
                    util.addClass(buckets[i], dragDropIns.bucketOverCss);
                    break;
                }
            }
        }
    }

    /**
     * @inner
     */
    function intersect(clientX, clientY, el) {
        var clientPos = util.getClientPosition(el);
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        return clientX > clientPos.left && clientX < clientPos.left + width
            && clientY > clientPos.top && clientY < clientPos.top + height;
    }

    return dragDrop;
});