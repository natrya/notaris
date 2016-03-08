<?php
include 'gembok.php';
class QueryLayanan
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
        $query = "select count(idlayanan) as total from layanan where nama LIKE '".$kriteria."%';";
        $query.= "SELECT idlayanan,nama,diskripsi,satuan,durasi,als FROM layanan where nama LIKE '".$kriteria."%' "." ORDER BY idlayanan ASC LIMIT ".$mulai.",".$banyak;
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
        $query = "select count(idlayanan) as total from layanan where nama like '%".$q."%';";
;
        $query.= "SELECT idlayanan,nama FROM layanan where nama like '%".$q."%' LIMIT ".$mulai.",".$banyak;
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
        if($stmt = $_db->prepare("INSERT INTO layanan (nama,diskripsi,satuan,durasi,als) VALUES (?,?,?,?,?)")) {
            $stmt->bind_param('sssis', $nama,$diskripsi,$satuan,$durasi,$als);
            $nama = $params->nama;
            $diskripsi = $params->diskripsi;
            $satuan = $params->satuan;
            $durasi = (int)$params->durasi;
            $als = $params->als;
            $stmt->execute();
            $params->idlayanan = $_db->insert_id;
            $stmt->close();
        }
        return $params;
    }
    public function updateRecords(stdClass $params)
	{
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE layanan SET nama=?,diskripsi=?,satuan=?,durasi=?,als=? WHERE idlayanan=?")) {
			$stmt->bind_param('sssisi',$nama,$diskripsi,$satuan,$durasi,$als,$idlayanan);
            $nama = $params->nama;
            $diskripsi = $params->diskripsi;
            $satuan = $params->satuan;
            $durasi =(int)$params->durasi;
            $idlayanan = (int)$params->idlayanan;
            $als = $params->als;
			$stmt->execute();
			$stmt->close();
		}
		return $params;
	}

	public function destroyRecord(stdClass $params)
	{
		$_db = $this->__construct();
		$idlayanan = $params->idlayanan;
		if(is_numeric($idlayanan)) {
			if($stmt = $_db->prepare("DELETE FROM layanan WHERE idlayanan = ? LIMIT 1")) {
				$stmt->bind_param('i', $idlayanan);
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
