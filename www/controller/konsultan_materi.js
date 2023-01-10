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
  var urls = base_url+"index.php/konsultasi/materi/"+localStorage.userid;
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

            datalist += '<span  class="product-sec waves-effect waves-ripple animated fadein"><strong><i class="fal fa-users"></i>  ' + dl[key]["namasec"] + '</strong></span>';
            var submenu = dl[key]["sub"];

            for (var subkey in submenu) {
              if (submenu.hasOwnProperty(subkey)) {
                datalist += '<div class="headx product-sec waves-effect waves-ripple animated fadein"><strong><i class="fal fa-book"></i>  ' + submenu[subkey]["namasub"] + '</strong></div>';
                datalist += '<div class="bodyx" style="display:none">';
                    datalist += '<ul class="product-sec animated fadein">';
                        var submenu_ = dl[key]["sub_"];
                        for (var subkey_ in submenu_) {
                            if (submenu_.hasOwnProperty(subkey_)) {
                                datalist += '<li style="padding:10px;border-bottom:solid #ddd 1px"><a href="javascript:fade(\'konsultan_materi-kelas.html?action=read&chatid='+ submenu[subkey]["subid"]+'&materi=' + submenu_[subkey_]["subid"] + '&userid=' + localStorage.userid + '\')">'+ submenu_[subkey_]["tglsub"] + ' <i class="fal fa-arrow-right right"></i></a></li>';
                            }
                        }
                    datalist += '</ul>';
                datalist += '</div>';
              }
            }

          }
        }

        $("#listkonsultan").append(datalist);
        var coll = document.getElementsByClassName("headx");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                //var contentx = this.previousElementSibling;
                if (content.style.display === "block") {
                content.style.display = "none";
                } else {
                content.style.display = "block";
                //contentx.style.display = "none";
                }
            });
        }

      }
    }
  });
})