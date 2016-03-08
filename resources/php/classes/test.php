<?php
session_start();
if (isset($_SESSION['nama'])){
}else{
    header('HTTP/1.0 403 Forbidden');
}
?>
