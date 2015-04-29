#task02学习笔记
##积累
###深度克隆  
当需要克隆的对象是对象和数组的时候，需要进行深度克隆，在改变克隆后的对象时才不会影响原对象。   
方法是通过递归克隆所有属性和方法，或数组中的元素。   

###正则表达式  
^和$的用处：之前一直不太明白这两个的用处，觉得可有可无，不清楚开始和结束标识的意思。现在知道就是在需要检验的字符串中开始结尾不能再比^和$包含的正则表达式多出内容，否则不匹配。  
如果正则表达式中需要用到变量，则必须使用 `new RegExp()`  
`$1` 的用法：在做属性选择器的时候，需要匹配 `[type=XXX]`，想法就是用正则来找到`[ ] `，然后就涉及到一个问题，要去掉中括号保留中括号里面的字符串，这时候就可以用到`$1`， 具体做法是 `selector.replace(/\[([^\[\]]*)\]/, '$1')`。

###DOM0事件和DOM2事件
DOM0事件是handler例如：`foo.onclick = fn`
DOM2是事件监听例如：`addEventListener('click', fn, false)` IE下是 `attachEvent('onclick', fn)`
区别在于， DOM2 监听事件可以让多个函数响应一个事件而DOM0 事件处理器不行  
DOM0清除事件直接赋值null，DOM2清除所有事件则需要复制原DOM

###AJAX
如果`type = get` 则 `send`的数据直接在url上  
如果`type = post` 则将需要`send(data)`,data可以是用&连接的字符串，或者键值对象。并且需要 `xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")`

