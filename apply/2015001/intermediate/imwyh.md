# 中级班报名表

请认真、如实、详细填写如下报名信息。
同时，为了避免您个人信息泄露，我们尽可能地避免让您填写过于隐私的信息

## 个人简介

（必填）姓名（若担心隐私问题可填写昵称）：王宇晗
（必填）学校：南昌大学
（必填）专业：土木工程
（必填）毕业时间：2016
（必填）学历：本科
（选填）家庭居住城市：南昌
（选填）未来期望工作城市：北上广

## 联系方式

（必填）Email：wyh@wedc.cc
（选填）联系电话：18679856734
（选填）QQ：313632987

## 关于前端

（必填）什么时候开始接触前端？因何接触？

	其实接触前段也是很简单的原因，为了和朋友之间开玩笑，在支付宝的页面F12改了余额数据装逼。
	就是这样很简单的原因：）看到自己一点点做出的东西，一种成就感油然而生。无论是写了多少行代码，无论是找出了一个多么不起眼的八阿哥，无论是分享了一个多小的片段，总是觉得很自豪。

（必填）你理解的前端是做些什么事情？
	
	掌握简单的PS操作技巧，将设计所作出的图片内容实体化，以网页为载体呈现给用户的信息交流以及数据交互工具。

（必填）你为什么要学习前端？
	
	原因和为什么接触前段挺像的，无比的一种成就感。
	嗯。。。虽然专业是土木工程，但是也许只有在玩模拟类游戏和码代码的时候能够“沉迷于其中”。作为一种“一开始就根本停不下来”的事情，有过在电脑面前连续呆十八个小时而不离开的记录。自己写过的网页，一旦开始做，基本上生活只有睡觉和敲键盘两件事。
	也认识很多像我一样，即使专业差的远，但是热爱前段，以码代码为享受的人。
	至于后来逐渐有了自己博客。看到很多很多不满意的地方，于是自己改动了很多地方，也感到了自己的不足，很多力不从心的地方，只能用很投机取巧的方式使得“能用”，因此哪怕看到自己写的代码，总觉得能够有所改进却无从下手。而不规范的书写习惯，以及毫无协同工作的经验，毫无疑问以后很难有机会转行。
	所以有这次机会毫无疑问的必须报名啊。

