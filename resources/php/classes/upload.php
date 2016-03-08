<?php
if(isset($_FILES)){
    $temp_file_name = $_FILES['foto-file']['tmp_name'];
    $original_file_name = "/var/www/notariat-git/foto/".$_POST['nama'].$_FILES['foto-file']['name'];
    if (move_uploaded_file($temp_file_name, $original_file_name)) {
        echo "{success: true,file:'".$_POST['nama'].$_FILES['foto-file']['name']."'}";
    } else {
        echo "{success: false,msg:'".$temp_file_name."'}";
    }
}
?>
