
function login(){
    const email = $('input[name="email"]').val()
    const password = $('input[name="password"]').val()
    console.log({email,password});

    $.ajax({
        method: 'POST',
        url: 'http://localhost:5001/api/users/login',
        data: {email,password},
        crossDomain: true,
        success: (response) =>{
            console.log(response); 
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user_data', JSON.stringify(response.data.user))
        },
        error: (response) => {
           alert(response.responseJSON.error)
        }
    })
}

function checkAuth(){
    const url = document.location.href;
    console.log(url)
    if(url.includes('login') || url.includes('registration')) return
    $.ajax({
        method: 'GET',
        url: 'http://localhost:5001/api/users/check',
        headers: {"token": localStorage.getItem('token')},
        crossDomain: true,
        success: (response) =>{
            console.log(response); 
        },
        error: (response) => {
           document.location = '/login'
        }
    })
}

checkAuth()