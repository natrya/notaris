<?php
include 'gembok.php';
class QueryOfficer
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
        $query = "select count(idofficer) as total from officer where nama LIKE '".$kriteria."%';";
        $query.= "SELECT idofficer,keterangan,catatan,status,nama FROM officer where nama LIKE '".$kriteria."%' "." ORDER BY idofficer ASC LIMIT ".$mulai.",".$banyak;
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
        $q = $_db->real_escape_string($params->q);
        $query = "select count(idofficer) as total from officer where nama like '%".$q."%';";
        $query.= "SELECT idofficer,nama FROM officer where nama like '%".$q."%' LIMIT ".$mulai.",".$banyak;
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
        if($stmt = $_db->prepare("INSERT INTO officer (keterangan,catatan,status,nama) VALUES (?,?,1,?)")) {
            $stmt->bind_param('sss', $keterangan,$catatan,$nama);
            $keterangan = $params->keterangan;
            $catatan = $params->catatan;
            $nama = $params->nama;
            $stmt->execute();
            $params->idofficer = $_db->insert_id;
            $stmt->close();
        }
        return $params;
    }
    public function updateRecords(stdClass $params)
	{
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE officer SET keterangan=?,catatan=?,status=?,nama=? WHERE idofficer=?")) {
			$stmt->bind_param('ssisi',$keterangan,$catatan,$status,$nama,$idofficer);
            $keterangan = $params->keterangan;
            $catatan = $params->catatan;
            $status = (int)$params->status;
            $nama = $params->nama;
            $idofficer = (int)$params->idofficer;
			$stmt->execute();
			$stmt->close();
		}
		return $params;
	}

	public function destroyRecord(stdClass $params)
	{
		$_db = $this->__construct();
		$idofficer = $params->idofficer;
		if(is_numeric($idofficer)) {
			if($stmt = $_db->prepare("DELETE FROM officer WHERE idofficer = ? LIMIT 1")) {
				$stmt->bind_param('i', $idofficer);
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
