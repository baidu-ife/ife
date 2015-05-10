$(function(){

$(".add-category").click(function(){
	var addedCat = prompt("添加的类名", "TO DO");
	if(addedCat == null) {
		alert("您没有添加任何分类");
		return;
	}
	var catUl = $('.task-category h5.active').parent();	
	if(catUl.find('ul').hasClass('category-name')){
		console.log('yes');
		catUl.find('ul.category-name').append('<li>'
			+ '<h5><i class="demo-icon icon-folder-open">&#xe800;</i>'
			+ addedCat + '（<span class="task-num">0</span>)</h5>'
			+ '<ul class="sub-category-name">'
			+ '</ul></li>'
		);
	} else if(catUl.find('ul').hasClass('sub-category-name')) {
		catUl.find('ul.sub-category-name').append('<li>'
			+ '<i class="demo-icon">&#xe802;</i>'
			+ addedCat
			+ '(<span class="sub-task-num">0</span>)</li>'
		);
	}
})


$(".category-name li h5").click(function(){
	$(this).parent().find(".sub-category-name").toggle();
	var icon = $(this).parent().find('h5 i');
	if(icon.hasClass('icon-folder-open')){
		icon.html('&#xe801;');
		icon.removeClass('icon-folder-open');
	} else {
		icon.addClass('icon-folder-open');
		icon.html('&#xe800;');
	}
});


$('.task-category h5').click(function(){
	$('.task-category h5').removeClass('active');
	console.log($(this));
	$(this).addClass('active');
})




})