<?php
if(isset($_FILES)){
    $temp_file_name = $_FILES['nama-file']['tmp_name'];
    $original_file_name = "/var/www/notariat-git/dok/".$_POST['nama'];
    if (move_uploaded_file($temp_file_name, $original_file_name)) {
        echo "{success: true,file:'".$_POST['nama']."'}";
    } else {
        echo "{success: false,msg:'".$temp_file_name."'}";
    }
}
?>
