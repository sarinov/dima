let openedChatUserId = null;
let openedChatUserName = null;
let openedChatUserChatId = null;

let listUser = []
let group

let select = document.getElementById("select")

let htmlBody = document.getElementsByTagName("body")[0]

let chatHistory = document.getElementsByClassName("chat-history")[0]

let nameGroup = document.getElementsByClassName("form-control")[0]
let descGroup = document.getElementsByClassName("form-control")[1]

let chatHistoryGlobal = $('.chat-history');

let chatHistoryListGlobal =  chatHistoryGlobal.find('ul');

let getChatsGlobal = function(){};
let renderChatsGlobal = function(){};

(function(){

    var chat = {
      messageToSend: '',
      messageResponses: [
        'Why did the web developer leave the restaurant? Because of the table layout.',
        'How do you comfort a JavaScript bug? You console it.',
        'An SQL query enters a bar, approaches two tables and asks: "May I join you?"',
        'What is the most used language in programming? Profanity.',
        'What is the object-oriented way to become wealthy? Inheritance.',
        'An SEO expert walks into a bar, bars, pub, tavern, public house, Irish pub, drinks, beer, alcohol'
      ],
      init: function() {
        this.cacheDOM();
        this.bindEvents();
        this.render();
        this.getChats();
        getChatsGlobal = this.getChats;
        renderChatsGlobal = this.renderChats;
      },
      cacheDOM: function() {
        this.$chatHistory = $('.chat-history');
        this.$button = $('button');
        this.$textarea = $('#message-to-send');
        this.$chatHistoryList =  this.$chatHistory.find('ul');
      },
      bindEvents: function() {
        this.$button.on('click', this.addMessage.bind(this));
        this.$textarea.on('keyup', this.addMessageEnter.bind(this));
      },
      render: function() {
        this.scrollToBottom();
        if (this.messageToSend.trim() !== '') {
          console.log(this.messageToSend, openedChatUserId)
          this.sendMessage(this.messageToSend, openedChatUserId)
          var template = Handlebars.compile( $("#message-template").html());
          var context = {
            messageOutput: this.messageToSend,
            time: this.getCurrentTime()
          };

          this.$chatHistoryList.append(template(context));
          this.scrollToBottom();
          this.$textarea.val('');

          // responses
          // var templateResponse = Handlebars.compile( $("#message-response-template").html());
          // var contextResponse = {
          //   response: this.getRandomItem(this.messageResponses),
          //   time: this.getCurrentTime()
          // };

          // setTimeout(function() {
          //   this.$chatHistoryList.append(templateResponse(contextResponse));
          //   this.scrollToBottom();
          // }.bind(this), 1500);

        }

      },

      getChats: function() {
        const url = document.location.href;
    // console.log(url)
        if(!url.includes('chat')) return
        $.ajax({
            method: 'GET',
            url: 'http://192.168.1.66:5001/api/messages/chats',
            headers: {"token": localStorage.getItem('token')},
            crossDomain: true,
            success: (response) =>{
                const userList = response.data
                const user = JSON.parse(localStorage.getItem("user_data"))

                $.ajax({
                    method: 'GET',
                    url: 'http://192.168.1.66:5001/api/groups/groupsList/' + user.id,
                    headers: {"token": localStorage.getItem('token')},
                    crossDomain: true,
                    success: (response) =>{
                        const groupList  = response
                        renderChatsGlobal(userList, groupList)

                    },
                    error: (response) => {
                       alert(response.responseJSON.error)
                    }
                })
            },
            error: (response) => {
               alert(response.responseJSON.error)
            }
        })
      },


      sendMessage: function(content, userId){
        $.ajax({
          method: 'POST',
          url: 'http://192.168.1.66:5001/api/messages/sendMessage',
          data: {
            content,
            type: 'text',
            time: new Date(),
            toId: userId
          },
          headers: {"token": localStorage.getItem('token')},
          crossDomain: true,
          success: (response) =>{
              console.log(response);
          },
          error: (response) => {
             alert(response.responseJSON.error)
          }
      })
      },


      renderChats: function(users, groups){
          const chats = $('.list')
          chats.html('')
          console.log(groups)
          for(let g of groups){
              chats.append(` <li class="clearfix">` +
              '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />'+
              '<div class="about">' +
                `<div class="name">${g.Group.title}</div>`+
                `<div class="round"></div>`+
                '<div class="status">'+
                 `<i class="fa"></i>${g.Group.description}`+
                 // `${i.isRead}` +
                '</div>'+
              '</div> </li>')
          }

            for(let i of users){
                if (i.isRead) {
                    $(`#${i.chatId} > div.about > div.round`).css({display:'block'})
                }
                chats.append(` <li onclick="renderChat('${i.user.name + '' + i.user.surname}', ${i.chatId}, ${i.user.id})" id="${i.chatId}" class="clearfix ${i.isRead ? 'readible' : ''}">` +
                '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />'+
                '<div class="about">' +
                  `<div class="name">${i.user.name} ${i.user.surname}</div>`+
                  `<div class="round ${i.isRead ? 'readible' : ''}">${i.isRead}</div>`+
                  '<div class="status">'+
                   '<i class="fa fa-circle online"></i> online'+
                   // `${i.isRead}` +
                  '</div>'+
                '</div> </li>')
            }

      },

      addMessage: function() {
        this.messageToSend = this.$textarea.val()
        this.render();
      },
      addMessageEnter: function(event) {
          // enter was pressed
          if (event.keyCode === 13) {
            this.addMessage();
          }
      },
      scrollToBottom: function() {
        $(".chat-history").scrollTop($(".chat-history")[0].scrollHeight);
      },
      getCurrentTime: function() {
        return new Date().toLocaleTimeString().
                replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
      },
      getRandomItem: function(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
      },




    };

    chat.init();


  })();

  const renderChatMessages = function (messages) {
    chatHistoryListGlobal.html('')
    let user_data = localStorage.getItem('user_data')
    let current_id = JSON.parse(user_data).id
    for(let message of messages) {
      var context = {
        messageOutput: message.Message.content,
        time: message.Message.time,
        id_msg: message.Message.id,
        id: message.id
      };

      if(message.fromId === current_id){
        var template = Handlebars.compile( $("#message-template").html());
        chatHistoryListGlobal.append(template(context));
      }else{
        var templateResponse = Handlebars.compile( $("#message-response-template").html());
        chatHistoryListGlobal.append(templateResponse(context));
      }

    }
    $(".chat-history").scrollTop($(".chat-history")[0].scrollHeight);

  }

  const getChatMessages =  function() {
    $.ajax({
      method: 'GET',
      url: 'http://192.168.1.66:5001/api/messages/chatMessages/' + openedChatUserChatId,
      headers: {"token": localStorage.getItem('token')},
      crossDomain: true,
      success: (response) =>{
          renderChatMessages(response.data)

      },
      error: (response) => {
         alert(response.responseJSON.error)
      }
  })
  }


  const renderChat = function(name, chatId, userId){
    $(`#${chatId} > div.about > div.round`).css({ display: "none"})
    $('.chat-message').show();
    const chat_with = $('.chat-with');
    chat_with.html('')
    openedChatUserId = userId;
    openedChatUserName = name;
    openedChatUserChatId = chatId;
    getChatMessages()
    chat_with.append(`${name}, ${userId}`)
}

