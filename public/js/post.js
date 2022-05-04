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
                 },
                 body: JSON.stringify({
                     'content': content.value,
                     'img': img.value,
                     'title': title.value,
                     'description': description.value,
                     'userId': 9,
                     'viewed': 1
                 })
             })
}

submit.addEventListener("click",sendPost,false);
