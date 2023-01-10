document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	// Register the event listener
	document.addEventListener("backbutton", onBackKeyDown, false);
}
function onBackKeyDown() {
	slide("konsultan_school.html");
}
function getvar(name,url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function attach(){
	var offsetHeight = document.getElementById('sendie').offsetHeight;
	var newheight = offsetHeight + 32;
	document.getElementById("attach").style.marginBottom = newheight +"px";
	$("#attach").show();
	$("#attachx").show();
	$("#attachs").hide();
}

function attachx(){
	$("#attach").hide();
	$("#attachx").hide();
	$("#attachs").show();
	$("#tools").show();
	$("#foto").hide('');
	$("#img").attr("src",'');
	$("#kirim_").html('');
	$("#isimage_").val("0");
	$("#audiox").hide('');
	$(".rekaman").html('');
	$("#kirim").html('');
	$("#isimage").val("0");
	$("#templatex").hide();
}
function isitemplate(d) {
	$("#sendie").val($(d).data('text'));
	$("#sendx").show();
	attachx();
}
//Chat
var instanse = false;
var state;
var mes;
var file;
var name = "dzkrrbb";
var userid = getvar("userid");
var chatid = getvar("chatid");
var actionx = getvar("action");

localStorage.lastchatid = 0;

function Chat () {
	this.update = updateChat;
	this.send = sendChat;
	this.getState = getStateOfChat;
}
//gets the state of the chat
function getStateOfChat() {
	if(!instanse){
		instanse = true;
		$.ajax({
			type: "POST",
			crossDomain: true,
			cache: false,
			url: "https://www.dfunstation.com/api4/consultant/index.php/member/chatgroup/"+userid+"/"+localStorage.userid+"//"+chatid+"/?callback=?",
			data: {'function': 'getState', 'file': file},
			success: function(data) 
			{ 
				state = data.state;
				instanse = false;
			}
		});
	}	
}

//Updates the chat
function updateChatx() {

	if(!instanse){
		instanse = true;
		$.ajax({
			type: "POST",
			crossDomain: true,
			cache: false,
			url: "https://www.dfunstation.com/api4/consultant/index.php/member/chatgroup/"+userid+"/"+localStorage.userid+"/"+localStorage.lastchatid+"/"+chatid+"/?callback=?",
			data: {'function': 'update','state': state,'file': file},
			beforeSend: function(){
				//$("#chat-area").animate({ scrollTop: 20000000 }, "slow");
				$("#load_data_message").show();
			},
			success: function(data) {
				if(data.text)
				{
					if(localStorage.lastchatid==0){ $(".loading").remove(); }
					
					for (var i = 0; i < data.text.length; i++) {
						var datax = data.text[i];
						var ids = datax.id;
						var pesan = datax.pesan;
						$('#chat-area').append($(""+ pesan +""));
						var audio = new Audio('http://dfunstation.com/uploads/notify.mp3');
						audio.play();
						localStorage.lastchatid = ids;
					}	
					$("#load_data_message").hide();
				}
				if(data.text.length>0) {
					//alert('ok');
					$("#chat-area").animate({ scrollTop: 20000000 }, "slow");
				}  				instanse = false;
				state = data.state;
				if(data.finish == 1 && actionx =="read") {
					/* swal("Sesi konsultasi ini telah habis.", {
					  buttons: {
						//cancel: "Lain Kali",
						catch: {
						  text: "Lihat Riwayat Konsultasi",
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
						  	window.location.href= 'chat-finish.html?action=finish&chatid='+chatid+'&userid='+localStorage.userid;
						  	break;
							default:
					  }
				  	}); */
					/* var refx = 'chat-finish?action=finish&chatid='+chatid+'&userid='+localStorage.userid;
					slide(refx);	 */				
					//window.location.href= 'konsultan_chat-finish.html?action=finish&chatid='+chatid+'&userid='+localStorage.userid;
				}
			}
		});
	}
	else {
		setTimeout(updateChat, 2000);
	}
}

//Updates the chat
function updateChat() {

	if(!instanse){
		instanse = true;
		$.ajax({
			type: "POST",
			crossDomain: true,
			cache: false,
			url: "https://www.dfunstation.com/api4/consultant/index.php/member/chatgroup/"+userid+"/"+localStorage.userid+"/"+localStorage.lastchatid+"/"+chatid+"/?callback=?",
			data: {'function': 'update','state': state,'file': file},
			beforeSend: function(){
				//$("#chat-area").animate({ scrollTop: 20000000 }, "slow");
				$("#load_data_message2").show();
			},
			success: function(data) {
				if(data.text)
				{
					if(localStorage.lastchatid==0){ $(".loading").remove(); }
					
					for (var i = 0; i < data.text.length; i++) {
						var datax = data.text[i];
						var ids = datax.id;
						var pesan = datax.pesan;
						$('#chat-area').append($(""+ pesan +""));
						var audio = new Audio('http://dfunstation.com/uploads/notify.mp3');
						audio.play();
						localStorage.lastchatid = ids;
					}	
					$("#load_data_message2").hide();
				}
				if(data.text.length>0) {
					//alert('ok');
					$("#chat-area").animate({ scrollTop: 20000000 }, "slow");
				}  
				instanse = false;
				state = data.state;
				if(data.finish == 1 && actionx =="read") {
					/* swal("Sesi konsultasi ini telah habis.", {
					  buttons: {
						//cancel: "Lain Kali",
						catch: {
						  text: "Lihat Riwayat Konsultasi",
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
						  	window.location.href= 'chat-finish.html?action=finish&chatid='+chatid+'&userid='+localStorage.userid;
						  	break;
							default:
					  }
				  	}); */
					/* var refx = 'chat-finish?action=finish&chatid='+chatid+'&userid='+localStorage.userid;
					slide(refx);*/					
					//window.location.href= 'konsultan_chat-finish.html?action=finish&chatid='+chatid+'&userid='+localStorage.userid;
				}
			}
		});
	}
	else {
		setTimeout(updateChat, 2000);
	}
}

function deletex(id) {
	//swal('ini like '+id);
	if(!instanse){
		instanse = true;
		swal("Anda yakin menghapus ini?", {
			buttons: {
				cancel: "Tidak",
				catch: {
				text: "Ya",
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
						$.ajax({
							type: "POST",
							crossDomain: true,
							cache: false,
							url: "https://www.dfunstation.com/api4/consultant/index.php/member/chatgroup/"+userid+"/"+localStorage.userid+"/"+id+"/"+chatid+"/?callback=?",
							data: {'function': 'delete','state': state,'file': file},
							beforeSend: function(){
								//$("#chat-area").animate({ scrollTop: 20000000 }, "slow");
								//$("#load_data_message").show();
							},
							success: function(data) {
								if(data['status'] == "OK") {
									$("#delete"+id).hide();
								} else {
									$("#delete"+id).show();
								}
								instanse = false;
							}
						}); 
						//console.log('hapus');
						break;
					default:
						location.reload();
				}
			}); 
	} else {
		setTimeout(updateChat, 2000);
	}
}

//send the message
function sendChat(message, nickname) { 
	updateChat();
	var isimage_ = $("#isimage_").val();
	var isimage = $("#isimage").val();
	if($.trim(chatid).length>0){
		if(isimage_=="1") {
			$("#kirim_").html('Mengirimkan...');
			var imageURI = document.getElementById('img').getAttribute("src");
			if (!imageURI) {
				swal('Silahkan pilih photo atau ambil gambar dari kamera');
				return;
			}
			//set upload options
			var options = new FileUploadOptions();
				options.fileKey = "file";
				options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
				options.mimeType = "image/jpeg";
						
				options.params = {
					status: message,
					chatid: chatid,
					userid: localStorage.userid,
					jenis: "image"
				}
						
			var ft = new FileTransfer();
			ft.upload(imageURI, encodeURI("https://www.dfunstation.com/api4/android/index.php/member/chat-media-group/"+localStorage.userid+"/?callback=?"), win, fail, options);
		} else if(isimage=="1") {
			$("#kirim").html('Mengirimkan...');
			var imageURI = document.getElementById('audio').getAttribute("src");
			if (!imageURI) {
				swal('Audio masih kosong atau anda belum melakukan rekam suara anda');
				return;
			}
			var options = new FileUploadOptions();
				options.fileKey = "file";
				options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
				options.mimeType = "audio/mp4";
				options.params = {
					status: message,
					chatid: chatid,
					userid: localStorage.userid,
					jenis: "audio"
				}
			var ft = new FileTransfer();
			ft.upload(imageURI, encodeURI("https://www.dfunstation.com/api4/android/index.php/member/chat-media-group/"+localStorage.userid+"/?callback=?"), win, fail, options);
		}	else {
			$.ajax({
				type: "POST",
				crossDomain: true,
				cache: false,
				url: "https://www.dfunstation.com/api4/consultant/index.php/member/chatgroup/"+userid+"/"+localStorage.userid+"//"+chatid+"/?callback=?",
				data: {'function': 'send','message': message,'nickname': nickname,'file': file},
				success: function(data){
					updateChat();
				}
			});
		}				
	} return false;
}

function onFail(message) {
	console.log('Failed because: ' + message);
}
		
function win(r) {
	attachx();
	updateChat();
}
		
function fail(error) {
	swal("Gagal mengupload dan status = " + error.code);
}
  
  
$(document).ready(function() {
	
	//Chat
	// kick off chat
	var autoExpand = function (field) {

	// Reset field height
	field.style.height = 'inherit';

	// Get the computed styles for the element
	var computed = window.getComputedStyle(field);

	// Calculate the height
	var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
	             + parseInt(computed.getPropertyValue('padding-top'), 10)
	             + field.scrollHeight
	             + parseInt(computed.getPropertyValue('padding-bottom'), 10)
	             + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

	field.style.height = height + 'px';
	document.getElementById("attach").style.marginBottom = height + 25 +"px";
};

document.addEventListener('input', function (event) {
	if (event.target.tagName.toLowerCase() !== 'textarea') return;
	autoExpand(event.target);
}, false);

 	 var chat =  new Chat();

	  $(function() {
	  
		 chat.getState(); 
		 
		 $('#sends').click(function(){
			var text= $("#sendie").val();
			var maxLength= $("#sendie").attr("maxlength");
			var length = text.length; 
				   
			if (length <= maxLength + 1) { 
				chat.send(text, name);  
				//chat.update(); 
				$("#sendie").val("");
				$("#sendx").hide();
				attachx();
				document.getElementById("sendie").style.height = "3rem";
			} else {
				$(this).val(text.substring(0, maxLength));
			}  
		});
			 
		 // watch textarea for key presses
		 $("#sendie").keydown(function(event) {  
		 	$("#sendx").show();
			 var key = event.which;  
	   
			 //all keys including return.  
			 if (key >= 33) {
			   
				 var maxLength = $(this).attr("maxlength");  
				 var length = this.value.length;  
				 
				 // don't allow new content if length is maxed out
				 if (length >= maxLength) {  
					 event.preventDefault();  
				 }  
			 }  
		 });
		 // watch textarea for release of key press
		 $('#sendie').keyup(function(e) {  
			if (e.keyCode == 13) { 
				  var text = $(this).val();
				  var maxLength = $(this).attr("maxlength");  
				  var length = text.length; 
				   
				  // send 
				  if (length <= maxLength + 1) {
					
					chat.send(text, name);  
					//chat.update(); 
					$(this).val("");
					$("#sendx").hide();
					attachx();
					document.getElementById("sendie").style.height = "3rem";
				  } else {
					$(this).val(text.substring(0, maxLength));
				  }  
			}
		 });
	  });
  
	setInterval(function() { 
		chat.update(); 
	}, 2000);
	//setInterval('chat.update()', 3000);					 
});
  


var browser = window.navigator.userAgent;
var isandroid = browser.indexOf("Android");

function fade(href)
{
	  window.location.href= href;
}
function slide(href) {
	window.location.href= href;
}


function logout()
{
	localStorage.removeItem('login');
	localStorage.removeItem('email');
	localStorage.removeItem('userid');
	localStorage.removeItem('userfullname');
	localStorage.removeItem('avatar');
	localStorage.removeItem('deviceid');
	localStorage.clear();
	slide("login.html");
}

function loading(id,jml)
{
	var content = '<div class="p-20"><div class="animated-background facebook"><div class="background-masker header-top"></div><div class="background-masker header-left"></div><div class="background-masker header-right"></div><div class="background-masker header-bottom"></div><div class="background-masker subheader-left"></div><div class="background-masker subheader-right"></div><div class="background-masker subheader-bottom"></div><div class="background-masker content-top"></div><div class="background-masker content-first-end"></div><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div></div>';
	
	var contents = "";
	for(i=1;i<jml;i++)
	{
		contents += content;
	}
	$("#"+id).html(contents);
}

function loading1(id,jml)
{
	var content = '<div class="p-20"><div class="animated-background1 facebook"><div class="background-masker1 header-top"></div><div class="background-masker1 header-left"></div><div class="background-masker1 header-right"></div><div class="background-masker1 header-bottom"></div><div class="background-masker1 subheader-left"></div><div class="background-masker1 subheader-right"></div><div class="background-masker1 subheader-bottom"></div><div class="background-masker1 content-top"></div><div class="background-masker1 content-first-end"></div><div class="background-masker1 content-second-line"></div><div class="background-masker1 content-second-end"></div><div class="background-masker1 content-third-line"></div><div class="background-masker1 content-third-end"></div></div></div>';
	
	var contents = "";
	for(i=1;i<jml;i++)
	{
		contents += content;
	}
	$("#"+id).html(contents);

}
function loadingdetail(id)
{
	var content = '<div class="p-20"><div class="animated-background facebook"><div class="background-masker header-top"></div><div class="background-masker header-left"></div><div class="background-masker header-right"></div><div class="background-masker header-bottom"></div><div class="background-masker subheader-left"></div><div class="background-masker subheader-right"></div><div class="background-masker subheader-bottom"></div><div class="background-masker content-top"></div><div class="background-masker content-first-end"></div><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div></div>';
	$("#"+id).html(content);
}
function loadingbar(id)
{
	var content = '<div class="p-20"><div class="animated-background facebook"><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div></div>';
	$("#"+id).html(content);
}
function loadingmatch(id,jml)
{
	var content = '<div class="loading-wrapper"><div class="loading-wrapper-cell"><div class="loading-text"><div class="loading-text-line"> </div><div class="loading-text-line"></div></div></div></div>';
	var contents = "";
	for(i=0;i<jml;i++)
	{
		contents += content;
	}
	$("#"+id).html(contents);

}
$(function() {
	FastClick.attach(document.body);
});

function removeOptions(selectbox,text)
{
	var i;
	for(i=selectbox.options.length-1;i>=0;i--)
	{
		selectbox.remove(i);
	}
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = "";
	selectbox.options.add(optn);
}

function addOption(selectbox,text,value )
{
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
}
