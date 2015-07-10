###using svg to implement border-radius in ie8
- inserting into ie8 after draw a svg image：[css-tricks](https://css-tricks.com/using-svg/)

###浮动banner时，banner上侧增加了不该存在的空白
-
###image与父容器间距离问题
- [stack-overflow](http://stackoverflow.com/questions/21153123/strange-2px-white-area-underneath-of-images-possible-css-error)

###`display:table-cell`用法
- 使元素以显示出表格特性:单元格高度随内容整体变化；
`border-spacing`表示`table－cell`之间的空白。应当与border-collapse:seperater同用，`margin`在`table-cell`之间不生效。

###`<image>（inline-block）`之margin
###负外边距作用
 - block元素设置负外边距，父元素会为包裹住它而扩大（overflow:visible）。

###渐变gradient:
 - [各个角度，定点,ie9fliter:gradient](https://css-tricks.com/css3-gradients/)
 - [rgba-hex](http://stackoverflow.com/questions/23201134/transparent-argb-hex-value)
 
###页码制作 宽度不固定块元素居中：
 - 起因：每个页码作为行内元素只设置内边距不设置宽高 

###浮动元素周围文字环绕问题
 - 方法1:处于方便仅仅给环绕文字包裹住一层div，并同样为其设置浮动
 - 最佳办法？
 
###图片作为inline－block不能很好的居中，其与同一行的文字在垂直高度上不能对齐，为什么，如何解决？

 - 

###float：left元素，如何在父元素内垂直居中？
- 绝对定位，设置margin
- 最佳办法？

###如何让文字分布在行的上侧,即行高不是均匀的分布在行的上下 而只是分布下侧？
- 设置padding

###about页面左右分栏的更好设计方法：
- 首次方案为布局不变，（参照比翼双飞）每一列表的标题和标题图片采用相对当前列表的绝对定位。导致左栏内容为空，需要用padding－bottom填充并设置margin-bottom以及父元素，最终实现较比预期麻烦。
- 改进方法：采用一栏布局，table－cell方法