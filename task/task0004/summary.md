# 任务四总结

## 使用Backbone进行单页开发
（比对任务3的代码，使用backbone后代码更加清晰，简单。直观的一点就是：页面之间不再耦合）

究竟什么mvc开发，其实真是不知道怎么描述，总担心自己理解不到位，说出来也是错的。私以为：
这TM就是一种**开发模式**吧。

模型（集合）可以对应多个视图；也就是说模型不知道视图，视图知道模型，视图通过监听模型的变化而改变自己，但是不是直接操作模型，得通过模型自己的方法。
又因为模型关联多个视图，多个视图监听同一个模型实现了视图的通信。使视图不再耦合。

主视图的切换：
 - 通过URL的改变加载对应的视图（路由）。可以保存历史纪录（a标签可以直接使用href属性），不过也不是所有的视图都需要保存历史纪录
 - 通过事件等其他方式加载视图（更新URL但不路由）

初始化和渲染：
initialize只做一些初始化，绑定事件工作，不要在他里面调用render，render只在视图即将添加到页面中前调用，render不一定非得使用模版，对于复杂的逻辑，使用模版不方便，直接使用js等其他方式

集合的fetch：
可能会有这种情况，子元素没有生成就去fetch，同时视图监听了集合的某些事件并要更新dom，这时会报错。
如果要依赖集合的fetch加载模型从而渲染dom,那么什么时候去fetch呢，不知道。。所以我就没这么做，而是：先fetch全局的集合（模型），视图再去监听，这时候因fetch引发的事件不会执行，然后在render里手动去处理集合：

    /*
     * 不依靠集合的fetch引发的add事件去添加一项是因为：
     * 1. 如果集合已经fetch过了，再去fetch一次，已经存在的model不会触发add事件
     * 2. render函数会经常调用，但用不着每次也去fetch一遍，因为绑定了集合的其他事件，如add事件，会自动执行相应的操作
     */
    this.addAll();

@ques: View只需要集合中的一部分，这怎么搞
        筛选
@ques: 模型和集合的代码组织，写在一起还是写在各自的文件
@ques: 有些事件是绑定在item上还是list上呢（即父视图还是子视图上）
- 绑定在父视图上：1.事件代理；2.子视图之间要进行切换时逻辑更加方便，不会产生耦合，因为切换的代码由父视图控制
- 绑定在子视图上：简单
@ques: 视图每次加载都需要render吗？销毁时是完全的销毁还是清空Dom还是只是隐藏等？
清空dom,每次render简单粗暴，但..?

@mark: 没有加入到集合中的模型，没有必要给他自增的ID
@mark: 在模型上触发 "destroy" 事件，该事件将会冒泡到任何包含这个模型的集合中,也就是说集合上保存的数据也会删除
@mark: 不要直接使用视图的remove，应该通过删除模型触发事件告诉模型对应的视图，然后视图在删除自己
@mark: 不是所有的视图都要有对应的模型的，render不一定非得使用模版技术



## 部分模块化的理解及seajs的使用
模块化解决的问题：
文件的依赖性；
全局作用域的污染；
按需加载（会与“合并请求”矛盾，所有模块都要到一个文件，也就做不到按需加载了。利用构建工具解决改问题）

commonJS:服务器端的模块规范，nodejs
AMD:浏览器端模块规范，requirejs推广而产生
CMD:浏览器端模块规范，seajs推广而产生

主要区别：
1.声明方式
seajs: 提倡就近声明
    因为是异步模块，加载器需要提前加载这些模块，所以模块真正使用前需要提取模块里面所有的依赖。无论是加载器即时提取，还是通过自动化工具预先提取，CMD 的这种依赖声明格式只能通过静态分析方式实现，这也正是 CMD 的弊端所在。
    这里是指加载，而不是执行。也就是说执行到require(...)这句之前这个模块已经因为seajs内部的静态分析提前加载好了，只不过没有执行，到这句才执行
        
requirejs: 提倡提前声明
    这种优势的好处就是依赖无需通过静态分析，无论是加载器还是自动化工具都可以很直接的获取到依赖，规范的定义可以更简单，意味着可能产生更强大的实现，这对加载器与自动化分析工具都是有利的。

2.依赖模块的执行：
    seajs: 执行到require(...)这句时才执行依赖模块的代码
    requirejs: 先执行依赖模块的代码，在执行本模块的代码


