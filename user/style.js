

function loadPage(){
	$('#test-load').html('');
  //alert(db);
  $.ajax({
      type : 'post',
      url : baseURL,
      data : {fungsi: 'selectNormal'},
      dataType : 'json',
      success : function(response){
          for (var i = 0; i < response.length; i++) {
            if (response[i].nama != 'admin') {   
              //$html = '<tr><td>'+response[i].NIM+'</td><td>'+response[i].nama+'<div hidden=""><label id="nim-'+i+'">'+response[i].NIM+'</label><label id="nama-'+i+'">'+response[i].nama+'</label><label id="progdi-'+i+'">'+response[i].progdi+'</label><label id="kelas-'+i+'">'+response[i].kelas+'</label></div></td><td class="i-aksi"><span class="icon-button" id="button-info-'+i+'" onclick="showPopUp('+i+')"><i class="fa fa-info-circle" aria-hidden="true"></i></span></td></tr>';
               $html = '<tr><td>'+response[i].NIM+'</td><td>'+response[i].nama+'<div><div id="box-tb-hide-'+i+'" hidden=""><label id="nim-'+i+'">'+response[i].NIM+'</label><label id="nama-'+i+'">'+response[i].nama+'</label></div><div id="box-show-'+i+'" class="box-show-all"><div class="box-progdi box-datatable"><label class="lbl-datatable datatable">Progdi</label><div class="div-datatable datatable"> : <label id="progdi-'+i+'">'+response[i].progdi+'</lebel></div></div><div class="box-kelas box-datatable"><label class="lbl-datatable datatable">Kelas</label><div class="div-datatable datatable"> : <label id="kelas-'+i+'">'+response[i].kelas+'</label></div></div><div class="box-email box-datatable"><label class="lbl-datatable datatable">Email</label><div class="div-datatable datatable"> : <label id="email-'+i+'">'+response[i].email+'</label></div></div></div></div></td><td class="i-aksi"><span class="icon-button"><i class="fa fa-info-circle icon-aksi infoshow-all" id="infoShow-'+i+'" aria-hidden="true" onclick="showMore('+i+')"></i><i class="fa fa-times-circle icon-aksi infohide-all" id="infoHide-'+i+'" aria-hidden="true" onclick="defaultSetting()"></i><i class="fa fa-trash-o icon-aksi aksi-all" id="aksihapus-'+i+'" aria-hidden="true" onclick="hapus('+response[i].NIM+')"></i><i class="fa fa-pencil-square-o icon-aksi aksi-all" id="aksiubah-'+i+'" aria-hidden="true" data-toggle="modal" data-target="#box-edit" onclick="boxUbah('+i+')"></i></span></td></tr>';
              $('#test-load').html($('#test-load').html()+$html);
            }
          }
          defaultSetting();
      }
  });
}

function loadMore(){
  $('#cache-nim').html('');
  $('#cache-nama').html('');
  $('#cache-nim').html(getCookie()[0]);
  $('#cache-nama').html(getCookie()[1]);
}

function showPopUp(index){
	alert(index);
}

function login(){
	var nim = $('#nim').val();
	var email = $('#email').val();
	var kondisi = ' NIM='+nim+' and email="'+email+'"';
	//alert(kondisi);
	$.ajax({
		type : 'post',
        url : baseURL,
        data : {fungsi:'selectWhere', kondisi:kondisi},
        dataType : 'json',
        success : function(response){
        	if (response.status) {
            document.cookie = 'nim='+response.nim+'|nama='+response.nama+'|kelas='+response.kelas+'|progdi='+response.progdi+'|email='+response.email;
            $('#konten').load('./homepage.html');
        	}
        	else{
        		alert('Belum Terdaftar!');
        	}
        }	
	})
}

function logout(){
  document.cookie = 'nim=|nama=|kelas=|progdi=|email=';
  $('#konten').load('./index.html');
}

function cekLogin(){
  var nim = getCookie()[0];
  $.each(getCookie(), function(index, data){
    console.log(index+', '+data);
  });
  if ((nim == undefined) || (nim == '')){
    $('#konten').load('./login.html');
  }
}

