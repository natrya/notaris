<?php
header('Content-Type: text/javascript;charset=UTF-8');
session_start();
if ($_SESSION['nama']==""){
	//echo "window.location.href=\"login.html\";";
}else{
	include 'auth.php';
	$auth=new auth();
	echo "Ext.define('Dataku',{singleton: true, nama:'".$_SESSION['nama']."',idpg:'".$_SESSION['id']."',jabatan:'".$_SESSION['jabatan']."',foto:'".$_SESSION['foto']."'";
	echo "});";
}
?>
