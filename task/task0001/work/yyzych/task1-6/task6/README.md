# 任务五总结


##块状元素，内联元素，内联块状元素
	- 由display决定
	- 概念
	- 区别
	- 哪些元素是块状，内联，内联块状

##盒模型
	- ie盒模型（<ie8,ie的content部分包含了 border 和 pading），标准盒模型
	- 盒模型：内容(content)、填充(padding)、边界(margin)、 边框(border).
	- box-sizing:改变盒模型

##positon
	- 各个定位值是怎么工作的
	- 布局流
	- 各个值得应用场景

##float
	- 向左/右浮动，退出原本的布局流（???）
	- 形成了bfc
	- 清除浮动（clear:both）
	- 修复高度塌陷（如：设置overflow:hidden;zoom:1;(就是要形成bfc,zoom:1还开启ie的hasLayout，类似于bfc)或添加元素同时清除浮动或添加<br clear="all" />或设置为display:table或使用:after或其他等）
	- 应用场景：一行菜单，浮动布局

##布局
	###布局模型
		- 流动模型（网页默认的布局方式）
		- 浮动模型
		- 层模型（及定位）

	###布局方式
		- 圣杯布局
		- 双飞翼布局



###框类型
	- 行框
	- 行内框
	- containing block
	- ???