新get到seajs的几个配置项：

    preload: "app",  // Sea.js 2.1之后已经删了
    map: 映射路径，
        map: [
            ["view/", ""], // 如seajs.use("view/index") => seajs.use("index")
            [/^(.*\.(?:css|js))(.*)$/i, '$1?'+Date.now()] // 添加时间戳，防止浏览器缓存
        ]
        每一项规则都会按顺序应用，后一项执行的是前一项的结果，所以需要注意顺序


## 其他
@ques: 检测时都是小写"onwebkittansitionend"，绑定时又变成"webkitTansitionEnd"
@ques: 换成touchend事件时，因为会弹出系统弹窗阻塞进程，导致会发生两次touchend事件，这是为什么？填了内容点击“好”又不会啊


    

---

## 学习资料（来自百度ife及我的增删改减）

### 基本

* [移动WEB开发入门](http://junmer.github.io/mobile-dev-get-started/)
* [移动开发资源集合](https://github.com/jtyjty99999/mobileTech)
* [MobileWeb 适配总结](http://www.w3ctech.com/topic/979)
* [移动前端不得不了解的html5 head 头标签](http://www.css88.com/archives/5480)
* [浅谈移动前端的最佳实践](http://www.cnblogs.com/yexiaochai/p/4219523.html)
* [移动端真机调试终极利器-BrowserSync](http://www.codingserf.com/index.php/2015/03/browsersync/)


### CSS Processing

* [再谈 CSS 预处理器](http://efe.baidu.com/blog/revisiting-css-preprocessors/)
* [CSS 预处理器与 CSS 后处理器](http://zhaolei.info/2014/01/04/css-preprocessor-and-postprocessor/)


### 安全

* [浅谈WEB安全性](http://www.2cto.com/Article/201412/363743.html)
* [XSS的原理分析与解剖](http://www.freebuf.com/articles/web/40520.html)
* [给开发者的终极XSS防护备忘录](http://www.fooying.com/chinese-translationthe-ultimate-xss-protection-cheatsheet-for-developers/)


### 性能优化

* [毫秒必争，前端网页性能最佳实践](http://www.cnblogs.com/developersupport/p/webpage-performance-best-practices.html)
* [给网页设计师和前端开发者看的前端性能优化](http://www.oschina.net/translate/front-end-performance-for-web-designers-and-front-end-developers#section:maximising-parallelisation)
* [css sprite原理优缺点及使用](http://www.cnblogs.com/mofish/archive/2010/10/12/1849062.html)
* [CSS Sprites：鱼翅还是三鹿](http://www.qianduan.net/css-sprites-useful-technique-or-potential-nuisance/)
* [大型网站的灵魂——性能](http://www.cnblogs.com/leefreeman/p/3998757.html)
* [编写高效的 CSS 选择器](http://web.jobbole.com/35339/)


### 模块化

* [Javascript模块化编程 阮一峰](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
* [详解JavaScript模块化开发](http://segmentfault.com/a/1190000000733959)
* [浅谈模块化的JavaScript](http://www.cnblogs.com/jinguangguo/archive/2013/04/06/3002515.html?utm_source=tuicool)
* [再谈 SeaJS 与 RequireJS 的差异](http://div.io/topic/430)
* [SeaJS与RequireJS最大的区别](http://www.douban.com/note/283566440/)
* 玩转AMD系列 by erik@EFE
    - [玩转AMD - 写在前面](http://efe.baidu.com/blog/dissecting-amd-preface/)
    - [玩转AMD - 设计思路](http://efe.baidu.com/blog/dissecting-amd-what/)
    - [玩转AMD - 应用实践](http://efe.baidu.com/blog/dissecting-amd-how/)
    - [玩转AMD - Loader](http://efe.baidu.com/blog/dissecting-amd-loader/)


### 前端工程化

* [前端工程与模块化框架](http://div.io/topic/439)
* [手机百度前端工程化之路](http://mweb.baidu.com/p/baidusearch-front-end-road.html)
* [F.I.S与前端工业化](http://www.infoq.com/cn/articles/yunlong-on-fis)
* [Grunt教程——初涉Grunt](http://www.w3cplus.com/tools/grunt-tutorial-start-grunt.html)
* [gulp入门指南](http://www.open-open.com/lib/view/open1417068223049.html)


