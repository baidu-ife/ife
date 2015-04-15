#Baidu-IFE-Task0001�����ܽ�

###�����ڵ�img��ǩ������֮�����2px�Ŀ�϶
�ο���
* [2px White Area Underneath Of Images](http://stackoverflow.com/questions/21153123/strange-2px-white-area-underneath-of-images-possible-css-error)  
�������:

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

###����inline-blockԪ��֮����ڿ�϶
�ο���
* [Fighting the Space Between Inline Block Elements](https://css-tricks.com/fighting-the-space-between-inline-block-elements/)  
�������:
```
nav {
  font-size: 0;
}
nav a {
  font-size: 16px;
}
```

###ʹ��table-cellʵ�ֲ���div�߶ȸ߶ȳ�������
table-cell�����ԣ�
* [CSS Table display](http://caniuse.com/#search=table-cell) 

���ӣ�[����](http://jsfiddle.net/FhQwb/1/)��[����](http://jsfiddle.net/fm54T/)

����`display:table-cell`�ĺ��ӣ�`margin`���Խ�����Ч������ʹ��`border-spacing`ʵ����ͬЧ����
* [Why is a div with ��display: table-cell;�� not affected by margin?](http://stackoverflow.com/questions/16398823/why-is-a-div-with-display-table-cell-not-affected-by-margin)

�Ƴ���һ����ߺ����һ���ұߵ�`border-spacing`����������`margin-left`��`margin-right`��������Ϊ��ֵ��
* [CSS table border spacing inside only](http://jsfiddle.net/marcstober/60dnac4a/1/)

###��IE8��ʵ�ְ�͸��Ч��
`opacity:0.5`����д����ie8�в������ã�Ҫ��IE<9��ʵ�ְ�͸��Ч����Ҫ����MS�﷨��
```
.opaque2 {	// for IE5-7
	filter: alpha(opacity=50);
}

.opaque3 {	// for IE8
	-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
}
```
�ο���
* [How to set the opacity of an element.](http://quirksmode.org/css/color/opacity.html)  
* [Cross Browser Opacity](https://css-tricks.com/snippets/css/cross-browser-opacity/)

### ��IE8��ʵ��͸���Ƚ���Ч��
����ɫΪ��ɫ�����϶���͸���ȱ�Ϊ70%->50%(75%λ��)->0%

```
filter:alpha(Opacity=70, finishOpacity=50, Style=1, startX=180, startY=0, finishX=180, finishY=30);
filter:alpha(Opacity=50, finishOpacity=0, Style=1, startX=180, startY=30, finishX=180, finishY=120);
```
webkitʵ�ַ�ʽ
```
background:-webkit-gradient(linear,left 100%,left 25%, from(rgba(255,255,255,0.7)), to(rgba(255,255,255,0.5)));
background:-webkit-gradient(linear,left 25%,left bottom, from(rgba(255,255,255,0.5)), to(rgba(255,255,255,0)));
```
���ߣ�
```
background-image: linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.5) 25%,rgba(255,255,255,0));
```
����ɫ���䣬ǰ��λΪ͸���ȣ�00��ʾ��ȫ͸��
```
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#00ffffff');   
``` 
�ο�:
* [��cssʵ�ֽ���͸��Ч��](http://blog.163.com/123xin_xin/blog/static/33429735200991353125638/)
* [alpha filter (alpha channel)](http://www.tagindex.net/css/filter/alpha.html) 
* [���������CSS����](http://www.iefans.net/liulanqi-css-jianbian/)
* [ADDING TRANSPARENCIES AND GRADIENTS WITH CSS](http://www.webdesignerdepot.com/2010/11/adding-transparencies-and-gradients-with-css/)
* [CSS Gradients](https://css-tricks.com/css3-gradients/)

����ʵ�֣�
```
background-color: #ffffff;
filter:alpha(Opacity=70, finishOpacity=50, Style=1, startX=180, startY=0, finishX=180, finishY=30);
filter:alpha(Opacity=50, finishOpacity=0, Style=1, startX=180, startY=30, finishX=180, finishY=120);
background:-webkit-gradient(linear,left 100%,left 25%, from(rgba(255,255,255,0.7)), to(rgba(255,255,255,0.5)));
background:-webkit-gradient(linear,left 25%,left bottom, from(rgba(255,255,255,0.5)), to(rgba(255,255,255,0)));
```

### ��IE8��input text����������
* ����line-height = height ʹ�������ִ�ֱ����
* ��input text�Ҳ���ڰ�ťʱ��ʹ��border-right����padding-right���������������ֳ�������򳤶�ʱ�����������padding�����С�
```
    /*padding:0 52px 0 40px;*/
    
    padding-left:41px;  
    border-right: 53px solid transparent;  
```
�ο���
* [HTML: IE: Right padding in input text box](http://stackoverflow.com/questions/3765411/html-ie-right-padding-in-input-text-box)
* [Incorrect vertical alignment in IE8](http://stackoverflow.com/questions/3893256/incorrect-vertical-alignment-in-ie8)



















