<?php
//设置页面内容是HTML，编码格式是utf-8
header("Content-Type:text/plain;charset=utf-8");

if($_SERVER['REQUEST_METHOD'] == 'GET'){
	if(!isset($_GET['name'])){
		echo "参数错误";
		return;
	}
	echo $_GET['name'];
}else if($_SERVER['REQUEST_METHOD'] == 'POST'){
	if(!isset($_POST['name']) || !isset($_POST['password'])){
		echo "参数错误";
		return;
	}
	echo 'name:'.$_POST['name'].',密码:'.$_POST['password'];
}

?>