<?php
include 'gembok.php';
class updatepass
{
	private $_db,$_op,$_ps;
	protected $_result,$resultn;
	
	public function __construct()
	{
		$gembok = new konfig;
		$_db = new mysqli($gembok->ambilAlamat(), $gembok->ambilNama() ,$gembok->ambilPanggilan(), $gembok->ambilRumah());
		if ($_db->connect_error) {
			die('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		}
		return $_db;
	}
    public function jajal($_op,$_ps)
    {
        $_db = $this->__construct();
        $_op = $_db->real_escape_string($_op);
        $_ps = $_db->real_escape_string($_ps);
        if ($_result = $_db->query("select password from usr where idusr=".$_SESSION['id']." and status=1;")){
            if ($_result->num_rows == 1){
                while ($row = $_result->fetch_row()) {
                    if ($row[0]==$_op){
                        if ($_resultn = $_db->query("update usr set password='$_ps' where idusr=".$_SESSION['id']." and status=1;")){
                            echo "{\"success\": true,msg: 'Password sudah terupdate'}";
                        }else{
                            echo "{\"success\": false,msg: 'ada masalah dengan penyimpanan di database'}";
                        }
                    }else{
                        echo "{\"success\": false,\"errors\":[],msg: 'password Lama salah/tidak terkirim'}";
                    }
                }
            }else{
                echo "{\"success\": false,\"errors\":[],msg: 'user tidak aktif atau user tidak ada'}";
            }
            $_result->close();
        }

    }
    public function __destruct()
    {
        $_db = $this->__construct();
        $_db->close();
        unset($_result);
        unset($_resultn);
        return $this;
    }
}
session_start();
if ($_SESSION['id']!=""){
    $qdb = new updatepass();
    $qdb->jajal($_POST['oldpassword'],$_POST['newpassword']);
    $qdb->__destruct();
}
?>
