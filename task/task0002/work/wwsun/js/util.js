/**
 * task 2.1
 * check the target is an array or not
 * @param arr is the target object you want to test
 * @returns {boolean} true if arr is an array, otherwise return false
 */
function isArray(arr) {
    if (Array.isArray) {
        return Array.isArray(arr);
    } else {
        return arr instanceof Array;
    }
}

/**
 * task 2.1
 * check the target is an function or not
 * @param fn
 * @returns {boolean} true if fn is a function, otherwise return false
 */
function isFunction(fn) {
    return typeof fn === 'function';
}

/**
 * deep clone
 * @param src
 * @returns {*}
 */
function cloneObject(src) {
    if (src == null || typeof src != 'object') {
        return src;
    } else {
        var temp = src.constructor();

        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                temp[key] = cloneObject(src[key]);
            }
        }
        return temp;
    }
}

/**
 * remove duplicate items, each item only appear one time
 * @param arr
 * @returns {Array} without duplicate items
 */
function uniqArray(arr) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) < 0) {
            result.push(arr[i]);
        }
    }
    return result;
}

/**
 * remove all white spaces in the front or end of a string
 * @param str
 * @returns {XML|string|void}
 */
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

/**
 * execute the function fn for each item in the arr as the parameters
 * @param arr
 * @param fn
 */
function each(arr, fn) {
    if (isArray(arr)) {
        for (var i = 0, n = arr.length; i < n; i++) {
            fn(arr[i]);
        }
    }
}

/**
 * count the number of properties of a object
 * @param obj
 * @returns {Number}
 */
function getObjectLength(obj) {
    return Object.keys(obj).length; // a better solution, since ES5
}

/**
 * check a string if a valid email address or not
 * @param email
 */
function isEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

/**
 * check a number sequence if a valid mobile phone number or not
 * @param phone
 */
function isMobilePhone(phone) {
    var re = /^1[358]\d{9}$/;
    return re.test(phone);
}

/**
 * test 3.1
 * add a new css class for a specific dom element
 * @param element
 * @param newClassName
 */
function addClass(element, newClassName) {
    element.classList.add(newClassName);
}

/**
 * remove an existed css class for a specific dom element
 * @param element
 * @param oldClassName
 */
function removeClass(element, oldClassName) {
    element.classList.remove(oldClassName);
}

/**
 * test it the `element` node is the sibling of `siblingNode` node
 * @param element
 * @param siblingNode
 * @returns {boolean}
 */
function isSiblingNode(element, siblingNode) {
    var nodes = element.parent.childNodes;
    var i, n;
    for (i = 0, n = nodes.length; i < n; i++) {
        if (nodes[i] == siblingNode) {
            return true;
        }
    }
    return false;
}

/**
 * return the position of the specific element, which is relative to the browser window
 * @param element
 * @returns {{x: Number, y: Number}}
 */
function getPosition(element) {
    var rect = element.getBoundingClientRect();
    return {
        x: rect.top,
        y: rect.right
    };
}

// todo: combine multiple selectors, like $('#adom .classa')
/**
 * select dom elements by id, class, attribute, attribute=value
 * @param selector
 * @returns {*}
 */
function $(selector) {
    var root = document.body; // set the body element as the root element
    var childNodes = root.childNodes;

    if (childNodes.length > 0) {

        switch (selector.substr(0, 1)) {
            case '.':
                // class selector
                return document.getElementsByClassName(selector.substr(1));
            case '#':
                // id selector
                return document.getElementById(selector.substr(1));

            case '[':
                // attribute selector
                if (selector.slice(-1) === ']') {

                    var attrString = selector.substr(1, selector.length - 2);
                    var attrArr = attrString.split('=');
                    //console.log(attrArr);

                    var allElements = document.getElementsByTagName('*');

                    if (attrArr.length === 1) { // only attribute name

                        for (var i = 0, n = allElements.length; i < n; i++) {
                            if (allElements[i].getAttribute(attrString) !== null) {
                                return allElements[i]; // return the first element that matched
                            }
                        }

                    } else if (attrArr.length === 2) { // attribute name with value
                        for (var j = 0, m = allElements.length; j < m; j++) {
                            if (allElements[j].getAttribute(attrArr[0]) === attrArr[1]) {
                                return allElements[j]; // return the first element that matched
                            }
                        }
                    }
                } else {
                    console.log('attribute selector should end with ]');
                }

            default :
                return root.getElementsByTagName(selector);
        }
    }
}

