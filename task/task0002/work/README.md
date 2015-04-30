# task002——参考以及技能get√

#### 扯点感想>, <
因为做任务最重要的目的还是学习，所以在coding的同时会翻阅很多资料。       
有些长篇大论不得不耐着性子去看，边看边做笔记，边总结边思考提问。    
为了系统地学习，把虽然跟任务没什么关联，但是相关的知识点看了一遍，然后就发现，竟然不知不觉就把《JavaScript权威指南》看了大半了。 
周末忙别的事情导致提交迟到，干脆一不做二不休迟了好久，罪过罪过。    
但是感觉自己对js的了解真的提高了不少。    
下面进入正题，关于做任务的过程中参考的一些资料，一些犯的错，以及一些收获。


#### 深度克隆
主要参考这个[博客](http://qianduanblog.com/post/js-learning-30-object-clone-copy.html)，讲得很清楚。  
>javascript的一切实例都是对象，只是对象之间稍有不同，分为**原始类型**和**合成类型**。原始类型对象指的是字符串（String）、数值（Number）、布尔值（Boolean），合成类型对象指的是数组（Array）、对象（Object）、函数（Function）。  
>普通对象存储的是对象的实际数据，而引用对象存储的是对象的引用地址，而把对象的实际内容单独存放。    

**也就是说普通对象的复制是直接复制，而合成类型的对象则是通过地址找到真正的内容，再进行复制。**   

  
补充：arguments.callee的作用之一，递归（即调用自身）↓ [查看详情](http://www.cnblogs.com/fullhouse/archive/2011/07/17/2108710.html)    

>```
>var sum = function(n){  
>if (n <= 0)  
>    return 1;  
>else  
>    return n + arguments.callee(n - 1)  
>}  
>```
>比较一般的递归函数：
>```
>var sum = function(n){  
>    if (1==n) 
>        return 1;  
>    else 
>        return n + sum (n-1);  
>}  
>```
>调用时：  
>```
>alert(sum(100));  
>```  
>函数内部包含了对sum自身的引用，函数名仅仅是一个变量名，在函数内部调用sum即相当于调用一个全局变量，不能很好的体现出是调用自身，这时使用callee会是一个比较好的方法。  

### 数组去重
```
array.indexOf(value)
```
```
array.indexOf(value,start)
```
为了indexOf在ie8下的兼容花了些时间，参考这个[博客](http://blog.csdn.net/xb12369/article/details/20922301)。   

### 去空格
```
String.substring(from,to)
```
截取String的[from,to)位置的子串，如果to省略则提取到结尾。  
相似的方法↓      
```
String.substr(start,length)
```
截取String从start开始，start为负数则从倒数第|start|个数开始，长度为length的子串，如果length省略则提取到结尾。该方法现已弃用。    
### 正则
### 事件
### 函数
### 对象
### cookie
这几个都是看W3C了解简单的例子，然后看《JavaSript权威指南》深入了解。    

### 关于IE判断
查了各种资料，有各种解决方法，最后还是在stack overflow上发现了一个最合理的，通过"MSIE"检查IE11以前的，通过"rv"识别IE11及以后的版本↓[查看详细]()
>```
function getInternetExplorerVersion()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
>```

附上微软官方对IE11的user-agent字符串的更改说明↓ [查看详细](https://msdn.microsoft.com/library/bg182625(v=vs.110).aspx)

>
如果将这些 user-agent 字符串与早期版本的 Internet Explorer 报告的字符串进行比较，你会发现以下更改：    
* 兼容 ("兼容") 和浏览器 ("MSIE") 令牌已删除。
* "like Gecko" 令牌已添加（以便与其他浏览器一致）。
* 浏览器版本现在由新版本 ("rv") 令牌报告。  
这些更改有助于防止 IE11 被（错误）标识为较早的版本。
>



to be continue...
