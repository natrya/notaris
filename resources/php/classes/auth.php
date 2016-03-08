<?php
include 'gembok.php';
class auth
{
    private $_db;
    protected $_result,$_result2;

    public function __construct()
    {
        $gembok = new konfig;
        $_db = new mysqli($gembok->ambilAlamat(), $gembok->ambilNama() ,$gembok->ambilPanggilan(), $gembok->ambilRumah());
        if ($_db->connect_error) {
            die('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
        }
        return $_db;
    }
    public function cekAkses($id,$modul,$aksi)
    {
        $hasilCek=false;
        $_db = $this->__construct();
        if ($_result = $_db->query("select id_action from auth_psw where idpsw=".$id." and id_module=".$modul." and id_action=".$aksi.";")){
            if ($_result->num_rows == 1){
                $hasilCek=true;		
            }else{
                $hasilCek=false;
            }
            $_result->close();
        }
        return $hasilCek;
    }
    public function getMenu($idrole)
    {
        $dashboard = array('text' => 'Dashboard', 'view' => 'dashboard.Dashboard','leaf'=> true,'iconCls' => 'right-icon new-icon x-fa fa-desktop','routeId' => 'dashboard');
        $user = array('text' => 'Setup User', 'view' => 'user.SetupUser','leaf'=> true,'iconCls' => 'x-fa fa-users','routeId' => 'setup');
        $role = array('text' => 'Role', 'view' => 'user.Gridrole','leaf'=> true,'iconCls' => 'x-fa fa-users','routeId' => 'role');
        $profile = array('text' => 'Profile', 'view' => 'profile.UserProfile','leaf'=> true,'iconCls' => 'x-fa fa-user','routeId' => 'profile');
        $test = array('text' => 'Test', 'view' => 'user.Test','leaf'=> true,'iconCls' => 'x-fa fa-bell','routeId' => 'usertest');

        if ($idrole == 1){
            $menu = array($dashboard,$role,$user,$profile,$test);
        }elseif ($idrole == 2){
            $menu = array ($profile);
        }elseif ($idrole == 3){
            $menu = array ($profile);
        }
        return json_encode($menu);
    }
    public function __destruct()
    {
        $_db = $this->__construct();
        $_db->close();
        unset($_result);
        return $this;
    }

}
//$jajal=new auth();
//echo $jajal->getCtrl(1);
//$jajal->__destruct();
?>
