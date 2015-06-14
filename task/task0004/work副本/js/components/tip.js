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
                addClass(that.tipDom, "in");
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
            removeClass(that.tipDom, "in");
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
            addClass(div, "tip");
            addClass(div, "fade");
            addClass(div, "out");
            return div;
        }
    };

    module.exports = tip;
})