const searchUser = function (e) {
  if(!e.target.value) {
    getChatsGlobal()
    return
  }
  $.ajax({
    method: 'GET',
    url: 'http://192.168.1.66:5001/api/users/find?query=' + e.target.value,
    headers: {"token": localStorage.getItem('token')},
    crossDomain: true,
    success: (response) =>{
        const {data} = response
        const chats = $('.list')
          chats.html('')
        for(let i of data){
          chats.append(` <li class="clearfix" onclick="createChat(${i.id}, '${i.name}')">` +
          '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />'+
          '<div class="about">' +
            `<div class="name">${i.name} ${i.surname} </div>`+
            '<div class="status">'+
             '<i class="fa fa-circle online"></i> online'+
            '</div>'+
          '</div> </li>')
      }
    },
    error: (response) => {
       alert(response.responseJSON.error)
    }
})
}

const searchUserGroup = function (e) {
  if(!e.target.value) {
    const list = $('#listGroupUser')
    list.html('')
    return
  }
  $.ajax({
    method: 'GET',
    url: 'http://192.168.1.66:5001/api/users/find?query=' + e.target.value,
    headers: {"token": localStorage.getItem('token')},
    crossDomain: true,
    success: (response) =>{
        const {data} = response
        const list = $('#listGroupUser')
          list.html('')
        for(let i of data){
          list.append(` <li class="list-group-item clearfix">` +
          `<input onchange="checkboxChecked(event)"  type="checkbox" class="check form-check-input" id='${i.email}' data-index='${i.id}'>`+
          '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />'+
          '<div class="about">' +
            `<div class="white name">${i.name} ${i.surname} </div>`+
            '<div class="white status">'+
             '<i class=" fa fa-circle online"></i> online'+
            '</div>'+
          '</div> </li>')
      }
    },
    error: (response) => {
       alert(response.responseJSON.error)
    }
})
}

