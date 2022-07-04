let headerLogo = document.getElementsByClassName("header-logo")[0]
let headerHome = document.getElementById("header-home")
let headerChat = document.getElementById("header-chat")
let headerProfile = document.getElementById("header-profile")


let locationDocument = function(loc){
    document.location = loc
}

function CheckUser(url) {
  $.ajax({
    method: 'GET',
    url: 'http://192.168.1.97:5001/api/users/check',
    headers: {"token": localStorage.getItem('token')},
    crossDomain: true,
    success: (response) =>{
      document.location = url
    },
    error: (response) => {
      document.location = "/login"
    },
  })
}


headerLogo.addEventListener('click',function(){locationDocument("/")},false);
headerHome.addEventListener('click',function(){locationDocument("/")},false);
headerChat.addEventListener('click',function(){CheckUser("/chat")},false);
headerProfile.addEventListener('click',function(){CheckUser("/profile")},false);
