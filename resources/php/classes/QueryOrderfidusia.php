<?php
//ini_set('display_startup_errors',1);
//ini_set('display_errors',1);
//error_reporting(-1);
include 'gembok.php';
class QueryOrderfidusia
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
        $query = "select count(o.idorder) as total from orderfidusia o where o.pemberi LIKE '%".$kriteria."%' OR o.debitur LIKE '%".$kriteria."%' OR o.no_berkas LIKE '%".$kriteria."%';";
        $query.= "SELECT  o.*,k.nama as namaklien,f.nama as namaofficer,namauser(idkorektor) as namakorektor,namauser(idkorektor2) as namakorektor2 FROM orderfidusia o LEFT JOIN klien k on o.idklien=k.idklien LEFT JOIN officer f on o.idofficer=f.idofficer where o.pemberi LIKE '%".$kriteria."%' OR o.debitur LIKE '%".$kriteria."%' OR o.no_berkas LIKE '%".$kriteria."%' ORDER BY tgl_order ASC LIMIT ".$mulai.",".$banyak;
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
        $query = "INSERT INTO orderfidusia (idklien,pemberi,debitur,no_ajf,no_berkas,no_ppk,idofficer,hutang,obyek,tgl_order,catatan,status,jangka,tipepembeli,tgl_ajf,tgl_ppk,idkorektor,idkorektor2) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        if($stmt = $_db->prepare($query)) {
            $stmt->bind_param('isssssiiissiiissii', $idklien,$pemberi,$debitur,$no_ajf,$no_berkas,$no_ppk,$idofficer,$hutang,$obyek,$tgl_order,$catatan,$status,$jangka,$tipepembeli,$tgl_ajf,$tgl_ppk,$idkorektor,$idkorektor2);
            $idklien = (int)$params->idklien;
            $pemberi = $params->pemberi;
            $debitur = $params->debitur;
            $no_ajf = $params->no_ajf;
            $no_berkas = $params->no_berkas;
            $no_ppk = $params->no_ppk;
            $idofficer = (int)$params->idofficer;
            $hutang = (int)$params->hutang;
            $obyek = (int)$params->obyek;
            $tgl_order = $params->tgl_order;
            $catatan = $params->catatan;
            $status = (int)$params->status;
            $jangka = (int)$params->jangka;
            $tipepembeli = (int)$params->tipepembeli;
            $tgl_ajf = $params->tgl_ajf;
            $tgl_ppk = $params->tgl_ppk;
            $idkorektor = (int)$params->idkorektor;
            $idkorektor2 = (int)$params->idkorektor2;
            $stmt->execute();
            $params->idorder = $_db->insert_id;
            $idorder =$params->idorder; 
            $query = "insert into order_detilfidusia(idorder,tgl_mulai,idlayanan,idusr) select ".$idorder.",CURRENT_TIMESTAMP,idlayanan,0 from paketlayanan where idpaket=7;";
            if ($stmt = $_db->prepare($query)){
                $stmt->bind_param('i',$idorder);
                $stmt->execute();
            }
            $stmt->close();
        }
        //echo "INSERT INTO orderfidusia (idklien,pemberi,debitur,no_ajf,no_berkas,no_ppk,idofficer,hutang,obyek,tgl_order,catatan,status,jangka,tipepembeli,tgl_ajf,tgl_ppk,idkorektor,idkorektor2) VALUES ($idklien,$pemberi,$debitur,$no_ajf,$no_berkas,$no_ppk,$idofficer,$hutang,$obyek,$tgl_order,$catatan,$status,$jangka,$tipepembeli,$tgl_ajf,$tgl_ppk,$idkorektor,$idkorektor2)";
        return $params;
    }
    public function updateRecords(stdClass $params)
    {
        $_db = $this->__construct();
        if ($stmt = $_db->prepare("UPDATE orderfidusia SET idklien=?,pemberi=?,debitur=?,no_ajf=?,no_berkas=?,no_ppk=?,idofficer=?,hutang=?,obyek=?,tgl_order=?,catatan=?,jangka=?,tipepembeli=?,tgl_ajf=?,tgl_ppk=?,idkorektor=?,idkorektor2=? WHERE idorder=?;")) {
            $stmt->bind_param('isssssiiissiissiii',$idklien,$pemberi,$debitur,$no_ajf,$no_berkas,$no_ppk,$idofficer,$hutang,$obyek,$tgl_order,$catatan,$jangka,$tipepembeli,$tgl_ajf,$tgl_ppk,$idkorektor,$idkorektor2,$idorder);
            $idklien = (int)$params->idklien;
            $pemberi = $params->pemberi;
            $debitur = $params->debitur;
            $no_ajf = $params->no_ajf;
            $no_berkas = $params->no_berkas;
            $no_ppk = $params->no_ppk;
            $idofficer = (int)$params->idofficer;
            $hutang = (int)$params->hutang;
            $obyek = (int)$params->obyek;
            $tgl_order = $params->tgl_order;
            $catatan = $params->catatan;
            $status = (int)$params->status;
            $jangka = (int)$params->jangka;
            $tipepembeli = (int)$params->tipepembeli;
            $tgl_ajf = $params->tgl_ajf;
            $tgl_ppk = $params->tgl_ppk;
            $idkorektor = (int)$params->idkorektor;
            $idkorektor2 = (int)$params->idkorektor2;
            $idorder = (int)$params->idorder;
            if ($status == 1){
                $qry = "UPDATE orderfidusia set tgl_selesai=CURRENT_TIMESTAMP where idorder=".$idorder.";";
                $_db->query($qry);
            }else{
                $qry = "UPDATE orderfidusia set tgl_selesai=NULL where idorder=".$idorder.";";
                $_db->query($qry);
            }
            $stmt->execute();
            $stmt->close();
        }
        echo $stmt->error;
        //echo "UPDATE orderfidusia SET idklien=$idklien,pemberi='$pemberi',debitur='$debitur',no_ajf='$no_ajf',no_berkas='$no_berkas',no_ppk='$no_ppk',idofficer=$idofficer,hutang=$hutang,obyek=$obyek,tgl_order='$tgl_order',catatan='$catatan',jangka=$jangka,tipepembeli=$tipepembeli,tgl_ajf='$tgl_ajf',tgl_ppk='$tgl_ppk',idkorektor=$idkorektor,idkorektor2=$idkorektor2 WHERE idorder=$idorder;";
        return $params;
    }

    public function destroyRecord(stdClass $params)
    {
        $_db = $this->__construct();
        $idorder = $params->idorder;
        if(is_numeric($idorder)) {
            if($stmt = $_db->prepare("DELETE FROM orderfidusia WHERE idorder = ? LIMIT 1")) {
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
        $query = "select count(idorder_detil) as total from order_detilfidusia o LEFT JOIN orderfidusia r on o.idorder = r.idorder where r.no_berkas LIKE '%".$kriteria."%' OR namaklien(r.idklien) LIKE '%".$kriteria."%' OR r.pemberi LIKE  '%".$kriteria."%' OR r.debitur LIKE  '%".$kriteria."%' OR r.no_ppk LIKE  '%".$kriteria."%' ;";
        $query.= "SELECT CONCAT('Klien:',' ',namaklien(r.idklien),' ','Debitur:',' ',r.debitur,' ','No PPK:',r.no_ppk,' ','No berkas:',' ',r.no_berkas) as ordername,o.idorder_detil,o.tgl_mulai,o.tgl_selesai,o.status,l.nama as namalayanan,l.als,p.nama  as namapihaklain,CONCAT(l.durasi,' ',l.satuan) as estimasi  FROM order_detilfidusia o LEFT JOIN layanan l on o.idlayanan=l.idlayanan LEFT JOIN usr p on o.idusr=p.idusr LEFT JOIN orderfidusia r on o.idorder =r.idorder where r.no_berkas LIKE '%".$kriteria."%' OR namaklien(r.idklien) LIKE '%".$kriteria."%' OR r.pemberi LIKE  '%".$kriteria."%' OR r.debitur LIKE  '%".$kriteria."%' OR r.no_ppk LIKE  '%".$kriteria."%' ORDER BY idorder_detil ASC LIMIT ".$mulai.",".$banyak;
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
