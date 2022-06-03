
$(document).ready(function() {

let user = localStorage.getItem('user_data');
let audio = document.getElementById('audio');
audio.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
// function playSound () {
//     let ding = new Audio('/audio/sms.mp3');
//     ding.play();
// }
if(!user) return;

user = JSON.parse(user)

var socket = io("ws://192.168.0.156:5001", { query: { id: user.id }});



socket.on('sendMessage', function(msg) {

    if(user.id == msg.toId){
        audio.play()
        var templateResponse = Handlebars.compile( $("#message-response-template").html());
        console.log(msg.content)
        var context = {
            messageOutput: msg.content,
            time: msg.time
          };
        if(msg.chatId === openedChatUserChatId){
            chatHistoryListGlobal.append(templateResponse(context));
            $(".chat-history").scrollTop($(".chat-history")[0].scrollHeight);
        }
        else{
            $(`#${msg.chatId}`).css({ background: "red"})
        }
       
    }
});

socket.on('createdChat', function(msg) {
    console.log('createdchat') 
    socket.disconnect();
    socket.connect();
});

});