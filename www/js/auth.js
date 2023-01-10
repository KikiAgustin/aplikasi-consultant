$(document).ready(function () {
	var url = "https://www.dfunstation.com/api4/consultant/index.php/member/login/?callback=?";

	//Login Function
	$("#login").click(function () {

		var email = $("#username").val();
		var password = $("#password").val();

	  /* window.FirebasePlugin.getToken(function(token)
	   {
		  localStorage.deviceid = token;
	   },function(error)
	   {
		 // alert(error);
	   });
		
		var devices = device.model; 
    	var dataString="username="+email+"&password="+password+"&deviceid="+localStorage.deviceid+"&device="+devices;
		
		// */ var dataString = "username=" + email + "&password=" + password + "&deviceid=" + localStorage.deviceid;

		if ($.trim(email).length < 3) { swal("Email masih kosong atau terlalu"); }
		if ($.trim(password).length < 3) { swal("Password masih kosong atau terlalu pendek"); }

		if ($.trim(email).length > 0 & $.trim(password).length > 0) {
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function () { $("#login").html('Menyambungkan...'); },
				success: function (data) {

					if (data['status'] == "OK") {
						var userid = data['userid'];
						var userfullname = data['userfullname'];
						var avatar = data['avatar'];
						var usertipe = data['usertipe'];
						var peer = data['peer'];
						var mitraid = data['mitraid'];
						var waktu = data['waktu'];

						localStorage.login = "true";
						localStorage.email = email;
						localStorage.userid = userid;
						localStorage.userfullname = userfullname;
						localStorage.avatar = avatar;
						localStorage.usertipe = usertipe;
						localStorage.peer = peer;
						localStorage.mitraid = mitraid;
						localStorage.waktu = waktu;

						slide("index.html");

					}
					else if (data['status'] == "ERROR") {
						swal("Login gagal dilakukan, silahkan coba kembali");
						$("#login").html('Login');
					}
				}
			});
		} return false;

	});

	//signup function
	$("#signup").click(function () {

		var urls = "https://www.dfunstation.com/api4/consultant/index.php/member/register/?callback=?";

		var username = $("#username").val();
		var fullname = $("#userfullname").val();
		var email = $("#useremail").val();
		var password = $("#userpassword").val();
		var phone = $("#userphonegsm").val();
		var lebih18tahun = $("#lebih18tahun").val();


		window.FirebasePlugin.getToken(function (token) {
			localStorage.deviceid = token;
		}, function (error) {
			// alert(error);
		});

		var devices = device.model;

		if ($.trim(useremail).length < 3) { swal("Email masih kosong atau terlalu pendek"); }
		if ($.trim(password).length < 3) { swal("Password masih kosong, terlalu pendek"); }
		if (lebih18tahun != "1") { swal("Anda belum memilih cheklist bila and alebih dari 18 tahun"); }

		var dataString = "username=" + username + "&userfullname=" + fullname + "&useremail=" + email + "&userpassword=" + password + "&userphonegsm=" + phone + "&deviceid=" + localStorage.deviceid + "&device=" + devices;

		if ($.trim(username).length > 0 && $.trim(fullname).length > 0 && $.trim(email).length > 0 && $.trim(password).length > 0) {

			$.ajax({
				type: "POST",
				url: urls,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function () { $("#signup").val('Mendaftar...'); },
				success: function (data) {

					if (data['status'] == "OK") {
						swal(data['message']);

						var userid = data['userid'];
						var userfullname = data['userfullname'];
						var avatar = data['avatar'];
						var usertipe = data['usertipe'];
						//var mitraid = data['mitraid'];

						localStorage.login = "true";
						localStorage.email = email;
						localStorage.userid = userid;
						localStorage.userfullname = userfullname;
						localStorage.avatar = avatar;
						localStorage.usertipe = usertipe;

						swal(data['message']);
						slide("claim.html");


					}
					else if (data['status'] == "ERROR") {
						swal(data['message']);
					}
				}
			});
		} return false;

	});

	//Change Password
	$("#change_password").click(function () {
		var email = localStorage.email;
		var old_password = $("#old_password").val();
		var new_password = $("#new_password").val();
		var dataString = "old_password=" + old_password + "&new_password=" + new_password + "&email=" + email + "&change_password=";
		if ($.trim(old_password).length > 0 & $.trim(old_password).length > 0) {
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function () { $("#change_password").val('Connecting...'); },
				success: function (data) {
					if (data == "incorrect") {
						swal("Your old password is incorrect");
					}
					else if (data = "success") {
						swal("Password Changed successfully");
					}
					else if (data = "failed") {
						swal("Something Went wrong");
					}
				}
			});
		} return false;

	});

	//signup function
	$("#forget_password").click(function () {

		var urls = "https://www.dfunstation.com/api4/consultant/index.php/member/lupapassword/?callback=?";

		var useremail = $("#useremail").val();
		var dataString = "useremail=" + useremail;

		if ($.trim(useremail).length < 10) { alert("Email masih kosong atau salah pengetikan email"); }


		if ($.trim(useremail).length > 0) {

			$.ajax({
				type: "POST",
				url: urls,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function () { $("#forget_password").val('Meminta Password...'); },
				success: function (data) {
					if (data['status'] == "OK") {
						swal(data['message'], {
							buttons: {
								cancel: "Tidak",
								catch: {
									text: "Login",
									value: "catch",
								}
							},
							closeOnClickOutside: false,
							closeOnEsc: false,
							allowOutsideClick: false,
						})
							.then((value) => {
								switch (value) {
									case "catch":
										//alert('bayar');
										//window.location.href= 'chat.html';
										slide("login.html");
										break;
									default:
								}
							});
					}
					else if (data['status'] == "ERROR") {
						swal(data['message']);
					}
				}
			});
		} return false;

	});

	//logout function
	// $("#logout").click(function () {
	// 	localStorage.login = "";
	// 	localStorage.email = "";
	// 	localStorage.userid = "";
	// 	slide("login.html");
	// });

	//Displaying user email on home page
	$("#email1").html(localStorage.email);
	var imageHash = "http://www.gravatar.com/avatar/" + md5(localStorage.email);
	$("#profilepic").attr('src', imageHash);
});


