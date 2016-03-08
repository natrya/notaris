<?php
include 'gembok.php';
class QueryKlien
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
        $query = "select count(idklien) as total from klien where nama LIKE '".$kriteria."%';";
        $query.= "SELECT idklien,k.nama,b.nama as namakota,email,telp,alamat,k.idkota,tgl_daftar,catatan FROM klien k left join m_kabkota b on k.idkota=b.idkota where k.nama LIKE '".$kriteria."%' "." ORDER BY idklien ASC LIMIT ".$mulai.",".$banyak;
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
        $query = "select count(idklien) as total from klien where nama like '%".$q."%';";
        $query.= "SELECT idklien,nama FROM klien where nama like '%".$q."%' LIMIT ".$mulai.",".$banyak;
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
        if($stmt = $_db->prepare("INSERT INTO klien (nama,email,telp,alamat,idkota,catatan) VALUES (?,?,?,?,?,?)")) {
            $stmt->bind_param('ssssis', $nama,$email,$telp,$alamat,$idkota,$catatan);
            $nama = $params->nama;
            $email = $params->email;
            $telp = $params->telp;
            $alamat = $params->alamat;
            $idkota = (int)$params->idkota;
            $catatan = $params->catatan;
            $stmt->execute();
            $params->idklien = $_db->insert_id;
            $stmt->close();
        }
        return $params;
    }
    public function updateRecords(stdClass $params)
	{
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE klien SET nama=?,email=?,telp=?,alamat=?,idkota=?,catatan=? WHERE idklien=?")) {
			$stmt->bind_param('ssssisi',$nama,$email,$telp,$alamat,$idkota,$catatan,$idklien);
            $nama = $params->nama;
            $email = $params->email;
            $telp = $params->telp;
            $alamat = $params->alamat;
            $idkota = (int)$params->idkota;
            $catatan = $params->catatan;
            $idklien = (int)$params->idklien;
			$stmt->execute();
			$stmt->close();
		}
		return $params;
	}

	public function destroyRecord(stdClass $params)
	{
		$_db = $this->__construct();
		$idklien = $params->idklien;
		if(is_numeric($idklien)) {
			if($stmt = $_db->prepare("DELETE FROM klien WHERE idklien = ? LIMIT 1")) {
				$stmt->bind_param('i', $idklien);
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
