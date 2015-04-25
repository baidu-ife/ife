/**
 * check the target is an array or not
 * @param arr
 * @returns {boolean}
 */
function isArray(arr) {
    return Array.isArray(arr);
}

/**
 * check the target is an function or not
 * @param fn
 * @returns {boolean}
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
function uniqueArray(arr) {
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
    //arr.forEach(fn);
    for (var i = 0, n = arr.length; i < n; i++) {
        fn(arr[i]);
    }
}

/**
 * count the number of properties of a object
 * @param obj
 * @returns {Number}
 */
function getObjectLength(obj) {
    //var length = 0;
    //for (var key in obj) {
    //    if (obj.hasOwnProperty(key)) {
    //        length++;
    //    }
    //}
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
function isPhoneNumber(phone) {
    var re = /^1[358]\d{9}$/;
    return re.test(phone);
}

/**
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

function isSiblingNode(element, siblingNode) {
    // todo

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
 * bind the element with a specific event listener/handler
 * @param element is the dom element you want to bind with the event
 * @param event 'click', 'scroll' etc.
 * @param listener is the event handler
 */
function addEvent(element, event, listener) {

    if (element.addEventListener) { // Webkit
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) { // IE
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }

}

/**
 * remove the event handler which was bound by the addEvent(or addEventListener) function
 * @param element
 * @param event
 * @param listener
 */
function removeEvent(element, event, listener) {

    // todo: when listener is null, remove all event listeners

    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    } else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    } else {
        element["on" + event] = null;
    }

}

function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

function addEnterEvent(element, listener) {
    addEvent(element, 'keydown', listener);
}

//$.on = function (element, event, listener) {
//    addEvent(element, event, listener);
//};
//
//$.un = function (element, event, listener) {
//    removeEvent(element, event, listener);
//};
//
//$.click = function(element, handler) {
//    addClickEvent(element, handler);
//};
//
//$.enter = function(element, handler) {
//    addEnterEvent(element, handler);
//};

function clickListener(event) {
    console.log(event);
}

function enterListener(event) {
    if (event.keyCode == 13) {
        console.log("the enter button is pressed!");
    }
}

//function delegateEvent(element, tag, event, listener) {
//    var items = element.getElementsByTagName(tag);
//    each(items, function(li) {
//        addEvent(li, event, listener);
//    });
//}

$.on = function (selector, event, listener) {
    addEvent($(selector), event, listener);
};

$.un = function (selector, event, listener) {
    removeEvent($(selector), event, listener);
};

$.click = function (selector, handler) {
    addClickEvent($(selector), handler);
};

$.enter = function (selector, handler) {
    addEnterEvent($(selector), handler);
};

$.delegate = function (selector, tag, event, listener) {
    $.on(selector, event, function (e) {
        var target = e.target || e.srcElement;
        if (target.nodeName.toLowerCase() == tag ) {
            listener(e);
        }
    })
};

//$.delegate('#list', "li", "click", clickListener); // test case

/**
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


//// test
//ajax('http://localhost:5500/products/', {
//    type: 'get',
//    onsuccess: function (data) {
//        console.log(data);
//    },
//    onfail: function (error) {
//        console.error(error)
//    }
//});

/**
 * todo finish the encapsulation of ajax method
 *
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