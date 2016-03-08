<?php
include 'gembok.php';
class QueryKota
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
    public function getResultsId(stdClass $params)
    {
        $_db = $this->__construct();
        $results = array();  
        $mulai=$_db->real_escape_string($params->start);
        $banyak=$_db->real_escape_string($params->limit);
        $q = $_db->real_escape_string($params->q);
        $query = "select count(idkota) as total from m_kabkota where nama like '%".$q."%';";
        $query.= "SELECT idkota,nama FROM m_kabkota where nama like '%".$q."%' LIMIT ".$mulai.",".$banyak;
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
