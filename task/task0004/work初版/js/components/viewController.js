/*
* viewController.js
* mobile平台时的视图管理对象
 */

 define(function (require, exports, module) {
     var doc = document;
     var curView = null,
         views = {},
         queue = [],
         backBeforeViewBtn;

     var _createBackBtn = function() {
         var a = doc.createElement("a");
         addClass(a, "segue-view-btn");
         addClass(a, "z-hide");
         $.on(a, "click", function(e) {
             _popView();
         });

         $(".web-hd").appendChild(a);
         return a;
     };

     var segueView = function(view) {
         var actView;
         if (typeof view === "string" || typeof view === "number") {
             actView = views[view];
             if (!actView) return;
             removeClass(curView.root, "z-active");
             addClass(actView.root, "z-active");
             curView = actView;
         } else if (typeof view === "object") {
             actView = view;
             removeClass(curView.root, "z-active");
             addClass(actView.root, "z-active");
             curView = actView;
         }
     };

     var _addView = function(view, id) {
         views[id || Date.now()] = view;
     };

     var _pushView = function(view) {
         segueView(view);
         queue.push(view);
         removeClass(backBeforeViewBtn, "z-hide");
     };

     var _popView = function() {
         if (queue.length < 2) return;
         if (queue.length === 2) {
             addClass(backBeforeViewBtn, "z-hide");
         }
         var popView = queue.pop();
         var actView = queue[queue.length - 1];
         segueView(actView);
     };

     var viewControll = {
         init: function(_views, actView) {
             for (var i = 0; i < _views.length; i++) {
                 this.addView(_views[i], _views[i].id);
             }
             if (actView && typeof actView !== "object") {
                 actView = views[actView];
             }
             actView || (actView = _views[0]);
             addClass(actView.root, "z-active");
             curView = actView;
             queue.push(actView);

             backBeforeViewBtn = _createBackBtn();
         },
         addView: _addView,
         pushView: _pushView,
         popView: _popView
     };

     module.exports=viewControll;

 })