<?php
 

$search=$_GET["search"];

//connect mysql , select database
$con=mysql_connect('localhost', 'root', 123456) or die("connect failed" . mysql_error());  
mysql_select_db('test', $con);  

$sql="select * from hint where hintName like '%".$search."%' ";
$rs=mysql_query($sql);
$i=0;
while($row=mysql_fetch_array($rs)){
	echo "<div data-hint-item='".$i."'>".$row['hintName']."</div>";
	$i++;
}
mysql_close($con);
?>