//第一阶段
	var mybtn = document.getElementById("btn");
	mybtn.onclick = function(){
		//alert("nihao");
		var str = document.getElementById("input").value,
			list,ptag;
		if(str != ""){
			list = str.split(',');
			ptag = document.createElement('p');
			ptag.setAttribute('id','p_1');
			ptag.innerText = list.join(',');
			var p_1 = document.getElementById("p_1");
			if(p_1){
				p_1.parentNode.removeChild(p_1);
			}
			mybtn.parentNode.appendChild(ptag);
		}

	};

//第二阶段
	var mybtn_2 = document.getElementById("btn_2");
	mybtn_2.onclick = function(){
		var str = document.getElementById("textarea").value,
			list,ptag;
		if(str != ""){
			str = trim(str);
			list = str.split(/[',','，','、',';','；','\s+']/);
			ptag = document.createElement('p');
			ptag.setAttribute('id','p_2');
			ptag.innerText = list.join(',');
			var p_2 = document.getElementById("p_2");
			if(p_2){
				p_2.parentNode.removeChild(p_2);
			}
			mybtn_2.parentNode.appendChild(ptag);
		}
//		mybtn.addEventListener("click",function(){
//			alert("hah");
//		});
	};

//第三阶段
var mybtn_3 = document.getElementById("btn_3");
	mybtn_3.onclick = function(){
		var str = document.getElementById("textarea_3").value,
			list,ptag;
		if(str != ""){
			str = trim(str);
			list = str.split(/[',','，','、',';','；','\s+']/);
			ptag = document.createElement('p');
			ptag.setAttribute('id','p_3');
			if(list.length>10){
				ptag.innerText = "爱好数量不能超过10个";
				mybtn_3.parentNode.appendChild(ptag);
			}
			else{
				var innerHtml="";
				each(list,function(value){
					innerHtml = innerHtml + value + "<input type='checkbox'>";
				});
		       	ptag.innerHTML = innerHtml;
			}
			
			var p_3 = document.getElementById("p_3");
			if(p_3){
				p_3.parentNode.removeChild(p_3);
			}
			mybtn_3.parentNode.appendChild(ptag);
		}
		else{
			ptag = document.createElement('p');
			ptag.setAttribute('id','p_3');
			ptag.innerText = "出错，输入不能为空";
			var p_3 = document.getElementById("p_3");
			if(p_3){
				p_3.parentNode.removeChild(p_3);
			}
			mybtn_3.parentNode.appendChild(ptag);
		}
	};