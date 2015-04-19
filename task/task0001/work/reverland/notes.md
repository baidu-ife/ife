## 浏览器默认样式 

在标题栏设置github图标位置时发现。`a`标签会占用一定区域的空间，让`img`标签很难对齐。

`body`标签在火狐中竟然默认有`margin`

`a`标签消除`text-decoration`

是不是最好开始

    * {padding: 0; margin: 0;}

载入图片要指定大小。。

真是个问题，这些东西交错起来复杂度像帝都的空气一样爆表。

要明确几个问题：

什么时候用class什么时候用id
什么使用用margin控制位置什么时候用padding，什么时候使用position和浮动
如何设计布局html才能让css的使用更加方便高效

奇怪。内padding一不为0,第一个元素的上margin就会被记上

子元素absolute时，已经脱离normal flow，无法使父元素具有尺寸

像素点傻傻分不清楚，明明数的是某个数，结果要多加一个。
