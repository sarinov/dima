let openedChatUserId = null;
let openedChatUserName = null;
let openedChatUserChatId = null;

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
            url: 'http://192.168.0.156:5001/api/messages/chats',
            headers: {"token": localStorage.getItem('token')},
            crossDomain: true,
            success: (response) =>{
                renderChatsGlobal(response.data)
            },
            error: (response) => {
               document.location = '/login'
            }
        })
      },


      sendMessage: function(content, userId){
        $.ajax({
          method: 'POST',
          url: 'http://192.168.0.156:5001/api/messages/sendMessage',
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


      renderChats: function(users){
          const chats = $('.list')
          chats.html('')
            for(let i of users){
                chats.append(` <li onclick="renderChat('${i.user.name + '' + i.user.surname}', ${i.chatId}, ${i.user.id})" id="${i.chatId}" class="clearfix ${i.isRead ? 'readible' : ''}">` +
                '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />'+
                '<div class="about">' +
                  `<div class="name">${i.user.name} ${i.user.surname} </div>`+
                  '<div class="status">'+
                   '<i class="fa fa-circle online"></i> online'+
                   `${i.isRead}` +
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
        time: message.Message.time
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
      url: 'http://192.168.0.156:5001/api/messages/chatMessages/' + openedChatUserChatId,
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
    $(`#${chatId}`).css({ background: "transparent"})
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
    url: 'http://192.168.0.156:5001/api/users/find?query=' + e.target.value,
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

const createChat =  function(toId, name) {
  $.ajax({
    method: 'POST',
    url: 'http://192.168.0.156:5001/api/chat/createChat',
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