function tambah(){
	var form = $('#form-add');//var form = $('#form-signin');
	var data = $(form).serialize();
  var cookie = getCookie();
	data = data+'&fungsi=insertNormal';

	$.ajax({
		type : 'post',
		url : baseURL,
		data : data,
		dataType : 'json',
		success : function(response){
			if (response.status) {
        if (cookie != '') {
          alert('Data telah disimpan.');  
        }
        else{
          alert('Silahkan Login.');
        }
			}
			else{
        if (cookie != '') {
          alert('Data Gagal Disimpan, harap hubungi developer!');
        }
        else{
          alert('Pendaftaran Gagal, harap hubungi developer!');
        }
			}
      clearInput();
      location.href='./index.html';
		}
	})
}

function ubah(){
  var form = $('#form-edit');
  var data = $(form).serialize();
  var cookie = getCookie();
  var nim = $('#nim-default').val();
  var nama = $('#nama-edit').val();
  var kelas = $('#kelas-edit').val();
  var progdi = $('#progdi-edit').val();
  var email = $('#email-default').val();
  var kondisi = ' NIM='+nim+' and email="'+email+'"';
  data = data+'&fungsi=updateNormal&kondisi='+kondisi;
  //alert(nim+', '+email);
  $.ajax({
    type : 'post',
    url : baseURL,
    data : data,
    dataType : 'json',
    success : function(response){
      if (response.status) {
        alert('Data telah dirubah.');
        //alert('nim='+nim+', nama='+nama+', kelas='+kelas+', progdi='+progdi+', email='+email);
        document.cookie = 'nim='+nim+'|nama='+nama+'|kelas='+kelas+'|progdi='+progdi+'|email='+email;
      }
      else{
        alert('Data Gagal Dirubah, harap hubungi developer!');
      }
      clearInput();
      location.href='./index.html';
    }
  })
}

function hapus(nim){
  //alert(nim);
  var kondisi = 'NIM='+nim;
  $.ajax({
    type : 'post',
    url : baseURL,
    data : {fungsi:'deleteWhere', kondisi:kondisi},
    dataType : 'json',
    success : function(response){
      if (response.status) {
        alert('Nomor Induk '+nim+' terhapus.');
      }
      else{
        alert('Gagal Mengahapus Nomor Induk '+nim+'!');
      }
      clearInput();
      location.href='./index.html';
    }
  })
}


function boxUbah(index){
  var nim; var nama; var progdi; var kelas; var email;
  defaultSetting();closeNav();
  if (index == 'myself') {
    nim = getCookie()[0];
    nama = getCookie()[1];
    kelas = getCookie()[2];
    progdi = getCookie()[3];
    email = getCookie()[4];
  }
  else{
    nim = $('#nim-'+index).html();
    nama = $('#nama-'+index).html();
    progdi = $('#progdi-'+index).html();
    kelas = $('#kelas-'+index).html();
    email = $('#email-'+index).html();
  }
  $('#nim-default').val(nim);
  $('#email-default').val(email);
  $('#nim-edit').val(nim);
  $('#nama-edit').val(nama);
  $('#progdi-edit').val(progdi);
  $('#kelas-edit').val(kelas);
  $('#email-edit').val(email);
}

function clearInput(){
  $('.form-control').val('');
}

function showMore(index){
  defaultSetting();
  $('#infoShow-'+index).hide();
  $('#infoHide-'+index).show();
  $('#box-show-'+index).show();
  if (getCookie()[1] == 'admin') {
    //alert(getCookie()[1]);
    $('#aksihapus-'+index).show();
    $('#aksiubah-'+index).show();
  }
}

function defaultSetting(){
  $('.box-show-all').hide();
  $('.infohide-all').hide();
  $('.infoshow-all').show();
  $('.aksi-all').hide();
  if (getCookie()[1] == 'admin') {
    //$('.btn-tambah').show();
    document.getElementById("btn-tambah").style.visibility = "visible";
  }
}

function getCookie(){
  var generate = [];
  var arrayCook = document.cookie.split('|');
  for (var i=0; i<arrayCook.length; i++) {
    //alert(arrayCook[i]);
    arrayCook[i] = arrayCook[i].split('=');
    generate[i] = arrayCook[i][1];
  }
  /*look var array generate
  $.each(generate, function(index, data){
    console.log(index+', '+data);
  })*/
  return generate;
}

function onlyNumeric(char){
  var val = (char.which) ? char.which : event.keyCode
  if (val > 31 && (val < 48 || val > 57))
    return false;
  return true;
}

//////////////////////////////////////
//////////////////////////////////////
//style page
function openNav() {
  document.getElementById("mySidenav").style.width = "60%";
  $('#myBoxback').show();
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0px";
  $('#myBoxback').hide();
}