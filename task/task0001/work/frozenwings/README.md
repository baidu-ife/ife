#Baidu-IFE-Task0001问题总结

###容器内的img标签与容器之间存在2px的空隙
参考：
* [2px White Area Underneath Of Images](http://stackoverflow.com/questions/21153123/strange-2px-white-area-underneath-of-images-possible-css-error)  
解决方法:

```
#gallery > div > img {
    display:block;
}
```
```
#gallery > div > img {
    vertical-align:top;
}
```

<!--More-->

###并排inline-block元素之间存在空隙
参考：
* [Fighting the Space Between Inline Block Elements](https://css-tricks.com/fighting-the-space-between-inline-block-elements/)  
解决方法:
```
nav {
  font-size: 0;
}
nav a {
  font-size: 16px;
}
```

###使用table-cell实现并排div高度高度撑满容器
table-cell兼容性：
* [CSS Table display](http://caniuse.com/#search=table-cell) 

例子：[这里](http://jsfiddle.net/FhQwb/1/)和[这里](http://jsfiddle.net/fm54T/)

对于`display:table-cell`的盒子，`margin`属性将不生效，可以使用`border-spacing`实现相同效果：
* [Why is a div with “display: table-cell;” not affected by margin?](http://stackoverflow.com/questions/16398823/why-is-a-div-with-display-table-cell-not-affected-by-margin)

移除第一列左边和最后一列右边的`border-spacing`，把容器的`margin-left`和`margin-right`属性设置为负值：
* [CSS table border spacing inside only](http://jsfiddle.net/marcstober/60dnac4a/1/)

###在IE8中实现半透明效果
`opacity:0.5`这种写法在ie8中不起作用，要在IE<9中实现半透明效果需要加上MS语法：
```
.opaque2 {	// for IE5-7
	filter: alpha(opacity=50);
}

.opaque3 {	// for IE8
	-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
}
```
参考：
* [How to set the opacity of an element.](http://quirksmode.org/css/color/opacity.html)  
* [Cross Browser Opacity](https://css-tricks.com/snippets/css/cross-browser-opacity/)

### 在IE8中实现透明度渐变效果
背景色为白色，至上而下透明度变为70%->50%(75%位置)->0%

```
filter:alpha(Opacity=70, finishOpacity=50, Style=1, startX=180, startY=0, finishX=180, finishY=30);
filter:alpha(Opacity=50, finishOpacity=0, Style=1, startX=180, startY=30, finishX=180, finishY=120);
```
webkit实现方式
```
background:-webkit-gradient(linear,left 100%,left 25%, from(rgba(255,255,255,0.7)), to(rgba(255,255,255,0.5)));
background:-webkit-gradient(linear,left 25%,left bottom, from(rgba(255,255,255,0.5)), to(rgba(255,255,255,0)));
```
或者：
```
background-image: linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.5) 25%,rgba(255,255,255,0));
```
背景色渐变，前两位为透明度，00表示完全透明
```
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#00ffffff');   
``` 
参考:
* [用css实现渐变透明效果](http://blog.163.com/123xin_xin/blog/static/33429735200991353125638/)
* [alpha filter (alpha channel)](http://www.tagindex.net/css/filter/alpha.html) 
* [跨浏览器的CSS渐变](http://www.iefans.net/liulanqi-css-jianbian/)
* [ADDING TRANSPARENCIES AND GRADIENTS WITH CSS](http://www.webdesignerdepot.com/2010/11/adding-transparencies-and-gradients-with-css/)
* [CSS Gradients](https://css-tricks.com/css3-gradients/)

最终实现：
```
background-color: #ffffff;
filter:alpha(Opacity=70, finishOpacity=50, Style=1, startX=180, startY=0, finishX=180, finishY=30);
filter:alpha(Opacity=50, finishOpacity=0, Style=1, startX=180, startY=30, finishX=180, finishY=120);
background:-webkit-gradient(linear,left 100%,left 25%, from(rgba(255,255,255,0.7)), to(rgba(255,255,255,0.5)));
background:-webkit-gradient(linear,left 25%,left bottom, from(rgba(255,255,255,0.5)), to(rgba(255,255,255,0)));
```

### 在IE8下input text的两个问题
* 设置line-height = height 使输入文字垂直居中
* 在input text右侧存在按钮时，使用border-right代替padding-right。否则在输入文字超出输入框长度时，光标会出现在padding区域中。
```
    /*padding:0 52px 0 40px;*/
    
    padding-left:41px;  
    border-right: 53px solid transparent;  
```
参考：
* [HTML: IE: Right padding in input text box](http://stackoverflow.com/questions/3765411/html-ie-right-padding-in-input-text-box)
* [Incorrect vertical alignment in IE8](http://stackoverflow.com/questions/3893256/incorrect-vertical-alignment-in-ie8)



















