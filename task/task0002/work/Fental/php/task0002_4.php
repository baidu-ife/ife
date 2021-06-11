<?php
/**
 * Created by PhpStorm.
 * User: T
 * Date: 2015/4/21
 * Time: 20:41
 */
$info = $_REQUEST["content"];
//$info = "test";
$result = array();
for ($i = 0; $i < 3; $i++) {
    $suffix = rand();
    $result[$i] = "$info$suffix";
}
echo json_encode($result);