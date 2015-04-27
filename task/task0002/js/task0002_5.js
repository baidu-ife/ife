$(function () {
    var moving = false;

    $('li').mousedown(function (e) {
        moving = this;
        $(moving).addClass('move');
        $(moving).offset({
            top: e.pageY,
            left: e.pageX
        });
    });

    var leftElem = $('#left');
    var left = leftElem.position();
    var leftTop = left.top;
    var leftLeft = left.left;
    var leftRight = left.left + leftElem.outerWidth();
    var rightElem = $('#right');
    var right = rightElem.position();
    var rightTop = right.top;
    var rightLeft = right.left;
    var rightRight = right.left + rightElem.outerWidth();
    var itemHeight = 50;

    $('div').mousemove(function (e) {
        if (moving) {
            $(moving).offset({
                top: e.pageY,
                left: e.pageX
            });
        }
    }).mouseup(function (e) {
        var top = e.pageY;
        var left = e.pageX;

        // 不在左右有效区域内不动

        var children;
        var delta;
        // 在左边
        if (left > leftLeft && left < leftRight) {
            children = leftElem.children();
            delta = Math.max(0, Math.floor((top - leftTop) / itemHeight));

            if (delta >= children.length) {
                leftElem.append(moving);
            }
            else {
                $(children[delta]).before(moving);
            }
        }

        // 在右边
        if (left > rightLeft && left < rightRight) {
            children = rightElem.children();
            delta = Math.max(0, Math.floor((top - rightTop) / itemHeight));

            if (delta >= children.length) {
                rightElem.append(moving);
            }
            else {
                $(children[delta]).before(moving);
            }
        }

        $(moving).removeClass('move');
        moving = false;
    });
});