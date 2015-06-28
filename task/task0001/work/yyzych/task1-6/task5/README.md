# 任务五总结

- letter-spacing

	定义字符间距

- word-spacing

	定义字符之间的空白符的大小，所以首先字符之间要有空白符，tab


- word-break

	处理换行的方式

	normal：默认的处理空白符的方式：汉字会换行，英文字母不会，而是整个英文单词换行
	break-all: 在任何可能的地方进行换行
	break-word: 应该就是和word-wrap:break-word一样吧？？和break-all的区别：汉字和英文单词之间（中间没有空格）需要换行时break-word会将整个单词进行换行，break-all则是直接就换行了。


- word-wrap
	normal: 默认的处理空白符的方式：汉字会换行，英文字母不会，而是整个英文单词换行
	break-word: 英文字母也会换行，而不是整个单词换行


- white-space
	
	默认的处理空白符的方式：汉字会换行，英文字母不会，而是整个英文单词换行
	normal: 多个空白符被合并，默认的处理换行的方式
	nowrap: 多个空白符被合并,全部禁止换行，只有在遇到<br>时才会换行
	pre: 空白符被保留，全部禁止换行，只有在遇到<br>时才会换行
	pre-wrap: 空白符被保留，默认的处理换行的方式
	pre-line: 多个空白符被合并，默认的处理换行的方式

	pre-line和normal是有区别的，还没搞清楚？？



- 背景属性

	background:#fff url() fixed no-repeat center
	background-image
	background-color
	background-attachment
	background-repeat
	background-position
	background-size
	background-origin:规定 background-position 属性相对于什么位置来定位。（如果背景图像的 background-attachment 属性为 "fixed"，则该属性没有效果。）
	background-clip:背景被裁剪到边框盒（border-box）,内边距框（padding-box），内容框（content-box）		[示例](http://www.w3school.com.cn/tiy/c.asp?f=css_background-clip&p=3)