（必填）介绍一个你做过的最复杂的前端项目，其中遇到最困难的技术问题是什么，你如何解决的？
	
	很痛苦的是缺少练习以及系统的学习经历。
	自己所学均从W3School自学，东西杂并且容易忘记。
	也许是类似于爬虫记录百度贴吧的发帖记录并记录在MYSQL。当时不会其他语言，只能非常讨巧的使用PHP+浏览器解决问题。
	原理是利用本机作为php服务器，file_get_contents()函数获取到对应帖子内容并在网页中加入自己一小段JS代码。该段代码通过查找指定对象内text内容，存于数组中，再利用AJAX发送给本机php程序中另一个路径，最后自动跳转到帖号+x的下一个页面。使用浏览器打开后，发现不能发送。经过自己在控制台窗口中各种测试，发现是贴吧的JQ不是原始的文件，而是修改过的jquery-1.9.1.min.js。因为该JS是加密压缩的，没法获得修改的内容，只能在PHP中替换改JQ的URL。而后经过测试，发现楼中楼内容不能正常获取。一番分析后发现，楼中楼是AJAX加载，但请求域名不是locohost，因此所有请求都失败了。所以搭建了局域网内A电脑作为PHP服务器，B电脑的tieba.baidu.com指向B电脑。以下为写的JQ内容：

	//author是用户名数组
	//content是内容数组
	//pageID是百度贴吧页码id
	var floor = Array();//add
	var author = Array();
	var content = Array();
	var lzl_floor = Array();//add
	var lzl_author = Array();//add
	var lzl_content = Array();//add
	var author_temp = "";
	var lzl_author_temp = "";//add
	var v0 = 0;//num
	var v = 0;//floor num
	var pageID = window.location.pathname.substr(3);//获取页码Id
	//写入数据到数组中

	for(author_no in $(".p_author_name")){
	author_temp = $(".p_author_name").eq(author_no).text();
	if((author_temp==null)||(author_temp=="")||(author_temp.indexOf("贴吧游戏")!=-1)) continue;
	floor[v] = v+1;
	author[v] = author_temp;
	content[v] = $(".p_author_name").eq(v).parents(".l_post").find(".d_post_content").text();
	lzl_author_temp = $(".p_author_name").eq(v).parents(".l_post").find(".j_user_card").text();
	if(lzl_author_temp!=""&&lzl_author_temp!=""){
	var lzl = $(".p_author_name").eq(v).parents(".l_post").find(".j_lzl_m_w");
	}
	v++;
	}
	scroll();//获取楼中楼
	function scroll(){
	if( $(document).scrollTop()>$('body').height()- $(window).height()-100) {main();return;}//检测是否滚动到底部
	$('body,html').animate({scrollTop: '+=' + $(window).height()},100);//滚动页面
	setTimeout("scroll();",200);//循环
	}
	function main(){
	for(author_no in $(".p_author_name")){
	author_temp = $(".p_author_name").eq(author_no).text();
	if((author_temp==null)||(author_temp=="")||(author_temp.indexOf("贴吧游戏")!=-1)) continue;
	var tag = $(".p_author_name").eq(v).parents(".l_post");
	floor[v0] = v+1;
	author[v0] = author_temp;
	content[v0] = tag.find(".d_post_content").text();
	lzl_floor[v0] = 0;
	lzl_author[v0] = " ";
	lzl_content[v0] = " ";
	lzl_author_temp = tag.find(".j_lzl_m_w").find(".j_user_card").text();
	v0++;
	if(lzl_author_temp!=""&&lzl_author_temp!=null){
	var lzl = tag.find(".j_lzl_m_w");
	for(lzl_author_no in lzl.find(".lzl_cnt")){
	if(lzl_author_no=="length")break;
	floor[v0] = v+1;
	author[v0] = author_temp;
	content[v0] = content[v0-1];
	lzl_floor[v0] = 1+parseInt(lzl_author_no);
	lzl_author[v0] = lzl.find(".j_user_card").eq(lzl_author_no).text();
	lzl_content[v0] = lzl.find(".lzl_content_main").eq(lzl_author_no).text();
	v0++;
	}
	}
	v++;
	}
	communicate();
	}
	var num = 0;
	function communicate(){
	if(num > v0-1) {
	pageID++;
	window.location.href = "/p/"+pageID;
	return;
	}
	//alert(pageID+"\n"+author[num]+"\n"+content[num])
	$.get('/get.php',{pageID:pageID,floor:floor[num],author:author[num],content:content[num],lzl_floor:lzl_floor[num],lzl_author:lzl_author[num],lzl_content:lzl_content[num]});
	num++;
	//每200毫秒发送一次数据到数据库
	setTimeout('communicate()',50);
	}
	setTimeout("pageID++;window.location.href = "/p/"+pageID;",30000);//页面超时处理

（必填）你自我评价当前你的前端技术能力如何，可以举一些详细的例子来描述能力水平

	很杂，会点前段会点后台，优势是能够知道后台的需求，劣势是没有系统的学习，东西容易忘记，很多内置函数需要百度查询，很多明明有内置函数的却不知道它的存在，经常自己写个挺复杂的没用的内置函数出来。
	具体事例：
	自己做的第一个完整的网页吧：http://wyhspace.qiniudn.com/nav.html
	仿百度：http://wedc.cc/practice/baidu/
	JSONP加载当地天气信息1：http://blog.wedc.cc/article/1127.html
	JSONP加载当地天气信息2：http://blog.wedc.cc/article/1172.html
	这个页面从PS到前段到后台都是自己写的，设计的不好，只是JQ功能的练习以及熟悉：http://life.wedc.cc/
