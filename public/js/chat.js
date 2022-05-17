let openedChatUserId = null;
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
        $.ajax({
            method: 'GET',
            url: 'http://localhost:5001/api/messages/chats',
            headers: {"token": localStorage.getItem('token')},
            crossDomain: true,
            success: (response) =>{
                console.log(response.data.User);
                this.renderChats(response.data)
            },
            error: (response) => {
               document.location = '/login'
            }
        })
      },


      sendMessage: function(content, userId){
        $.ajax({
          method: 'POST',
          url: 'http://localhost:5001/api/messages/sendMessage',
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
        //   chats.clear()
            for(let i of users){
                chats.append(` <li onclick="renderChat('${i.name + '' + i.surname}', ${i.id})" class="clearfix">` +
                '<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />'+
                '<div class="about">' +
                  `<div class="name">${i.name} ${i.surname} </div>`+
                  '<div class="status">'+
                   '<i class="fa fa-circle online"></i> online'+
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
         this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
      },
      getCurrentTime: function() {
        return new Date().toLocaleTimeString().
                replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
      },
      getRandomItem: function(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
      }

    };

    chat.init();

    var searchFilter = {
      options: { valueNames: ['name'] },
      init: function() {
        var userList = new List('people-list', this.options);
        var noItems = $('<li id="no-items-found">No items found</li>');

        userList.on('updated', function(list) {
          if (list.matchingItems.length === 0) {
            $(list.list).append(noItems);
          } else {
            noItems.detach();
          }
        });
      }
    };

    searchFilter.init();





  })();

  const renderChat = function(name, id){
    $('.chat-message').show();
    console.log(name)
    const chat_with = $('.chat-with');
    chat_with.html('')
    openedChatUserId = id;
    chat_with.append(`${name}, ${id}`)
}
