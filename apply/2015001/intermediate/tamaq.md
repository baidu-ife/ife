# 中级班报名表

请认真、如实、详细填写如下报名信息。
同时，为了避免您个人信息泄露，我们尽可能地避免让您填写过于隐私的信息

## 个人简介

（必填）姓名（若担心隐私问题可填写昵称）：谭溟钦

（必填）学校：深圳大学（现在在美国密苏里大学交换中）

（必填）专业：计算机科学
  
（必填）毕业时间：2016年12月

（必填）学历：本科

（选填）家庭居住城市：深圳

（选填）未来期望工作城市：

## 联系方式

（必填）Email：tanmingqin33@gmail.com

（选填）联系电话：

（选填）QQ：562944394

## 关于前端

（必填）什么时候开始接触前端？因何接触？

  - 2014年2月寒假期间开始接触前端
  - 原因有两个：
  
    1. 当时还差一个学期大二就结束了，自己认为必须找到一个能够坚持的技术方向，同时正好在知乎上看到前端相关的问答，后来上W3SCHOOL进行了简要了解之后产生了兴趣。
    2. 大二上学期开始在Coursera上学习了一门Python入门课程，对动态类型的编程语言产生兴趣，寒假就买了一本Javascript高级程序设计回家看了。

（必填）你理解的前端是做些什么事情？
  
  - 我认为前端的基础任务就是：
  
    1. 使用HTML, CSS, Javascript对网页设计稿进行实现以及兼容各种浏览器版本。
  
    2. 利用AJAX与后端进行数据交互。
  
    3. 能够使用Angular，JQuery，Bootstrap等框架进行快速开发
    
  - 此外还有
  
    1. 利用Mocha，Jasmine等测试框架于前端代码进行测试。
    
    2. 利用Grunt.js进行自动化部署。
    
    3. 利用PhoneGap进行混合应用开发
    
    4. 利用Node进行一些服务器端开发。
    
    5. 利用HTML5进行网页游戏开发。

（必填）你为什么要学习前端？
    
  -  学习前端的主要原因是我认为前端是所有开发类型的工作中最有趣的。前端开发跟界面有很大关系，写出来的代码马上就能在浏览器中显示出效果来。自己本身也比较喜欢各种好看的界面，能够自己实现的话会非常满足。动态类型的Javascript也非常有趣，写起来也顺手。本来其实自己是想学整套Web开发技术的，因为喜欢界面就先学了前端，后来发现还可以用Node写后端，感觉写JS确实能够有做很多有意思的事。此外，前端这个职业本身的重要程度也在日益增加，这也是非常鼓励人的一件事情。
    
（必填）介绍一个你做过的最复杂的前端项目，其中遇到最困难的技术问题是什么，你如何解决的？

   我认为自己做过的最复杂的一个前端应用就是百词斩的一个实习测试。该测试要求能够实现一个英文句子的拖拽与匹配，其中用到了HTML5的拖拽API。这个应用中的HTML和css都很简单，主要复杂一点的逻辑都在javascript里面。由于之前看过一本HTML5应用的书中有讲过拖拽，于是这部分就解决了。我认为最困难的部分应该是实现英文句子的复读，这需要对每一个单词按照顺序进行高亮。于是我打算用setInterval来对每个元素进行一定时间的高亮。但是setInterval的第一个参数又只能是函数名，这样的话就不能对不同的元素应用函数了。因为刚好当时学了一点函数式编程，这里我就用了函数currying，就像这样
  
      function replayTree() {
      	resetStyle();
      	var wordsElem = document.getElementsByClassName("show")[0];
      	addClass(wordsElem, "replay");	
      	setTimeout(intervalPlay(wordsElem), 1500);			
      }
      
      //函数currying
      
      function intervalPlay(words) {
      	if(words == null) {
      		//递归到了词法树的最后一个节点，返回
      		
      		return;
      	}
      	return function() {		
      		console.log("Asd");
      		//重置当前元素的类名
      		words.className = "show words";
      
      		//移动至下一个元素
      		if(words.nextElementSibling) {
      			addClass(words.nextElementSibling, "replay");
      		}	
      		//然后设置间歇效果
      		var timeoutId = setTimeout(intervalPlay(words.nextElementSibling), 1500);
      
      		//然后把该setTimeout的id放入全局数组中，以便在一次replay没有结束时再次点击replay的时候取消前一次replay的setTimeout
      		timeoutIdArray.unshift(timeoutId);	
      	};		
      }
	
（必填）你自我评价当前你的前端技术能力如何，可以举一些详细的例子来描述能力水平

  - 我认为自己的前端技术能力还在初级理论阶段，因为自己主要都是在看书学习，实际项目其实非常少，有一种不清楚方向的感觉。
    - 现阶段我能够完成基础的页面，包含导航栏，各种表单等等（有一个用bootstrap写的模仿网易云音乐首页的页面）。
    - 能够使用AngularJS写一点简单地应用（一个能够登陆注册的二手车交易网页）。
    - 能够使用HTML5的各种API写简单应用（上面说的拖拽应用；自己还写过一个html5视频处理应用）

  以上网页应用我都放到了github上，谢谢。
