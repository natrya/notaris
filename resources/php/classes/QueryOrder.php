<?php
include 'gembok.php';
class QueryOrder
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
        $query = "select count(o.idorder) as total from orderan o LEFT JOIN klien k on o.idklien = k.idklien where k.nama LIKE '%".$kriteria."%' OR o.deskripsi LIKE '%".$kriteria."%' OR o.no_akta LIKE '%".$kriteria."%' OR o.no_berkas LIKE '%".$kriteria."%';";
        $query.= "SELECT  o.*,k.nama as namaklien,b.nama as namabank,f.nama as namaofficer FROM orderan o LEFT JOIN klien k on o.idklien=k.idklien LEFT JOIN bank b on o.idbank=b.idbank LEFT JOIN officer f on o.idofficer=f.idofficer where k.nama LIKE '%".$kriteria."%'  OR o.deskripsi LIKE '%".$kriteria."%' OR o.no_akta LIKE '%".$kriteria."%' OR o.no_berkas LIKE '%".$kriteria."%' "." ORDER BY tgl_order ASC LIMIT ".$mulai.",".$banyak;
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
        $query = "select count(idorder) as total from orderan where deskripsi like '%".$q."%';";
        $query.= "SELECT idorder,nama FROM orderan where deskripsi like '%".$q."%' LIMIT ".$mulai.",".$banyak;
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
        $idbank = (int)$params->idbank;
        $query = "INSERT INTO orderan (idklien,deskripsi,no_akta,no_berkas,idofficer,catatan,idbank,tipepembeli,tgl_realisasi,penjual) VALUES (?,?,?,?,?,?,?,?,?,?)";
        if($stmt = $_db->prepare($query)) {
            $stmt->bind_param('isssisiiss', $idklien,$deskripsi,$no_akta,$no_berkas,$idofficer,$catatan,$idbank,$tipepembeli,$tgl_realisasi,$penjual);
            $idklien = (int)$params->idklien;
            $deskripsi = $params->deskripsi;
            $no_akta = $params->no_akta;
            $no_berkas = $params->no_berkas;
            $idofficer = (int)$params->idofficer;
            $catatan = $params->catatan;
            $tipepembeli = (int)$params->tipepembeli;
            $tgl_realisasi = $params->tgl_realisasi;
            $penjual = $params->penjual;
            $idpaket = $params->idpaket;
            $stmt->execute();
            $params->idorder = $_db->insert_id;
            $idorder =$params->idorder; 
            //$querydbg ="INSERT INTO orderan (idklien,deskripsi,no_akta,no_berkas,idofficer,catatan,idbank) VALUES (".$idklien.",'".$deskripsi."','".$no_akta."','".$no_berkas."',".$idofficer.",'".$catatan."',".$idbank.")";
            //$params->qry= $querydbg; 
            $query = "insert into order_detil(idorder,tgl_mulai,idlayanan,idusr) select ".$_db->insert_id.",CURRENT_TIMESTAMP,idlayanan,0 from paketlayanan where idpaket=".$params->idpaket.";";
            if ($stmt = $_db->prepare($query)){
                $stmt->bind_param('ii',$idorder,$idpaket);
                $stmt->execute();
            }
            $stmt->close();
        }
        return $params;
    }
    public function updateRecords(stdClass $params)
	{
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE orderan SET idklien=?,deskripsi=?,no_akta=?,no_berkas=?,idofficer=?,catatan=?,idbank=?,status=?,tipepembeli=?,tgl_realisasi=?,penjual=? WHERE idorder=?")) {
			$stmt->bind_param('isssisiiissi',$idklien,$deskripsi,$no_akta,$no_berkas,$idofficer,$catatan,$idbank,$status,$tipepembeli,$tgl_realisasi,$penjual,$idorder);
            $idklien = (int)$params->idklien;
            $deskripsi = $params->deskripsi;
            $no_akta = $params->no_akta;
            $no_berkas = $params->no_berkas;
            $idofficer = (int)$params->idofficer;
            $catatan = $params->catatan;
            $idbank = (int)$params->idbank;
            $status = (int)$params->status;
            $tipepembeli = (int)$params->tipepembeli;
            $tgl_realisasi = $params->tgl_realisasi;
            $penjual = $params->penjual;
            $idorder = (int)$params->idorder;
            if ($status == 1){
                $qry = "UPDATE orderan set tgl_selesai=CURRENT_TIMESTAMP where idorder=".$idorder;
                $_db->query($qry);
            }else{
                $qry = "UPDATE orderan set tgl_selesai=NULL where idorder=".$idorder;
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
		$idorder = $params->idorder;
		if(is_numeric($idorder)) {
			if($stmt = $_db->prepare("DELETE FROM orderan WHERE idorder = ? LIMIT 1")) {
				$stmt->bind_param('i', $idorder);
				$stmt->execute();
				$stmt->close();
			}
		}
		return $params;
	}
    public function getSummary(stdClass $params)
    {
        $_db = $this->__construct();
        $results = array();  
        $mulai=$_db->real_escape_string($params->start);
        $banyak=$_db->real_escape_string($params->limit);
        $kriteria=$_db->real_escape_string($params->text);
        $query = "select count(idorder_detil) as total from order_detil o LEFT JOIN orderan r on o.idorder = r.idorder where r.no_berkas LIKE '%".$kriteria."%' OR namaklien(r.idklien) LIKE '%".$kriteria."%';";
        $query.= "SELECT CONCAT('Klien:',' ',namaklien(r.idklien),' ',r.deskripsi,' No berkas: ',r.no_berkas,' No Akta: ',r.no_akta) as ordername,o.idorder_detil,o.tgl_mulai,o.tgl_selesai,o.status,l.nama as namalayanan,l.als,p.nama  as namapihaklain,CONCAT(l.durasi,' ',l.satuan) as estimasi FROM order_detil o LEFT JOIN layanan l on o.idlayanan=l.idlayanan LEFT JOIN usr p on o.idusr=p.idusr LEFT JOIN orderan r on o.idorder =r.idorder where r.no_berkas LIKE '%".$kriteria."%' OR namaklien(r.idklien) LIKE '%".$kriteria."%' ORDER BY idorder_detil ASC LIMIT ".$mulai.",".$banyak;
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
