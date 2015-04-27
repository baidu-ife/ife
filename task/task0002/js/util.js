/**
 * @file util 工具函数模块
 * @author ZhangPing(2542229389@qq.com)
 */

(function (window, undefined) {

    var class2type = {};
    var toString = class2type.toString;

    'Boolean Number String Function Array Date RegExp Object Error'.replace(/\w+/g, function (name) {
        class2type['[object ' + name + ']'] = name.toLowerCase();
    });

    // 类型判断函数
    function type(obj) {
        if (obj == null) {
            return obj + '';
        }

        // 有的对象本身是Object但是typeof会返回function，所以function也不可靠
        if (typeof obj === 'object' || typeof obj === 'function') {
            return class2type[toString.call(obj)] || 'object';
        }

        return typeof obj;
    }

    // 克隆一个对象，并返回
    function clone(obj, deep) {

        // 值类型不用复制，DOM对象不能复制，window对象复制会造成报错。
        if (!obj || typeof obj !== 'object' || obj.nodeType || obj === window) {
            return obj;
        }

        var ret;
        // 数组返回一个新数组

        if (type(obj) === 'array') {

            ret = [];
            for (var i = 0; i < obj.length; i++) {
                ret.push(deep ? clone(obj[i]) : obj[i]);
            }
            return ret;
        }

        // 对象返回一个新对象

        ret = {};

        for (var x in obj) {
            if (obj.hasOwnProperty(x)) {
                ret[x] = clone(deep ? clone(obj[x]) : obj[x]);
            }
        }

        return ret;
    }

    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    //  去除字符串两边的空白字符
    function trim(str) {
        return str == null ? '' : (str + '').replace(rtrim, '');
    }

    // 对象遍历函数
    function each(obj, callback) {
        var value;
        var i;
        if (type(obj) === 'array') {
            i = 0;
            for (var length = obj.length; i < length; i++) {
                value = callback.call(obj[i], i, obj[i]);
                if (value === false) {
                    break;
                }
            }
        }
        else {
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    value = callback.call(obj[i], i, obj[i]);
                    if (value === false) {
                        break;
                    }
                }
            }
        }
        return obj;
    }

    // 合并多个对象到第一个对象
    function extend(target, args) {
        target = target || {};

        var i = 1;

        // 只传进来target时候直接返回target
        if (arguments.length === i) {
            return target;
        }

        for (; i < arguments.length; i++) {
            args = arguments[i];
            if (args != null) {
                for (var name in args) {
                    if (args.hasOwnProperty(name) && args[name] !== undefined) {
                        target[name] = args[name];
                    }
                }
            }
        }

        return target;
    }

    // 判断节点是不是包含关系
    var contains;

    var docElem = document.documentElement;

    if (docElem.contains || docElem.compareDocumentPosition) {
        contains = function (a, b) {
            var adown = a.nodeType === 9 ? a.documentElement : a;
            var bup = b && b.parentNode;
            if (a === bup) {
                return true;
            }
            if (adown.contains) {
                return !!(bup && bup.nodeType === 1 && adown.contains(bup));
            }
            return !!(bup && bup.nodeType === 1
                && a.compareDocumentPosition
                && a.compareDocumentPosition(bup) & 16);
        };
    }
    else {
        contains = function (a, b) {
            if (b) {
                while ((b = b.parentNode)) {
                    if (b === a) {
                        return true;
                    }
                }
            }
            return false;
        };
    }

    window.util = window.util || {};

    // 第二部分：JavaScript数据类型及语言基础
    extend(window.util, {

        // 判断对象是不是数组
        isArray: Array.isArray || function (arr) {
            return type(arr) === 'array';
        },

        // 判断对象是不是函数
        isFunction: function (func) {
            return type(func) === 'function';
        },

        // 深拷贝一个对象
        cloneObject: function (obj) {
            return clone(obj, true);
        },

        // 数组去重（由于只存在字符串和数字，可以进行桶排序）
        uniqArray: function uniqArray(arr) {

            if (type(arr) !== 'array' || !arr.length) {
                return arr;
            }

            var hashmap = {};

            for (var i = 0, l = arr.length; i < l; i++) {
                var elem = arr[i];
                var elemType = typeof elem;

                var hashkey = elemType.charAt(0) + '_' + elem;

                if (!hashmap.hasOwnProperty(hashkey)) {
                    hashmap[hashkey] = elem;
                }
            }
        },

        // 去除字符串两边的空白字符
        trim: trim,

        // 数组遍历方法
        each: function (arr, fn) {
            return type(arr) === 'array' ? each(arr, fn) : arr;
        },

        // 判断是否为邮箱地址
        isEmail: function (str) {
            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
            return reg.test(str);

        },

        // 判断是否为手机号
        isMobilePhone: function (phone) {
            var reg = /^1[3458][0-9]\d{8}$/;
            return reg.test(phone);
        }
    });

    // 第三部分：DOM
    extend(window.util, (function () {

        var rclass = /[\t\r\n\f]/g;

        var rnotwhite = /\S+/g;

        // 添加样式
        function addClass(elem, classname) {

            var classes = classname && classname.match(rnotwhite);

            if (classes) {

                // replace防止elem的className是多个并且有换行之类的，两边加空为了方便删除不会留下两个空格。
                var cur = elem
                    && elem.nodeType === 1
                    && (elem.className ? (' ' + elem.className + ' ').replace(rclass, ' ') : ' ');

                if (cur) {

                    // 防止增加的classname为多个出现重复的。
                    for (var i = 0, l = classes.length; i < l; i++) {
                        var clazz = classes[i];
                        if (cur.indexOf(' ' + clazz + ' ') < 0) {
                            cur += clazz + ' ';
                        }
                    }

                    // 如果相同则不进行改变，以减少页面重绘
                    var finalValue = trim(cur);
                    if (elem.className !== finalValue) {
                        elem.className = finalValue;
                    }
                }
            }
        }

        // 删除样式
        function removeClass(elem, classname) {

            var classes = classname && classname.match(rnotwhite);

            if (classes) {

                // replace防止elem的className是多个并且有换行之类的，两边加空为了方便删除不会留下两个空格。
                var cur = elem
                    && elem.nodeType === 1
                    && (elem.className ? (' ' + elem.className + ' ').replace(rclass, ' ') : ' ');

                if (cur) {

                    // 防止删除的classname为多个出现重复的。
                    for (var i = 0, l = classes.length; i < l; i++) {
                        var clazz = classes[i];
                        if (cur.indexOf(' ' + clazz + ' ') >= 0) {
                            cur = cur.replace(' ' + clazz + ' ', ' ');
                        }
                    }

                    // 如果没有传classname 则删除该元素全部样式。
                    var finalValue = classname ? trim(cur) : '';
                    if (elem.className !== finalValue) {
                        elem.className = finalValue;
                    }
                }
            }
        }

        var rwindow = /^\[object (?:Window|DOMWindow|global)\]$/;

        // 判断一个对象是不是window对象
        function isWindow(obj) {
            if (!obj) {
                return false;
            }
            // 标准浏览器及IE9，IE10等使用 正则检测
            if (rwindow.test(toString.call(obj))) {
                return true;
            }
            // 利用IE678 window == document为true,document == window竟然为false的神奇特性
            return obj == obj.document && obj.document != obj;
        }

        function getWindow(elem) {
            if (isWindow(elem)) {
                return elem;
            }
            return elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : undefined;
        }

        // 获取元素的offset
        function offset(elem) {

            var box = {top: 0, left: 0};

            var doc = elem && elem.ownerDocument;
            if (!doc) {
                return box;
            }
            var docElem = doc.documentElement;

            if (!contains(docElem, elem)) {
                return box;
            }

            if (typeof elem.getBoundingClientRect !== 'undefined') {
                box = elem.getBoundingClientRect();
            }

            var win = getWindow(doc);

            return {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            };
        }

        return {

            addClass: addClass,

            removeClass: removeClass,

            // 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
            isSiblingNode: function isSiblingNode(element, siblingNode) {
                // 用父元素判断要快的多
                return element.parentNode && element.parentNode === siblingNode.parentNode;
            },

            // 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
            getPosition: offset

        };

    })());

    // 第三部分：实现一个mini-$
    window.util.compile = (function () {

        var identifier = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+';

        var whitespace = '[\\x20\\t\\r\\n\\f]';

        var runescape = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig');

        // CSS解码替换函数
        var funescape = function (_, escaped, escapedWhitespace) {
            var high = '0x' + escaped - 0x10000;

            // NaN表示不转义
            if (isNaN(high) || escapedWhitespace) {
                return escaped;
            }

            if (high < 0) {
                return String.fromCharCode(high + 0x10000);
            }

            return String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
        };


        // 解码CSS属性转义字符
        function unescape(str) {
            return str.replace(runescape, funescape);
        }

        // 用于匹配子代选择器
        var rcombinators = new RegExp('^(' + whitespace + ')' + whitespace + '*');

        // 用于去除选择器的空格k
        var rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g');

        // 基本选择器
        var expr = {

            // ID选择器
            'ID': new RegExp('^#(' + identifier + ')'),

            // 类选择器
            'CLASS': new RegExp('^\\.(' + identifier + ')'),

            // 标签选择器
            'TAG': new RegExp('^(' + identifier + '|[*])'),

            // 属性选择器
            'ATTR': new RegExp('^\\['
                // 匹配属性名
                + whitespace + '*(' + identifier + ')(?:'
                // 匹配属性符号
                + whitespace + '*([*^$|!~]?=)'
                // 匹配属性值
                + whitespace + '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)\"|(' + identifier + '))|)'
                // 吸收多余的空白
                + whitespace + '*\\]')
        };

        // 对选择器进行词法分析
        function tokenize(selector) {

            var tokens = [];
            var matched;
            var match;

            while (selector) {

                // 匹配关系选择器
                if ((match = rcombinators.exec(selector))) {
                    matched = match.shift();
                    tokens.push({
                        matched: matched,
                        type: match[0].replace(rtrim, ' ')
                    });
                    selector = selector.slice(matched.length);
                }

                // 处理基本选择器
                for (var type in expr) {

                    if (expr.hasOwnProperty(type) && (match = expr[type].exec(selector))) {

                        matched = match.shift();

                        if (type === 'ATTR') {
                            match[0] = unescape(match[0]);
                            match[2] = unescape(match[2] || match[3] || match[4] || '');
                            match = match.slice(0, 3);
                        }

                        tokens.push({
                            matched: matched,
                            value: match,
                            type: type
                        });

                        selector = selector.slice(matched.length);
                    }
                }

                if (!matched) {
                    break;
                }
            }

            if (selector) {
                throw new Error(selector + '解析失败');
            }

            return  tokens;
        }

        // 获取元素属性
        function attr(elem, name) {
            // TODO 这个地方的兼容性不知道要怎么处理，暂且认为只支持data-attribute
            return elem.getAttribute(name);
        }

        // 用于生成过滤器的函数
        var filter = {

            // 属性选择器
            'ATTR': function (name, operator, check) {

                if (operator === '~=') {
                    var rcontains = new RegExp(whitespace + check + whitespace);
                }

                return function (elem) {

                    var result = attr(elem, name);

                    if (result == null) {
                        return operator === '!=';
                    }

                    if (!operator) {
                        return true;
                    }

                    result += '';

                    switch (operator) {
                        case  '=':
                            return result === check;
                        case '!=':
                            return result !== check;
                        case '^=':
                            return check && result.indexOf(check) === 0;
                        case '*=':
                            return check && result.indexOf(check) > -1;
                        case '$=':
                            return check && result.slice(-check.length) === check;
                        case '~=':
                            return rcontains.test(' ' + result + ' ');
                        case '|=':
                            return result === check || result.slice(0, check.length + 1) === check + '-';
                        default :
                            return false;

                    }

                };
            },

            // 类选择器
            'CLASS': function (className) {

                var pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)');

                return  function (elem) {
                    return pattern.test(typeof elem.className === 'string' && elem.className || '');
                };
            },

            // ID选择器（只兼容了IE8+）
            'ID': function (id) {

                var attrId = unescape(id);

                return function (elem) {
                    return elem.getAttribute('id') === attrId;
                };
            },

            /**
             * 标签选择器
             *
             * @param {string} nodeNameSelector 要过滤的标签名
             * @return {Function} 过滤函数
             */
            'TAG': function (nodeNameSelector) {

                var nodeName = unescape(nodeNameSelector).toLowerCase();

                return nodeNameSelector === '*' ? function () {
                    return true;
                } : function (elem) {
                    return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                };
            }
        };

        // 关系选择器匹配方法
        function addCombinator(matcher) {
            return function (elem, context) {

                while ((elem = elem.parentNode)) {
                    if (matcher(elem, context)) {
                        return true;
                    }
                }
            };
        }

        // 将当前一个匹配数组打包成一个匹配函数
        function elementMatcher(matchers) {

            if (matchers.length > 1) {

                return function (elem, context) {
                    var i = matchers.length;
                    while (i--) {
                        if (!matchers[i](elem, context)) {
                            return false;
                        }
                    }
                    return true;
                };
            }

            return matchers[0];
        }

        // 使用一组token生成一个匹配函数
        function tokenMatcher(tokens) {

            var matchers = [addCombinator(null)];

            for (var i = 0, len = tokens.length; i < len; i++) {

                var token = tokens[i];

                if (token.type === ' ') {
                    matchers = [addCombinator(elementMatcher(matchers))];
                }
                else {
                    matchers.push(filter[tokens[i].type].apply(null, tokens[i].value));
                }
            }

            return elementMatcher(matchers);
        }

        return function (selector) {
            return tokenMatcher(tokenize(selector));
        };

    })();

    window.util.find = function (selector, context, results) {

        context = context || document;
        results = results || [];

        var seeds = context.getElementsByTagName('*');
        var matcher = window.util.compile(selector.replace(rtrim, '$1'));

        for (var j = 0, len = seeds.length; j !== len && (elem = seeds[j]) != null; j++) {
            if (elem && elem.nodeType === 1 && matcher(elem, context)) {
                results.push(elem);
            }
        }

        return results;
    };

    window.$ = function (selector) {
        var seeds = document.getElementsByTagName('*');
        var matcher = window.util.compile(selector.replace(rtrim, '$1'));

        for (var j = 0, len = seeds.length; j !== len && (elem = seeds[j]) != null; j++) {
            if (elem && elem.nodeType === 1 && matcher(elem, context)) {
                return elem;
            }
        }
    };

    // 第四部分：事件
    extend(window.$, (function () {

        function addEventListener(elem, type, handle) {
            if (elem.addEventListener) {
                elem.addEventListener(type, handle, false);
            }
            else {
                elem.attachEvent('on' + type, handle);
            }

            return handle;
        }

        function removeEventListener(elem, type, handle) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle, false);
            }
            else {
                var name = 'on' + type;

                // IE 6-8解绑事件需要事件存在
                if (elem[name] === undefined) {
                    elem[name] = null;
                }

                elem.detachEvent(name, handle);
            }
        }

        /**
         * 返回false
         *
         * @inner
         * @return {boolean} 返回false
         */
        function returnFalse() {
            return false;
        }

        /**
         * 返回true
         *
         * @inner
         * @return {boolean} 返回false
         */
        function returnTrue() {
            return true;
        }

        // 可读写的事件类
        function MiniEvent(src, prop) {
            if (src && src.type) {
                this.originEvent = src;
                this.type = src.type;

                // 用来修正可能因为祖先元素事件被设置成阻止默认行为状态
                if (src.defaultPrevent
                    || src.defaultPrevented === undefined
                    && src.returnValue === false) {
                    this.isDefaultPrevented = returnTrue;
                }

            }
            else {
                this.type = src;
            }

            for (var x in prop) {
                if (prop.hasOwnProperty(x)) {
                    this[x] = prop[x];
                }
            }

            this.timeStemp = src && src.timeStemp || new Date().getTime();
            this.isMiniEvent = true;

        }

        MiniEvent.prototype = {
            constructor: Event,

            /**
             * 是否已经阻止默认行为
             *
             * @public
             */
            isDefaultPrevented: returnFalse,

            /**
             * 是否已经阻止冒泡
             *
             * @public
             */
            isPropagationStopped: returnFalse,

            /**
             * 是否阻止立即执行冒泡
             *
             * @public
             */
            isImmediatePropagationStopped: returnFalse,

            /**
             * 阻止默认行为
             *
             * @public
             */
            preventDefault: function () {

                var e = this.originEvent;

                this.isDefaultPrevented = returnTrue;

                if (!e) {
                    return;
                }

                if (e.preventDefault) {
                    e.preventDefault();
                }
                else {
                    // 兼容 IE9-
                    e.returnValue = false;
                }
            },

            /**
             * 阻止冒泡行为
             *
             * @public
             */
            stopPropagation: function () {

                var e = this.originEvent;

                this.isPropagationStopped = returnTrue;

                if (!e) {
                    return;
                }

                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                else {
                    // 兼容IE9-
                    e.cancelBubble = true;
                }
            },

            /**
             * 阻止立即执行冒泡，会阻止次优先级事件的执行
             *
             * @public
             */
            stopImmediatePropagation: function () {

                var e = this.originEvent;

                this.isImmediatePropagationStopped = returnTrue;

                if (e && e.stopImmediatePropagation) {
                    e.stopImmediatePropagation();
                }

                // 降级阻止冒泡
                this.stopPropagation();
            }
        };

        /**
         * 判断键盘事件
         *
         * @inner
         * @type {RegExp}
         */
        var rkeyEvent = /^key/;

        /**
         * 判断鼠标事件
         *
         * @inner
         * @type {RegExp}
         */
        var rmouseEvent = /^(?:mouse|pointer|contextmenu)|click|wheel/i;

        /**
         * 判断触屏事件
         *
         * @inner
         * @type {RegExp}
         */
        var rtouchEvent = /^touch/;

        /**
         * 事件自带的属性
         *
         * @inner
         * @type {Array}
         */
        var props = ('altKey bubbles cancelable ctrlKey currentTarget eventPhase '
            + 'metaKey relatedTarget shiftKey target timeStamp view which').split(' ');

        /**
         * 需要修复事件的钩子
         *
         * @inner
         * @type {Object}
         */
        var fixHooks = {};

        /**
         * 键盘事件钩子
         *
         * @inner
         * @type {Object}
         */
        var keyHooks = {

            /**
             * 事件自带的属性
             *
             * @type {Array}
             */
            props: 'char charCode key keyCode'.split(' '),

            /**
             * 键盘事件的特殊处理
             * @param {MiniEvent} event 事件对象
             * @param {Event} original 原始事件对象
             * @return {*} 处理结果
             */
            filter: function (event, original) {

                // 处理事件which的值，统一which，通过which来判断按键
                if (!event.which) {
                    event.which = original.keyCode != null ? original.keyCode : original.charCode;
                }

                return event;
            }
        };

        /**
         * 鼠标事件钩子
         * @type {Object}
         */
        var mouseHooks = {

            /**
             * 事件自带的属性
             *
             * @type {Array}
             */
            props: ('button buttons clientX clientY pageX pageY fromElement offsetX offsetY '
                + 'screenX screenY toElement').split(' '),

            /**
             * 鼠标事件的特殊处理
             * @param {MiniEvent} event 事件对象
             * @param {Event} original 原始事件对象
             * @return {*} 处理结果
             */
            filter: function (event, original) {
                var button = original.button;

                // 计算丢失的pageX/Y（前提：保证clientX/Y可用）,兼容IE
                if (event.pageX == null && event.clientX != null) {
                    var ownTarget = event.target.ownerDocument || document;
                    var doc = ownTarget.documentElement;
                    var body = ownTarget.body;

                    event.pageX = original.clientX
                        + (doc && doc.scrollLeft || body && body.scrollLeft || 0)
                        - (doc && doc.clientLeft || body && body.clientLeft || 0);

                    event.pageY = original.clientY
                        + (doc && doc.scrollTop || body && body.scrollTop || 0)
                        - (doc && doc.clientTop || body && body.clientTop || 0);
                }

                // 给click事件添加which属性：1 === left(左键)  2 === middle(滚轮)  3 === right(右键)
                // button没有标准化，只是微软自己最初定义的属性，所以不能直接使用
                // 所以IE鼠标点击事件不存在e.which，但是button属性记录了鼠标按键的规则，通过button修正which
                // IE button 1 === left(左键)   4 === middle(滚轮)   2 === right(右键)
                if (!event.which && button !== undefined) {
                    switch (button) {
                        case 1:
                            event.which = 1;
                            break;
                        case 2:
                            event.which = 3;
                            break;
                        case 4:
                            event.which = 2;
                            break;
                        default:
                            event.which = 0;
                    }
                }

                // 统一鼠标滚轮事件的参数
                // IE6-11 chrome mousewheel wheelDetla 下 -120 上 120
                // firefox DOMMouseScroll detail 下3 上-3
                // firefox wheel detlaY 下3 上-3
                // IE9-11 wheel deltaY 下40 上-40
                // chrome wheel deltaY 下100 上-100
                event.wheelDelta = original.wheelDelta || ((original.deltaY || original.detail) > 0 ? -120 : 120);

                return event;
            }
        };

        /**
         * 触摸事件属性钩子
         * @type {Object}
         */
        var touchHooks = {
            props: mouseHooks.props.concat(('touches changedTouches').split(' '))
        };

        /**
         * 对event进行修正
         * @param {Event} event 事件类型
         * @return {*} 处理结果
         */
        function fix(event) {
            var type = event.type;
            var fixHook = fixHooks[type];
            var newEvent = new MiniEvent(event);

            // 处理fixHook不存在
            if (!fixHook) {
                if (rkeyEvent.test(type)) {
                    fixHook = keyHooks;
                }
                else if (rmouseEvent.test(type)) {
                    fixHook = mouseHooks;
                }
                else if (rtouchEvent.test(type)) {
                    fixHook = touchHooks;
                }
                else {
                    fixHook = {};
                }
                fixHooks[type] = fixHook;

            }

            var copy = fixHook.props ? props.concat(fixHook.props) : props;
            var i = copy.length;

            while (i--) {
                var prop = copy[i];
                newEvent[prop] = event[prop];
            }

            // 兼容：Cordova 2.5(webkit)、IE8-事件没有target
            // 所有的事件都有target，但是Cordova deviceready没有
            // IE9-使用srcElement而不是target
            if (!newEvent.target) {
                newEvent.target = event.srcElement || document;
            }

            // 兼容：Safari 6.0+ Chrome < 28
            // target 不能是文本节点
            if (newEvent.target.nodeType === 3) {
                newEvent.target = event.target.parent;
            }

            return fixHook.filter ? fixHook.filter(newEvent, event) : newEvent;
        }

        return {

            on: function (selector, event, listener) {
                var elem = $(selector);

                return addEventListener(elem, event, function (e) {
                    listener.call(elem, fix(e));
                });
            },

            un: function (selector, event, listener) {
                removeEventListener($(selector), event, listener);
            },

            delegate: function (selector, tag, event, listener) {
                var elem = $(selector);

                function handle(e) {

                    e = fix(e);

                    var target = e.target;

                    while (target !== elem) {
                        if (target.nodeName === tag.toUpperCase()) {
                            listener.call(target, e);
                        }
                        target = target.parentNode;
                    }
                }

                return addEventListener(elem, event, handle);
            }
        };

    })());

    // 第五部分：BOM
    extend(window.util, {
        isIE: function () {
            var str = navigator.userAgent;
            if (/MSIE (\d)\.0/.test(str)) {
                return +RegExp.$1;
            }
            return -1;
        },
        // 设置cookie
        setCookie: function (name, value, expire) {
            document.cookie += name + "=" + value + ";expires=" + expire;
        },

        // 获取cookie值
        getCookie: function (name) {
            var cookie = document.cookie.split(";");
            var value = null;
            each(cookie, function (item) {
                if (trim(item.split("=")[0]) == name) {
                    value = item.split("=")[1];
                }
            });
            return value;
        }
    });


    // 第六部分：AJAX
    window.util.ajax = (function () {

        /**
         * 用于判断请求是不是应当有内容
         *
         * @inner
         * @type {RegExp}
         */
        var rnoContent = /^(?:GET|HEAD)$/;

        /**
         * 用于匹配解析响应头
         *
         * @inner
         * @type {RegExp}
         */
        var rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg;

        /**
         * 用于判断URL中是不是有锚点
         *
         * @inner
         * @type {RegExp}
         */
        var rhash = /#.*$/;

        /**
         * 用于检测URL中是不是防缓存参数_
         *
         * @inner
         * @type {RegExp}
         */
        var rts = /([?&])_=[^&]*/;

        /**
         * 用于检测URL中是不是有querystring
         *
         * @inner
         * @type {RegExp}
         */
        var rquery = /\?/;

        /**
         * 修复请求URL的问题
         *
         * @param {string} url 原请求的url
         * @param {string|null} query 要追加的query
         * @return {string} 返回处理好的字符串
         */
        function fixUrl(url, query) {

            // 去掉HASH防止浏览器问题
            url = url.replace(rhash, '');

            // 追加GET的参数
            if (query) {
                url += (rquery.test(url) ? '&' : '?') + query;
            }

            // 追加防缓存设置
            url = rts.test(url)
                ? url.replace(rts, '$1_=' + url++)
                : url + (rquery.test(url) ? '&' : '?') + '_=' + guid();

            return url;
        }

        /**
         * 查找header定义的字段
         * 忽略大小写（RFC2616 #3.10）
         *
         * @inner
         * @param {Object} headers 头信息对象
         * @param {string} tag 要查找的键名
         * @return {string} 返回找到的名字
         */
        function findHeader(headers, tag) {

            for (var x in headers) {
                if (headers.hasOwnProperty(x) && x.toLowerCase() === tag.toLowerCase()) {
                    return x;
                }
            }

            return null;
        }

        /**
         * 标示浏览器是不是支持ActiveX
         *
         * @inner
         * @type {boolean}
         */
        var supportActivex = window.ActiveXObject !== undefined;

        /**
         * 创建XMLHttpRequest
         *
         * @note IE7+和W3C支持此方法
         * @inner
         * @return {XMLHttpRequest} XMLHttpRequest对象
         */
        function createStandardXHR() {
            try {
                return new window.XMLHttpRequest();
            }
            catch (e) {
            }
        }

        /**
         * 创建ActiveX的HttpRequest
         *
         * @note IE6使用ActiveX版本，IE6-9不支持trace和connect方法，只能用ActiveX版本
         * @inner
         * @return {ActiveXObject} XMLHttpRequest对象
         */
        function createActiveXHR() {
            try {
                return new window.ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (e) {
            }
        }

        /**
         * 根据浏览器创建XMLHttpRequest对象
         *
         * @inner
         * @param {string} type 请求的类型
         * @return {ActiveXObject|XMLHttpRequest} XMLHttpRequest对象
         */
        var xhrCreator = supportActivex ? function (type) {

            return /^(get|post|head|put|delete|options)$/i.test(type)
                && createStandardXHR()
                || createActiveXHR();

        } : createStandardXHR;

        /**
         * 进行一次ajax请求
         *
         * @param {string} url 请求的URL
         * @param {Object} options 请求的配置参数
         * @param {boolean} [options.async] 是否异步请求，默认为true
         * @param {string|Object|null} [options.data] 请求参数（由于兼容IE，只支持字符串）
         * @param {Object} [options.headers] 需要额外设置的请求头
         * @param {string} [options.method] 请求方式，默认为GET
         * @param {string} [options.mimeType] 用于重写的mime-type
         * @param {string} [options.password] 密码
         * @param {string} [options.username] 用户名
         * @param {number} [options.timeout] 请求超时时间，单位ms，只有异步请求才有效
         * @param {Function} complete 请求结束回调
         * @return {Function} 返回abort函数
         */
        function request(url, options, complete) {

            options = options || {};

            // 处理url
            var data = typeof options.data === 'object'
                ? param(options.data)
                : options.data || null;

            var method = (options.method || 'GET').toUpperCase();
            if (rnoContent.test(method)) {
                url = fixUrl(url, data);
                data = null;
            }
            else {
                url = fixUrl(url, null);
            }

            var async = options.async != null ? options.async : true;

            // 创建一个XMLHttpRequest对象
            var xhr = xhrCreator();

            // 打开XHR
            xhr.open(method, url, async, options.username, options.password);

            // 处理重写响应头的问题
            if (options.mimeType && xhr.overrideMimeType) {
                xhr.overrideMimeType(options.mimeType);
            }

            // 处理请求头和GET参数
            var headers = options.headers || {};
            if (findHeader(headers, 'X-Requested-With')) {
                headers['X-Requested-With'] = 'XMLHttpRequest';
            }

            if (!rnoContent.test(method) && !findHeader(headers, 'Content-Type')) {
                headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            }

            each(headers, function (key, value) {
                value != null && xhr.setRequestHeader(key, value + '');
            });

            // 设置超时
            if (options.async !== false && options.timeout && 'timeout' in xhr) {
                xhr.timeout = options.timeout;
            }

            // 发送请求数据
            var callback;
            try {
                xhr.send(data || null);

                // 回调函数
                callback = function (_, isAbort) {

                    if (callback && (isAbort || xhr.readyState === 4)) {
                        // 清除缓存，避免此函数继续执行
                        callback = null;
                        xhr.onreadystatechange = null;

                        if (isAbort) {
                            if (xhr.readyState !== 4) {
                                xhr.abort();
                            }
                            complete(0, '');
                        }
                        else {

                            // 获取响应状态
                            var status = xhr.status === 1223 ? 204 : xhr.status;
                            var statusText = xhr.statusText;

                            // 获取响应结果，由于IE10-只支持字符串返回，不获取其它方式的返回值
                            var response = typeof xhr.responseText === 'string' && xhr.responseText || null;


                            // 处理返回的响应头
                            var responseHeadersString = xhr.getAllResponseHeaders();
                            var responseHeaders = {};
                            var match;
                            while ((match = rheaders.exec(responseHeadersString))) {
                                responseHeaders[match[1]] = match[2];
                            }

                            complete(status, statusText, response, responseHeaders);
                        }
                    }
                };

                if (!async) {
                    callback();
                }
                else if (xhr.readyState === 4) {
                    // 处理IE67的304的BUG
                    setTimeout(callback, 0);
                }
                else {
                    xhr.onreadystatechange = callback;
                    // 解决IE678的xhr不支持timeout属性的问题
                    options.timeout && !xhr.timeout && setTimeout(function () {
                        callback(null, true);
                    }, options.timeout);
                }
            }
            catch (e) {
                complete(400, 'bad request');
            }

            // 返回终止函数（调用callback以保证complete函数只会被调用一次）
            return function () {
                callback && callback(null, true);
            };
        }

        return function (url, options) {
            request(url, {
                data: options.data,
                method: options.type
            }, function (status, statusText, response, responseHeaders, xhr) {
                if (status > 200 && status < 300 || status === 304) {
                    options.onsuccess && options.onsuccess(response, xhr);
                }
                else {
                    options.onfail && options.onfail(status, statusText);
                }
            });
        }

    })();

})(window);


