define([], function() {
    return {
        /**
        * 判断是否有某个className
        * @param {HTMLElement} element 元素
        * @param {string} className className
        * @return {boolean}
        */
        hasClass: function(element, className) {
            var classNames = element.className;
            if (!classNames) {
                return false;
            }
            classNames = classNames.split(/\s+/);
            for (var i = 0, len = classNames.length; i < len; i++) {
                if (classNames[i] === className) {
                    return true;
                }
            }
            return false;
        },

        /**
        * 添加className
        *
        * @param {HTMLElement} element 元素
        * @param {string} className className
        */
        addClass: function(element, className) {
            if (!this.hasClass(element, className)) {
                element.className = element.className ?[element.className, className].join(' ') : className;
            }
        },

        /**
        * 删除元素className
        *
        * @param {HTMLElement} element 元素
        * @param {string} className className
        */
        removeClass: function(element, className) {
            if (className && this.hasClass(element, className)) {
                var classNames = element.className.split(/\s+/);
                for (var i = 0, len = classNames.length; i < len; i++) {
                    if (classNames[i] === className) {
                        classNames.splice(i, 1);
                        break;
                    }
                }
            }
            element.className = classNames.join(' ');
        },

        /**
         * 判断是否是兄弟元素
         *
         * @param {HTMLElement} element html元素
         * @param {HTMLElement} siblingNode 判断元素
         * @return {boolean}
         */
        isSiblingNode: function(element, siblingNode) {
            for (var node = element.parentNode.firstChild; node; node = node.nextSibling) {
                if (node === siblingNode) {
                    return true;
                }
            }
            return false;
        },

        /*
        * 元素显示和隐藏
        */ 
        show: function(element) {
            if (this.hasClass(element,'hide')) {
                this.removeClass(element,'hide');
            }

            this.addClass(element, 'show');
        },

        hide: function(element) {
            if (this.hasClass(element,'show')) {
                this.removeClass(element,'show');
            }

            this.addClass(element, 'hide');
        },
        //判断是否是手机设备
        isMobile: function() {
            return (/(iPhone|iPod|Android|ios|iPad)/i).test(navigator.userAgent);
        },
        //去字符串前后空格
        trim: function(str) {
            var re = /^\s+|\s+$/g;
            return str.replace(re,'');
        },

        //获取当前时间 格式 2015-05-06
        getFormatDate: function (){   
            var oDate = new Date();
            var str = '';
            str = oDate.getFullYear();
            str += '-' + this.addZero(oDate.getMonth()+1) + '-' + this.addZero(oDate.getDate());
            return str;
        },

        //十位补零 9 --> 09
        addZero: function (sum) {   
            if (sum<10) {
                return '0' + sum;
            } else {
                return sum;
            }
        },

        // 给一个dom绑定一个针对event事件的响应，响应函数为listener
        addEvent: function (element, event, listener) {
            //设置事件名标识
            var evName = event;

            //把事件函数添加到绑定的元素自定义属性上
            if (element.evName) {
                element.evName.push(listener);
            } else {
                element.evName = [listener];
            }

            //添加自定义事件，兼容ie低版本
            if (element.addEventListener) {
                element.addEventListener(event,listener,false);
            } else {
                element.attachEvent('on'+event,listener);
            }
        },

        // 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
        removeEvent: function (element, event, listener) {

            //如果listener存在
            if (listener) {

                if (element.removeEventListener) {
                    element.removeEventListener(event,listener, false);
                } else {
                    element.detachEvent('on'+event,listener);
                }
            //listener不存在
            } else {

                if (element.evName) {
                    
                    for (var i = 0; i<element.evName.length; i++) {
                        removeEvent(element, event, element.evName[i]);
                    }
                }
            }
        },
        delegate: function(element, tagName, eventName, listener) {
            
            this.addEvent(element, eventName, function(ev){
                var ev = ev || event;
                var target = ev.target || ev.srcElement;
                if (target && target.nodeName.toLowerCase() === tagName) {
                    listener.call(target, ev);
                }
            });
        },

        // 为了便于查找绑定过的事件，增加了一级命名空间
        event: {
            listeners: [],
            addEvent: function(element, type, listener) {
                type = type.replace(/^on/i, '').toLowerCase();

                var lis = this.listeners;

                var realListener = function (e) {
                    if (typeof listener === 'function') {
                        listener.call(element, e);
                    }
                };

                if (element.addEventListener) {
                    element.addEventListener(type, realListener, false);
                }
                else if (element.attachEvent) {
                    element.attachEvent('on' + type, realListener);
                }

                lis[lis.length] = [element, type, listener, realListener];

                return element;
            },

            removeEvent: function(element, type, listener) {
                type = type.replace(/^on/i, '').toLowerCase();

                var lis = this.listeners;
                var len = lis.length;

                while (len--) {
                    var item = lis[len];
                    var isRemoveAll = !listener;

                    // listener存在时，移除element的所有以listener监听的type类型事件
                    // listener不存在时，移除element的所有type类型事件
                    if (item[1] === type
                        && item[0] === element
                        && (isRemoveAll || item[2] === listener)) {
                        var realListener = item[3];

                        if (element.removeEventListener) {
                            element.removeEventListener(type, realListener, false);
                        }
                        else if (element.detachEvent) {
                            element.detachEvent('on' + type, realListener);
                        }

                        lis.splice(len, 1);
                    }
                }
                return element;
            },

            delegate: function(element, tag, eventName, listener) {

                // this.event.addEvent(element, eventName, function(ev) {
                //     var event = ev || window.event;
                //     var target = event.target || event.srcElement;

                //     if (target && target.tagName === tag.toUpperCase()) {
                        // listener.call(target, event);
                //     }
                // });
                
            }
        }
    }

});