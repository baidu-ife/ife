/*
* mvc.js
 */

define(function (require, exports, module) {
    var slice = Array.prototype.slice,
        doc = document;

    var EventManager=require("../components/eventManager");

    // 对浏览器做初始化处理，如兼容性问题
    (function initialize() {
        // Object.create
        if (typeof Object.create !== "function") {
            Object.prototype.create = function(par) {
                function F() {};
                F.prototype = par;
                return new F();
            }
        }

        // 该方法摘自《基于javascript的mvc富应用开发》
        Math.guid = function() {
            return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            })).toUpperCase();
        }
    })();


    // 模型
    var Model = function(attrs) {
        attrs || (attrs = {});
        this.cid = Math.guid();
        this.id = typeof attrs.id !== "undefined" ? attrs.id : this.cid;
        this.attributes = {
            id: this.id
        };

        this.set(attrs);
        this.initialize.apply(this, arguments);
    };
    Model.prototype = {
        constructor: Model,
        initialize: function() {},
        set: function() {
            var attrs = arguments[0];
            for (var prop in attrs) {
                if (attrs.hasOwnProperty(prop)) {
                    this.attributes[prop] = attrs[prop];
                }
            }

            this.trigger("change");
        },
        get: function(name) {
            return this.attributes[name];
        },
        toJSON: function() {
            return this.attributes;
        },
        clone: function() {
            var constructor = this.constructor;
            var res = new constructor(this.attributes);
            return res;
        },
        save: function(name) { // 保存到服务器或localstroage
            localStorage.setItem(name || this.id, JSON.stringify(this));

            this.trigger("change");
        },
        fetch: function(name) { // 从服务器或localstroage中获取数据
            var res = JSON.parse(localStorage[name]);
            this.set(res);

            this.trigger("change");
        },
        destroy: function(name) {
            localStorage.removeItem(name || this.id);
        }
    };
    $.extend(Model.prototype, EventManager);


    // 集合
    var List = function(opts) {
        opts || (opts = {});
        opts.model && (this.model = opts.model);
        this.records = {};
        this.cid = Math.guid();
        this.id = typeof opts.id !== "undefined" ? opts.id : this.cid;

        this.initialize.apply(this, arguments);
    };
    List.prototype = {
        constructor: List,
        initialize: function() {},
        _getNextId: function() {
            var idArr = [];
            var records = this.records;
            for (var i in records) {
                if (records.hasOwnProperty(i)) {
                    idArr.push(parseInt(records[i].id));
                }
            }
            if (idArr.length <= 0) return 0;
            var maxid = Math.max.apply(Math, idArr);
            return maxid + 1;
        },
        addItem: function(item) {
            if (item.constructor === this.model) {
                this.records[item.id] = item;
            } else {
                var constructor = this.model;
                var res = new constructor(item);
                this.records[item.id] = item;
            }
        },
        removeItem: function(item) {
            var records = this.records;
            if (typeof item === "object") {
                for (var i in records) {
                    if (records.hasOwnProperty(i)) {
                        if (records[i] === item) {
                            delete records[i];
                            return;
                        }
                    }
                }
            } else {
                records[item] && (delete records[item]);
            }
        },
        save: function(name) {
            var res = [],
                records = this.records;
            for (var i in records) {
                if (records.hasOwnProperty(i)) {
                    res.push(records[i]);
                }
            }
            localStorage.setItem(name || this.id, JSON.stringify(res));

            this.trigger("change");
        },
        count: function() {
            var count = 0,
                records = this.records;
            for (var i in records) {
                if (records.hasOwnProperty(i)) {
                    count++;
                }
            }
            return count;
        },
        fetch: function(name) {
            var res = JSON.parse(localStorage[name]);
            this.populate(res);

            this.trigger("change");
            this.trigger("fetch");
        },
        populate: function(items) {
            this.records = {};
            var constructor = this.model;

            for (var i = 0; i < items.length; i++) {
                this.records[items[i].id] = new constructor(items[i]);
            }
        },
        find: function(itemId) {
            var records = this.records;
            for (var i in records) {
                if (records.hasOwnProperty(i)) {
                    if (records[i].id == itemId) {
                        return records[i];
                    }
                }
            }
        },
        destroy: function(name) {
            localStorage.removeItem(name || this.id);

            this.records = {};
        }
    };
    $.extend(List.prototype, EventManager);


    // 控制器+视图
    var View = function(root, opts) {
        this.root = root;
        this.cid = Math.guid();
        this.id = typeof opts.id !== "undefined" ? opts.id : this.cid;
        this.events = opts.events;
        this.elements = opts.elements || {};

        opts.modelList && (this.modelList = opts.modelList);

        this.initialize.call(this, opts);
        opts.handlers && this.addEventHandler(opts.handlers);
        this.events && this.createEvent();
    };
    View.prototype = {
        constructor: View,
        eventSpliter: /^(\w+)\s*(.*)$/,
        initialize: function() {
            var opt = arguments[0];
            if (isFunction(opt.initialize)) {
                opt.initialize.call(this);
            }
        },
        $: function(selector) {
            return $(selector, this.root);
        },
        createEvent: function() {
            for (var key in this.events) {
                var methodName = this.events[key],
                    method = this.proxy(this[methodName]),
                    match = key.match(this.eventSpliter),
                    eventName = match[1],
                    selector = match[2];
                if (selector === "") {
                    $.on(this.root, eventName, method);
                } else {
                    $.delegate(this.root, selector, eventName, method);
                }
            }
        },
        addEventHandler: function(obj) {
            var fn = this.constructor.prototype;
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    fn[i] = obj[i];
                }
            }
        },
        proxy: function(func) {
            var that = this;
            return function() {
                func.apply(that, arguments);
            }
        }
    };
    $.extend(View.prototype, EventManager);


    // @prama protoProps 添加到child的prototype的方法
    var extend = function(protoProps) {
        var parent = this,
            child;

        child = function() {
            parent.apply(this, arguments);
        };
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;

        //方便调用父类的方法
        child.__super__ = parent.prototype;

        // 复制parent的静态属性到child中
        $.extend(child, parent);

        // 复制protoProps到child的prototype上
        if("initialize" in protoProps){
            var subInit=protoProps.initialize,
                supInit=child.__super__.initialize;
            protoProps.initialize=function () {
                supInit.apply(this,arguments);
                subInit.apply(this,arguments);
            };
        }
        $.extend(child.prototype, protoProps);

        

        return child;
    };


    // 继承某个对象
    Model.extend = View.extend = List.extend = extend;

    exports.Model = Model;
    exports.View = View;
    exports.List = List;

})