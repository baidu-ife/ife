# 中级班报名表

请认真、如实、详细填写如下报名信息。
同时，为了避免您个人信息泄露，我们尽可能地避免让您填写过于隐私的信息

## 个人简介

（必填）姓名（若担心隐私问题可填写昵称）：李正
（必填）学校：哈尔滨工程大学
（必填）专业：软件工程
（必填）毕业时间：2016年6月
（必填）学历：硕士研究生
（选填）家庭居住城市：武汉
（选填）未来期望工作城市：北京

## 联系方式

（必填）Email：lizhengnacl@163.com
（选填）联系电话：18686768624
（选填）QQ：717166458

## 关于前端

（必填）什么时候开始接触前端？因何接触？

	本科毕设题目为《基于Web的教师工作量管理系统》。刚开始学的是PHP和MySQL做动态网页，感觉页面太难看，于是开始学习HTML、CSS。期间了解到jQuery，使用一段时间后不满足于库的使用，于是开始JS的源码学习，然后一发不可收拾。

（必填）你理解的前端是做些什么事情？

	给一个丑陋的商品打造一件华丽的外衣，让用户一见钟情，提升用户体验。

（必填）你为什么要学习前端？

	一见钟情。已经热恋大半年，感情还在继续升温中。

（必填）介绍一个你做过的最复杂的前端项目，其中遇到最困难的技术问题是什么，你如何解决的？
	
	目前还没有特别前端的项目，不过过段时间会出一个以Node为服务器后端的前端小作品。

	http://www.lizweb.me/heu/htdocs/login.php
	普通教师账号：2010211188
	;密码：123
	<!-- 这个';'去掉就乱码是怎么回事？ -->

	这个链接对象就是本科毕设现学现做的东西。除了界面现在看着还是挺舒服之外，别的已经没有什么值得称赞的了。
	不过，一个作品自己独立完成之后，对前后端整体把握上倒是挺有帮助的。
	从最开始的直接改后缀点击运行，到后来的本地配置调式，然后买域名空间挂到网上，然后最近的Node学习。一步一步的深入，这种充实、满足感是很让人上瘾的。

（必填）你自我评价当前你的前端技术能力如何，可以举一些详细的例子来描述能力水平

	刚过的寒假投过一次百度实习简历，由于实习期不满足，未能如愿。面试官评价基础知识扎实，并留下手机号说如果以后想实习可以试着联系他。

	<!-- JavaScript -->
	一个闭包的例子。


	你可以使用匿名函数像下面这样。

	var btn = document.getElementsByTagName('button'),
        len = btn.length,
        i;

    for (i = 0; i < len; i += 1) {
        btn[i].onclick = (function(i) {
            return function() {
                console.log(i);
            };
        })(i);
    }

    但是老道推荐这么做。

    for (i = 0; i < len; i += 1) {
        btn[i].onclick = handler(i);
    }

    function handler(i){
    	return function(){
    		console.log(i);
    	};
    }


    一个原型链的问题。
    http://lizweb.me/post/47e07c_60afe0e
    这个链接的内容是之前捣鼓出的一张，chrome中的关于普通对象、函数以及其涉及到的原型之间的关系的关系图。

    <!-- CSS -->
    一个div做的开关样式。
    div{
        width: 30px;
        height: 20px;
        border: 2px solid #eee;
        border-radius: 10px;
        background-color: #64bc63;
        position: relative;
    }
    div::after{
        content: '';
        display: block;
        width: 13px;
        height: 18px;
        border: 1px solid #eee;
        background-color: white;
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
    }