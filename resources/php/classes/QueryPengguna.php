<?php
include 'gembok.php';
class QueryPengguna
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
	
	public function getResults($params)
    {
        $_db = $this->__construct();
        $results = array();  
        $where = " 0 = 0 ";
        $params=get_object_vars($params);
        $mulai=$params['start'];
        $banyak=$params['limit'];
        $cnt=0;
        foreach($params as $key => $value)
        {
            if (strpos($key,"filter")!==false){
                $cnt++;
            }
        }
        if ($cnt>0){
            $jumlah=$cnt/3;
            $filter=array();
            for ($i=1; $i<=$jumlah;$i++){
                $filter[$i-1]['field']=$params["filter[".($i-1)."][field]"];
                $filter[$i-1]['data']['type']=$params["filter[".($i-1)."][data][type]"];
                $filter[$i-1]['data']['value']=$params["filter[".($i-1)."][data][value]"];
            }
            if (is_array($filter)) {
                for ($i=0;$i<count($filter);$i++){
                    switch($filter[$i]['data']['type']){
                    case 'string' : $qs .= " AND p.".$filter[$i]['field']." LIKE '%".$filter[$i]['data']['value']."%'"; Break;
                    case 'boolean' : $qs .= " AND p.".$filter[$i]['field']." = ".($filter[$i]['data']['value']); Break;
                    case 'numeric' :
                        switch ($filter[$i]['data']['comparison']) {
                        case 'ne' : $qs .= " AND p.".$filter[$i]['field']." != ".$filter[$i]['data']['value']; Break;
                        case 'eq' : $qs .= " AND p.".$filter[$i]['field']." = ".$filter[$i]['data']['value']; Break;
                        case 'lt' : $qs .= " AND p.".$filter[$i]['field']." < ".$filter[$i]['data']['value']; Break;
                        case 'gt' : $qs .= " AND p.".$filter[$i]['field']." > ".$filter[$i]['data']['value']; Break;
                        }
                        Break;
                    }
                }
                $where .= $qs;
            }
        }
        $query = "select count(p.id) as total from pguna p where ".$where.";";
        $query.= "SELECT p.id,p.nama,p.pss,r.text as idrolename,p.idrole,p.namapanjang,p.alamat,p.telp,p.idsup,q.namapanjang as idsupname,p.foto,p.aktif FROM pguna p left join role r on p.idrole=r.id left join pguna q on p.idsup=q.id where p.id > 0 and ".$where." LIMIT ".$mulai.",".$banyak;
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
    public function getResultsSellerId(stdClass $params)
    {
        $_db = $this->__construct();
        $results = array();  
        $mulai=$params->start;
        $banyak=$params->limit;
        $idsup= $_SESSION['id'];
        $quer= $params->query;
        $query = "select count(id) as total from pguna;";
        $query.= "SELECT id,namapanjang FROM pguna where idrole=3 and idsup=".$idsup." and namapanjang LIKE '%".$quer."%' LIMIT ".$mulai.",".$banyak;
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
            $results['query']=$query;
        }
        return $results;
    }

    public function createRecord(stdClass $params)
    {

		$_db = $this->__construct();
		if($stmt = $_db->prepare("INSERT INTO pguna (nama,pss,idrole,namapanjang,alamat,telp,idsup,foto,aktif ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")) {
			$stmt->bind_param('ssisssisi', $nama, $pss, $idrole,$namapanjang,$alamat,$telp,$idsup,$foto,$aktif);
			$nama = $params->nama;
			$pss = $params->pss;
			$idrole = (int)$params->idrole;
            $namapanjang= $params->namapanjang;
            $alamat= $params->alamat;
            $telp= $params->telp;
            $idsup= (int)$params->idsup;
            $foto=$params->foto;
            $aktif=(int)$params->aktif;
			$stmt->execute();
			$params->id = $_db->insert_id;
			$stmt->close();
		}
		return $params;
	}
	
	public function updateRecords(stdClass $params)
	{
		$_db = $this->__construct();
		if ($stmt = $_db->prepare("UPDATE pguna SET nama=?, pss=?, idrole=?,namapanjang=?,alamat=?,telp=?,idsup=?,foto=?,aktif=? WHERE id=?")) {
			$stmt->bind_param('ssisssisii', $nama,$pss,$idrole,$namapanjang,$alamat,$telp,$idsup,$foto,$aktif,$id);
            $nama = $params->nama;
			$pss = $params->pss;
			$idrole = (int)$params->idrole;
            $namapanjang= $params->namapanjang;
            $alamat= $params->alamat;
            $telp= $params->telp;
            $idsup= (int)$params->idsup;
            $id = (int) $params->id;
            $foto=$params->foto;
            $aktif=(int) $params->aktif;
			$stmt->execute();
			$stmt->close();
		}

		return $params;
	}
	
	public function destroyRecord(stdClass $params)
	{
		$_db = $this->__construct();
		$id = $params->id;
		if(is_numeric($id)) {
			if($stmt = $_db->prepare("DELETE FROM pguna WHERE id = ? LIMIT 1")) {
				$stmt->bind_param('i', $id);
				$stmt->execute();
				$stmt->close();
			}
		}
		return $this;
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
