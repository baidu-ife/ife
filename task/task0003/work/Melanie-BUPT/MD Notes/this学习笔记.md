#this学习笔记#

----------
* this详解
* this的四种用法
* 作用域之this

----------

##this详解##

**this和执行环境有关**，和声明环境无关。

一般而言，在JavaScript中，this指向函数执行时的当前对象。当没有明确的执行时的当前对象时，this指向全局对象window。（JavaScript中的this是动态绑定的）

###setTimeOut、setInterval和匿名函数###

在浏览器中，setTimeOut、setInterval和匿名函数执行时的**当前对象是全局对象window**。

###eval函数###

eval函数在执行时的作用域是**当前作用域**，所以this并非指向window，而是当前作用域的对象，即等同于在eval函数这一行将里面的代码填进去。

    var name = "window";
    
    var Bob = {
    	name: "Bob",
    	showName: function(){
    		eval("alert(this.name)");
    	}
    };
    
    Bob.showName();		//Bob

###apply和call函数（第四种用法）###

apply和call函数能够强制改变函数执行时的当前对象，让this指向其他对象。当没有参数时，当前对象为window；有参数时，当前对象为该参数。两个函数之间只是参数的传递方式不同。apply函数使用数组统一传入后面的参数，call函数则是分开传入的。

###new关键字（第三种用法）###

new关键字后的构造函数中的this指向用该构造函数构造出来的**新对象**。

##this的四种用法##

###1. 纯粹的函数调用###

在声明函数后直接进行**全局性的调用**，此时的this代表**全局对象**Global。但这种情况下，往往相当于隐式的声明了一个全局变量。例如：

    function test（） {
		this.x = 1;
		alert(this.x);
	}

	test();		//1

另外，对于内部函数来说，this应当是绑定到其外层函数对应的对象上。所以，一般来说，需要进行变量替代，即将this赋值给变量that。例如：

	var name = "Bob";  
	var nameObj ={  
    	name : "Tom",  
    	showName : function(){  
        	alert(this.name);  
    	},  
    	waitShowName : function(){
			//进行变量替代
        	var that = this;
        	setTimeout(function(){
            	that.showName();
        	}, 1000);
    	}
	}; 
 
	nameObj.waitShowName();　　//Tom

###2. 作为对象方法的调用###

当函数作为某个**对象的方法调用**时，this指的是这个**上级对象**。例如：

    function test() {
		alert(this.x);
	}

	var o = {};
	o.x = 1;
	o.m = test;
	o.m();		//1

###3. 作为构造函数调用###

当函数作为**构造函数**（构造函数一般以大写字母开头）时，如果通过这个函数生成了一个新对象（object），则this指的就是这个**新对象**。例如：

	function test() {
		this.x = 1;
	}

	var o = new test();
	alert(o.x);		//1

###4. apply调用###

apply函数是函数对象的一个方法，它的作用是改变函数的调用对象。它的第一个参数就表示改变后的调用这个函数的对象，即this所指的对象。apply的参数为空时，默认调用全局对象。例如：

	var x = 0;
	
	function test() {
		alert(this.x);
	}

	var o = {};
	o.x = 1;
	o.m = test;

	o.m.apply();	//0
	o.m.apply(o);	//1

##作用域之this##

JavaScript 中的函数既可以被当作普通函数执行，也可以作为对象的方法执行，这是导致 this 含义如此丰富的主要原因。

一个函数被执行时，会创建一个执行环境（ExecutionContext），函数的所有的行为均发生在此执行环境中。

构建该执行环境时，JavaScript 首先会创建 arguments变量，其中包含调用函数时传入的参数。接下来创建作用域链。

然后初始化变量，首先初始化函数的形参表，值为 arguments变量中对应的值，如果 arguments变量中没有对应值，则该形参初始化为 undefined。如果该函数中含有内部函数，则初始化这些内部函数。如果没有，继续初始化该函数内定义的局部变量，需要注意的是此时这些变量初始化为 undefined，其赋值操作在执行环境（ExecutionContext）创建成功后，函数执行时才会执行。

最后为 this变量赋值，会根据函数调用方式的不同，赋给 this全局对象，当前对象等。

至此函数的执行环境（ExecutionContext）创建成功，函数开始逐行执行，所需变量均从之前构建好的执行环境（ExecutionContext）中读取。