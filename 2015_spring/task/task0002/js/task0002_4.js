var suggestData = ['a', 'abandon', 'abdomen', 'abide', 'ability', 'able', 'abnormal', 'aboard', 'abolish', 'abound', 'about', 'above', 'fiction', 'field', 'fierce', 'fight', 'test2', 'test3'];

var inputArea=$("input");
var ulArea=$("ul");

addEventListenerInput();
mouseEvent();


function addEventListenerInput(){
	if(inputArea.addEventListener){
		inputArea.addEventListener("input",onIinput);
	}else if(inputArea.attachEvent){
		inputArea.attachEvent("onpropertychange",onproChanged );
	}
}

function onIinput(e){
	var inputValue=e.target.value;
	//console.log(inputValue);
	handleEvent(inputValue);
}
function onproChanged(e){
	var inputValue="";
	if(e.propertyName.toLowerCase()=="value"){
		inputValue=e.srcElement.value;
		handleEvent(inputValue);
	}
}

function handleEvent(inputValue){
	var pattern=new RegExp("^"+inputValue,"i");
	var str="";
	if(inputValue==""){
		ulArea.style.display="none";
	}else{
		for(var i=0;i<suggestData.length;i++){
			if(suggestData[i].match(pattern)){
				str+="<li><span>"+inputValue+"</span>"+suggestData[i].slice(inputValue.length)+"</li>";
			}
		}
		ulArea.style.display="block";
		ulArea.innerHTML=str;
	}
	
}
function mouseEvent(){
	delegateEvent(ulArea,"li","mouseover",function(){
		addClass(this,"active");
	});
	delegateEvent(ulArea,"li","mouseout",function(){
		removeClass(this,"active");
	});
	delegateEvent(ulArea,"li","click",function(e){
		//removeClass(this,"active");
		console.log(this.innerHTML);
		var inputValue=deleteSpan(this.innerHTML);
		console.log(inputValue);
		inputArea.value=inputValue;
		ulArea.style.display="none";
	});
}

function deleteSpan(value){
	var pattern=/^<span>(\w+)<\/span>(\w*)$/;
	var str=value.match(pattern);
	return str[1]+str[2];
}
