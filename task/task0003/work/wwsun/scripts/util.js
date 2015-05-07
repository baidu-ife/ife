var EventUtil = {

    addHandler: function (element, type, handler) {
        if (element.addEventListener) { // DOM2
            element.addEventListener(type, handler, false); // false means handle the events when bubbling
        } else if (element.attachEvent) { // IE
            element.attachEvent("on" + type, handler);
        } else { // DOM0
            element["on" + type] = handler;
        }
    },

    removeHandler: function (element, type, handler) {

        if (element.removeEventListener) {  // DOM 2
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {   // IE
            element.detachEvent("on" + type, handler);
        } else {  // DOM 0
            element["on" + type] = null;
        }
    },

    getEvent: function (event) {
        return event ? event : window.event;
    },

    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};

var CookieUtil = {

    get: function (name) {
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
    },

    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toUTCString();
        }

        if (path) {
            cookieText += "; path=" + path;
        }

        if (domain) {
            cookieText += "; domain=" + domain;
        }

        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },

    unset: function (name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
};

var ClassUtil = {
    add: function (element, newClassName) {
        element.classList.add(newClassName);
    },

    remove: function (element, oldClassName) {
        element.classList.remove(oldClassName);
    }
};

/**
 * Compatible with the browser that only support globalStorage
 * @returns {*}
 */
function getLocalStorage() {
    if (typeof localStorage == 'object') {
        return localStorage;
    } else if (typeof globalStorage == 'object') {
        return globalStorage[location.host];
    } else {
        throw new Error('Local storage not available.');
    }
}


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

$.on = function (selector, type, listener) {
    var nodes = $(selector);
    EventUtil.addHandler(nodes, type, listener);
};

$.un = function (selector, event, listener) {
    EventUtil.removeHandler($(selector), event, listener);
};

$.click = function (selector, handler) {
    $.on(selector, 'click', handler);
};

$.delegate = function (selector, tag, type, listener) {

    var element = $(selector);

    EventUtil.addHandler(element, type, function (event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        if (target.nodeName.toLowerCase() == tag) {
            listener(event);
        }
    });
};