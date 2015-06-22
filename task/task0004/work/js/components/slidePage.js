/*
 * slidePage.js
 * 视图滑动, 现在只支持右侧进入，左侧滑出
 */

define(function(require, exports, module) {
    $.fn.slideIn=function (drection, doneCallback) {
        that=this;
        that.css("z-index", 99).addClass("pageshow-anim");
        setTimeout(function () {
            var delClass="pageshow-anim "+drection+"-in "+drection+"-in-posi";
            that.removeClass(delClass).css("z-index", null);
            doneCallback();
        }, 520);
        that.addClass(drection+"-in-posi");
        that.get(0).clientLeft;
        that.addClass(drection+"-in");
    };

    $.fn.slideOut=function (drection, doneCallback) {
        that=this;
        that.addClass("pageshow-anim").css("z-index", 99);
        setTimeout(function () {
            var delClass="pageshow-anim "+drection+"-out "+drection+"-out-posi";
            that.removeClass(delClass).css("z-index", null);
            doneCallback();
        }, 520);
        that.addClass(drection+"-out-posi");
        that.get(0).clientLeft;
        that.addClass(drection+"-out");
    };
});