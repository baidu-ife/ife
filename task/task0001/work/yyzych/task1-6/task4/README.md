# 任务四总结

- 选择器
	
	[选择器](http://w3school.com.cn/cssref/css_selectors.asp)


- 继承
	
	CSS的一个主要特征就是继承，它是依赖于祖先-后代的关系的。继承是一种机制，它允许样式不仅可以应用于某个特定的元素，还可以应用于它的后代。

	不可继承的：display、margin、border、padding、background、height、min-height、max-height、width、min-width、max-width、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、page-bread-before和unicode-bidi。
	所有元素可继承：visibility和cursor。
	内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
	终端块状元素可继承：text-indent和text-align。
	列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。
	表格元素可继承：border-collapse。


- 样式优先级机制
	继承：0
	标签：1
	伪元素：1
	伪类：10
	类选择器：10
	属性选择器：10
	id选择器：100
	内建样式：1000
	!important：绝对最高级

	一个选择器的权重是所有值相加