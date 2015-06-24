/*
 * slidePage.js
 * 视图滑动, 现在只支持右侧进入，左侧滑出
 */

define(function(require, exports, module) {
    var render=function () {
        var arr=["oT", "mozT", "webkitT", "msT", "t"],
            len=arr.length,
            domStyle=document.body.style;

        for(var i=0; i<len; i++) {
            var temp=arr[i]+"ransition";
            if(temp in domStyle) {
                return arr[i].substr(0, arr[i].length-1);
            }
        }

        return false;
    }();

    var transitionEndEve=function () {
        if(render === false) return false;
        if(render !== "") {
            var res=render+"TransitionEnd";
            if(("on"+res).toLowerCase() in window) return res;
        }else{
            if("ontransitionend" in window) return "transitionEnd";
        }
        return false;
    }();

    $.fn.slideIn=function (drection, doneCallback) {
        that=this;
        that.css("z-index", 99).addClass("pageshow-anim");
        if(transitionEndEve !== false) {
            that.one(transitionEndEve, endHandler);
        }else{
            setTimeout(endHandler, 520);
        }        
        that.addClass(drection+"-in-posi");
        that.get(0).clientLeft;
        that.addClass(drection+"-in");

        function endHandler (e) {
            var delClass="pageshow-anim "+drection+"-in "+drection+"-in-posi";
            that.removeClass(delClass).css("z-index", null);
            doneCallback();
        }
    };

    $.fn.slideOut=function (drection, doneCallback) {
        that=this;
        that.addClass("pageshow-anim").css("z-index", 99);
        if(transitionEndEve !== false) {
            that.one(transitionEndEve, endHandler);
        }else{
            setTimeout(endHandler, 520);
        }
        that.addClass(drection+"-out-posi");
        that.get(0).clientLeft;
        that.addClass(drection+"-out");

        function endHandler (e) {
            var delClass="pageshow-anim "+drection+"-out "+drection+"-out-posi";
            that.removeClass(delClass).css("z-index", null);
            doneCallback();
        }
    };
});