    按照HTML5标准中的HTML语法规则，如果在</body>后再出现<script>或任何元素的开始标签，都是parse error，浏览器会忽略之前的</body>，即视作仍旧在body内。所以实际效果和写在</body>之前是没有区别的。

    实现深复制时就被作用域坑了


    DOM。。。

    http://stackoverflow.com/questions/7935689/what-is-the-difference-between-children-and-childnodes-in-javascript child和children有啥区别

    element没有getElementById
    document没有getAttributes
    hasAttributes和hasAttribute。。。
    递归忘了返回值
    for xx in children呵呵了，还是for i++没有出现后面的很多东西。i说明children中有些不该enumerable的东西也enumerable了。js太灵活了= =

    http://xahlee.info/js/js.html
    http://xahlee.info/js/scripting_web_index.html

split这种。。。
> "a, b".split(/ |,/)
[ 'a', '', 'b' ]

忘了几件事。getElementsByClassName不是所有浏览器都有的。。。于是把mini query又重新用递归实现了遍

还有个问题，就是事件机制只做了w3c标准的，IE都没管。。。


定时器忘了按钮按下时清除旧的定时器，结果不停花

setInterval接受函数

offsetWidth这种东西必须已经渲染了才有。。。

在循环中使用addEvent，当绑定监听器引用循环中变量，绑定在被激发时才会引用该变量, setInterval也是这样。这就是闭包？

当-left过大时，没设置overflow:hidden结果就是动画时出现滚动条

定时器设计问题，因该setTimeout还是Interval，什么时候该清除

> [] === []
false
> [] == []
false
> 

> undefined == null
true
> undefined === null
false

各种bug。

keyup监测内容是否变化->

没变化就检查上下和回车。回车则返回

我到底计算的是相对哪里的距离.......

bug: 如果松开的时候是在另一个container内或者超出document范围，则不响应document.mouseup事件，结果就是block可以不用按下鼠标移动。最后用判断鼠标移动超出范围就将block回退到原始位置，就好像block自己掉了回去一样。

说说感想，设计高于代码。不代码只有渣一样的设计。
