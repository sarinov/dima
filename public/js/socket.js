
$(document).ready(function() {

let user = localStorage.getItem('user_data');

if(!user) return;

user = JSON.parse(user)

var socket = io("ws://192.168.0.156:5001", { query: { id: user.id }});



socket.on('sendMessage', function(msg) {
    if(user.id == msg.toId){
        var templateResponse = Handlebars.compile( $("#message-response-template").html());
        console.log(msg.content)
        var context = {
            messageOutput: msg.content,
            time: msg.time
          };
        chatHistoryListGlobal.append(templateResponse(context));
        $(".chat-history").scrollTop($(".chat-history")[0].scrollHeight);
    }
});

});