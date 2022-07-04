let description = document.getElementById("description")
let title = document.getElementById("title")
let img = document.getElementById("img")
let content = document.getElementById("content")
let submit = document.getElementById("submit")

function sendPost() {
        fetch("/api/posts", {
                 method: "POST",
                 headers: {
                       'Content-Type': 'application/json;charset=utf-8',
                       'token': localStorage.getItem('token')
                 },
                 body: JSON.stringify({
                     'content': content.value,
                     'img': img.value,
                     'title': title.value,
                     'description': description.value,
                     'viewed': 1
                 })
             }).then(response => {
                 if (response.ok) {
                 document.location = "/"
             }
         })
}

const renderComments = function(comments, id) {
    const comment = $(`#${id}`)
    comment.html("")
    for(let c of comments){
        comment.prepend(` <hr />` +
        '<div class="comment">'+
            `<h4>${c.User.name} ${c.User.surname}</h4>` +
            `<p>${c.content}</p>`+
        '</div>'
      )
    }
    $(`.${id}`).slideToggle()
}

const showComment = function(id) {
    const comments = $(`.${id}`)

    if (comments.css('display') == "none") {
        $.ajax({
          method: 'GET',
          url: 'http://192.168.1.97:5001/api/comments/CommentsInPost/' + id,
          headers: {"token": localStorage.getItem('token')},
          crossDomain: true,
          success: (response) =>{
              renderComments(response.data, id);
          },
          error: (response) => {
             alert(response.responseJSON.error)
          }
      })
    } else {
            comments.slideToggle()
    }
}

const sendComment = function(id) {
    let inputComment = document.querySelector(`input[data-button='${id}']`);

    $.ajax({
      method: 'POST',
      url: 'http://192.168.1.97:5001/api/comments',
      data: {
        content: inputComment.value,
        time: new Date(),
        postId: id
      },
      headers: {"token": localStorage.getItem('token')},
      crossDomain: true,
      success: (response) =>{
          const comment = $(`#${id}`)
          comment.prepend(` <hr />` +
          '<div class="comment">'+
              `<h4>${JSON.parse(localStorage.getItem('user_data')).name} ${JSON.parse(localStorage.getItem('user_data')).surname}</h4>` +
              `<p>${response.data.content}</p>`+
          '</div>'
        )
      },
      error: (response) => {
         alert(response.responseJSON.error)
      }
  })

  inputComment.value = ""
}


if(submit)
submit.addEventListener("click",sendPost,false);
