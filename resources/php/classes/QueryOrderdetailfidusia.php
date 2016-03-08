<?php
include 'gembok.php';
class QueryOrderdetailfidusia
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
        $query = "select count(idorder_detil) as total from order_detilfidusia where idorder =".$kriteria.";";
        $query.= "SELECT  o.*,l.nama as namalayanan,p.nama as namapihaklain FROM order_detilfidusia o LEFT JOIN layanan l on o.idlayanan=l.idlayanan LEFT JOIN usr p on o.idusr=p.idusr where o.idorder =".$kriteria." "." ORDER BY idorder_detil ASC LIMIT ".$mulai.",".$banyak;
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
    public function getResultsU(stdClass $params)
    {
        session_start();
        $_db = $this->__construct();
        $results = array();  
        $mulai=$_db->real_escape_string($params->start);
        $banyak=$_db->real_escape_string($params->limit);
        $kriteria=$_db->real_escape_string($params->kriteria);
        $query = "select count(idorder_detil) as total from order_detilfidusia where idusr =".$_SESSION['id'].";";
        $query.= "SELECT  o.*,l.nama as namalayanan,p.nama as namapihaklain,n.no_berkas,namaklien(n.idklien) as namaklien FROM order_detilfidusia o LEFT JOIN layanan l on o.idlayanan=l.idlayanan LEFT JOIN usr p on o.idusr=p.idusr LEFT JOIN orderfidusia n on o.idorder=n.idorder where o.idusr =".$_SESSION['id']." ORDER BY idorder_detil ASC LIMIT ".$mulai.",".$banyak;
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
        $query = "select count(idorder_detil) as total from order_detilfidusia where idorder=".$q.";";
        $query.= "SELECT idorder_detil,status FROM order_detilfidusia where idorder=".$q." LIMIT ".$mulai.",".$banyak;
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
        $query = "INSERT INTO order_detilfidusia (idorder,idlayanan,idusr,keterangan) VALUES (?,?,?,?)";
        if($stmt = $_db->prepare($query)) {
            $stmt->bind_param('iiis', $idorder,$idlayanan,$idusr,$keterangan);
            $idorder = (int)$params->idorder;
            $idlayanan = (int)$params->idlayanan;
            $idusr = (int)$params->idusr;
            $keterangan = $params->keterangan;
            $stmt->execute();
            $params->idorder_detil = $_db->insert_id;
            $stmt->close();
        }
        return $params;
    }
    public function updateRecords(stdClass $params)
	{
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE order_detilfidusia SET idorder=?,idlayanan=?,idusr=?,keterangan=?,status=? WHERE idorder_detil=?")) {
			$stmt->bind_param('iiisii',$idorder,$idlayanan,$idusr,$keterangan,$status,$idorder_detil);
            $idorder = (int)$params->idorder;
            $idlayanan = (int)$params->idlayanan;
            $idusr = (int)$params->idusr;
            $keterangan = $params->keterangan;
            $status = (int)$params->status;
            $idorder_detil = (int)$params->idorder_detil;
            if ($status == 1){
                $qry = "UPDATE order_detilfidusia set tgl_selesai=CURRENT_TIMESTAMP where idorder_detil=".$idorder_detil;
                $_db->query($qry);
            }else{
                $qry = "UPDATE order_detilfidusia set tgl_selesai=NULL where idorder_detil=".$idorder_detil;
                $_db->query($qry);
            }
			$stmt->execute();
			$stmt->close();
		}
		return $params;
	}

	public function destroyRecord(stdClass $params)
	{
		$_db = $this->__construct();
		$idorder_detil = $params->idorder_detil;
		if(is_numeric($idorder_detil)) {
			if($stmt = $_db->prepare("DELETE FROM order_detilfidusia WHERE idorder_detil = ? LIMIT 1")) {
				$stmt->bind_param('i', $idorder_detil);
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
