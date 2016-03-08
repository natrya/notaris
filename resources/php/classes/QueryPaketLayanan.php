<?php
include 'gembok.php';
class QueryPaketLayanan
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
        $query = "select count(idpaketlayanan) as total from paketlayanan where idpaket =".$kriteria.";";
        $query.= "SELECT pl.idpaketlayanan,pl.idpaket,pl.idlayanan,p.nama as namapaket,p.deskripsi as deskripsipaket,l.nama as namalayanan,l.diskripsi as deskripsilayanan FROM paketlayanan pl LEFT JOIN paket p on pl.idpaket=p.idpaket LEFT JOIN layanan l on pl.idlayanan=l.idlayanan where pl.idpaket=".$kriteria." ORDER BY idpaketlayanan ASC LIMIT ".$mulai.",".$banyak;
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
        if($stmt = $_db->prepare("INSERT INTO paketlayanan (idlayanan,idpaket) VALUES (?,?)")) {
            $stmt->bind_param('ii', $idlayanan,$idpaket);
            $idlayanan = (int)$params->idlayanan;
            $idpaket = (int)$params->idpaket;
            $stmt->execute();
            $params->idpaketlayanan = $_db->insert_id;
            $stmt->close();
        }
        return $params;
    }

	public function destroyRecord(stdClass $params)
	{
		$_db = $this->__construct();
		$idpaketlayanan = $params->idpaketlayanan;
		if(is_numeric($idpaketlayanan)) {
			if($stmt = $_db->prepare("DELETE FROM paketlayanan WHERE idpaketlayanan = ? LIMIT 1")) {
				$stmt->bind_param('i', $idpaketlayanan);
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
