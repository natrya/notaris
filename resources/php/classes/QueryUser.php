<?php
include 'gembok.php';
class QueryUser
{
	private $_db;
	protected $_result;
	public $results;
	
    public function __construct()
    {
        $gembok= new konfig();
        $_db = new mysqli($gembok->ambilAlamat(), $gembok->ambilNama() ,$gembok->ambilPanggilan(), $gembok->ambilRumah());		
        if ($_db->connect_error) {
            die('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
        }
        return $_db;
    }
	
	public function getResults(stdClass $params)
    {
        $_db = $this->__construct();
        $results = array();  
        $mulai=$_db->real_escape_string($params->start);
        $banyak=$_db->real_escape_string($params->limit);
        $kriteria=$_db->real_escape_string($params->text);
        $query = "select count(idusr) as total from usr where username LIKE '".$kriteria."%';";
        $query.= "SELECT idusr,username,email,nohp,status,level,nama,foto FROM usr where username LIKE '".$kriteria."%' "." ORDER BY idusr ASC LIMIT ".$mulai.",".$banyak;
        if ($_db->multi_query($query)) {
            $i=0;
            do {
                if ($i==0){
                    $result = $_db->use_result(); 
                    $row = $result->fetch_row();
                    $total=$row[0];
                    $result->close();
                }else{
                    if ($result = $_db->use_result()) {
                        while ($row = $result->fetch_assoc()) {
                            $hasil[] = $row;
                        }
                        $result->close();
                    }
                }
                $i++;
            } while ($_db->next_result());
            $results['totalCount']=$total;
            $results['hasil']=$hasil;
        }
        return $results;
    }
    public function getResultsId(stdClass $params)
    {
        $_db = $this->__construct();
        $results = array();  
        $mulai=$_db->real_escape_string($params->start);
        $banyak=$_db->real_escape_string($params->limit);
        $query = "select count(idusr) as total from usr;";
        $query.= "SELECT idusr,username,email,nohp,status,level,nama,foto FROM usr LIMIT ".$mulai.",".$banyak;
        if ($_db->multi_query($query)) {
            $i=0;
            do {
                if ($i==0){
                    $result = $_db->use_result(); 
                    $row = $result->fetch_row();
                    $total=$row[0];
                    $result->close();
                }else{
                    if ($result = $_db->use_result()) {
                        while ($row = $result->fetch_assoc()) {
                            $hasil[] = $row;
                        }
                        $result->close();
                    }
                }
                $i++;
            } while ($_db->next_result());
            $results['totalCount']=$total;
            $results['hasil']=$hasil;
        }
        return $results;
    }
    public function createRecord(stdClass $params)
    {
        $_db = $this->__construct();
        if($stmt = $_db->prepare("INSERT INTO usr (username,email,nohp,status,level,nama,foto) VALUES (?,?,?,?,?,?,?)")) {
            $stmt->bind_param('sssiiss', $username,$email,$nohp,$status,$level,$nama,$foto);
            $username = $params->username;
            $email = $params->email;
            $nohp = $params->nohp;
            $status = (int)$params->status;
            $level = (int)$params->level;
            $nama = $params->nama;
            $foto = $params->foto;
            $stmt->execute();
            $params->iduser = $_db->insert_id;
            $stmt->close();
        }
        return $params;
    }
    public function updateRecords(stdClass $params)
	{
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE usr SET username=?,email=?,nohp=?,status=?,level=?,nama=?,foto=? WHERE idusr=?")) {
			$stmt->bind_param('sssiissi',$username,$email,$nohp,$status,$level,$nama,$foto,$idusr);
            $username = $params->username;
            $email = $params->email;
            $nohp = $params->nohp;
            $status = (int)$params->status;
            $level = (int)$params->level;
            $nama = $params->nama;
            $foto = $params->foto;
            $idusr = $params->idusr;
			$stmt->execute();
			$stmt->close();
		}
		return $params;
	}

	public function destroyRecord(stdClass $params)
	{
		$_db = $this->__construct();
		$idusr = $params->idusr;
		if(is_numeric($idusr)) {
			if($stmt = $_db->prepare("DELETE FROM usr WHERE idusr = ? LIMIT 1")) {
				$stmt->bind_param('i', $idusr);
				$stmt->execute();
				$stmt->close();
			}
		}
		return $params;
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
?>