const createChat =  function(toId, name) {
  $.ajax({
    method: 'POST',
    url: 'http://192.168.1.66:5001/api/chat/createChat',
    headers: {"token": localStorage.getItem('token')},
    data: {
        fromId: JSON.parse(localStorage.getItem('user_data')).id,
        toId
    },
    crossDomain: true,
    success: (response) =>{
        renderChat(name, response.data, toId)
    },
    error: (response) => {
       alert(response.responseJSON.error)
    }
})
}

const createGroup =  function() {
  // alert(nameGroup.value)
  $.ajax({
    method: 'POST',
    url: 'http://192.168.1.66:5001/api/groups',
    headers: {"token": localStorage.getItem('token')},
    data: {
        title: nameGroup.value,
        description: descGroup.value,
        avatar: "avatar",
        time: '2022',
        start: new Date(),
        end: new Date()
    },
    crossDomain: true,
    success: (response) =>{
        const {data} = response
        const chats = $('.list')
        console.log(data)

        group = data.id

        var scrollbar = document.body.clientWidth - window.innerWidth + 'px';

          chats.prepend(` <li class='clearfix readible'>` +
          '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />'+
          '<div class="about">' +
            `<div class="name">${data.title}</div>`+
            '<div class="status">'+
             `<i class="fa"></i> ${data.description}`+
            '</div>'+
          '</div> </li>')

    },
    error: (response) => {
       alert(response.responseJSON.error)
    }
})
}

const addUserInGroup = function(){
      $.ajax({
        method: 'POST',
        url: 'http://192.168.1.66:5001/api/groupUsers',
        headers: {"token": localStorage.getItem('token')},
        data: {
            groupId: group,
            listUser: listUser
        },
        crossDomain: true,
        success: (response) =>{
            console.log(response)
        },
        error: (response) => {
           alert(response.responseJSON.error)
        }
    })
}

function checkboxChecked(event) {
    let chbox = document.getElementById(`${event.currentTarget.id}`);
	if (chbox.checked) {
		listUser.push(event.currentTarget.dataset.index)
        alert (listUser);
	}
	else {
        let myIndex = listUser.indexOf(event.currentTarget.dataset.index);
        if (myIndex !== -1) {
            listUser.splice(myIndex, 1);
        }
        alert (listUser);
	}
}

function MouseXY(event) {
    xMouse = event.pageX
    yMouse = event.pageY
}

function transformPanel() {
    select.style.display = "block"
    var selectOffsetLeft = select.offsetLeft
    var selectOffsetTop = select.offsetTop
    if (xMouse > 1600) {
        var x = xMouse - selectOffsetLeft - 199
    } else {
        var x = xMouse - selectOffsetLeft - 1
    }

    if (yMouse > 600) {
        var y = yMouse - selectOffsetTop - 99
    } else {
        var y = yMouse - selectOffsetTop - 1
    }

    select.style.transform = "translate(" + x + "px," + y +"px)"
}

chatHistory.addEventListener("click",transformPanel,false)

select.addEventListener("click",function(){select.style.display = "none"},false)

htmlBody.addEventListener("mousemove", MouseXY, false)
