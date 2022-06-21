checkAuth()

function login(){
    const email = $('input[name="email"]').val()
    const password = $('input[name="password"]').val()
    console.log({email,password});

    $.ajax({
        method: 'POST',
        url: 'http://192.168.0.156:5001/api/users/login',
        data: {email,password},
        crossDomain: true,
        success: (response) =>{
            console.log(response);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user_data', JSON.stringify(response.data.user))
            document.location = '/chat'
        },
        error: (response) => {
           alert(response.responseJSON.error)
        }
    })
}

function registration(){
    const email = $('input[name="email"]').val()
    const password = $('input[name="password"]').val()
    const name = $('input[name="name"]').val()
    const surname = $('input[name="surname"]').val()
    const phone = $('input[name="phone"]').val()
    const age = $('input[name="age"]').val()
    // console.log({email,password});

    $.ajax({
        method: 'POST',
        url: 'http://192.168.0.156:5001/api/users/registration',
        data: {email,password,name,surname,phone,age},
        crossDomain: true,
        success: (response) =>{
            console.log(response);
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user_data', JSON.stringify(response.data.user))
            document.location = '/'
        },
        error: (response) => {
           alert(response.responseJSON.error)
        }
    })
}

function checkAuth(){
    const url = document.location.href;
    // console.log(url)
    if(url.includes('login') || url.includes('registration')) return
    $.ajax({
        method: 'GET',
        url: 'http://192.168.0.156:5001/api/users/check',
        headers: {"token": localStorage.getItem('token')},
        crossDomain: true,
        success: (response) =>{
        },
        error: (response) => {
           document.location = '/login'
        }
    })
}
