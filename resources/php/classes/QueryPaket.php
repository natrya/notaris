<?php
include 'gembok.php';
class QueryPaket
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
        $query = "select count(idpaket) as total from paket where nama LIKE '".$kriteria."%';";
        $query.= "SELECT idpaket,nama,deskripsi FROM paket where nama LIKE '".$kriteria."%' "." ORDER BY idpaket ASC LIMIT ".$mulai.",".$banyak;
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
        $query = "select count(idpaket) as total from paket where nama like '%".$q."%';";
        $query.= "SELECT idpaket,nama FROM paket where nama like '%".$q."%' LIMIT ".$mulai.",".$banyak;
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
        if($stmt = $_db->prepare("INSERT INTO paket (nama,deskripsi) VALUES (?,?)")) {
            $stmt->bind_param('ss', $nama,$deskripsi);
            $nama = $params->nama;
            $deskripsi = $params->deskripsi;
            $stmt->execute();
            $params->idpaket = $_db->insert_id;
            $stmt->close();
        }
        return $params;
    }
    public function updateRecords(stdClass $params)
	{
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE paket SET nama=?,deskripsi=? WHERE idpaket=?")) {
			$stmt->bind_param('ssi',$nama,$deskripsi,$idpaket);
            $nama = $params->nama;
            $deskripsi = $params->deskripsi;
            $idpaket = (int)$params->idpaket;
			$stmt->execute();
			$stmt->close();
		}
		return $params;
	}

	public function destroyRecord(stdClass $params)
	{
		$_db = $this->__construct();
		$idpaket = $params->idpaket;
		if(is_numeric($idpaket)) {
			if($stmt = $_db->prepare("DELETE FROM paket WHERE idpaket = ? LIMIT 1")) {
				$stmt->bind_param('i', $idpaket);
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
