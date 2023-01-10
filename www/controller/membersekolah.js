$(document).ready(function () {
	var url = "https://www.dfunstation.com/api4/consultant/index.php/member/sekolah/?callback=?";

	//Login Function
	$("#btnvoucher").click(function () {

		var voucher = $("#voucher").val();

		if ($.trim(voucher).length < 3) { swal("Kode voucher masih kosong atau terlalu"); }

        var dataString = "code=" + voucher + "&userid=" + localStorage.userid + "&login=";
                    if ($.trim(voucher).length > 0) {
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: dataString,
                        crossDomain: true,
                        cache: false,
                        beforeSend: function () { 
                            $("#lanjutkan").html('Melakukan Verifikasi...'); 
                        },
                        success: function (data) {
                            var pesan = data['message'];
                            if (data['status'] == "OK") {
                                swal({
                                    title: "Sukses",
                                    text: pesan,
                                    icon: "success",
                                    button: "Lanjut",
                                  });
                                  setInterval(function () {location.reload()}, 4000);
                            } else if (data['status'] == "ERROR") {
                                swal({
                                    title: "Gagal",
                                    text: pesan,
                                    icon: "warning",
                                    button: "Ok",
                                    dangerMode: true
                                  });
                            }
                        }
                    });
                }
                


	});

	//Displaying user email on home page
	$("#email1").html(localStorage.email);
	var imageHash = "http://www.gravatar.com/avatar/" + md5(localStorage.email);
	$("#profilepic").attr('src', imageHash);
});






// function claimvoucher() {
//     // Base URL 
//     var base_url = "https://www.dfunstation.com/api4/android/";

//     var text = $("#voucherid").val();
//     alert(text);
//     var url = base_url + "index.php/member/sekolah/?callback=?";
//     var dataString = "code=" + text + "&userid=" + localStorage.userid + "&login=";
//     if ($.trim(text).length > 0) {
//         $.ajax({
//             type: "POST",
//             url: url,
//             data: dataString,
//             crossDomain: true,
//             cache: false,
//             beforeSend: function () { 
//                 $("#lanjutkan").html('Melakukan Verifikasi...'); 
//             },
//             success: function (data) {
//                 var pesan = data['message'];
//                 var mitraid = data['mitraid'];
//                 if (!empty(mitraid)) localStorage.mitraid = mitraid;
//                 if (data['status'] == "OK") {
//                     $("#scan").html('<div class="p-20"><center>' + pesan + '</center></div>');
//                 } else if (data['status'] == "ERROR") {
//                     var datalist = "";
//                     datalist += '<div class="p-20"><center>' + pesan + '</center></div>';
//                     datalist += '<div class="padding" style="margin:20px 0px 20px 0px;">';
//                         datalist += '<center> Silakan masukan kode Voucher Member Sekolah yang anda miliki:</center>';
//                         datalist += '<div class="input-field">';
//                             datalist += '<input class="validate" style="text-align:center; font-size:120%; font-weight:bold" id="voucherid" type="text" placeholder="Masukan Kode Voucher" required>';
//                         datalist += '</div>';
//                     datalist += '</div>';
//                     datalist += '<button onClick="claimvoucher()" class="waves-effect waves-light btn-large accent-color width-100 m-b-20 animated bouncein delay-4 button button-block button-positive" id="lanjutkan">Claim Voucher</button>';
//                     $("#scan").html(datalist);
//                 }
//             }
//         });
//     }
//     else {
//         alert("Kode Voucher masih kosong, silahkan masukan");
//         location.reload();
//     }

// }