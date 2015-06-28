/*
* eventManager.js
* 事件机制
 */

define(function (require, exports, module) {
    var slice = Array.prototype.slice,
        doc = document;
        
    var EventManager = {
        on: function(eveType, handler) {
            var callbacks = this.callbacks || (this.callbacks = {});
            var handlers = callbacks[eveType] || (callbacks[eveType] = []);
            handlers.push(handler);
        },
        off: function(eveType, handler) {
            var callbacks,
                handlers;
            if ((callbacks = this.callbacks) && (handlers = callbacks[eveType])) {
                if (!handler) {
                    handlers = [];
                    return;
                }
                for (var i = 0; i < handlers.length; i++) {
                    if (handlers[i] = handler) {
                        handlers.splice(i, 1);
                    }
                }
            }
        },
        trigger: function() {
            var args = slice.call(arguments, 0),
                eveType = args.shift();

            var callbacks,
                handlers;
            if ((callbacks = this.callbacks) && (handlers = callbacks[eveType])) {
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i].apply(this, args);
                }
            }
        }

        listenTo: function (obj, event, callback) {
            
        },
        stopListen: function (obj, event) {
            
        }
    };

    module.exports=EventManager;    

})