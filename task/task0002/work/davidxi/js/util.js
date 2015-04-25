var _ = _ || {};

(function(root, _) {

// --------------------------------------
//  2. JavaScript数据类型及语言基础
// --------------------------------------

    var protoObj = Object.prototype;
    var protoArray = Array.prototype;

    var toString = protoObj.toString;
    var has = protoObj.hasOwnProperty;

    var slice = protoArray.slice;

    Object.assign = Object.assign || function(a, b) {
        var c = Object(a);
        for (var e = 1; e < arguments.length; e++) {
            var f = arguments[e];
            if (f == null) continue;
            var g = Object(f);
            for (var h in g) {
                if (has.call(g, h)) {
                    c[h] = g[h];
                }
            }
        }
        return c;
    };

    // 判断arr是否为一个数组，返回一个bool值
    _.isArray = Array.isArray || function(arr) {
        // your implement
        return toString.call(arr) === '[object Array]';
    };

    // 判断fn是否为一个函数，返回一个bool值
    _.isFunction = function(fn) {
        // your implement
        return toString.call(fn) === '[object Function]';
    };

    _.isRegExp = function(re) {
        return toString.call(re) === '[object RegExp]';
    }

    // 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
    // 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
    _.cloneObject = function(src) {
        // your implement
        var ret;
        if (_.isArray(src)) {
            var len = src.length;
            ret = new Array(len);
            for (var i = 0; i < len; i++) {
                ret[i] = _.cloneObject(src[i]);
            }
        } else if (_.isFunction(src) || _.isRegExp(src)) {
            /* no-op */
        } else if (typeof src === 'object') {
            ret = {};
            for (var k in src) {
                if (!has.call(src, k)) continue;
                ret[k] = _.cloneObject(src[k]);
            }
        } else {
            ret = src;
        }
        return ret;
    }

    _.toArray = function(arr) {
        // to be safe, do not use Array.slice()
        var len = arr.length;
        var ret = new Array(len);
        for (var i = 0; i < len; i++) {
            ret[i] = arr[i];
        }
        return ret;
    };

    _.indexOf = function(arr, item) {
        if (arr.indexOf) {
            return arr.indexOf(item);
        }
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
              return i;
            }
        }
        return -1;
    };

    // 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
    _.uniqArray = function(arr, reduced) {
        // your implement
        var ret = reduced || [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i]
            if (_.indexOf(ret, item) === -1) {
                ret.push(item)
            }
        }
        return ret;
    };

    _.unique = function(arr) {
        var ret = [undefined, null, ''];
        var len = ret.length;
        ret = _.uniqArray(arr, ret);
        for (var i = 0; i < len; i++) {
            ret.shift();
        }
        return ret;
    };

    // 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
    // 先暂时不要简单的用一句正则表达式来实现
    _.trim = function(str) {
        return str.replace(/^\s*|\s*$/g, '');
    };

    // 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
    _.each = function(arr, fn) {
        // your implement
        if (!fn) return;
        for (var i = 0, len = arr.length; i < len; i++) {
            fn(arr[i], i);
        }
    };

    // 获取一个对象里面第一层元素的数量，返回一个整数
    _.getObjectLength = function(obj) {
        var count = 0;
        for (var k in obj) {
            if (!has.call(obj, k)) continue;
            count++;
        }
        return count;
    };

    _.bind = function(func, context) {
        var _args = slice.call(arguments, 2);
        var bound = function() {
            var args = slice.call(arguments, 0);
            return func.apply(context, _args.concat(args));
        };
        bound.$fn = func;
        return bound
    };

    _.bindAll = function(obj, context) {
        context = context || obj;
        for (var k in obj) {
            if (!_.isFunction(obj[k])) continue;
            obj[k] = _.bind(obj[k], context);
        }
        return obj;
    };

    /**
     * http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
     */
    _.escapeRegExp = function(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };

    _.validator = _.validator || {};

    _.validator.isEmail = function(emailStr) {
        // your implement
        var re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        return re.test(emailStr);
    };

    _.validator.isMobilePhone = function(numberStr) {
        // your implement
        var re = /^0?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        return re.test(numberStr);
    };

