let headerLogo = document.getElementsByClassName("header-logo")[0]
let headerHome = document.getElementById("header-home")
let headerChat = document.getElementById("header-chat")
let headerProfile = document.getElementById("header-profile")


let locationDocument = function(loc){
    document.location = loc
}


headerLogo.addEventListener('click',function(){locationDocument("/")},false);
headerHome.addEventListener('click',function(){locationDocument("/")},false);
headerChat.addEventListener('click',function(){locationDocument("/chat")},false);
headerProfile.addEventListener('click',function(){locationDocument("/profile")},false);
