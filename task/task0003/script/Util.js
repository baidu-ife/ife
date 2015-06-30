var Util = {
    
    addEvent: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    /*
        *定义事件代理函数
        *@ele——事件注册的元素
        *@tag——标签名
        *@eventName——事件类型
        *@listener——事件监听函数
    */
    delegate: function  (ele, tag, eventName, listener) {
        this.addEvent(ele, eventName, function (e) {
            var event = e || window.event;
            var target = event.target || event.srcElement;
            if (target.nodeName.toLowerCase() == tag) {
                listener(target);
            }
        });
    },
    getEvent: function(event) {
        return event ? event : window.event;
    },

    getTarget: function(event) {
        return event.target || event.srcElement;
    },

    preventDefault: function(event) {
        if (event.preventDefault) {
            return event.preventDefault();
        } else {
            event.returnValue = "false";
        }
    },
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }

    },

    DOM: {
        /** 
         * 监听Dom树结构初始化完毕事件
         * @method  ready
         * @param {function} handler 事件处理程序
         * @param {object}  doc (Optional)  document 默认为 当前document
         * @return  {void}
         */
        ready: function(handler, doc) {
            doc = doc || document;
            var win = doc.defaultView || doc.parentWindow,
                cbs = doc.__QWDomReadyCbs = doc.__QWDomReadyCbs || [];
            cbs.push(handler);

            function execCbs() { //JK：这里需要保证：每一个回调都执行，并且按顺序，并且每一个回调的异常都被抛出以方便工程师发现错误
                clearTimeout(doc.__QWDomReadyTimer);
                if (cbs.length) {
                    var cb = cbs.shift();
                    if (cbs.length) {
                        doc.__QWDomReadyTimer = setTimeout(execCbs, 0);
                    }
                    cb();
                }
            }

            setTimeout(function() { //延迟执行，而不是立即执行，以保证ready方法的键壮
                if ('complete' == doc.readyState) {
                    execCbs();
                } else {
                    if (doc.addEventListener) {
                        doc.addEventListener('DOMContentLoaded', execCbs, false);
                        win.addEventListener("load", execCbs, false); //添加load来避免DOMContentLoaded没有执行的情况，例如interactive状态
                    } else {
                        (function() {
                            try {
                                doc.body.doScroll('left');
                            } catch (exp) {
                                return setTimeout(arguments.callee, 1);
                            }
                            execCbs();
                        }());
                        doc.attachEvent('onreadystatechange', function() {
                            if ('complete' == doc.readyState) {
                                execCbs();
                            }
                        });
                    }
                }
            }, 1);
        }
    },

    /*
        param {Objcet} options 
             {Function} onsuccess 成功时的回调
             {Function} onfail 失败时的回调
             {Object} data 数据/键值对
             {sting} get/post 方法，默认为post
    */
    ajax: function(url, options) {
        var xhr = new XMLHttpRequest(),
            urlParam = '';

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    options.onsuccess && options.onsuccess(xhr.responseText);
                } else {
                    options.onfail && options.onfail(xhr.status);
                }
            }
        };

        if (options.data) {
            var array = [];
            for (var i in options.data) {
                array.push(encodeURIComponent(i) + '=' + encodeURIComponent(options.data[i]));
            }
            urlParam = array.join('&');
        }

        options.type = options.type || 'get';

        if (options.type === 'get') {
            if (options.data) {
                url += '?' + urlParam;
            }
            xhr.open('get', url, true);
            xhr.send(null);
        } else if (options.type == 'post') {
            xhr.open('post', url, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(urlParam);
        }
    }
}

// 对动画的一个封装
function Animation(target, dur) {
    this.target = target;
    this.dur = dur;

    // p = 动画已执行时间 / 动画持续的时间
    // 等同于物体运动公式中的时间 t
    // p的取值范围[0,1]，用来控制缓动或渐变过程
    this.easing = function(p) {
        return p
    };
}

Animation.prototype = {
    constructor: Animation,

    // 具体控制动画的函数
    onProgress: function(p) {
        console.log("animation playing: " + p);
    },

    onFinished: function() {},
    // 动画初始化
    start: function() {
        this.p = 0;
        this.startTime = Date.now();

        var self = this;
        requestAnimationFrame(function f() {
            if (self.p >= 0.95) {
                self.onProgress(self.easing(1.0));
                self.onFinished();
            } else {
                self.p = (Date.now() - self.startTime) / self.dur;
                self.onProgress(self.easing(self.p));
                requestAnimationFrame(f);
            }
        });
    }
};