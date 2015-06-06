/*
 * util.js
 *
 * @author: ych
 */

(function() {
    var doc = document,
        slice = Array.prototype.slice;

    // $函数返回的对象
    var SObj = function() {
        this.length = 0;
        this.domArr = [];
    };

    SObj.prototype = {
        constructor: SObj,
        push: function(nObj) {
            this.arrs.push(nObj);
            this.length++;
            return this;
        },
        get: function(i) {
            return this.domArr[i];
        },
        eq: function(i) {
            var o = this.domArr[i];
            if (!o) {
                return new SObj();
            }
            var n = $(o);
            return n;
        },
        each: function(func) {
            var len = this.length,
                domArr = this.domArr;
            for (var i = 0; i < len; i++) {
                func.call(this, i, domArr[i], domArr);
            }
            return this;
        },
        clone: function() {
            var res = new SObj();
            res.length = this.length;
            this.each(function(index, item, arr) {
                var n = _cloneDom(item.tagName, item);
                var htm = item.innerHTML;
                var n.innerHTML = htm;
                res.push(item);
            });
            return res;
        },
        addClass: function(nclass) {
            if (isArray(nclass)) {
                for (var i = 0; i < nclass.length; i++) {
                    this.each(function(index, item, arr) {
                        addClass(item, nclass[i]);
                    })
                }
            } else {
                this.each(function(index, item, arr) {
                    addClass(item, nclass);
                })
            }
            return this;
        },
        toggleClass: function(testClass) {
            this.each(function(index, item, arr) {
                toggleClass(item, testClass);
            });
            return this;
        },
        hasClass: function(testClass) {
            if (this.length < 1) return;
            var one = this.domArr[0];
            return hasClass(one, testClass);
        },
        removeClass: function(delClass) {
            if (isArray(nclass)) {
                for (var i = 0; i < nclass.length; i++) {
                    this.each(function(index, item, arr) {
                        removeClass(item, nclass[i]);
                    })
                }
            } else {
                this.each(function(index, item, arr) {
                    removeClass(item, nclass);
                })
            }
            return this;
        },
        isSiblingNodeWith: function(testNode) {
            if (this.length < 1) return;
            var one = this.domArr[0];
            return isSiblingNode(one, testNode);
        },
        getPosition: function() {
            if (this.length < 1) return;
            var one = this.domArr[0];
            return getPosition(one);
        },
        next: function() {
            var res = new SObj();
            this.each(function(index, item, arr) {
                var t = getNextSiblingElement(item);
                t && res.push(t);
            });
            return res;
        },
        prev: function() {
            var res = new SObj();
            this.each(function(index, item, arr) {
                var t = getPrevSiblingElement(item);
                t && res.push(t);
            });
            return res;
        },
        on: function(event, selector, listener) {
            if (isFunction(selector)) {
                listener = selector;
                selector = null;
            }
            if (!selector) {
                this.each(function(index, item, arr) {
                    _addEvent(item, event, listener);
                });
            } else {
                this.each(function(index, item, arr) {
                    _delegateEvent(item, selector, event, listener);
                });
            }
            return this;
        },
        off: function(event, listener) {
            var that = this;
            that.each(function(index, item, arr) {
                _removeEvent(item, event, listener);
            });
            return this;
        },
        one: function(event, selector, listener) {
            var that = this;
            var nlistener = function() {
                listener();

                // 清除事件处理程序
                that.off(event, nlistener);
            };
            that.on(event, selector, nlistener);
            return this;
        },
        trigger: function(event) { // @ques: 怎样传递额外的参数给事件处理程序
            if (isString(event)) {
                event = $.Event(event);
            }
            if (event instanceof Event) {
                var that = this;
                if (isFunction(doc.dispatchEvent)) {
                    that.each(function(index, item, arr) {
                        item.dispatchEvent(event);
                    });
                } else if (isFunction(doc.fireEvent)) {
                    that.each(function(index, item, arr) {
                        item.fireEvent("on" + event.type, event);
                    });
                } else {
                    alert("你的浏览器不支持自定义dom事件")
                }
            }
            return this;
        },
        click: function(listener) {
            if (!isFunction(listener)) {
                this.trigger("click");
                return;
            }
            this.on("click", listener);
            return this;
        },
        append: function(dom) {
            if (isString(dom)) {
                dom = $(dom);
            }
            if (dom instanceof SObj) {
                var len = dom.length;
                this.each(function(index, item, arr) {
                    var fragment = doc.createDocumentFragment():
                        for (var i = 0; i < len; i++) {
                            item.appendChild(dom[i]);
                        }
                });
            }
            return this;
        },
        prepend: function(dom) {
            if (isString(dom)) {
                dom = $(dom);
            }
            if (dom instanceof SObj) {
                var len = dom.length;
                this.each(function(index, item, arr) {
                    var fragment = doc.createDocumentFragment(),
                        firstChild;
                    for (var i = 0; i < len; i++) {
                        // item.appendChild(dom[i]);
                        firstChild = item.firstChild;
                        item.insertBefore(dom[i], firstChild);
                    }
                });
            }
            return this;
        },
        html: function(htm) {
            if (isString(htm)) {
                this.each(function(index, item, arr) {
                    item.innerHTML = htm;
                });
            } else {
                var one = this.get(0);
                return one.innerHTML;
            }
            return this;
        },
        find: function(selector) {
            var res = new SObj();
            this.each(function(index, item, arr) {
                var t = $(selector, item);
                t && res.push(t);
            });
            return res;
        }
    };


    // $函数实现部分
    // ==================================================
    /* 
     * 要求：
     * 1. 包装字符串为$对象
     * 2. 包装dom元素为$对象
     * 3. 查询
     *
     * 匹配选择器要逆向思维,从后往前查找，有两个情况列外：
     * 1.第一个选择器是id的时候，他会用byid缩小范围;
     * 2.最后一个是tag的时候会用bytag缩小范围;  其他的情况就是把body里面的东西全拿出来挨个筛选
     */
    function util(selector, context) {
        if (isString(selector)) {
            if (/^<.+>/.test(selector)) {
                return pack(selector);
            } else {
                return qsa(selector, context);
            }
        } else if (selector instanceof Element || isArray(selector)) {
            return pack(selector);
        }
    }

    // 根据选择器类别选择方法
    var qsa = function() {
        if (isFunction(doc.querySelectorAll)) {
            return function(selector, context) {
                context = context || doc;
                var temp = doc.querySelectorAll(selector),
                    res = new SObj();
                for (var i = 0, len = temp.length; i < len; i++) {
                    res.push(temp[i]);
                }
                return res;
            };
        }

        return _qsa;
    }();

    var _qsa = function(selector, context) {
        selector = $.trim(selector.toLowerCase());
        context = context || doc;
        var selectorArr = selector.split(/\s+/),
            idSelector = getLastIdSelector(selectorArr),
            res = new SObj(),
            idElem;
        if (idSelector && idSelector.val !== "") {
            idElem = doc.getElementById(idSelector.val.substr(1));
            if (!idElem) return res;
            context = idElem;
            if (idSelector.index === (selectorArr.length - 1)) {
                res.push(context);
                return res;
            }
        }

        var tempResult,
            LastTagName = lastSelectorIsTag(selectorArr[length - 1]);
        if (LastTagName) {
            tempResult = context.getElementsByTagName(selectorArr[length - 1]);
        } else {
            tempResult = context.getElementsByTagName("*");
        }
        var itemDom,
            selectorFromIndex = idSelector ? idSelector.index : 0;
        for (var i = 0, len = tempResult.length; i < len; i++) {
            itemDom = tempResult[i];
            if (isMatchAllSelector(itemDom, selectorArr.slice(selectorFromIndex)), context) {
                res.push(itemDom);
            }
        }
        return res;
    };

    // regArr: 选择器分割成的数组
    var isMatchAllSelector = function(testDom, regArr, context) {
        var itemSeletor,
            len = regArr.length,
            parNode = testDom;
        if (!isMatchCascadingSelector(testDom, regArr[len - 1])) return false;
        for (var i = len - 2; i >= 0; i--) {
            itemSeletor = regArr[i]; // input[type=text]:checked
            parNode = parNode.parentNode;
            var flag = false;
            while (parNode !== context) {
                if (isMatchCascadingSelector(parNode, itemSeletor)) {
                    flag = true;
                    break;
                }
                parNode = parNode.parentNode;
            }
            if (!flag) {
                return false;
            }
        }
        return true;
    };

    var isMatchCascadingSelector = function(testDom, selector) {
        var re = /([\[\.#:]?)([^\.\[\]#:]+)/g; // 解析出级联规则中的每一项规则，如input[type=text].item -> input和[type=text]和.item
        var flag = false;
        while (re.test(selector)) {
            flag = true;
            var $1 = RegExp.$1,
                $2 = RegExp.$2;
            if ($1 === "") {
                if (testDom.tagName.toLowerCase() !== $2) return false;
            } else if ($1 === "#") {
                if (testDom.id !== $2) return false;
            } else if ($1 === ".") {
                if (!hasClass($2)) return false;
            } else if ($1 === ":") {
                var parDom = testDom.parentNode;
                if ($2 === "first-child") {
                    if (_getFirstElementChild(parDom) !== testDom) return false;
                } else if ($2 === "last-child") {
                    if (_getLastElementChild(parDom) !== testDom) return false;
                }
            } else if ($1 === "[") {
                var attrSel = $2.split("=");
                var key = attrSel[0];
                var val = attrSel.length > 1 ? attrSel[1] : null;
                var resVal = testDom.getAttribute(key);
                if (resVal == null) return false;
                if (val && resVal !== val) return false;
            }
        }
        if (flag) return true;
        else return false;
    };

    var lastSelectorIsTag = function(testVal) {
        var r = /^([a-zA-Z])+[^a-zA-Z]?/.exec(testVal);
        return r ? r[1] : "";
    };

    var getLastIdSelector = function(arr) {
        var res = null,
            temp = "",
            item;
        for (var i = arr.length - 1; i >= 0; i--) {
            item = arr[i];
            if (item.indexOf("#") !== -1) {
                temp = /#([a-zA-Z])[\.\:\[>+~]+/.exec(item);
                temp = res[1];
                return {
                    index: i,
                    val: temp
                };
            }
        }
        return null;
    };

    // 包装为$对象
    var pack = function(dom) {
        var res = new SObj();
        if (dom instanceof Element) {
            dom = [dom];
        }
        if (isArray(dom)) {
            for (var i = 0, len = dom.length; i < len; i++) {
                res.push(dom[i]);
            }
        } else if (isString(dom)) {
            // var re=/^<(\/?)([a-zA-Z]+)([^/>]*)>([\s\S]*)/; // 匹配html字符串
            var re = /^<([a-zA-Z]+)([^/>]*)>/; // 匹配开始标签
            var matchs = re.exec(dom);
            if (matchs && matchs[1] !== "") { // 存在开始标签
                var tempPar = createDom("div");
                tempPar.innerHTML = dom;
                var child = tempPar.firstChild;
                res.push(child);
            } else {
                re = /<\/([a-zA-Z]+)\s*>$/; // 匹配结束标签
                re.test(dom) && res.push(createDom(RegExp.$1));
            }
        }
        return res;
    };

    var createDom = function(tagName, attrs) {
        var n = doc.createElement(tagName);
        if (!attrs) return n;
        for (var i in attrs) {
            if (attrs.hasOwnProperty(i)) {
                if (i === "style") {
                    n.style.cssText = attrs.style;
                } else {
                    n[i] = attrs[i];
                }
            }
        }
        return n;
    };

    var $ = util;
    $.fn = SObj.prototype;


    // 保存正则匹配规则，字符串形式
    // ==================================================
    var re = {
        email: /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/,
        mobile: /^1\d{10}$/
    };
    $.re = re;


    // 私有方法
    // ==================================================
    function _getFirstElementChild(parDom) {
        if (doc.firstElementChild) {
            return parDom.firstElementChild;
        } else {
            var temp = parDom.firstChild;
            while (temp) {
                if (temp.nodeType === 1) {
                    return temp;
                }
                temp = temp.nextSibling;
            }
            return null;
        }
    }

    function _getLastElementChild(parDom) {
        if (doc.lastElementChild) {
            return parDom.lastElementChild;
        } else {
            var temp = parDom.lastChild;
            while (temp) {
                if (temp.nodeType === 1) {
                    return temp;
                }
                temp = temp.previousSibling;
            }
            return null;
        }
    }

    function _cloneDom(tagName, srcDom) {
        var n = doc.createElement(tagName);
        for (var i in srcDom) {
            if (srcDom.hasOwnProperty(i)) {
                if (srcDom[i] === srcDom.style && srcDom.style.cssText !== "") {
                    n.style.cssText = srcDom.style.cssText;
                } else {
                    n[i] = srcDom[i];
                }
            }
        }
        return n;
    }

    // 对事件对象做封装处理
    function _extendEvent(srcEvent) {
        srcEvent = srcEvent || window.event;
        var res = {};
        extend(res, srcEvent);
        res.target = srcEvent.target || srcEvent.srcElement;
        res.preventDefault = function() {
            if (srcEvent.preventDefault) {
                srcEvent.preventDefault();
            } else {
                srcEvent.returnValue = false;
            }
        };
        res.stopPropagation = function() {
            if (srcEvent.stopPropagation) {
                srcEvent.stopPropagation();
            } else {
                srcEvent.cancelBubble = true;
            }
        }
        res.srcEvent = srcEvent;
        return srcEvent;
    }

    // 给一个dom绑定一个针对event事件的响应，响应函数为listener
    // ie6,7,8支持attactEvent。第三种情况已经很少了
    function _addEvent(element, event, listener) {
        var handlers = element.handlers || (element.handlers = {});
        var callbacks = handlers[event] || (handlers[event] = []);
        callbacks.push(listener);
        if (isFunction(element.addEventListener)) {
            element.addEventListener(event, function(e) {
                e = _extendEvent(e || window.event);
                listener.call(this, e);
            });
        } else if (isFunction(element.attachEvent)) {
            element.attachEvent("on" + event, function(e) {
                e = _extendEvent(e || window.event);
                listener.call(this, e);
            });
        } else {
            element["on" + event] = function(e) {
                e = _extendEvent(e || window.event);
                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i].call(this, e);
                }
            };
        }
    }

    // 移除dom对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
    function _removeEvent(element, event, listener) {
        var handlers,
            callbacks;
        if (!(handlers = element.handlers) || !(callbacks = handlers[event])) return;

        if (listener) {
            var index = -1,
                i;
            for (i = 0; i < callbacks.length; i++) {
                if (callbacks[i] === listener) {
                    index = i;
                    break;
                }
            }
            index !== -1 && callbacks.splice(index, 1);

            if(isFunction(element.removeEventListener)) {
                element.removeEventListener(event, listener);
            }else if(isFunction(element.detachEvent)) {
                element.detachEvent("on" + event, listener);
            }else {
                element["on" + event] = function(e) {
                    e = e || window.event;
                    for (var i = 0; i < callbacks.length; i++) {
                        callbacks[i].call(this, e);
                    }
                };
            }
        }else {
            var i;
            for (i = 0; i < callbacks.length; i++) {
                if(isFunction(element.removeEventListener)) {
                    element.removeEventListener(event, callbacks[i]);
                }else if(isFunction(element.detachEvent)) {
                    element.detachEvent("on" + event, callbacks[i]);
                }else {
                    element["on" + event] = null;
                    break;
                }
            }
            handlers[event] = [];
        }
    }

    // 事件委托
    function _delegateEvent(element, selector, eventName, listener) {
        element = element || document.body;
        _addEvent(element, eventName, function(e) {
            var target = e.target;
            if (isMatchAllSelector(testDom, selector, element)) {
                listener.call(target, e);
            }
        });
    }


    // 静态方法
    // ==================================================
    // 判断arr是否为一个数组，返回一个bool值
    function isArray(arr) {
        isArray = function() {
            if (typeof Array.isArray === "function") {
                return Array.isArray; // ECMA5自带
            } else {
                return function(arr) {
                    // Object.prototype.toString的行为：首先，取得对象的一个内部属性[[Class]]
                    return Object.prototype.toString.call(arr) === "[object Array]"; // 不同的文档的数组是不一样的，直接用typeof无法识别这个区别
                }
            }
        }();
        return isArray(arr);
    }
    $.isArray = isArray;

    // 判断arr是否为一个数组，返回一个bool值
    function isString(str) {
        return (typeof str).toLowerCase() === "string";
    }
    $.isString = isString;

    /*
     * 判断fn是否为一个函数，返回一个bool值
     * 旧版本chrome下'function' == typeof /a/ 为true.所以使用Object.prototype.toString
     */ 
    function isFunction(fn) {
        return Object.prototype.toString.call(fn) == "[object Function]";
    }
    $.isFunction = isFunction;

    // 判断fn是否为一个Object，返回一个bool值
    // typeof null = "object"
    function isObject(obj) {
        return Object.prototype.toString.call(fn) == "[object Object]";
    }
    $.isObject = isObject;

    // 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
    function cloneObject(src) {
        var res;
        if(src instanceof Number
            || src instanceof String
            || src instanceof Boolean){
            res=new src.constructor (src.valueof());
            return res;
        }else if(src instanceof Date) {
            res=new Date(src.getTime());
            return res;
        }else if (isArray(src)) {
            var res = [];
            for (var i = 0, len = src.length; i < len; i++) {
                res[i] = cloneObject(src[i]);
            };
            return res;
        } else if (isObject(src)) {
            var res = {};
            if (src instanceof SObj) { // 不能用来克隆SObj对象，直接返回引用，因为里面保存的是dom对象！？？
                res = src;
            } else {
                for (var prop in src) { // 也会遍历原型上的属性和方法
                    if (src.hasOwnProperty(prop)) {
                        res[prop] = cloneObject(src[prop]);
                    }
                }
            }
            return res;
        }
        return src;
    }
    $.cloneObject = cloneObject;

    // 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
    function uniqArray(arr) {
        var temp = {},
            res = [];
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i],
                val=key;
            if (!key) {
                continue;
            }
            isString(key) && (key="_"+key);
            if(!temp[key]){
                res.push(val);
                temp[key]=true;
            }
        }
        return res;
    }
    $.uniqArray = uniqArray;

    // 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串。先暂时不要简单的用一句正则表达式来实现
    function simpleTrim (str) {
        var isSpaceChar = function(achar) {
            // 空白符：\f,\n,\r,\t,\v," "
            var reqArr = [' ', '\f', '\n', '\r', '\t', '\v'];
            for (var i = 0; i < reqArr.length; i++) {
                if (achar === reqArr[i]) {
                    return true;
                }
            }
            return false;
        };

        var res = str,
            index = 0;
        for (var i = 0; i < str.length; i++) {
            if (!isSpaceChar(str[i])) {
                break;
            }
        }

        for (var j = res.length - 1; j >= 0; j--) {
            if (!isSpaceChar(res[j])) {
                break;
            }
        }
        return res.substring(i, j);
    }
    function trim(str) {
        // 正则中的\s匹配几乎所有空白符，但是低版本下 \s 等价于 [ \f\n\r\t\v]。 所以为了兼容，还要加上中文空格 和 &nbsp; 。其中\u3000: 中文空格（全角）的unicode字符表示 
        var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
        return String(str).replace(trimer, "");
    }
    $.trim = trim;

    // 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
    function each(arr, fn) {
        for (var i = 0; i < arr.length; i++) {
            fn(arr[i], i);
        }
    }
    $.each = each;

    // 获取一个对象里面第一层元素的数量，返回一个整数
    // 在for in的时候，在IE9以下，有枚举bug。a = {toString:1}时，for in不出toString这个key。
    var getObjectLength = function(obj) {
        var hasOwnProperty=Object.prototype.hasOwnProperty,
            hasEnumBug=!({
                toString: null
            }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',  // 判断一个对象是否在另一个对象的原型上
                'propertyIsEnumerable', // 返回一个布尔值，表明指定的属性名是否是当前对象可枚举的自身属性
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function (obj) {
            if(!isObject(obj) && !isFunction(obj)) {
                throw new TypeError("this function called on object or function");
            }

            var total = 0;
            for (var prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    total++;
                }
            }
            if(hasEnumBug) {
                for(var i=0; i<dontEnumsLength; i++){
                    if(hasOwnProperty.call(obj, dontEnums[i])) {
                        total++;
                    }
                }
            }
            return total;
        };
    }();
    $.getObjectLength = getObjectLength;

    // 判断是否为邮箱地址
    function isEmail(emailStr) {
        return re.email.test(emailStr);
    }
    $.isEmail = isEmail;

    // 判断是否为手机号
    // 简单判断 不考虑 (+86) 185 xxxx xxxx
    function isMobilePhone(phone) {
        return re.mobile.test(phone);
    }
    $.isMobilePhone = isMobilePhone;

    // 为dom增加一个样式名为newClassName的新样式
    function addClass(element, newClassName) {
        if (element.classList) {
            element.classList.add(newClassName);
        } else {
            if(!hasClass(newClassName)) {
                element.className=element.className ? [element.className, newClassName].join(" ") : newClassName;
            }
        }
    }
    $.addClass = addClass;

    // 有，添加；没有删除
    function toggleClass(element, testClassName) {
        if (hasClass(element, testClassName)) {
            removeClass(element, testClassName);
        } else {
            addClass(element, testClassName);
        }
    }
    $.toggleClass = toggleClass;

    // 检测是否存在样式
    function hasClass(element, testClassName) {
        if (element.classList) {
            return element.classList.contains(testClassName);
        } else {
            var oldClassName=element.className;
            oldClassName=oldClassName.split(/\s+/);
            for(var i=0, len=oldClassName.length; i++) {
                if(oldClassName[i]===testClassName) {
                    return true;
                }
            }
            return false;
            // or
            // var oldClassName = element.className;
            // var regex = new RegExp("\\b" + testClassName + "\\b", "g");
            // return regex.test(oldClassName);
        }
    }
    $.hasClass = hasClass;

    // 移除dom中的样式oldClassName
    function removeClass(element, delClassName) {
        if (element.classList) {
            element.classList.remove(delClassName);
        } else {
            if(delClassName && hasClass(element, delClassName)) {
                var oldClassName=element.className.split(/\s+/);
                for(var i=0, len=oldClassName.length; i<len; i++) {
                    if(oldClassName[i] === delClassName) {
                        oldClassName.splice(i, 1);
                        break;
                    }
                }
                element.className=oldClassName.join(" ");
            }

        }
    }
    $.removeClass = removeClass;

    // 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
    function isSiblingNode(element, siblingNode) {
        var parNode1 = element.parentNode,
            parNode2 = siblingNode.parentNode;
        return parNode2 === parNode1;
    }
    $.isSiblingNode = isSiblingNode;

    // 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
    function getPosition(element) {
        var res = {
            x: 0,
            y: 0
        };
        var temp = element;
        while (temp !== null) { // body.offsetParent=null
            res.x += temp.offsetLeft;
            res.y += temp.offsetTop;
            temp = temp.offsetParent;
        }
        
        return res;
    }
    $.getPosition = getPosition;

    // 获取当前元素的下一个兄弟元素
    function getNextSiblingElement(curDom) {
        if (curDom.nextElementSibling) {
            return curDom.nextElementSibling;
        } else {
            var res = curDom.nextSibling;
            while (res !== null) {
                if(res.nodeType === 1) {
                    return res;
                }
                res = res.nextSibling;
            }
            return res;
        }
    }
    $.getNextSiblingElement = getNextSiblingElement;

    // 获取当前元素的下一个兄弟元素
    function getPrevSiblingElement(curDom) {
        if (curDom.previousElementSibling) {
            return curDom.previousElementSibling;
        } else {
            var res = curDom.previousSibling;
            while (res !== null && res.nodeType !== 1) {
                res = res.previousSibling;
            }
            return res;
        }
    }
    $.getPrevSiblingElement = getPrevSiblingElement;

    // 设置cookie
    function setCookie(cookieName, cookieValue, expiredays) {
        var res = "";
        if (!cookieName || !cookieValue) return;
        res += encodeURIComponent(cookieName) + "=" + encodeURIComponent(cookieValue);
        if (expiredays instanceof Date) {
            res += "; expires=" + expiredays.toGMTString();
        }
        doc.cookie = res;
    }
    $.setCookie = setCookie;

    // 获取cookie值
    function getCookie(cookieName) {
        var cookie = doc.cookie;
        cookieName = encodeURIComponent(cookieName);
        var start = cookie.indexOf(cookieName),
            val = null;
        if (start > -1) {
            var end = cookie.indexOf(";", start);
            if (end === -1) {
                end = cookie.length;
            }
            val = decodeURIComponent(cookie.substring(start + cookieName.length + 1, end));
        }
        return val;
    }
    $.getCookie = getCookie;

    // 扩展对象
    function extend(oldObj) {
        var args = slice.call(arguments, 0);
        if (args.length <= 1) return oldObj;

        var temp;
        for (var i = 1; i < args.length; i++) {
            temp = cloneObject(args[i]);
            for (var prop in temp) {
                if (temp.hasOwnProperty(prop)) {
                    oldObj[prop] = temp[prop];
                }
            }
        }

        return oldObj;
    }
    $.extend = extend;


    // 平台检测, 参考《javascript高级程序设计》
    // ==================================================
    $.os = function() {
        var o = {
            phone: 0,
            pc: 0,

            ie: 0,
            chrome: 0,
            safari: 0,
            firefox: 0,
            opera: 0,

            // 浏览器的版本
            ver: 0
        };
        var s = {};

        var ua = navigator.userAgent.toLowerCase();
        var pf = navigator.platform.toLowerCase();

        // 检测移动设备平台
        s.iphone = ua.indexOf("iphone") > -1;
        s.ipad = ua.index("iphone") > -1;
        if (/android (\d+\.\d+)/.test(ua)) {
            s.android = 1;
            s.ver = parseFloat(RegExp.$1);
        }
        // 检测ios版本
        if (s.iphone || s.ipad) {
            if (/cpu (?:iphone )?os (\d+_\d+)/.test(ua)) {
                s.ver = parseFloat(RegExp.$1.replace("_", "."));
            } else {
                s.ver = 2;
            }
        }

        // 检测浏览器
        if (window.opera) {
            o.opera = 1;
            o.ver = window.opera.version();
        } else if (/applewebkit\s(\S+)/.test(ua)) {
            if (/chrome\/(\S+)/.test(ua)) {
                o.chrome = 1;
                o.ver = RegExp["$1"];
            } else if (/version\/(\S+)/.test(ua)) {
                o.safari = 1;
                o.ver = RegExp["$1"];
            }
        } else if (/firefox\/(\S+)/.test(ua)) {
            o.firefox = 1;
            o.ver = RegExp["$1"];
        } else if (/msie ([^;]+)/.test(ua)) {
            o.ie = 1;
            o.ver = RegExp["$1"];
        }

        var res = {
            sys: s,
            browser: o
        };

        if (/mobile/.test(ua)) {
            res.phone = 1;
        } else {
            res.pc = 1;
        }

        return res;
    }();


    // ajax 模块
    // ==================================================
    /*
     *  参数：
     *  type: get/post
     *  url: 发送请求的地址，默认当前的地址
     *  data: 发送到服务器的数据；如果是GET请求，它会自动被作为参数拼接到url上。非String对象将通过 $.param 得到序列化字符串
     *  dataType (默认： text)：预期服务器返回的数据类型(“json”, “text”)
     *  global (默认：true): 请求将触发全局Ajax事件处理程序，设置为 false 将不会触发全局 Ajax 事件
     *  username & password (默认： none): HTTP基本身份验证凭据
     *  async (默认：true): 默认设置下，所有请求均为异步。如果需发送同步请求，请将此设置为 false。
     *  beforeSend(xhr, settings)：请求发出前调用，它接收xhr对象和settings作为参数对象。如果它返回 false ，请求将被取消。
     *  success(data, status, xhr)：请求成功之后调用。传入返回后的数据，以及包含成功代码的字符串。
     *  error(xhr, errorType, error)：请求出错时调用。 (超时，解析错误，或者状态码不在HTTP 2xx)。
     *  complete(xhr, status)：请求完成时调用，无论请求失败或成功。
     *
     *  事件：
     *  ajaxBeforeSend (data: xhr, options)：再发送请求前，可以被取消。
     */
    (function($) {
        var nop = function() {};
        var defOpts = {
            type: "get",
            url: "./",
            async: true,
            data: null,
            global: true,
            dataType: "text",

            username: null,
            password: null,

            beforeSend: nop,
            success: nop,
            error: nop,
            complete: nop
        };

        var getXHR = function() {
            if (window.XMLHttpRequest) {
                return function() {
                    return new XMLHttpRequest();
                }
            } else if (window.ActiveXObject) {
                return function() {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
            } else {
                return function() {
                    alert("你的浏览器不支持ajax，请升级浏览器");
                    return null;
                }
            }
        }();

        var addUrlParam = function(url, paramStr) {
            url += (url.indexOf("?") == -1) ? "?" : "&";
            url += paramStr;
            return url;
        };

        // 需要在传入时就做好编码
        var make_base_auth = function(user, password) {
            var tok = user + ':' + pass;
            // var hash = Base64.encode(tok);
            return "Basic " + hash;
        };

        // 是否是类型中的一种
        var isRightDataType = function(testVal) {
            testVal = testVal.toLowerCase();
            if (testVal === "json" || testVal === "text") {
                return true;
            }
            return false;
        };

        // 用于：使用get和post时获取正确参数
        var getOptions = function(data, callback, dataType) {
            if ($.isFunction(data)) {
                callback = data;
                data = null;
            }
            var flag = false;
            if ((falg = dataType !== undefined) && !isRightDataType(dataType)) {
                throw new Error("dataType不是正确的类型");
            }
            var options = {
                type: "post",
                url: url,
                data: data,
                callback: callback,
                dataType: flag ? dataType : "text",
                success: callback
            };

            return options;
        };

        // 只支持序列化一层对象
        $.param = function(data) {
            if ($.isString(data)) {
                return encodeURIComponent(data);
            }
            var res = [],
                temp;
            for (var prop in data) {
                if (data.hasOwnProperty(prop)) {
                    temp = encodeURIComponent(prop) + "=" + encodeURIComponent(data[prop]);
                    res.push(temp);
                }
            }
            return res.join("&");
        };

        $.ajax = function(options) {
            var xhr;
            if (!(xhr = getXHR())) return;
            var resOpts = $.extend({}, defOpts, options);

            // 触发请求发送前的ajaxBeforeSend的全局事件
            if (resOpts.global) {
                var xhrEvent = $.Event("ajaxBeforeSend");
                $(document).trigger(xhrEvent, [xhr, options]);
            }

            // 触发请求发送前的beforeSend回调函数
            if (resOpts.beforeSend(xhr) === false) {
                // xhr.abort();
                return;
            }

            var uploadDataStr = (resOpts.data && $.param(resOpts.data)) || "";

            // 绑定回调函数
            xhr.onreadystatechange = stateChangeHandler;

            var _type = "get";
            if (resOpts.type.toLowerCase() === "get") {
                _type = "get";
                xhr.open("get", addUrlParam(resOpts.url, uploadDataStr), resOpts.async);
            } else if (resOpts.type.toLowerCase() === "post") {
                _type = "post";
                xhr.open("post", url, resOpts.async);
                // xhr.setRequestHeader的调用要在open之后send之前
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            // HTTP Basic Authentication认证
            if (resOpts.username && resOpts.password) {
                xhr.setRequestHeader("Authorization", make_base_auth(resOpts.username, resOpts.password));
            }

            xhr.send(_type === "get" ? null : uploadDataStr);

            return xhr;

            function stateChangeHandler () {
                var stat;
                if (xhr.readyState === 4) {
                    try {
                        stat=xhr.status;
                    }catch(err) {
                        // 在请求时，如果网络中断，Firefox会无法取得status
                        fire("error");
                        return;
                    }

                    fire(stat); //触发每个状态

                    // IE error sometimes returns 1223 when it should be 204, so treat it as success
                    if ((stat >= 200 && stat < 300) 
                        || stat === 304
                        || stat === 1223) {
                        fire("success");
                    } else {
                        fire('error');
                    }

                    fire('complete');

                    /*
                     * NOTE: Testing discovered that for some bizarre reason, on Mozilla, the
                     * JavaScript <code>XmlHttpRequest.onreadystatechange</code> handler
                     * function maybe still be called after it is deleted. The theory is that the
                     * callback is cached somewhere. Setting it to null or an empty function does
                     * seem to work properly, though.
                     *
                     * On IE, there are two problems: Setting onreadystatechange to null (as
                     * opposed to an empty function) sometimes throws an exception. With
                     * particular (rare) versions of jscript.dll, setting onreadystatechange from
                     * within onreadystatechange causes a crash. Setting it from within a timeout
                     * fixes this bug (see issue 1610).
                     *
                     * End result: *always* set onreadystatechange to an empty function (never to
                     * null). Never set onreadystatechange from within onreadystatechange (always
                     * in a setTimeout()).
                     */
                    window.setTimeout(function() {
                        xhr.onreadystatechange = new Function();
                        xhr = null;
                    }, 0);
                }
            }

            function fire (type) {
                var handler=resOpts[type];
                if(!$.isFunction(handler)) return;
                if(type !== "success") { // error | complete
                    handler(xhr);
                }else {
                    //处理获取xhr.responseText导致出错的情况,比如请求图片地址.???
                    try {
                        xhr.responseText;
                    }catch(err) {
                        return handler(xhr);
                    }
                    var response=xhr.responseText;
                    (resOpts.dataType.toLowerCase() === "json") && (response = JSON.parse(xhr.responseText));
                    handler(response);
                }
            }
        };

        $.get = function(url, data, callback, dataType) {
            var res = getOptions(data, callback, dataType);
            res.type = "get";
            $.ajax(options);
        };

        $.post = function(url, data, callback, dataType) {
            var res = getOptions(data, callback, dataType);
            res.type = "post";
            $.ajax(options);
        };

        // r如果存在选择器，则区集合中的第一个元素添加到当前元素中
        $.fn.load = function(url, selector) {
            var that = this;
            var callback = function(data) {
                if (!selector) {
                    that.html(data);
                } else {
                    var temp = $(data).find(selector);
                    temp.length > 0 && this.html("").append(temp.get(0));
                }
            };
            $.get(url, callback);
        };
    })(util);


    // 动画
    // ==================================================
    $.animate = function() {

    };


    // 创建Dom事件
    // ==================================================
    $.Event = function(type, options) {
        var ne;
        isObject(options) || (options = {});
        if (isArray(doc.createEvent)) {
            ne = doc.createEvent("Events");
        } else if (isArray(doc.createEventObject)) {
            ne = doc.createEventObject();
        }
        ne.type = type;
        ne.bubbles = true;
        ne.cancelable = true;
        extend(ne, options);
        return ne;
    };

    // @ques: 定义tap事件
    (function($) {
        var oldOn = $.fn.on;
        $.fn.on = function(event, selector, listener) {
            if (event === "tap") {

            } else {
                oldOn.call(this, event, selector, listener);
            }
        };
    })(util)

})();