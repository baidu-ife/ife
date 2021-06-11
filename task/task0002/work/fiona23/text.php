<?php
$searchinput = $_POST["searchinput"];
@ $db = new mysqli('localhost', 'root', '', 'text');
//$db->select_db('text');
if (mysqli_connect_errno()) {
    echo "error:can not connect database";
}
$query = "select * from text where fdata like'".$searchinput."%' ";
$result = $db->query($query);
$num_results = $result->num_rows;
echo "<ul>";
for ($i=0; $i < $num_results; $i++) { 
    $row = $result->fetch_assoc();
    echo "<li>".$row['fdata']."</li>";
}
echo "</ul>";
?>