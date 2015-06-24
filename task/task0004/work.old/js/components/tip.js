/*
 * Tip.js
 * 提示组件
 */

define(function(require, exports, module) {
    var timer1, timer2, timer3;
    var doc = document;

    var tip = {
        tipDom: null,
        show: function(txt) {
            var that = this;
            if (this.tipDom == null) {
                this.tipDom = this.createElement(txt);
                doc.body.appendChild(this.tipDom);
            } else {
                this.tipDom.innerHTML = txt;
            }

            if (timer1) {
                clearTimeout(timer1);
            }
            timer1 = setTimeout(function() {
                // addClass(that.tipDom, "in");
                $(that.tipDom).addClass("in");
            }, 10);
            if (timer2) {
                clearTimeout(timer2);
            }
            timer2 = setTimeout(function() {
                that.hide();
            }, 3000);
        },
        hide: function() {
            var that = this;
            // removeClass(that.tipDom, "in");
            $(that.tipDom).removeClass("in");
            if (timer3) {
                clearTimeout(timer3);
            }
            timer3 = setTimeout(function() {
                doc.body.removeChild(that.tipDom);
                that.tipDom = null;
            }, 410);
        },
        createElement: function(txt) {
            var div = doc.createElement("div");
            div.innerHTML = txt;
            var wid=txt.length*12+30; // 12: 字体大小，30: 左右padding， box-sizing: border-box
            $(div).addClass("tip fade out").css("width", wid);
            return div;
        }
    };

    module.exports = tip;
})