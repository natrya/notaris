<?php
include 'gembok.php';
class authLogin
{
	private $_db,$_un,$_ps;
	protected $_result;
	public $results;
	
	public function __construct()
	{
		$gembok = new konfig;
		$_db = new mysqli($gembok->ambilAlamat(), $gembok->ambilNama() ,$gembok->ambilPanggilan(), $gembok->ambilRumah());
		if ($_db->connect_error) {
			die('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		}
		return $_db;
	}
	public function jajal($_un,$_ps)
	{
		$_db = $this->__construct();
		if ($_result = $_db->query("select password,level,nama,username,email,nohp,foto,idusr from usr where username='$_un' and status=1;")){
			if ($_result->num_rows == 1){
				while ($row = $_result->fetch_row()) {
					if ($row[0]==$_ps){
						session_start();
                        $_SESSION['username']=$row[3];
						$_SESSION['level']=$row[1];
                        $_SESSION['nama']=$row[2];
                        $_SESSION['foto']=$row[6];
                        $_SESSION['id']=$row[7];
                        if ($row[1]==1){
                            $_SESSION['jabatan']="Administrator";
                        }else if($row[1]==2){
                            $_SESSION['jabatan']="Supervisor";
                        }else if($row[1]==3){
                            $_SESSION['jabatan']="User";
                        }else if($row[1]==4){
                            $_SESSION['jabatan']="Receptionist";
                        }else if($row[1]==5){
                            $_SESSION['jabatan']="Monitor";
                        }
                        echo "{\"success\": true,msg: 'Welcome Home....".$_SESSION['nama']."'}";
					}else{
						echo "{\"success\": false,\"errors\":[],msg: 'Salah password atau username tidak ada [code:ERR-PASS01]'}";
					}
				}
			}else{
				echo "{\"success\": false,\"errors\":[],msg: 'Salah password atau username tidak ada [code:ERR-PASS02]'}";
			}
			$_result->close();
		}

	}
	public function __destruct()
	{
		$_db = $this->__construct();
		$_db->close();
		unset($_result);
		unset($results);    
		return $this;
	}
}
$qdb = new authLogin();
$qdb->jajal($_POST['un'],$_POST['sandi']);
$qdb->__destruct();
?>
