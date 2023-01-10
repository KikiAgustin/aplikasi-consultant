$(document).ready(function () {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/consultant/";

    //Check Login
    /* if (localStorage.tour == "" || localStorage.tour == null) {
        slide("tour.html");
    } */

    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);

    if (localStorage.login == "true" && filename == 'login.html') {
        window.location.href = "index.html";
        var userfullname = localStorage.userfullname;
    } else if (localStorage.login == null) {
        window.location.href = "login.html";
    } else if (localStorage.login == "false" && filename != 'login.html') {
        window.location.href = "login.html";
    }

    //Change Password
    var userid = getvar("userid");
    var datalist = "";

    //$("#start").attr("href","javascript:fade('chat-start.html?userid="+userid+"&chatid="+chatid+"')");

    var urls = base_url + "index.php/home/csterm/" + localStorage.userid + "/?callback=?";
    $.ajax({
        type: "GET",
        url: urls,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data['status'] == "OK") {
                datalist += '<br clear="all"><div class="card w100 m-t-10 animated fadein delay-1" style="width:90%; margin-top:10px">' + data['lengkap'] + '<br><br></div>';

                $("#load_data").append(datalist);
            }
        }
    });
});

function sendchat() {
    $("#sendchat").html(`
    <a class="btn  btn-block ">Mohon Tunggu...</a>
    <div style="margin-top:10px;" class="progress">
      <div class="indeterminate"></div>
    </div>
    `);
    $("#sendchat").attr("disabled", true);
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/consultant/";

    var userid = getvar("userid");
    var urls_ = base_url + "index.php/konsultasi/chat-create-konsultan/" + localStorage.userid + "/" + userid + "/cs/?callback=?";
    $.ajax({
        type: "GET",
        url: urls_,
        crossDomain: true,
        cache: false,
        success: function (data) {
            slide("konsultan_chat-cs.html?chatid=" + data['chat_id'] + "&userid=" + userid);
        }
    });
}