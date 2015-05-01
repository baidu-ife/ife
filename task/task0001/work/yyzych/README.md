# 任务七总结


## BFC [块级格式化范围 ](http://www.cnblogs.com/pigtail/archive/2013/01/23/2871627.html)
	- [mdn文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Block_formatting_context)
	- 决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。当涉及到可视化布局的时候，Block Formatting Context提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。
	- 触发BFC的规则
	- BFC的表现规则
		### 其中一条表现规则：生成block formatting context的元素不会和在这个bfc中的子元素发生空白边折叠（注意理解这句话，是指生成bfc的元素和bfc里面的元素之间的问题，bfc里面的元素之间还是会发生空白合并的）。所以解决两个元素空白重叠的办法是要为两个容器添加具有BFC的包裹容器。

## [视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Visual_formatting_model)
	- 用来处理文档并将它显示在视觉媒体（浏览器）上的机制，是一种机制。这套机制根据盒类型来为每个元素生成盒，并且决定如何布局。
	- 盒类型：行内(inline), 行内级别(inline-level), 原子行内级别(atomic inline-level), 块(block)盒；

	### 每个盒的布局由如下内容组成：
		盒尺寸：明确指定，受限或没有指定
		盒类型：行内(inline), 行内级别(inline-level), 原子行内级别(atomic inline-level), 块(block)盒；
		定位方案(positioning scheme): 常规流，浮动或绝对定位；
		树中的其它元素: 它的子代与同代；
		视口(viewport) 尺寸与位置；
		内含图片的固定尺寸；
		其它信息。


## web语义化
	- 含义：让机器读懂内容。
	- 为什么：web的内容越来越丰富，靠人工检索内容基本不可能，两种办法：1.提高搜索引擎的智能度；2.制定通行的规则。针对2，所以要制定一套规则让搜索引擎，浏览器等能更好的识别，抓取内容
	- 怎么做：用正确的标签做正确的事