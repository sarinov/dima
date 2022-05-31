$(document).ready(function() {
// const os = require('os');
//
// var ifaces = os.networkInterfaces();
//
// let local;
//
//
// Object.keys(ifaces).forEach(function (ifname) {
//   var alias = 0;
//
//   ifaces[ifname].forEach(function (iface) {
//     if ('IPv4' !== iface.family || iface.internal !== false) {
//       return;
//     }
//
//     if (alias >= 1) {
//       console.log(ifname + ':' + alias, iface.address);
//     } else {
//         local = iface.address.split(".");
//
//         if (local[0] == 192) {
//             local = local.join(".")
//         }
//     }
//     ++alias;
//   });
// });

let user = localStorage.getItem('user_data');

if(!user) return;

user = JSON.parse(user)

var socket = io(`ws://192.168.1.66:5001`, { query: { id: user.id }});


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
