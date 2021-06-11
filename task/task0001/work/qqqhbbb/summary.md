这是任务第8天了，终于也完成了第一个任务，下面总结一下任务当中遇到的问题和解决方法，以及最重要的收获。


####HTML编码规范：
1、缩进用4个空格。

2、class命名用小写字母，且要代表相应模块或部件的内容或功能，以-分隔。

3、用HTML5的doctype来启用标准模式。

4、用IE Edge模式来让IE最好的渲染。

5、由于text/css和text/javascript是type的默认值，因此在引入CSS和JavaScript时无须指明type属性。


####CSS编码规范：
1、用border/margin/padding等缩写时容易覆盖不需要覆盖的设定，可以分开设置。

2、当数值为0-1之间的小数时，可省略整数部分的0。

3、url()函数中的路径不用加引号。

4、颜色值能缩写就缩写，不能用命名色值，上下文大小写统一。

5、font-family的字体族名称应使用字体的英文，上下文大小写统一。

6、由于Windows的字体渲染机制，文字不应小于12px。

7、font-weight属性用数值方式描述，粗700，细400。

####遇到的问题和解决方法：
######1、github图标在浏览器宽度小于980px时隐藏
给header和header-wrapper同样的背景色，同时让header-wrapper层叠在上方，这样github图标会被隐藏在下方。
```css
.header{
	width: 100%;
	height: 80px;
	background: #522A5C;
	overflow: hidden;
	position: relative;
}
.header-wrapper{
	width: 980px;
	height: 80px;
	margin: 0 auto;
	background: #522A5C;
	position: relative;
	z-index: 1;
}
```
######2、透明渐变
使用滤镜，以白色背景自上而下70%-50%-0透明渐变，同时兼容IE8。
```css
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#7FFFFFFF', endColorstr='#00FFFFFF', GradientType=0);
background: linear-gradient(to bottom, rgba(255, 255, 255, .7) 0, rgba(255, 255, 255, .5) 75%, rgba(255, 255, 255, 0) 100%);
background: -moz-linear-gradient(to bottom, rgba(255, 255, 255, .7) 0, rgba(255, 255, 255, .5) 75%, rgba(255, 255, 255, 0) 100%);
background: -o-linear-gradient(to bottom, rgba(255, 255, 255, .7) 0, rgba(255, 255, 255, .5) 75%, rgba(255, 255, 255, 0) 100%);
background: -ms-linear-gradient(to bottom, rgba(255, 255, 255, .7) 0, rgba(255, 255, 255, .5) 75%, rgba(255, 255, 255, 0) 100%);
background: -webkit-linear-gradient(to bottom, rgba(255, 255, 255, .7) 0, rgba(255, 255, 255, .5) 75%, rgba(255, 255, 255, 0) 100%);
```
######3、三列等高
父元素包裹三个子元素，父元素overflow:hidden，子元素向下padding使自己撑开，同时给相反的margin让父元素缩回来，当父元素碰到高度最高的子
元素就会被挡住，从而实现三列等高。
```css
.pic-show{
	width: 980px;
	height: 500px;
	margin: 0 auto;
	overflow: hidden;
}
.pic-show-1{
	padding-top: 10px;
	text-align: center;
	float: left;
	width: 320px;
	background: #FFF;
	padding-bottom: 1000px;
	margin-bottom: -1000px;
}
.pic-show-2{
	margin-left: 10px;
	padding-top: 10px;
	text-align: center;
	float: left;
	width: 320px;
	background: #FFF;
	padding-bottom: 1000px;
	margin-bottom: -1000px;
}
.pic-show-3{
	padding-top: 10px;
	text-align: center;
	float: right;
	width: 320px;
	background: #FFF;
	padding-bottom: 1000px;
	margin-bottom: -1000px;
}
```
######4、瀑布流布局
初看设计图是3列布局，div实现后发现最左列不能自适应高度，于是在最左列里加多两列，通过浮动来控制各个元素。

######5、日历
本来table里我是没有套tbody的，在chrome developer tools发现多了tbody，查资料了解到tbody可以控制表格分行下载，当表格内容很大时
比较实用。

######6、排行榜
用了ol有序列表，相比ul好处在于如果页面丢失css，用户依然能看到排行情况。

######7、圆形图片
这里偷了懒，直接将图片切成圆形，再利用绝对定位来控制位置。

######8、圆角矩形
1.做成图片的形式再定位 优点:兼容性好 缺点:太偷懒

2.border-radius 优点:简单粗暴 缺点:兼容性差

3.div堆砌四个边角 优点:兼容性好 缺点:代码冗长

这里用了第2种方法

####总结：
对我是一次较全面的实践任务，对之前零散的知识结构来了一次系统的查缺补漏，编码过程中，涉及到的大小知识点，通过google以及文档
搜寻解决方案，对我学习效率有很大提升。抛开代码，我接触了GitHub，正在不断摸索着使用方法；接触了Sublime Text，了解了插件使用和
高效的快捷键；接触了chrome developer tools，让调试页面变得更加高效。过程中收藏了许多同学和祖明大大分享的干货，往后还得多翻出
来啃啃啊。