// --------------------------------------
//  3. DOM
// --------------------------------------
    _.dom = _.dom || {};

    _.dom.hasClass = function(element, className) {
        if (element.classList) {
            return !!className && element.classList.contains(className);
        }
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    };

    // 为dom增加一个样式名为newClassName的新样式
    _.dom.addClass = function(element, newClassName) {
        // your implement
        if (/\s/.test(newClassName)) {
            throw new TypeError('only accept a single class name');
        }
        if (newClassName) {
            if (element.classList) {
                element.classList.add(newClassName);
            } else if (!_.dom.hasClass(element, newClassName)) {
                element.className = element.className + ' ' + newClassName;
            }
        }
        return element;
    };

    // 移除dom中的样式oldClassName
    _.dom.removeClass = function(element, oldClassName) {
        // your implement
        if (/\s/.test(oldClassName)) {
            throw new TypeError('only accept a single class name');
        }
        if (oldClassName) {
            if (element.classList) {
                element.classList.remove(oldClassName);
            } else if (_.dom.hasClass(element, oldClassName)) {
                var className = element.className;
                var re = new RegExp('(^|\\s)' + oldClassName + '(?:\\s|$)', 'g');
                className = className.replace(re, '$1');
                className = _.trim(className);
                element.className = className;
            }
        }
        return element;
    }

    // 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
    _.dom.isSiblingNode = function(element, siblingNode) {
        // your implement
        if (!element || !siblingNode) return false;
        if (element === siblingNode) return true;

        // Node.previousSibling
        var _element = element;
        while (element = element.previousSibling) {
            if (element.nodeType !== Node.ELEMENT_NODE) continue;
            if (element === siblingNode) return true;
        }
        // Node.nextSibling
        element = _element;
        while (element = element.nextSibling) {
            if (element.nodeType !== Node.ELEMENT_NODE) continue;
            if (element === siblingNode) return true;
        }
        return false;
    }

    // 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
    _.dom.getPosition = function(element) {
        // your implement
        var x = 0, y = 0;
        var _element = element;

        //   https://github.com/sstephenson/prototype/blob/d9411e5/src/prototype/dom/layout.js#L1151
        do {
            y += element.offsetTop  || 0;
            x += element.offsetLeft || 0;
        } while (element = element.offsetParent);

        element = _element;
        do {
            if (element != document.body) {
                y -= element.scrollTop  || 0;
                x -= element.scrollLeft || 0;
            }
        } while (element = element.parentNode);

        return {x: x, y: y};
    };

    _.dom.isParentNode = function(childNode, parentNode) {
        if (!childNode || !parentNode) return false;
        do {
            if (childNode === parentNode) return true;
        } while (childNode = childNode.parentNode);
        return false;
    };

    _.dom.insertBefore = function(elemToInsert, elemToReference) {
        var elemParent = elemToReference.parentNode;
        if (elemParent) {
            elemParent.insertBefore(elemToInsert, elemToReference);
        }
    };
    _.dom.append = function(elemToInsert, elemParent) {
        elemParent.appendChild(elemToInsert);
    }

    _.dom.query = function(selector, elemScope, iterator) {
        elemScope = elemScope || document;

        var selectorLevels = selector.split(' ');
        var candidateElements = [elemScope];
        for (var level = 0; level < selectorLevels.length; level++) {
            if (candidateElements.length === 0) break;
            if (selectorLevels[level] === '') continue;

            var selectorCurrentLevel = selectorLevels[level],
                selectorCurrentLevel_ = selectorLevels[level],
                matchedElements = [];

            selectorCurrentLevel = selectorCurrentLevel.replace(/\[(?:[^=\]]*=(?:"[^"]*"|'[^']*'))?|[.#]/g, ' $&');
            var currentSelectorKeyValues = selectorCurrentLevel.split(' ');

            var tagName = currentSelectorKeyValues[0] || '*';
            var isMatchAllTag = tagName == '*';

            var isById = currentSelectorKeyValues[1] &&
                currentSelectorKeyValues[1].charAt(0) == '#';

            if (isById) {
                /**
                 * find by Id
                 */
                var idToMatch = currentSelectorKeyValues[1].slice(1);
                var matched = document.getElementById(idToMatch);
                if (elemScope && elemScope !== document) {
                    if (!_.dom.isParentNode(matched, elemScope)) {
                        matched = undefined;
                    }
                }
                if (matched && (isMatchAllTag || matched.tagName.toLowerCase() == tagName)) {

                    for (var i = 0; i < candidateElements.length; i++) {
                        if (document == candidateElements[i] ||
                            _.dom.isParentNode(candidateElements[i], matched)) {

                            matchedElements = [matched];
                            break;
                        }
                    }
                }

                iterator && iterator(matched);
            } else {
                /**
                 * find by className attributes
                 */
                var tempCandidates = [];
                var notByAttr = selectorCurrentLevel_.indexOf('[') < 0;

                for (var i = 0, i0 = candidateElements.length; i < i0; i++) {

                    var tempMatched;
                    if (notByAttr) {
                        tempMatched = candidateElements[i].querySelectorAll(selectorCurrentLevel_);
                    } else {
                        tempMatched = candidateElements[i].getElementsByTagName(tagName);
                    }
                    for (var j = 0, j0 = tempMatched.length; j < j0; j++) {
                        tempCandidates.push(tempMatched[j]);
                    }
                }
                if (!notByAttr) {

                    for (var i = 1; i < currentSelectorKeyValues.length; i++) {

                        var attrKeyValues = currentSelectorKeyValues[i];
                        var isClassNameMatch = attrKeyValues.charAt(0) == '.';

                        for (j = 0; j < tempCandidates.length; j++) {
                            var candidateElem = tempCandidates[j];

                            if (!candidateElem || candidateElem.nodeType !== 1) continue;

                            if (isClassNameMatch) {
                                var classNameToMatch = attrKeyValues.substring(1);
                                if (!_.dom.hasClass(candidateElem, classNameToMatch)) {
                                    delete tempCandidates[j];
                                }
                                continue;
                            } else {
                                // slice '[' and ']'
                                var attr = attrKeyValues.slice(1, attrKeyValues.length - 1);

                                if (attr.indexOf('=') == -1) {
                                    // [attr]
                                    if (!candidateElem.hasAttribute(attr)) {
                                        delete tempCandidates[j];
                                        continue;
                                    }
                                } else {
                                    // [attr=value]
                                    var kv = attr.split('='),
                                        attrName = kv[0],
                                        attrValue = kv[1];
                                    // slice quote character around value string
                                    attrValue = attrValue.slice(1, attrValue.length - 1);
                                    if (candidateElem.getAttribute(attrName) != attrValue) {
                                        delete tempCandidates[j];
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                }
                for (var i = 0; i < tempCandidates.length; i++) {
                    if (tempCandidates[i]) {
                        iterator && iterator(tempCandidates[i]);
                        matchedElements.push(tempCandidates[i]);
                    }
                }
            }
            candidateElements = matchedElements;
        }
        return candidateElements;
    };

    var $break = {};

    var $ = function(selector) {
        var result;
        try {
            _.dom.query(selector, null/* scope */, function iterator(matched) {
                result = matched;
                throw $break;
            });
        } catch (e) {
            if (e !== $break) {
                throw e;
            }
        };
        return result;
    };

// --------------------------------------
//  4. 事件
// --------------------------------------

    _.event = _.event || {};
    // 给一个dom绑定一个针对event事件的响应，响应函数为listener
    var handlers = _.event._handlers = {};
    var nativeHandlers = _.event._nativeHandlers = {};
    _.event.$$guid = 1;
    _.event.addEvent = function(element, event, listener) {
        // your implement
        if (!element || !event || !listener) return;
        if (!element.$$guid) {
            element.$$guid = _.event.$$guid++;
        }
        if (!handlers[element.$$guid]) {
            handlers[element.$$guid] = {};
        }
        if (!listener.$$guid) {
            listener.$$guid = _.event.$$guid++;
        }
        setupNativeHandler(element, event);
        if (!handlers[element.$$guid][event]) {
            handlers[element.$$guid][event] = {};
        }
        handlers[element.$$guid][event][listener.$$guid] = listener;
    };

    function dispatchEvent(element, nativeEvent) {
        var returnValue = true;
        var event = nativeEvent || fixEvent(window.event);
        event.target = event.target || event.srcElement;

        var handlersOnEvt = handlers[element.$$guid][event.type];
        if (!handlersOnEvt) return;
        for (var k in handlersOnEvt) {
            if (!has.call(handlersOnEvt, k)) continue;
            if (handlersOnEvt[k].call(element, event) === false) {
                returnValue = false;
            }
        }
        return returnValue;
    }

    function fixEvent(eventObj) {
        eventObj.preventDefault = function() { this.returnValue = false; };
        eventObj.stopPropagation = function() { this.cancelBubble = true; };
    }

    function setupNativeHandler(element, event) {
        if (nativeHandlers[element.$$guid] &&
            nativeHandlers[element.$$guid][event]) {
            return;
        }
        var subscription = function(nativeEvent) {
            return dispatchEvent(element, nativeEvent);
        };
        if (element.addEventListener) {
            element.addEventListener(event, subscription, false);
        } else {
            element.attach('on' + event, subscription);
        }
        if (!nativeHandlers[element.$$guid]) {
            nativeHandlers[element.$$guid] = {};
        }
        nativeHandlers[element.$$guid][event] = subscription;
    }

    function teardownNativeHandler(element, event) {
        if (!nativeHandlers[element.$$guid] ||
            !nativeHandlers[element.$$guid][event]) return;
        var subscription = nativeHandlers[element.$$guid][event];
        if (element.removeEventListener) {
            element.removeEventListener(event, subscription);
        } else {
            element.detachEvent(event, subscription);
        }
        delete nativeHandlers[element.$$guid][event];
    }

    // 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
    _.event.removeEvent = function(element, event, listener) {
        // your implement
        if (!handlers[element.$$guid] || !handlers[element.$$guid][event]) return false;
        var isLastHandlerRemoved = true;
        if (!listener) {
            delete handlers[element.$$guid][event];
        } else {
            if (!listener.$$guid) return; // this listener was not registered yet
            delete handlers[element.$$guid][event][listener.$$guid];
            for (var k in handlers[element.$$guid][event]) {
                if (!has.call(handlers[element.$$guid][event], k)) continue;
                isLastHandlerRemoved = isLastHandlerRemoved && false;
                break;
            }
        }
        if (isLastHandlerRemoved) {
            teardownNativeHandler(element, event);
        }
    };

    _.event.one = function(element, event, listener) {
        var subscription = _.event.addEvent(element, event, function(event, arg1, arg2, arg3) {
            // I don't want use listener.apply(),
            // so, just fill in (possible) args one by one
            listener(event, arg1, arg2, arg3);
            _.event.removeEvent(element, event, listener);
        });
        return subscription;
    }

    // 实现对click事件的绑定
    $.addClickEvent = function(element, listener) {
        // your implement
        return _.event.addEvent(element, 'click', listener);
    }

    // 实现对于按Enter键时的事件绑定
    $.addEnterEvent = function(element, listener) {
        // your implement
        return _.event.addEnterEvent(element, 'mouseenter', listener);
    }

    // 先简单一些
    _.event.delegateEvent = function(element, selector, eventName, listener) {
        // your implement
        _.event.addEvent(element, eventName, function(event) {
            var matched = _.dom.query(selector, element);
            var target = event.target;
            event.currentTarget = element;
            event.target = target;
            if (_.indexOf(matched, target) < 0) return;
            return listener.call(element, event);
        });
    };

    $.delegate = _.event.delegateEvent;

    $.on = function(elem, selector, type, listener) {
        var argsLen = arguments.length;
        if (argsLen == 4) {
            return _.event.delegateEvent(elem, selector, type, listener);
        } else {
            listener = type;
            type = selector;
            return _.event.addEvent(elem, type, listener);
        }
    }
    $.un = _.event.removeEvent;

// --------------------------------------
//  5. BOM
// --------------------------------------

// 判断是否为IE浏览器，返回-1或者版本号
_.isIE = function() {
    // your implement
    /**
     * https://github.com/RubyLouvre/mass-Framework/blob/master/more/brower.js
     */
    var ver = window.opera ? (opera.version().replace(/\d$/, "") - 0)
    : parseFloat((/(?:IE |fox\/|ome\/|ion\/)(\d+\.\d)/.
        exec(navigator.userAgent) || [,0])[1]);
    return !!window.VBArray && Math.max(document.documentMode||0, ver);
}

// 设置cookie
_.setCookie = function(cookieName, cookieValue, expiredays) {
    // your implement
    var expireMs = !expiredays ? undefined : (expiredays * 24 * 60 * 60 * 1000);
    document.cookie =
        cookieName + "=" +
        encodeURIComponent(cookieValue) + "; " +
        (expireMs ? "expires=" + (new Date(Date.now() + expireMs)).toGMTString() + "; " : "") +
        "path=" + '/' +
        "; domain=" + window.location.hostname;
};

// 获取cookie值
_.getCookie = function(cookieName) {
    // your implement
    var matched = document.cookie.match('(?:^|;\\s*)' + cookieName + '=(.*?)(?:;|$)');
    return matched ? decodeURIComponent(matched[1]) : matched;
};

// --------------------------------------
//  6. Ajax
// --------------------------------------



//------------------------------------
//  helper: string template
//------------------------------------
    var tmplCache = {};

    // http://ejohn.org/blog/javascript-micro-templating/

    _.tmpl = function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
                 tmplCache[str] = tmplCache[str] || _.tmpl(document.getElementById(str).innerHTML) :

          // Generate a reusable function that will serve as a template
          // generator (and which will be cached).
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

            // Convert the template into pure JavaScript
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };

//------------------------------------
//  polyfill: custom event in IE
//------------------------------------

    // https://github.com/jonathantneal/EventListener/blob/master/EventListener.js#L91

    Object.defineProperty(Window.prototype, "CustomEvent", {
        get: function () {
            var self = this;

            return function CustomEvent(type, eventInitDict) {
                var event = self.document.createEventObject(), key;

                event.type = type;
                for (key in eventInitDict) {
                    if (key == 'cancelable'){
                        event.returnValue = !eventInitDict.cancelable;
                    } else if (key == 'bubbles'){
                        event.cancelBubble = !eventInitDict.bubbles;
                    } else if (key == 'detail'){
                        event.detail = eventInitDict.detail;
                    }
                }
                return event;
            };
        }
    });

//------------------------------------
//  exports
//------------------------------------
    root.$ = $;

})(this, _);