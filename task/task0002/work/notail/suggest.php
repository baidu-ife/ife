<?php
$input = $_POST["input"];
$arr = array("text","text123","text000","ted","test","html","css","javascript","node.js"); 
$sug_arr = array();
foreach ($arr as $val) {
	if(stristr($val,$input)){
		$sug_arr[] = $val; 
	}
}
echo json_encode($sug_arr);
?>