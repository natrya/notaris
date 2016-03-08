-- MySQL dump 10.15  Distrib 10.0.23-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: notariat
-- ------------------------------------------------------
-- Server version	10.0.23-MariaDB-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank` (
  `idbank` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) NOT NULL,
  `alamat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idbank`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank`
--

LOCK TABLES `bank` WRITE;
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
INSERT INTO `bank` VALUES (4,'Tanpa Bank','Tanpa Bank'),(5,'BNI Graha Pengeran','BNI Graha Pengeran'),(6,'BNI Syariah Boulevard','BNI Syariah Boulevard'),(7,'BNI Syariah Dharmawangsa','BNI Syariah Dharmawangsa'),(8,'BNI Syariah Rajawali','BNI Syariah Rajawali'),(9,'BTN Pemuda','BTN Pemuda'),(10,'BTN Jemursari','BTN Jemursari'),(11,'BTN airlangga','BTN airlangga'),(12,'BTN Pondok Chandra','BTN Pondok Chandra'),(13,'BTN IAIN','BTN IAIN'),(14,'BTN Mulyosari','BTN Mulyosari'),(15,'BTN Sidoarjo','BTN Sidoarjo'),(16,'BTN Bukit Darmo','BTN Bukit Darmo'),(17,'BTN Syariah Boulevard','BTN Syariah Boulevard'),(18,'BTN Syariah Diponegoro','BTN Syariah Diponegoro'),(19,'BTN Syariah Kertajaya','BTN Syariah Kertajaya'),(20,'Bank Mandiri Genteng kali','Bank Mandiri Genteng kali'),(21,'Bank Mandiri Kertajaya','Bank Mandiri Kertajaya'),(22,'Bank Mandiri Pemuda','Bank Mandiri Pemuda'),(23,'Bank Syariah Mandiri','Bank Syariah Mandiri'),(24,'Bukopin','Bukopin'),(25,'Syariah Bukopin','Syariah Bukopin'),(26,'CIMB Niaga','CIMB Niaga'),(27,'CIMB Niaga mikro','CIMB Niaga mikro'),(28,'BPR Jatim','BPR Jatim'),(29,'KSU Mitra Rakyat','KSU Mitra Rakyat'),(30,'IAF','IAF'),(31,'Bank Jawa Barat (BJB)','Bank Jawa Barat');
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dokumen`
--

DROP TABLE IF EXISTS `dokumen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dokumen` (
  `iddokumen` int(11) NOT NULL AUTO_INCREMENT,
  `idorder_detil` int(11) NOT NULL,
  `nama` varchar(45) NOT NULL,
  `keterangan` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iddokumen`,`idorder_detil`),
  KEY `fk_dokumen_1_idx` (`idorder_detil`),
  CONSTRAINT `fk_dokumen_1` FOREIGN KEY (`idorder_detil`) REFERENCES `order_detil` (`idorder_detil`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dokumen`
--

LOCK TABLES `dokumen` WRITE;
/*!40000 ALTER TABLE `dokumen` DISABLE KEYS */;
/*!40000 ALTER TABLE `dokumen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dokumenfidusia`
--

DROP TABLE IF EXISTS `dokumenfidusia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dokumenfidusia` (
  `iddokumen` int(11) NOT NULL AUTO_INCREMENT,
  `idorder_detil` int(11) NOT NULL,
  `nama` varchar(45) NOT NULL,
  `keterangan` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iddokumen`,`idorder_detil`),
  KEY `fk_dokumenfidusia_1_idx` (`idorder_detil`),
  CONSTRAINT `fk_dokumenfidusia_1` FOREIGN KEY (`idorder_detil`) REFERENCES `order_detilfidusia` (`idorder_detil`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dokumenfidusia`
--

LOCK TABLES `dokumenfidusia` WRITE;
/*!40000 ALTER TABLE `dokumenfidusia` DISABLE KEYS */;
/*!40000 ALTER TABLE `dokumenfidusia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `klien`
--

DROP TABLE IF EXISTS `klien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `klien` (
  `idklien` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telp` varchar(45) NOT NULL,
  `alamat` varchar(45) NOT NULL,
  `idkota` int(11) NOT NULL,
  `tgl_daftar` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `catatan` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`idklien`,`idkota`),
  KEY `fk_klien_1_idx` (`idkota`),
  CONSTRAINT `fk_klien_1` FOREIGN KEY (`idkota`) REFERENCES `m_kabkota` (`idkota`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `klien`
--

LOCK TABLES `klien` WRITE;
/*!40000 ALTER TABLE `klien` DISABLE KEYS */;
/*!40000 ALTER TABLE `klien` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `layanan`
--

DROP TABLE IF EXISTS `layanan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `layanan` (
  `idlayanan` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) NOT NULL,
  `diskripsi` varchar(45) DEFAULT NULL,
  `durasi` smallint(6) NOT NULL DEFAULT '1',
  `satuan` char(1) NOT NULL DEFAULT 'H',
  `als` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idlayanan`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `layanan`
--

LOCK TABLES `layanan` WRITE;
/*!40000 ALTER TABLE `layanan` DISABLE KEYS */;
INSERT INTO `layanan` VALUES (16,'Checking HT','Checking HT',3,'H','Checking HT'),(17,'Ketik APHT','Ketik & Print APHT',3,'J','Ketik APHT'),(18,'Kirim Akta APHT ke bank','Kirim Akta APHT ke bank',14,'H','Kirim Akta APHT ke bank'),(19,'Racik ke BPN','Racik ke BPN',1,'J','Racik ke BPN'),(20,'Ketik Pengantar','Ketik Pengantar',1,'J','Ketik Pengantar'),(21,'Tanda tangan Notaris & saksi','Tanda tangan Notaris & saksi',1,'H','Tanda tangan Notaris & saksi'),(22,'Online ke BPN','Online ke BPN',1,'J','Online ke BPN'),(23,'proses ke BPN','proses ke BPN',90,'H','proses ke BPN'),(24,'Tanda Terima','Tanda Terima',1,'J','Tanda Terima'),(25,'Kirim ke bank','Kirim ke bank',1,'H','Kirim ke bank'),(26,'Checking AJB','Checking AJB',2,'H','Checking AJB'),(27,'Ketik AJB','Ketik AJB',2,'J','Ketik AJB'),(28,'Racik AJB','Racik AJB',1,'J','Racik AJB'),(29,'Online','Online',1,'J','Online'),(30,'Minuta','Minuta',1,'H','Minuta'),(31,'Salinan','Salinan',1,'J','Salinan'),(32,'PNBP','PNBP',3,'H','PNBP'),(33,'Cetak Sertifikat Fidusia','Cetak Sertifikat Fidusia',1,'J','Cetak Sertifikat Fidusia'),(34,'Kwitansi','Kwitansi',1,'J','Kwitansi');
/*!40000 ALTER TABLE `layanan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_kabkota`
--

DROP TABLE IF EXISTS `m_kabkota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_kabkota` (
  `idkota` int(11) NOT NULL AUTO_INCREMENT,
  `idprovinsi` int(11) NOT NULL,
  `nama` varchar(45) NOT NULL,
  PRIMARY KEY (`idkota`,`idprovinsi`),
  KEY `fk_kota_1_idx` (`idprovinsi`),
  CONSTRAINT `fk_kota_1` FOREIGN KEY (`idprovinsi`) REFERENCES `m_provinsi` (`idprovinsi`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9472 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_kabkota`
--

LOCK TABLES `m_kabkota` WRITE;
/*!40000 ALTER TABLE `m_kabkota` DISABLE KEYS */;
INSERT INTO `m_kabkota` VALUES (1101,11,'Kab. Simeulue'),(1102,11,'Kab. Aceh Singkil'),(1103,11,'Kab. Aceh Selatan'),(1104,11,'Kab. Aceh Tenggara'),(1105,11,'Kab. Aceh Timur'),(1106,11,'Kab. Aceh Tengah'),(1107,11,'Kab. Aceh Barat'),(1108,11,'Kab. Aceh Besar'),(1109,11,'Kab. Pidie'),(1110,11,'Kab. Bireuen'),(1111,11,'Kab. Aceh Utara'),(1112,11,'Kab. Aceh Barat Daya'),(1113,11,'Kab. Gayo Lues'),(1114,11,'Kab. Aceh Tamiang'),(1115,11,'Kab. Nagan Raya'),(1116,11,'Kab. Aceh Jaya'),(1117,11,'Kab. Bener Meriah'),(1118,11,'Kab. Pidie Jaya'),(1171,11,'Kota Banda Aceh'),(1172,11,'Kota Sabang'),(1173,11,'Kota Langsa'),(1174,11,'Kota Lhokseumawe'),(1175,11,'Kota Subulussalam'),(1201,12,'Kab. Nias'),(1202,12,'Kab. Mandailing Natal'),(1203,12,'Kab. Tapanuli Selatan'),(1204,12,'Kab. Tapanuli Tengah'),(1205,12,'Kab. Tapanuli Utara'),(1206,12,'Kab. Toba Samosir'),(1207,12,'Kab. Labuhan Batu'),(1208,12,'Kab. Asahan'),(1209,12,'Kab. Simalungun'),(1210,12,'Kab. Dairi'),(1211,12,'Kab. Karo'),(1212,12,'Kab. Deli Serdang'),(1213,12,'Kab. Langkat'),(1214,12,'Kab. Nias Selatan'),(1215,12,'Kab. Humbang Hasundutan'),(1216,12,'Kab. Pakpak Bharat'),(1217,12,'Kab. Samosir'),(1218,12,'Kab. Serdang Bedagai'),(1219,12,'Kab. Batu Bara'),(1220,12,'Kab. Padang Lawas Utara'),(1221,12,'Kab. Padang Lawas'),(1222,12,'Kab. Labuhan Batu Selatan'),(1223,12,'Kab. Labuhan Batu Utara'),(1224,12,'Kab. Nias Utara'),(1225,12,'Kab. Nias Barat'),(1271,12,'Kota Sibolga'),(1272,12,'Kota Tanjung Balai'),(1273,12,'Kota Pematang Siantar'),(1274,12,'Kota Tebing Tinggi'),(1275,12,'Kota Medan'),(1276,12,'Kota Binjai'),(1277,12,'Kota Padangsidimpuan'),(1278,12,'Kota Gunungsitoli'),(1301,13,'Kab. Kepulauan Mentawai'),(1302,13,'Kab. Pesisir Selatan'),(1303,13,'Kab. Solok'),(1304,13,'Kab. Sijunjung'),(1305,13,'Kab. Tanah Datar'),(1306,13,'Kab. Padang Pariaman'),(1307,13,'Kab. Agam'),(1308,13,'Kab. Lima Puluh Kota'),(1309,13,'Kab. Pasaman'),(1310,13,'Kab. Solok Selatan'),(1311,13,'Kab. Dharmasraya'),(1312,13,'Kab. Pasaman Barat'),(1371,13,'Kota Padang'),(1372,13,'Kota Solok'),(1373,13,'Kota Sawah Lunto'),(1374,13,'Kota Padang Panjang'),(1375,13,'Kota Bukittinggi'),(1376,13,'Kota Payakumbuh'),(1377,13,'Kota Pariaman'),(1401,14,'Kab. Kuantan Singingi'),(1402,14,'Kab. Indragiri Hulu'),(1403,14,'Kab. Indragiri Hilir'),(1404,14,'Kab. Pelalawan'),(1405,14,'Kab. S I A K'),(1406,14,'Kab. Kampar'),(1407,14,'Kab. Rokan Hulu'),(1408,14,'Kab. Bengkalis'),(1409,14,'Kab. Rokan Hilir'),(1410,14,'Kab. Kepulauan Meranti'),(1471,14,'Kota Pekanbaru'),(1473,14,'Kota D U M A I'),(1501,15,'Kab. Kerinci'),(1502,15,'Kab. Merangin'),(1503,15,'Kab. Sarolangun'),(1504,15,'Kab. Batang Hari'),(1505,15,'Kab. Muaro Jambi'),(1506,15,'Kab. Tanjung Jabung Timur'),(1507,15,'Kab. Tanjung Jabung Barat'),(1508,15,'Kab. Tebo'),(1509,15,'Kab. Bungo'),(1571,15,'Kota Jambi'),(1572,15,'Kota Sungai Penuh'),(1601,16,'Kab. Ogan Komering Ulu'),(1602,16,'Kab. Ogan Komering Ilir'),(1603,16,'Kab. Muara Enim'),(1604,16,'Kab. Lahat'),(1605,16,'Kab. Musi Rawas'),(1606,16,'Kab. Musi Banyuasin'),(1607,16,'Kab. Banyu Asin'),(1608,16,'Kab. Ogan Komering Ulu Selatan'),(1609,16,'Kab. Ogan Komering Ulu Timur'),(1610,16,'Kab. Ogan Ilir'),(1611,16,'Kab. Empat Lawang'),(1671,16,'Kota Palembang'),(1672,16,'Kota Prabumulih'),(1673,16,'Kota Pagar Alam'),(1674,16,'Kota Lubuklinggau'),(1701,17,'Kab. Bengkulu Selatan'),(1702,17,'Kab. Rejang Lebong'),(1703,17,'Kab. Bengkulu Utara'),(1704,17,'Kab. Kaur'),(1705,17,'Kab. Seluma'),(1706,17,'Kab. Mukomuko'),(1707,17,'Kab. Lebong'),(1708,17,'Kab. Kepahiang'),(1709,17,'Kab. Bengkulu Tengah'),(1771,17,'Kota Bengkulu'),(1801,18,'Kab. Lampung Barat'),(1802,18,'Kab. Tanggamus'),(1803,18,'Kab. Lampung Selatan'),(1804,18,'Kab. Lampung Timur'),(1805,18,'Kab. Lampung Tengah'),(1806,18,'Kab. Lampung Utara'),(1807,18,'Kab. Way Kanan'),(1808,18,'Kab. Tulangbawang'),(1809,18,'Kab. Pesawaran'),(1810,18,'Kab. Pringsewu'),(1811,18,'Kab. Mesuji'),(1812,18,'Kab. Tulang Bawang Barat'),(1813,18,'Kab. Pesisir Barat'),(1871,18,'Kota Bandar Lampung'),(1872,18,'Kota Metro'),(1901,19,'Kab. Bangka'),(1902,19,'Kab. Belitung'),(1903,19,'Kab. Bangka Barat'),(1904,19,'Kab. Bangka Tengah'),(1905,19,'Kab. Bangka Selatan'),(1906,19,'Kab. Belitung Timur'),(1971,19,'Kota Pangkal Pinang'),(2101,21,'Kab. Karimun'),(2102,21,'Kab. Bintan'),(2103,21,'Kab. Natuna'),(2104,21,'Kab. Lingga'),(2105,21,'Kab. Kepulauan Anambas'),(2171,21,'Kota B A T A M'),(2172,21,'Kota Tanjung Pinang'),(3101,31,'Kab. Kepulauan Seribu'),(3171,31,'Kota Jakarta Selatan'),(3172,31,'Kota Jakarta Timur'),(3173,31,'Kota Jakarta Pusat'),(3174,31,'Kota Jakarta Barat'),(3175,31,'Kota Jakarta Utara'),(3201,32,'Kab. Bogor'),(3202,32,'Kab. Sukabumi'),(3203,32,'Kab. Cianjur'),(3204,32,'Kab. Bandung'),(3205,32,'Kab. Garut'),(3206,32,'Kab. Tasikmalaya'),(3207,32,'Kab. Ciamis'),(3208,32,'Kab. Kuningan'),(3209,32,'Kab. Cirebon'),(3210,32,'Kab. Majalengka'),(3211,32,'Kab. Sumedang'),(3212,32,'Kab. Indramayu'),(3213,32,'Kab. Subang'),(3214,32,'Kab. Purwakarta'),(3215,32,'Kab. Karawang'),(3216,32,'Kab. Bekasi'),(3217,32,'Kab. Bandung Barat'),(3218,32,'Kab. Pangandaran'),(3271,32,'Kota Bogor'),(3272,32,'Kota Sukabumi'),(3273,32,'Kota Bandung'),(3274,32,'Kota Cirebon'),(3275,32,'Kota Bekasi'),(3276,32,'Kota Depok'),(3277,32,'Kota Cimahi'),(3278,32,'Kota Tasikmalaya'),(3279,32,'Kota Banjar'),(3301,33,'Kab. Cilacap'),(3302,33,'Kab. Banyumas'),(3303,33,'Kab. Purbalingga'),(3304,33,'Kab. Banjarnegara'),(3305,33,'Kab. Kebumen'),(3306,33,'Kab. Purworejo'),(3307,33,'Kab. Wonosobo'),(3308,33,'Kab. Magelang'),(3309,33,'Kab. Boyolali'),(3310,33,'Kab. Klaten'),(3311,33,'Kab. Sukoharjo'),(3312,33,'Kab. Wonogiri'),(3313,33,'Kab. Karanganyar'),(3314,33,'Kab. Sragen'),(3315,33,'Kab. Grobogan'),(3316,33,'Kab. Blora'),(3317,33,'Kab. Rembang'),(3318,33,'Kab. Pati'),(3319,33,'Kab. Kudus'),(3320,33,'Kab. Jepara'),(3321,33,'Kab. Demak'),(3322,33,'Kab. Semarang'),(3323,33,'Kab. Temanggung'),(3324,33,'Kab. Kendal'),(3325,33,'Kab. Batang'),(3326,33,'Kab. Pekalongan'),(3327,33,'Kab. Pemalang'),(3328,33,'Kab. Tegal'),(3329,33,'Kab. Brebes'),(3371,33,'Kota Magelang'),(3372,33,'Kota Surakarta'),(3373,33,'Kota Salatiga'),(3374,33,'Kota Semarang'),(3375,33,'Kota Pekalongan'),(3376,33,'Kota Tegal'),(3401,34,'Kab. Kulon Progo'),(3402,34,'Kab. Bantul'),(3403,34,'Kab. Gunung Kidul'),(3404,34,'Kab. Sleman'),(3471,34,'Kota Yogyakarta'),(3501,35,'Kab. Pacitan'),(3502,35,'Kab. Ponorogo'),(3503,35,'Kab. Trenggalek'),(3504,35,'Kab. Tulungagung'),(3505,35,'Kab. Blitar'),(3506,35,'Kab. Kediri'),(3507,35,'Kab. Malang'),(3508,35,'Kab. Lumajang'),(3509,35,'Kab. Jember'),(3510,35,'Kab. Banyuwangi'),(3511,35,'Kab. Bondowoso'),(3512,35,'Kab. Situbondo'),(3513,35,'Kab. Probolinggo'),(3514,35,'Kab. Pasuruan'),(3515,35,'Kab. Sidoarjo'),(3516,35,'Kab. Mojokerto'),(3517,35,'Kab. Jombang'),(3518,35,'Kab. Nganjuk'),(3519,35,'Kab. Madiun'),(3520,35,'Kab. Magetan'),(3521,35,'Kab. Ngawi'),(3522,35,'Kab. Bojonegoro'),(3523,35,'Kab. Tuban'),(3524,35,'Kab. Lamongan'),(3525,35,'Kab. Gresik'),(3526,35,'Kab. Bangkalan'),(3527,35,'Kab. Sampang'),(3528,35,'Kab. Pamekasan'),(3529,35,'Kab. Sumenep'),(3571,35,'Kota Kediri'),(3572,35,'Kota Blitar'),(3573,35,'Kota Malang'),(3574,35,'Kota Probolinggo'),(3575,35,'Kota Pasuruan'),(3576,35,'Kota Mojokerto'),(3577,35,'Kota Madiun'),(3578,35,'Kota Surabaya'),(3579,35,'Kota Batu'),(3601,36,'Kab. Pandeglang'),(3602,36,'Kab. Lebak'),(3603,36,'Kab. Tangerang'),(3604,36,'Kab. Serang'),(3671,36,'Kota Tangerang'),(3672,36,'Kota Cilegon'),(3673,36,'Kota Serang'),(3674,36,'Kota Tangerang Selatan'),(5000,95,'test'),(5101,51,'Kab. Jembrana'),(5102,51,'Kab. Tabanan'),(5103,51,'Kab. Badung'),(5104,51,'Kab. Gianyar'),(5105,51,'Kab. Klungkung'),(5106,51,'Kab. Bangli'),(5107,51,'Kab. Karang Asem'),(5108,51,'Kab. Buleleng'),(5171,51,'Kota Denpasar'),(5201,52,'Kab. Lombok Barat'),(5202,52,'Kab. Lombok Tengah'),(5203,52,'Kab. Lombok Timur'),(5204,52,'Kab. Sumbawa'),(5205,52,'Kab. Dompu'),(5206,52,'Kab. Bima'),(5207,52,'Kab. Sumbawa Barat'),(5208,52,'Kab. Lombok Utara'),(5271,52,'Kota Mataram'),(5272,52,'Kota Bima'),(5301,53,'Kab. Sumba Barat'),(5302,53,'Kab. Sumba Timur'),(5303,53,'Kab. Kupang'),(5304,53,'Kab. Timor Tengah Selatan'),(5305,53,'Kab. Timor Tengah Utara'),(5306,53,'Kab. Belu'),(5307,53,'Kab. Alor'),(5308,53,'Kab. Lembata'),(5309,53,'Kab. Flores Timur'),(5310,53,'Kab. Sikka'),(5311,53,'Kab. Ende'),(5312,53,'Kab. Ngada'),(5313,53,'Kab. Manggarai'),(5314,53,'Kab. Rote Ndao'),(5315,53,'Kab. Manggarai Barat'),(5316,53,'Kab. Sumba Tengah'),(5317,53,'Kab. Sumba Barat Daya'),(5318,53,'Kab. Nagekeo'),(5319,53,'Kab. Manggarai Timur'),(5320,53,'Kab. Sabu Raijua'),(5371,53,'Kota Kupang'),(6101,61,'Kab. Sambas'),(6102,61,'Kab. Bengkayang'),(6103,61,'Kab. Landak'),(6104,61,'Kab. Pontianak'),(6105,61,'Kab. Sanggau'),(6106,61,'Kab. Ketapang'),(6107,61,'Kab. Sintang'),(6108,61,'Kab. Kapuas Hulu'),(6109,61,'Kab. Sekadau'),(6110,61,'Kab. Melawi'),(6111,61,'Kab. Kayong Utara'),(6112,61,'Kab. Kubu Raya'),(6171,61,'Kota Pontianak'),(6172,61,'Kota Singkawang'),(6201,62,'Kab. Kotawaringin Barat'),(6202,62,'Kab. Kotawaringin Timur'),(6203,62,'Kab. Kapuas'),(6204,62,'Kab. Barito Selatan'),(6205,62,'Kab. Barito Utara'),(6206,62,'Kab. Sukamara'),(6207,62,'Kab. Lamandau'),(6208,62,'Kab. Seruyan'),(6209,62,'Kab. Katingan'),(6210,62,'Kab. Pulang Pisau'),(6211,62,'Kab. Gunung Mas'),(6212,62,'Kab. Barito Timur'),(6213,62,'Kab. Murung Raya'),(6271,62,'Kota Palangka Raya'),(6301,63,'Kab. Tanah Laut'),(6302,63,'Kab. Kota Baru'),(6303,63,'Kab. Banjar'),(6304,63,'Kab. Barito Kuala'),(6305,63,'Kab. Tapin'),(6306,63,'Kab. Hulu Sungai Selatan'),(6307,63,'Kab. Hulu Sungai Tengah'),(6308,63,'Kab. Hulu Sungai Utara'),(6309,63,'Kab. Tabalong'),(6310,63,'Kab. Tanah Bumbu'),(6311,63,'Kab. Balangan'),(6371,63,'Kota Banjarmasin'),(6372,63,'Kota Banjar Baru'),(6401,64,'Kab. Paser'),(6402,64,'Kab. Kutai Barat'),(6403,64,'Kab. Kutai Kartanegara'),(6404,64,'Kab. Kutai Timur'),(6405,64,'Kab. Berau'),(6409,64,'Kab. Penajam Paser Utara'),(6471,64,'Kota Balikpapan'),(6472,64,'Kota Samarinda'),(6474,64,'Kota Bontang'),(6501,65,'Kab. Malinau'),(6502,65,'Kab. Bulungan'),(6503,65,'Kab. Tana Tidung'),(6504,65,'Kab. Nunukan'),(6571,65,'Kota Tarakan'),(7101,71,'Kab. Bolaang Mongondow'),(7102,71,'Kab. Minahasa'),(7103,71,'Kab. Kepulauan Sangihe'),(7104,71,'Kab. Kepulauan Talaud'),(7105,71,'Kab. Minahasa Selatan'),(7106,71,'Kab. Minahasa Utara'),(7107,71,'Kab. Bolaang Mongondow Utara'),(7108,71,'Kab. Siau Tagulandang Biaro'),(7109,71,'Kab. Minahasa Tenggara'),(7110,71,'Kab. Bolaang Mongondow Selatan'),(7111,71,'Kab. Bolaang Mongondow Timur'),(7171,71,'Kota Manado'),(7172,71,'Kota Bitung'),(7173,71,'Kota Tomohon'),(7174,71,'Kota Kotamobagu'),(7201,72,'Kab. Banggai Kepulauan'),(7202,72,'Kab. Banggai'),(7203,72,'Kab. Morowali'),(7204,72,'Kab. Poso'),(7205,72,'Kab. Donggala'),(7206,72,'Kab. Toli-toli'),(7207,72,'Kab. Buol'),(7208,72,'Kab. Parigi Moutong'),(7209,72,'Kab. Tojo Una-una'),(7210,72,'Kab. Sigi'),(7271,72,'Kota Palu'),(7301,73,'Kab. Kepulauan Selayar'),(7302,73,'Kab. Bulukumba'),(7303,73,'Kab. Bantaeng'),(7304,73,'Kab. Jeneponto'),(7305,73,'Kab. Takalar'),(7306,73,'Kab. Gowa'),(7307,73,'Kab. Sinjai'),(7308,73,'Kab. Maros'),(7309,73,'Kab. Pangkajene Dan Kepulauan'),(7310,73,'Kab. Barru'),(7311,73,'Kab. Bone'),(7312,73,'Kab. Soppeng'),(7313,73,'Kab. Wajo'),(7314,73,'Kab. Sidenreng Rappang'),(7315,73,'Kab. Pinrang'),(7316,73,'Kab. Enrekang'),(7317,73,'Kab. Luwu'),(7318,73,'Kab. Tana Toraja'),(7322,73,'Kab. Luwu Utara'),(7325,73,'Kab. Luwu Timur'),(7326,73,'Kab. Toraja Utara'),(7371,73,'Kota Makassar'),(7372,73,'Kota Parepare'),(7373,73,'Kota Palopo'),(7401,74,'Kab. Buton'),(7402,74,'Kab. Muna'),(7403,74,'Kab. Konawe'),(7404,74,'Kab. Kolaka'),(7405,74,'Kab. Konawe Selatan'),(7406,74,'Kab. Bombana'),(7407,74,'Kab. Wakatobi'),(7408,74,'Kab. Kolaka Utara'),(7409,74,'Kab. Buton Utara'),(7410,74,'Kab. Konawe Utara'),(7471,74,'Kota Kendari'),(7472,74,'Kota Baubau'),(7501,75,'Kab. Boalemo'),(7502,75,'Kab. Gorontalo'),(7503,75,'Kab. Pohuwato'),(7504,75,'Kab. Bone Bolango'),(7505,75,'Kab. Gorontalo Utara'),(7571,75,'Kota Gorontalo'),(7601,76,'Kab. Majene'),(7602,76,'Kab. Polewali Mandar'),(7603,76,'Kab. Mamasa'),(7604,76,'Kab. Mamuju'),(7605,76,'Kab. Mamuju Utara'),(8101,81,'Kab. Maluku Tenggara Barat'),(8102,81,'Kab. Maluku Tenggara'),(8103,81,'Kab. Maluku Tengah'),(8104,81,'Kab. Buru'),(8105,81,'Kab. Kepulauan Aru'),(8106,81,'Kab. Seram Bagian Barat'),(8107,81,'Kab. Seram Bagian Timur'),(8108,81,'Kab. Maluku Barat Daya'),(8109,81,'Kab. Buru Selatan'),(8171,81,'Kota Ambon'),(8172,81,'Kota Tual'),(8201,82,'Kab. Halmahera Barat'),(8202,82,'Kab. Halmahera Tengah'),(8203,82,'Kab. Kepulauan Sula'),(8204,82,'Kab. Halmahera Selatan'),(8205,82,'Kab. Halmahera Utara'),(8206,82,'Kab. Halmahera Timur'),(8207,82,'Kab. Pulau Morotai'),(8271,82,'Kota Ternate'),(8272,82,'Kota Tidore Kepulauan'),(9101,91,'Kab. Fakfak'),(9102,91,'Kab. Kaimana'),(9103,91,'Kab. Teluk Wondama'),(9104,91,'Kab. Teluk Bintuni'),(9105,91,'Kab. Manokwari'),(9106,91,'Kab. Sorong Selatan'),(9107,91,'Kab. Sorong'),(9108,91,'Kab. Raja Ampat'),(9109,91,'Kab. Tambrauw'),(9110,91,'Kab. Maybrat'),(9171,91,'Kota Sorong'),(9401,94,'Kab. Merauke'),(9402,94,'Kab. Jayawijaya'),(9403,94,'Kab. Jayapura'),(9404,94,'Kab. Nabire'),(9408,94,'Kab. Kepulauan Yapen'),(9409,94,'Kab. Biak Numfor'),(9410,94,'Kab. Paniai'),(9411,94,'Kab. Puncak Jaya'),(9412,94,'Kab. Mimika'),(9413,94,'Kab. Boven Digoel'),(9414,94,'Kab. Mappi'),(9415,94,'Kab. Asmat'),(9416,94,'Kab. Yahukimo'),(9417,94,'Kab. Pegunungan Bintang'),(9418,94,'Kab. Tolikara'),(9419,94,'Kab. Sarmi'),(9420,94,'Kab. Keerom'),(9426,94,'Kab. Waropen'),(9427,94,'Kab. Supiori'),(9428,94,'Kab. Mamberamo Raya'),(9429,94,'Kab. Nduga'),(9430,94,'Kab. Lanny Jaya'),(9431,94,'Kab. Mamberamo Tengah'),(9432,94,'Kab. Yalimo'),(9433,94,'Kab. Puncak'),(9434,94,'Kab. Dogiyai'),(9435,94,'Kab. Intan Jaya'),(9436,94,'Kab. Deiyai'),(9471,94,'Kota Jayapura');
/*!40000 ALTER TABLE `m_kabkota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_provinsi`
--

DROP TABLE IF EXISTS `m_provinsi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_provinsi` (
  `idprovinsi` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) NOT NULL,
  PRIMARY KEY (`idprovinsi`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_provinsi`
--

LOCK TABLES `m_provinsi` WRITE;
/*!40000 ALTER TABLE `m_provinsi` DISABLE KEYS */;
INSERT INTO `m_provinsi` VALUES (11,'Aceh'),(12,'Sumatera Utara'),(13,'Sumatera Barat'),(14,'Riau'),(15,'Jambi'),(16,'Sumatera Selatan'),(17,'Bengkulu'),(18,'Lampung'),(19,'Kepulauan Bangka Belitung'),(21,'Kepulauan Riau'),(31,'Dki Jakarta'),(32,'Jawa Barat'),(33,'Jawa Tengah'),(34,'Di Yogyakarta'),(35,'Jawa Timur'),(36,'Banten'),(51,'Bali'),(52,'Nusa Tenggara Barat'),(53,'Nusa Tenggara Timur'),(61,'Kalimantan Barat'),(62,'Kalimantan Tengah'),(63,'Kalimantan Selatan'),(64,'Kalimantan Timur'),(65,'Kalimantan Utara'),(71,'Sulawesi Utara'),(72,'Sulawesi Tengah'),(73,'Sulawesi Selatan'),(74,'Sulawesi Tenggara'),(75,'Gorontalo'),(76,'Sulawesi Barat'),(81,'Maluku'),(82,'Maluku Utara'),(91,'Papua Barat'),(94,'Papua'),(95,'Timor Leste');
/*!40000 ALTER TABLE `m_provinsi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `officer`
--

DROP TABLE IF EXISTS `officer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `officer` (
  `idofficer` int(11) NOT NULL AUTO_INCREMENT,
  `keterangan` varchar(400) DEFAULT NULL,
  `catatan` varchar(400) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `nama` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idofficer`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officer`
--

LOCK TABLES `officer` WRITE;
/*!40000 ALTER TABLE `officer` DISABLE KEYS */;
/*!40000 ALTER TABLE `officer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detil`
--

DROP TABLE IF EXISTS `order_detil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_detil` (
  `idorder_detil` int(11) NOT NULL AUTO_INCREMENT,
  `idorder` int(11) NOT NULL,
  `idlayanan` int(11) NOT NULL,
  `tgl_mulai` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tgl_selesai` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `keterangan` varchar(400) DEFAULT NULL,
  `idusr` int(11) NOT NULL,
  PRIMARY KEY (`idorder_detil`,`idorder`,`idlayanan`,`idusr`),
  KEY `fk_order_detil_1_idx` (`idorder`),
  KEY `fk_order_detil_2_idx` (`idlayanan`),
  KEY `fk_order_detil_3_idx` (`idusr`),
  CONSTRAINT `fk_order_detil_1` FOREIGN KEY (`idorder`) REFERENCES `orderan` (`idorder`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_detil_2` FOREIGN KEY (`idlayanan`) REFERENCES `layanan` (`idlayanan`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_detil_3` FOREIGN KEY (`idusr`) REFERENCES `usr` (`idusr`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detil`
--

LOCK TABLES `order_detil` WRITE;
/*!40000 ALTER TABLE `order_detil` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detilfidusia`
--

DROP TABLE IF EXISTS `order_detilfidusia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_detilfidusia` (
  `idorder_detil` int(11) NOT NULL AUTO_INCREMENT,
  `idorder` int(11) NOT NULL,
  `idlayanan` int(11) NOT NULL,
  `tgl_mulai` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tgl_selesai` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `keterangan` varchar(400) DEFAULT NULL,
  `idusr` int(11) NOT NULL,
  PRIMARY KEY (`idorder_detil`,`idorder`,`idlayanan`,`idusr`),
  KEY `fk_order_detilfidusia_1_idx` (`idorder`),
  KEY `fk_order_detilfidusia_2_idx` (`idlayanan`),
  KEY `fk_order_detilfidusia_3_idx` (`idusr`),
  CONSTRAINT `fk_order_detilfidusia_1` FOREIGN KEY (`idorder`) REFERENCES `orderfidusia` (`idorder`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_detilfidusia_2` FOREIGN KEY (`idlayanan`) REFERENCES `layanan` (`idlayanan`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_detilfidusia_3` FOREIGN KEY (`idusr`) REFERENCES `usr` (`idusr`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detilfidusia`
--

LOCK TABLES `order_detilfidusia` WRITE;
/*!40000 ALTER TABLE `order_detilfidusia` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detilfidusia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderan`
--

DROP TABLE IF EXISTS `orderan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderan` (
  `idorder` int(11) NOT NULL AUTO_INCREMENT,
  `idklien` int(11) NOT NULL,
  `deskripsi` varchar(45) DEFAULT NULL,
  `no_akta` varchar(45) DEFAULT NULL,
  `no_berkas` varchar(45) DEFAULT NULL,
  `idofficer` int(11) NOT NULL,
  `tgl_order` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tgl_selesai` timestamp NULL DEFAULT NULL,
  `catatan` varchar(400) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `idbank` int(11) NOT NULL DEFAULT '4',
  `tipepembeli` int(11) NOT NULL DEFAULT '1',
  `penjual` varchar(45) NOT NULL,
  `tgl_realisasi` date NOT NULL,
  PRIMARY KEY (`idorder`,`idklien`,`idofficer`,`idbank`),
  UNIQUE KEY `idorder_UNIQUE` (`idorder`),
  KEY `fk_order_1_idx` (`idklien`),
  KEY `fk_order_2_idx` (`idofficer`),
  KEY `fk_order_3_idx` (`idbank`),
  CONSTRAINT `fk_order_1` FOREIGN KEY (`idklien`) REFERENCES `klien` (`idklien`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_2` FOREIGN KEY (`idofficer`) REFERENCES `officer` (`idofficer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_3` FOREIGN KEY (`idbank`) REFERENCES `bank` (`idbank`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderan`
--

LOCK TABLES `orderan` WRITE;
/*!40000 ALTER TABLE `orderan` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderfidusia`
--

DROP TABLE IF EXISTS `orderfidusia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderfidusia` (
  `idorder` int(11) NOT NULL AUTO_INCREMENT,
  `idklien` int(11) NOT NULL,
  `pemberi` varchar(45) DEFAULT NULL,
  `debitur` varchar(45) DEFAULT NULL,
  `no_ajf` varchar(45) DEFAULT NULL,
  `no_berkas` varchar(45) DEFAULT NULL,
  `no_ppk` varchar(45) DEFAULT NULL,
  `idofficer` int(11) NOT NULL,
  `hutang` int(11) DEFAULT '0',
  `obyek` int(11) DEFAULT '0',
  `tgl_order` date NOT NULL,
  `tgl_selesai` timestamp NULL DEFAULT NULL,
  `catatan` varchar(400) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `jangka` tinyint(1) NOT NULL DEFAULT '0',
  `tipepembeli` int(11) NOT NULL DEFAULT '1',
  `tgl_ajf` date NOT NULL,
  `tgl_ppk` date NOT NULL,
  `idkorektor` int(11) NOT NULL,
  `idkorektor2` int(11) NOT NULL,
  PRIMARY KEY (`idorder`,`idklien`,`idofficer`,`idkorektor`,`idkorektor2`),
  UNIQUE KEY `idorder_UNIQUE` (`idorder`),
  KEY `fk_orderfidusia_1_idx` (`idklien`),
  KEY `fk_orderfidusia_2_idx` (`idofficer`),
  KEY `fk_orderfidusia_3_idx` (`idkorektor`),
  KEY `fk_orderfidusia_4_idx` (`idkorektor2`),
  CONSTRAINT `fk_orderfidusia_1` FOREIGN KEY (`idklien`) REFERENCES `klien` (`idklien`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_orderfidusia_2` FOREIGN KEY (`idofficer`) REFERENCES `officer` (`idofficer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_orderfidusia_3` FOREIGN KEY (`idkorektor`) REFERENCES `usr` (`idusr`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_orderfidusia_4` FOREIGN KEY (`idkorektor2`) REFERENCES `usr` (`idusr`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderfidusia`
--

LOCK TABLES `orderfidusia` WRITE;
/*!40000 ALTER TABLE `orderfidusia` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderfidusia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paket`
--

DROP TABLE IF EXISTS `paket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paket` (
  `idpaket` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) NOT NULL,
  `deskripsi` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`idpaket`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paket`
--

LOCK TABLES `paket` WRITE;
/*!40000 ALTER TABLE `paket` DISABLE KEYS */;
INSERT INTO `paket` VALUES (5,'APHT','APHT'),(6,'AJB & APHT','AJB & APHT'),(7,'Fidusia','fidusia');
/*!40000 ALTER TABLE `paket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paketlayanan`
--

DROP TABLE IF EXISTS `paketlayanan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paketlayanan` (
  `idpaketlayanan` int(11) NOT NULL AUTO_INCREMENT,
  `idlayanan` int(11) NOT NULL,
  `idpaket` int(11) NOT NULL,
  PRIMARY KEY (`idpaketlayanan`),
  KEY `fk_paketlayanan_1_idx` (`idpaket`),
  KEY `fk_paketlayanan_2_idx` (`idlayanan`),
  CONSTRAINT `fk_paketlayanan_1` FOREIGN KEY (`idpaket`) REFERENCES `paket` (`idpaket`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_paketlayanan_2` FOREIGN KEY (`idlayanan`) REFERENCES `layanan` (`idlayanan`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paketlayanan`
--

LOCK TABLES `paketlayanan` WRITE;
/*!40000 ALTER TABLE `paketlayanan` DISABLE KEYS */;
INSERT INTO `paketlayanan` VALUES (16,16,5),(17,17,5),(18,18,5),(19,19,5),(20,20,5),(21,21,5),(22,22,5),(23,23,5),(24,24,5),(25,25,5),(26,26,6),(27,27,6),(28,28,6),(29,20,6),(30,21,6),(31,22,6),(32,23,6),(33,16,6),(34,17,6),(35,18,6),(36,19,6),(37,20,6),(38,21,6),(39,22,6),(40,23,6),(41,24,6),(42,25,6),(43,29,7),(44,30,7),(45,31,7),(46,32,7),(47,33,7),(48,34,7);
/*!40000 ALTER TABLE `paketlayanan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usr`
--

DROP TABLE IF EXISTS `usr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usr` (
  `idusr` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(64) NOT NULL DEFAULT '387a8233c96e1fc0ad5e284353276177af2186e7afa85296f106336e376669f7',
  `email` varchar(45) NOT NULL,
  `nohp` varchar(45) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `level` int(11) NOT NULL DEFAULT '2',
  `nama` varchar(45) DEFAULT NULL,
  `foto` varchar(45) NOT NULL DEFAULT 'anon.png',
  PRIMARY KEY (`idusr`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usr`
--

LOCK TABLES `usr` WRITE;
/*!40000 ALTER TABLE `usr` DISABLE KEYS */;
INSERT INTO `usr` VALUES (0,'unknown','387a8233c96e1fc0ad5e284353276177af2186e7afa85296f106336e376669f7','unknown@gmail.com','000000000',1,3,'unknown','anon.png'),(3,'ryan','387a8233c96e1fc0ad5e284353276177af2186e7afa85296f106336e376669f7','ryanthe@gmail.com','0817309405',1,1,'Ryan Fabella','Ryan Fabellaryan.png'),(9,'resepsionis','387a8233c96e1fc0ad5e284353276177af2186e7afa85296f106336e376669f7','resepsionis@gmail.com','0808080',1,4,'resepsionis','resepsionisprofile-icon.png'),(23,'monitor','387a8233c96e1fc0ad5e284353276177af2186e7afa85296f106336e376669f7','dashboard@gmail.com','08108080812',1,5,'dashboard','dashboardIMG_3242.JPG'),(24,'ppat','387a8233c96e1fc0ad5e284353276177af2186e7afa85296f106336e376669f7','ppat@gmail.com','0817309405',1,2,'Supervisor ppat','Supervisor ppat5.png'),(25,'fidusia','387a8233c96e1fc0ad5e284353276177af2186e7afa85296f106336e376669f7','fidusia@gmail.com','0817309405',1,6,'Fidusia','Fidusia11.png');
/*!40000 ALTER TABLE `usr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'notariat'
--
/*!50003 DROP FUNCTION IF EXISTS `namaklien` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `namaklien`(idval INT) RETURNS varchar(45) CHARSET utf8
    DETERMINISTIC
BEGIN
    DECLARE hasil varchar(45);
	select nama into hasil from klien where idklien = idval;
    
 RETURN (hasil);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `namalayanan` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `namalayanan`(idval INT) RETURNS varchar(45) CHARSET utf8
BEGIN
  DECLARE hasil varchar(45);
	select nama into hasil from layanan where idlayanan = idval;
   
	RETURN (hasil);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `namauser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `namauser`(idval INT) RETURNS varchar(45) CHARSET utf8
    DETERMINISTIC
BEGIN
    DECLARE hasil VARCHAR(45);
	select nama into hasil from usr where idusr = idval;
RETURN (hasil);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-08  7:03:08
