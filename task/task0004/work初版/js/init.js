/*
 * init.js
 */

/*! Sea.js 2.3.0 | seajs.org/LICENSE.md */
!function(a,b){function c(a){return function(b){return{}.toString.call(b)=="[object "+a+"]"}}function d(){return z++}function e(a){return a.match(C)[0]}function f(a){for(a=a.replace(D,"/"),a=a.replace(F,"$1/");a.match(E);)a=a.replace(E,"/");return a}function g(a){var b=a.length-1,c=a.charAt(b);return"#"===c?a.substring(0,b):".js"===a.substring(b-2)||a.indexOf("?")>0||"/"===c?a:a+".js"}function h(a){var b=u.alias;return b&&w(b[a])?b[a]:a}function i(a){var b=u.paths,c;return b&&(c=a.match(G))&&w(b[c[1]])&&(a=b[c[1]]+c[2]),a}function j(a){var b=u.vars;return b&&a.indexOf("{")>-1&&(a=a.replace(H,function(a,c){return w(b[c])?b[c]:a})),a}function k(a){var b=u.map,c=a;if(b)for(var d=0,e=b.length;e>d;d++){var f=b[d];if(c=y(f)?f(a)||a:a.replace(f[0],f[1]),c!==a)break}return c}function l(a,b){var c,d=a.charAt(0);if(I.test(a))c=a;else if("."===d)c=f((b?e(b):u.cwd)+a);else if("/"===d){var g=u.cwd.match(J);c=g?g[0]+a.substring(1):a}else c=u.base+a;return 0===c.indexOf("//")&&(c=location.protocol+c),c}function m(a,b){if(!a)return"";a=h(a),a=i(a),a=j(a),a=g(a);var c=l(a,b);return c=k(c)}function n(a){return a.hasAttribute?a.src:a.getAttribute("src",4)}function o(a,b,c){var d=K.createElement("script");if(c){var e=y(c)?c(a):c;e&&(d.charset=e)}p(d,b,a),d.async=!0,d.src=a,R=d,Q?P.insertBefore(d,Q):P.appendChild(d),R=null}function p(a,b,c){function d(){a.onload=a.onerror=a.onreadystatechange=null,u.debug||P.removeChild(a),a=null,b()}var e="onload"in a;e?(a.onload=d,a.onerror=function(){B("error",{uri:c,node:a}),d()}):a.onreadystatechange=function(){/loaded|complete/.test(a.readyState)&&d()}}function q(){if(R)return R;if(S&&"interactive"===S.readyState)return S;for(var a=P.getElementsByTagName("script"),b=a.length-1;b>=0;b--){var c=a[b];if("interactive"===c.readyState)return S=c}}function r(a){var b=[];return a.replace(U,"").replace(T,function(a,c,d){d&&b.push(d)}),b}function s(a,b){this.uri=a,this.dependencies=b||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!a.seajs){var t=a.seajs={version:"2.3.0"},u=t.data={},v=c("Object"),w=c("String"),x=Array.isArray||c("Array"),y=c("Function"),z=0,A=u.events={};t.on=function(a,b){var c=A[a]||(A[a]=[]);return c.push(b),t},t.off=function(a,b){if(!a&&!b)return A=u.events={},t;var c=A[a];if(c)if(b)for(var d=c.length-1;d>=0;d--)c[d]===b&&c.splice(d,1);else delete A[a];return t};var B=t.emit=function(a,b){var c=A[a],d;if(c){c=c.slice();for(var e=0,f=c.length;f>e;e++)c[e](b)}return t},C=/[^?#]*\//,D=/\/\.\//g,E=/\/[^/]+\/\.\.\//,F=/([^:/])\/+\//g,G=/^([^/:]+)(\/.+)$/,H=/{([^{]+)}/g,I=/^\/\/.|:\//,J=/^.*?\/\/.*?\//,K=document,L=location.href&&0!==location.href.indexOf("about:")?e(location.href):"",M=K.scripts,N=K.getElementById("seajsnode")||M[M.length-1],O=e(n(N)||L);t.resolve=m;var P=K.head||K.getElementsByTagName("head")[0]||K.documentElement,Q=P.getElementsByTagName("base")[0],R,S;t.request=o;var T=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,U=/\\\\/g,V=t.cache={},W,X={},Y={},Z={},$=s.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};s.prototype.resolve=function(){for(var a=this,b=a.dependencies,c=[],d=0,e=b.length;e>d;d++)c[d]=s.resolve(b[d],a.uri);return c},s.prototype.load=function(){var a=this;if(!(a.status>=$.LOADING)){a.status=$.LOADING;var c=a.resolve();B("load",c);for(var d=a._remain=c.length,e,f=0;d>f;f++)e=s.get(c[f]),e.status<$.LOADED?e._waitings[a.uri]=(e._waitings[a.uri]||0)+1:a._remain--;if(0===a._remain)return a.onload(),b;var g={};for(f=0;d>f;f++)e=V[c[f]],e.status<$.FETCHING?e.fetch(g):e.status===$.SAVED&&e.load();for(var h in g)g.hasOwnProperty(h)&&g[h]()}},s.prototype.onload=function(){var a=this;a.status=$.LOADED,a.callback&&a.callback();var b=a._waitings,c,d;for(c in b)b.hasOwnProperty(c)&&(d=V[c],d._remain-=b[c],0===d._remain&&d.onload());delete a._waitings,delete a._remain},s.prototype.fetch=function(a){function c(){t.request(g.requestUri,g.onRequest,g.charset)}function d(){delete X[h],Y[h]=!0,W&&(s.save(f,W),W=null);var a,b=Z[h];for(delete Z[h];a=b.shift();)a.load()}var e=this,f=e.uri;e.status=$.FETCHING;var g={uri:f};B("fetch",g);var h=g.requestUri||f;return!h||Y[h]?(e.load(),b):X[h]?(Z[h].push(e),b):(X[h]=!0,Z[h]=[e],B("request",g={uri:f,requestUri:h,onRequest:d,charset:u.charset}),g.requested||(a?a[g.requestUri]=c:c()),b)},s.prototype.exec=function(){function a(b){return s.get(a.resolve(b)).exec()}var c=this;if(c.status>=$.EXECUTING)return c.exports;c.status=$.EXECUTING;var e=c.uri;a.resolve=function(a){return s.resolve(a,e)},a.async=function(b,c){return s.use(b,c,e+"_async_"+d()),a};var f=c.factory,g=y(f)?f(a,c.exports={},c):f;return g===b&&(g=c.exports),delete c.factory,c.exports=g,c.status=$.EXECUTED,B("exec",c),g},s.resolve=function(a,b){var c={id:a,refUri:b};return B("resolve",c),c.uri||t.resolve(c.id,b)},s.define=function(a,c,d){var e=arguments.length;1===e?(d=a,a=b):2===e&&(d=c,x(a)?(c=a,a=b):c=b),!x(c)&&y(d)&&(c=r(""+d));var f={id:a,uri:s.resolve(a),deps:c,factory:d};if(!f.uri&&K.attachEvent){var g=q();g&&(f.uri=g.src)}B("define",f),f.uri?s.save(f.uri,f):W=f},s.save=function(a,b){var c=s.get(a);c.status<$.SAVED&&(c.id=b.id||a,c.dependencies=b.deps||[],c.factory=b.factory,c.status=$.SAVED,B("save",c))},s.get=function(a,b){return V[a]||(V[a]=new s(a,b))},s.use=function(b,c,d){var e=s.get(d,x(b)?b:[b]);e.callback=function(){for(var b=[],d=e.resolve(),f=0,g=d.length;g>f;f++)b[f]=V[d[f]].exec();c&&c.apply(a,b),delete e.callback},e.load()},t.use=function(a,b){return s.use(a,b,u.cwd+"_use_"+d()),t},s.define.cmd={},a.define=s.define,t.Module=s,u.fetchedList=Y,u.cid=d,t.require=function(a){var b=s.get(s.resolve(a));return b.status<$.EXECUTING&&(b.onload(),b.exec()),b.exports},u.base=O,u.dir=O,u.cwd=L,u.charset="utf-8",t.config=function(a){for(var b in a){var c=a[b],d=u[b];if(d&&v(d))for(var e in c)d[e]=c[e];else x(d)?c=d.concat(c):"base"===b&&("/"!==c.slice(-1)&&(c+="/"),c=l(c)),u[b]=c}return B("config",a),t}}}(this);

seajs.config({
    // preload: "app",  // Sea.js 2.1之后已经删了
    // map: [
    //     [/^(.*\.(?:css|js))(.*)$/i, '$1?'+Date.now()]
    // ]
});

var touchEve=function () {
    // 不能直接 touchstart in window，没有定义事件处理程序则为false，无法检测
    var hasTouch="ontouchstart" in window;
    var me={};
    me.startEvent = hasTouch ? 'touchstart' : 'mousedown';
    me.moveEvent = hasTouch ? 'touchmove' : 'mousemove';
    me.endEvent = hasTouch ? 'touchend' : 'mouseup';
    me.cancelEvent = hasTouch ? 'touchcancel' : 'mouseup';

    return me;
}();

var AppRouter=Backbone.Router.extend({
    routes: {
        "": "loadIndex",
        "category/:query": "loadTaskList",
        "task/:query": "loadTaskInfo",
        "newtask/:query": "loadAddNewTask"
    },
    loadIndex: function () {
        seajs.use("view/index", function (index) {
            AppManager.beforeViewCache=AppManager.mainViewCache;
            AppManager.mainViewCache=index;
            // AppManager.releaseBeforeView();

            index.initUI();
        });
    },
    loadTaskList: function (categoryId) {
        seajs.use("view/taskList", function (tasks) {
            // AppManager.cacheBeforeView();
            // AppManager.mainViewCache=tasks;

            AppManager.beforeViewCache=AppManager.mainViewCache;
            AppManager.mainViewCache=tasks;

            tasks.initUI(categoryId);
        });
    },
    loadTaskInfo: function (taskId) {
        seajs.use("view/taskInfo", function (taskInfo) {
            // AppManager.cacheBeforeView();

            AppManager.beforeViewCache=AppManager.mainViewCache;
            AppManager.mainViewCache=taskInfo;

            taskInfo.initUI(taskId, false);
        });
    },
    loadAddNewTask: function (categoryId) {
        seajs.use("view/taskInfo", function (taskInfo) {
            // AppManager.cacheBeforeView();
            AppManager.mainViewCache=taskInfo;

            taskInfo.initUI(categoryId, true);
        });
    }
});

var AppManager={
    mainViewCache: null,
    beforeViewCache: null,
    appRouter: null,
    queueView: [],

    exist: function (viewid) {
        var queue=this.queueView;
        if($.isFunction(queue.indexOf)) {
            return queue.indexOf(viewid);
        }
        for(var i=0; i<queue.length; i++) {
            if(queue[i] === viewid) {
                return i;
            }
        }
        return -1;
    },
    releaseBeforeView: function () {
        var beforeView=this.beforeViewCache;
        if(beforeView && $.isFunction(beforeView.release)) {
            beforeView.release();
        }
        return this;
    },
    cacheBeforeView: function (pageOut) {
        var beforeView=this.beforeViewCache;
        if(beforeView && $.isFunction(beforeView.cache)) {
            beforeView.cache(pageOut);
        }
        return this;
    },
    pageIn: function (parEl, viewEl, drection) {
        var that=this,
            mainViewId=that.mainViewCache.viewId,
            viewIndex=-1;

        if(that.beforeViewCache == null) {
            parEl.append(viewEl);
            that.queueView.push(mainViewId);
            return;
        }
        if((viewIndex=that.exist(mainViewId)) === -1) {
            // one程序有问题
            // viewEl.addClass("pageshow-anim").one("transitionend", function (e) {
            //     that.cacheBeforeView();
            //     var delClass="pageshow-anim "+drection+"-in "+drection+"-posi";
            //     $(this).removeClass(delClass);
            // });
            viewEl.addClass("pageshow-anim").css("z-index", 99);
            setTimeout(function () {
                that.cacheBeforeView();
                var delClass="pageshow-anim "+drection+"-in "+drection+"-in-posi";
                viewEl.removeClass(delClass).css("z-index", null);
            }, 520);
            viewEl.addClass(drection+"-in-posi");

            parEl.append(viewEl);
            viewEl.get(0).clientLeft;
            viewEl.addClass(drection+"-in");

            that.queueView.push(mainViewId);
        }else if(viewIndex != -1 && viewIndex <= (that.queueView.length-1)) {
            parEl.append(viewEl);
            that.cacheBeforeView(true);

            var delNum=this.queueView.length-viewIndex;
            this.queueView.splice(viewIndex+1, delNum);
        }
        
    },
    pageOut: function (viewEl, drection, callback) {
        viewEl.addClass("pageshow-anim").css("z-index", 100);
        setTimeout(function () {
            var delClass="pageshow-anim "+drection+"-out "+drection+"-out-posi";
            viewEl.removeClass(delClass);
            viewEl.css("css", null);
            callback();
        }, 520);
        viewEl.addClass(drection+"-out-posi");
        viewEl.get(0).clientLeft;
        viewEl.addClass(drection+"-out");
    }
};

function startRoute () {
    AppManager.appRouter=new AppRouter();

    Backbone.history.start({
        pushState: false
    });
}

$(window).on("DOMContentLoaded", function(e) {
    // startRoute(); 
    seajs.use("app", function(app) {
        startRoute();
    });
});

