<?php
header('Content-Type: text/javascript; charset=UTF-8');
session_start();
if (isset($_SESSION['nama'])){
	echo "{\"success\": true}";
}else{
    echo "{\"success\": false}";
}
?>
