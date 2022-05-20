$(document).ready(function() {

let user = localStorage.getItem('user_data');

if(!user) return;

user = JSON.parse(user)

var socket = io("ws://192.168.0.155:5001", { query: { id: user.id }});

  
socket.on('chat message', function(msg) {
    // var item = document.createElement('li');
    // item.textContent = msg;
    // messages.appendChild(item);
    // window.scrollTo(0, document.body.scrollHeight);
    console.log(msg)
});

socket.on('sendMessage', function(msg) {
    // var item = document.createElement('li');
    // item.textContent = msg;
    // messages.appendChild(item);
    // window.scrollTo(0, document.body.scrollHeight);
    alert(JSON.stringify(msg))
});

});