<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
include_once './config/autoload.php';

if (!empty($_POST['fungsi'])) {
	$fungsi = $_POST['fungsi'];
}

if ($fungsi == 'selectNormal') {//selectNormal
	$query = selectNormal($conn, $table);
	$response = $query;
}
if ($fungsi == 'selectWhere') {//selectWhere
	$query = selectWhere($conn, $table, $_POST['kondisi']);
	if ($query) {
		$response['status'] = true;
		$response['nim'] = $query['NIM'];
		$response['nama'] = $query['nama'];
		$response['kelas'] = $query['kelas'];
		$response['progdi'] = $query['progdi'];
		$response['email'] = $query['email'];
	}
	else{
		$response['status'] = false;
	}
}
if ($fungsi == 'insertNormal') {//insertNormal
	$data = array(
			'NIM' => $_POST['nim-add'],
			'nama' => $_POST['nama-add'],
			'progdi' => $_POST['progdi-add'],
			'kelas'	=> $_POST['kelas-add'],
			'email' => $_POST['email-add']);
	$query = insertNormal($conn, $table, $data);
	if ($query) {
		$response['status'] = true;
	}
	else{
		$response['status'] = false;
	}
}
if ($fungsi == 'deleteWhere'){//deleteWhere
	$kondisi = $_POST['kondisi'];
	$query = deleteWhere($conn, $table, $kondisi);	
	if ($query != true) {
		$response['status'] = false;
	}
	else{
		$response['status'] = true;
	}
}
if ($fungsi == 'updateNormal') {
	$kondisi = $_POST['kondisi'];
	$data = array(
			'NIM' => $_POST['nim-edit'],
			'nama' => $_POST['nama-edit'],
			'progdi' => $_POST['progdi-edit'],
			'kelas'	=> $_POST['kelas-edit'],
			'email' => $_POST['email-edit']);
	$query = updateNormal($conn, $table, $data, $kondisi);
	if ($query) {
		$response['status'] = true;
	}
	else{
		$response['status'] = false;
	}
}


//echo $fungsi;
echo json_encode($response);

/*
$datatest = array(
			'NIM' => '160000000',
			'nama' => 'test nama',
			'progdi' => 'test prodi',
			'kelas'	=> 'A',
			'email' => 'test email');
$datatestubah = array(
			'NIM' => '160000000',
			'nama' => 'tester namaewa',
			'progdi' => 'tester prodi',
			'kelas'	=> 'Z',
			'email' => 'tester emaile');

$data = array(
			'NIM' => '160103091',
			'nama' => 'Zulma Bagas Setyadi',
			'progdi' => 'Teknik Informatika',
			'kelas'	=> 'A',
			'email' => 'zulmabagas01@gmail.com');
*/
//data
//////
//$field  = explainTable($conn, $table);
//var_dump($field);
//var_dump(showTable($conn));

//crud
/*
//---------CREATE
$insertdb = insertNormal($conn, $table, $datatest);
if ($insertdb) {
	echo "tersimpan";
}
else{
	echo "gagal simpan";
}
*/

//---------READ
//$showdb = selectNormal($conn, $table);
//var_dump($config);

/*
//---------UPDATE
$updatedb = updateNormal($conn, $table, $datatestubah, 'NIM='.$datatestubah['NIM']);
if ($updatedb) {
	echo "update";
}
else{
	echo "gagal update";
}
*/


/*
//---------DELETE
$deletedb = deleteWhere($conn, $table, 'email="email darma" or email="email"');
echo "<br>";
if ($deletedb != true) {
	echo "hapus";
}
else{
	echo "gagal hapus";
}
*/
/*
$query = "ALTER ".$table." ADD password text";
$execute = $conn->query($query);
if ($execute) {
	echo "berhasil tambah field";
}
else{
	die("Gagal tambah field.");
}*/
?>