/**
 * Event util
 * bind the element with a specific event listener/handler
 * @param element is the dom element you want to bind with the event
 * @param event 'click', 'scroll' etc.
 * @param listener is the event handler
 */
function addEvent(element, event, listener) {
    if (element.addEventListener) { // DOM2
        element.addEventListener(event, listener, false); // false means handle the events when bubbling
    } else if (element.attachEvent) { // IE
        element.attachEvent("on" + event, listener);
    } else { // DOM0
        element["on" + event] = listener;
    }
}

/**
 * Event util
 * remove the event handler which was bound by the addEvent(or addEventListener) function
 *
 * @param element
 * @param event
 * @param listener is the specific listener you want to remove, if null, remove all listeners
 */
function removeEvent(element, event, listener) {
    if (listener) {
        if (element.removeEventListener) {  // DOM2
            element.removeEventListener(event, listener, false);
        } else if (element.detachEvent) {   // IE
            element.detachEvent("on" + event, listener);
        } else {  // DOM0
            element["on" + event] = null;
        }
    } else {
        element.parentNode.replaceChild(element.cloneNode(true), element);
    }
}

/**
 * Event util
 *
 * @param event
 */
function getEvent(event) {
    return event ? event : window.event;
}

/**
 * Event util
 * @param event
 * @returns {*|string|EventTarget|Node|Object}
 */
function getTarget(event) {
    return event.target || event.srcElement;
}

/**
 * Event util
 * @param event
 */
function preventDefault(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

function stopPropagation(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

$.on = function (selector, event, listener) {

    var nodes = $(selector);
    if (document.addEventListener) {
        if (nodes.length) {
            each(nodes, function (item, index) {
                addEvent(item, event, listener);
                //item.addEventListener(event, listener, false);
            });
        } else {
            addEvent(nodes, event, listener);
            //nodes.addEventListener(event, listener, false);
        }
    }

    //addEvent($(selector), event, listener);
};

$.un = function (selector, event, listener) {
    removeEvent($(selector), event, listener);
};

$.click = function (selector, handler) {
    $.on(selector, 'click', handler);
};

$.enter = function (selector, handler) {
    var element = $(selector);
    element.addEventListener('keydown', function (event) {
        event = EventUtil.getEvent(event);
        var code = event.keyCode || event.which || event.charCode;
        if (code == 13) {
            handler();
        }
    }, false);
};

$.delegate = function (selector, tag, type, listener) {

    var element = $(selector);

    addEvent(element, type, function(event) {
        event = getEvent(event);
        var target = getTarget(event);
        if (target.nodeName.toLowerCase() == tag) {
            listener(event);
        }
    });
};

/**
 * test 5.1
 * judge if the browser is MS-IE
 */
function isIE() {
    return false || !!document.documentMode;
}

/**
 * set a cookie name/value pair
 * @param name
 * @param value
 * @param expires e.g. new Date("April 24, 2015")
 */
function setCookie(name, value, expires) {
    var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    if (expires instanceof Date) {
        cookieText += "; expires=" + expires.toUTCString();
    }

    document.cookie = cookieText;
}

/**
 * get the cookie value by name
 * @param name
 */
function getCookie(name) {
    var cookieName = encodeURIComponent(name) + "=",
        cookieStart = document.cookie.indexOf(cookieName),
        cookieValue = null;

    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }

    return cookieValue;
}


/**
 * ajax method
 * @param url
 * @param options {type, data, onsuccess, onfail}
 */
function ajax(url, options) {
    var xhr = createXHR();

    var type,
        data,
        successFn,
        failFn;

    if (typeof options == 'object') {
        type = options.type.toUpperCase();
        data = options.data || null;
        successFn = options.onsuccess || 'undefined';
        failFn = options.onfail || 'undefined';
    }


    if (typeof data == 'object') {
        var str = '';
        for (var key in data) {
            str += key + "=" + data[key] + "&";
        }
        data = str.replace(/&$/, '');
        str = null;
    }


    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                //console.log(xhr.responseText)
                successFn(xhr.responseText);
            } else {
                if (failFn) {
                    failFn(xhr.status);
                } else {
                    console.error("Unsuccessful:\t" + xhr.status);
                }
            }
        }

    };

    switch (type) {
        case "GET":
            if (data) {
                xhr.open('GET', url + '?' + data, true);
            } else {
                xhr.open('GET', url, true);
            }
            break;
        case "POST":
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(data);
    }

    xhr.send(null);
}

function createXHR() {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
}