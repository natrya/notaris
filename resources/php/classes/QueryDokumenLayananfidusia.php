<?php
include 'gembok.php';
class QueryDokumenLayananfidusia
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
        $kriteria=$_db->real_escape_string($params->kriteria);
        $query = "select count(iddokumen) as total from dokumenfidusia where idorder_detil = ".$kriteria.";";
        $query.= "SELECT d.iddokumen,d.idorder_detil,namalayanan(o.idlayanan) as namalayanan,d.nama,d.keterangan FROM dokumenfidusia d LEFT JOIN order_detilfidusia o on d.idorder_detil=o.idorder_detil where d.idorder_detil=".$kriteria." ORDER BY iddokumen ASC LIMIT ".$mulai.",".$banyak;
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
        if($stmt = $_db->prepare("INSERT INTO dokumenfidusia (idorder_detil,nama,keterangan) VALUES (?,?,?)")) {
            $stmt->bind_param('iss', $idorder_detil,$nama,$keterangan);
            $nama = $params->nama;
            $keterangan = $params->keterangan;
            $idorder_detil = (int)$params->idorder_detil;
            $stmt->execute();
            $params->idorder_detil = $_db->insert_id;
            $stmt->close();
        }
        return $params;
    }
    public function updateRecords(stdClass $params)
	{
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE dokumenfidusia SET keterangan=? WHERE idorder_detil=?")) {
			$stmt->bind_param('si',$keterangan,$idorder_detil);
            $keterangan = $params->keterangan;
            $idorder_detil = (int)$params->idorder_detil;
			$stmt->execute();
			$stmt->close();
		}
		return $params;
	}

	public function destroyRecord(stdClass $params)
	{
		$_db = $this->__construct();
		$iddokumen = $params->iddokumen;
		if(is_numeric($iddokumen)) {
			if($stmt = $_db->prepare("DELETE FROM dokumenfidusia WHERE iddokumen = ? LIMIT 1")) {
				$stmt->bind_param('i', $iddokumen);
				$stmt->execute();
				$stmt->close();
                unlink("/var/www/notaris/dok/".$params->nama);
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
