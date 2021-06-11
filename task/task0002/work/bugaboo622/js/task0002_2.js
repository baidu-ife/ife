$.click('#go',function(){
	var to = $('#to').value.split('-');
	var clk = setInterval(timer,1000);
	function timer () {
		var now = new Date();
		var date = new Date(to[0],to[1]-1,to[2],0,0,0,0);
		var distance = Math.floor( date - now )/1000;
		$('#clk p').innerHTML ='距离'+to[0]+'年'+to[1]+'月'+to[2]+'日还有:'
		if(distance<=0){
			clearInterval(clk);
			$('#clk p').innerHTML=''
			$('#show').innerHTML = '时间已过';
			return;
		}
		var day = Math.floor(distance / (3600 * 24));
        var hour = Math.floor((distance - day*3600*24) / 3600);
        var min = Math.floor((distance - day*3600*24 - hour*3600) / 60);
        var sec = Math.floor((distance - day*3600*24 - hour*3600) % 60);
	    $('#show').innerHTML = day+'天'+hour+'时'+min+'分'+sec+'秒';
		$.click('#go',function(){
			clearInterval(clk);
		});//用于在本次计时未结束时再次倒计时时清除上一次的定时器
	}
});