<?php
class konfig
{
	public 	$alamat='localhost',
		$nama='root',
		$panggilan='toor',
        $rumah='notariat';
	public function ambilAlamat()
	{
		return $this->alamat;
	}
	public function ambilNama()
	{
		return $this->nama;
	}
	public function ambilPanggilan()
	{
		return $this->panggilan;
	}
	public function ambilRumah()
	{
		return $this->rumah;
	}
} 
?>
