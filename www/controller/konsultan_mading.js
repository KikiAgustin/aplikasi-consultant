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
    
    //Load Function
    var urls = base_url+"index.php/konsultasi/school/"+localStorage.userid;
    $.ajax({
      type: "GET",
      url: urls,
      crossDomain: true,
      cache: false,
      success: function (data) {

        if (data['status'] == "OK") {
          var datalist = "";
          var dl = data['section'];
          var jml = dl.length;
          $("#load_data").html("");

          for (var key in dl) {
            if (dl.hasOwnProperty(key)) {

              datalist += '<a href="javascript:fade(\'school_mading.html?action=read&chatid=' + dl[key]["secid"] + '&userid=' + localStorage.userid + '\')" class="product-sec waves-effect waves-ripple animated fadein">' + dl[key]["namasec"] + '<i class="fal fa-arrow-right right"></i></a>';

            }
          }

          $("#listkonsultan").append(datalist);

        }
      }
    });
})